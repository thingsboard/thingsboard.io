import type { UseCaseData } from './types';

export const scadaDrillingData: UseCaseData = {
	title: 'SCADA Oil & gas drilling system',
	pageTitle: 'SCADA Oil & Gas Drilling Monitoring with ThingsBoard',
	description:
		'Automate oil and gas drilling operations with ThingsBoard SCADA. Real-time monitoring of drawworks, mud pumps, and blowout preventers through unified dashboards, alarms, and protocol integration.',
	pageSlug: 'scada-oil-and-gas-drilling-system',
	about: {
		shortText:
			'SCADA (Supervisory Control and Data Acquisition) and the ThingsBoard platform play a crucial role in automating oil and gas drilling processes.',
		longText: [
			'Modern drilling operations demand constant oversight of dozens of interconnected subsystems — from drawworks and drill bits to mud pumps and blowout preventers. Manual monitoring of these components is impractical at the speed and scale required by today\'s operations. ThingsBoard provides a unified <a href="/docs/pe/recipes/solution-templates/scada-drilling-system/">SCADA drilling system</a> that brings all critical parameters into a single real-time interface, enabling operators to detect anomalies, respond to alarms, and maintain safe drilling conditions around the clock.',
			'By combining industrial protocol support with powerful visualization and rule-based automation, ThingsBoard transforms raw sensor data from drilling equipment into actionable insights. The platform supports real-time data acquisition from PLCs and RTUs via Modbus, OPC-UA, and other industrial protocols, processes telemetry through configurable rule chains, and presents the results on interactive SCADA dashboards tailored to drilling operations.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/febfdb90-3170-11f0-858a-67efd1bc8a87?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_DrillingSystem_ViewLiveDemo',
	},
	solutionStructure: {
		title: 'Solution structure of SCADA oil & gas drilling system',
		shortText:
			'The SCADA drilling solution connects PLCs (Programmable Logic Controllers) and RTUs (Remote Terminal Units) installed on drilling equipment to ThingsBoard via industrial protocols such as Modbus and OPC-UA. These controllers collect real-time data from sensors monitoring pressure, torque, rotation speed, flow rates, and equipment status across the entire drilling rig.',
		longText: [
			'ThingsBoard IoT Gateway serves as the bridge between field-level industrial devices and the cloud platform, handling protocol conversion, local data buffering during network outages, and secure data transmission. Once telemetry reaches the platform, the Rule Engine processes incoming data streams, evaluates alarm conditions, and triggers automated responses — from sending notifications to adjusting operational parameters.',
			'The processed data is visualized on purpose-built SCADA dashboards that provide operators with a comprehensive view of the entire drilling operation. Interactive diagrams of the drilling rig, drawwork, preventer, drill bit, and mud systems allow operators to drill down into individual component details, monitor trends, and manage alarms from a single interface.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of SCADA drilling system',
		panels: [
			{
				title: 'Main drilling SCADA system',
				description:
					'The main SCADA dashboard provides a comprehensive overview of the entire drilling operation with an interactive schematic of the drilling rig. Real-time indicators display critical parameters including hook load, rotary torque, pump pressure, and mud flow rate. Color-coded status markers highlight active equipment, idle components, and alarm states, enabling operators to assess the overall system health at a glance.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-main.webp',
				imageAlt: 'Main drilling SCADA system dashboard with interactive rig schematic',
				imageTitle:
					'Main SCADA dashboard showing the complete drilling rig with real-time operational parameters',
			},
			{
				title: 'Data monitoring SCADA system',
				description:
					'The data monitoring dashboard presents detailed telemetry from all drilling subsystems in a structured tabular and chart format. Operators can view real-time values alongside historical trends for parameters such as weight on bit, rate of penetration, standpipe pressure, and rotary speed. Configurable time ranges and data export capabilities support detailed analysis and shift handover documentation.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-data.webp',
				imageAlt: 'Data monitoring SCADA dashboard with telemetry tables and trend charts',
				imageTitle:
					'Data monitoring view with real-time telemetry tables and historical trend analysis',
			},
			{
				title: 'Drilling rig',
				description:
					'The drilling rig dashboard focuses on the structural and mechanical status of the rig itself. Interactive SCADA symbols represent the derrick, substructure, and supporting systems with real-time status indicators. Operators can monitor rig-level parameters including mast tension, guy-wire loads, and structural vibration to ensure safe operating conditions throughout the drilling process.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-rig.webp',
				imageAlt: 'Drilling rig SCADA dashboard with structural status indicators',
				imageTitle:
					'Drilling rig overview with real-time structural and mechanical status monitoring',
			},
			{
				title: 'Drawwork',
				description:
					'The drawwork dashboard monitors the hoisting system responsible for raising and lowering the drill string. Real-time data includes drum speed, brake status, hook load, and deadline anchor tension. Trend charts track drawwork performance over time, helping operators optimize tripping operations and detect early signs of mechanical wear or overload conditions.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-drawwork.webp',
				imageAlt: 'Drawwork SCADA dashboard with hoisting system parameters',
				imageTitle: 'Drawwork monitoring dashboard showing drum speed, hook load, and brake status',
			},
			{
				title: 'Preventer (BOP)',
				description:
					'The Blowout Preventer (BOP) dashboard provides critical safety monitoring for the well control system. Real-time indicators display annular and ram preventer status, accumulator pressure, and control pod conditions. The dashboard is designed for immediate visual recognition of BOP readiness, with prominent alarm indicators for any deviation from safe operating parameters.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-preventer.webp',
				imageAlt: 'BOP preventer SCADA dashboard with safety status indicators',
				imageTitle:
					'Blowout Preventer monitoring with accumulator pressure and ram status indicators',
			},
			{
				title: 'Drill bit',
				description:
					'The drill bit dashboard tracks performance metrics of the active drilling assembly including weight on bit, torque, rotation speed, and rate of penetration. Real-time and historical trend comparisons help drilling engineers optimize bit performance, identify formation changes, and determine optimal parameters for maximizing drilling efficiency and bit life.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-bit.webp',
				imageAlt: 'Drill bit SCADA dashboard with performance metrics and trends',
				imageTitle:
					'Drill bit performance monitoring with weight on bit, torque, and rate of penetration',
			},
			{
				title: 'Drilling mud',
				description:
					'The drilling mud dashboard monitors the mud circulation system including pump pressure, flow rates, mud weight, temperature, and tank levels. Interactive tank level indicators show pit volumes in real time, while trend charts track mud properties over the course of drilling operations. Automated alarms alert operators to abnormal mud losses or gains that may indicate wellbore instability.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-tank.webp',
				imageAlt: 'Drilling mud SCADA dashboard with pump pressure and tank levels',
				imageTitle:
					'Drilling mud system monitoring with circulation parameters and tank level indicators',
			},
			{
				title: 'Alarms',
				description:
					'The alarms dashboard provides a centralized view of all active, acknowledged, and historical alarms across the drilling operation. Alarms are categorized by severity — critical, major, minor, and warning — with filtering capabilities by subsystem, time range, and status. The alarm timeline enables operators to correlate events across different components and identify root causes of operational issues.',
				image: '/src/assets/images/usecases/scada-drilling-system/drilling-alarms.webp',
				imageAlt: 'Drilling system alarms dashboard with severity categories and timeline',
				imageTitle:
					'Centralized alarm management with severity-based categorization and event timeline',
			},
			{
				title: 'Modbus gateway & device connectivity',
				description:
					'The gateway dashboard displays the status of all Modbus connections between field devices and the ThingsBoard platform. Operators can monitor gateway health, connection status for each PLC and RTU, data throughput, and communication error rates. The interface supports gateway configuration, device mapping, and troubleshooting of connectivity issues — ensuring reliable data flow from the drilling floor to the monitoring center.',
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
		title: 'Applications of SCADA drilling system',
		applications: [
			{
				title: 'Mining and material extraction',
				description:
					'Applies SCADA monitoring to mining drill rigs and extraction equipment, providing real-time visibility into drilling depth, bit wear, and subsurface conditions. Automated alarms and trend analytics help mining operators maximize extraction efficiency while maintaining safety standards.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/mining.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/mining-2.svg',
				imageAlt: 'Mining and material extraction',
				imageTitle: 'Mining and material extraction',
			},
			{
				title: 'Water and wastewater management',
				description:
					'Extends SCADA drilling system capabilities to well drilling and groundwater extraction operations. Real-time monitoring of pump pressure, flow rates, and water table levels ensures sustainable water resource management and regulatory compliance.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/water.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/water-2.svg',
				imageAlt: 'Water and wastewater management',
				imageTitle: 'Water and wastewater management',
			},
			{
				title: 'Industrial automation and manufacturing',
				description:
					'Leverages the SCADA platform for monitoring and controlling industrial machinery and production lines. ThingsBoard integrates with PLCs and RTUs across manufacturing floors, providing centralized oversight of equipment status, production metrics, and maintenance schedules.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/automation.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/automation-2.svg',
				imageAlt: 'Industrial automation and manufacturing',
				imageTitle: 'Industrial automation and manufacturing',
			},
			{
				title: 'Transportation and logistics',
				description:
					'Applies SCADA monitoring to transportation infrastructure including pipeline networks, loading terminals, and fuel distribution systems. Real-time tracking of flow rates, pressure, and equipment status ensures operational continuity and safety compliance across logistics operations.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/logistics.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/logistics-2.svg',
				imageAlt: 'Transportation and logistics',
				imageTitle: 'Transportation and logistics',
			},
			{
				title: 'Construction and infrastructure',
				description:
					'Utilizes SCADA capabilities for monitoring drilling and foundation work on construction sites. Real-time data from pile-driving rigs, boring machines, and geotechnical sensors helps construction teams maintain quality standards and optimize project timelines.',
				desktopImage: '/src/assets/images/usecases/scada-drilling-system/construction.svg',
				mobileImage: '/src/assets/images/usecases/scada-drilling-system/construction-2.svg',
				imageAlt: 'Construction and infrastructure',
				imageTitle: 'Construction and infrastructure',
			},
		],
	},
};
