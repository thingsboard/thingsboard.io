import { text, type ComparisonColumn, type ComparisonGroup, type ComparisonRow } from '@models/product-comparison';
import type { CatalogRow } from '@data/trust-center/catalogs';
import type { Fact } from '@data/trust-center/compliance';
import { SECURITY_TOPICS } from '@data/trust-center/forms';
import { DEPLOYMENT_ICON } from '@data/trust-center/deployment-marks';
import { docRow, type Access, type DocAction } from '@data/trust-center/documents';
import { MARK_COLOR, NDA_TURNAROUND, contactHref } from '@data/trust-center/nav';

/** The deployment pages: ThingsBoard Cloud and Private Cloud, On-premises, Commitment and responsibility. */

export interface DocRow {
	name: string;
	access: Access;
	actions: DocAction[];
}

const row = (label: string, values: string[]): ComparisonRow => ({ label, values: values.map(text) });

interface GroupPick {
	label: string;
	icon: string;
	color: string;
	labels: string[];
}

/** Groups rows by label; a row missing, unknown or in two groups fails the build. */
function groupRows(rows: ComparisonRow[], groups: GroupPick[]): ComparisonGroup[] {
	const used = groups.flatMap((g) => g.labels);
	const missing = rows.filter((r) => !used.includes(r.label)).map((r) => r.label);
	const unknown = used.filter((l) => !rows.some((r) => r.label === l));
	const doubled = used.filter((l, i) => used.indexOf(l) !== i);
	if (missing.length || unknown.length || doubled.length) {
		throw new Error(`[trust-center] comparison groups: missing ${missing}; unknown ${unknown}; doubled ${doubled}`);
	}
	return groups.map(({ label, icon, color, labels }) => ({
		label,
		mark: { icon, color },
		rows: labels.flatMap((l) => rows.filter((r) => r.label === l)),
	}));
}

// ── ThingsBoard Cloud and Private Cloud ────────────────────────────────────────

export const CLOUD_LEDE =
	'In both models, ThingsBoard runs the platform and the infrastructure under it. ThingsBoard Cloud is multi-tenant; Private Cloud is a dedicated single-tenant instance in the environment and region you choose. In both cases, you focus on your solution, and we take care of running it. Our certifications and everything under Product security apply to both.';

export const CLOUD_COLUMNS: ComparisonColumn[] = [
	{ name: 'ThingsBoard Cloud', icon: DEPLOYMENT_ICON.cloud },
	{ name: 'Private Cloud', icon: DEPLOYMENT_ICON.private },
];

const CLOUD_COMPARE: ComparisonRow[] = [
	row('Who runs it', [
		'ThingsBoard: infrastructure, patching, upgrades, monitoring and backups.',
		'ThingsBoard, with upgrades in a window agreed with you.',
	]),
	row('Hosting', [
		'AWS (EKS) in two independent regions: North America (thingsboard.cloud) and EU (eu.thingsboard.cloud).',
		'AWS by default; Azure or GCP on request.',
	]),
	row('Data residency', [
		'North America or EU; data never moves between regions.',
		'North America, EU or APAC, chosen during onboarding.',
	]),
	row('Isolation', [
		'Every request is confined to its own tenant, and customers and entity groups narrow access further.',
		'A dedicated single-tenant cluster.',
	]),
	row('Encryption in transit', [
		'TLS preconfigured: HTTPS on 443, MQTTS on 8883.',
		'TLS preconfigured: HTTPS on 443, MQTTS on 8883.',
	]),
	row('Network protection', [
		'DNS by Cloudflare; rate limits set by plan.',
		'Rate limits of 50 requests per second and 500 per minute per source IP for HTTP traffic (REST, WebSocket, web UI). A dedicated VPN tunnel to your systems, depending on plan.',
	]),
	row('Backups', [
		'Daily, with point-in-time recovery.',
		'Nightly snapshots in a separate cloud region, kept 7 days by default (longer on Enterprise).',
	]),
	row('High availability', [
		'Deployed across several availability zones: PostgreSQL in a multi-zone setup, Cassandra and Kafka with replication factor 3.',
		'Application high availability on Scale and Enterprise; Launch and Growth run one application instance. Databases are replicated across availability zones on every plan.',
	]),
	row('Uptime', [
		'—',
		'Contractual SLA: 99.9% on Launch and Growth, 99.95% on Scale and Enterprise, and a custom SLA on Enterprise on request. Monitored 24×7.',
	]),
	row('Data center certifications', [
		'AWS: ISO 27001, PCI DSS, SOC 2.',
		'ISO 27001, PCI DSS and SOC 2 certified data centers.',
	]),
	row('Data retention (TTL)', ['30 to 365 days, depending on plan.', '365 days by default; you can change it.']),
	row('Infrastructure access', [
		"Authorized ThingsBoard engineers only, with regular audits and monitoring. They work with your tenant's data only to handle a request you raised; access is role-based and logged.",
		"Authorized ThingsBoard engineers only, with regular audits and monitoring. They work with your tenant's data only to handle a request you raised; access is role-based and logged. You don't get a sysadmin account by default; read-only metrics and Kubernetes dashboards are available under NDA.",
	]),
	row('Leaving', [
		'You export your data through the REST API; we delete your tenant after cancellation.',
		'We prepare a full encrypted PostgreSQL/Cassandra dump. You have 60 days to download it; then we permanently delete all backups and cluster data.',
	]),
];

