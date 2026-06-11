import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Smart City Parking - X-TELIA Scales Fast with ThingsBoard',
	pageTitle: 'Smart City Parking — X-TELIA Scales Fast',
	description:
		'Discover how X-TELIA partnered with ThingsBoard to deliver a smart signage system using solar LoRaWAN\u2122 "No Parking" signs and real-time dashboards.',
	pageSlug: 'xtelia',
	breadcrumb: 'X-TELIA — Smart City',
	categories: ['Smart city'],

	hero: {
		category: 'SMART CITY',
		heading: 'Smart signage at scale: X-TELIA deploys LoRaWAN\u2122 parking management with ThingsBoard',
		paragraphs: [
			'X-TELIA is a global leader in the design and manufacturing of LoRaWAN\u00AE IoT solutions. With a mission to simplify IoT deployments, X-TELIA provides end-to-end wireless solutions that include high-performance gateways, sensors, and network infrastructure. Their products are known for their carrier-grade reliability, scalability, and efficiency, supporting diverse use cases from smart cities to industrial IoT.',
			'Their portfolio includes smart parking, street lighting, air quality monitoring, asset tracking, and other mission-critical applications. Through a unique combination of infrastructure ownership, integration capabilities, and vertical-specific expertise, X-TELIA plays a pivotal role in accelerating the adoption of IoT across Canada.',
		],
		logo: 'https://img.thingsboard.io/case-studies/x-telia.svg',
		logoAlt: 'X-TELIA logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/x-telia.webp',
	},

	statistics: [
		{ value: 976, suffix: 'K+', label: 'access points' },
		{ value: 4, suffix: 'M+', label: 'messages/day' },
		{ value: 800, suffix: '+', label: 'types of sensors' },
	],

	problem: {
		description:
			'X-TELIA secured a contract to deploy a city-wide system of solar-powered, wireless "No Parking" signs to manage on-street parking during snow removal operations. The entire solution\u2014from network communication to control dashboards\u2014had to be developed, tested, and deployed under a tight timeline, with financial penalties for late delivery.',
		challenges: [
			'Extremely short delivery window with contractual penalties for delays',
			"Need for reliable integration between X-TELIA's LoRaWAN\u2122 network and a robust IoT platform",
			'Real-time control and monitoring of dynamic "No Parking" signage',
			'Rapid development of a user-friendly dashboard interface',
			'Smooth deployment and testing of the production-ready platform',
		],
		results: [
			"Developed a robust MQTT-based protocol between X-TELIA's network and ThingsBoard",
			'Designed and implemented a custom dashboard widget for controlling signage',
			'Successfully deployed a ThingsBoard PE instance tailored for the use case',
			'Delivered the full solution on time, avoiding any contractual penalties',
			'Gained confidence in the platform and team, paving the way for future projects',
		],
	},

	power: {
		companyName: 'X-TELIA',
		blocks: [
			{
				title: 'Seamless MQTT integration',
				text: "ThingsBoard engineers collaborated directly with X-TELIA's developers to build a resilient MQTT-based communication protocol. This enabled fast, real-time data exchange between the LoRaWAN\u2122 infrastructure and the IoT platform.",
				image: 'https://img.thingsboard.io/case-studies/x-telia-1.webp',
				imageAlt: 'Seamless MQTT integration',
			},
			{
				title: 'Custom widget development',
				text: 'The ThingsBoard team created a purpose-built dashboard widget for intuitive signage control. This allowed operators to activate or deactivate "No Parking" signs across the city with a single click and full visibility.',
				image: 'https://img.thingsboard.io/case-studies/x-telia-2.webp',
				imageAlt: 'Custom widget development',
			},
			{
				title: 'Turnkey PE instance deployment',
				text: 'ThingsBoard Professional Edition was deployed under tight deadlines with production-grade reliability. Its scalable architecture allowed rapid deployment without compromising stability or performance.',
				image: 'https://img.thingsboard.io/case-studies/x-telia-3.webp',
				imageAlt: 'Turnkey PE instance deployment',
			},
			{
				title: 'Expert technical support',
				text: 'Throughout the project, the ThingsBoard team provided high-touch technical assistance. Their dedication and close cooperation were key to the successful and timely launch of the solution.',
				image: 'https://img.thingsboard.io/case-studies/x-telia-4.webp',
				imageAlt: 'Expert technical support',
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
				text: 'Efficient waste collection is critical to sanitation, fuel savings, and environmental health. ThingsBoard helps cities deploy smart bins that signal when they\'re full and optimize collection routes.<br/><br/>How It Works:',
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
		text: '"We were looking for a robust and scalable IoT platform to help us deploy leading edge LoRaWAN\u2122-based IoT projects. We landed a contract to deploy a city-wide network of solar/wireless variable message "No Parking" signs to manage on-street parking for snow removal operations. The deadline to develop, test and deploy the overall solution was very tight and included penalties for late delivery..."',
		author: 'Eric Bourbeau',
		role: 'Pr\u00E9sident fondateur & Founder and CEO',
		company: 'X-TELIA',
		photo: 'https://img.thingsboard.io/case-studies/eric-bourbeau.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/x-telia.svg',
		companyLogoAlt: 'X-TELIA logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
