// src/pages/open-graph/_shared/page-data.ts
import { getCollection } from 'astro:content';
import fs from 'node:fs';
import path from 'node:path';
import { allPages } from '@root/content';
import {
	formatBlogDate,
	getSectionLabel,
	isAllowlistedMarketingPath,
	truncate,
} from '@util/ogContext';
import { getLanguageFromSlug } from '@util/path-utils';
import type { CardProps } from '@root/pages/open-graph/_shared/Card';
import { getDocsProductMeta } from '@root/pages/open-graph/_shared/product-meta';
import { getMarketingOverride, getMarketingSection } from '@root/pages/open-graph/_shared/marketing-meta';
import { BLOG_AUTHORS } from '@data/blog/authors';
import { CATEGORY_LABELS } from '@data/blog/categories';
import { HARDWARE_PARTNERS } from '@data/partners/hardware-partners';
import { jobs } from '@data/careers/jobs';
import { IOT_HUB_CATEGORIES } from '@models/iot-hub';

export interface CardInput {
	/** URL-shaped slug used as the path parameter in the endpoint */
	slug: string;
	props: CardProps;
}

const TITLE_MAX = 120;

/** docs collection — EN only; UK reuses EN cards via getOgImageUrl path normalization. */
export async function getDocsCardInputs(): Promise<CardInput[]> {
	return allPages
		.filter((page) => getLanguageFromSlug(page.id) === 'en')
		.filter((page) => page.id !== 'docs') // /docs/ landing is owned by getCollectionIndexInputs
		.map((page) => {
			const meta = getDocsProductMeta(page.id);
			const section = getSectionLabel(page.id);
			const eyebrow = section ? `Documentation · ${section}` : 'Documentation';
			return {
				slug: stripDocsPrefix(page.id),
				props: {
					variant: 'docs' as const,
					meta,
					eyebrow,
					title: truncate(page.data.title, TITLE_MAX),
				},
			};
		});
}

function prettyCategory(slug: string): string {
	return slug
		.split('-')
		.map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
		.join(' ');
}

function authorName(slug: string): string {
	return BLOG_AUTHORS.find((a) => a.slug === slug)?.name ?? slug;
}

/** blog collection — posts + index + author landings + category landings. */
export async function getBlogCardInputs(): Promise<CardInput[]> {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	const inputs: CardInput[] = [];

	// /blog/{post-slug}/
	for (const post of posts) {
		const category = post.data.categories?.[0]
			? prettyCategory(post.data.categories[0]!)
			: 'Article';
		inputs.push({
			slug: post.id,
			props: {
				variant: 'logo' as const,
				sectionName: 'Blog',
				eyebrow: `${category} · ${formatBlogDate(post.data.date)}`,
				title: truncate(post.data.title, TITLE_MAX),
				authorLine: `By ${authorName(post.data.author)}`,
			},
		});
	}

	// /blog/  (collection index)
	inputs.push({
		slug: 'index',
		props: {
			variant: 'logo' as const,
			sectionName: 'Blog',
			eyebrow: 'Latest articles',
			title: 'ThingsBoard Blog',
		},
	});

	// /blog/author/{author-slug}/
	for (const author of BLOG_AUTHORS) {
		inputs.push({
			slug: `author/${author.slug}`,
			props: {
				variant: 'logo' as const,
				sectionName: 'Blog',
				eyebrow: 'Author',
				title: author.name,
			},
		});
	}

	// /blog/category/{category-slug}/
	for (const [slug, label] of Object.entries(CATEGORY_LABELS)) {
		inputs.push({
			slug: `category/${slug}`,
			props: {
				variant: 'logo' as const,
				sectionName: 'Blog',
				eyebrow: 'Category',
				title: label,
			},
		});
	}

	return inputs;
}

