import type { CaseStudyCard, CaseStudyData, FeaturedCard } from './types';

export const caseStudyCategories = [
	'Industry 4.0',
	'Smart energy',
	'Smart infrastructure',
	'Cold chain monitoring',
	'Smart city',
	'Warehouse monitoring',
	'Facility management',
	'Smart IoT solution',
	'Smart agriculture',
	'Telecom',
] as const;

// ── Display order (newest first). ─────────────────────────────────────────────
// Adding a case study?
//   1. Drop a {slug}.ts data file in this folder (export const data: CaseStudyData = …).
//   2. Add the slug to this array in the position you want it displayed.
//   3. (Optional) If the card needs a custom logo height, add an entry to
//      `cardLogoHeights` below.
export const caseStudyOrder: string[] = [
	'ibt-systems',
	'acte-technology',
	'wiifor',
	'ariot',
	'super-bock',
	'kiotera',
	'onedata',
	'lumen',
	'solandtec',
	'tjk-solutions',
	'energenix',
	'energroup',
	'xtelia',
	'oxi',
	'dacor',
	'comet',
	'crai',
	'iioote',
	'obb-infra',
	'senseing',
	'awake',
	'agrolog',
	'suessco',
	'asg-tech',
	't-mobile-cz',
	'keners',
	'berliner-energieinstitut',
	'e2cbms',
	'circutor',
	'oneserve',
	'mdeg',
	'tps',
	'nettra',
	'kalitec',
	'vypin',
	'tektelic',
	'iona',
];

// Card-only logo height overrides. The hero on the detail page may want a
// different intrinsic size than the catalog card, so we keep the card override
// here rather than on the data itself.
const cardLogoHeights: Record<string, number> = {
	ariot: 75,
	iioote: 35,
	xtelia: 35,
	comet: 42,
	awake: 35,
	't-mobile-cz': 87,
	e2cbms: 87,
	circutor: 42,
	mdeg: 87,
	tps: 87,
	tektelic: 56,
};

// ── Auto-discovered case-study data ───────────────────────────────────────────
// Every {slug}.ts file in this folder exports `const data: CaseStudyData`.
// Vite's import.meta.glob pulls them in at build time; we look them up by slug.
const dataModules = import.meta.glob<CaseStudyData>(
	['./*.ts', '!./index.ts', '!./types.ts'],
	{ eager: true, import: 'data' },
);

export const caseStudyBySlug: Record<string, CaseStudyData> = {};
for (const d of Object.values(dataModules)) {
	caseStudyBySlug[d.pageSlug] = d;
}

// Slugs that have a detail page but are deliberately excluded from the catalog
// (e.g. the featured card on the index renders schwarz separately).
const FEATURED_ONLY_SLUGS = new Set(['schwarz']);

// Surface registration drift between data files and caseStudyOrder at build
// time. Silent mismatches cause orphaned pages or quietly-missing catalog
// entries — see comments on caseStudyOrder above.
for (const slug of caseStudyOrder) {
	if (!caseStudyBySlug[slug]) {
		console.warn(
			`[case-studies] caseStudyOrder lists "${slug}" but no matching data file exists in src/data/case-studies/.`,
		);
	}
}
for (const slug of Object.keys(caseStudyBySlug)) {
	if (!caseStudyOrder.includes(slug) && !FEATURED_ONLY_SLUGS.has(slug)) {
		console.warn(
			`[case-studies] data file "${slug}.ts" exists but is not in caseStudyOrder — its detail page builds, but it won't appear in the catalog. Add the slug to caseStudyOrder, or add it to FEATURED_ONLY_SLUGS if that's intentional.`,
		);
	}
}

function toCard(d: CaseStudyData): CaseStudyCard {
	return {
		slug: d.pageSlug,
		categories: d.categories,
		title: d.title,
		description: d.description,
		logo: d.hero.logo,
		logoAlt: d.hero.logoAlt,
		logoHeight: cardLogoHeights[d.pageSlug],
		backgroundImage: d.hero.backgroundImage,
	};
}

export const caseStudyCards: CaseStudyCard[] = caseStudyOrder
	.map((slug) => caseStudyBySlug[slug])
	.filter((d): d is CaseStudyData => Boolean(d))
	.map(toCard);

export const caseStudyContactBanner = {
	buttons: [
		{ label: 'Contact Us', href: '/contact-us/' },
		{ label: 'Use cases', href: '/use-cases/', variant: 'outlined' as const },
	],
};

export const caseStudyServicesBanner = {
	title: 'Want to achieve similarly impactful results?',
	subtitle:
		'Find your development partner for scalable solutions delivered fast and on a fixed timeline.',
	iconSrc: '/images/usecases/services-icon.svg',
	iconAlt: 'Services icon',
	buttons: [{ label: 'Explore our service', href: '/services/' }],
	variant: 'light' as const,
};

// ── Featured card ─────────────────────────────────────────────────────────────
// Catalog's hero featured card. Derived from the case study's data file (single
// source of truth, prevents the title/logo/bg drifting from the detail page),
// except for `description`: the featured card shows long marketing copy while
// the data file's `description` is the SEO meta description — intentionally
// different. The override lives here so it's easy to spot when revising copy.
const FEATURED_SLUG = 'schwarz';
const FEATURED_DESCRIPTION =
	'The Schwarz Group is one of the largest retail companies in the world, based in Neckarsulm, Germany. ' +
	'It operates in 32 countries, managing around 13,900 stores and employing approximately 575,000 people. ' +
	'Millions of people shop at Schwarz Group supermarkets every day.';

const featuredData = caseStudyBySlug[FEATURED_SLUG];
if (!featuredData) {
	throw new Error(
		`[case-studies] Featured slug "${FEATURED_SLUG}" has no matching data file in src/data/case-studies/.`,
	);
}

export const featuredCard: FeaturedCard = {
	slug: featuredData.pageSlug,
	category: featuredData.hero.category,
	title: featuredData.title,
	description: FEATURED_DESCRIPTION,
	logo: featuredData.hero.logo,
	logoAlt: featuredData.hero.logoAlt,
	backgroundImage: featuredData.hero.backgroundImage,
};
