import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How Nettra Accelerated IoT Innovation by Switching to ThingsBoard',
	pageTitle: 'How Nettra Accelerated IoT Innovation',
	description:
		'Nettra, an IoT company in telecom and energy, replaced months of in-house development by adopting ThingsBoard \u2014 gaining speed, scale, and reliability.',
	pageSlug: 'nettra',
	breadcrumb: 'Nettra — Smart Energy',
	categories: ['Smart energy'],

	hero: {
		category: 'SMART ENERGY',
		heading: 'Cutting time and costs: Nettra\'s shortcut to IoT platform success',
		paragraphs: [
			'Nettra is a technology-driven IoT company that specializes in the monitoring, control, and management of distributed infrastructures across various industries. With deep expertise in telecommunications, energy, utilities, and industrial sectors, Nettra designs and delivers end-to-end IoT solutions that integrate smart devices, advanced communication networks, and cloud-based platforms seamlessly.',
			'Their solutions empower organisations to gather, transmit, and analyze real-time operational data from assets deployed in the field, no matter how remote or complex the environment. By translating raw data into actionable insights, Nettra enables its clients to optimize operational efficiency, minimize maintenance costs, enhance decision-making, and achieve sustainable growth.',
			'With a strong focus on innovation, adaptability, and customer-centric service, Nettra positions itself as a strategic partner for businesses seeking to unlock the full potential of IoT technology to transform their operations.',
		],
		logo: 'https://img.thingsboard.io/case-studies/nettra.svg',
		logoAlt: 'Nettra logo',
		logoWidth: 500,
		logoHeight: 126,
		backgroundImage: 'https://img.thingsboard.io/case-studies/nettra.webp',
	},

	statistics: [
		{ value: 10, label: 'years of experience' },
		{ value: 1000, label: 'monitoring points installed' },
	],

	quote: {
		text: 'We had been working on the development of our own software platform for almost 6 months when we came across Thingsboard. Not only Thingsboard had all the functionalities we had already developed, but also included many more that were on our pipeline for the coming months. Switching to Thingsboard was a no-brainer. The platform has proven to be very reliable.',
		author: 'Agustin Derregibus, CEO and Co-Founder of Nettra',
	},

	problem: {
		challenges: [
			'They had already spent almost six months developing basic features.',
			'They realized they would still need to add many more features in the coming months.',
			'Continuing to develop everything themselves would take much more time and require a lot of resources.',
			'They needed a solution that was reliable, could grow with their business, and could quickly meet new IoT needs without losing quality.',
		],
		results: [
			'They immediately got access to a complete platform that already included all the features they had built.',
			'They also gained many extra features they had planned for the future, saving them a lot of development time.',
			'They reduced the time needed to bring their solutions to the market, allowing them to focus more on serving clients and creating new ideas.',
			'They now have a stable, reliable platform with strong technical support and regular updates to keep improving.',
		],
	},

	power: {
		companyName: 'Nettra',
		blocks: [
			{
				title: 'Scales with confidence',
				text: 'Recognizing the strategic advantage, Nettra made the decision to adopt ThingsBoard as the backbone of their IoT platform. The migration was seamless due to ThingsBoard\'s comprehensive feature set, which not only met but exceeded Nettra\'s initial development efforts and future plans. Thanks to ThingsBoard, Nettra successfully accelerated their platform development, enhanced reliability for their customers, and positioned themselves as a competitive leader in the IoT space.',
				image: 'https://img.thingsboard.io/case-studies/telemetry.webp',
				imageAlt: 'Nettra\'s dashboard',
			},
		],
	},

	help: {
		industryName: 'smart energy improve operations',
		blocks: [
			{
				title: 'One platform for all energy devices',
				text: 'ThingsBoard makes it much easier for smart energy companies to manage their operations. Instead of juggling different systems for different types of devices, companies can connect everything into one platform. ThingsBoard supports all the major communication protocols - like MQTT, CoAP, HTTP, LwM2M, SNMP, Modbus, and OPC-UA - which means it can easily work with a wide range of energy devices without any extra hassle.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/status-widget-1.webp', alt: 'Thingsboard status widget', title: 'Thingsboard status widget' },
				],
			},
			{
				title: 'Real-time insights with zero effort',
				text: 'With ThingsBoard, companies can collect real-time data from their devices and display it on customizable dashboards. This makes it easy to monitor energy usage, device status, and system performance at any time. The platform includes a powerful Rule Engine that can automatically detect problems, send alarms, and trigger actions without human intervention.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
				],
			},
			{
				title: 'Reliable offline with Edge and OTA',
				text: 'For locations where internet access is limited, ThingsBoard offers edge computing. This means data can be processed locally, improving reliability and reducing delays. Over-the-air (OTA) updates allow companies to remotely update device software and settings, saving time and reducing maintenance costs.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/single-switch-widget.webp', alt: 'Thingsboard single switch widget', title: 'Thingsboard single switch widget' },
					{ src: 'https://img.thingsboard.io/case-studies/power_button.webp', alt: 'Thingsboard power button widget', title: 'Thingsboard power button widget' },
				],
			},
			{
				title: 'Organized assets and built-in security',
				text: 'Companies can also organise their devices, sites, and customers clearly with asset hierarchies and groupings. Strong security features \u2013 like role-based access control, encrypted data transfer, and detailed audit logs \u2013 help protect sensitive information and meet regulatory requirements.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
				],
			},
			{
				title: 'Analytics that drive efficiency',
				text: 'On top of that, ThingsBoard provides powerful data analytics tools, allowing companies to store historical data, track performance trends, and generate reports. This helps identify ways to improve efficiency, detect issues early, and make better decisions based on real data.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'Thingsboard donut chart widget', title: 'Thingsboard donut chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'Thingsboard bar chart widget', title: 'Thingsboard bar chart widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/nettra.svg',
		companyLogoAlt: 'Nettra logo',
		companyLogoWidth: 500,
		companyLogoHeight: 126,
	},
};
