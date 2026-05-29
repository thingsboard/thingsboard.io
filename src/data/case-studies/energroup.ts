import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'EnerGroup Enables Wireless Room-Level Heating Control with ThingsBoard',
	pageTitle: 'EnerGroup Enables Wireless Room-Level Heating Control',
	description:
		'EnerGroup uses ThingsBoard for wireless room-level heating control in the Pyxis residential building, with Milesight LoRaWAN devices and M-Bus meters.',
	pageSlug: 'energroup',
	breadcrumb: 'Smart building energy management — Smart energy',
	categories: ['Smart energy'],

	hero: {
		category: 'SMART ENERGY',
		heading: 'Smart building energy management: how EnerGroup enabled wireless room-level heating control with ThingsBoard',
		paragraphs: [
			'EnerGroup is a Swiss energy and automation integrator specializing in smart building technologies, energy renovation projects, and IoT-driven supervision platforms. The company supports residential and commercial building owners in reducing energy consumption, improving occupant comfort, and gaining full visibility into their technical installations.',
			'EnerGroup delivers end-to-end solutions covering renewable energy production, heating and domestic hot water systems, building automation (MCR), IoT connectivity, and digital supervision through its proprietary platform EnerMon, built on ThingsBoard.',
			'With a strong focus on real-world renovation constraints, EnerGroup emphasizes scalable, open, and non-intrusive solutions that can be deployed in both new and existing buildings.',
		],
		logo: 'https://img.thingsboard.io/case-studies/energroup.svg',
		logoAlt: 'EnerGroup logo',
		logoWidth: 200,
		logoHeight: 38,
		backgroundImage: 'https://img.thingsboard.io/case-studies/energroup.webp',
	},

	statistics: [
		{ value: 30, label: 'Milesight LoRaWAN devices used for heating regulation' },
		{ value: 27, label: 'M-Bus energy meters monitored through the platform' },
		{ value: 2, label: 'Heat pumps supervised and controlled via Modbus RTU (RS485)' },
	],

	quote: {
		text: '“The new centralized energy system combined with the ThingsBoard-based supervision platform provides both improved comfort for residents and full operational visibility for the building management.”',
		author: 'Representatives of the Pyxis PPE, Val de Bagnes',
	},

	problem: {
		challenges: [
			'Before the renovation, the Pyxis residential building faced several challenges.',
			'Decentralized electric domestic hot water systems in each apartment, resulting in high energy consumption.',
			'No centralized monitoring or control of heating and energy usage.',
			'Limited visibility for the building operator.',
			'Constraints related to renovation works in occupied apartments.',
			'Lack of flexibility for future optimization.',
		],
		results: [
			'Centralized renewable heat and DHW production using heat pumps.',
			'Wireless room-level heating control without intrusive cabling.',
			'Improved comfort for tenants with individual temperature control.',
			'Centralized supervision of technical and energy systems.',
			'A scalable digital foundation for future optimization and analytics.',
		],
	},

	power: {
		companyName: 'the EnerGroup',
		blocks: [
			{
				title: 'Wireless room temperature monitoring',
				text: 'Energroup deployed battery-powered Milesight WT401 thermostats in every room of each apartment. These devices continuously measure room temperatures and transmit data via LoRaWAN to the backend systems. ThingsBoard collects, stores, and visualizes this data, enabling real-time monitoring and historical analysis.',
				image: 'https://img.thingsboard.io/case-studies/energroup-1.webp',
				imageAlt: 'Wireless room temperature monitoring',
			},
			{
				title: 'Heating loop control via LoRaWAN actuators',
				text: 'At the heating manifold level, Milesight WS558 actuators were installed to control individual heating loops. ThingsBoard manages the bidirectional communication between room demand and hydraulic actuation, ensuring precise and responsive temperature regulation across the building.',
				image: 'https://img.thingsboard.io/case-studies/energroup-2.webp',
				imageAlt: 'Heating loop control',
			},
			{
				title: 'Centralized supervision with EnerMon',
				text: 'Energroup uses EnerMon, its branded platform based on ThingsBoard, to provide a unified view of the entire installation. The platform aggregates data from heating systems, domestic hot water production, and energy sources, offering both tenant-level interfaces and operator dashboards.',
				image: 'https://img.thingsboard.io/case-studies/energroup-3.webp',
				imageAlt: 'Centralized supervision',
			},
			{
				title: 'Secure and scalable IoT infrastructure',
				text: 'ThingsBoard is deployed on a dedicated server and integrated with a ChirpStack LoRaWAN Network and Application Server hosted by Energroup. This architecture ensures data security, high availability, and independence from proprietary cloud ecosystems.',
				image: 'https://img.thingsboard.io/case-studies/energroup-4.webp',
				imageAlt: 'Secure and scalable IoT infrastructure',
			},
		],
	},

	help: {
		industryName: 'smart buildings improve operations with IoT',
		blocks: [
			{
				title: 'Custom dashboards',
				text: 'ThingsBoard dashboards provide intuitive visualizations for both tenants and operators, including room temperatures, setpoints, heating status, and system overview screens.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'ThingsBoard alarms table widget', title: 'ThingsBoard alarms table widget' },
				],
			},
			{
				title: 'Asset and device hierarchies',
				text: 'The platform models the building structure using assets (building → floors → apartments → rooms), allowing Energroup to organize data logically and scale the solution easily to larger portfolios.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'ThingsBoard entities table widget', title: 'ThingsBoard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'ThingsBoard maps widgets card', title: 'ThingsBoard maps widgets card' }
				],
			},
			{
				title: 'Rule engine and automation',
				text: 'ThingsBoard’s rule engine enables automated data processing, condition-based actions, and integration with external systems, forming the basis for advanced regulation and optimization strategies.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hp-curcuit-breaker.webp', alt: 'Thingsboard hp circuit breaker widget', title: 'Thingsboard hp circuit breaker widget' },
					{ src: 'https://img.thingsboard.io/case-studies/markdown-html-widget.webp', alt: 'ThingsBoard markdown html widget', title: 'ThingsBoard markdown html widget' },
				],
			},
			{
				title: 'Role-based access control',
				text: 'Different user roles ensure that tenants can only access their own apartment data, while operators have full visibility and control over the entire installation.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'ThingsBoard roles table widget', title: 'ThingsBoard roles table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'ThingsBoard hierarchy widget', title: 'ThingsBoard hierarchy widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/energroup.svg',
		companyLogoAlt: 'EnerGroup logo',
		companyLogoWidth: 200,
		companyLogoHeight: 38,
	},
};
