import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How Vypin Ensures Pharmaceutical Compliance with ThingsBoard\u2019s IoT Monitoring',
	pageTitle: 'How Vypin Ensures Pharmaceutical Compliance with IoT Monitoring',
	description:
		'Vypin uses ThingsBoard for real-time temperature and humidity monitoring in pharmaceutical storage, ensuring FDA compliance and reducing data loss.',
	pageSlug: 'vypin',
	breadcrumb: 'Vypin — Warehouse Monitoring',
	categories: ['Warehouse monitoring'],

	hero: {
		category: 'WAREHOUSE MONITORING',
		heading: 'Reliable T&H monitoring with WhereView (ThingsBoard)',
		paragraphs: [
			'Vypin is a pharmaceutical company specializing in industrial IoT solutions aimed at enhancing safety, efficiency, and profitability for enterprises. Their products, such as Vypin Cloud\u2122, provide critical data analytics, while their hardware automates data collection processes, eliminating outdated manual methods. Vypin\u2019s solutions are easy to install and scale as businesses grow, offering decision-makers the tools they need to make informed choices without requiring technical expertise.',
		],
		logo: 'https://img.thingsboard.io/case-studies/vypin.svg',
		logoAlt: 'Vypin LLC logo',
		logoWidth: 144,
		logoHeight: 58,
		backgroundImage: 'https://img.thingsboard.io/case-studies/vypin.webp',
	},

	statistics: [
		{ value: 32, prefix: '+', suffix: '%', label: 'energy efficiancy' },
		{ value: 24, prefix: '+', suffix: '%', label: 'profit' },
		{ value: 12, prefix: '-', suffix: '%', label: 'transaction costs' },
	],

	authoredQuote: {
		text: '\u201CI wanted to thank everyone at Thingsboard on behalf of us here at Vypin for the tremendous support over the past few months. This has allowed Vypin to taste the finish line for our two primary projects. We are looking forward to continuing our partnership and even strengthening our business relationship and opportunities going forward.\u201D',
		author: 'JT McGibbon',
		role: 'General manager',
		company: 'Vypin LLC',
		photo: 'https://img.thingsboard.io/case-studies/JT_McGibbon.webp',
	},

	problem: {
		description:
			'The Food & Drug Administration (FDA) has strict regulations regarding the storage conditions of pharmaceutical products. Failure to comply leads to penalties and the risk of product spoilage.',
		challenges: [
			'Data loss due to network or power failures, causing telemetry gaps and inefficiencies.',
			'Lack of telemetry recording leaving the company unaware of temperature fluctuations.',
			'No remote access, making real-time monitoring impossible.',
			'Gaps in scheduled reports, increasing compliance risks and fines.',
		],
		results: [
			'No data loss with persistent local storage and automatic telemetry upload.',
			'Continuous telemetry with real-time temperature and humidity tracking.',
			'24/7 remote access to monitoring dashboards with instant alerts.',
			'Accurate compliance reports eliminating regulatory risks and penalties.',
		],
	},

	power: {
		companyName: 'Vypin',
		blocks: [
			{
				title: 'Real-time environmental monitoring',
				text: 'To address temperature and humidity control, ThingsBoard provided an advanced monitoring system that continuously tracks environmental conditions. The solution features real-time dashboards that visualize temperature and humidity levels across multiple warehouse areas. If predefined thresholds are breached, automated alerts notify operators immediately, ensuring corrective actions are taken before critical failures occur.',
				image: 'https://img.thingsboard.io/case-studies/real_time_environmental_monitoring.webp',
				imageAlt: 'Storage',
			},
			{
				title: 'Automated alerting & compliance tracking',
				text: 'ThingsBoard\u2019s alerting system was customized to detect any anomalies in storage conditions. The platform now generates automatic reports that comply with FDA regulations, ensuring that all required data is logged and traceable. This reduces manual paperwork and the risk of non-compliance penalties.',
				image: 'https://img.thingsboard.io/case-studies/automated_alerting_compliance_tracking.webp',
				imageAlt: 'Male investigating alert with laptop',
			},
			{
				title: 'Seamless data synchronization & integration',
				text: 'The ThingsBoard platform enables smooth integration with existing enterprise systems. Warehouse managers can now access all sensor data in a unified interface, eliminating inconsistencies between different monitoring tools and improving decision-making processes.',
				image: 'https://img.thingsboard.io/case-studies/seamless_data_synchronization_integration.webp',
				imageAlt: 'Synchronized devices and tablets',
			},
		],
	},

	help: {
		industryName: 'warehouse monitoring improve operations with IoT',
		blocks: [
			{
				title: 'Real-time inventory and asset tracking',
				text: 'Warehouse managers need complete visibility over stored goods, equipment, and movement of assets to prevent losses and optimize space utilization. ThingsBoard offers a centralized platform to track inventory in real-time.',
				listItems: [
					'RFID and IoT-enabled tags track item locations and movements.',
					'Sensors provide real-time data on inventory levels and stock conditions.',
					'Warehouse personnel access data through an intuitive dashboard.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
			{
				title: 'Warehouse temperature & humidity monitoring',
				text: 'Sensitive inventory, such as food, pharmaceuticals, and electronics, requires strict environmental control. Any fluctuation in temperature or humidity can lead to spoilage, degradation, or product failure.',
				listItems: [
					'IoT sensors continuously monitor temperature and humidity levels.',
					'Data is processed in real-time and displayed on custom dashboards.',
					'If conditions exceed set thresholds, automated alerts are triggered for corrective action.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table-2.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/analogue-gauge.webp', alt: 'Thingsboard analogue gauge widget', title: 'Thingsboard analogue gauge widget' },
				],
			},
			{
				title: 'Predictive maintenance for warehouse equipment',
				text: 'Unexpected equipment failures, such as conveyor breakdowns or forklift malfunctions, can disrupt operations and lead to costly delays. ThingsBoard helps prevent these issues with predictive maintenance.',
				listItems: [
					'Sensors monitor machine vibrations, energy consumption, and wear patterns.',
					'Analytics detect early warning signs of equipment failure.',
					'Automated alerts schedule maintenance before breakdowns occur.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
				],
			},
			{
				title: 'Security & access control monitoring',
				text: 'Warehouse security is critical for preventing theft, unauthorized access, and safety incidents. ThingsBoard provides real-time monitoring and automated alerts to enhance security.',
				listItems: [
					'IoT-based motion detectors and surveillance cameras monitor restricted zones.',
					'Unauthorized access attempts trigger instant security notifications.',
					'Live video feeds and event logs are accessible through ThingsBoard dashboards.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/apartment-image-map.webp', alt: 'Thingsboard apartment image map widget', title: 'Thingsboard apartment image map widget' },
					{ src: 'https://img.thingsboard.io/case-studies/status-widget-1.webp', alt: 'Thingsboard status widget', title: 'Thingsboard status widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/vypin.svg',
		companyLogoAlt: 'Vypin LLC logo',
		companyLogoWidth: 144,
		companyLogoHeight: 58,
	},
};
