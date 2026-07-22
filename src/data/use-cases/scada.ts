import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'SCADA Swimming pool',
	pageTitle: 'SCADA Swimming Pool Management System with ThingsBoard',
	description:
		'Monitor and control swimming pool systems in real time with ThingsBoard SCADA — high-performance and traditional HMIs with dashboards, alarms, and Modbus.',
	pageSlug: 'scada',
	about: {
		shortText:
			'SCADA systems are generally divided into two types: Traditional, which focuses on basic monitoring and control, and High-Performance, emphasizing streamlined interfaces, faster decision-making, and enhanced operational efficiency.',
		longText: [
			'The main advantage of SCADA (Supervisory Control and Data Acquisition) systems is their ability to monitor production processes in real time and respond quickly to deviations. ThingsBoard provides comprehensive tools to collect, process, and visualize data from SCADA components, such as PLCs (Programmable Logic Controllers) and RCUs (Remote Control Units), enabling seamless integration with various industrial processes.',
			'To illustrate the flexibility of ThingsBoard\'s SCADA integration, we have developed the <a href="/iot-hub/solution-templates/swimming-pool-scada-system/">swimming pool management system template</a>. This solution demonstrates how SCADA symbols\u2014such as valves, motors, filters and tanks\u2014can be utilized to create simple yet powerful process control systems. It enables any production process to be visualized on a dashboard, allowing for real-time monitoring of equipment operation and timely detection of alarm signals. The template is designed to accommodate both Traditional and High-Performance SCADA systems.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/231a5800-ce96-11ef-852e-bd51c2b30fde?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_SCADA_ViewLiveDemo',
	},
	scadaOverview: {
		baseImage: '/src/assets/images/usecases/scada/traditional.webp',
		overlayImage: '/src/assets/images/usecases/scada/high-performance.webp',
		comparisonRows: [
			{
				criteria: 'Design approach',
				highPerformance: 'Simplified, minimalist approach for focused operation',
				traditional: 'Dynamic, visually engaging and interactive design',
			},
			{
				criteria: 'Color-coded visualization (active)',
				highPerformance: 'White elements',
				traditional: 'Green elements',
			},
			{
				criteria: 'Color-coded visualization (inactive)',
				highPerformance: 'Dark gray elements',
				traditional: 'Dark gray elements',
			},
			{
				criteria: 'Alarm indicators (warning)',
				highPerformance: 'Yellow triangle, animated',
				traditional: 'Yellow color, animated',
			},
			{
				criteria: 'Alarm indicators (critical)',
				highPerformance: 'Red square, animated',
				traditional: 'Red color, animated',
			},
			{
				criteria: 'Interactivity',
				highPerformance: 'Not explicitly interactive',
				traditional: 'Fully interactive components',
			},
		],
	},
	solutionStructure: {
		title: 'Solution structure',
		shortText: '',
		schemeSrc: '/src/assets/schemas/swimming-pool.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
	},
	benefits: {
		benefits: [
			{
				title: 'PLCs and RTUs',
				description:
					'Seamlessly integrate your SCADA system with PLCs and RTUs using ThingsBoard integrations and IoT Gateway. Support for Modbus, OPC-UA, BACnet, and other popular protocols ensures reliable real-time data collection and control.',
			},
			{
				title: 'IoT gateway',
				description:
					"ThingsBoard's IoT Gateway bridges the gap between legacy SCADA devices and modern IoT platforms. It ensures data reliability with built-in local data storage during network outages and supports efficient protocol conversion, secure data transmission, and centralized device management.",
			},
			{
				title: 'Data processing',
				description:
					"Unlock actionable insights with ThingsBoard's robust data processing tools. Perform real-time transformations, apply complex rules, and automate workflows with built-in rule chains and scriptable integrations.",
			},
			{
				title: 'Alarm system',
				description:
					"Enhance operational awareness with ThingsBoard's advanced alarm system. Manage incident workflows with features like alarm acknowledgment, clearing, commenting, and configurable escalation rules.",
			},
			{
				title: 'Notification system',
				description:
					"Stay informed with ThingsBoard's flexible notification system, delivering alerts via email, SMS, Slack, or custom webhooks. Automate critical notifications based on configurable conditions and thresholds.",
			},
			{
				title: 'IoT dashboards',
				description:
					"Visualize your SCADA data with ThingsBoard's real-time IoT dashboards. Design interactive views using SCADA symbols, customizable widgets, and dynamic updates to monitor and control processes seamlessly.",
			},
		],
	},
	scadaKeyFunctions: {
		highPerformance: [
			{
				title: 'Connectors and flow Direction',
				description:
					'These symbols are designed to visualize and organize pipe connections, providing a clear representation of junctions and flow directions.',
				image: '/src/assets/images/usecases/scada/connectors.svg',
				imageAlt: 'Examples of SCADA high performance connectors symbols',
			},
			{
				title: 'Fluid filtration',
				description:
					'Filter symbols provide visualization and control over filtration processes, ensuring the cleanliness and safety of the liquids being used in the system.',
				image: '/src/assets/images/usecases/scada/fluid-filtration.svg',
				imageAlt: 'Examples of SCADA high performance fluid filters symbols',
			},
			{
				title: 'Pump monitoring and management',
				description:
					'A range of pump symbols (centrifugal, heat, motor pumps) allows for monitoring the performance and efficiency of pump systems. This solution is particularly important for regulating pressure and liquid volumes.',
				image: '/src/assets/images/usecases/scada/pump-monitoring-management.svg',
				imageAlt: 'Examples of SCADA high performance pump symbols',
			},
			{
				title: 'Flow regulation',
				description:
					'These symbols allow operators to manage fluid flow through pipelines by opening or closing valves remotely. This ensures flexibility in regulating flow rates and isolating system segments during maintenance or emergencies.',
				image: '/src/assets/images/usecases/scada/flow-regulation.svg',
				imageAlt: 'Examples of SCADA high performance flow regulation symbols',
			},
			{
				title: 'Tank level monitoring',
				description:
					'Tank level meter and reservoir symbols enable operators to monitor liquid levels within the system, preventing both overflow and depletion—critical for water supply and chemical processes.',
				image: '/src/assets/images/usecases/scada/tank-level-monitoring.svg',
				imageAlt: 'Examples of SCADA high performance tanks symbols',
			},
			{
				title: 'Scales for Real-Time Monitoring',
				description:
					'Scales provide an intuitive way to monitor various parameters in real time, such as temperature, pressure, or flow rate. The scales enable operators to track current values and identify deviations from the desired range, ensuring precise control over system performance.',
				image: '/src/assets/images/usecases/scada/scales.svg',
				imageAlt: 'Examples of SCADA high performance scale symbols',
			},
		],
		traditional: [
			{
				title: 'Pipe monitoring and leakage sensors',
				description:
					'Drain pipe symbols help visualize areas where potential liquid leaks might occur. In SCADA systems, this solution can be integrated with sensors to immediately alert operators to any issues.',
				image: '/src/assets/images/usecases/scada/pipe.svg',
				imageAlt: 'Three examples of pipe monitoring and leakage sensors as dashboard symbols',
			},
			{
				title: 'Fluid filtration',
				description:
					'Filter symbols provide visualization and control over filtration processes, ensuring the cleanliness and safety of the liquids being used in the system.',
				image: '/src/assets/images/usecases/scada/fluid.svg',
				imageAlt: 'Three examples of fluid filtration dashboard symbols',
			},
			{
				title: 'Pump monitoring and management',
				description:
					'A range of pump symbols (centrifugal, heat, motor pumps) allows for monitoring the performance and efficiency of pump systems. This solution is particularly important for regulating pressure and liquid volumes.',
				image: '/src/assets/images/usecases/scada/pump.svg',
				imageAlt: 'Three examples of pump monitoring and management dashboard symbols',
			},
			{
				title: 'Flow regulation',
				description:
					'Flow meter and valve symbols allow precise control of fluid flow through pipelines, which is essential for filtration, cooling, and water supply systems.',
				image: '/src/assets/images/usecases/scada/flow.svg',
				imageAlt: 'Three examples of flow regulation dashboard symbols',
			},
			{
				title: 'Tank level monitoring',
				description:
					'Tank level meter and reservoir symbols enable operators to monitor liquid levels within the system, preventing both overflow and depletion—critical for water supply and chemical processes.',
				image: '/src/assets/images/usecases/scada/tank.svg',
				imageAlt: 'Three examples of tank level monitoring dashboard symbols',
			},
		],
	},
	scadaDashboardStructure: {
		highPerformance: {
			title: 'Dashboard structure',
			panels: [
				{
					title: 'Swimming pool SCADA system state',
					description:
						"This interactive state allows operators to monitor the pool's water level, temperature, and equipment operation. In real time, users can heat the pool, drain it, or fill it with water. By interacting with the on-screen widgets for water level, temperature, the filter sensor, and the pH filter, operators can access and control readings directly from a single dashboard.",
					image: '/src/assets/images/usecases/scada/hp-swiming-pool-system-state.webp',
					imageAlt: 'Swimming pool SCADA system state dashboard',
				},
				{
					title: 'Water pump state',
					description:
						"This feature enables real-time monitoring of critical parameters like flow rate, temperature, rotation speed, vibration, and power consumption. It also provides information on the pump's status and last maintenance. An alarm widget is integrated for rapid response to any issues, ensuring that any malfunctions can be quickly addressed and resolved.",
					image: '/src/assets/images/usecases/scada/hp-water-pump-state.webp',
					imageAlt: 'Water pump state dashboard',
				},
				{
					title: 'Heat pump state',
					description:
						"This screen offers a comprehensive view of the heat pump's performance, including indicators like temperature, rotation speed, vibration, refrigerant pressure, and power consumption. Key data, such as inlet and outlet water temperatures, the desired pool water temperature, and the ambient air temperature, are displayed. Based on these inputs, the heat pump will automatically switch on or off. Operators can adjust the pool water temperature directly from the heat pump widget and also view information about the filter's status and the last maintenance date. An alarm widget ensures that any malfunctions are quickly addressed in real time.",
					image: '/src/assets/images/usecases/scada/hp-heat-pump-state.webp',
					imageAlt: 'Heat pump state dashboard',
				},
				{
					title: 'Sand filter state',
					description:
						"The sand filter state provides detailed monitoring of flow rate, pressure, rotation speed, and vibration. It also displays the filter's current mode, last maintenance date, and next scheduled service. Operators can easily switch filter modes directly from the widget, for example, from filtration to water draining (waste mode) with a simple click on the mode display.",
					image: '/src/assets/images/usecases/scada/hp-sand-filter-state.webp',
					imageAlt: 'Sand filter state dashboard',
				},
				{
					title: 'Gateway',
					description:
						'An essential component of this solution is the Gateway, which integrates all devices using an emulator. To simulate the entire swimming pool system, a Modbus emulator is employed, combining 14 individual devices. These devices operate as a unified system, communicating seamlessly via the Modbus protocol. For real-time monitoring of device data received from Modbus servers, the ThingsBoard IoT Gateway dashboard provides a clear view of the status and data from all connected devices, allowing operators to monitor and manage the system effortlessly.',
					image: '/src/assets/images/usecases/scada/hp-gateway.webp',
					imageAlt: 'Gateway dashboard',
				},
			],
			demoUrl:
				'https://thingsboard.cloud/dashboard/231a5800-ce96-11ef-852e-bd51c2b30fde?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
			demoButtonId: 'UseCases_SCADA_ViewLiveDemo',
			contactUsId: 'UseCases_SCADA_ContactUs',
		},
		traditional: {
			title: 'Dashboard structure',
			panels: [
				{
					title: 'Swimming pool SCADA system state',
					description:
						"This interactive state allows operators to monitor the pool's water level, temperature, and equipment operation. In real time, users can heat the pool, drain it, or fill it with water. By interacting with the on-screen widgets for water level, temperature, the filter sensor, and the pH filter, operators can access and control readings directly from a single dashboard.",
					image: '/src/assets/images/usecases/scada/swiming-pool-system-state.webp',
					imageAlt: 'Swimming pool SCADA system state dashboard',
				},
				{
					title: 'Water pump state',
					description:
						"This feature enables real-time monitoring of critical parameters like flow rate, temperature, rotation speed, vibration, and power consumption. It also provides information on the pump's status and last maintenance. An alarm widget is integrated for rapid response to any issues, ensuring that any malfunctions can be quickly addressed and resolved.",
					image: '/src/assets/images/usecases/scada/water-pump-state.webp',
					imageAlt: 'Water pump state dashboard',
				},
				{
					title: 'Heat pump state',
					description:
						"This screen offers a comprehensive view of the heat pump's performance, including indicators like temperature, rotation speed, vibration, refrigerant pressure, and power consumption. Key data, such as inlet and outlet water temperatures, the desired pool water temperature, and the ambient air temperature, are displayed. Based on these inputs, the heat pump will automatically switch on or off. Operators can adjust the pool water temperature directly from the heat pump widget and also view information about the filter's status and the last maintenance date. An alarm widget ensures that any malfunctions are quickly addressed in real time.",
					image: '/src/assets/images/usecases/scada/heat-pump-state.webp',
					imageAlt: 'Heat pump state dashboard',
				},
				{
					title: 'Sand filter state',
					description:
						"The sand filter state provides detailed monitoring of flow rate, pressure, rotation speed, and vibration. It also displays the filter's current mode, last maintenance date, and next scheduled service. Operators can easily switch filter modes directly from the widget, for example, from filtration to water draining (waste mode) with a simple click on the mode display.",
					image: '/src/assets/images/usecases/scada/sand-filter-state.webp',
					imageAlt: 'Sand filter state dashboard',
				},
				{
					title: 'Gateway',
					description:
						'An essential component of this solution is the Gateway, which integrates all devices using an emulator. To simulate the entire swimming pool system, a Modbus emulator is employed, combining 14 individual devices. These devices operate as a unified system, communicating seamlessly via the Modbus protocol. For real-time monitoring of device data received from Modbus servers, the ThingsBoard IoT Gateway dashboard provides a clear view of the status and data from all connected devices, allowing operators to monitor and manage the system effortlessly.',
					image: '/src/assets/images/usecases/scada/gateway.webp',
					imageAlt: 'Gateway dashboard',
				},
			],
			demoUrl:
				'https://thingsboard.cloud/dashboard/231a5800-ce96-11ef-852e-bd51c2b30fde?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
			demoButtonId: 'UseCases_SCADA_ViewLiveDemo',
			contactUsId: 'UseCases_SCADA_ContactUs',
		},
	},
	applications: {
		title: 'Applications of SCADA systems',
		applications: [
			{
				title: 'Water and wastewater management',
				description:
					'Ensuring continuous water supply and efficient wastewater treatment is made easier through precise control and management of systems.',
				desktopImage: '/src/assets/images/usecases/scada/water-1.svg',
				mobileImage: '/src/assets/images/usecases/scada/water-2.svg',
				imageAlt: 'Water valve',
			},
			{
				title: 'Oil and gas industry',
				description:
					'From extraction to refining, SCADA symbols help manage complex processes, ensuring the safety and efficiency of operations.',
				desktopImage: '/src/assets/images/usecases/scada/oil-1.svg',
				mobileImage: '/src/assets/images/usecases/scada/oil-2.svg',
				imageAlt: 'Oil pump',
			},
			{
				title: 'Food industry',
				description:
					'Product quality control is achieved through precise management of processes like mixing, heating, and cooling of liquids.',
				desktopImage: '/src/assets/images/usecases/scada/food-1.svg',
				mobileImage: '/src/assets/images/usecases/scada/food-2.svg',
				imageAlt: 'Food conveyor',
			},
			{
				title: 'Chemical industry',
				description:
					'Filter symbols provide visualization and control over filtration processes, ensuring the cleanliness and safety of the liquids being used in the system.',
				desktopImage: '/src/assets/images/usecases/scada/chemical-1.svg',
				mobileImage: '/src/assets/images/usecases/scada/chemical-2.svg',
				imageAlt: 'Chemical plant',
			},
			{
				title: 'Energy and heating',
				description:
					'Optimization of heating, ventilation, and air conditioning (HVAC) systems becomes more efficient with accurate control of flows and temperatures.',
				desktopImage: '/src/assets/images/usecases/scada/energy-1.svg',
				mobileImage: '/src/assets/images/usecases/scada/energy-2.svg',
				imageAlt: 'Power plant',
			},
		],
	},
};
