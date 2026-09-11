import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Tank level monitoring solution',
	pageTitle: 'Tank Level Monitoring with ThingsBoard for Any Industry',
	description:
		'IoT solution for tank level monitoring — real-time insights for fuel, water, and chemical storage with dashboards and alarms, powered by ThingsBoard.',
	pageSlug: 'tank-level-monitoring',
	about: {
		shortText:
			'Modern enterprises that manage liquid storage — from fuel to water — face the critical need for continuous tank level monitoring and infrastructure status control. Poor monitoring can lead to leaks, equipment downtime, and higher operational costs. In this context, IoT-powered solutions become essential for digital transformation. The ThingsBoard IoT platform addresses these challenges with ease.',
		longText: [
			'The ThingsBoard platform offers a comprehensive approach to tank level monitoring, enabling real-time tracking of key metrics such as volume, temperature, sensor battery level, and connectivity status. Thanks to its flexibility, ThingsBoard can be easily tailored to meet industry-specific needs, whether for small-scale or enterprise-wide deployments.',
			'ThingsBoard stands out due to its scalability, support for multiple protocols (MQTT, HTTP, CoAP, and others), customizable dashboards, and robust device management tools. It empowers users to deploy both local and cloud-based solutions that effectively monitor dispersed tank networks at any scale.',
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
		title: 'Solution structure of tank level monitoring',
		shortText:
			'The <a href="/iot-hub/solution-templates/fuel-level-monitoring/">tank level monitoring</a> solution integrates IoT sensors — such as level, temperature, and battery — with the ThingsBoard platform. Data is transmitted via standard protocols: MQTT for real-time telemetry, HTTP for periodic updates, and CoAP for low-power environments. This ensures reliable, efficient communication across a wide range of devices and conditions.',
		longText: [
			'Once collected, the data is transmitted to ThingsBoard for processing, aggregation, and visualization. The platform offers historical data storage, advanced alarm rule configuration, and remote device management. Incoming data is presented through interactive dashboards that display all metrics in user-friendly formats: graphs, maps, tables, and status widgets.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Tank level monitoring solution architecture',
		schemeCaption:
			'Tank level monitoring solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Tank level monitoring dashboard structure',
		subtitle:
			'The dashboards in ThingsBoard are modular: each panel is a self-contained widget that retrieves data from a specific device or group. They support drill-down navigation, filtering, and grouping by fuel type or region. This makes the interface intuitive and easy to scale for large deployments.',
		panels: [
			{
				title: 'Interactive map and tank status overview state',
				description:
					'This state combines an interactive map with a real-time table of tank metrics, displaying fuel level, temperature, battery, and connectivity status for each unit. It also includes a centralized alarm panel showing active alarms like low fuel, overheating, or offline sensors. The unified view allows operators to monitor spatial distribution and critical tank data at a glance, ensuring fast, informed decision-making.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-1.webp',
				imageAlt: 'Tank level monitoring fleet overview with interactive map and status indicators',
				imageTitle: 'Interactive map and tank status overview state',
			},
			{
				title: 'Sensor add interface',
				description:
					'This form guides users through adding a new sensor by entering its serial number and assigning a label. It’s the first step in onboarding a tank into the system. Simple onboarding flows are critical for scaling the monitoring system with minimal manual work or technical barriers.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-2.webp',
				imageAlt: 'Individual tank detail view with gauges and historical trend charts',
				imageTitle: 'Sensor add interface',
			},
			{
				title: 'Alarm rules configuration',
				description:
					'This screen lets users configure threshold values for alarms based on remaining level, temperature, and battery status. Alarms are triggered when incoming data crosses defined boundaries. Such visual rule management helps organizations enforce control policies and reduce downtime through preventive alarms.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-3.webp',
				imageAlt: 'Alarm management panel with severity filters and escalation history',
				imageTitle: 'Alarm rules configuration',
			},
			{
				title: 'Edit sensor',
				description:
					'This state allows users to edit key sensor details, including the serial number, custom label, tank assignment, and related metadata. It provides a clean, form-based interface to ensure sensor information stays accurate and organized across the system. Maintaining consistent sensor data is essential for reliable monitoring, especially in large-scale deployments with many connected devices.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-4.webp',
				imageAlt: 'Consumption analytics dashboard with usage patterns and trend comparisons',
				imageTitle: 'Edit sensor',
			},
			{
				title: 'Tank details dashboard state',
				description:
					'This state provides a detailed view of an individual tank, displaying current fuel level with visual indicators, real-time telemetry, historical data logs, and refill or drain events. It also includes a list of recent alarms related to this tank, such as level drops or temperature spikes, with timestamps and statuses. Such granular visualization helps operators track tank behavior over time, identify abnormal patterns, and take preventive action before issues escalate.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-5.webp',
				imageAlt: 'Device management interface for tank sensor registration and configuration',
				imageTitle: 'Tank details dashboard state',
			},
			{
				title: 'Tank shape',
				description:
					'This state allows users to define the physical characteristics of a tank — including its shape (e.g., cylindrical, rectangular), dimensions, and total capacity — which are crucial for accurate volume calculation. Users can also configure how the sensor interprets level data based on the tank geometry and select the preferred measurement method (e.g., linear, step-based). Precise calibration of sensor readings to the real tank shape significantly improves measurement accuracy and ensures correct volume representation on dashboards.',
				image: '/src/assets/images/usecases/tank-level-monitoring/tank-level-monitoring-6.webp',
				imageAlt: 'Notification and reporting center with multi-channel alert configuration',
				imageTitle: 'Tank shape',
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
					'Enables remote monitoring of fuel tanks with automated alarms and minimal maintenance requirements.',
				desktopImage: '/src/assets/images/usecases/tank-level-monitoring/gas-1.svg',
				mobileImage: '/src/assets/images/usecases/tank-level-monitoring/gas-2.svg',
				imageAlt: 'Oil and gas',
				imageTitle: 'Oil & gas',
			},
			{
				title: 'Logistics & transportation',
				description:
					'Tracks fuel levels in fleet tankers and depots, integrated with GPS and routing systems.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/logistics.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/logistics-2.svg',
				imageAlt: 'Logistics and transportation',
				imageTitle: 'Logistics & transportation',
			},
			{
				title: 'Agriculture',
				description:
					'Tracks water or fertilizer tank levels on farms, with location-based analysis and consumption forecasting.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/agriculture-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/agriculture-2.svg',
				imageAlt: 'Agriculture',
				imageTitle: 'Agriculture',
			},
			{
				title: 'Manufacturing & processing',
				description:
					'Monitors chemical storage tanks for compliance and safety in industrial environments.',
				desktopImage: '/src/assets/images/usecases/tank-level-monitoring/manufacturing-1.svg',
				mobileImage: '/src/assets/images/usecases/tank-level-monitoring/manufacturing-2.svg',
				imageAlt: 'Manufacturing and processing',
				imageTitle: 'Manufacturing & processing',
			},
			{
				title: 'Municipal services',
				description:
					'Manages city tanks for drinking water or chemicals with centralized monitoring and regulatory reporting.',
				desktopImage: '/src/assets/images/usecases/smart-metering/utilities-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/utilities-2.svg',
				imageAlt: 'Municipal services',
				imageTitle: 'Municipal services',
			},
		],
	},
	summary: {
		title: 'Summary of tank level monitoring',
		text: 'The ThingsBoard-based tank level monitoring solution automates fluid storage monitoring for any scale or complexity. With strong support for industrial protocols, real-time visualization, rule-based alarming, and device control, it is a perfect fit for B2B enterprises, public infrastructure, and industrial environments. Enhanced transparency and timely alarms lead to improved operational efficiency and reduced costs.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