export const CLOUD_GROUPS: ComparisonGroup[] = groupRows(CLOUD_COMPARE, [
	{
		label: 'Operations',
		icon: 'tabler:settings',
		color: MARK_COLOR.violet,
		labels: ['Who runs it', 'Hosting', 'High availability', 'Uptime', 'Infrastructure access'],
	},
	{
		label: 'Data',
		icon: 'tabler:database',
		color: MARK_COLOR.blue,
		labels: ['Data residency', 'Isolation', 'Backups', 'Data retention (TTL)', 'Leaving'],
	},
	{
		label: 'Security',
		icon: 'tabler:shield-lock',
		color: MARK_COLOR.cyan,
		labels: ['Encryption in transit', 'Network protection', 'Data center certifications'],
	},
]);

export const CLOUD_DOCS: DocRow[] = [
	docRow('terms-of-use', 'Terms of Use (North America and EU)'),
	docRow('privacy-policy', 'Privacy Policy (North America and EU)'),
	docRow('data-processing-addendum'),
	docRow('sub-processor-list', 'Sub-processors'),
	{
		name: 'AWS attestations (SOC 2, ISO 27001)',
		access: 'public',
		actions: [{ label: 'View', href: 'https://aws.amazon.com/artifact/' }],
	},
	docRow('backup-policy', 'Backup policy (frequency, retention)'),
];

export const PRIVATE_CLOUD_DOCS_INTRO = 'Same set as ThingsBoard Cloud; only the differences are listed.';

export const PRIVATE_CLOUD_DOCS: DocRow[] = [
	docRow('private-cloud-sla', 'Private Cloud SLA and service description (uptime formula, exclusions)'),
	docRow('private-cloud-architecture', 'Cluster architecture and read-only metrics'),
	{
		name: 'Data center certifications (ISO 27001, PCI DSS, SOC 2)',
		access: 'public',
		actions: [
			{ label: 'AWS', href: 'https://aws.amazon.com/compliance/programs/' },
			{ label: 'Azure', href: 'https://learn.microsoft.com/en-us/azure/compliance/' },
			{ label: 'GCP', href: 'https://cloud.google.com/security/compliance' },
		],
	},
];

// ── On-premises ───────────────────────────────────────────────────────────────

export const ONPREM_LEDE =
	'You run the platform on your own infrastructure and keep full control over it. We are responsible for the product code, security fixes and the guides below. Our certificates cover how we build and support the software; your installation is your own scope.';

