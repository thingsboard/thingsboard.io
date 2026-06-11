import type { CaseStudyData } from './types';

import heroImage from '~/assets/case-studies/solandtec/hero.webp';
import logoImage from '~/assets/case-studies/solandtec/logo.webp';
import edgeCloudImage from '~/assets/case-studies/solandtec/edge-cloud.webp';
import lifecycleImage from '~/assets/case-studies/solandtec/lifecycle.webp';
import analysisImage from '~/assets/case-studies/solandtec/analysis.webp';

export const data: CaseStudyData = {
	title: 'How SOLANDTEC Secured Blower Reliability in Water Treatment with ThingsBoard',
	pageTitle: 'How SOLANDTEC Secured Blower Reliability in Water Treatment Plants',
	description:
		'How SOLANDTEC combined Advantech edge hardware with ThingsBoard to deliver real-time monitoring, lifecycle analytics, and fault logging for industrial blowers.',
	pageSlug: 'solandtec',
	breadcrumb: 'SOLANDTEC — Industry 4.0',
	categories: ['Industry 4.0'],

	hero: {
		category: 'INDUSTRY 4.0',
		heading:
			'Smart Industrial: How SOLANDTEC Leverages Multi-Technology and ThingsBoard to Secure Blower Reliability in Water Treatment Plants',
		paragraphs: [
			'Based in Guatemala, SOLANDTEC is a Central American leader in industrial automation, monitoring, and control. With over 9 years of experience, the company specializes in designing practical, reliable, and scalable systems that optimize processes and deliver measurable operational value.',
			'As experts in custom automation, SOLANDTEC integrates a diverse tech stack, including IoT protocols, precision sensors, and remote data acquisition with high-performance industrial hardware such as Advantech. This approach allows SOLANDTEC to create unified systems that enhance process reliability, ensuring the continuous operation of critical assets.',
		],
		logo: logoImage.src,
		logoAlt: 'SOLANDTEC logo',
		backgroundImage: heroImage.src,
	},

	statistics: [
		{ value: 9, suffix: '+', label: 'Years of experience' },
		{ value: 20, suffix: '+', label: 'Industries partnered' },
		{ value: 100, suffix: '%', label: 'System integration' },
	],

	quote: {
		text: 'What impressed me most about ThingsBoard is how fast you can go from a data source to a meaningful dashboard. I was sending real industrial data and visualizing it in a useful, clean interface within hours — not days.',
		author: 'William Sixta',
		role: 'PM, SOLANDTEC',
	},

	problem: {
		description:
			'A SOLANDTEC customer operates several fast food restaurants, each with its own waste water treatment plant (WWTP). These plants require a continuous oxygen supply to maintain critical biological processes. The oxygen is delivered by blowers driven by three-phase motors that must operate with 100% reliability. Prior to system integration, electrical failures such as phase drops or overcurrent would cause immediate motor shutdowns. Without real-time monitoring, these failures often went undetected, leading to degradation of the plant and the discharge of untreated water — creating a high risk of severe environmental non-compliance, costly restoration processes, and significant legal penalties.',
		challenges: [
			'The absence of remote monitoring for the blower prevented early detection of anomalies, which were only identified after being noticed by restaurant personnel.',
			'A reactive maintenance model without historical data led to frequent and unpredictable equipment downtime.',
			"Without totalized runtime data, the motor's lifecycle could not be effectively monitored or managed.",
			'The lack of visibility into blower performance allowed failures to go undetected, compromising biological processes and exposing the facility to significant damage and financial risk.',
		],
		results: [
			'Real-time operational data is acquired directly from the blower control, with automatic generation of a comprehensive historical database for long-term analysis.',
			"By integrating an Advantech intelligent gateway with ThingsBoard, the system provides visibility into the blower's health.",
			'The system surfaces operational failures in real time as they occur, eliminating reliance on manual inspections and enabling proactive response.',
			'The transition from reactive to data-driven management has significantly improved decision-making, ensuring continuous, optimized blower performance.',
		],
	},

	power: {
		companyName: 'SOLANDTEC',
		blocks: [
			{
				title: 'Edge to Cloud Integration',
				text: "SOLANDTEC deployed the Advantech ADAM-6717 as an intelligent edge gateway to maintain continuous data acquisition and logging of the blower's control signals. The device manages real-time logic and ensures instant connectivity by pushing automated notifications via Telegram and Email. Simultaneously, by integrating this with ThingsBoard, SOLANDTEC streams all operational data to the cloud, enabling real-time visualization and reliable remote monitoring.",
				image: edgeCloudImage.src,
				imageAlt: 'Edge-to-cloud integration with Advantech gateway and ThingsBoard',
			},
			{
				title: 'Advanced Lifecycle & Performance Analytics',
				text: "Beyond simple tracking, SOLANDTEC utilizes ThingsBoard to centralize real-time monitoring of voltage, current stability, and total working hours. This data facilitates motor analysis, allowing preventive maintenance to be scheduled based on real-time equipment usage. By consolidating these metrics into a single interface, SOLANDTEC ensures optimal performance and maximizes the operational lifespan of the client's most critical industrial machinery.",
				image: lifecycleImage.src,
				imageAlt: 'Lifecycle and performance analytics dashboard',
			},
			{
				title: 'Post-Incident Analysis & Fault Logging',
				text: "ThingsBoard provides a critical historical auditing capability for all system events. When something goes wrong, the platform logs the exact timestamp and duration of the fault, allowing the client to perform a forensic review of the blower's performance. This automated logging eliminates manual incident reports and identifies recurring electrical patterns before they escalate into future failures.",
				image: analysisImage.src,
				imageAlt: 'Post-incident analysis and fault logging',
			},
		],
	},

	help: {
		industryName: 'industrial automation improve operations with IoT',
		blocks: [
			{
				title: 'Real-Time Operational Visibility',
				text: 'Real-time visibility is the cornerstone of modern industrial operations. ThingsBoard delivers intuitive dashboards that provide supervisors with constant monitoring of essential processes, including blower states and critical electrical parameters. This data is accessible from any device worldwide, effectively eliminating guesswork and ensuring data-driven oversight.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/value-card.webp', alt: 'ThingsBoard value card widget', title: 'Value card' },
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'ThingsBoard line chart widget', title: 'Line chart' },
				],
			},
			{
				title: 'Seamless Edge-to-Cloud Integration',
				text: 'The gap between the factory floor and the digital world is bridged by integrating industrial edge hardware into the ThingsBoard ecosystem. While edge devices handle local logic and immediate critical alerts, the platform acts as a centralized intelligence hub. This ensures that local actions are always backed by cloud-based supervision and data redundancy.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'ThingsBoard alarm table widget', title: 'Alarm table' },
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'ThingsBoard bar chart widget', title: 'Bar chart' },
				],
			},
			{
				title: 'Centralized Multi-Facility Management',
				text: 'This unified platform streamlines the management of multiple plants and production lines across the organization. Through specialized dashboards and interactive maps, the system enables high-level cross-site comparisons and centralized performance tracking from a single location. This approach simplifies global operations and ensures consistent reliability across every facility.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'ThingsBoard entities table widget', title: 'Entities table' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'ThingsBoard maps widget', title: 'Maps' },
				],
			},
		],
	},

	contact: {
		companyLogo: logoImage.src,
		companyLogoAlt: 'SOLANDTEC logo',
	},
};
