import type { CaseStudyData } from './types';

export const data: CaseStudyData = {
	title: 'Smart Healthcare - 100% Cold Chain Digitization at Medline Adana',
	pageTitle: 'Smart Healthcare - 100% Cold Chain Digitization at Medline Adana',
	description:
		'How Medline Adana moved from manual checks to a single pane of glass — role-based dashboards, a rule engine, SMS/email alerts, and an audit trail.',
	pageSlug: 'ariot',
	breadcrumb: 'Medline Adana Hospital — Healthcare',
	categories: ['Cold chain monitoring'],

	hero: {
		category: 'HEALTHCARE',
		heading:
			'Smart Healthcare: How Medline Adana Hospital ensured patient safety and JCI compliance with ARIOT IOT TEKNOLOJILERI and ThingsBoard',
		paragraphs: [
			'Medline Adana Hospital is a premier healthcare facility in Turkey, serving patients from the Middle East, Africa, and Europe since 2009. Operating a 28 000 m\u00B2 facility with a 231-bed capacity (including 32 adult and 26 neonatal intensive care units), the hospital is accredited by the Joint Commission International (JCI). To maintain these rigorous international quality standards and ensure maximum patient safety, the hospital management partnered with ARIOT IOT TEKNOLOJILERI to deploy an end-to-end "Smart Hospital Operation Platform.',
			'ARIOT is a leading system integrator specializing in critical infrastructure monitoring. By combining robust hardware with the flexibility of ThingsBoard, ARIOT provides reliable, scalable digital transformation solutions for the healthcare, energy, and industrial sectors.',
		],
		logo: 'https://img.thingsboard.io/case-studies/ariot.svg',
		logoAlt: 'Ariot IOT Teknolojileri  logo',
		logoWidth: 126,
		logoHeight: 56,
		backgroundImage: 'https://img.thingsboard.io/case-studies/ariot.webp',
	},

	statistics: [
		{ value: 28, suffix: 'K\u00A0m\u00B2', label: 'facility coverage' },
		{ value: 100, suffix: '%', label: 'digitalization of cold chain' },
		{ value: 231, label: 'bed capacity (JCI accredited)' },
	],

	problem: {
		description:
			'Prior to adopting the IoT solution, the hospital relied on manual processes that posed significant operational risks. Staff had to manually log temperatures for vaccine fridges, blood banks, and morgue units, creating a risk of human error and data gaps. Furthermore, the hospital\'s large concrete structure made traditional wired cabling expensive and invasive.',
		challenges: [
			'Manual monitoring risks: Dependency on manual logging created risks of human error in critical areas like blood banks and morgues.',
			'Compliance difficulties: Preparing historical data reports for ISO and JCI audits was time-consuming and lacked granular accuracy.',
			'Infrastructure constraints: Thick concrete walls made wired cabling solutions invasive and costly.',
			'Delayed response: Critical failures (e.g., transformer overheating) often went unnoticed until expensive damage occurred.',
		],
		results: [
			'100% Digitalization: Eliminated paper-based tracking, significantly reducing staff workload.',
			'JCI & ISO compliance: Automated reporting ensures all cold-chain data meets international regulatory standards.',
			'Zero data loss: Implemented "Store and Forward" technology to prevent data loss during network outages.',
			'Proactive safety: Reduced spoilage of expensive medications through real-time SMS and Email alerts.',
		],
	},

	power: {
		companyName: 'Medline Adana Hospital',
		blocks: [
			{
				title: 'Centralized critical infrastructure monitoring',
				text: 'ARIOT utilized ThingsBoard to create role-based dashboards for different hospital units including the Pharmacy, Laboratory, and Morgue. The Morgue Dashboard provides real-time visibility into the temperature of individual cabinets, replacing manual charts with digital trends. Similarly, the Laboratory Dashboard offers instant status updates on blood banks and depot fridges on a single pane of glass.',
				image: 'https://img.thingsboard.io/case-studies/ariot-1.webp',
				imageAlt: 'Centralized critical infrastructure monitoring',
			},
			{
				title: 'Advanced rule engine for real-time alarms',
				text: "The solution leverages ThingsBoard's Rule Engine to monitor specific thresholds for critical assets. If a TS201 probe inside a vaccine cabinet detects a temperature deviation, or if an EM300-TH sensor in a transformer room detects overheating, the system triggers immediate alerts to the technical team via SMS and Email.",
				image: 'https://img.thingsboard.io/case-studies/ariot-2.webp',
				imageAlt: 'Advanced rule engine for real-time alarms',
			},
			{
				title: 'Data integrity with "Store and Forward"',
				text: 'Data gaps are unacceptable in healthcare. ThingsBoard processes telemetry from Milesight sensors which feature "Data Retransmission." If the hospital network goes down, sensors like the EM300 series store up to 1000+ records internally. Once connectivity is restored, ThingsBoard ingests this historical data to fill the gaps, guaranteeing a complete audit trail.',
				image: 'https://img.thingsboard.io/case-studies/ariot-3.webp',
				imageAlt: 'Data integrity with Store and Forward',
			},
			{
				title: 'Scalable architecture for future expansion (Phase 2)',
				text: 'Using ThingsBoard\'s scalable infrastructure, ARIOT is planning Phase 2 to transform the system into a holistic "Smart Hospital Command Center." This includes integrating AI-based Patient Fall Detection (video analysis), Nurse Call Systems (performance reporting), and Asset Tracking for medical equipment.',
				image: 'https://img.thingsboard.io/case-studies/ariot-4.webp',
				imageAlt: 'Scalable architecture for future expansion (Phase 2)',
			},
		],
	},

	customerQuote: {
		text: '"ARIOT transformed our JCI compliance from a manual burden into a digital asset. By deploying the ThingsBoard platform with Milesight LoRaWAN sensors, we eliminated human error and secured 100% data integrity for our critical cold chain. This solution gives us total visibility and immediate alerts, ensuring patient safety is never compromised."',
		author: 'Duran ICTEN',
		role: 'Medline Adana Hospital IT Chief',
		photo: 'https://img.thingsboard.io/case-studies/duran-icten.webp',
	},

	help: {
		industryName: 'civil protection improve operations with IoT',
		blocks: [
			{
				title: 'Rule engine & automation',
				text: 'ThingsBoard\'s Rule Engine handles complex alarm logic for scenarios such as "high temperature", "door left open\u201D, and "connection loss\u201D, ensuring immediate action is taken before assets are compromised.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/alarms-table.webp', alt: 'Thingsboard alarms table widget', title: 'Thingsboard alarms table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/notification-widget.webp', alt: 'Thingsboard notification widget', title: 'Thingsboard notification widget' },
				],
			},
			{
				title: 'Custom dashboard',
				text: 'The platform enables the creation of custom widgets, including Heat Maps and real-time status indicators displayed on wallboards in nursing stations, providing staff with at-a-glance situational awareness.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/maps-widgets.webp', alt: 'Thingsboard maps widgets widget', title: 'Thingsboard maps widgets widget' },
					{ src: 'https://img.thingsboard.io/case-studies/value-card.webp', alt: 'Thingsboard value card widget', title: 'Thingsboard value card widget' },
				],
			},
			{
				title: 'Data reliability',
				text: 'The system ensures seamless handling of delayed telemetry through retransmission protocols. This capability is critical for maintaining the continuous data records required for JCI and ISO certifications.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/entities-table.webp', alt: 'Thingsboard entities table widget', title: 'Thingsboard entities table widget' },
					{ src: 'https://img.thingsboard.io/case-studies/time-series-chart.webp', alt: 'Thingsboard time series chart widget', title: 'Thingsboard time series chart widget' },
				],
			},
			{
				title: 'Role-based access control',
				text: 'ThingsBoard allows for distinct views and permissions for different user groups, ensuring technical staff, doctors, and hospital administrators only see the data and controls relevant to their specific roles.',
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/hierarchy-widget.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
					{ src: 'https://img.thingsboard.io/case-studies/roles-table.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
				],
			},
			{
				title: 'Solution components',
				text: '<b>Software</b>: ThingsBoard IoT Platform<br/><b>Connectivity</b>: LoRaWAN\u00AE (868 MHz)<br/><b>Hardware</b>:',
				listItems: [
					'Milesight UG65: Indoor coverage.',
					'Milesight UG63 Gateway: Chosen for deep indoor penetration in concrete.',
					'Milesight EM300-TH: For ambient temperature/humidity monitoring.',
					'Milesight TS201: High-precision contact temperature monitoring for vaccines.',
				],
				images: [
					{ src: 'https://img.thingsboard.io/case-studies/milesight-1.webp', alt: 'Thingsboard hierarchy widget', title: 'Thingsboard hierarchy widget' },
					{ src: 'https://img.thingsboard.io/case-studies/milesight-2.webp', alt: 'Thingsboard roles table widget', title: 'Thingsboard roles table widget' },
				],
			},
		],
	},

	authoredQuote: {
		text: '"At ARIOT, our mission with Medline Adana Hospital was to elevate their operational reliability to match their world-class JCI accreditation. By leveraging the flexibility of ThingsBoard combined with robust LoRaWAN infrastructure, we transformed their critical environmental monitoring from a reactive, manual process into a proactive, data-driven operation. This solution provided immediate value by ensuring 100% data integrity for compliance audits and eliminating the risk of high-value pharmaceutical spoilage through real-time alerting. Ultimately, we didn\'t just install sensors; we delivered peace of mind and a scalable digital backbone that secures patient safety and optimizes hospital efficiency around the clock."',
		author: 'Rifat \u015Eeker',
		role: 'Founder',
		company: 'Ariot IOT Teknolojileri',
		photo: 'https://img.thingsboard.io/case-studies/rifat-seker.webp',
	},

	contact: {
		companyLogo: 'https://img.thingsboard.io/case-studies/ariot.svg',
		companyLogoAlt: 'Ariot IOT Teknolojileri  logo',
		companyLogoWidth: 126,
		companyLogoHeight: 56,
	},
};
