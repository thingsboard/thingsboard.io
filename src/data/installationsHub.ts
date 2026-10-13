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
	/** The clouds it runs on: Simple Icons marks, shown, not linked. */
	hosts: { name: string; icon: string }[];
}

/** A square SVG: its viewBox side and the drawing's box in it, so the tile sizes the drawing, not the padding. */
interface InstallIcon {
	src: string;
	view: number;
	art: readonly [number, number, number, number];
}

interface InstallProduct {
	id: string;
	name: string;
	/** The page nav's word for the section; on the platforms, also set in `badgeFill`. Must occur in `name`. */
	nameHighlight?: string;
	label: string;
	description: string;
	icon: InstallIcon;
	accent?: string;
	/** Platforms only: fills the tile and the button, and switches the section to `.is-platform`. */
	badgeFill?: string;
	buttonIcon?: string;
	primary?: InstallLink;
	links: InstallLink[];
	options?: InstallOptionGroup[];
	regions?: readonly CloudRegion[];
	aside?: InstallAside;
}

const logo = (name: string) => `/src/assets/images/installation/${name}`;
const mark = (name: string) => `/src/assets/images/landings/${name}`;

const TB_ICON: InstallIcon = { src: '/images/pricing/thingsboard-icon.svg', view: 38, art: [4, 4, 30, 30] };

