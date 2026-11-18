import { satteri } from '@astrojs/markdown-satteri';
import starlight from '@astrojs/starlight';
import type { AstroIntegration } from 'astro';
import { defineConfig, passthroughImageService, sharpImageService } from 'astro/config';
import { redirects } from './astro.redirects';
import { sidebar } from './astro.sidebar';
import { devServerFileWatcher } from './config/integrations/dev-server-file-watcher';
import { imageGalleryLightbox } from './config/integrations/image-gallery-lightbox';
import { llmsTxt } from './config/integrations/llms-txt';
import { sitemap } from './config/integrations/sitemap';
import { youtubePosters } from './config/integrations/youtube-posters';
import { satteriBlogImages } from './config/plugins/satteri-blog-images';
import { satteriMdxIncludeHeadings } from './config/plugins/satteri-mdx-include-headings';
import { satteriTasklistEnhancer } from './config/plugins/satteri-tasklist-enhancer';
import { PROD_ORIGIN } from './src/consts';
import { prepareOgCache } from './src/pages/open-graph/_shared/og-cache';

import icon from 'astro-icon';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

/* Cloudflare Pages: https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables */
const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL;
const CF_PAGES_URL = process.env.CF_PAGES_URL;
const CF_PAGES_BRANCH = process.env.CF_PAGES_BRANCH;
/** Set by the `starlight-icon-override` Vite plugin; asserted in `assertIconOverrideApplied`. */
let iconOverrideApplied = false;

/**
 * `scripts/uv-threadpool-size.mjs` keeps the libuv threadpool at least this large. OG cards rasterise
 * with `renderAsync` on that pool, so fewer threads than concurrent page renders means the cards queue
 * instead of overlapping.
 */
const BUILD_CONCURRENCY = process.env.BUILD_CONCURRENCY ? Number(process.env.BUILD_CONCURRENCY) : 8;

interface PrerenderPlan {
	workers: number;
	/** What decided the count, for the build log. */
	source: string;
}

/**
 * Worker threads for Astro's `experimental.parallelPrerender`: the smaller of CPU threads − 1 and
 * (memory GB − 10) / 3, where memory is the total or a lower container limit (total, not free, so the
 * count is the same on every run). Below 2, pages render on the main thread. Each worker renders
 * `BUILD_CONCURRENCY` pages at once. `PRERENDER_WORKERS=0` or `1` renders on the main thread, 2 or more
 * forces that count; a value that is not a whole number is ignored with a warning.
 */
function pickPrerenderWorkers(): PrerenderPlan {
	const override = process.env.PRERENDER_WORKERS;
	if (override !== undefined) {
		if (/^\d+$/.test(override)) return { workers: Number(override), source: `set by PRERENDER_WORKERS=${override}` };
		console.warn(`PRERENDER_WORKERS="${override}" is not a whole number; picking the worker count automatically.`);
	}
	const GB = 1024 ** 3;
	const total = os.totalmem();
	const containerLimit = process.constrainedMemory();
	const memory = containerLimit > 0 ? Math.min(total, containerLimit) : total;
	const cpus = os.availableParallelism();
	const byCpu = cpus - 1;
	const byMemory = Math.floor((memory / GB - 10) / 3);
	const mem =
		memory < total
			? `${(memory / GB).toFixed(1)} GB container limit (machine ${(total / GB).toFixed(1)} GB)`
			: `${(total / GB).toFixed(1)} GB memory`;
	return {
		workers: Math.max(0, Math.min(byCpu, byMemory)),
		source: `auto: ${cpus} CPU threads, ${mem}, limited by ${byMemory < byCpu ? 'memory' : 'CPU'}`,
	};
}

const PRERENDER = pickPrerenderWorkers();

