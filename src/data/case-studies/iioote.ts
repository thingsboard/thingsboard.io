import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How iiOOTE Scaled LPWAN Services with ThingsBoard',
	pageTitle: 'How iiOOTE Scaled LPWAN Services',
	description:
		'See how iiOOTE used ThingsBoard to launch, scale, and manage LPWAN IoT services for smart cities and beyond.',
	pageSlug: 'iioote',
	breadcrumb: 'iiOOTE — Smart City',
	categories: ['Smart city'],

	hero: {
		category: 'SMART CITY',
		heading: 'From Prototyping to Commercial Services: How iiOOTE Scaled IoT with ThingsBoard',
		paragraphs: [
			'iiOOTE is an independent systems integrator with deep technical expertise in LPWAN technologies (LoRaWAN\u00AE, NB-IoT, etc.) and a strong international network across the IoT ecosystem. Headquartered in Sweden, iiOOTE designs and delivers scalable, end-to-end IoT solutions tailored for smart cities, utilities, environmental monitoring, and healthcare.',
			'By combining hardware, connectivity, and platform services, iiOOTE helps public sector and enterprise customers rapidly deploy and manage sensor networks. Their focus is on long-range, energy-efficient solutions that unlock data-driven insights and improve operational efficiency across verticals.',
		],
		logo: 'https://img.thingsboard.io/case-studies/iioote.svg',
		logoAlt: 'iiOOTE logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/iioote.webp',
	},

	problem: {
		description:
			'iiOOTE needed a quick and cost-efficient way to prototype IoT concept solutions and visualize sensor data. The platform had to be easy to deploy, support standard communication protocols, and scale from proof-of-concept to production without requiring complex customization.',
		challenges: [
			'Rapid prototyping of sensor-based solutions',
			'Centralized access to data from various LPWAN-connected devices',
			'Easy-to-use dashboarding without custom development',
			'Support for scaling to enterprise-grade services',
			'Smooth transition from concept testing to commercial operations',
		],
		results: [
			'Fast launch of early prototypes using ThingsBoard Community Edition',
			'Seamless integration of sensors and real-time dashboards',
			'Migration to ThingsBoard Professional Edition to support growing customer base',
			'Platform flexibility enabled commercial IoT services',
			'Scalable architecture ready for multiserver deployments',
		],
	},

	power: {
		companyName: 'iiOOTE',
		blocks: [
			{
				title: 'Rapid prototyping with Community Edition',
				text: 'ThingsBoard CE allowed iiOOTE to quickly launch IoT proof-of-concepts. Thanks to built-in protocol support and drag-and-drop dashboards, they accelerated initial development without writing custom code.',
				image: 'https://img.thingsboard.io/case-studies/iioote-1.webp',
				imageAlt: 'Rapid prototyping with Community Edition',
			},
			{
				title: 'Scalable migration to Professional Edition',
				text: 'As customer demand grew, iiOOTE upgraded to ThingsBoard PE, unlocking multi-tenancy, access control, and advanced features critical for managing commercial IoT services at scale.',
				image: 'https://img.thingsboard.io/case-studies/iioote-2.webp',
				imageAlt: 'Scalable migration to Professional Edition',
			},
			{
				title: 'Centralized LPWAN data aggregation',
				text: "Using ThingsBoard's flexible integration capabilities, iiOOTE connects thousands of LPWAN-enabled sensors and visualizes their data on a single platform. This centralized approach simplifies maintenance and operations.",
				image: 'https://img.thingsboard.io/case-studies/iioote-3.webp',
				imageAlt: 'Centralized LPWAN data aggregation',
			},
			{
				title: 'Tailored dashboards for diverse stakeholders',
				text: "ThingsBoard's customizable dashboards allow iiOOTE to provide each customer with a personalized view of their IoT ecosystem\u2014essential when supporting municipalities, enterprises, and service providers.",
				image: 'https://img.thingsboard.io/case-studies/iioote-4.webp',
				imageAlt: 'Tailored dashboards for diverse stakeholders',
			},
			{
				title: 'Future-ready and expandable architecture',
				text: 'With support for server clustering and horizontal scaling, ThingsBoard gives iiOOTE the freedom to grow with demand and add infrastructure as needed\u2014ensuring service continuity and performance.',
				image: 'https://img.thingsboard.io/case-studies/iioote-5.webp',
				imageAlt: 'Future-ready and expandable architecture',
			},
		],
	},

	help: {
		industryName: 'smart city solutions improve operations with IoT',
		blocks: [
			{
				title: 'Smart street lighting',
				text: 'Street lighting is one of the most energy-consuming services in a city. Smart lighting systems connected via ThingsBoard can reduce energy consumption, maintenance costs, and carbon emissions while improving public safety.<br/><br/>How It Works:',
				listItems: [
					'IoT-enabled streetlights report status, brightness, energy usage, and faults.',
					'Light levels are automatically adjusted based on ambient light, schedules, or motion detection.',
					'Faulty units trigger automatic alerts to maintenance crews.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hp-scada-energy.webp', alt: 'Thingsboard HP SCADA energy widgets', title: 'Thingsboard HP SCADA energy widgets' },
				],
			},
			{
				title: 'Smart waste management',
				text: "Efficient waste collection is critical to sanitation, fuel savings, and environmental health. ThingsBoard helps cities deploy smart bins that signal when they're full and optimize collection routes.<br/><br/>How It Works:",
				listItems: [
					'Ultrasonic or weight sensors detect bin fill levels.',
					'ThingsBoard triggers alerts when bins reach thresholds.',
					'Integrates with route optimization software to improve collection efficiency.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hp-scada-energy.webp', alt: 'Thingsboard HP SCADA energy widgets', title: 'Thingsboard HP SCADA energy widgets' },
				],
			},
			{
				title: 'Traffic & Parking Management',
				text: 'Urban mobility depends on efficient traffic and parking systems. ThingsBoard supports real-time tracking of vehicle movement, traffic density, and parking space availability.<br/><br/>How It Works:',
				listItems: [
					'Connect road sensors, ANPR cameras, and parking spot detectors.',
					'Monitor live traffic flow, parking occupancy, and violations.',
					'Use real-time data to optimize signals, guide drivers, and reduce congestion.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table-3.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/parking-status-widget.webp', alt: 'Thingsboard parking-status-widget', title: 'Thingsboard parking-status-widget' },
				],
			},
			{
				title: 'Environmental & air quality monitoring',
				text: 'To create healthier urban spaces, cities must monitor air quality, noise, and weather conditions. ThingsBoard provides real-time visibility and long-term trend analysis for environmental health.<br/><br/>How It Works:',
				listItems: [
					'IoT stations monitor CO\u2082, PM2.5, NO\u2082, temperature, humidity, and noise.',
					'Dashboards display live readings and issue alerts for dangerous thresholds.',
					'City planners use historical data for regulatory compliance and policy planning.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp', alt: 'Thingsboard digital gauges widgets', title: 'Thingsboard digital gauges widgets' },
					{ src: 'https://img.thingsboard.io/case-studies/hp-curcuit-breaker.webp', alt: 'Thingsboard HP curcuit breaker widget', title: 'Thingsboard HP curcuit breaker widget' },
				],
			},
			{
				title: 'Smart water & utility management',
				text: 'Water is a critical resource. ThingsBoard supports remote monitoring of water infrastructure, helping cities reduce leakage, improve billing accuracy, and conserve resources.<br/><br/>How It Works:',
				listItems: [
					'IoT meters track flow rate, pressure, consumption, and quality.',
					'Rule Engine detects anomalies such as pipe bursts, backflow, or tampering.',
					'SCADA dashboards allow operators to control pumps and valves remotely.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'Thingsboard bar chart widget', title: 'Thingsboard bar chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hp-centrifugal-pump.webp', alt: 'Thingsboard HP centrifugal-pump widget', title: 'Thingsboard HP centrifugal-pump widget' },
				],
			},
			{
				title: 'Public safety & emergency response',
				text: 'Cities need real-time situational awareness for emergencies, disasters, and security threats. ThingsBoard enables centralized alerting and device coordination for public safety operations.<br/><br/>How It Works:',
				listItems: [
					'Connect fire sensors, panic buttons, CCTV, public alarms.',
					'Real-time alerts are sent to emergency teams.',
					'Visual dashboards support faster decision-making during incidents.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
					{ src: 'https://img.thingsboard.io/case-studies/map-widget.webp', alt: 'Thingsboard map widget', title: 'Thingsboard map widget' },
				],
			},
			{
				title: 'Citizen & building engagement',
				text: 'Cities can offer interactive dashboards and services to residents, businesses, and building operators\u2014built on the same ThingsBoard backend.<br/><br/>How It Works:',
				listItems: [
					'Each building or stakeholder can access custom dashboards with relevant data.',
					'Citizens get real-time updates on air quality, energy use, or transit delays.',
					'Multi-tenant support keeps data isolated and secure.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"During our evaluation of several different IoT platforms we decided using ThingsBoard Community Edition to quickly get started with testing of our concept solutions. Since it offers an easy way to get access to data from all our sensors and supports building dashboards for visualization. However, we soon discovered that ThingsBoard also fulfilled our need to build commercial services. With increasing number of sensors..."',
		author: 'Bertil Moberg',
		role: 'Co-Founder & Head of IoT Solutions',
		company: 'iiOOTE',
		photo: 'https://img.thingsboard.io/case-studies/bertil-moberg.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/iioote.svg',
		companyLogoAlt: 'iiOOTE logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
