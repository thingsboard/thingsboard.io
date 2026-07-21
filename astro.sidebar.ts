import type { StarlightUserConfig } from '@astrojs/starlight/types';

type SidebarConfig = NonNullable<StarlightUserConfig['sidebar']>;

const guideItems = (prefix: string, { isPE = false } = {}) => {
	const rp = prefix.replace('/user-guide', '/recipes');
	return [
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
			`${prefix}/filters`,
			`${prefix}/layouts`,
			`${prefix}/actions`,
			`${prefix}/scada`,
			`${prefix}/units`,
			`${prefix}/advanced-data-key-configuration`,
			{ label: 'Solution Templates', slug: `${rp}/solution-templates/overview` },
			...(isPE ? [{
				label: 'Walkthroughs',
				collapsed: true,
				items: [`${prefix}/advanced-guides-for-working-with-dashboard`],
			}] : []),
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
			...(isPE ? [`${prefix}/groups`] : []),
			`${prefix}/tenant-profiles`,
		],
	},
	{
		label: 'Alarms & Notifications',
		collapsed: true,
		items: [
			`${prefix}/alarms`,
			`${prefix}/alarm-rules`,
			`${prefix}/notifications`,
			{
				label: 'Recipes',
				collapsed: true,
				items: [
					`${rp}/alarm-rule-tutorials`,
					`${rp}/create-clear-alarms`,
					`${rp}/device-inactivity-alarm`,
					`${rp}/enrich-alarms-with-details`,
					`${rp}/send-email-alarm`,
					`${rp}/send-sms-alarm`,
					`${rp}/send-slack-alarm`,
					`${rp}/send-mobile-app-alarm`,
					`${rp}/send-microsoft-teams-alarm`,
					`${rp}/send-alarm-email-to-customer`,
					`${rp}/telegram-alarm-notification`,
				],
			},
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
					{
						label: 'Related Entities Aggregation',
						slug: `${prefix}/calculated-fields/related-entities-aggregation`,
					},
					{
						label: 'Time Series Aggregation',
						slug: `${prefix}/calculated-fields/time-series-data-aggregation`,
					},
					{
						label: 'Examples',
						collapsed: true,
						items: [
							`${rp}/aggregate-related-entities`,
							`${rp}/average-temperature-related-devices`,
							`${rp}/water-consumption-hourly-delta`,
							`${rp}/telemetry-delta-two-devices`,
							`${rp}/telemetry-delta-calculation`,
						],
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
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							`${rp}/python-telemetry`,
							`${rp}/trigger-related-entities-via-relation`,
							`${rp}/rpc-reply-with-related-telemetry`,
							`${rp}/send-rpc-to-related-device`,
							`${rp}/fetch-weather-data`,
							`${rp}/validate-incoming-telemetry`,
							`${rp}/websocket-live-telemetry`,
							...(isPE ? [`${rp}/add-devices-to-group`] : []),
						],
					},
				],
			},
			`${prefix}/rule-nodes`,
			{
				label: 'Storage & Retention',
				collapsed: true,
				items: [`${rp}/configure-telemetry-ttl`],
			},
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
			...(isPE ? [{
				label: 'Recipes',
				collapsed: true,
				items: [
					`${rp}/reporting-embed-dashboard`,
					`${rp}/reporting-line-chart-temperature`,
					`${rp}/reporting-subreport-daily-alarms`,
					`${rp}/reporting-alarm-notification`,
				],
			}] : []),
		],
	},
	{
		label: 'Integrations',
		collapsed: true,
		items: [
			`${prefix}/integrations`,
			`${prefix}/integrations/integration-types`,
			`${prefix}/integrations/uplink-data-converter`,
			`${prefix}/integrations/downlink-data-converter`,
			`${prefix}/integrations/remote`,
			{
				label: 'Recipes',
				collapsed: true,
				items: [
					`${rp}/mqtt-one-way-rpc`,
					`${rp}/mqtt-two-way-rpc`,
					`${rp}/opc-ua-airconditioner-monitoring`,
				],
			},
		],
	},
	{
		label: 'White-labeling',
		collapsed: true,
		items: [
			{ label: 'General', slug: `${prefix}/white-labeling` },
			{ label: 'Login', slug: `${prefix}/white-labeling-login` },
			{ label: 'Mail Templates', slug: `${prefix}/white-labeling-mail` },
			{ label: 'Custom Translation', slug: `${prefix}/white-labeling-translation` },
			{ label: 'Custom Menu', slug: `${prefix}/white-labeling-menu` },
			...(isPE ? [{
				label: 'Recipes',
				collapsed: true,
				items: [
					`${rp}/white-labeling-translate-dashboard`,
					`${rp}/white-labeling-html-value-card`,
					`${rp}/white-labeling-post-processing`,
				],
			}] : []),
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
			`${prefix}/image-gallery`,
			`${prefix}/version-control`,
			`${prefix}/entity-views`,
			`${prefix}/scheduler`,
			`${prefix}/csv-xls-data-export`,
			...(isPE ? [`${prefix}/file-storage`] : []),
		],
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
				items: [`${prefix}/security/domains`, `${prefix}/security/self-signed-ecc`],
			},
			{
				label: 'Administration',
				collapsed: true,
				items: [
					{ label: 'Security Settings', slug: `${prefix}/security` },
					`${prefix}/security/audit-log`,
					`${prefix}/security/secrets-storage`,
				],
			},
			...(isPE ? [{
				label: 'Recipes',
				collapsed: true,
				items: [
					`${rp}/rbac-read-only-analyst`,
					`${rp}/rbac-customer-scoped-access`,
					`${rp}/rbac-generic-role-scope`,
					`${rp}/rbac-isolated-device-groups`,
					`${rp}/rbac-smart-buildings`,
				],
			}] : []),
		],
	},
	{
		label: 'Contribution',
		collapsed: true,
		items: [
			...(!isPE ? [
				`${prefix}/contribution/how-to-contribute`,
				`${prefix}/contribution/how-to-contribute-your-device-integration-guide`,
			] : []),
			`${prefix}/contribution/rule-node-development`,
			`${prefix}/scada-symbol-dev`,
			`${prefix}/contribution/custom-action-development`,
			{
				label: 'Widget Development',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: `${prefix}/contribution/widgets-development` },
					`${prefix}/contribution/widgets-development/latest-values`,
					`${prefix}/contribution/widgets-development/time-series`,
					`${prefix}/contribution/widgets-development/rpc-control`,
					`${prefix}/contribution/widgets-development/alarm-widget`,
					`${prefix}/contribution/widgets-development/static-widget`,
					`${prefix}/contribution/widgets-development/custom-subscription`,
					`${prefix}/contribution/widgets-development/widget-patterns`,
					`${prefix}/contribution/widgets-development/advanced`,
				],
			},
		],
	},
	{
		label: 'Releases',
		collapsed: true,
		items: [
			{
				label: 'Release policy',
				slug: `${prefix.replace('/user-guide', '/releases')}/release-policy`,
			},
			{
				label: 'Release Table',
				slug: `${prefix.replace('/user-guide', '/releases')}/releases-table`,
			},
			`${prefix.replace('/user-guide', '/releases')}/roadmap`,
		],
	},
	{ label: 'Troubleshooting', slug: `${prefix.replace('/user-guide', '')}/troubleshooting` },
	];
};

const edgeInstallationItems = (prefix: string) => {
	const isPE = prefix.includes('/pe');
	return [
		{ label: 'Installation options', slug: `${prefix}/installation` },
		{
			label: 'Single node',
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
			items: [`${prefix}/installation/docker-compose-setup`],
		},
		...(isPE
			? []
			: [{ label: 'Building from Sources', slug: `${prefix}/installation/building-from-source` }]),
		{ label: 'Upgrade instructions', slug: `${prefix}/installation/upgrade-instructions` },
	];
};

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
						{ label: 'AWS Installation Options', slug: `${prefix}/installation/aws` },
						`${prefix}/installation/aws-ec2`,
						...(isPE ? [`${prefix}/installation/aws-marketplace`] : []),
						`${prefix}/installation/aws-monolith`,
						`${prefix}/installation/aws-microservices`,
					],
				},
				{
					label: 'Google Cloud',
					collapsed: true,
					items: [
						{ label: 'GCP Installation Options', slug: `${prefix}/installation/gcp` },
						`${prefix}/installation/gcp-vm`,
						...(isPE ? [`${prefix}/installation/gcp-marketplace`] : []),
						`${prefix}/installation/gcp-monolith`,
						`${prefix}/installation/gcp-microservices`,
					],
				},
				{
					label: 'Azure',
					collapsed: true,
					items: [
						{ label: 'Azure Installation Options', slug: `${prefix}/installation/azure` },
						...(isPE ? [`${prefix}/installation/azure-marketplace`] : []),
						`${prefix}/installation/azure-monolith`,
						`${prefix}/installation/azure-microservices`,
					],
				},
				`${prefix}/installation/digital-ocean`,
			],
		},
		`${prefix}/installation/haproxy`,
		`${prefix}/installation/demo-account`,
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

const recipeItems = (prefix: string, extraProcessingItems: string[] = []) => [
	{
		label: 'Rule Engine',
		collapsed: true,
		items: [`${prefix}/python-telemetry`, `${prefix}/trigger-related-entities-via-relation`, `${prefix}/rpc-reply-with-related-telemetry`, `${prefix}/send-rpc-to-related-device`, `${prefix}/fetch-weather-data`, `${prefix}/validate-incoming-telemetry`, `${prefix}/websocket-live-telemetry`, ...extraProcessingItems],
	},
	{
		label: 'Calculated Fields',
		collapsed: true,
		items: [`${prefix}/aggregate-related-entities`, `${prefix}/average-temperature-related-devices`, `${prefix}/water-consumption-hourly-delta`, `${prefix}/telemetry-delta-two-devices`, `${prefix}/telemetry-delta-calculation`],
	},
	{
		label: 'Storage & Retention',
		collapsed: true,
		items: [`${prefix}/configure-telemetry-ttl`],
	},
	{
		label: 'Alarms & Notifications',
		collapsed: true,
		items: [`${prefix}/alarm-rule-tutorials`, `${prefix}/create-clear-alarms`, `${prefix}/device-inactivity-alarm`, `${prefix}/enrich-alarms-with-details`, `${prefix}/send-email-alarm`, `${prefix}/send-sms-alarm`, `${prefix}/send-slack-alarm`, `${prefix}/send-mobile-app-alarm`, `${prefix}/send-microsoft-teams-alarm`, `${prefix}/send-alarm-email-to-customer`, `${prefix}/telegram-alarm-notification`],
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
		label: 'Clients & CLI',
		collapsed: true,
		items: [
			// Using slug-based entries (not raw `link:`) so the per-version sidebar filter in
			// routeData.ts keeps each entry inside its own sidebar only — avoids cross-sidebar duplication.
			`${prefix}/user-guide/cli`,
			`${prefix}/reference/java-client`,
			`${prefix}/reference/python-client`,
		],
	},
	{
		label: 'Mobile',
		collapsed: true,
		items: [`${prefix}/reference/dart-client`, `${prefix}/reference/mobile-app`],
	},
];

