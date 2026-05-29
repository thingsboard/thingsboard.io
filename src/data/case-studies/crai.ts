import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'CRAI Enables Remote Control and Data Acquisition with ThingsBoard',
	pageTitle: 'CRAI Enables Remote Control and Data Acquisition',
	description:
		'CRAI uses ThingsBoard for industrial automation and remote monitoring of generators, motors, and water pumps with real-time visibility and control.',
	pageSlug: 'crai',
	breadcrumb: 'IoT in industrial automation — Industrial Automation',
	categories: ['Industry 4.0'],

	hero: {
		category: 'INDUSTRIAL AUTOMATION',
		heading: 'IoT in industrial automation: how CRAI enables remote control and data acquisition with ThingsBoard',
		paragraphs: [
			'CRAI, which stands for Centro de Reparación y Automatización Industrial (Industrial Repair and Automation Centre), is an industrial automation and control company based in Honduras. The company specializes in industrial automation solutions, control systems, and the repair of industrial electronic equipment. In recent years, CRAI has expanded into Industrial IoT (IIoT), offering remote monitoring and control services that provide clients with real-time visibility, operational control, and automated alerts across their industrial systems.',
		],
		logo: 'https://img.thingsboard.io/case-studies/crai.svg',
		logoAlt: 'CRAI logo',
		logoWidth: 400,
		logoHeight: 162,
		backgroundImage: 'https://img.thingsboard.io/case-studies/crai.webp',
	},

	statistics: [
		{ value: 15, suffix: '+', label: 'experience in industrial automation and control systems' },
		{
			value: 1,
			suffix: 'K+',
			label: 'completed service engagements and automation solutions delivered to clients across multiple industries',
		},
		{
			value: 50,
			suffix: '+',
			label: 'Trusted by companies for industrial automation, monitoring, and control solutions',
		},
	],

	problem: {
		description:
			'Industrial equipment such as generators, motors, water pumps, VFDs, and PLCs requires continuous monitoring to ensure reliable operation and efficient use of resources. Prior to adopting an IoT platform, CRAI and its customers lacked a centralized system to monitor and control devices in real time, provide remote visibility and access to stakeholders, implement a reliable alert and alarm system, and analyze historical performance and consumption data. This made it difficult to detect issues early, respond to abnormal events, and make informed operational decisions based on accurate data.',
		challenges: [
			'Lack of real-time visibility into equipment status and limited remote control of industrial devices.',
			'No centralized access to historical data for analyzing system performance and resource consumption over time.',
			'Limited ability for multiple users (technicians, engineers, management) to securely access and interact with operational dashboards.',
			'Delayed detection of critical events (e.g., generator start/stop, low fuel level, VFD faults).',
			'Difficulty scaling monitoring and control as additional devices and locations were integrated.',
		],
		results: [
			'Real-time monitoring and remote control of industrial devices.',
			'Centralized access to historical data for energy, water, and performance analysis to support system optimization and reliability.',
			'Role-based access enabling technicians and management to securely view and interact with IIoT dashboards from anywhere.',
			'Automated alarms and event-driven notifications triggered by operational changes, equipment state transitions, and threshold violations.',
			'A scalable IIoT infrastructure capable of supporting new devices, new users, and multi-site deployments with minimal configuration effort.',
		],
	},

	power: {
		companyName: 'CRAI',
		blocks: [
			{
				title: 'ThingsBoard serves as the core IIoT platform',
				text: 'ThingsBoard serves as the core IIoT platform connecting CRAI’s industrial control panels, PLCs, gateways, energy meters, and field devices into a single monitoring and management system. Equipment is integrated through gateways and edge devices, enabling secure real-time telemetry transmission and remote control of industrial assets. This architecture unifies data from diverse industrial hardware into a structured IoT environment. As a result, technicians and engineers can monitor and manage multiple systems and sites remotely from a centralized interface. <br><br> Photo: Industrial control panel integrating PLC, energy meters (3-phase analyzers), networking equipment, and edge computing devices.',
				image: 'https://img.thingsboard.io/case-studies/crai-1.webp',
				imageAlt: 'Industrial control panel',
			},
			{
				title: 'Real-time monitoring, alerts, and remote actions',
				text: 'CRAI uses ThingsBoard dashboards to visualize live operational parameters from VFD-driven water pump systems, including pressure (PSI), frequency, voltage, current, and run/fault states. Operators can immediately see equipment status and receive alerts when abnormal conditions or faults occur. In addition, remote actions such as ‘Reset’, ‘Force Run/Force Stop’ commands can be triggered directly from the dashboard. This enables faster response to incidents and reduces the need for on-site intervention. <br><br> Photo: ThingsBoard mobile dashboard showing VFD telemetry and control actions.',
				image: 'https://img.thingsboard.io/case-studies/crai-2.webp',
				imageAlt: 'ThingsBoard mobile dashboard',
			},
			{
				title: 'Historical analytics for performance and energy insights',
				text: 'ThingsBoard stores historical telemetry from generators, including phase voltages and currents, enabling CRAI and its clients to analyze equipment behavior over time. Interactive time-series charts allow operators to zoom into specific time windows, such as periods when the generator is running to investigate load patterns and voltage stability. This historical visibility helps identify abnormal trends, peak loads, performance, use of resources, uptime, and much more. As a result, CRAI and its clients can analyze this data anytime to support preventive maintenance, system efficiency and reliability. <br><br> Photo: ThingsBoard time-series charts showing generator voltage and current trends over time.',
				image: 'https://img.thingsboard.io/case-studies/crai-3.webp',
				imageAlt: 'ThingsBoard time-series charts',
			},
			{
				title: 'Daily energy and water consumption tracking with aggregated bar charts',
				text: 'CRAI uses ThingsBoard time-series widgets with bar charts to visualize energy (kWh) and water consumption (m³) across facilities. Aggregated views (minimum, maximum, average, and total) provide quick insight into daily usage patterns and overall resource consumption. This enables operators and managers to compare consumption across different time periods, identify unusual spikes, and gain a deeper understanding of asset and facility performance. As a result, CRAI and its clients can make informed decisions to optimize energy and water usage, reduce waste, and control operating costs. <br><br> Photo: ThingsBoard time-series bar chart showing daily kWh consumption and water usage in cubic meters.',
				image: 'https://img.thingsboard.io/case-studies/crai-4.webp',
				imageAlt: 'ThingsBoard time-series bar chart',
			},
			{
				title: 'Intelligent alarms and event-based notifications',
				text: 'ThingsBoard enables CRAI to configure intelligent alarms based on real time device states and operational limits. For example, alerts can be sent by ThingsBoard when a generator turns ON, when a generator fuel levels drop below a defined limit, or when a critical motor (such as those used in fire protection systems), is activated. These event-based notifications ensure that stakeholders are immediately informed of important operational changes or abnormal conditions. By receiving timely alerts, operators can take quick action on-site or using ThingsBoard dashboards to send commands. This powerful feature improves system safety and efficiency, and prevents potential downtime or resource shortages.',
				image: 'https://img.thingsboard.io/case-studies/crai-5.webp',
				imageAlt: 'Intelligent alarms',
			},
			{
				title: 'Multi-tenancy and role-based access for secure collaboration',
				text: 'ThingsBoard’s multi-tenant architecture enables CRAI to manage multiple clients and projects within a single platform while keeping data securely isolated. This feature allows CRAI to provide access to technicians, engineers, and management to the same system with different permissions and views. This ensures that operational controls are restricted to authorized users, while stakeholders can still monitor performance and KPIs. As a result, CRAI can scale its IIoT deployments across multiple customers and teams without compromising security or data separation.',
				image: 'https://img.thingsboard.io/case-studies/crai-6.webp',
				imageAlt: 'Multi-tenancy and role-based access',
			},
		],
	},

	help: {
		industryName: 'Industrial Automation & Control Systems improve operations with IoT',
		blocks: [
			{
				title: 'Real-time monitoring of critical operational parameters',
				text: 'Industrial automation systems require continuous visibility into key parameters such as voltage, current, frequency, pressure, temperature, RPM, and system states. ThingsBoard centralizes telemetry from industrial devices (PLCs, VFDs, generators, sensors, and energy meters) into real-time dashboards and charts, providing operators with instant access to both historical data and current operating conditions. This real-time visibility enables faster detection of abnormal equipment behavior, unexpected state changes, and performance deviations. As a result, organizations can improve uptime, enhance safety, and increase overall system reliability and efficiency.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'ThingsBoard entities table widget', title: 'ThingsBoard entities table widget' },
				],
			},
			{
				title: 'Automated alerts and event-driven workflows',
				text: 'Unexpected deviations in operational parameters can lead to equipment damage, production losses, or safety risks. ThingsBoard enables organizations to configure automated alerts and alarms that notify stakeholders when abnormal or critical conditions occur. Notifications can be delivered through dashboards and other communication channels to ensure rapid response. This approach reduces downtime, supports preventive maintenance strategies, and improves overall system reliability.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'ThingsBoard alarms table widget', title: 'ThingsBoard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'ThingsBoard notification widget', title: 'ThingsBoard notification widget' },
				],
			},
			{
				title: 'Remote control and device interaction',
				text: 'Modern industrial environments benefit from the ability to remotely interact with equipment to perform control actions and verify device states. ThingsBoard supports bi-directional communication with industrial assets, enabling operators to issue commands (e.g., start/stop equipment, reset faults, update setpoints) and request real-time device status. This capability reduces the need for on-site presence and enables faster, safer intervention when operational changes are required. Remote interaction improves flexibility and response times in industrial systems. Access to these control functions can be securely managed through ThingsBoard’s role-based access control and multi-tenancy features.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/single-switch-widget.webp', alt: 'Thingsboard single switch widget', title: 'Thingsboard single switch widget' },
					{ src: 'https://img.thingsboard.io/case-studies/power_button.webp', alt: 'Thingsboard power button widget', title: 'Thingsboard power button widget' },
				],
			},
			{
				title: 'Historical analytics and performance optimization',
				text: 'Access to historical operational data is essential for understanding system behavior and optimizing performance over time. ThingsBoard stores time-series telemetry and provides users with built-in visualization and analytical tools to explore trends, peaks, and anomalies. This enables operators and managers to identify inefficiencies, correlate events with operational outcomes, and validate expected behavior (e.g., reduced load outside operating hours). These data-driven insights support continuous improvement, improve system efficiency, and help teams anticipate potential issues before they become critical.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/tables.webp', alt: 'ThingsBoard tables widget', title: 'ThingsBoard tables widget' },
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'ThingsBoard bar chart widget', title: 'ThingsBoard bar chart widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/crai.svg',
		companyLogoAlt: 'CRAI logo',
		companyLogoWidth: 400,
		companyLogoHeight: 162,
	},
};
