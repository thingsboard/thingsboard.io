export const SITE_NAME = 'ThingsBoard';
export const DOCS_SUFFIX = 'Docs';
export const TITLE_SEPARATOR = '|';

const SEP = ` ${TITLE_SEPARATOR} `;

export const SECTION_LABELS: Record<string, string> = {
	'/case-studies/': 'Case Studies',
	'/blog/': 'Blog',
	'/use-cases/': 'Use Cases',
	'/industries/': 'Industries',
	'/partners/': 'Partners',
	'/services/': 'Services',
	'/careers/': 'Careers',
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

export function formatDocsTitle(pageTitle: string, productName: string, isIndex: boolean): string {
	return isIndex
		? `${DOCS_SUFFIX}${SEP}${productName}`
		: `${pageTitle}${SEP}${DOCS_SUFFIX}${SEP}${productName}`;
}
