import type { StarlightUserConfig } from '@astrojs/starlight/types';

type SidebarConfig = NonNullable<StarlightUserConfig['sidebar']>;

export const opensourceSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			'docs/introduction',
			{
				label: 'Welcome to IoT!',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/why-thingsboard',
					'docs/tutorial/0-introduction'
				],
			},
			{
				label: 'Key concepts',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/concepts/multi-tenancy',
					'docs/concepts/digital-twin-model',
					'docs/concepts/data-processing',
					'docs/concepts/alerts-and-notifications',
					'docs/concepts/data-visualization'
				],
			}
			// ,
			// {
			// 	label: 'Configuration',
			// 	translations: { uk: 'Конфігурація' },
			// 	items: [
			// 		'docs/guides/configuring-astro',
			// 		'docs/editor-setup',
			// 		'docs/guides/typescript',
			// 		'docs/guides/environment-variables',
			// 		'docs/guides/build-with-ai',
			// 		'docs/guides/dev-toolbar',
			// 	],
			// }
		],
	},
	{
		label: 'Guides',
		translations: { uk: 'Посібники' },
		items: [
			{
				label: 'Routing',
				translations: { uk: 'Маршрутизація' },
				items: [
					'docs/basics/astro-pages',
					'docs/guides/routing',
					'docs/guides/endpoints',
					'docs/guides/middleware',
					'docs/guides/internationalization',
					'docs/guides/prefetch',
					'docs/guides/view-transitions',
				],
			},
			{
				label: 'UI',
				translations: { uk: 'Інтерфейс' },
				items: [
					'docs/basics/astro-components',
					'docs/basics/layouts',
					'docs/guides/styling',
					'docs/guides/fonts',
					'docs/guides/syntax-highlighting',
					'docs/guides/client-side-scripts',
					'docs/guides/framework-components',
				],
			},
			{
				label: 'Content',
				translations: { uk: 'Контент' },
				items: [
					'docs/guides/markdown-content',
					'docs/guides/content-collections',
					'docs/guides/images',
					'docs/guides/data-fetching',
					'docs/guides/astro-db',
				],
			},
			'docs/guides/troubleshooting',
			'docs/contribute',
		],
	},
	{
		label: 'Reference',
		translations: { uk: 'Довідник' },
		items: [
			'docs/reference/configuration-reference',
			'docs/reference/cli-reference',
			'docs/reference/api-reference',
			'docs/reference/error-reference',
		],
	},
];

/** Professional Edition documentation sidebar (pages at /docs/pe/) */
export const peSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			'docs/pe/getting-started',
			{
				label: 'Key concepts',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/pe/concepts/multi-tenancy',
					'docs/pe/concepts/digital-twin-model',
					'docs/pe/concepts/data-processing',
					'docs/pe/concepts/alerts-and-notifications',
					'docs/pe/concepts/data-visualization'
				],
		  }
		],
	},
	{
		label: 'PE Features',
		translations: { uk: 'Функції PE' },
		autogenerate: { directory: 'docs/pe/guides' },
	},
];

/** Cloud (PaaS) documentation sidebar (pages at /docs/paas/) */
export const paasSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/paas/getting-started'],
	},
	{
		label: 'Cloud Features',
		translations: { uk: 'Функції Cloud' },
		autogenerate: { directory: 'docs/paas/guides' },
	},
];

/**
 * Combined sidebar configuration.
 * Route middleware in routeData.ts filters this to show only
 * the relevant version's sidebar items.
 */
export const sidebar: SidebarConfig = [...opensourceSidebar, ...peSidebar, ...paasSidebar];
