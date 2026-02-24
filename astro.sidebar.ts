import type { StarlightUserConfig } from '@astrojs/starlight/types';

type SidebarConfig = NonNullable<StarlightUserConfig['sidebar']>;

const guideItems = (prefix: string) => [
	{
		label: 'Digital Twins',
		items: [
			`${prefix}/digital-twins/entities`,
			`${prefix}/digital-twins/relations`,
			`${prefix}/digital-twins/attributes`,
			`${prefix}/digital-twins/time-series-data`,
		],
	},
	{
		label: 'Devices',
		items: [
			`${prefix}/devices`,
			`${prefix}/device-profiles`,
			`${prefix}/connectivity-guide`,
			`${prefix}/connectivity-status`,
			`${prefix}/claiming`,
			`${prefix}/provisioning`,
			`${prefix}/ota-updates`,
			`${prefix}/command-and-control`,
		],
	},
	{
		label: 'Dashboards',
		items: [
			`${prefix}/dashboards`,
			`${prefix}/widgets`,
			`${prefix}/widget-library`,
			`${prefix}/aliases`,
			`${prefix}/layouts`,
			`${prefix}/actions`,
			`${prefix}/scada`,
			`${prefix}/units`,
		],
	},
	{
		label: 'Customers & Users',
		items: [
			`${prefix}/multi-tenancy`,
			`${prefix}/customers`,
			`${prefix}/users`,
			`${prefix}/roles`,
		],
	},
	{
		label: 'Alarms & Notifications',
		items: [
			`${prefix}/alarms`,
			`${prefix}/alarm-rules`,
			`${prefix}/notifications`,
		],
	},
	{
		label: 'Data Processing',
		items: [
			`${prefix}/calculated-fields`,
			`${prefix}/rule-engine`,
			`${prefix}/rule-nodes`,
		],
	},
	{
		label: 'Reporting',
		items: [
			`${prefix}/reporting`,
		],
	},
	{
		label: 'AI',
		items: [
			`${prefix}/ai-models`,
			`${prefix}/mcp-server`,
			`${prefix}/local-ai-ollama`,
			`${prefix}/n8n-node`,
		],
	},
	{
		label: 'Integrations',
		items: [
			`${prefix}/integrations`,
			`${prefix}/integrations-comparison`,
		],
	},
	{
		label: 'White-labeling',
		items: [
			`${prefix}/white-labeling-general`,
			`${prefix}/white-labeling-login`,
			`${prefix}/white-labeling-mail`,
			`${prefix}/white-labeling-translation`,
			`${prefix}/white-labeling-menu`,
		],
	},
	{
		label: 'Mobile App Center',
		items: [
			`${prefix}/mobile-app-center`,
		],
	},
	{
		label: 'Other Features',
		items: [
			`${prefix}/add-ons`,
			`${prefix}/edge-computing`,
			`${prefix}/trendz-analytics`,
		],
	},
	{
		label: 'Security',
		items: [
			`${prefix}/security`,
		],
	},
	{
		label: 'Contribution',
		items: [
			`${prefix}/contribution`,
			`${prefix}/scada-symbol-dev`,
		],
	},
	{
		label: 'Versions & Support',
		items: [
			`${prefix}/versions-and-support`,
		],
	},
];

const recipeItems = (prefix: string) => [
	{
		label: 'Sending Data',
		items: [
			`${prefix}/python-telemetry`,
		],
	},
	{
		label: 'Storage & Retention',
		items: [
			`${prefix}/configure-telemetry-ttl`,
		],
	},
];

