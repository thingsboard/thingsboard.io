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
		label: 'Data Visualization',
		collapsed: true,
		items: [
			{ label: 'Key concepts', slug: `${prefix}/data-visualization` },
			`${prefix}/dashboards`,
			`${prefix}/widgets`,
			`${prefix}/time-window`,
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
		items: [`${prefix}/multi-tenancy`, `${prefix}/customers`, `${prefix}/users`, `${prefix}/roles`],
	},
	{
		label: 'Alarms & Notifications',
		collapsed: true,
		items: [`${prefix}/alarms`, `${prefix}/alarm-rules`, `${prefix}/notifications`],
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
					{
						label: 'Entities Aggregation',
						slug: `${prefix}/calculated-fields/related-entities-aggregation`,
					},
					{
						label: 'Time Series Aggregation',
						slug: `${prefix}/calculated-fields/time-series-data-aggregation`,
					},
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
			`${prefix}/reporting/getting-started`,
			`${prefix}/reporting/report-templates`,
			`${prefix}/reporting/subreports`,
			`${prefix}/reporting/scheduling`,
			`${prefix}/reporting/notifications`,
			`${prefix}/reporting/charts`,
			`${prefix}/reporting/dashboards`,
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
			`${prefix}/integrations/http`,
			`${prefix}/integrations/chirpstack`,
			`${prefix}/integrations/aws-iot`,
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
		items: [`${prefix}/add-ons`, `${prefix}/edge-computing`, `${prefix}/trendz-analytics`],
	},
	{
		label: 'Security',
		collapsed: true,
		items: [`${prefix}/security`, `${prefix}/security/two-factor-authentication`, `${prefix}/security/oauth-2-support`, `${prefix}/security/domains`, `${prefix}/security/http-over-ssl`, `${prefix}/security/audit-log`, `${prefix}/security/secrets-storage`, `${prefix}/security/api-keys`],
	},
	{
		label: 'Contribution',
		collapsed: true,
		items: [`${prefix}/contribution`, `${prefix}/scada-symbol-dev`],
	},
	{
		label: 'Versions & Support',
		collapsed: true,
		items: [
			`${prefix}/versions-and-support`,
			`${prefix}/releases-table`,
		],
	},
];

const installationItems = (prefix: string) => {
	const isPE = prefix.includes('/pe');
	return [
		{ label: 'Installation options', slug: `${prefix}/installation` },
		{
			label: 'On-premises',
			collapsed: true,
			items: [
				{
					label: 'Standalone',
					collapsed: true,
					items: [
						`${prefix}/installation/docker`,
						`${prefix}/installation/docker-windows`,
						`${prefix}/installation/ubuntu`,
						`${prefix}/installation/rhel`,
						`${prefix}/installation/rpi`,
					],
				},
				{
					label: 'Cluster',
					collapsed: true,
					items: [
						`${prefix}/installation/docker-compose-setup`,
						`${prefix}/installation/minikube-cluster-setup`,
						`${prefix}/installation/openshift-cluster-setup`,
					],
				},
			],
		},
		{
			label: 'Cloud',
			collapsed: true,
			items: [
				{
					label: 'AWS',
					collapsed: true,
					items: [
						{ label: 'AWS Installation Options', slug: `${prefix}/installation/aws-index` },
						`${prefix}/installation/aws${isPE ? '-ec2' : ''}`,
						...(isPE ? [`${prefix}/installation/aws`] : []),
						`${prefix}/installation/aws-monolith`,
						`${prefix}/installation/aws-microservices`,
					],
				},
				{
					label: 'Google Cloud',
					collapsed: true,
					items: [
						{ label: 'GCP Installation Options', slug: `${prefix}/installation/gcp-index` },
						`${prefix}/installation/gcp${isPE ? '-vm' : ''}`,
						...(isPE ? [`${prefix}/installation/gcp`] : []),
						`${prefix}/installation/gcp-monolith`,
						`${prefix}/installation/gcp-microservices`,
					],
				},
				{
					label: 'Azure',
					collapsed: true,
					items: [
						{ label: 'Azure Installation Options', slug: `${prefix}/installation/azure-index` },
						...(isPE ? [`${prefix}/installation/azure`] : []),
						`${prefix}/installation/azure-monolith`,
						`${prefix}/installation/azure-microservices`,
					],
				},
				`${prefix}/installation/digital-ocean`,
			],
		},
		{ label: 'Building from Sources', slug: `${prefix}/installation/building-from-source` },
		...(isPE
			? [
					{
						label: 'Upgrade',
						collapsed: true,
						items: [
							`${prefix}/installation/upgrade-instructions`,
							`${prefix}/installation/upgrade-from-ce`,
						],
					},
				]
			: [{ label: 'Upgrade instructions', slug: `${prefix}/installation/upgrade-instructions` }]),
	];
};

