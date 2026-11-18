import type { UseCaseData } from './types';
import { SCADA_COMMON_BENEFITS } from './_scada-shared';

export const data: UseCaseData = {
	title: 'SCADA energy management system',
	pageTitle: 'SCADA Energy Management System',
	description:
		'Manage solar, wind, battery, and grid assets from one SCADA energy management system. Track power flows in real time and try the live demo.',
	pageSlug: 'scada-energy-management',
	cta: {
		title: 'Build your SCADA energy management system faster',
		text:
			'Install the SCADA Energy management template and adapt it to your site, or ask our team to develop a SCADA system around your generation and storage assets.',
		button: {
			label: 'Get the solution template',
			href: '/iot-hub/solution-templates/scada-energy-management/',
		},
	},
	about: {
		shortText:
			'A SCADA energy management system shows how power moves through your site, from solar panels, wind turbines, and generators to batteries, transformers, and the grid. ThingsBoard puts it all on one live diagram, so operators see generation, storage, and consumption together and respond to faults as they happen.',
		longText: [
			'This use case covers generation, storage, and distribution. For consumption in buildings, see <a href="/use-cases/smart-energy/">IoT energy monitoring</a>.',
			'ThingsBoard collects data from PLCs, RTUs, inverters, and power meters, and calculated fields turn raw readings into the values operators work with, such as total generation or battery status.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/2430dc20-3172-11f0-858a-67efd1bc8a87?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_ScadaEnergy_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/scada-energy-management/scada-energy-management-1.webp',
				alt: 'Main state of SCADA energy management dashboard',
				title: 'Main mimic diagram: generation, storage and consumption',
				width: 1286,
				height: 660,
			},
			{
				src: '/src/assets/images/usecases/scada-energy-management/scada-energy-management-2.webp',
				alt: 'SCADA energy management dashboard consumption state',
				title: 'Live power, voltage, current and frequency by phase',
				width: 1286,
				height: 660,
			},
			{
				src: '/src/assets/images/usecases/scada-energy-management/scada-energy-management-3.webp',
				alt: 'SCADA energy management dashboard small screen responsiveness',
				title: 'Responsive SCADA layout on tablet and phone',
				width: 1302,
				height: 679,
			},
		],
	},
	solutionStructure: {
		title: 'How a SCADA energy management system works',
		shortText: '',
		schemeSrc: '/src/assets/schemas/energy-management.svg',
		schemeAlt: 'SCADA energy management solution structure',
		schemeCaption: 'SCADA energy management solution structure',
	},
	benefits: {
		benefits: SCADA_COMMON_BENEFITS,
	},
	scadaKeyFunctions: {
		title: 'SCADA symbols for energy systems',
		highPerformance: [
			{
				title: 'Power generation and renewable energy sources',
				description:
					'These symbols represent different energy sources used in SCADA systems for real-time monitoring and control. They include solar panels, wind turbines, and fuel generators, which are essential for tracking energy generation, efficiency, and performance of renewable and backup power sources.',
				image: '/src/assets/images/usecases/scada-energy-management/power-gen.svg',
				imageAlt: 'SCADA power generation and renewable energy sources symbols',
			},
			{
				title: 'Power distribution and circuit protection',
				description:
					'This category includes essential components responsible for managing electrical flow and ensuring system safety. It consists of circuit breakers, voltage relays, and stabilizers that help prevent overloads, regulate voltage supply, and maintain stable power distribution.',
				image: '/src/assets/images/usecases/scada-energy-management/power-distr.svg',
				imageAlt: 'SCADA power distribution and circuit protection symbols',
			},
			{
				title: 'Energy measurement',
				description:
					'SCADA systems require precise real-time data collection on energy usage to ensure efficient power monitoring and optimization. This group includes various energy meters that provide multi-rate measurement capabilities, helping operators track power consumption accurately and make data-driven decisions for energy efficiency.',
				image: '/src/assets/images/usecases/scada-energy-management/power-msrmt.svg',
				imageAlt: 'SCADA energy measurement symbols',
			},
			{
				title: 'Consumption analysis',
				description:
					'Understanding how energy is distributed and consumed across different sectors is crucial for effective SCADA operations. This group consists of consumer representation symbols that help categorize and analyze power usage in industrial, residential, and commercial environments, providing insights into consumption patterns.',
				image: '/src/assets/images/usecases/scada-energy-management/consumption-anals.svg',
				imageAlt: 'SCADA consumption analysis symbols',
			},
			{
				title: 'Power control and transformation',
				description:
					'Symbols in this group allow for effective power conversion and distribution within the grid. Transformers, inverters, and transmission infrastructure are included to facilitate efficient power management, ensuring stable energy supply across different voltage levels.',
				image: '/src/assets/images/usecases/scada-energy-management/power-control.svg',
				imageAlt: 'SCADA power control and transformation symbols',
			},
			{
				title: 'Electrical control and connectivity',
				description:
					'SCADA systems require connectivity and user control points for seamless operation. This group includes power sockets, switches, distribution boards, and battery monitoring tools, enabling interactive control and reliable energy storage management.',
				image: '/src/assets/images/usecases/scada-energy-management/electrical-conect.svg',
				imageAlt: 'SCADA electrical control and connectivity symbols',
			},
			{
				title: 'Environmental monitoring and system indicators',
				description:
					'These symbols support real-time environmental tracking and status indications for operational insights. They include temperature monitoring scales and energy system controllers, which enhance automation and provide essential data for system optimization.',
				image: '/src/assets/images/usecases/scada-energy-management/env-monitoring.svg',
				imageAlt: 'SCADA environmental monitoring and system indicators symbols',
			},
			{
				title: 'System connectivity and network flow',
				description:
					'These symbols allow SCADA users to visualize energy flow and system interconnections. Connectors, cross junctions, and elbow connectors are used to represent electrical pathways, helping in grid architecture visualization and network structure planning.',
				image: '/src/assets/images/usecases/scada-energy-management/sys-connectivity.svg',
				imageAlt: 'SCADA system connectivity and network flow symbols',
			},
		],
		traditional: [],
	},
	dashboardStructure: {
		title: 'SCADA energy management dashboard',
		panels: [
			{
				title: 'Main dashboard state',
				description:
					'The main dashboard provides an overview of the energy system, showing the status of power sources, energy flow, and real-time consumption. It includes data from solar panels, wind turbines, batteries, power transformers, and generators. The dashboard displays key parameters such as power consumption, grid input, and battery charge levels, along with interactive controls for managing energy sources.',
				image: '/src/assets/images/usecases/scada-energy-management/1.webp',
				imageAlt: 'Main SCADA energy management dashboard with power flow overview',
				imageTitle:
					'Main energy management dashboard showing real-time power flows across generation, storage, and consumption',
			},
			{
				title: 'Inverters state',
				description:
					'This dashboard focuses on inverter performance and load distribution. It displays voltage, current, and power output for each inverter phase (L1, L2, L3). Additionally, it includes real-time graphs for AC input and output voltage, output current, and battery voltage. An alarm section provides alerts on critical events like overloads and overheating.',
				image: '/src/assets/images/usecases/scada-energy-management/2.webp',
				imageAlt: 'Inverter monitoring dashboard with phase voltage and current metrics',
				imageTitle:
					'Inverter performance dashboard with per-phase voltage, current, and output power',
			},
			{
				title: 'Solar panels state',
				description:
					'This screen monitors solar panel performance, showing real-time illumination levels, voltage, and power output. It includes historical data trends on voltage, current, and solar panel temperature. The dashboard also features an alarm section to highlight any operational anomalies affecting solar power generation.',
				image: '/src/assets/images/usecases/scada-energy-management/3.webp',
				imageAlt: 'Solar panel monitoring dashboard with illumination and output metrics',
				imageTitle:
					'Solar panel monitoring with real-time illumination, voltage, and power output trends',
			},
			{
				title: 'Wind turbine state',
				description:
					'The wind turbine dashboard provides detailed data on wind speed, rotor speed, and power output. It includes a graphical representation of rotor speed variations over time and energy production trends. The alarm section helps in identifying critical issues like excessive vibrations or high-speed fluctuations.',
				image: '/src/assets/images/usecases/scada-energy-management/4.webp',
				imageAlt: 'Wind turbine SCADA dashboard with wind speed and rotor metrics',
				imageTitle:
					'Wind turbine monitoring with real-time wind speed, rotor speed, and power output',
			},
			{
				title: 'Batteries state',
				description:
					'This dashboard displays the status of battery energy storage, including charge level (SOC), cycle count, and battery voltage. Graphs show battery current (charge/discharge trends), temperature, and voltage over time. An alarm section notifies users about battery health issues or operational concerns.',
				image: '/src/assets/images/usecases/scada-energy-management/5.webp',
				imageAlt: 'Battery storage dashboard with state of charge and cycle metrics',
				imageTitle:
					'Battery storage monitoring with SOC, cycle count, and charge/discharge trends',
			},
			{
				title: 'Power transformer state',
				description:
					'This screen monitors transformer performance by displaying input and output voltage, output current, and power frequency. It provides real-time data on energy flow and ensures stable grid integration. Graphs illustrate historical trends, and an alarm section highlights any transformer-related warnings.',
				image: '/src/assets/images/usecases/scada-energy-management/6.webp',
				imageAlt: 'Power transformer dashboard with voltage and frequency monitoring',
				imageTitle:
					'Power transformer monitoring with input/output voltage, current, and frequency',
			},
			{
				title: 'Generator state',
				description:
					'This dashboard provides information on generator operation, fuel levels, and power output. It displays voltage, current, and oil temperature trends, ensuring stable backup power management. The status section tracks operating hours and maintenance schedules, while the alarm panel notifies users about critical conditions.',
				image: '/src/assets/images/usecases/scada-energy-management/7.webp',
				imageAlt: 'Generator monitoring dashboard with fuel and output metrics',
				imageTitle:
					'Generator performance dashboard with voltage, current, fuel, and oil temperature',
			},
			{
				title: 'Consumption state',
				description:
					'The consumption dashboard visualizes energy usage trends for different timeframes (daily, monthly). It includes graphs for power consumption, voltage, current, and frequency, helping operators optimize energy efficiency. The alarm section highlights any anomalies in power usage or system performance.',
				image: '/src/assets/images/usecases/scada-energy-management/8.webp',
				imageAlt: 'Energy consumption dashboard with usage trends and frequency metrics',
				imageTitle:
					'Consumption analytics with daily and monthly usage trends, voltage, and frequency',
			},
			{
				title: 'Alarms state',
				description:
					'This screen provides a detailed view of all system alarms, including timestamps, severity levels, and statuses. Users can acknowledge or resolve alarms related to high vibration, speed variations, and system failures. The dashboard helps operators quickly identify and respond to critical system issues.',
				image: '/src/assets/images/usecases/scada-energy-management/9.webp',
				imageAlt: 'Energy system alarms dashboard with severity and timestamp details',
				imageTitle:
					'Centralized alarm management with severity, timestamps, and acknowledgement workflow',
			},
			{
				title: 'Gateway dashboard',
				description:
					'This section provides an overview of all connected devices, showing their status, protocol (Modbus), and data communication. Operators can configure connections, monitor device health, and troubleshoot errors in real-time.',
				image: '/src/assets/images/usecases/scada-energy-management/10.webp',
				imageAlt: 'IoT Gateway dashboard showing device connectivity and Modbus status',
				imageTitle:
					'Gateway monitoring with device connectivity status and Modbus communication metrics',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/2430dc20-3172-11f0-858a-67efd1bc8a87?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_ScadaEnergy_ViewLiveDemo',
		contactUsId: 'UseCases_ScadaEnergy_ContactUs',
	},
	applications: {
		title: 'Where SCADA energy management is used',
		applications: [
			{
				title: 'Industrial facilities',
				description: 'Monitoring and optimizing energy usage in manufacturing plants.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/indust.svg',
				imageAlt: 'Industrial facilities',
				imageTitle: 'Industrial facilities',
			},
			{
				title: 'Smart buildings',
				description: 'Enhancing energy efficiency in commercial and residential structures.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/smart.svg',
				imageAlt: 'Smart buildings',
				imageTitle: 'Smart buildings',
			},
			{
				title: 'Renewable energy plants',
				description: 'Managing solar and wind energy production.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/renewable.svg',
				imageAlt: 'Renewable energy plants',
				imageTitle: 'Renewable energy plants',
			},
			{
				title: 'Data centers',
				description: 'Ensuring stable power supply and backup power management.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/data-centers.svg',
				imageAlt: 'Data centers',
				imageTitle: 'Data centers',
			},
			{
				title: 'Utilities and power grids',
				description: 'Supervising grid operations and power distribution.',
				desktopImage: '/src/assets/images/usecases/scada-energy-management/utilites.svg',
				imageAlt: 'Utilities and power grids',
				imageTitle: 'Utilities and power grids',
			},
		],
	},
	advantages: {
		title: 'Why ThingsBoard for SCADA energy management',
		cards: [
			{
				icon: 'tabler:chart-bar',
				color: 'red',
				title: 'One SCADA diagram for your energy system',
				description:
					'See solar panels, wind turbines, generators, batteries, transformers, and the grid on one live diagram built from energy symbols.',
				href: '/iot-hub/solution-templates/scada-energy-management/',
				linkText: 'See the SCADA Energy management template',
			},
			{
				icon: 'tabler:plug-connected',
				color: 'purple',
				title: 'PLC, RTU, and inverter connectivity',
				description:
					'Connect Modbus and OPC UA devices through the IoT Gateway, or send data from your energy management system directly over MQTT or HTTP.',
				href: '/docs/pe/user-guide/connectivity-guide/',
				linkText: 'Learn more about connectivity',
			},
			{
				icon: 'tabler:circuit-bulb',
				color: 'green',
				title: 'Alarms on grid and battery limits',
				description:
					'Raise alarms when battery temperature, voltage, or load goes out of range and notify the operator on duty.',
				href: '/docs/pe/user-guide/rule-engine/',
				linkText: 'Learn more about data processing',
			},
			{
				icon: 'tabler:server',
				color: 'orange',
				title: 'From one plant to a portfolio',
				description:
					'Monitor many sites from one platform and scale horizontally with a microservices deployment as your portfolio grows.',
				href: '/docs/pe/reference/architecture/microservices/',
				linkText: 'Learn more about scalability',
			},
		],
	},
	faq: [
		{
			id: 'scada-energy-management-faq',
			label: 'FAQ',
			items: [
				{
					id: 'can-thingsboard-work-as-a-scada',
					question: 'Can ThingsBoard work as a SCADA energy management system?',
					answer:
						'<p>Yes. ThingsBoard SCADA collects data from PLCs, RTUs, inverters, and meters, shows it on SCADA dashboards built from a library of energy symbols, and raises alarms when values go out of range. The <a href="/iot-hub/solution-templates/scada-energy-management/">SCADA Energy management template</a> shows a complete setup with solar panels, a wind turbine, batteries, and a transformer.</p>',
					defaultOpen: true,
				},
				{
					id: 'how-do-plcs-rtus-and-inverters',
					question: 'How do PLCs, RTUs, and inverters connect?',
					answer:
						'<p>Equipment that uses Modbus TCP, UDP, or RTU, OPC UA, or another industrial protocol connects through the ThingsBoard IoT Gateway. Your own energy management system can send data directly over MQTT or HTTP. Details are in the <a href="/docs/pe/user-guide/connectivity-guide/">connectivity guide</a>.</p>',
				},
				{
					id: 'can-i-monitor-battery-voltage-current',
					question: 'Can I monitor battery voltage, current, temperature, and state of charge?',
					answer:
						'<p>Yes. Each reading arrives as telemetry, so you can chart it and set alarm thresholds, for example on battery temperature or a low state of charge. Battery status appears on the SCADA diagram next to generation and load.</p>',
				},
				{
					id: 'does-it-scale-from-one-site',
					question: 'Does it scale from one site to many?',
					answer:
						'<p>Yes. You model each site as an asset and give each team access only to the sites they manage. For large deployments, ThingsBoard runs as a <a href="/docs/pe/reference/architecture/microservices/">cluster of microservices</a> that scales horizontally.</p>',
				},
				{
					id: 'how-is-this-different-from-iot',
					question: 'How is this different from IoT energy monitoring?',
					answer:
						'<p>This use case covers generation, storage, and distribution: solar, wind, generators, batteries, and the grid on one SCADA diagram. If you mainly need to track consumption in buildings, see <a href="/use-cases/smart-energy/">IoT energy monitoring</a>.</p>',
				},
				{
					id: 'can-your-team-build-a-scada',
					question: 'Can your team build a SCADA system around our equipment?',
					answer:
						'<p>Yes. Our team develops SCADA dashboards and integrations for specific plants and portfolios. <a href="/case-studies/energenix/">Energenix</a>, for example, runs its solar SCADA and analytics on ThingsBoard. Tell us about your assets through the <a href="/contact-us/?subject=Custom+Development+Service">contact form</a>.</p>',
				},
			],
		},
	],
};
