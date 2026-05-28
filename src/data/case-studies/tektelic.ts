import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'TEKTELIC Rapidly Deploys IoT with ThingsBoard',
	pageTitle: 'TEKTELIC Rapidly Deploys IoT',
	description:
		'Discover how TEKTELIC reduced time-to-market and built high-quality IoT applications on the ThingsBoard platform.',
	pageSlug: 'tektelic',
	breadcrumb: 'TEKTELIC — Telecom',
	categories: ['Telecom'],

	hero: {
		category: 'TELECOM',
		heading: 'From sensors to dashboards: TEKTELIC\u2019s rapid IoT deployment with ThingsBoard',
		paragraphs: [
			'TEKTELIC is a global leader in the design and manufacturing of LoRaWAN\u00AE IoT solutions. With a mission to simplify IoT deployments, TEKTELIC provides end-to-end wireless solutions that include high-performance gateways, sensors, and network infrastructure. Their products are known for their carrier-grade reliability, scalability, and efficiency, supporting diverse use cases from smart cities to industrial IoT.',
			'Founded and headquartered in Calgary, Canada, TEKTELIC operates globally and partners with major telecom operators, enterprises, and smart city initiatives. Their comprehensive ecosystem of hardware and software solutions ensures quick deployment and maximum interoperability, making them a trusted vendor in the fast-evolving IoT industry.',
		],
		logo: 'https://img.thingsboard.io/case-studies/tektelic.svg',
		logoAlt: 'TEKTELIC logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/tektelic.webp',
	},

	statistics: [
		{ value: 100, suffix: '+', label: 'countries around the world are covered by the market' },
		{ value: 99, suffix: '%', label: 'uptime availability for LoRaWAN\u00AE gateways' },
		{ value: 1, suffix: 'M+', label: 'devices deployed worldwide' },
	],

	quote: {
		text: 'We engaged ThingsBoard to complete our end-to-end solution and to address several of our clients\u2019 LoRaWAN IoT applications and Proof-of-Concept trials. Working with ThingsBoard we were able to dramatically reduce time to market, de-risk our technology investment and delight our customers by delivering a complete, high-quality applications which exc...',
		author: 'Roman Nemish, President at TEKTELIC',
	},

	problem: {
		description:
			'As TEKTELIC expanded its product portfolio with multifunctional LoRaWAN sensors and gateways, they needed a powerful, flexible, and scalable IoT platform to complete their end-to-end offering. The goal was to deliver PoC applications and vertical-specific solutions quickly \u2014 all while meeting complex client demands for real-time data visualization, control capabilities, and deep integration with their existing LoRaWAN network infrastructure.',
		challenges: [
			'Integration of data from diverse LoRaWAN\u00AE devices (Industrial & Home sensors)',
			'Need for real-time monitoring, historical data access, and user-defined triggers',
			'Control commands to edge devices from within the platform',
			'Seamless integration with TEKTELIC\u2019s LoRaWAN Network Server',
			'Rapid development of a polished, user-friendly application',
			'Operating within tight budgets and timelines',
		],
		results: [
			'Delivered a complete, integrated IoT application on time and on budget',
			'Accelerated time-to-market for multiple PoC and production deployments',
			'Minimized risk in adopting and scaling IoT technology',
			'Created a high-quality, intuitive interface with real-time insights and alarms',
			'Enabled seamless data flow and bidirectional control with LoRaWAN\u00AE infrastructure',
			'Strengthened client satisfaction and overall solution value',
		],
	},

	power: {
		companyName: 'TEKTELIC',
		blocks: [
			{
				title: 'Multi-sensor data integration',
				text: 'ThingsBoard enabled TEKTELIC to ingest and normalize data from a range of LoRaWAN\u00AE sensors, including industrial and smart home devices. Its flexible data model and device templates allowed for streamlined onboarding and uniform processing of heterogeneous sensor data.',
				image: 'https://img.thingsboard.io/case-studies/tektelic-1.webp',
				imageAlt: 'Multi-sensor data integration',
			},
			{
				title: 'Real-time visualization & historical analytics',
				text: 'With ThingsBoard\u2019s powerful dashboard engine, TEKTELIC was able to build interactive visualizations for both live and historical data. This empowered their users to monitor environments, detect anomalies, and access performance trends directly from an intuitive interface.',
				image: 'https://img.thingsboard.io/case-studies/tektelic-2.webp',
				imageAlt: 'Real-time visualization & historical analytics',
			},
			{
				title: 'Trigger-based alerts & automation',
				text: 'The platform\u2019s rule engine helped define custom alarms and automation flows for various scenarios. TEKTELIC configured alerts for threshold breaches and automated commands to end devices, all without custom development overhead.',
				image: 'https://img.thingsboard.io/case-studies/tektelic-3.webp',
				imageAlt: 'Trigger-based alerts & automation',
			},
			{
				title: 'Bi-directional control commands',
				text: 'Using ThingsBoard\u2019s RPC capabilities, the application enabled end-users to send direct commands to TEKTELIC\u2019s devices. This was critical for remote configuration, device management, and real-time operational response.',
				image: 'https://img.thingsboard.io/case-studies/tektelic-4.webp',
				imageAlt: 'Bi-directional control commands',
			},
			{
				title: 'Seamless LoRaWAN integration',
				text: 'Thanks to ThingsBoard\u2019s LoRaWAN integrations and connector flexibility, the platform integrated smoothly with TEKTELIC\u2019s existing Network Server. This ensured consistent communication, security, and device synchronization across the entire IoT stack.',
				image: 'https://img.thingsboard.io/case-studies/tektelic-5.webp',
				imageAlt: 'Seamless LoRaWAN integration',
			},
		],
	},

	help: {
		industryName: 'telecom improve operations with IoT',
		blocks: [
			{
				title: 'Remote monitoring of telecom infrastructure',
				text: 'With networks distributed across wide geographies, telecom providers require real-time monitoring of thousands of remote assets such as base stations, towers, and data centers. ThingsBoard enables centralized visibility and automated alerts across the entire infrastructure.',
				listItems: [
					'IoT gateways and sensors are connected to telecom towers, power systems, UPS, HVAC, and access doors.',
					'ThingsBoard collects data from all sites and presents it on custom dashboards.',
					'Rule Engine triggers real-time alarms when anomalies or failures occur.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
				],
			},
			{
				title: 'Energy management for remote sites',
				text: 'Telecom infrastructure is highly energy-intensive, especially in remote or off-grid locations. ThingsBoard enables smart energy monitoring and optimization, helping operators lower fuel usage, reduce emissions, and cut costs.',
				listItems: [
					'Smart meters, solar panels, diesel generators, and battery banks are connected via IoT.',
					'ThingsBoard visualizes energy consumption, generator runtime, fuel levels, and battery health.',
					'Automatic alerts warn of power failures, overloads, or low battery voltage.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp', alt: 'Thingsboard digital gauges widgets', title: 'Thingsboard digital gauges widgets' },
					{ src: 'https://img.thingsboard.io/case-studies/hp-scada-energy.webp', alt: 'Thingsboard HP SCADA energy widgets', title: 'Thingsboard HP SCADA energy widgets' },
				],
			},
			{
				title: 'Predictive maintenance of network equipment',
				text: 'Network outages and equipment failure can lead to major revenue loss and customer churn. ThingsBoard supports predictive maintenance for telecom gear\u2014helping teams resolve issues before downtime occurs.',
				listItems: [
					'Sensors track equipment temperature, vibration, runtime, and fault codes from BTS, routers, UPS, etc.',
					'Maintenance teams receive early alerts, enabling scheduled servicing instead of reactive repair.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
			{
				title: 'Site access control & security',
				text: 'Many telecom sites use legacy PLCs and SCADA systems for managing HVAC, power, and environmental control. ThingsBoard provides SCADA-style capabilities for modern visualization and automation.',
				listItems: [
					'Supports SCADA symbols and layout editors to create interactive site dashboards.',
					'Operators can control relays, HVAC, or lighting remotely through the UI.',
					'SCADA integration simplifies monitoring of mission-critical systems at scale.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hp-curcuit-breaker.webp', alt: 'Thingsboard HP curcuit breaker widget', title: 'Thingsboard HP curcuit breaker widget' },
					{ src: 'https://img.thingsboard.io/case-studies/value-stepper-widget.webp', alt: 'Thingsboard value stepper widget', title: 'Thingsboard value stepper widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/tektelic.svg',
		companyLogoAlt: 'TEKTELIC logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
