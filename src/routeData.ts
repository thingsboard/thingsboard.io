import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { APIContext } from 'astro';
import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';
import { tutorialPages as pages } from '~/content';
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
import { getCanonicalPathname } from '~/util/canonical';
import { DOCS_SUFFIX, formatDocsTitle, TITLE_SEPARATOR } from '~/consts';
import { getOgImageUrl } from '~/util/getOgImageUrl';
import { getTutorialPages } from '~/util/getTutorialPages';
// No alias covers `config/`; relative import is the only option here.
import {
	getRepoRoot,
	getSitemapSourceRegistry,
	normalizeSitemapPath,
	toRepoRelative,
} from '../config/sitemap-source-registry';

/**
 * Display names for `/reference/<api>-api/` sub-sections, used to build unique
 * SEO titles for sibling pages that share short H1s like "Attributes" or "RPC".
 */
const API_SECTION_NAMES: Record<string, string> = {
	'coap-api': 'CoAP API',
	'gateway-api': 'Gateway API',
	'http-api': 'HTTP API',
	'lwm2m-api': 'LwM2M API',
	'mqtt-api': 'MQTT API',
	'snmp-api': 'SNMP API',
};

/** Tutorial pages bucketed by product version. Built once at module load — `pages` is static. */
const tutorialPagesByVersion: Map<Products, typeof pages> = (() => {
	const result = new Map<Products, typeof pages>();
	const ordered = getTutorialPages(pages);
	for (const page of ordered) {
		const version = getVersionFromSlug(page.id);
		const bucket = result.get(version);
		if (bucket) bucket.push(page);
		else result.set(version, [page]);
	}
	return result;
})();

/** Memoization cache for `linkMatchesVersion(href) && linkMatchesLanguage(href)`. */
const sidebarLinkMatchCache = new Map<string, boolean>();

const EDIT_BASE_URL = 'https://github.com/thingsboard/thingsboard.io/edit/main';
const INCLUDES_IMPORT_REGEX = /^\s*import\s+\w+\s+from\s+['"]@includes\/([^'"]+)['"]/gm;
const JSX_COMPONENT_REGEX = /^\s*<[A-Z][A-Za-z0-9]*\b/gm;
/** filePath → include path relative to `_includes/` (e.g. `docs/introduction.mdx`), or `null`. */
const stubIncludeRelCache = new Map<string, string | null>();

export const onRequest = defineRouteMiddleware((context) => {
	const starlightRoute = context.locals.starlightRoute;
	const isTutorial = isTutorialEntry(starlightRoute.entry);
	updateHead(context, isTutorial);
	rewriteStubEditUrl(starlightRoute);
	recordSitemapSources(context, starlightRoute);
	filterSidebarByVersionAndLanguage(starlightRoute);
	markParentSidebarItemAsCurrent(starlightRoute, context.url.pathname);
	filterPaginationByVersion(starlightRoute);
	if (isTutorial) updateTutorialPagination(starlightRoute);
});

/**
 * A thin stub is a wrapper page whose body is exactly 1 `@includes` import + 1
 * JSX component call — the real content lives in the include. Returns the
 * include path relative to `src/content/_includes/`, or `null` for non-stubs.
 * Shared by the "Edit page" link rewrite and the sitemap `lastmod` computation
 * so both attribute changes to the same underlying source file.
 */
function getStubIncludeRel(filePath: string): string | null {
	let rel = stubIncludeRelCache.get(filePath);
	if (rel === undefined) {
		rel = null;
		try {
			const source = readFileSync(filePath, 'utf8');
			const includeMatches = [...source.matchAll(INCLUDES_IMPORT_REGEX)];
			const jsxMatches = [...source.matchAll(JSX_COMPONENT_REGEX)];
			if (includeMatches.length === 1 && jsxMatches.length === 1) {
				rel = includeMatches[0]![1] ?? null;
			}
		} catch {
			// Source file unreadable — treat as a non-stub.
		}
		stubIncludeRelCache.set(filePath, rel);
	}
	return rel;
}

/** Thin stubs point "Edit page" at the include, not the stub. */
function rewriteStubEditUrl(starlightRoute: StarlightRouteData) {
	if (!starlightRoute.editUrl) return;
	const filePath = (starlightRoute.entry as { filePath?: string }).filePath;
	if (!filePath) return;

	const rel = getStubIncludeRel(filePath);
	if (rel) starlightRoute.editUrl = new URL(`${EDIT_BASE_URL}/src/content/_includes/${rel}`);
}

