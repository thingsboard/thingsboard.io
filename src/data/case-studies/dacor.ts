import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Real-Time Monitoring for Automotive Supplier | s\u00FCc//dacor + ThingsBoard',
	pageTitle: 'Real-Time Monitoring for Automotive Supplier — s\u00FCc//dacor',
	description:
		'An automotive parts manufacturer uses ThingsBoard and LoRaWAN to collect real-time machine data, visualize production with digital twins, and cut downtime.',
	pageSlug: 'dacor',
	breadcrumb: 'süc//dacor GmbH — Industry 4.0',
	categories: ['Industry 4.0'],

	hero: {
		category: 'INDUSTRY 4.0',
		heading: 'Real-Time production monitoring for automotive supplier by s\u00FCc//dacor GmbH using ThingsBoard',
		paragraphs: [
			's\u00FCc//dacor GmbH is more than a regional internet provider \u2014 it is a forward-thinking technology partner for businesses navigating the digital era. Headquartered in Coburg, Germany, the company combines over 25 years of experience in telecommunications with a strong focus on IoT, smart infrastructure, and digital services. s\u00FCc//dacor is a leading force in deploying LoRaWAN networks and intelligent solutions, helping enterprises shift from traditional automation to real-time, data-driven operations.',
			'The company offers end-to-end IoT implementation \u2014 from device integration and data acquisition to visualization through platforms like ThingsBoard. Their solutions have already proven effective in industrial monitoring, smart energy, and infrastructure projects. With a unique blend of technical expertise and business-driven thinking, s\u00FCc//dacor empowers its clients to increase efficiency, reduce operational costs, and accelerate their journey toward digital transformation.',
		],
		logo: 'https://img.thingsboard.io/case-studies/dacor.svg',
		logoAlt: 's\u00FCc//dacor GmbH logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/dacor.webp',
	},

	statistics: [
		{ value: 20, label: 'LoRaWAN gateways in our regional public network' },
		{ value: 5, suffix: '+', label: 'in the field of IoT with LoRaWAN' },
		{ value: 150, label: 'sensor types tested in our in-house lab' },
	],

	problem: {
		description:
			'The client needed greater transparency across their production floor to monitor machine activity, minimize unplanned downtime, and improve operational performance.',
		challenges: [
			'Lack of real-time production data transmission',
			'Limited visibility into equipment downtime and productivity',
			'No visual interface for equipment status monitoring',
			'Inability to quickly detect underperforming machines',
		],
		results: [
			'Reliable data collection from production machines',
			'Real-time visualization through ThingsBoard dashboards',
			'Instant performance feedback with intuitive color indicators',
			'Improved decision-making and operational transparency',
		],
	},

	power: {
		companyName: 's\u00FCc//dacor GmbH',
		blocks: [
			{
				title: 'Seamless integration with industrial equipment',
				text: "ThingsBoard's open architecture and support for standard industrial protocols enabled smooth integration with the customer's production line. In this project, a software trigger was embedded into each machine's control program to capture the milling motor's power status, which was then collected via a ThingsBoard-compatible IoT module \u2014 ensuring reliable data acquisition at the source.",
				image: 'https://img.thingsboard.io/case-studies/dacor-1.webp',
				imageAlt: 'Seamless integration with industrial equipment',
			},
			{
				title: 'Wireless data transmission enabled by ThingsBoard and LoRaWAN',
				text: "Thanks to ThingsBoard's native support for LoRaWAN networks, s\u00FCc//dacor was able to establish a robust and low-power wireless data transmission layer. This eliminated the need for wired infrastructure and made it possible to collect real-time machine data even in complex industrial environments.",
				image: 'https://img.thingsboard.io/case-studies/dacor-2.webp',
				imageAlt: 'Wireless data transmission enabled by ThingsBoard and LoRaWAN',
			},
			{
				title: 'Advanced data aggregation and digital twin visualization',
				text: "All collected data is aggregated and visualized using ThingsBoard's powerful dashboard engine. The dashboards display a digital twin of the manufacturing facility, accurately reflecting the position and configuration of each machine \u2014 including setups with dual milling heads \u2014 along with their real-time operational status.",
				image: 'https://img.thingsboard.io/case-studies/dacor-3.webp',
				imageAlt: 'Advanced data aggregation and digital twin vsualization',
			},
			{
				title: 'Real-time performance monitoring',
				text: "ThingsBoard's customizable dashboards allow s\u00FCc//dacor GmbH to provide each customer with a personalized view of their IoT ecosystem\u2014essential when supporting municipalities, enterprises, and service providers.",
				image: 'https://img.thingsboard.io/case-studies/dacor-4.webp',
				imageAlt: 'Real-time performance monitoring',
			},
			{
				title: 'Operational transparency and control',
				text: 'ThingsBoard provides an intuitive web interface that gives plant management instant access to key machine performance data \u2014 without the need for external tools or complex configurations. This level of visibility drives operational transparency, reduces downtime, and supports informed, data-driven decision-making.',
				image: 'https://img.thingsboard.io/case-studies/dacor-5.webp',
				imageAlt: 'Operational transparency and control',
			},
			{
				title: 'Increasing productivity with retrofit devices',
				text: 'Watch Andreas K\u00FCcker, Manager Digital at s\u00FCc//dacor GmbH, share insights from his conference presentation on how retrofit IoT solutions transformed their manufacturing processes and increased operational efficiency.<br><br><a target="_blank" href="https://www.youtube.com/watch?v=qxQHQtXjfEg" rel="noopener noreferrer">Watch conference presentation</a>',
				image: 'https://img.thingsboard.io/case-studies/dacor-6.webp',
				imageAlt: 'Increasing productivity with retrofit devices',
			},
		],
	},

	help: {
		industryName: 'industry 4.0 improve operations with IoT',
		blocks: [
			{
				title: 'Real-Time telemetry & dashboards',
				text: 'ThingsBoard enables real-time collection, visualization, and analysis of telemetry data from our LoRaWAN sensors and IoT modules. With fully customizable dashboards, we can monitor live sensor readings such as temperature, humidity, fill levels, or switching states. Deviations or critical values are highlighted immediately, allowing fast responses and situational awareness.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/analogue-gauge.webp', alt: 'Thingsboard analogue gauge widget', title: 'Thingsboard analogue gauge widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
			{
				title: 'Device management at scale',
				text: 'The platform offers powerful tools for registering, provisioning, and managing a wide range of IoT devices. In our case, this applies to diverse and individualized customer installations. ThingsBoard gives us centralized visibility and control of LoRaWAN-connected sensors\u2014whether deployed at a single site or distributed across multiple locations. Features like remote monitoring and customer-specific device assignments help us manage installations efficiently and reliably.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/count-widgets.webp', alt: 'Thingsboard count widgets', title: 'Thingsboard count widgets' },
				],
			},
			{
				title: 'Advanced rule engine for automation',
				text: 'ThingsBoard includes a highly capable rule engine, which we actively use to automate data workflows. We rely on it to aggregate raw sensor data and calculate key performance metrics such as uptime, utilization, or operational KPIs. This allows complex processes\u2014like tracking run-times or generating daily consumption summaries\u2014to be fully automated and displayed in dashboards or reports. Most logic is built using the visual rule chain editor, reducing the need for manual coding.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Asset & entity management',
				text: 'Our LoRaWAN sensors are logically organized into device groups in ThingsBoard to maintain a clear and manageable structure. These groups are typically based on location, customer site, or application type. This organization makes it easier to aggregate performance data, analyze trends, and present targeted information. Grouping simplifies dashboarding and reporting while improving overall clarity and data interpretation.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/asisted-living-widget.webp', alt: 'Thingsboard asisted living widget', title: 'Thingsboard asisted living widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
				],
			},
			{
				title: 'Role-based access control (RBAC)',
				text: "Rather than using detailed role-based permissions, we take advantage of ThingsBoard's public dashboard links to provide real-time access to key operational views. For example, a production overview dashboard is displayed on a central control room screen, continuously showing current machine states without requiring login credentials. This approach has proven extremely effective in offering staff a quick, up-to-date overview of production activity at a glance.",
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"Our client had a need for greater transparency in their manufacturing process, especially regarding downtime and productivity tracking."',
		author: 'Andreas K\u00FCcker',
		role: 'Manager Digital',
		company: 's\u00FCc//dacor GmbH',
		photo: 'https://img.thingsboard.io/case-studies/andreas-k\u00FCcker.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/dacor.svg',
		companyLogoAlt: 's\u00FCc//dacor GmbH logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
