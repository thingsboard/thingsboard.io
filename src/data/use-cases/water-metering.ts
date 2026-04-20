import type { UseCaseData } from './types';

export const waterMeteringData: UseCaseData = {
	title: 'Water metering',
	pageTitle: 'Smart Water Metering with ThingsBoard IoT Platform',
	description:
		'Discover how ThingsBoard enables real-time water monitoring, automated alerts, and consumption analytics with a scalable IoT water metering solution for utilities, buildings, and agriculture.',
	pageSlug: 'water-metering',
	about: {
		shortText:
			'Water is one of our most critical resources, and managing its distribution and consumption is key for sustainable urban development, utility cost control, and infrastructure maintenance. For this purpose, the ThingsBoard platform is an ideal choice, offering powerful capabilities for real-time monitoring, alarms, visualization, and analytics.',
		longText: [
			'Traditional water metering methods often fall short in providing real-time data, accurate billing, and predictive maintenance insights. By leveraging connected sensors and intelligent dashboards, organizations can unlock powerful insights into water usage, detect anomalies like leaks, and automate alarm systems. At the core of these solutions is ThingsBoard, a flexible IoT platform enabling the collection, processing, and visualization of telemetry data from water meters in real time.',
			'This ThingsBoard-powered <a href="/docs/pe/recipes/solution-templates/water-metering/">water metering solution</a> provides complete real-time visibility into water usage, instant response to anomalies, and valuable analytics for long-term infrastructure planning. Scalable across municipalities, residential complexes, and commercial facilities, it offers a powerful tool for smart and efficient water resource management.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/aff5f200-8b48-11ec-a344-c767c1ab1bb8?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_WaterMeter_ViewLiveDemo',
	},
	solutionStructure: {
		title: 'Solution structure of water metering use case',
		shortText:
			'ThingsBoard seamlessly integrates with IoT-enabled water meters that collect real-time data on consumption, temperature, and battery level, sending it over wireless networks such as LoRaWAN, NB-IoT, and LTE for processing.',
		longText: [
			'The platform stores this data, applies intelligent rules to trigger alerts, and visualizes everything through intuitive dashboards for immediate operational insights.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of water metering solution',
		subtitle:
			'The live dashboard displays real-time data from several smart water meters collected using ThingsBoard. Collected data is processed via the rule engine to raise alarms on certain thresholds.',
		panels: [
			{
				title: 'Total overview state',
				description:
					'This view provides a real-time snapshot of system-wide metrics, such as total water consumed in the current week, active/inactive device counts, and any low battery alerts. An interactive map shows meter locations, while bar charts and alarm lists offer instant visibility into daily usage and critical threshold breaches.',
				image: '/src/assets/images/usecases/water-metering/water-metering-1.webp',
				imageAlt:
					'IoT water monitoring dashboard with real-time meter data, consumption chart, and alert notifications',
				imageTitle:
					'IoT-based smart water metering dashboard for real-time monitoring and consumption analytics',
			},
			{
				title: 'Analytics state',
				description:
					'Designed for trend analysis, this state allows users to compare historical and current water consumption patterns over the week. It helps identify usage spikes or efficiency improvements by showing data from both the present and the previous intervals.',
				image: '/src/assets/images/usecases/water-metering/water-metering-2.webp',
				imageAlt:
					'ThingsBoard IoT dashboard for water metering with real-time consumption graph, smart devices, and meter analytics',
				imageTitle: 'Smart water consumption tracking with ThingsBoard IoT platform',
			},
			{
				title: 'Devices state',
				description:
					'This dashboard displays all registered water meters with essential metadata like latest readings, status, and leak detection. Users can manage device information, monitor their real-time performance, and quickly respond to technical issues. Additionally, this view allows users to add new devices, edit existing device details, change geolocation parameters, and configure alarm thresholds.',
				image: '/src/assets/images/usecases/water-metering/water-metering-6.webp',
				imageAlt:
					'ThingsBoard interface for editing smart water meter device details with active alerts and status overview',
				imageTitle:
					'Edit IoT water meter device information and monitor active consumption alarms in ThingsBoard',
			},
			{
				title: 'Customers state',
				description:
					'Each water meter is associated with a specific customer profile, allowing for individualized usage tracking and customer service. The dashboard enables administrators to add or update customer contact details and manage meter assignments.',
				image: '/src/assets/images/usecases/water-metering/water-metering-7.webp',
				imageAlt:
					'ThingsBoard customer management interface displaying smart water metering clients with contact details',
				imageTitle: 'Manage smart water metering customers in ThingsBoard',
			},
			{
				title: 'Alarms state',
				description:
					'This critical interface aggregates all triggered alarms with timestamps, originators, and severity levels. Operators can quickly acknowledge or dismiss alerts, ensuring rapid incident response and system reliability.',
				image: '/src/assets/images/usecases/water-metering/water-metering-4.webp',
				imageAlt:
					'IoT water metering dashboard with critical alerts for exceeded consumption thresholds',
				imageTitle: 'ThingsBoard IoT platform showing critical smart meter alerts',
			},
			{
				title: 'Settings state',
				description:
					'Here, administrators configure alarm thresholds (e.g., daily/weekly consumption, battery level) and notification preferences. The system supports both email and SMS alerts to ensure stakeholders are promptly informed.',
				image: '/src/assets/images/usecases/water-metering/water-metering-5.webp',
				imageAlt:
					'ThingsBoard alarm configuration panel showing system thresholds and notification settings',
				imageTitle: 'Configure smart alarm thresholds and notification channels in ThingsBoard',
			},
			{
				title: 'Individual device dashboards',
				description:
					'Each device has its own dedicated view showing granular consumption data by hour, daily/weekly totals, and battery health. It includes editable location mapping and detailed metadata, enabling localized control and diagnostics.',
				image: '/src/assets/images/usecases/water-metering/water-metering-3.webp',
				imageAlt:
					'Detailed IoT water meter monitoring with usage graph, location map, alerts, and installation info',
				imageTitle:
					'ThingsBoard smart metering dashboard showing real-time water usage and geolocation tracking',
			},
			{
				title: 'Customer-specific dashboards',
				description:
					'ThingsBoard provides individual dashboards tailored for end customers, allowing them to monitor only their assigned water meters. This ensures data privacy while empowering users with full visibility into their personal consumption, device status, and alert history.',
				image: '/src/assets/images/usecases/water-metering/water-metering-8.webp',
				imageAlt: 'Water meter consumption data, leakage indicators, and active customer alarms',
				imageTitle: 'Monitor water meter status and customer-specific consumption alerts',
			},
			{
				title: 'Rule chains: data processing logic',
				description:
					'The backend logic of the solution is driven by ThingsBoard rule chains, which handle incoming telemetry from devices and automate alarm routing, threshold checks, and notification dispatch.',
				image: '/src/assets/images/usecases/water-metering/water-metering-9.webp',
				imageAlt:
					'ThingsBoard rule chain flow diagram for water consumption processing and alarm generation',
				imageTitle:
					'IoT rule chain in ThingsBoard for calculating consumption, managing alarms, and posting telemetry',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/aff5f200-8b48-11ec-a344-c767c1ab1bb8?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_WaterMeter_ViewLiveDemo',
		contactUsId: 'UseCases_WaterMeter_ContactUs',
	},
	applications: {
		title: 'Applications of water metering solution',
		subtitle: 'The water metering approach can be easily adapted to various other sectors',
		applications: [
			{
				title: 'Municipal water services',
				description:
					'Automate meter readings and billing, track city-wide consumption trends, and detect leaks instantly.',
				desktopImage: '/src/assets/images/usecases/scada/water-1.svg',
				mobileImage: '/src/assets/images/usecases/scada/water-2.svg',
				imageAlt: 'Water valve',
			},
			{
				title: 'Industrial facilities',
				description:
					'Monitor water usage to ensure environmental compliance and reduce utility costs with predictive insights.',
				desktopImage: '/src/assets/images/usecases/water-metering/industrial-1.svg',
				mobileImage: '/src/assets/images/usecases/water-metering/industrial-2.svg',
				imageAlt: 'Industrial',
			},
			{
				title: 'Smart buildings',
				description:
					'Minimize water waste with real-time monitoring to optimize plumbing and improve building sustainability.',
				desktopImage: '/src/assets/images/usecases/water-metering/smart-building-1.svg',
				mobileImage: '/src/assets/images/usecases/water-metering/smart-building-2.svg',
				imageAlt: 'Building',
			},
			{
				title: 'Hospitality & resorts',
				description:
					'Hotels and resorts can monitor water usage across various zones or guest areas to implement sustainable practices, reduce operating costs, and engage guests in eco-conscious initiatives.',
				desktopImage: '/src/assets/images/usecases/smart-office/hospitality-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-office/hospitality-2.svg',
				imageAlt: 'Hospitality',
			},
			{
				title: 'Agriculture & irrigation',
				description:
					'Farmers can leverage real-time data to optimize irrigation schedules, reduce unnecessary water usage, and improve crop yields while maintaining environmental responsibility.',
				desktopImage: '/src/assets/images/usecases/water-metering/irrigation-1.svg',
				mobileImage: '/src/assets/images/usecases/water-metering/irrigation-2.svg',
				imageAlt: 'Irrigation',
			},
		],
	},
	summary: {
		title: 'Summary of water metering solution',
		text: "With a low-code approach, intuitive dashboards, and comprehensive alerting mechanisms, ThingsBoard serves as a cornerstone for digital transformation in water resource management. Whether you're scaling for a city or optimizing a single facility, this solution adapts to your needs— one drop at a time.",
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
