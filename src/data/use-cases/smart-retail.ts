import type { UseCaseData } from './types';

export const smartRetailData: UseCaseData = {
	title: 'Smart retail',
	pageTitle: 'Turn your market into a Smart Retail powerhouse with ThingsBoard IoT',
	description:
		"Discover how ThingsBoard's Smart Retail Solutions enable real-time monitoring, automated alarms, and intelligent dashboards for supermarkets and retail chains.",
	pageSlug: 'smart-retail',
	about: {
		shortText:
			'Smart retail solution by ThingsBoard is a powerful platform that helps retailers gain full visibility into store infrastructure, automate data collection, respond to incidents in real time, and make informed decisions. Leveraging the flexibility of ThingsBoard, retailers can integrate a wide range of sensors and devices, visualize key metrics through custom dashboards, and implement intelligent analytics.',
		longText: [
			'The <a href="/docs/pe/recipes/solution-templates/smart-retail/">smart retail solution</a> template represents a flexible, ready-to-use structure for building intelligent retail infrastructures using the ThingsBoard IoT platform. As a solution provider, you can provision multiple customers and assign each one a dedicated pool of IoT devices to monitor key assets across their supermarkets. Customers can easily upload custom floor plans, install devices on-site, and place them logically within the dashboard layout to reflect the physical environment.',
			'With built-in alarm logic and fully configurable thresholds per device, users can detect anomalies such as temperature fluctuations or unauthorized access without needing a complex setup. The template also includes interactive dashboards that allow both providers and customers to monitor the current and historical state of their supermarkets\u2014empowering data-driven decisions, operational efficiency, and a higher standard of safety and service.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/551d4ca0-8b54-11ec-98f9-ff45c37940c6?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_SmartRetail_ViewLiveDemo',
	},
	solutionStructure: {
		title: 'Solution structure of smart retail use case',
		shortText:
			'Devices such as temperature sensors, door sensors, and energy meters connect to ThingsBoard through IoT protocols like MQTT, CoAP, and HTTP, or via integrations with LoRaWAN and other platforms.',
		longText: [
			'ThingsBoard processes incoming telemetry in real time using its built-in rule engine, which evaluates thresholds, triggers alarms, and routes notifications to the appropriate users.',
			'All collected data is stored and visualized through fully customizable dashboards, allowing both solution providers and end customers to monitor store conditions, track device status, and respond to incidents — all from a single, unified interface.',
			'Custom floor plans can be uploaded to map device placement visually, enabling intuitive spatial monitoring of each retail location.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of smart retail solution',
		subtitle:
			'The live dashboard displays real-time data from store sensors and devices. Collected data is processed via the rule engine to raise alarms on certain thresholds.',
		panels: [
			{
				title: 'Provider overview state',
				description:
					"This top-level dashboard gives solution providers a bird's-eye view of all customer supermarkets. It displays the total number of connected devices, active alarms, and customer locations on an interactive map. Providers can quickly navigate to individual customer dashboards for deeper analysis.",
				image: '/src/assets/images/usecases/smart-retail/smart-retail-1.webp',
				imageAlt: 'Provider overview dashboard with customer locations and device statistics',
				imageTitle:
					'ThingsBoard smart retail provider dashboard showing customer supermarkets, device counts, and active alarms',
			},
			{
				title: 'Customer supermarket overview',
				description:
					"Each customer gets a dedicated dashboard displaying their supermarket's floor plan with device placements. Real-time sensor data, alarm indicators, and device statuses are overlaid directly on the layout, providing spatial context for monitoring.",
				image: '/src/assets/images/usecases/smart-retail/smart-retail-2.webp',
				imageAlt: 'Supermarket floor plan with sensor placements and real-time data overlay',
				imageTitle:
					'Customer supermarket dashboard with floor plan, device locations, and live sensor readings',
			},
			{
				title: 'Device monitoring and alarms',
				description:
					'A detailed view of individual devices showing current readings, historical trends, and alarm history. Users can configure thresholds for temperature, humidity, door open/close events, and energy consumption directly from the dashboard.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-3.webp',
				imageAlt: 'Device monitoring panel with real-time readings and alarm configuration',
				imageTitle:
					'Detailed device monitoring with threshold configuration and alarm history in ThingsBoard',
			},
			{
				title: 'Temperature monitoring state',
				description:
					'Dedicated temperature monitoring view for refrigeration units and cold storage areas. Real-time temperature readings are displayed alongside configurable high/low thresholds, with automatic alarm generation when conditions deviate from acceptable ranges.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-4.webp',
				imageAlt: 'Temperature monitoring dashboard for retail refrigeration units',
				imageTitle:
					'Real-time temperature monitoring of refrigeration units with threshold-based alarms',
			},
			{
				title: 'Energy consumption analytics',
				description:
					'This panel tracks energy usage across the supermarket, breaking down consumption by device type and time period. Historical trends help identify peak usage patterns and opportunities for energy optimization.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-5.webp',
				imageAlt: 'Energy consumption analytics dashboard with usage trends and breakdowns',
				imageTitle:
					'Smart retail energy analytics showing consumption patterns and optimization opportunities',
			},
			{
				title: 'Alarm management state',
				description:
					'Centralized alarm management interface displaying all active and historical alarms with severity levels, timestamps, and device origins. Operators can acknowledge, clear, or escalate alarms and configure notification preferences.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-6.webp',
				imageAlt: 'Alarm management panel with severity indicators and acknowledgment controls',
				imageTitle:
					'ThingsBoard alarm management for smart retail with severity-based filtering and notification settings',
			},
			{
				title: 'Device provisioning and settings',
				description:
					'Administrative interface for adding new devices, configuring alarm thresholds, and managing device metadata. Solution providers can assign devices to customers and set up automated provisioning workflows.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-7.webp',
				imageAlt:
					'Device provisioning interface with configuration and customer assignment options',
				imageTitle: 'Smart retail device provisioning and threshold configuration in ThingsBoard',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/551d4ca0-8b54-11ec-98f9-ff45c37940c6?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_SmartRetail_ViewLiveDemo',
		contactUsId: 'UseCases_SmartRetail_ContactUs',
	},
	applications: {
		title: 'Applications of smart retail solution',
		subtitle: 'The smart retail approach can be easily adapted to various other sectors',
		applications: [
			{
				title: 'Pharmacy chains',
				description:
					'Monitoring storage conditions for temperature-sensitive medications, ensuring regulatory compliance, and automating alerts for cold chain deviations across multiple pharmacy locations.',
				desktopImage: '/src/assets/images/usecases/smart-retail/pharmacy-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/pharmacy-2.svg',
				imageAlt: 'Pharmacy',
				imageTitle: 'Pharmacy chains',
			},
			{
				title: 'Convenience stores at fuel stations',
				description:
					'Track refrigeration, HVAC, and security across fuel station stores to maintain product quality remotely.',
				desktopImage: '/src/assets/images/usecases/smart-retail/fuel-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/fuel-1.svg',
				imageAlt: 'Fuel station',
				imageTitle: 'Convenience stores at fuel stations',
			},
			{
				title: 'Logistics and cold chain warehouses',
				description:
					'Monitor temperature, humidity, and door events in cold chain warehouses to prevent spoilage and ensure compliance.',
				desktopImage: '/src/assets/images/usecases/smart-retail/logistics-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/logistics-2.svg',
				imageAlt: 'Warehouse',
				imageTitle: 'Logistics and cold chain warehouses',
			},
			{
				title: 'Hospital cafeterias and institutional kitchens',
				description:
					'Monitor food storage temps and equipment status in institutional kitchens to maintain health standards.',
				desktopImage: '/src/assets/images/usecases/smart-retail/cafeterias-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/cafeterias-2.svg',
				imageAlt: 'Cafeteria',
				imageTitle: 'Hospital cafeterias and institutional kitchens',
			},
			{
				title: 'Food courts and restaurant chains',
				description:
					'Centrally monitor kitchen equipment and refrigeration across restaurant locations for food safety and savings.',
				desktopImage: '/src/assets/images/usecases/smart-retail/court-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/court-2.svg',
				imageAlt: 'Food court',
				imageTitle: 'Food courts and restaurant chains',
			},
		],
	},
	summary: {
		title: 'Summary of smart retail solution',
		text: 'The ThingsBoard smart retail solution provides centralized monitoring and management of store infrastructure through intuitive dashboards, automated alarms, and flexible device integration. Whether you manage a single supermarket or a chain of retail locations, this solution adapts to your scale — delivering real-time visibility, operational efficiency, and data-driven decision making.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
