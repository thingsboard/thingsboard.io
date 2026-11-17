/** The four security topic pages' rows, and Commitments' (`Catalog` renders them). */

/** A line of a row's list, opening on a label: a protocol, or a deployment (which takes its icon). */
export interface CatalogLine {
	label?: string;
	text: string;
}

export interface CatalogRow {
	title: string;
	/** Shows the "Configurable" chip: the platform has it, you decide how. */
	configurable?: true;
	/** The row's text (may hold `<b>`), or its lines instead. */
	html?: string;
	lines?: CatalogLine[];
	docs?: string;
}

const CAT_PRODUCT: CatalogRow[] = [
	{
		title: 'Secrets storage',
		html: "An AES-256 encrypted vault for API tokens, passwords and certificates used in integrations and rule chains, so credentials don't sit in plain configuration.",
		docs: '/docs/pe/user-guide/security/secrets-storage/',
	},
	{
		title: 'Device authentication',
		lines: [
			{ label: 'MQTT', text: 'access token, MQTT Basic credentials or X.509 certificate.' },
			{ label: 'HTTP', text: 'access token.' },
			{ label: 'CoAP', text: 'access token or X.509 certificate.' },
			{ label: 'LwM2M', text: 'pre-shared key, raw public key or X.509 certificate.' },
			{ label: 'SNMP', text: 'community string (v1/v2c) or USM credentials (v3).' },
			{
				label: 'Mutual TLS',
				text: 'on MQTT, CoAP and LwM2M, both the device and the server authenticate with X.509 certificates. For a device fleet, we recommend X.509 with a certificate chain.',
			},
		],
		docs: '/docs/pe/user-guide/security/overview/',
	},
	{
		title: 'Encrypted device transport',
		configurable: true,
		html: 'MQTT over TLS on port 8883, HTTP over TLS on 443, CoAP over DTLS on 5684, LwM2M over DTLS on 5686 and 5688, and SNMPv3 with USM authentication and encryption.',
		docs: '/docs/pe/reference/mqtt-api/getting-connected/',
	},
	{
		title: 'Custom domains with automatic SSL (ThingsBoard Cloud, web UI)',
		html: 'Bind your own domain name; the platform provisions the SSL certificate automatically.',
		docs: '/docs/pe/user-guide/security/domains/',
	},
];

const CAT_DATA: CatalogRow[] = [
	{
		title: 'Data ownership',
		html: "Customer data belongs to the customer. We process it on your behalf under the DPA and don't use it to train or improve ThingsBoard's own AI models.",
	},
	{
		title: 'Tenant isolation',
		lines: [
			{
				label: 'ThingsBoard Cloud',
				text: 'every request is confined to its own tenant; customers and entity groups narrow access further.',
			},
			{ label: 'Private Cloud', text: 'a dedicated single-tenant cluster.' },
			{ label: 'On-premises', text: 'your own installation.' },
		],
	},
	{
		title: 'Encryption in transit',
		configurable: true,
		html: 'Users and devices connect over TLS: HTTPS on 443, MQTTS on 8883, DTLS for CoAP and LwM2M.',
	},
	{
		title: 'Secrets and passwords',
		html: 'Stored secrets are encrypted with AES-256, and user passwords are stored as BCrypt hashes in every deployment.',
	},
	{
		title: 'Storage region',
		lines: [
			{ label: 'ThingsBoard Cloud', text: 'North America or EU; data never moves between regions.' },
			{ label: 'Private Cloud', text: 'North America, EU or APAC.' },
			{ label: 'On-premises', text: 'wherever you deploy.' },
		],
	},
	{
		title: 'Backups',
		lines: [
			{ label: 'ThingsBoard Cloud', text: 'daily, with point-in-time recovery.' },
			{ label: 'Private Cloud', text: 'nightly snapshots in a separate cloud region, kept 7 days by default.' },
			{ label: 'On-premises', text: 'you run backups.' },
		],
	},
	{
		title: 'Data retention',
		configurable: true,
		lines: [
			{ label: 'ThingsBoard Cloud', text: '30 to 365 days, depending on plan.' },
			{ label: 'Private Cloud', text: '365 days by default; you can change it.' },
			{ label: 'On-premises', text: 'you set it.' },
		],
	},
	{
		title: 'Export',
		lines: [
			{
				label: 'Every deployment',
				text: 'telemetry, entities and dashboards are available through the REST API at any time.',
			},
			{
				label: 'Private Cloud',
				text: 'when you leave, we prepare a full encrypted PostgreSQL/Cassandra dump of your data.',
			},
		],
	},
	{
		title: 'Deletion',
		lines: [
			{ label: 'ThingsBoard Cloud', text: 'we delete your tenant after cancellation.' },
			{
				label: 'Private Cloud',
				text: '60 days after cancellation, we permanently delete all backups and cluster data. GDPR erasure requests are completed within 30 days.',
			},
			{ label: 'On-premises', text: 'you control deletion.' },
		],
	},
	{
		title: 'Access by ThingsBoard staff',
		lines: [
			{
				label: 'ThingsBoard Cloud and Private Cloud',
				text: "only authorized ThingsBoard engineers can access the infrastructure, with regular audits and monitoring. They work with your tenant's data only to handle a request you raised; access is role-based and logged.",
			},
			{ label: 'On-premises', text: 'we have no access to your installation.' },
		],
	},
	{
		title: 'Data center certifications',
		html: 'ThingsBoard Cloud and Private Cloud run in data centers with ISO 27001, PCI DSS and SOC 2 attestations.',
	},
];

