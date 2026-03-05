import type { UseCaseData } from './types';

export const environmentMonitoringData: UseCaseData = {
	title: 'Environment monitoring',
	pageTitle: 'IoT Environment Monitoring solutions with ThingsBoard',
	description:
		'Discover scalable and secure IoT environment monitoring solutions with ThingsBoard. Connect multiple sensors, automate alerts, and gain real-time insights to improve safety, efficiency, and comfort across industrial, commercial, and smart building applications.',
	pageSlug: 'environment-monitoring',
	about: {
		shortText:
			'Environment monitoring plays a vital role in ensuring safety, comfort, and operational efficiency across all types of facilities — from office buildings to industrial sites. ThingsBoard is perfectly suited to address these challenges.',
		longText: [
			'ThingsBoard provides a scalable, reliable, and secure platform for <a href="/docs/pe/solution-templates/temperature-humidity-sensors/">environment monitoring</a>. With built-in support for LoRaWAN, NB-IoT, and Sigfox, it enables efficient integration of numerous low-power sensors over long distances, minimizing infrastructure complexity. The platform supports standard IoT protocols like HTTP, MQTT, CoAP, and LwM2M, making it easy to connect a wide range of devices and scale with your project.',
			'Automated features—from real-time alerts on critical changes to forwarding data into external analytics tools—ensure proactive monitoring. Intuitive dashboards, customizable logic, and seamless integrations turn raw environmental data into actionable insights, enabling smarter and faster decisions.',
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
		title: 'Solution structure of environment monitoring use case',
		shortText:
			'Sensor data is transmitted to ThingsBoard using IoT protocols like HTTP, MQTT, CoAP, and LwM2M, or via integrations with LoRaWAN servers and other platforms.',
		longText: [
			'The built-in stream processing engine instantly analyzes incoming messages, triggers events, generates alarms, and routes data to monitoring dashboards. The collected data is visualized through intuitive dashboards, giving users clear insights into alarms, and performance metrics — all in real time, from a single interface.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of environment monitoring solution',
		subtitle:
			'The live dashboard displays real-time data from environment sensors. Collected data is processed via the rule engine to raise alarms on certain thresholds.',
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
		title: 'Applications of environment monitoring solution',
		subtitle: 'The environment monitoring approach can be easily adapted to various other sectors',
		applications: [
			{
				title: 'Smart cities and urban infrastructure',
				description:
					'Monitoring air quality, noise levels, temperature, and humidity across city zones to support environment policy, alert residents, and improve urban living conditions.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/smart-cities-1.svg',
				mobileImage: '/src/assets/images/usecases/environment-monitoring/smart-cities-2.svg',
				imageAlt: 'Smart city',
				imageTitle: 'Smart cities and urban infrastructure',
			},
			{
				title: 'Healthcare and laboratory environments',
				description:
					'Maintaining sterile conditions and proper ventilation by tracking air quality, CO\u2082 levels, and temperature in sensitive medical or laboratory zones.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/laboratory-1.svg',
				mobileImage: '/src/assets/images/usecases/environment-monitoring/laboratory-2.svg',
				imageAlt: 'Laboratory',
				imageTitle: 'Healthcare and laboratory environments',
			},
			{
				title: 'Agricultural and greenhouse facilities',
				description:
					'Controlling environmental conditions in greenhouses and agricultural zones, scheduling based on occupancy, and ensuring sustainability targets are met.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/agriculture-1.svg',
				mobileImage: '/src/assets/images/usecases/environment-monitoring/agriculture-2.svg',
				imageAlt: 'Greenhouse',
				imageTitle: 'Agricultural and greenhouse facilities',
			},
			{
				title: 'Educational and research institutions',
				description:
					'Collecting long-term environment data for scientific research, campus sustainability programs, and educational use in environment studies.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/education-1.svg',
				mobileImage: '/src/assets/images/usecases/environment-monitoring/education-2.svg',
				imageAlt: 'School',
				imageTitle: 'Educational and research institutions',
			},
			{
				title: 'Warehouses and cold storage facilities',
				description:
					'Monitoring temperature, humidity, and air circulation to ensure proper storage conditions for perishable goods and pharmaceutical products.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/warehouse-1.svg',
				mobileImage: '/src/assets/images/usecases/environment-monitoring/warehouse-2.svg',
				imageAlt: 'Warehouse',
				imageTitle: 'Warehouses and cold storage facilities',
			},
		],
	},
	summary: {
		title: 'Summary of environment monitoring solution',
		text: 'The following interactive dashboard represents an environment monitoring component that you may easily embed into your IoT solution. This particular dashboard allows users to monitor temperature and humidity sensors. You may quickly adapt it to air quality or other sensors and add remote control scenarios.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