/**
 * Record the repo-relative source file(s) for a real docs content page so the
 * sitemap integration can derive `<lastmod>` from git. Only content-collection
 * pages reach this middleware with a real on-disk `entry.filePath`; everything
 * else is resolved by the integration from the route table. Pages the sitemap
 * would drop (noindex, canonical-to-elsewhere) are skipped.
 */
function recordSitemapSources(context: APIContext, starlightRoute: StarlightRouteData) {
	const filePath = (starlightRoute.entry as { filePath?: string }).filePath;
	if (!filePath) return;
	const wrapperRel = toRepoRelative(filePath);
	// Synthetic StarlightPage entries point at a non-existent file; record only
	// when the content file actually exists on disk.
	if (!wrapperRel || !existsSync(join(getRepoRoot(), wrapperRel))) return;
	if (!isIndexableSelfCanonical(context, starlightRoute)) return;

	const sources = [wrapperRel];
	const includeRel = getStubIncludeRel(filePath);
	if (includeRel) sources.push(`src/content/_includes/${includeRel}`);
	getSitemapSourceRegistry().set(normalizeSitemapPath(context.url.pathname), sources);
}

/** True when the computed head has no `noindex` and any canonical points at the page itself. */
function isIndexableSelfCanonical(context: APIContext, starlightRoute: StarlightRouteData): boolean {
	const selfPath = normalizeSitemapPath(context.url.pathname);
	for (const item of starlightRoute.head) {
		if (item.tag === 'meta' && item.attrs?.name === 'robots') {
			const content = item.attrs.content;
			if (typeof content === 'string' && /\bnoindex\b/i.test(content)) return false;
		} else if (item.tag === 'link' && item.attrs?.rel === 'canonical') {
			const href = item.attrs.href;
			if (typeof href !== 'string') continue;
			try {
				if (normalizeSitemapPath(new URL(href).pathname) !== selfPath) return false;
			} catch {
				// Unparseable canonical — keep the page rather than silently dropping it.
			}
		}
	}
	return true;
}

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
		const key = `${version}|${lang}|${entry.href}`;
		const cached = sidebarLinkMatchCache.get(key);
		if (cached !== undefined) return cached;
		const match = linkMatchesVersion(entry.href, version) && linkMatchesLanguage(entry.href, lang);
		sidebarLinkMatchCache.set(key, match);
		return match;
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
	if (version === Products.IOT_HUB) return path.startsWith('iot-hub/');
	// CE: everything that doesn't belong to other products
	return (
		!path.startsWith('pe/') &&
		!path.startsWith('paas/') &&
		!path.startsWith('edge/') &&
		!path.startsWith('trendz/') &&
		!path.startsWith('iot-gateway/') &&
		!path.startsWith('mqtt-broker/') &&
		!path.startsWith('mobile/') &&
		!path.startsWith('license-server/') &&
		!path.startsWith('iot-hub/')
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

const docsPathRegex = /^\/(uk\/)?docs(\/|$)/;
const escapedSep = TITLE_SEPARATOR.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
const docsSuffixMatcher = new RegExp(` ${escapedSep} ${DOCS_SUFFIX}$`);
const apiPathMatcher = /^reference\/([^/]+)\//;

function updateHead(context: APIContext, isTutorial: boolean) {
	const starlightRoute = context.locals.starlightRoute;
	starlightRoute.head = starlightRoute.head.filter(
		(item) => !(item.tag === 'meta' && item.attrs?.name === 'generator')
	);
	const { head, entry } = starlightRoute;

	// Single pass collecting all head entries we will mutate or test later
	// (avoids separate find()/some() walks).
	let title: (typeof head)[number] | undefined;
	let ogTitle: (typeof head)[number] | undefined;
	let ogUrl: (typeof head)[number] | undefined;
	let ogImage: (typeof head)[number] | undefined;
	let canonical: (typeof head)[number] | undefined;
	for (const item of head) {
		if (item.tag === 'title') {
			title = item;
		} else if (item.tag === 'meta') {
			const property = item.attrs?.property;
			if (property === 'og:title') ogTitle = item;
			else if (property === 'og:url') ogUrl = item;
			else if (property === 'og:image') ogImage = item;
		} else if (item.tag === 'link' && item.attrs?.rel === 'canonical') {
			canonical = item;
		}
	}

	const entryHead = (entry.data as { head: StarlightRouteData['head'] }).head;
	const frontmatterTitle = entryHead.find((item) => item.tag === 'title');

	if (isTutorial && title && title.content && !frontmatterTitle) {
		title.content = context.locals.t('tutorial.title.prefix', 'Tutorial - {{title}}', {
			title: title.content,
		});
	}

	const pathname = context.url.pathname;
	// Title formatting and canonical consolidation only apply to real `/docs/`
	// pages. Marketing pages render through `StarlightPage` too, so gate the
	// docs-only work here to skip their per-page version/slug/canonical lookups.
	const isDocs = docsPathRegex.test(pathname);

	if (isDocs && title && title.content) {
		const product = getVersionFromURL(pathname);
		const lang = getLanguageFromURL(pathname);
		const pageSlug = getPageSlugFromURL(pathname);

		// Per-page `customDocsTitle` frontmatter overrides the auto-formatted
		// docs title entirely. Used by product index pages that want a
		// non-default <title> (e.g. "Docs | ThingsBoard Professional Edition").
		const customDocsTitle = (entry.data as { customDocsTitle?: string }).customDocsTitle;
		if (customDocsTitle) {
			title.content = customDocsTitle;
		} else {
			const productTitleName = getProductTitleName(product);
			const versionBase = `/${getLanguagePrefix(lang)}docs/${getVersionPrefix(product)}`;
			const isIndex = pathname === versionBase;
			let pageTitle = title.content.replace(docsSuffixMatcher, '');

			// Auto-append API section name to disambiguate sibling reference pages
			// (e.g. several `/reference/<x>-api/attributes/` pages all share H1 "Attributes").
			// Skipped when the page sets its own <title> via frontmatter `head`.
			if (!frontmatterTitle) {
				const apiMatch = pageSlug.match(apiPathMatcher);
				const apiName = apiMatch ? API_SECTION_NAMES[apiMatch[1]!] : undefined;
				if (apiName) pageTitle = `${pageTitle} - ${apiName}`;
			}

			title.content = formatDocsTitle(pageTitle, productTitleName, isIndex);
		}
		if (ogTitle) ogTitle.attrs!['content'] = title.content;
	}

	// Marketing pages author their own `og:image` in frontmatter; only emit ours
	// when none is present, else BaseLayout pages get a duplicate `og:image`.
	if (!ogImage) {
		const ogImageUrl = getOgImageUrl(pathname);
		let imageSrc = ogImageUrl ?? '/thingsboard-og.png';
		// Astro dev with `trailingSlash: 'always'` requires dynamic-route URLs to end with '/'
		// even when they have a file extension. Production (Cloudflare Pages serving static files)
		// needs the clean .png URL with no trailing slash.
		if (import.meta.env.DEV && /\.png$/.test(imageSrc) && imageSrc !== '/thingsboard-og.png') {
			imageSrc = imageSrc + '/';
		}
		// Use request origin so dev shows localhost; in static build it equals context.site origin.
		const canonicalImageSrc = new URL(imageSrc, context.url.origin).href;

		head.push({ tag: 'meta', attrs: { property: 'og:image', content: canonicalImageSrc } });
	}

	// Search pages render a search widget with no indexable content. Keep them
	// out of search results (consistent with the sitemap exclusion).
	if (pathname.endsWith('/search/')) {
		head.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, follow' } });
	}

	// Canonical: free product versions → professional equivalents, plus explicit
	// frontmatter overrides. See `getCanonicalPathname` — also drives sitemap
	// exclusion so the two stay in lockstep. Docs-only: a marketing page's
	// synthetic `entry.id` would default to CE and rewrite e.g. `/` → `/docs/pe/`.
	if (isDocs) {
		const canonicalPathname = getCanonicalPathname(
			entry.id,
			entry.data as { selfCanonical?: boolean; canonicalUrl?: string }
		);
		const selfPathname = pathname.endsWith('/') ? pathname : pathname + '/';
		if (canonicalPathname !== selfPathname) {
			const targetCanonical = new URL(canonicalPathname, context.site).href;
			if (canonical) canonical.attrs!['href'] = targetCanonical;
			if (ogUrl) ogUrl.attrs!['content'] = targetCanonical;
		}
	}
}

function updateTutorialPagination(starlightRoute: StarlightRouteData) {
	const { entry, pagination } = starlightRoute;
	const version = getVersionFromSlug(entry.id);
	const tutorialPages = tutorialPagesByVersion.get(version);
	if (!tutorialPages) return;
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
