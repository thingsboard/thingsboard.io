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
		title: 'Solution structure of smart retail',
		shortText:
			'A wide range of IoT devices installed across supermarkets—such as motion sensors, temperature probes, smoke detectors, door sensors, and more—are connected to the ThingsBoard platform using MQTT, CoAP, or HTTP protocols.',
		longText: [
			'All telemetry and event data is collected within ThingsBoard, where it is structured, stored, and processed via the built-in Rule Engine. This enables real-time alarm generation, automation workflows, and configurable notifications to ensure prompt response to anomalies.',
			'Custom dashboards provide visual insights into equipment status, temperature trends, sensor activity, and alarm history. This empowers operators with clear and actionable monitoring across the entire retail network.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'Smart retail solution architecture',
		schemeCaption:
			'Smart retail solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Smart retail dashboard structure',
		subtitle:
			'<a href="/docs/pe/recipes/solution-templates/smart-retail/">Smart retail solution</a> dashboards in ThingsBoard are designed to give retail operators full situational awareness, from high-level monitoring of multiple store locations down to detailed insights into individual devices. Each dashboard state provides a specific layer of visibility to support operational efficiency and safety.',
		panels: [
			{
				title: 'Supermarket map overview state',
				description:
					'This screen provides a global view of all supermarket locations on the map, where each store is marked with a color-coded status icon indicating Normal, Major, or Critical state, and the right-side panel lists all supermarkets with their addresses and current operational status.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-1.webp',
				imageAlt: 'Provider overview dashboard with customer locations and device statistics',
				imageTitle: 'Supermarket map overview state',
			},
			{
				title: 'Supermarket S1 layout and devices state',
				description:
					'This dashboard displays the detailed layout of Supermarket S1 with real-time positions and statuses of sensors, while highlighting all critical and major alarms directly on the floor plan, and also provides access to the device list and full alarm history.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-2.webp',
				imageAlt: 'Supermarket floor plan with sensor placements and real-time data overlay',
				imageTitle: 'Supermarket S1 layout and devices state',
			},
			{
				title: 'Supermarket S1: motion sensor detail state',
				description:
					'This state focuses on a specific motion sensor in a restricted area, showing its recent movement detection timeline, current critical state, battery level history, and alarm log for security monitoring and maintenance control.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-3.webp',
				imageAlt: 'Device monitoring panel with real-time readings and alarm configuration',
				imageTitle: 'Supermarket S1: motion sensor detail state',
			},
			{
				title: 'Supermarket S2 layout and devices state',
				description:
					'This view shows the layout of Supermarket S2 where several sensors such as door, chiller, freezer, and smart shelves are displayed, and the dashboard alarms users about critical issues including broken doors and temperature breaches.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-4.webp',
				imageAlt: 'Temperature monitoring dashboard for retail refrigeration units',
				imageTitle: 'Supermarket S2 layout and devices state',
			},
			{
				title: 'Supermarket S2: freezer temperature monitoring state',
				description:
					'This dashboard monitors the freezer labeled "Meat" in Supermarket S2, displaying the 7-day temperature history, current temperature status in the normal range, and confirming that no alarms were raised during the observed period.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-5.webp',
				imageAlt: 'Energy consumption analytics dashboard with usage trends and breakdowns',
				imageTitle: 'Supermarket S2: freezer temperature monitoring state',
			},
			{
				title: 'Supermarket S3 layout and devices state',
				description:
					'This state presents the plan of Supermarket S3, showing active devices including a critically malfunctioning door sensor and chiller, along with their types and statuses, and offers quick insights into recent critical alarms.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-6.webp',
				imageAlt: 'Alarm management panel with severity indicators and acknowledgment controls',
				imageTitle: 'Supermarket S3 layout and devices state',
			},
			{
				title: 'Supermarket S3: chiller analytics state',
				description:
					'This dashboard visualizes temperature telemetry from the "Milk" chiller in Supermarket S3, where temperature exceeded the critical limit of 15°C, resulting in an active unacknowledged high temperature alarm with full context available in the alarm log.',
				image: '/src/assets/images/usecases/smart-retail/smart-retail-7.webp',
				imageAlt:
					'Device provisioning interface with configuration and customer assignment options',
				imageTitle: 'Supermarket S3: chiller analytics state',
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
					'Smart retail solution enables pharmacy networks to ensure safe medication storage by monitoring refrigeration units, maintaining regulatory compliance, and detecting unauthorized access.',
				desktopImage: '/src/assets/images/usecases/smart-retail/pharmacy-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/pharmacy-2.svg',
				imageAlt: 'Pharmacy',
				imageTitle: 'Pharmacy chains',
			},
			{
				title: 'Convenience stores at fuel stations',
				description:
					'Convenience stores benefit from automated monitoring of refrigeration, security alarms, and predictive maintenance based on real-time telemetry data.',
				desktopImage: '/src/assets/images/usecases/smart-retail/fuel-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/fuel-1.svg',
				imageAlt: 'Fuel station',
				imageTitle: 'Convenience stores at fuel stations',
			},
			{
				title: 'Logistics and cold chain warehouses',
				description:
					'The platform helps logistics operators maintain precise environmental conditions, monitor access points, and comply with food safety standards across their storage facilities.',
				desktopImage: '/src/assets/images/usecases/smart-retail/logistics-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/logistics-2.svg',
				imageAlt: 'Warehouse',
				imageTitle: 'Logistics and cold chain warehouses',
			},
			{
				title: 'Hospital cafeterias and institutional kitchens',
				description:
					'Institutional kitchens use smart retail solution to ensure food safety, prevent equipment failures, and optimize stock levels through smart shelf monitoring.',
				desktopImage: '/src/assets/images/usecases/smart-retail/cafeterias-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/cafeterias-2.svg',
				imageAlt: 'Cafeteria',
				imageTitle: 'Hospital cafeterias and institutional kitchens',
			},
			{
				title: 'Food courts and restaurant chains',
				description:
					'Restaurants and food courts can leverage ThingsBoard to track equipment health, detect fire risks, and monitor access to restricted areas in real time.',
				desktopImage: '/src/assets/images/usecases/smart-retail/court-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-retail/court-2.svg',
				imageAlt: 'Food court',
				imageTitle: 'Food courts and restaurant chains',
			},
		],
	},
	summary: {
		title: 'Summary of smart retail',
		text: 'Smart retail solution by ThingsBoard is a comprehensive solution that enables centralized monitoring of store operations, improves safety through automated alarms and incident logging, and reduces costs related to equipment failures and product spoilage. By streamlining incident response and automating routine checks, it also enhances staff efficiency. More than just data visualization, this solution transforms retail infrastructure into an intelligent, predictive, and adaptive environment that drives value for both customers and businesses.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
