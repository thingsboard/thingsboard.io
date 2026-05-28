import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How IONA Tech Uses ThingsBoard to Improve ESD Monitoring and Workplace Safety',
	pageTitle: 'How IONA Tech Improved ESD Monitoring and Workplace Safety',
	description:
		"Discover how IONA Tech enhanced ESD monitoring by integrating ThingsBoard's IoT platform\u2014achieving real-time data visualization, seamless hardware integration, and scalable solutions for improved workplace safety and product quality.",
	pageSlug: 'iona',
	breadcrumb: 'IONA Tech — Industry 4.0',
	categories: ['Industry 4.0'],

	hero: {
		category: 'INDUSTRY 4.0',
		heading: "Protecting electronics and workers: IONA Tech's IoT transformation with ThingsBoard",
		paragraphs: [
			'The client is IONA Tech, a company that creates technology to reduce the risks of electrostatic discharge (ESD). These risks can damage electronic devices or cause safety problems in factories. Their main product, the StatIQ Band, is a wearable device that measures and alerts users about dangerous ESD levels, helping to protect workers and improve product quality. Their goal is to make workplaces safer and more efficient by using advanced technology and data.',
		],
		logo: 'https://img.thingsboard.io/case-studies/iona.svg',
		logoAlt: 'IONA Tech logo',
		logoWidth: 182,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/iona.webp',
	},

	problem: {
		description:
			'IONA Tech faced challenges in efficiently managing and visualising their Industrial IoT data. Their StatIQ Band devices, designed to monitor electrostatic discharge (ESD) conditions, required a robust solution to effectively transmit and organise telemetry data. They needed a flexible and reliable solution to address these challenges and optimize their IoT operations.',
		challenges: [
			'IONA Tech required a platform that could both collect and clearly present data from their ESD monitoring devices.',
			'The solution needed to be flexible enough to adapt to their specific technical requirements.',
			'Seamless integration with their existing hardware infrastructure was essential.',
			'Presenting ESD data in a clear, user-friendly format for their customers was a key priority.',
			"They also needed the ability to extend the platform's functionality as their needs evolved.",
		],
		results: [
			'IONA Tech selected the ThingsBoard suite for its flexibility, rich functionality, and ease of use in presenting Industrial IoT data.',
			'The platform integrated smoothly with their distributed hardware used for monitoring electrostatic discharge (ESD) in manufacturing environments.',
			'Comprehensive documentation enabled the team to quickly implement and configure the system with minimal setup time.',
			'To meet specific operational needs, IONA Tech collaborated with the ThingsBoard Development Unit to extend the platform\'s functionality.',
			'This partnership allowed them to adapt the system to their workflows, resulting in a tailored and scalable solution for both internal use and customer-facing services.',
		],
	},

	power: {
		companyName: 'IONA Tech',
		blocks: [
			{
				title: 'Strategic selection of ThingsBoard for IoT needs',
				text: "IONA Tech selected the ThingsBoard suite as the foundation for its Industrial IoT data presentation. The ThingsBoard platform offered the right mix of flexibility, useful features, and easy setup, which was one of the key factors in IONA Tech's decision. Their goal was to connect the platform with their hardware, which monitors electrostatic discharge (ESD) conditions in electronics manufacturing. ThingsBoard's ready-to-use tools, such as device management, real-time dashboards, and data processing, made it a good fit for their technical needs. The detailed documentation helped their team start the integration quickly and without major difficulties.",
				image: 'https://img.thingsboard.io/case-studies/strategic_selection.webp',
				imageAlt: 'Man monitoring dashboard',
			},
			{
				title: 'Custom enhancements through collaboration',
				text: "While the default capabilities of the platform met many of IONA Tech's initial needs, the team also required more specific features to match their internal processes and customer use cases. To solve this, they engaged the ThingsBoard Development Unit. Together, they extended the platform's capabilities by implementing software enhancements that aligned with IONA Tech's operational workflows and business logic.",
				image: 'https://img.thingsboard.io/case-studies/custom_enhancements.webp',
				imageAlt: 'Holographic terminal',
			},
			{
				title: 'Effective communication and quality-focused development',
				text: "Throughout the collaboration, the ThingsBoard team maintained clear and consistent communication, followed a thoughtful and responsive development approach, and showed a strong commitment to delivering a high-quality solution. Thanks to the team's technical expertise, attention to detail, and dedication to project success, the final result was a system that not only supported their ESD monitoring infrastructure but also provided a scalable solution for presenting Industrial IoT data clearly and reliably to customers.",
				image: 'https://img.thingsboard.io/case-studies/effective_communication.webp',
				imageAlt: 'Online meeteing',
			},
			{
				title: 'Successful outcome and strengthened future partnership',
				text: 'IONA Tech considered the outcome a success\u2014both in terms of technology and collaboration. Their partnership with ThingsBoard enabled them to improve operational efficiency, meet evolving requirements, and offer a better data experience to their users. The positive experience strengthened their confidence in continuing to work with the ThingsBoard team on future initiatives.',
				image: 'https://img.thingsboard.io/case-studies/successful_outcome.webp',
				imageAlt: 'Chart in smartphone',
			},
		],
	},

	fullWidthImage: {
		src: 'https://img.thingsboard.io/case-studies/male_technician_examining_broken_computer.webp',
		alt: 'Technician',
		width: 1920,
		height: 946,
	},

	help: {
		industryName: 'industry 4.0 improve operations with IoT',
		blocks: [
			{
				title: 'Real-Time Telemetry & Dashboards',
				text: 'ThingsBoard enables real-time collection, visualization, and analysis of telemetry data from ESD monitoring devices. Electronics safety teams can configure dynamic dashboards to track live ESD values, detect abnormal spikes, and immediately identify unsafe conditions.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/analogue-gauge.webp', alt: 'Thingsboard analogue gauge widget', title: 'Thingsboard analogue gauge widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
			{
				title: 'Device management at scale',
				text: 'The platform provides comprehensive tools for registering, provisioning, and managing thousands of distributed devices. For electronics safety environments, this means centralized control of sensors across multiple production zones or facilities. Features such as remote configuration, firmware updates, and device state monitoring help reduce maintenance time and improve system reliability.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/device-count-widget.webp', alt: 'Thingsboard device count widget', title: 'Thingsboard device count widget' },
				],
			},
			{
				title: 'Advanced Rule Engine for Automation',
				text: "ThingsBoard includes a powerful rule engine that allows safety engineers to define complex event-processing workflows. Businesses can automate safety responses\u2014such as triggering alarms, sending emails, or updating dashboards\u2014when ESD thresholds are exceeded or if sensor connectivity fails. Rule chains can be configured through a visual editor, reducing dependency on code.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Asset & Entity Management',
				text: 'Safety equipment and monitoring devices can be logically grouped into assets (e.g., zones, workstations, rooms), making it easier to organize and manage devices by physical or operational context. This structure simplifies tracking, alerting, and reporting at different levels of a facility.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/image-building-map.webp', alt: 'Thingsboard image building map widget', title: 'Thingsboard image building map widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
				],
			},
			{
				title: 'Role-Based Access Control (RBAC)',
				text: 'With advanced RBAC, organizations can define user roles and permissions to limit access to sensitive data and configuration controls. For example, floor operators can be given read-only access to dashboards, while engineers and admins maintain control over device settings and rule logic.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/iona.svg',
		companyLogoAlt: 'IONA Tech logo',
		companyLogoWidth: 182,
		companyLogoHeight: 56,
	},
};