const recipeItems = (prefix: string) => [
	{
		label: 'Sending Data',
		collapsed: true,
		items: [`${prefix}/python-telemetry`],
	},
	{
		label: 'Storage & Retention',
		collapsed: true,
		items: [`${prefix}/configure-telemetry-ttl`],
	},
	{
		label: 'Alarms',
		collapsed: true,
		items: [`${prefix}/alarm-rule-tutorials`],
	},
	{
		label: 'Real-time Data',
		collapsed: true,
		items: [`${prefix}/websocket-live-telemetry`],
	},
];

const apisAndSdksItems = (prefix: string) => [
	{ label: 'APIs & SDKs', slug: `${prefix}/reference/apis-and-sdks` },
	{
		label: 'Device APIs',
		collapsed: true,
		items: [
			{
				label: 'MQTT API',
				collapsed: true,
				items: [
					`${prefix}/reference/mqtt-api/getting-connected`,
					`${prefix}/reference/mqtt-api/telemetry`,
					`${prefix}/reference/mqtt-api/attributes`,
					`${prefix}/reference/mqtt-api/rpc`,
					`${prefix}/reference/mqtt-api/claiming`,
					`${prefix}/reference/mqtt-api/provisioning`,
				],
			},
			{
				label: 'CoAP API',
				collapsed: true,
				items: [
					`${prefix}/reference/coap-api/getting-connected`,
					`${prefix}/reference/coap-api/telemetry`,
					`${prefix}/reference/coap-api/attributes`,
					`${prefix}/reference/coap-api/rpc`,
					`${prefix}/reference/coap-api/claiming`,
					`${prefix}/reference/coap-api/provisioning`,
				],
			},
			{
				label: 'HTTP API',
				collapsed: true,
				items: [
					`${prefix}/reference/http-api/getting-connected`,
					`${prefix}/reference/http-api/telemetry`,
					`${prefix}/reference/http-api/attributes`,
					`${prefix}/reference/http-api/rpc`,
					`${prefix}/reference/http-api/claiming`,
					`${prefix}/reference/http-api/provisioning`,
				],
			},
			{
				label: 'LwM2M API',
				collapsed: true,
				items: [
					`${prefix}/reference/lwm2m-api/getting-started`,
					`${prefix}/reference/lwm2m-api/data-model`,
					`${prefix}/reference/lwm2m-api/rpc-commands`,
					`${prefix}/reference/lwm2m-api/ota-updates`,
				],
			},
			{
				label: 'SNMP API',
				collapsed: true,
				items: [
					`${prefix}/reference/snmp-api/getting-connected`,
					`${prefix}/reference/snmp-api/telemetry`,
					`${prefix}/reference/snmp-api/attributes`,
					`${prefix}/reference/snmp-api/rpc`,
				],
			},
		],
	},
	{
		label: 'Device SDKs',
		collapsed: true,
		items: [
			`${prefix}/reference/python-device-sdk`,
			`${prefix}/reference/micropython-client-sdk`,
			`${prefix}/reference/circuitpython-client-sdk`,
			`${prefix}/reference/arduino-client-sdk`,
		],
	},
	{
		label: 'Gateway APIs',
		collapsed: true,
		items: [
			`${prefix}/reference/gateway-api/overview`,
			`${prefix}/reference/gateway-api/telemetry`,
			`${prefix}/reference/gateway-api/attributes`,
			`${prefix}/reference/gateway-api/rpc`,
			`${prefix}/reference/gateway-api/claiming`,
			`${prefix}/reference/sparkplug-api`,
		],
	},
	{
		label: 'Gateway SDKs',
		collapsed: true,
		items: [`${prefix}/reference/python-gateway-sdk`],
	},
	{
		label: 'Server-side APIs',
		collapsed: true,
		items: [
			`${prefix}/reference/rest-api`,
			`${prefix}/reference/websocket-api`,
		],
	},
	{
		label: 'Server-side REST Clients',
		collapsed: true,
		items: [
			`${prefix}/reference/java-rest-client`,
			`${prefix}/reference/python-rest-client`,
		],
	},
	{
		label: 'Mobile',
		collapsed: true,
		items: [
			`${prefix}/reference/dart-client`,
			`${prefix}/reference/mobile-app`,
		],
	},
];

