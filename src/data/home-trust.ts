/** The homepage trust band: its heading, three cards and the data their drawings (`TrustVisualStages`) show. */

export type TrustKind = 'security' | 'scale' | 'open';

interface TrustPoint {
	kind: TrustKind;
	title: string;
	body: string;
	link: { text: string; href: string };
}

export const TRUST_HEADING = {
	title: 'Safe to build on',
	subtitle: 'Certified, ready to scale and open to extend, whichever way you deploy it.',
};

export const TRUST_POINTS: TrustPoint[] = [
	{
		kind: 'security',
		title: 'Secure and certified',
		body: 'ISO 27001 and ISO 9001 certified, independently penetration-tested, and patched on every LTS release. SSO, two-factor sign-in, and RBAC.',
		link: { text: 'Trust Center', href: '/trust-center/' },
	},
	{
		kind: 'scale',
		title: 'Scale without surprises',
		body: 'Start on one server and move to a cluster as you grow. Dashboards, calculated fields and device profiles carry over unchanged: you scale the deployment, not your solution.',
		link: { text: 'Architecture reference', href: '/docs/pe/reference/architecture/' },
	},
	{
		kind: 'open',
		title: 'Source-available',
		body: 'Read the source on GitHub. Connect devices over open protocols. Use REST and WebSocket APIs and SDKs for everything else. Extend any part of the platform, or integrate it with any system.',
		link: { text: 'APIs & SDKs', href: '/docs/pe/apis-and-sdks/' },
	},
];

// Drawn as plain seals: ISO's logo may not stand for a certification; use the certification body's mark once supplied.
export const TRUST_CERTS = ['27001', '9001'];

export const TRUST_REPO = 'thingsboard/thingsboard';

interface TrustScaleStage {
	mode: string;
	devices: string;
	hue: string;
	/** Its section of the devices bar, in percent; the bar fills at one pace, so also its share of the loop. */
	span: number;
	/** Nodes lit out of five. */
	cells: number;
	stores: string[];
}

export const TRUST_SCALE_STAGES: TrustScaleStage[] = [
	{
		mode: 'Monolith',
		devices: '1–100K devices',
		span: 25,
		hue: 'var(--color-primary, #3d50f5)',
		cells: 1,
		stores: ['PostgreSQL'],
	},
	{
		mode: 'Hybrid',
		devices: '100K–1M devices',
		span: 25,
		hue: '#007c7b',
		cells: 1,
		stores: ['PostgreSQL', 'Cassandra'],
	},
	{
		mode: 'Cluster',
		devices: '1M+ devices',
		span: 50,
		hue: 'var(--color-product-gw, #6d28d9)',
		cells: 5,
		stores: ['PostgreSQL', 'Cassandra', 'Citus', 'Kafka', 'Valkey'],
	},
];

export const TRUST_STAGES_LABELS = {
	security: 'Certified to ISO 27001 and ISO 9001.',
	scale:
		'As it grows: a monolith on PostgreSQL for up to 100 thousand devices, hybrid storage adding Cassandra beside PostgreSQL up to a million, and a cluster adding Citus, Kafka and Valkey beyond a million.',
};

/** The scale card's stores and their icons, in display order. */
export const TRUST_STORES: Record<string, string> = {
	PostgreSQL: 'simple-icons:postgresql',
	Cassandra: 'simple-icons:apachecassandra',
	Citus: 'citus',
	Kafka: 'simple-icons:apachekafka',
	Valkey: 'valkey',
};
