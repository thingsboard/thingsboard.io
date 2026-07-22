import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Smart office',
	pageTitle: 'IoT smart office solutions with ThingsBoard',
	description:
		'Smart Office IoT solution by ThingsBoard for real-time monitoring and automation. Control energy, climate, air quality, and devices through dashboards.',
	pageSlug: 'smart-office',
	about: {
		shortText:
			'The smart office solution powered by ThingsBoard enables efficient monitoring of energy and water consumption, tracking of air quality and CO\u2082 levels, control of HVAC systems, real-time response to critical events, and overall improvement of energy efficiency and employee comfort.',
		longText: [
			'Smart office solutions are designed to optimize workplace environments by monitoring key operational parameters and automating building systems in real time. ThingsBoard, as a robust IoT platform, provides all the necessary tools for collecting, processing, and visualizing data from devices that use protocols like BLE or LoRaWAN gateways, enabling seamless integration and support for flexible solutions.',
			'Thanks to ThingsBoard, an open-source IoT platform, it\'s easy to integrate and visualize data from various devices and sensors, enabling the creation of intelligent, data-driven solutions. This approach allows not only real-time monitoring of office conditions but also active management\u2014turning systems on or off, receiving alerts, and configuring automation scenarios. All of these capabilities are fully demonstrated in our <a href="/iot-hub/solution-templates/smart-office/">smart office solution</a>.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/375ddea0-f5e5-11f0-bc85-bd57f974c663?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_SmartOffice_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/smart-office/smart-office-1-v2.webp',
				alt: 'HVAC switch, temperature and power chart, device list, and floor plan with sensor locations',
				title:
					'HVAC system dashboard: includes temperature control knob, power chart, connected devices, and interactive floor plan in ThingsBoard',
				width: 2048,
				height: 951,
			},
			{
				src: '/src/assets/images/usecases/smart-office/smart-office-2.webp',
				alt: 'Energy consumption, power and current charts with wind turbine background',
				title:
					'Energy monitoring dashboard with consumption statistics, real-time current and voltage tracking, and no active alarms',
				width: 2048,
				height: 951,
			},
			{
				src: '/src/assets/images/usecases/smart-office/smart-office-3.webp',
				alt: 'HVAC control with state, airflow history, and temperature targets',
				title:
					'ThingsBoard dashboard for HVAC: displays airflow, target temperature, device state, and alarm history over time',
				width: 2048,
				height: 951,
			},
			{
				src: '/src/assets/images/usecases/smart-office/smart-office-4.webp',
				alt: 'Water consumption statistics and battery discharge graph with office contact info',
				title:
					'Water meter dashboard: shows water usage per minute, historical consumption, battery voltage over time, and device contact information',
				width: 2048,
				height: 951,
			},
			{
				src: '/src/assets/images/usecases/smart-office/smart-office-5.webp',
				alt: 'Smart sensor dashboard with temperature, humidity, CO2, TVOC, and occupancy tracking',
				title:
					'Environmental monitoring via smart sensor: tracks temperature, humidity, air quality, and room occupancy in ThingsBoard platform',
				width: 2048,
				height: 951,
			},
		],
	},
	solutionStructure: {
		title: 'Solution structure of smart office use case',
		shortText:
			'The smart office solution connects devices like energy meters, HVAC, and sensors to ThingsBoard via MQTT, CoAP, or HTTP, or through a gateway with Modbus, BLE, and BACnet connectors.',
		longText: [
			'This setup enables seamless data ingestion through IoT gateways or direct connections. The collected data is then visualized in real time on interactive dashboards and processed through a powerful rule engine that supports analytics and configurable alarms.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of smart office solution',
		subtitle:
			'ThingsBoard provides a flexible dashboard system that allows for clear visualization of key metrics. In the context of the smart office, this includes parameters such as energy and water consumption, air quality, temperature and humidity, and the status of the HVAC system. Additionally, dashboards display alarms, enabling prompt response to any deviations from normal conditions.',
		panels: [
			{
				title: 'Smart office overview state',
				description:
					'This state provides a general overview of all connected devices, displaying the status of the HVAC system, current temperature, energy consumption, and active alarms. It also includes a 3D office floor plan indicating the locations of the Energy Meter, Smart Sensor, HVAC, and Water Meter.',
				image: '/src/assets/images/usecases/smart-office/smart-office-1-v2.webp',
				imageAlt:
					'HVAC switch, temperature and power chart, device list, and floor plan with sensor locations',
				imageTitle:
					'HVAC system dashboard: includes temperature control knob, power chart, connected devices, and interactive floor plan in ThingsBoard',
			},
			{
				title: 'Energy meter state',
				description:
					'This state displays total and per-minute energy consumption, along with real-time values for power, current, voltage, and frequency. The data visualization enables monitoring of electrical load and detecting anomalies in real time.',
				image: '/src/assets/images/usecases/smart-office/smart-office-2.webp',
				imageAlt: 'Energy consumption, power and current charts with wind turbine background',
				imageTitle:
					'Energy monitoring dashboard with consumption statistics, real-time current and voltage tracking, and no active alarms',
			},
			{
				title: 'HVAC state',
				description:
					'This state allows for control of the HVAC system, monitoring its current status (on/off), target temperature, and airflow. It also includes charts showing the history of system states, target temperature changes, and airflow dynamics.',
				image: '/src/assets/images/usecases/smart-office/smart-office-3.webp',
				imageAlt: 'HVAC control with state, airflow history, and temperature targets',
				imageTitle:
					'ThingsBoard dashboard for HVAC: displays airflow, target temperature, device state, and alarm history over time',
			},
			{
				title: 'Smart sensor state',
				description:
					'This state monitors temperature, humidity, air quality (CO\u2082, TVOC), and room occupancy history. All data is presented through charts and gauges, offering a complete view of the office microclimate and comfort level.',
				image: '/src/assets/images/usecases/smart-office/smart-office-5.webp',
				imageAlt:
					'Smart sensor dashboard with temperature, humidity, CO2, TVOC, and occupancy tracking',
				imageTitle:
					'Environmental monitoring via smart sensor: tracks temperature, humidity, air quality, and room occupancy in ThingsBoard platform',
			},
			{
				title: 'Water meter state',
				description:
					"This state shows total and hourly water consumption, as well as the battery level of the device. The data helps track water usage efficiency and monitor the sensor's operational status.",
				image: '/src/assets/images/usecases/smart-office/smart-office-4.webp',
				imageAlt:
					'Water consumption statistics and battery discharge graph with office contact info',
				imageTitle:
					'Water meter dashboard: shows water usage per minute, historical consumption, battery voltage over time, and device contact information',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/375ddea0-f5e5-11f0-bc85-bd57f974c663?publicId=4978baf0-8a92-11ec-98f9-ff45c37940c6',
		demoButtonId: 'UseCases_SmartOffice_ViewLiveDemo',
		contactUsId: 'UseCases_SmartOffice_ContactUs',
	},
	applications: {
		title: 'Applications of smart office solution',
		subtitle: 'The smart office approach can be easily adapted to various other sectors',
		applications: [
			{
				title: 'Smart retail',
				description:
					'Energy consumption monitoring, climate automation in shopping areas, and lighting control.',
				desktopImage: '/src/assets/images/usecases/smart-energy/malls-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-office/mall-2.svg',
				imageAlt: 'Mall',
				imageTitle: 'Smart retail',
			},
			{
				title: 'Manufacturing',
				description: 'Energy audits, airflow monitoring, and smart overload notifications.',
				desktopImage: '/src/assets/images/usecases/smart-office/manufacturing-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-office/manufacturing-2.svg',
				imageAlt: 'Manufacturing',
				imageTitle: 'Manufacturing',
			},
			{
				title: 'Healthcare',
				description:
					'Microclimate control in patient rooms, occupancy monitoring, and tracking of CO\u2082 levels and temperature.',
				desktopImage: '/src/assets/images/usecases/health-care/hospital-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-office/hospital-2.svg',
				imageAlt: 'Hospital',
				imageTitle: 'Healthcare',
			},
			{
				title: 'Hospitality',
				description:
					'Room automation, personalized climate control, and monitoring of CO\u2082 levels and space occupancy.',
				desktopImage: '/src/assets/images/usecases/smart-office/hospitality-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-office/hospitality-2.svg',
				imageAlt: 'Hospitality',
				imageTitle: 'Hospitality',
			},
			{
				title: 'Education',
				description: 'Managing comfort and resource usage in educational facilities.',
				desktopImage: '/src/assets/images/usecases/smart-energy/education-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-office/education-2.svg',
				imageAlt: 'Education',
				imageTitle: 'Education',
			},
		],
	},
	summary: {
		title: 'Summary of smart office solution',
		text: "The smart office project demonstrates how the integration of IoT and ThingsBoard can significantly enhance office building management. It's more than just a dashboard — it's a powerful tool for improving efficiency, safety, and comfort. The solution is easily scalable, integrable, and customizable to fit any business needs. With ThingsBoard, you don't just monitor your office — you take control of it.",
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
