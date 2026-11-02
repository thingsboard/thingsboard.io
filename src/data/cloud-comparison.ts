/**
 * ThingsBoard Cloud vs ThingsBoard Private Cloud comparison shown on
 * /products/paas/.
 *
 * Every figure here is the marketing-approved wording, deliberately not derived
 * from the pricing data: the two are reconciled by marketing when pricing is
 * next updated, and a derived table would silently change this page in the
 * meantime. Keep the strings verbatim; when pricing moves, update both.
 */

import { type ComparisonColumn, type ComparisonGroup, no, text } from '@models/product-comparison';

export const CLOUD_COMPARISON_COLUMNS: readonly ComparisonColumn[] = [
	{ name: 'Cloud', icon: 'tabler:cloud' },
	{ name: 'Private Cloud', icon: 'tabler:cloud-lock' },
];

export const cloudComparison: ComparisonGroup[] = [
	{
		rows: [
			{
				label: 'Best for',
				values: [
					text('Prototypes, MVPs and production up to a few thousand devices'),
					text('Enterprises, regulated industries and mission-critical fleets'),
				],
			},
		],
	},
	{
		label: 'Infrastructure & scale',
		mark: { icon: 'tabler:stack-2', color: '#3d50f5' },
		rows: [
			{
				label: 'Infrastructure model',
				values: [text('Shared multi-tenant environment'), text('Dedicated, isolated Kubernetes cluster')],
			},
			{
				label: 'Tenants & users',
				values: [text('One tenant per subscription'), text('Unlimited tenants, customers and users')],
			},
			{ label: 'Devices included', values: [text('Up to 5,000'), text('5,000 and up')] },
			{ label: 'Throughput', values: [text('Up to 2B data points / month'), text('2B+ data points / month')] },
			{
				label: 'Region choice',
				values: [
					text('North America or Europe'),
					text('Europe, North America or APAC — AWS, Azure or GCP on request'),
				],
			},
		],
	},
	{
		label: 'Reliability & operations',
		mark: { icon: 'tabler:activity', color: '#047857' },
		rows: [
			{ label: 'Uptime SLA', values: [text('99.9%'), text('99.9%–99.99% by plan')] },
			{
				label: 'Backups',
				values: [
					text('Automatic, managed by us'),
					text('Nightly snapshots in a separate region, 7-day retention'),
				],
			},
			{
				label: 'Maintenance windows',
				values: [text('Scheduled by us'), text('Suggested slots, or your choice from the Scale plan')],
			},
			{ label: 'Dev/Test environment', values: [no(), text('Available as an add-on')] },
		],
	},
	{
		label: 'Compliance',
		mark: { icon: 'tabler:shield-lock', color: '#006bc7' },
		rows: [
			{
				label: 'Certifications',
				values: [text('ISO 27001 and ISO 9001 certified'), text('ISO 27001 and ISO 9001 certified')],
			},
			{
				label: 'Data centres',
				values: [text('ISO 27001 and PCI-DSS certified'), text('ISO 27001 and PCI-DSS certified')],
			},
			{
				label: 'Data export on exit',
				values: [text('Via REST API and the dashboard'), text('Full encrypted database dump, 60 days to retrieve')],
			},
		],
	},
	{
		label: 'Commercials',
		mark: { icon: 'tabler:headset', color: '#c2410c' },
		rows: [
			{
				label: 'Starting price',
				values: [
					text('Free up to 5 devices, then from $49 / month for 50 devices'),
					text('From $1,499 / month for 5,000 devices'),
				],
			},
			{
				label: 'Per-device price at scale',
				values: [
					text('$0.30 / device / month, from 1,000 devices up'),
					text('$0.01 to $0.10 / device / month, lower as the fleet grows'),
				],
			},
			{ label: 'White-labeling', values: [text('From the Pilot plan'), text('Included on every plan')] },
			{
				label: 'Support',
				values: [
					text('Community on Free, then help desk from Pilot'),
					text('Support portal on every plan, dedicated engineer on Enterprise'),
				],
			},
			{
				label: 'Commitment',
				values: [text('Cancel anytime'), text('30 days\u2019 notice, no setup or cancellation fee')],
			},
		],
	},
];
