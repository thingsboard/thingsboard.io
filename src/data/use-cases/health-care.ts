import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Health care: smart assisted living solution',
	pageTitle: 'IoT Healthcare & Assisted Living',
	description:
		'Track patient vitals, room conditions, and equipment status in real time. Alert caregivers about critical changes and explore the live demo.',
	pageSlug: 'health-care',
	cta: {
		title: 'Launch your assisted living solution faster',
		text:
			'Install the Assisted living template with resident tracking and room monitoring, or ask our team to build a healthcare solution around your devices.',
		button: {
			label: 'Get the solution template',
			href: '/iot-hub/solution-templates/assisted-living/',
		},
	},
	about: {
		shortText:
			'IoT in healthcare helps caregivers notice problems sooner. In assisted living, ThingsBoard tracks residents’ health and location through BLE or LoRaWAN wristbands, monitors room conditions such as temperature, air quality, leaks, and smoke, and alerts staff when something needs attention.',
		longText: [
			'Each resident has a profile with personal alarm thresholds, and staff see alarms on a floor plan with the resident’s last known location. Rooms, zones, and devices are managed from the same dashboard.',
			'In hospitals, <a href="/case-studies/ariot/">ARIOT</a> digitized cold chain monitoring at Medline Adana Hospital, and <a href="/case-studies/onedata/">OneData</a> connected hundreds of hospital devices with ThingsBoard.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/f8e77210-8fa8-11ef-90c1-0b39f28da380?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_HealthCare_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/solutions/health-care/health-care-1.webp',
				alt: 'Assisted living dashboard with opened floor plan and residents alarms',
				title: 'Assisted living dashboard with opened floor plan and residents alarms',
				width: 1661,
				height: 877,
			},
			{
				src: '/src/assets/images/solutions/health-care/health-care-2.webp',
				alt: 'Assisted living dashboard with opened resident details',
				title: 'Assisted living dashboard with opened resident details',
				width: 1661,
				height: 877,
			},
			{
				src: '/src/assets/images/solutions/health-care/health-care-3.webp',
				alt: 'Assisted living dashboard with opened zone sensors configuration',
				title: 'Assisted living dashboard with opened zone sensors configuration',
				width: 1661,
				height: 877,
			},
		],
	},
	solutionStructure: {
		title: 'How smart assisted living works',
		shortText:
			'The solution works with BLE (Bluetooth Low Energy) or LoRaWAN wristbands, room sensors, and gateways. Rooms can have sensors for temperature, humidity, indoor air quality, leaks, smoke, and doors, and other devices can connect directly over MQTT, HTTP, or CoAP.',
		longText: [
			"The geopositioning of the resident is done via the beacon in the wristband and a set of nearby gateways. The platform deduplicates the incoming message from the beacon and enriches it with the attributes of the nearby gateways. The geopositioning algorithm is relatively simple and based on the payload's RSSI parameter. One may improve the algorithm based on the particular use case.",
		],
		schemeSrc: '/src/assets/schemas/health-care.svg',
		schemeAlt: 'Health care solution structure',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	benefits: {
		title: 'Benefits of smart assisted living',
		subtitle:
			'What care providers, residents, and administrators get from the solution.',
		benefits: [
			{
				title: 'Efficient monitoring and response',
				description:
					'Enables real-time tracking of residents’ health and environmental conditions, allowing caregivers to respond promptly to emergencies.',
			},
			{
				title: 'Automated alerts and notifications',
				description:
					'Configurable alerts ensure that caregivers and family members are notified of potential health risks, reducing the likelihood of delayed responses.',
			},
			{
				title: 'Personalized care plans',
				description:
					"Customizable alert rules and comprehensive health profiles allow facilities to tailor care based on individual residents' needs, enhancing the quality of care.",
			},
			{
				title: 'Increased safety and comfort',
				description:
					'Environmental monitoring maintains optimal room conditions, minimizing risks associated with temperature or noise fluctuations.',
			},
			{
				title: 'Data-driven insights',
				description:
					'Collects historical health data for each resident, allowing for trend analysis and proactive management of chronic conditions.',
			},
			{
				title: 'Streamlined administration',
				description:
					'A centralized dashboard and intuitive UI simplify the management of resident profiles, health alerts, and facility zones, saving time and reducing administrative burden.',
			},
		],
	},
	dashboardStructure: {
		title: 'Assisted living dashboard',
		subtitle:
			'Caregivers and administrators see residents’ health data and room conditions in real time and configure alarms for each resident and room.',
		panels: [
			{
				title: 'Resident overview',
				description:
					"Provides a detailed profile for each resident, including health metrics such as heart rate, body temperature, and panic button status, allowing caregivers to quickly assess each resident's current health condition.",
				image: '/src/assets/images/usecases/health-care/resident-overview.webp',
				imageAlt: 'Resident overview dashboard with health status and location tracking',
			},
			{
				title: 'Resident alarm configuration',
				description:
					'Allows administrators to set customized alarm rules for resident health parameters like heart rate and body temperature. Major and critical thresholds can be configured to trigger appropriate alerts in case of abnormalities.',
				image: '/src/assets/images/usecases/health-care/resident-alarm.webp',
				imageAlt: 'Resident alarm history with severity levels and timestamps',
			},
			{
				title: 'Real-time resident alarms',
				description:
					"Displays active alarms for residents, such as panic button presses or irregular vital signs, with real-time updates on each alert's status and severity, enabling quick response by caregivers.",
				image: '/src/assets/images/usecases/health-care/real-time-resident-alarm.webp',
				imageAlt: 'Real-time alarm notification for resident health events',
			},
			{
				title: 'Room alarm configuration',
				description:
					'Provides settings to adjust alarm thresholds for environmental factors in rooms, such as temperature, humidity, air quality, and window or door status. This ensures rooms remain within safe and comfortable conditions for residents.',
				image: '/src/assets/images/usecases/health-care/room-alarm-configuration.webp',
				imageAlt: 'Room alarm threshold configuration interface',
			},
			{
				title: 'Resident list management',
				description:
					'Lists all residents with essential information such as age, gender, assigned room, and floor, allowing caregivers to locate and access each resident’s data efficiently.',
				image: '/src/assets/images/usecases/health-care/resident-list-management.webp',
				imageAlt: 'Resident list with profiles and room assignments',
			},
			{
				title: 'Zone and floor management',
				description:
					'Enables administrators to organize the facility into zones or floors, allowing for easy navigation and monitoring of different areas within the facility.',
				image: '/src/assets/images/usecases/health-care/zone-and-floor-management.webp',
				imageAlt: 'Facility zone and floor management overview',
			},
			{
				title: 'Room and device layout',
				description:
					'Shows the layout of each floor with room labels and device icons, allowing caregivers and administrators to identify the location of sensors and devices quickly for effective monitoring.',
				image: '/src/assets/images/usecases/health-care/room-and-device-layout.webp',
				imageAlt: 'Interactive room layout with sensor and device placement',
			},
			{
				title: 'Device addition',
				description:
					'Allows the addition of new devices like sensors or gateways to specific rooms, supporting scalability and enabling administrators to expand monitoring capabilities as needed.',
				image: '/src/assets/images/usecases/health-care/device-addition.webp',
				imageAlt: 'Device provisioning and registration interface',
			},
			{
				title: 'Room configuration',
				description:
					'Provides a tool to edit room details and positions within the facility layout, enabling accurate mapping and customization of room assignments.',
				image: '/src/assets/images/usecases/health-care/room-configuration.webp',
				imageAlt: 'Room configuration panel with sensor assignments and thresholds',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/f8e77210-8fa8-11ef-90c1-0b39f28da380?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_HealthCare_ViewLiveDemo',
		contactUsId: 'UseCases_HealthCare_ContactUs',
	},
	applications: {
		title: 'Where healthcare IoT is used',
		subtitle:
			'The solution fits any setting where health monitoring, safety, and room conditions matter, from hospitals to senior living.',
		applications: [
			{
				title: 'Hospitals and healthcare facilities',
				description:
					"Real-time monitoring of patients' conditions, tracking vital signs, managing wards and departments, and setting up alerts for timely response by medical staff to any health deterioration.",
				desktopImage: '/src/assets/images/usecases/health-care/hospital-1.svg',
				imageAlt: 'Hospital',
				imageTitle: 'Hospitals and healthcare facilities',
			},
			{
				title: 'Rehabilitation centers',
				description:
					'Monitoring the condition of patients undergoing rehabilitation after surgery or injuries. The system can track recovery progress, transmit data to doctors, and set reminders for physical therapy.',
				desktopImage: '/src/assets/images/usecases/health-care/sport-complex-1.svg',
				imageAlt: 'Rehabilitation center',
				imageTitle: 'Rehabilitation centers',
			},
			{
				title: 'Prisons and correctional facilities',
				description:
					'Monitoring the health of inmates with vital sign tracking, smoke detectors, and access control systems. The system can also monitor movements and support facility security.',
				desktopImage: '/src/assets/images/usecases/health-care/rehabilitation-center-1.svg',
				imageAlt: 'Correctional facility',
				imageTitle: 'Prisons and correctional facilities',
			},
			{
				title: 'Sports complexes and fitness centers',
				description:
					"Maintaining optimal conditions in gyms and locker rooms, monitoring the health of visitors (e.g., heart rate), and setting up emergency alerts if someone's health deteriorates during workouts.",
				desktopImage: '/src/assets/images/usecases/health-care/factories-1.svg',
				imageAlt: 'Sports complex',
				imageTitle: 'Sports complexes and fitness centers',
			},
			{
				title: 'Factories and industrial sites',
				description:
					'Ensuring employee safety by monitoring working conditions (temperature, gas emissions, noise, humidity) and controlling equipment status to respond promptly to emergency situations.',
				desktopImage: '/src/assets/images/usecases/health-care/prison-1.svg',
				imageAlt: 'Factory',
				imageTitle: 'Factories and industrial sites',
			},
		],
	},
	advantages: {
		title: 'Why ThingsBoard for healthcare IoT',
		cards: [
			{
				icon: 'tabler:chart-bar',
				color: 'red',
				title: 'Resident and room monitoring',
				description:
					'Track residents’ health and location through BLE or LoRaWAN wristbands, and see room alarms on a floor plan.',
				href: '/iot-hub/solution-templates/assisted-living/',
				linkText: 'See the Assisted living template',
			},
			{
				icon: 'tabler:circuit-bulb',
				color: 'green',
				title: 'Alerts that reach the right caregivers',
				description:
					'Route each alarm to the right staff by email, SMS, or the mobile app, with personal thresholds for every resident.',
				href: '/docs/pe/user-guide/rule-engine/',
				linkText: 'Learn more about data processing',
			},
			{
				icon: 'tabler:wifi',
				color: 'red',
				title: 'BLE and LoRaWAN devices',
				description:
					'Connect wristbands, room sensors, and gateways over BLE or LoRaWAN, with LoRaWAN devices coming in through network server integrations.',
				href: '/docs/pe/user-guide/integrations/',
				linkText: 'Learn more about integrations',
			},
			{
				icon: 'tabler:shield',
				color: 'blue',
				title: 'Healthcare data protection',
				description:
					'Encrypted connections, role-based access control, and audit logs protect resident data. ThingsBoard holds ISO 27001 certification.',
				href: '/trust-center/',
				linkText: 'Visit the Trust Center',
			},
		],
	},
	faq: [
		{
			id: 'health-care-faq',
			label: 'FAQ',
			items: [
				{
					id: 'how-is-iot-used-in-healthcare',
					question: 'How is IoT used in healthcare?',
					answer:
						'<p>Common uses include monitoring residents in assisted living, tracking room conditions, keeping medicines and samples within temperature limits, and tracking equipment. In each case, ThingsBoard collects device data, raises alarms, and notifies the right staff. At Medline Adana Hospital, for example, <a href="/case-studies/ariot/">ARIOT</a> uses ThingsBoard for cold chain monitoring.</p>',
					defaultOpen: true,
				},
				{
					id: 'can-one-alert-reach-several-people',
					question: 'Can one alert reach several people or departments?',
					answer:
						'<p>Yes. Notification rules send an alarm to several recipient groups at once and can escalate it if nobody responds.</p>',
				},
				{
					id: 'can-i-get-an-alert-when',
					question: 'Can I get an alert when a device goes offline?',
					answer:
						'<p>Yes. ThingsBoard tracks each device’s activity and can raise an alarm or send a notification when a device stops reporting.</p>',
				},
				{
					id: 'which-devices-does-the-assisted-living',
					question: 'Which devices does the assisted living solution use?',
					answer:
						'<p>Residents wear BLE or LoRaWAN wristbands with a beacon, and rooms have sensors for temperature, humidity, indoor air quality, leaks, smoke, and doors. Nearby gateways forward the data, and ThingsBoard uses it to estimate each resident’s location. You can try it with the <a href="/iot-hub/solution-templates/assisted-living/">Assisted living template</a>.</p>',
				},
				{
					id: 'how-is-resident-data-protected',
					question: 'How is resident data protected?',
					answer:
						'<p>Data travels over encrypted connections, role-based access control limits who sees what, and audit logs record every change. ThingsBoard holds ISO 27001 certification. Details are in the <a href="/trust-center/">Trust Center</a>.</p>',
				},
			],
		},
	],
	summary: {
		title: 'Healthcare IoT with ThingsBoard in short',
		text: 'This smart assisted living solution on ThingsBoard provides a comprehensive approach to resident and facility management, with robust monitoring capabilities, intuitive zoning and device management, and customizable alerts for both health and environmental conditions. The solution empowers caregivers and administrators to respond quickly, keep environments safe, and provide the highest standard of care for residents.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
