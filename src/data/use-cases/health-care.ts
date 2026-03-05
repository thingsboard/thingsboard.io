import type { UseCaseData } from './types';

export const healthCareData: UseCaseData = {
	title: 'Health care: smart assisted living solution',
	pageTitle: 'Health Care',
	description: 'Health monitoring',
	pageSlug: 'health-care',
	about: {
		shortText:
			'ThingsBoard is an IoT platform with all the tools needed to build a comprehensive healthcare monitoring and management solution with ease. ThingsBoard provides an extensive range of built-in features as well as flexible customization options.',
		longText: [
			'The ThingsBoard IoT platform offers powerful capabilities for healthcare environments, including real-time device monitoring, configurable alarm rules, role-based access control, and rich dashboard visualizations. These features enable healthcare providers to track patient vitals, environmental conditions, and equipment status from a single unified interface.',
			'The smart assisted living solution demonstrates how ThingsBoard can be deployed in residential care facilities to monitor residents, manage rooms and zones, and automate alerts for caregivers. By combining BLE beacons, environmental sensors, and intelligent rule chains, the platform delivers a complete ecosystem for improving resident safety, comfort, and quality of care.',
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
		title: 'Solution structure of health care use case',
		shortText:
			'The solution is designed to be used with BLE (Bluetooth Low Energy) or LoRaWAN gateways and devices. The rooms may be equipped with a number of sensors like room temperature, humidity, indoor air quality (IAQ), leak, smoke, and open/close detectors.',
		longText: [
			"The geopositioning of the resident is done via the beacon in the wristband and a set of nearby gateways. The platform deduplicates the incoming message from the beacon and enriches it with the attributes of the nearby gateways. The geopositioning algorithm is relatively simple and based on the payload's RSSI parameter. One may improve the algorithm based on the particular use case.",
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	benefits: {
		title: 'Health care benefits',
		benefits: [
			{
				title: 'Efficient monitoring and response',
				description:
					"Enables real-time tracking of residents' health and environmental conditions, allowing caregivers to respond promptly to emergencies.",
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
		title: 'Dashboard structure of health care solution',
		subtitle:
			'The live dashboard demonstrates a comprehensive healthcare monitoring system built with ThingsBoard. It provides real-time visibility into resident health, room conditions, and facility management — all from a single interface.',
		panels: [
			{
				title: 'Resident overview',
				description:
					'The main dashboard displays a summary of all residents, their current locations, health status indicators, and active alarms. Caregivers can quickly identify residents requiring attention and navigate to detailed profiles with a single click.',
				image: '/src/assets/images/usecases/health-care/resident-overview.webp',
				imageAlt: 'Resident overview dashboard with health status and location tracking',
			},
			{
				title: 'Resident alarm dashboard',
				description:
					'This view provides a detailed alarm history for individual residents, including alarm type, severity, timestamp, and acknowledgment status. Caregivers can filter alarms by date range and severity to focus on critical events.',
				image: '/src/assets/images/usecases/health-care/resident-alarm.webp',
				imageAlt: 'Resident alarm history with severity levels and timestamps',
			},
			{
				title: 'Real-time resident alarm',
				description:
					'A real-time alarm view shows active alerts as they occur, enabling immediate response. The dashboard highlights the affected resident, their location, and the nature of the alarm — whether it is a health event, environmental trigger, or device malfunction.',
				image: '/src/assets/images/usecases/health-care/real-time-resident-alarm.webp',
				imageAlt: 'Real-time alarm notification for resident health events',
			},
			{
				title: 'Room alarm configuration',
				description:
					'Administrators can configure alarm thresholds for each room, including temperature limits, humidity ranges, air quality indices, and noise levels. Custom rules trigger automated notifications when conditions exceed safe parameters.',
				image: '/src/assets/images/usecases/health-care/room-alarm-configuration.webp',
				imageAlt: 'Room alarm threshold configuration interface',
			},
			{
				title: 'Resident list management',
				description:
					'A comprehensive list view of all residents with their profiles, assigned rooms, health conditions, and emergency contacts. Facility managers can add, edit, or archive resident records and assign care plans directly from this interface.',
				image: '/src/assets/images/usecases/health-care/resident-list-management.webp',
				imageAlt: 'Resident list with profiles and room assignments',
			},
			{
				title: 'Zone and floor management',
				description:
					'This dashboard provides a facility-wide view organized by zones and floors. Managers can monitor environmental conditions across the entire building, identify problem areas, and ensure consistent comfort levels throughout the facility.',
				image: '/src/assets/images/usecases/health-care/zone-and-floor-management.webp',
				imageAlt: 'Facility zone and floor management overview',
			},
			{
				title: 'Room and device layout',
				description:
					'An interactive room layout showing the placement of sensors and devices within each room. Users can view real-time readings from individual sensors, check device battery levels, and verify connectivity status.',
				image: '/src/assets/images/usecases/health-care/room-and-device-layout.webp',
				imageAlt: 'Interactive room layout with sensor and device placement',
			},
			{
				title: 'Device addition',
				description:
					'The device provisioning interface allows administrators to register new sensors and gateways, assign them to specific rooms, and configure their telemetry parameters. The guided workflow ensures proper setup and connectivity validation.',
				image: '/src/assets/images/usecases/health-care/device-addition.webp',
				imageAlt: 'Device provisioning and registration interface',
			},
			{
				title: 'Room configuration',
				description:
					'Detailed room configuration panel where administrators define room properties, assign sensors, set alarm thresholds, and configure environmental monitoring parameters. Changes are applied in real time without requiring device restarts.',
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
					'Real-time patient monitoring, environmental control in wards, and automated alerting for medical staff to ensure timely response to critical health events.',
				desktopImage: '/src/assets/images/usecases/health-care/hospital-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/hospital-2.svg',
				imageAlt: 'Hospital',
				imageTitle: 'Hospitals and healthcare facilities',
			},
			{
				title: 'Rehabilitation centers',
				description:
					'Tracking patient recovery progress, monitoring exercise routines, and maintaining optimal environmental conditions for rehabilitation activities.',
				desktopImage: '/src/assets/images/usecases/health-care/sport-complex-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/sport-complex-2.svg',
				imageAlt: 'Rehabilitation center',
				imageTitle: 'Rehabilitation centers',
			},
			{
				title: 'Prisons and correctional facilities',
				description:
					'Monitoring inmate locations, environmental conditions in cells and common areas, and ensuring safety compliance through automated alert systems.',
				desktopImage: '/src/assets/images/usecases/health-care/rehabilitation-center-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/rehabilitation-center-2.svg',
				imageAlt: 'Correctional facility',
				imageTitle: 'Prisons and correctional facilities',
			},
			{
				title: 'Sports complexes and fitness centers',
				description:
					'Tracking athlete performance, monitoring environmental conditions in training areas, and managing facility zones for optimal comfort and safety.',
				desktopImage: '/src/assets/images/usecases/health-care/factories-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/factories-2.svg',
				imageAlt: 'Sports complex',
				imageTitle: 'Sports complexes and fitness centers',
			},
			{
				title: 'Factories and industrial sites',
				description:
					'Worker health monitoring in hazardous environments, air quality tracking, and automated safety alerts to prevent occupational health incidents.',
				desktopImage: '/src/assets/images/usecases/health-care/prison-1.svg',
				mobileImage: '/src/assets/images/usecases/health-care/prison-2.svg',
				imageAlt: 'Factory',
				imageTitle: 'Factories and industrial sites',
			},
		],
	},
	summary: {
		title: 'Summary of health care solution',
		text: 'The smart assisted living solution powered by ThingsBoard provides a comprehensive approach to resident and facility management. By combining real-time health monitoring, environmental sensing, and intelligent automation, healthcare providers can deliver higher quality care while reducing administrative overhead. The platform enables proactive response to health events, personalized care plans, and data-driven decision-making — all from a centralized, intuitive interface that scales from small care homes to large multi-facility deployments.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
