import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'IoT smart metering solution',
	pageTitle: 'IoT Smart Metering Solution',
	description:
		'Collect, store, and aggregate smart meter data in one IoT smart metering solution. Detect leakage, anomalies, and fraud, and share insights with end users.',
	pageSlug: 'smart-metering',
	cta: {
		title: 'Roll out smart metering faster',
		text:
			'Start from ready-made smart metering templates in the IoT Hub, or ask our team to build a solution for your meters and billing systems.',
		buttonLabel: 'Explore smart metering templates',
		buttonHref: '/iot-hub/solution-templates/?useCases=Smart+Metering',
	},
	about: {
		shortText:
			'Smart metering gives utilities and property managers accurate consumption data without manual readings. ThingsBoard collects electricity and water readings from smart meters, aggregates them by apartment, building, and district, and shows each customer their own usage.',
		longText: [
			'The live demo follows how utilities organize their data: districts contain buildings, buildings contain apartments, and each level has its own dashboard. Operators see the whole network, and an apartment-level dashboard can be shared with the resident.',
			'The rule engine stores readings, raises alarms on abnormal consumption, and forwards data to billing and other systems.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/4a4f5380-cc87-11f1-adf1-29dbfc808686?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SmartMetering_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/smart-metering/smart-metering-1.webp',
				alt: 'ThingsBoard dashboard showing energy and water consumption, district map, and critical alarm for District B in San Francisco',
				title:
					'ThingsBoard dashboard – energy and water monitoring, map and alarms for San Francisco districts',
				width: 2048,
				height: 1090,
			},
			{
				src: '/src/assets/images/usecases/smart-metering/smart-metering-2.webp',
				alt: 'ThingsBoard dashboard displaying District A buildings on the map, energy and water consumption, and a critical high temperature alarm',
				title:
					'ThingsBoard dashboard – monitoring buildings in District A with real-time energy, water usage, and critical alarms',
				width: 2048,
				height: 1090,
			},
			{
				src: '/src/assets/images/usecases/smart-metering/smart-metering-3.webp',
				alt: 'ThingsBoard dashboard with apartment layout of Building A1, showing energy and water usage for Apartments A1-1 and A1-2, and a critical temperature alarm',
				title:
					'ThingsBoard dashboard – apartment-level monitoring in Building A1 with real-time energy, water consumption, and alarms',
				width: 2048,
				height: 1090,
			},
			{
				src: '/src/assets/images/usecases/smart-metering/smart-metering-4.webp',
				alt: 'ThingsBoard dashboard showing thermostat readings, real-time temperature control, a critical high temperature alarm, and historical temperature graph for Apartment A1-1',
				title:
					'ThingsBoard dashboard – thermostat monitoring and control with temperature history and alarm for Apartment A1-1',
				width: 2048,
				height: 1090,
			},
		],
	},
	solutionStructure: {
		title: 'How IoT smart metering works',
		shortText:
			'Smart meters and environmental sensors connect to ThingsBoard directly over MQTT, HTTP, CoAP, or LwM2M, through the IoT Gateway, or from LoRaWAN, NB-IoT, and Sigfox networks. Lightweight protocols keep data flowing even over constrained networks.',
		longText: [
			'Smart meters transmit electricity, water, and temperature data to ThingsBoard via lightweight, efficient protocols. The platform processes this data through its rule engine, enabling alarms, storage, or forwarding.',
			'Telemetry is stored securely and shown on dashboards. Built-in widgets display trends, real-time usage, and alarms, from a single meter up to the whole network.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Smart metering solution architecture',
		schemeCaption:
			'Smart metering solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Smart meter dashboard',
		subtitle:
			'Dashboards follow the way utilities organize their data, from districts to buildings to single apartments, so every team sees the level it works with.',
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
			'https://thingsboard.cloud/dashboard/4a4f5380-cc87-11f1-adf1-29dbfc808686?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SmartMetering_ViewLiveDemo',
		contactUsId: 'UseCases_SmartMetering_ContactUs',
	},
	applications: {
		title: 'Where smart metering is used',
		subtitle:
			'Utilities, property managers, and industrial sites use smart metering to track consumption and cut losses.',
		applications: [
			{
				title: 'Municipal utilities',
				description:
					'Optimize city-wide water and energy management to support sustainable urban development.',
				desktopImage: '/src/assets/images/usecases/smart-metering/utilities-1.svg',
				imageAlt: 'Municipal utilities',
				imageTitle: 'Municipal utilities',
			},
			{
				title: 'Residential complexes',
				description:
					'Enable landlords and tenants to monitor and reduce energy bills through transparent usage tracking.',
				desktopImage: '/src/assets/images/usecases/smart-metering/complex-1.svg',
				imageAlt: 'Residential complexes',
				imageTitle: 'Residential complexes',
			},
			{
				title: 'Commercial facilities',
				description:
					'Ensure operational efficiency and compliance with green building standards by tracking real-time resource use.',
				desktopImage: '/src/assets/images/usecases/smart-metering/facilities-1.svg',
				imageAlt: 'Commercial facilities',
				imageTitle: 'Commercial facilities',
			},
			{
				title: 'Industrial plants',
				description:
					'Gain insights into high-consumption areas, detect leaks or overuse early, and prevent costly downtime.',
				desktopImage: '/src/assets/images/usecases/smart-metering/industrial-1.svg',
				imageAlt: 'Industrial plants',
				imageTitle: 'Industrial plants',
			},
			{
				title: 'Educational institutions',
				description:
					'Empower facility managers to improve campus energy efficiency and promote eco-friendly behavior.',
				desktopImage: '/src/assets/images/usecases/smart-metering/institutions-1.svg',
				imageAlt: 'Educational institutions',
				imageTitle: 'Educational institutions',
			},
		],
	},
	advantages: {
		title: 'Why ThingsBoard for smart metering',
		cards: [
			{
				icon: 'tabler:building-skyscraper',
				color: 'blue',
				title: 'District, building, and apartment hierarchy',
				description:
					'Aggregate meter data by district, building, and apartment, and give each customer access to their own consumption only.',
				href: '/docs/pe/user-guide/digital-twins/entities/',
				linkText: 'Learn more about multi-tenancy',
			},
			{
				icon: 'tabler:plug-connected',
				color: 'purple',
				title: 'Smart meter connectivity',
				description:
					'Connect meters directly over MQTT, HTTP, CoAP, or LwM2M, wired Modbus meters through the IoT Gateway, and pre-integrated meters from the IoT Hub in a few steps.',
				href: '/docs/pe/user-guide/connectivity-guide/',
				linkText: 'Learn more about connectivity',
			},
			{
				icon: 'tabler:wifi',
				color: 'red',
				title: 'LPWAN metering networks',
				description:
					'Collect readings from meters on LoRaWAN, NB-IoT, or Sigfox networks through their network servers and platform integrations.',
				href: '/docs/pe/user-guide/integrations/',
				linkText: 'Learn more about integrations',
			},
			{
				icon: 'tabler:server',
				color: 'orange',
				title: 'Built for large meter fleets',
				description:
					'One tenant can hold millions of devices and customers, and the microservices deployment scales horizontally as your meter fleet grows.',
				href: '/docs/pe/reference/architecture/microservices/',
				linkText: 'Learn more about scalability',
			},
		],
	},
	faq: [
		{
			id: 'smart-metering-faq',
			label: 'FAQ',
			items: [
				{
					id: 'what-is-iot-smart-metering',
					question: 'What is IoT smart metering?',
					answer:
						'<p>Smart meters measure consumption and send readings automatically over a network instead of being read by hand. An IoT platform such as ThingsBoard collects those readings, stores them, and turns them into dashboards, alarms, and reports for operators and end customers.</p>',
					defaultOpen: true,
				},
				{
					id: 'how-do-smart-meters-connect-to',
					question: 'How do smart meters connect to ThingsBoard?',
					answer:
						'<p>Meters with an IP connection send data directly over MQTT, HTTP, or CoAP, and LwM2M suits NB-IoT and cellular meters. Meters on LoRaWAN or Sigfox networks come in through the network server, and wired Modbus meters connect through the ThingsBoard IoT Gateway. You can pick pre-integrated meters in the <a href="/iot-hub/">IoT Hub</a>. Details are in the <a href="/docs/pe/user-guide/connectivity-guide/">connectivity guide</a>.</p>',
				},
				{
					id: 'how-many-meters-can-one-thingsboard',
					question: 'How many meters can one ThingsBoard deployment handle?',
					answer:
						'<p>ThingsBoard runs as a single service for smaller deployments and as a <a href="/docs/pe/reference/architecture/microservices/">cluster of microservices</a> for large ones, so capacity grows with the number of nodes. For a sizing estimate for your meter fleet, <a href="/contact-us/?subject=Custom+Development+Service">contact our team</a>.</p>',
				},
				{
					id: 'can-a-smart-meter-act-as',
					question: 'Can a smart meter act as a gateway for solar panels and batteries behind it?',
					answer:
						'<p>Yes. A meter or edge device can use the ThingsBoard MQTT Gateway API to send data on behalf of the devices connected to it, such as inverters or batteries. Each of them appears in ThingsBoard as a separate device.</p>',
				},
				{
					id: 'can-i-detect-leaks-and-fraud',
					question: 'Can I detect leaks and fraud?',
					answer:
						'<p>Alarm rules flag unusual consumption, such as continuous flow when nobody should be using water or a sudden drop to zero, and notify operators. For water networks, see <a href="/use-cases/water-metering/">smart water metering</a>.</p>',
				},
				{
					id: 'can-customers-see-their-own-consumption',
					question: 'Can customers see their own consumption?',
					answer:
						'<p>Yes. Each customer gets access only to their own meters and dashboards, so a utility can share data with residents or tenants without exposing anyone else’s. See how <a href="/docs/pe/user-guide/digital-twins/entities/">customers and access</a> work.</p>',
				},
			],
		},
	],
	summary: {
		title: 'Smart metering with ThingsBoard in short',
		text: 'IoT smart metering with ThingsBoard provides a scalable, flexible way to monitor utilities. Through sensor integration and protocol support, data is collected and visualized across districts, buildings, and apartments. ThingsBoard enables tracking of energy use, alarms, and temperature trends—helping users make timely decisions and meet sustainability goals across industries. With ThingsBoard, organizations can build future-ready smart metering systems that scale, adapt, and drive sustainable impact.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
