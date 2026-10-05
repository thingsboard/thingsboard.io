export interface CarouselItem {
	icon: string;
	src: string;
	alt: string;
	/** A second shot of the same view; renders the board as a comparison slider. */
	overlaySrc?: string;
	overlayAlt?: string;
	title: string;
	description: string;
	href: string;
	width: string | number;
	height: string | number;
}

export const homeCarouselItems: CarouselItem[] = [
	{
		src: '/src/assets/images/landings/ce/usecases/se4.webp',
		alt: 'Smart energy dashboard example',
		title: 'Smart energy',
		icon: 'tabler:bolt',
		description:
			'Deliver and store data from smart meters in reliable and fault-tolerant way, visualize real-time and historical energy consumption data on customizable end-user dashboards, integrate with third-party analytics frameworks and solutions.',
		href: '/use-cases/smart-energy/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/sf1.webp',
		alt: 'Smart farming dashboard example',
		title: 'Smart farming',
		icon: 'tabler:plant',
		description:
			'Collect important indicators for your agricultural production such as soil conditions or facilities state via IoT sensors and visualize them using end-user customizable dashboards provided by ThingsBoard platform.',
		href: '/use-cases/smart-farming/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/ft3.webp',
		alt: 'Fleet tracking dashboard example',
		title: 'Fleet tracking',
		icon: 'tabler:truck',
		description:
			'ThingsBoard platform allows to track vehicles state and alerts via various sensors, plot vehicle routes in real-time and browse their sensors reading history at the same time using customizable high quality widgets and dashboards.',
		href: '/use-cases/site-fleet-tracking/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/sm1.webp',
		alt: 'Smart metering dashboard example',
		title: 'Smart metering',
		icon: 'tabler:gauge',
		description:
			'Collect, store and aggregate data from smart meters in reliable and fault-tolerant way. Analyze resource consumption and raise alerts on leakage, anomaly or fraud. Present results of the analysis to end users.',
		href: '/use-cases/smart-metering/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/em1.webp',
		alt: 'Environment monitoring dashboard example',
		title: 'Environment monitoring',
		icon: 'tabler:wind',
		description:
			'Monitor and analyze indoor and outdoor environments using a wide range of sensors. ThingsBoard supports data acquisition using modern connectivity technologies and protocols: NB IoT, LoRaWAN, SigFox, MQTT, CoAP, HTTP, LwM2M, and others.',
		href: '/use-cases/environment-monitoring/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/so1.webp',
		alt: 'Smart office dashboard example',
		title: 'Smart office',
		icon: 'tabler:building',
		description:
			'Ensure employee health and safety to boost organization productivity. Optimize resource consumption by monitoring and control of the office indoor climate. ThingsBoard provides rich data visualization, powerful processing engine, remote control and OTA updates capabilities.',
		href: '/use-cases/smart-office/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/wm4.webp',
		alt: 'Water metering dashboard example',
		title: 'Water metering',
		icon: 'tabler:droplet',
		description:
			'Enable water consumption data collection, analysis and fraud detection using ThingsBoard. Use interactive dashboards that allow administrators and end-users to browse the state of the water meters and aggregated water consumption statistics.',
		href: '/use-cases/water-metering/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/sr3.webp',
		alt: 'Smart retail dashboard example',
		title: 'Smart retail',
		icon: 'tabler:building-store',
		description:
			'Control quality of food storage by monitoring chillers and freezers. Ensure availability of the goods using smart shelves. Ensure safety using motion detection and fire alarms.',
		href: '/use-cases/smart-retail/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/usecases/scada/traditional.webp',
		overlaySrc: '/src/assets/images/usecases/scada/high-performance.webp',
		alt: 'Traditional SCADA swimming pool dashboard',
		overlayAlt: 'High-performance SCADA swimming pool dashboard',
		title: 'SCADA swimming pool',
		icon: 'tabler:pool',
		description:
			'Valves, pumps, filters and tanks as live SCADA symbols. Watch the equipment run, catch alarms as they happen and control the process from the dashboard. Drag the slider to compare the traditional and high-performance styles.',
		href: '/use-cases/scada/',
		width: 2238,
		height: 1207,
	},
	{
		src: '/src/assets/images/usecases/scada-energy-management/scada-energy-management-1.webp',
		alt: 'SCADA energy management dashboard example',
		title: 'SCADA energy',
		icon: 'tabler:plug',
		description:
			'Track generation, distribution and consumption across a site. Meter readings, power quality and load are read in real time, with alarms raised when a line drifts out of range.',
		href: '/use-cases/scada-energy-management/',
		width: 1286,
		height: 660,
	},
];
