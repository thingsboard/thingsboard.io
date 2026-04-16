import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { defineCollection, type CollectionEntry } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';
import { logoKeys } from './data/logos';
import { Products } from './models/site.models';
import fs from 'node:fs';
import path from 'node:path';

export const baseSchema = z.object({
	type: z.literal('base').optional().default('base'),
	githubURL: z.string().url().optional(),
	hasREADME: z.boolean().optional(),
	hero: z
		.object({
			gridVariant: z.enum(['lines', 'dots']).optional().default('lines'),
			variant: z.enum(['default', 'simple']).optional().default('default'),
			activity: z
				.discriminatedUnion('type', [
					z.object({
						type: z.literal('contributors'),
						tagline: z.string(),
						linkText: z.string(),
						link: z.string(),
					}),
					z.object({
						type: z.literal('dashboard'),
						product: z.nativeEnum(Products),
					}),
				])
				.optional(),
		})
		.optional(),
});

// Third-party guide schemas (deploy, backend, cms, media)
export const deploySchema = baseSchema.extend({
	type: z.literal('deploy'),
	logo: z.enum(logoKeys),
	supports: z.array(z.enum(['static', 'ssr'])),
});

export const backendSchema = baseSchema.extend({
	type: z.literal('backend'),
	stub: z.boolean().default(false),
	logo: z.enum(logoKeys),
});

export const cmsSchema = baseSchema.extend({
	type: z.literal('cms'),
	stub: z.boolean().default(false),
	logo: z.enum(logoKeys),
});

export const mediaSchema = baseSchema.extend({
	type: z.literal('media'),
	stub: z.boolean().default(false),
	logo: z.enum(logoKeys),
});

export const integrationSchema = baseSchema.extend({
	type: z.literal('integration'),
	title: z
		.string()
		.refine(
			(title) => title.startsWith('@astrojs/'),
			'"title" must start with "@astrojs/" for integration docs.'
		),
	category: z.enum(['renderer', 'adapter', 'other']),
	githubIntegrationURL: z.string().url(),
});

export const migrationSchema = baseSchema.extend({
	type: z.literal('migration'),
	framework: z.string(),
	stub: z.boolean().default(false),
});

export const tutorialSchema = baseSchema.extend({
	type: z.literal('tutorial'),
	unitTitle: z.string().optional(),
});

export const recipeSchema = baseSchema.extend({
	type: z.literal('recipe'),
	description: z.string(),
	altTitle: z.string().optional(),
});

export const deviceSchema = z.object({
	title: z.string(),
	vendor: z.string().optional(),
	deviceImageFileName: z.string(),
	hardwareType: z.string(),
	connectivity: z
		.array(z.string())
		.or(z.string())
		.transform((v) => (Array.isArray(v) ? v : [v])),
	industry: z
		.array(z.string())
		.or(z.string())
		.transform((v) => (Array.isArray(v) ? v : [v])),
	useCase: z
		.array(z.string())
		.or(z.string())
		.transform((v) => (Array.isArray(v) ? v : [v])),
	chip: z.string().optional(),
	category: z.string().optional(),
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
	draft: z.boolean().default(false),
});

export const docsCollectionSchema = z.union([
	baseSchema,
	backendSchema,
	cmsSchema,
	integrationSchema,
	mediaSchema,
	migrationSchema,
	tutorialSchema,
	deploySchema,
	recipeSchema,
]);

const contributorSchema = z.object({
	id: z.number(),
	login: z.string(),
});

export type DocsEntryData = z.infer<typeof docsCollectionSchema>;

export type DocsEntryType = DocsEntryData['type'];

export type DocsEntry<T extends DocsEntryType> = CollectionEntry<'docs'> & {
	data: { title: string } & Extract<DocsEntryData, { type: T }>;
};

export function createIsDocsEntry<T extends DocsEntryType>(type: T) {
	return (entry: CollectionEntry<'docs'>): entry is DocsEntry<T> => (entry.data as DocsEntryData).type === type;
}

export type DeployEntry = DocsEntry<'deploy'>;

export type BackendEntry = DocsEntry<'backend'>;

export type CmsEntry = DocsEntry<'cms'>;

export type IntegrationEntry = DocsEntry<'integration'>;

export type MigrationEntry = DocsEntry<'migration'>;

export type TutorialEntry = DocsEntry<'tutorial'>;

export type RecipeEntry = DocsEntry<'recipe'>;

export type IntegrationCategory = z.infer<typeof integrationSchema>['category'];

export const isBackendEntry = createIsDocsEntry('backend');

export const isCmsEntry = createIsDocsEntry('cms');

export const isDeployEntry = createIsDocsEntry('deploy');

export const isIntegrationEntry = createIsDocsEntry('integration');

