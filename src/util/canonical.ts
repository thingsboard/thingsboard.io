import { Products } from '../models/site.models';
import { allPages } from '../content';
import {
	getLanguageFromSlug,
	getLanguagePrefix,
	getVersionFromSlug,
	getVersionPrefix,
	stripLanguagePrefix,
} from './path-utils';

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

/** Page-slug segments that opt out of canonical consolidation (edition-specific content). */
const selfCanonicalSegments = ['installation/upgrade-instructions'];

/** Per-target sets of content IDs, used to verify an equivalent exists before rewriting canonical. */
const canonicalTargetPageIds = new Map<Products, Set<string>>(
	[...new Set(Object.values(canonicalConsolidationMap))].map((target) => [
		target,
		new Set(allPages.filter((p) => getVersionFromSlug(p.id) === target).map((p) => p.id)),
	])
);

/** Page-slug portion of a content id (everything after `[uk/]docs/<version-prefix>`). */
function getPageSlugFromId(id: string, version: Products): string {
	let path = stripLanguagePrefix(id);
	if (path.startsWith('docs/')) path = path.slice(5);
	else if (path === 'docs') path = '';
	const prefix = getVersionPrefix(version);
	if (prefix && path.startsWith(prefix)) path = path.slice(prefix.length);
	else if (prefix && path + '/' === prefix) path = '';
	return path;
}

/** Site-relative pathname (with leading and trailing slash) for a content id. */
function getPathnameFromId(id: string): string {
	const stripped = stripLanguagePrefix(id);
	const langPrefix = id.startsWith('uk/') ? '/uk' : '';
	return `${langPrefix}/${stripped}/`;
}

/** Resolve a canonical URL string to a site-relative pathname (with trailing slash). */
function normalizeCanonicalToPathname(href: string): string {
	try {
		const url = new URL(href, 'https://thingsboard.io');
		let p = url.pathname;
		if (!p.endsWith('/')) p = p + '/';
		return p;
	} catch {
		return href;
	}
}

/**
 * Resolve the canonical pathname for a page based on consolidation map and
 * frontmatter overrides. Returns the page's own pathname when no rewrite applies.
 */
export function getCanonicalPathname(
	id: string,
	data: { selfCanonical?: boolean; canonicalUrl?: string }
): string {
	const selfPathname = getPathnameFromId(id);

	if (data.canonicalUrl) return normalizeCanonicalToPathname(data.canonicalUrl);

	if (data.selfCanonical) return selfPathname;

	const version = getVersionFromSlug(id);
	const targetVersion = canonicalConsolidationMap[version];
	if (!targetVersion) return selfPathname;

	const pageSlug = getPageSlugFromId(id, version);
	const isSelfCanonicalPath = selfCanonicalSegments.some(
		(seg) => pageSlug === seg || pageSlug.startsWith(`${seg}/`)
	);
	if (isSelfCanonicalPath) return selfPathname;

	const targetPageIds = canonicalTargetPageIds.get(targetVersion)!;
	const lang = getLanguageFromSlug(id);
	const docsPrefix = lang === 'uk' ? 'uk/docs/' : 'docs/';
	const targetPrefix = getVersionPrefix(targetVersion);
	const targetContentId = `${docsPrefix}${targetPrefix}${pageSlug}`.replace(/\/$/, '');
	if (!targetPageIds.has(targetContentId)) return selfPathname;

	const langPrefix = getLanguagePrefix(lang);
	const slugSuffix = pageSlug ? `${pageSlug}/` : '';
	return `/${langPrefix}docs/${targetPrefix}${slugSuffix}`;
}