export async function getIotHubCardInputs(): Promise<CardInput[]> {
	const SECTION = 'IoT Hub';
	const inputs: CardInput[] = [
		{
			slug: 'index',
			props: {
				variant: 'logo' as const,
				sectionName: SECTION,
				title: 'ThingsBoard IoT Hub',
			},
		},
	];

	for (const cat of IOT_HUB_CATEGORIES) {
		inputs.push({
			slug: cat.slug,
			props: {
				variant: 'logo' as const,
				sectionName: SECTION,
				eyebrow: 'Category',
				// Bare label "Devices" is too generic for a shared OG card.
				title: cat.slug === 'devices' ? 'IoT Devices' : cat.label,
			},
		});
	}

	inputs.push(
		{
			slug: 'search',
			props: { variant: 'logo' as const, sectionName: SECTION, title: 'Search results' },
		},
		{
			slug: 'creator',
			props: { variant: 'logo' as const, sectionName: SECTION, title: 'Creators' },
		},
	);

	return inputs;
}

/** case-studies — sourced from per-slug data files under src/data/case-studies/ */
export async function getCaseStudyCardInputs(): Promise<CardInput[]> {
	const modules = import.meta.glob<Record<string, unknown>>('/src/data/case-studies/*.ts', { eager: true });
	return enumerateDataModules<{ pageTitle?: string; title: string; categories?: string[] }>(
		modules,
		(data) => ({
			variant: 'logo',
			sectionName: 'Case Study',
			sectionTight: true,
			eyebrow: data.categories?.[0] ?? 'IoT',
			title: truncate(data.pageTitle ?? data.title, TITLE_MAX),
		}),
	);
}

/** use-cases — same pattern as case-studies */
export async function getUseCaseCardInputs(): Promise<CardInput[]> {
	const modules = import.meta.glob<Record<string, unknown>>('/src/data/use-cases/*.ts', { eager: true });
	return enumerateDataModules<{ pageTitle?: string; title: string; industry?: string }>(
		modules,
		(data) => ({
			variant: 'logo',
			sectionName: 'Use Case',
			sectionTight: true,
			eyebrow: data.industry ?? 'IoT Solution',
			title: truncate(data.pageTitle ?? data.title, TITLE_MAX),
		}),
	);
}

/** Marketing landings — allowlist of /src/pages/*.astro routes. */
export async function getMarketingCardInputs(): Promise<CardInput[]> {
	const root = path.resolve('src/pages');
	const candidates: Array<{ slug: string; pathname: string }> = [];
	walkAstroPages(root, '', candidates);
	return candidates
		.filter(({ pathname }) => isAllowlistedMarketingPath(pathname))
		.map(({ slug, pathname }) => {
			const section = getMarketingSection(pathname);
			const override = getMarketingOverride(pathname);
			const isHome = pathname === '/';
			return {
				slug: slug || 'index',
				props: {
					variant: 'logo' as const,
					sectionName: section.sectionName ?? undefined,
					sectionTight: section.tight,
					eyebrow: override?.eyebrow ?? (isHome ? 'Open-source IoT platform' : pathnameToSubtitle(pathname)),
					title: override?.title ?? pathnameToTitle(pathname),
				},
			};
		});
}

/** hardware partners — `/partners/hardware/{slug}/` driven by HARDWARE_PARTNERS. */
export async function getPartnerCardInputs(): Promise<CardInput[]> {
	return HARDWARE_PARTNERS.map((partner) => ({
		slug: partner.slug,
		props: {
			variant: 'logo' as const,
			sectionName: 'Partners',
			eyebrow: 'Hardware Partner',
			title: truncate(partner.name, TITLE_MAX),
		},
	}));
}

/** careers — `/careers/{slug}/` driven by `jobs` in src/data/careers/jobs.ts. */
export async function getCareerCardInputs(): Promise<CardInput[]> {
	return jobs.map((job) => ({
		slug: job.slug,
		props: {
			variant: 'logo' as const,
			sectionName: 'Careers',
			eyebrow: job.location || 'Open Position',
			title: truncate(job.position, TITLE_MAX),
		},
	}));
}