/** Reference items for PaaS — same as CE/PE but without Configuration (no self-hosted config for Cloud). */
const paasReferenceItems = (prefix: string): SidebarConfig => {
	const basePrefix = prefix.replace('/reference', '');
	return [
		{ label: 'Cloud Architecture', slug: `${prefix}/architecture` },
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
				{
					label: 'Alarm Widgets',
					collapsed: true,
					items: [
						`${prefix}/widgets/alarm-widgets/alarms-table`,
						`${prefix}/widgets/alarm-widgets/alarm-count`,
					],
				},
				{
					label: 'Analogue Gauges',
					collapsed: true,
					items: [
						`${prefix}/widgets/analogue-gauges/compass`,
						`${prefix}/widgets/analogue-gauges/radial-gauge`,
						`${prefix}/widgets/analogue-gauges/speed-gauge`,
						`${prefix}/widgets/analogue-gauges/thermometer-scale`,
						`${prefix}/widgets/analogue-gauges/temperature-radial-gauge`,
					],
				},
				{
					label: 'Buttons',
					collapsed: true,
					items: [
						`${prefix}/widgets/buttons/action-button`,
						`${prefix}/widgets/buttons/command-button`,
						`${prefix}/widgets/buttons/power-button`,
						`${prefix}/widgets/buttons/toggle-button`,
						`${prefix}/widgets/buttons/two-segment-button`,
						`${prefix}/widgets/buttons/value-stepper`,
					],
				},
				{
					label: 'Control Widgets',
					collapsed: true,
					items: [
						`${prefix}/widgets/control-widgets/command-button`,
						`${prefix}/widgets/control-widgets/led-indicator`,
						`${prefix}/widgets/control-widgets/power-button`,
						`${prefix}/widgets/control-widgets/single-switch`,
						`${prefix}/widgets/control-widgets/toggle-button`,
						`${prefix}/widgets/control-widgets/two-segment-button`,
						`${prefix}/widgets/control-widgets/value-stepper`,
					],
				},
				{
					label: 'Cards',
					collapsed: true,
					items: [
						`${prefix}/widgets/cards/attributes-card`,
						`${prefix}/widgets/cards/html-card`,
						`${prefix}/widgets/cards/html-value-card`,
						`${prefix}/widgets/cards/markdown-html-card`,
						`${prefix}/widgets/cards/progress-bar`,
						`${prefix}/widgets/cards/value-card`,
						`${prefix}/widgets/cards/html-container`,
					],
				},
				{
					label: 'Charts',
					collapsed: true,
					items: [
						`${prefix}/widgets/charts/bar-chart`,
						`${prefix}/widgets/charts/chart-widgets`,
						`${prefix}/widgets/charts/line-chart`,
						`${prefix}/widgets/charts/point-chart`,
						`${prefix}/widgets/charts/state-chart`,
						`${prefix}/widgets/charts/time-series-chart`,
					],
				},
				{
					label: 'Count Widgets',
					collapsed: true,
					items: [
						`${prefix}/widgets/count-widgets/alarm-count`,
						`${prefix}/widgets/count-widgets/entity-count`,
					],
				},
				{
					label: 'Files',
					collapsed: true,
					items: [
						`${prefix}/widgets/files/files`,
						`${prefix}/widgets/files/dashboard-reports`,
					],
				},
				{
					label: 'HTML Widgets',
					collapsed: true,
					items: [
						`${prefix}/widgets/html-widgets/html-card`,
						`${prefix}/widgets/html-widgets/html-value-card`,
						`${prefix}/widgets/html-widgets/markdown-html-card`,
						`${prefix}/widgets/html-widgets/html-container`,
					],
				},
				{
					label: 'Maps',
					collapsed: true,
					items: [
						`${prefix}/widgets/maps/map`,
						`${prefix}/widgets/maps/image-map`,
						`${prefix}/widgets/maps/trip-map`,
						`${prefix}/widgets/maps/route-map`,
					],
				},
				{
					label: 'SCADA Widgets',
					collapsed: true,
					items: [
						{
							label: 'Traditional SCADA fluid system',
							collapsed: true,
							items: [
								{
									label: 'Filters',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/long-bottom-filter`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-top-filter`,
										`${prefix}/widgets/scada/traditional-fluid-system/short-bottom-filter`,
										`${prefix}/widgets/scada/traditional-fluid-system/short-top-filter`,
										`${prefix}/widgets/scada/traditional-fluid-system/sand-filter`,
									],
								},
								{
									label: 'Fluid Meters',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/top-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/bottom-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-inline-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-inline-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-analog-water-level-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-analog-water-level-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-left-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-right-meter`,
									],
								},
								{
									label: 'Leak Sensors',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/leak-sensor`,
									],
								},
								{
									label: 'Pipes',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-horizontal-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/extra-long-horizontal-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-vertical-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/extra-long-vertical-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-bottom-elbow-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/bottom-right-elbow-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/top-right-elbow-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-top-elbow-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/cross-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-tee-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/bottom-tee-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-tee-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/top-tee-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-elbow-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-elbow-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/short-left-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/short-right-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-broken-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-broken-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-horizontal-broken-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-vertical-broken-pipe`,
									],
								},
								{
									label: 'Pools',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/pool`,
									],
								},
								{
									label: 'Pumps',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/centrifugal-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-right-motor-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-left-motor-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-motor-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-motor-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-heat-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-heat-pump`,
									],
								},
								{
									label: 'Tanks',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/conical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-conical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/elevated-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-stand-cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-stand-vertical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-vertical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-spherical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/spherical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/stand-cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/stand-horizontal-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/stand-vertical-short-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/stand-vertical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-short-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-tank`,
									],
								},
								{
									label: 'Valves',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-ball-valve`,
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-wheel-valve`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-ball-valve`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-wheel-valve`,
										`${prefix}/widgets/scada/traditional-fluid-system/water-stop`,
									],
								},
							],
						},
						{
							label: 'High-performance SCADA fluid system',
							collapsed: true,
							items: [
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-centrifugal-pump`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-filter`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-heat-pump`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-horizontal-tank`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-horizontal-valve`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-pool`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-sand-filter`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-short-vertical-tank`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-vertical-valve`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-vertical-tank`,
							],
						},
						{
							label: 'General high-performance SCADA symbols',
							collapsed: true,
							items: [
								{
									label: 'Connectors',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/general-high-performance-scada/hp-long-horizontal-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-long-vertical-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-horizontal-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-vertical-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-top-right-elbow-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-left-bottom-elbow-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-bottom-right-elbow-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-left-top-elbow-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-cross-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-bottom-tee-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-right-tee-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-left-tee-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-top-tee-connector`,
									],
								},
								{
									label: 'Scales',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/general-high-performance-scada/hp-simple-horizontal-scale`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-simple-vertical-scale`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-dynamic-horizontal-scale`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-dynamic-vertical-scale`,
									],
								},
								`${prefix}/widgets/scada/general-high-performance-scada/hp-apartments`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-consumers`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-control-panel`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-crane`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-drawwork`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-electrical-engine`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-hook`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-house`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-manufacture`,
							],
						},
						{
							label: 'High-performance SCADA oil & gas',
							collapsed: true,
							items: [
								{
									label: 'Separators',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-large-vertical-separator`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-large-vertical-separator-with-connector`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-large-horizontal-separator`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-large-horizontal-separator-with-connector`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-small-vertical-separator`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-small-vertical-separator-with-connector`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-small-horizontal-separator`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-small-horizontal-separator-with-connector`,
									],
								},
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-drill`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-drilling-line`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-drilling-rig`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-electrical-engine`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-gas-preventer`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-gas-wellhead`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-heat-exchanger`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-hook`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-oil-pump`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-platform`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-preventer`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-rotor`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-turbine`,
							],
						},
					],
				},
				{
					label: 'Status Indicators',
					collapsed: true,
					items: [
						`${prefix}/widgets/status-indicators/battery-level`,
						`${prefix}/widgets/status-indicators/progress-bar`,
						`${prefix}/widgets/status-indicators/signal-strength`,
						`${prefix}/widgets/status-indicators/status-widget`,
					],
				},
				{
					label: 'Tables',
					collapsed: true,
					items: [
						`${prefix}/widgets/tables/alarms-table`,
						`${prefix}/widgets/tables/entities-table`,
						`${prefix}/widgets/tables/timeseries-table`,
						`${prefix}/widgets/tables/persistent-table`,
					],
				},
				{
					label: 'Scheduling',
					collapsed: true,
					items: [
						`${prefix}/widgets/scheduling/scheduler-events`,
						`${prefix}/widgets/scheduling/reports-schedule`,
					],
				},
				{
					label: 'Video Streaming',
					collapsed: true,
					items: [
						{ label: 'Overview', slug: `${prefix}/widgets/video/overview` },
						{ label: 'Configure the widget', slug: `${prefix}/widgets/video/configure` },
						{ label: 'Build a public stream URL', slug: `${prefix}/widgets/video/deploy` },
					],
				},
				`${prefix}/widgets/widget-api`,
			],
		},
	];
};

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
				{
					label: 'Alarm Widgets',
					collapsed: true,
					items: [
						`${prefix}/widgets/alarm-widgets/alarms-table`,
						`${prefix}/widgets/alarm-widgets/alarm-count`,
					],
				},
				{
					label: 'Analogue Gauges',
					collapsed: true,
					items: [
						`${prefix}/widgets/analogue-gauges/compass`,
						`${prefix}/widgets/analogue-gauges/radial-gauge`,
						`${prefix}/widgets/analogue-gauges/speed-gauge`,
						`${prefix}/widgets/analogue-gauges/thermometer-scale`,
						`${prefix}/widgets/analogue-gauges/temperature-radial-gauge`,
					],
				},
				{
					label: 'Buttons',
					collapsed: true,
					items: [
						`${prefix}/widgets/buttons/action-button`,
						`${prefix}/widgets/buttons/command-button`,
						`${prefix}/widgets/buttons/power-button`,
						`${prefix}/widgets/buttons/toggle-button`,
						`${prefix}/widgets/buttons/two-segment-button`,
						`${prefix}/widgets/buttons/value-stepper`,
					],
				},
				{
					label: 'Control Widgets',
					collapsed: true,
					items: [
						`${prefix}/widgets/control-widgets/command-button`,
						`${prefix}/widgets/control-widgets/led-indicator`,
						`${prefix}/widgets/control-widgets/power-button`,
						`${prefix}/widgets/control-widgets/single-switch`,
						`${prefix}/widgets/control-widgets/toggle-button`,
						`${prefix}/widgets/control-widgets/two-segment-button`,
						`${prefix}/widgets/control-widgets/value-stepper`,
					],
				},
				{
					label: 'Cards',
					collapsed: true,
					items: [
						`${prefix}/widgets/cards/attributes-card`,
						`${prefix}/widgets/cards/html-card`,
						`${prefix}/widgets/cards/html-value-card`,
						`${prefix}/widgets/cards/markdown-html-card`,
						`${prefix}/widgets/cards/progress-bar`,
						`${prefix}/widgets/cards/value-card`,
						`${prefix}/widgets/cards/html-container`,
					],
				},
				{
					label: 'Charts',
					collapsed: true,
					items: [
						`${prefix}/widgets/charts/bar-chart`,
						`${prefix}/widgets/charts/chart-widgets`,
						`${prefix}/widgets/charts/line-chart`,
						`${prefix}/widgets/charts/point-chart`,
						`${prefix}/widgets/charts/state-chart`,
						`${prefix}/widgets/charts/time-series-chart`,
					],
				},
				{
					label: 'Count Widgets',
					collapsed: true,
					items: [
						`${prefix}/widgets/count-widgets/alarm-count`,
						`${prefix}/widgets/count-widgets/entity-count`,
					],
				},
				...(prefix.includes('/pe/') ? [
					{
						label: 'Files',
						collapsed: true,
						items: [
							`${prefix}/widgets/files/files`,
							`${prefix}/widgets/files/dashboard-reports`,
						],
					},
				] : []),
				{
					label: 'HTML Widgets',
					collapsed: true,
					items: [
						`${prefix}/widgets/html-widgets/html-card`,
						`${prefix}/widgets/html-widgets/html-value-card`,
						`${prefix}/widgets/html-widgets/markdown-html-card`,
						`${prefix}/widgets/html-widgets/html-container`,
					],
				},
				{
					label: 'Maps',
					collapsed: true,
					items: [
						`${prefix}/widgets/maps/map`,
						`${prefix}/widgets/maps/image-map`,
						`${prefix}/widgets/maps/trip-map`,
						`${prefix}/widgets/maps/route-map`,
					],
				},
				{
					label: 'SCADA Widgets',
					collapsed: true,
					items: [
						{
							label: 'Traditional SCADA fluid system',
							collapsed: true,
							items: [
								{
									label: 'Filters',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/long-bottom-filter`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-top-filter`,
										`${prefix}/widgets/scada/traditional-fluid-system/short-bottom-filter`,
										`${prefix}/widgets/scada/traditional-fluid-system/short-top-filter`,
										`${prefix}/widgets/scada/traditional-fluid-system/sand-filter`,
									],
								},
								{
									label: 'Fluid Meters',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/top-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/bottom-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-inline-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-inline-flow-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-analog-water-level-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-analog-water-level-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-left-meter`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-right-meter`,
									],
								},
								{
									label: 'Leak Sensors',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/leak-sensor`,
									],
								},
								{
									label: 'Pipes',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-horizontal-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/extra-long-horizontal-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-vertical-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/extra-long-vertical-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-bottom-elbow-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/bottom-right-elbow-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/top-right-elbow-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-top-elbow-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/cross-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-tee-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/bottom-tee-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-tee-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/top-tee-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-elbow-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-elbow-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/short-left-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/short-right-drain-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-broken-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-broken-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-horizontal-broken-pipe`,
										`${prefix}/widgets/scada/traditional-fluid-system/long-vertical-broken-pipe`,
									],
								},
								{
									label: 'Pools',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/pool`,
									],
								},
								{
									label: 'Pumps',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/centrifugal-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-right-motor-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-left-motor-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-motor-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-motor-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/right-heat-pump`,
										`${prefix}/widgets/scada/traditional-fluid-system/left-heat-pump`,
									],
								},
								{
									label: 'Tanks',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/conical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-conical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/elevated-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-stand-cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-stand-vertical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/large-vertical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/small-spherical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/spherical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/stand-cylindrical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/stand-horizontal-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/stand-vertical-short-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/stand-vertical-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-short-tank`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-tank`,
									],
								},
								{
									label: 'Valves',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-ball-valve`,
										`${prefix}/widgets/scada/traditional-fluid-system/horizontal-wheel-valve`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-ball-valve`,
										`${prefix}/widgets/scada/traditional-fluid-system/vertical-wheel-valve`,
										`${prefix}/widgets/scada/traditional-fluid-system/water-stop`,
									],
								},
							],
						},
						{
							label: 'High-performance SCADA fluid system',
							collapsed: true,
							items: [
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-centrifugal-pump`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-filter`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-heat-pump`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-horizontal-tank`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-horizontal-valve`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-pool`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-sand-filter`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-short-vertical-tank`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-vertical-tank`,
								`${prefix}/widgets/scada/high-performance-fluid-system/hp-vertical-valve`,
							],
						},
						{
							label: 'General high-performance SCADA symbols',
							collapsed: true,
							items: [
								{
									label: 'Connectors',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/general-high-performance-scada/hp-long-horizontal-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-long-vertical-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-horizontal-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-vertical-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-top-right-elbow-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-left-bottom-elbow-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-bottom-right-elbow-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-left-top-elbow-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-cross-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-bottom-tee-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-right-tee-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-left-tee-connector`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-top-tee-connector`,
									],
								},
								{
									label: 'Scales',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/general-high-performance-scada/hp-simple-horizontal-scale`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-simple-vertical-scale`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-dynamic-horizontal-scale`,
										`${prefix}/widgets/scada/general-high-performance-scada/hp-dynamic-vertical-scale`,
									],
								},
								`${prefix}/widgets/scada/general-high-performance-scada/hp-apartments`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-consumers`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-control-panel`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-crane`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-drawwork`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-electrical-engine`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-hook`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-house`,
								`${prefix}/widgets/scada/general-high-performance-scada/hp-manufacture`,
							],
						},
						{
							label: 'High-performance SCADA oil & gas',
							collapsed: true,
							items: [
								{
									label: 'Separators',
									collapsed: true,
									items: [
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-large-vertical-separator`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-large-vertical-separator-with-connector`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-large-horizontal-separator`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-large-horizontal-separator-with-connector`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-small-vertical-separator`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-small-vertical-separator-with-connector`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-small-horizontal-separator`,
										`${prefix}/widgets/scada/high-performance-scada-oil-gas/separators/hp-small-horizontal-separator-with-connector`,
									],
								},
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-drill`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-drilling-line`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-drilling-rig`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-electrical-engine`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-gas-preventer`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-gas-wellhead`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-heat-exchanger`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-hook`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-oil-pump`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-platform`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-preventer`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-rotor`,
								`${prefix}/widgets/scada/high-performance-scada-oil-gas/hp-turbine`,
							],
						},
					],
				},
				{
					label: 'Status Indicators',
					collapsed: true,
					items: [
						`${prefix}/widgets/status-indicators/battery-level`,
						`${prefix}/widgets/status-indicators/progress-bar`,
						`${prefix}/widgets/status-indicators/signal-strength`,
						`${prefix}/widgets/status-indicators/status-widget`,
					],
				},
				{
					label: 'Tables',
					collapsed: true,
					items: [
						`${prefix}/widgets/tables/alarms-table`,
						`${prefix}/widgets/tables/entities-table`,
						`${prefix}/widgets/tables/timeseries-table`,
						`${prefix}/widgets/tables/persistent-table`,
					],
				},
				...(prefix.includes('/pe/') ? [
					{
						label: 'Scheduling',
						collapsed: true,
						items: [
							`${prefix}/widgets/scheduling/scheduler-events`,
							`${prefix}/widgets/scheduling/reports-schedule`,
						],
					},
				] : []),
				{
					label: 'Video Streaming',
					collapsed: true,
					items: [
						{ label: 'Overview', slug: `${prefix}/widgets/video/overview` },
						{ label: 'Configure the widget', slug: `${prefix}/widgets/video/configure` },
						{ label: 'Build a public stream URL', slug: `${prefix}/widgets/video/deploy` },
					],
				},
				`${prefix}/widgets/widget-api`,
			],
		},
	];
};

