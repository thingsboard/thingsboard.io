import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Smart energy',
	pageTitle: 'IoT Energy Management & Monitoring with ThingsBoard',
	description:
		'Smart Energy solution on ThingsBoard for real-time energy monitoring and optimization — reduce costs, improve efficiency, and automate management.',
	pageSlug: 'smart-energy',
	about: {
		shortText:
			'Smart energy is intelligent energy resource management using IoT to improve efficiency, reduce costs, and automate processes. ThingsBoard is a perfect platform for these tasks, providing scalable data collection, analytics, and real-time remote control.',
		longText: [
			'IoT is radically transforming the approach to energy management. IoT sensors capture the consumption of electricity, water, heat, as well as environmental parameters such as pressure, temperature, and more. This data is used to make automated decisions — from shutting down systems in case of failures to optimizing consumption and preventing losses.',
			'The ThingsBoard platform provides a powerful technology stack for building such systems. It supports data collection from various types of devices and protocols (MQTT, CoAP, HTTP, etc.), dashboard visualizations, and advanced automation through its rule engine and alerting system. This enables real-time energy monitoring and rapid response to anomalies, reducing costs and improving operational efficiency.',
		],
		demoUrl:
			'https://demo.thingsboard.io/dashboard/e8e409c0-f2b5-11e6-a6ee-bb0136cc33d0?publicId=963ab470-34c9-11e7-a7ce-bb0136cc33d0',
		demoButtonId: 'UseCases_SmartEnergy_ViewLiveDemo',
	},
	overview: {
		type: 'comparison',
		baseImage: '/src/assets/images/usecases/smart-energy/smart-energy-1.webp',
		baseImageAlt: 'ThingsBoard dashboard in light theme showing energy data from smart meters',
		baseImageTitle:
			'Smart energy monitoring dashboard in light mode: real-time voltage, amperage, consumption, and critical alarms for three smart meters',
		overlayImage: '/src/assets/images/usecases/smart-energy/smart-energy-2.webp',
		overlayImageAlt: 'ThingsBoard dashboard in dark theme with smart meter data visualization',
		overlayImageTitle:
			'Smart energy monitoring in dark mode: ThingsBoard interface displaying real-time metrics and alarm conditions',
	},
	solutionStructure: {
		title: 'Solution structure of smart energy use case',
		shortText:
			'ThingsBoard offers a comprehensive IoT-based energy monitoring solution built on a modular, scalable architecture. At the device level, smart meters and industrial Modbus meters collect real-time data on energy consumption across facilities.',
		longText: [
			'These devices connect through IoT gateways that support a wide range of communication protocols, including MQTT, CoAP, HTTP, and LwM2M, ensuring secure and seamless data transmission to the cloud.',
			'ThingsBoard core handles device and user management, real-time data processing via a powerful rule engine. The collected data is visualized through intuitive dashboards and mobile applications, giving users clear insights into energy usage, system alarms, and performance metrics — all in real time, from a single interface.',
		],
		schemeSrc: '/src/assets/schemas/smart-energy.svg',
		schemeAlt:
			'Smart energy solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'Smart energy solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	benefits: {
		badge: 'Why choose Smart energy',
		title: 'Smart energy benefits',
		subtitle:
			'The smart energy solution provides a wide range of benefits for businesses, facility managers, and technical teams, enabling efficient, automated, and scalable energy management.',
		benefits: [
			{
				title: 'Failure detection and risk mitigation',
				description:
					'Real-time monitoring detects unusual patterns that may signal potential system failures, helping reduce risks and prevent downtime.',
			},
			{
				title: 'Dynamic energy optimization',
				description:
					'IoT-powered energy systems automatically adjust consumption based on time of day, weather, or pricing factors, improving efficiency and occupant comfort.',
			},
			{
				title: 'Centralized monitoring and control',
				description:
					'A unified platform enables centralized oversight of energy usage across multiple facilities, simplifying management and enhancing visibility.',
			},
			{
				title: 'Increased energy efficiency',
				description:
					'IoT sensors track detailed consumption patterns by device or system, allowing identification of inefficiencies and driving smarter energy use.',
			},
			{
				title: 'Sustainability and cost savings',
				description:
					'Continuous monitoring and automation help reduce operational costs and maintenance needs, supporting long-term sustainability goals.',
			},
			{
				title: 'Regulatory compliance',
				description:
					'Automated tracking and reporting features make it easier to meet energy regulations and environmental standards.',
			},
		],
	},
	dashboardStructure: {
		title: 'Dashboard structure of smart energy solution',
		subtitle:
			'The live dashboard displays real-time data from several smart meters collected using ThingsBoard MQTT API. Collected data is processed via the rule engine to raise alarms on certain thresholds. The main dashboard displays the energy meters, corresponding alarms, and real-time data feeds. Click on the alarm or energy meter row to open the meter details. You may export the dashboard from our live demo server and import it to your ThingsBoard instance.',
		panels: [
			{
				title: 'Smart energy state',
				description:
					'This unified dashboard provides a comprehensive real-time view of voltage, amperage, frequency, and energy consumption across all three floors. Operators can monitor Smart Meters A, B, and C, analyze, compare performance, and detect anomalies instantly. Alarm widgets notify users about critical events like low or high voltage, while interactive charts and tables offer full control and insight — all from a single interface.',
				image: '/src/assets/images/usecases/smart-energy/smart-energy-1.webp',
				imageAlt: 'ThingsBoard dashboard in light theme showing energy data from smart meters',
				imageTitle:
					'Smart energy monitoring dashboard in light mode: real-time voltage, amperage, consumption, and critical alarms for three smart meters',
			},
			{
				title: 'Smart Meter A — 1st Floor state',
				description:
					'This dashboard provides full visibility into voltage, frequency, amperage, and energy consumption for Smart Meter A. Real-time charts help detect instability in power supply, while a historical consumption graph supports weekly analysis. The frequency dip and critical high-voltage alarm enable timely diagnostics and response.',
				image: '/src/assets/images/usecases/smart-energy/smart-energy-3.webp',
				imageAlt:
					'Smart Meter A dashboard on the 1st floor showing voltage, frequency, amperage, and energy consumption',
				imageTitle:
					'Smart Meter A on the 1st floor: real-time monitoring of voltage, frequency, current and weekly energy usage with one active high voltage alarm',
			},
			{
				title: 'Smart Meter B — 2nd Floor state',
				description:
					'This dashboard provides full visibility into voltage, frequency, amperage, and energy consumption for Smart Meter B. Real-time charts help detect instability in power supply, while a historical consumption graph supports weekly analysis. The frequency dip and critical high-voltage alarm enable timely diagnostics and response.',
				image: '/src/assets/images/usecases/smart-energy/smart-energy-4.webp',
				imageAlt:
					'Smart Meter B dashboard on the 2nd floor with energy data and real-time frequency',
				imageTitle:
					'Smart Meter B on the 2nd floor: displays live voltage, frequency, amperage and energy consumption. No active alarms detected',
			},
			{
				title: 'Smart Meter C — 3rd Floor state',
				description:
					'This dashboard provides full visibility into voltage, frequency, amperage, and energy consumption for Smart Meter C. Real-time charts help detect instability in power supply, while a historical consumption graph supports weekly analysis. The frequency dip and critical high-voltage alarm enable timely diagnostics and response.',
				image: '/src/assets/images/usecases/smart-energy/smart-energy-5.webp',
				imageAlt:
					'Smart Meter C dashboard on the 3rd floor showing real-time energy metrics and critical alarm',
				imageTitle:
					'Smart Meter C on the 3rd floor: visualization of voltage, frequency, current and consumption, with one unacknowledged low voltage alarm',
			},
			{
				title: 'Theme toggle mode',
				description:
					'With a single click on the theme icon in the top right corner, users can switch between light and dark modes. This flexibility enhances user comfort in various lighting conditions, improves focus, and reduces eye strain — especially during night shifts or long monitoring sessions. The dark theme preserves full dashboard functionality, including charts, alerts, and controls.',
				image: '/src/assets/images/usecases/smart-energy/smart-energy-2.webp',
				imageAlt: 'ThingsBoard dashboard in dark theme with smart meter data visualization',
				imageTitle:
					'Smart energy monitoring in dark mode: ThingsBoard interface displaying real-time metrics and alarm conditions',
			},
		],
		demoUrl:
			'https://demo.thingsboard.io/dashboard/e8e409c0-f2b5-11e6-a6ee-bb0136cc33d0?publicId=963ab470-34c9-11e7-a7ce-bb0136cc33d0',
		demoButtonId: 'UseCases_SmartEnergy_ViewLiveDemo',
		contactUsId: 'UseCases_SmartEnergy_ContactUs',
	},
	applications: {
		title: 'Applications of smart energy solution',
		subtitle:
			'A scalable IoT-based energy monitoring and management system can be adapted for a wide range of industries and infrastructure types. Below are just a few examples of where smart energy solutions can be applied.',
		applications: [
			{
				title: 'Industrial facilities and factories',
				description:
					'Tracking energy usage of heavy machinery, identifying inefficiencies, and improving power distribution for safer and more cost-effective production processes.',
				desktopImage: '/src/assets/images/usecases/smart-energy/factory-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-energy/factory-2.svg',
				imageAlt: 'Factory',
				imageTitle: 'Industrial facilities and factories',
			},
			{
				title: 'Commercial buildings and offices',
				description:
					'Optimizing HVAC, lighting, and equipment usage across floors and departments, with real-time monitoring to reduce energy waste and operational costs.',
				desktopImage: '/src/assets/images/usecases/smart-energy/buildings-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-energy/buildings-2.svg',
				imageAlt: 'Buildings',
				imageTitle: 'Commercial buildings and offices',
			},
			{
				title: 'Educational institutions and campuses',
				description:
					'Controlling power consumption in classrooms, labs, and dormitories, scheduling energy use based on occupancy, and ensuring sustainability targets are met.',
				desktopImage: '/src/assets/images/usecases/smart-energy/education-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-energy/education-2.svg',
				imageAlt: 'School',
				imageTitle: 'Educational institutions and campuses',
			},
			{
				title: 'Data centers',
				description:
					'Maintaining stable voltage, temperature, and load balancing to ensure uninterrupted operations while reducing electricity consumption and cooling costs.',
				desktopImage: '/src/assets/images/usecases/smart-energy/data-centers-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-energy/data-centers-2.svg',
				imageAlt: 'Data centers',
				imageTitle: 'Data centers',
			},
			{
				title: 'Shopping malls and retail chains',
				description:
					'Monitoring energy usage across multiple locations, managing peak hours, and controlling lighting and HVAC systems automatically for higher efficiency.',
				desktopImage: '/src/assets/images/usecases/smart-energy/malls-1.svg',
				mobileImage: '/src/assets/images/usecases/smart-energy/malls-2.svg',
				imageAlt: 'Mall',
				imageTitle: 'Shopping malls and retail chains',
			},
		],
	},
};