export const isTutorialEntry = createIsDocsEntry('tutorial');

export const isMediaEntry = createIsDocsEntry('media');

export const isMigrationEntry = createIsDocsEntry('migration');

export const isRecipeEntry = createIsDocsEntry('recipe');

export const collections: Record<string, ReturnType<typeof defineCollection>> = {
	blog: defineCollection({
		loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
		schema: blogSchema,
	}),
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: docsCollectionSchema }),
	}),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({
			extend: z.object({
				'checklist.or': z.string().default('or'),
				'footer.contribute': z.string().default('Contribute'),
				'footer.community': z.string().default('Community'),
				'footer.sponsor': z.string().default('Sponsor'),
				'footer.translatePage': z.string().default('Translate this page'),
				'multipleChoice.defaultCorrect': z.string().default('Correct!'),
				'multipleChoice.defaultIncorrect': z.string().default('Try again!'),
				'multipleChoice.submitLabel': z.string().default('Submit'),
				'tutorial.getReady': z.string().default('Get ready to…'),
				'tutorial.trackerLabel': z.string().default('Tutorial Tracker'),
				'tutorial.unit': z.string().default('Unit'),
				'tutorial.title.prefix': z.string().default('Tutorial - {{title}}'),
				'progress.todo': z.string().default('To do'),
				'progress.done': z.string().default('Complete'),
				'integrations.changelog': z.string().default('Changelog'),
				'integrations.renderers': z.string().default('UI Frameworks'),
				'integrations.adapters': z.string().default('SSR Adapters'),
				'integrations.others': z.string().default('Other integrations'),
				'integrations.more': z.string().default('More integrations'),
				'since.addedIn': z.string().default('Added in:'),
				'since.new': z.string().default('New'),
				'since.beta': z.string().default('Beta'),
				'backend.navTitle': z.string().default('More backend guides'),
				'cms.navTitle': z.string().default('More CMS guides'),
				'deploy.altSectionTitle': z.string().default('More deploy guides'),
				'deploy.staticTag': z.string().default('Static'),
				'deploy.ssrTag': z.string().default('SSR'),
				'media.navTitle': z.string().default('More media guides'),
				'migration.navTitle': z.string().default('More migration guides'),
				'404.content': z.string().default("We couldn't find what you were looking for."),
				'404.linkText': z.string().default('Take me home.'),
				'install.autoTab': z.string().default('Automatic CLI'),
				'install.manualTab': z.string().default('Manual Setup'),
				'starlight.title': z.string().default('Wanna build docs?'),
				'starlight.description': z.string().default('Grab our Starlight template to get started.'),
				'upgrade.implementationPR': z.string().default('Implementation PR: '),
				'leftSidebar.sponsoredBy': z.string().default('Sponsored by'),
				'recipesLink.singular': z.string().default('Related recipe:'),
				'recipesLink.plural': z.string().default('Related recipes:'),
			}),
		}),
	}),
	contributors: defineCollection({
		loader: file('src/data/contributors.json'),
		schema: contributorSchema,
	}),
	packages: defineCollection({
		loader: async () => {
			const packages = [
				'@astrojs/alpinejs',
				'@astrojs/cloudflare',
				'@astrojs/db',
				'@astrojs/markdoc',
				'@astrojs/mdx',
				'@astrojs/netlify',
				'@astrojs/node',
				'@astrojs/partytown',
				'@astrojs/preact',
				'@astrojs/react',
				'@astrojs/rss',
				'@astrojs/sitemap',
				'@astrojs/solid-js',
				'@astrojs/svelte',
				'@astrojs/vercel',
				'@astrojs/vue',
				'astro',
			];
			try {
				const url = `https://npm.antfu.dev/${packages.join('+')}`;
				const data = await fetch(url).then((res) => res.json());
				return data.map((pkg: any) => ({ id: pkg.name, version: pkg.version }));
			} catch {
				return packages.map((name) => ({ id: name, version: '0.0.0' }));
			}
		},
		schema: z.object({ version: z.string() }),
	}),
	astroContributors: defineCollection({
		loader: async () => {
			try {
				const result = await fetch('https://astro.badg.es/api/v1/top-contributors.json').then(
					(res) => res.json()
				);
				return result.data.map((contributor: any) => ({
					id: contributor.username,
					...contributor,
				}));
			} catch {
				return [];
			}
		},
		schema: z.object({ avatar_url: z.string() }),
	}),
	devices: defineCollection({
		loader: async () => {
			// loader: glob({ pattern: '**/*.mdx', base: './src/content/devices' }),
			const filePath = path.join(process.cwd(), 'src/data/devices.json');
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const data = JSON.parse(fileContent);
			return data;
		},
		schema: deviceSchema,
	}),
};
