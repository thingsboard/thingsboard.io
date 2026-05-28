import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Energenix Scales Solar SCADA & Analytics on ThingsBoard',
	pageTitle: 'Energenix Scales Solar SCADA & Analytics',
	description:
		'Energenix unifies 80+ sites and 120+ MW on AWS-hosted ThingsBoard Cloud and Edge \u2014 KPI dashboards, rule-engine alarms, and automated reporting.',
	pageSlug: 'energenix',
	breadcrumb: 'Energenix — Smart Energy',
	categories: ['Smart energy'],

	hero: {
		category: 'SMART ENERGY',
		heading:
			'Scaling renewable energy intelligence: how Energenix uses ThingsBoard to monitor and optimize 120+ MW of solar power assets',
		paragraphs: [
			'Energenix is a renewable energy intelligence and SCADA solutions provider operating across South Asia, delivering real-time monitoring, analytics, and control for utility-scale and commercial renewable energy assets. The company specializes in solar power plant performance monitoring, grid compliance reporting, and operational intelligence for asset owners, EPCs, and O&M teams.',
			'Energenix is powered by ThingsBoard, hosted on AWS, as its primary IoT and data intelligence platform. The solution has been developed and deployed by its technology partner Thingsnode, an IoT systems integrator and analytics company with deep expertise in energy systems and industrial data platforms.',
			'Today, Energenix monitors a consolidated renewable energy portfolio exceeding 120 MW, spanning utility-scale solar parks, commercial & industrial rooftop solar, and distributed generation sites across Sri Lanka, India, Bangladesh, and selected international deployments.',
		],
		logo: 'https://img.thingsboard.io/case-studies/energenix.svg',
		logoAlt: 'Energenix logo',
		logoWidth: 200,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/energenix.webp',
	},

	statistics: [
		{ value: 120, suffix: '+', label: 'MW of renewable energy assets monitored' },
		{ value: 80, suffix: '+', label: 'sites onboarded under a unified platform' },
		{ value: 24, suffix: '/7', label: 'real-time visibility for asset owners and operators' },
	],

	problem: {
		description:
			'Before implementing Energenix on ThingsBoard, asset owners and operators faced several operational challenges:',
		challenges: [
			'Fragmented monitoring systems across different inverter brands and sites.',
			'Limited real-time visibility into plant performance and losses.',
			'Manual and time-consuming performance reporting.',
			'High operational overhead in managing devices, users, and security.',
			'Difficulty scaling monitoring systems cost-effectively as MW capacity grew.',
		],
		results: [
			'Centralized monitoring across multi-vendor, multi-site portfolios.',
			'Faster fault detection and reduced Mean Time to Resolution (MTTR).',
			'Standardized dashboards and automated reporting.',
			'Scalable platform with predictable operational costs.',
			'Improved asset availability and performance transparency.',
		],
	},

	power: {
		companyName: 'Energenix',
		blocks: [
			{
				title: 'Unified asset & device management',
				text: "Energenix uses ThingsBoard's asset hierarchy and device model to represent complex renewable portfolios, from plant level down to inverters, meters, and weather stations. This abstraction allows operators to manage hundreds of sites without increasing operational complexity.",
				image: 'https://img.thingsboard.io/case-studies/energenix-1.webp',
				imageAlt: 'Unified asset & device management',
			},
			{
				title: 'Real-time monitoring & visualization',
				text: 'Custom dashboards built on ThingsBoard provide real-time KPIs such as power output, energy yield, PR, CUF, and loss breakdowns. Different dashboards are tailored for operators, asset managers, and executives, ensuring clarity at every level.',
				image: 'https://img.thingsboard.io/case-studies/energenix-2.webp',
				imageAlt: 'Real-time monitoring & visualization',
			},
			{
				title: 'Advanced rule engine & alerts',
				text: "ThingsBoard's rule engine enables real-time alerts for inverter faults, grid outages, communication failures, and performance deviations. Automated notifications help teams act before issues escalate into revenue losses.",
				image: 'https://img.thingsboard.io/case-studies/energenix-3.webp',
				imageAlt: 'Advanced rule engine & alerts',
			},
			{
				title: 'Fast on-site control with ThingsBoard Edge',
				text: 'ThingsBoard Edge enables Energenix to deliver low-latency monitoring and control directly at plant sites, allowing operational staff to respond instantly to events without reliance on cloud connectivity. This improves response times, enhances operational control, and ensures uninterrupted plant monitoring even during network disruptions.<br/><i>Photo: Energenix Solution at 10MW Solar power plant control room in Sri Lanka</i>',
				image: 'https://img.thingsboard.io/case-studies/energenix-4.webp',
				imageAlt: 'Fast on-site control with ThingsBoard Edge',
			},
			{
				title: 'Edge + Cloud for mission-critical reliability',
				text: 'ThingsBoard Edge enables Energenix to maintain continuous monitoring and control at plant level, while AWS-hosted ThingsBoard Cloud provides centralized analytics, dashboards, and long-term storage. This architecture significantly improves system resilience, reduces downtime risk, and ensures reliable operations across large renewable portfolios.<br/><i>Photo: Energenix Solution was presented to the president of Sri Lanka at the Disrupt Asia Summit 2025</i>',
				image: 'https://img.thingsboard.io/case-studies/energenix-5.webp',
				imageAlt: 'Edge + Cloud for mission-critical reliability',
			},
		],
	},

	help: {
		industryName: 'Energenix improve operations with IoT',
		blocks: [
			{
				title: 'Comprehensive device & security management',
				text: 'ThingsBoard handles device provisioning, authentication, and access control out-of-the-box. This eliminates the burden of building and maintaining custom IoT infrastructure, significantly reducing long-term maintenance costs.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table-4.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hp-scada-energy.webp', alt: 'Thingsboard HP SCADA energy widgets', title: 'Thingsboard HP SCADA energy widgets' },
				],
			},
			{
				title: 'Powerful dashboards & data visualization',
				text: "The platform's flexible widget system enables intuitive visualization of complex energy data, making performance trends and anomalies easy to interpret for both technical and non-technical users.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp', alt: 'Thingsboard digital gauges widgets', title: 'Thingsboard digital gauges widgets' },
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
				],
			},
			{
				title: 'Scalability without complexity',
				text: 'As Energenix expanded its portfolio toward 120+ MW, ThingsBoard scaled effortlessly. New plants and devices can be onboarded with minimal configuration, supporting rapid business growth.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
				],
			},
			{
				title: 'Lower total cost of ownership',
				text: 'By leveraging a mature IoT platform, Energenix avoids high engineering overhead related to device management, security hardening, and platform stability - allowing teams to focus on value-added analytics and customer outcomes.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'Thingsboard bar chart widget', title: 'Thingsboard bar chart widget' },
				],
			},
			{
				title: 'Why ThingsBoard was the right choice',
				text: "ThingsBoard's comprehensive IoT capabilities\u2014combined with AWS cloud infrastructure\u2014enable Energenix to deliver a stable, secure, and scalable renewable energy monitoring solution without the risks and costs associated with custom-built platforms.<br/><br/>For Energenix and its customers, this translates into:",
				listItems: [
					'Faster deployment',
					'Lower operational risk',
					'Higher system reliability',
					'Sustainable long-term growth',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/tb-logo-card.webp', alt: 'Thingsboard logo card', title: 'Thingsboard logo card' },
					{ src: 'https://img.thingsboard.io/case-studies/energenix-logo-card.webp', alt: 'Energenix logo card', title: 'Energenix logo card' },
				],
			},
		],
	},

	customerQuote: {
		text: 'By adopting ThingsBoard as its core IoT platform, Energenix has successfully transformed renewable energy monitoring into a scalable, productized intelligence solution. The platform now serves as the backbone for managing a rapidly growing renewable energy portfolio, empowering asset owners to maximize performance, reduce losses, and operate with confidence.',
		author: 'Anuruddha Tennakoon and Migara Amithodhana',
		role: 'Directors, Co-Founders',
		company: 'Energenix',
		photo: 'https://img.thingsboard.io/case-studies/Anuruddha_Tennakoon-Migara_Amithodhana.webp',
	},

	authoredQuote: {
		text: '"Energenix has significantly improved visibility across our entire solar portfolio. Having real-time performance data, unified dashboards, and automated alerts in one platform has transformed how our teams monitor plants, identify issues, and make operational decisions. It has become an essential tool for managing and optimizing our renewable energy assets at scale."',
		author: 'Samantha Epa',
		role: 'General Manager \u2013 Solar, Windforce PL',
		company: 'Energenix',
		photo: 'https://img.thingsboard.io/case-studies/samantha-epa.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/energenix.svg',
		companyLogoAlt: 'Energenix logo',
		companyLogoWidth: 200,
		companyLogoHeight: 56,
	},
};
