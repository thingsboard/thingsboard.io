import type { APIContext } from 'astro';
import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';
import { allPages, tutorialPages as pages } from '~/content';
import { Products } from '@models/site.models.ts';
import {
	getVersionFromSlug,
	getVersionFromURL,
	getLanguageFromSlug,
	getLanguageFromURL,
	getPageSlugFromURL,
	getVersionPrefix,
	getLanguagePrefix,
	getProductTitleName,
	stripLanguagePrefix,
	type SupportedLanguage,
} from '~/util/path-utils';
import { DOCS_SUFFIX, formatDocsTitle, TITLE_SEPARATOR } from '~/consts';
import { getOgImageUrl } from '~/util/getOgImageUrl';
import { getTutorialPages } from '~/util/getTutorialPages';

/**
 * Maps "free" product versions to their "professional" canonical equivalents.
 * Pages in free versions have their <link rel="canonical"> rewritten to the
 * corresponding professional URL for SEO consolidation, IF the professional
 * equivalent exists. Both versions continue serving their own distinct content.
 */
const canonicalConsolidationMap: Partial<Record<Products, Products>> = {
	[Products.CE]: Products.PE,
	[Products.PAAS]: Products.PE,
	[Products.PAAS_EU]: Products.PE,
	[Products.EDGE]: Products.EDGE_PE,
	[Products.TBMQ]: Products.TBMQ_PE,
	[Products.MOBILE]: Products.MOBILE_PE,
};

/** Per-target sets of content IDs, used to verify an equivalent exists before rewriting canonical. */
const canonicalTargetPageIds = new Map<Products, Set<string>>(
	[...new Set(Object.values(canonicalConsolidationMap))].map((target) => [
		target,
		new Set(allPages.filter((p) => getVersionFromSlug(p.id) === target).map((p) => p.id)),
	])
);

export const onRequest = defineRouteMiddleware((context) => {
	updateHead(context);
	filterSidebarByVersionAndLanguage(context.locals.starlightRoute);
	markParentSidebarItemAsCurrent(context.locals.starlightRoute, context.url.pathname);
	filterPaginationByVersion(context.locals.starlightRoute);
	updateTutorialPagination(context.locals.starlightRoute);
});

/**
 * Filter sidebar entries to only show items for the current product version and language.
 */
function filterSidebarByVersionAndLanguage(starlightRoute: StarlightRouteData) {
	const version = getVersionFromSlug(starlightRoute.id);
	const lang = getLanguageFromSlug(starlightRoute.id);

	starlightRoute.sidebar = starlightRoute.sidebar.filter((entry) =>
		sidebarEntryMatchesVersionAndLanguage(entry, version, lang)
	);
}

function sidebarEntryMatchesVersionAndLanguage(
	entry: StarlightRouteData['sidebar'][number],
	version: Products,
	lang: SupportedLanguage
): boolean {
	if (entry.type === 'link') {
		return linkMatchesVersion(entry.href, version) && linkMatchesLanguage(entry.href, lang);
	}
	if (entry.type === 'group') {
		entry.entries = entry.entries.filter((child) =>
			sidebarEntryMatchesVersionAndLanguage(child, version, lang)
		);
		return entry.entries.length > 0;
	}
	return true;
}

function linkMatchesVersion(href: string, version: Products): boolean {
	let path = href;
	if (path.startsWith('/uk/')) path = path.slice(4);
	path = path.replace(/^\/docs\/?/, '');

	if (version === Products.PE) return path.startsWith('pe/');
	if (version === Products.PAAS) return path.startsWith('paas/') && !path.startsWith('paas/eu/');
	if (version === Products.PAAS_EU) return path.startsWith('paas/eu/');
	if (version === Products.EDGE_PE) return path.startsWith('edge/pe/');
	if (version === Products.EDGE) return path.startsWith('edge/') && !path.startsWith('edge/pe/');
	if (version === Products.TRENDZ) return path.startsWith('trendz/');
	if (version === Products.GW) return path.startsWith('iot-gateway/');
	if (version === Products.TBMQ_PE) return path.startsWith('mqtt-broker/pe/');
	if (version === Products.TBMQ)
		return path.startsWith('mqtt-broker/') && !path.startsWith('mqtt-broker/pe/');
	if (version === Products.MOBILE_PE) return path.startsWith('mobile/pe/');
	if (version === Products.MOBILE)
		return path.startsWith('mobile/') && !path.startsWith('mobile/pe/');
	if (version === Products.LICENSE) return path.startsWith('license-server/');
	// CE: everything that doesn't belong to other products
	return (
		!path.startsWith('pe/') &&
		!path.startsWith('paas/') &&
		!path.startsWith('edge/') &&
		!path.startsWith('trendz/') &&
		!path.startsWith('iot-gateway/') &&
		!path.startsWith('mqtt-broker/') &&
		!path.startsWith('mobile/') &&
		!path.startsWith('license-server/')
	);
}

