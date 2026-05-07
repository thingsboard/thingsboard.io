export interface CarouselItem {
	src: string;
	alt: string;
	title: string;
	description: string;
	linkLabel: string;
	href: string;
	width: number;
	height: number;
}

export const homeCarouselItems: CarouselItem[] = [
	{
		src: '/src/assets/images/landings/ce/usecases/se4.webp',
		alt: 'Smart energy dashboard example',
		title: 'Smart energy',
		description:
			'Deliver and store data from smart meters in reliable and fault-tolerant way, visualize real-time and historical energy consumption data on customizable end-user dashboards, integrate with third-party analytics frameworks and solutions.',
		linkLabel: 'Smart energy use case',
		href: '/use-cases/smart-energy/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/sf1.webp',
		alt: 'Smart farming dashboard example',
		title: 'Smart farming',
		description:
			'Collect important indicators for your agricultural production such as soil conditions or facilities state via IoT sensors and visualize them using end-user customizable dashboards provided by ThingsBoard platform.',
		linkLabel: 'Smart farming use case',
		href: '/use-cases/smart-farming/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/ft3.webp',
		alt: 'Fleet tracking dashboard example',
		title: 'Fleet tracking',
		description:
			'ThingsBoard platform allows to track vehicles state and alerts via various sensors, plot vehicle routes in real-time and browse their sensors reading history at the same time using customizable high quality widgets and dashboards.',
		linkLabel: 'Fleet tracking use case',
		href: '/use-cases/site-fleet-tracking/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/sm1.webp',
		alt: 'Smart metering dashboard example',
		title: 'Smart metering',
		description:
			'Collect, store and aggregate data from smart meters in reliable and fault-tolerant way. Analyze resource consumption and raise alerts on leakage, anomaly or fraud. Present results of the analysis to end users.',
		linkLabel: 'Smart metering use case',
		href: '/use-cases/smart-metering/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/em1.webp',
		alt: 'Environment monitoring dashboard example',
		title: 'Environment monitoring',
		description:
			'Monitor and analyze indoor and outdoor environments using a wide range of sensors. ThingsBoard supports data acquisition using modern connectivity technologies and protocols: NB IoT, LoRaWAN, SigFox, MQTT, CoAP, HTTP, LwM2M, and others.',
		linkLabel: 'Environment monitoring use case',
		href: '/use-cases/environment-monitoring/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/so1.webp',
		alt: 'Smart office dashboard example',
		title: 'Smart office',
		description:
			'Ensure employee health and safety to boost organization productivity. Optimize resource consumption by monitoring and control of the office indoor climate. ThingsBoard provides rich data visualization, powerful processing engine, remote control and OTA updates capabilities.',
		linkLabel: 'Smart office use case',
		href: '/use-cases/smart-office/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/wm4.webp',
		alt: 'Water metering dashboard example',
		title: 'Water metering',
		description:
			'Enable water consumption data collection, analysis and fraud detection using ThingsBoard. Use interactive dashboards that allow administrators and end-users to browse the state of the water meters and aggregated water consumption statistics.',
		linkLabel: 'Water metering use case',
		href: '/use-cases/water-metering/',
		width: 1920,
		height: 866,
	},
	{
		src: '/src/assets/images/landings/ce/usecases/sr3.webp',
		alt: 'Smart retail dashboard example',
		title: 'Smart retail',
		description:
			'Control quality of food storage by monitoring chillers and freezers. Ensure availability of the goods using smart shelves. Ensure safety using motion detection and fire alarms.',
		linkLabel: 'Smart retail use case',
		href: '/use-cases/smart-retail/',
		width: 1920,
		height: 866,
	},
];