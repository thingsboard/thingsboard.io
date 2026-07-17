import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How ACTE Technology helps monitor and control with ThingsBoard to optimise efficiencies',
	pageTitle: 'How ACTE Technology helps monitor and control to optimise efficiencies',
	description:
		'ACTE Technology uses ThingsBoard to monitor and automate the Chaktomuk datacenter — real-time alarms, rule engine, and dashboards that optimise efficiency.',
	pageSlug: 'acte-technology',
	breadcrumb: 'ACTE Technology — Industrial Control System',
	categories: ['Industry 4.0'],

	hero: {
		category: 'INDUSTRIAL CONTROL SYSTEM',
		heading: 'How ACTE Technology helps monitor and control with ThingsBoard to optimise efficiencies',
		paragraphs: [
			'ACTE Technology, headquartered across Vietnam and Singapore, specialises in Industrial Control, Building Automation, SCADA, IIoT, and Electronics, delivering end-to-end solutions that help clients control, monitor, automate, and optimise operations while meeting compliance requirements. With flexible usability of most hardware devices (e.g. Schneider), ACTE works across a broad range of devices and platforms.',
			'With over 10 years of experience, the company has served 30+ clients and delivered 100+ projects within the datacenter, electronics, oil & gas, and industrial industries, backed by strategic partnerships with ThingsBoard and Proxmox.',
		],
		logo: '/images/case-studies/acte-technology-logo.png',
		logoAlt: 'ACTE Technology logo',
		logoWidth: 85,
		logoHeight: 79,
		backgroundImage: '/images/case-studies/acte-technology.webp',
	},

	statistics: [
		{ value: 10, suffix: '+', label: 'Years of experience in Efficiency Performance & Environmental compliance' },
		{ value: 30, label: 'Number of clients' },
		{ value: 100, suffix: '+', label: 'Number of projects' },
	],

	quote: {
		text: 'ThingsBoard transformed the way we operate. Before, our teams were reacting to problems after they happened, now we are preventing them entirely. The visibility and control we have over our systems today is something we simply couldn’t have imagined with our previous setup. It’s become the backbone of how we deliver compliancy and efficiency to our clients.',
		author: 'Adrien Baltardive',
		role: 'Founder, ACTE Technology',
	},

	problem: {
		challenges: [
			'Retrofit building with existing software to migrate from.',
			'1500+ devices to (re)connect without affecting production (phase 1).',
			'Develop the application to allow more sensors (phase 2).',
			'Monitoring large amounts of information with a limited amount of dashboards (control room TV screens).',
			'Connecting various protocols such as Modbus, BACnet, SNMP.',
			'Improve monitoring and controls with dynamic server loads (heat generation) and outdoor weather variation (night/day).',
		],
		results: [
			'Humidity and Temperature are now within specifications with narrower min/max range.',
			'Operation team is getting notified and can act as preventive maintenance (instead of corrective in the past).',
			'Clean UX with ThingsBoard dashboard states.',
		],
	},

	power: {
		companyName: 'ACTE Technology',
		heading: 'How ACTE uses ThingsBoard to power Chaktomuk?',
		blocks: [
			{
				title: 'Comprehensive Reporting & Analytics',
				text: 'Generate daily & monthly reports, showcasing operational and energy management insights. Moreover, the reports show important information such as the temperature of devices throughout the day and any alarms that were triggered.',
				image: '/images/case-studies/acte-technology-1.webp',
				imageAlt: 'Daily and monthly operational and energy management reports',
			},
			{
				title: 'Centralized Monitoring & Real-Time Automation',
				text: 'For Chaktomuk, ThingsBoard was deployed as the central platform for monitoring and automating environmental control systems such as server room cooling and rack ventilation. Incoming telemetry was processed through configured Rule Chains, enabling real-time decisions based on operational conditions.',
				image: '/images/case-studies/acte-technology-2.webp',
				imageAlt: 'Centralized monitoring and real-time automation of environmental control systems',
			},
			{
				title: 'Low-Latency Processing & Mission-Critical Reliability',
				text: 'ThingsBoard provided low-latency local processing, ensuring uninterrupted automation even during network disruptions. This implementation reduced response times to under 5 seconds, improved cooling efficiency, and strengthened reliability in mission-critical environments.',
				image: '/images/case-studies/acte-technology-3.webp',
				imageAlt: 'Low-latency local processing for mission-critical reliability',
			},
			{
				title: 'Intuitive Master Dashboards for Enhanced Visibility',
				text: 'ThingsBoard allows creating a master dashboard without losing key details to enable an easy UI experience for users. This ensures better visibility of data for easier maintenance.',
				image: '/images/case-studies/acte-technology-4.webp',
				imageAlt: 'Intuitive master dashboard for enhanced data visibility',
			},
			{
				title: 'Instant Alarms & Proactive Issue Resolution',
				text: 'Alarms instantly flag anomalies the moment they occur, enabling teams to resolve issues before they escalate into operational disruptions.',
				image: '/images/case-studies/acte-technology-5.webp',
				imageAlt: 'Instant alarms flagging anomalies for proactive issue resolution',
			},
		],
	},

	help: {
		industryName: 'datacenter operators power and improve their operations',
		blocks: [
			{
				title: 'Rule Engine and calculated fields',
				text: 'The ThingsBoard Rule Engine was configured to process telemetry data in real-time, allowing for the automatic creation of processed data. By defining specific thresholds and alarm rules for temperature, energy and power distribution, the system now identifies critical issues without human intervention. This ensures that the data center team is notified the second a metric deviates from the norm.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/sensors-widget.webp',
						alt: 'ThingsBoard sensors widget',
						title: 'ThingsBoard sensors widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/entities-table.webp',
						alt: 'ThingsBoard entities table widget',
						title: 'ThingsBoard entities table widget',
					},
				],
			},
			{
				title: 'Custom Dashboarding & State Controllers',
				text: 'To solve the issue of fragmented monitoring, we utilized advanced dashboarding features like state controllers and aliases. This allowed us to consolidate 5 separate dashboards into a single, unified multi-state interface. Users can now navigate between different views and equipment levels within one window, drastically improving oversight.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/tables.webp',
						alt: 'ThingsBoard tables widget',
						title: 'ThingsBoard tables widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/bar-chart.webp',
						alt: 'ThingsBoard bar chart widget',
						title: 'ThingsBoard bar chart widget',
					},
				],
			},
			{
				title: 'Automated Alerts & Notifications',
				text: 'ThingsBoard’s alert system was set up to provide instant feedback whenever a sensor detects an abnormality. We implemented specific rules to filter out noise and only trigger notifications for maintenance needs. This prevents alarm floods, ensuring the team only acts on critical infrastructure changes.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/alarms-table.webp',
						alt: 'ThingsBoard alarms table widget',
						title: 'ThingsBoard alarms table widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/notification-widget.webp',
						alt: 'ThingsBoard notification widget',
						title: 'ThingsBoard notification widget',
					},
				],
			},
			{
				title: 'Role-Based Access Control (RBAC)',
				text: 'To maintain high security, we utilised ThingsBoard Professional Edition, which allows us to customise role-based access to define what different team members can see and do. This ensures that while managers have full oversight, external contractors or junior staff only access the specific dashboards they need. It protects sensitive data center configurations from accidental or unauthorized changes.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp',
						alt: 'ThingsBoard entity groups hierarchy widget',
						title: 'ThingsBoard entity groups hierarchy widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/roles-table.webp',
						alt: 'ThingsBoard roles table widget',
						title: 'ThingsBoard roles table widget',
					},
				],
			},
		],
	},

	contact: {
		companyLogo: '/images/case-studies/acte-technology-logo.png',
		companyLogoAlt: 'ACTE Technology logo',
		companyLogoWidth: 85,
		companyLogoHeight: 79,
	},
};
