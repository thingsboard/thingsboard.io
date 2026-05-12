import starlightLlmsTxt from 'starlight-llms-txt';

/** Starlight plugin that sets up `starlight-llms-txt` with configuration for the ThingsBoard docs. */
export const starlightPluginLlmsTxt = () =>
	starlightLlmsTxt({
		projectName: 'ThingsBoard',
		description:
			'ThingsBoard is an open-source IoT platform for device management, data collection, processing, and visualization.',
		details: [
			'- ThingsBoard supports device connectivity via MQTT, CoAP, HTTP, LwM2M, SNMP, OPC-UA, and Modbus protocols.',
			'- The platform provides a powerful rule engine for real-time data processing, transformation, and automated actions on IoT telemetry.',
			'- ThingsBoard dashboards offer rich interactive widgets for data visualization, alarm management, and device control.',
			'- Multi-tenancy architecture supports isolated customer and tenant hierarchies with role-based access control.',
			'- ThingsBoard Professional Edition (PE) extends CE with white-labeling, solution templates, reporting, advanced RBAC, and integrations.',
			'- ThingsBoard Cloud (PaaS) is a fully managed cloud offering; ThingsBoard Edge extends the platform to on-premises edge nodes.',
			'- Additional products: IoT Gateway (protocol bridge for industrial devices), MQTT Broker (TBMQ), Trendz Analytics (AI-driven analytics), Mobile SDK, License Server.',
		].join('\n'),
		optionalLinks: [
			{
				label: 'ThingsBoard Blog',
				url: 'https://thingsboard.io/blog/',
				description: 'latest news, feature announcements, and use-case articles',
			},
			{
				label: 'ThingsBoard GitHub',
				url: 'https://github.com/thingsboard/thingsboard',
				description: 'source code, issues, and community discussions',
			},
			{
				label: 'ThingsBoard YouTube',
				url: 'https://www.youtube.com/thingsboard',
				description: 'video tutorials, webinars, and product demos',
			},
			{
				label: 'ThingsBoard on Stack Overflow',
				url: 'https://stackoverflow.com/questions/tagged/thingsboard',
				description: 'community Q&A for ThingsBoard development questions',
			},
		],

		promote: [
			'docs/pe/index',
			'docs/pe/getting-started/index',
			'docs/pe/why-thingsboard',
			'docs/pe/connect-iot-devices',
			'docs/pe/concepts/digital-twin-model',
			'docs/pe/concepts/data-processing',
			'docs/pe/concepts/data-visualization',
			'docs/pe/concepts/multi-tenancy',
			'docs/pe/concepts/alarms-and-notifications',
		],

		exclude: [
			// ThingsBoard CE — PE is canonical
			'docs/index',
			'docs/user-guide/**',
			'docs/recipes/**',
			'docs/reference/**',
			'docs/installation/**',
			'docs/apis-and-sdks',
			'docs/getting-started/**',
			'docs/concepts/**',
			'docs/connect-iot-devices',
			'docs/why-thingsboard',
			'docs/troubleshooting',
			'docs/newsletter-thanks',
			'docs/search',
			'docs/private-cloud/**',
			'docs/releases/**',

			// Edge CE — Edge PE is canonical
			'docs/edge/index',
			'docs/edge/search',
			'docs/edge/user-guide/**',
			'docs/edge/getting-started/**',
			'docs/edge/installation/**',
			'docs/edge/key-concepts/**',
			'docs/edge/recipes/**',
			'docs/edge/reference/**',
			'docs/edge/releases/**',
			'docs/edge/why-thingsboard-edge',

			// MQTT Broker CE — TBMQ PE is canonical
			'docs/mqtt-broker/index',
			'docs/mqtt-broker/search',
			'docs/mqtt-broker/architecture-details/**',
			'docs/mqtt-broker/installation/**',
			'docs/mqtt-broker/user-guide/**',
			'docs/mqtt-broker/reference/**',
			'docs/mqtt-broker/reference',
			'docs/mqtt-broker/security/**',
			'docs/mqtt-broker/other/**',
			'docs/mqtt-broker/concepts/**',
			'docs/mqtt-broker/integrations/**',
			'docs/mqtt-broker/integrations',
			'docs/mqtt-broker/getting-started',
			'docs/mqtt-broker/architecture',
			'docs/mqtt-broker/changelog',
			'docs/mqtt-broker/releases',
			'docs/mqtt-broker/rest-api',
			'docs/mqtt-broker/roadmap',
			'docs/mqtt-broker/subscription',
			'docs/mqtt-broker/white-labeling',
			'docs/mqtt-broker/why-tbmq',
			'docs/mqtt-broker/application-shared-subscription',
			'docs/mqtt-broker/user-guide',
			'docs/mqtt-broker/help',
			'docs/mqtt-broker/mqtt-client-credentials-management',
			'docs/mqtt-broker/user-management',

			// Mobile CE — Mobile PE is canonical
			'docs/mobile/index',
			'docs/mobile/search',
			'docs/mobile/getting-started',
			'docs/mobile/alarm-dashboard',
			'docs/mobile/app-icon-splash-screen',
			'docs/mobile/app-icon-splash-screen-before-v1-7',
			'docs/mobile/compatibility',
			'docs/mobile/customization',
			'docs/mobile/customize-dashboards',
			'docs/mobile/customize-devices',
			'docs/mobile/device-dashboard',
			'docs/mobile/localization',
			'docs/mobile/mobile-actions',
			'docs/mobile/oauth2',
			'docs/mobile/qr-code-settings',
			'docs/mobile/qr-code-settings-before-v1-7',
			'docs/mobile/release',
			'docs/mobile/release-before-v1-7',
			'docs/mobile/releases',
			'docs/mobile/self-registration',
			'docs/mobile/white-labeling',

			// PaaS EU — PaaS is canonical for cloud
			'docs/paas/eu/**',

			// Release notes, changelogs, roadmaps across all products
			'docs/pe/releases/**',
			'docs/edge/pe/releases/**',
			'docs/mqtt-broker/pe/releases',
			'docs/mqtt-broker/pe/changelog',
			'docs/mqtt-broker/pe/roadmap',
			'docs/mobile/pe/releases/**',
			'docs/trendz/releases/**',
			'docs/iot-gateway/roadmap',

			// Rule engine nodes — very large, detailed reference
			'docs/pe/reference/rule-engine/nodes/**',
		],
	});
