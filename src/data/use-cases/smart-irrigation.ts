import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Smart irrigation solution',
	pageTitle: 'Smart Irrigation with ThingsBoard for Farms and Cities',
	description:
		"Optimize water usage across farms, greenhouses, and urban landscapes with ThingsBoard's smart irrigation IoT solution. Real-time soil monitoring, automated valve control, and data-driven scheduling to reduce waste and improve yields.",
	pageSlug: 'smart-irrigation',
	about: {
		shortText:
			'The global challenges of water scarcity, rising agricultural costs, and the need for sustainable farming have made smart irrigation not just a trend, but a necessity. Traditional watering systems often lack responsiveness, leading to water overuse and crop stress. Modern agriculture requires a platform that can bring automation, precision, and adaptability — exactly what ThingsBoard delivers.',
		longText: [
			'ThingsBoard IoT Platform is purpose-built to address these needs with its robust architecture, supporting seamless integration of diverse sensors, reliable data collection via MQTT, CoAP, or HTTP, and powerful real-time analytics. By enabling farmers to monitor soil conditions, receive threshold-based alarms, and automate irrigation actions through intuitive rule chains, ThingsBoard ensures optimal water distribution and timely response to changing field conditions.',
			'From small farms to enterprise-scale agricultural operations, ThingsBoard scales effortlessly thanks to its edge computing capabilities, multi-tenant model, and rich dashboard customization. It empowers agribusinesses to implement smart irrigation that not only conserves water and boosts yield, but also reduces manual labor, improves traceability, and aligns with long-term sustainability goals.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/a4640cc0-8fa9-11ef-baa8-4521077809fd?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SmartIrrigation_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-1.webp',
				alt: 'Satellite view of crop fields with real-time moisture levels and chart in ThingsBoard',
				title: 'Soil moisture monitoring for wheat and corn fields using ThingsBoard',
				width: 1302,
				height: 699,
			},
			{
				src: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-2.webp',
				alt: 'Field configuration form for setting crop type and moisture range in ThingsBoard',
				title: 'Add a new field and define crop type and soil moisture thresholds',
				width: 1302,
				height: 699,
			},
			{
				src: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-4.webp',
				alt: 'Dashboard showing irrigation status, alarms, field map, and moisture statistics in ThingsBoard',
				title: 'Irrigation and soil monitoring dashboard for smart agriculture',
				width: 1302,
				height: 699,
			},
			{
				src: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-7.webp',
				alt: 'Active and cleared alarms for soil moisture and battery levels in ThingsBoard',
				title: 'View and manage critical alerts from field sensors in the irrigation system',
				width: 1302,
				height: 699,
			},
		],
	},
	solutionStructure: {
		title: 'Solution structure of smart irrigation',
		shortText:
			'In the <a href="/iot-hub/solution-templates/smart-irrigation/">smart irrigation solution template</a> setup, soil moisture sensors and water meters are installed in each field zone. These devices continuously collect real-time environmental data such as moisture level, temperature, and water flow. The data is transmitted via lightweight and reliable communication protocols such as MQTT, CoAP, or HTTP directly to the ThingsBoard platform.',
		longText: [
			'Once received, data is processed by ThingsBoard’s rule engine, stored, and visualized on dashboards. If thresholds are exceeded—like low soil moisture—the platform can automatically trigger irrigation or notify personnel, ensuring timely response and water efficiency.',
			'With flexible device provisioning, edge processing, and a multi-tenant architecture, ThingsBoard scales seamlessly from small farms to enterprise operations, supporting both manual oversight and fully automated control.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Smart irrigation solution architecture',
		schemeCaption:
			'Smart irrigation solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Smart irrigation dashboard structure',
		subtitle:
			'The smart irrigation dashboard on ThingsBoard provides a clear, real-time view of irrigation processes. It includes map-based tracking, sensor panels, scheduling tools, and alarm systems—enabling fast decisions, automation, and efficient water use across varied field conditions.',
		panels: [
			{
				title: 'Field overview dashboard state',
				description:
					'This high-level map displays all monitored fields and their average moisture levels in real time. It includes interactive polygons that represent specific fields, labeled with crop types and live sensor values. This allows operators to instantly assess field health. Visualizing field data geographically accelerates decision-making and localizes issues within seconds.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-1.webp',
				imageAlt:
					'Interactive field map showing irrigation zones with moisture and status indicators',
			},
			{
				title: 'Add field',
				description:
					'This interface allows users to add new fields, define crop types, and set individual soil moisture thresholds. These values are used to trigger automated irrigation actions or alarms. Custom moisture thresholds per field help tailor irrigation plans to specific crop needs, increasing efficiency.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-2.webp',
				imageAlt: 'Individual zone dashboard with soil moisture, temperature, and rainfall data',
			},
			{
				title: 'Edit field',
				description:
					'Users can edit field parameters, update crop labels, and reconfigure map boundaries using a visual map editor. This ensures that geospatial information is always accurate and actionable. Accurate geolocation enhances field-specific analytics and irrigation zoning precision.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-3.webp',
				imageAlt: 'Irrigation schedule configuration with time-based and threshold-based settings',
			},
			{
				title: 'SI Field 1 dashboard with sensor data and irrigation logs',
				description:
					'Displays real-time soil moisture readings from all sensors, average moisture levels, water consumption, alarms, and detailed irrigation task logs. Combining sensor data and water logs offers a complete view for effective irrigation planning and validation.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-4.webp',
				imageAlt: 'Water consumption analytics with per-zone and per-cycle usage data',
			},
			{
				title: 'Add new sensor',
				description:
					'Quickly integrate a new sensor by assigning a name and label, seamlessly extending system coverage as your infrastructure grows. Easy sensor addition supports scalability and fast deployment across multiple zones.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-5.webp',
				imageAlt: 'Weather station data with temperature, humidity, wind, and rainfall readings',
			},
			{
				title: 'Create irrigation schedule',
				description:
					'Users can define irrigation conditions such as start time, repetition, water volume, and stop rules (e.g., water volume or duration). The system then triggers irrigation commands automatically. Automating irrigation based on real thresholds reduces human error and conserves water.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-6.webp',
				imageAlt: 'Alarm center with system alerts, equipment status, and recommended actions',
			},
			{
				title: 'Alarm monitoring panel',
				description:
					'This view aggregates all critical and warning-level alarms related to soil moisture and device health, helping users quickly react to anomalies. Centralized alarm management ensures prompt responses to avoid crop stress or system failures.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-7.webp',
				imageAlt: 'Valve and controller status dashboard with manual override controls',
			},
			{
				title: 'SI Field 2 dashboard state',
				description:
					'Similar to the first field dashboard, this view provides detailed monitoring for another crop zone (corn), showcasing ThingsBoard’s multi-field, multi-crop support. Supporting multiple field dashboards promotes centralized yet granular monitoring for large-scale operations.',
				image: '/src/assets/images/usecases/smart-irrigation/smart-irrigation-8.webp',
				imageAlt: 'Historical irrigation performance report with efficiency metrics and trends',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/a4640cc0-8fa9-11ef-baa8-4521077809fd?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SmartIrrigation_ViewLiveDemo',
		contactUsId: 'UseCases_SmartIrrigation_ContactUs',
	},
	applications: {
		title: 'Applications of smart irrigation solution',
		subtitle:
			'Smart irrigation powered by ThingsBoard can be deployed across a wide range of agricultural, municipal, and commercial environments where efficient water management is essential.',
		applications: [
			{
				title: 'Precision agriculture',
				description:
					'Covers the need for data-driven water management by providing real-time moisture analytics, alarming, and automated irrigation, improving crop yield while reducing resource waste.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/agriculture-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/agriculture-2.svg',
				imageAlt: 'Farm field',
				imageTitle: 'Precision agriculture',
			},
			{
				title: 'Municipal parks & landscaping',
				description:
					'Solves the challenge of wide-area water efficiency by offering centralized dashboard control, alarm notifications, and device management for public green spaces.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/greenhouse-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/greenhouse-2.svg',
				imageAlt: 'Park',
				imageTitle: 'Municipal parks & landscaping',
			},
			{
				title: 'Agri-Tech research & experimental farms',
				description:
					'Meets the need for accurate environmental data collection and testing flexibility by enabling detailed telemetry tracking, custom rule chains, and rapid integration of new devices.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/parks-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/parks-2.svg',
				imageAlt: 'Research farm',
				imageTitle: 'Agri-Tech research & experimental farms',
			},
			{
				title: 'Smart greenhouses',
				description:
					'Fulfills the demand for microclimate-based watering by supporting multi-zone sensor management and conditional scheduling, ensuring healthy plant growth with minimal manual intervention.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/fields-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/fields-2.svg',
				imageAlt: 'Greenhouse',
				imageTitle: 'Smart greenhouses',
			},
			{
				title: 'Golf courses & sports fields',
				description:
					'Addresses the requirement for uniform turf quality with zone-specific moisture monitoring, historical analytics, and rule-based irrigation triggers to maintain optimal soil conditions.',
				desktopImage: '/src/assets/images/usecases/smart-irrigation/research-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-irrigation/research-2.svg',
				imageAlt: 'Golf course',
				imageTitle: 'Golf courses & sports fields',
			},
		],
	},
	summary: {
		title: 'Summary of smart irrigation',
		text: 'The smart irrigation solution built on ThingsBoard empowers users to manage irrigation processes intelligently, reduce water waste, and maintain crop health with precision. Leveraging real-time data collection, powerful automation, and rich visualizations, it enables scalable deployments across diverse sectors—from agriculture to urban landscapes. With its flexible architecture and low-code configurability, the solution can be rapidly deployed, customized, and expanded as needs grow.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
