import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Securing Critical Communication with ThingsBoard | TJK-Solutions',
	pageTitle: 'Securing Critical Communication — TJK-Solutions',
	description:
		'TJK-Solutions uses ThingsBoard to monitor a Meshtastic-based emergency communication network with visibility and reliability even offline.',
	pageSlug: 'tjk-solutions',
	breadcrumb: 'TJK-Solutions — Disaster and Civil Protection',
	categories: ['Smart city'],

	hero: {
		category: 'DISASTER AND CIVIL PROTECTION',
		heading:
			'Securing Critical Communication: How TJK-Solutions Uses ThingsBoard to Monitor Meshtastic Infrastructure in Disaster Response',
		paragraphs: [
			'TJK-Solutions is a German IoT and environmental technology company specializing in smart monitoring solutions for water management, weather observation, and critical infrastructure. Beyond these areas, the company is also deeply involved in projects related to IoT, LoRaWAN, and Smart Village / Smart City development, helping municipalities and organizations implement scalable, connected systems for digital transformation.',
			'Driven by the need for resilient and self-sufficient communication systems, TJK-Solutions develops and operates self-managed IoT platforms that remain fully functional even when public infrastructure fails.',
			'As part of a large-scale disaster management exercise conducted in the municipality of Am Mellensee (Brandenburg, Germany), TJK-Solutions deployed a Meshtastic-based emergency communication network to test how decentralized systems can ensure reliable information flow under crisis conditions. To maintain full visibility of this critical infrastructure, the company implemented ThingsBoard Professional Edition (PE) on local servers \u2014 enabling continuous real-time monitoring of nodes, routers, and connections essential for emergency coordination and disaster response.',
		],
		logo: 'https://img.thingsboard.io/case-studies/tjk-solutions.svg',
		logoAlt: 'TJK-solutions logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/tjk-solutions.webp',
	},

	statistics: [
		{ value: 33, label: 'Meshtastic devices deployed' },
		{ value: 10, label: 'autonomous sub-networks across Am Mellensee' },
		{ value: 104, decimal: { value: 4 }, label: 'km\u00B2 coverage area' },
	],

	problem: {
		description:
			'TJK-Solutions needed a reliable and self-hosted platform to monitor the status of its Meshtastic-based emergency communication network. There was no existing tool capable of providing a real-time overview, device health checks, and alerts \u2014 especially one that could operate fully offline and remain independent from public infrastructure.',
		challenges: [
			'A centralized, always-available overview of all Meshtastic devices.',
			'Continuous monitoring of battery voltage and connectivity for SenseCAP P1 Solar Routers.',
			'Historical data trends and visual analytics to detect weak nodes.',
			'Push notifications for outages or anomalies.',
			'With 33 active Meshtastic devices covering 104.4 km\u00B2 and serving 7 224 residents, manual monitoring was no longer feasible.',
		],
		results: [
			'ThingsBoard PE provided a single real-time view of all 33 Meshtastic devices across 10 districts and 104.4 km\u00B2, replacing manual supervision with automated control.',
			'Continuous monitoring of battery voltage, connectivity, and signal strength ensures reliable communication even during outages.',
			'Historical telemetry in ThingsBoard helps detect weak nodes early, enabling proactive maintenance and higher network reliability.',
			'The Rule Engine sends instant notifications on device failures or voltage drops, ensuring rapid response to critical issues.',
			'Local deployment of ThingsBoard PE keeps all monitoring operational during blackouts, securing data availability in crisis conditions.',
		],
	},

	power: {
		companyName: 'TJK-Solutions',
		blocks: [
			{
				title: 'MQTT integration',
				text: 'The Meshtastic telemetry data (voltage, signal strength, hops, uptime, etc.) is transmitted to ThingsBoard via a dedicated MQTT broker.',
				image: 'https://img.thingsboard.io/case-studies/tjk-solutions-1.webp',
				imageAlt: 'Seamless integration with industrial equipment',
			},
			{
				title: 'Data converter & uplink automation',
				text: "ThingsBoard's integration engine automatically creates and configures new devices as soon as they transmit data. Attributes such as device type, label, and location are assigned dynamically.",
				image: 'https://img.thingsboard.io/case-studies/tjk-solutions-2.webp',
				imageAlt: 'Wireless data transmission enabled by ThingsBoard and LoRaWAN',
			},
			{
				title: 'Dashboard visualization',
				text: 'A custom dashboard provides a real-time overview, including total, online, and offline nodes; an interactive map showing live status; and a data table for telemetry such as battery voltage, RSSI, and hop distance.',
				image: 'https://img.thingsboard.io/case-studies/tjk-solutions-3.webp',
				imageAlt: 'Advanced data aggregation and digital twin vsualization',
			},
			{
				title: 'Offline-resilient architecture',
				text: 'By running ThingsBoard PE on local servers, TJK-Solutions ensures full operation even during blackouts. This guarantees data security, autonomy, and consistent monitoring for critical infrastructure.',
				image: 'https://img.thingsboard.io/case-studies/tjk-solutions-4.webp',
				imageAlt: 'Real-time performance monitoring',
			},
		],
	},

	help: {
		industryName: 'civil protection improve operations with IoT',
		blocks: [
			{
				title: 'Integration & data converters',
				text: 'Enabled seamless ingestion of Meshtastic data into ThingsBoard, eliminating the need for external scripts or manual configuration.<br/><br/>How It Works:',
				listItems: [
					'Use converters to parse JSON, Base64, binary or hex payloads.',
					'Connect external systems through integrations',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
				],
			},
			{
				title: 'Dashboarding & visualization',
				text: 'Allowed clear and intuitive presentation of real-time and historical data across the distributed emergency network.<br/><br/>How It Works:',
				listItems: [
					'Visualize GPS coordinates, movement, and deployment zones with dynamic maps.',
					'Use Timeseries charts for historical analysis of critical signals (battery voltage, sensor triggers).',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/battery-level.webp', alt: 'Thingsboard battery level widget', title: 'Thingsboard battery level widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
			{
				title: 'Rule engine & notifications',
				text: 'Used for automated alerts and push notifications in case of device failure or voltage drop.<br/><br/>How It Works:',
				listItems: [
					'Monitor telemetry such as low voltage or sensor anomalies.',
					'Trigger notifications through SMS, email and more.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Local deployment & security',
				text: "The self-managed PE setup ensures that all monitoring remains operational and confidential within the municipality's protected environment.<br/><br/>How It Works:",
				listItems: [
					'Support for TLS, RBAC, and OAuth2 for SSO and fine-grained access control.',
					'Set up HA clusters, regular backups, and custom firewall rules for disaster readiness.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/network-status.webp', alt: 'Thingsboard network status widget', title: 'Thingsboard network status widget' },
					{ src: 'https://img.thingsboard.io/case-studies/signal-strength-hop-count.webp', alt: 'Thingsboard signal strength widget', title: 'Thingsboard signal strength widget' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"Thanks to ThingsBoard, we can continuously monitor our entire Meshtastic emergency network \u2014 even when the public internet or power grid fails. It gives us the transparency and confidence we need in crisis situations."',
		author: 'Tom Jonas Kr\u00FCger',
		role: 'Founder & CEO of TJK-Solutions',
		company: 'TJK-Solutions',
		photo: 'https://img.thingsboard.io/case-studies/tom-jonas-kr\u00FCger.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/tjk-solutions.svg',
		companyLogoAlt: 'TJK-solutions logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
