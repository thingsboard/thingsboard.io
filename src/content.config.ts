import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, type CollectionEntry } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { Products } from '@models/site.models';
import { announcementSchema } from '@models/announcement';
import {
	IOT_HUB_API_URL,
	IOT_HUB_CATEGORIES,
	API_FETCH_PAGE_SIZE,
	iotHubCategorySchema,
	itemTypeFilterInfoSchema,
	type ItemTypeFilterInfo,
	type ListingDetail,
} from '@models/iot-hub';
import { fetchWithRetry } from '@util/fetch-utils';

export const baseSchema = z.object({
	type: z.literal('base').optional().default('base'),
	description: z.string().optional(),
	selfCanonical: z.boolean().optional(),
	canonicalUrl: z.string().optional(),
	customDocsTitle: z.string().optional(),
	githubURL: z.url().optional(),
	hasREADME: z.boolean().optional(),
	feedback: z.boolean().optional(),
	hero: z
		.object({
			gridVariant: z.enum(['lines', 'dots']).optional().default('lines'),
			variant: z.enum(['default', 'simple']).optional().default('default'),
			activity: z
				.object({
					type: z.literal('dashboard'),
					product: z.enum(Products),
				})
				.optional(),
		})
		.optional(),
	announcement: announcementSchema.optional(),
});

export const tutorialSchema = baseSchema.extend({
	type: z.literal('tutorial'),
	unitTitle: z.string().optional(),
});

export const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	author: z.string(),
	categories: z
		.array(z.string())
		.or(z.string())
		.transform((v) => (Array.isArray(v) ? v : [v])),
	featuredImage: z.string(),
	featuredImageAlt: z.string().default(''),
	excludeFromCarousel: z.boolean().default(false),
	pinned: z.boolean().default(false),
});

export const docsCollectionSchema = z.union([baseSchema, tutorialSchema]);

export type DocsEntryData = z.infer<typeof docsCollectionSchema>;

export type DocsEntryType = DocsEntryData['type'];

export type DocsEntry<T extends DocsEntryType> = CollectionEntry<'docs'> & {
	data: { title: string } & Extract<DocsEntryData, { type: T }>;
};

export function createIsDocsEntry<T extends DocsEntryType>(type: T) {
	return (entry: CollectionEntry<'docs'>): entry is DocsEntry<T> => (entry.data as DocsEntryData).type === type;
}

export type TutorialEntry = DocsEntry<'tutorial'>;

export const isTutorialEntry = createIsDocsEntry('tutorial');

export const collections = {
	blog: defineCollection({
		loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
		schema: blogSchema,
	}),
	docs: defineCollection({
		// Default Astro slug derivation runs each path segment through `github-slugger`,
		// which strips dots (only `[a-z0-9-]` survives). Override to preserve dotted
		// filenames like `…-before-v1.7.mdx` so the URL keeps the version separator.
		// Mirrors the default behaviour for `slug:` frontmatter overrides.
		loader: docsLoader({
			generateId: ({ entry, data }) => {
				if (typeof data.slug === 'string') return data.slug;
				return entry.replace(/\.(md|mdx|mdoc)$/, '').replace(/(?:^|\/)index$/, '');
			},
		}),
		schema: docsSchema({ extend: docsCollectionSchema }),
	}),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({
			extend: z.object({
				'checklist.or': z.string().default('or'),
				'footer.translatePage': z.string().default('Translate this page'),
				'tutorial.trackerLabel': z.string().default('Tutorial Tracker'),
				'tutorial.unit': z.string().default('Unit'),
				'tutorial.title.prefix': z.string().default('Tutorial - {{title}}'),
				'progress.todo': z.string().default('To do'),
				'progress.done': z.string().default('Complete'),
			}),
		}),
	}),
	iotHubCategories: defineCollection({
		loader: async () => {
			type ListingPage = {
				data: ListingDetail[];
				totalPages: number;
				totalElements: number;
				hasNext: boolean;
			};
			const fetchPage = async (itemType: string, page: number): Promise<ListingPage> => {
				const url =
					`${IOT_HUB_API_URL}/api/listings/published/details` +
					`?pageSize=${API_FETCH_PAGE_SIZE}&page=${page}` +
					`&type=${itemType}` +
					`&sortProperty=installCount&sortOrder=DESC`;
				const res = await fetchWithRetry(url);
				return (await res.json()) as ListingPage;
			};
			const fetchCategory = async (itemType: string): Promise<ListingDetail[]> => {
				// Fetch page 0 first to learn totalPages, then fan out the
				// remaining pages in parallel instead of awaiting them serially.
				const first = await fetchPage(itemType, 0);
				const items: ListingDetail[] = [...first.data];
				if (first.totalPages > 1) {
					const rest = await Promise.all(
						Array.from({ length: first.totalPages - 1 }, (_, i) => fetchPage(itemType, i + 1))
					);
					for (const p of rest) items.push(...p.data);
				}
				return items;
			};
			// Filter facet counts can't be derived from the per-page
			// listing payload — they aggregate across the whole catalog.
			// Empty facets (totalItems === 0) are dropped so the FilterPanel
			// never renders checkboxes that would yield zero results.
			const fetchFilterInfo = async (itemType: string): Promise<ItemTypeFilterInfo> => {
				const url = `${IOT_HUB_API_URL}/api/item-listing/listingFilterInfo/${itemType}`;
				const res = await fetchWithRetry(url);
				const body = await res.json();
				const parsed = itemTypeFilterInfoSchema.parse(body);
				const nonEmpty = (list: typeof parsed.types) =>
					list.filter((entry) => entry.totalItems > 0);
				return {
					types: nonEmpty(parsed.types),
					categories: nonEmpty(parsed.categories),
					useCases: nonEmpty(parsed.useCases),
					vendors: nonEmpty(parsed.vendors),
					hardwareTypes: nonEmpty(parsed.hardwareTypes),
					connectivities: Object.fromEntries(
						Object.entries(parsed.connectivities)
							.map(([bucket, entries]) => [bucket, nonEmpty(entries)] as const)
							.filter(([, entries]) => entries.length > 0)
					),
				};
			};
			try {
				// One entry per category, keyed by slug. See `iotHubCategorySchema`.
				const [perCategoryItems, perCategoryFilters] = await Promise.all([
					Promise.all(IOT_HUB_CATEGORIES.map((cat) => fetchCategory(cat.itemType))),
					Promise.all(IOT_HUB_CATEGORIES.map((cat) => fetchFilterInfo(cat.itemType))),
				]);
				return IOT_HUB_CATEGORIES.map((cat, i) => ({
					id: cat.slug,
					itemType: cat.itemType,
					label: cat.label,
					items: perCategoryItems[i],
					filterInfo: perCategoryFilters[i],
				}));
			} catch (e) {
				const isProductionBuild = process.argv.includes('build');
				if (!isProductionBuild) {
					const command = process.argv[2] ?? 'unknown';
					const msg = e instanceof Error ? e.message : String(e);
					console.warn(
						`[iot-hub] loader failed in ${command} mode, using empty collection: ${msg}`
					);
					return [];
				}
				throw e;
			}
		},
		schema: iotHubCategorySchema,
	}),
};
