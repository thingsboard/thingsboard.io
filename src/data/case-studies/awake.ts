import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Awake - IoT Rental Operations Dashboard for Global Fleet',
	pageTitle: 'Awake - IoT Rental Operations Dashboard for Global Fleet',
	description:
		'Discover how Awake streamlined global rental operations with ThingsBoard IoT \u2014 fleet management, contracts, geofencing, and real-time connectivity.',
	pageSlug: 'awake',
	breadcrumb: 'Awake — Smart City',
	categories: ['Smart city'],

	hero: {
		category: 'SMART CITY',
		heading: 'Awake: unifying global rental operations with custom IoT solutions',
		paragraphs: [
			'Awake develops, manufactures, and distributes electric Jetboards and eFoils to a global industry, with a retailer network consisting of over 50 dealers, covering all continents except for the poles. Awake was founded in 2018 by three young Swedes seeking to simplify access to powered water sports. It all started back in 2012, when one of the founders, Philip Werner, built his first prototype, made from an old windsurfing board, an RC system, and some lithium-ion batteries.',
			'Now, Awake is a formidable force in the world of electric water sports, boasting a global reach through its retailer network and a brand recognized for performance, quality, and outstanding design. Awake is a forward-leaning development company that continually pushes the boundaries of what is possible within the electric water sports space.',
		],
		logo: 'https://img.thingsboard.io/case-studies/awake.svg',
		logoAlt: 'Awake logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/awake.webp',
	},

	statistics: [
		{ value: 7, label: 'years on the market' },
		{ value: 50, suffix: '+', label: 'retailers worldwide managed under one system' },
		{ value: 6, label: 'key challenges solved with data-driven insights' },
	],

	quote: {
		text: 'We have reached out to ThingsBoard to build a rental operations dashboard for managing rental stations that offer our products. Additionally, we wanted to provide those stations with a ready-made interface for fleet and contract management. The solution needed to support rental contracts, performance reporting for rental centers, fleet management, geofencing, internal incident reporting, and multi-channel notifications (SMS, email, WhatsAp...',
		author: 'Klemen Pevec, Head of Software Engineering at Ride Awake',
	},

	problem: {
		description:
			"Awake created a new business model based on revenue-sharing and needed a specialized solution to support it. Main goals of creation of this system were managing product health and assets, ensuring efficient financial follow-up on revenue-sharing agreements. In essence, Awake needed to build a new operational foundation from scratch to successfully launch and scale this innovative business approach.",
		challenges: [
			"The company needed a completely new technological infrastructure that could accommodate Awake's innovative business model, that previously didn't exist within the company.",
			'Awake required a single platform to gain full control over all new rental operations, including asset tracking, product health, and financial follow-up.',
			'An important task was to equip partners with a professional, easy-to-use interface for fleet and contract management.',
			'The solution had to seamlessly connect with Awake\'s products in real-time to translate raw IoT data into actionable business intelligence and automated notifications.',
		],
		results: [
			'Delivered a tailor-made rental operations dashboard that empowered Awake to scale a completely new revenue-sharing model - establishing an operational foundation that had not existed before.',
			'Enabled rental centers to manage fleets, contracts, and service areas with an intuitive, brand-aligned interface, improving partner adoption and ensuring consistent, high-quality service.',
			'Integrated real-time IoT connectivity via MQTT with geofencing, performance reporting, internal incident tracking, and multichannel notifications (SMS, email, WhatsApp) - creating a fully connected and responsive operational ecosystem.',
			"Freed Awake's internal team to focus on strategic priorities while maintaining efficient collaboration that ensured the final solution met all functional and design expectations.",
			'Improved operational control and decision-making speed, reducing response times and ensuring safe, centralized management of all rental locations.',
		],
	},

	power: {
		companyName: 'Awake',
		blocks: [
			{
				title: 'One hub for operations',
				text: "Instead of juggling spreadsheets, email threads, and generic tools, Awake's team operates from a single control center powered by a custom IoT solutions. Every rental location, piece of equipment, and financial record is connected in one place, giving managers instant clarity and freeing them from manual data collection. This rental management software ensures decisions are based on real-time facts \u2014 not assumptions.",
				image: 'https://img.thingsboard.io/case-studies/awake-1.webp',
				imageAlt: 'Multi-sensor data integration',
			},
			{
				title: 'Empowering every rental center',
				text: 'Rental partners no longer need to rely on scattered processes. They log into a ready-to-use dashboard tailored to their needs \u2014 from contract creation and fleet tracking to geofencing and on-the-spot incident reports. With instant alerts via SMS, email, or WhatsApp, they can respond more quickly and maintain customer satisfaction. This fleet tracking solution makes it easier to keep assets safe, productive, and profitable.',
				image: 'https://img.thingsboard.io/case-studies/awake-2.webp',
				imageAlt: 'Real-time visualization & historical analytics',
			},
			{
				title: 'Turning product usage into insight',
				text: 'Every ride, rental, and maintenance event sends valuable data back to Awake. This continuous feedback loop enables the team to see exactly how jetboards perform in various conditions. Those insights shape design updates, boost reliability, and keep Awake ahead in the fast-moving electric water sports market.',
				image: 'https://img.thingsboard.io/case-studies/awake-3.webp',
				imageAlt: 'Trigger-based alerts & automation',
			},
		],
	},

	help: {
		industryName: 'companies improve rental operations with IoT',
		blocks: [
			{
				title: 'Centralized management system',
				text: 'ThingsBoard allows all operations to be united within a single platform. Instead of using multiple disparate systems, all data, from a global level down to individual devices, can be organized in a single structure. This provides complete control and simplifies managing a large network.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
				],
			},
			{
				title: 'Role-based access and custom dashboards',
				text: 'A key advantage of ThingsBoard is its ability to create tailored interfaces for different user roles. This allows administrators to have a full overview of the system, while workers are given only the functionality necessary for their daily tasks, which enhances efficiency and security.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
				],
			},
			{
				title: 'Advanced rental functionality',
				text: 'ThingsBoard allows for the integration of specific business processes, such as:',
				listItems: [
					'Geofencing - defining permitted operational zones.',
					'Contract Management - creating and closing contracts directly in the system.',
					'Incident Reporting - a simple tool for quickly reporting equipment problems.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'Thingsboard bar chart widget', title: 'Thingsboard bar chart widget' },
				],
			},
			{
				title: 'Reliable integration and IoT connectivity',
				text: 'The platform ensures stable, real-time connectivity via the MQTT protocol. Multi-channel notifications \u2014 SMS, email, and WhatsApp \u2014 allow businesses to react instantly to critical events, enhancing operational safety and responsiveness.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/awake.svg',
		companyLogoAlt: 'Awake logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
