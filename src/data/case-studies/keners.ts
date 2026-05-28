import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'IoT-Powered Farming - How Keners Scaled with ThingsBoard',
	pageTitle: 'IoT-Powered Farming — How Keners Scaled',
	description:
		'Discover how Keners boosted agricultural efficiency using ThingsBoard PE\u2014achieving scalable IoT, custom dashboards, and real-time automation with ease.',
	pageSlug: 'keners',
	breadcrumb: 'Keners — Smart Agriculture',
	categories: ['Smart agriculture'],

	hero: {
		category: 'SMART AGRICULTURE',
		heading: 'From Soil to Sensor: How Keners Revolutionized Farming with ThingsBoard',
		paragraphs: [
			'Keners s.r.o. is a company that develops innovative solutions aimed at improving agriculture and protecting the environment. They focus on integrating technology to optimise farming processes and environmental monitoring, providing modern, sustainable tools for their clients in these industries.',
		],
		logo: 'https://img.thingsboard.io/case-studies/keners.svg',
		logoAlt: 'Keners logo',
		logoWidth: 500,
		logoHeight: 126,
		backgroundImage: 'https://img.thingsboard.io/case-studies/keners.webp',
	},

	quote: {
		text: '\u201CWe started using the Thingsboard (TB) in 2017, and later switched to the professional edition (PE). We are very satisfied with the platform as it provides us with high flexibility and stability. We highly appreciate the visual editor for Rule engine new Multitenancy approach. The platform provides for us a unique possibility to create our own data connectors, which allow us to aggregate data from multiple sources and present them together in our custom dashboards.\u201D',
		author: 'Miroslav Holubec, Director',
	},

	problem: {
		challenges: [
			'Needed a stable and flexible IoT platform to scale their environmental and agricultural solutions.',
			'Required a visual and efficient way to manage data flows and logic.',
			'Faced limitations in integrating multiple data sources and presenting them through dashboards.',
		],
		results: [
			'Achieved high system reliability and flexibility after switching to ThingsBoard PE.',
			'Simplified data flow management using the visual Rule Engine editor.',
			'Built custom connectors and dashboards to aggregate and visualise diverse data sources.',
		],
	},

	power: {
		companyName: 'Keners s.r.o.',
		blocks: [
			{
				title: 'Scaling AgriTech with stability and support',
				text: 'Keners s.r.o. began using ThingsBoard in 2017 and later transitioned to the Professional Edition to meet their growing needs. The platform offered the flexibility and stability they required to develop solutions for agriculture and environmental monitoring. With the visual Rule Engine editor, their team was able to configure data processing flows efficiently. The multitenancy capabilities allowed them to manage different clients and use cases independently. ThingsBoard also enabled them to create custom data connectors, which made it possible to integrate multiple data sources and display them through intuitive dashboards. Throughout the process, Keners greatly appreciated the responsiveness and support of the ThingsBoard team, which they described as excellent.',
				image: 'https://img.thingsboard.io/case-studies/agriculture_green.webp',
				imageAlt: 'Scaling AgriTech with stability and support',
			},
		],
	},

	fullWidthImage: {
		src: 'https://img.thingsboard.io/case-studies/field.webp',
		alt: 'Irrigated Field',
		width: 1920,
		height: 946,
	},

	help: {
		industryName: 'agriculture improve operations with IoT',
		blocks: [
			{
				title: 'Digital transformation for smarter farming',
				text: 'ThingsBoard empowers agricultural businesses to transition from manual processes to data-driven, automated operations. The platform offers a comprehensive suite of tools that enable real-time monitoring, predictive analytics, and smart automation across farms, greenhouses, storage facilities, and field equipment. One of the most powerful features of ThingsBoard is its interactive dashboards, which allow users to visualise live and historical data from soil sensors, weather stations, machinery, and other connected devices. These dashboards can be customised using an extensive widget library and built with dynamic layouts to create intuitive, responsive interfaces for different user roles and devices.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
				],
			},
			{
				title: 'Scalable design with templates',
				text: 'To support scalability and consistency, ThingsBoard includes templatization features that allow agricultural teams to easily duplicate dashboard configurations and device logic across multiple locations or projects, accelerating deployment across regions or clients.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/value-card.webp', alt: 'Thingsboard value card widget', title: 'Thingsboard value card widget' },
					{ src: 'https://img.thingsboard.io/case-studies/entities-table-3.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
				],
			},
			{
				title: 'Automating agriculture with Rule Engine 2.0',
				text: 'The Rule Engine 2.0 plays a central role in enabling smart automation. It allows users to create low-code workflows that react to incoming data in real time. For example, irrigation systems can automatically activate based on soil moisture thresholds, or alerts can be triggered when storage temperatures exceed safe ranges. These workflows use a visual editor, making them accessible even to non-developers.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
					{ src: 'https://img.thingsboard.io/case-studies/power_button.webp', alt: 'Thingsboard power button widget', title: 'Thingsboard power button widget' },
				],
			},
			{
				title: 'Unified ecosystem through seamless Integration',
				text: 'ThingsBoard also supports a wide variety of integrations, enabling seamless connection with third-party systems and services via MQTT, HTTP, OPC-UA, Modbus, and more. This allows agricultural operations to consolidate data from diverse equipment vendors and external weather services into one unified platform.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/status-widget-1.webp', alt: 'Thingsboard status widget', title: 'Thingsboard status widget' },
					{ src: 'https://img.thingsboard.io/case-studies/outdoor-environment.webp', alt: 'Thingsboard outdoor evironment widgets', title: 'Thingsboard outdoor evironment widgets' },
				],
			},
			{
				title: 'Edge computing for remote reliability',
				text: 'For deployments in remote or low-connectivity areas, ThingsBoard Edge provides local processing and storage capabilities. With centralised edge device management, users can deploy rule chains, dashboards, and updates to field sites, even when operating in disconnected or intermittently connected environments.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table-2.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp', alt: 'Thingsboard digital gauges widgets', title: 'Thingsboard digital gauges widgets' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/keners.svg',
		companyLogoAlt: 'Keners logo',
		companyLogoWidth: 500,
		companyLogoHeight: 126,
	},
};
