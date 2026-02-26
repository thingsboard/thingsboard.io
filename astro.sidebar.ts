import type { StarlightUserConfig } from '@astrojs/starlight/types';

type SidebarConfig = NonNullable<StarlightUserConfig['sidebar']>;

const guideItems = (prefix: string) => [
	{
		label: 'Digital Twins',
		collapsed: true,
		items: [
			`${prefix}/digital-twins/entities`,
			`${prefix}/digital-twins/relations`,
			`${prefix}/digital-twins/attributes`,
			`${prefix}/digital-twins/time-series-data`,
		],
	},
	{
		label: 'Devices',
		collapsed: true,
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
		collapsed: true,
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
		collapsed: true,
		items: [
			`${prefix}/multi-tenancy`,
			`${prefix}/customers`,
			`${prefix}/users`,
			`${prefix}/roles`,
		],
	},
	{
		label: 'Alarms & Notifications',
		collapsed: true,
		items: [
			`${prefix}/alarms`,
			`${prefix}/alarm-rules`,
			`${prefix}/notifications`,
		],
	},
	{
		label: 'Data Processing',
		collapsed: true,
		items: [
			{
				label: 'Calculated Fields',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: `${prefix}/calculated-fields` },
					{ label: 'Simple', slug: `${prefix}/calculated-fields/simple` },
					{ label: 'Script', slug: `${prefix}/calculated-fields/script` },
					{ label: 'Propagation', slug: `${prefix}/calculated-fields/propagation` },
					{ label: 'Geofencing', slug: `${prefix}/calculated-fields/geofencing` },
					{ label: 'Entities Aggregation', slug: `${prefix}/calculated-fields/related-entities-aggregation` },
					{ label: 'Time Series Aggregation', slug: `${prefix}/calculated-fields/time-series-data-aggregation` },
				],
			},
			{
				label: 'Rule Engine',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: `${prefix}/rule-engine` },
					{ label: 'Queues', slug: `${prefix}/rule-engine/queues` },
					{ label: 'Monitoring', slug: `${prefix}/rule-engine/monitoring` },
				],
			},
			`${prefix}/rule-nodes`,
		],
	},
	{
		label: 'Reporting',
		collapsed: true,
		items: [
			`${prefix}/reporting`,
			`${prefix}/reporting/getting-started`,
			`${prefix}/reporting/scheduling`,
			`${prefix}/reporting/notifications`,
			`${prefix}/reporting/charts`,
			`${prefix}/reporting/dashboards`,
			`${prefix}/reporting/subreports`,
		],
	},
	{
		label: 'AI',
		collapsed: true,
		items: [
			`${prefix}/ai-models`,
			`${prefix}/ai-predictive-maintenance`,
			`${prefix}/local-ai-ollama`,
			`${prefix}/mcp-server`,
			`${prefix}/n8n-node`,
		],
	},
	{
		label: 'Integrations',
		collapsed: true,
		items: [
			`${prefix}/integrations`,
			`${prefix}/integrations-comparison`,
		],
	},
	{
		label: 'White-labeling',
		collapsed: true,
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
		collapsed: true,
		items: [
			{ label: 'Overview', slug: `${prefix}/mobile-app-center` },
			{ label: 'Applications', slug: `${prefix}/mobile-app-center/applications` },
			{ label: 'QR Code Widget', slug: `${prefix}/mobile-app-center/qr-code-widget` },
		],
	},
	{
		label: 'Other Features',
		collapsed: true,
		items: [
			`${prefix}/add-ons`,
			`${prefix}/edge-computing`,
			`${prefix}/trendz-analytics`,
		],
	},
	{
		label: 'Security',
		collapsed: true,
		items: [
			`${prefix}/security`,
			`${prefix}/security/api-keys`
		],
	},
	{
		label: 'Contribution',
		collapsed: true,
		items: [
			`${prefix}/contribution`,
			`${prefix}/scada-symbol-dev`,
		],
	},
	{
		label: 'Versions & Support',
		collapsed: true,
		items: [
			`${prefix}/versions-and-support`,
		],
	},
];

const recipeItems = (prefix: string) => [
	{
		label: 'Sending Data',
		collapsed: true,
		items: [
			`${prefix}/python-telemetry`,
		],
	},
	{
		label: 'Storage & Retention',
		collapsed: true,
		items: [
			`${prefix}/configure-telemetry-ttl`,
		],
	},
];

