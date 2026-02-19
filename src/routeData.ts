import type { APIContext } from 'astro';
import { defineRouteMiddleware, type StarlightRouteData } from '@astrojs/starlight/route-data';
import { tutorialPages as pages } from '~/content';
import {
	getVersionFromSlug,
	getLanguageFromSlug,
	stripLanguagePrefix,
	type ProductVersion,
	type SupportedLanguage,
} from '~/util/path-utils';
import { getOgImageUrl } from '~/util/getOgImageUrl';
import { getTutorialPages } from '~/util/getTutorialPages';

export const onRequest = defineRouteMiddleware((context) => {
	updateHead(context);
	filterSidebarByVersionAndLanguage(context.locals.starlightRoute);
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
	version: ProductVersion,
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

function linkMatchesVersion(href: string, version: ProductVersion): boolean {
	let path = href;
	if (path.startsWith('/uk/')) path = path.slice(4);
	path = path.replace(/^\/docs\/?/, '');

	if (version === 'pe') return path.startsWith('pe/');
	if (version === 'paas') return path.startsWith('paas/');
	return !path.startsWith('pe/') && !path.startsWith('paas/');
}

function linkMatchesLanguage(href: string, lang: SupportedLanguage): boolean {
	if (lang === 'uk') return href.startsWith('/uk/');
	return !href.startsWith('/uk/');
}

function updateHead(context: APIContext) {
	const { head, entry } = context.locals.starlightRoute;

	const title = head.find((item) => item.tag === 'title');
	const frontmatterTitle = entry.data.head.find((item) => item.tag === 'title');

	if (isTutorialEntry(entry) && title && !frontmatterTitle) {
		title.content = context.locals.t('tutorial.title.prefix', {
			title: title.content,
		});
	}

	const ogImageUrl = getOgImageUrl(context.url.pathname, false);
	const imageSrc = ogImageUrl ?? '/default-og-image.png';
	const canonicalImageSrc = new URL(imageSrc, context.site);
	const is404 = context.url.pathname.endsWith('/404/');

	head.push({ tag: 'meta', attrs: { property: 'og:image', content: canonicalImageSrc.href } });
	head.push({ tag: 'meta', attrs: { name: 'twitter:image', content: canonicalImageSrc.href } });
	head.push({ tag: 'meta', attrs: { name: 'twitter:site', content: 'astrodotbuild' } });

	head.push({
		tag: 'script',
		attrs: {
			src: 'https://cdn.usefathom.com/script.js',
			'data-site': 'EZBHTSIG',
			'data-canonical': is404 ? 'false' : 'true',
			defer: true,
		},
	});
}

function updateTutorialPagination(starlightRoute: StarlightRouteData) {
	const { entry, pagination } = starlightRoute;

	if (!isTutorialEntry(entry)) return;

	const version = getVersionFromSlug(entry.id);
	const tutorialPages = getTutorialPages(pages).filter(
		(p) => getVersionFromSlug(p.id) === version
	);
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
