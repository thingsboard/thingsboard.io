/** Copy for the homepage's five feature rows. */

export interface HomeRow {
	slug: 'connect' | 'build' | 'twin' | 'normalize' | 'scale';
	title: string;
	body: string;
	link: { text: string; href: string };
	badge: { icon: string; color: string };
}

export const HOME_ROWS: HomeRow[] = [
	{
		slug: 'connect',
		title: 'Connect any IoT devices',
		body: "Directly, through an IoT gateway, from a LoRaWAN or NB-IoT network, or via a platform integration. Mix sensors, industrial machines, and any equipment you need in one solution. Browse pre-integrated devices from IoT Hub, or use emulators when hardware isn't ready.",
		link: { text: 'Connectivity guide', href: '/docs/pe/connect-iot-devices/' },
		badge: { icon: 'tabler:plug-connected', color: '#007c7b' },
	},
	{
		slug: 'build',
		title: 'Build IoT solutions from device to end-user',
		body: 'ThingsBoard enables development of the complete use-case and is white-labeled for your customers or your team: ship complete IoT applications, not just data pipelines.',
		link: { text: 'Getting started tutorial', href: '/docs/pe/getting-started/' },
		badge: { icon: 'tabler:tools', color: '#3d50f5' },
	},
	{
		slug: 'twin',
		title: 'Model your real world',
		body: 'Organize devices, assets, customers, and hierarchies that match your case. Control data, permissions, and processing at every level — site, machine, or single sensor. Aggregate, transform, and act on data wherever it makes sense.',
		link: { text: 'Digital twin model', href: '/docs/pe/concepts/digital-twin-model/' },
		badge: { icon: 'tabler:box-model', color: '#7a37e7' },
	},
	{
		slug: 'normalize',
		title: 'Turn IoT data into action',
		body: 'Normalize data from any device or protocol. Spot anomalies before they hit production. Filter signals from noise before alerts reach your team. Push data and notifications into your CRM, ERP, or other external app — your data, your workflows.',
		link: { text: 'Data processing concepts', href: '/docs/pe/concepts/data-processing/' },
		badge: { icon: 'tabler:binary-tree', color: '#b44100' },
	},
	{
		slug: 'scale',
		title: 'Predictable at any scale',
		body: 'Start with 5 devices on a single server and grow to 5+ million on a clustered deployment. Your dashboards, calculated fields, and device profiles carry over unchanged — you scale the deployment, not your solution. Performance scales linearly as you add nodes.',
		link: { text: 'Architecture reference', href: '/docs/pe/reference/architecture/' },
		badge: { icon: 'tabler:trending-up', color: '#008242' },
	},
];

/** The Dashboards section's mark, which has no row of its own. */
export const DASHBOARDS_BADGE: HomeRow['badge'] = { icon: 'tabler:layout-dashboard', color: '#006bc7' };
