import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How Schwarz Group Unified 500,000+ IoT Devices with ThingsBoard',
	pageTitle: 'How Schwarz Group Unified 500,000+ IoT Devices',
	description:
		"Discover how Schwarz Group, operating over 13,000 stores globally, streamlined its retail operations by integrating 500,000+ devices using ThingsBoard's IoT platform, enhancing efficiency and accelerating digital transformation.",
	pageSlug: 'schwarz',
	breadcrumb: 'Schwarz Group — Smart Retail',
	categories: ['Smart retail'],

	hero: {
		category: 'SMART RETAIL',
		heading: 'IoT in retail: how Schwarz Group accelerated digitalization with ThingsBoard',
		paragraphs: [
			'The Schwarz Group is one of the largest retail companies in the world, based in Neckarsulm, Germany. It operates in 32 countries, managing around 13,900 stores and employing approximately 575,000 people. Millions of people shop at Schwarz Group supermarkets every day.',
			'The Schwarz Group owns two major supermarket chains. Beyond retail, the Schwarz Group also runs several other businesses.',
			'The Schwarz Group controls the entire product cycle with these divisions\u2014from production and retail to waste recycling and digital innovation. Their goal is to make everyday life more sustainable, healthy, and secure for billions of people worldwide.',
		],
		logo: 'https://img.thingsboard.io/case-studies/schwarz.svg',
		logoAlt: 'Schwarz Group logo',
		logoWidth: 410,
		logoHeight: 208,
		backgroundImage: 'https://img.thingsboard.io/case-studies/schwarz.webp',
	},

	statistics: [
		{ value: 500000, suffix: '+', label: 'connected devices' },
		{ value: 32, label: 'countries of operation' },
		{ value: 13900, label: 'stores' },
	],

	problem: {
		description:
			'The Schwarz Group, a global retail company faced several challenges in managing the technology used in its supermarkets. These issues made daily operations less efficient and prevented the company from applying the same processes across all locations.',
		challenges: [
			'Different Types of Technology \u2013 Each store used different devices and systems from various manufacturers, making it hard to manage and standardize.',
			'Data Was Not Connected \u2013 Without a single platform, data was spread out and difficult to analyze properly.',
			'Difficult to Expand \u2013 As the company grew, it became harder to connect new stores and devices to the existing system.',
		],
		results: [
			'One System for All Devices \u2013 The ThingsBoard IoT platform helped interconnect over 500,000 devices in all supermarkets, even if they used different communication methods like LoRaWAN, SigFox, or MQTT.',
			'Better Access to Data \u2013 Each store now has secure and customized access to its own data, making it easier to make decisions and improve efficiency.',
			'Faster Digitalization \u2013 The flexible platform allowed Schwarz Group to quickly introduce new features while keeping everything standardized. This also made maintenance easier and helped the company move toward a more digital future.',
		],
	},

	power: {
		companyName: 'Schwarz',
		blocks: [
			{
				title: 'Challenges in managing a large retail network',
				text: 'The Schwarz Group, a global retail leader operating over 13,000 stores in 32 countries, faced significant challenges in managing the huge amount of technical equipment within its supermarket network. Each store utilised a variety of devices and systems from different manufacturers, leading to inconsistencies and complexities in management. Data was scattered across different systems, making it almost impossible to get a clear overview of operations. As the company expanded, integrating new stores and devices into the existing infrastructure became increasingly challenging. These issues slowed down operations, increased costs, and prevented the Schwarz Group from running all its stores in a smooth, standardised way.',
				image: 'https://img.thingsboard.io/case-studies/schwarz-1.webp',
				imageAlt: 'Supermarket',
			},
			{
				title: 'Transforming retail operations with ThingsBoard',
				text: "By partnering with ThingsBoard, the Schwarz Group achieved significant improvements. The ThingsBoard IoT platform was able to interconnect over 500,000 devices across all its supermarkets. No matter what communication protocols the devices used\u2014LoRaWAN, SigFox, MQTT\u2014ThingsBoard made sure they could all work together seamlessly. Each store now has secure, customized access to its data, facilitating better decision-making and operational efficiency. Moreover, the flexibility of ThingsBoard enabled the Schwarz Group to quickly introduce new digital solutions while keeping everything standardized. These outcomes not only improved current operations but also positioned the Schwarz Group for future growth and innovation.",
				image: 'https://img.thingsboard.io/case-studies/schwarz-2.webp',
				imageAlt: 'Retail operations',
			},
			{
				title: 'A scalable and secure IoT solution',
				text: "ThingsBoard provided a comprehensive IoT platform that addressed the Schwarz Group's challenges through device integration, data visualization, scalability, and security. The platform's ability to connect a wide range of devices using multiple communication protocols ensured seamless integration across all stores. An intuitive IoT portal acted as a crucial visualization layer, presenting all relevant data from connected devices in an accessible format. ThingsBoard's scalable architecture allowed the Schwarz Group to expand its operations without compromising performance or manageability. The platform provided secure data access with customizable permissions tailored to the needs of each store. This partnership is an example of how customized IoT solutions can drive efficiency and innovation in large-scale retail operations.",
				image: 'https://img.thingsboard.io/case-studies/schwarz-3.webp',
				imageAlt: 'Scalable and secure IoT solution',
			},
		],
	},

	award: {
		image: 'https://img.thingsboard.io/case-studies/schwarz-award.svg',
		imageAlt: 'Top supplier retail award',
		imageWidth: 228,
		imageHeight: 330,
		title: 'An Award-Winning Collaboration',
		titleHref: '/blog/top-supplier-retail-2024-2/',
		description:
			'By solving these challenges, ThingsBoard has helped the Schwarz Group become more efficient, cost-effective, and digitally advanced. The impact of this transformation was so significant that ThingsBoard received the "TOP SUPPLIER RETAIL 2024" award from the EHI Retail Institute, proving how smart IoT solutions can revolutionize the retail industry.<br/><br/>This collaboration goes beyond just fixing technical issues\u2014it represents a step towards the future of retail, where smart, flexible, and secure IoT solutions play a key role. With ThingsBoard, the Schwarz Group has created a more connected, efficient, and technology-driven shopping experience, setting new standards for innovation and digital transformation in the retail industry.',
	},

	help: {
		industryName: 'retail businesses improve operations with IoT',
		blocks: [
			{
				title: 'Easy device management',
				text: 'Retailers use thousands of smart devices in their stores. Managing them one by one is difficult. ThingsBoard makes it simple by allowing retailers to:',
				listItems: [
					'Monitor all devices from a single dashboard.',
					'Control equipment remotely, such as refrigerators, air conditioners, and smart shelves.',
					'Detect and fix problems before they cause major issues.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/control-widgets.webp', alt: 'Thingsboard control widgets', title: 'Thingsboard control widgets' },
				],
			},
			{
				title: 'Real-time data and reports',
				text: 'To improve store operations, retailers need real-time data. ThingsBoard provides:',
				listItems: [
					'Custom dashboards to track important store data, such as temperature, energy use, and customer movement.',
					'Reports on past data, helping retailers improve store performance.',
					'Providing historical data analysis, which helps stores predict when they need to restock or service critical equipment.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/image-map.webp', alt: 'Thingsboard image map widget', title: 'Thingsboard image map widget' },
				],
			},
			{
				title: 'Smart automation with alerts',
				text: "One of the biggest advantages of IoT is automation. ThingsBoard's rule engine helps retailers:",
				listItems: [
					'Receive alerts when refrigerators are not working properly, preventing food from spoiling.',
					'Automatically adjust lighting and air conditioning, saving energy and reducing costs.',
					'Improve security by connecting with smart cameras and alarm systems.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/supermarkets.webp', alt: 'Supermarkets widget', title: 'Supermarkets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/analogue-gauge.webp', alt: 'Thingsboard analogue gauge widget', title: 'Thingsboard analogue gauge widget' },
				],
			},
			{
				title: 'Scalable and grows with your business',
				text: 'As retail businesses expand, they need a system that can grow with them. ThingsBoard can handle:',
				listItems: [
					'Millions of devices without slowing down.',
					'Different communication systems (MQTT, HTTP, CoAP), making it easy to interconnect existing equipment.',
					'Custom dashboards and workflows, so retailers can adjust the system to fit their needs.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/scalable-2.webp', alt: 'Thingsboard widget', title: 'Scalable and grows with your business' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/schwarz-logo.svg',
		companyLogoAlt: 'Schwarz logo',
		companyLogoWidth: 407,
		companyLogoHeight: 80,
	},
};
