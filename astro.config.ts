import starlight from '@astrojs/starlight';
import { defineConfig, sharpImageService } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import remarkSmartypants from 'remark-smartypants';
import { redirects } from './astro.redirects';
import { sidebar } from './astro.sidebar';
import { devServerFileWatcher } from './config/integrations/dev-server-file-watcher';
import { sitemap } from './config/integrations/sitemap';
import { starlightPluginLlmsTxt } from './config/plugins/llms-txt';
import { rehypeMdxIncludeHeadings } from './config/plugins/rehype-mdx-include-headings';
import { rehypeTasklistEnhancer } from './config/plugins/rehype-tasklist-enhancer';

import icon from 'astro-icon';
import tailwind from '@astrojs/tailwind';
import svgo from 'vite-plugin-svgo';
import { fileURLToPath } from 'node:url';

/* https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables */
const NETLIFY_PREVIEW_SITE = process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL;

const site = NETLIFY_PREVIEW_SITE || 'https://thingsboard.io/';

// https://astro.build/config
export default defineConfig({
	site,
	base: '/',
	redirects,
	vite: {
		resolve: {
			alias: {
				'@starlight/icons': fileURLToPath(
					new URL('./node_modules/@astrojs/starlight/components-internals/Icons.ts', import.meta.url)
				),
				'@starlight/rehype-tabs': fileURLToPath(
					new URL(
						'./node_modules/@astrojs/starlight/user-components/rehype-tabs.ts',
						import.meta.url
					)
				),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
		plugins: [
			{
				name: 'starlight-icon-override',
				enforce: 'pre',
				resolveId(id, importer) {
					if (
						id === './Icon.astro' &&
						importer?.includes('@astrojs/starlight/user-components')
					) {
						return fileURLToPath(
							new URL('./src/components/starlight/Icon.astro', import.meta.url)
						);
					}
				},
			},
			svgo({
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								// Вимикаємо видалення viewBox (щоб не зламати aspect-ratio)
								removeViewBox: false,
								// Вимикаємо очистку ID (щоб не зламати анімації)
								cleanupIds: false,
							},
						},
					},
					// Додаткові плагіни, які ми хочемо увімкнути:
					'removeXMLNS',
					'prefixIds', // Допомагає уникнути конфліктів ID між різними SVG
				],
			}),
		],
	},
	integrations: [
		icon(),
		tailwind({ applyBaseStyles: false }),
		devServerFileWatcher([
			'./config/**', // Custom plugins and integrations
			'./astro.sidebar.ts', // Sidebar configuration file
		]),
		starlight({
			title: 'Docs',
			markdown: {
				processedDirs: ['./src/content/_includes'],
			},
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
			components: {
				EditLink: './src/components/starlight/EditLink.astro',
				Hero: './src/components/starlight/Hero.astro',
				Header: './src/components/starlight/Header.astro',
				MarkdownContent: './src/components/starlight/MarkdownContent.astro',
				MobileTableOfContents: './src/components/starlight/MobileTableOfContents.astro',
				TableOfContents: './src/components/starlight/TableOfContents.astro',
				PageSidebar: './src/components/starlight/PageSidebar.astro',
				Footer: './src/components/starlight/Footer.astro',
				SiteTitle: './src/components/starlight/SiteTitle.astro',
				Search: './src/components/starlight/Search.astro',
				Sidebar: './src/components/starlight/Sidebar.astro',
				MobileMenuFooter: './src/components/starlight/MobileMenuFooter.astro',
				PageTitle: './src/components/starlight/PageTitle.astro',
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
			],
			disable404Route: true,
			plugins: [starlightPluginLlmsTxt()],
		}),
		sitemap(),
	],
	trailingSlash: 'always',
	scopedStyleStrategy: 'where',
	compressHTML: false,
	markdown: {
		smartypants: false,
		remarkPlugins: [
			// @ts-expect-error — `remark-smartypants` type is not matching Astro's for some reason even though they both use unified's `Plugin` type
			[remarkSmartypants, { dashes: false }],
		],
		rehypePlugins: [rehypeSlug, rehypeTasklistEnhancer(), rehypeMdxIncludeHeadings()],
	},
	image: {
		domains: ['avatars.githubusercontent.com'],
		service: sharpImageService(),
	},
});
