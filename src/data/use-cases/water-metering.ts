import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Smart water metering system',
	pageTitle: 'Smart Water Metering System',
	description:
		'Collect water consumption data, detect fraud and anomalies, and alert operators by SMS or email. Explore the live smart water metering dashboard.',
	pageSlug: 'water-metering',
	cta: {
		title: 'Launch smart water metering faster',
		text:
			'Install the Water metering template with leak detection and multi-customer support, or ask our team to build a solution for your water network.',
		button: {
			label: 'Get the solution template',
			href: '/iot-hub/solution-templates/water-metering/',
		},
	},
	about: {
		shortText:
			'Smart water metering replaces manual readings with live data on consumption, temperature, and meter battery levels. ThingsBoard collects readings over LoRaWAN, NB-IoT, or LTE, alerts operators to leaks and suspicious usage, and gives each customer a dashboard with their own consumption.',
		longText: [
			'The live demo shows a complete operator workspace: total consumption, analytics, device and customer lists, alarms, and settings. Operators can open any meter, and each customer gets dashboards limited to their own meters.',
			'For electricity and multi-utility metering, see <a href="/use-cases/smart-metering/">IoT smart metering</a>.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/aff5f200-8b48-11ec-a344-c767c1ab1bb8?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_WaterMeter_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/water-metering/water-metering-1.webp',
				alt: 'ThingsBoard water-metering dashboard: weekly consumption, active-device counts, a meter map of Santa Monica, the meter table and active alarms',
				title: 'Fleet overview: consumption, meter map and active alarms',
				width: 1819,
				height: 967,
			},
			{
				src: '/src/assets/images/usecases/water-metering/water-metering-2.webp',
				alt: 'ThingsBoard dashboard charting current-week water consumption against the previous week alongside the water-meter list',
				title: 'Weekly consumption vs the previous week',
				width: 1819,
				height: 967,
			},
			{
				src: '/src/assets/images/usecases/water-metering/water-metering-3.webp',
				alt: 'ThingsBoard single water-meter view: weekly and all-time consumption, temperature, battery, consumption history, location map, meter details and a device photo',
				title: 'Single meter: usage, status, location and details',
				width: 1819,
				height: 967,
			},
			{
				src: '/src/assets/images/usecases/water-metering/water-metering-4.webp',
				alt: 'ThingsBoard alarms table listing critical daily and weekly consumption-threshold alarms across the water meters',
				title: 'Consumption-threshold alarms across the fleet',
				width: 1819,
				height: 967,
			},
			{
				src: '/src/assets/images/usecases/water-metering/water-metering-5.webp',
				alt: 'ThingsBoard settings tab configuring system alarm thresholds and SMS and email notifications',
				title: 'Alarm thresholds and notification settings',
				width: 1819,
				height: 967,
			},
		],
	},
	solutionStructure: {
		title: 'How smart water metering works',
		shortText:
			'Water meters report consumption, temperature, and battery level over LoRaWAN, NB-IoT, or LTE. ThingsBoard receives the data from the network server or directly over MQTT, CoAP, or LwM2M.',
		longText: [
			'The platform stores this data, applies intelligent rules to trigger alerts, and visualizes everything through intuitive dashboards for immediate operational insights.',
		],
		schemeSrc: '/src/assets/schemas/water-metering.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Smart water metering dashboard',
		subtitle:
			'The dashboard is split into states for monitoring, analytics, devices, customers, alarms, and settings. Each one covers one part of running a water network.',
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
					'This dashboard displays all registered water meters with essential metadata like latest readings, status, and leak detection. Users can manage device information, monitor their real-time performance, and quickly respond to technical issues. Additionally, this view allows users to add new devices by entering their serial number and metadata, edit existing device details, change geolocation parameters by dragging a map marker, and configure alarm thresholds for consumption, battery, or inactivity detection.',
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
					'Each device has its own dedicated view showing granular consumption data by hour, daily/weekly totals, and battery health. It includes editable location mapping and detailed metadata, enabling localized control and diagnostics. Additionally, each dashboard displays device-specific contact information for the owner, facilitating support and communication, as well as a photo section that allows users to upload or update an image of the physical device for visual identification and verification.',
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
					'The backend logic of the solution is driven by ThingsBoard rule chains, which handle incoming telemetry from devices and automate alarm routing, threshold checks, and notification dispatch. These visual flowcharts allow platform administrators to customize workflows based on device status, tenant or customer settings, and alarm types, ensuring flexibility and scalability of the solution.',
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
		title: 'Where smart water metering is used',
		subtitle: 'The same approach works for utilities, industrial sites, buildings, hotels, and farms.',
		applications: [
			{
				title: 'Municipal water services',
				description:
					'By using IoT-based water metering, municipalities can automate meter readings and billing processes, gain insight into consumption trends across entire cities, and react instantly to issues such as leaks or overuse.',
				desktopImage: '/src/assets/images/usecases/scada/water-1.svg',
				imageAlt: 'Water valve',
			},
			{
				title: 'Industrial facilities',
				description:
					'Industries benefit from accurate water monitoring to stay compliant with strict environmental standards and to manage utility costs more effectively through predictive consumption insights.',
				desktopImage: '/src/assets/images/usecases/water-metering/industrial-1.svg',
				imageAlt: 'Industrial',
			},
			{
				title: 'Smart buildings',
				description:
					'Water metering in smart buildings enables facility managers to fine-tune plumbing infrastructure, minimize waste through real-time monitoring, and improve the overall experience and sustainability for occupants.',
				desktopImage: '/src/assets/images/usecases/water-metering/smart-building-1.svg',
				imageAlt: 'Building',
			},
			{
				title: 'Hospitality & resorts',
				description:
					'Hotels and resorts can monitor water usage across various zones or guest areas to implement sustainable practices, reduce operating costs, and engage guests in eco-conscious initiatives.',
				desktopImage: '/src/assets/images/usecases/smart-office/hospitality-1.svg',
				imageAlt: 'Hospitality',
			},
			{
				title: 'Agriculture & irrigation',
				description:
					'Farmers can leverage real-time data to optimize irrigation schedules, reduce unnecessary water usage, and improve crop yields while maintaining environmental responsibility.',
				desktopImage: '/src/assets/images/usecases/water-metering/irrigation-1.svg',
				imageAlt: 'Irrigation',
			},
		],
	},
	advantages: {
		title: 'Why ThingsBoard for smart water metering',
		cards: [
			{
				icon: 'tabler:chart-bar',
				color: 'red',
				title: 'Operator and customer dashboards',
				description:
					'Give operators a full view of consumption, analytics, and alarms, and give each customer a dashboard limited to their own meters.',
				href: '/iot-hub/solution-templates/water-metering/',
				linkText: 'See the Water metering template',
			},
			{
				icon: 'tabler:wifi',
				color: 'red',
				title: 'LoRaWAN, NB-IoT, and LTE water meters',
				description:
					'Connect LoRaWAN meters through network server integrations, and NB-IoT or LTE meters directly over MQTT, CoAP, or LwM2M.',
				href: '/docs/pe/user-guide/integrations/',
				linkText: 'Learn more about integrations',
			},
			{
				icon: 'tabler:circuit-bulb',
				color: 'green',
				title: 'Leak and fraud detection',
				description:
					'Flag continuous flow and sudden changes in consumption with alarm rules, and notify operators by email or SMS.',
				href: '/docs/pe/user-guide/rule-engine/',
				linkText: 'Learn more about data processing',
			},
			{
				icon: 'tabler:building-skyscraper',
				color: 'blue',
				title: 'Multi-customer water utilities',
				description:
					'Manage many customers, meters, and buildings in one tenant, with separate access for every customer.',
				href: '/docs/pe/user-guide/digital-twins/entities/',
				linkText: 'Learn more about multi-tenancy',
			},
		],
	},
	faq: [
		{
			id: 'water-metering-faq',
			label: 'FAQ',
			items: [
				{
					id: 'how-does-smart-water-metering-work',
					question: 'How does smart water metering work?',
					answer:
						'<p>Meters with a radio module send consumption readings over LoRaWAN, NB-IoT, or LTE. ThingsBoard receives the data, stores it, checks it against alarm rules, and shows it on dashboards for operators and customers. Details are in the <a href="/docs/pe/user-guide/connectivity-guide/">connectivity guide</a>.</p>',
					defaultOpen: true,
				},
				{
					id: 'how-does-the-system-detect-leaks',
					question: 'How does the system detect leaks and fraud?',
					answer:
						'<p>Alarm rules watch for readings that point to leaks or tampering, such as continuous flow or a sudden change in consumption, and notify operators.</p>',
				},
				{
					id: 'can-operators-get-alerts-by-sms',
					question: 'Can operators get alerts by SMS or email?',
					answer:
						'<p>Yes. ThingsBoard sends notifications by email and SMS, as well as to Slack, Microsoft Teams, and the ThingsBoard <a href="/docs/mobile/pe/">mobile app</a>.</p>',
				},
				{
					id: 'can-i-try-it-before-installing',
					question: 'Can I try it before installing meters?',
					answer:
						'<p>Yes. Install the <a href="/iot-hub/solution-templates/water-metering/">Water metering template</a> and it starts with simulated data, so you can test dashboards, alarms, and customer access first. When the meters are ready, you connect them in place of the emulators.</p>',
				},
				{
					id: 'how-is-this-different-from-smart',
					question: 'How is this different from smart metering?',
					answer:
						'<p>This page is about water networks: consumption, leaks, and fraud. For electricity and multi-utility metering, see <a href="/use-cases/smart-metering/">IoT smart metering</a>.</p>',
				},
			],
		},
	],
	summary: {
		title: 'Smart water metering with ThingsBoard in short',
		text: "With a low-code approach, intuitive dashboards, and comprehensive alerting mechanisms, ThingsBoard serves as a cornerstone for digital transformation in water resource management. Whether you're scaling for a city or optimizing a single facility, this solution adapts to your needs— one drop at a time.",
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
