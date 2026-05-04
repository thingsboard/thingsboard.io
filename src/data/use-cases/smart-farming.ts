import type { UseCaseData } from './types';

export const smartFarmingData: UseCaseData = {
	title: 'Smart farming & IoT agriculture solution',
	pageTitle: 'Smart Farming with ThingsBoard: Scalable IoT for Agriculture',
	description:
		'Smart farming IoT solution on ThingsBoard — real-time monitoring, automation, and analytics for crops, silos, and climate control across agritech.',
	pageSlug: 'smart-farming',
	about: {
		shortText:
			'Modern agriculture is undergoing a digital transformation driven by the need for sustainability, efficiency, and resilience. Farmers and agricultural enterprises face increasing pressure to optimize yield, reduce resource consumption, and mitigate risks related to climate and storage. ThingsBoard easily handles this task by providing real-time data collection, automation, and intuitive visualization tailored for smart farming needs.',
		longText: [
			'ThingsBoard IoT platform empowers agricultural stakeholders with a robust, scalable solution to collect, process, and visualize environmental and operational data. Its support for multiple communication protocols and seamless device integration makes it ideal for diverse farming environments, whether remote fields, greenhouses, or storage facilities.',
			'By leveraging ThingsBoard, agribusinesses gain full control over assets and infrastructure — from temperature and humidity sensors to automated aeration systems. With real-time dashboards, rule-based alerts, and remote control features, the platform helps reduce waste, improve crop quality, and lower operational costs.',
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
		title: 'Solution structure of smart farming',
		shortText:
			'The smart farming solution powered by ThingsBoard connects IoT sensors across silos, greenhouses, and fields to gather key data like temperature, humidity, soil moisture, and crop levels. Using protocols such as MQTT, CoAP, HTTP, and Modbus, the system ensures smooth, real-time data transmission and integration with existing equipment.',
		longText: [
			'ThingsBoard processes incoming telemetry with automated rule chains that trigger alerts or control actions. Custom dashboards visualize the data through maps and charts, enabling users to monitor operations, identify issues, and respond quickly. The solution is fully scalable—from small farms to large agricultural enterprises.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Smart farming solution architecture',
		schemeCaption:
			'Smart farming solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Smart farming dashboard structure',
		subtitle:
			'Effective data visualization is critical for smart farming. ThingsBoard dashboards are designed to be intuitive, modular, and informative, helping users quickly identify anomalies and make informed decisions.',
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
					'A dark-themed version of the main dashboard \u2014 ideal for nighttime operation or low-light environments. Enhances operator focus and visibility during late-hour monitoring.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-2.webp',
				imageAlt: 'Crop monitoring dashboard with soil moisture and temperature data',
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
				imageAlt: 'Irrigation automation dashboard with zone status and water consumption',
				imageTitle: 'Silo B state',
			},
			{
				title: 'Silo C state',
				description:
					'Displays readings from a silo with aeration turned off, helping to assess impact on crop conditions. Supports preventive maintenance and smarter control strategies.',
				image: '/src/assets/images/usecases/smart-farming/smart-farming-5.webp',
				imageAlt: 'Alarm management panel with severity indicators and notification settings',
				imageTitle: 'Silo C state',
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
		title: 'Summary of smart farming',
		text: 'Smart farming with ThingsBoard offers a complete end-to-end IoT solution for agricultural operations. From field to storage, it unifies device connectivity, real-time analytics, control systems, and user-friendly dashboards. By adopting this solution, agri-businesses can boost productivity, ensure compliance, minimize losses, and gain full transparency over their entire value chain.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