/* Netlify (kept as fallback in case of platform switch): https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

const site =
	PUBLIC_SITE_URL ||
	(CF_PAGES_BRANCH && CF_PAGES_URL ? CF_PAGES_URL : null) ||
	NETLIFY_PREVIEW_SITE ||
	`${PROD_ORIGIN}/`;

/** Fails the build if the `starlight-icon-override` Vite plugin never ran — the failure mode
 *  that produced a green build with every icon wrong when Starlight 0.42 moved to `dist/`. */
function assertIconOverrideApplied(): AstroIntegration {
	return {
		name: 'assert-icon-override-applied',
		hooks: {
			'astro:build:done': () => {
				if (iconOverrideApplied) return;
				throw new Error(
					"starlight-icon-override never matched: Starlight no longer imports './Icon.astro' " +
						'from its user components, so our Icon override is inert and any icon outside ' +
						"Starlight's built-in set would render empty."
				);
			},
		},
	};
}

/** Empties an out-of-date OG card cache once, on the main thread, before any worker thread renders a card. */
function prepareOgCacheOnce(): AstroIntegration {
	return {
		name: 'prepare-og-cache-once',
		hooks: {
			'astro:build:start': async () => {
				if (!process.env.SKIP_OG) await prepareOgCache();
			},
		},
	};
}

/** Prints the worker count the build runs with; Astro itself does not say. */
function reportPrerenderWorkers(): AstroIntegration {
	return {
		name: 'report-prerender-workers',
		hooks: {
			'astro:build:start': ({ logger }) => {
				logger.info(
					PRERENDER.workers >= 2
						? `Rendering pages on ${PRERENDER.workers} worker threads, ${BUILD_CONCURRENCY} pages each (${PRERENDER.source}). PRERENDER_WORKERS=0 turns this off.`
						: `Rendering pages on the main thread (${PRERENDER.source}).`
				);
			},
		},
	};
}

