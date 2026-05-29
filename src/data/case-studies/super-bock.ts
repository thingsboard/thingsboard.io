import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How Super Bock Transformed Beverage Distribution with ThingsBoard IoT',
	pageTitle: 'How Super Bock Transformed Beverage Distribution',
	description:
		"Discover how Super Bock Group optimized beer tank monitoring and logistics using ThingsBoard's IoT platform\u2014achieving real-time insights, predictive maintenance, and enhanced customer satisfaction.",
	pageSlug: 'super-bock',
	breadcrumb: 'Super Bock Group — Industry 4.0',
	categories: ['Industry 4.0'],

	hero: {
		category: 'INDUSTRY 4.0',
		heading: 'Revolutionizing beer distribution: how ThingsBoard empowered Super Bock Group',
		paragraphs: [
			'Super Bock Group is the largest beverage company in Portugal and a global leader in the production of beer, bottled water, soft drinks, and wine. With over 130 years of history, the group is best known for its flagship product, Super Bock Beer, a beloved brand with a strong presence in over 50 countries. Based in Matosinhos, Portugal, Super Bock Group blends tradition with modern innovation, offering high-quality beverages while staying committed to sustainability and social responsibility. Their operations include brewing, bottling, and advanced logistics, serving customers across Europe, Africa, the Americas, and Asia.',
		],
		logo: 'https://img.thingsboard.io/case-studies/super-bock-group.svg',
		logoAlt: 'Super Bock Group logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/super-bock-group.webp',
	},

	statistics: [
		{ value: 100, suffix: '%', label: 'visibility of beer stock in real-time' },
		{ value: 90, suffix: '%', label: 'reduction in manual operations' },
		{ value: 3, suffix: '+', label: 'integrated solutions' },
	],

	quote: {
		text: '"We are thoroughly impressed by their post-delivery support and commitment to ensuring our satisfaction. Today, we can proudly say that our decision to choose ThingsBoard has allowed us to operate more efficiently and effectively, improving our overall productivity and enhancing our services to our valued customers."',
		author: 'Super Bock Group',
	},

	problem: {
		description:
			'Super Bock Group reached out to us with a clear objective: to help transform their beer distribution operations and overcome significant logistical challenges. To achieve their goals, they required advanced capabilities such as real-time monitoring, automated alerts, and intelligent management tools.',
		challenges: [
			'Inefficient tracking of beer stock levels in beer tanks across multiple restaurant locations, resulting in delayed refills and operational inefficiencies.',
			'Lack of real-time insights into the logistics of beer delivery, including vehicle routes, stock levels, and delivery statuses.',
			'No ability to alert users about critical situations, such as low stock levels, vehicle malfunctions, or keg tampering.',
			'Manual data entry processes for tracking kegs and deliveries, increasing the potential for errors and reducing scalability.',
		],
		results: [
			'Enhanced visibility of beer stock levels in beer tanks across restaurants using real-time monitoring.',
			'Better visualization and monitoring of delivery operations were achieved through the implementation of specific logic to segment trip data.',
			'Automated alerting and notification systems to ensure timely responses to critical situations.',
			'Streamlined synchronization of restaurant data from third-party systems.',
			'Reduced manual intervention by automating data processing and visualization workflows.',
		],
	},

	power: {
		companyName: 'Super Bock Group',
		blocks: [
			{
				title: 'Beer tanks monitoring',
				text: "To address the challenge of tracking beer levels in beer tanks at restaurants, ThingsBoard implemented a comprehensive solution to monitor the sensors which SBG deployed on beer tanks. Key metrics include remaining stock, pressure, and battery levels. Real-time monitoring dashboards provided immediate insights into stock status, while alert notifications ensured users were informed whenever beer levels dropped below predefined thresholds, enabling timely replenishment.",
				image: 'https://img.thingsboard.io/case-studies/beer-tanks.webp',
				imageAlt: 'Beer tank',
			},
			{
				title: 'Vehicle management',
				text: "To manage beer delivery logistics effectively, ThingsBoard developed a fully integrated solution. SBG implemented a real-time vehicle tracking system, using GPS data to monitor the locations and movements of trucks. ThingsBoard created dashboards to display vital metrics, such as battery levels, beer stock, and delivery statuses, ensuring that stakeholders always had a clear overview. Additional logic segmented data per trip, which helped to visualize and report delivery operations more efficiently.",
				image: 'https://img.thingsboard.io/case-studies/vehicle-management.webp',
				imageAlt: 'Man near vehicles',
			},
			{
				title: 'Alert and notification systems',
				text: 'To improve responsiveness to critical events, ThingsBoard implemented a unified alert system that included email and web-based notifications to inform users about low stock levels, vehicle issues, and potential keg tampering. Mobile notification extensions were also added to provide real-time updates on the go, ensuring users stayed informed regardless of their location. Additionally, the system allowed for customizable alert preferences, enabling users to tailor notifications based on their specific roles and responsibilities. Additional Development and integration with 3rd parties.',
				image: 'https://img.thingsboard.io/case-studies/alert-notification-system.webp',
				imageAlt: 'Hands with phone',
			},
		],
	},

	customerQuote: {
		text: '"At Super Bock Bebidas, S.A. we pride ourselves on our ability to adapt, innovate, and stay ahead of the curve. We have been using in-house beer drive tanks and tracking systems for many years. It served us well, but as the times evolved, we realized our system had become outdated, lacking the efficiency we desired. That\'s when we discovered ThingsBoard."',
		author: 'Super Bock Group',
	},

	help: {
		industryName: 'industry 4.0 improve operations with IoT',
		blocks: [
			{
				title: 'Two key functionalities were additionally developed',
				text: 'Two key functionalities were additionally developed<br/><br/>To address the challenge of assigning kegs to restaurants, sensors transmitted geolocation data derived from nearby Wi-Fi points and cellular towers. This data was processed using Google APIs to generate approximate GPS coordinates. These coordinates helped improve the accuracy of keg tracking, ensuring they were associated with the right locations. In future iterations, keg assignments are expected to be fully automated based on proximity to restaurant locations, streamlining the distribution process further.<br/><br/><span class="quote-text">The decision to migrate to ThingsBoard\'s platform was not made lightly but was supported by the ThingsBoard team\'s ability to listen, understand their needs, and propose a tailored solution.</span>',
				listItems: [
					"Synchronization logic to integrate restaurant data from Super Bock Group's systems into ThingsBoard, ensuring accurate and up-to-date information.",
					'Predictive rule nodes to estimate when beer levels would fall below acceptable thresholds, streamlining replenishment schedules.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/range-chart.webp', alt: 'Thingsboard range chart widget', title: 'Thingsboard range chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/route-map.webp', alt: 'Thingsboard route map widget', title: 'Thingsboard route map widget' },
				],
			},
			{
				title: 'A reliable and forward-thinking IoT partner',
				text: "Super Bock Group expressed their confidence in ThingsBoard after witnessing such professionalism, expertise, and commitment. Before engaging with ThingsBoard, the group had relied on other systems which no longer met the efficiency and modern capabilities required for their operations.<br/><br/>ThingsBoard delivered an exceptional beer tank tracking solution on time and within budget. This solution brought real-time visibility into assets, enhanced operational efficiency, and offered actionable insights. The platform's flexibility, user-friendly interface, and advanced IoT integration helped Super Bock Group modernize their operations and gain a competitive edge.<br/><br/><span class=\"quote-text\">They are pleased to recommend ThingsBoard as a reliable and forward-thinking IoT partner for businesses seeking quality, innovation, and excellence in operational solutions.</span><br/><br/>Beyond implementation, ThingsBoard's continuous support ensured that the system was optimized and issues were promptly addressed. The collaboration has significantly improved productivity and enhanced customer service. Super Bock Group views this partnership as a step toward embracing IoT as a cornerstone of their business strategy and looks forward to a long-lasting relationship with ThingsBoard.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/value-card.webp', alt: 'Thingsboard value card widget', title: 'Thingsboard value card widget' },
					{ src: 'https://img.thingsboard.io/case-studies/entities-table-2.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/super-bock-group.svg',
		companyLogoAlt: 'Super Bock Group logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