const CAT_ACCESS: CatalogRow[] = [
	{
		title: 'Two-factor authentication',
		html: 'TOTP authenticator apps, email, SMS and backup codes. System administrators set the platform policy, and tenant administrators can apply their own. From version 4.3, you can require 2FA for all users, for system administrators only, or for tenant administrators of selected tenants. Code lifetime, resend limits and lockout after failed attempts are configurable.',
		docs: '/docs/pe/user-guide/security/two-factor-authentication/',
	},
	{
		title: 'Single sign-on',
		html: 'OAuth 2.0 and OpenID Connect with Google, Auth0, Keycloak, Okta, Azure AD and other identity providers, so account lifecycle stays in your directory. SAML and LDAP are not supported.',
		docs: '/docs/pe/user-guide/security/oauth-2-support/',
	},
	{
		title: 'API keys',
		html: "Long-lived credentials for integrations, scripts and automation, so you don't share a user's password.",
		docs: '/docs/pe/user-guide/security/api-keys/',
	},
	{
		title: 'Role-based access control',
		html: 'Roles and entity groups scope each user to their own devices, assets and dashboards: a customer, an operator and an analyst each see only what belongs to them.',
	},
	{
		title: 'Session lifetimes',
		configurable: true,
		html: 'You set how long access and refresh tokens (JWT) stay valid. The defaults are 2.5 hours and 7 days; we recommend shortening both.',
		docs: '/docs/pe/user-guide/security/',
	},
	{
		title: 'Audit log',
		html: 'The platform records user actions in an audit log. On-premises you can forward it to Elasticsearch; in every deployment you can read it through the REST API.',
		docs: '/docs/pe/user-guide/security/audit-log/',
	},
	{
		title: 'Password and lockout policy',
		configurable: true,
		html: 'Minimum length, complexity and lockout after failed attempts, set by the administrator.',
		docs: '/docs/pe/user-guide/security/',
	},
	{
		title: 'Password expiration',
		configurable: true,
		html: 'You can make passwords expire after a set period if your policy requires it. NIST SP 800-63B advises against scheduled rotation, so we recommend it only where a regulator asks for it.',
		docs: '/docs/pe/user-guide/security/',
	},
];

const CAT_APPSEC: CatalogRow[] = [
	{
		title: 'Code review and protected branches',
		html: 'Every change is reviewed before merge, and branch protection keeps unreviewed code out.',
	},
	{
		title: 'Separate environments',
		html: 'Development, test and production run separately, and production data is never used in tests.',
	},
	{ title: 'Code analysis (SAST)', html: 'Snyk Code scans LTS branches every week.' },
	{
		title: 'Dependency scanning',
		html: 'Snyk Open Source checks third-party dependencies every week.',
	},
	{
		title: 'Container scanning',
		html: 'Docker Scout and Snyk Container scan our container images.',
	},
	{
		title: 'Change management',
		html: 'Changes are requested, assessed and approved and tracked in Jira; minor changes follow a shortened path.',
	},
	{
		title: 'Independent penetration testing',
		html: 'An external tester checks the platform every year, following OWASP, OSSTMM and NIST SP 800-115. The latest test, by DataArt, ran in February 2026, with a retest in March 2026.',
	},
	{
		title: 'Security fixes and CVEs',
		html: 'Security fixes ship in maintenance and patch releases, which need no upgrade script. Fixed CVE IDs are listed in the Security section of the release notes.',
		docs: '/docs/pe/releases/releases-table/',
	},
	{
		title: 'Release support',
		html: 'LTS releases are supported for 18 months, standard releases for 6 months.',
		docs: '/docs/pe/releases/release-policy/',
	},
];

/** The four security topic pages (`[topic].astro`): each one's lede, description, list name and rows. */
export const TOPIC_PAGES: Record<string, { lede: string; description: string; label: string; rows: CatalogRow[] }> = {
	product: {
		lede: "How the platform protects device connections, credentials and secrets, so you don't have to build this layer yourself.",
		description:
			'How ThingsBoard protects device connections, credentials and secrets: secrets storage, device authentication, encrypted transport and custom domains.',
		label: 'Product security controls',
		rows: CAT_PRODUCT,
	},
	data: {
		lede: 'What happens to the data your devices send to the platform, from the moment it arrives until you delete it.',
		description:
			'What happens to the data your devices send to ThingsBoard: ownership, isolation, encryption, storage region, backups, retention, export and deletion.',
		label: 'Data security controls',
		rows: CAT_DATA,
	},
	access: {
		lede: 'Who can sign in, what each user can see, and a record of what they did. We built these controls into the platform; you decide how strictly to apply them in your tenant.',
		description:
			'Access control in ThingsBoard: two-factor authentication, single sign-on, API keys, role-based access, session lifetimes, the audit log and password policies.',
		label: 'Access controls',
		rows: CAT_ACCESS,
	},
	appsec: {
		lede: 'How we build, test and release the software you run. These practices come from years of delivering production IoT solutions on our own platform.',
		description:
			'How ThingsBoard builds, tests and releases its software: code review, separate environments, scanning, change management, penetration testing, security fixes and release support.',
		label: 'Development security practices',
		rows: CAT_APPSEC,
	},
};
