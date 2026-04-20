export interface HeroButton {
	id: string;
	label: string;
	href: string;
	target?: '_blank';
	secondary?: boolean;
}

export interface HeroImage {
	src: string;
	alt: string;
	position: 'bg' | 'main';
	extraClass?: string;
}

export interface Feature {
	title: string;
	href: string;
	target?: '_blank';
	description: string;
}

export interface DeployCard {
	logo: string;
	logoAlt: string;
	title: string;
	href: string;
	target?: '_blank';
}

export interface DeployGroup {
	/** 'premise' | 'cloud' | undefined — no heading */
	type?: 'premise' | 'cloud';
	cards: DeployCard[];
}

export interface ProductData {
	id: string;
	title: string;
	description: string;
	buttons: HeroButton[];
	heroImages: HeroImage[];
	/** Two columns of features */
	features: [Feature[], Feature[]];
	deployGroups: DeployGroup[];
}

// ---------------------------------------------------------------------------
// Image path helpers
// ---------------------------------------------------------------------------

const install = (name: string) => `/src/assets/images/installation/${name}`;
const installations = (name: string) => `/src/assets/images/installations/${name}`;
const mqttBroker = (name: string) => `/src/assets/images/landings/mqtt-broker/${name}`;
const trendz = (name: string) => `/src/assets/images/landings/trendz/${name}`;

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const products: ProductData[] = [
	// ── Cloud ────────────────────────────────────────────────────────────────
	{
		id: 'thingsboard-cloud',
		title: 'ThingsBoard Cloud',
		description:
			'The ThingsBoard Cloud is a fully managed, scalable and fault-tolerant platform for your IoT applications. ThingsBoard Cloud is for everyone who would like to use ThingsBoard Professional Edition but don\'t want to host their own instance of the platform.\n\nThe ThingsBoard cluster stores your data within the European and the United States, complying with their respective regulations.\n\nSelect your region and start using ThingsBoard Cloud <b>for free</b>.',
		buttons: [
			{
				id: 'TryItNow_Cloud_NorthAmerica',
				label: 'North America',
				href: 'https://thingsboard.cloud/signup',
				target: '_blank',
			},
			{
				id: 'TryItNow_Cloud_Europe',
				label: 'Europe',
				href: 'https://eu.thingsboard.cloud/signup',
				target: '_blank',
			},
		],
		heroImages: [
			{
				src: installations('thingsboard-pe-smart-building-energy-meter.png'),
				alt: 'ThingsBoard Cloud Smart Building Energy Meter',
				position: 'bg',
			},
			{
				src: installations('thingsboard-pe-smart-building-company.png'),
				alt: 'ThingsBoard Cloud Smart Building Company',
				position: 'main',
			},
		],
		features: [
			[
				{
					title: 'More features',
					href: '/products/thingsboard-pe/#features',
					description: 'Platform supports all Professional Edition features.',
				},
				{
					title: 'Improved time to market',
					href: '/docs/pe/getting-started/',
					description: 'Save time on maintenance of the platform or configuration of the features.',
				},
				{
					title: 'Reduced costs',
					href: '/pricing/',
					description: 'The cost of the cluster infrastructure is shared between the users of the platform.',
				},
			],
			[
				{
					title: 'High availability',
					href: '/docs/reference/architecture/microservices/',
					description:
						'ThingsBoard Cloud uses microservices architecture and is deployed in multiple availability zones.',
				},
				{
					title: 'Data durability',
					href: '/docs/reference/architecture/microservices/',
					description:
						'Platform uses data replication and backup procedures to make sure you don\'t lose the data.',
				},
			],
		],
		deployGroups: [],
	},

	// ── Community Edition ─────────────────────────────────────────────────────
	{
		id: 'thingsboard-ce',
		title: 'ThingsBoard Community Edition',
		description:
			'Open-source IoT platform for device management, data collection, processing and visualization. <a href="/docs/">Read more<span class="sr-only"> about ThingsBoard Community Edition</span></a>.',
		buttons: [
			{
				id: 'TryItNow_CE_Install',
				label: 'Install',
				href: '/docs/installation/',
			},
		],
		heroImages: [
			{
				src: installations('thingsboard-ce-smart-energy.png'),
				alt: 'ThingsBoard CE Smart Energy Dashboard',
				position: 'bg',
			},
			{
				src: installations('thingsboard-ce-smart-bus-tracking.png'),
				alt: 'ThingsBoard CE Smart Bus Tracking Dashboard',
				position: 'main',
			},
		],
		features: [
			[
				{
					title: 'Rule Engine',
					href: '/docs/user-guide/rule-engine/',
					description:
						'Define data processing rules and trigger reactions using powerful rule engine components.',
				},
				{
					title: 'Microservices',
					href: '/docs/reference/architecture/microservices/',
					description:
						'Construct your ThingsBoard cluster and get maximum scalability and fault-tolerance with new microservices architecture.',
				},
			],
			[
				{
					title: 'Data collection & Visualization',
					href: '/iot-data-visualization/',
					description: 'Collect and store telemetry data. Visualize your data with flexible dashboards.',
				},
				{
					title: 'Devices & Assets management',
					href: '/docs/user-guide/digital-twins/entities/',
					description: 'Provision, monitor and control your IoT entities.',
				},
			],
		],
		deployGroups: [
			{
				type: 'premise',
				cards: [
					{
						logo: install('ubuntu.svg'),
						logoAlt: 'Ubuntu',
						title: 'Ubuntu Server',
						href: '/docs/installation/ubuntu/',
					},
					{
						logo: install('cenos-rhel.svg'),
						logoAlt: 'CentOS/RHEL',
						title: 'CentOS/RHEL Server',
						href: '/docs/installation/rhel/',
					},
					{
						logo: install('windows.svg'),
						logoAlt: 'Windows',
						title: 'Windows',
						href: '/docs/installation/docker-windows/',
					},
					{
						logo: install('raspberry-pi.svg'),
						logoAlt: 'Raspberry Pi',
						title: 'Raspberry Pi',
						href: '/docs/installation/rpi/',
					},
					{
						logo: install('docker-windows.svg'),
						logoAlt: 'Docker (Windows)',
						title: 'Docker (Windows)',
						href: '/docs/installation/docker-windows/',
					},
					{
						logo: install('docker-linux-mac.svg'),
						logoAlt: 'Docker (Linux or Mac OS)',
						title: 'Docker (Linux or Mac OS)',
						href: '/docs/installation/docker/',
					},
					{
						logo: install('sources.svg'),
						logoAlt: 'Building from source',
						title: 'Building from source',
						href: '/docs/installation/building-from-source/',
					},
					{
						logo: install('kubernetes.svg'),
						logoAlt: 'Cluster setup',
						title: 'Cluster setup',
						href: '/docs/installation/',
					},
				],
			},
			{
				type: 'cloud',
				cards: [
					{
						logo: install('aws.svg'),
						logoAlt: 'AWS',
						title: 'AWS',
						href: '/docs/installation/aws/',
					},
					{
						logo: install('digital-ocean.svg'),
						logoAlt: 'DigitalOcean',
						title: 'DigitalOcean',
						href: '/docs/installation/digital-ocean/',
					},
					{
						logo: install('gcp.svg'),
						logoAlt: 'Google Cloud Platform',
						title: 'Google Cloud Platform',
						href: '/docs/installation/gcp/',
					},
				],
			},
		],
	},

	// ── Professional Edition ──────────────────────────────────────────────────
	{
		id: 'thingsboard-pe',
		title: 'ThingsBoard Professional Edition',
		description:
			'Advanced IoT Platform distribution based on latest stable open-source version with value added features. <a href="/products/thingsboard-pe/">Read more<span class="sr-only"> about ThingsBoard Professional Edition</span></a>.',
		buttons: [
			{
				id: 'TryItNow_PE_Install',
				label: 'Install',
				href: '/docs/pe/installation/',
			},
			{
				id: 'TryItNow_PE_StartFree',
				label: 'Start Free',
				href: '/installations/choose-region/',
				secondary: true,
			},
			{
				id: 'TryItNow_PE_Pricing',
				label: 'Pricing',
				href: '/pricing/?product=thingsboard-pe',
				secondary: true,
			},
		],
		heroImages: [
			{
				src: installations('thingsboard-pe-smart-building-energy-meter.png'),
				alt: 'ThingsBoard PE Smart Building Energy Meter',
				position: 'bg',
			},
			{
				src: installations('thingsboard-pe-smart-building-company.png'),
				alt: 'ThingsBoard PE Smart Building Company',
				position: 'main',
			},
		],
		features: [
			[
				{
					title: 'White-labeling',
					href: '/docs/user-guide/white-labeling/',
					description: 'Multi-tenant configurable white-labeling.',
				},
				{
					title: 'Entity Groups',
					href: '/docs/pe/user-guide/groups/',
					description:
						'Custom entity groups (devices, assets, etc.) with customizable actions and configurable columns.',
				},
				{
					title: 'Advanced RBAC for IoT',
					href: '/docs/user-guide/roles/',
					description:
						'Advanced management of user roles and permissions. Manage hierarchy of customers.',
				},
			],
			[
				{
					title: 'CSV/XLS data export',
					href: '/docs/user-guide/csv-xls-data-export/',
					description: 'Export any dashboard widget data to CSV or XLS format.',
				},
				{
					title: 'Platform Integrations',
					href: '/docs/user-guide/integrations/',
					description:
						'Out of the box integrations with popular IoT platforms and connectivity providers.',
				},
				{
					title: 'Scheduler and Reporting',
					href: '/docs/user-guide/scheduler/',
					description:
						'Schedule various types of events with flexible schedule configuration. Generate great looking reports using dashboards visualization capabilities.',
				},
			],
		],
		deployGroups: [
			{
				type: 'premise',
				cards: [
					{
						logo: install('ubuntu.svg'),
						logoAlt: 'Ubuntu',
						title: 'Ubuntu Server',
						href: '/docs/pe/installation/ubuntu/',
					},
					{
						logo: install('cenos-rhel.svg'),
						logoAlt: 'CentOS/RHEL',
						title: 'CentOS/RHEL',
						href: '/docs/pe/installation/rhel/',
					},
					{
						logo: install('windows.svg'),
						logoAlt: 'Windows',
						title: 'Windows',
						href: '/docs/pe/installation/docker-windows/',
					},
					{
						logo: install('docker-windows.svg'),
						logoAlt: 'Docker (Windows)',
						title: 'Docker (Windows)',
						href: '/docs/pe/installation/docker-windows/',
					},
					{
						logo: install('docker-linux-mac.svg'),
						logoAlt: 'Docker (Linux or Mac OS)',
						title: 'Docker (Linux or Mac OS)',
						href: '/docs/pe/installation/docker/',
					},
					{
						logo: install('kubernetes.svg'),
						logoAlt: 'Cluster setup',
						title: 'Cluster setup',
						href: '/docs/pe/installation/',
					},
				],
			},
			{
				type: 'cloud',
				cards: [
					{
						logo: install('aws.svg'),
						logoAlt: 'AWS',
						title: 'AWS',
						href: '/docs/pe/installation/aws/',
					},
					{
						logo: install('azure.svg'),
						logoAlt: 'Microsoft Azure',
						title: 'Microsoft Azure',
						href: '/docs/pe/installation/azure/',
					},
					{
						logo: install('digital-ocean.svg'),
						logoAlt: 'DigitalOcean',
						title: 'DigitalOcean',
						href: '/docs/pe/installation/digital-ocean/',
					},
					{
						logo: install('gcp.svg'),
						logoAlt: 'Google Cloud Platform',
						title: 'Google Cloud Platform',
						href: '/docs/pe/installation/gcp/',
					},
				],
			},
		],
	},

	// ── Edge ─────────────────────────────────────────────────────────────────
	{
		id: 'thingsboard-edge',
		title: 'ThingsBoard Edge',
		description:
			'The ThingsBoard Edge empowers businesses with real-time data analysis and management right at the source, enhancing agility and efficiency in data-driven decisions.\n\nSeamlessly connected to your preferred ThingsBoard platform—whether it\'s ThingsBoard Cloud, ThingsBoard PE, or ThingsBoard CE—it ensures continuous synchronization that adapts to your unique business needs, delivering the power of edge intelligence.\n\nMaximize efficiency and gain immediate, actionable insights with ThingsBoard Edge! <a href="/products/thingsboard-edge/">Read more<span class="sr-only"> about ThingsBoard Edge</span></a>.',
		buttons: [
			{
				id: 'TryItNow_Edge_Install_Edge_CE',
				label: 'Install Edge CE',
				href: '/docs/edge/installation/',
			},
			{
				id: 'TryItNow_Edge_Install_Edge_PE',
				label: 'Install Edge PE',
				href: '/docs/edge/pe/installation/',
				secondary: true,
			},
			{
				id: 'TryItNow_Edge_Pricing',
				label: 'Pricing',
				href: '/pricing/?active=thingsboard-edge',
				secondary: true,
			},
		],
		heroImages: [
			{
				src: installations('thingsboard-ce-smart-bus-tracking.png'),
				alt: 'ThingsBoard Edge Smart Bus Tracking Dashboard',
				position: 'bg',
			},
			{
				src: installations('thingsboard-ce-smart-energy.png'),
				alt: 'ThingsBoard Edge Smart Energy Dashboard',
				position: 'main',
			},
		],
		features: [
			[
				{
					title: 'Local deployment and storage',
					href: '/docs/edge/why-thingsboard-edge/',
					description:
						'Process and store data from edge (local) devices without connection to the cloud. Push updates to the cloud once connection restored.',
				},
				{
					title: 'Traffic filtering',
					href: '/docs/edge/why-thingsboard-edge/',
					description:
						'Filter data from edge (local) devices on the ThingsBoard Edge service and push to cloud only subset of the data for further processing or storage.',
				},
			],
			[
				{
					title: 'Local alarms',
					href: '/docs/edge/why-thingsboard-edge/',
					description: 'React instantly to critical situations on site without connectivity to cloud.',
				},
				{
					title: 'Batch update and visualization',
					href: '/docs/edge/why-thingsboard-edge/',
					description:
						'Update thousands of edge configurations in a single click. Monitor local events and timeseries data with a real-time dashboard.',
				},
			],
		],
		deployGroups: [
			{
				cards: [
					{
						logo: install('ubuntu.svg'),
						logoAlt: 'Ubuntu',
						title: 'Ubuntu Server',
						href: '/docs/edge/installation/ubuntu/',
					},
					{
						logo: install('cenos-rhel.svg'),
						logoAlt: 'CentOS/RHEL',
						title: 'CentOS/RHEL Server',
						href: '/docs/edge/installation/rhel/',
					},
					{
						logo: install('windows.svg'),
						logoAlt: 'Windows',
						title: 'Windows',
						href: '/docs/edge/installation/windows/',
					},
					{
						logo: install('docker-windows.svg'),
						logoAlt: 'Docker (Windows)',
						title: 'Docker (Windows)',
						href: '/docs/edge/installation/docker-windows/',
					},
					{
						logo: install('docker-linux-mac.svg'),
						logoAlt: 'Docker (Linux or Mac OS)',
						title: 'Docker (Linux or Mac OS)',
						href: '/docs/edge/installation/docker/',
					},
					{
						logo: install('sources.svg'),
						logoAlt: 'Building from source',
						title: 'Building from source',
						href: '/docs/edge/installation/building-from-source/',
					},
					{
						logo: installations('docker-cluster.svg'),
						logoAlt: 'Edge Cluster Setup',
						title: 'Edge Cluster Setup',
						href: '/docs/edge/installation/docker-compose-setup/',
					},
				],
			},
		],
	},

	// ── Trendz ───────────────────────────────────────────────────────────────
	{
		id: 'thingsboard-trendz',
		title: 'Trendz Analytics',
		description:
			'The ThingsBoard Trendz is an Analytics Platform that converts the IoT dataset into insights and simplifies the decision-making process. <a href="/products/trendz/">Read more<span class="sr-only"> about Trendz Analytics</span></a>.',
		buttons: [
			{
				id: 'TryItNow_Trendz_Documentation',
				label: 'Documentation',
				href: '/docs/trendz/',
			},
			{
				id: 'TryItNow_Trendz_Pricing',
				label: 'Pricing',
				href: '/pricing/?section=trendz-options&product=trendz-self-managed&solution=trendz-pay-as-you-go',
				secondary: true,
			},
		],
		heroImages: [
			{
				src: trendz('predict-screen.png'),
				alt: 'ThingsBoard Trendz timeseries prediction',
				position: 'bg',
			},
			{
				src: trendz('dashboard-screen.png'),
				alt: 'ThingsBoard Trendz Greenhouse Dashboard',
				position: 'main',
				extraClass: 'left-negative',
			},
		],
		features: [
			[
				{
					title: 'Predict failures and forecast utilization',
					href: '/docs/trendz/prediction/',
					description:
						'Plan and optimize operations with insights into future events and system behavior.',
				},
				{
					title: 'Detection Anomalies',
					href: '/docs/trendz/anomaly/overview/',
					description:
						'Detect anomalies with automated tools based on built-in machine learning algorithms. Prioritise them and focus on real problems with anomaly scoring.',
				},
			],
			[
				{
					title: 'KPI monitoring',
					href: '/docs/trendz/calculations/overview/',
					description:
						'Based on the input data, calculated fields allow you to run statistical functions and create new data items by applying calculations.',
				},
				{
					title: 'Self-service Analytics',
					href: '/docs/trendz/getting-started/',
					description: 'Give users simple instrument for answering their own questions in minutes.',
				},
			],
		],
		deployGroups: [
			{
				cards: [
					{
						logo: install('trendz-cloud.svg'),
						logoAlt: 'Trendz Cloud',
						title: 'Trendz Cloud',
						href: '/docs/trendz/install/cloud/',
					},
					{
						logo: install('ubuntu.svg'),
						logoAlt: 'Ubuntu',
						title: 'Ubuntu Server',
						href: '/docs/trendz/install/ubuntu/',
					},
					{
						logo: install('cenos-rhel.svg'),
						logoAlt: 'CentOS/RHEL',
						title: 'CentOS/RHEL Server',
						href: '/docs/trendz/install/rhel/',
					},
					{
						logo: install('windows.svg'),
						logoAlt: 'Windows',
						title: 'Windows',
						href: '/docs/trendz/install/windows/',
					},
					{
						logo: install('docker-windows.svg'),
						logoAlt: 'Docker (Windows)',
						title: 'Docker (Windows)',
						href: '/docs/trendz/install/docker-windows/',
					},
					{
						logo: install('docker-linux-mac.svg'),
						logoAlt: 'Docker (Linux or Mac OS)',
						title: 'Docker (Linux or Mac OS)',
						href: '/docs/trendz/install/docker/',
					},
				],
			},
		],
	},

	// ── MQTT Broker ───────────────────────────────────────────────────────────
	{
		id: 'mqtt-broker',
		title: 'MQTT Broker',
		description:
			'<b>TBMQ</b> is a highly scalable and durable <a href="/products/mqtt-broker/" target="_blank">MQTT message broker</a> built for real-time data processing across IoT ecosystems of any scale. It efficiently handles millions of concurrent client connections and processes millions of messages per second while maintaining low latency and reliable delivery. Designed for horizontal scalability, TBMQ seamlessly expands across cluster nodes to support massive deployments with millions of connected devices. <a href="/docs/mqtt-broker/" target="_blank">Read more<span class="sr-only"> about TBMQ MQTT Broker</span></a>.',
		buttons: [
			{
				id: 'TryItNow_TBMQ_Demo',
				label: 'Live Demo',
				href: 'https://demo.tbmq.io/signup',
				target: '_blank',
			},
			{
				id: 'TryItNow_TBMQ_Install_CE',
				label: 'Download CE',
				href: '/docs/mqtt-broker/install/installation-options/',
				target: '_blank',
				secondary: true,
			},
			{
				id: 'TryItNow_TBMQ_Install_PE',
				label: 'Start PE Trial',
				href: '/docs/mqtt-broker/pe/install/installation-options/',
				target: '_blank',
				secondary: true,
			},
		],
		heroImages: [
			{
				src: mqttBroker('tbmq-try-2.png'),
				alt: 'ThingsBoard MQTT Broker Home Page',
				position: 'bg',
			},
			{
				src: mqttBroker('tbmq-try-1.png'),
				alt: 'ThingsBoard MQTT Broker Sessions Page',
				position: 'main',
			},
		],
		features: [
			[
				{
					title: 'Unlimited Horizontal Scaling',
					href: '/docs/mqtt-broker/reference/100m-connections-performance-test/',
					target: '_blank',
					description: 'Scale horizontally to manage more than 100M MQTT connections on a single cluster',
				},
				{
					title: 'Million-Message Throughput',
					href: '/docs/mqtt-broker/reference/3m-throughput-single-node-performance-test/',
					target: '_blank',
					description:
						'Process millions of messages per second with 1 TBMQ server and single-digit latency',
				},
				{
					title: 'Masterless High Availability',
					href: '/docs/mqtt-broker/architecture/',
					target: '_blank',
					description: 'Prevent single point of failure with masterless nodes in the cluster',
				},
			],
			[
				{
					title: 'Universal MQTT Support',
					href: '/docs/mqtt-broker/getting-started/',
					target: '_blank',
					description: 'MQTT 3.x and 5.0 compatible for a seamless and secure connection experience',
				},
				{
					title: 'Zero Data Loss Guarantee',
					href: '/docs/mqtt-broker/architecture/',
					target: '_blank',
					description:
						'Guarantee the persistence and replication of your data to ensure it\'s never lost',
				},
				{
					title: 'K8s & Cloud Agnostic',
					href: '/docs/mqtt-broker/install/installation-options/',
					target: '_blank',
					description: 'Deploy in cloud or on-premises using K8s scripts with ease',
				},
			],
		],
		deployGroups: [
			{
				type: 'premise',
				cards: [
					{
						logo: install('docker-linux-mac.svg'),
						logoAlt: 'Docker (Linux or Mac OS)',
						title: 'Docker (Linux or Mac OS)',
						href: '/docs/mqtt-broker/install/docker/',
						target: '_blank',
					},
					{
						logo: install('docker-windows.svg'),
						logoAlt: 'Docker (Windows)',
						title: 'Docker (Windows)',
						href: '/docs/mqtt-broker/install/docker-windows/',
						target: '_blank',
					},
					{
						logo: install('docker-compose.svg'),
						logoAlt: 'Cluster setup with Docker Compose',
						title: 'Cluster with Docker Compose',
						href: '/docs/mqtt-broker/install/cluster/docker-compose-setup/',
						target: '_blank',
					},
					{
						logo: install('minikube.svg'),
						logoAlt: 'Cluster setup with Minikube',
						title: 'Cluster setup with Minikube',
						href: '/docs/mqtt-broker/install/cluster/minikube-cluster-setup/',
						target: '_blank',
					},
				],
			},
			{
				type: 'cloud',
				cards: [
					{
						logo: install('eks.svg'),
						logoAlt: 'Cluster setup on EKS',
						title: 'Cluster setup on EKS',
						href: '/docs/mqtt-broker/install/cluster/aws-cluster-setup/',
						target: '_blank',
					},
					{
						logo: install('azure.svg'),
						logoAlt: 'Cluster setup on AKS',
						title: 'Cluster setup on AKS',
						href: '/docs/mqtt-broker/install/cluster/azure-cluster-setup/',
						target: '_blank',
					},
					{
						logo: install('gcp.svg'),
						logoAlt: 'Cluster setup on GCP',
						title: 'Cluster setup on GCP',
						href: '/docs/mqtt-broker/install/cluster/gcp-cluster-setup/',
						target: '_blank',
					},
					{
						logo: install('helm.svg'),
						logoAlt: 'Cluster setup using Helm',
						title: 'Cluster setup using Helm',
						href: '/docs/mqtt-broker/install/installation-options/',
						target: '_blank',
					},
				],
			},
		],
	},
];

export const productTabs = products.map((p, i) => ({
	id: p.id,
	label: p.id === 'thingsboard-ce'
		? 'Community Edition'
		: p.id === 'thingsboard-pe'
			? 'Professional Edition'
			: p.id === 'thingsboard-cloud'
				? 'Cloud'
				: p.id === 'thingsboard-edge'
					? 'Edge'
					: p.id === 'thingsboard-trendz'
						? 'Trendz'
						: 'TBMQ',
	active: i === 0,
}));
