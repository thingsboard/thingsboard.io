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
			'With enhanced visibility, municipalities, facilities managers, and utility providers can make faster, data-driven decisions that optimize resource use, reduce waste, and lower operational costs. ThingsBoard plays an important role in this evolution by offering flexible, open-source tools to collect, process, and visualize telemetry data across distributed assets such as meters, sensors, and edge devices. Its modular architecture and rich feature set enable seamless integration of diverse devices, ensuring reliable real-time monitoring and control of utility infrastructure.',
			'This use case showcases how ThingsBoard empowers organizations to build robust, end-to-end smart metering solutions. By combining protocol versatility, intuitive dashboards, and powerful rule engines, ThingsBoard makes it easy to monitor energy and water usage across residential, commercial, and municipal environments—enhancing sustainability and operational control.',
		],
		demoUrl:
			'https://demo.thingsboard.io/dashboard/3a1026e0-83f6-11e7-b56d-c7f326cba909?publicId=322a2330-7c36-11e7-835d-c7f326cba909',
		demoButtonId: 'UseCases_SmartMetering_ViewLiveDemo',
	},
	solutionStructure: {
		title: 'Solution structure of smart metering',
		shortText:
			'The ThingsBoard solution is designed to seamlessly integrate with smart meters and environmental sensors using a broad set of IoT protocols including MQTT, CoAP, and HTTP. These protocols enable low-latency, efficient data transmission even over constrained networks.',
		longText: [
			'Smart meters transmit electricity, water, and temperature data to ThingsBoard via lightweight, efficient protocols. The platform processes this data through its rule engine, enabling alarms, storage, or forwarding.',
			'Telemetry is securely stored and visualized on customizable dashboards. Built-in widgets help display trends, real-time usage, and alarms — forming a scalable, reliable system from device to dashboard.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Smart metering solution architecture',
		schemeCaption:
			'Smart metering solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Smart metering dashboard structure',
		subtitle:
			'The ThingsBoard smart metering dashboard is structured hierarchically for clear navigation across different locations and asset levels. Each level is designed to provide intuitive, real-time visualization of data, ensuring stakeholders can act quickly and effectively.',
		panels: [
			{
				title: 'Districts overview state',
				description:
					'The top-level view displays a city map with marked districts. Each district shows energy and water consumption statistics, with alarms highlighted for immediate attention. Data visualization at this level enables city operators to identify high-load zones instantly and prioritize interventions.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-1.webp',
				imageAlt: 'City map with district energy and water consumption statistics',
			},
			{
				title: 'District A dashboard state',
				description:
					'Selecting a district reveals its buildings, associated addresses, and utility metrics. A real-time alarm table notifies users of anomalies like overheating. These dashboards allow users to quickly assess building performance and spot irregular consumption.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-2.webp',
				imageAlt: 'District A buildings with utility metrics and alarm table',
			},
			{
				title: 'Building A dashboard state',
				description:
					'The next layer shows a building layout and associated apartments. Energy and water data is displayed per apartment, alongside a localized alarm feed. By visualizing metrics at the building level, operators can pinpoint inefficiencies or leaks with precision.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-3.webp',
				imageAlt: 'Building A layout with apartment-level energy and water data',
			},
			{
				title: 'Apartment A1-1 dashboard state',
				description:
					'This view provides thermostat data, control dials, and temperature graphs. The user can track room-level temperature changes and set optimal thresholds. Granular visualizations empower users to optimize comfort and reduce unnecessary energy use.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-4.webp',
				imageAlt: 'Apartment thermostat data with temperature graphs and control dials',
			},
			{
				title: 'District B & sub-level dashboard state',
				description:
					'Similar structure with Building B1 and B2. Users can compare utility consumption across districts and buildings for better decision-making. Comparative visual data allows stakeholders to benchmark efficiency and replicate best practices across locations.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-5.webp',
				imageAlt: 'District B with cross-district utility consumption comparison',
			},
			{
				title: 'Building B1 overview state',
				description:
					'Displays apartment-level data for energy and water use. No alarms present, suggesting normal operation. Alarm - free dashboards confirm system stability and simplify routine checks.',
				image: '/src/assets/images/usecases/smart-metering/smart-metering-6.webp',
				imageAlt: 'Building B1 apartment-level energy and water data',
			},
			{
				title: 'Apartment B1-1 dashboard state',
				description:
					'Temperature and thermostat data per room. Visuals include dial controls and temperature history for precise indoor climate monitoring. These visuals help occupants understand thermal patterns and improve energy-saving behavior over time.',
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
					'Optimize city-wide water and energy management to support sustainable urban development.',
				desktopImage: '/src/assets/images/usecases/smart-metering/utilities-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/utilities-2.svg',
				imageAlt: 'Municipal utilities',
				imageTitle: 'Municipal utilities',
			},
			{
				title: 'Residential complexes',
				description:
					'Enable landlords and tenants to monitor and reduce energy bills through transparent usage tracking.',
				desktopImage: '/src/assets/images/usecases/smart-metering/complex-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/complex-2.svg',
				imageAlt: 'Residential complexes',
				imageTitle: 'Residential complexes',
			},
			{
				title: 'Commercial facilities',
				description:
					'Ensure operational efficiency and compliance with green building standards by tracking real-time resource use.',
				desktopImage: '/src/assets/images/usecases/smart-metering/facilities-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/facilities-2.svg',
				imageAlt: 'Commercial facilities',
				imageTitle: 'Commercial facilities',
			},
			{
				title: 'Industrial plants',
				description:
					'Gain insights into high-consumption areas, detect leaks or overuse early, and prevent costly downtime.',
				desktopImage: '/src/assets/images/usecases/smart-metering/industrial-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/industrial-2.svg',
				imageAlt: 'Industrial plants',
				imageTitle: 'Industrial plants',
			},
			{
				title: 'Educational institutions',
				description:
					'Empower facility managers to improve campus energy efficiency and promote eco-friendly behavior.',
				desktopImage: '/src/assets/images/usecases/smart-metering/institutions-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-metering/institutions-2.svg',
				imageAlt: 'Educational institutions',
				imageTitle: 'Educational institutions',
			},
		],
	},
	summary: {
		title: 'Summary of smart metering',
		text: 'IoT smart metering with ThingsBoard provides a scalable, flexible way to monitor utilities. Through sensor integration and protocol support, data is collected and visualized across districts, buildings, and apartments. ThingsBoard enables tracking of energy use, alarms, and temperature trends—helping users make timely decisions and meet sustainability goals across industries. With ThingsBoard, organizations can build future-ready smart metering systems that scale, adapt, and drive sustainable impact.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
