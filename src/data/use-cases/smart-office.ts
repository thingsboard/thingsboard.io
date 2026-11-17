import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Smart office IoT solution',
	pageTitle: 'Smart Office IoT Solutions',
	description:
		'Monitor office climate, air quality, and energy use from one dashboard. Control devices remotely, push OTA updates, and explore the live demo.',
	pageSlug: 'smart-office',
	cta: {
		title: 'Build your smart office solution faster',
		text:
			'Install the Smart office template with HVAC control and energy metering, or ask our team to build a solution for your buildings.',
		button: {
			label: 'Get the solution template',
			href: '/iot-hub/solution-templates/smart-office/',
		},
	},
	about: {
		shortText:
			'A smart office solution shows facility managers what is happening in every room: temperature, air quality and CO₂, and energy and water use. With ThingsBoard, they adjust HVAC settings from a floor plan and get alerts when conditions go out of range.',
		longText: [
			'Dashboards are split by role: administrators see consumption reports for the whole building, and occupants get a simple view of their own space.',
			'Building management companies such as <a href="/case-studies/e2cbms/">E2CBMS</a> use ThingsBoard to roll out smart building solutions for their customers.',
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
		title: 'How a smart office solution works',
		shortText:
			'Energy meters, HVAC units, and sensors connect to ThingsBoard directly over MQTT, HTTP, or CoAP, or through the IoT Gateway with BACnet, Modbus, and BLE connectors.',
		longText: [
			'Data arrives through the gateway or direct connections, and the rule engine processes it for analytics and alarms. Dashboards show the result in real time.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Smart office dashboard',
		subtitle:
			'Dashboards show energy and water use, air quality, temperature, humidity, and HVAC status, with alarms for anything out of range.',
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
		title: 'Where smart office solutions are used',
		subtitle: 'The same approach works in retail, manufacturing, healthcare, hospitality, and education.',
		applications: [
			{
				title: 'Smart retail',
				description:
					'Energy consumption monitoring, climate automation in shopping areas, and lighting control.',
				desktopImage: '/src/assets/images/usecases/smart-energy/malls-1.svg',
				imageAlt: 'Mall',
				imageTitle: 'Smart retail',
			},
			{
				title: 'Manufacturing',
				description: 'Energy audits, airflow monitoring, and smart overload notifications.',
				desktopImage: '/src/assets/images/usecases/smart-office/manufacturing-1.svg',
				imageAlt: 'Manufacturing',
				imageTitle: 'Manufacturing',
			},
			{
				title: 'Healthcare',
				description:
					'Microclimate control in patient rooms, occupancy monitoring, and tracking of CO\u2082 levels and temperature.',
				desktopImage: '/src/assets/images/usecases/health-care/hospital-1.svg',
				imageAlt: 'Hospital',
				imageTitle: 'Healthcare',
			},
			{
				title: 'Hospitality',
				description:
					'Room automation, personalized climate control, and monitoring of CO\u2082 levels and space occupancy.',
				desktopImage: '/src/assets/images/usecases/smart-office/hospitality-1.svg',
				imageAlt: 'Hospitality',
				imageTitle: 'Hospitality',
			},
			{
				title: 'Education',
				description: 'Managing comfort and resource usage in educational facilities.',
				desktopImage: '/src/assets/images/usecases/smart-energy/education-1.svg',
				imageAlt: 'Education',
				imageTitle: 'Education',
			},
		],
	},
	advantages: {
		title: 'Why ThingsBoard for smart offices',
		cards: [
			{
				icon: 'tabler:chart-bar',
				color: 'red',
				title: 'Floor-plan dashboards',
				description:
					'See temperature, CO₂, and energy and water use room by room on interactive floor plans.',
				href: '/iot-hub/solution-templates/smart-office/',
				linkText: 'See the Smart office template',
			},
			{
				icon: 'tabler:plug-connected',
				color: 'purple',
				title: 'HVAC, BACnet, and Modbus connectivity',
				description:
					'Connect sensors directly over MQTT, HTTP, or CoAP, and HVAC units and meters through the IoT Gateway with BACnet, Modbus, or BLE.',
				href: '/docs/pe/user-guide/connectivity-guide/',
				linkText: 'Learn more about connectivity',
			},
			{
				icon: 'tabler:circuit-bulb',
				color: 'green',
				title: 'Remote HVAC control',
				description:
					'Change setpoints and modes from the dashboard, and let rules react to CO₂ or temperature automatically.',
				href: '/docs/pe/user-guide/rule-engine/',
				linkText: 'Learn more about data processing',
			},
			{
				icon: 'tabler:shield',
				color: 'blue',
				title: 'Building data under your control',
				description:
					'Role-based access and audit logs decide who sees each building’s data. ThingsBoard holds ISO 27001 certification.',
				href: '/trust-center/',
				linkText: 'Visit the Trust Center',
			},
		],
	},
	faq: [
		{
			id: 'smart-office-faq',
			label: 'FAQ',
			items: [
				{
					id: 'what-can-a-smart-office-iot',
					question: 'What can a smart office IoT solution monitor?',
					answer:
						'<p>Typically temperature, humidity, CO₂ and air quality, plus energy and water use. ThingsBoard shows these on floor-plan dashboards and alerts staff when a reading goes out of range.</p>',
					defaultOpen: true,
				},
				{
					id: 'can-i-control-hvac-remotely',
					question: 'Can I control HVAC remotely?',
					answer:
						'<p>Yes. The <a href="/iot-hub/solution-templates/smart-office/">Smart office template</a> includes an HVAC device whose setpoint and mode you change directly from the dashboard.</p>',
				},
				{
					id: 'how-do-hvac-units-and-building',
					question: 'How do HVAC units and building systems connect?',
					answer:
						'<p>Building systems that use BACnet or Modbus, and BLE devices, connect through the ThingsBoard IoT Gateway. Sensors with their own connection send data directly over MQTT, HTTP, or CoAP, and LoRaWAN sensors come in from the network server. Details are in the <a href="/docs/pe/user-guide/connectivity-guide/">connectivity guide</a>.</p>',
				},
				{
					id: 'who-can-access-my-building-data',
					question: 'Who can access my building data?',
					answer:
						'<p>You decide. ThingsBoard separates data by customer, and roles define what each user can see and change. Learn how we protect data in our <a href="/trust-center/">Trust Center</a>.</p>',
				},
				{
					id: 'can-your-team-build-a-smart',
					question: 'Can your team build a smart building solution for us?',
					answer:
						'<p>Yes. Our team builds custom solutions on ThingsBoard, and building management companies such as <a href="/case-studies/e2cbms/">E2CBMS</a> use the platform for their own customers. Tell us about your buildings through the <a href="/contact-us/?subject=Custom+Development+Service">contact form</a>.</p>',
				},
			],
		},
	],
	summary: {
		title: 'Smart office with ThingsBoard in short',
		text: "The smart office project demonstrates how the integration of IoT and ThingsBoard can significantly enhance office building management. It's more than just a dashboard — it's a powerful tool for improving efficiency, safety, and comfort. The solution is easily scalable, integrable, and customizable to fit any business needs. With ThingsBoard, you don't just monitor your office — you take control of it.",
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
