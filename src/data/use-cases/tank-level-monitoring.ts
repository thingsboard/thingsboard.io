import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Tank level monitoring system',
	pageTitle: 'IoT Tank Level Monitoring System',
	description:
		'Monitor fuel, water, and chemical tank levels remotely. Get alerts for low levels or overflow, plan refills, and explore the live demo dashboard.',
	pageSlug: 'tank-level-monitoring',
	cta: {
		title: 'Set up tank level monitoring faster',
		text:
			'Start from a ready-made tank monitoring template in the IoT Hub, or ask our team to build a solution for your tanks, sensors, and sites.',
		buttonLabel: 'Explore tank monitoring templates',
		buttonHref: '/iot-hub/solution-templates/?useCases=Tank+Level+Monitoring',
	},
	about: {
		shortText:
			'Remote tank level monitoring tells you how much fuel, water, or chemicals are left in every tank without sending someone to check. ThingsBoard tracks volume, temperature, sensor battery, and connectivity for each tank, shows all tanks on a map, and alerts your team before a tank runs dry or overflows.',
		longText: [
			'The live demo shows your tanks on an interactive map with their current status. Open any tank to see its level history, set its shape and dimensions, and configure alarm rules, for example a low-level alert that tells the team it’s time to refill.',
			'The same setup works for fuel depots, water reservoirs, and chemical storage, from a single site to many.',
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
		title: 'How remote tank level monitoring works',
		shortText:
			'The <a href="/iot-hub/solution-templates/fuel-level-monitoring/">tank level monitoring</a> solution connects level, temperature, and battery sensors to ThingsBoard. Sensors send data directly over MQTT, HTTP, or CoAP, through the IoT Gateway for Modbus and other industrial protocols, or from LoRaWAN and NB-IoT networks, so you can mix devices from different vendors in one solution.',
		longText: [
			'Once collected, the data is transmitted to ThingsBoard for processing, aggregation, and visualization. The platform offers historical data storage, advanced alarm rule configuration, and remote device management. Incoming data is presented through interactive dashboards that display all metrics in user-friendly formats: graphs, maps, tables, and status widgets.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Tank level monitoring solution architecture',
		schemeCaption:
			'Tank level monitoring solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Tank level monitoring dashboard',
		subtitle:
			'Each panel shows data from one tank or a group of tanks. You can drill down from the map to a single tank and filter by fuel type or region.',
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
		title: 'Where tank level monitoring is used',
		applications: [
			{
				title: 'Oil & gas',
				description:
					'Enables remote monitoring of fuel tanks with automated alarms and minimal maintenance requirements.',
				desktopImage: '/src/assets/images/usecases/tank-level-monitoring/gas-1.svg',
				imageAlt: 'Oil and gas',
				imageTitle: 'Oil & gas',
			},
			{
				title: 'Logistics & transportation',
				description:
					'Tracks fuel levels in fleet tankers and depots, integrated with GPS and routing systems.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/logistics.svg',
				imageAlt: 'Logistics and transportation',
				imageTitle: 'Logistics & transportation',
			},
			{
				title: 'Agriculture',
				description:
					'Tracks water or fertilizer tank levels on farms, with location-based analysis and consumption forecasting.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/agriculture-1.svg',
				imageAlt: 'Agriculture',
				imageTitle: 'Agriculture',
			},
			{
				title: 'Manufacturing & processing',
				description:
					'Monitors chemical storage tanks for compliance and safety in industrial environments.',
				desktopImage: '/src/assets/images/usecases/tank-level-monitoring/manufacturing-1.svg',
				imageAlt: 'Manufacturing and processing',
				imageTitle: 'Manufacturing & processing',
			},
			{
				title: 'Municipal services',
				description:
					'Manages city tanks for drinking water or chemicals with centralized monitoring and regulatory reporting.',
				desktopImage: '/src/assets/images/usecases/smart-metering/utilities-1.svg',
				imageAlt: 'Municipal services',
				imageTitle: 'Municipal services',
			},
		],
	},
	advantages: {
		title: 'Why ThingsBoard for tank level monitoring',
		cards: [
			{
				icon: 'tabler:chart-bar',
				color: 'red',
				title: 'Tank levels on one map',
				description:
					'See volume, temperature, battery, and connectivity for every tank on an interactive map, from fuel depots to water reservoirs.',
				href: '/iot-hub/solution-templates/?useCases=Tank+Level+Monitoring',
				linkText: 'See tank monitoring templates',
			},
			{
				icon: 'tabler:circuit-bulb',
				color: 'green',
				title: 'Low-level and overflow alarms',
				description:
					'Configure alarm rules for each tank and plan refills before a tank runs dry or overflows.',
				href: '/docs/pe/user-guide/rule-engine/',
				linkText: 'Learn more about data processing',
			},
			{
				icon: 'tabler:plug-connected',
				color: 'purple',
				title: 'Connect any level sensor',
				description:
					'Connect level sensors directly, through the IoT Gateway, or from a LoRaWAN or NB-IoT network, and test the setup with emulators before the hardware arrives.',
				href: '/docs/pe/user-guide/connectivity-guide/',
				linkText: 'Learn more about connectivity',
			},
			{
				icon: 'tabler:device-mobile',
				color: 'purple',
				title: 'Tank status on your phone',
				description:
					'Check tank levels and respond to alarms in a mobile app built with the ThingsBoard Mobile Application Builder.',
				href: '/docs/mobile/pe/',
				linkText: 'Learn more about the mobile application',
			},
		],
	},
	faq: [
		{
			id: 'tank-level-monitoring-faq',
			label: 'FAQ',
			items: [
				{
					id: 'how-does-remote-tank-level-monitoring',
					question: 'How does remote tank level monitoring work?',
					answer:
						'<p>A level sensor on each tank measures the distance to the liquid surface or the pressure at the bottom and sends readings over a wireless network. ThingsBoard converts the readings into volume, stores the history, and raises alarms when the level crosses your thresholds.</p>',
					defaultOpen: true,
				},
				{
					id: 'can-i-monitor-fuel-tanks',
					question: 'Can I monitor fuel tanks?',
					answer:
						'<p>Yes. The <a href="/iot-hub/solution-templates/fuel-level-monitoring/">Fuel level monitoring template</a> tracks fuel volume, consumption trends, and refueling events.</p>',
				},
				{
					id: 'can-i-get-low-level-or',
					question: 'Can I get low-level or overflow alerts?',
					answer:
						'<p>Yes. You configure <a href="/docs/pe/user-guide/rule-engine/">alarm rules</a> for each tank, and notifications go out by email, SMS, Slack, Microsoft Teams, or the ThingsBoard mobile app.</p>',
				},
				{
					id: 'is-there-a-ready-made-widget',
					question: 'Is there a ready-made widget that shows how full a tank is?',
					answer:
						'<p>Yes. ThingsBoard includes tank widgets that show the fill level as a percentage or volume, and the template dashboards use them out of the box.</p>',
				},
				{
					id: 'which-level-sensors-can-i-connect',
					question: 'Which level sensors can I connect?',
					answer:
						'<p>Sensors connect directly over MQTT, HTTP, or CoAP, through the ThingsBoard IoT Gateway for Modbus and other industrial protocols, or from a LoRaWAN or NB-IoT network. You can pick pre-integrated devices in the <a href="/iot-hub/">IoT Hub</a> and test the setup with emulators before the sensors arrive. Details are in the <a href="/docs/pe/user-guide/connectivity-guide/">connectivity guide</a>.</p>',
				},
			],
		},
	],
	summary: {
		title: 'Tank level monitoring with ThingsBoard in short',
		text: 'The ThingsBoard-based tank level monitoring solution automates fluid storage monitoring for any scale or complexity. With strong support for industrial protocols, real-time visualization, rule-based alarming, and device control, it is a perfect fit for B2B enterprises, public infrastructure, and industrial environments. Enhanced transparency and timely alarms lead to improved operational efficiency and reduced costs.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
