import type { StarlightUserConfig } from '@astrojs/starlight/types';

type SidebarConfig = NonNullable<StarlightUserConfig['sidebar']>;

const guideItems = (prefix: string, { isPE = false } = {}) => [
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
		label: 'Devices & Assets',
		collapsed: true,
		items: [
			`${prefix}/devices`,
			`${prefix}/device-profiles`,
			`${prefix}/connectivity-guide`,
			`${prefix}/assets`,
			`${prefix}/asset-profiles`,
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
		items: [`${prefix}/multi-tenancy`, `${prefix}/customers`, `${prefix}/users`, `${prefix}/roles`, ...(isPE ? [`${prefix}/groups`] : [])],
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
			{ label: 'General', slug: `${prefix}/white-labeling-general` },
			{ label: 'Login', slug: `${prefix}/white-labeling-login` },
			{ label: 'Mail Templates', slug: `${prefix}/white-labeling-mail` },
			{ label: 'Custom Translation', slug: `${prefix}/white-labeling-translation` },
			{ label: 'Custom Menu', slug: `${prefix}/white-labeling-menu` },
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
		items: [`${prefix}/image-gallery`, `${prefix}/version-control`, `${prefix}/entity-views`, `${prefix}/scheduler`],
	},
	{
		label: 'Add-ons',
		collapsed: true,
		items: [`${prefix}/add-ons`, `${prefix}/edge-computing`, `${prefix}/trendz-analytics`],
	},
	{
		label: 'Security',
		collapsed: true,
		items: [
			{ label: 'Overview', slug: `${prefix}/security/overview` },
			{
				label: 'Authentication',
				collapsed: true,
				items: [
					`${prefix}/security/two-factor-authentication`,
					`${prefix}/security/oauth-2-support`,
					`${prefix}/security/self-registration`,
					`${prefix}/security/api-keys`,
				],
			},
			{
				label: 'Infrastructure',
				collapsed: true,
				items: [
					`${prefix}/security/http-over-ssl`,
					`${prefix}/security/domains`,
				],
			},
			{
				label: 'Administration',
				collapsed: true,
				items: [
					{ label: 'Security settings', slug: `${prefix}/security` },
					`${prefix}/security/audit-log`,
					`${prefix}/security/secrets-storage`,
				],
			},
		],
	},
	{
		label: 'Contribution',
		collapsed: true,
		items: [
			`${prefix}/contribution/rule-node-development`,
			`${prefix}/scada-symbol-dev`,
		],
	},
	{
		label: 'Releases',
		collapsed: true,
		items: [
			{ label: 'Release Policy', slug: `${prefix}/versions-and-support` },
			{ label: 'Release Table', slug: `${prefix}/releases-table` },
			`${prefix}/roadmap`,
		],
	},
];

const edgeInstallationItems = (prefix: string) => [
	{ label: 'Installation options', slug: `${prefix}/installation` },
	{
		label: 'Single node',
		items: [
			`${prefix}/installation/docker`,
			`${prefix}/installation/docker-windows`,
			`${prefix}/installation/ubuntu`,
			`${prefix}/installation/rhel`,
			`${prefix}/installation/rpi`,
			`${prefix}/installation/windows`,
		],
	},
	{
		label: 'Cluster',
		items: [
			`${prefix}/installation/docker-compose-setup`,
		],
	},
	{ label: 'Building from Sources', slug: `${prefix}/installation/building-from-source` },
	{ label: 'Upgrade instructions', slug: `${prefix}/installation/upgrade-instructions` },
];

