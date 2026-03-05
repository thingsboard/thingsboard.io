import type { UseCaseData } from './types';

export const smartFarmingData: UseCaseData = {
	title: 'Smart farming & IoT agriculture solution',
	pageTitle: 'Smart Farming with ThingsBoard: Scalable IoT for Agriculture',
	description:
		'Smart farming IoT solution powered by ThingsBoard. Real-time monitoring, automation, and analytics for crops, silos, and climate control. Ideal for agriculture, logistics, and agritech businesses.',
	pageSlug: 'smart-farming',
	about: {
		shortText:
			'Modern agriculture is undergoing a digital transformation driven by the need for sustainability, efficiency, and resilience. Farmers and agricultural enterprises face increasing pressure to optimize yield, reduce resource consumption, and mitigate risks related to climate and storage. ThingsBoard easily handles this task by providing real-time data collection, automation, and intuitive visualization tailored for smart farming needs.',
		longText: [
			'The ThingsBoard platform enables seamless integration of soil sensors, weather stations, climate controllers, and storage monitoring devices into a unified IoT ecosystem. With support for MQTT, CoAP, HTTP, and LwM2M protocols, as well as LoRaWAN and NB-IoT integrations, it accommodates both field-deployed and facility-based devices across large agricultural operations.',
			'From crop monitoring and irrigation automation to silo climate control and livestock tracking, ThingsBoard gives farmers and agritech companies full control over their assets. Interactive dashboards, configurable rule chains, and real-time alerting ensure that critical events are detected and acted upon instantly — reducing losses, improving yields, and driving operational excellence.',
		],
		demoUrl:
			'https://demo.thingsboard.io/dashboard/1f9828d0-058e-11e7-87f7-bb0136cc33d0?publicId=963ab470-34c9-11e7-a7ce-bb0136cc33d0',
		demoButtonId: 'UseCases_SmartFarming_ViewLiveDemo',
	},
	overview: {
		type: 'comparison',
		baseImage: '/src/assets/images/usecases/smart-farming/smart-farming-2.webp',
		overlayImage: '/src/assets/images/usecases/smart-farming/smart-farming-1.webp',
	},
	solutionStructure: {
		title: 'Solution structure of smart farming use case',
		shortText:
			'Field sensors, weather stations, and storage monitors transmit data to ThingsBoard using IoT protocols like MQTT, CoAP, and HTTP, or via integrations with LoRaWAN servers and other platforms.',
		longText: [
			'The built-in rule engine processes incoming telemetry in real time, evaluating thresholds for soil moisture, temperature, humidity, and other critical parameters. Automated actions such as irrigation triggers, ventilation adjustments, and alarm notifications are executed without manual intervention.',
			'All collected data is visualized through customizable dashboards, giving farmers and operators clear insights into crop conditions, storage environments, and equipment performance — all in real time, from a single interface.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of smart farming solution',
		subtitle:
			'The live dashboard displays real-time data from agricultural sensors and controllers. Collected data is processed via the rule engine to automate actions and raise alarms on certain thresholds.',
		panels: [
			{
				title: 'Farm overview state',
				description:
					'The main dashboard provides a comprehensive view of the entire farming operation, displaying field conditions, storage status, and active alarms on an interactive map. Operators can monitor soil moisture, temperature, and humidity across all zones from a single interface.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-1.webp',
				imageAlt:
					'Farm overview dashboard with field conditions and storage status on interactive map',
				imageTitle:
					'ThingsBoard smart farming dashboard showing real-time field conditions, storage status, and active alarms',
			},
			{
				title: 'Crop monitoring state',
				description:
					'Detailed view of individual crop zones with real-time soil moisture, temperature, and light intensity readings. Historical trend charts help identify patterns and optimize irrigation schedules for maximum yield.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-2.webp',
				imageAlt: 'Crop monitoring dashboard with soil moisture and temperature data',
				imageTitle:
					'Real-time crop monitoring with soil moisture, temperature, and light intensity trends',
			},
			{
				title: 'Silo climate control state',
				description:
					'Monitoring and controlling climate conditions inside grain silos, including temperature, humidity, and CO\u2082 levels. Automated ventilation and drying systems are triggered based on configurable thresholds to prevent spoilage.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-3.webp',
				imageAlt: 'Silo climate control dashboard with temperature and humidity monitoring',
				imageTitle:
					'Grain silo climate control with automated ventilation and real-time condition monitoring',
			},
			{
				title: 'Irrigation automation state',
				description:
					'This panel displays irrigation zone status, soil moisture levels, and water consumption metrics. Automated irrigation schedules can be configured based on sensor readings, weather forecasts, and crop requirements.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-4.webp',
				imageAlt: 'Irrigation automation dashboard with zone status and water consumption',
				imageTitle:
					'Smart irrigation automation with soil moisture-based scheduling and water consumption analytics',
			},
			{
				title: 'Alarm and notification state',
				description:
					'Centralized alarm management displaying all active alerts with severity levels, timestamps, and sensor origins. Farmers receive instant notifications via email or SMS for critical events such as frost warnings, equipment failures, or storage anomalies.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-5.webp',
				imageAlt: 'Alarm management panel with severity indicators and notification settings',
				imageTitle:
					'ThingsBoard alarm management for smart farming with real-time notifications and severity-based filtering',
			},
		],
		demoUrl:
			'https://demo.thingsboard.io/dashboard/1f9828d0-058e-11e7-87f7-bb0136cc33d0?publicId=963ab470-34c9-11e7-a7ce-bb0136cc33d0',
		demoButtonId: 'UseCases_SmartFarming_ViewLiveDemo',
		contactUsId: 'UseCases_SmartFarming_ContactUs',
	},
	applications: {
		title: 'Applications of smart farming solution',
		subtitle:
			'The smart farming approach can be easily adapted to various agricultural and related sectors',
		applications: [
			{
				title: 'Grain & oilseed storage',
				description:
					'Monitor temperature, humidity, and gas levels in storage facilities to prevent spoilage and automate ventilation.',
				desktopImage: '/src/assets/images/usecases/smart-farming/grain-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-farming/grain-2.svg',
				imageAlt: 'Grain silo',
				imageTitle: 'Grain & oilseed storage',
			},
			{
				title: 'Viticulture & orchards',
				description:
					'Track microclimate data across vineyards and orchards to optimize irrigation, frost protection, and harvest timing.',
				desktopImage: '/src/assets/images/usecases/smart-farming/orchards-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-farming/orchards-2.svg',
				imageAlt: 'Vineyard',
				imageTitle: 'Viticulture & orchards',
			},
			{
				title: 'Greenhouse farming',
				description:
					'Automated climate control in greenhouses using real-time sensor data to regulate temperature, humidity, CO\u2082, and lighting for year-round optimal growing conditions.',
				desktopImage: '/src/assets/images/usecases/environment-monitoring/agriculture-1.svg',
				mobileImage: '/src/assets/images/usecases/environment-monitoring/agriculture-2.svg',
				imageAlt: 'Greenhouse',
				imageTitle: 'Greenhouse farming',
			},
			{
				title: 'Agri-logistics & cold chain',
				description:
					'Monitor agricultural products during transport and storage for temperature compliance and farm-to-market traceability.',
				desktopImage: '/src/assets/images/usecases/smart-farming/logistics-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-farming/logistics-2.svg',
				imageAlt: 'Logistics truck',
				imageTitle: 'Agri-logistics & cold chain',
			},
			{
				title: 'Livestock farming',
				description:
					'Monitoring animal health, barn climate conditions, and feed levels in real time. Automated alerts for abnormal behavior or environmental changes help prevent losses and improve animal welfare.',
				desktopImage: '/src/assets/images/usecases/smart-farming/sheep-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-farming/sheep-2.svg',
				imageAlt: 'Livestock',
				imageTitle: 'Livestock farming',
			},
		],
	},
	summary: {
		title: 'Summary of smart farming solution',
		text: 'ThingsBoard provides an end-to-end IoT solution for smart farming that covers everything from field monitoring and irrigation automation to silo climate control and livestock management. With scalable device integration, powerful rule-based automation, and intuitive dashboards, agricultural businesses can reduce losses, optimize resources, and make data-driven decisions — all from a single platform.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