export const ONPREM_FACTS: Fact[] = [
	{
		label: 'You run',
		html: 'Infrastructure, network perimeter, OS and database patching, platform upgrades, TLS certificates, backups, high availability and recovery.',
	},
	{
		label: 'Built into the product',
		html: '2FA, OAuth 2.0 single sign-on, role-based access control, API keys, an audit log, AES-256 secrets storage, and X.509 certificates with mutual TLS for devices.',
	},
	{
		label: 'Security fixes',
		html: 'Maintenance and patch releases of your release line, with no upgrade script: database changes apply in the background after startup. Fixed CVE IDs are listed in the release notes. Pin a tag such as 4.4.0-latest to receive patches automatically.',
	},
	{
		label: 'Release support',
		html: 'LTS releases: 18 months. Standard releases: 6 months. For production, use the latest LTS line.',
	},
	{
		label: 'Network requirements',
		html: 'An outbound connection to license.thingsboard.io for the hourly license check. Perpetual licenses can use the offline licensing add-on instead.',
	},
];

export const ONPREM_GUIDES: { label: string; href: string }[] = [
	{ label: 'Password, lockout and session settings', href: '/docs/pe/user-guide/security/' },
	{ label: 'Two-factor authentication', href: '/docs/pe/user-guide/security/two-factor-authentication/' },
	{ label: 'OAuth 2.0 single sign-on', href: '/docs/pe/user-guide/security/oauth-2-support/' },
	{ label: 'API keys', href: '/docs/pe/user-guide/security/api-keys/' },
	{ label: 'HTTPS for the web UI and REST API', href: '/docs/pe/reference/http-api/getting-connected/#https-tls' },
	{ label: 'Custom domains', href: '/docs/pe/user-guide/security/domains/' },
	{ label: 'MQTT transport security', href: '/docs/pe/reference/mqtt-api/getting-connected/' },
	{ label: 'HTTP transport security', href: '/docs/pe/reference/http-api/getting-connected/' },
	{ label: 'CoAP transport security', href: '/docs/pe/reference/coap-api/getting-connected/' },
	{ label: 'LwM2M transport security', href: '/docs/pe/reference/lwm2m-api/getting-started/' },
	{ label: 'SNMP transport security', href: '/docs/pe/reference/snmp-api/getting-connected/' },
	{ label: 'Audit log', href: '/docs/pe/user-guide/security/audit-log/' },
	{ label: 'Secrets storage', href: '/docs/pe/user-guide/security/secrets-storage/' },
	{ label: 'Security overview', href: '/docs/pe/user-guide/security/overview/' },
];

export const ONPREM_DOCS: DocRow[] = [
	{
		name: 'Installation guides (Docker, Kubernetes, Ubuntu, cloud marketplaces)',
		access: 'public',
		actions: [{ label: 'View', href: '/docs/pe/installation/' }],
	},
	{ name: 'Release policy', access: 'public', actions: [{ label: 'View', href: '/docs/pe/releases/release-policy/' }] },
	{ name: 'Release notes', access: 'public', actions: [{ label: 'View', href: '/docs/pe/releases/releases-table/' }] },
	docRow('license-server'),
	docRow('license-agreement'),
	docRow('support-services'),
];

export const PER_PRODUCT_NOTE = `ThingsBoard Edge, IoT Gateway, TBMQ, Trendz and the mobile apps split responsibility differently. <a href="${contactHref(SECURITY_TOPICS.question.value)}">Ask our security team</a> for a breakdown by product.`;

// ── Commitment and responsibility ─────────────────────────────────────────────

export const COMMITMENTS_LEDE = 'What we commit to, and what ThingsBoard handles in each deployment model.';

export const COMMITMENT_ROWS: CatalogRow[] = [
	{ title: 'Documents under NDA', html: `Within <b>${NDA_TURNAROUND}</b> after we sign a mutual NDA.` },
	{
		title: 'Security questionnaires',
		html: 'We give you the information you need to complete your security questionnaire.',
	},
	{
		title: 'Support',
		lines: [
			{
				label: 'ThingsBoard Cloud',
				text: 'community support on GitHub for Free and Prototype; help desk on Pilot; priority help desk on Startup and Business. Replies within 24 hours, 8:00–20:00 EET, Monday to Friday.',
			},
			{
				label: 'Private Cloud',
				text: 'Support Portal on every plan; priority channel on Growth, Scale and Enterprise; engineering support and a dedicated customer success engineer on Enterprise.',
			},
			{
				label: 'On-premises',
				text: 'community support on Free; help desk on Pilot (replies within 36 hours); priority help desk on Startup (replies within 36 hours) and Business (within 12 hours). Perpetual licenses include the first year of support.',
			},
		],
	},
	{
		title: 'Uptime: Private Cloud',
		html: 'Contractual SLA: <b>99.9%</b> on Launch and Growth, <b>99.95%</b> on Scale and Enterprise, and a custom SLA on Enterprise on request.',
	},
	{
		title: 'Leaving Private Cloud',
		html: 'A full encrypted export of your data. You have <b>60 days</b> to download it; then we permanently delete all backups and cluster data.',
	},
];

