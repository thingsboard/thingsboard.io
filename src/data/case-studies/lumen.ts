import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Lumen Digitalizes Factories with ThingsBoard Industrial IoT',
	pageTitle: 'Lumen Digitalizes Factories with Industrial IoT',
	description:
		'Lumen Energy Solutions digitalizes large-scale factories on ThingsBoard, integrating 1,000+ IoT sensors and energy meters for predictive maintenance.',
	pageSlug: 'lumen',
	breadcrumb: 'Industrial IoT in manufacturing — Industry 4.0',
	categories: ['Industry 4.0'],

	hero: {
		category: 'INDUSTRIAL IOT',
		heading: 'Industrial IoT in manufacturing: how Lumen Energy Solutions digitalized large-scale factories with ThingsBoard',
		paragraphs: [
			'Lumen Energy Solutions is an Industrial IoT and energy digitalization company specializing in smart monitoring, energy management, and industrial automation solutions across Central America.',
			'Operating in the intersection of IoT, energy analytics, and industrial digital transformation, Lumen designs and deploys end-to-end solutions that integrate sensors, gateways, connectivity, and software platforms into scalable and secure ecosystems.',
			'With in-house development capabilities and deep expertise in energy management systems, Lumen delivers customized industrial monitoring solutions for manufacturing, commercial, and infrastructure sectors.',
		],
		logo: 'https://img.thingsboard.io/case-studies/lumen.svg',
		logoAlt: 'Lumen logo',
		logoWidth: 200,
		logoHeight: 38,
		backgroundImage: 'https://img.thingsboard.io/case-studies/lumen.webp',
	},

	statistics: [
		{ value: 15, suffix: '–20%', label: 'reduction in energy waste' },
		{ value: 30, suffix: '%', label: 'faster incident detection' },
		{ value: 10, suffix: 'K+', label: 'telemetry points per second' },
	],

	quote: {
		text: '"ThingsBoard has been a key platform for delivering scalable Industrial IoT solutions. Its ability to integrate heterogeneous devices, process telemetry in real time, and support both cloud and on-premise deployments allows us to meet strict industrial IT requirements while delivering powerful analytics and monitoring capabilities to our clients"',
		author: 'Jinsu Chang, CEO, Lumen Energy Solutions',
	},

	problem: {
		description:
			'A large industrial manufacturing group operating multiple facilities required a unified digital platform to manage operations across its factories.',
		challenges: [
			'<strong>Disparate monitoring systems.</strong> Energy meters, industrial equipment, HVAC systems, and environmental sensors operated in silos.',
			'<strong>Need for a single unified platform.</strong> The client required one platform capable of integrating predictive maintenance, asset management, energy analytics, and environmental monitoring.',
			'<strong>Strict IT and cybersecurity requirements.</strong> Corporate IT policies required secure architecture, controlled access, encrypted communication, and flexible deployment models.',
			'<strong>Scalability across multiple plants.</strong> The solution needed to support thousands of telemetry points across multiple sites without compromising performance.',
			'<strong>Long-term operational stability.</strong> In a 24/7 industrial environment, system reliability and uptime were critical.',
		],
		results: [
			'1,000+ IoT sensors and industrial energy meters integrated into a unified monitoring platform across multiple manufacturing facilities.',
			'Full operational visibility across utilities and production assets, enabling plant operators to monitor energy consumption, equipment performance, and environmental conditions in real time.',
			'Improved predictive maintenance capabilities, allowing maintenance teams to detect anomalies early and reduce unexpected equipment downtime.',
			'Enhanced energy analytics and cost optimization, helping factories better understand consumption patterns and identify efficiency opportunities.',
			'Secure and scalable architecture supporting continuous 24/7 industrial operations with reliable performance over more than four years of deployment.',
		],
	},

	power: {
		companyName: 'Lumen’s Industrial IoT Application',
		blocks: [
			{
				title: 'Large-scale device integration',
				text: 'Over 1,000 IoT sensors and industrial energy meters were integrated into a centralized ThingsBoard platform. Data from production lines, substations, environmental systems, and utility infrastructure is collected in real time through secure gateways and standardized protocols. The platform enables unified visualization and historical analytics, transforming raw telemetry into actionable operational insights.',
				image: 'https://img.thingsboard.io/case-studies/lumen-1.webp',
				imageAlt: 'Large-scale device integration',
			},
			{
				title: 'Personalized dashboards for multiple industrial applications',
				text: 'Lumen developed custom dashboards tailored to each operational area:',
				listItems: [
					'Predictive Maintenance Monitoring',
					'Asset Performance Tracking',
					'Energy Consumption & Demand Analysis',
					'Temperature and Environmental Control',
					'Utility Optimization',
				],
				secondText: 'Role-based dashboards ensure that plant managers, maintenance teams, and executives access relevant data aligned with their responsibilities.',
				image: 'https://img.thingsboard.io/case-studies/lumen-2.webp',
				imageAlt: 'Personalized dashboards',
			},
			{
				title: 'Hybrid deployment: cloud & on-premise architecture',
				text: 'Due to strict IT and cybersecurity requirements, the client required flexible deployment options. ThingsBoard’s support for both Cloud and On-Premise configurations allowed Lumen to design a secure architecture aligned with corporate IT policies. This hybrid capability was a key factor in successfully delivering and scaling the project.',
				image: 'https://img.thingsboard.io/case-studies/lumen-3.webp',
				imageAlt: 'Hybrid deployment',
			},
			{
				title: 'Long-term stability in a 24/7 industrial environment',
				text: [
					'The platform has been operating continuously for more than four years, supporting high-frequency telemetry across thousands of data points without performance degradation.',
					'The system architecture allows seamless onboarding of new devices, additional production areas, and future expansion plans.'
				],
				image: 'https://img.thingsboard.io/case-studies/lumen-4.webp',
				imageAlt: 'Long-term stability',
			},
		],
	},

	help: {
		industryName: 'industrial manufacturing improve operations with IoT',
		blocks: [
			{
				title: 'Rule engine & automated workflows',
				text: 'ThingsBoard’s rule engine enables automated alerts and anomaly detection for abnormal energy usage, equipment behavior, and environmental deviations. This strengthens preventive and predictive maintenance strategies.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'ThingsBoard alarms table widget', title: 'ThingsBoard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'ThingsBoard notification widget', title: 'ThingsBoard notification widget' },
				],
			},
			{
				title: 'Asset hierarchies & multi-site modeling',
				text: 'The platform’s asset hierarchy structure allows Lumen to model factories, production lines, machines, and utility systems in a structured and scalable way. This is essential for managing multi-site industrial operations efficiently.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'ThingsBoard entities table widget', title: 'ThingsBoard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'ThingsBoard maps widgets card', title: 'ThingsBoard maps widgets card' },
				],
			},
			{
				title: 'Advanced dashboarding & data visualization',
				text: 'Highly customized dashboards transform complex telemetry into intuitive visualizations. Executives gain high-level KPI visibility, while technical teams access detailed operational metrics.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'ThingsBoard doughnut chart widget', title: 'ThingsBoard doughnut chart widget' },
				],
			},
			{
				title: 'Security, scalability & reliability',
				text: 'ThingsBoard’s secure device authentication, encrypted communication, and role-based access control meet strict industrial IT standards. The platform handles large-scale industrial workloads while maintaining stability and responsiveness.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'ThingsBoard roles table widget', title: 'ThingsBoard roles table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'ThingsBoard hierarchy widget', title: 'ThingsBoard hierarchy widget' }
				],
			},
			{
				title: 'Results & impact',
				text: 'Through ThingsBoard, Lumen Energy Solutions delivered a robust industrial IoT solution that achieved:',
				listItems: [
					'Full operational visibility across multiple factories',
					'Integration of 1,000+ IoT devices into a single platform',
					'Improved predictive maintenance capabilities',
					'Enhanced energy monitoring and cost optimization',
					'Secure and scalable multi-site architecture',
					'Continuous, reliable operation for over four years'
				],
				secondText: 'This case demonstrates how Lumen Energy Solutions leverages ThingsBoard to build secure, scalable, and high-performance industrial IoT applications in demanding manufacturing environments.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/thingsboard.webp', alt: 'ThingsBoard logo', title: 'ThingsBoard logo' },
					{ src: 'https://img.thingsboard.io/case-studies/lumen-color.webp', alt: 'Lumen logo', title: 'Lumen logo' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/lumen.svg',
		companyLogoAlt: 'Lumen logo',
		companyLogoWidth: 200,
		companyLogoHeight: 38,
	},
};
