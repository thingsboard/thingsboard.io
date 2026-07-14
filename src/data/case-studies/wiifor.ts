import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Driving Innovation: Spreading the Potential of ThingsBoard in IoT | Wiifor',
	pageTitle: 'Driving Innovation: Spreading the Potential of IoT — Wiifor',
	description:
		'Wiifor delivers IoT solutions for buildings, healthcare, smart cities, and industry on ThingsBoard — from device connectivity to resilient Edge and mobile apps.',
	pageSlug: 'wiifor',
	breadcrumb: 'Wiifor — Smart IoT Solutions',
	categories: ['Smart IoT solution'],

	hero: {
		category: 'SMART IOT SOLUTIONS',
		heading: 'Driving Innovation: Spreading the Potential of ThingsBoard in IoT',
		paragraphs: [
			'Wiifor is a French technology company founded in 2018, driven by a passion for innovation and connected systems. We design, integrate, and deliver end-to-end IoT solutions that transform how organizations operate and grow.',
			'We create smart solutions for the building, healthcare, smart cities, and industrial sectors, mastering the entire IoT value chain: from sensor integration and connectivity management to the tailored development of the ThingsBoard IoT platform. Every solution is carefully adapted to the unique challenges and requirements of each client and industry.',
			'Our mission is to combine IoT expertise with bespoke, scalable solutions that empower our clients with greater security, full traceability, and measurable gains in performance and cost efficiency.',
		],
		logo: '/images/case-studies/wiifor-logo.png',
		logoAlt: 'Wiifor logo',
		logoWidth: 129,
		logoHeight: 56,
		backgroundImage: '/images/case-studies/wiifor.webp',
	},

	statistics: [
		{ value: 9, suffix: 'K+', label: 'connected devices in the last two years' },
		{ value: 500, suffix: '+', label: 'sites deployed in the last two years' },
		{ value: 30, suffix: '+', label: 'services designed for every need' },
	],

	quote: {
		text: 'Thanks to the customized dashboards, we were able to gain objective insights into usage patterns, engage fire stations based on concrete data, and measure the impact of the actions implemented.',
		author: 'Raphaël Trujillo',
		role: 'SDIS 38 — Energy Manager — ACTEE',
	},

	problem: {
		description:
			'At Wiifor, we operate across a wide range of industries and customer environments, each with its own operational priorities, technical constraints, and legacy systems. Our clients benefit from different deployment models adapted to their needs: SaaS for business users with operational challenges, PaaS for integrators and service providers, and on-premise deployments for large enterprises with specific infrastructure and security requirements. Our challenge is to consistently deliver a unified and scalable IoT platform that can address this variety while maintaining operational efficiency, reliability, and security.<br/><br/>As we integrate increasingly complex ecosystems, we connect heterogeneous devices and protocols while ensuring that data across all environments remains consistent, actionable, and easy to manage. Without a flexible and extensible platform, this level of complexity would quickly lead to fragmented architectures and increased integration efforts.',
		challenges: [
			'Integrating a constantly changing mix of devices, protocols, connectivity providers, and third-party systems across different customer environments.',
			'Maintaining a unified and consistent view of operations across distributed systems, devices, and customer environments.',
			'Securing distributed IoT infrastructures against unauthorized access, vulnerabilities, and integration risks across multiple environments.',
			'Growing regulatory and audit requirements across multiple sectors.',
		],
		results: [
			'Ability to integrate any device or system seamlessly, reducing integration friction and onboarding time across customer environments.',
			'Real-time unified operational visibility across all assets and environments, enabling faster and more informed decision-making.',
			'Secure and controlled IoT operations with reduced risk of unauthorized access and data exposure across all deployments.',
			'Built-in traceability and audit-ready data across all connected environments.',
		],
	},

	power: {
		companyName: 'Wiifor',
		blocks: [
			{
				title: 'Universal device connectivity for heterogeneous IoT environments',
				text: 'Each of our projects has specific business requirements and technical constraints. They often involve many types of sensors, gateways, and communication networks, including private/public LoRaWAN networks (ChirpStack, LiveObjects, Netmore, Actility…) or other third-party systems, but also various protocols such as MQTT, CoAP, HTTP, FTP…<br/><br/>ThingsBoard enables Wiifor to integrate almost any type of sensor or connected device through native transports, platform integrations, and the ThingsBoard IoT Gateway, extending connectivity to devices using local and industrial protocols. This flexibility allows clients to avoid managing multiple disconnected platforms for different device families or connectivity providers.',
				image: '/images/case-studies/wiifor-1.webp',
				imageAlt: 'Universal device connectivity for heterogeneous IoT environments',
			},
			{
				title: 'A multi-service platform for multiple business use cases and topologies',
				text: 'Thanks to ThingsBoard’s advanced RBAC capabilities, Wiifor provides each client, user, or site with controlled access to the right services, dashboards, entities, and data. The platform enables the centralization of business services while supporting administration, management, and supervision capabilities through the IoT management tools developed by Wiifor.<br/><br/>Beyond business applications, Wiifor extends the platform with operational services such as LNS supervision integration and an installer dashboard designed to simplify deployment and configuration tasks for field technicians without requiring advanced IoT expertise. Clients can subscribe only to the services they need while benefiting from a single secure entry point, unified authentication, and SSO integration, creating a unified digital environment where services and IoT operations can coexist securely and efficiently.',
				image: '/images/case-studies/wiifor-2.webp',
				imageAlt: 'A multi-service platform for multiple business use cases and topologies',
			},
			{
				title: 'An integrated Edge solution for resilient IoT deployments',
				text: 'Some Wiifor clients operate in environments where connectivity cannot always be guaranteed. This is especially critical for healthcare facilities, senior residences, connected hotels, and remote sites such as overseas territories, where network interruptions can directly affect service continuity and data quality.<br/><br/>ThingsBoard Edge allows Wiifor to deploy resilient local IoT systems that continue operating even when the connection to the central platform is temporarily unavailable. Data can still be collected, processed, visualized, and synchronized once connectivity is restored. This is particularly valuable for use cases such as HVAC control in healthcare buildings, connected hotel operations, or nurse call systems in senior facilities, where the system must remain functional even during network outages.',
				image: '/images/case-studies/wiifor-3.webp',
				imageAlt: 'An integrated Edge solution for resilient IoT deployments',
			},
			{
				title: 'Ready-to-use mobile applications for customer services',
				text: 'Wiifor clients can also benefit from dedicated mobile applications connected to their ThingsBoard-based services. These applications can be customized for each project or customer environment, providing a branded and user-friendly mobile experience without the need for a full custom mobile development project.<br/><br/>The ThingsBoard PE Mobile Application makes it possible to deliver cross-platform applications for both Android and iOS, with customized navigation, access to dashboards, device data, alarms, and mobile push notifications. For Wiifor clients, this means faster deployment of mobile services, easier access to operational information in the field, and real-time notifications when important events or alarms occur.',
				image: '/images/case-studies/wiifor-4.webp',
				imageAlt: 'Ready-to-use mobile applications for customer services',
			},
		],
	},

	customerQuote: {
		text: 'The richness of their open-source IoT platform (ThingsBoard), together with their ability to develop IoT electronic systems and custom web applications, were key factors in our decision to select Wiifor as our partner for this project.',
		author: 'Philippe Junca',
		role: 'Co-founder & CEO, IoTOPICS',
	},

	fullWidthImage: {
		src: '/images/case-studies/wiifor-full.webp',
		alt: 'Global IoT connectivity powered by Wiifor and ThingsBoard',
	},

	help: {
		industryName: 'building and healthcare operators optimize operations with IoT',
		blocks: [
			{
				title: 'Automated alarms & real-time notifications',
				text: 'ThingsBoard’s alerting system ensures that critical events are detected and communicated in real time. In refrigerated pharmaceutical transport, it allows teams to react immediately to temperature deviations that could compromise product quality. This reduces risks and ensures compliance.',
				listItems: [
					'Configure alerts for temperature thresholds and anomalies.',
					'Notify teams instantly via email, SMS, or push notifications.',
					'Prevent product loss and ensure regulatory compliance.',
				],
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
			{
				title: 'Device & asset management (centralized IoT control)',
				text: 'ThingsBoard centralizes all devices and assets into a single platform, providing full visibility over equipment and status. This is especially valuable for asset tracking, where industries need to monitor equipment across multiple locations. It simplifies operations and ensures better coordination and traceability.',
				listItems: [
					'Track indoor and outdoor assets in real time.',
					'Manage device lifecycle, location, and maintenance history.',
					'Improve visibility and control over distributed equipment.',
				],
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/entities-table.webp',
						alt: 'ThingsBoard entities table widget',
						title: 'ThingsBoard entities table widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp',
						alt: 'ThingsBoard maps widget',
						title: 'ThingsBoard maps widget',
					},
				],
			},
			{
				title: 'Data visualization & custom dashboards',
				text: 'ThingsBoard enables real-time data visualization through intuitive dashboards, making complex data easy to understand. In energy management, teams can monitor consumption and optimize performance across buildings. This supports faster and more informed decision-making.',
				listItems: [
					'Visualize energy consumption and KPIs in real time.',
					'Identify trends and optimization opportunities.',
					'Generate reports to improve energy efficiency strategies.',
				],
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp',
						alt: 'ThingsBoard time series chart widget',
						title: 'ThingsBoard time series chart widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/digital_gauges.webp',
						alt: 'ThingsBoard digital gauges widgets',
						title: 'ThingsBoard digital gauges widgets',
					},
				],
			},
			{
				title: 'Edge computing with ThingsBoard Edge',
				text: 'ThingsBoard Edge processes data locally, ensuring continuous operation even in low-connectivity environments. This is particularly useful for predictive maintenance of equipment, where real-time data processing is critical to detect issues early. It improves responsiveness and system reliability.',
				listItems: [
					'Process data locally for faster anomaly detection.',
					'Operate without constant cloud connectivity.',
					'Maintain system reliability in industrial environments.',
				],
				images: [
					{
						src: 'https://img.thingsboard.io/case-studies/entities-table-3.webp',
						alt: 'ThingsBoard entities table widget',
						title: 'ThingsBoard entities table widget',
					},
					{
						src: 'https://img.thingsboard.io/case-studies/network-status.webp',
						alt: 'ThingsBoard network status widget',
						title: 'ThingsBoard network status widget',
					},
				],
			},
		],
	},

	authoredQuote: {
		text: '"Since my early days at Wiifor, I have been working with ThingsBoard, and choosing this platform to develop our IoT offerings has proven to be the right decision.<br/><br/>ThingsBoard stands out from other IoT platforms on the market thanks to its open-source approach, which is a key differentiator, as well as its ability to support virtually any type of sensor, connectivity protocol, data processing logic, use case, and customer topology.<br/><br/>Its software architecture has been designed in a broad, flexible, and generic way, making it possible to address a wide variety of IoT ecosystems and to adapt quickly to the constant changes shaping the IoT landscape.<br/><br/>Thanks to ThingsBoard, we are able to help our customers optimize their operations and costs, while improving comfort and delivering better experiences for their end users.<br/><br/>This is precisely why ThingsBoard has become a strong technology partner for Wiifor in building scalable, adaptable, and future-ready IoT solutions."',
		author: 'Elie Taillardat',
		role: 'Platform & IoT Solutions Manager, Software Engineer',
		company: 'Wiifor',
		photo: '/images/case-studies/elie-taillardat.webp',
	},

	contact: {
		companyLogo: '/images/case-studies/wiifor-logo.png',
		companyLogoAlt: 'Wiifor logo',
		companyLogoWidth: 129,
		companyLogoHeight: 56,
	},
};
