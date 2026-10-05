import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title:
		'Sense and Control on ThingsBoard PE: How Seymour Holds Greenhouses at 70% RH and Cuts Irrigation Water by 40%',
	pageTitle: 'How Seymour Runs Greenhouses and Farms on ThingsBoard PE',
	description:
		'Seymour Ag Instruments runs greenhouses, fields and indoor farms on ThingsBoard PE: 1,000+ devices, 170+ farms, a 70 ±2% humidity target, 20–40% less water.',
	pageSlug: 'seymour-ag-instruments',
	breadcrumb: 'Seymour Ag Instruments — Smart Agriculture',
	categories: ['Smart agriculture'],

	hero: {
		category: 'SMART AGRICULTURE',
		heading:
			'Sense and Control on ThingsBoard PE: How Seymour Holds Greenhouses at 70% RH and Cuts Irrigation Water by 40%',
		paragraphs: [
			'Seymour Ag Instruments builds sensing and control for agriculture. Founded in 2021, the four-person company makes a full hardware line: sensors for every environmental parameter a grower needs, plus controllers for climate, irrigation and fertilisation. Its farm-management software is built entirely on ThingsBoard Professional Edition. One application follows a crop from transplant to harvest, across greenhouses, open fields and indoor plant factories, in the grower’s own language.',
		],
		logo: '/images/case-studies/seymour-ag-instruments-logo.png',
		logoAlt: 'Seymour Ag Instruments logo',
		backgroundImage: '/images/case-studies/seymour-ag-instruments.webp',
	},

	statistics: [
		{ value: 1, suffix: 'K+', label: 'devices deployed' },
		{ value: 170, suffix: '+', label: 'farms managed' },
		{ value: 6, suffix: 'M', label: 'data points a day' },
	],

	quote: {
		text: 'We are four people selling hardware and a farm-management product, and ThingsBoard PE is what makes that possible. The entity hierarchy, device profiles, calculated fields, alarms and rule engine are a backend we never had to build, so our engineering goes into the agronomy, as widgets on top of the platform. And when we hit something we cannot solve ourselves, Daniela Dodonova and the ThingsBoard team answer every time.',
		author: 'Tal Saadon',
		role: 'Co-Founder & CEO, Seymour Ag Instruments',
	},

	problem: {
		challenges: [
			'Greenhouses, open fields and indoor plant factories use different devices and control loops, yet growers expect one interface and one data model.',
			'The layer growers work with — crop cycles, cultivar recipes, phase thresholds, records, reports — does not exist in a generic IoT dashboard.',
			'Every customer needs strict data separation, a multi-farm hierarchy and their own language, including right-to-left layouts.',
			'A four-person team cannot build and run a backend, authentication and time-series infrastructure and still ship hardware.',
		],
		results: [
			'More than 1,000 devices on 170+ farms and about 6 million data points a day, on one PE tenant hosted and managed by the ThingsBoard team.',
			'Fog control on a 70 ±2% target: mean 70.3% across the 65.7 hours of fogging in a seven-day trial, 90% of raw samples within ±3%, canopy dry whenever the fog ran.',
			'20–40% less irrigation water across deployments; 40% validated on a national forestry organisation’s managed-forest sites.',
			'Seven production screens and a GACP-grade audit trail, delivered as 55 custom widgets in the ThingsBoard widget library — no separate backend.',
		],
	},

	power: {
		companyName: 'Seymour Ag Instruments',
		blocks: [
			{
				title: 'One data model for every farm',
				text: 'Seymour has run on ThingsBoard PE since 2022. Each customer’s operation is modelled as assets — Farm, Plot, Unit — with devices at the unit level, and each customer sees only its own hierarchy. Device profiles cover the whole hardware line, from climate sensors and soil probes to runoff stations and controllers. Everything the grower touches is a Seymour widget: seven screens in the ThingsBoard widget library, in four languages, including a right-to-left layout.',
				image: '/images/case-studies/seymour-ag-instruments-1.webp',
				imageAlt: 'Seymour overview dashboard on ThingsBoard comparing greenhouse and vineyard plots',
			},
			{
				title: 'Holding 70% humidity on a 30-second cycle',
				text: 'In a Mediterranean greenhouse, a Seymour controller drives a high-pressure fogging line to a 70% humidity setpoint. The loop runs on the controller as a continuous duty cycle on a 30-second period. A leaf-wetness sensor in the canopy cuts the fog back whatever the humidity says. ThingsBoard is the SCADA layer: setpoints live as attributes; telemetry and device-side alarms in the dashboards. Over a seven-day trial the house held a mean of 70.3% across the 65.7 hours the fog line ran, with the leaves dry throughout those hours.',
				image: '/images/case-studies/seymour-ag-instruments-2.webp',
				imageAlt: 'Seven-day chart of relative humidity, fog duty cycle and leaf wetness against a 70 ±2% target band',
			},
			{
				title: 'Irrigation on demand, 20–40% less water',
				text: 'Soil-moisture probes report volumetric water content to ThingsBoard. When a reading crosses the crop’s threshold, the Seymour irrigation controller runs an irrigation event. The platform keeps the thresholds, the telemetry and the record for every plot. On a national forestry organisation’s managed-forest sites this cut water use by 40% against the conventional schedule, and other deployments see similar savings.',
				image: '/images/case-studies/seymour-ag-instruments-3.webp',
				imageAlt: 'Soil-moisture graph comparison across greenhouse zones in the Seymour application',
			},
			{
				title: 'Plant-factory control with a GACP audit trail',
				text: 'For a licensed medical-cannabis producer with about 1,000 m² indoors, a Seymour controller drives lighting, dehumidification, CO₂ and air conditioning per growth phase. The crop-cycle manager creates each cycle as an asset with a frozen snapshot of the cultivar recipe. At every phase change it pushes the thresholds to the devices’ alarm rules and logs the dispatch. With the calendar, fertigation records, alarm history, PDF reports and ThingsBoard’s audit logs, that is the per-cycle evidence a GACP inspection asks for. Ninety-two cycles so far.',
				image: '/images/case-studies/seymour-ag-instruments-4.webp',
				imageAlt: 'Crop-cycle analysis screen with an air-temperature heatmap and phase thresholds',
			},
			{
				title: 'An AI coding assistant as a native ThingsBoard developer',
				text: 'Seymour’s screens are written with an AI coding assistant, Claude Code, on ThingsBoard’s documented widget API. The assistant behaves like a native ThingsBoard developer, and a screen that once took weeks ships in days. It stays safe: a widget runs in the user’s browser under that user’s permissions, and there is no custom backend to secure. Every widget passes through GitHub and a development bundle first. ThingsBoard CLI, driven by Claude Code, now makes this a supported way of working.',
				image: '/images/case-studies/seymour-ag-instruments-5.webp',
				imageAlt: 'AI Assistant and ThingsBoard CLI icons',
			},
		],
	},

	help: {
		industryName: 'agriculture improve operations with IoT',
		blocks: [
			{
				title: 'Digital transformation for smarter farming',
				text: 'ThingsBoard empowers agricultural businesses to transition from manual processes to data-driven, automated operations. The platform offers a comprehensive suite of tools that enable real-time monitoring, predictive analytics, and smart automation across farms, greenhouses, storage facilities, and field equipment. One of the most powerful features of ThingsBoard is its interactive dashboards, which allow users to visualise live and historical data from soil sensors, weather stations, machinery, and other connected devices. These dashboards can be customised using an extensive widget library and built with dynamic layouts to create intuitive, responsive interfaces for different user roles and devices.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/line-chart.webp',
						alt: 'Thingsboard line chart widget',
						title: 'Thingsboard line chart widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp',
						alt: 'Thingsboard maps widgets widget',
						title: 'Thingsboard maps widgets widget',
					},
				],
			},
			{
				title: 'Scalable design with templates',
				text: 'To support scalability and consistency, ThingsBoard includes templatisation features that allow agricultural teams to easily duplicate dashboard configurations and device logic across multiple locations or projects, accelerating deployment across regions or clients.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/value-card.webp',
						alt: 'Thingsboard value card widget',
						title: 'Thingsboard value card widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/entities-table-3.webp',
						alt: 'Thingsboard entities table widget',
						title: 'Thingsboard entities table widget',
					},
				],
			},
			{
				title: 'Automating agriculture with Rule Engine 2.0',
				text: 'The Rule Engine 2.0 plays a central role in enabling smart automation. It allows users to create low-code workflows that react to incoming data in real time. For example, irrigation systems can automatically activate based on soil moisture thresholds, or alerts can be triggered when storage temperatures exceed safe ranges. These workflows use a visual editor, making them accessible even to non-developers.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/notification-widget.webp',
						alt: 'Thingsboard notification widget',
						title: 'Thingsboard notification widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/power_button.webp',
						alt: 'Thingsboard power button widget',
						title: 'Thingsboard power button widget',
					},
				],
			},
			{
				title: 'Unified ecosystem through seamless integration',
				text: 'ThingsBoard also supports a wide variety of integrations, enabling seamless connection with third-party systems and services via MQTT, HTTP, OPC-UA, Modbus, and more. This allows agricultural operations to consolidate data from diverse equipment vendors and external weather services into one unified platform.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/status-widget-1.webp',
						alt: 'Thingsboard status widget',
						title: 'Thingsboard status widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/outdoor-environment.webp',
						alt: 'Thingsboard outdoor environment widgets',
						title: 'Thingsboard outdoor environment widgets',
					},
				],
			},
			{
				title: 'Edge computing for remote reliability',
				text: 'For deployments in remote or low-connectivity areas, ThingsBoard Edge provides local processing and storage capabilities. With centralised edge device management, users can deploy rule chains, dashboards, and updates to field sites, even when operating in disconnected or intermittently connected environments.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/alarms-table-2.webp',
						alt: 'Thingsboard alarms table widget',
						title: 'Thingsboard alarms table widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp',
						alt: 'Thingsboard digital gauges widgets',
						title: 'Thingsboard digital gauges widgets',
					},
				],
			},
		],
	},

	contact: {
		companyLogo: '/images/case-studies/seymour-ag-instruments-logo.png',
		companyLogoAlt: 'Seymour Ag Instruments logo',
		companyLogoWidth: 300,
		companyLogoHeight: 70,
	},
};
