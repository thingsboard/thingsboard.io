import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Transforming Utility Data with ThingsBoard - co.met GmbH Case',
	pageTitle: 'Transforming Utility Data — co.met GmbH Case',
	description:
		"Discover how co.met GmbH modernized smart metering and LoRaWAN services using ThingsBoard's scalable IoT platform for automation and data visualization.",
	pageSlug: 'comet',
	breadcrumb: 'co.met GmbH — Smart Energy',
	categories: ['Smart energy'],

	hero: {
		category: 'SMART ENERGY',
		heading: "Powering the future of utilities: co.met GmbH's IoT breakthrough with ThingsBoard",
		paragraphs: [
			'co.met GmbH has been active in the energy industry since 2001, offering process and data services as well as proprietary IT solutions. The company operates as a meter operator and provides services to energy distribution network carriers (covering electricity, gas, water, and heat) and other meter operators. Their portfolio includes SaaS solutions for remote meter reading, field force management for meter fitters, and administration of smart meter gateways. Additionally, co.met GmbH functions as a LoRaWAN carrier for the city of Saarbr\u00FCcken and as a solution provider for LoRaWAN backend systems.',
		],
		logo: 'https://img.thingsboard.io/case-studies/comet.svg',
		logoAlt: 'co.met logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/comet.webp',
	},

	statistics: [
		{ value: 650, suffix: '+', label: 'customers across Germany' },
		{ value: 7, decimal: { value: 5, suffix: 'M+' }, label: 'metering points managed via services and SaaS solutions' },
		{ value: 20, suffix: '+', label: 'years of experience in the energy industry' },
	],

	problem: {
		description:
			'co.met GmbH encountered a variety of challenges across their diverse service areas, specifically:',
		challenges: [
			'Needed a powerful yet user-friendly platform to visualise telemetry data from meters and sensors.',
			'Required the ability to trigger automated events based on data conditions using rule chains.',
			'Sought a flexible and scalable IoT platform that could adapt to multiple use cases within smart metering and LoRaWAN services.',
			'Faced difficulties finding a solution that offered both a variety of features and ease of use.',
		],
		results: [
			'Successfully implemented easy-to-use telemetry visualisation for internal and customer-facing applications.',
			'Leveraged rule engine capabilities to automate complex workflows and event triggers.',
			'Benefited from a professional, functional, and responsive platform, praised by both their team and customers.',
			'Experienced, reliable and agile support from the ThingsBoard team, who were open to improvements and fast in delivering solutions.',
		],
	},

	power: {
		companyName: 'co.met GmbH',
		blocks: [
			{
				title: 'Trusted experts in energy services since 2001',
				text: 'co.met GmbH has been working in the energy industry since 2001, offering process and data services, along with some of their own IT solutions. As a meter operator, they support energy providers for electricity, gas, water, and heat, as well as other meter operators. Their services include cloud-based tools for reading meters remotely, managing field workers, and handling smart meter gateways. They also operate a LoRaWAN network in the city of Saarbr\u00FCcken and provide solutions for LoRaWAN backend systems.',
				image: 'https://img.thingsboard.io/case-studies/comet-1.webp',
				imageAlt: 'Trusted experts in energy services since 2001',
			},
			{
				title: 'Flexible solutions for evolving operational needs',
				text: 'In these roles, co.met deals with many different needs, from simply showing data from devices to setting up automatic actions based on that data. ThingsBoard turned out to be a powerful but easy-to-use platform that met all of these needs better than any other option they had tested. Both the co.met team and their customers liked how professional it looks, how well it works, and how fast it responds.',
				image: 'https://img.thingsboard.io/case-studies/comet-2.webp',
				imageAlt: 'Man near vehicles',
			},
			{
				title: 'A reliable and responsive technology partner',
				text: 'The ThingsBoard team has also been a reliable partner, open to feedback and quick to make improvements or provide helpful solutions when needed.',
				image: 'https://img.thingsboard.io/case-studies/comet-3.webp',
				imageAlt: 'Hands with phone',
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

	authoredQuote: {
		text: '"We\'re a meter operator and as such a service provider for energy distribution network carriers (electricity, gas, water and heat) and other meter operators. We provide SaaS-Solutions for the remote reading of meters, field force management (for meter fitters) and the administration of smart meter gateways. Additionally we\'re a LoRa WAN car..."',
		author: 'Peter Backes',
		role: 'CEO',
		company: 'co.met GmbH',
		photo: 'https://img.thingsboard.io/case-studies/peter_backes.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/comet.svg',
		companyLogoAlt: 'co.met logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