const mainSidebarItems = (
	prefix: string,
	extraRecipeItems: SidebarConfig = [],
	referenceConfigItems: SidebarConfig = [],
	extraProcessingItems: string[] = [],
	{ includeRecipes = true }: { includeRecipes?: boolean } = {}
): SidebarConfig => [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to IoT!',
				translations: { uk: 'Новий проект' },
				items: [
					`${prefix}/why-thingsboard`,
					`${prefix}/getting-started`,
					{ label: 'Device connectivity', slug: `${prefix}/connect-iot-devices` },
				],
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
		label: 'Build with AI',
		items: [
			{
				label: 'ThingsBoard CLI',
				collapsed: false,
				items: [
					`${prefix}/user-guide/cli`,
					`${prefix}/user-guide/cli-solutions`,
				],
			},
			`${prefix}/user-guide/ai-solution-creator`,
			`${prefix}/user-guide/ai-assistant`,
			{
				label: 'Process IoT Data with AI',
				collapsed: false,
				items: [
					`${prefix}/user-guide/ai-models`,
					`${prefix}/user-guide/local-ai-ollama`,
					`${prefix}/user-guide/ai-predictive-maintenance`,
				],
			},
			{
				label: 'Workflow Automation',
				collapsed: false,
				items: [
					`${prefix}/user-guide/mcp-server`,
					`${prefix}/user-guide/n8n-node`,
				],
			},
		],
	},
	...(includeRecipes ? [{
		label: 'Recipes',
		collapsed: true,
		translations: { uk: 'Рецепти' },
		items: [...recipeItems(`${prefix}/recipes`, extraProcessingItems), ...extraRecipeItems],
	}] : []),
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

export const opensourceSidebar: SidebarConfig = mainSidebarItems('docs', [], [], [], { includeRecipes: false });

/** Professional Edition documentation sidebar (pages at /docs/pe/) */
export const peSidebar: SidebarConfig = mainSidebarItems(
	'docs/pe',
	[],
	[
		'docs/pe/reference/configuration/ie-executor-config',
		'docs/pe/reference/configuration/report-service-config',
	],
	[],
	{ includeRecipes: false }
);

