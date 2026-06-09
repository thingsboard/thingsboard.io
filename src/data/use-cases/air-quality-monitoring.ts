import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Air quality monitoring solution',
	pageTitle: 'Urban & Industrial Air Monitoring with IoT and Dashboards',
	description:
		'Monitor, analyze, and act on air quality in real time with ThingsBoard — the flexible IoT platform for cities, industries, and research.',
	pageSlug: 'air-quality-monitoring',
	about: {
		shortText:
			'Urban areas, industrial districts, and high-traffic zones constantly battle air pollution — a critical issue that affects both public health and regulatory compliance. From fine particulate matter (PM2.5, PM10) to harmful gases like SO₂ and CO, monitoring these environmental threats requires a robust and responsive system. ThingsBoard rises to this challenge with unmatched flexibility and reliability.',
		longText: [
			'The ThingsBoard IoT platform is purpose-built to address this challenge with its scalable architecture, multi-protocol support (MQTT, HTTP, CoAP, LwM2M), and powerful rule engine. It seamlessly connects distributed air quality sensors, ensures secure and reliable data ingestion, and enables real-time analytics and alarming across large deployments.',
			'With its customizable dashboards, flexible data visualization tools, and low-code rule configuration, ThingsBoard empowers organizations to deploy air quality monitoring systems faster, manage them efficiently, and respond to environmental changes proactively. Whether for smart cities, industrial compliance, or community health initiatives, ThingsBoard delivers the performance and adaptability needed to take control of air quality.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/ec564620-82b2-11ed-a624-8360a2a6cb0e?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_AirQM_ViewLiveDemo',
	},
	solutionStructure: {
		title: 'Solution structure of air quality monitoring',
		shortText:
			'An <a href="/docs/pe/recipes/solution-templates/air-quality-monitoring/">air quality monitoring solution</a> powered by ThingsBoard consists of IoT sensors that collect real-time data on pollutants such as PM2.5, PM10, CO, SO₂, NO₂, and O₃. These devices transmit telemetry to the platform via industry-standard communication protocols, including MQTT, HTTP/HTTPS, CoAP, and LwM2M — enabling flexible integration across sectors.',
		longText: [
			'Once received by ThingsBoard, the data is processed, stored in a time-series database, and visualized via interactive dashboards. Custom rule chains allow the generation of automated alarms when AQI thresholds are breached or sensor battery levels drop below critical levels.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Air quality monitoring solution architecture',
		schemeCaption:
			'Air quality monitoring solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Air quality monitoring dashboard structure',
		subtitle:
			'The air quality monitoring solution in ThingsBoard is built on a modular dashboard structure that serves both public and administrative needs. Each dashboard is composed of configurable widgets, real-time data streams, map overlays, and interactive filters — all powered by ThingsBoard’s flexible dashboard engine.',
		panels: [
			{
				title: 'Public dashboard: citywide AQI map state',
				description:
					'Displays all sensor locations with live AQI values. Colored markers reflect pollution levels using EPA standards. Clicking on a location shows its historical AQI trend. This interface makes data easily accessible to users (citizens and city officials) for transparent decision-making.',
				image: '/src/assets/images/usecases/air-quality/aiq-1.webp',
				imageAlt: 'Interactive map showing air quality monitoring stations with AQI indicators',
			},
			{
				title: 'Particulate matter insights: PM10, PM2.5, and more',
				description:
					'Detailed popup with pollutant-specific graphs, current and average levels, and health impact descriptions. These insights allow environmental analysts to evaluate pollutant behavior throughout the day.',
				image: '/src/assets/images/usecases/air-quality/aiq-2.webp',
				imageAlt: 'Individual station dashboard with pollutant readings and trend charts',
			},
			{
				title: 'Dashboard list: access management ',
				description:
					'Displays all available dashboards: public for general visibility and administrative for sensor configuration. Separation of access ensures operational control while maintaining public transparency.',
				image: '/src/assets/images/usecases/air-quality/aiq-3.webp',
				imageAlt: 'Historical air quality data charts with configurable time ranges',
			},
			{
				title: 'Admin dashboard: sensor status and map overview state',
				description:
					'The administrator panel shows sensor connectivity, battery status, last AQI readings, and geolocation. This enables rapid identification of sensor issues or local air quality anomalies.',
				image: '/src/assets/images/usecases/air-quality/aiq-4.webp',
				imageAlt: 'Air quality alarm management interface with threshold violations',
			},
			{
				title: 'Sensor detail view state',
				description:
					'Shows real-time values for each pollutant, battery trend, historical connection status, and location on the map. It supports deep technical analysis and validation of specific sensor performance.',
				image: '/src/assets/images/usecases/air-quality/aiq-5.webp',
				imageAlt: 'Comparative view of multiple monitoring stations with side-by-side data',
			},
			{
				title: 'Add sensor interface',
				description:
					'Simple form for registering new sensors with ID, label, and coordinates. This supports fast expansion of the network without any development effort.',
				image: '/src/assets/images/usecases/air-quality/aiq-6.webp',
				imageAlt: 'Environmental parameters dashboard with weather and atmospheric data',
			},
			{
				title: 'Alarm rule configuration',
				description:
					'Rule editor for triggering alarms based on battery level or lost connectivity. Enables proactive maintenance and ensures data reliability over time.',
				image: '/src/assets/images/usecases/air-quality/aiq-7.webp',
				imageAlt: 'Aggregated AQI trends and regulatory compliance reporting dashboard',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/ec564620-82b2-11ed-a624-8360a2a6cb0e?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_AirQM_ViewLiveDemo',
		contactUsId: 'UseCases_AirQM_ContactUs',
	},
	applications: {
		title: 'Applications of air quality monitoring solution',
		subtitle:
			'IoT-based air quality monitoring with ThingsBoard can be deployed across diverse environments where understanding and managing air pollution is critical for health, compliance, and operational efficiency.',
		applications: [
			{
				title: 'Smart cities',
				description:
					'ThingsBoard enables city authorities to deploy scalable sensor networks and automate air quality alarms, helping protect public health and enforce clean air regulations in real time.',
				desktopImage: '/src/assets/images/usecases/air-quality/cities-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/cities-2.svg',
				imageAlt: 'Smart city',
				imageTitle: 'Smart cities',
			},
			{
				title: 'Industrial zones',
				description:
					'Manufacturers use ThingsBoard to monitor emissions through customizable dashboards and rule-based automation, ensuring regulatory compliance and minimizing environmental risks.',
				desktopImage: '/src/assets/images/usecases/air-quality/industrial-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/industrial-2.svg',
				imageAlt: 'Industrial zone',
				imageTitle: 'Industrial zones',
			},
			{
				title: 'Transportation & logistics',
				description:
					'Air quality tracking near highways, ports, and airports to assess environmental impact and meet regulations.',
				desktopImage: '/src/assets/images/usecases/air-quality/logistics-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/logistics-2.svg',
				imageAlt: 'Transportation',
				imageTitle: 'Transportation & logistics',
			},
			{
				title: 'Education & research',
				description:
					"Academic institutions benefit from ThingsBoard's real-time data visualization and open API, integrating environmental data into curriculum, research projects, and citizen science initiatives.",
				desktopImage: '/src/assets/images/usecases/air-quality/education-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/education-2.svg',
				imageAlt: 'Education',
				imageTitle: 'Education & research',
			},
			{
				title: 'Real estate development',
				description:
					"Developers leverage ThingsBoard's remote monitoring, public dashboards, and analytics to showcase air quality metrics as a selling point for eco-friendly properties.",
				desktopImage: '/src/assets/images/usecases/air-quality/development-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/development-2.svg',
				imageAlt: 'Real estate',
				imageTitle: 'Real estate development',
			},
		],
	},
	summary: {
		title: 'Summary of air quality monitoring',
		text: 'ThingsBoard’s air quality monitoring solution offers a scalable, real-time IoT-based platform for environmental intelligence. It connects pollution sensors with cloud dashboards, alarms, and data storage to empower cities, industries, and institutions to act on air quality insights. Its flexibility, open protocol support, and customizable visualization make it ideal for public health, regulatory compliance, and green initiatives.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
