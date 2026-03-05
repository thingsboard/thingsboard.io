import type { UseCaseData } from './types';

export const siteFleetTrackingData: UseCaseData = {
	title: 'Site fleet tracking monitoring solution',
	pageTitle: 'Geofencing-Based Excavator & Truck Tracking for Clay Mines',
	description:
		'Explore how ThingsBoard enables safe and efficient vehicle tracking on clay mine sites using calculated fields, geofencing zones, and zero rule chain logic.',
	pageSlug: 'site-fleet-tracking',
	about: {
		shortText:
			'Clay mining operations present a high-risk, high-movement environment, where visibility, safety, and fuel efficiency are critical. Coordinating fleets of excavators and haul trucks across loading, unloading, and restricted zones requires more than GPS — it demands precision logic and real-time automation.',
		longText: [
			'ThingsBoard enables site operators to build a complete fleet tracking solution using calculated fields, geofencing, and real-time dashboards — all without writing a single rule chain. GPS-enabled vehicles transmit their coordinates to the platform, where calculated fields automatically determine zone presence, speed violations, idle time, and overload conditions.',
			'The result is a fully automated monitoring system that provides instant visibility into fleet behavior, enforces safety policies through geofencing-based alarms, and delivers actionable analytics for operational optimization — purpose-built for the demanding conditions of clay mining and heavy industry.',
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/3b0ab5a0-f838-11f0-a24d-13b2783631c6?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_FleetTracking_ViewLiveDemo',
	},
	overview: {
		type: 'carousel',
		carouselImages: [
			{
				src: '/src/assets/images/usecases/fleet-tracking/site-fleet-tracking-1.webp',
				alt: 'ThingsBoard interface showing bus status, speed, fuel level, and location on the map',
				title: 'Real-time excavator monitoring using ThingsBoard platform',
				width: 1819,
				height: 966,
			},
			{
				src: '/src/assets/images/usecases/fleet-tracking/site-fleet-tracking-2.webp',
				alt: 'ThingsBoard interface showing historical route and movement playback for Bus A on the map',
				title: 'Bus A route playback and history visualization in ThingsBoard',
				width: 1819,
				height: 966,
			},
			{
				src: '/src/assets/images/usecases/fleet-tracking/site-fleet-tracking-3.webp',
				alt: 'ThingsBoard dashboard displaying real-time and historical data for Bus A, including speed, fuel level, route history, and critical events',
				title: 'Real-time telemetry dashboard for Bus A in ThingsBoard',
				width: 1819,
				height: 966,
			},
		],
	},
	solutionStructure: {
		title: 'Solution structure of site fleet tracking use case',
		shortText:
			'GPS-enabled excavators and haul trucks transmit real-time coordinates and telemetry data to ThingsBoard via MQTT or HTTP protocols.',
		longText: [
			'ThingsBoard calculated fields automatically process incoming GPS data to determine vehicle zone presence, compute speed and idle time, and evaluate overload conditions — all without requiring any rule chain configuration.',
			'Geofencing zones (loading, unloading, and restricted areas) are defined within the platform, and alarm rules trigger automatically when vehicles enter or exit designated zones, exceed speed limits, or violate safety policies.',
			'All fleet data is visualized through real-time dashboards with interactive maps, zone overlays, and vehicle status indicators, giving site operators full visibility into fleet behavior from a single interface.',
		],
		schemeSrc: '/src/assets/schemas/iot-solution-architecture.svg',
		schemeAlt:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for alarms, dashboards, notifications, and data lakes',
		schemeCaption:
			'IoT solution architecture: devices connect via protocols and gateways to ThingsBoard for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of site fleet tracking solution',
		subtitle:
			'The live dashboard displays real-time GPS data from excavators and haul trucks operating across clay mine zones. Calculated fields process telemetry to determine zone presence, speed, and operational status without any rule chain logic.',
		panels: [
			{
				title: 'Main overview dashboard',
				description:
					"The primary dashboard provides a bird's-eye view of the entire clay mine site, displaying all vehicles on an interactive map with geofencing zone overlays. Operators can see real-time positions, zone assignments, active alarms, and fleet-wide statistics including total vehicles, active alerts, and zone occupancy counts.",
				image: '/src/assets/images/usecases/fleet-tracking/site-fleet-tracking-1.webp',
				imageAlt:
					'Main fleet tracking dashboard with vehicle positions and geofencing zones on interactive map',
				imageTitle:
					'ThingsBoard fleet tracking overview showing real-time vehicle positions, geofencing zones, and active alarms across the clay mine site',
			},
			{
				title: 'Zone L1 – Loading area',
				description:
					'Dedicated view for the loading zone showing excavators and trucks currently present, their dwell time, and loading status. The dashboard tracks entry/exit events and calculates average loading cycle times to optimize throughput.',
				image: '/src/assets/images/usecases/fleet-tracking/zone-l1.webp',
				imageAlt: 'Loading zone L1 dashboard with vehicle presence and cycle time tracking',
				imageTitle:
					'Zone L1 loading area: real-time vehicle tracking with dwell time and loading cycle analytics',
			},
			{
				title: 'Zone U1 – Unloading area',
				description:
					'Monitoring the unloading zone with real-time vehicle presence detection, queue tracking, and unloading duration analytics. Operators can identify bottlenecks and optimize haul truck routing to minimize wait times.',
				image: '/src/assets/images/usecases/fleet-tracking/zone-u1.webp',
				imageAlt: 'Unloading zone U1 dashboard with vehicle queue and duration tracking',
				imageTitle:
					'Zone U1 unloading area: vehicle presence monitoring with queue management and duration analytics',
			},
			{
				title: 'Zone R1 – Restricted area',
				description:
					'Safety-critical dashboard for the restricted zone displaying unauthorized entry alerts, vehicle intrusion history, and alarm escalation status. Instant notifications are triggered when any vehicle enters the restricted perimeter.',
				image: '/src/assets/images/usecases/fleet-tracking/zone-r1.webp',
				imageAlt:
					'Restricted zone R1 dashboard with unauthorized entry alerts and intrusion history',
				imageTitle:
					'Zone R1 restricted area: safety monitoring with unauthorized entry detection and alarm escalation',
			},
			{
				title: 'Excavator B – Machine dashboard',
				description:
					'Individual machine dashboard for Excavator B showing real-time position, current zone, operating hours, fuel consumption, and maintenance status. Historical movement traces and zone transition logs provide full operational transparency.',
				image: '/src/assets/images/usecases/fleet-tracking/excavator-b.webp',
				imageAlt: 'Excavator B machine dashboard with position, zone status, and operating metrics',
				imageTitle:
					'Excavator B individual dashboard: real-time position tracking, zone presence, and operational performance metrics',
			},
			{
				title: 'Haul Truck A – Behavior dashboard',
				description:
					'Behavioral analytics dashboard for Haul Truck A displaying speed profiles, acceleration patterns, braking events, and route compliance. Calculated fields automatically flag aggressive driving or route deviations.',
				image: '/src/assets/images/usecases/fleet-tracking/haul-truck-a.webp',
				imageAlt: 'Haul Truck A behavior dashboard with speed profiles and driving analytics',
				imageTitle:
					'Haul Truck A behavior analysis: speed profiling, acceleration monitoring, and route compliance tracking',
			},
			{
				title: 'Haul Truck B – Idle & overload state',
				description:
					'Monitoring idle time and payload weight for Haul Truck B. Calculated fields detect extended idle periods and overload conditions, triggering automatic alarms to prevent fuel waste and equipment damage.',
				image: '/src/assets/images/usecases/fleet-tracking/haul-truck-b.webp',
				imageAlt: 'Haul Truck B dashboard showing idle time tracking and overload detection',
				imageTitle:
					'Haul Truck B idle and overload monitoring: automated detection of extended idle periods and payload violations',
			},
			{
				title: 'Excavator A – Performance analysis',
				description:
					'Performance analytics for Excavator A including dig cycle efficiency, bucket load counts, and operational uptime. Historical trends help maintenance teams schedule service intervals and optimize machine utilization.',
				image: '/src/assets/images/usecases/fleet-tracking/excavator-a.webp',
				imageAlt: 'Excavator A performance dashboard with efficiency metrics and uptime analytics',
				imageTitle:
					'Excavator A performance analysis: dig cycle efficiency, utilization rates, and maintenance scheduling insights',
			},
			{
				title: 'Haul Truck C – Out-of-zone alert',
				description:
					'Alert-focused dashboard for Haul Truck C showing geofencing violation events, including unauthorized zone entries, boundary breaches, and off-route detections. Each alert includes timestamp, zone details, and response status.',
				image: '/src/assets/images/usecases/fleet-tracking/haul-truck-c.webp',
				imageAlt: 'Haul Truck C dashboard with geofencing violation alerts and response tracking',
				imageTitle:
					'Haul Truck C out-of-zone alert monitoring: geofencing violations with timestamps and response status',
			},
			{
				title: 'Calculated fields panel',
				description:
					'Configuration and monitoring view for all calculated fields used in the solution. Displays the logic behind zone presence detection, speed calculations, idle time computation, and overload evaluation — demonstrating how the entire fleet tracking system operates without any rule chain configuration.',
				image: '/src/assets/images/usecases/fleet-tracking/calc-fields.webp',
				imageAlt: 'Calculated fields configuration panel showing zone detection and fleet logic',
				imageTitle:
					'ThingsBoard calculated fields panel: no-code logic for zone presence, speed, idle time, and overload detection',
			},
		],
		demoUrl:
			'https://thingsboard.cloud/dashboard/3b0ab5a0-f838-11f0-a24d-13b2783631c6?publicId=7aa99e80-8acd-11ef-a59e-a9c993dbec14',
		demoButtonId: 'UseCases_FleetTracking_ViewLiveDemo',
		contactUsId: 'UseCases_FleetTracking_ContactUs',
	},
	applications: {
		title: 'Applications of site fleet tracking solution',
		subtitle:
			'The fleet tracking approach can be easily adapted to various heavy industry and logistics sectors',
		applications: [
			{
				title: 'Mining & quarrying',
				description:
					'Tracking excavators, dump trucks, and drilling rigs across open-pit mines and quarries with geofencing for blast zones, loading areas, and haul roads to improve safety and productivity.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/mining-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/mining-2.svg',
				imageAlt: 'Mining excavator',
				imageTitle: 'Mining & quarrying',
			},
			{
				title: 'Material yards & dumpsites',
				description:
					'Monitoring vehicle movements across material storage yards and dumpsites, tracking load/unload cycles, and ensuring trucks follow designated routes for efficient material handling.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/dumpsites-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/dumpsites-2.svg',
				imageAlt: 'Material yard',
				imageTitle: 'Material yards & dumpsites',
			},
			{
				title: 'Construction sites',
				description:
					'Real-time tracking of heavy equipment and delivery vehicles on construction sites with safety zone enforcement, unauthorized area detection, and equipment utilization analytics.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/construction-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/construction-2.svg',
				imageAlt: 'Construction crane',
				imageTitle: 'Construction sites',
			},
			{
				title: 'Infrastructure projects',
				description:
					'Fleet coordination for large-scale infrastructure projects such as road building, pipeline installation, and dam construction, with geofencing for active work zones and restricted areas.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/infrastructure-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/infrastructure-2.svg',
				imageAlt: 'Infrastructure project',
				imageTitle: 'Infrastructure projects',
			},
			{
				title: 'Forestry operations',
				description:
					'Tracking logging equipment and transport vehicles across remote forestry sites with zone-based access control, route compliance monitoring, and fuel consumption optimization.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/forest-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/forest-2.svg',
				imageAlt: 'Forestry equipment',
				imageTitle: 'Forestry operations',
			},
		],
	},
	summary: {
		title: 'Summary of site fleet tracking solution',
		text: 'ThingsBoard delivers a no-code industrial IoT solution for site fleet tracking that leverages calculated fields and geofencing to automate zone detection, speed monitoring, idle time tracking, and overload alerts — all without writing a single rule chain. Purpose-built for clay mines and heavy industry, this solution provides real-time fleet visibility, enforces safety policies, and drives operational efficiency from a single platform.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