/** Cloud (PaaS) documentation sidebar (pages at /docs/paas/) */
export const paasSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to IoT!',
				translations: { uk: 'Новий проект' },
				items: [
					'docs/paas/why-thingsboard',
					'docs/paas/getting-started',
					{ label: 'Device connectivity', slug: 'docs/paas/connect-iot-devices' },
				],
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
				label: 'Digital Twins',
				collapsed: true,
				items: [
					'docs/paas/user-guide/digital-twins/entities',
					'docs/paas/user-guide/digital-twins/relations',
					'docs/paas/user-guide/digital-twins/attributes',
					'docs/paas/user-guide/digital-twins/time-series-data',
				],
			},
			{
				label: 'Devices & Assets',
				collapsed: true,
				items: [
					'docs/paas/user-guide/devices',
					'docs/paas/user-guide/device-profiles',
					'docs/paas/user-guide/connectivity-guide',
					'docs/paas/user-guide/assets',
					'docs/paas/user-guide/asset-profiles',
					'docs/paas/user-guide/connectivity-status',
					'docs/paas/user-guide/claiming',
					'docs/paas/user-guide/provisioning',
					'docs/paas/user-guide/ota-updates',
					'docs/paas/user-guide/command-and-control',
				],
			},
			{
				label: 'Data Visualization',
				collapsed: true,
				items: [
					{ label: 'Key concepts', slug: 'docs/paas/user-guide/data-visualization' },
					'docs/paas/user-guide/dashboards',
					'docs/paas/user-guide/widgets',
					'docs/paas/user-guide/time-window',
					'docs/paas/user-guide/aliases',
					'docs/paas/user-guide/filters',
					'docs/paas/user-guide/layouts',
					'docs/paas/user-guide/actions',
					'docs/paas/user-guide/scada',
					'docs/paas/user-guide/units',
					'docs/paas/user-guide/advanced-data-key-configuration',
					{ label: 'Solution Templates', slug: 'docs/paas/recipes/solution-templates/overview' },
					{
						label: 'Walkthroughs',
						collapsed: true,
						items: ['docs/paas/user-guide/advanced-guides-for-working-with-dashboard'],
					},
				],
			},
			{
				label: 'Customers & Users',
				collapsed: true,
				items: [
					'docs/paas/user-guide/multi-tenancy',
					'docs/paas/user-guide/customers',
					'docs/paas/user-guide/users',
					'docs/paas/user-guide/roles',
					'docs/paas/user-guide/groups',
				],
			},
			{
				label: 'Alarms & Notifications',
				collapsed: true,
				items: [
					'docs/paas/user-guide/alarms',
					'docs/paas/user-guide/alarm-rules',
					'docs/paas/user-guide/notifications',
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/recipes/alarm-rule-tutorials',
							'docs/paas/recipes/create-clear-alarms',
							'docs/paas/recipes/device-inactivity-alarm',
							'docs/paas/recipes/enrich-alarms-with-details',
							'docs/paas/recipes/send-email-alarm',
							'docs/paas/recipes/send-sms-alarm',
							'docs/paas/recipes/send-slack-alarm',
							'docs/paas/recipes/send-mobile-app-alarm',
							'docs/paas/recipes/send-microsoft-teams-alarm',
							'docs/paas/recipes/send-alarm-email-to-customer',
							'docs/paas/recipes/telegram-alarm-notification',
						],
					},
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
							{ label: 'Overview', slug: 'docs/paas/user-guide/calculated-fields' },
							{ label: 'Simple', slug: 'docs/paas/user-guide/calculated-fields/simple' },
							{ label: 'Script', slug: 'docs/paas/user-guide/calculated-fields/script' },
							{ label: 'Propagation', slug: 'docs/paas/user-guide/calculated-fields/propagation' },
							{ label: 'Geofencing', slug: 'docs/paas/user-guide/calculated-fields/geofencing' },
							{
								label: 'Related Entities Aggregation',
								slug: 'docs/paas/user-guide/calculated-fields/related-entities-aggregation',
							},
							{
								label: 'Time Series Aggregation',
								slug: 'docs/paas/user-guide/calculated-fields/time-series-data-aggregation',
							},
							{
								label: 'Examples',
								collapsed: true,
								items: [
									'docs/paas/recipes/aggregate-related-entities',
									'docs/paas/recipes/average-temperature-related-devices',
									'docs/paas/recipes/water-consumption-hourly-delta',
									'docs/paas/recipes/telemetry-delta-two-devices',
									'docs/paas/recipes/telemetry-delta-calculation',
								],
							},
						],
					},
					{
						label: 'Rule Engine',
						collapsed: true,
						items: [
							{ label: 'Overview', slug: 'docs/paas/user-guide/rule-engine' },
							{ label: 'Queues', slug: 'docs/paas/user-guide/rule-engine/queues' },
							{ label: 'Monitoring', slug: 'docs/paas/user-guide/rule-engine/monitoring' },
							{
								label: 'Recipes',
								collapsed: true,
								items: [
									'docs/paas/recipes/python-telemetry',
									'docs/paas/recipes/trigger-related-entities-via-relation',
									'docs/paas/recipes/rpc-reply-with-related-telemetry',
									'docs/paas/recipes/send-rpc-to-related-device',
									'docs/paas/recipes/fetch-weather-data',
									'docs/paas/recipes/validate-incoming-telemetry',
									'docs/paas/recipes/websocket-live-telemetry',
									'docs/paas/recipes/add-devices-to-group',
								],
							},
						],
					},
					'docs/paas/user-guide/rule-nodes',
					{
						label: 'Storage & Retention',
						collapsed: true,
						items: ['docs/paas/recipes/configure-telemetry-ttl'],
					},
				],
			},
			{
				label: 'Reporting',
				collapsed: true,
				items: [
					'docs/paas/user-guide/reporting/getting-started',
					'docs/paas/user-guide/reporting/report-templates',
					'docs/paas/user-guide/reporting/subreports',
					'docs/paas/user-guide/reporting/scheduling',
					'docs/paas/user-guide/reporting/notifications',
					'docs/paas/user-guide/reporting/charts',
					'docs/paas/user-guide/reporting/dashboards',
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/recipes/reporting-embed-dashboard',
							'docs/paas/recipes/reporting-line-chart-temperature',
							'docs/paas/recipes/reporting-subreport-daily-alarms',
							'docs/paas/recipes/reporting-alarm-notification',
						],
					},
				],
			},
			{
				label: 'Integrations',
				collapsed: true,
				items: [
					'docs/paas/user-guide/integrations',
					'docs/paas/user-guide/integrations/integration-types',
					'docs/paas/user-guide/integrations/uplink-data-converter',
					'docs/paas/user-guide/integrations/downlink-data-converter',
					'docs/paas/user-guide/integrations/remote',
					{
						label: 'Recipes',
						collapsed: true,
						items: ['docs/paas/recipes/mqtt-one-way-rpc', 'docs/paas/recipes/mqtt-two-way-rpc'],
					},
				],
			},
			{
				label: 'White-labeling',
				collapsed: true,
				items: [
					{ label: 'General', slug: 'docs/paas/user-guide/white-labeling' },
					{ label: 'Login', slug: 'docs/paas/user-guide/white-labeling-login' },
					{ label: 'Mail Templates', slug: 'docs/paas/user-guide/white-labeling-mail' },
					{ label: 'Custom Translation', slug: 'docs/paas/user-guide/white-labeling-translation' },
					{ label: 'Custom Menu', slug: 'docs/paas/user-guide/white-labeling-menu' },
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/recipes/white-labeling-translate-dashboard',
							'docs/paas/recipes/white-labeling-html-value-card',
							'docs/paas/recipes/white-labeling-post-processing',
						],
					},
				],
			},
			{
				label: 'Mobile App Center',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/paas/user-guide/mobile-app-center' },
					'docs/paas/user-guide/mobile-app-center/applications',
					'docs/paas/user-guide/mobile-app-center/qr-code-widget',
				],
			},
			{
				label: 'Other Features',
				collapsed: true,
				items: [
					'docs/paas/user-guide/image-gallery',
					'docs/paas/user-guide/version-control',
					'docs/paas/user-guide/entity-views',
					'docs/paas/user-guide/scheduler',
					'docs/paas/user-guide/csv-xls-data-export',
					'docs/paas/user-guide/file-storage',
				],
			},
			{
				label: 'Add-ons',
				collapsed: true,
				items: [
					'docs/paas/user-guide/add-ons',
					'docs/paas/user-guide/edge-computing',
					'docs/paas/user-guide/trendz-analytics',
				],
			},
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
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/recipes/rbac-read-only-analyst',
							'docs/paas/recipes/rbac-customer-scoped-access',
							'docs/paas/recipes/rbac-generic-role-scope',
							'docs/paas/recipes/rbac-isolated-device-groups',
							'docs/paas/recipes/rbac-smart-buildings',
						],
					},
				],
			},
			{
				label: 'Contribution',
				collapsed: true,
				items: [
					'docs/paas/user-guide/scada-symbol-dev',
					'docs/paas/user-guide/contribution/custom-action-development',
					{
						label: 'Widget Development',
						collapsed: true,
						items: [
							{ label: 'Overview', slug: 'docs/paas/user-guide/contribution/widgets-development' },
							'docs/paas/user-guide/contribution/widgets-development/latest-values',
							'docs/paas/user-guide/contribution/widgets-development/time-series',
							'docs/paas/user-guide/contribution/widgets-development/rpc-control',
							'docs/paas/user-guide/contribution/widgets-development/alarm-widget',
							'docs/paas/user-guide/contribution/widgets-development/static-widget',
							'docs/paas/user-guide/contribution/widgets-development/custom-subscription',
							'docs/paas/user-guide/contribution/widgets-development/widget-patterns',
							'docs/paas/user-guide/contribution/widgets-development/advanced',
						],
					},
				],
			},
			{
				label: 'Account & Billing',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/paas/user-guide/billing-info' },
					'docs/paas/user-guide/billing-info/subscription',
					'docs/paas/user-guide/billing-info/billing-details',
					'docs/paas/user-guide/billing-info/invoices',
				],
			},
		],
	},
	{
		label: 'Build with AI',
		items: [
			{
				label: 'ThingsBoard CLI',
				collapsed: false,
				items: [
					'docs/paas/user-guide/cli',
					'docs/paas/user-guide/cli-solutions',
				],
			},
			'docs/paas/user-guide/ai-solution-creator',
			'docs/paas/user-guide/ai-assistant',
			{
				label: 'Process IoT Data with AI',
				collapsed: false,
				items: [
					'docs/paas/user-guide/ai-models',
					'docs/paas/user-guide/local-ai-ollama',
					'docs/paas/user-guide/ai-predictive-maintenance',
				],
			},
			{
				label: 'Workflow Automation',
				collapsed: false,
				items: [
					'docs/paas/user-guide/mcp-server',
					'docs/paas/user-guide/n8n-node',
				],
			},
		],
	},
	{
		label: 'APIs & SDKs',
		collapsed: true,
		items: apisAndSdksItems('docs/paas'),
	},
	{
		label: 'Reference',
		collapsed: true,
		items: [...paasReferenceItems('docs/paas/reference'), 'docs/paas/reference/subscriptions'],
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
				items: [
					'docs/paas/eu/why-thingsboard',
					'docs/paas/eu/getting-started',
					{ label: 'Device connectivity', slug: 'docs/paas/eu/connect-iot-devices' },
				],
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
				label: 'Digital Twins',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/digital-twins/entities',
					'docs/paas/eu/user-guide/digital-twins/relations',
					'docs/paas/eu/user-guide/digital-twins/attributes',
					'docs/paas/eu/user-guide/digital-twins/time-series-data',
				],
			},
			{
				label: 'Devices & Assets',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/devices',
					'docs/paas/eu/user-guide/device-profiles',
					'docs/paas/eu/user-guide/connectivity-guide',
					'docs/paas/eu/user-guide/assets',
					'docs/paas/eu/user-guide/asset-profiles',
					'docs/paas/eu/user-guide/connectivity-status',
					'docs/paas/eu/user-guide/claiming',
					'docs/paas/eu/user-guide/provisioning',
					'docs/paas/eu/user-guide/ota-updates',
					'docs/paas/eu/user-guide/command-and-control',
				],
			},
			{
				label: 'Data Visualization',
				collapsed: true,
				items: [
					{ label: 'Key concepts', slug: 'docs/paas/eu/user-guide/data-visualization' },
					'docs/paas/eu/user-guide/dashboards',
					'docs/paas/eu/user-guide/widgets',
					'docs/paas/eu/user-guide/time-window',
					'docs/paas/eu/user-guide/aliases',
					'docs/paas/eu/user-guide/filters',
					'docs/paas/eu/user-guide/layouts',
					'docs/paas/eu/user-guide/actions',
					'docs/paas/eu/user-guide/scada',
					'docs/paas/eu/user-guide/units',
					'docs/paas/eu/user-guide/advanced-data-key-configuration',
					{ label: 'Solution Templates', slug: 'docs/paas/eu/recipes/solution-templates/overview' },
					{
						label: 'Walkthroughs',
						collapsed: true,
						items: ['docs/paas/eu/user-guide/advanced-guides-for-working-with-dashboard'],
					},
				],
			},
			{
				label: 'Customers & Users',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/multi-tenancy',
					'docs/paas/eu/user-guide/customers',
					'docs/paas/eu/user-guide/users',
					'docs/paas/eu/user-guide/roles',
					'docs/paas/eu/user-guide/groups',
				],
			},
			{
				label: 'Alarms & Notifications',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/alarms',
					'docs/paas/eu/user-guide/alarm-rules',
					'docs/paas/eu/user-guide/notifications',
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/eu/recipes/alarm-rule-tutorials',
							'docs/paas/eu/recipes/create-clear-alarms',
							'docs/paas/eu/recipes/device-inactivity-alarm',
							'docs/paas/eu/recipes/enrich-alarms-with-details',
							'docs/paas/eu/recipes/send-email-alarm',
							'docs/paas/eu/recipes/send-sms-alarm',
							'docs/paas/eu/recipes/send-slack-alarm',
							'docs/paas/eu/recipes/send-mobile-app-alarm',
							'docs/paas/eu/recipes/send-microsoft-teams-alarm',
							'docs/paas/eu/recipes/send-alarm-email-to-customer',
							'docs/paas/eu/recipes/telegram-alarm-notification',
						],
					},
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
							{ label: 'Overview', slug: 'docs/paas/eu/user-guide/calculated-fields' },
							{ label: 'Simple', slug: 'docs/paas/eu/user-guide/calculated-fields/simple' },
							{ label: 'Script', slug: 'docs/paas/eu/user-guide/calculated-fields/script' },
							{
								label: 'Propagation',
								slug: 'docs/paas/eu/user-guide/calculated-fields/propagation',
							},
							{ label: 'Geofencing', slug: 'docs/paas/eu/user-guide/calculated-fields/geofencing' },
							{
								label: 'Related Entities Aggregation',
								slug: 'docs/paas/eu/user-guide/calculated-fields/related-entities-aggregation',
							},
							{
								label: 'Time Series Aggregation',
								slug: 'docs/paas/eu/user-guide/calculated-fields/time-series-data-aggregation',
							},
							{
								label: 'Examples',
								collapsed: true,
								items: [
									'docs/paas/eu/recipes/aggregate-related-entities',
									'docs/paas/eu/recipes/average-temperature-related-devices',
									'docs/paas/eu/recipes/water-consumption-hourly-delta',
									'docs/paas/eu/recipes/telemetry-delta-two-devices',
									'docs/paas/eu/recipes/telemetry-delta-calculation',
								],
							},
						],
					},
					{
						label: 'Rule Engine',
						collapsed: true,
						items: [
							{ label: 'Overview', slug: 'docs/paas/eu/user-guide/rule-engine' },
							{ label: 'Queues', slug: 'docs/paas/eu/user-guide/rule-engine/queues' },
							{ label: 'Monitoring', slug: 'docs/paas/eu/user-guide/rule-engine/monitoring' },
							{
								label: 'Recipes',
								collapsed: true,
								items: [
									'docs/paas/eu/recipes/python-telemetry',
									'docs/paas/eu/recipes/trigger-related-entities-via-relation',
									'docs/paas/eu/recipes/rpc-reply-with-related-telemetry',
									'docs/paas/eu/recipes/send-rpc-to-related-device',
									'docs/paas/eu/recipes/fetch-weather-data',
									'docs/paas/eu/recipes/validate-incoming-telemetry',
									'docs/paas/eu/recipes/websocket-live-telemetry',
									'docs/paas/eu/recipes/add-devices-to-group',
								],
							},
						],
					},
					'docs/paas/eu/user-guide/rule-nodes',
					{
						label: 'Storage & Retention',
						collapsed: true,
						items: ['docs/paas/eu/recipes/configure-telemetry-ttl'],
					},
				],
			},
			{
				label: 'Reporting',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/reporting/getting-started',
					'docs/paas/eu/user-guide/reporting/report-templates',
					'docs/paas/eu/user-guide/reporting/subreports',
					'docs/paas/eu/user-guide/reporting/scheduling',
					'docs/paas/eu/user-guide/reporting/notifications',
					'docs/paas/eu/user-guide/reporting/charts',
					'docs/paas/eu/user-guide/reporting/dashboards',
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/eu/recipes/reporting-embed-dashboard',
							'docs/paas/eu/recipes/reporting-line-chart-temperature',
							'docs/paas/eu/recipes/reporting-subreport-daily-alarms',
							'docs/paas/eu/recipes/reporting-alarm-notification',
						],
					},
				],
			},
			{
				label: 'Integrations',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/integrations',
					'docs/paas/eu/user-guide/integrations/integration-types',
					'docs/paas/eu/user-guide/integrations/uplink-data-converter',
					'docs/paas/eu/user-guide/integrations/downlink-data-converter',
					'docs/paas/eu/user-guide/integrations/remote',
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/eu/recipes/mqtt-one-way-rpc',
							'docs/paas/eu/recipes/mqtt-two-way-rpc',
						],
					},
				],
			},
			{
				label: 'White-labeling',
				collapsed: true,
				items: [
					{ label: 'General', slug: 'docs/paas/eu/user-guide/white-labeling' },
					{ label: 'Login', slug: 'docs/paas/eu/user-guide/white-labeling-login' },
					{ label: 'Mail Templates', slug: 'docs/paas/eu/user-guide/white-labeling-mail' },
					{
						label: 'Custom Translation',
						slug: 'docs/paas/eu/user-guide/white-labeling-translation',
					},
					{ label: 'Custom Menu', slug: 'docs/paas/eu/user-guide/white-labeling-menu' },
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/eu/recipes/white-labeling-translate-dashboard',
							'docs/paas/eu/recipes/white-labeling-html-value-card',
							'docs/paas/eu/recipes/white-labeling-post-processing',
						],
					},
				],
			},
			{
				label: 'Mobile App Center',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/paas/eu/user-guide/mobile-app-center' },
					'docs/paas/eu/user-guide/mobile-app-center/applications',
					'docs/paas/eu/user-guide/mobile-app-center/qr-code-widget',
				],
			},
			{
				label: 'Other Features',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/image-gallery',
					'docs/paas/eu/user-guide/version-control',
					'docs/paas/eu/user-guide/entity-views',
					'docs/paas/eu/user-guide/scheduler',
					'docs/paas/eu/user-guide/csv-xls-data-export',
					'docs/paas/eu/user-guide/file-storage',
				],
			},
			{
				label: 'Add-ons',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/add-ons',
					'docs/paas/eu/user-guide/edge-computing',
					'docs/paas/eu/user-guide/trendz-analytics',
				],
			},
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
					{
						label: 'Recipes',
						collapsed: true,
						items: [
							'docs/paas/eu/recipes/rbac-read-only-analyst',
							'docs/paas/eu/recipes/rbac-customer-scoped-access',
							'docs/paas/eu/recipes/rbac-generic-role-scope',
							'docs/paas/eu/recipes/rbac-isolated-device-groups',
							'docs/paas/eu/recipes/rbac-smart-buildings',
						],
					},
				],
			},
			{
				label: 'Contribution',
				collapsed: true,
				items: [
					'docs/paas/eu/user-guide/scada-symbol-dev',
					'docs/paas/eu/user-guide/contribution/custom-action-development',
					{
						label: 'Widget Development',
						collapsed: true,
						items: [
							{
								label: 'Overview',
								slug: 'docs/paas/eu/user-guide/contribution/widgets-development',
							},
							'docs/paas/eu/user-guide/contribution/widgets-development/latest-values',
							'docs/paas/eu/user-guide/contribution/widgets-development/time-series',
							'docs/paas/eu/user-guide/contribution/widgets-development/rpc-control',
							'docs/paas/eu/user-guide/contribution/widgets-development/alarm-widget',
							'docs/paas/eu/user-guide/contribution/widgets-development/static-widget',
							'docs/paas/eu/user-guide/contribution/widgets-development/custom-subscription',
							'docs/paas/eu/user-guide/contribution/widgets-development/widget-patterns',
							'docs/paas/eu/user-guide/contribution/widgets-development/advanced',
						],
					},
				],
			},
			{
				label: 'Account & Billing',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/paas/eu/user-guide/billing-info' },
					'docs/paas/eu/user-guide/billing-info/subscription',
					'docs/paas/eu/user-guide/billing-info/billing-details',
					'docs/paas/eu/user-guide/billing-info/invoices',
				],
			},
		],
	},
	{
		label: 'Build with AI',
		items: [
			{
				label: 'ThingsBoard CLI',
				collapsed: false,
				items: [
					'docs/paas/eu/user-guide/cli',
					'docs/paas/eu/user-guide/cli-solutions',
				],
			},
			'docs/paas/eu/user-guide/ai-solution-creator',
			'docs/paas/eu/user-guide/ai-assistant',
			{
				label: 'Process IoT Data with AI',
				collapsed: false,
				items: [
					'docs/paas/eu/user-guide/ai-models',
					'docs/paas/eu/user-guide/local-ai-ollama',
					'docs/paas/eu/user-guide/ai-predictive-maintenance',
				],
			},
			{
				label: 'Workflow Automation',
				collapsed: false,
				items: [
					'docs/paas/eu/user-guide/mcp-server',
					'docs/paas/eu/user-guide/n8n-node',
				],
			},
		],
	},
	{
		label: 'APIs & SDKs',
		collapsed: true,
		items: apisAndSdksItems('docs/paas/eu'),
	},
	{
		label: 'Reference',
		collapsed: true,
		items: [
			...paasReferenceItems('docs/paas/eu/reference'),
			'docs/paas/eu/reference/subscriptions',
		],
	},
];

