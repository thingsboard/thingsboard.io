import type { UseCaseData } from './types';

export const data: UseCaseData = {
	title: 'Health care: smart assisted living solution',
	pageTitle: 'IoT Healthcare Monitoring & Smart Assisted Living with ThingsBoard',
	description:
		'Real-time healthcare and assisted living on ThingsBoard. Track patient vitals, environment, and equipment status through unified dashboards and alarms.',
	pageSlug: 'health-care',
	about: {
		shortText:
			'ThingsBoard is an IoT platform with all the tools needed to build a comprehensive healthcare monitoring and management solution with ease. ThingsBoard provides an extensive range of built-in features as well as flexible customization options.',
		longText: [
			'Healthcare monitoring systems are designed to track patient health metrics in real time and immediately notify medical professionals of critical changes. ThingsBoard, as a robust IoT platform, provides all the necessary tools for collecting, processing, and visualizing data from devices that use protocols like BLE or LoRaWAN gateways, enabling seamless integration and support for flexible solutions.',
			"Our smart assisted living solution powered by ThingsBoard provides real-time monitoring and management of residents' health in assisted living facilities. Using ThingsBoard’s powerful IoT capabilities, this solution integrates connected devices, data analytics, and automated alerts to create a seamless experience for caregivers and administrators, ensuring timely responses and a higher quality of care.",
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
		title: 'Solution structure',
		shortText:
			'The solution is designed to be used with BLE (Bluetooth Low Energy) or LoRaWAN gateways and devices. The rooms may be equipped with a number of sensors like room temperature, humidity, indoor air quality (IAQ), leak, smoke, and open/close detectors.',
		longText: [
			"The geopositioning of the resident is done via the beacon in the wristband and a set of nearby gateways. The platform deduplicates the incoming message from the beacon and enriches it with the attributes of the nearby gateways. The geopositioning algorithm is relatively simple and based on the payload's RSSI parameter. One may improve the algorithm based on the particular use case.",
		],
		schemeSrc: '/src/assets/schemas/health-care.svg',
		schemeAlt: 'Health care solution structure',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	benefits: {
		title: 'Smart assisted living benefits',
		subtitle:
			'The smart assisted living solution offers a range of benefits for care providers, residents, and facility administrators, supporting safe and efficient management of assisted living facilities:',
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
		title: 'Dashboard structure',
		subtitle:
			'The smart assisted living dashboard enables caregivers and administrators to monitor residents’ health data and environmental conditions in real-time, with intuitive interfaces and easily configurable alarm systems.',
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
		title: 'Applications of health care solution',
		subtitle:
			'The smart assisted living solution can be adapted to a wide range of environments where health monitoring, safety, and environmental control are critical.',
		applications: [
			{
				title: 'Hospitals and healthcare facilities',
				description:
					"Real-time monitoring of patients' conditions, tracking vital signs, managing wards and departments, and setting up alerts for timely response by medical staff to any health deterioration.",
				desktopImage: '/src/assets/images/usecases/health-care/hospital-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/hospital-2.svg',
				imageAlt: 'Hospital',
				imageTitle: 'Hospitals and healthcare facilities',
			},
			{
				title: 'Rehabilitation centers',
				description:
					'Monitoring the condition of patients undergoing rehabilitation after surgery or injuries. The system can track recovery progress, transmit data to doctors, and set reminders for physical therapy.',
				desktopImage: '/src/assets/images/usecases/health-care/sport-complex-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/sport-complex-2.svg',
				imageAlt: 'Rehabilitation center',
				imageTitle: 'Rehabilitation centers',
			},
			{
				title: 'Prisons and correctional facilities',
				description:
					'Monitoring the health of inmates with vital sign tracking, smoke detectors, and access control systems. The system can also monitor movements and support facility security.',
				desktopImage: '/src/assets/images/usecases/health-care/rehabilitation-center-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/rehabilitation-center-2.svg',
				imageAlt: 'Correctional facility',
				imageTitle: 'Prisons and correctional facilities',
			},
			{
				title: 'Sports complexes and fitness centers',
				description:
					"Maintaining optimal conditions in gyms and locker rooms, monitoring the health of visitors (e.g., heart rate), and setting up emergency alerts if someone's health deteriorates during workouts.",
				desktopImage: '/src/assets/images/usecases/health-care/factories-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/factories-2.svg',
				imageAlt: 'Sports complex',
				imageTitle: 'Sports complexes and fitness centers',
			},
			{
				title: 'Factories and industrial sites',
				description:
					'Ensuring employee safety by monitoring working conditions (temperature, gas emissions, noise, humidity) and controlling equipment status to respond promptly to emergency situations.',
				desktopImage: '/src/assets/images/usecases/health-care/prison-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/prison-2.svg',
				imageAlt: 'Factory',
				imageTitle: 'Factories and industrial sites',
			},
		],
	},
	summary: {
		title: 'Summary of health care solution',
		text: 'This smart assisted living solution on ThingsBoard provides a comprehensive approach to resident and facility management, with robust monitoring capabilities, intuitive zoning and device management, and customizable alerts for both health and environmental conditions. The solution empowers caregivers and administrators to respond quickly, keep environments safe, and provide the highest standard of care for residents.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
