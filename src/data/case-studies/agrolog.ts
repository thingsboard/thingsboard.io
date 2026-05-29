import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Smart Farming Platform by Supertech Agroline and ThingsBoard',
	pageTitle: 'Smart Farming Platform by Supertech Agroline',
	description:
		'Supertech Agroline, a Romanian AgTech innovator, uses ThingsBoard to build a real-time agricultural IoT platform for post-harvest monitoring.',
	pageSlug: 'agrolog',
	breadcrumb: 'Supertech Agroline — Smart Agriculture',
	categories: ['Smart agriculture'],

	hero: {
		category: 'SMART AGRICULTURE',
		heading: 'Revolutionizing Agriculture: How Supertech Agroline Built a Scalable IoT Platform with ThingsBoard',
		paragraphs: [
			'Supertech Agroline is a Romanian technology company focused on revolutionising the agricultural sector through smart IoT solutions. They specialise in offering real-time monitoring systems and digital tools for agribusinesses to enhance operational efficiency and sustainability. By integrating advanced sensors and data analytics, Supertech Agroline empowers farmers and agricultural companies to make data-driven decisions that improve crop yield, reduce environmental impact, and optimise resource usage. Their platform supports a range of use cases, including greenhouse management, irrigation control, and climate monitoring.',
		],
		logo: 'https://img.thingsboard.io/case-studies/agrolog.svg',
		logoAlt: 'AgroLog Sensors GmbH logo',
		logoWidth: 320,
		logoHeight: 57,
		backgroundImage: 'https://img.thingsboard.io/case-studies/agrolog.webp',
	},

	statistics: [
		{ value: 30, suffix: '+', label: 'years experience' },
		{ value: 180000, suffix: '+', label: 'sensors installed' },
		{ value: 4, decimal: { value: 5, suffix: 'M' }, label: 'tons of grain monitored' },
	],

	quote: {
		text: '"ThingsBoard (TB) turned out to be a great match to build our Agricultural IoT platform. First and foremost because of the extremely skilled and service minded architects behind it. Together with the TB developers several new features were added to the platform for our needs, among these the Asset system and PostgreSQL support. These new features gave us the possibility to model our data structure using only TB as the backend, both on the multi-tenant cloud server and on-premise installations. The real time UI system proved useful both in development phase and for our final user interface. Using TB as our platform allo..."',
		author: 'Jeppe Walther, CTO',
	},

	problem: {
		description:
			'Supertech Agroline was looking to build a comprehensive Agricultural IoT platform tailored to their industry-specific needs. The challenges they faced included:',
		challenges: [
			'Need for a customizable IoT platform that could be adapted to their unique agricultural workflows and data models.',
			'Lack of backend flexibility - they needed a solution that could unify their data structure with both cloud and on-premise support.',
			'Real-time data visualisation - a crucial requirement for monitoring and managing post-harvest conditions efficiently.',
			'Scalability for future growth - a core goal was to implement a platform that could scale as the company expanded its digital offerings.',
		],
		results: [
			'Custom feature development: Collaboration with the ThingsBoard team led to the implementation of essential features such as the Asset system and PostgreSQL support.',
			'Unified backend: They successfully modelled their data structure using only ThingsBoard, both on a multi-tenant cloud server and for on-premise deployments.',
			"Effective real-time UI: The platform's real-time interface accelerated both development and final deployment phases.",
			'Future-ready scalability: ThingsBoard enabled them to create a generic, adaptable solution designed to meet their scaling demands for years to come.',
		],
	},

	power: {
		companyName: 'Supertech Agroline',
		blocks: [
			{
				title: 'Collaborative solution design with expert support',
				text: 'Supertech Agroline partnered with ThingsBoard to create an Agricultural IoT platform designed specifically for managing post-harvest equipment. From the beginning, they benefited from working with a team of highly skilled and service-minded architects at ThingsBoard who played a key role in shaping a solution that matched their technical and business needs.',
				image: 'https://img.thingsboard.io/case-studies/agrolog-1.webp',
				imageAlt: 'Collaborative solution design with expert support',
			},
			{
				title: 'Tailored features to meet complex requirements',
				text: "To support Supertech's requirements, the ThingsBoard team implemented new features such as PostgreSQL integration and an advanced Asset system. These enhancements made it possible to model the entire data structure using only ThingsBoard as the backend, supporting both multi-tenant cloud environments and on-premise installations.",
				image: 'https://img.thingsboard.io/case-studies/agrolog-2.webp',
				imageAlt: 'Tailored features to meet complex requirements',
			},
			{
				title: 'Real-time UI for development and user success',
				text: 'A significant benefit of the solution was the real-time user interface, which proved highly effective during both development and in the final product used by end users. It enabled faster testing, smoother workflows, and a better experience overall.',
				image: 'https://img.thingsboard.io/case-studies/agrolog-3.webp',
				imageAlt: 'Real-time UI for development and user success',
			},
			{
				title: 'Scalable platform for ongoing digital transformation',
				text: 'With ThingsBoard, Supertech Agroline quickly achieved a flexible, scalable platform that could meet their current demands and adapt to future growth. The platform now serves as a key component in their digital transformation strategy and will continue to support their scaling efforts in the years ahead.',
				image: 'https://img.thingsboard.io/case-studies/agrolog-4.webp',
				imageAlt: 'Scalable platform for ongoing digital transformation',
			},
		],
	},

	help: {
		industryName: 'agriculture improve operations with IoT',
		blocks: [
			{
				title: 'Digital transformation for smarter farming',
				text: "ThingsBoard empowers agricultural businesses to transition from manual processes to data-driven, automated operations. The platform offers a comprehensive suite of tools that enable real-time monitoring, predictive analytics, and smart automation across farms, greenhouses, storage facilities, and field equipment. One of the most powerful features of ThingsBoard is its interactive dashboards, which allow users to visualise live and historical data from soil sensors, weather stations, machinery, and other connected devices. These dashboards can be customised using an extensive widget library and built with dynamic layouts to create intuitive, responsive interfaces for different user roles and devices.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/value-card.webp', alt: 'Thingsboard value card widget', title: 'Thingsboard value card widget' },
					{ src: 'https://img.thingsboard.io/case-studies/entities-table-3.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
				],
			},
			{
				title: 'Scalable design with templates',
				text: 'To support scalability and consistency, ThingsBoard includes templatization features that allow agricultural teams to easily duplicate dashboard configurations and device logic across multiple locations or projects, accelerating deployment across regions or clients.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table-3.webp', alt: 'Thingsboard alarms widget', title: 'Thingsboard alarms widget' },
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
		companyLogo: 'https://img.thingsboard.io/case-studies/agrolog.svg',
		companyLogoAlt: 'AgroLog Sensors GmbH logo',
		companyLogoWidth: 320,
		companyLogoHeight: 57,
	},
};
