import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Fast-Paced IoT Implementation with KIOTERA on ThingsBoard',
	pageTitle: 'Fast-Paced IoT Implementation with KIOTERA',
	description:
		'From energy monitoring to utility metering, KIOTERA accelerates deployments with validated sensors, gateways, rule chains, and dashboards on ThingsBoard.',
	pageSlug: 'kiotera',
	breadcrumb: 'KIOTERA — Manufacturing',
	categories: ['Smart city'],

	hero: {
		category: 'MANUFACTURING',
		heading:
			'Fast-paced IoT-Implementation: How Customers of KIOTERA profit from standardized IoT-solutions based on ThingsBoard',
		paragraphs: [
			'KIOTERA is an IoT integrator that specialises in delivering end-to-end IoT solutions for a diverse range of industries, including chemical parks, the automotive sector, municipalities, and industrial production environments.',
			'From machine health and energy consumption monitoring to vehicle tracking and the measurement of heat, water and gas usage. Based on numerous implementation projects, KIOTERA has created ready-to-deploy IoT modules with validated sensors, industrial gateways and out-of-the-box visualisations, ensuring customers can start using complete solutions almost instantly. When needed, KIOTERA additionally supplies the LoRaWAN network, allowing rapid deployment of projects without reliance on customer IT.',
			'KIOTERA firmly believes that IoT technologies play a critical role in driving sustainability, enabling more efficient operations, reducing emissions, and creating transparency across distributed assets and infrastructure.',
		],
		logo: 'https://img.thingsboard.io/case-studies/kiotera.svg',
		logoAlt: 'KIOTERA logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/kiotera.webp',
	},

	statistics: [
		{ value: 80, suffix: '+', label: 'companies and municipalities supported with the implementation of IoT-Solutions' },
		{ value: 6, suffix: '+', label: 'years of expertise with ThingsBoard Projects' },
		{ value: 20, suffix: 'K+', label: 'devices integrated and managed on ThingsBoard' },
	],

	problem: {
		description:
			'Before using a standard IoT stack, customers of any industry struggled with IoT-projects, because they had fragmented sensor data on different proprietary platforms, and lengthy integration projects with questionable return on investment. There was no way to gain transparency across decentralized infrastructures with IoT that was fast, scalable, and affordable.',
		challenges: [
			'Vendor lock-in & incompatibility: Clients had to rely on proprietary platforms that only supported specific sensor manufacturers, making integration across systems difficult or impossible.',
			'Complex and lengthy IT projects: Traditional IoT solutions involved months of custom development and planning before the first data arrived on the platform.',
			'No unified IoT platform: Operators were forced to work with separate software for machine condition, energy data, climate metrics, and additional use cases preventing a consistent, cross-domain view of their infrastructure.',
			'No standard dashboards, reports or data streams: This results in costly and long development times for custom data visualisations.',
			'Limited scalability across locations: Building and asset hierarchy, user management, report and visualization requirements diverted from location to location and made maintaining, updating and expanding implemented solutions costly.',
		],
		results: [
			"A unified, vendor-independent platform that can integrate all customers' devices, even if they use different communication protocols such as LoRaWAN and NB-IoT.",
			'Faster deployment of IoT projects and new use cases.',
			'Reduced implementation costs and faster time to value.',
			'Reusable modules and dashboards accelerate rollouts across sites.',
		],
	},

	power: {
		companyName: 'KIOTERA',
		blocks: [
			{
				title: 'Energy monitoring across distributed assets',
				text: 'KIOTERA deploys LoRaWAN plug-and-play sensors that capture data on energy consumption. The ThingsBoard based modules provides standardised visualisations such as daily energy usage, cumulative meter readings and consumption trends over time. This gives operational teams a clear and transparent overview of how energy is used across distributed assets\u2014supporting audits, sustainability reporting and operational planning.',
				image: 'https://img.thingsboard.io/case-studies/kiotera-1.webp',
				imageAlt: 'Energy monitoring across distributed assets',
			},
			{
				title: 'Condition monitoring for industrial machines',
				text: "KIOTERA integrates vibration and temperature sensors to monitor industrial equipment such as motors, pumps, fans, and compressors. ThingsBoard acts as the central platform for processing and visualising machine health indicators. Dashboards display vibration levels and temperature trends, while the rule engine detects deviations and triggers maintenance alerts. This enables companies to move from interval-based servicing to condition-based maintenance, which significantly reduces downtime and costs, while extending equipment life and improving overall equipment effectiveness.",
				image: 'https://img.thingsboard.io/case-studies/kiotera-2.webp',
				imageAlt: 'Condition monitoring for industrial machines',
			},
			{
				title: 'District heating & utility monitoring',
				text: 'Utility providers rely on data from a variety of distributed meters, including those for district heating, gas and water. Standardized visualisations enables operators to monitor flow rates and temperatures across decentralised infrastructures. ThingsBoard serves as the central data hub, aggregating meter values from different manufacturers and communication standards into a unified, scalable system. Automated alerts notify operators of anomalies such as unexpected consumption spikes, pressure drops or temperature deviations in district heating loops. This enables utilities to respond quickly, reduce losses and maintain higher system reliability.',
				image: 'https://img.thingsboard.io/case-studies/kiotera-3.webp',
				imageAlt: 'District heating & utility monitoring',
			},
		],
	},

	help: {
		industryName: 'KIOTERA improve IoT-implementations',
		blocks: [
			{
				title: 'Universal device connectivity',
				text: "ThingsBoard supports all major IoT communication standards like LoRaWAN, MQTT, NB-IoT, HTTP, and Modbus allowing KIOTERA to integrate sensors and meters from virtually any manufacturer. This vendor independence is essential for real-world deployments, where legacy equipment and modern IoT devices must coexist.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
			{
				title: 'Reusable assets for faster rollouts',
				text: "ThingsBoard allows KIOTERA to develop reusable telemetry models, device profiles, rule chains and dashboards, which can be deployed across various sites and use cases.<br/><br/>This standardisation reduces project delivery time while ensuring that every installation follows a proven and scalable architecture. Meanwhile, ThingsBoard remains fully customisable, enabling KIOTERA to extend modules whenever customers require industry-specific logic or visualisations.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/markdown-html-widget.webp', alt: 'Thingsboard markdown html widget', title: 'Thingsboard markdown html widget' },
				],
			},
			{
				title: 'Multi-tenant scalability',
				text: "Scalable multi-tenant architecture: Thanks to ThingsBoard's built-in multi-tenancy, KIOTERA can structure large customer environments into separate divisions, locations or operational units, each with their own dashboards, access rights and assets.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
				],
			},
			{
				title: 'Deployment flexibility: cloud or on-premises',
				text: "Many industrial operators require strict data handling rules or prefer on-premises deployment for security reasons. ThingsBoard supports both cloud-based and on-premises deployments, enabling KIOTERA to align with each customer's IT and cybersecurity needs without compromising on functionality or performance.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp', alt: 'Thingsboard digital gauges widgets', title: 'Thingsboard digital gauges widgets' },
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'Thingsboard donut chart widget', title: 'Thingsboard donut chart widget' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"ThingsBoard enables us to use a modular approach in our solutions, allowing our customers to implement IoT-Solutions in a matter of days. These modules are based on standardized, proven building blocks that combine industrial gateways, tried-and-tested sensors, rule chains and visualizations refined through many years of project experience."',
		author: 'Dr. Michael Schwerter',
		role: 'Head of Product',
		company: 'KIOTERA',
		photo: 'https://img.thingsboard.io/case-studies/dr_michael_schwerter.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/kiotera.svg',
		companyLogoAlt: 'KIOTERA logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
