import { CLOUD_REGIONS, type CloudRegion } from '@util/cloud-regions';

/** The products on the installations hub (`/installations/`), one section each. */

interface InstallLink {
	label: string;
	href: string;
}

interface InstallOption {
	label: string;
	note?: string;
	logo: string;
	href: string;
}

interface InstallOptionGroup {
	title: string;
	items: InstallOption[];
}

interface InstallAside {
	title: string;
	text: string;
	links: InstallLink[];
}

interface InstallProduct {
	id: string;
	name: string;
	/** Platforms only: the part of `name` set in `badgeFill`. Must occur in `name`. */
	nameHighlight?: string;
	label: string;
	description: string;
	icon: string;
	accent?: string;
	/** Platforms only: fills the tile and the button, and switches the section to `.is-platform`. */
	badgeFill?: string;
	buttonIcon?: string;
	primary?: InstallLink;
	links: InstallLink[];
	options: InstallOptionGroup[];
	regions?: readonly CloudRegion[];
	aside?: InstallAside;
}

const logo = (name: string) => `/src/assets/images/installation/${name}`;
const mark = (name: string) => `/src/assets/images/landings/${name}`;

export const installProducts: InstallProduct[] = [
	{
		id: 'cloud',
		name: 'ThingsBoard Cloud',
		nameHighlight: 'Cloud',
		label: 'Fully managed, shared or dedicated',
		description:
			'Nothing to install. Pick the region your data lives in and start on a free plan; we run the servers, scaling, backups and upgrades.',
		icon: '/images/pricing/thingsboard-icon.svg',
		badgeFill: 'var(--color-product-cloud)',
		links: [{ label: 'See plans', href: '/pricing/' }],
		regions: CLOUD_REGIONS,
		aside: {
			title: 'Private Cloud',
			text: 'A dedicated cluster we provision and operate for you, in the cloud and the region you choose.',
			links: [
				{
					label: 'Contact us',
					href: '/contact-us/?subject=Private%20Cloud&pcorder&message=I%20am%20interested%20in%20Private%20Cloud',
				},
				{ label: 'Cloud vs Private Cloud', href: '/products/paas/#public-vs-private' },
			],
		},
		options: [
			{
				title: 'In a cloud of your choice',
				items: [
					{ label: 'AWS', logo: logo('aws.svg'), href: '/docs/pe/installation/aws/' },
					{ label: 'Microsoft Azure', logo: logo('azure.svg'), href: '/docs/pe/installation/azure/' },
					{ label: 'Google Cloud Platform', logo: logo('gcp.svg'), href: '/docs/pe/installation/gcp/' },
					{ label: 'DigitalOcean', logo: logo('digital-ocean.svg'), href: '/docs/pe/installation/digital-ocean/' },
				],
			},
		],
	},
	{
		id: 'on-premises',
		name: 'ThingsBoard On-premises',
		nameHighlight: 'On-premises',
		label: 'Self-managed, on your infrastructure',
		description:
			'You run the deployment, on your own servers or fully offline. Free to install; the licence for the advanced features is on the pricing page.',
		icon: '/images/pricing/thingsboard-icon.svg',
		badgeFill: 'var(--brand-pe)',
		buttonIcon: 'tabler:server',
		primary: { label: 'Installation guide', href: '/docs/pe/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/' },
			{ label: 'Explore On-premises', href: '/products/thingsboard-pe/' },
		],
		// "Cluster setup" goes to the guide index, which lists the cluster guides.
		options: [
			{
				title: 'On your servers',
				items: [
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/pe/installation/ubuntu/' },
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/pe/installation/rhel/' },
					{ label: 'Raspberry Pi', logo: logo('raspberry-pi.svg'), href: '/docs/pe/installation/rpi/' },
					{
						label: 'Docker',
						note: 'Linux / macOS',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/pe/installation/docker/',
					},
					{
						label: 'Docker',
						note: 'Windows',
						logo: logo('docker-windows.svg'),
						href: '/docs/pe/installation/docker-windows/',
					},
					{
						label: 'Building from source',
						logo: logo('sources.svg'),
						href: '/docs/pe/installation/building-from-source/',
					},
					{ label: 'Cluster setup', logo: logo('kubernetes.svg'), href: '/docs/pe/installation/' },
				],
			},
		],
	},
	{
		id: 'edge',
		name: 'ThingsBoard Edge',
		label: 'Edge computing',
		description:
			'Processes and visualizes data locally at the network edge, enabling autonomous operation during connectivity outages. Manage every remote edge location from one platform.',
		icon: mark('ce/thingsboard-e-icon.svg'),
		accent: '#0f9b8e',
		primary: { label: 'Installation guide', href: '/docs/edge/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/?active=thingsboard-edge' },
			{ label: 'See how Edge works', href: '/products/thingsboard-edge/' },
		],
		options: [
			{
				title: 'Install on',
				items: [
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/edge/installation/ubuntu/' },
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/edge/installation/rhel/' },
					{
						label: 'Docker',
						note: 'Linux / macOS',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/edge/installation/docker/',
					},
					{
						label: 'Docker',
						note: 'Windows',
						logo: logo('docker-windows.svg'),
						href: '/docs/edge/installation/docker-windows/',
					},
					{
						label: 'Building from source',
						logo: logo('sources.svg'),
						href: '/docs/edge/installation/building-from-source/',
					},
					{
						label: 'Edge cluster setup',
						logo: logo('docker-compose.svg'),
						href: '/docs/edge/installation/docker-compose-setup/',
					},
				],
			},
		],
	},
	{
		id: 'trendz',
		name: 'Trendz Analytics',
		label: 'Analytics & AI',
		description:
			'Predictive analytics, anomaly detection and forecasting. Explore your data without code using natural-language queries, and run AI agents over it.',
		icon: mark('ce/trendz-icon.svg'),
		accent: '#1976d2',
		primary: { label: 'Installation guide', href: '/docs/trendz/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/' },
			{ label: 'Explore Trendz', href: '/products/trendz/' },
		],
		options: [
			{
				title: 'Install on',
				items: [
					{ label: 'Trendz Cloud', logo: logo('trendz-cloud.svg'), href: '/docs/trendz/installation/cloud/' },
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/trendz/installation/ubuntu/' },
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/trendz/installation/rhel/' },
					{
						label: 'Docker',
						note: 'Linux / macOS',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/trendz/installation/docker/',
					},
					{
						label: 'Docker',
						note: 'Windows',
						logo: logo('docker-windows.svg'),
						href: '/docs/trendz/installation/docker-windows/',
					},
				],
			},
		],
	},
	{
		id: 'gateway',
		name: 'IoT Gateway',
		label: 'Protocol bridge',
		description:
			'Brings legacy equipment online. Modbus, OPC UA, BACnet, SNMP, KNX and 25+ industrial protocols, translated to MQTT. Open-source, runs on a Raspberry Pi or industrial PC.',
		icon: mark('ce/gateway-icon.svg'),
		accent: '#7b3fe4',
		primary: { label: 'Installation guide', href: '/docs/iot-gateway/installation/' },
		links: [{ label: 'See supported protocols', href: '/docs/iot-gateway/' }],
		options: [
			{
				title: 'Install on',
				items: [
					{
						label: 'Docker',
						note: 'Linux / macOS',
						logo: logo('docker-linux-mac.svg'),
						href: '/docs/iot-gateway/installation/docker-installation/',
					},
					{
						label: 'Docker',
						note: 'Windows',
						logo: logo('docker-windows.svg'),
						href: '/docs/iot-gateway/installation/docker-windows/',
					},
					{
						label: 'Python package',
						logo: logo('python.svg'),
						href: '/docs/iot-gateway/installation/pip-installation/',
					},
					{
						label: 'Debian package',
						logo: logo('ubuntu.svg'),
						href: '/docs/iot-gateway/installation/deb-installation/',
					},
					{ label: 'RPM package', logo: logo('cent-os.svg'), href: '/docs/iot-gateway/installation/rpm-installation/' },
				],
			},
		],
	},
];
