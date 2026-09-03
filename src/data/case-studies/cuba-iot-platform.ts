import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Backup power IoT in Kazakhstan: how CUBA IoT Platform monitors diesel generators with ThingsBoard',
	pageTitle: 'How CUBA IoT Platform Monitors Diesel Generators',
	description:
		'CUBA IoT Platform connects diesel generator controllers to ThingsBoard via CUBA RePort gateways: fleet dashboards, alarms, fuel and readiness monitoring.',
	pageSlug: 'cuba-iot-platform',
	breadcrumb: 'CUBA IoT Platform — Facility Management',
	categories: ['Facility management'],

	hero: {
		category: 'FACILITY MANAGEMENT',
		heading: 'Backup power IoT in Kazakhstan: how CUBA IoT Platform monitors diesel generators with ThingsBoard',
		paragraphs: [
			'CUBA IoT Platform is a Kazakhstan-based IoT company and local ThingsBoard integrator. The company delivers online monitoring, real-time device control, data visualization, analytics, automation scenarios, and turnkey integration for distributed infrastructure. CUBA combines platform implementation, local engineering support, and proprietary hardware to help customers monitor equipment, reduce operational risk, and respond to events faster.',
			'For backup power operators, diesel generator units are critical but often geographically distributed assets. A generator may remain idle for long periods, but it must start immediately when the main power supply fails. CUBA’s diesel generator monitoring solution connects generator controllers through CUBA RePort gateways and uses ThingsBoard dashboards, alarms, telemetry history, and rule chains to give operators continuous visibility into generator readiness.',
		],
		logo: '/images/case-studies/cuba-iot-platform-logo.png',
		logoAlt: 'CUBA IoT Platform logo',
		backgroundImage: '/images/case-studies/cuba-iot-platform.webp',
	},

	statistics: [
		{ value: 100, suffix: '+', label: 'Monitored generator nodes in production experience' },
		{ value: 74, suffix: '+', label: 'Telemetry and alarm parameters per generator profile' },
		{ value: 4, suffix: '+', label: 'Supported generator controller/OEM families' },
	],

	quote: {
		text: 'With ThingsBoard and CUBA RePort gateways, diesel generators are no longer rarely inspected backup assets. Operators can see low fuel, discharged batteries, abnormal temperatures, fault states, missed test runs, and maintenance needs before they become outages',
		author: 'Dmitry Shkunov',
		role: 'CTO in Skif Trade LLP (SMALL, SPAR supermarkets)',
	},

	problem: {
		description:
			'Organizations relying on diesel generators needed reliable visibility into generator readiness, actual runtime, alarms, fuel level, and maintenance status. Manual inspection could miss critical issues such as discharged batteries, low fuel, incorrect operating mode, heater failure, cooling problems, or unreported controller alarms. CUBA addressed these challenges by connecting generator controllers to ThingsBoard and converting raw telemetry into dashboards, alarms, historical trends, and operational notifications.',
		challenges: [
			'Limited visibility into geographically distributed diesel generators and their actual readiness',
			'Manual checks did not reliably detect low fuel, battery voltage issues, incorrect operating modes, or controller fault states',
			'Service teams needed maintenance planning based on engine hours, start counts, and real operating history instead of fixed assumptions',
			'Operators needed immediate notifications when a generator failed, fuel changed unexpectedly, or a scheduled test run was missed',
		],
		results: [
			'Continuous monitoring of fuel level, battery voltage, oil pressure, coolant temperature, generator/mains electrical parameters, runtime, start count, operating mode, and alarms',
			'Centralized fleet table with sorting by site, generator type, operating status, fuel level, alarm count, coolant temperature, and control mode',
			'Rule-based alarm activation and instant notifications through Telegram, SMS, and e-mail',
			'Historical trends for outage investigation, fuel refill tracking, generator start/stop analysis, maintenance planning, and operational reporting',
		],
	},

	power: {
		companyName: 'CUBA IoT Platform',
		blocks: [
			{
				title: 'Gateway-based data acquisition',
				text: 'CUBA RePort polls diesel generator controllers over Modbus RTU or Modbus TCP and transfers telemetry to the platform through MQTT/HTTP. The gateway supports Ethernet, GSM LTE, Wi-Fi, RS-485, UART, NTP time synchronization, built-in web configuration, DIN-rail mounting, and backup autonomy of at least 20 minutes. This makes the solution suitable for distributed sites where wired connectivity may be unavailable or unreliable.',
				image: '/images/case-studies/cuba-iot-platform-1.webp',
				imageAlt: 'CUBA RePort gateway that connects diesel generator controllers to ThingsBoard',
			},
			{
				title: 'Unified asset model and dashboards',
				text: 'ThingsBoard is configured around generator assets, sites, telemetry streams, alarms, and operator dashboards. Dispatchers can start from a fleet-level table, sort assets by status or alarm count, and drill down to a detailed generator page. The detailed panel consolidates engine state, generator electrical parameters, mains parameters, breaker states, runtime, and control mode.',
				image: '/images/case-studies/cuba-iot-platform-2.webp',
				imageAlt: 'Generator telemetry charts in a ThingsBoard dashboard',
			},
			{
				title: 'Rule Engine alarms and operational notifications',
				text: 'Rule chains process controller alarms, fuel level, battery voltage, coolant temperature, oil pressure, operating mode, and generator/mains state. Notifications are routed to responsible users through Telegram, SMS, and e-mail. Each event can include the site, generator, source gateway, parameter, value, and timestamp, reducing the need for manual dashboard checks.',
				image: '/images/case-studies/cuba-iot-platform-3.webp',
				imageAlt: 'CUBA RePort generator monitoring dashboard with engine, generator, and mains panels',
			},
			{
				title: 'Historical analytics and service workflows',
				text: 'Time-series widgets show current and historical data for any selected period. Operators can analyze mains outage, generator start, fuel refill, engine stop, voltage, current, power, oil pressure, coolant temperature, and battery behavior. This supports readiness proof, outage investigation, fuel theft detection, and maintenance planning by actual runtime.',
				image: '/images/case-studies/cuba-iot-platform-4.webp',
				imageAlt: 'Historical charts of fuel level, coolant temperature, oil pressure, and power',
			},
			{
				title: 'ThingsBoard & ThingsBoard Edge Implementation',
				text: 'CUBA deployed ThingsBoard as the central monitoring layer for diesel generator assets. CUBA RePort gateways poll generator controllers over industrial protocols and publish structured telemetry to the platform. ThingsBoard stores telemetry, manages assets and dashboards, processes alarm rules, and sends notifications to responsible users.',
				image: '/images/case-studies/cuba-iot-platform-5.webp',
				imageAlt: 'Mains and generator current and power charts in ThingsBoard',
			},
		],
	},

	help: {
		industryName: 'Backup Power Operations Improve Reliability with IoT',
		blocks: [
			{
				title: 'Early detection of generator issues',
				text: 'ThingsBoard helps detect problems before they lead to generator failure. Operators receive alerts when battery voltage drops, fuel level becomes too low, coolant temperature rises, oil pressure changes, or the controller reports an alarm.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/sensors-widget.webp',
						alt: 'ThingsBoard sensors widget',
						title: 'ThingsBoard sensors widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/entities-table.webp',
						alt: 'ThingsBoard entities table widget',
						title: 'ThingsBoard entities table widget',
					},
				],
			},
			{
				title: 'Reliable start readiness monitoring',
				text: 'The platform continuously shows whether each generator is ready to start during a power outage. This helps identify common hidden risks such as discharged batteries, failed preheating, fuel shortage, manual mode, or active controller faults.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/tables.webp',
						alt: 'ThingsBoard tables widget',
						title: 'ThingsBoard tables widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/bar-chart.webp',
						alt: 'ThingsBoard bar chart widget',
						title: 'ThingsBoard bar chart widget',
					},
				],
			},
			{
				title: 'Event-based maintenance control',
				text: 'Runtime hours, number of starts, alarms, and operating history are collected automatically. Service teams can plan maintenance based on real equipment usage and react faster when abnormal operation is detected.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/line-chart.webp',
						alt: 'ThingsBoard line chart widget',
						title: 'ThingsBoard line chart widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/alarms-table.webp',
						alt: 'ThingsBoard alarms table widget',
						title: 'ThingsBoard alarms table widget',
					},
				],
			},
			{
				title: 'Fuel level and usage visibility',
				text: 'Fuel data is available remotely for every monitored generator. This helps detect sudden drops, refueling events, abnormal consumption, and possible fuel theft.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/pie-chart.webp',
						alt: 'ThingsBoard pie chart widget',
						title: 'ThingsBoard pie chart widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/battery-level.webp',
						alt: 'ThingsBoard battery level widget',
						title: 'ThingsBoard battery level widget',
					},
				],
			},
			{
				title: 'Instant notifications for responsible teams',
				text: 'ThingsBoard sends alerts through configured notification channels when critical events occur. This reduces response time and allows service teams to act before the backup power system becomes unavailable.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/alarms-table-2.webp',
						alt: 'ThingsBoard alarms table widget',
						title: 'ThingsBoard alarms table widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/notification-widget.webp',
						alt: 'ThingsBoard notification widget',
						title: 'ThingsBoard notification widget',
					},
				],
			},
		],
	},

	contact: {
		companyLogo: '/images/case-studies/cuba-iot-platform-logo.png',
		companyLogoAlt: 'CUBA IoT Platform logo',
		companyLogoWidth: 240,
		companyLogoHeight: 91,
		companyLogoUnfiltered: true,
	},
};
