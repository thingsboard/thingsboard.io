import type { UseCaseData } from './types';

export const tankLevelMonitoringData: UseCaseData = {
	title: 'Tank level monitoring solution',
	pageTitle: 'Tank Level Monitoring with ThingsBoard for Any Industry',
	description:
		'A comprehensive IoT solution for tank level monitoring. Real-time insights for fuel, water, and chemical storage with dashboards, alarms, and scalable device management — powered by ThingsBoard',
	pageSlug: 'tank-level-monitoring',
	about: {
		shortText:
			'Modern enterprises that manage liquid storage — from fuel to water — face the critical need for continuous tank level monitoring and infrastructure status control. Poor monitoring can lead to leaks, equipment downtime, and higher operational costs. In this context, IoT-powered solutions become essential for digital transformation. The ThingsBoard IoT platform addresses these challenges with ease.',
		longText: [
			'ThingsBoard provides a comprehensive approach to tank level monitoring, combining real-time telemetry with advanced automation. The platform collects data from level sensors, pressure gauges, and temperature probes installed on tanks of all sizes. By leveraging the Rule Engine, operators can set up threshold-based alarms, automated notifications, and escalation workflows that ensure no anomaly goes unnoticed — whether it is an unexpected level drop indicating a leak or a tank approaching overflow capacity.',
			'Built for scalability, ThingsBoard supports deployment from a handful of tanks at a single facility to thousands of storage units distributed across multiple sites. Multi-tenant architecture enables service providers to manage separate client environments from a single platform instance. With support for MQTT, CoAP, HTTP, and Modbus protocols, the solution integrates seamlessly with both modern IoT sensors and legacy industrial equipment, making it the ideal foundation for any tank monitoring infrastructure.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/e1ff5690-5e0c-11ee-aeee-d16039673934?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_FuelLevelMonitoring_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-1.webp',
				alt: 'Tank monitoring dashboard in light mode showing fuel level, temperature, battery, and alerts on the ThingsBoard platform',
				title: 'Tank Monitoring Dashboard',
				width: 1819,
				height: 977,
			},
			{
				src: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-3.webp',
				alt: 'Dialog for setting alarm thresholds for tank monitoring, including fuel level, temperature, and battery.',
				title: 'Alarm Threshold Settings for Tanks',
				width: 1819,
				height: 977,
			},
			{
				src: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-5.webp',
				alt: 'Tank 1289 status dashboard showing fuel level, temperature, battery, and consumption chart.',
				title: 'Tank 1289 Monitoring Overview',
				width: 1819,
				height: 977,
			},
			{
				src: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-6.webp',
				alt: 'Interface to configure tank shape, size, and measurement system for accurate monitoring.',
				title: 'Configure Tank Shape and Dimensions',
				width: 1819,
				height: 977,
			},
		],
	},
	solutionStructure: {
		title: 'Solution structure of tank level monitoring use case',
		shortText:
			'The ThingsBoard-powered <a href="/docs/pe/recipes/solution-templates/fuel-level-monitoring/">tank level monitoring solution</a> integrates IoT sensors installed on tanks to continuously measure liquid levels, temperature, and pressure. Sensor data is transmitted to the platform via MQTT, CoAP, or HTTP protocols, either directly or through IoT gateways for legacy equipment.',
		longText: [
			'Once the telemetry reaches ThingsBoard, it is processed in real time by the Rule Engine, which evaluates conditions and triggers alarms for events such as low levels, overfill risks, or sudden drops indicating potential leaks. The processed data is stored in a time-series database and visualized on interactive dashboards, providing operators with a clear picture of tank status across all monitored locations.',
			'The architecture supports hierarchical asset management, allowing operators to organize tanks by site, region, or client. Combined with role-based access control, this ensures that each stakeholder sees only the data relevant to their scope — from field technicians monitoring individual tanks to managers overseeing enterprise-wide operations.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of tank level monitoring solution',
		panels: [
			{
				title: 'Fleet overview dashboard',
				description:
					'The main dashboard displays all monitored tanks on an interactive map with real-time status indicators. Each tank marker shows current fill level, last update time, and alarm status at a glance. Side panels provide summary statistics including total tank count, active alarms, and average fill levels across the entire fleet — giving operators a single-pane view of their entire storage infrastructure.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-1.webp',
				imageAlt: 'Tank level monitoring fleet overview with interactive map and status indicators',
				imageTitle:
					'Fleet overview dashboard showing all monitored tanks on an interactive map with real-time status',
			},
			{
				title: 'Individual tank details',
				description:
					'The tank detail view presents comprehensive information for a selected tank, including real-time fill level, temperature readings, and historical trends. Gauge widgets provide instant visual feedback on current levels relative to capacity, while time-series charts display level changes over configurable periods — helping operators identify consumption patterns and forecast refill schedules.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-2.webp',
				imageAlt: 'Individual tank detail view with gauges and historical trend charts',
				imageTitle:
					'Individual tank details with real-time gauges, temperature, and historical level trends',
			},
			{
				title: 'Alarm management panel',
				description:
					'The alarm management panel provides a centralized view of all active and historical alarms across the monitored fleet. Operators can filter alarms by severity, type, or location, acknowledge critical events, and review alarm history to identify recurring issues. Configurable alarm rules support multi-level escalation to ensure timely response to both minor anomalies and critical incidents.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-3.webp',
				imageAlt: 'Alarm management panel with severity filters and escalation history',
				imageTitle:
					'Centralized alarm management panel with filtering, acknowledgment, and escalation workflows',
			},
			{
				title: 'Consumption analytics',
				description:
					'The consumption analytics view presents aggregated data on liquid usage patterns over daily, weekly, and monthly intervals. Bar charts and trend lines help operators compare consumption across tanks, detect unusual spikes, and plan procurement schedules. Exportable reports support compliance documentation and operational auditing requirements.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-4.webp',
				imageAlt: 'Consumption analytics dashboard with usage patterns and trend comparisons',
				imageTitle: 'Consumption analytics with aggregated usage data and exportable reporting',
			},
			{
				title: 'Device management interface',
				description:
					'The device management interface enables operators to register, configure, and maintain tank sensors from a unified panel. Bulk provisioning via CSV import supports rapid deployment across multiple sites, while individual device profiles allow fine-tuning of reporting intervals, alarm thresholds, and communication parameters for each sensor.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-5.webp',
				imageAlt: 'Device management interface for tank sensor registration and configuration',
				imageTitle:
					'Device management panel for bulk provisioning and individual sensor configuration',
			},
			{
				title: 'Notification and reporting center',
				description:
					'The notification center aggregates all system alerts, scheduled reports, and escalation events in a single timeline. Operators can configure notification channels — including email, SMS, and messaging integrations — for different alarm types and severity levels. Automated daily and weekly reports summarize fleet health, consumption trends, and maintenance needs.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-6.webp',
				imageAlt: 'Notification and reporting center with multi-channel alert configuration',
				imageTitle: 'Notification center with configurable alert channels and automated reporting',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/e1ff5690-5e0c-11ee-aeee-d16039673934?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_FuelLevelMonitoring_ViewLiveDemo',
		contactUsId: 'UseCases_FuelLevelMonitoring_ContactUs',
	},
	applications: {
		title: 'Applications of tank level monitoring solution',
		applications: [
			{
				title: 'Oil & gas',
				description:
					'Real-time fuel tank monitoring with automated leak detection across refineries, depots, and distribution networks.',
				desktopImage: '/src/assets/images/usecases/tank-level-monitoring/gas-1.svg',
				mobileImage: '/src/assets/images/usecases/tank-level-monitoring/gas-2.svg',
				imageAlt: 'Oil and gas',
				imageTitle: 'Oil & gas',
			},
			{
				title: 'Logistics & transportation',
				description:
					'Tracks fuel and fluid levels across fleets and fuel stations, enabling consumption visibility and cost control.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/logistics.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/logistics-2.svg',
				imageAlt: 'Logistics and transportation',
				imageTitle: 'Logistics & transportation',
			},
			{
				title: 'Agriculture',
				description:
					'Monitors water tanks, irrigation reservoirs, and chemical storage on farms. Automated alerts for low water levels and fertilizer depletion ensure uninterrupted crop care and efficient resource allocation across large agricultural operations.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/agriculture-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/agriculture-2.svg',
				imageAlt: 'Agriculture',
				imageTitle: 'Agriculture',
			},
			{
				title: 'Manufacturing & processing',
				description:
					'Continuous monitoring of raw material and coolant tanks with threshold alarms to prevent production delays.',
				desktopImage: '/src/assets/images/usecases/tank-level-monitoring/manufacturing-1.svg',
				mobileImage: '/src/assets/images/usecases/tank-level-monitoring/manufacturing-2.svg',
				imageAlt: 'Manufacturing and processing',
				imageTitle: 'Manufacturing & processing',
			},
			{
				title: 'Municipal services',
				description:
					'Monitors municipal water towers, wastewater holding tanks, and treatment facility reservoirs. Centralized dashboards help utility operators maintain service continuity and respond proactively to demand fluctuations and infrastructure issues.',
				desktopImage: '/src/assets/images/usecases/smart-metering/utilities-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/utilities-2.svg',
				imageAlt: 'Municipal services',
				imageTitle: 'Municipal services',
			},
		],
	},
	summary: {
		title: 'Summary of tank level monitoring solution',
		text: 'ThingsBoard delivers a scalable, protocol-agnostic tank level monitoring solution that combines real-time telemetry with intelligent automation. From fuel depots and water treatment plants to agricultural reservoirs and industrial chemical storage, the platform provides operators with actionable insights, proactive alarming, and comprehensive fleet visibility — all from a single, customizable dashboard. With built-in multi-tenancy, flexible device integration, and powerful analytics, ThingsBoard empowers organizations to eliminate manual checks, prevent costly incidents, and optimize resource management at any scale.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