/** Collection-landing cards that have neither a marketing .astro nor a per-collection detail. */
export async function getCollectionIndexInputs(): Promise<CardInput[]> {
	return [
		{
			slug: 'docs-index',
			props: {
				variant: 'logo' as const,
				sectionName: 'Documentation',
				eyebrow: 'All editions',
				title: 'ThingsBoard Documentation',
			},
		},
		{
			slug: 'case-studies-index',
			props: {
				variant: 'logo' as const,
				sectionName: 'Case Studies',
				sectionTight: true,
				eyebrow: 'Customer stories',
				title: 'ThingsBoard Case Studies',
			},
		},
		{
			slug: 'use-cases-index',
			props: {
				variant: 'logo' as const,
				sectionName: 'Use Cases',
				sectionTight: true,
				eyebrow: 'IoT solutions',
				title: 'ThingsBoard Use Cases',
			},
		},
	];
}

// ---------------------------------------------------------------------------
// Internals
// ---------------------------------------------------------------------------

function stripDocsPrefix(slug: string): string {
	// allPages id is e.g. 'docs/pe/foo'. Endpoint slug strips the leading 'docs/'.
	return slug.startsWith('docs/') ? slug.slice(5) : slug;
}

/**
 * Enumerate per-slug `.ts` data files (case-studies, use-cases). Each module
 * exports one or more named consts; the data record is the one with a `title`
 * field. `index` and `types` modules are skipped.
 */
function enumerateDataModules<T extends { title: string }>(
	modules: Record<string, Record<string, unknown>>,
	pickProps: (data: T) => CardInput['props'],
): CardInput[] {
	const out: CardInput[] = [];
	for (const [filePath, mod] of Object.entries(modules)) {
		const baseName = filePath.split('/').pop()!.replace(/\.ts$/, '');
		if (baseName === 'index' || baseName === 'types') continue;
		const data = Object.values(mod).find(
			(v): v is T => typeof v === 'object' && v !== null && 'title' in v,
		);
		if (!data) continue;
		out.push({ slug: baseName, props: pickProps(data) });
	}
	return out;
}

/** Walk src/pages/ for .astro files, skipping dynamic [...] routes and known non-content dirs. */
function walkAstroPages(
	root: string,
	rel: string,
	out: Array<{ slug: string; pathname: string }>
): void {
	const SKIP_DIRS = new Set([
		'open-graph', 'docs', 'blog', 'case-studies', 'use-cases', 'iot-hub',
	]);
	const dir = path.join(root, rel);
	let entries: fs.Dirent[];
	try {
		entries = fs.readdirSync(dir, { withFileTypes: true });
	} catch {
		return;
	}
	for (const entry of entries) {
		if (entry.name.startsWith('[')) continue; // dynamic routes
		if (entry.isDirectory()) {
			if (SKIP_DIRS.has(entry.name)) continue;
			walkAstroPages(root, path.join(rel, entry.name), out);
			continue;
		}
		if (!entry.name.endsWith('.astro')) continue;
		const baseName = entry.name.replace(/\.astro$/, '');
		const slug = baseName === 'index'
			? rel.replace(/\\/g, '/')
			: path.join(rel, baseName).replace(/\\/g, '/');
		const pathname = '/' + (slug ? slug + '/' : '');
		out.push({ slug, pathname });
	}
}

/** Fallback: derive a marketing-page title from the URL pathname. */
function pathnameToTitle(pathname: string): string {
	if (pathname === '/') return 'Open-source IoT platform for device data collection';
	const segs = pathname.split('/').filter(Boolean);
	const last = segs[segs.length - 1] ?? '';
	return last
		.split('-')
		.map((word) => (word ? word[0]!.toUpperCase() + word.slice(1) : word))
		.join(' ');
}

/** Eyebrow for non-home marketing pages — usually the second-to-last URL segment, prettified. */
function pathnameToSubtitle(pathname: string): string {
	const segs = pathname.split('/').filter(Boolean);
	if (segs.length <= 1) return 'ThingsBoard';
	const parent = segs[segs.length - 2]!;
	return parent
		.split('-')
		.map((word) => (word ? word[0]!.toUpperCase() + word.slice(1) : word))
		.join(' ');
}
