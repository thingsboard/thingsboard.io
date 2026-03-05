import type { UseCaseData } from './types';

export const smartIrrigationData: UseCaseData = {
	title: 'Smart irrigation solution',
	pageTitle: 'Smart Irrigation with ThingsBoard for Farms and Cities',
	description:
		"Discover how ThingsBoard's smart irrigation solution transforms water management through IoT.",
	pageSlug: 'smart-irrigation',
	about: {
		shortText:
			'The global challenges of water scarcity, climate variability, and rising agricultural demand call for smarter approaches to irrigation management. ThingsBoard provides a robust IoT platform for building intelligent irrigation systems that optimize water usage, reduce waste, and improve crop yields through real-time monitoring and automated control.',
		longText: [
			'Traditional irrigation methods often rely on fixed schedules or manual observation, leading to overwatering, underwatering, and inefficient resource use. IoT-enabled smart irrigation with ThingsBoard replaces guesswork with data-driven decision-making — soil moisture sensors, weather stations, and flow meters feed real-time data into the platform, which automatically adjusts irrigation schedules based on actual field conditions.',
			"ThingsBoard supports a wide range of agricultural sensors and communication protocols, from LoRaWAN devices in remote fields to cellular-connected controllers in urban parks. The platform's rule engine enables sophisticated automation — triggering irrigation zones based on soil moisture thresholds, weather forecasts, and time-of-day schedules while providing full visibility through interactive dashboards and mobile applications.",
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/a4640cc0-8fa9-11ef-baa8-4521077809fd?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SmartIrrigation_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-1.webp',
				alt: 'Satellite view of crop fields with real-time moisture levels and chart in ThingsBoard',
				title: 'Soil moisture monitoring for wheat and corn fields using ThingsBoard',
				width: 1302,
				height: 699,
			},
			{
				src: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-2.webp',
				alt: 'Field configuration form for setting crop type and moisture range in ThingsBoard',
				title: 'Add a new field and define crop type and soil moisture thresholds',
				width: 1302,
				height: 699,
			},
			{
				src: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-4.webp',
				alt: 'Dashboard showing irrigation status, alarms, field map, and moisture statistics in ThingsBoard',
				title: 'Irrigation and soil monitoring dashboard for smart agriculture',
				width: 1302,
				height: 699,
			},
			{
				src: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-7.webp',
				alt: 'Active and cleared alarms for soil moisture and battery levels in ThingsBoard',
				title: 'View and manage critical alerts from field sensors in the irrigation system',
				width: 1302,
				height: 699,
			},
		],
	},
	solutionStructure: {
		title: 'Solution structure of smart irrigation use case',
		shortText:
			'The smart irrigation solution connects soil sensors, weather stations, and irrigation controllers to the ThingsBoard platform through IoT gateways. You may find the detailed solution setup guide in our <a href="/docs/pe/solution-templates/smart-irrigation/">smart irrigation solution template</a> documentation.',
		longText: [
			'At the field level, soil moisture sensors, temperature probes, and rain gauges collect environmental data at configurable intervals. Irrigation controllers manage valve actuators for individual zones, enabling precise water delivery to specific areas based on their unique requirements.',
			'IoT gateways aggregate sensor data and transmit it to the ThingsBoard server using MQTT, CoAP, or HTTP protocols. The platform processes incoming telemetry through its rule engine, evaluating soil moisture levels against configured thresholds and weather conditions to generate automated irrigation commands.',
			'Interactive dashboards provide farm managers with a complete view of their irrigation infrastructure — from high-level field maps showing zone statuses to detailed sensor readings and historical water consumption charts. Mobile access ensures that operators can monitor and control irrigation systems from anywhere, at any time.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of smart irrigation solution',
		subtitle:
			'The live dashboard demonstrates a complete smart irrigation monitoring and control system built with ThingsBoard. It provides real-time visibility into soil conditions, irrigation schedules, water consumption, and system health across multiple zones.',
		panels: [
			{
				title: 'Field overview map',
				description:
					'The top-level dashboard displays an interactive map of the irrigation area with all zones marked by color-coded indicators. Each zone shows its current soil moisture level, irrigation status (active, scheduled, or idle), and any active alarms. Users can click on any zone to drill down into detailed sensor data.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-1.webp',
				imageAlt:
					'Interactive field map showing irrigation zones with moisture and status indicators',
			},
			{
				title: 'Zone detail dashboard',
				description:
					'A detailed view of an individual irrigation zone displaying real-time soil moisture readings at multiple depths, soil temperature, ambient temperature, humidity, and recent rainfall data. Trend charts show how moisture levels change throughout the day relative to irrigation events.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-2.webp',
				imageAlt: 'Individual zone dashboard with soil moisture, temperature, and rainfall data',
			},
			{
				title: 'Irrigation schedule management',
				description:
					'This panel allows operators to view and configure irrigation schedules for each zone. Schedules can be time-based, threshold-based (triggered by soil moisture levels), or a combination of both. The interface shows upcoming irrigation events and historical execution logs.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-3.webp',
				imageAlt: 'Irrigation schedule configuration with time-based and threshold-based settings',
			},
			{
				title: 'Water consumption analytics',
				description:
					'A comprehensive water usage dashboard showing consumption per zone, per day, and per irrigation cycle. Flow meter data is aggregated into daily, weekly, and monthly totals, enabling operators to track water efficiency, detect leaks, and optimize scheduling to reduce waste.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-4.webp',
				imageAlt: 'Water consumption analytics with per-zone and per-cycle usage data',
			},
			{
				title: 'Weather station integration',
				description:
					'Real-time weather data from on-site stations and external APIs is displayed alongside irrigation metrics. Temperature, humidity, wind speed, solar radiation, and rainfall measurements inform automated irrigation decisions and help operators plan ahead.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-5.webp',
				imageAlt: 'Weather station data with temperature, humidity, wind, and rainfall readings',
			},
			{
				title: 'Alarm and notification center',
				description:
					'A centralized alarm dashboard listing all system events including low soil moisture warnings, equipment malfunctions, communication failures, and water pressure anomalies. Each alarm includes severity, timestamp, and recommended action, with options to acknowledge or escalate.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-6.webp',
				imageAlt: 'Alarm center with system alerts, equipment status, and recommended actions',
			},
			{
				title: 'Valve and controller status',
				description:
					'A real-time view of all irrigation valves and controllers showing their current state (open, closed, or transitioning), last activation time, and communication health. Operators can manually override valve positions directly from the dashboard for emergency situations.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-7.webp',
				imageAlt: 'Valve and controller status dashboard with manual override controls',
			},
			{
				title: 'Historical performance report',
				description:
					'A summary dashboard presenting long-term irrigation performance metrics including total water consumed, average soil moisture maintained, irrigation efficiency scores, and cost savings estimates. Data can be exported for reporting and regulatory compliance purposes.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-8.webp',
				imageAlt: 'Historical irrigation performance report with efficiency metrics and trends',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/a4640cc0-8fa9-11ef-baa8-4521077809fd?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SmartIrrigation_ViewLiveDemo',
		contactUsId: 'UseCases_SmartIrrigation_ContactUs',
	},
	applications: {
		title: 'Applications of smart irrigation solution',
		subtitle:
			'Smart irrigation powered by ThingsBoard can be deployed across a wide range of agricultural, municipal, and commercial environments where efficient water management is essential.',
		applications: [
			{
				title: 'Precision agriculture',
				description:
					'Sensor-driven watering schedules for row crops, orchards, and vineyards that maximize yields and cut water use.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/agriculture-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/agriculture-2.svg',
				imageAlt: 'Farm field',
				imageTitle: 'Precision agriculture',
			},
			{
				title: 'Municipal parks & landscaping',
				description:
					'Weather- and soil-aware smart scheduling for public parks and urban green spaces that reduces water waste.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/greenhouse-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/greenhouse-2.svg',
				imageAlt: 'Park',
				imageTitle: 'Municipal parks & landscaping',
			},
			{
				title: 'Agri-Tech research & experimental farms',
				description:
					'Controlled irrigation and structured data collection for testing watering strategies at research stations.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/parks-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/parks-2.svg',
				imageAlt: 'Research farm',
				imageTitle: 'Agri-Tech research & experimental farms',
			},
			{
				title: 'Smart greenhouses',
				description:
					'Climate-controlled irrigation in greenhouse environments where precise moisture management is critical. Integration with HVAC, lighting, and fertigation systems enables fully automated growing conditions.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/fields-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/fields-2.svg',
				imageAlt: 'Greenhouse',
				imageTitle: 'Smart greenhouses',
			},
			{
				title: 'Golf courses & sports fields',
				description:
					'Automated zone-based turf irrigation that maintains optimal playing conditions and meets water-use regulations.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/research-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/research-2.svg',
				imageAlt: 'Golf course',
				imageTitle: 'Golf courses & sports fields',
			},
		],
	},
	summary: {
		title: 'Summary of smart irrigation solution',
		text: 'Smart irrigation with ThingsBoard delivers intelligent water management through IoT sensor integration, real-time monitoring, and automated control. By combining soil moisture data, weather information, and configurable automation rules, the platform optimizes water delivery across agricultural fields, urban parks, greenhouses, and sports facilities. Organizations gain full visibility into their irrigation operations — from field-level sensor readings to facility-wide water consumption analytics — enabling data-driven decisions that conserve water, reduce costs, and improve outcomes.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
