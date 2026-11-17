import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'IoT environmental monitoring',
	pageTitle: 'IoT Environmental Monitoring',
	description:
		'Monitor indoor and outdoor environments with sensors connected over LoRaWAN, NB-IoT, MQTT, and more. Set alerts and explore the live demo dashboard.',
	pageSlug: 'environment-monitoring',
	cta: {
		title: 'Deploy environmental monitoring faster',
		text:
			'Start from ready-made environment monitoring templates, or ask our team to build a solution for your sensors and facilities.',
		button: {
			label: 'Explore environment monitoring templates',
			href: '/iot-hub/solution-templates/?useCases=Environment+Monitoring',
		},
	},
	about: {
		shortText:
			'IoT environmental monitoring keeps temperature, humidity, CO₂, and other conditions in range across offices, labs, warehouses, and outdoor sites. ThingsBoard collects readings from low-power sensors, alerts your team when a value crosses a threshold, and keeps the full history for audits and reports.',
		longText: [
			'This page covers indoor and outdoor conditions. For outdoor pollution and AQI, see <a href="/use-cases/air-quality-monitoring/">air quality monitoring</a>.',
			'At Medline Adana Hospital, <a href="/case-studies/ariot/">ARIOT</a> uses ThingsBoard and LoRaWAN sensors to keep medicine storage within safe limits.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/dfaef940-8a91-11ec-83d0-83ba2015b874?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_EnvMon_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/environment-monitoring/environment-monitoring-4.webp',
				alt: 'Temperature and humidity charts with location of Sensor T1',
				title:
					'Sensor T1 real-time readings: temperature and humidity graphs with sensor map marker',
				width: 2048,
				height: 1010,
			},
			{
				src: '/src/assets/images/usecases/environment-monitoring/environment-monitoring-2.webp',
				alt: 'Dashboard with sensor status, critical alarm, and map location of sensors',
				title:
					'ThingsBoard dashboard showing real-time sensor metrics, alarm status, and their geographic positions on the map',
				width: 2048,
				height: 1010,
			},
			{
				src: '/src/assets/images/usecases/environment-monitoring/environment-monitoring-1.webp',
				alt: 'Sensor configuration panel with thresholds and map location in ThingsBoard',
				title:
					'Editing Sensor T1: setting temperature and humidity thresholds and viewing sensor location on the map',
				width: 2048,
				height: 1010,
			},
		],
	},
	solutionStructure: {
		title: 'How IoT environmental monitoring works',
		shortText:
			'Sensors send data to ThingsBoard directly over MQTT, HTTP, CoAP, or LwM2M, from LoRaWAN, NB-IoT, or Sigfox networks, or via a platform integration with another cloud.',
		longText: [
			'The rule engine analyzes incoming messages as they arrive, raises alarms, and routes data to dashboards. Operators see alarms and performance metrics in real time from one interface.',
		],
		schemeSrc: '/src/assets/schemas/environment-monitoring.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Environmental monitoring dashboard',
		subtitle:
			'The main view lists sensors with their location on a map and their alarms. Click a sensor to see its temperature and humidity history and change its settings.',
		panels: [
			{
				title: 'Environment monitoring state',
				description:
					'Dashboard provides real-time monitoring of sensor data with interactive charts displaying metrics like temperature and humidity. The interface allows configuring alarm thresholds and sensor locations while showing active alarms with severity levels. You can analyze historical data and manage device settings.',
				image: '/src/assets/images/usecases/environment-monitoring/environment-monitoring-2.webp',
				imageAlt: 'Dashboard with sensor status, critical alarm, and map location of sensors',
				imageTitle:
					'ThingsBoard dashboard showing real-time sensor metrics, alarm status, and their geographic positions on the map',
			},
			{
				title: 'Sensor C1 monitoring state',
				description:
					'Track real-time temperature and humidity readings from Sensor C1 along with historical data from the past hour. Compare key metrics (min/max/average values) to maintain optimal environment conditions.',
				image: '/src/assets/images/usecases/environment-monitoring/environment-monitoring-3.webp',
				imageAlt: 'Temperature and humidity charts with location of Sensor C1',
				imageTitle:
					'Live monitoring of Sensor C1: temperature and humidity data alongside sensor location on the map',
			},
			{
				title: 'Sensor T1 monitoring state',
				description:
					'Track real-time temperature and humidity readings from Sensor T1 along with historical data from the past hour. Compare key metrics (min/max/average values) to maintain optimal environment conditions.',
				image: '/src/assets/images/usecases/environment-monitoring/environment-monitoring-4.webp',
				imageAlt: 'Temperature and humidity charts with location of Sensor T1',
				imageTitle:
					'Sensor T1 real-time readings: temperature and humidity graphs with sensor map marker',
			},
			{
				title: 'Add or edit sensor',
				description:
					"You can configure Sensor's critical thresholds including high temperature and low humidity alarms. Precise geolocation can be modified via latitude/longitude coordinates. All changes remain pending until confirmed with the Save button. The Cancel option reverts any unsaved modifications to previous settings.",
				image: '/src/assets/images/usecases/environment-monitoring/environment-monitoring-1.webp',
				imageAlt: 'Sensor configuration panel with thresholds and map location in ThingsBoard',
				imageTitle:
					'Editing Sensor T1: setting temperature and humidity thresholds and viewing sensor location on the map',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/dfaef940-8a91-11ec-83d0-83ba2015b874?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_EnvMon_ViewLiveDemo',
		contactUsId: 'UseCases_EnvMon_ContactUs',
	},
	applications: {
		title: 'Where environmental monitoring is used',
		subtitle:
			'Cities, labs, farms, schools, and warehouses use environmental monitoring for safety, compliance, and comfort.',
		applications: [
			{
				title: 'Smart cities and urban infrastructure',
				description:
					'Monitoring air quality, noise levels, temperature, and humidity across city zones to support environmental policy, alert residents, improve urban living conditions.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/smart-cities-1.svg',
				imageAlt: 'Smart city',
				imageTitle: 'Smart cities and urban infrastructure',
			},
			{
				title: 'Healthcare and laboratory environments',
				description:
					'Maintaining sterile conditions and proper ventilation by tracking air quality, CO\u2082 levels, and temperature in sensitive medical or laboratory zones.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/laboratory-1.svg',
				imageAlt: 'Laboratory',
				imageTitle: 'Healthcare and laboratory environments',
			},
			{
				title: 'Agricultural and greenhouse facilities',
				description:
					'Controlling environmental conditions in greenhouses and agricultural zones, scheduling based on occupancy, and ensuring sustainability targets are met.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/agriculture-1.svg',
				imageAlt: 'Greenhouse',
				imageTitle: 'Agricultural and greenhouse facilities',
			},
			{
				title: 'Educational and research institutions',
				description:
					'Collecting long-term environmental data for scientific research, campus sustainability programs, and educational use in environmental studies.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/education-1.svg',
				imageAlt: 'School',
				imageTitle: 'Educational and research institutions',
			},
			{
				title: 'Warehouses and cold storage facilities',
				description:
					'Monitoring temperature, humidity, and air circulation to ensure proper storage conditions for perishable goods and pharmaceutical products.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/warehouse-1.svg',
				imageAlt: 'Warehouse',
				imageTitle: 'Warehouses and cold storage facilities',
			},
		],
	},
	advantages: {
		title: 'Why ThingsBoard for environmental monitoring',
		cards: [
			{
				icon: 'tabler:wifi',
				color: 'red',
				title: 'Low-power sensor networks',
				description:
					'Connect battery-powered sensors from LoRaWAN, NB-IoT, or Sigfox networks, or directly over MQTT, HTTP, CoAP, and LwM2M.',
				href: '/docs/pe/user-guide/integrations/',
				linkText: 'Learn more about integrations',
			},
			{
				icon: 'tabler:circuit-bulb',
				color: 'green',
				title: 'Alerts for CO₂, temperature, and humidity',
				description:
					'Set alarm rules per sensor or per room type and notify the right team as soon as conditions go out of range.',
				href: '/docs/pe/user-guide/rule-engine/',
				linkText: 'Learn more about data processing',
			},
			{
				icon: 'tabler:chart-bar',
				color: 'red',
				title: 'Indoor and outdoor dashboards',
				description:
					'Show conditions on maps and floor plans, compare rooms and sites, and keep the full history for audits.',
				href: '/iot-hub/solution-templates/?useCases=Environment+Monitoring',
				linkText: 'See environment monitoring templates',
			},
			{
				icon: 'tabler:shield',
				color: 'blue',
				title: 'Data you can audit',
				description:
					'Role-based access control and audit logs show who viewed and changed data, which matters for labs and regulated facilities.',
				href: '/trust-center/',
				linkText: 'Visit the Trust Center',
			},
		],
	},
	faq: [
		{
			id: 'environment-monitoring-faq',
			label: 'FAQ',
			items: [
				{
					id: 'what-is-iot-environmental-monitoring',
					question: 'What is IoT environmental monitoring?',
					answer:
						'<p>Sensors measure conditions such as temperature, humidity, CO₂, or noise and send readings to a platform automatically. The platform stores the data, shows it on dashboards, and alerts people when conditions go out of range. For outdoor pollution, see <a href="/use-cases/air-quality-monitoring/">air quality monitoring</a>.</p>',
					defaultOpen: true,
				},
				{
					id: 'can-i-set-an-alert-when',
					question: 'Can I set an alert when CO₂, humidity, or temperature crosses a threshold?',
					answer:
						'<p>Yes. Alarm rules work per sensor or per sensor type, and notifications go out by email, SMS, Slack, Microsoft Teams, or the mobile app.</p>',
				},
				{
					id: 'which-connectivity-options-work-for-battery',
					question: 'Which connectivity options work for battery-powered sensors?',
					answer:
						'<p>Battery-powered sensors usually connect from a LoRaWAN, NB-IoT, or Sigfox network through a <a href="/docs/pe/user-guide/integrations/">platform integration</a> with servers such as TTN, ChirpStack, and Actility. Other sensors connect directly over MQTT, HTTP, CoAP, or LwM2M. Details are in the <a href="/docs/pe/user-guide/connectivity-guide/">connectivity guide</a>.</p>',
				},
				{
					id: 'can-i-monitor-labs-and-clean',
					question: 'Can I monitor labs and clean rooms?',
					answer:
						'<p>Yes. Sensors in labs, clean rooms, and storage rooms report temperature and humidity, alarm rules flag every excursion, and the full history stays available for audits. Role-based access and audit logs show who viewed or changed the data. See the <a href="/trust-center/">Trust Center</a> for how we protect it.</p>',
				},
				{
					id: 'can-i-start-from-a-ready',
					question: 'Can I start from a ready-made dashboard?',
					answer:
						'<p>Yes. Install the <a href="/iot-hub/solution-templates/temperature-sensors/">Temperature & Humidity sensors template</a> or browse other <a href="/iot-hub/solution-templates/?useCases=Environment+Monitoring">environment monitoring templates</a>. Each one arrives with dashboards, maps, and alarms that you adapt to your sensors.</p>',
				},
			],
		},
	],
	summary: {
		title: 'Environmental monitoring with ThingsBoard in short',
		text: 'The following interactive dashboard represents an environment monitoring component that you may easily embed into your IoT solution. This particular dashboard allows users to monitor temperature and humidity sensors. You may quickly adapt it to air quality or other sensors and add remote control scenarios.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
