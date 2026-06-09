import type { AdvantageCard } from '../components/Landing/AdvantagesCarousel.astro';

export const advantagesCards: AdvantageCard[] = [
	{
		icon: 'tabler:shield',
		color: 'blue',
		title: 'Security',
		description:
			'ThingsBoard protects your data with industry-standard encryption algorithms like RSA and ECDSA. Secure communication is ensured via TLS (TCP) and DTLS (UDP). Role-based access control and audit logs further enhance platform security.',
		href: '/docs/pe/user-guide/security/overview/',
		linkText: 'Learn more about security',
	},
	{
		icon: 'tabler:chart-bar',
		color: 'red',
		title: 'Data visualization',
		description:
			'Visualize data with interactive, multi-state dashboards—no coding needed. Use built-in charts, gauges, maps, tables, and control widgets. Customize every detail via advanced settings or custom widget bundles.',
		href: '/docs/pe/concepts/data-visualization/',
		linkText: 'Learn more about data visualization',
	},
	{
		icon: 'tabler:plug-connected',
		color: 'purple',
		title: 'Connectivity',
		description:
			'Connect devices directly to the platform via the following built-in protocols: HTTP, CoAP, MQTT, LwM2M, and SNMP. Connect devices in your local network to the cloud using ThingsBoard Gateway.',
		href: '/docs/pe/user-guide/connectivity-guide/',
		linkText: 'Learn more about connectivity',
	},
	{
		icon: 'tabler:circuit-bulb',
		color: 'green',
		title: 'Data processing',
		description:
			'ThingsBoard allows you to define app logic using a drag-and-drop rule chain designer. Its scalable Rule Engine uses message queues like Kafka or AWS SQS for durable, reliable data processing.',
		href: '/docs/pe/user-guide/rule-engine/',
		linkText: 'Learn more about data processing',
	},
	{
		icon: 'tabler:server',
		color: 'orange',
		title: 'Scalability',
		description:
			'ThingsBoard supports high-availability cloud and on-prem deployments via Kubernetes or bare-metal. Its components scale horizontally and handle 18K+ vehicles and 5K+ devices in prod.',
		href: '/docs/pe/reference/architecture/microservices/',
		linkText: 'Learn more about scalability',
	},
	{
		icon: 'tabler:building-skyscraper',
		color: 'blue',
		title: 'Multi-tenancy',
		description:
			'ThingsBoard provides UI and API to manage tenants, customers, users, devices, and assets. Single tenant may have multiple tenant administrators and millions of devices and customers.',
		href: '/docs/pe/user-guide/digital-twins/entities/',
		linkText: 'Learn more about multi-tenancy',
	},
	{
		icon: 'tabler:wifi',
		color: 'red',
		title: 'LoRaWAN & SigFox',
		description:
			'Connect LoRaWAN devices via integrations with standard network servers like TTN, LORIOT, ChirpStack, Actility, etc. Connect SigFox devices via integrations with the SigFox backend.',
		href: '/docs/pe/user-guide/integrations/',
		linkText: 'Learn more about LoRaWAN & SigFox',
	},
	{
		icon: 'tabler:device-mobile',
		color: 'purple',
		title: 'Mobile application',
		description:
			'Build your own IoT mobile application with minimum coding efforts using ThingsBoard Mobile Application, an open-source project based on Flutter.',
		href: '/docs/mobile/pe/',
		linkText: 'Learn more about mobile application',
	},
];
