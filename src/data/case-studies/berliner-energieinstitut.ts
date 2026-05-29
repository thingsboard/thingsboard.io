import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Berliner Energieinstitut Modernizes Energy IoT with ThingsBoard',
	pageTitle: 'Berliner Energieinstitut Modernizes Energy IoT',
	description:
		"Learn how Berliner Energieinstitut launched a fully custom energy IoT solution in weeks using ThingsBoard's open-source platform and rapid development support.",
	pageSlug: 'berliner-energieinstitut',
	breadcrumb: 'Berliner Energieinstitut — Smart Energy',
	categories: ['Smart energy'],

	hero: {
		category: 'SMART ENERGY',
		heading: 'From idea to IoT in weeks: how Berliner Energieinstitut scaled fast with ThingsBoard',
		paragraphs: [
			'Berliner Energieinstitut GmbH is a consulting and research institute based in Berlin, Germany, focused on developing sustainable and energy-efficient solutions for businesses, municipalities, and public institutions. Their core competencies lie in energy management, renewable energy integration, and strategic planning for energy transitions. Through a combination of practical implementation and theoretical research, the institute supports clients in aligning with Germany\u2019s ambitious energy transformation goals.',
		],
		logo: 'https://img.thingsboard.io/case-studies/berliner-energieinstitut.svg',
		logoAlt: 'Berliner Energieinstitut logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/berliner-energieinstitut.webp',
	},

	authoredQuote: {
		text: '"We were struggling trying to implement our own IOT infrastructure when ThingsBoard suddenly appeared. Immediately we started testing and were amazed with the feature completeness, stability and ease of use of this great platform, although it was only in version 1.0 and had been released just days prior. Our business needed some spec..."',
		author: 'David Eitzinger',
		role: 'Managing Director',
		company: 'Berliner Energieinstitut GmbH',
		photo: 'https://img.thingsboard.io/case-studies/david-eitzinger.webp',
	},

	problem: {
		description:
			'Berliner Energieinstitut GmbH had a hard time building their own IoT system to support their smart energy projects. Here were the main problems:',
		challenges: [
			'Hard to Build a Reliable System: They struggled to create an IoT platform that was strong, stable, and could grow with their needs.',
			"Missing the Right Tools: Other platforms they tried didn't have all the features they needed, were not stable, or were difficult to use.",
			'Needed Custom Features: Their project required: \n - Special tools on the user interface (frontend) \n - Big changes on the system\'s internal part (backend)',
			'Limited Time: They needed to launch the solution quickly, so time was very important.',
		],
		results: [
			'Started Quickly: They began testing ThingsBoard right away, even though it was a brand-new platform (version 1.0).',
			'High Satisfaction with Platform Capabilities: They were surprised by how complete, stable, and easy to use ThingsBoard was.',
			'Fast Custom Development: All needed custom features were added within a few weeks.',
			"Trust in Open Source Strength: With decades of OSS experience, the team acknowledged ThingsBoard's exceptional development speed and quality among OSS tools.",
		],
	},

	power: {
		companyName: 'Berliner Energieinstitut GmbH',
		blocks: [
			{
				title: 'ThingsBoard discovered at a critical moment',
				text: "At the time, Berliner Energieinstitut GmbH was experiencing significant challenges in setting up a reliable and scalable IoT infrastructure. The in-house implementation attempts were proving to be complex and resource-intensive. That's when ThingsBoard entered the picture - almost by chance. The platform had just been released as version 1.0, and despite its early stage, it immediately caught their attention.",
				image: 'https://img.thingsboard.io/case-studies/berliner-energieinstitut-1.webp',
				imageAlt: 'ThingsBoard discovered at a critical moment',
			},
			{
				title: 'Early testing showed striking results',
				text: "Testing began right away, and the results were striking. The team was amazed by the platform's completeness in terms of features, its stability, and its overall ease of use - all of which stood out even more given how newly it had been launched.",
				image: 'https://img.thingsboard.io/case-studies/berliner-energieinstitut-2.webp',
				imageAlt: 'Early testing showed striking results',
			},
			{
				title: 'Custom features delivered with speed and precision',
				text: 'Berliner Energieinstitut required several specific customisations: tailored frontend components and extensive modifications to the backend. After only a few email exchanges with the ThingsBoard team, it became clear that the platform offered exactly what was needed. The required functionality was not just theoretically possible but was actually implemented in a matter of weeks.',
				image: 'https://img.thingsboard.io/case-studies/berliner-energieinstitut-3.webp',
				imageAlt: 'Custom features delivered with speed and precision',
			},
			{
				title: 'Enterprise quality and open source flexibility combined',
				text: "The quality of the implementation exceeded all expectations. The team at Berliner Energieinstitut, found themselves deeply impressed, not just by the platform's architecture but by the responsiveness, speed, and professional execution delivered by the ThingsBoard team. The combination of open-source flexibility with enterprise-grade support and delivery made ThingsBoard a clear and lasting choice.",
				image: 'https://img.thingsboard.io/case-studies/berliner-energieinstitut-4.webp',
				imageAlt: 'Enterprise quality and open source flexibility combined',
			},
		],
	},

	help: {
		industryName: 'smart energy improve operations with IoT',
		blocks: [
			{
				title: 'One platform for all energy devices',
				text: 'ThingsBoard makes it much easier for smart energy companies to manage their operations. Instead of juggling different systems for different types of devices, companies can connect everything into one platform. ThingsBoard supports all the major communication protocols - like MQTT, CoAP, HTTP, LwM2M, SNMP, Modbus, and OPC-UA - which means it can easily work with a wide range of energy devices without any extra hassle.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table-4.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hp-scada-energy.webp', alt: 'Thingsboard HP SCADA energy widgets', title: 'Thingsboard HP SCADA energy widgets' },
				],
			},
			{
				title: 'Real-time insights with zero effort',
				text: 'With ThingsBoard, companies can collect real-time data from their devices and display it on customizable dashboards. This makes it easy to monitor energy usage, device status, and system performance at any time. The platform includes a powerful Rule Engine that can automatically detect problems, send alarms, and trigger actions without human intervention.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/line-chart.webp', alt: 'Thingsboard line chart widget', title: 'Thingsboard line chart widget' },
				],
			},
			{
				title: 'Reliable offline with Edge and OTA',
				text: 'With ThingsBoard, companies can collect real-time data from their devices and display it on customizable dashboards. This makes it easy to monitor energy usage, device status, and system performance at any time. The platform includes a powerful Rule Engine that can automatically detect problems, send alarms, and trigger actions without human intervention.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/single-switch-widget.webp', alt: 'Thingsboard single switch widget', title: 'Thingsboard single switch widget' },
					{ src: 'https://img.thingsboard.io/case-studies/power_button.webp', alt: 'Thingsboard power button widget', title: 'Thingsboard power button widget' },
				],
			},
			{
				title: 'Organized assets and built-in security',
				text: 'Companies can also organise their devices, sites, and customers clearly with asset hierarchies and groupings. Strong security features - like role-based access control, encrypted data transfer, and detailed audit logs - help protect sensitive information and meet regulatory requirements.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
				],
			},
			{
				title: 'Analytics that drive efficiency',
				text: 'On top of that, ThingsBoard provides powerful data analytics tools, allowing companies to store historical data, track performance trends, and generate reports. This helps identify ways to improve efficiency, detect issues early, and make better decisions based on real data.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'Thingsboard donut chart widget', title: 'Thingsboard donut chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'Thingsboard bar chart widget', title: 'Thingsboard bar chart widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/berliner-energieinstitut.svg',
		companyLogoAlt: 'Berliner Energieinstitut logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