export default defineConfig({
	site,
	base: '/',
	build: {
		inlineStylesheets: 'always',
		concurrency: BUILD_CONCURRENCY,
	},
	redirects,
	experimental: {
		parallelPrerender: PRERENDER.workers >= 2 ? { workers: PRERENDER.workers } : false,
	},
	vite: {
		resolve: {
			alias: {
				'@starlight/tabs-processor': fileURLToPath(
					new URL('./node_modules/@astrojs/starlight/dist/user-components/tabs-processor.js', import.meta.url)
				),
			},
		},
		optimizeDeps: {
			include: ['photoswipe', 'photoswipe/lightbox'],
		},
		plugins: [
			{
				// Swaps Starlight's `Icon.astro` for ours, which falls back to astro-icon for
				// names outside Starlight's built-in set. Five of its user components import
				// `./Icon.astro` relatively, so the swap keys on that specifier.
				//
				// This is the one piece of Starlight coupling here that fails *silently*: when
				// 0.42 moved everything under `dist/`, the substring stopped matching, the build
				// stayed green and every icon quietly reverted to the stock component. Both guards
				// below exist to make that impossible a second time — match by the specifier and
				// verify the importer here, then refuse to finish a build where the swap never ran.
				// The second guard lives in the `assertIconOverrideApplied` integration rather than a
				// Vite `buildEnd`, which fires per environment and could throw on a pass that resolves
				// no Astro components.
				name: 'starlight-icon-override',
				enforce: 'pre',
				resolveId(id, importer) {
					if (id !== './Icon.astro' || !importer?.includes('@astrojs/starlight')) return;
					if (!importer.includes('/user-components/')) {
						throw new Error(
							`starlight-icon-override: Starlight imports './Icon.astro' from an unexpected ` +
								`path (${importer}). The override did not apply — update the matcher.`
						);
					}
					iconOverrideApplied = true;
					return fileURLToPath(new URL('./src/components/starlight/Icon.astro', import.meta.url));
				},
			},
		],
	},
	integrations: [
		assertIconOverrideApplied(),
		prepareOgCacheOnce(),
		reportPrerenderWorkers(),
		icon(),
		imageGalleryLightbox(),
		youtubePosters(),
		devServerFileWatcher(['./config/**', './astro.sidebar.ts']),
		starlight({
			title: 'Docs',
			markdown: {
				processedDirs: ['./src/content/_includes'],
			},
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
			components: {
				EditLink: './src/components/starlight/EditLink.astro',
				ContentPanel: './src/components/starlight/ContentPanel.astro',
				Hero: './src/components/starlight/Hero.astro',
				Head: './src/components/starlight/Head.astro',
				Header: './src/components/starlight/Header.astro',
				SkipLink: './src/components/starlight/SkipLink.astro',
				ThemeProvider: './src/components/starlight/ThemeProvider.astro',
				MarkdownContent: './src/components/starlight/MarkdownContent.astro',
				MobileTableOfContents: './src/components/starlight/MobileTableOfContents.astro',
				TableOfContents: './src/components/starlight/TableOfContents.astro',
				PageSidebar: './src/components/starlight/PageSidebar.astro',
				TwoColumnContent: './src/components/starlight/TwoColumnContent.astro',
				Footer: './src/components/starlight/Footer.astro',
				SiteTitle: './src/components/starlight/SiteTitle.astro',
				Search: './src/components/starlight/Search.astro',
				Sidebar: './src/components/starlight/Sidebar.astro',
				MobileMenuFooter: './src/components/starlight/MobileMenuFooter.astro',
				PageTitle: './src/components/starlight/PageTitle.astro',
				// Route-level announcements (see `src/routeData.ts`). Replaces
				// Starlight's native `banner:` frontmatter, which this site does not
				// use — pages announce through `announcement:` instead.
				Banner: './src/components/starlight/Banner.astro',
			},
			routeMiddleware: './src/routeData.ts',
			editLink: {
				baseUrl: 'https://github.com/thingsboard/thingsboard.io/edit/main',
			},
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				// uk: { label: 'Українська', lang: 'uk' }, // temporarily disabled — no translations yet
			},
			sidebar,
			customCss: ['./src/styles/_starlight-overrides.scss', './src/styles/_print.scss'],
			pagefind: false,
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.svg',
						type: 'image/svg+xml',
					},
				},
				// Override Starlight defaults: site_name uses Starlight `title:` ("Docs") and og:type
				// is hard-coded to "article" — neither is correct for our docs. Starlight's mergeHead
				// replaces same-property defaults with these.
				{ tag: 'meta', attrs: { property: 'og:site_name', content: 'ThingsBoard' } },
				{ tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
				// Starlight emits twitter:site only for an x.com entry in its `social:` option. The site keeps
				// its social links in `data/socialNetworks.ts` instead, so the tag is set here.
				{ tag: 'meta', attrs: { name: 'twitter:site', content: '@thingsboard' } },
			],
			disable404Route: true,
		}),
		sitemap(),
		llmsTxt(),
	],
	trailingSlash: 'always',
	// Our CSS counts on scoped selectors adding no specificity (`:where(.astro-…)`), so keep it set.
	scopedStyleStrategy: 'where',
	compressHTML: false,
	markdown: {
		// Sätteri, Astro 7's Rust Markdown/MDX compiler. It has no remark/rehype support;
		// these are its own hast visitors. `rehype-slug` and `remark-smartypants` are gone:
		// Sätteri generates heading ids natively (respecting an explicit `id`, same
		// github-slugger), and smart punctuation is a built-in feature.
		processor: satteri({
			features: {
				// Curly quotes and ellipses yes, `--` → en-dash no. Matches what
				// `remark-smartypants` was configured to do.
				smartPunctuation: { dashes: false },
			},
			hastPlugins: [satteriTasklistEnhancer, satteriBlogImages, satteriMdxIncludeHeadings],
		}),
	},
	image: {
		domains: ['avatars.githubusercontent.com', 'i.ytimg.com'],
		service: process.env.SKIP_IMG ? passthroughImageService() : sharpImageService(),
	},
});
