import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Smart Field Service Delivery with ThingsBoard and Oneserve',
	pageTitle: 'Smart Field Service Delivery with Oneserve',
	description:
		'Discover how Oneserve uses ThingsBoard to deliver scalable, integrated, and agile field service solutions across housing, utilities, and manufacturing.',
	pageSlug: 'oneserve',
	breadcrumb: 'Oneserve — Facility Management',
	categories: ['Facility management'],

	hero: {
		category: 'FACILITY MANAGEMENT',
		heading: 'Oneserve builds agile FSM platform using ThingsBoard IoT',
		paragraphs: [
			'Oneserve is a UK-based Field Service Management (FSM) platform delivering end-to-end digital solutions for asset maintenance and service delivery. Their technology powers thousands of engineers and service teams across housing, utilities, and manufacturing sectors. By integrating scheduling, workforce tracking, compliance, and reporting into one streamlined system, Oneserve helps organizations improve first-time fix rates, reduce operational costs, and drive customer satisfaction through smart automation.',
		],
		logo: 'https://img.thingsboard.io/case-studies/oneserve.svg',
		logoAlt: 'Oneserve logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/oneserve.webp',
	},

	statistics: [
		{ value: 15, label: 'years experience' },
		{ value: 35, suffix: '%', label: 'more jobs completed per day' },
		{ value: 20, suffix: '%', label: 'increase in the first time fix rate' },
	],

	authoredQuote: {
		text: '\u201CWe operate in highly competitive markets; from housing management to utilities and manufacturing sectors. Technology innovation is at the heart of our product strategy and service delivery approach. As we grow and extend our field service management solution, we recognised that we needed a flexible IoT platform that enables our delivery.\u201D',
		author: 'Mark Hunt',
		role: 'CTO',
		company: 'Oneserve',
		photo: 'https://img.thingsboard.io/case-studies/mark-hunt.webp',
	},

	problem: {
		challenges: [
			'They needed a flexible IoT platform that could easily support their changing delivery needs without making things more complicated or expensive.',
			'They needed a platform with many features that could also grow and change as their business needs changed.',
			'They needed simple ways to connect the new platform to their current systems and to easily see and understand their data.',
			'They were looking for a technology partner who could support their innovation and help them continue growing in the future.',
		],
		results: [
			'ThingsBoard quickly met Oneserve\'s need for flexibility and easy service delivery.',
			'The platform made it simple to adapt and set up new projects without much difficulty.',
			'Built-in tools for connection and data visualization helped improve system performance and made it easier to manage operations.',
			'Regular platform updates and strong support from the ThingsBoard team gave Oneserve a reliable and future-ready IoT solution.',
		],
	},

	power: {
		companyName: 'Oneserve',
		blocks: [
			{
				title: 'Scalable growth made simple',
				text: 'ThingsBoard played an important role in helping Oneserve transform and improve its field service management solution. As Oneserve continued to grow, they needed a platform that could keep up with their increasing demands without making their systems more complicated or expensive. ThingsBoard provided exactly what they needed \u2014 a flexible, powerful, and easy-to-use IoT platform that fit their business strategy perfectly.',
				image: 'https://img.thingsboard.io/case-studies/oneserve-1.webp',
				imageAlt: 'Scalable growth made simple',
			},
			{
				title: 'Fast and flexible IoT integration',
				text: 'With ThingsBoard, Oneserve was able to quickly and easily add IoT capabilities to their services. The platform\'s flexibility allowed them to adapt it to different projects and customer needs without needing complex technical changes. This helped them deliver solutions faster and with less effort.',
				image: 'https://img.thingsboard.io/case-studies/oneserve-3.webp',
				imageAlt: 'Fast and flexible IoT integration',
			},
			{
				title: 'Smart data, smarter decisions',
				text: 'Another big advantage was ThingsBoard\'s built-in tools for integration and visualisation. Oneserve could connect ThingsBoard smoothly with their existing systems, making it easier to collect, manage, and understand data from their field operations. The visualisation features allowed them to create useful dashboards and reports, helping their teams make better and faster decisions.',
				image: 'https://img.thingsboard.io/case-studies/oneserve-2.webp',
				imageAlt: 'Smart data, smarter decisions',
			},
			{
				title: 'Support that drives success',
				text: 'Support from the ThingsBoard team was also a key benefit. Whenever Oneserve had questions or needed help, the ThingsBoard team was available, responsive, and ready to offer solutions. This strong partnership gave Oneserve confidence that the platform would continue to grow and improve along with their business needs.',
				image: 'https://img.thingsboard.io/case-studies/oneserve-4.webp',
				imageAlt: 'Support that drives success',
			},
			{
				title: 'A future-proof IoT foundation',
				text: 'Thanks to ThingsBoard, Oneserve now has a strong and reliable IoT foundation. They are able to innovate faster, provide better services to their clients, and stay competitive in important sectors like housing management, utilities, and manufacturing.',
				image: 'https://img.thingsboard.io/case-studies/oneserve-5.webp',
				imageAlt: 'A future-proof IoT foundation',
			},
		],
	},

	help: {
		industryName: 'facility management improve operations with IoT',
		blocks: [
			{
				title: 'Centralized monitoring and management',
				text: 'Facility operators deal with multiple disparate systems: HVAC, lighting, security, water supply, and more. ThingsBoard unifies these into a single platform, allowing seamless management of all processes through a user-friendly interface.',
				listItems: [
					'You connect sensors for temperature, humidity, motion, water consumption, and other parameters.',
					'All data is aggregated and visualized on customizable dashboards.',
					'Automated alerts and system responses can be configured (e.g., turning on ventilation when CO\u2082 levels rise).',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/supermarkets_2.webp', alt: 'Thingsboard supermarkets widget', title: 'Thingsboard supermarkets widget' },
				],
			},
			{
				title: 'Predictive maintenance',
				text: 'A broken air conditioner in a shopping mall during summer is not just an inconvenience but a serious business problem. Predictive maintenance helps prevent breakdowns before they occur.',
				listItems: [
					'Sensors track changes in equipment parameters (engine temperature, vibration, oil level).',
					'ThingsBoard analyzes data in real-time and detects anomalies.',
					'The system automatically creates notifications or service requests.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table-3.webp', alt: 'Thingsboard alarms widget', title: 'Thingsboard alarms widget' },
				],
			},
			{
				title: 'Smart dashboards and data visualization',
				text: 'Raw data is useless without proper visualization. ThingsBoard enables the creation of informative dashboards that help make faster decisions.',
				listItems: [
					'You create dashboards for specific tasks (e.g., energy consumption monitoring, climate control, space utilization analysis).',
					'Data is displayed using charts, graphs, tables, and maps.',
					'Role-based access control allows engineers to see one set of metrics while managers view another.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'Thingsboard donut chart widget', title: 'Thingsboard donut chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/analogue-gauge.webp', alt: 'Thingsboard analogue gauge widget', title: 'Thingsboard analogue gauge widget' },
				],
			},
			{
				title: 'Energy consumption management',
				text: 'Energy costs are one of the largest expenses. IoT analytics helps reduce costs, identify overuse, and implement energy-saving scenarios.',
				listItems: [
					'You connect energy meters, light sensors, and climate control systems.',
					'ThingsBoard analyzes consumption and identifies anomalies (e.g., electrical overloads or inefficient heating zones).',
					'Automated scenarios can be configured, such as dimming lights at night or turning off air-conditioners in empty rooms.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp', alt: 'Thingsboard digital gauges widgets', title: 'Thingsboard digital gauges widgets' },
					{ src: 'https://img.thingsboard.io/case-studies/status-widget-1.webp', alt: 'Thingsboard status widget', title: 'Thingsboard status widget' },
				],
			},
			{
				title: 'Process automation and BMS integration',
				text: 'Building management should not be manual \u2014 ThingsBoard enables the automation of routine processes and seamless integration with Building Management Systems (BMS).',
				listItems: [
					'If CO\u2082 levels exceed the threshold, the system automatically turns on ventilation.',
					'If a water leakage sensor is triggered, ThingsBoard sends an emergency alert and shuts off the water supply.',
					'Motion sensors ensure lights are only on in occupied areas.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/single-switch-widget.webp', alt: 'Thingsboard single switch widget', title: 'Thingsboard single switch widget' },
					{ src: 'https://img.thingsboard.io/case-studies/power_button.webp', alt: 'Thingsboard power button widget', title: 'Thingsboard power button widget' },
				],
			},
			{
				title: 'Enhancing facility security',
				text: 'Modern buildings require intelligent security systems. ThingsBoard allows integration and monitoring of video surveillance, access control, smoke detectors, and motion sensors.',
				listItems: [
					'Sensors detect movement in restricted areas, triggering instant notifications.',
					'Security personnel can view live camera feeds directly within ThingsBoard.',
					'In case of fire or gas leaks, the system automatically sends an alarm and activates emergency protocols.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarm_widgets.webp', alt: 'Thingsboard alarm widgets', title: 'Thingsboard alarm widgets' },
					{ src: 'https://img.thingsboard.io/case-studies/supermarkets.webp', alt: 'Supermarkets widget', title: 'Supermarkets widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/oneserve.svg',
		companyLogoAlt: 'Oneserve logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
