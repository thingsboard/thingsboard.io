import type { UseCaseData } from './types';

export const airQualityMonitoringData: UseCaseData = {
	title: 'Air quality monitoring solution',
	pageTitle: 'Urban & Industrial Air Monitoring with IoT and Dashboards',
	description:
		'Monitor, analyze, and act on air quality in real time with ThingsBoard — the flexible IoT platform for cities, industries, and research.',
	pageSlug: 'air-quality-monitoring',
	about: {
		shortText:
			'Urban areas, industrial districts, and transportation corridors face increasing pressure to monitor and manage air quality. Poor air quality affects public health, regulatory compliance, and quality of life. IoT-based air quality monitoring with ThingsBoard provides real-time visibility into pollutant levels, enabling proactive decision-making and timely interventions.',
		longText: [
			'ThingsBoard supports a wide range of air quality sensors and communication protocols, making it easy to deploy monitoring stations across cities, industrial zones, and indoor environments. Data from particulate matter (PM2.5, PM10), CO2, NO2, SO2, ozone, and VOC sensors is collected, processed, and visualized in real time on interactive dashboards.',
			"The platform's rule engine enables automated alerting when pollutant levels exceed predefined thresholds, triggering notifications to authorities, facility managers, or the public. Historical data analysis supports trend identification, regulatory reporting, and evidence-based urban planning. With ThingsBoard, organizations can build scalable air quality monitoring networks that grow from a single station to thousands of sensors across an entire region.",
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/ec564620-82b2-11ed-a624-8360a2a6cb0e?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_AirQM_ViewLiveDemo',
	},
	solutionStructure: {
		title: 'Solution structure of air quality monitoring use case',
		shortText:
			'The air quality monitoring solution connects outdoor and indoor sensor stations to the ThingsBoard platform via IoT gateways. Sensors measure key pollutants and environmental parameters, transmitting data through MQTT, CoAP, or HTTP protocols. You may find the detailed solution setup guide in our <a href="/docs/pe/solution-templates/air-quality-monitoring/">air quality monitoring solution template</a> documentation.',
		longText: [
			'At the sensor level, monitoring stations equipped with gas and particulate sensors collect real-time measurements of PM2.5, PM10, CO2, NO2, ozone, temperature, and humidity. These stations can be deployed on street poles, building rooftops, or inside facilities.',
			'The ThingsBoard rule engine processes incoming data streams, calculating air quality indices (AQI), detecting threshold violations, and routing alerts to relevant stakeholders. Geospatial dashboards display sensor locations on interactive maps with color-coded status indicators.',
			'Historical data storage enables long-term trend analysis, seasonal pattern recognition, and regulatory compliance reporting. The solution supports multi-tenant deployment, allowing cities to share infrastructure while maintaining data isolation between departments and organizations.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of air quality monitoring solution',
		subtitle:
			'The live dashboard provides a comprehensive view of air quality data collected from multiple monitoring stations. Users can explore real-time measurements, historical trends, and alarm statuses through an intuitive drill-down interface.',
		panels: [
			{
				title: 'Air quality map overview',
				description:
					'The top-level dashboard displays an interactive map with all monitoring stations marked by color-coded indicators. Each station shows its current AQI status — green for good, yellow for moderate, orange for unhealthy for sensitive groups, and red for unhealthy. Clicking on a station reveals detailed readings.',
				image: '/src/assets/images/usecases/air-quality/aiq-1.webp',
				imageAlt: 'Interactive map showing air quality monitoring stations with AQI indicators',
			},
			{
				title: 'Station detail dashboard',
				description:
					'A detailed view of an individual monitoring station displaying real-time measurements for PM2.5, PM10, CO2, NO2, ozone, temperature, and humidity. Gauges and trend charts provide immediate insight into current conditions and recent changes.',
				image: '/src/assets/images/usecases/air-quality/aiq-2.webp',
				imageAlt: 'Individual station dashboard with pollutant readings and trend charts',
			},
			{
				title: 'Historical data analysis',
				description:
					'This panel provides historical charts for all monitored parameters over configurable time ranges. Users can compare data across days, weeks, or months to identify seasonal patterns, correlate pollution events with weather conditions, and generate compliance reports.',
				image: '/src/assets/images/usecases/air-quality/aiq-3.webp',
				imageAlt: 'Historical air quality data charts with configurable time ranges',
			},
			{
				title: 'Alarm management dashboard',
				description:
					'A centralized alarm view listing all threshold violations across the monitoring network. Each alarm includes the station name, parameter, measured value, threshold, severity, and timestamp. Operators can acknowledge, clear, or escalate alarms directly from this interface.',
				image: '/src/assets/images/usecases/air-quality/aiq-4.webp',
				imageAlt: 'Air quality alarm management interface with threshold violations',
			},
			{
				title: 'Comparative analysis view',
				description:
					'Side-by-side comparison of air quality data from multiple stations, enabling users to identify pollution hotspots, assess the impact of industrial activity on nearby residential areas, and evaluate the effectiveness of mitigation measures.',
				image: '/src/assets/images/usecases/air-quality/aiq-5.webp',
				imageAlt: 'Comparative view of multiple monitoring stations with side-by-side data',
			},
			{
				title: 'Environmental parameters dashboard',
				description:
					'Focused view on environmental parameters including temperature, humidity, wind speed, and atmospheric pressure. These contextual measurements help correlate air quality readings with weather conditions and improve the accuracy of pollution forecasting.',
				image: '/src/assets/images/usecases/air-quality/aiq-6.webp',
				imageAlt: 'Environmental parameters dashboard with weather and atmospheric data',
			},
			{
				title: 'AQI trends and reporting',
				description:
					'A summary dashboard displaying aggregated AQI trends across the entire monitoring network. Daily, weekly, and monthly averages are presented alongside regulatory thresholds, helping administrators assess overall air quality performance and generate compliance documentation.',
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
					'City-wide pollution monitoring that delivers real-time data for urban planning and public health decisions.',
				desktopImage: '/src/assets/images/usecases/air-quality/cities-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/cities-2.svg',
				imageAlt: 'Smart city',
				imageTitle: 'Smart cities',
			},
			{
				title: 'Industrial zones',
				description:
					'Fence-line emission tracking around factories to ensure environmental compliance and community safety.',
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
					'Deploying sensor networks on campuses and research stations to collect long-term environmental data for academic studies, climate research, and student engagement programs.',
				desktopImage: '/src/assets/images/usecases/air-quality/education-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/education-2.svg',
				imageAlt: 'Education',
				imageTitle: 'Education & research',
			},
			{
				title: 'Real estate development',
				description:
					'Verified air quality data for properties that enhances value and supports green building certifications.',
				desktopImage: '/src/assets/images/usecases/air-quality/development-1.svg',
				mobileImage: '/src/assets/images/usecases/air-quality/development-2.svg',
				imageAlt: 'Real estate',
				imageTitle: 'Real estate development',
			},
		],
	},
	summary: {
		title: 'Summary of air quality monitoring solution',
		text: 'Air quality monitoring with ThingsBoard provides a scalable, real-time IoT-based platform for tracking pollutants and environmental conditions across urban, industrial, and indoor environments. Through flexible sensor integration, powerful rule engine automation, and interactive geospatial dashboards, organizations gain the visibility needed to protect public health, meet regulatory requirements, and make data-driven decisions. The platform scales from single-station deployments to city-wide monitoring networks, adapting to the needs of municipalities, industries, and research institutions alike.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
