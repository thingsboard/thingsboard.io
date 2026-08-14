import type { UseCaseData } from './types';
import { SCADA_COMMON_BENEFITS } from './_scada-shared';

export const data: UseCaseData = {
	title: 'SCADA Oil & gas drilling system',
	pageTitle: 'SCADA Oil & Gas Drilling Monitoring with ThingsBoard',
	description:
		'Automate oil and gas drilling with ThingsBoard SCADA — real-time monitoring of drawworks, mud pumps, and blowout preventers through unified dashboards.',
	pageSlug: 'scada-oil-and-gas-drilling-system',
	about: {
		shortText:
			'SCADA (Supervisory Control and Data Acquisition) and the ThingsBoard platform play a crucial role in automating oil and gas drilling processes.',
		longText: [
			'The main advantage of SCADA (Supervisory Control and Data Acquisition) systems is their ability to monitor production processes in real time and respond quickly to deviations. ThingsBoard provides comprehensive tools to collect, process, and visualize data from SCADA components, such as PLCs (Programmable Logic Controllers) and RTUs (Remote Terminal Units), enabling seamless integration with various industrial processes.',
			'To illustrate the flexibility of ThingsBoard\'s SCADA integration, we have developed the <a href="/iot-hub/solution-templates/scada-drilling-system/">drilling management system template</a>. This solution demonstrates how SCADA symbols—such as drilling rigs, rotors, hoists, pumps, and preventers—can be utilized to create an efficient and automated drilling control system. It enables the entire drilling process to be visualized on a dashboard, allowing for real-time monitoring of drilling parameters, equipment performance, and safety conditions, ensuring timely detection of anomalies and improved operational efficiency.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/febfdb90-3170-11f0-858a-67efd1bc8a87?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_DrillingSystem_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/scada-drilling-system/scada-drilling-overview-1.webp',
				alt: 'Main state of SCADA drilling system dashboard',
				title: 'Main mimic diagram: rig, pumps, mud tanks and flow',
				width: 1310,
				height: 679,
			},
			{
				src: '/src/assets/images/usecases/scada-drilling-system/scada-drilling-overview-2.webp',
				alt: 'SCADA drilling system dashboard small screen responsiveness',
				title: 'Responsive SCADA layout on tablet and phone',
				width: 1310,
				height: 679,
			},
			{
				src: '/src/assets/images/usecases/scada-drilling-system/scada-drilling-overview-3.webp',
				alt: 'Data state of SCADA drilling system dashboard',
				title: 'Live drill-bit, rotor, drawwork and mud readings',
				width: 1310,
				height: 679,
			},
		],
	},
	solutionStructure: {
		title: 'Solution structure',
		shortText: '',
		schemeSrc: '/src/assets/schemas/oil-and-gas.svg',
		schemeAlt: 'SCADA oil and gas drilling solution structure',
		schemeCaption: 'SCADA oil and gas drilling solution structure',
	},
	benefits: {
		benefits: SCADA_COMMON_BENEFITS,
	},
	scadaKeyFunctions: {
		highPerformance: [
			{
				title: 'Connection components',
				description:
					'These connector symbols facilitate the integration and linking of different equipment and symbols within the SCADA system, ensuring structured and logical connections.',
				image: '/src/assets/images/usecases/scada-drilling-system/connectors.svg',
				imageAlt: 'Examples of SCADA high performance connectors symbols',
			},
			{
				title: 'Drilling structure components',
				description:
					'These symbols represent key structural elements of the drilling system: <b>HP Drilling Rig</b> – Main structure essential for supporting drilling operations. <b>HP Platform</b> – Base structure providing stability and operational support.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-structure-components.svg',
				imageAlt: 'Examples of SCADA high performance drilling structure symbols',
			},
			{
				title: 'Rotational and pressure control components',
				description:
					'Symbols essential for managing drilling rotation and pressure safety: <b>HP Rotor</b> – Manages rotational force applied to the drill string. <b>HP Preventer</b> – Blowout preventer for pressure control and system safety.',
				image: '/src/assets/images/usecases/scada-drilling-system/rotational-pressure-components.svg',
				imageAlt: 'Examples of SCADA high performance rotational and pressure control symbols',
			},
			{
				title: 'Drilling operation components',
				description:
					'Symbols that directly impact the drilling process: <b>HP Drill</b> – Represents the drill bit responsible for boring into the ground.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-operation-components.svg',
				imageAlt: 'Examples of SCADA high performance drilling operation symbols',
			},
			{
				title: 'Crane and hoisting systems',
				description:
					'These symbols facilitate the movement of heavy equipment and materials in drilling operations: <b>HP Drawwork</b> – Controls the hoisting and lowering of the drill string. <b>HP Crane</b> – Represents cranes used for material handling and rig setup.',
				image: '/src/assets/images/usecases/scada-drilling-system/crane-hoisting-components.svg',
				imageAlt: 'Examples of SCADA high performance crane and hoisting systems symbols',
			},
			{
				title: 'Lifting and handling components',
				description:
					'Symbols related to material handling and hoisting systems: <b>HP Hook</b> – Used for lifting and maneuvering drill pipe components. <b>HP Drilling Line</b> – Hoisting system for lowering and raising the drill string.',
				image: '/src/assets/images/usecases/scada-drilling-system/lifting-handling-components.svg',
				imageAlt: 'Examples of SCADA high performance lifting and handling symbols',
			},
			{
				title: 'Scale and control components',
				description:
					'These SCADA components provide real-time monitoring and control of critical drilling parameters such as depth, pressure, speed, and temperature. The rotor control module enables operators to efficiently activate or deactivate drilling equipment, ensuring safe and optimized operations.',
				image: '/src/assets/images/usecases/scada-drilling-system/scale-control-components.svg',
				imageAlt: 'Examples of SCADA high performance scale and control symbols',
			},
		],
		traditional: [],
	},
	dashboardStructure: {
		title: 'Dashboard structure',
		panels: [
			{
				title: 'Main drilling SCADA system state',
				description:
					'This interactive SCADA dashboard allows operators to monitor the drilling process in real-time, tracking key parameters such as rotary speed, drilling depth, tension, and flow rate. Operators can control pumps, rotors, and preventers, ensuring optimal drilling performance. The system provides visual indicators and real-time graphs to track well conditions and equipment status.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-main.webp',
				imageAlt: 'Main drilling SCADA system dashboard with interactive rig schematic',
				imageTitle:
					'Main SCADA dashboard showing the complete drilling rig with real-time operational parameters',
			},
			{
				title: 'Data monitoring SCADA system state',
				description:
					'This interactive SCADA dashboard allows operators to monitor real-time drilling performance, equipment status, and environmental conditions. Users can track drill bit position, well pressure, mud flow, and mechanical tension, ensuring optimal drilling efficiency. The dashboard provides control options for key components such as the rotor, preventer, and drawworks, allowing operators to make adjustments directly from the interface. By analyzing real-time data on temperature, vibration, and gas cut levels, the system helps prevent equipment failures and operational risks, enhancing drilling safety and performance.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-data.webp',
				imageAlt: 'Data monitoring SCADA dashboard with telemetry tables and trend charts',
				imageTitle:
					'Data monitoring view with real-time telemetry tables and historical trend analysis',
			},
			{
				title: 'Drilling rig state',
				description:
					'Operators can oversee and control drilling rig operations, including rotary speed, hoisting speed, and pressure monitoring. The dashboard includes real-time graphs for load analysis and drilling progress, ensuring operational safety and efficiency.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-rig.webp',
				imageAlt: 'Drilling rig SCADA dashboard with structural status indicators',
				imageTitle:
					'Drilling rig overview with real-time structural and mechanical status monitoring',
			},
			{
				title: 'Drawwork state',
				description:
					'This section focuses on hoisting and lowering the drill string. Operators can adjust the lifting speed, direction, and tension. The dashboard displays vibration levels, position tracking, and inclination monitoring, providing full control over the drawwork system.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-drawwork.webp',
				imageAlt: 'Drawwork SCADA dashboard with hoisting system parameters',
				imageTitle: 'Drawwork monitoring dashboard showing drum speed, hook load, and brake status',
			},
			{
				title: 'Preventer (BOP) state',
				description:
					'The BOP system dashboard ensures well pressure control and safety. Operators can activate or deactivate the preventer, monitor system leaks, mud temperature, and gas cut levels, and analyze pressure trends through real-time graphs.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-preventer.webp',
				imageAlt: 'BOP preventer SCADA dashboard with safety status indicators',
				imageTitle:
					'Blowout Preventer monitoring with accumulator pressure and ram status indicators',
			},
			{
				title: 'Drill bit state',
				description:
					'This section tracks drilling speed, bit position, vibration, and temperature at the bottom of the well. Operators can assess the rate of penetration (ROP) and ensure that drilling conditions remain within optimal parameters.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-bit.webp',
				imageAlt: 'Drill bit SCADA dashboard with performance metrics and trends',
				imageTitle:
					'Drill bit performance monitoring with weight on bit, torque, and rate of penetration',
			},
			{
				title: 'Drilling mud state',
				description:
					'Operators can monitor and control drilling fluid properties, including flow rate, mud level, density, pressure, and temperature. The system provides real-time tracking of fluid circulation, ensuring proper lubrication and cooling of the drill bit.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-tank.webp',
				imageAlt: 'Drilling mud SCADA dashboard with pump pressure and tank levels',
				imageTitle:
					'Drilling mud system monitoring with circulation parameters and tank level indicators',
			},
			{
				title: 'Alarms',
				description:
					'This dashboard section logs real-time alerts and system warnings, enabling operators to identify and respond to critical issues such as equipment failures, abnormal pressure readings, or unexpected temperature.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-alarms.webp',
				imageAlt: 'Drilling system alarms dashboard with severity categories and timeline',
				imageTitle:
					'Centralized alarm management with severity-based categorization and event timeline',
			},
			{
				title: 'Modbus gateway & device connectivity',
				description:
					'This section provides an overview of all connected devices, showing their status, protocol (Modbus), and data communication. Operators can configure connections, monitor device health, and troubleshoot errors in real-time.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-gateway.webp',
				imageAlt: 'Modbus gateway dashboard showing device connectivity and communication status',
				imageTitle:
					'IoT Gateway monitoring with Modbus device connectivity status and data throughput',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/febfdb90-3170-11f0-858a-67efd1bc8a87?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_DrillingSystem_ViewLiveDemo',
		contactUsId: 'UseCases_ScadaDrilling_ContactUs',
	},
	applications: {
		title: 'Applications of SCADA systems',
		applications: [
			{
				title: 'Mining and material extraction',
				description:
					'Symbols like cranes, drilling rigs, and hoisting systems support underground and open-pit mining by managing heavy equipment movement, monitoring ore extraction, and ensuring operational efficiency.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/mining.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/mining-2.svg',
				imageAlt: 'Mining and material extraction',
				imageTitle: 'Mining and material extraction',
			},
			{
				title: 'Water and wastewater management',
				description:
					'SCADA elements including valve control, pump monitoring, and real-time scaling systems assist in managing municipal water distribution, wastewater treatment, and irrigation systems for optimal efficiency.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/water.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/water-2.svg',
				imageAlt: 'Water and wastewater management',
				imageTitle: 'Water and wastewater management',
			},
			{
				title: 'Industrial automation and manufacturing',
				description:
					'SCADA components such as drawworks, control panels, and dynamic monitoring scales help automate material handling, optimize assembly lines, and regulate heavy machinery operations in manufacturing plants.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/automation.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/automation-2.svg',
				imageAlt: 'Industrial automation and manufacturing',
				imageTitle: 'Industrial automation and manufacturing',
			},
			{
				title: 'Transportation and logistics',
				description:
					'Symbols like cranes and hoists can be used in ports, airports, and warehouses to monitor cargo handling, automate container movement, and improve operational workflow in logistics.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/logistics.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/logistics-2.svg',
				imageAlt: 'Transportation and logistics',
				imageTitle: 'Transportation and logistics',
			},
			{
				title: 'Construction and infrastructure development',
				description:
					'Equipment like cranes, drilling rigs, and hoisting lines are critical in large-scale construction projects, enabling real-time monitoring of material transport, foundation drilling, and structural stability.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/construction.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/construction-2.svg',
				imageAlt: 'Construction and infrastructure development',
				imageTitle: 'Construction and infrastructure development',
			},
		],
	},
};
