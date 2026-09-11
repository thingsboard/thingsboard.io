import type { UseCaseData } from './types';

export const data: UseCaseData = {
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
		title: 'Solution structure of waste management',
		shortText:
			'The ThingsBoard-powered <a href="/iot-hub/solution-templates/waste-monitoring/">waste management solution</a> begins at the edge — where IoT sensors installed in bins monitor fill levels and battery status in real time. These devices send telemetry data to ThingsBoard using supported protocols such as MQTT, CoAP, or HTTP. Thanks to ThingsBoard gateway and built-in integration capabilities, even legacy systems and non-IP sensors can be seamlessly connected.',
		longText: [
			'Once the data reaches the platform, it is processed and stored in a time-series database. Rule Engine chains trigger alarms based on predefined conditions such as low battery or bins nearing capacity. Finally, this structured information is presented on interactive dashboards, allowing operators to make timely decisions and optimize collection routes. All of this can be managed in a multi-tenant environment, enabling smart city operators, private contractors, and utility providers to co-manage waste operations securely.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Waste management dashboard structure',
		subtitle:
			'The dashboard structure in the ThingsBoard waste management solution is modular and intuitive, combining high-level overviews with detailed sensor-level insights. It includes map-based bin tracking, alarm configuration panels, device management interfaces, and historical analytics — ensuring full operational visibility and control from a single interface.',
		panels: [
			{
				title: 'Dashboard overview and sensor states',
				description:
					'This main dashboard view combines a real-time map with bin locations and a set of dynamic widgets showing battery status, fill levels, and device connectivity. Key metrics such as total bins, low battery alarms, and offline units are summarized for instant system awareness. This visual structure allows operators to monitor geographical distribution, detect anomalies at a glance, and make fast, informed decisions.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-1.webp',
				imageAlt:
					'Smart waste management dashboard with bin status, battery levels, and interactive map',
				imageTitle:
					'Main waste management dashboard showing bin locations, battery status, and fill levels on an interactive map',
			},
			{
				title: 'Sensor registration panel',
				description:
					'New sensors can be added directly through this panel using a simple CSV import, with required metadata such as GPS coordinates, addresses, and serial numbers. The intuitive interface streamlines onboarding, allowing operators to register and configure devices quickly without leaving the dashboard. This automation ensures accurate geo-tagging and immediate visibility on the map, significantly improving deployment speed and routing efficiency.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-2.webp',
				imageAlt: 'Sensor registration dialog for uploading CSV file with bin data',
				imageTitle:
					'Sensor registration panel with CSV import functionality for bulk bin sensor onboarding',
			},
			{
				title: 'Alarm configuration panel',
				description:
					'Operators can define and adjust threshold values that trigger alarms — such as battery dropping below 30% or bin fill level exceeding 90%. These thresholds are fully configurable, allowing the system to adapt to evolving operational needs or seasonal waste patterns. This flexibility ensures timely maintenance, prevents overflow, and keeps devices functioning reliably, while the visual rule editor makes it easy to fine-tune alarm logic in just a few clicks.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-3.webp',
				imageAlt: 'Alarm rule configuration for bin fullness and battery level',
				imageTitle:
					'Alarm configuration panel for setting fullness and battery thresholds with severity levels',
			},
			{
				title: 'Sensor edit interface',
				description:
					'Device metadata such as address, serial number, and coordinates can be updated manually. This flexibility helps in field corrections and GPS updates post-deployment. Correct metadata ensures better filtering and dashboard grouping.',
				image: '/src/assets/images/usecases/waste-monitoring/waste-4.webp',
				imageAlt: 'Edit bin sensor data including location and address',
				imageTitle:
					'Sensor metadata editing interface for updating bin location, address, and configuration',
			},
			{
				title: 'Device insights view',
				description:
					'Detailed sensor views include trend graphs for fill level and battery life. Historical visualization helps detect usage patterns and forecast maintenance. Dashboards convert raw telemetry into actionable insights.',
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
				title: 'Transportation hubs (airports, ports, stations)',
				description:
					"Maintains hygiene and safety in high-traffic zones by enabling dynamic monitoring and maintenance scheduling via ThingsBoard's event-driven automation.",
				desktopImage: '/src/assets/images/usecases/waste-monitoring/transportation-1.svg',
				mobileImage: '/src/assets/images/usecases/waste-monitoring/transportation-2.svg',
				imageAlt: 'Transportation hubs (airports, ports, stations)',
				imageTitle: 'Transportation hubs (airports, ports, stations)',
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
		title: 'Summary of waste management',
		text: "ThingsBoard's waste management solution addresses a critical urban and industrial challenge with precision, scalability, and real-time intelligence. From seamless sensor integration to customizable dashboards and proactive alarming, it empowers stakeholders to manage waste efficiently and sustainably. With IoT at its core, this solution lays the foundation for smarter, cleaner cities and optimized resource management.",
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
