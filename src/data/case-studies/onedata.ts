import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'OneData Boosts Hospital Efficiency 60-70% with ThingsBoard IoT',
	pageTitle: 'OneData Boosts Hospital Efficiency 60-70%',
	description:
		'OneData uses ThingsBoard for multi-specialty hospital operations \u2014 real-time asset tracking, patient monitoring, and dashboards for 500+ assets.',
	pageSlug: 'onedata',
	breadcrumb: 'Multi-Specialty Hospital — Healthcare',
	categories: ['Smart IoT solution'],

	hero: {
		category: 'HEALTHCARE',
		heading: 'Visual Transformation: How OneData boosted 60-70% Efficiency at a multi-speciality hospital',
		paragraphs: [
			'OneData Software Solutions is a technology and software development company that helps businesses modernize and grow with digital solutions. They offer a broad range of services including data analytics, custom software and website development, cloud consulting, digital marketing, IoT solutions, UI/UX design, and ERP/CRM systems.',
			'Their focus is on transforming raw data into actionable insights, building scalable cloud-based systems, connecting smart devices for real-time operations, and improving customer engagement through targeted marketing and intuitive user experiences. They serve diverse industries and emphasize customized, results-driven technology to support business growth and operational efficiency.',
		],
		logo: 'https://img.thingsboard.io/case-studies/onedata.svg',
		logoAlt: 'OneData logo',
		logoWidth: 200,
		logoHeight: 38,
		backgroundImage: 'https://img.thingsboard.io/case-studies/onedata.webp',
	},

	statistics: [
		{ value: 70, prefix: '~', suffix: '%', label: 'reduction in tracking time' },
		{ value: 500, suffix: '+', label: 'assets monitored in real-time' },
		{ value: 30, suffix: '%', label: 'cut in lost equipment costs' },
	],

	quote: {
		text: '"ThingsBoard and OneData have revolutionized our hospital\u2014tracking assets and patients are now effortless with visual maps, saving us 60-70% time and allowing focus on patient care."',
		author: 'Dr. Rajesh Kumar, Hospital Administrator, Multi-Specialty Hospital-Chennai',
	},

	problem: {
		description:
			'The Hospital grappled with chronic inefficiencies in asset and patient tracking. Manual methods led to lost equipment, delayed patient care, overburdened staff, and safety risks amid high daily volumes, wasting up to 70% of nursing time on non-clinical tasks.',
		challenges: [
			'Asset Misplacement: Critical items like wheelchairs and IV pumps were frequently lost, taking 20-30 minutes per search and causing 25% equipment downtime.',
			'Patient Safety Gaps: Elopement risks and poor bed turnover delayed admissions, increasing wait times by 40% during peaks.',
			'Staff Overload: Manual logging consumed 60-70% of shift time, driving burnout and 30% higher turnover.',
			'Inventory Inaccuracy: No real-time data led to over-purchasing and 20% annual equipment loss costs.',
			'Emergency Delays: Slow location of defibrillators or crash carts risked lives in critical scenarios.',
		],
		results: [
			'60-70% reduction in tracking time, freeing staff for direct care.',
			'50% faster response rates with real-time visual mapping for 500+ assets.',
			'40% drop in staffing needs for tracking, optimizing 80-bed operations.',
			'30% cut in lost equipment costs and 35% better asset utilization.',
			'Zero elopement incidents post-implementation, with scalable handling of 200 daily patients.',
			'For a 100-device indoor tracking deployment, annual service cost is cheaper, we deliver measurable operational gains without enterprise-level infrastructure spend.',
		],
	},

	power: {
		companyName: 'the Multi-Specialty Hospital',
		blocks: [
			{
				title: 'Real-time asset tracking',
				text: 'BLE beacons and WiFi integration provide sub-meter accuracy for 500+ items, showing locations on interactive floor plans. Staff access via mobile app cuts search time from 30 minutes to 2, reducing downtime by 50%. Visual heatmaps highlight idle assets for redistribution.',
				image: 'https://img.thingsboard.io/case-studies/onedata-1.webp',
				imageAlt: 'Real-time asset tracking',
			},
			{
				title: 'Patient monitoring and safety',
				text: 'Wearable tags track movements, alerting for unauthorized zones or falls. Integrated with vital sensors, it supports 200 patients daily, cutting elopement incidents by 40% and enabling quick reunions.',
				image: 'https://img.thingsboard.io/case-studies/onedata-2.webp',
				imageAlt: 'Patient monitoring and safety',
			},
			{
				title: 'Dashboard visualization',
				text: 'Custom widgets display live maps, telemetry, and analytics across departments. Nurses view asset status (onsite/offsite) instantly, improving utilization by 35% and supporting data-driven procurement.',
				image: 'https://img.thingsboard.io/case-studies/onedata-3.webp',
				imageAlt: 'Dashboard visualization',
			},
			{
				title: 'Automated alerts and reporting',
				text: 'Rule chains trigger SMS/email for low battery or overdue returns, with historical reports analyzing trends. This slashed lost assets by 30%, optimizing 80-bed capacity.',
				image: 'https://img.thingsboard.io/case-studies/onedata-4.webp',
				imageAlt: 'Automated alerts and reporting',
			},
		],
	},

	help: {
		industryName: 'healthcare improve operations with IoT',
		blocks: [
			{
				title: 'Rule Engine',
				text: 'Processes telemetry to trigger actions like alarms for asset misuse, automating workflows that reduced manual checks by 60%. Custom chains filter data for efficiency in high-volume settings.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'ThingsBoard entities table widget', title: 'ThingsBoard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/value-card.webp', alt: 'ThingsBoard value card widget', title: 'ThingsBoard value card widget' },
				],
			},
			{
				title: 'Asset hierarchies',
				text: 'Organizes devices into logical groups (e.g., by ward), enabling bulk management and inheritance of rules, simplifying oversight for 80-bed facilities.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'ThingsBoard hierarchy widget', title: 'ThingsBoard hierarchy widget' },
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
				],
			},
			{
				title: 'Dashboarding',
				text: 'Interactive visualizations with maps and charts provide role-based views, empowering staff with instant insights and cutting response times by 50%.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'ThingsBoard maps widget', title: 'ThingsBoard maps widget' },
				],
			},
			{
				title: 'Alarms and security',
				text: 'Configurable notifications via SMS/email, plus RBAC and encryption, ensure secure, proactive operations, preventing breaches while scaling seamlessly.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'ThingsBoard alarms table widget', title: 'ThingsBoard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'ThingsBoard notification widget', title: 'ThingsBoard notification widget' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"Managing and synchronizing hundreds of connected devices in a hospital was a key challenge, and ThingsBoard helped us turn that complexity into real-time operational clarity."',
		author: 'Raja Marimuthu',
		role: 'CEO',
		company: 'OneData Software Solutions Pvt. Ltd.',
		photo: 'https://img.thingsboard.io/case-studies/Raja_Marimuthu.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/onedata.svg',
		companyLogoAlt: 'OneData logo',
		companyLogoWidth: 200,
		companyLogoHeight: 38,
	},
};
