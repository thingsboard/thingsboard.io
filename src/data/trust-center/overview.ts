import { NDA_TURNAROUND } from '@data/trust-center/nav';
import { pageFor } from '@data/trust-center/pages';

/** The hub's lede, topic tiles, deployment cards and documents intro. */

export const OVERVIEW_LEDE =
	'Security is built into every layer of ThingsBoard, from device connections to the way we develop and run the platform. Your data stays isolated, encrypted in transit and under your control.';

export const DEPLOYMENTS_LEAD =
	'Whether you use ThingsBoard Cloud, Private Cloud or run the platform on-premises, you get the same security features and the same engineering practices behind every release.';

/** A topic tile: its page's title, line (without the full stop), icon and address, and its points. */
const tile = (path: string, points: string[], title?: string) => {
	const p = pageFor(path);
	return { title: title ?? p.title, subtitle: p.line.replace(/\.$/, ''), icon: p.icon, href: p.href, points };
};

export const TILES = [
	tile('compliance', ['ISO/IEC 27001:2022 — certified', 'ISO 9001:2015 — certified', 'GDPR and CCPA, self-declared']),
	tile('data', [
		'Tenant isolation by architecture',
		'Encrypted in transit with TLS',
		'Region of your choice: North America or EU (Cloud), plus APAC (Private Cloud)',
		'Export anytime via API, no lock-in',
	]),
	tile('product', [
		'Encrypted device connections',
		'X.509 device credentials and mutual TLS',
		'AES-256 encrypted secrets storage',
	]),
	tile('access', [
		'2FA enforceable for all users',
		'SSO with OAuth 2.0 and OpenID Connect',
		'Role-based access with entity groups',
	]),
	tile('appsec', [
		'Mandatory code review before merge',
		'Weekly code and dependency scanning',
		'Annual external penetration test',
	]),
	tile(
		'commitments',
		[
			`NDA documents within ${NDA_TURNAROUND}`,
			'Support response times for every plan',
			'Private Cloud uptime SLA up to 99.95%',
		],
		'Our commitments'
	),
];

/** A deployment card: its page's title, line, icon and address, its mark's scheme, and its rows. */
const deploymentCard = (path: string, accent: 'brand' | 'onprem', rows: { label: string; lines: string[] }[]) => {
	const p = pageFor(path);
	return { title: p.title, text: p.line, icon: p.icon, href: p.href, accent, rows };
};

export const DEPLOYMENT_CARDS = [
	deploymentCard('cloud', 'brand', [
		{
			label: 'We run',
			lines: ['We host and operate everything: infrastructure, patching, upgrades, monitoring and backups.'],
		},
		{
			label: 'Isolation',
			lines: [
				'Cloud: every request is confined to its own tenant.',
				'Private Cloud: a dedicated single-tenant cluster.',
			],
		},
		{ label: 'Region', lines: ['Cloud: North America or EU.', 'Private Cloud: North America, EU or APAC.'] },
		{ label: 'Encryption', lines: ['TLS in transit: HTTPS on 443, MQTTS on 8883.'] },
		{
			label: 'Backups',
			lines: ['Cloud: daily, with point-in-time recovery.', 'Private Cloud: nightly, in a separate cloud region.'],
		},
		{
			label: 'Staff access',
			lines: ['Authorized engineers only, and only to handle your request; role-based and logged.'],
		},
	]),
	deploymentCard('onprem', 'onprem', [
		{ label: 'You run', lines: ['Infrastructure, network, patching, backups and recovery.'] },
		{ label: 'Built in', lines: ['2FA, SSO, RBAC, an audit log, and X.509 with mutual TLS for devices.'] },
		{ label: 'Guides', lines: ['Step-by-step security configuration for every feature in the documentation.'] },
		{
			label: 'Security fixes',
			lines: ['Patch releases with no environment or database changes; fixed CVEs listed in release notes.'],
		},
		{ label: 'Support period', lines: ['LTS releases: 18 months. Standard releases: 6 months.'] },
	]),
];

export const HUB_DOCUMENTS_INTRO = `Public documents are open to everyone. Documents that describe our weak spots, such as the Statement of Applicability and the pentest summary, are shared under a mutual NDA.`;
