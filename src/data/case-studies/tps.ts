import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Cultural IoT - TPS Powers Museums with ThingsBoard',
	pageTitle: 'Cultural IoT — TPS Powers Museums',
	description:
		'Discover how TPS uses ThingsBoard to connect sensors across museums and deliver smart analytics for cultural site management.',
	pageSlug: 'tps',
	breadcrumb: 'TPS — Smart Infrastructure',
	categories: ['Smart infrastructure'],

	hero: {
		category: 'SMART INFRASTRUCTURE',
		heading: 'Digitalizing cultural heritage: how TPS connects museums with ThingsBoard',
		paragraphs: [
			'TOURISTIC PLATFORM SYSTEMS SRL (TPS) is an Italian company specializing in the development of integrated and innovative digital systems for cultural heritage. TPS creates cutting-edge platforms and services that focus on enhancing the experience of visitors to museums, exhibitions, and historic sites. By combining cultural value with modern technology, TPS builds advanced tools that connect heritage institutions with their audiences.',
			'The company\u2019s mission is to make cultural sites more accessible, interactive, and sustainable using IoT, big data, and smart analytics. TPS helps administrators and curators gain valuable insights while delivering a richer, more personalized experience for visitors.',
		],
		logo: 'https://img.thingsboard.io/case-studies/tps.svg',
		logoAlt: 'TPS logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/tps.webp',
	},

	statistics: [
		{ value: 7, label: 'years old company' },
		{ value: 43, suffix: '%', label: 'employee growth' },
		{ value: 3, label: 'funded projects in progress' },
	],

	quote: {
		text: 'We are very satisfied with the functionality of the IoT platform. The numerous dashboards available and the flexibility of the product allow us to develop our project dedicated to Cultural Heritage. Through the platform, we have managed to put all the sensors in the Museums in communication in order to deliver a powerful data collection and analysis tool to be deliver...',
		author: 'Antonio Chianese, CTO at TPS',
	},

	problem: {
		description:
			'TPS aimed to create a unified IoT platform that could connect and manage all sensors installed across various museums. The goal was to provide cultural site administrators with centralized access to real-time data on environmental conditions and visitor behavior \u2014 essential for both conservation and operational efficiency.',
		challenges: [
			'Integrating heterogeneous sensors across different museum infrastructures',
			'Building a scalable system for centralized monitoring and data collection',
			'Ensuring the flexibility and reliability of the IoT platform',
			'Delivering customized dashboards for multiple user types (administrators, researchers, technical staff)',
		],
		results: [
			'Successful deployment of a unified IoT ecosystem for museum environments',
			'Custom dashboards tailored for different stakeholders',
			'Real-time analytics and insights on environmental and operational metrics',
			'Empowered museum administrators with a powerful decision-making tool',
		],
	},

	power: {
		companyName: 'TPS',
		blocks: [
			{
				title: 'Centralized sensor data collection',
				text: 'TPS used ThingsBoard to integrate all museum sensors into one scalable IoT platform. Thanks to support for multiple protocols (MQTT, REST API), compatibility with existing hardware was seamless.',
				image: 'https://img.thingsboard.io/case-studies/tps-1.webp',
				imageAlt: 'Centralized sensor data collection',
			},
			{
				title: 'Customizable dashboards',
				text: 'ThingsBoard\u2019s powerful dashboard engine enabled TPS to build user-specific interfaces for museum administrators, technical teams, and researchers \u2014 improving data clarity and accessibility.',
				image: 'https://img.thingsboard.io/case-studies/tps-2.webp',
				imageAlt: 'Customizable dashboards',
			},
			{
				title: 'Real-time analytics and alerts',
				text: 'Using ThingsBoard\u2019s Rule Engine, TPS configured real-time alerts, event triggers, and processing logic. This ensured museum staff could react instantly to changes in environmental conditions like temperature and humidity.',
				image: 'https://img.thingsboard.io/case-studies/tps-3.webp',
				imageAlt: 'Real-time analytics and alerts',
			},
			{
				title: 'Scalable deployment across multiple sites',
				text: 'With ThingsBoard, TPS scaled their solution from a single museum to an entire network of cultural sites \u2014 maintaining performance and visibility across the entire infrastructure.',
				image: 'https://img.thingsboard.io/case-studies/tps-4.webp',
				imageAlt: 'Scalable deployment across multiple sites',
			},
		],
	},

	help: {
		industryName: 'smart infrastructure improve operations with IoT',
		blocks: [
			{
				title: 'Centralized monitoring for diverse assets',
				text: 'Whether managing utility systems, building equipment, security devices, or exhibit environments, ThingsBoard consolidates all data into unified dashboards for real-time visibility and management.',
				listItems: [
					'Integrate devices and sensors for HVAC, lighting, environmental monitoring, and security.',
					'Display all operational data in a single, customizable dashboard.',
					'Enable real-time alerts, analytics, and status monitoring across assets and locations.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
				],
			},
			{
				title: 'Predictive maintenance & system health',
				text: 'From HVAC systems in galleries to lift mechanisms or pumps in utility tunnels, infrastructure components require timely servicing. ThingsBoard enables data-based maintenance planning to prevent downtime.',
				listItems: [
					'Monitor equipment status in real time via sensors.',
					'Detect abnormal behavior (temperature rise, increased vibration) before failures.',
					'Automate alerts and schedule preventive service actions.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Smart energy use & resource efficiency',
				text: 'For both public and private infrastructure, energy and utility costs are significant. ThingsBoard helps track, analyze, and optimize lighting, climate control, and electricity usage across facilities.',
				listItems: [
					'Connect smart meters, lighting controllers, HVAC systems.',
					'Analyze energy use by building, time, or function.',
					'Automate energy-saving scenarios based on occupancy or schedule.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/donut-widget.webp', alt: 'Thingsboard donut chart widget', title: 'Thingsboard donut chart widget' },
					{ src: 'https://img.thingsboard.io/case-studies/bar-chart.webp', alt: 'Thingsboard bar chart widget', title: 'Thingsboard bar chart widget' },
				],
			},
			{
				title: 'Environmental monitoring & indoor comfort',
				text: 'In exhibition spaces, lecture halls, offices, and public areas, maintaining a safe and pleasant indoor climate is essential. ThingsBoard ensures air quality, temperature, and humidity are continuously tracked and optimized.',
				listItems: [
					'Collect real-time data on CO\u2082, PM2.5, humidity, and temperature.',
					'Trigger alerts and automation when values exceed safe levels.',
					'Enable comfort optimization by zone, floor, or time of day.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/indoor-environment.webp', alt: 'Thingsboard indoor environment widget', title: 'Thingsboard indoor environment widget' },
					{ src: 'https://img.thingsboard.io/case-studies/indoor-range-chart.webp', alt: 'Thingsboard indoor range chart widget', title: 'Thingsboard indoor range chart widget' },
				],
			},
			{
				title: 'Safety, access & incident response',
				text: 'Infrastructure often requires controlled access and rapid response to incidents. ThingsBoard allows real-time security monitoring with custom alerts, camera feeds, and automation.',
				listItems: [
					'Connect access control systems, cameras, and motion sensors.',
					'Detect unauthorized entry or abnormal activity.',
					'Automate alerts, logs, or on-site reactions.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table-2.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/power_button.webp', alt: 'Thingsboard power button widget', title: 'Thingsboard power button widget' },
				],
			},
			{
				title: 'Automation & control of daily operations',
				text: 'Reduce human error and operational load by automating repetitive or time-sensitive processes\u2014like lighting schedules, ventilation logic, or system reactions to sensor data.',
				listItems: [
					'Build logic using a visual rule editor.',
					'Define automated responses to triggers (e.g., open vent if CO\u2082 > 1000 ppm).',
					'Allow manual override via dashboards when needed.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/single-switch-widget.webp', alt: 'Thingsboard single switch widget', title: 'Thingsboard single switch widget' },
					{ src: 'https://img.thingsboard.io/case-studies/scheduler-events.webp', alt: 'Thingsboard scheduler events widget', title: 'Thingsboard scheduler events widget' },
				],
			},
		],
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/tps.svg',
		companyLogoAlt: 'TPS logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
