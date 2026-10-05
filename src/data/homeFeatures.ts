export interface FeatureItem {
	/** Iconify icon name from the Tabler set (e.g., "tabler:palette") */
	tablerIcon: string;
	title: string;
	href: string;
	description: string;
}

export const homeFeatures: FeatureItem[] = [
	{
		tablerIcon: 'tabler:chart-line',
		title: 'Data visualization',
		href: '/iot-data-visualization/',
		description:
			'600+ built-in widgets — charts, gauges, maps, SCADA-ready industrial control. Build custom widgets with the built-in editor. Real-time dashboards with role-based access, shareable with your team, customers, and their end users.',
	},
	{
		tablerIcon: 'tabler:palette',
		title: 'White-labeling',
		href: '/docs/pe/user-guide/white-labeling/',
		description:
			'Ship branded IoT solutions under your name — no coding or service restart required. Multi-level white-labeling: your customers and their customers can brand their own interface.',
	},
	{
		tablerIcon: 'tabler:users-group',
		title: 'Multi-tenancy',
		href: '/docs/pe/user-guide/multi-tenancy/',
		description:
			'Multi-tenant installations out-of-the-box. Each tenant can have multiple administrators managing millions of devices and customers — with full data isolation between tenants.',
	},
	{
		tablerIcon: 'tabler:sparkles',
		title: 'Built-in AI',
		href: '/docs/pe/iot-solutions-with-ai/',
		description:
			'Go from a plain-language prompt to a working solution — devices, dashboards and rules already wired together. Work with AI in the UI, or from your terminal with the CLI and your own coding agents.',
	},
	{
		tablerIcon: 'tabler:cpu',
		title: 'Device emulators',
		href: '/blog/from-zero-to-live-demo-how-to-simulate-real-world-iot-environments-instantly/',
		description:
			'Test your solution with realistic device data — no hardware needed. Prototype dashboards, tune rules, and validate at scale before your first device ships.',
	},
	{
		tablerIcon: 'tabler:cloud-download',
		title: 'OTA updates',
		href: '/docs/pe/user-guide/ota-updates/',
		description:
			"Push firmware and software to a whole device profile at once. Upload a package, assign it, and watch each device's progress — no site visit required.",
	},
	{
		tablerIcon: 'tabler:lock-access',
		title: 'Fine-grained RBAC & SSO',
		href: '/docs/pe/user-guide/roles/',
		description:
			'Roles and permissions down to the individual entity. Bring your own identity provider with OAuth 2.0 SSO and two-factor authentication, so every tenant, customer and end user sees exactly what they should.',
	},
	{
		tablerIcon: 'tabler:certificate',
		title: 'Security & compliance',
		href: '/docs/pe/user-guide/security/',
		description:
			'Every LTS release receives regular security patches — reviewed and applied by our engineers, not left to the community — plus an independent third-party penetration test. ISO 27001 and ISO 9001 certified.',
	},
	{
		tablerIcon: 'tabler:shield-lock',
		title: 'Data sovereignty & air-gapped',
		href: '/docs/pe/installation/',
		description:
			'Deploy in air-gapped environments with no internet connection. Your data stays where regulation, corporate policy, or operations require it — behind your firewall, in your data center, or in your cloud.',
	},
	{
		tablerIcon: 'tabler:stack-2',
		title: 'Horizontal scalability',
		href: '/docs/pe/reference/architecture/',
		description:
			'Start <a href="/docs/pe/reference/architecture/monolithic/">monolithic</a> for quick launches, move to <a href="/docs/pe/reference/architecture/microservices/">microservices</a> as load grows. Add instances of any service — no single point of failure, and no rewrite along the way.',
	},
	{
		tablerIcon: 'tabler:database',
		title: 'SQL, NoSQL, or hybrid database',
		href: '/docs/pe/reference/architecture/database/',
		description:
			'Choose SQL, NoSQL, or run both side-by-side. Store main entities and telemetry data wherever fits your operational and cost profile.',
	},
	{
		tablerIcon: 'tabler:source-code',
		title: 'Source-available & customization',
		href: 'https://github.com/thingsboard/thingsboard',
		description:
			'Full access to the source code — customize every part of your solution. Extend via APIs; integrate with any external system. Adapt the platform to your use case, not the other way around.',
	},
];