const installationItems = (prefix: string) => {
	const isPE = prefix.includes('/pe');
	return [
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
			`${prefix}/reference/data-query-api`,
			`${prefix}/reference/alarm-query-api`,
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

const referenceItems = (prefix: string, extraConfigItems: SidebarConfig = []) => {
	const basePrefix = prefix.replace('/reference', '');
	return [
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
			`${prefix}/configuration/js-executor-config`,
			...extraConfigItems,
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
	{
		label: 'Notification System',
		collapsed: true,
		items: [
			`${prefix}/notification-system/template-parameters`,
			`${prefix}/notification-system/rule-triggers`,
			`${basePrefix}/user-guide/ui/mail-settings`,
			`${basePrefix}/user-guide/ui/sms-provider-settings`,
			`${basePrefix}/user-guide/ui/slack-settings`,
			`${basePrefix}/user-guide/ui/microsoft-teams-settings`,
		],
	},
	{
		label: 'TBEL',
		collapsed: true,
		items: [
			{ label: 'Overview', slug: `${basePrefix}/user-guide/tbel` },
			`${basePrefix}/user-guide/tbel/language-guide`,
			`${basePrefix}/user-guide/tbel/helper-functions`,
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
];
};

const mainSidebarItems = (prefix: string, extraRecipeItems: SidebarConfig = [], referenceConfigItems: SidebarConfig = []): SidebarConfig => [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
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
		items: guideItems(`${prefix}/user-guide`, { isPE: prefix.includes('/pe') }),
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
	{
		label: 'White-labeling',
		collapsed: true,
		items: [
			'docs/pe/recipes/white-labeling-translate-dashboard',
			'docs/pe/recipes/white-labeling-html-value-card',
			'docs/pe/recipes/white-labeling-post-processing',
		],
	},
], [
	'docs/pe/reference/configuration/ie-executor-config',
	'docs/pe/reference/configuration/report-service-config',
]);

/** Cloud (PaaS) documentation sidebar (pages at /docs/paas/) */
export const paasSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to IoT!',
				translations: { uk: 'Новий проект' },
				items: ['docs/paas/why-thingsboard', 'docs/paas/tutorial/getting-started'],
			},
			{
				label: 'Key concepts',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/paas/concepts/multi-tenancy',
					'docs/paas/concepts/digital-twin-model',
					'docs/paas/concepts/data-processing',
					'docs/paas/concepts/alarms-and-notifications',
					'docs/paas/concepts/data-visualization',
				],
			},
		],
	},
	{
		label: 'Guides',
		collapsed: true,
		items: [
			{
				label: 'Security',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/paas/user-guide/security/overview' },
					{
						label: 'Authentication',
						collapsed: true,
						items: [
							'docs/paas/user-guide/security/two-factor-authentication',
							'docs/paas/user-guide/security/oauth-2-support',
							'docs/paas/user-guide/security/self-registration',
							'docs/paas/user-guide/security/api-keys',
						],
					},
					{
						label: 'Administration',
						collapsed: true,
						items: [
							'docs/paas/user-guide/security/domains',
							'docs/paas/user-guide/security/audit-log',
							'docs/paas/user-guide/security/secrets-storage',
						],
					},
				],
			},
		],
	},
];

