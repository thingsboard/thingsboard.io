import type { UseCaseData } from './types';

export const smartMeteringData: UseCaseData = {
	title: 'IoT smart metering solution',
	pageTitle: 'ThingsBoard Smart Metering for Cities, Industry & Business',
	description:
		'Explore how ThingsBoard enables powerful IoT smart metering solutions with real-time dashboards, protocol support, and multi-industry applications.',
	pageSlug: 'smart-metering',
	about: {
		shortText:
			"In today's world of growing urban infrastructure, energy efficiency and water management have become top priorities. Smart metering solutions powered by the ThingsBoard IoT platform offer a transformative approach to utility monitoring, enabling stakeholders to access accurate, real-time insights into consumption patterns.",
		longText: [
			'ThingsBoard provides the flexibility to connect smart meters across diverse environments — from residential buildings to industrial facilities — using protocols such as MQTT, CoAP, HTTP, and LwM2M. Its open-source foundation ensures full transparency, community-driven innovation, and the freedom to customize every layer of the solution to match specific business requirements.',
			'The modular architecture of ThingsBoard allows organizations to start small and scale seamlessly. Whether deploying a handful of meters in a single building or rolling out thousands across a city, the platform supports multi-tenancy, role-based access, powerful rule engine automation, and rich dashboard visualizations — all essential for building robust, future-proof smart metering systems.',
		],
		demoUrl:
			'https://demo.thingsboard.io/dashboard/3a1026e0-83f6-11e7-b56d-c7f326cba909?publicId=322a2330-7c36-11e7-835d-c7f326cba909',
		demoButtonId: 'UseCases_SmartMetering_ViewLiveDemo',
	},
	solutionStructure: {
		title: 'Solution structure of smart metering use case',
		shortText:
			'The smart metering solution is built on a layered architecture that connects utility meters to the ThingsBoard platform through IoT gateways. Smart meters for electricity, water, gas, and heat transmit data via industry-standard protocols to a centralized cloud or on-premise instance.',
		longText: [
			'At the edge level, smart meters and sensors collect granular consumption data — energy usage, water flow, gas volume, and heat output — at configurable intervals. IoT gateways aggregate this data and forward it securely to the ThingsBoard server using MQTT, CoAP, or HTTP protocols.',
			'The ThingsBoard rule engine processes incoming telemetry in real time, applying threshold-based alarms, data transformations, and routing logic. This enables automated notifications for abnormal consumption, leak detection, and predictive maintenance alerts without manual intervention.',
			'Dashboards provide a hierarchical drill-down view: from city-wide district maps to individual building layouts and apartment-level details. Each level displays relevant KPIs, consumption trends, alarm statuses, and device health — giving utility managers, building operators, and residents the visibility they need at every scale.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of smart metering solution',
		subtitle:
			'The live dashboard displays real-time data from smart meters collected using ThingsBoard MQTT API. Collected data is processed via the rule engine to raise alarms on certain thresholds. The dashboard provides a hierarchical drill-down view from city districts to individual apartments.',
		panels: [
			{
				title: 'Districts overview state',
				description:
					'The top-level view displays a city map with marked districts, each showing aggregated energy and water consumption statistics. Users can quickly identify high-consumption areas and click on any district to drill down into building-level details. The overview also highlights active alarms across all districts.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-1.webp',
				imageAlt: 'City map with district energy and water consumption statistics',
			},
			{
				title: 'District A dashboard state',
				description:
					'Selecting a district reveals its buildings with detailed utility metrics including energy consumption, water usage, and active alarm counts. An alarm table at the bottom lists recent events with severity levels, enabling operators to prioritize responses. Each building row is clickable for further drill-down.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-2.webp',
				imageAlt: 'District A buildings with utility metrics and alarm table',
			},
			{
				title: 'Building A dashboard state',
				description:
					'The next layer shows a building layout with apartment-level energy and water data. Each apartment displays current consumption values, thermostat settings, and alarm indicators. This view helps building managers identify units with unusual usage patterns or active issues.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-3.webp',
				imageAlt: 'Building A layout with apartment-level energy and water data',
			},
			{
				title: 'Apartment A1-1 dashboard state',
				description:
					'This view provides thermostat data including current temperature, target temperature, and humidity levels. Interactive graphs show temperature trends over time, and control dials allow remote adjustment of thermostat settings. Energy and water consumption for the specific apartment are also displayed.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-4.webp',
				imageAlt: 'Apartment thermostat data with temperature graphs and control dials',
			},
			{
				title: 'District B & sub-level dashboard state',
				description:
					'Similar structure with Building B1 and B2, providing cross-district utility consumption comparison. This view enables utility managers to benchmark districts against each other, identify trends, and allocate resources more effectively based on comparative data.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-5.webp',
				imageAlt: 'District B with cross-district utility consumption comparison',
			},
			{
				title: 'Building B1 overview state',
				description:
					'Displays apartment-level data for Building B1, including per-unit energy and water consumption, thermostat statuses, and alarm summaries. The layout mirrors the Building A view, ensuring a consistent user experience across the entire metering hierarchy.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-6.webp',
				imageAlt: 'Building B1 apartment-level energy and water data',
			},
			{
				title: 'Apartment B1-1 dashboard state',
				description:
					'Temperature and thermostat data per room, including real-time readings, historical trends, and remote control capabilities. Users can monitor comfort levels, adjust heating or cooling settings, and review consumption patterns for the individual apartment unit.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-7.webp',
				imageAlt: 'Apartment B1-1 temperature and thermostat monitoring',
			},
		],
		demoUrl:
			'https://demo.thingsboard.io/dashboard/3a1026e0-83f6-11e7-b56d-c7f326cba909?publicId=322a2330-7c36-11e7-835d-c7f326cba909',
		demoButtonId: 'UseCases_SmartMetering_ViewLiveDemo',
		contactUsId: 'UseCases_SmartMetering_ContactUs',
	},
	applications: {
		title: 'Applications of smart metering solution',
		subtitle:
			'Smart metering solutions powered by ThingsBoard can be adapted across a wide range of industries and infrastructure types. Below are key application areas where IoT-based metering delivers measurable value.',
		applications: [
			{
				title: 'Municipal utilities',
				description:
					'Monitor city-wide electricity, water, and gas consumption to detect leaks and improve billing accuracy.',
				desktopImage: '/src/assets/images/usecases/smart-metering/utilities-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/utilities-2.svg',
				imageAlt: 'Municipal utilities',
				imageTitle: 'Municipal utilities',
			},
			{
				title: 'Residential complexes',
				description:
					'Per-apartment metering for energy, water, and heating in multi-unit residential buildings. Residents gain visibility into their consumption while property managers can identify waste and enforce fair billing.',
				desktopImage: '/src/assets/images/usecases/smart-metering/complex-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/complex-2.svg',
				imageAlt: 'Residential complexes',
				imageTitle: 'Residential complexes',
			},
			{
				title: 'Commercial facilities',
				description:
					'Monitoring and optimizing utility usage in office buildings, shopping centers, and hospitality venues. Smart metering helps reduce operational costs and supports sustainability certifications.',
				desktopImage: '/src/assets/images/usecases/smart-metering/facilities-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/facilities-2.svg',
				imageAlt: 'Commercial facilities',
				imageTitle: 'Commercial facilities',
			},
			{
				title: 'Industrial plants',
				description:
					'Tracking energy and resource consumption across production lines, warehouses, and support systems. Enables plant managers to identify inefficiencies, balance loads, and reduce peak demand charges.',
				desktopImage: '/src/assets/images/usecases/smart-metering/industrial-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/industrial-2.svg',
				imageAlt: 'Industrial plants',
				imageTitle: 'Industrial plants',
			},
			{
				title: 'Educational institutions',
				description:
					'Track utility usage across campuses and dormitories to support energy-saving and sustainability reporting.',
				desktopImage: '/src/assets/images/usecases/smart-metering/institutions-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/institutions-2.svg',
				imageAlt: 'Educational institutions',
				imageTitle: 'Educational institutions',
			},
		],
	},
	summary: {
		title: 'Summary of smart metering solution',
		text: 'IoT smart metering with ThingsBoard provides a scalable, flexible way to monitor utilities. Through sensor integration and protocol support, data is collected and visualized across districts, buildings, and apartments. ThingsBoard enables tracking of energy use, alarms, and temperature trends—helping users make timely decisions and meet sustainability goals across industries. With ThingsBoard, organizations can build future-ready smart metering systems that scale, adapt, and drive sustainable impact.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