/** Edge Community Edition sidebar (pages at /docs/edge/) */
export const edgeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to IoT!',
				items: ['docs/edge/why-thingsboard-edge', 'docs/edge/getting-started'],
			},
			{
				label: 'Key concepts',
				items: [
					'docs/edge/key-concepts/edge-instance',
					'docs/edge/key-concepts/entities',
					'docs/edge/key-concepts/telemetry-synchronization',
					'docs/edge/key-concepts/attributes',
					'docs/edge/key-concepts/data-processing',
					'docs/edge/key-concepts/alarms',
				],
			},
		],
	},
	{
		label: 'Installation',
		items: edgeInstallationItems('docs/edge'),
	},
	{
		label: 'Guides',
		items: [
			{
				label: 'Edge configuration',
				collapsed: true,
				items: [
					'docs/edge/user-guide/edge-management',
					{
						label: 'Connect Edge behind a proxy',
						collapsed: true,
						items: [
							'docs/edge/user-guide/edge-proxy/debian',
							'docs/edge/user-guide/edge-proxy/docker',
						],
					},
					'docs/edge/user-guide/grpc-ssl',
					'docs/edge/user-guide/iot-gateway',
				],
			},
			{
				label: 'Entities & visualization',
				collapsed: true,
				items: [
					'docs/edge/user-guide/device-connectivity',
					'docs/edge/user-guide/device-management',
					'docs/edge/user-guide/asset-management',
					'docs/edge/user-guide/provision-customers-and-users',
					'docs/edge/user-guide/ota-updates',
					'docs/edge/user-guide/dashboards',
					'docs/edge/user-guide/public-dashboard',
				],
			},
			{
				label: 'Attributes & telemetry',
				collapsed: true,
				items: [
					'docs/edge/user-guide/attributes',
					'docs/edge/user-guide/telemetry-synchronization',
					'docs/edge/user-guide/attribute-sync',
				],
			},
			{
				label: 'Data processing',
				collapsed: true,
				items: [
					'docs/edge/user-guide/rule-chain-templates',
					'docs/edge/user-guide/rpc',
					'docs/edge/user-guide/manage-alarms',
					'docs/edge/user-guide/queues',
				],
			},
			{
				label: 'Troubleshooting',
				collapsed: true,
				items: [
					'docs/edge/user-guide/edge-status-events',
					'docs/edge/user-guide/logs',
					'docs/edge/user-guide/grpc-keepalive',
					'docs/edge/user-guide/message-statistics',
					'docs/edge/user-guide/prometheus-metrics',
				],
			},
			{
				label: 'Releases',
				collapsed: true,
				items: [
					{ label: 'Releases table', slug: 'docs/edge/releases/releases-table' },
					'docs/edge/releases/release-policy',
					'docs/edge/releases/roadmap',
				],
			},
		],
	},
	{
		label: 'Recipes',
		items: [
			{
				label: 'Sending Data',
				collapsed: true,
				items: [
					'docs/edge/recipes/send-telemetry-mqtt',
					'docs/edge/recipes/data-filtering-traffic-reduce',
				],
			},
			{
				label: 'Cloud Sync',
				collapsed: true,
				items: ['docs/edge/recipes/push-to-cloud'],
			},
			{
				label: 'Data Processing',
				collapsed: true,
				items: [
					'docs/edge/recipes/edge-alarm-rule',
					'docs/edge/recipes/alarm-rule-tutorials',
					'docs/edge/recipes/manage-alarms-rpc-requests',
				],
			},
			{
				label: 'Operations',
				collapsed: true,
				items: ['docs/edge/recipes/ota-firmware-update'],
			},
		],
	},
	{
		label: 'APIs & SDKs',
		items: [
			{
				label: 'Edge API',
				collapsed: true,
				items: [
					'docs/edge/reference/apis-and-sdks/edge-controller',
					'docs/edge/reference/apis-and-sdks/edge-event-controller',
				],
			},
			{
				label: 'Device APIs',
				collapsed: true,
				items: [
					'docs/edge/reference/apis-and-sdks/overview',
					'docs/edge/reference/apis-and-sdks/mqtt-api',
					'docs/edge/reference/apis-and-sdks/coap-api',
					'docs/edge/reference/apis-and-sdks/http-api',
					'docs/edge/reference/apis-and-sdks/lwm2m-api',
					'docs/edge/reference/apis-and-sdks/snmp-api',
				],
			},
			{
				label: 'Gateway APIs',
				collapsed: true,
				items: ['docs/edge/reference/apis-and-sdks/gateway-mqtt-api'],
			},
			{
				label: 'Device SDKs',
				collapsed: true,
				items: [
					'docs/edge/reference/apis-and-sdks/python-device-sdk',
					'docs/edge/reference/apis-and-sdks/micropython-client-sdk',
					'docs/edge/reference/apis-and-sdks/circuitpython-client-sdk',
					'docs/edge/reference/apis-and-sdks/arduino-client-sdk',
				],
			},
			{
				label: 'Edge-to-Cloud',
				collapsed: true,
				items: [
					'docs/edge/reference/apis-and-sdks/edge-to-cloud/grpc-protocol',
					'docs/edge/reference/apis-and-sdks/edge-to-cloud/connection-management',
				],
			},
			{
				label: 'Server-side APIs',
				collapsed: true,
				items: [
					'docs/edge/reference/rest-api',
					'docs/edge/reference/rest-api/controller-reference',
					'docs/edge/reference/websocket-api',
					'docs/edge/reference/data-query-api',
					'docs/edge/reference/alarm-query-api',
				],
			},
			{
				label: 'Server-side REST Clients',
				collapsed: true,
				items: [
					'docs/edge/reference/java-client',
					'docs/edge/reference/python-client',
				],
			},
			{
				label: 'MCP Server',
				collapsed: true,
				items: [
					'docs/edge/reference/apis-and-sdks/mcp-server/getting-started',
					'docs/edge/reference/apis-and-sdks/mcp-server/tools',
					'docs/edge/reference/apis-and-sdks/mcp-server/configuration',
				],
			},
		],
	},
	{
		label: 'Reference',
		items: [
			{
				label: 'Architecture',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/edge/reference/architecture' },
					'docs/edge/reference/architecture/queue',
					'docs/edge/reference/architecture/database',
					'docs/edge/reference/architecture/grpc',
					'docs/edge/reference/architecture/caching',
					'docs/edge/reference/architecture/configuration',
					'docs/edge/reference/architecture/actor-system',
				],
			},
			{
				label: 'Configuration',
				collapsed: true,
				items: [
					'docs/edge/reference/configuration/how-to-change-config',
					'docs/edge/reference/configuration/transport-config',
					'docs/edge/reference/configuration/cloud-config',
					'docs/edge/reference/configuration/server-config',
					'docs/edge/reference/configuration/security-config',
					'docs/edge/reference/configuration/database-config',
					'docs/edge/reference/configuration/cache-config',
					'docs/edge/reference/configuration/rule-engine-config',
					'docs/edge/reference/configuration/notifications-config',
				],
			},
			{
				label: 'Rule Engine',
				collapsed: true,
				items: [
					'docs/edge/reference/rule-engine/message-types',
					'docs/edge/reference/rule-engine/templatization',
					{
						label: 'Rule Nodes',
						collapsed: true,
						items: [
							{
								label: 'Filter',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/reference/rule-engine/nodes/filter' },
									'docs/edge/reference/rule-engine/nodes/filter/alarm-status-filter',
									'docs/edge/reference/rule-engine/nodes/filter/asset-profile-switch',
									'docs/edge/reference/rule-engine/nodes/filter/check-fields-presence',
									'docs/edge/reference/rule-engine/nodes/filter/check-relation-presence',
									'docs/edge/reference/rule-engine/nodes/filter/device-profile-switch',
									'docs/edge/reference/rule-engine/nodes/filter/entity-type-filter',
									'docs/edge/reference/rule-engine/nodes/filter/entity-type-switch',
									'docs/edge/reference/rule-engine/nodes/filter/gps-geofencing-filter',
									'docs/edge/reference/rule-engine/nodes/filter/message-type-filter',
									'docs/edge/reference/rule-engine/nodes/filter/message-type-switch',
									'docs/edge/reference/rule-engine/nodes/filter/script',
									'docs/edge/reference/rule-engine/nodes/filter/switch',
								],
							},
							{
								label: 'Enrichment',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/reference/rule-engine/nodes/enrichment' },
									'docs/edge/reference/rule-engine/nodes/enrichment/calculate-delta',
									'docs/edge/reference/rule-engine/nodes/enrichment/customer-attributes',
									'docs/edge/reference/rule-engine/nodes/enrichment/customer-details',
									'docs/edge/reference/rule-engine/nodes/enrichment/fetch-device-credentials',
									'docs/edge/reference/rule-engine/nodes/enrichment/originator-attributes',
									'docs/edge/reference/rule-engine/nodes/enrichment/originator-fields',
									'docs/edge/reference/rule-engine/nodes/enrichment/originator-telemetry',
									'docs/edge/reference/rule-engine/nodes/enrichment/related-device-attributes',
									'docs/edge/reference/rule-engine/nodes/enrichment/related-entity-data',
									'docs/edge/reference/rule-engine/nodes/enrichment/tenant-attributes',
									'docs/edge/reference/rule-engine/nodes/enrichment/tenant-details',
								],
							},
							{
								label: 'Transformation',
								collapsed: true,
								items: [
									{
										label: 'Overview',
										slug: 'docs/edge/reference/rule-engine/nodes/transformation',
									},
									'docs/edge/reference/rule-engine/nodes/transformation/change-originator',
									'docs/edge/reference/rule-engine/nodes/transformation/copy-key-value-pairs',
									'docs/edge/reference/rule-engine/nodes/transformation/deduplication',
									'docs/edge/reference/rule-engine/nodes/transformation/delete-key-value-pairs',
									'docs/edge/reference/rule-engine/nodes/transformation/duplicate-to-related',
									'docs/edge/reference/rule-engine/nodes/transformation/json-path',
									'docs/edge/reference/rule-engine/nodes/transformation/rename-keys',
									'docs/edge/reference/rule-engine/nodes/transformation/script',
									'docs/edge/reference/rule-engine/nodes/transformation/split-array-msg',
									'docs/edge/reference/rule-engine/nodes/transformation/to-email',
								],
							},
							{
								label: 'Action',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/reference/rule-engine/nodes/action' },
									'docs/edge/reference/rule-engine/nodes/action/calculated-fields',
									'docs/edge/reference/rule-engine/nodes/action/assign-to-customer',
									'docs/edge/reference/rule-engine/nodes/action/clear-alarm',
									'docs/edge/reference/rule-engine/nodes/action/create-alarm',
									'docs/edge/reference/rule-engine/nodes/action/create-relation',
									'docs/edge/reference/rule-engine/nodes/action/delay',
									'docs/edge/reference/rule-engine/nodes/action/delete-attributes',
									'docs/edge/reference/rule-engine/nodes/action/delete-relation',
									'docs/edge/reference/rule-engine/nodes/action/device-profile',
									'docs/edge/reference/rule-engine/nodes/action/device-state',
									'docs/edge/reference/rule-engine/nodes/action/generator',
									'docs/edge/reference/rule-engine/nodes/action/gps-geofencing-events',
									'docs/edge/reference/rule-engine/nodes/action/log',
									'docs/edge/reference/rule-engine/nodes/action/math-function',
									'docs/edge/reference/rule-engine/nodes/action/message-count',
									'docs/edge/reference/rule-engine/nodes/action/push-to-cloud',
									'docs/edge/reference/rule-engine/nodes/action/rpc-call-reply',
									'docs/edge/reference/rule-engine/nodes/action/rpc-call-request',
									'docs/edge/reference/rule-engine/nodes/action/save-attributes',
									'docs/edge/reference/rule-engine/nodes/action/save-timeseries',
									'docs/edge/reference/rule-engine/nodes/action/unassign-from-customer',
								],
							},
							{
								label: 'External',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/reference/rule-engine/nodes/external' },
									'docs/edge/reference/rule-engine/nodes/external/ai-request',
									'docs/edge/reference/rule-engine/nodes/external/aws-lambda',
									'docs/edge/reference/rule-engine/nodes/external/aws-sns',
									'docs/edge/reference/rule-engine/nodes/external/aws-sqs',
									'docs/edge/reference/rule-engine/nodes/external/azure-iot-hub',
									'docs/edge/reference/rule-engine/nodes/external/gcp-pubsub',
									'docs/edge/reference/rule-engine/nodes/external/kafka',
									'docs/edge/reference/rule-engine/nodes/external/mqtt',
									'docs/edge/reference/rule-engine/nodes/external/rabbitmq',
									'docs/edge/reference/rule-engine/nodes/external/rest-api-call',
									'docs/edge/reference/rule-engine/nodes/external/send-email',
									'docs/edge/reference/rule-engine/nodes/external/send-notification',
									'docs/edge/reference/rule-engine/nodes/external/send-sms',
									'docs/edge/reference/rule-engine/nodes/external/send-to-slack',
									'docs/edge/reference/rule-engine/nodes/external/twilio-sms',
									'docs/edge/reference/rule-engine/nodes/external/twilio-voice',
								],
							},
							{
								label: 'Flow',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/reference/rule-engine/nodes/flow' },
									'docs/edge/reference/rule-engine/nodes/flow/acknowledge',
									'docs/edge/reference/rule-engine/nodes/flow/checkpoint',
									'docs/edge/reference/rule-engine/nodes/flow/output',
									'docs/edge/reference/rule-engine/nodes/flow/rule-chain',
								],
							},
							{
								label: 'Analytics',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/reference/rule-engine/nodes/analytics' },
									'docs/edge/reference/rule-engine/nodes/analytics/aggregate-latest',
									'docs/edge/reference/rule-engine/nodes/analytics/alarms-count',
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
					'docs/edge/reference/notification-system/template-parameters',
					'docs/edge/reference/notification-system/rule-triggers',
					'docs/edge/user-guide/ui/mail-settings',
					'docs/edge/user-guide/ui/sms-provider-settings',
					'docs/edge/user-guide/ui/slack-settings',
					'docs/edge/user-guide/ui/microsoft-teams-settings',
				],
			},
			{
				label: 'TBEL',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/edge/user-guide/tbel' },
					'docs/edge/user-guide/tbel/language-guide',
					'docs/edge/user-guide/tbel/helper-functions',
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
			{
				label: 'Welcome to IoT!',
				items: ['docs/edge/pe/why-thingsboard-edge', 'docs/edge/pe/getting-started'],
			},
			{
				label: 'Key concepts',
				items: [
					'docs/edge/pe/key-concepts/edge-instance',
					'docs/edge/pe/key-concepts/entities',
					'docs/edge/pe/key-concepts/telemetry-synchronization',
					'docs/edge/pe/key-concepts/attributes',
					'docs/edge/pe/key-concepts/data-processing',
					'docs/edge/pe/key-concepts/alarms',
				],
			},
		],
	},
	{
		label: 'Installation',
		items: edgeInstallationItems('docs/edge/pe'),
	},
	{
		label: 'Guides',
		items: [
			{
				label: 'Edge configuration',
				collapsed: true,
				items: [
					'docs/edge/pe/user-guide/edge-management',
					{
						label: 'Connect Edge behind a proxy',
						collapsed: true,
						items: [
							'docs/edge/pe/user-guide/edge-proxy/debian',
							'docs/edge/pe/user-guide/edge-proxy/docker',
						],
					},
					'docs/edge/pe/user-guide/grpc-ssl',
					'docs/edge/pe/user-guide/iot-gateway',
				],
			},
			{
				label: 'Entities & visualization',
				collapsed: true,
				items: [
					'docs/edge/pe/user-guide/device-connectivity',
					'docs/edge/pe/user-guide/device-management',
					'docs/edge/pe/user-guide/asset-management',
					'docs/edge/pe/user-guide/provision-customers-and-users',
					'docs/edge/pe/user-guide/ota-updates',
					'docs/edge/pe/user-guide/dashboards',
				],
			},
			{
				label: 'Attributes & telemetry',
				collapsed: true,
				items: [
					'docs/edge/pe/user-guide/attributes',
					'docs/edge/pe/user-guide/telemetry-synchronization',
					'docs/edge/pe/user-guide/attribute-sync',
				],
			},
			{
				label: 'Data processing',
				collapsed: true,
				items: [
					'docs/edge/pe/user-guide/rule-chain-templates',
					'docs/edge/pe/user-guide/rpc',
					'docs/edge/pe/user-guide/manage-alarms',
					'docs/edge/pe/user-guide/queues',
				],
			},
			{
				label: 'Integrations',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/edge/pe/user-guide/integrations/overview' },
					{ label: 'HTTP', slug: 'docs/edge/pe/user-guide/integrations/http' },
					{ label: 'CoAP', slug: 'docs/edge/pe/user-guide/integrations/coap' },
					{ label: 'MQTT', slug: 'docs/edge/pe/user-guide/integrations/mqtt' },
					{ label: 'OPC-UA', slug: 'docs/edge/pe/user-guide/integrations/opc-ua' },
					{ label: 'TCP', slug: 'docs/edge/pe/user-guide/integrations/tcp' },
					{ label: 'UDP', slug: 'docs/edge/pe/user-guide/integrations/udp' },
					{ label: 'ChirpStack', slug: 'docs/edge/pe/user-guide/integrations/chirpstack' },
					{
						label: 'Remote Integrations',
						slug: 'docs/edge/pe/user-guide/integrations/remote-integrations',
					},
				],
			},
			{
				label: 'White-labeling',
				collapsed: true,
				items: [{ label: 'Overview', slug: 'docs/edge/pe/user-guide/white-labeling' }],
			},
			{
				label: 'Scheduler',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/edge/pe/user-guide/scheduler' },
					{
						label: 'Scheduler vs Rule Chain',
						slug: 'docs/edge/pe/user-guide/scheduler-vs-rule-chain',
					},
				],
			},
			{
				label: 'Troubleshooting',
				collapsed: true,
				items: [
					'docs/edge/pe/user-guide/edge-status-events',
					'docs/edge/pe/user-guide/logs',
					'docs/edge/pe/user-guide/grpc-keepalive',
					'docs/edge/pe/user-guide/message-statistics',
					'docs/edge/pe/user-guide/prometheus-metrics',
				],
			},
			{
				label: 'Releases',
				collapsed: true,
				items: [
					{ label: 'Releases table', slug: 'docs/edge/pe/releases/releases-table' },
					'docs/edge/pe/releases/release-policy',
					'docs/edge/pe/releases/roadmap',
				],
			},
		],
	},
	{
		label: 'Recipes',
		items: [
			{
				label: 'Sending Data',
				collapsed: true,
				items: [
					'docs/edge/pe/recipes/send-telemetry-mqtt',
					'docs/edge/pe/recipes/data-filtering-traffic-reduce',
				],
			},
			{
				label: 'Cloud Sync',
				collapsed: true,
				items: ['docs/edge/pe/recipes/push-to-cloud'],
			},
			{
				label: 'Data Processing',
				collapsed: true,
				items: [
					'docs/edge/pe/recipes/edge-alarm-rule',
					'docs/edge/pe/recipes/alarm-rule-tutorials',
					'docs/edge/pe/recipes/manage-alarms-rpc-requests',
				],
			},
			{
				label: 'Operations',
				collapsed: true,
				items: ['docs/edge/pe/recipes/ota-firmware-update'],
			},
		],
	},
	{
		label: 'APIs & SDKs',
		items: [
			{
				label: 'Edge API',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/apis-and-sdks/edge-controller',
					'docs/edge/pe/reference/apis-and-sdks/edge-event-controller',
				],
			},
			{
				label: 'Device APIs',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/apis-and-sdks/overview',
					'docs/edge/pe/reference/apis-and-sdks/mqtt-api',
					'docs/edge/pe/reference/apis-and-sdks/coap-api',
					'docs/edge/pe/reference/apis-and-sdks/http-api',
					'docs/edge/pe/reference/apis-and-sdks/lwm2m-api',
					'docs/edge/pe/reference/apis-and-sdks/snmp-api',
				],
			},
			{
				label: 'Gateway APIs',
				collapsed: true,
				items: ['docs/edge/pe/reference/apis-and-sdks/gateway-mqtt-api'],
			},
			{
				label: 'Device SDKs',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/apis-and-sdks/python-device-sdk',
					'docs/edge/pe/reference/apis-and-sdks/micropython-client-sdk',
					'docs/edge/pe/reference/apis-and-sdks/circuitpython-client-sdk',
					'docs/edge/pe/reference/apis-and-sdks/arduino-client-sdk',
				],
			},
			{
				label: 'Edge-to-Cloud',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/apis-and-sdks/edge-to-cloud/grpc-protocol',
					'docs/edge/pe/reference/apis-and-sdks/edge-to-cloud/connection-management',
				],
			},
			{
				label: 'Server-side APIs',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/rest-api',
					'docs/edge/pe/reference/rest-api/controller-reference',
					'docs/edge/pe/reference/websocket-api',
					'docs/edge/pe/reference/data-query-api',
					'docs/edge/pe/reference/alarm-query-api',
				],
			},
			{
				label: 'Server-side REST Clients',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/java-client',
					'docs/edge/pe/reference/python-client',
				],
			},
			{
				label: 'MCP Server',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/apis-and-sdks/mcp-server/getting-started',
					'docs/edge/pe/reference/apis-and-sdks/mcp-server/tools',
					'docs/edge/pe/reference/apis-and-sdks/mcp-server/configuration',
				],
			},
		],
	},
	{
		label: 'Reference',
		items: [
			{
				label: 'Architecture',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/edge/pe/reference/architecture' },
					'docs/edge/pe/reference/architecture/queue',
					'docs/edge/pe/reference/architecture/database',
					'docs/edge/pe/reference/architecture/grpc',
					'docs/edge/pe/reference/architecture/caching',
					'docs/edge/pe/reference/architecture/configuration',
					'docs/edge/pe/reference/architecture/actor-system',
				],
			},
			{
				label: 'Configuration',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/configuration/how-to-change-config',
					'docs/edge/pe/reference/configuration/transport-config',
					'docs/edge/pe/reference/configuration/cloud-config',
					'docs/edge/pe/reference/configuration/server-config',
					'docs/edge/pe/reference/configuration/security-config',
					'docs/edge/pe/reference/configuration/database-config',
					'docs/edge/pe/reference/configuration/cache-config',
					'docs/edge/pe/reference/configuration/rule-engine-config',
					'docs/edge/pe/reference/configuration/notifications-config',
				],
			},
			{
				label: 'Rule Engine',
				collapsed: true,
				items: [
					'docs/edge/pe/reference/rule-engine/message-types',
					'docs/edge/pe/reference/rule-engine/templatization',
					{
						label: 'Rule Nodes',
						collapsed: true,
						items: [
							{
								label: 'Filter',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/pe/reference/rule-engine/nodes/filter' },
									'docs/edge/pe/reference/rule-engine/nodes/filter/alarm-status-filter',
									'docs/edge/pe/reference/rule-engine/nodes/filter/asset-profile-switch',
									'docs/edge/pe/reference/rule-engine/nodes/filter/check-fields-presence',
									'docs/edge/pe/reference/rule-engine/nodes/filter/check-relation-presence',
									'docs/edge/pe/reference/rule-engine/nodes/filter/device-profile-switch',
									'docs/edge/pe/reference/rule-engine/nodes/filter/entity-type-filter',
									'docs/edge/pe/reference/rule-engine/nodes/filter/entity-type-switch',
									'docs/edge/pe/reference/rule-engine/nodes/filter/gps-geofencing-filter',
									'docs/edge/pe/reference/rule-engine/nodes/filter/message-type-filter',
									'docs/edge/pe/reference/rule-engine/nodes/filter/message-type-switch',
									'docs/edge/pe/reference/rule-engine/nodes/filter/script',
									'docs/edge/pe/reference/rule-engine/nodes/filter/switch',
								],
							},
							{
								label: 'Enrichment',
								collapsed: true,
								items: [
									{
										label: 'Overview',
										slug: 'docs/edge/pe/reference/rule-engine/nodes/enrichment',
									},
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/calculate-delta',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/customer-attributes',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/customer-details',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/fetch-device-credentials',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/originator-attributes',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/originator-fields',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/originator-telemetry',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/related-device-attributes',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/related-entity-data',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/tenant-attributes',
									'docs/edge/pe/reference/rule-engine/nodes/enrichment/tenant-details',
								],
							},
							{
								label: 'Transformation',
								collapsed: true,
								items: [
									{
										label: 'Overview',
										slug: 'docs/edge/pe/reference/rule-engine/nodes/transformation',
									},
									'docs/edge/pe/reference/rule-engine/nodes/transformation/change-originator',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/copy-key-value-pairs',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/deduplication',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/delete-key-value-pairs',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/duplicate-to-related',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/json-path',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/rename-keys',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/script',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/split-array-msg',
									'docs/edge/pe/reference/rule-engine/nodes/transformation/to-email',
								],
							},
							{
								label: 'Action',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/pe/reference/rule-engine/nodes/action' },
									'docs/edge/pe/reference/rule-engine/nodes/action/calculated-fields',
									'docs/edge/pe/reference/rule-engine/nodes/action/assign-to-customer',
									'docs/edge/pe/reference/rule-engine/nodes/action/clear-alarm',
									'docs/edge/pe/reference/rule-engine/nodes/action/create-alarm',
									'docs/edge/pe/reference/rule-engine/nodes/action/create-relation',
									'docs/edge/pe/reference/rule-engine/nodes/action/delay',
									'docs/edge/pe/reference/rule-engine/nodes/action/delete-attributes',
									'docs/edge/pe/reference/rule-engine/nodes/action/delete-relation',
									'docs/edge/pe/reference/rule-engine/nodes/action/device-profile',
									'docs/edge/pe/reference/rule-engine/nodes/action/device-state',
									'docs/edge/pe/reference/rule-engine/nodes/action/generator',
									'docs/edge/pe/reference/rule-engine/nodes/action/gps-geofencing-events',
									'docs/edge/pe/reference/rule-engine/nodes/action/log',
									'docs/edge/pe/reference/rule-engine/nodes/action/math-function',
									'docs/edge/pe/reference/rule-engine/nodes/action/message-count',
									'docs/edge/pe/reference/rule-engine/nodes/action/push-to-cloud',
									'docs/edge/pe/reference/rule-engine/nodes/action/rpc-call-reply',
									'docs/edge/pe/reference/rule-engine/nodes/action/rpc-call-request',
									'docs/edge/pe/reference/rule-engine/nodes/action/save-attributes',
									'docs/edge/pe/reference/rule-engine/nodes/action/save-timeseries',
									'docs/edge/pe/reference/rule-engine/nodes/action/unassign-from-customer',
								],
							},
							{
								label: 'External',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/pe/reference/rule-engine/nodes/external' },
									'docs/edge/pe/reference/rule-engine/nodes/external/ai-request',
									'docs/edge/pe/reference/rule-engine/nodes/external/aws-lambda',
									'docs/edge/pe/reference/rule-engine/nodes/external/aws-sns',
									'docs/edge/pe/reference/rule-engine/nodes/external/aws-sqs',
									'docs/edge/pe/reference/rule-engine/nodes/external/azure-iot-hub',
									'docs/edge/pe/reference/rule-engine/nodes/external/gcp-pubsub',
									'docs/edge/pe/reference/rule-engine/nodes/external/kafka',
									'docs/edge/pe/reference/rule-engine/nodes/external/mqtt',
									'docs/edge/pe/reference/rule-engine/nodes/external/rabbitmq',
									'docs/edge/pe/reference/rule-engine/nodes/external/rest-api-call',
									'docs/edge/pe/reference/rule-engine/nodes/external/send-email',
									'docs/edge/pe/reference/rule-engine/nodes/external/send-notification',
									'docs/edge/pe/reference/rule-engine/nodes/external/send-sms',
									'docs/edge/pe/reference/rule-engine/nodes/external/send-to-slack',
									'docs/edge/pe/reference/rule-engine/nodes/external/twilio-sms',
									'docs/edge/pe/reference/rule-engine/nodes/external/twilio-voice',
								],
							},
							{
								label: 'Flow',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/pe/reference/rule-engine/nodes/flow' },
									'docs/edge/pe/reference/rule-engine/nodes/flow/acknowledge',
									'docs/edge/pe/reference/rule-engine/nodes/flow/checkpoint',
									'docs/edge/pe/reference/rule-engine/nodes/flow/output',
									'docs/edge/pe/reference/rule-engine/nodes/flow/rule-chain',
								],
							},
							{
								label: 'Analytics',
								collapsed: true,
								items: [
									{ label: 'Overview', slug: 'docs/edge/pe/reference/rule-engine/nodes/analytics' },
									'docs/edge/pe/reference/rule-engine/nodes/analytics/aggregate-latest',
									'docs/edge/pe/reference/rule-engine/nodes/analytics/aggregate-stream',
									'docs/edge/pe/reference/rule-engine/nodes/analytics/alarms-count',
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
					'docs/edge/pe/reference/notification-system/template-parameters',
					'docs/edge/pe/reference/notification-system/rule-triggers',
					'docs/edge/pe/user-guide/ui/mail-settings',
					'docs/edge/pe/user-guide/ui/sms-provider-settings',
					'docs/edge/pe/user-guide/ui/slack-settings',
					'docs/edge/pe/user-guide/ui/microsoft-teams-settings',
				],
			},
			{
				label: 'TBEL',
				collapsed: true,
				items: [
					{ label: 'Overview', slug: 'docs/edge/pe/user-guide/tbel' },
					'docs/edge/pe/user-guide/tbel/language-guide',
					'docs/edge/pe/user-guide/tbel/helper-functions',
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
		items: ['docs/iot-gateway/getting-started', 'docs/iot-gateway/what-is-thingsboard-iot-gateway'],
	},
	{
		label: 'Installation',
		translations: { uk: 'Встановлення' },
		items: [
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
							{ label: 'Audit logs', slug: `${prefix}/security/audit-log` },
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
				{
					label: 'Non-persistent and persistent sessions',
					slug: `${prefix}/user-guide/clean-persistent-sessions`,
				},
				{ label: 'MQTT over WebSocket', slug: `${prefix}/user-guide/mqtt-over-ws` },
				{ label: 'Shared subscriptions', slug: `${prefix}/user-guide/shared-subscriptions` },
				{ label: 'Retained messages', slug: `${prefix}/user-guide/retained-messages` },
				{ label: 'Last will and testament', slug: `${prefix}/user-guide/last-will` },
				{ label: 'Keep alive', slug: `${prefix}/user-guide/keep-alive` },
			],
		},
		{
			label: 'Integration with ThingsBoard',
			slug: `${prefix}/user-guide/integrations/how-to-connect-thingsboard-to-tbmq`,
		},
		{
			label: 'Broker operations',
			collapsed: true,
			items: [
				{ label: 'TBMQ client type', slug: `${prefix}/user-guide/mqtt-client-type` },
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
				{
					label: 'MQTT client credentials',
					slug: `${prefix}/user-guide/ui/mqtt-client-credentials`,
				},
				{ label: 'Unauthorized clients', slug: `${prefix}/user-guide/ui/unauthorized-clients` },
				{ label: 'WebSocket client', slug: `${prefix}/user-guide/ui/websocket-client` },
				{
					label: 'Application shared subscriptions',
					slug: `${prefix}/user-guide/ui/shared-subscriptions`,
				},
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
							{ label: 'Image gallery', slug: `${prefix}/image-gallery` },
						],
					},
					{ label: 'Private Cloud subscription', slug: `${prefix}/subscription` },
				]
			: []),
	];
};