const referenceItems = (prefix: string, extraConfigItems: SidebarConfig = []) => [
	{
		label: 'Architecture',
		collapsed: true,
		items: [
			{ label: 'Overview', slug: `${prefix}/architecture` },
			`${prefix}/architecture/monolithic`,
			`${prefix}/architecture/microservices`,
			`${prefix}/architecture/queue`,
			`${prefix}/architecture/actor-system`,
			`${prefix}/architecture/caching`,
			`${prefix}/architecture/database`,
			`${prefix}/architecture/deployment-scenarios`,
			`${prefix}/architecture/performance`,
		],
	},
	{
		label: 'Configuration',
		collapsed: true,
		items: [
			`${prefix}/configuration/how-to-change-config`,
			`${prefix}/configuration/core-rule-engine-config`,
			`${prefix}/configuration/http-transport-config`,
			`${prefix}/configuration/mqtt-transport-config`,
			`${prefix}/configuration/coap-transport-config`,
			`${prefix}/configuration/lwm2m-transport-config`,
			`${prefix}/configuration/snmp-transport-config`,
			`${prefix}/configuration/vc-executor-config`,
			...extraConfigItems,
		],
	},
	{
		label: 'Widgets',
		collapsed: true,
		items: [
			`${prefix}/widgets/widget-library`,
			`${prefix}/widgets/chart-widget`,
			`${prefix}/widgets/map-widgets`,
			`${prefix}/widgets/entity-table-widget`,
			`${prefix}/widgets/markdown-html-card`,
		],
	},
	{
		label: 'Notification System',
		collapsed: true,
		items: [
			`${prefix}/notification-system/template-parameters`,
			`${prefix}/notification-system/rule-triggers`,
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
							{ label: 'Overview', slug: `${prefix}/rule-engine/nodes/filter` },
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
							{ label: 'Overview', slug: `${prefix}/rule-engine/nodes/enrichment` },
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
							{ label: 'Overview', slug: `${prefix}/rule-engine/nodes/transformation` },
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
							{ label: 'Overview', slug: `${prefix}/rule-engine/nodes/action` },
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
							{ label: 'Overview', slug: `${prefix}/rule-engine/nodes/external` },
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
							{ label: 'Overview', slug: `${prefix}/rule-engine/nodes/flow` },
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
							{ label: 'Overview', slug: `${prefix}/rule-engine/nodes/analytics` },
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

const mainSidebarItems = (prefix: string, extraRecipeItems: SidebarConfig = [], referenceConfigItems: SidebarConfig = []): SidebarConfig => [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			prefix,
			{
				label: 'Welcome to IoT!',
				translations: { uk: 'Новий проект' },
				items: [`${prefix}/why-thingsboard`, `${prefix}/tutorial/getting-started`],
			},
			{
				label: 'Key concepts',
				translations: { uk: 'Новий проект' },
				items: [
					`${prefix}/concepts/multi-tenancy`,
					`${prefix}/concepts/digital-twin-model`,
					`${prefix}/concepts/data-processing`,
					`${prefix}/concepts/alarms-and-notifications`,
					`${prefix}/concepts/data-visualization`,
				],
			},
		],
	},
	{
		label: 'Guides',
		collapsed: true,
		translations: { uk: 'Посібники' },
		items: guideItems(`${prefix}/user-guide`),
	},
	{
		label: 'Recipes',
		collapsed: true,
		translations: { uk: 'Рецепти' },
		items: [...recipeItems(`${prefix}/recipes`), ...extraRecipeItems],
	},
	{
		label: 'Installation',
		collapsed: true,
		items: installationItems(prefix),
	},
	{
		label: 'APIs & SDKs',
		collapsed: true,
		items: apisAndSdksItems(prefix),
	},
	{
		label: 'Reference',
		collapsed: true,
		translations: { uk: 'Довідник' },
		items: referenceItems(`${prefix}/reference`, referenceConfigItems),
	},
];

export const opensourceSidebar: SidebarConfig = mainSidebarItems('docs', [], []);

/** Professional Edition documentation sidebar (pages at /docs/pe/) */
export const peSidebar: SidebarConfig = mainSidebarItems('docs/pe', [
	{
		label: 'Reporting',
		collapsed: true,
		items: [
			'docs/pe/recipes/reporting-embed-dashboard',
			'docs/pe/recipes/reporting-line-chart-temperature',
			'docs/pe/recipes/reporting-subreport-daily-alarms',
			'docs/pe/recipes/reporting-alarm-notification',
		],
	},
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
], [
	'docs/pe/reference/configuration/ie-executor-config',
	'docs/pe/reference/configuration/report-service-config',
]);

/** Cloud (PaaS) documentation sidebar (pages at /docs/paas/) */
export const paasSidebar: SidebarConfig = [
	{
		label: 'Getting Started NA',
		translations: { uk: 'Початок роботи' },
		items: ['docs/paas/getting-started'],
	},
	{
		label: 'Guides',
		collapsed: true,
		items: [
			{
				label: 'Security',
				collapsed: true,
				items: ['docs/paas/user-guide/security/two-factor-authentication', 'docs/paas/user-guide/security/oauth-2-support', 'docs/paas/user-guide/security/domains', 'docs/paas/user-guide/security/audit-log', 'docs/paas/user-guide/security/secrets-storage', 'docs/paas/user-guide/security/api-keys'],
			},
		],
	},
];

export const paasEuSidebar: SidebarConfig = [
	{
		label: 'Getting Started EU',
		translations: { uk: 'Початок роботи' },
		items: ['docs/paas/eu/getting-started'],
	},
	{
		label: 'Guides',
		collapsed: true,
		items: [
			{
				label: 'Security',
				collapsed: true,
				items: ['docs/paas/eu/user-guide/security/two-factor-authentication', 'docs/paas/eu/user-guide/security/oauth-2-support', 'docs/paas/eu/user-guide/security/domains', 'docs/paas/eu/user-guide/security/audit-log', 'docs/paas/eu/user-guide/security/secrets-storage', 'docs/paas/eu/user-guide/security/api-keys'],
			},
		],
	},
];

/** Edge Community Edition sidebar (pages at /docs/edge/) */
export const edgeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			'docs/edge',
			{
				label: 'Welcome to IoT!',
				items: ['docs/edge/why-thingsboard-edge', 'docs/edge/getting-started'],
			},
			{
				label: 'Key concepts',
				items: [
					'docs/edge/key-concepts/edge-management',
				],
			},
		],
	},
];

