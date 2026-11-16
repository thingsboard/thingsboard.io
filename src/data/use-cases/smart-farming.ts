import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Smart farming & IoT agriculture solution',
	pageTitle: 'Smart Farming: IoT in Agriculture',
	description:
		'Use IoT in agriculture to monitor silos, soil, and greenhouse climate in real time. Get alarms on crop spoilage risks and explore the live demo.',
	pageSlug: 'smart-farming',
	cta: {
		title: 'Launch your smart farming solution faster',
		text:
			'Start from a ready-made smart farming template in the IoT Hub, or tell our team about your silos, greenhouses, and fields, and we’ll build the solution for you.',
		buttonLabel: 'Explore smart farming templates',
		buttonHref: '/iot-hub/solution-templates/?useCases=Smart+Farming',
	},
	about: {
		shortText:
			'IoT in agriculture means fewer trips to the field and fewer surprises in storage. Sensors in silos, greenhouses, and fields report temperature, humidity, soil moisture, and crop levels to ThingsBoard, which turns them into live dashboards and alarms your team can act on.',
		longText: [
			'The live demo shows grain storage: three silos with temperature, humidity, and crop levels, plus a night mode for late shifts. Alarm rules warn your team before grain starts to spoil, and rules can switch on aeration automatically.',
			'The same platform covers greenhouses, irrigation, livestock, and farm equipment, so you can add new sites and devices as the project grows.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/c77eed60-cc6a-11f1-adf1-29dbfc808686?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SmartFarming_ViewLiveDemo',
	},
	overview: {
		type: 'comparison',
		baseImage: '/src/assets/images/usecases/smart-farming/smart-farming-2.webp',
		baseImageAlt: 'ThingsBoard dashboard in dark theme showing silo monitoring data',
		baseImageTitle:
			'Smart farming dashboard in dark mode: a map of three silos, their crop level, temperature, and moisture, and active alarms',
		overlayImage: '/src/assets/images/usecases/smart-farming/smart-farming-1.webp',
		overlayImageAlt: 'ThingsBoard dashboard in light theme showing silo monitoring data',
		overlayImageTitle:
			'Smart farming dashboard in light mode: the same map of three silos, their crop level, temperature, and moisture, and active alarms',
	},
	solutionStructure: {
		title: 'How a smart farming solution works',
		shortText:
			'The smart farming solution connects IoT sensors across silos, greenhouses, and fields to collect temperature, humidity, soil moisture, and crop levels. Sensors connect directly over MQTT, HTTP, or CoAP, existing equipment that uses Modbus or OPC UA connects through the IoT Gateway, and battery-powered field sensors come in from LoRaWAN or NB-IoT networks.',
		longText: [
			'ThingsBoard processes incoming telemetry with rule chains that trigger alerts or control actions. Dashboards show the data on maps and charts, so your team can spot issues and respond quickly. The same setup works for a small farm and for a large agricultural enterprise.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Smart farming solution architecture',
		schemeCaption:
			'Smart farming solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Smart farming dashboard',
		subtitle:
			'One dashboard for every silo and field: a map with locations, live readings, charts, and alarms, with a detailed view for each silo.',
		panels: [
			{
				title: 'Overview dashboard state',
				description:
					'Displays a geographic map with locations, real-time stats (aeration, crop level, temperature, humidity), charts for crop level and temperature, and an alarm panel. Consolidates multiple data points for instant status tracking and efficient response.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-1.webp',
				imageAlt:
					'Farm overview dashboard with field conditions and storage status on interactive map',
				imageTitle: 'Overview dashboard state',
			},
			{
				title: 'Night mode dashboard state',
				description:
					'A dark version of the main dashboard for night shifts and low-light rooms, so operators can focus on the data.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-2.webp',
				imageAlt: 'Smart farming dashboard in night mode with silo map, crop levels, and temperature',
				imageTitle: 'Night mode dashboard state',
			},
			{
				title: 'Silo A state',
				description:
					'Features local map, moisture graph, crop level chart, temperature trends, and aeration control toggle. Focused monitoring supports precise diagnostics and device-level control.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-3.webp',
				imageAlt: 'Silo climate control dashboard with temperature and humidity monitoring',
				imageTitle: 'Silo A state',
			},
			{
				title: 'Silo B state',
				description:
					'Similar layout, highlighting real-time moisture, crop level, indoor/outdoor temperature comparison. Enables insights into environmental conditions and ventilation efficiency.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-4.webp',
				imageAlt: 'Silo B dashboard with moisture, crop level, and indoor and outdoor temperature',
				imageTitle: 'Silo B state',
			},
			{
				title: 'Silo C state',
				description:
					'Displays readings from a silo with aeration turned off, helping to assess impact on crop conditions. Supports preventive maintenance and smarter control strategies.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-5.webp',
				imageAlt: 'Silo C dashboard with aeration turned off and its effect on crop conditions',
				imageTitle: 'Silo C state',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/c77eed60-cc6a-11f1-adf1-29dbfc808686?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SmartFarming_ViewLiveDemo',
		contactUsId: 'UseCases_SmartFarming_ContactUs',
	},
	applications: {
		title: 'Where IoT in agriculture is used',
		subtitle:
			'The same approach works across farming and related sectors.',
		applications: [
			{
				title: 'Grain & oilseed storage',
				description:
					'Monitor temperature, humidity, and gas levels in storage facilities to prevent spoilage and automate ventilation.',
				desktopImage: '/src/assets/images/usecases/smart-farming/grain-1.svg',
				imageAlt: 'Grain silo',
				imageTitle: 'Grain & oilseed storage',
			},
			{
				title: 'Viticulture & orchards',
				description:
					'Track microclimate data across vineyards and orchards to optimize irrigation, frost protection, and harvest timing.',
				desktopImage: '/src/assets/images/usecases/smart-farming/orchards-1.svg',
				imageAlt: 'Vineyard',
				imageTitle: 'Viticulture & orchards',
			},
			{
				title: 'Greenhouse farming',
				description:
					'Automated climate control in greenhouses using real-time sensor data to regulate temperature, humidity, CO\u2082, and lighting for year-round optimal growing conditions.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/agriculture-1.svg',
				imageAlt: 'Greenhouse',
				imageTitle: 'Greenhouse farming',
			},
			{
				title: 'Agri-logistics & cold chain',
				description:
					'Monitor agricultural products during transport and storage for temperature compliance and farm-to-market traceability.',
				desktopImage: '/src/assets/images/usecases/smart-farming/logistics-1.svg',
				imageAlt: 'Logistics truck',
				imageTitle: 'Agri-logistics & cold chain',
			},
			{
				title: 'Livestock farming',
				description:
					'Monitoring animal health, barn climate conditions, and feed levels in real time. Automated alerts for abnormal behavior or environmental changes help prevent losses and improve animal welfare.',
				desktopImage: '/src/assets/images/usecases/smart-farming/sheep-1.svg',
				imageAlt: 'Livestock',
				imageTitle: 'Livestock farming',
			},
		],
	},
	advantages: {
		title: 'Why ThingsBoard for smart farming',
		cards: [
			{
				icon: 'tabler:chart-bar',
				color: 'red',
				title: 'Grain silo monitoring',
				description:
					'Watch grain temperature, humidity, and crop levels in every silo on one dashboard, with a night mode for late shifts.',
				href: '/iot-hub/solution-templates/?useCases=Smart+Farming',
				linkText: 'See smart farming templates',
			},
			{
				icon: 'tabler:plug-connected',
				color: 'purple',
				title: 'Connect any farm sensor',
				description:
					'Connect sensors directly over MQTT, HTTP, or CoAP, and Modbus or OPC UA equipment through the IoT Gateway. Pre-integrated devices from the IoT Hub connect in a few steps.',
				href: '/docs/pe/user-guide/connectivity-guide/',
				linkText: 'Learn more about connectivity',
			},
			{
				icon: 'tabler:wifi',
				color: 'red',
				title: 'LoRaWAN for remote fields',
				description:
					'Bring in battery-powered field sensors from a LoRaWAN or NB-IoT network. LoRaWAN servers such as TTN, ChirpStack, and Actility connect through ready integrations.',
				href: '/docs/pe/user-guide/integrations/',
				linkText: 'Learn more about integrations',
			},
			{
				icon: 'tabler:circuit-bulb',
				color: 'green',
				title: 'Spoilage alerts and automation',
				description:
					'Set alarm rules for rising silo temperature or low soil moisture, and start aeration or irrigation automatically.',
				href: '/docs/pe/user-guide/rule-engine/',
				linkText: 'Learn more about data processing',
			},
		],
	},
	faq: [
		{
			id: 'smart-farming-faq',
			label: 'FAQ',
			items: [
				{
					id: 'how-do-you-implement-a-smart',
					question: 'How do you implement a smart farming solution?',
					answer:
						'<p>Most smart farming projects cover one or more of these areas: grain and produce storage, greenhouse climate, field irrigation, livestock, and farm equipment. ThingsBoard gives you the same building blocks for each of them. You connect sensors and controllers, model fields, greenhouses, and silos as assets, set alarm rules for the conditions that cost you money, and build dashboards for the people who respond to them. Rules can also act on their own, for example start aeration when grain gets too warm, and the <a href="/docs/mobile/pe/">mobile app</a> keeps staff informed in the field. We recommend starting with one site and one problem, such as grain spoiling in storage, and growing from there. If you’d rather not start from scratch, <a href="/iot-hub/solution-templates/?useCases=Smart+Farming">smart farming templates</a> in the IoT Hub give you a working setup to adapt.</p>',
					defaultOpen: true,
				},
				{
					id: 'how-is-iot-used-in-agriculture',
					question: 'How is IoT used in agriculture?',
					answer:
						'<p>The most common uses are monitoring grain and produce in storage, controlling greenhouse climate, watering fields based on soil moisture, and tracking livestock and equipment. In each case, sensors send readings to a platform like ThingsBoard, which stores the data, raises alarms, and shows it on dashboards. For watering, see <a href="/use-cases/smart-irrigation/">smart irrigation</a>.</p>',
				},
				{
					id: 'which-sensors-and-devices-can-i',
					question: 'Which sensors and devices can I connect?',
					answer:
						'<p>Typical sensors measure temperature, humidity, soil moisture, and grain or liquid levels. They connect directly over MQTT, HTTP, or CoAP, through the ThingsBoard IoT Gateway for industrial protocols such as Modbus and OPC UA, from a LoRaWAN or NB-IoT network, or via a platform integration. You can pick pre-integrated devices in the <a href="/iot-hub/">IoT Hub</a> and use emulators while the hardware isn’t ready. Details are in the <a href="/docs/pe/user-guide/connectivity-guide/">connectivity guide</a>.</p>',
				},
				{
					id: 'can-i-monitor-farms-where-there',
					question: 'Can I monitor farms where there is no Wi-Fi?',
					answer:
						'<p>Yes. Battery-powered sensors on LoRaWAN or NB-IoT networks send data over long distances, so you can cover remote fields and storage sites. ThingsBoard receives the data from the network server through a <a href="/docs/pe/user-guide/integrations/">platform integration</a>.</p>',
				},
				{
					id: 'can-your-team-build-a-smart',
					question: 'Can your team build a smart farming solution for us?',
					answer:
						'<p>Yes. Our team builds custom solutions on ThingsBoard, from a proof of concept to production. Agricultural companies such as <a href="/case-studies/agrolog/">Supertech Agroline</a> and <a href="/case-studies/keners/">Keners</a> run their farming platforms on ThingsBoard. Tell us about your sites and devices through the <a href="/contact-us/?subject=Custom+Development+Service">contact form</a>.</p>',
				},
			],
		},
	],
	summary: {
		title: 'Smart farming with ThingsBoard in short',
		text: 'Smart farming with ThingsBoard offers a complete end-to-end IoT solution for agricultural operations. From field to storage, it unifies device connectivity, real-time analytics, control systems, and user-friendly dashboards. By adopting this solution, agri-businesses can boost productivity, ensure compliance, minimize losses, and gain full transparency over their entire value chain.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
