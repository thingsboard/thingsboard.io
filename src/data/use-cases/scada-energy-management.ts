import type { UseCaseData } from './types';

export const scadaEnergyManagementData: UseCaseData = {
	title: 'SCADA Energy management',
	pageTitle: 'SCADA Energy management',
	description: 'Energy management solution with ThingsBoard IoT platform',
	pageSlug: 'scada-energy-management',
	about: {
		shortText:
			'SCADA (Supervisory Control and Data Acquisition) systems play a crucial role in energy monitoring and management, providing real-time insights into power generation, distribution, and consumption. With platforms like ThingsBoard, businesses can integrate advanced SCADA solutions to optimize energy efficiency, reduce costs, and enhance system reliability.',
		longText: [
			'Energy management at scale requires continuous monitoring of diverse generation sources, distribution networks, and consumption endpoints. ThingsBoard provides a comprehensive <a href="/docs/pe/solution-templates/scada-energy-management/">SCADA energy management solution</a> that unifies data from solar panels, wind turbines, batteries, transformers, and generators into a single real-time platform — enabling operators to optimize energy flows, balance loads, and respond instantly to grid anomalies.',
			'The platform supports seamless integration with industrial energy infrastructure through Modbus, OPC-UA, and other protocols via the ThingsBoard IoT Gateway. Combined with powerful rule-based automation, configurable alarm systems, and interactive SCADA dashboards, ThingsBoard transforms complex energy data into actionable intelligence — helping organizations reduce costs, improve reliability, and accelerate their transition to sustainable energy operations.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/2430dc20-3172-11f0-858a-67efd1bc8a87?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_ScadaEnergy_ViewLiveDemo',
	},
	solutionStructure: {
		title: 'Solution structure of SCADA energy management system',
		shortText:
			'The SCADA energy management solution connects PLCs (Programmable Logic Controllers) and RTUs (Remote Terminal Units) installed on energy generation, storage, and distribution equipment to ThingsBoard via industrial protocols such as Modbus and OPC-UA. These controllers collect real-time data from inverters, solar panels, wind turbines, batteries, transformers, and generators.',
		longText: [
			'ThingsBoard IoT Gateway bridges the gap between field-level energy equipment and the cloud platform, handling protocol conversion, local data buffering during connectivity interruptions, and secure data transmission. Once telemetry data reaches the platform, the Rule Engine processes incoming streams, evaluates alarm conditions for voltage deviations, power output drops, and equipment faults, and triggers automated response workflows.',
			'The processed data is visualized on purpose-built SCADA dashboards that provide operators with a complete view of the energy ecosystem. Interactive diagrams of solar arrays, wind farms, battery banks, and grid connections allow operators to monitor generation output, storage levels, consumption patterns, and equipment health from a single unified interface.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of SCADA energy management system',
		panels: [
			{
				title: 'Main dashboard',
				description:
					'The main SCADA dashboard provides a comprehensive overview of the entire energy management system. An interactive schematic displays all connected energy sources, storage systems, and consumption endpoints with real-time power flow indicators. Operators can instantly assess total generation capacity, current load, battery charge levels, and grid exchange status from a single unified view.',
				image: '/src/assets/images/usecases/scada-energy-management/1.webp',
				imageAlt: 'Main SCADA energy management dashboard with power flow overview',
				imageTitle:
					'Main energy management dashboard showing real-time power flows across generation, storage, and consumption',
			},
			{
				title: 'Inverters',
				description:
					'The inverter dashboard monitors the performance of all solar and battery inverters in the system. Real-time data includes DC input voltage and current, AC output power, conversion efficiency, and operating temperature. Trend charts track inverter output over time, helping operators identify performance degradation and schedule preventive maintenance before failures occur.',
				image: '/src/assets/images/usecases/scada-energy-management/2.webp',
				imageAlt: 'Inverter monitoring dashboard with efficiency and output metrics',
				imageTitle:
					'Inverter performance monitoring with real-time conversion efficiency and output power',
			},
			{
				title: 'Solar panels',
				description:
					'The solar panel dashboard tracks the output of individual panels and string arrays in real time. Key metrics include power generation, voltage, current, and irradiance levels. Comparative charts highlight underperforming panels, enabling maintenance teams to quickly identify shading issues, soiling, or hardware faults that reduce overall array efficiency.',
				image: '/src/assets/images/usecases/scada-energy-management/3.webp',
				imageAlt: 'Solar panel monitoring dashboard with generation metrics and array comparison',
				imageTitle:
					'Solar panel array monitoring with real-time generation data and panel-level performance comparison',
			},
			{
				title: 'Wind turbine',
				description:
					'The wind turbine dashboard provides real-time monitoring of turbine performance including rotor speed, power output, wind speed, nacelle orientation, and blade pitch angle. Historical trend analysis helps operators correlate output with weather conditions, optimize yaw control, and plan maintenance windows during low-wind periods to minimize generation losses.',
				image: '/src/assets/images/usecases/scada-energy-management/4.webp',
				imageAlt: 'Wind turbine SCADA dashboard with rotor speed and power output',
				imageTitle:
					'Wind turbine monitoring with real-time rotor speed, power output, and wind conditions',
			},
			{
				title: 'Batteries',
				description:
					'The battery dashboard monitors the state of charge, voltage, current, temperature, and health metrics for all battery storage units. Real-time indicators show charge and discharge cycles, while historical data reveals capacity degradation trends. Automated alarms notify operators of overtemperature conditions, deep discharge events, or imbalanced cell voltages that could affect battery longevity.',
				image: '/src/assets/images/usecases/scada-energy-management/5.webp',
				imageAlt: 'Battery storage dashboard with state of charge and health metrics',
				imageTitle:
					'Battery storage monitoring with charge levels, temperature, and cell health indicators',
			},
			{
				title: 'Power transformer',
				description:
					'The power transformer dashboard tracks critical parameters including primary and secondary voltage, current, power factor, oil temperature, and load percentage. Real-time monitoring helps operators detect overload conditions, insulation degradation, and cooling system faults. Trend charts support predictive maintenance by revealing gradual changes in transformer performance over time.',
				image: '/src/assets/images/usecases/scada-energy-management/6.webp',
				imageAlt: 'Power transformer dashboard with voltage, load, and temperature monitoring',
				imageTitle:
					'Power transformer monitoring with real-time voltage, current, and thermal parameters',
			},
			{
				title: 'Generator',
				description:
					'The generator dashboard monitors backup and primary power generators with real-time data on output voltage, frequency, fuel level, engine temperature, and run hours. Status indicators show generator readiness and active alarms, while automated start/stop logic ensures seamless power continuity during grid outages or peak demand periods.',
				image: '/src/assets/images/usecases/scada-energy-management/7.webp',
				imageAlt: 'Generator monitoring dashboard with output and engine parameters',
				imageTitle:
					'Generator performance dashboard with voltage, frequency, fuel level, and engine status',
			},
			{
				title: 'Consumption',
				description:
					'The consumption dashboard aggregates energy usage data across all connected loads and distribution circuits. Real-time and historical charts display consumption patterns by zone, time of day, and equipment category. Operators can identify peak usage periods, compare actual consumption against forecasts, and implement demand-response strategies to reduce costs and prevent grid overload.',
				image: '/src/assets/images/usecases/scada-energy-management/8.webp',
				imageAlt: 'Energy consumption dashboard with usage patterns and zone breakdown',
				imageTitle:
					'Consumption analytics with real-time usage data, zone breakdown, and demand patterns',
			},
			{
				title: 'Alarms',
				description:
					'The alarms dashboard centralizes all active, acknowledged, and historical alarms from every component in the energy management system. Alarms are categorized by severity and source — covering generation equipment, storage systems, distribution infrastructure, and consumption endpoints. Filtering and timeline views enable operators to trace event sequences and identify root causes of system anomalies.',
				image: '/src/assets/images/usecases/scada-energy-management/9.webp',
				imageAlt: 'Energy system alarms dashboard with severity categories and event timeline',
				imageTitle:
					'Centralized alarm management for the energy system with severity-based filtering and timeline',
			},
			{
				title: 'Gateway dashboard',
				description:
					'The gateway dashboard displays the status of all IoT Gateway connections between field energy equipment and the ThingsBoard platform. Operators can monitor gateway health, connected device count, data throughput, and communication error rates. The interface supports gateway configuration and troubleshooting, ensuring reliable data flow from energy infrastructure to the monitoring center.',
				image: '/src/assets/images/usecases/scada-energy-management/10.webp',
				imageAlt: 'IoT Gateway dashboard showing device connectivity and communication status',
				imageTitle:
					'Gateway monitoring with device connectivity status and data throughput metrics',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/2430dc20-3172-11f0-858a-67efd1bc8a87?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_ScadaEnergy_ViewLiveDemo',
		contactUsId: 'UseCases_ScadaEnergy_ContactUs',
	},
	applications: {
		title: 'Applications of SCADA energy management system',
		applications: [
			{
				title: 'Industrial facilities',
				description:
					'Real-time SCADA dashboards for manufacturing energy use, helping balance loads and cut peak demand costs.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/indust.svg',
				mobileImage: '/src/assets/images/usecases/scada-energy-management/indust-2.svg',
				imageAlt: 'Industrial facilities',
				imageTitle: 'Industrial facilities',
			},
			{
				title: 'Smart buildings',
				description:
					'Integrates building energy systems — HVAC, lighting, elevators, and on-site generation — into a unified SCADA interface. Automated demand response and scheduling reduce energy waste while maintaining occupant comfort and building performance standards.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/smart.svg',
				mobileImage: '/src/assets/images/usecases/scada-energy-management/smart-2.svg',
				imageAlt: 'Smart buildings',
				imageTitle: 'Smart buildings',
			},
			{
				title: 'Renewable energy plants',
				description:
					'Centralized monitoring of solar farms and wind parks with generation tracking and grid synchronization.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/renewable.svg',
				mobileImage: '/src/assets/images/usecases/scada-energy-management/renewable-2.svg',
				imageAlt: 'Renewable energy plants',
				imageTitle: 'Renewable energy plants',
			},
			{
				title: 'Data centers',
				description:
					'Monitors power distribution units, UPS systems, generators, and cooling infrastructure to ensure uninterrupted operations. Energy efficiency metrics and capacity planning tools help data center operators optimize power usage effectiveness and reduce operational costs.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/data-centers.svg',
				mobileImage: '/src/assets/images/usecases/scada-energy-management/data-centers-2.svg',
				imageAlt: 'Data centers',
				imageTitle: 'Data centers',
			},
			{
				title: 'Utilities and power grids',
				description:
					'Real-time substation and feeder monitoring with automated fault detection to maintain grid stability.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/utilites.svg',
				mobileImage: '/src/assets/images/usecases/scada-energy-management/utilites-2.svg',
				imageAlt: 'Utilities and power grids',
				imageTitle: 'Utilities and power grids',
			},
		],
	},
};