const referenceItems = (prefix: string) => [
	`${prefix}/configuration-reference`,
	{
		label: 'Device API',
		items: [
			{
				label: 'HTTP API',
				items: [
					`${prefix}/http-api/getting-connected`,
					`${prefix}/http-api/telemetry`,
					`${prefix}/http-api/attributes`,
					`${prefix}/http-api/rpc`,
					`${prefix}/http-api/claiming`,
					`${prefix}/http-api/provisioning`,
				],
			},
			{
				label: 'CoAP API',
				items: [
					`${prefix}/coap-api/getting-connected`,
					`${prefix}/coap-api/telemetry`,
					`${prefix}/coap-api/attributes`,
					`${prefix}/coap-api/rpc`,
					`${prefix}/coap-api/claiming`,
					`${prefix}/coap-api/provisioning`,
				],
			},
			{
				label: 'MQTT API',
				items: [
					`${prefix}/mqtt-api/getting-connected`,
					`${prefix}/mqtt-api/telemetry`,
					`${prefix}/mqtt-api/attributes`,
					`${prefix}/mqtt-api/rpc`,
					`${prefix}/mqtt-api/claiming`,
					`${prefix}/mqtt-api/provisioning`,
					`${prefix}/sparkplug-api`,
				],
			},
			{
				label: 'LwM2M API',
			items: [
				`${prefix}/lwm2m-api/getting-started`,
				`${prefix}/lwm2m-api/data-model`,
				`${prefix}/lwm2m-api/rpc-commands`,
				`${prefix}/lwm2m-api/ota-updates`,
			],
		},
		],
	},
	{
		label: 'Gateway API',
		items: [
			`${prefix}/gateway-api/overview`,
			`${prefix}/gateway-api/telemetry`,
			`${prefix}/gateway-api/attributes`,
			`${prefix}/gateway-api/rpc`,
			`${prefix}/gateway-api/claiming`,
		],
	},
];

export const opensourceSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			'docs',
			{
				label: 'Welcome to IoT!',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/why-thingsboard',
					'docs/tutorial/getting-started'
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
		],
	},
	{
		label: 'Guides',
		translations: { uk: 'Посібники' },
		items: guideItems('docs/user-guide'),
	},
	{
		label: 'Recipes',
		translations: { uk: 'Рецепти' },
		items: recipeItems('docs/recipes'),
	},
	{
		label: 'Reference',
		translations: { uk: 'Довідник' },
		items: referenceItems('docs/reference'),
	},
];

/** Professional Edition documentation sidebar (pages at /docs/pe/) */
export const peSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			'docs/pe',
			{
				label: 'Welcome to IoT!',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/pe/why-thingsboard',
					'docs/pe/tutorial/getting-started',
				],
			},
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
		label: 'Guides',
		translations: { uk: 'Посібники' },
		items: guideItems('docs/pe/user-guide'),
	},
	{
		label: 'Recipes',
		translations: { uk: 'Рецепти' },
		items: recipeItems('docs/pe/recipes'),
	},
	{
		label: 'Reference',
		translations: { uk: 'Довідник' },
		items: referenceItems('docs/pe/reference'),
	},
];

/** Cloud (PaaS) documentation sidebar (pages at /docs/paas/) */
export const paasSidebar: SidebarConfig = [
	{
		label: 'Getting Started NA',
		translations: { uk: 'Початок роботи' },
		items: ['docs/paas/getting-started'],
	},
];

export const paasEuSidebar: SidebarConfig = [
	{
		label: 'Getting Started EU',
		translations: { uk: 'Початок роботи' },
		items: ['docs/paas/eu/getting-started'],
	},
];

/** Edge Community Edition sidebar (pages at /docs/edge/) */
export const edgeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/edge'],
	},
];

/** Edge Professional Edition sidebar (pages at /docs/edge/pe/) */
export const edgePeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/edge/pe'],
	},
];

/** IoT Gateway sidebar (pages at /docs/iot-gateway/) */
export const gwSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/iot-gateway'],
	},
];

/** TBMQ Community Broker sidebar (pages at /docs/mqtt-broker/) */
export const tbmqSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/mqtt-broker'],
	},
];

/** TBMQ PE Broker sidebar (pages at /docs/mqtt-broker/pe/) */
export const tbmqPeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/mqtt-broker/pe'],
	},
];

/** Mobile Application sidebar (pages at /docs/mobile/) */
export const mobileSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/mobile'],
	},
];

/** Mobile PE sidebar (pages at /docs/mobile/pe/) */
export const mobilePeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/mobile/pe'],
	},
];

/** Trendz Analytics sidebar (pages at /docs/trendz/) */
export const trendzSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/trendz'],
	},
];

/** License Server sidebar (pages at /docs/license-server/) */
export const licenseSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/license-server'],
	},
];

/**
 * Combined sidebar configuration.
 * Route middleware in routeData.ts filters this to show only
 * the relevant version's sidebar items.
 */
export const sidebar: SidebarConfig = [
	...opensourceSidebar,
	...peSidebar,
	...paasSidebar,
	...paasEuSidebar,
	...edgeSidebar,
	...edgePeSidebar,
	...gwSidebar,
	...tbmqSidebar,
	...tbmqPeSidebar,
	...mobileSidebar,
	...mobilePeSidebar,
	...trendzSidebar,
	...licenseSidebar,
];