export const paasEuSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to IoT!',
				translations: { uk: 'Новий проект' },
				items: ['docs/paas/eu/why-thingsboard', 'docs/paas/eu/tutorial/getting-started'],
			},
			{
				label: 'Key concepts',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/paas/eu/concepts/multi-tenancy',
					'docs/paas/eu/concepts/digital-twin-model',
					'docs/paas/eu/concepts/data-processing',
					'docs/paas/eu/concepts/alarms-and-notifications',
					'docs/paas/eu/concepts/data-visualization',
				],
			},
		],
	},
	{
		label: 'Guides',
		collapsed: true,
		items: [
			{
				label: 'Security',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/paas/eu/user-guide/security/overview' },
					{
						label: 'Authentication',
						collapsed: true,
						items: [
							'docs/paas/eu/user-guide/security/two-factor-authentication',
							'docs/paas/eu/user-guide/security/oauth-2-support',
							'docs/paas/eu/user-guide/security/self-registration',
							'docs/paas/eu/user-guide/security/api-keys',
						],
					},
					{
						label: 'Administration',
						collapsed: true,
						items: [
							'docs/paas/eu/user-guide/security/domains',
							'docs/paas/eu/user-guide/security/audit-log',
							'docs/paas/eu/user-guide/security/secrets-storage',
						],
					},
				],
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
	{
		label: 'Installation',
		items: edgeInstallationItems('docs/edge'),
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
	{
		label: 'Installation',
		items: edgeInstallationItems('docs/edge/pe'),
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
		items: [
			'docs/iot-gateway/installation',
			'docs/iot-gateway/installation/deb-installation',
			'docs/iot-gateway/installation/docker-installation',
			'docs/iot-gateway/installation/docker-windows',
			'docs/iot-gateway/installation/rpm-installation',
			'docs/iot-gateway/installation/pip-installation',
			'docs/iot-gateway/installation/source-installation',
			'docs/iot-gateway/installation/upgrade-instructions',
		],
	},
	{
		label: 'Configuration',
		translations: { uk: 'Конфігурація' },
		items: ['docs/iot-gateway/config/general', 'docs/iot-gateway/features/remote-configuration'],
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

const tbmqGuideItems = (prefix: string): SidebarConfig => {
	const isPE = prefix.includes('/pe');
	return [
		{
			label: 'Security',
			collapsed: true,
			items: [
				{ label: 'Overview', slug: `${prefix}/security/overview` },
				{ label: 'MQTTS', slug: `${prefix}/security/mqtts` },
				{ label: 'HTTPS', slug: `${prefix}/security/https` },
				{ label: 'MQTT listeners', slug: `${prefix}/security/listeners` },
				{
					label: 'Authentication',
					collapsed: true,
					items: [
						{ label: 'Basic', slug: `${prefix}/security/authentication/basic` },
						{ label: 'X.509 certificate chain', slug: `${prefix}/security/authentication/x509` },
						{ label: 'JWT', slug: `${prefix}/security/authentication/jwt` },
						{ label: 'SCRAM', slug: `${prefix}/security/authentication/scram` },
						{ label: 'HTTP', slug: `${prefix}/security/authentication/http` },
					],
				},
				...(isPE
					? [
							{ label: 'OAuth 2.0', slug: `${prefix}/security/oauth-2-support` },
							{ label: 'Domains', slug: `${prefix}/security/domains` },
							{ label: 'Role-based access control', slug: `${prefix}/security/rbac` },
						]
					: []),
			],
		},
		{
			label: 'MQTT essentials',
			collapsed: true,
			items: [
				{ label: 'MQTT protocol', slug: `${prefix}/user-guide/mqtt-protocol` },
				{ label: 'MQTT broker', slug: `${prefix}/user-guide/mqtt-broker` },
				{ label: 'Topics and wildcards', slug: `${prefix}/user-guide/topics` },
				{ label: 'Quality of service (QoS)', slug: `${prefix}/user-guide/qos` },
				{ label: 'Non-persistent and persistent sessions', slug: `${prefix}/user-guide/clean-persistent-sessions` },
				{ label: 'MQTT over WebSocket', slug: `${prefix}/user-guide/mqtt-over-ws` },
				{ label: 'Shared subscriptions', slug: `${prefix}/user-guide/shared-subscriptions` },
				{ label: 'Retained messages', slug: `${prefix}/user-guide/retained-messages` },
				{ label: 'Last will and testament', slug: `${prefix}/user-guide/last-will` },
				{ label: 'Keep alive', slug: `${prefix}/user-guide/keep-alive` },
			],
		},
		{ label: 'Integration with ThingsBoard', slug: `${prefix}/user-guide/integrations/how-to-connect-thingsboard-to-tbmq` },
		{
			label: 'Broker operations',
			collapsed: true,
			items: [
				{ label: 'TBMQ client type', slug: `${prefix}/user-guide/tbmq-client-type` },
				{ label: 'Blocked clients', slug: `${prefix}/other/blocked-client` },
				{ label: 'Backpressure', slug: `${prefix}/user-guide/backpressure` },
				{ label: 'Msg delivery strategies', slug: `${prefix}/other/msg-delivery-strategy` },
				{ label: 'PROXY protocol', slug: `${prefix}/other/proxy-protocol` },
				{ label: 'Health API', slug: `${prefix}/other/health` },
				{ label: 'Bulk provisioning', slug: `${prefix}/other/bulk-provisioning` },
			],
		},
		{
			label: 'Integrations',
			collapsed: true,
			items: [
				{ label: 'Overview', slug: `${prefix}/integrations` },
				{ label: 'HTTP', slug: `${prefix}/integrations/http` },
				{ label: 'MQTT', slug: `${prefix}/integrations/mqtt` },
				{ label: 'Kafka', slug: `${prefix}/integrations/kafka` },
			],
		},
		{
			label: 'Management console',
			collapsed: true,
			items: [
				{ label: 'Monitoring', slug: `${prefix}/user-guide/ui/monitoring` },
				{ label: 'Sessions', slug: `${prefix}/user-guide/ui/sessions` },
				{ label: 'Subscriptions', slug: `${prefix}/user-guide/ui/subscriptions` },
				{ label: 'MQTT client credentials', slug: `${prefix}/user-guide/ui/mqtt-client-credentials` },
				{ label: 'Unauthorized clients', slug: `${prefix}/user-guide/ui/unauthorized-clients` },
				{ label: 'WebSocket client', slug: `${prefix}/user-guide/ui/websocket-client` },
				{ label: 'Application shared subscriptions', slug: `${prefix}/user-guide/ui/shared-subscriptions` },
				{ label: 'Users', slug: `${prefix}/user-guide/ui/users` },
				{ label: 'Settings', slug: `${prefix}/user-guide/ui/settings` },
			],
		},
		...(isPE
			? [
					{
						label: 'White Labeling',
						collapsed: true,
						items: [
							{ label: 'Overview', slug: `${prefix}/white-labeling` },
							{ label: 'Image gallery', slug: `${prefix}/white-labeling/image-gallery` },
						],
					},
					{ label: 'Private Cloud subscription', slug: `${prefix}/user-guide/private-cloud-subscription` },
				]
			: []),
	];
};

const tbmqInstallItems = (prefix: string): SidebarConfig => {
	const isPE = prefix.includes('/pe');
	return [
	{ label: 'Live demo', slug: `${prefix}/install/live-demo` },
	{
		label: 'On-premises',
		collapsed: true,
		items: [
			{
				label: 'Standalone',
				collapsed: true,
				items: [
					{ label: 'Docker (Linux & macOS)', slug: `${prefix}/install/docker` },
					{ label: 'Docker (Windows)', slug: `${prefix}/install/docker-windows` },
					...(!isPE ? [{ label: 'Building from source', slug: `${prefix}/install/building-from-source` }] : []),
				],
			},
			{
				label: 'Cluster',
				collapsed: true,
				items: [
					{ label: 'Docker Compose', slug: `${prefix}/install/cluster/docker-compose-setup` },
					{ label: 'Minikube', slug: `${prefix}/install/cluster/minikube-cluster-setup` },
				],
			},
		],
	},
	{
		label: 'Cloud',
		collapsed: true,
		items: [
			{ label: 'AWS', slug: `${prefix}/install/cluster/aws-cluster-setup` },
			{ label: 'Azure', slug: `${prefix}/install/cluster/azure-cluster-setup` },
			{ label: 'GCP', slug: `${prefix}/install/cluster/gcp-cluster-setup` },
		],
	},
	{
		label: 'Helm',
		collapsed: true,
		items: [
			{ label: 'Minikube', slug: `${prefix}/install/cluster/helm-cluster-setup-minikube` },
			{ label: 'AWS EKS', slug: `${prefix}/install/cluster/helm-cluster-setup-aws` },
			{ label: 'Azure AKS', slug: `${prefix}/install/cluster/helm-cluster-setup-azure` },
			{ label: 'GCP GKE', slug: `${prefix}/install/cluster/helm-cluster-setup-gcp` },
		],
	},
	{ label: 'Upgrade instructions', slug: `${prefix}/install/upgrade-instructions` },
	];
};

const tbmqReferenceItems = (prefix: string): SidebarConfig => [
	{
		label: 'Architecture',
		collapsed: true,
		items: [
			{ label: 'Overview', slug: `${prefix}/architecture` },
			{
				label: 'Details',
				collapsed: true,
				items: [
					{ label: 'Persistent DEVICE client', slug: `${prefix}/architecture-details/persistent-device-client` },
					{ label: 'Persistent APPLICATION client', slug: `${prefix}/architecture-details/persistent-app-client` },
				],
			},
		],
	},
	{
		label: 'Configuration',
		collapsed: true,
		items: [
			{ label: 'MQTT broker', slug: `${prefix}/install/config` },
			{ label: 'Integration executor', slug: `${prefix}/install/ie-config` }
		],
	},
	{
		label: 'Performance tests',
		collapsed: true,
		items: [
			{
				label: 'Point-to-point: 1M msg/sec throughput',
				slug: `${prefix}/reference/1m-throughput-p2p-performance-test`,
			},
			{
				label: 'Fan-out: 3M msg/sec throughput',
				slug: `${prefix}/reference/3m-throughput-single-node-performance-test`,
			},
			{
				label: 'Fan-in: 100M concurrent connections',
				slug: `${prefix}/reference/100m-connections-performance-test`,
			},
		],
	},
	{
		label: 'REST APIs',
		collapsed: true,
		items: [
			{ label: 'Administration REST API', slug: `${prefix}/rest-api` },
			{ label: 'User management', slug: `${prefix}/user-management` },
			{ label: 'MQTT client credentials management', slug: `${prefix}/mqtt-client-credentials-management` },
			{ label: 'Application shared subscriptions management', slug: `${prefix}/application-shared-subscription` },
		],
	},
];

/** TBMQ Community Broker sidebar (pages at /docs/mqtt-broker/) */
export const tbmqSidebar: SidebarConfig = [
	{
		label: 'Getting started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to MQTT!',
				translations: { uk: 'Новий проєкт' },
				items: [
					{ label: 'Why TBMQ?', slug: 'docs/mqtt-broker/why-tbmq' },
					{ label: 'Getting started', slug: 'docs/mqtt-broker/getting-started' },
				],
			},
			{
				label: 'Core concepts',
				items: [
					{ label: 'Client types', slug: 'docs/mqtt-broker/concepts/client-types' },
					{ label: 'Sessions', slug: 'docs/mqtt-broker/concepts/sessions' },
					{ label: 'Topics and wildcards', slug: 'docs/mqtt-broker/concepts/topics' },
					{ label: 'Delivery guarantees', slug: 'docs/mqtt-broker/concepts/qos' },
					{ label: 'Security model', slug: 'docs/mqtt-broker/concepts/security' },
					{ label: 'Clustering', slug: 'docs/mqtt-broker/concepts/clustering' },
				],
			},
		],
	},
	{
		label: 'Guides',
		collapsed: true,
		items: tbmqGuideItems('docs/mqtt-broker'),
	},
	{
		label: 'Installation',
		collapsed: true,
		items: tbmqInstallItems('docs/mqtt-broker'),
	},
	{
		label: 'Reference',
		collapsed: true,
		items: tbmqReferenceItems('docs/mqtt-broker'),
	},
	{
		label: 'Releases',
		items: [
			{ label: 'Release notes', slug: 'docs/mqtt-broker/releases' },
			{ label: 'Roadmap', slug: 'docs/mqtt-broker/roadmap' },
			{ label: 'Getting support', slug: 'docs/mqtt-broker/help' }
		],
	}
];

/** TBMQ PE Broker sidebar (pages at /docs/mqtt-broker/pe/) */
export const tbmqPeSidebar: SidebarConfig = [
	{
		label: 'Getting started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to MQTT!',
				translations: { uk: 'Новий проєкт' },
				items: [
					{ label: 'Why TBMQ?', slug: 'docs/mqtt-broker/pe/why-tbmq' },
					{ label: 'Getting started', slug: 'docs/mqtt-broker/pe/getting-started' },
				],
			},
			{
				label: 'Core concepts',
				items: [
					{ label: 'Client types', slug: 'docs/mqtt-broker/pe/concepts/client-types' },
					{ label: 'Sessions', slug: 'docs/mqtt-broker/pe/concepts/sessions' },
					{ label: 'Topics and wildcards', slug: 'docs/mqtt-broker/pe/concepts/topics' },
					{ label: 'Delivery guarantees', slug: 'docs/mqtt-broker/pe/concepts/qos' },
					{ label: 'Security model', slug: 'docs/mqtt-broker/pe/concepts/security' },
					{ label: 'Clustering', slug: 'docs/mqtt-broker/pe/concepts/clustering' },
				],
			},
		],
	},
	{
		label: 'Guides',
		collapsed: true,
		items: tbmqGuideItems('docs/mqtt-broker/pe'),
	},
	{
		label: 'Installation',
		collapsed: true,
		items: tbmqInstallItems('docs/mqtt-broker/pe'),
	},
	{
		label: 'Reference',
		collapsed: true,
		items: tbmqReferenceItems('docs/mqtt-broker/pe'),
	},
	{
		label: 'Releases',
		items: [
			{ label: 'Release notes', slug: 'docs/mqtt-broker/pe/releases' },
			{ label: 'Roadmap', slug: 'docs/mqtt-broker/pe/roadmap' },
			{ label: 'Getting support', slug: 'docs/mqtt-broker/pe/help' }
		],
	}
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

/** Maps tab group label → URL to navigate when the tab is clicked (optional per-group). */
export type SidebarTabLinks = Partial<Record<string, string>>;
export const opensourceSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/',
	'Guides': '/docs/user-guide/',
	'Recipes': '/docs/recipes/',
	'Installation': '/docs/installation/',
	'APIs & SDKs': '/docs/reference/apis-and-sdks/',
	'Reference': '/docs/reference/',
};
export const peSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/pe/',
	'Guides': '/docs/pe/user-guide/',
	'Recipes': '/docs/pe/recipes/',
	'Installation': '/docs/pe/installation/',
	'APIs & SDKs': '/docs/pe/reference/apis-and-sdks/',
	'Reference': '/docs/pe/reference/',
};

