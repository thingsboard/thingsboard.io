import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'How IBT Systems promotes research on Precision Livestock Farming with ThingsBoard',
	pageTitle: 'How IBT Systems Promotes Research on Precision Livestock Farming',
	description:
		'IBT Systems built a flexible barn monitoring ecosystem on ThingsBoard for Precision Livestock Farming research: 30+ barns, 1M+ data points per day.',
	pageSlug: 'ibt-systems',
	breadcrumb: 'IBT Systems — Precision Livestock Farming',
	categories: ['Smart agriculture'],

	hero: {
		category: 'PRECISION LIVESTOCK FARMING',
		heading: 'How IBT Systems promotes research on Precision Livestock Farming with ThingsBoard',
		paragraphs: [
			'Precision Livestock Farming is a hot topic both for farmers – from small companies to large meat groups – and public institutions such as academic research labs and experimental zooprophylactic institutes. Cooperating with several research centers, IBT Systems has developed a complete and flexible barn monitoring ecosystem, from the sensor nodes in the field to the processing and presentation of data.',
		],
		logo: '/images/case-studies/ibt-systems-logo.png',
		logoAlt: 'IBT Systems logo',
		logoWidth: 146,
		logoHeight: 61,
		backgroundImage: '/images/case-studies/ibt-systems.webp',
	},

	statistics: [
		{ value: 8, label: 'research centers' },
		{ value: 30, suffix: '+', label: 'barns monitored' },
		{ value: 1, suffix: 'M+', label: 'data points per day' },
	],

	problem: {
		description: 'Integrated, Flexible, and Cost-Effective Data Collection Remains a Barrier to Research Projects',
		challenges: [
			'Integrate data from heterogeneous sensors',
			'Provide data processing, storage and presentation within a single platform',
			'Keep costs under control',
			'Minimize development and maintenance effort',
		],
		results: [
			'Complete automation of barn monitoring',
			'Customized visualization for farmers and researchers',
			'Ease of integration with external custom processing services',
			'Seamless migration between self-managed infrastructures',
			'Several research studies enabled',
		],
	},

	power: {
		companyName: 'IBT Systems',
		heading: 'How IBT Systems supports academic research in Precision Livestock Farming?',
		blocks: [
			{
				title: 'ThingsBoard allowed very fast prototyping',
				text: 'Thanks to its intuitive and well-documented structure, ThingsBoard allowed a small team of young engineers to design and implement an eye-catching prototype of a complete dashboard in a short time, while maintaining a clear control on the service costs.',
				image: '/images/case-studies/ibt-systems-1.webp',
				imageAlt: 'ThingsBoard barn monitoring dashboard built by IBT Systems',
			},
			{
				title: 'Fast integration with IoT devices',
				text: 'The prototype was right away used to start the integration of several different types of IoT data sources. The flexibility of input gateways and the variety of supported protocols allowed us to easily adapt to the peculiar data structures needed by the in-field system.',
				image: '/images/case-studies/ibt-systems-2.webp',
				imageAlt: 'Oscilloscope used during the integration of IoT devices',
			},
			{
				title: 'Involving the end user to simplify system evolution',
				text: 'Thanks to the user-friendly interface for creating new dashboards, we were able to directly involve end users in the design process by collaborating closely with them. This allowed us to streamline and accelerate the development process and improve the satisfaction levels of the researchers involved.',
				image: '/images/case-studies/ibt-systems-3.webp',
				imageAlt: 'IBT Systems team collaborating with end users on dashboard design',
			},
			{
				title: 'Comply with regulations',
				text: 'As public institutions, Italian universities and zooprophylactic institutes must comply with various legal requirements related to both software licensing models and the geographic location of their services and data. The ease of migrating ThingsBoard applications from the cloud-based solution to a fully on-premises implementation has made it possible to easily deploy the final solution while meeting all the regulatory requirements of this specific sector.',
				image: '/images/case-studies/ibt-systems-4.webp',
				imageAlt: 'Hand presenting a compliance checkmark surrounded by legal and security icons',
			},
		],
	},

	help: {
		industryName: 'Precision Livestock Farming researchers improve operations with IoT',
		blocks: [
			{
				title: 'Protocol integration',
				text: 'The support of Protobuf simplifies the evolution of the protocol of the IoT devices, while allowing the in-field gateway to be agnostic of the message structure.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/sensors-widget.webp',
						alt: 'ThingsBoard sensors widget',
						title: 'ThingsBoard sensors widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/entities-table.webp',
						alt: 'ThingsBoard entities table widget',
						title: 'ThingsBoard entities table widget',
					},
				],
			},
			{
				title: 'Simple processing',
				text: 'The combination of powerful rule chain blocks with custom scripting allows implementing most of the typical data processing directly within ThingsBoard without the need for external data processing services.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/tables.webp',
						alt: 'ThingsBoard tables widget',
						title: 'ThingsBoard tables widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/bar-chart.webp',
						alt: 'ThingsBoard bar chart widget',
						title: 'ThingsBoard bar chart widget',
					},
				],
			},
			{
				title: 'Flexible API',
				text: 'The complete and flexible API offered by ThingsBoard allowed to feed complex external processing services implemented in several specific programming languages. Additionally, the APIs for device and asset management allowed to implement a seamless provisioning mechanism of our IoT devices through a mobile application.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/line-chart.webp',
						alt: 'ThingsBoard line chart widget',
						title: 'ThingsBoard line chart widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/entities-table-3.webp',
						alt: 'ThingsBoard entities table widget',
						title: 'ThingsBoard entities table widget',
					},
				],
			},
			{
				title: 'Alarms',
				text: 'The mechanism of alarms, their flexibility, and the possibility to actively notify the user with an email and SMS were especially appreciated.',
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/alarms-table.webp',
						alt: 'ThingsBoard alarms table widget',
						title: 'ThingsBoard alarms table widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/notification-widget.webp',
						alt: 'ThingsBoard notification widget',
						title: 'ThingsBoard notification widget',
					},
				],
			},
		],
	},

	contact: {
		companyLogo: '/images/case-studies/ibt-systems-logo.png',
		companyLogoAlt: 'IBT Systems logo',
		companyLogoWidth: 146,
		companyLogoHeight: 61,
	},
};
