import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How OXI TRADE Uses ThingsBoard to Power Scalable IoT for Green Energy',
	pageTitle: 'How OXI TRADE Powers Scalable IoT for Green Energy',
	description:
		"Discover how OXI TRADE optimized its alternative energy operations by integrating ThingsBoard's IoT platform\u2014achieving efficient device management, real-time monitoring, and scalable infrastructure for enhanced performance.",
	pageSlug: 'oxi',
	breadcrumb: 'OXI TRADE — Smart Energy',
	categories: ['Smart energy'],

	hero: {
		category: 'SMART ENERGY',
		heading: 'Empowering alternative energy: how OXI TRADE streamlined IoT infrastructure with ThingsBoard',
		paragraphs: [
			'OXI TRADE is a Ukrainian company with over 10 years of experience in developing innovative solutions in the field of alternative energy. It specializes in the production of pellet burners under the OXI brand for efficient and environmentally friendly heating. Their product line includes pellet burners designed for both domestic and industrial use. The company has already sold over 7,000 units of equipment in Ukraine and Europe.',
			'OXI pellet burners are highly efficient (with an efficiency of at least 96%) thanks to their unique proprietary technologies. They are also more reliable, flexible, and of higher quality compared to similar equipment produced abroad.',
		],
		logo: 'https://img.thingsboard.io/case-studies/oxi.svg',
		logoAlt: 'OXI Trade logo',
		logoWidth: 153,
		logoHeight: 156,
		backgroundImage: 'https://img.thingsboard.io/case-studies/oxi.webp',
	},

	statistics: [
		{ value: 10, suffix: '+', label: 'years experience in the alternative energy sector' },
		{ value: 7, suffix: 'K+', label: 'pellet burners sold' },
		{ value: 96, suffix: '%', label: 'efficiency performance of pellet burners' },
	],

	problem: {
		description:
			'OXI TRADE required a smart and automated IoT solution to manage their IoT-enabled pellet burner devices efficiently.',
		challenges: [
			'The need to integrate thousands of pellet burners into a centralized system without manual configuration.',
			'Each new device should automatically register itself in the system upon activation, without requiring intervention from administrators or users.',
			'Different levels of access for tenants, distributors, resellers, customers, and service departments.',
			'Customers and service teams needed a web-based dashboard to track key performance metrics.',
			'Devices had to report real-time errors and alerts to ensure smooth operations and quick response to issues.',
		],
		results: [
			'The self-provisioning mechanism allowed devices to register themselves in the system, eliminating manual setup efforts.',
			'Hierarchical user management enabled tenants, distributors, resellers, and customers to interact with devices according to their assigned roles.',
			'Users could remotely send operational commands such as start, stop, and feeder filling to the pellet burners.',
			'The system categorized and logged device alerts such as "No Fuel," "Boiler Overheat," and "Sensor Error," allowing for timely interventions.',
			'Audit logging for user actions helps OXI TRADE to track commands sent by users to identify potential misconfigurations or issues caused by incorrect operator actions.',
		],
	},

	power: {
		companyName: 'OXI TRADE',
		blocks: [
			{
				title: 'Customized IoT backbone for pellet burner operations',
				text: "ThingsBoard serves as the backbone of OXI TRADE's IoT infrastructure, providing all the tools necessary to connect, manage, and operate their pellet burner devices. The platform was tailored to meet the company's specific requirements, ensuring flexibility, automation, and effective collaboration across OXI TRADE's distribution network.",
				image: 'https://img.thingsboard.io/case-studies/pallet_1.webp',
				imageAlt: 'Pellets pile',
			},
			{
				title: 'Seamless and scalable device provisioning',
				text: "One of the key features is automated device provisioning. ThingsBoard enables OXI TRADE's pellet burners to self-register upon activation. Each device, pre-configured with unique credentials, sends a provisioning request with a secure key and secret to ThingsBoard. Once validated, the platform registers the device, assigns proper credentials, and integrates it into the system\u2014without any manual setup. This smooth process makes it easy to scale and reduces the amount of administrative effort.",
				image: 'https://img.thingsboard.io/case-studies/pallet_2.webp',
				imageAlt: 'Laptop',
			},
			{
				title: 'Role-based access for the entire distribution network',
				text: "To support its expanding network of partners and customers, OXI TRADE required a way to manage multiple user roles across the entire distribution chain. ThingsBoard delivered a clear and flexible user hierarchy aligned with the company's business model. As the main system owner (tenant), OXI TRADE has full control over all devices and user groups. Distributors operate under the tenant and manage their respective resellers, assign devices, and oversee performance in their regions. Resellers, in turn, support end customers and help them connect their devices. Customers have access only to their own equipment, while service departments are granted extended permissions to perform remote configurations, diagnostics, and technical support. This role-based model enables OXI TRADE to securely and efficiently manage thousands of devices and users from one centralized platform.",
				image: 'https://img.thingsboard.io/case-studies/oxi-map.webp',
				imageAlt: 'Virtual hierarchy',
			},
			{
				title: 'Real-time monitoring and remote control via dashboards',
				text: "Using ThingsBoard dashboards, OXI TRADE and its partners can monitor all connected pellet burners in real-time. Depending on their access level, users\u2014whether customers, resellers, or service teams\u2014can view key device data, such as operational mode, temperature, and overall system status. This insight helps users stay informed and proactive. In addition to monitoring, they can also control devices remotely. Common actions include starting or stopping a device, triggering the fuel feeder, or adjusting temperature settings. All of this can be done through the platform, without being physically present near the equipment. Remote control capabilities save time, reduce service visits, and enable quicker responses to customer needs and technical issues.",
				image: 'https://img.thingsboard.io/case-studies/pallet_3.webp',
				imageAlt: 'Hands with tablet',
			},
			{
				title: 'Proactive alert management and full system accountability',
				text: "Devices also report real-time alerts for critical issues, such as fuel shortages, overheating, sensor failures, or controller malfunctions. ThingsBoard categorizes and logs these alerts, allowing service teams to respond quickly. Alongside alert management, the platform maintains a detailed log of all user actions. This audit logging feature gives OXI TRADE full visibility into every command sent through the system\u2014such as configuration changes, operational commands, or remote updates. These logs help the company trace exactly what actions were taken, by whom, and when. If a device experiences problems, OXI TRADE can review the history to identify whether an incorrect user action or misconfiguration was the cause. This improves accountability across all user levels and simplifies troubleshooting.",
				image: 'https://img.thingsboard.io/case-studies/proactive-alert-management.webp',
				imageAlt: 'Call center',
			},
		],
	},

	fullWidthImage: {
		src: 'https://img.thingsboard.io/case-studies/burning-pellets.webp',
		alt: 'Burning pellets',
		width: 1920,
		height: 946,
	},

	help: {
		industryName: 'alternative energy management improve operations with IoT',
		blocks: [
			{
				title: 'Real-time energy monitoring',
				text: 'ThingsBoard allows seamless integration with various energy meters and IoT devices, facilitating real-time data collection on energy consumption and generation. This continuous monitoring provides immediate insights into system performance, aiding in the identification of inefficiencies and areas for improvement',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/analogue-gauge.webp', alt: 'Thingsboard analogue gauge widget', title: 'Thingsboard analogue gauge widget' },
				],
			},
			{
				title: 'Advanced data visualization',
				text: "The platform offers customizable dashboards that present complex energy data in an intuitive and user-friendly manner. Users can visualize energy usage patterns, compare performance metrics, and track key indicators over time, supporting informed decision-making and strategic planning.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'Thingsboard donut chart widget', title: 'Thingsboard donut chart widget' },
				],
			},
			{
				title: 'Automated alerts and notifications',
				text: "ThingsBoard's rule engine enables the configuration of automated alerts for specific events or thresholds, such as equipment malfunctions or energy overuse. These timely notifications allow for prompt responses to potential issues, minimizing downtime and enhancing overall system reliability.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table-2.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Flexible deployment options',
				text: 'Catering to diverse organizational needs, ThingsBoard supports both cloud-based and on-premises deployments. This flexibility ensures that companies can choose the most suitable infrastructure for their energy management solutions, whether prioritizing scalability, security, or control.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table-3.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/single-switch-widget.webp', alt: 'Thingsboard single switch widget', title: 'Thingsboard single switch widget' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"Collaboration with ThingsBoard has been a significant step forward for OXI Company in the field of IoT infrastructure. The ThingsBoard platform has greatly simplified the process of connecting, managing, and monitoring our pellet burners. Thanks to ThingsBoard, we not only gained the ability to respond promptly to technical issues but also provided our partners and end-users with a convenient and reliable tool for managing the equipment. Overall, we are fully satisfied with the results of working with the ThingsBoard team, as our collaboration has allowed us to achieve the desired outcomes. We truly value the responsiveness and high quality of communication at every stage of our partnership."',
		author: 'Vyacheslav Shashkov',
		role: 'Chief executive officer',
		company: 'OXI TRADE',
		photo: 'https://img.thingsboard.io/case-studies/Vyacheslav-Shashkov.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/oxi.svg',
		companyLogoAlt: 'OXI Trade logo',
		companyLogoWidth: 153,
		companyLogoHeight: 56,
	},
};