const tbmqInstallItems = (prefix: string): SidebarConfig => {
	const isPE = prefix.includes('/pe');
	return [
		{ label: 'Live demo', slug: `${prefix}/installation/live-demo` },
		{
			label: 'On-premises',
			collapsed: true,
			items: [
				{
					label: 'Standalone',
					collapsed: true,
					items: [
						{ label: 'Docker (Linux & macOS)', slug: `${prefix}/installation/docker` },
						{ label: 'Docker (Windows)', slug: `${prefix}/installation/docker-windows` },
						...(!isPE
							? [{ label: 'Building from source', slug: `${prefix}/installation/building-from-source` }]
							: []),
					],
				},
				{
					label: 'Cluster',
					collapsed: true,
					items: [
						{ label: 'Docker Compose', slug: `${prefix}/installation/cluster/docker-compose-setup` },
						{ label: 'Minikube', slug: `${prefix}/installation/cluster/minikube-cluster-setup` },
					],
				},
			],
		},
		{
			label: 'Cloud',
			collapsed: true,
			items: [
				{ label: 'AWS', slug: `${prefix}/installation/cluster/aws-cluster-setup` },
				{ label: 'Azure', slug: `${prefix}/installation/cluster/azure-cluster-setup` },
				{ label: 'GCP', slug: `${prefix}/installation/cluster/gcp-cluster-setup` },
			],
		},
		{
			label: 'Helm',
			collapsed: true,
			items: [
				{ label: 'Minikube', slug: `${prefix}/installation/cluster/helm-cluster-setup-minikube` },
				{ label: 'AWS EKS', slug: `${prefix}/installation/cluster/helm-cluster-setup-aws` },
				{ label: 'Azure AKS', slug: `${prefix}/installation/cluster/helm-cluster-setup-azure` },
				{ label: 'GCP GKE', slug: `${prefix}/installation/cluster/helm-cluster-setup-gcp` },
			],
		},
		{ label: 'Upgrade instructions', slug: `${prefix}/installation/upgrade-instructions` },
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
					{
						label: 'Persistent DEVICE client',
						slug: `${prefix}/architecture-details/persistent-device-client`,
					},
					{
						label: 'Persistent APPLICATION client',
						slug: `${prefix}/architecture-details/persistent-app-client`,
					},
				],
			},
		],
	},
	{
		label: 'Configuration',
		collapsed: true,
		items: [
			{ label: 'How to change configuration', slug: `${prefix}/installation/how-to-change-config` },
			{ label: 'MQTT broker', slug: `${prefix}/installation/config` },
			{ label: 'Integration executor', slug: `${prefix}/installation/ie-config` },
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
			{
				label: 'MQTT client credentials management',
				slug: `${prefix}/mqtt-client-credentials-management`,
			},
			{
				label: 'Application shared subscriptions management',
				slug: `${prefix}/application-shared-subscription`,
			},
		],
	},
];