export const paasSidebarTabLinks: SidebarTabLinks = {};
export const paasEuSidebarTabLinks: SidebarTabLinks = {};
export const edgeSidebarTabLinks: SidebarTabLinks = {};
export const edgePeSidebarTabLinks: SidebarTabLinks = {};
export const gwSidebarTabLinks: SidebarTabLinks = {};
export const tbmqSidebarTabLinks: SidebarTabLinks = {
	'Getting started': '/docs/mqtt-broker/',
	'Guides': '/docs/mqtt-broker/guides/',
	'Installation': '/docs/mqtt-broker/install/installation-options/',
	'Reference': '/docs/mqtt-broker/reference/',
	'Releases': '/docs/mqtt-broker/changelog/',
};
export const tbmqPeSidebarTabLinks: SidebarTabLinks = {
	'Getting started': '/docs/mqtt-broker/pe/',
	'Guides': '/docs/mqtt-broker/pe/guides/',
	'Installation': '/docs/mqtt-broker/pe/install/installation-options/',
	'Reference': '/docs/mqtt-broker/pe/reference/',
	'Releases': '/docs/mqtt-broker/pe/changelog/',
};
export const mobileSidebarTabLinks: SidebarTabLinks = {};
export const mobilePeSidebarTabLinks: SidebarTabLinks = {};
export const trendzSidebarTabLinks: SidebarTabLinks = {};
export const licenseSidebarTabLinks: SidebarTabLinks = {};

/**
 * Maps URL prefix → tab navigation links for that product's sidebar.
 * Order matters: more specific prefixes must come before less specific ones.
 */
export const sidebarTabLinksByPrefix: ReadonlyArray<[string, SidebarTabLinks]> = [
	['/docs/pe/', peSidebarTabLinks],
	['/docs/paas/eu/', paasEuSidebarTabLinks],
	['/docs/paas/', paasSidebarTabLinks],
	['/docs/edge/pe/', edgePeSidebarTabLinks],
	['/docs/edge/', edgeSidebarTabLinks],
	['/docs/mqtt-broker/pe/', tbmqPeSidebarTabLinks],
	['/docs/mqtt-broker/', tbmqSidebarTabLinks],
	['/docs/mobile/pe/', mobilePeSidebarTabLinks],
	['/docs/mobile/', mobileSidebarTabLinks],
	['/docs/trendz/', trendzSidebarTabLinks],
	['/docs/iot-gateway/', gwSidebarTabLinks],
	['/docs/license-server/', licenseSidebarTabLinks],
	['/docs/', opensourceSidebarTabLinks],
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