const referenceItems = (prefix: string) => [
	`${prefix}/configuration-reference`,
	{
		label: 'Widgets',
		collapsed: true,
		items: [
			`${prefix}/widgets/chart-widget`,
			`${prefix}/widgets/map-widgets`,
			`${prefix}/widgets/entity-table-widget`,
			`${prefix}/widgets/markdown-html-card`,
		],
	},
	{
		label: 'Device API',
		collapsed: true,
		items: [
			{
				label: 'HTTP API',
				collapsed: true,
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
				collapsed: true,
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
				collapsed: true,
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
				collapsed: true,
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
		collapsed: true,
		items: [
			`${prefix}/gateway-api/overview`,
			`${prefix}/gateway-api/telemetry`,
			`${prefix}/gateway-api/attributes`,
			`${prefix}/gateway-api/rpc`,
			`${prefix}/gateway-api/claiming`,
		],
	},
	{
		label: 'Rule Engine',
		collapsed: true,
		items: [
			`${prefix}/rule-engine/message-types`,
			`${prefix}/rule-engine/templatization`,
			{
				label: 'Rule Nodes',
				collapsed: true,
				items: [
					{
						label: 'Filter',
						collapsed: true,
						items: [
							`${prefix}/rule-engine/nodes/filter/alarm-status-filter`,
							`${prefix}/rule-engine/nodes/filter/asset-profile-switch`,
							`${prefix}/rule-engine/nodes/filter/check-fields-presence`,
							`${prefix}/rule-engine/nodes/filter/check-relation-presence`,
							`${prefix}/rule-engine/nodes/filter/device-profile-switch`,
							`${prefix}/rule-engine/nodes/filter/entity-type-filter`,
							`${prefix}/rule-engine/nodes/filter/entity-type-switch`,
							`${prefix}/rule-engine/nodes/filter/gps-geofencing-filter`,
							`${prefix}/rule-engine/nodes/filter/message-type-filter`,
							`${prefix}/rule-engine/nodes/filter/message-type-switch`,
							`${prefix}/rule-engine/nodes/filter/script`,
							`${prefix}/rule-engine/nodes/filter/switch`,
						],
					},
					{
						label: 'Enrichment',
						collapsed: true,
						items: [
							`${prefix}/rule-engine/nodes/enrichment/calculate-delta`,
							`${prefix}/rule-engine/nodes/enrichment/customer-attributes`,
							`${prefix}/rule-engine/nodes/enrichment/customer-details`,
							`${prefix}/rule-engine/nodes/enrichment/fetch-device-credentials`,
							`${prefix}/rule-engine/nodes/enrichment/originator-attributes`,
							`${prefix}/rule-engine/nodes/enrichment/originator-fields`,
							`${prefix}/rule-engine/nodes/enrichment/originator-telemetry`,
							`${prefix}/rule-engine/nodes/enrichment/related-device-attributes`,
							`${prefix}/rule-engine/nodes/enrichment/related-entity-data`,
							`${prefix}/rule-engine/nodes/enrichment/tenant-attributes`,
							`${prefix}/rule-engine/nodes/enrichment/tenant-details`,
						],
					},
					{
						label: 'Transformation',
						collapsed: true,
						items: [
							`${prefix}/rule-engine/nodes/transformation/change-originator`,
							`${prefix}/rule-engine/nodes/transformation/copy-key-value-pairs`,
							`${prefix}/rule-engine/nodes/transformation/deduplication`,
							`${prefix}/rule-engine/nodes/transformation/delete-key-value-pairs`,
							`${prefix}/rule-engine/nodes/transformation/duplicate-to-group`,
							`${prefix}/rule-engine/nodes/transformation/duplicate-to-group-by-name`,
							`${prefix}/rule-engine/nodes/transformation/duplicate-to-related`,
							`${prefix}/rule-engine/nodes/transformation/json-path`,
							`${prefix}/rule-engine/nodes/transformation/rename-keys`,
							`${prefix}/rule-engine/nodes/transformation/script`,
							`${prefix}/rule-engine/nodes/transformation/split-array-msg`,
							`${prefix}/rule-engine/nodes/transformation/to-email`,
						],
					},
					{
						label: 'Action',
						collapsed: true,
						items: [
							`${prefix}/rule-engine/nodes/action/add-to-group`,
							`${prefix}/rule-engine/nodes/action/assign-to-customer`,
							`${prefix}/rule-engine/nodes/action/calculated-fields`,
							`${prefix}/rule-engine/nodes/action/change-owner`,
							`${prefix}/rule-engine/nodes/action/clear-alarm`,
							`${prefix}/rule-engine/nodes/action/copy-to-view`,
							`${prefix}/rule-engine/nodes/action/create-alarm`,
							`${prefix}/rule-engine/nodes/action/create-relation`,
							`${prefix}/rule-engine/nodes/action/delay`,
							`${prefix}/rule-engine/nodes/action/delete-attributes`,
							`${prefix}/rule-engine/nodes/action/delete-relation`,
							`${prefix}/rule-engine/nodes/action/device-profile`,
							`${prefix}/rule-engine/nodes/action/device-state`,
							`${prefix}/rule-engine/nodes/action/generate-dashboard-report`,
							`${prefix}/rule-engine/nodes/action/generate-report`,
							`${prefix}/rule-engine/nodes/action/generator`,
							`${prefix}/rule-engine/nodes/action/gps-geofencing-events`,
							`${prefix}/rule-engine/nodes/action/integration-downlink`,
							`${prefix}/rule-engine/nodes/action/log`,
							`${prefix}/rule-engine/nodes/action/math-function`,
							`${prefix}/rule-engine/nodes/action/message-count`,
							`${prefix}/rule-engine/nodes/action/push-to-cloud`,
							`${prefix}/rule-engine/nodes/action/push-to-edge`,
							`${prefix}/rule-engine/nodes/action/remove-from-group`,
							`${prefix}/rule-engine/nodes/action/rest-call-reply`,
							`${prefix}/rule-engine/nodes/action/rpc-call-reply`,
							`${prefix}/rule-engine/nodes/action/rpc-call-request`,
							`${prefix}/rule-engine/nodes/action/save-attributes`,
							`${prefix}/rule-engine/nodes/action/save-timeseries`,
							`${prefix}/rule-engine/nodes/action/save-to-custom-table`,
							`${prefix}/rule-engine/nodes/action/unassign-from-customer`,
						],
					},
					{
						label: 'External',
						collapsed: true,
						items: [
							`${prefix}/rule-engine/nodes/external/ai-request`,
							`${prefix}/rule-engine/nodes/external/aws-lambda`,
							`${prefix}/rule-engine/nodes/external/aws-sns`,
							`${prefix}/rule-engine/nodes/external/aws-sqs`,
							`${prefix}/rule-engine/nodes/external/azure-iot-hub`,
							`${prefix}/rule-engine/nodes/external/gcp-pubsub`,
							`${prefix}/rule-engine/nodes/external/kafka`,
							`${prefix}/rule-engine/nodes/external/mqtt`,
							`${prefix}/rule-engine/nodes/external/rabbitmq`,
							`${prefix}/rule-engine/nodes/external/rest-api-call`,
							`${prefix}/rule-engine/nodes/external/send-email`,
							`${prefix}/rule-engine/nodes/external/send-notification`,
							`${prefix}/rule-engine/nodes/external/send-sms`,
							`${prefix}/rule-engine/nodes/external/send-to-slack`,
							`${prefix}/rule-engine/nodes/external/twilio-sms`,
							`${prefix}/rule-engine/nodes/external/twilio-voice`,
						],
					},
					{
						label: 'Flow',
						collapsed: true,
						items: [
							`${prefix}/rule-engine/nodes/flow/acknowledge`,
							`${prefix}/rule-engine/nodes/flow/checkpoint`,
							`${prefix}/rule-engine/nodes/flow/output`,
							`${prefix}/rule-engine/nodes/flow/rule-chain`,
						],
					},
					{
						label: 'Analytics',
						collapsed: true,
						items: [
							`${prefix}/rule-engine/nodes/analytics/aggregate-latest`,
							`${prefix}/rule-engine/nodes/analytics/aggregate-stream`,
							`${prefix}/rule-engine/nodes/analytics/alarms-count`,
						],
					},
				],
			},
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
				]
			},
			{
				label: 'Key concepts',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/concepts/multi-tenancy',
					'docs/concepts/digital-twin-model',
					'docs/concepts/data-processing',
					'docs/concepts/alarms-and-notifications',
					'docs/concepts/data-visualization'
				]
			}
		],
	},
	{
		label: 'Guides',
		collapsed: true,
		translations: { uk: 'Посібники' },
		items: guideItems('docs/user-guide')
	},
	{
		label: 'Recipes',
		collapsed: true,
		translations: { uk: 'Рецепти' },
		items: recipeItems('docs/recipes')
	},
	{
		label: 'Reference',
		collapsed: true,
		translations: { uk: 'Довідник' },
		items: referenceItems('docs/reference')
	}
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
					'docs/pe/concepts/alarms-and-notifications',
					'docs/pe/concepts/data-visualization'
				],
			}
		],
	},
	{
		label: 'Guides',
		collapsed: true,
		translations: { uk: 'Посібники' },
		items: guideItems('docs/pe/user-guide'),
	},
	{
		label: 'Recipes',
		collapsed: true,
		translations: { uk: 'Рецепти' },
		items: [
			...recipeItems('docs/pe/recipes'),
			{
				label: 'Access Control',
				collapsed: true,
				items: [
					'docs/pe/recipes/rbac-read-only-analyst',
					'docs/pe/recipes/rbac-customer-scoped-access',
					'docs/pe/recipes/rbac-generic-role-scope',
					'docs/pe/recipes/rbac-isolated-device-groups',
					'docs/pe/recipes/rbac-smart-buildings',
				],
			},
		],
	},
	{
		label: 'Reference',
		collapsed: true,
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