export const installProducts: InstallProduct[] = [
	{
		id: 'cloud',
		name: 'ThingsBoard Cloud',
		nameHighlight: 'Cloud',
		label: 'Fully managed, shared or dedicated',
		description:
			'Nothing to install. Pick the region your data lives in and start on a free plan; we run the servers, scaling, backups and upgrades.',
		icon: TB_ICON,
		badgeFill: 'var(--color-product-cloud)',
		links: [{ label: 'See plans', href: '/pricing/?product=thingsboard-cloud' }],
		regions: CLOUD_REGIONS,
		aside: {
			title: 'Private Cloud',
			text: 'Your own isolated ThingsBoard cluster managed by our team: 24/7 monitoring, security patches, backups and upgrades, under a 99.95%–99.99% uptime SLA.',
			links: [
				{
					label: 'Contact us',
					href: '/contact-us/?subject=Private%20Cloud&pcorder&message=I%20am%20interested%20in%20Private%20Cloud',
				},
				{ label: 'Cloud vs Private Cloud', href: '/products/paas/#public-vs-private' },
			],
			hosts: [
				{ name: 'AWS', icon: 'simple-icons:amazonwebservices' },
				{ name: 'Azure', icon: 'simple-icons:microsoftazure' },
				{ name: 'Google Cloud', icon: 'simple-icons:googlecloud' },
			],
		},
	},
	{
		id: 'on-premises',
		name: 'ThingsBoard On-premises',
		nameHighlight: 'On-premises',
		label: 'Self-managed, on your infrastructure',
		description:
			'Run ThingsBoard on your own servers, in a cloud account, or fully offline, and keep your data on your infrastructure. Installation is free; see the pricing page for licensing the advanced features.',
		icon: TB_ICON,
		badgeFill: 'var(--brand-pe)',
		buttonIcon: 'tabler:server',
		primary: { label: 'Installation guide', href: '/docs/pe/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/?product=thingsboard-pe' },
			{ label: 'Explore On-premises', href: '/products/thingsboard-pe/' },
		],
		// The order of the installation guide's own index.
		options: [
			{
				title: 'On your servers',
				items: [
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
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/pe/installation/ubuntu/' },
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/pe/installation/rhel/' },
					{ label: 'Raspberry Pi', logo: logo('raspberry-pi.svg'), href: '/docs/pe/installation/rpi/' },
					{
						label: 'Building from source',
						logo: logo('sources.svg'),
						href: '/docs/pe/installation/building-from-source/',
					},
				],
			},
			{
				title: 'In your cloud account',
				items: [
					{ label: 'AWS', logo: logo('aws.svg'), href: '/docs/pe/installation/aws/' },
					{ label: 'Microsoft Azure', logo: logo('azure.svg'), href: '/docs/pe/installation/azure/' },
					{ label: 'DigitalOcean', logo: logo('digital-ocean.svg'), href: '/docs/pe/installation/digital-ocean/' },
					{ label: 'Google Cloud', logo: logo('gcp.svg'), href: '/docs/pe/installation/gcp/' },
				],
			},
			{
				title: 'As a cluster',
				items: [
					{
						label: 'Docker Compose',
						logo: logo('docker-compose.svg'),
						href: '/docs/pe/installation/docker-compose-setup/',
					},
					{ label: 'Minikube', logo: logo('minikube.svg'), href: '/docs/pe/installation/minikube-cluster-setup/' },
					{ label: 'OpenShift', logo: logo('open-shift.svg'), href: '/docs/pe/installation/openshift-cluster-setup/' },
				],
			},
		],
	},
	{
		id: 'edge',
		name: 'ThingsBoard Edge',
		nameHighlight: 'Edge',
		label: 'Edge computing',
		description:
			'Processes and visualizes data locally at the network edge, enabling autonomous operation during connectivity outages. Manage every remote edge location from one platform.',
		icon: { src: mark('ce/thingsboard-e-icon.svg'), view: 54, art: [5, 5, 44, 44] },
		accent: '#0f9b8e',
		primary: { label: 'Installation guide', href: '/docs/edge/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/?product=thingsboard-pe' },
			{ label: 'See how Edge works', href: '/products/thingsboard-edge/' },
		],
		options: [
			{
				title: 'Install on',
				items: [
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
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/edge/installation/ubuntu/' },
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/edge/installation/rhel/' },
					{ label: 'Raspberry Pi', logo: logo('raspberry-pi.svg'), href: '/docs/edge/installation/rpi/' },
					{
						label: 'Docker Compose',
						logo: logo('docker-compose.svg'),
						href: '/docs/edge/installation/docker-compose-setup/',
					},
					{
						label: 'Building from source',
						logo: logo('sources.svg'),
						href: '/docs/edge/installation/building-from-source/',
					},
				],
			},
		],
	},
	{
		id: 'trendz',
		name: 'Trendz Analytics',
		nameHighlight: 'Trendz',
		label: 'Analytics & AI',
		description:
			'Predictive analytics, anomaly detection and forecasting. Explore your data without code using natural-language queries, and run AI agents over it.',
		icon: { src: mark('ce/trendz-icon.svg'), view: 54, art: [0, 1, 54, 37.63] },
		accent: '#1976d2',
		primary: { label: 'Installation guide', href: '/docs/trendz/installation/' },
		links: [
			{ label: 'See plans', href: '/pricing/?product=thingsboard-pe' },
			{ label: 'Explore Trendz', href: '/products/trendz/' },
		],
		options: [
			{
				title: 'Install on',
				items: [
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
					{ label: 'Ubuntu Server', logo: logo('ubuntu.svg'), href: '/docs/trendz/installation/ubuntu/' },
					{ label: 'CentOS / RHEL Server', logo: logo('cenos-rhel.svg'), href: '/docs/trendz/installation/rhel/' },
					{ label: 'Kubernetes', logo: logo('kubernetes.svg'), href: '/docs/trendz/installation/kubernetes/' },
					{
						label: 'Docker Compose',
						logo: logo('docker-compose.svg'),
						href: '/docs/trendz/installation/docker-compose-setup/',
					},
					{ label: 'Trendz Cloud', logo: logo('trendz-cloud.svg'), href: '/docs/trendz/installation/cloud/' },
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
		icon: { src: mark('ce/gateway-icon.svg'), view: 54, art: [6.33, 4.26, 41.34, 45.48] },
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
						label: 'Remote Agent',
						logo: logo('tb-agent-docker.svg'),
						href: '/docs/iot-gateway/installation/agent-installation/',
					},
					{
						label: 'Ubuntu Server',
						logo: logo('ubuntu.svg'),
						href: '/docs/iot-gateway/installation/deb-installation/',
					},
					{
						label: 'AlmaLinux / RHEL Server',
						logo: logo('alma-linux-redhat.svg'),
						href: '/docs/iot-gateway/installation/rpm-installation/',
					},
					{
						label: 'Raspberry Pi',
						logo: logo('raspberry-pi.svg'),
						href: '/docs/iot-gateway/installation/deb-installation/',
					},
					{ label: 'Python', logo: logo('python.svg'), href: '/docs/iot-gateway/installation/pip-installation/' },
					{
						label: 'Building from source',
						logo: logo('github.svg'),
						href: '/docs/iot-gateway/installation/source-installation/',
					},
				],
			},
		],
	},
];