/** Edge Professional Edition sidebar (pages at /docs/edge/pe/) */
export const edgePeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			'docs/edge/pe',
			{
				label: 'Welcome to IoT!',
				items: ['docs/edge/pe/why-thingsboard-edge', 'docs/edge/pe/getting-started'],
			},
			{
				label: 'Key concepts',
				items: [
					'docs/edge/pe/key-concepts/edge-management',
				],
			},
		],
	},
];

/** IoT Gateway sidebar (pages at /docs/iot-gateway/) */
export const gwSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			'docs/iot-gateway',
			{
				label: 'What is ThingsBoard IoT Gateway?',
				items: [
					'docs/iot-gateway/architecture',
					'docs/iot-gateway/features-overview',
					'docs/iot-gateway/getting-started',
				],
			},
		],
	},
	{
		label: 'Installation',
		translations: { uk: 'Встановлення' },
		items: ['docs/iot-gateway/installation', 'docs/iot-gateway/install/upgrade-instructions'],
	},
	{
		label: 'Configuration',
		translations: { uk: 'Конфігурація' },
		items: ['docs/iot-gateway/config/general'],
	},
	{
		label: 'Connectors',
		translations: { uk: 'Конектори' },
		items: [
			'docs/iot-gateway/config/mqtt',
			'docs/iot-gateway/config/modbus',
			'docs/iot-gateway/config/opc-ua',
			'docs/iot-gateway/config/bacnet',
			'docs/iot-gateway/config/rest',
			'docs/iot-gateway/config/request',
			'docs/iot-gateway/config/ble',
			'docs/iot-gateway/config/can',
			'docs/iot-gateway/config/ftp',
			'docs/iot-gateway/config/knx',
			'docs/iot-gateway/config/odbc',
			'docs/iot-gateway/config/ocpp',
			'docs/iot-gateway/config/snmp',
			'docs/iot-gateway/config/socket',
			'docs/iot-gateway/config/xmpp',
		],
	},
	{
		label: 'Features',
		translations: { uk: 'Функції' },
		items: [
			'docs/iot-gateway/features/remote-configuration',
			'docs/iot-gateway/features/remote-shell',
			'docs/iot-gateway/features/report-strategy',
			'docs/iot-gateway/features/reserved-rpc',
			'docs/iot-gateway/features/service-rpc-methods',
			'docs/iot-gateway/features/device-renaming',
			'docs/iot-gateway/features/provisioning',
		],
	},
	{
		label: 'Customization',
		translations: { uk: 'Налаштування' },
		items: [
			'docs/iot-gateway/custom',
			'docs/iot-gateway/custom/methods-and-datatypes',
			'docs/iot-gateway/custom/serial-connector',
		],
	},
	{
		label: 'Roadmap',
		translations: { uk: 'Дорожня карта' },
		items: [{ slug: 'docs/iot-gateway/roadmap' }],
	},
	{
		label: 'Need help?',
		translations: { uk: 'Допомога' },
		items: ['docs/iot-gateway/help'],
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
		items: [
			'docs/trendz',
			{
				label: 'Key concepts',
				items: ['docs/trendz/concepts/business-entities'],
			},
		],
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