/** TBMQ Community Broker sidebar (pages at /docs/mqtt-broker/) */
export const tbmqSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to MQTT!',
				translations: { uk: 'Новий проєкт' },
				items: [
					{ label: 'Why TBMQ?', slug: 'docs/mqtt-broker/why-tbmq' },
					{ label: 'Getting Started', slug: 'docs/mqtt-broker/getting-started' },
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
			{ label: 'Getting support', slug: 'docs/mqtt-broker/help' },
		],
	},
];

/** TBMQ PE Broker sidebar (pages at /docs/mqtt-broker/pe/) */
export const tbmqPeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			{
				label: 'Welcome to MQTT!',
				translations: { uk: 'Новий проєкт' },
				items: [
					{ label: 'Why TBMQ?', slug: 'docs/mqtt-broker/pe/why-tbmq' },
					{ label: 'Getting Started', slug: 'docs/mqtt-broker/pe/getting-started' },
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
			{ label: 'Getting support', slug: 'docs/mqtt-broker/pe/help' },
		],
	},
];

/** Mobile Application sidebar (pages at /docs/mobile/) */
export const mobileSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/mobile', 'docs/mobile/getting-started'],
	},
	{
		label: 'Guides',
		translations: { uk: 'Інструкції' },
		collapsed: true,
		items: [
			'docs/mobile/customization',
			{
				label: 'Appearance',
				collapsed: true,
				items: [
					'docs/mobile/customize-dashboards',
					'docs/mobile/customize-devices',
					'docs/mobile/device-dashboard',
					'docs/mobile/alarm-dashboard',
					'docs/mobile/app-icon-splash-screen',
					'docs/mobile/localization',
				],
			},
			{
				label: 'Settings',
				collapsed: true,
				items: ['docs/mobile/mobile-actions', 'docs/mobile/oauth2', 'docs/mobile/qr-code-settings'],
			},
			'docs/mobile/release',
		],
	},
	{
		label: 'Releases',
		translations: { uk: 'Релізи' },
		collapsed: true,
		items: ['docs/mobile/releases', 'docs/mobile/compatibility'],
	},
];

/** Mobile PE sidebar (pages at /docs/mobile/pe/) */
export const mobilePeSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/mobile/pe', 'docs/mobile/pe/getting-started'],
	},
	{
		label: 'Guides',
		translations: { uk: 'Інструкції' },
		collapsed: true,
		items: [
			'docs/mobile/pe/customization',
			{
				label: 'Appearance',
				collapsed: true,
				items: [
					'docs/mobile/pe/customize-dashboards',
					'docs/mobile/pe/customize-devices',
					'docs/mobile/pe/device-dashboard',
					'docs/mobile/pe/alarm-dashboard',
					'docs/mobile/pe/app-icon-splash-screen',
					'docs/mobile/pe/localization',
					'docs/mobile/pe/white-labeling',
				],
			},
			{
				label: 'Settings',
				collapsed: true,
				items: [
					'docs/mobile/pe/mobile-actions',
					'docs/mobile/pe/oauth2',
					'docs/mobile/pe/self-registration',
					'docs/mobile/pe/qr-code-settings',
				],
			},
			'docs/mobile/pe/release',
		],
	},
	{
		label: 'Releases',
		translations: { uk: 'Релізи' },
		collapsed: true,
		items: ['docs/mobile/pe/releases', 'docs/mobile/pe/compatibility'],
	},
];

