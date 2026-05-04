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
			'ThingsBoard delivers a robust answer to this challenge. Built with scalability, real-time analytics, and geospatial control at its core, the platform transforms how mine operators monitor and manage their equipment — all without using Rule Chains.',
			'This Clay Mine Site solution leverages calculated fields, geofencing logic, and alarm rules only to streamline configuration, reduce deployment time, and drive intelligent insights from the ground up. With zero-code automation and dynamic dashboards, operations become more predictable, safer, and easier to scale.',
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
		title: 'Solution structure of the site fleet tracking monitoring solution',
		shortText:
			'The solution architecture consists of GPS-enabled excavators and haul trucks, transmitting telemetry to ThingsBoard via MQTT or HTTP protocols. Devices report location, fuel levels, speed, pressure, and more.',
		longText: [
			'Instead of traditional rule chains, all processing is handled by Calculated Fields, allowing operations teams to configure logic like: zone detection via Geofencing Calculated Fields, fuel burn rate and hydraulic pressure thresholds, speed analysis and usage KPIs, machine state transitions (idle, working, unloading).',
			'All alerts are configured through Alarm Rules, creating a clean, no-code environment that is easy to maintain and adapt across multiple sites.',
		],
		schemeSrc: '/src/assets/schemas/use-case.svg',
		schemeAlt: 'IoT Fleet Tracking solution architecture',
		schemeCaption:
			'IoT Fleet Tracking solution architecture: IoT devices connect via gateways to the cloud for processing, visualization, and automation',
	},
	dashboardStructure: {
		title: 'Dashboard structure of the site fleet tracking monitoring solution',
		subtitle:
			'The solution includes a set of modular dashboards designed to give mine operators full situational control — from zone-level events to individual machine analytics. The primary Mine Overview Dashboard presents a full satellite view of the site with color-coded zones (Loading, Unloading, Restricted), live machine positions, fuel levels, and telemetry streams. Interactive widgets highlight: machines per zone, fuel usage per day, active alarms with severity, zone-specific transitions and KPIs',
		panels: [
			{
				title: 'Main Overview Dashboard',
				description:
					'This dashboard displays a full satellite map of the mine with real-time overlays for each vehicle. Vehicles are color-coded by type and zone, while the right panel shows a live machine list with fuel status and operational state. KPIs summarize daily consumption, number of vehicles in each zone, and triggered alarms. It enables full operational awareness at a glance.',
				image: '/src/assets/images/usecases/fleet-tracking/site-fleet-tracking-1.webp',
				imageAlt:
					'Main fleet tracking dashboard with vehicle positions and geofencing zones on interactive map',
				imageTitle: 'Main Overview Dashboard',
			},
			{
				title: 'Zone L1 – Loading Area',
				description:
					'Focused on Excavator A, this dashboard tracks its speed, fuel level, and operational alarms. The map zooms into the loading zone, while the sidebar lists alarms for low fuel and hydraulic pressure. Operators can easily monitor zone-specific performance and address machine-level issues in context.',
				image: '/src/assets/images/usecases/fleet-tracking/zone-l1.webp',
				imageAlt: 'Loading zone L1 dashboard with vehicle presence and cycle time tracking',
				imageTitle: 'Zone L1 – Loading Area',
			},
			{
				title: 'Zone U1 – Unloading Area',
				description:
					'Displays Excavator B actively working in the unloading area with fuel and minor speed violations. Alarms are logged instantly. This dashboard provides quick access to machine status and zone compliance — a key element for high-traffic unloading areas.',
				image: '/src/assets/images/usecases/fleet-tracking/zone-u1.webp',
				imageAlt: 'Unloading zone U1 dashboard with vehicle queue and duration tracking',
				imageTitle: 'Zone U1 – Unloading Area',
			},
			{
				title: 'Zone R1 – Restricted Area',
				description:
					'This screen shows Haul Truck B parked in a restricted zone, triggering a critical overload alarm. The map provides immediate zone context, and the alarm panel flags violations in real time. This visual enforcement helps prevent unsafe operation or zone breaches.',
				image: '/src/assets/images/usecases/fleet-tracking/zone-r1.webp',
				imageAlt:
					'Restricted zone R1 dashboard with unauthorized entry alerts and intrusion history',
				imageTitle: 'Zone R1 – Restricted Area',
			},
			{
				title: 'Excavator B – Machine Dashboard',
				description:
					'A telemetry-rich screen featuring fuel usage, fuel level, pressure, and route playback. Historical data and live metrics provide clear insight into machine performance and workload, while alarm logs support proactive maintenance.',
				image: '/src/assets/images/usecases/fleet-tracking/excavator-b.webp',
				imageAlt: 'Excavator B machine dashboard with position, zone status, and operating metrics',
				imageTitle: 'Excavator B – Machine Dashboard',
			},
			{
				title: 'Haul Truck A – Behavior Dashboard',
				description:
					'Highlights repeated speed limit violations, fuel burn, and load data. The route history is shown with all zone transitions. This enables supervisors to analyze driver behavior, optimize travel paths, and reduce excess wear or unsafe driving.',
				image: '/src/assets/images/usecases/fleet-tracking/haul-truck-a.webp',
				imageAlt: 'Haul Truck A behavior dashboard with speed profiles and driving analytics',
				imageTitle: 'Haul Truck A – Behavior Dashboard',
			},
			{
				title: 'Haul Truck B – Idle & Overload State',
				description:
					'Shows a vehicle in a restricted zone with 28-ton load and no movement. An active overload alarm is triggered. This dashboard is essential for spotting inefficient use of assets or safety violations that need immediate action.',
				image: '/src/assets/images/usecases/fleet-tracking/haul-truck-b.webp',
				imageAlt: 'Haul Truck B dashboard showing idle time tracking and overload detection',
				imageTitle: 'Haul Truck B – Idle & Overload State',
			},
			{
				title: 'Excavator A – Performance Analysis',
				description:
					'Monitors hydraulic pressure, movement, and fuel trends. Alarm logs indicate repeated pressure spikes. Used in tandem with maintenance schedules, this helps detect early signs of mechanical stress.',
				image: '/src/assets/images/usecases/fleet-tracking/excavator-a.webp',
				imageAlt: 'Excavator A performance dashboard with efficiency metrics and uptime analytics',
				imageTitle: 'Excavator A – Performance Analysis',
			},
			{
				title: 'Haul Truck C – Out-of-Zone Alert',
				description:
					'Vehicle is detected outside of the mine’s geofence, triggering a critical perimeter breach alarm. Combined with a low-fuel warning, the system prompts immediate resolution — reducing risk and ensuring operational boundaries are respected.',
				image: '/src/assets/images/usecases/fleet-tracking/haul-truck-c.webp',
				imageAlt: 'Haul Truck C dashboard with geofencing violation alerts and response tracking',
				imageTitle: 'Haul Truck C – Out-of-Zone Alert',
			},
			{
				title: 'Calculated Fields Panel',
				description:
					'The admin interface shows all backend logic built through calculated fields — fuel formulas, geofence status, speed over limits, etc. Everything is visual, editable, and instantly applied to the data model — zero Rule Chains required. This low-code logic layer drastically reduces setup complexity and speeds up scaling across fleets.',
				image: '/src/assets/images/usecases/fleet-tracking/calc-fields.webp',
				imageAlt: 'Calculated fields configuration panel showing zone detection and fleet logic',
				imageTitle: 'Calculated Fields Panel',
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
					'Track machines across loading, transport, and restricted zones using automated alarms and fuel analytics.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/mining-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/mining-2.svg',
				imageAlt: 'Mining excavator',
				imageTitle: 'Mining & quarrying',
			},
			{
				title: 'Material yards & dumpsites',
				description:
					'Automate alerts when haul trucks or loaders enter, leave, or overload in processing areas.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/dumpsites-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/dumpsites-2.svg',
				imageAlt: 'Material yard',
				imageTitle: 'Material yards & dumpsites',
			},
			{
				title: 'Construction sites',
				description:
					'Monitor heavy machinery in temporary or mobile zones, ensuring route compliance and operational safety.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/construction-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/construction-2.svg',
				imageAlt: 'Construction crane',
				imageTitle: 'Construction sites',
			},
			{
				title: 'Infrastructure projects',
				description:
					'Gain visibility over fleet movement across bridges, tunnels, or time-sensitive zones during large-scale builds.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/infrastructure-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/infrastructure-2.svg',
				imageAlt: 'Infrastructure project',
				imageTitle: 'Infrastructure projects',
			},
			{
				title: 'Forestry operations',
				description:
					'Use geofencing to protect environmental boundaries and track equipment in remote forest sectors.',
				desktopImage: '/src/assets/images/usecases/fleet-tracking/forest-1.svg',
				mobileImage: '/src/assets/images/usecases/fleet-tracking/forest-2.svg',
				imageAlt: 'Forestry equipment',
				imageTitle: 'Forestry operations',
			},
		],
	},
	summary: {
		title: 'Summary of the site fleet tracking monitoring solution',
		text: 'ThingsBoard’s Clay Mine Monitoring Solution sets a new benchmark for no-code industrial IoT. By eliminating Rule Chains and relying solely on calculated fields and alarm rules, it reduces configuration overhead, speeds up deployment, and empowers teams to operate smarter and safer.\n\nThe platform provides everything needed for real-time tracking, performance analysis, geofencing control, and automated alerts — all through a powerful and flexible dashboard layer.\n\nWhether applied to clay mines or other heavy equipment scenarios, this solution offers unmatched operational clarity and scalability.',
		icon: '/src/assets/images/usecases/health-care/summary.svg',
		iconAlt: 'Text summary icon',
	},
};
