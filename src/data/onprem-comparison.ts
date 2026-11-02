/**
 * "ThingsBoard vs Custom IoT stack" comparison shown on /products/thingsboard-pe/.
 *
 * Every cell is the marketing-approved wording, kept verbatim: the table argues
 * for one platform over an assembled stack of separate services, so the values
 * are prose, not figures derived from pricing or feature data.
 */

import { type ComparisonColumn, type ComparisonGroup, text } from '@models/product-comparison';

export const ONPREM_COMPARISON_COLUMNS: readonly ComparisonColumn[] = [
	{ name: 'ThingsBoard', icon: 'tabler:server-cog' },
	{ name: 'Custom IoT stack', icon: 'tabler:tools' },
];

const rows = (entries: [string, string, string][]) =>
	entries.map(([label, thingsboard, custom]) => ({ label, values: [text(thingsboard), text(custom)] }));

export const onPremComparison: ComparisonGroup[] = [
	{
		rows: rows([
			[
				'Proven in production',
				'Ten years, thousands of production systems',
				'Your particular combination is the first of its kind, and production is where you find out',
			],
			['Vendors to manage', '1', '5–10, each with its own contract, release cycle and support queue'],
		]),
	},
	{
		label: 'Device & data',
		mark: { icon: 'tabler:plug-connected', color: '#007c7b' },
		rows: rows([
			[
				'Device connectivity',
				'Direct, via Gateway, or via network server',
				'A cloud IoT service, an industrial bridge and an LPWAN integration, with custom code for each path',
			],
			[
				'OTA updates',
				'Per device or per device profile',
				'An update service, plus per-protocol delivery and rollout tracking you build',
			],
			[
				'Asset modeling & digital twin',
				'Assets, relations and hierarchies',
				'Your own schema, relation graph and hierarchy logic, in your own database',
			],
			[
				'Data processing',
				'Rule chains, calculated fields and alarms',
				'A stream processor, a rules service and alarm state, wired together and kept in sync',
			],
			[
				'Time-series storage',
				'SQL or hybrid, your choice',
				'A time-series database to select, size, shard and operate',
			],
			[
				'External integrations',
				'CRM, ERP, cloud and MQTT targets',
				'An integration service per target, with retries and back-pressure to design',
			],
		]),
	},
	{
		label: 'What your users get',
		mark: { icon: 'tabler:chart-dots', color: '#006bc7' },
		rows: rows([
			[
				'Dashboards & visualization',
				'600+ widgets, SCADA and real-time views',
				'A front-end application to design, build and maintain for every use case',
			],
			[
				'Multi-tenancy',
				'Full data isolation between tenants',
				'Tenant scoping through every query, API and dashboard you write',
			],
			['White-labeling', 'Configured, not coded', 'Your own theming layer, maintained per customer'],
			[
				'Fine-grained RBAC & SSO',
				'Roles, groups, OAuth 2.0 and 2FA',
				'An identity provider integration plus your own permission model',
			],
		]),
	},
	{
		label: 'Running it',
		mark: { icon: 'tabler:stack-2', color: '#3d50f5' },
		rows: rows([
			[
				'Scale & high availability',
				'Add instances of any service, with no single point of failure',
				'Scale and failover designed per service, then proven under load',
			],
			[
				'Upgrades & security',
				'One LTS upgrade path, patches in about 2 weeks',
				'Every service on its own cycle, with advisories to track and integrations to re-validate',
			],
			[
				'Support & accountability',
				'One vendor, one portal, staffed by the engineers who build it',
				'Tickets across vendors, each pointing at the others while the issue stays open',
			],
			[
				'Monitoring',
				'Deployment scripts and dashboards for Prometheus and Grafana',
				'A monitoring stack to deploy, and every dashboard and alert to design',
			],
			[
				'Performance',
				'Millions of devices in production, tested beyond 10 million',
				'Throughput and latency you benchmark, tune and re-prove for every service',
			],
		]),
	},
	{
		label: 'Commercials & risk',
		mark: { icon: 'tabler:headset', color: '#c2410c' },
		rows: rows([
			[
				'Total cost of ownership',
				'One license, priced on device count',
				'Several licenses, integration engineering, and infrastructure costs that surface after go-live',
			],
			[
				'Time to first production deployment',
				'Days to weeks, configuring rather than building',
				'Months to a year of assembly and integration before the first use case ships',
			],
			[
				'Ecosystem',
				'Edge, Trendz, mobile, TBMQ, Gateway and IoT Hub from one vendor',
				'Each one sourced, licensed, integrated and upgraded on its own schedule',
			],
			[
				'Delivery risk',
				'The architecture is validated before you start',
				'The integration layer is yours to design, test and prove in production',
			],
		]),
	},
];
