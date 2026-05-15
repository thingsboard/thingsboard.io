import type { APIRoute } from 'astro';

export const prerender = true;

const SITE_URL = 'https://thingsboard.io';

const HEADER = `# ThingsBoard

> ThingsBoard is an open-source IoT platform for device management, data collection, processing, and visualization.

- ThingsBoard supports device connectivity via MQTT, CoAP, HTTP, LwM2M, SNMP, OPC-UA, and Modbus protocols.
- The platform provides a powerful rule engine for real-time data processing, transformation, and automated actions on IoT telemetry.
- ThingsBoard dashboards offer rich interactive widgets for data visualization, alarm management, and device control.
- Multi-tenancy architecture supports isolated customer and tenant hierarchies with role-based access control.
- ThingsBoard Professional Edition (PE) extends CE with white-labeling, solution templates, reporting, advanced RBAC, and integrations.
- ThingsBoard Cloud (PaaS) is a fully managed cloud offering; ThingsBoard Edge extends the platform to on-premises edge nodes.
- Additional products: IoT Gateway (protocol bridge for industrial devices), MQTT Broker (TBMQ), Trendz Analytics (AI-driven analytics), Mobile SDK, License Server.`;

interface KeyPage {
	slug: string;
	title: string;
	description: string;
}

const KEY_PAGES: KeyPage[] = [
	{
		slug: 'docs/pe',
		title: 'ThingsBoard PE — Documentation home',
		description: 'Top-level entry point for ThingsBoard Professional Edition documentation.',
	},
	{
		slug: 'docs/pe/why-thingsboard',
		title: 'Why ThingsBoard?',
		description: 'Core design principles, architecture, and platform highlights.',
	},
	{
		slug: 'docs/pe/getting-started',
		title: 'Getting Started with ThingsBoard PE',
		description: 'End-to-end setup: install, connect a device, build a dashboard.',
	},
	{
		slug: 'docs/pe/connect-iot-devices',
		title: 'Connect IoT Devices',
		description:
			'Connectivity guide across MQTT, HTTP, CoAP, LwM2M, SNMP, OPC-UA, and Modbus protocols.',
	},
	{
		slug: 'docs/pe/concepts/digital-twin-model',
		title: 'Digital Twin Model',
		description:
			'Devices, assets, customers, entity views, and relations — the platform entity model.',
	},
	{
		slug: 'docs/pe/concepts/data-processing',
		title: 'Data Processing',
		description: 'Rule engine concepts: nodes, chains, message routing, and transformations.',
	},
	{
		slug: 'docs/pe/concepts/data-visualization',
		title: 'Data Visualization',
		description: 'Dashboards, widgets, and the visualization model.',
	},
	{
		slug: 'docs/pe/concepts/multi-tenancy',
		title: 'Multi-tenancy and Hierarchy',
		description: 'Tenant isolation, customer hierarchies, and role-based access.',
	},
	{
		slug: 'docs/pe/concepts/alarms-and-notifications',
		title: 'Alarms and Notifications',
		description: 'Alarm lifecycle, severity, propagation, and notification delivery.',
	},
	{
		slug: 'docs/pe/installation',
		title: 'Installation options',
		description: 'Deployment topologies and installation paths for ThingsBoard PE.',
	},
	{
		slug: 'docs/pe/reference/rest-api',
		title: 'REST API reference',
		description: 'HTTP API surface for platform automation and integration.',
	},
	{
		slug: 'docs/pe/reference/rule-engine',
		title: 'Rule Engine reference',
		description: 'Catalog of rule engine nodes and chain configuration.',
	},
	{
		slug: 'docs/edge/pe',
		title: 'ThingsBoard Edge PE',
		description: 'On-premises edge nodes that synchronize with a central ThingsBoard server.',
	},
	{
		slug: 'docs/mqtt-broker/pe',
		title: 'TBMQ PE — MQTT Broker',
		description: 'Standalone MQTT broker engineered for millions of concurrent connections.',
	},
	{
		slug: 'docs/mobile/pe',
		title: 'ThingsBoard Mobile PE',
		description: 'Customizable mobile application for end-user IoT solutions.',
	},
	{
		slug: 'docs/trendz',
		title: 'Trendz Analytics',
		description: 'AI-driven analytics built on top of ThingsBoard telemetry.',
	},
	{
		slug: 'docs/iot-gateway',
		title: 'IoT Gateway',
		description: 'Protocol bridge for industrial devices (OPC-UA, Modbus, BACnet, BLE, and more).',
	},
];

const OPTIONAL_LINKS = [
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
];

function slugToUrl(slug: string): string {
	const cleaned = slug.replace(/\/index$/, '');
	return `${SITE_URL}/${cleaned}/`;
}

export const GET: APIRoute = () => {
	if (process.env.SKIP_LLMS) {
		return new Response('', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
	}

	const keyPages = KEY_PAGES.map(
		(p) => `- [${p.title}](${slugToUrl(p.slug)}): ${p.description}`,
	).join('\n');

	const docSets = `- [Documentation catalog](${SITE_URL}/llms-small.txt): full index of every documentation page — title, description, canonical URL. Fetch a page URL directly to read its body.`;

	const notes = [
		'- This catalog is auto-generated from the same source as https://thingsboard.io/docs/.',
		'- ThingsBoard Cloud (PaaS) pages share content with the Professional Edition pages listed here; the catalog points at PE URLs to avoid duplication.',
		'- Community Edition pages are intentionally omitted; PE is the canonical reference and is a strict superset.',
	].join('\n');

	const optional = OPTIONAL_LINKS.map(
		(l) => `- [${l.label}](${l.url})${l.description ? `: ${l.description}` : ''}`,
	).join('\n');

	const body = [
		HEADER,
		'## Key pages',
		keyPages,
		'## Documentation Sets',
		docSets,
		'## Notes',
		notes,
		'## Optional',
		optional,
	].join('\n\n');

	return new Response(body + '\n', {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
