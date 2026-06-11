import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How SenseING GmbH Optimized Cold Chain Monitoring with ThingsBoard',
	pageTitle: 'How SenseING GmbH Optimized Cold Chain Monitoring',
	description:
		"Discover how SenseING GmbH enhanced food logistics by integrating ThingsBoard's IoT platform\u2014achieving real-time temperature monitoring, reducing human error, and ensuring regulatory compliance across 100+ storage and transportation units.",
	pageSlug: 'senseing',
	breadcrumb: 'SenseING GmbH — Cold Chain Monitoring',
	categories: ['Cold chain monitoring'],

	hero: {
		category: 'COLD CHAIN MONITORING',
		heading: 'Transforming food logistics with IoT-powered temperature monitoring',
		paragraphs: [
			'Our client specializes in food logistics, where maintaining optimal storage and transportation conditions is critical. To ensure food safety and compliance, they needed a reliable, scalable, and easy-to-implement IoT solution for automated temperature monitoring and documentation.',
		],
		logo: 'https://img.thingsboard.io/case-studies/senseing.svg',
		logoAlt: 'SenseING GmbH logo',
		logoWidth: 240,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/senseing.webp',
	},

	statistics: [
		{ value: 100, suffix: '%', label: 'automated temperature monitoring' },
		{ value: 90, suffix: '%', label: 'reduction in human error' },
		{ value: 100, suffix: '+', label: 'storage and transportation units' },
	],

	problem: {
		description:
			'Food logistics require precise monitoring of temperature and storage conditions to prevent spoilage and ensure regulatory compliance. The client sought an IoT platform that could.',
		challenges: [
			'Integrate with various sensor solutions.',
			'Provide real-time data visualization and alerts.',
			'Require minimal development effort for customization.',
			'Scale efficiently to accommodate expanding operations.',
		],
		results: [
			'Continuous tracking of temperature and storage conditions.',
			'Seamless multi-sensor integration across locations.',
			'Tailored visualizations for better data insights.',
			'Instant notifications in case of temperature deviations.',
		],
	},

	power: {
		companyName: 'SenseING GmbH',
		blocks: [
			{
				title: 'Enhanced compliance & efficiency',
				text: 'With ThingsBoard, the client improved compliance with food safety regulations by automating temperature documentation. Manual monitoring was reduced, decreasing the risk of human error.',
				image: 'https://img.thingsboard.io/case-studies/enhanced_compliance_efficiency.webp',
				imageAlt: 'Man at facility',
			},
			{
				title: 'Scalability for future growth',
				text: "Beyond customer-facing applications, the company integrated ThingsBoard into its own production monitoring, showcasing the platform's versatility. This internal use case reinforced the system's reliability and robustness.",
				image: 'https://img.thingsboard.io/case-studies/scalability_future_growth.webp',
				imageAlt: 'Abstract chart rising',
			},
			{
				title: 'Internal process optimization',
				text: 'As the company expands its logistics network, the flexibility of ThingsBoard ensures seamless integration of new sensor solutions without development overhead.',
				image: 'https://img.thingsboard.io/case-studies/internal_process_optimization.webp',
				imageAlt: 'Pallets elevating',
			},
		],
	},

	help: {
		industryName: 'cold chain monitoring improve operations with IoT',
		blocks: [
			{
				title: 'Real-Time temperature & humidity monitoring',
				text: 'Cold chain operators must track temperature and humidity levels across warehouses, transportation fleets, and storage units. ThingsBoard centralizes all monitoring into a single, easy-to-use platform, providing instant access to critical environmental data.',
				listItems: [
					'IoT sensors placed in storage units, trucks, and warehouses continuously measure temperature and humidity.',
					'Data is transmitted to ThingsBoard in real-time and visualized on custom dashboards.',
					'Automated alerts notify operators when temperature thresholds are exceeded.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
			{
				title: 'Automated alerts & instant notifications',
				text: 'Unexpected temperature changes can cause irreversible damage. ThingsBoard ensures immediate action by sending automated alerts to responsible personnel when conditions deviate from the required range.',
				listItems: [
					'Define critical temperature ranges and alert conditions.',
					"If a cooling unit fails or a truck's temperature rises above the set limit, an instant notification is sent via email, SMS, or push notification.",
					'Operators can respond in real-time, preventing costly product spoilage.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/value-stepper-widget.webp', alt: 'Thingsboard value stepper widget', title: 'Thingsboard value stepper widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Predictive maintenance for refrigeration units',
				text: 'Equipment failures in refrigeration units can lead to massive losses. Predictive maintenance powered by ThingsBoard prevents breakdowns before they happen, reducing downtime and maintenance costs.',
				listItems: [
					'IoT sensors monitor compressor health, power consumption, and temperature stability.',
					'Machine learning algorithms detect early warning signs of malfunction.',
					'Maintenance teams receive alerts before critical failures occur, allowing timely servicing.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
				],
			},
			{
				title: 'Regulatory compliance & audit reporting',
				text: 'Cold chain logistics require strict compliance with industry regulations such as HACCP, FDA, and GxP. ThingsBoard helps businesses maintain accurate records and generate reports to ensure full compliance.',
				listItems: [
					'ThingsBoard automatically records temperature logs, alarm events, and maintenance history.',
					'Historical data can be exported for regulatory audits and compliance verification.',
					'Custom dashboards help visualize adherence to SOPs (Standard Operating Procedures).',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/sensors-widget.webp', alt: 'Thingsboard sensors widget', title: 'Thingsboard sensors widget' },
					{ src: 'https://img.thingsboard.io/case-studies/pie-chart.webp', alt: 'Thingsboard pie chart widget', title: 'Thingsboard pie chart widget' },
				],
			},
			{
				title: 'End-to-end supply chain visibility',
				text: 'Cold chain logistics involve multiple stakeholders\u2014from manufacturers to distributors and retailers. ThingsBoard enables seamless real-time tracking across the entire supply chain, ensuring products remain within optimal conditions.',
				listItems: [
					'GPS-integrated sensors monitor both location and temperature of shipments.',
					'Operators get real-time updates on environmental conditions along the delivery route.',
					'AI-driven analytics predict potential risks and suggest alternative solutions.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/label-value-widget.webp', alt: 'Thingsboard label and value widget', title: 'Thingsboard label and value widget' },
					{ src: 'https://img.thingsboard.io/case-studies/sensor-map-widget.webp', alt: 'Thingsboard sensor map widget', title: 'Thingsboard sensor map widget' },
				],
			},
			{
				title: 'Cost optimization & energy efficiency',
				text: 'Reducing energy consumption while maintaining optimal cooling is a key challenge in cold chain logistics. ThingsBoard helps businesses identify inefficiencies and optimize energy use to cut costs.',
				listItems: [
					'IoT sensors track power usage of refrigeration units and identify energy wastage.',
					'AI-powered analytics recommend energy-saving measures (e.g., adjusting cooling cycles).',
					'Automated controls dynamically optimize refrigeration power usage based on demand.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'Thingsboard donut chart widget', title: 'Thingsboard donut chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/control-widgets.webp', alt: 'Thingsboard control widgets', title: 'Thingsboard control widgets' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"With ThingsBoard, we can offer our customers a customised IoT platform that has been specially developed for monitoring temperature and storage conditions in food logistics. One of the platform\'s greatest strengths is its low-code approach, which allows us to implement complex solutions with minimal development effort. Tha..."',
		author: 'Steven Kruse',
		role: 'CEO',
		company: 'SenseING GmbH',
		photo: 'https://img.thingsboard.io/case-studies/Steven_Kruse.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/senseing.svg',
		companyLogoAlt: 'SenseING GmbH logo',
		companyLogoWidth: 240,
		companyLogoHeight: 56,
	},
};
