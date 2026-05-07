export interface FeatureItem {
	icon: string;
	title: string;
	href: string;
	description: string;
}

export const homeFeatures: FeatureItem[] = [
	{
		icon: '/src/assets/images/landings/ce/telemetry-icon.svg',
		title: 'Telemetry Data Collection',
		href: '/docs/user-guide/digital-twins/time-series-data/',
		description:
			'Collect and store telemetry data in reliable way, surviving network and hardware failures. Access collected data using customizable web dashboards or server-side APIs.',
	},
	{
		icon: '/src/assets/images/landings/ce/tenancy-icon.svg',
		title: 'Multi-tenancy',
		href: '/docs/user-guide/multi-tenancy/',
		description:
			'Support multi-tenant installations out-of-the-box. Single tenant may have multiple tenant administrators and millions of devices and customers.',
	},
	{
		icon: '/src/assets/images/landings/ce/visualization-icon.svg',
		title: 'Data Visualization',
		href: '/iot-data-visualization/',
		description:
			'Provides 30+ configurable widgets out-of-the-box and ability to create your own widgets using built-in editor. Built-in line-charts, digital and analog gauges, maps and much more.',
	},
	{
		icon: '/src/assets/images/landings/ce/scalability-icon.svg',
		title: 'Horizontal scalability',
		href: '/docs/reference/architecture/#services',
		description:
			'Amount of supported server-side requests and devices increase linearly as new thingsboard servers are added in clustering mode. No downtime, server restarts or application errors.',
	},
	{
		icon: '/src/assets/images/landings/ce/engine-icon.svg',
		title: 'IoT Rule Engine',
		href: '/docs/user-guide/rule-engine/',
		description:
			'Process incoming device data with flexible rule chains based on entity attributes or message content. Forward data to external systems or trigger alarms using custom logic. Configure complex notification chains on alarms. Enrich server-side functionality or manipulate your devices with highly customizable rules. Define your application logic with drag-n-drop rule chain designer.',
	},
	{
		icon: '/src/assets/images/landings/ce/integration-icon.svg',
		title: 'Customization and Integration',
		href: '/docs/user-guide/contribution/how-to-contribute/',
		description:
			'Extend default platform functionality using customizable <a href="/docs/user-guide/rule-engine/">rule chains</a>, <a href="/docs/reference/widgets/widget-library/">widgets</a> and <a href="/docs/user-guide/connectivity-guide/">transport implementations</a>. In addition to MQTT, CoAP and HTTP support, ThingsBoard users can use their own transport implementations or customize behaviour of existing protocols. You can also take advantage of our <a href="/services/development-services/">IoT development services</a> to create tailored solutions for your needs.',
	},
	{
		icon: '/src/assets/images/landings/ce/device-icon.svg',
		title: 'Device Management',
		href: '/docs/user-guide/devices/',
		description:
			'Provides ability to register and manage devices. Allows to monitor client-side and provision server-side <a href="/docs/user-guide/digital-twins/attributes/">device attributes</a>. Provides API for server-side applications to send <a href="/docs/user-guide/command-and-control/">RPC commands</a> to devices.',
	},
	{
		icon: '/src/assets/images/landings/ce/security-icon.svg',
		title: 'Security',
		href: '/docs/user-guide/connectivity-guide/',
		description:
			'Supports transport encryption for both MQTT and HTTP(s) protocols. Supports device authentication and device credentials management.',
	},
	{
		icon: '/src/assets/images/landings/ce/asset-icon.svg',
		title: 'Asset Management',
		href: '/docs/user-guide/assets/',
		description:
			'Provides ability to register and manage assets. Allows to provision server-side <a href="/docs/user-guide/digital-twins/attributes/">asset attributes</a> and monitor related <a href="/docs/user-guide/alarms/">alarms</a>. Ability to build hierarchy of entities using <a href="/docs/user-guide/digital-twins/entities/">relations</a>.',
	},
	{
		icon: '/src/assets/images/landings/ce/tolerance-icon.svg',
		title: 'Fault-tolerance',
		href: '/docs/reference/architecture/#services',
		description:
			'All thingsboard servers are identical. No master-workers or hot standby. Node failure is automatically detected. Failed nodes can be replaced without downtime.',
	},
	{
		icon: '/src/assets/images/landings/ce/alarms-icon.svg',
		title: 'Alarms Management',
		href: '/docs/user-guide/alarms/',
		description:
			'Provides ability to create and manage <a href="/docs/user-guide/alarms/">alarms</a> related to your entities: devices, assets, customers, etc. Allows real-time alarms monitoring and alarms propagation to related entities hierarchy.',
	},
	{
		icon: '/src/assets/images/landings/ce/opensource-icon.svg',
		title: '100% Open-source',
		href: 'https://github.com/thingsboard/thingsboard',
		description:
			'ThingsBoard is licensed under Apache License 2.0, so you can use it in your commercial products for free. You can even host it as a SaaS or PaaS solution.',
	},
	{
		icon: '/src/assets/images/landings/ce/microservices-icon.svg',
		title: 'Microservices or Monolithic',
		href: '/docs/reference/architecture/monolithic/',
		description:
			'Supports <a href="/docs/reference/architecture/monolithic/">monolithic</a> deployment for getting started or small environments. Provides ability to upgrade to <a href="/docs/reference/architecture/microservices/">microservices</a> for high availability and horizontal scalability.',
	},
	{
		icon: '/src/assets/images/landings/ce/database-icon.svg',
		title: 'SQL, NoSQL and Hybrid database',
		href: '/docs/reference/architecture/database/',
		description:
			'Supports various database options and ability to choose where to store main entities and where to store telemetry data.',
	},
];