/**
 * When the current page is not a sidebar link (e.g. a dynamic sub-page like
 * /docs/pe/releases/releases-table/v4-3-x/), mark the closest ancestor
 * sidebar link as current so that collapsed groups containing it render open.
 */
function markParentSidebarItemAsCurrent(starlightRoute: StarlightRouteData, pathname: string) {
	// If any entry is already current, nothing to do
	if (hasCurrent(starlightRoute.sidebar)) return;

	// Find the sidebar link with the longest href that is a prefix of pathname
	let bestEntry: { isCurrent: boolean } | null = null;
	let bestLen = 0;

	function walk(entries: StarlightRouteData['sidebar']) {
		for (const entry of entries) {
			if (entry.type === 'link') {
				if (pathname.startsWith(entry.href) && entry.href.length > bestLen) {
					bestLen = entry.href.length;
					bestEntry = entry;
				}
			} else if (entry.type === 'group') {
				walk(entry.entries);
			}
		}
	}

	walk(starlightRoute.sidebar);
	if (bestEntry) (bestEntry as { isCurrent: boolean }).isCurrent = true;
}

function hasCurrent(entries: StarlightRouteData['sidebar']): boolean {
	for (const entry of entries) {
		if (entry.type === 'link' && entry.isCurrent) return true;
		if (entry.type === 'group' && hasCurrent(entry.entries)) return true;
	}
	return false;
}

/**
 * Clear pagination links that cross product version boundaries.
 * Starlight builds prev/next from the combined sidebar, so without this
 * the last CE page would link to the first PE page, etc.
 */
function filterPaginationByVersion(starlightRoute: StarlightRouteData) {
	const version = getVersionFromSlug(starlightRoute.id);
	const { pagination } = starlightRoute;

	if (pagination.prev && !linkMatchesVersion(pagination.prev.href, version)) {
		pagination.prev = undefined;
	}
	if (pagination.next && !linkMatchesVersion(pagination.next.href, version)) {
		pagination.next = undefined;
	}
}

function linkMatchesLanguage(href: string, lang: SupportedLanguage): boolean {
	if (lang === 'uk') return href.startsWith('/uk/');
	return !href.startsWith('/uk/');
}

