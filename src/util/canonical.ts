import { Products, professionalCounterpart } from '@models/site.models.ts';
import { allPages } from '~/content';
import { PROD_ORIGIN } from '~/consts';
import {
	getLanguageFromSlug,
	getLanguagePrefix,
	getVersionFromSlug,
	getVersionPrefix,
	stripLanguagePrefix,
} from '~/util/path-utils';

/**
 * Maps "free" product versions to their "professional" canonical equivalents.
 * Pages in free versions have their <link rel="canonical"> rewritten to the
 * corresponding professional URL for SEO consolidation, IF the professional
 * equivalent exists. Both versions continue serving their own distinct content.
 *
 * Derived from `professionalCounterpart` so the Community↔Professional pairs live in one
 * place; a new pair added there is consolidated here automatically. The two PaaS entries
 * are local to this map on purpose — Cloud is a paid edition, not a Community one, and is
 * folded into PE for SEO reasons only. It must stay out of the edition-visibility model,
 * where treating it as Community would wrongly hide the Cloud option in the docs selector.
 */
const canonicalConsolidationMap: Partial<Record<Products, Products>> = {
	...professionalCounterpart,
	[Products.PAAS]: Products.PE,
	[Products.PAAS_EU]: Products.PE,
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
	// CE root index page: id is just 'docs' (no trailing slash via generateId).
	else if (path === 'docs') path = '';
	const prefix = getVersionPrefix(version);
	if (prefix && path.startsWith(prefix)) path = path.slice(prefix.length);
	// Product root index page: id is `docs/<product>` (e.g. `docs/pe`), so after
	// stripping `docs/` we have `pe` while the prefix is `pe/` — match index here.
	else if (prefix && path + '/' === prefix) path = '';
	return path;
}

/** Site-relative pathname (with leading and trailing slash) for a content id. */
function getPathnameFromId(id: string): string {
	const stripped = stripLanguagePrefix(id);
	const langPrefix = id.startsWith('uk/') ? '/uk' : '';
	return `${langPrefix}/${stripped}/`;
}

const PROD_HOST = new URL(PROD_ORIGIN).hostname;

/**
 * Resolve a `canonicalUrl:` frontmatter value into the form `routeData.ts` expects.
 *  - Same-origin (or root-relative) → site-relative pathname with trailing slash,
 *    so `pathname !== self` comparison works and `new URL(value, context.site)`
 *    rebuilds the canonical against the site origin.
 *  - Cross-origin → preserve the absolute href verbatim. `new URL(absolute, base)`
 *    ignores the base when the first arg is absolute, so the rewritten canonical
 *    keeps its foreign origin instead of being silently rebased to PROD_ORIGIN.
 *  - Malformed (unparsable) → returns `null` so the caller can fall back to the
 *    page's own pathname (no rewrite) instead of letting a garbage string flow
 *    into `new URL(...)` and crash the build.
 *
 * The resolver base is hardcoded to `PROD_ORIGIN` (not Astro's runtime `site`)
 * so that root-relative `canonicalUrl: /docs/foo/` values stay canonical across
 * preview/staging builds — using the build origin would emit different `<link
 * rel="canonical">` hrefs from preview deploys.
 */
function normalizeCanonicalHref(href: string): string | null {
	try {
		const url = new URL(href, PROD_ORIGIN);
		if (url.hostname !== PROD_HOST) return url.href;
		// Preserve `?query` and `#fragment` — `url.pathname` strips them, and the
		// pre-refactor code passed the raw value into `new URL(value, context.site)`
		// which kept both. Forcing a trailing slash matches Astro's `trailingSlash: 'always'`.
		let p = url.pathname;
		if (!p.endsWith('/')) p = p + '/';
		return p + url.search + url.hash;
	} catch {
		return null;
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

	if (data.canonicalUrl) return normalizeCanonicalHref(data.canonicalUrl) ?? selfPathname;

	if (data.selfCanonical) return selfPathname;

	const version = getVersionFromSlug(id);
	const targetVersion = canonicalConsolidationMap[version];
	if (!targetVersion) return selfPathname;

	const pageSlug = getPageSlugFromId(id, version);
	const isSelfCanonicalPath = selfCanonicalSegments.some(
		(seg) => pageSlug === seg || pageSlug.startsWith(`${seg}/`)
	);
	if (isSelfCanonicalPath) return selfPathname;

	return resolveCounterpartPathname(id, version, targetVersion) ?? selfPathname;
}

/**
 * Pathname of `id`'s equivalent page under `target`, or `undefined` when that
 * page does not exist. Pure structure — no frontmatter overrides are consulted.
 */
function resolveCounterpartPathname(
	id: string,
	version: Products,
	target: Products
): string | undefined {
	const targetPageIds = canonicalTargetPageIds.get(target);
	if (!targetPageIds) return undefined;

	const pageSlug = getPageSlugFromId(id, version);
	const lang = getLanguageFromSlug(id);
	const docsPrefix = lang === 'uk' ? 'uk/docs/' : 'docs/';
	const targetPrefix = getVersionPrefix(target);
	const targetContentId = `${docsPrefix}${targetPrefix}${pageSlug}`.replace(/\/$/, '');
	if (!targetPageIds.has(targetContentId)) return undefined;

	const langPrefix = getLanguagePrefix(lang);
	const slugSuffix = pageSlug ? `${pageSlug}/` : '';
	return `/${langPrefix}docs/${targetPrefix}${slugSuffix}`;
}

/**
 * Site-relative pathname of this page's professional counterpart, or
 * `undefined` when it has none.
 *
 * Deliberately NOT `getCanonicalPathname`: that answers "what should this page's
 * `<link rel="canonical">` point at", which diverges here. It short-circuits on
 * `canonicalUrl` frontmatter — ~90 Edge CE pages fold their canonical into
 * *core* PE for SEO, which would send an Edge reader out of the Edge tree — and
 * it returns the page's own path for several unrelated reasons (`selfCanonical`,
 * `selfCanonicalSegments`, an unparsable override), so "differs from self" is
 * not a reliable "a twin exists" signal.
 */
export function getProfessionalTwinPathname(id: string): string | undefined {
	const version = getVersionFromSlug(id);
	const target = professionalCounterpart[version];
	if (!target) return undefined;
	return resolveCounterpartPathname(id, version, target);
}
