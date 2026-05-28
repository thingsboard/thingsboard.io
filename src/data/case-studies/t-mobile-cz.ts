import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How T-Mobile uses ThingsBoard for agile IoT prototyping',
	pageTitle: 'How T-Mobile Accelerated Agile IoT Prototyping',
	description:
		'Learn how T-Mobile Czech Republic leverages ThingsBoard to streamline development and visualization of IoT solutions.',
	pageSlug: 't-mobile-cz',
	breadcrumb: 'T-Mobile Czech Republic — Telecom',
	categories: ['Telecom'],

	hero: {
		category: 'TELECOM',
		heading: 'Scaling IoT prototyping at T-Mobile CZ with ThingsBoard',
		paragraphs: [
			'T-Mobile Czech Republic is one of the leading telecommunications providers in the Czech Republic and a key player in the country\u2019s digital transformation. As part of Deutsche Telekom Group, the company delivers a wide range of services, including mobile and fixed-line connectivity, broadband, and a robust portfolio of IoT solutions.',
			'T-Mobile is a pioneer in IoT connectivity, offering NB-IoT and Sigfox networks and complete ICT services for businesses. Their innovative approach to IoT enables rapid prototyping, seamless integration of new devices, and scalable deployment of smart solutions across industries including utilities, manufacturing, and public infrastructure.',
		],
		logo: 'https://img.thingsboard.io/case-studies/t-mobile-cz.svg',
		logoAlt: 'T-Mobile CZ logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/t-mobile-cz.webp',
	},

	statistics: [
		{ value: 6, decimal: { value: 3, suffix: 'M+' }, label: 'customers in the Czech Republic' },
		{ value: 95, suffix: '%', label: 'nationwide NB-IoT coverage' },
	],

	quote: {
		text: 'We have choose to use ThingsBoard to be able easily and quickly deliver various proof-of-concepts, product prototypes and to test new devices with comes usually \u201Capp-less\u201D. With ThingsBoard we are able finish such tasks with visually attractive result with sleek user interface and done in nearly no time. In comparison to other IoT platforms and tools we value the mo...',
		author: 'David T\u00FDr, Innovation Manager at T-Mobile Czech Republic',
	},

	problem: {
		description:
			'T-Mobile\u2019s innovation team needed a flexible and efficient platform to rapidly develop proof-of-concepts (PoC), prototype new IoT products, and test \u201Capp-less\u201D devices. Speed and simplicity were essential \u2014 along with the ability to visualize device data through sleek, intuitive dashboards.',
		challenges: [
			'Rapid delivery of PoCs and MVPs for internal and external stakeholders',
			'Lack of native UIs on many newly tested devices',
			'Need for a user-friendly but powerful platform with strong protocol support',
			'Creating visually engaging dashboards with minimal effort',
			'Supporting a wide range of communication technologies (e.g., NB-IoT, Sigfox)',
		],
		results: [
			'Accelerated PoC and prototype delivery timelines',
			'Smooth onboarding and visualization for \u201Capp-less\u201D devices',
			'Intuitive user experience without compromising on functionality',
			'Visually engaging, customizable dashboards built quickly',
			'Easy integration with NB-IoT, Sigfox, and other IoT technologies',
		],
	},

	power: {
		companyName: 'T-Mobile Czech Republic',
		blocks: [
			{
				title: 'Rapid prototyping and PoC delivery',
				text: 'ThingsBoard enabled T-Mobile to quickly create and present fully functional PoCs and MVPs. Thanks to its visual dashboards and powerful Rule Engine, development timelines were dramatically shortened.',
				image: 'https://img.thingsboard.io/case-studies/t-mobile-cz-1.webp',
				imageAlt: 'Rapid prototyping and PoC delivery',
			},
			{
				title: 'Seamless handling of \u201CApp-less\u201D devices',
				text: 'Many IoT devices under evaluation had no user-facing applications. With ThingsBoard, T-Mobile could easily connect these devices and provide real-time data visualization through flexible and customizable dashboards.',
				image: 'https://img.thingsboard.io/case-studies/t-mobile-cz-2.webp',
				imageAlt: 'Seamless handling of \u201CApp-less\u201D devices',
			},
			{
				title: 'Simplicity meets functionality',
				text: 'The platform offers an intuitive interface that simplifies onboarding and development \u2014 without losing depth. Native support for MQTT, HTTP, CoAP, LWM2M and other protocols allowed easy device integration.',
				image: 'https://img.thingsboard.io/case-studies/t-mobile-cz-3.webp',
				imageAlt: 'Simplicity meets functionality',
			},
			{
				title: 'Reliable innovation infrastructure',
				text: 'ThingsBoard became a core tool in the innovation workflow at T-Mobile, powering quick experiments and helping deliver market-ready solutions based on NB-IoT and Sigfox without unnecessary overhead.',
				image: 'https://img.thingsboard.io/case-studies/t-mobile-cz-4.webp',
				imageAlt: 'Reliable innovation infrastructure',
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
		companyLogo: 'https://img.thingsboard.io/case-studies/t-mobile-cz.svg',
		companyLogoAlt: 'T-Mobile CZ logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
