import type { UseCaseData } from './types';

export const wasteManagementData: UseCaseData = {
	title: 'Waste management solution',
	pageTitle: 'Smart Waste Management with ThingsBoard for Cities & Industry',
	description:
		"Optimize waste collection across cities, industries, and campuses with ThingsBoard's IoT platform — featuring real-time monitoring, smart alarms, and interactive dashboards for data-driven efficiency and sustainability.",
	pageSlug: 'waste-management',
	about: {
		shortText:
			'As urban populations grow and sustainability standards tighten, waste management systems must evolve to be more efficient, scalable, and data-driven. Traditional methods — based on fixed collection schedules and manual checks —often result in overflows, resource waste, and high operational costs. ThingsBoard IoT Platform effectively addresses these challenges, offering powerful tools for real-time monitoring, automation, and optimization of waste operations.',
		longText: [
			'ThingsBoard IoT platform transforms waste collection logistics for cities, campuses, and enterprises by enabling real-time monitoring through sensor-equipped bins. As these sensors transmit live data on fill levels, battery status, and connectivity, ThingsBoard processes the telemetry instantly, allowing operators to reduce unnecessary pickups, lower emissions, and respond proactively to service needs. With its flexible device integration, rule-based automation, and customizable dashboards, ThingsBoard empowers waste management teams to deploy quickly, scale easily, and make smarter decisions based on actionable insights.',
			'Supporting industry-standard protocols like MQTT, CoAP, and HTTP, ThingsBoard enables seamless sensor connectivity at scale. Its Rule Engine allows for complex event processing and alarming, while multi-tenant architecture supports parallel use by multiple stakeholders — from city departments to private contractors. Combined with powerful analytics and visualization tools, ThingsBoard delivers a complete, future-ready solution for intelligent waste management.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/7814f8a0-8fa9-11ef-baa8-4521077809fd?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_WasteManagement_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/waste-monitoring/waste-1.webp',
				alt: 'Smart waste management dashboard with bin status, battery levels, and interactive map in ThingsBoard',
				title:
					'Live overview of smart waste bins, battery alerts, and location tracking via ThingsBoard IoT',
				width: 2048,
				height: 951,
			},
			{
				src: '/src/assets/images/usecases/waste-monitoring/waste-2.webp',
				alt: 'Sensor registration dialog for uploading CSV file with bin data in ThingsBoard',
				title: 'Register multiple smart bin sensors by importing CSV in ThingsBoard',
				width: 2048,
				height: 951,
			},
			{
				src: '/src/assets/images/usecases/waste-monitoring/waste-3.webp',
				alt: 'Alarm rule configuration for bin fullness and battery level in ThingsBoard',
				title: 'Define alarm rules – fullness over 90%, battery below 30% (ThingsBoard IoT)',
				width: 2048,
				height: 951,
			},
			{
				src: '/src/assets/images/usecases/waste-monitoring/waste-4.webp',
				alt: 'Edit bin sensor data including location and address in ThingsBoard',
				title: 'Modify sensor details – serial number, address, GPS coordinates',
				width: 2048,
				height: 951,
			},
			{
				src: '/src/assets/images/usecases/waste-monitoring/waste-5.webp',
				alt: 'Smart bin sensor detail view with charts for fullness and battery history in ThingsBoard',
				title: 'Sensor data trends – fullness and battery level monitoring over time',
				width: 2048,
				height: 951,
			},
		],
	},
	solutionStructure: {
		title: 'Solution structure of waste management use case',
		shortText:
			'The ThingsBoard-powered <a href="/docs/pe/solution-templates/waste-management/">waste management solution</a> begins at the edge — where IoT sensors installed in bins monitor fill levels and battery status in real time. These devices send telemetry data to ThingsBoard using supported protocols such as MQTT, CoAP, or HTTP.',
		longText: [
			'Once the data reaches the platform, it is processed and stored in a time-series database. Rule Engine chains trigger alarms based on predefined conditions such as low battery or bins nearing capacity. Finally, this structured information is presented on interactive dashboards, allowing operators to make timely decisions and optimize collection routes.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of waste management solution',
		panels: [
			{
				title: 'Dashboard overview and sensor states',
				description:
					'The main dashboard provides a comprehensive overview of all waste bins across the monitored area. An interactive map displays bin locations with color-coded status indicators, while sidebar panels show real-time battery levels, fill percentages, and connectivity status for each sensor. Operators can quickly identify bins that require immediate attention and plan collection routes accordingly.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-1.webp',
				imageAlt:
					'Smart waste management dashboard with bin status, battery levels, and interactive map',
				imageTitle:
					'Main waste management dashboard showing bin locations, battery status, and fill levels on an interactive map',
			},
			{
				title: 'Sensor registration panel',
				description:
					'This panel allows operators to register new waste bin sensors individually or in bulk via CSV file import. The CSV import feature streamlines large-scale deployments by accepting pre-configured sensor data including location coordinates, bin type, and address information — significantly reducing setup time for city-wide rollouts.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-2.webp',
				imageAlt: 'Sensor registration dialog for uploading CSV file with bin data',
				imageTitle:
					'Sensor registration panel with CSV import functionality for bulk bin sensor onboarding',
			},
			{
				title: 'Alarm configuration panel',
				description:
					'The alarm configuration interface enables operators to define threshold-based rules for bin fullness and battery levels. Custom alarm profiles can be created for different bin types or zones, with configurable severity levels and notification channels. When a bin reaches a critical fill level or its battery drops below the set threshold, the system automatically triggers alerts and escalation workflows.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-3.webp',
				imageAlt: 'Alarm rule configuration for bin fullness and battery level',
				imageTitle:
					'Alarm configuration panel for setting fullness and battery thresholds with severity levels',
			},
			{
				title: 'Sensor edit interface',
				description:
					'The sensor edit interface allows operators to update metadata for individual waste bin sensors, including geographic coordinates, street address, bin capacity, and assigned collection route. This ensures that all sensor information stays accurate as bins are relocated, replaced, or reassigned across the service area.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-4.webp',
				imageAlt: 'Edit bin sensor data including location and address',
				imageTitle:
					'Sensor metadata editing interface for updating bin location, address, and configuration',
			},
			{
				title: 'Device insights view',
				description:
					'The device insights view presents detailed trend graphs for individual bin sensors, showing historical data on fill level progression and battery discharge over time. Operators can analyze patterns, identify anomalies, and forecast collection needs based on historical consumption trends — enabling proactive scheduling and resource optimization.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-5.webp',
				imageAlt: 'Smart bin sensor detail view with charts for fullness and battery history',
				imageTitle:
					'Device insights view with historical trend charts for fill level and battery status',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/7814f8a0-8fa9-11ef-baa8-4521077809fd?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_WasteManagement_ViewLiveDemo',
		contactUsId: 'UseCases_WasteManagement_ContactUs',
	},
	applications: {
		title: 'Applications of waste management solution',
		applications: [
			{
				title: 'Municipal services',
				description:
					"Enables city authorities to optimize waste collection routes and respond faster to bin overflow alarms using ThingsBoard's real-time telemetry, automated rules, and geospatial dashboards.",
				desktopImage: '/src/assets/images/usecases/waste-monitoring/municipal-1.svg',
				mobileImage: '/src/assets/images/usecases/waste-monitoring/municipal-2.svg',
				imageAlt: 'Municipal services',
				imageTitle: 'Municipal services',
			},
			{
				title: 'Industrial facilities',
				description:
					'Ensures safe and compliant handling of waste in manufacturing zones through detailed sensor insights, custom alarms, and support for legacy device integration.',
				desktopImage: '/src/assets/images/usecases/air-quality/industrial-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/industrial-2.svg',
				imageAlt: 'Industrial facilities',
				imageTitle: 'Industrial facilities',
			},
			{
				title: 'University and corporate campuses',
				description:
					'Promotes sustainability goals with smart bin tracking, usage analytics, and seamless deployment across distributed locations, all from a centralized dashboard.',
				desktopImage: '/src/assets/images/usecases/smart-energy/education-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-energy/education-2.svg',
				imageAlt: 'University and corporate campuses',
				imageTitle: 'University and corporate campuses',
			},
			{
				title: 'Transportation hubs',
				description:
					"Maintains hygiene and safety in high-traffic zones by enabling dynamic monitoring and maintenance scheduling via ThingsBoard's event-driven automation.",
				desktopImage: '/src/assets/images/usecases/waste-monitoring/transportation-1.svg',
				mobileImage: '/src/assets/images/usecases/waste-monitoring/transportation-2.svg',
				imageAlt: 'Transportation hubs',
				imageTitle: 'Transportation hubs',
			},
			{
				title: 'Event venues and stadiums',
				description:
					'Handles fluctuating waste loads during events with scalable sensor connectivity and predictive analytics, ensuring clean environments and resource efficiency.',
				desktopImage: '/src/assets/images/usecases/waste-monitoring/stadium-1.svg',
				mobileImage: '/src/assets/images/usecases/waste-monitoring/stadium-2.svg',
				imageAlt: 'Event venues and stadiums',
				imageTitle: 'Event venues and stadiums',
			},
		],
	},
	summary: {
		title: 'Summary of waste management solution',
		text: "ThingsBoard's waste management solution addresses a critical urban and industrial challenge with precision, scalability, and real-time intelligence. From seamless sensor integration to customizable dashboards and proactive alarming, it empowers stakeholders to manage waste efficiently and sustainably. With IoT at its core, this solution lays the foundation for smarter, cleaner cities and optimized resource management.",
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