function updateHead(context: APIContext) {
	const starlightRoute = context.locals.starlightRoute;
	starlightRoute.head = starlightRoute.head.filter(
		(item) => !(item.tag === 'meta' && item.attrs?.name === 'generator')
	);
	const { head, entry } = starlightRoute;

	const title = head.find((item) => item.tag === 'title');
	const entryHead = (entry.data as { head: StarlightRouteData['head'] }).head;
	const frontmatterTitle = entryHead.find((item) => item.tag === 'title');

	if (isTutorialEntry(entry) && title && title.content && !frontmatterTitle) {
		title.content = context.locals.t('tutorial.title.prefix', 'Tutorial - {{title}}', {
			title: title.content,
		});
	}

	const pathname = context.url.pathname;
	if (title && title.content && /^\/(uk\/)?docs(\/|$)/.test(pathname)) {
		const product = getVersionFromURL(pathname);
		const productTitleName = getProductTitleName(product);
		const lang = getLanguageFromURL(pathname);
		const versionBase = `/${getLanguagePrefix(lang)}docs/${getVersionPrefix(product)}`;
		const isIndex = pathname === versionBase;
		const escapedSep = TITLE_SEPARATOR.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
		const docsSuffixMatcher = new RegExp(` ${escapedSep} ${DOCS_SUFFIX}$`);
		const pageTitle = title.content.replace(docsSuffixMatcher, '');
		title.content = formatDocsTitle(pageTitle, productTitleName, isIndex);

		for (const item of head) {
			if (
				item.tag === 'meta' &&
				item.attrs &&
				(item.attrs.property === 'og:title' || item.attrs.name === 'twitter:title')
			) {
				item.attrs.content = title.content;
			}
		}
	}

	const ogImageUrl = getOgImageUrl(context.url.pathname, false);
	const imageSrc = ogImageUrl ?? '/thingsboard-og.png';
	const canonicalImageSrc = new URL(imageSrc, context.site);
	const is404 = context.url.pathname.endsWith('/404/');

	head.push({ tag: 'meta', attrs: { property: 'og:image', content: canonicalImageSrc.href } });
	head.push({ tag: 'meta', attrs: { name: 'twitter:image', content: canonicalImageSrc.href } });
	head.push({ tag: 'meta', attrs: { name: 'twitter:site', content: '@thingsboard' } });

	head.push({
		tag: 'script',
		attrs: {
			src: 'https://cdn.usefathom.com/script.js',
			'data-site': 'EZBHTSIG',
			'data-canonical': is404 ? 'false' : 'true',
			defer: true,
		},
	});

	// Canonical consolidation: free product versions → professional equivalents.
	// Only rewrite if the equivalent professional page actually exists, and the
	// page is not edition-specific (different Docker images, licensing, hosts).
	const sourceVersion = getVersionFromURL(context.url.pathname);
	const targetVersion = canonicalConsolidationMap[sourceVersion];
	if (targetVersion) {
		const pageSlug = getPageSlugFromURL(context.url.pathname);

		const selfCanonicalSegments = ['installation', 'install', 'getting-started'];
		const isSelfCanonicalPath = selfCanonicalSegments.some(
			(seg) => pageSlug === seg || pageSlug.startsWith(`${seg}/`)
		);
		const isSelfCanonicalFrontmatter =
			(entry.data as { selfCanonical?: boolean }).selfCanonical === true;

		if (!isSelfCanonicalPath && !isSelfCanonicalFrontmatter) {
			const targetPageIds = canonicalTargetPageIds.get(targetVersion)!;
			const lang = getLanguageFromURL(context.url.pathname);
			const langPrefix = getLanguagePrefix(lang);
			const targetPrefix = getVersionPrefix(targetVersion);
			const docsPrefix = lang === 'uk' ? 'uk/docs/' : 'docs/';
			const targetContentId = `${docsPrefix}${targetPrefix}${pageSlug}`;

			if (targetPageIds.has(targetContentId)) {
				const targetPathname = `/${langPrefix}docs/${targetPrefix}${pageSlug}/`;
				const targetCanonical = new URL(targetPathname, context.site).href;

				const canonical = head.find(
					(item) => item.tag === 'link' && item.attrs?.['rel'] === 'canonical'
				);
				if (canonical) canonical.attrs!['href'] = targetCanonical;

				const ogUrl = head.find(
					(item) => item.tag === 'meta' && item.attrs?.['property'] === 'og:url'
				);
				if (ogUrl) ogUrl.attrs!['content'] = targetCanonical;
			}
		}
	}
}

function updateTutorialPagination(starlightRoute: StarlightRouteData) {
	const { entry, pagination } = starlightRoute;

	if (!isTutorialEntry(entry)) return;

	const version = getVersionFromSlug(entry.id);
	const tutorialPages = getTutorialPages(pages).filter((p) => getVersionFromSlug(p.id) === version);
	const i = tutorialPages.findIndex((p) => p.id === entry.id);

	const lang = getLanguageFromSlug(entry.id);
	const langPrefix = lang === 'uk' ? '/uk' : '';

	if (tutorialPages[i - 1]) {
		const prevPage = tutorialPages[i - 1];
		const prevPath = stripLanguagePrefix(prevPage.id);
		pagination.prev = {
			href: `${langPrefix}/${prevPath}/`,
			isCurrent: false,
			label: prevPage.data.title,
			type: 'link',
			badge: undefined,
			attrs: {},
		};
	}

	if (tutorialPages[i + 1]) {
		const nextPage = tutorialPages[i + 1];
		const nextPath = stripLanguagePrefix(nextPage.id);
		pagination.next = {
			href: `${langPrefix}/${nextPath}/`,
			isCurrent: false,
			label: nextPage.data.title,
			type: 'link',
			badge: undefined,
			attrs: {},
		};
	}
}

function isTutorialEntry(entry: StarlightRouteData['entry']) {
	const slug = stripLanguagePrefix(entry.id);
	return slug.startsWith('docs/tutorial/') || slug.startsWith('docs/pe/tutorial/');
}