export const RESPONSIBILITY_COLUMNS: ComparisonColumn[] = [
	{ name: 'ThingsBoard Cloud', icon: DEPLOYMENT_ICON.cloud },
	{ name: 'Private Cloud', icon: DEPLOYMENT_ICON.private },
	{ name: 'On-premises', icon: DEPLOYMENT_ICON.onprem },
];

const TB = '✓ ThingsBoard';
const YOU = 'You';
const BUILT_IN = 'Built in, managed by you';

const RESPONSIBILITY_ROWS: ComparisonRow[] = [
	row('Secure development, testing and product fixes', [TB, TB, TB]),
	row('Security features: 2FA, SSO, RBAC, audit log, secrets storage', [BUILT_IN, BUILT_IN, BUILT_IN]),
	row('Data center security, through our cloud providers', [TB, TB, YOU]),
	row('Hosting region', [`${TB} — North America or EU`, `${TB} — The region you need`, YOU]),
	row('Network perimeter, firewall, DDoS protection', [TB, TB, YOU]),
	row('OS, Kubernetes and database patching', [TB, TB, YOU]),
	row('Platform upgrades and security patches', [TB, TB, YOU]),
	row('TLS certificates on platform endpoints', [TB, TB, YOU]),
	row('Capacity, scaling and high availability', [TB, TB, YOU]),
	row('Backups and restore', [TB, TB, YOU]),
	row('Disaster recovery and business continuity', [TB, TB, YOU]),
	row('Infrastructure monitoring and alerting', [TB, TB, YOU]),
	row('Platform sysadmin account and platform-wide security settings', [TB, TB, YOU]),
	row('Hardening the deployment', [TB, TB, YOU]),
];

export const RESPONSIBILITY: ComparisonGroup[] = groupRows(RESPONSIBILITY_ROWS, [
	{
		label: 'Product',
		icon: 'tabler:app-window',
		color: MARK_COLOR.blue,
		labels: [
			'Secure development, testing and product fixes',
			'Security features: 2FA, SSO, RBAC, audit log, secrets storage',
		],
	},
	{
		label: 'Hosting and infrastructure',
		icon: 'tabler:server',
		color: MARK_COLOR.green,
		labels: [
			'Data center security, through our cloud providers',
			'Hosting region',
			'Network perimeter, firewall, DDoS protection',
			'Capacity, scaling and high availability',
		],
	},
	{
		label: 'Platform operations',
		icon: 'tabler:settings',
		color: MARK_COLOR.violet,
		labels: [
			'OS, Kubernetes and database patching',
			'Platform upgrades and security patches',
			'TLS certificates on platform endpoints',
			'Platform sysadmin account and platform-wide security settings',
			'Hardening the deployment',
		],
	},
	{
		label: 'Continuity',
		icon: 'tabler:lifebuoy',
		color: MARK_COLOR.amber,
		labels: [
			'Backups and restore',
			'Disaster recovery and business continuity',
			'Infrastructure monitoring and alerting',
		],
	},
]);

export const CONFIGURE_INTRO =
	'We built these controls into the platform, so you can tune security to your own needs in every deployment instead of building it from scratch:';

export const CONFIGURE_LIST = [
	'Manage users, roles and access reviews in your tenant',
	'Turn on 2FA and single sign-on',
	'Issue API keys and integration credentials',
	'Choose device credentials, provisioning and transport security',
	'Decide what rule chains and integrations send to third parties',
	'Control which dashboards are public',
	'Choose which data you upload and how you classify it',
	'Set data retention within your plan limits',
	'Export your data at any time',
	'Follow activity in the audit log',
	"Meet your industry's requirements, such as HIPAA or 21 CFR Part 11",
];
