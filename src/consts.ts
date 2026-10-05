export const SITE_NAME = 'ThingsBoard';
export const DOCS_SUFFIX = 'Docs';
export const TITLE_SEPARATOR = '|';

/**
 * Production site origin. SEO canonicals and the link checker's "treat as
 * local" allow-list both anchor to this regardless of `PUBLIC_SITE_URL` /
 * preview origins, so that canonical hrefs and absolute-URL detection stay
 * stable across staging and production builds.
 */
export const PROD_ORIGIN = 'https://thingsboard.io';

const SEP = ` ${TITLE_SEPARATOR} `;

export const SECTION_LABELS: Record<string, string> = {
	'/case-studies/': 'Case Studies',
	'/blog/': 'Blog',
	'/use-cases/': 'Use Cases',
	'/industries/': 'Industries',
	'/partners/': 'Partners',
	'/services/': 'Services',
	// Lives at /clients-feedback/ but is surfaced as "About" in the title for SEO.
	'/clients-feedback/': 'About',
};

export function formatSectionIndexTitle(section: string): string {
	return `${section}${SEP}${SITE_NAME}`;
}

export function formatMarketingTitle(title: string, section?: string): string {
	// Strip any legacy " | ThingsBoard" baked into the title prop (some pages include it themselves)
	const clean = title.replace(/\s*\|\s*ThingsBoard\s*$/i, '').trim();
	if (!section) return `${clean}${SEP}${SITE_NAME}`;
	if (clean === section) return formatSectionIndexTitle(section);
	return `${clean}${SEP}${section}${SEP}${SITE_NAME}`;
}

/**
 * Docs <title>: "{Page} | {suffix}", or the suffix alone on a product index. The suffix is
 * the product's own `docsTitle` brand when it has one, else "Docs | {productName}".
 */
export function formatDocsTitle(
	pageTitle: string,
	productName: string,
	isIndex: boolean,
	docsTitle?: string
): string {
	const suffix = docsTitle ?? `${DOCS_SUFFIX}${SEP}${productName}`;
	return isIndex ? suffix : `${pageTitle}${SEP}${suffix}`;
}
