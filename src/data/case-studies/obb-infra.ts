import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How \u00D6BB-Infrastruktur AG Transformed Railway Operations with ThingsBoard',
	pageTitle: 'How \u00D6BB-Infrastruktur AG Transformed Railway Operations',
	description:
		"Discover how \u00D6BB-Infrastruktur AG enhanced railway efficiency and safety by integrating ThingsBoard's IoT platform\u2014achieving real-time monitoring, predictive maintenance, and secure data flow without public internet exposure.",
	pageSlug: 'obb-infra',
	breadcrumb: 'ÖBB-Infrastruktur AG — Smart Infrastructure',
	categories: ['Smart infrastructure'],

	hero: {
		category: 'SMART INFRASTRUCTURE',
		heading: 'Smart railway infrastructure: digital transformation of \u00D6BB-Infrastruktur AG',
		paragraphs: [
			"As Austria's pioneer rail transport provider, \u00D6BB-Infrastruktur AG is responsible for planning, developing, maintaining, and operating Austria's rail infrastructure. The company is committed to setting high standards for punctuality, safety, cleanliness, and open access to the rail system.",
			'With innovation and sustainability in mind, \u00D6BB-Infrastruktur AG ensures that millions of passengers travel comfortably and enables efficient transportation of goods across Austria and beyond. The goal is simple: make every journey a good experience, create welcoming stations, and contribute to the country\'s progress with every project.',
			'The main challenge in the upcoming years is going to be the rising demand in railway traffic, increased density in our timetables, thus less time-windows for maintenance work which require the track closings. Those challenges can only be encountered with better planning, and more cooperation between business units based on data in our railway digital twin.',
		],
		logo: 'https://img.thingsboard.io/case-studies/obb.svg',
		logoAlt: '\u00D6BB-Infrastruktur AG logo',
		logoWidth: 91,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/obb.webp',
	},

	statistics: [
		{ value: 25888, label: 'manage signals to control and safety' },
		{ value: 5, label: 'operational control centers monitoring and management' },
		{ value: 6634, label: 'bridges maintenance and cost reduction' },
	],

	problem: {
		description:
			"\u00D6BB-Infrastruktur AG aimed to ensure greater traffic capacity on our tracks while maintaining excellent levels of safety, travel comfort and sustainability. The lifecycle of railway assets needs to be monitored and managed proactively to ensure high availability for railway operation teams. This requires integration of IoT solutions that will confront the challenges related to real-time data processing, secure communication, and predictive analytics. The objective is to enhance mobility, reduce emissions, and optimize maintenance processes.",
		challenges: [
			"Managing real-time data from a vast network of IoT devices across a nationwide railway infrastructure, and eliminating the need to expose internal systems to the public Internet while maintaining data flow.",
			'Moving from "What\'s now?" to "What\'s next?" to "What if?" using data analytics.',
			"Provide a unified and accessible interface for \u00D6BB's internal customers to visualize IoT data.",
		],
		results: [
			"By leveraging the country-wide private fiber network and ThingsBoard Edge, \u00D6BB-Infrastruktur AG has created a secure internal communications channel that keeps data within its IT network, minimizes security risks, and enables local systems to connect securely without bridging firewalls or using the public Internet.",
			'Thingsboard played a key role in the Austrian Railways initiative to create a Digital Twin of the railway assets by providing real-time asset condition data and recording time-series data. By leveraging the Digital Twin concept with ThingsBoard, \u00D6BB-Infrastruktur AG could predict potential issues, simulate scenarios, and make informed decisions proactively.',
			"The main UI provided by the ThingsBoard PE instance in the \u00D6BB Azure Cloud Tenant allowed all internal stakeholders to access customized dashboards and insights tailored to their use cases.",
		],
	},

	power: {
		companyName: '\u00D6BB-Infrastruktur AG',
		blocks: [
			{
				title: 'Digital Twin initiative',
				text: "\u00D6BB-Infrastruktur AG uses a Digital Twin to evaluate current conditions, make predictions, and simulate possible situations. Digital Twin is a digital representation of a physical system, in this case, the railway infrastructure. The approach requires accessing real-time asset condition data as well as time-series records. ThingsBoard acts as one major enabling technology of this initiative, offering a unified platform for IoT data ingestion, processing, visualization, and analysis:<ul><li>ThingsBoard enables seamless integration of diverse IoT devices deployed via communication protocols (e.g., MQTT, CoAP, HTTP) across the rail infrastructure for real-time data collection.</li><li>ThingsBoard Edge allows on-premise data processing, keeping critical data within \u00D6BB's private network and facilitates secure integration with internal systems without exposing them to the public internet as well as prevent data loss in situations of network separation between cloud and on-premise.</li><li>ThingsBoard Cloud provides powerful visualization tools through customizable dashboards, enabling internal stakeholders to monitor assets, track performance, and analyze trends.</li><li>ThingsBoard enables condition monitoring and predictive maintenance through the analysis of sensor data and environmental parameters, reducing unplanned downtime by generating alerts based on predefined thresholds and conditions.</li><li>Assessing current asset conditions (\u201CWhat now?\u201D) and forecasting future developments (\u201CWhat next?\u201D) based on data processed in the Digital Twin.</li></ul>",
				image: 'https://img.thingsboard.io/case-studies/digital-twin.webp',
				imageAlt: 'Laptop',
			},
			{
				title: 'Secure and resilient data flow for \u00D6BB-Infrastruktur AG',
				text: "ThingsBoard Edge instances, strategically deployed on-premises within \u00D6BB-Infrastruktur AG's infrastructure, ensure secure data flow entirely within the internal IT network, avoiding exposure to the public Internet and firewall bridging. By caching IoT data locally until a successful transmission to the ThingsBoard PE instance in the \u00D6BB Azure Cloud Tenant, this setup achieves:<ul><li>Network Decoupling: Efficiently separates on-premises and cloud environments, reducing dependencies and potential disruptions.</li><li>Resilience to Network Issues: Maintains data integrity and operational continuity during Internet slowdowns, VPN issues, or cloud connectivity problems.</li><li>Optimized Data Flow: Allows continuous data processing even when Site2Site VPN or ExpressRoute connections experience challenges.</li></ul><br/>This architecture not only enhances data security and availability but also supports real-time monitoring and predictive maintenance as part of \u00D6BB's Digital Twin initiative.",
				image: 'https://img.thingsboard.io/case-studies/secure-resilient.webp',
				imageAlt: 'Server',
			},
		],
	},

	fullWidthImage: {
		src: 'https://img.thingsboard.io/case-studies/railway.webp',
		alt: 'Railways',
		width: 1920,
		height: 946,
	},

	help: {
		industryName: 'smart rail infrastructure management improve operations with IoT',
		blocks: [
			{
				title: 'Smart railway infrastructure management',
				text: "ThingsBoard Edge can play a crucial role in smart railway infrastructure management. Due to specifics of edge computing, the data remains within the network, enhancing security by eliminating the need to expose internal systems to the public internet. By caching IoT data locally until a successful connection with the ThingsBoard PE instance, ThingsBoard Edge ensures both data integrity and operational continuity.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/status-widget.webp', alt: 'Thingsboard status widget', title: 'Thingsboard status widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Real-time data and proactive scenario testing',
				text: 'The platform offers real-time data and time-series records allowing organizations to evaluate asset current conditions, anticipate future issues, and test different operational scenarios proactively. This capability is essential for informed decision-making and enhancing the safety, efficiency, and sustainability of railway operations.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table-2.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
				],
			},
			{
				title: 'Enabling predictive maintenance and operational efficiency',
				text: 'Additionally, by analyzing collected sensor data from railway assets, ThingsBoard Edge enables support for the predictive maintenance strategies, helping to reduce unplanned downtime and improve the overall efficiency of operations.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/value-card.webp', alt: 'Thingsboard value card widget', title: 'Thingsboard value card widget' },
					{ src: 'https://img.thingsboard.io/case-studies/entities-table-4.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
				],
			},
			{
				title: 'Centralized visualization and enhanced operational management',
				text: 'The ThingsBoard PE instance provides a centralized user interface in the cloud, offering customizable dashboards that enable stakeholders to visualize IoT data relevant to their specific use cases. This unified visualization capability helps improve train scheduling, capacity management, and asset utilization, directly contributing to optimized railway operations.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'Thingsboard bar chart widget', title: 'Thingsboard bar chart widget' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"Thingsboard Edge gives us the invaluable ability to allow data to flow within our IT network without the need to bridge Firewalls and Public Internet."',
		author: 'Dominic Winkler',
		role: 'IT Enterprise Architect',
		company: '\u00D6BB-Infrastruktur AG',
		photo: 'https://img.thingsboard.io/case-studies/Dominic_Winkler.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/obb.svg',
		companyLogoAlt: '\u00D6BB-Infrastruktur AG logo',
		companyLogoWidth: 91,
		companyLogoHeight: 56,
	},
};