/** Trendz Analytics sidebar (pages at /docs/trendz/) */
export const trendzSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: [
			'docs/trendz',
			{ slug: 'docs/trendz/getting-started', label: 'Tutorial' },
			{
				label: 'Activation',
				items: [
					{ slug: 'docs/trendz/activation/how-to', label: 'Overview' },
					{ slug: 'docs/trendz/activation/public-cloud', label: 'Cloud (US / EU)' },
					{ slug: 'docs/trendz/activation/private-cloud', label: 'Private Cloud' },
					{ slug: 'docs/trendz/activation/self-managed', label: 'Self-Managed' },
				],
			},
		],
	},
	{
		label: 'Documentation',
		items: [
			{ slug: 'docs/trendz/what-is-trendz', label: 'What is Trendz Analytics?' },
			{
				label: 'Key Concepts',
				collapsed: true,
				items: [
					'docs/trendz/concepts/business-entities',
					'docs/trendz/telemetry-aggregation',
					'docs/trendz/group-by-time',
					'docs/trendz/group-by-category',
					'docs/trendz/data-filtering',
				],
			},
			{
				label: 'Visualizations',
				collapsed: true,
				items: [
					{ slug: 'docs/trendz/visualizations-overview', label: 'Overview' },
					{
						label: 'View Types',
						collapsed: true,
						items: [
							'docs/trendz/visualizations-tables',
							'docs/trendz/visualizations-line',
							'docs/trendz/visualizations-bar',
							'docs/trendz/visualizations-pie',
							'docs/trendz/visualizations-scatter',
							'docs/trendz/visualizations-heatmap',
							'docs/trendz/visualizations-calendar',
							'docs/trendz/visualizations-card',
							'docs/trendz/visualizations-card-with-line',
							'docs/trendz/visualizations-ai-card',
						],
					},
					'docs/trendz/view-settings',
					'docs/trendz/view-collections',
				],
			},
			{
				label: 'Trendz on Dashboards',
				collapsed: true,
				items: [
					'docs/trendz/embed-visuals',
					'docs/trendz/widget-filter-by-alias',
					'docs/trendz/widget-actions',
					'docs/trendz/widget-settings',
					'docs/trendz/trendz-bundle',
				],
			},
			{
				label: 'Metric Explorer',
				collapsed: true,
				items: [
					'docs/trendz/metric/overview',
					'docs/trendz/metric/generate-new-metric',
					'docs/trendz/metric/use-in-thingsboard',
				],
			},
			{
				label: 'Anomaly Detection',
				collapsed: true,
				items: [
					{ slug: 'docs/trendz/anomaly/overview', label: 'Overview' },
					{ slug: 'docs/trendz/anomaly/interface', label: 'Interface Overview' },
					{ slug: 'docs/trendz/anomaly/create', label: 'Create Anomaly Model' },
					{ slug: 'docs/trendz/anomaly/manage', label: 'Analyze Model Results' },
					{ slug: 'docs/trendz/anomaly/build', label: 'Anomaly Model Properties' },
					{ slug: 'docs/trendz/anomaly/monitoring', label: 'Monitoring & Alarms' },
					{ slug: 'docs/trendz/anomaly/visualization', label: 'Visualize Anomaly Data' },
				],
			},
			{
				label: 'Calculated Fields',
				collapsed: true,
				items: [
					'docs/trendz/calculations/overview',
					'docs/trendz/calculations/batch',
					'docs/trendz/calculations/native',
					'docs/trendz/calculations/save-to-thingsboard',
					'docs/trendz/calculations/time-to-value',
				],
			},
			{
				label: 'Prediction',
				collapsed: true,
				items: [
					'docs/trendz/prediction',
					'docs/trendz/predict-with-python-models',
					'docs/trendz/predict-remaining-time',
					'docs/trendz/prediction-save-to-tb',
				],
			},
			{
				label: 'AI Features',
				collapsed: true,
				items: [
					'docs/trendz/ai-assistance-overview',
					'docs/trendz/ai-assistance-widget',
					'docs/trendz/ai-widget-summary',
					'docs/trendz/ai-assistance-prompts',
				],
			},
			'docs/trendz/states',
			{
				label: 'Settings',
				collapsed: true,
				items: [
					{ slug: 'docs/trendz/settings', label: 'Overview' },
					'docs/trendz/cache-settings',
					'docs/trendz/mix-sql-datasource',
					{
						label: 'White Labeling',
						collapsed: true,
						items: [
							{ slug: 'docs/trendz/white-labeling', label: 'Overview' },
							{ slug: 'docs/trendz/custom-translation', label: 'Custom Translation' },
						],
					},
					{ slug: 'docs/trendz/custom-ai-model-configuration', label: 'AI Settings' },
				],
			},
			{
				label: 'Other',
				collapsed: true,
				items: [
					'docs/trendz/topology-discovery',
					'docs/trendz/tasks-service',
					'docs/trendz/rest-api',
				],
			},
			{
				label: 'Versions & Support',
				collapsed: true,
				items: ['docs/trendz/releases/release-policy', 'docs/trendz/releases/releases-table'],
			},
		],
	},
	{
		label: 'Guides',
		collapsed: false,
		items: [
			{ slug: 'docs/trendz/user-guide', label: 'Overview' },
			{
				label: 'Scenarios',
				collapsed: false,
				items: [
					{
						slug: 'docs/trendz/user-guide/detect-anomalies-in-heat-pumps',
						label: 'Heat Pump Anomaly Detection',
					},
					{
						slug: 'docs/trendz/user-guide/analyze-building-energy-usage-and-carbon-emissions',
						label: 'Energy & Emissions Analysis',
					},
					{
						slug: 'docs/trendz/user-guide/predict-next-maintenance-date-of-equipment',
						label: 'Predictive Maintenance',
					},
					{
						slug: 'docs/trendz/user-guide/industrial-oee-score-monitoring',
						label: 'Industrial OEE Monitoring',
					},
					{
						slug: 'docs/trendz/user-guide/occupancy-analysis-of-the-building',
						label: 'Predictive Occupancy Monitoring',
					},
				],
			},
		],
	},
	{
		label: 'Installation',
		items: [
			{ slug: 'docs/trendz/installation', label: 'Overview' },
			{
				label: 'Installation Options',
				collapsed: false,
				items: [
					'docs/trendz/installation/cloud',
					{
						label: 'On-Premises',
						collapsed: true,
						items: [
							'docs/trendz/installation/docker',
							'docs/trendz/installation/docker-windows',
							'docs/trendz/installation/ubuntu',
							'docs/trendz/installation/rhel',
						],
					},
					{
						label: 'Cluster',
						collapsed: true,
						items: ['docs/trendz/installation/kubernetes', 'docs/trendz/installation/docker-compose-setup'],
					},
				],
			},
			{
				label: 'Advanced',
				collapsed: true,
				items: [
					'docs/trendz/installation/python-executor-configuration',
					'docs/trendz/connect-thingsboard',
					'docs/trendz/post-installation-steps',
					'docs/trendz/configuration-properties',
					'docs/trendz/installation/old-docker-migrate',
				],
			},
			'docs/trendz/installation/upgrade-instructions',
		],
	},
];

/** License Server sidebar (pages at /docs/license-server/) */
export const licenseSidebar: SidebarConfig = [
	{
		label: 'Getting Started',
		translations: { uk: 'Початок роботи' },
		items: ['docs/license-server', 'docs/license-server/what-is-license-server'],
	},
	{
		label: 'License Management',
		translations: { uk: 'Управління ліцензіями' },
		items: [
			'docs/license-server/subscription',
			'docs/license-server/perpetual',
			'docs/license-server/instance',
		],
	},
	{
		label: 'Account & Billing',
		translations: { uk: 'Акаунт та оплата' },
		items: ['docs/license-server/billing-info', 'docs/license-server/user'],
	},
];

/** IoT Hub sidebar (pages at /docs/iot-hub/) */
export const iotHubSidebar: SidebarConfig = [
	{
		label: 'User Guides',
		items: [
			{ label: 'IoT Device Library', slug: 'docs/iot-hub/user-guides/device-library' },
			{ label: 'IoT Solution Templates', slug: 'docs/iot-hub/user-guides/solution-templates' },
			{ label: 'Widgets', slug: 'docs/iot-hub/user-guides/widgets' },
			{ label: 'Calculated Fields', slug: 'docs/iot-hub/user-guides/calculated-fields' },
			{ label: 'Alarm Rules', slug: 'docs/iot-hub/user-guides/alarm-rules' },
			{ label: 'Rule Chains', slug: 'docs/iot-hub/user-guides/rule-chains' },
			{ label: 'FAQ', slug: 'docs/iot-hub/user-guides/faq' },
		],
	},
	{
		label: 'Contribution Guides',
		items: [
			{ label: 'IoT Device Library', slug: 'docs/iot-hub/contribution-guides/device' },
			{ label: 'IoT Solution Templates', slug: 'docs/iot-hub/contribution-guides/solution-template' },
			{ label: 'Widgets', slug: 'docs/iot-hub/contribution-guides/widget' },
			{ label: 'Calculated Fields', slug: 'docs/iot-hub/contribution-guides/calculated-field' },
			{ label: 'Alarm Rules', slug: 'docs/iot-hub/contribution-guides/alarm-rule' },
			{ label: 'Rule Chains', slug: 'docs/iot-hub/contribution-guides/rule-chain' },
			{ label: 'FAQ', slug: 'docs/iot-hub/contribution-guides/faq' },
		],
	},
];

/** Maps tab group label → URL to navigate when the tab is clicked (optional per-group). */
export type SidebarTabLinks = Partial<Record<string, string>>;
export const opensourceSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/',
	Guides: '/docs/user-guide/',
	'Build with AI': '/docs/iot-solutions-with-ai/',
	Installation: '/docs/installation/',
	'APIs & SDKs': '/docs/apis-and-sdks/',
	Reference: '/docs/reference/',
};
export const peSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/pe/',
	Guides: '/docs/pe/user-guide/',
	'Build with AI': '/docs/pe/iot-solutions-with-ai/',
	Installation: '/docs/pe/installation/',
	'APIs & SDKs': '/docs/pe/apis-and-sdks/',
	Reference: '/docs/pe/reference/',
};

export const paasSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/paas/',
	Guides: '/docs/paas/user-guide/',
	'Build with AI': '/docs/paas/iot-solutions-with-ai/',
	'APIs & SDKs': '/docs/paas/apis-and-sdks/',
	Reference: '/docs/paas/reference/',
};
export const paasEuSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/paas/eu/',
	Guides: '/docs/paas/eu/user-guide/',
	'Build with AI': '/docs/paas/eu/iot-solutions-with-ai/',
	'APIs & SDKs': '/docs/paas/eu/apis-and-sdks/',
	Reference: '/docs/paas/eu/reference/',
};
export const edgeSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/edge/',
	Installation: '/docs/edge/installation/',
	Guides: '/docs/edge/user-guide/',
	Recipes: '/docs/edge/recipes/',
	'APIs & SDKs': '/docs/edge/reference/apis-and-sdks/',
	Reference: '/docs/edge/reference/',
};
export const edgePeSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/edge/pe/',
	Installation: '/docs/edge/pe/installation/',
	Guides: '/docs/edge/pe/user-guide/',
	Recipes: '/docs/edge/pe/recipes/',
	'APIs & SDKs': '/docs/edge/pe/reference/apis-and-sdks/',
	Reference: '/docs/edge/pe/reference/',
};

export const gwSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/iot-gateway/',
	Installation: '/docs/iot-gateway/installation/',
	'Need help?': '/docs/iot-gateway/help/',
	Roadmap: '/docs/iot-gateway/roadmap/',
	Customization: '/docs/iot-gateway/custom/',
	Configuration: '/docs/iot-gateway/config/general/',
	Features: '/docs/iot-gateway/features/',
	Connectors: '/docs/iot-gateway/connectors/',
};

export const tbmqSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/mqtt-broker/',
	Guides: '/docs/mqtt-broker/user-guide/',
	Installation: '/docs/mqtt-broker/installation/',
	Reference: '/docs/mqtt-broker/reference/',
	Releases: '/docs/mqtt-broker/changelog/',
};
export const tbmqPeSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/mqtt-broker/pe/',
	Guides: '/docs/mqtt-broker/pe/user-guide/',
	Installation: '/docs/mqtt-broker/pe/installation/',
	Reference: '/docs/mqtt-broker/pe/reference/',
	Releases: '/docs/mqtt-broker/pe/changelog/',
};

export const mobileSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/mobile/',
	Guides: '/docs/mobile/customization/',
	Releases: '/docs/mobile/releases/',
};
export const mobilePeSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/mobile/pe/',
	Guides: '/docs/mobile/pe/customization/',
	Releases: '/docs/mobile/pe/releases/',
};
export const trendzSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/trendz/',
	Documentation: '/docs/trendz/what-is-trendz/',
	Guides: '/docs/trendz/user-guide/',
	Installation: '/docs/trendz/installation/',
};
export const licenseSidebarTabLinks: SidebarTabLinks = {
	'Getting Started': '/docs/license-server/',
	'License Management': '/docs/license-server/subscription/',
	'Account & Billing': '/docs/license-server/billing-info/',
};
export const iotHubSidebarTabLinks: SidebarTabLinks = {
	'User Guides': '/docs/iot-hub/user-guides/',
	'Contribution Guides': '/docs/iot-hub/contribution-guides/',
};

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
	['/docs/iot-hub/', iotHubSidebarTabLinks],
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
	...iotHubSidebar,
];
