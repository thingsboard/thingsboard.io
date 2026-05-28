import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'mdeg Scales Secure Medical IoT with ThingsBoard',
	pageTitle: 'mdeg Scales Secure Medical IoT',
	description:
		'Discover how mdeg GmbH used ThingsBoard to build a secure, scalable IoT platform for connecting medical devices in compliance with EU healthcare standards.',
	pageSlug: 'mdeg',
	breadcrumb: 'mdeg GmbH — Smart IoT Solutions',
	categories: ['Smart IoT solution'],

	hero: {
		category: 'SMART IOT SOLUTIONS',
		heading: 'How mdeg scaled secure medical device connectivity with ThingsBoard',
		paragraphs: [
			'mdeg GmbH is a German technology company specializing in digital solutions for the healthcare sector. One of its core products is the mdeg Medical Device Cloud \u2014 a scalable platform for connecting, monitoring, and managing medical devices. The company provides a turnkey cloud infrastructure designed to meet the healthcare industry\'s strict requirements for data security, localization, and reliability.',
			'By focusing exclusively on the medical field, mdeg GmbH enables device manufacturers to accelerate their digital transformation, improve service efficiency, and ensure regulatory compliance. Today, mdeg serves a wide range of clients across Europe, offering them a highly reliable and customizable IoT infrastructure.',
		],
		logo: 'https://img.thingsboard.io/case-studies/mdeg.svg',
		logoAlt: 'mdeg logo',
		logoWidth: 500,
		logoHeight: 126,
		backgroundImage: 'https://img.thingsboard.io/case-studies/mdeg.webp',
	},

	authoredQuote: {
		text: '\u201COne of our core products is the mdeg Medical Device Cloud, a connectivity solution for medical devices to record, track, and monitor. Being dedicated for Medical Devices only, we have to meet the highest standards regarding reliability, independence, security and scalability. We also need to stay within judicial area with our infrastructure.\u201D',
		author: 'Christoph Beck',
		role: 'Founder and CEO',
		company: 'mdeg GmbH',
		photo: 'https://img.thingsboard.io/case-studies/christoph-beck.webp',
	},

	problem: {
		challenges: [
			'Ensuring compliance with strict medical standards (MDR, ISO, GDPR)',
			'Hosting infrastructure entirely within the European Union',
			'Providing reliable and fault-tolerant data transmission from connected devices',
			'Enabling fast configuration and adaptation for various device manufacturers',
			'Flexibly integrating business logic tailored to the specific needs of the healthcare industry',
		],
		results: [
			'A fully operational IoT platform dedicated to connecting medical devices',
			'Enhanced reliability and flexibility achieved through ThingsBoard\'s Rule Engine',
			'Accelerated development and deployment thanks to support from the ThingsBoard team',
			'The solution is now serving customers across Europe',
			'Full compliance with security and regulatory requirements has been ensured',
		],
	},

	power: {
		companyName: 'mdeg GmbH',
		blocks: [
			{
				title: 'Reliable architecture for healthcare',
				text: 'ThingsBoard became the foundation of the mdeg Medical Device Cloud thanks to its stable and fault-tolerant architecture. This ensured secure and uninterrupted real-time data transmission from medical devices \u2014 a critical requirement in healthcare.',
				image: 'https://img.thingsboard.io/case-studies/mdeg-1.webp',
				imageAlt: 'Reliable architecture for healthcare',
			},
			{
				title: 'Rule Engine for flexible business logic',
				text: 'A key advantage of ThingsBoard for mdeg was the ability to implement business logic flexibly using the Rule Engine. This allowed the platform to be easily adapted to meet the specific needs of different clients without the need for deep custom development.',
				image: 'https://img.thingsboard.io/case-studies/mdeg-2.webp',
				imageAlt: 'Rule Engine for flexible business logic',
			},
			{
				title: 'Industry-grade compliance',
				text: 'The ThingsBoard team provided high-quality support at every stage \u2014 from prototype to full-scale deployment. This accelerated the time-to-market and reduced technical risks throughout the development process.',
				image: 'https://img.thingsboard.io/case-studies/mdeg-3.webp',
				imageAlt: 'Industry-grade compliance',
			},
		],
	},

	help: {
		industryName: 'smart IoT solutions improve operations with IoT',
		blocks: [
			{
				title: 'Scalable device connectivity and data management',
				text: 'ThingsBoard simplifies the integration of millions of devices and sensors, regardless of vendor or protocol.',
				listItems: [
					'Supports MQTT, HTTP, CoAP, LwM2M, and OPC-UA for seamless connectivity.',
					'Built-in device provisioning, telemetry collection, and lifecycle management.',
					'Scales from small proof-of-concepts to nationwide IoT deployments.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
				],
			},
			{
				title: 'Custom dashboards for real-time visualization',
				text: 'A good IoT solution isn\'t complete without real-time insights and actionable data. ThingsBoard offers powerful dashboarding tools tailored to specific use cases.',
				listItems: [
					'Drag-and-drop widgets for charts, gauges, maps, tables, and SCADA elements.',
					'Role-based views for operators, analysts, or customers.',
					'Interactive dashboards with real-time updates and control elements.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
				],
			},
			{
				title: 'Powerful rule engine for smart automation',
				text: 'ThingsBoard\'s Rule Engine enables real-time decision-making and system automation without writing complex backend code.',
				listItems: [
					'Define logic to process incoming telemetry, trigger alerts, store data, or control devices.',
					'Chain multiple actions (send email \u2192 log alert \u2192 execute RPC).',
					'Integrate with external systems via REST API, MQTT, or cloud connectors.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/single-switch-widget.webp', alt: 'Thingsboard single switch widget', title: 'Thingsboard single switch widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Multi-tenancy & white-labeling for IoT-as-a-Service',
				text: 'If you\'re building an IoT platform for clients, partners, or internal teams, ThingsBoard provides a multi-tenant architecture that separates data and access by organization or user role.',
				listItems: [
					'Each tenant has its own isolated dashboards, devices, and users.',
					'Service providers can white-label the platform with logos, colors, and custom domains.',
					'Secure data access via role-based permissions and audit logging.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/dashboards-widget.webp', alt: 'Thingsboard dashboards widget', title: 'Thingsboard dashboards widget' },
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/mdeg.svg',
		companyLogoAlt: 'mdeg logo',
		companyLogoWidth: 500,
		companyLogoHeight: 126,
	},
};
