/** Copy for the homepage's four feature rows. */

export interface HomeRow {
	slug: 'connect' | 'build' | 'twin' | 'normalize';
	title: string;
	body: string;
	links: { text: string; href: string }[];
	badge: { icon: string; color: string };
}

export const HOME_ROWS: HomeRow[] = [
	{
		slug: 'connect',
		title: 'Connect any IoT devices',
		body: "Directly, through an IoT gateway, from a LoRaWAN or NB-IoT network, or via a platform integration. Mix sensors, industrial machines, and any equipment you need in one solution. Browse pre-integrated devices from IoT Hub, or use emulators when hardware isn't ready.",
		links: [{ text: 'Connectivity guide', href: '/docs/pe/connect-iot-devices/' }],
		badge: { icon: 'tabler:plug-connected', color: '#007c7b' },
	},
	{
		slug: 'twin',
		title: 'Model your real world',
		body: 'Organize devices, assets, customers, and hierarchies that match your case. Control data, permissions, and processing at every level — site, machine, or single sensor. Aggregate, transform, and act on data wherever it makes sense.',
		links: [{ text: 'Digital twin model', href: '/docs/pe/concepts/digital-twin-model/' }],
		badge: { icon: 'tabler:box-model', color: '#7a37e7' },
	},
	{
		slug: 'normalize',
		title: 'Turn IoT data into action',
		body: 'Normalize data from any device or protocol. Calculate the metrics that matter with real-time calculated fields. Raise alarms only on real anomalies, not noise. Then deliver data and events to your team, CRM, ERP, or any external app — your data, your workflows.',
		links: [
			{ text: 'Data processing', href: '/docs/pe/concepts/data-processing/' },
			{ text: 'Alarms & notifications', href: '/docs/pe/concepts/alarms-and-notifications/' },
		],
		badge: { icon: 'tabler:binary-tree', color: '#b44100' },
	},
	{
		slug: 'build',
		title: 'Build IoT solutions from device to end-user',
		body: 'ThingsBoard enables development of the complete use-case and is white-labeled for your customers or your team: ship complete IoT applications, not just data pipelines.',
		links: [{ text: 'Getting started tutorial', href: '/docs/pe/getting-started/' }],
		badge: { icon: 'tabler:tools', color: '#3d50f5' },
	},
];

/** The Dashboards section's mark, which has no row of its own. */
export const DASHBOARDS_BADGE: HomeRow['badge'] = { icon: 'tabler:layout-dashboard', color: '#b3268f' };
