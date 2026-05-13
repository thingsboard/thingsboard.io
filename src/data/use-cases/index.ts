import type { ImageMetadata } from 'astro';

import airQuality from '~/assets/images/usecases/air-quality/air-quality.png';
import environmentMonitoring from '~/assets/images/usecases/environment-monitoring/environment-monitoring.png';
import fleetTracking from '~/assets/images/usecases/fleet-tracking/site-fleet-tracking-1.webp';
import fuelLevelMonitoring from '~/assets/images/usecases/fuel-level-monitoring/fuel-monitoring-1.png';
import healthCare from '~/assets/images/usecases/health-care/health-care.png';
import scada from '~/assets/images/usecases/scada/scada.png';
import scadaDrilling from '~/assets/images/usecases/scada-drilling-system/hp-scada-systems-in-drilling-1.png';
import scadaEnergyManagement from '~/assets/images/usecases/scada-energy-management/scada-energy-management-1.png';
import smartEnergy from '~/assets/images/usecases/smart-energy/smart-energy.png';
import smartFarming from '~/assets/images/usecases/smart-farming/smart-farming.png';
import smartIrrigation from '~/assets/images/usecases/smart-irrigation/smart-irrigation.png';
import smartMetering from '~/assets/images/usecases/smart-metering/smart-metering.png';
import smartOffice from '~/assets/images/usecases/smart-office/smart-office-1-v2.webp';
import smartRetail from '~/assets/images/usecases/smart-retail/smart-retail.png';
import wasteMonitoring from '~/assets/images/usecases/waste-monitoring/waste-monitoring-1.png';
import waterMetering from '~/assets/images/usecases/water-metering/water-metering.png';

export interface UseCaseCardItem {
	type: 'General' | 'SCADA';
	name: string;
	description: string;
	image: ImageMetadata;
	imageAlt: string;
	video?: string[];
	href: string;
}

export const useCaseItems: UseCaseCardItem[] = [
	{
		type: 'General',
		name: 'Smart Energy',
		description:
			'Collect and store smart meter data reliably, visualize real-time and historical energy consumption on customizable dashboards, and integrate with third-party analytics solutions.',
		image: smartEnergy,
		imageAlt: 'Smart energy',
		video: [
			'https://video.thingsboard.io/usecases/smart-energy.mp4',
			'https://video.thingsboard.io/usecases/smart-energy.webm',
		],
		href: '/use-cases/smart-energy/',
	},
	{
		type: 'SCADA',
		name: 'SCADA Swimming Pool System',
		description:
			'Monitor and control swimming pool systems in real time with SCADA. Use interactive symbols on dashboards to manage workflows with full flexibility to design and oversee operations.',
		image: scada,
		imageAlt: 'See more about SCADA Swimming pool',
		video: [
			'https://video.thingsboard.io/usecases/scada.mp4',
			'https://video.thingsboard.io/usecases/scada.webm',
		],
		href: '/use-cases/scada/',
	},
	{
		type: 'SCADA',
		name: 'SCADA Oil & Gas drilling system',
		description:
			'Automate drilling operations with SCADA and ThingsBoard. Control rigs, pumps, and blowout preventers in real time, visualize key parameters, and enhance safety. Flexible SCADA symbol templates let you tailor the system to any production scenario.',
		image: scadaDrilling,
		imageAlt: 'See more about SCADA Oil & gas drilling system',
		video: [
			'https://video.thingsboard.io/usecases/hp-drilling-scada-system.mp4',
			'https://video.thingsboard.io/usecases/hp-drilling-scada-system.webm',
		],
		href: '/use-cases/scada-oil-and-gas-drilling-system/',
	},
	{
		type: 'SCADA',
		name: 'SCADA Energy management',
		description:
			'Monitor, analyze, and optimize energy flows in real time with SCADA-powered dashboards. Track efficiency, forecast demand peaks, and reduce costs across your infrastructure.',
		image: scadaEnergyManagement,
		imageAlt: 'See more about SCADA Energy management',
		video: [
			'https://video.thingsboard.io/usecases/scada-energy-management.mp4',
			'https://video.thingsboard.io/usecases/scada-energy-management.webm',
		],
		href: '/use-cases/scada-energy-management/',
	},
	{
		type: 'General',
		name: 'Environment Monitoring',
		description:
			'Monitor indoor and outdoor environments using a wide range of sensors. Supports NB IoT, LoRaWAN, SigFox, MQTT, CoAP, HTTP, LwM2M, and other modern protocols.',
		image: environmentMonitoring,
		imageAlt: 'Environment monitoring dashboard',
		video: [
			'https://video.thingsboard.io/usecases/environment-monitoring.mp4',
			'https://video.thingsboard.io/usecases/environment-monitoring.webm',
		],
		href: '/use-cases/environment-monitoring/',
	},
	{
		type: 'General',
		name: 'Smart Office',
		description:
			'Boost productivity by ensuring employee health and safety. Monitor and control office indoor climate, optimize resource consumption, and leverage rich data visualization, remote control, and OTA update capabilities.',
		image: smartOffice,
		imageAlt: 'See more about Smart Office',
		video: [
			'https://video.thingsboard.io/usecases/smart-office-v3.mp4',
			'https://video.thingsboard.io/usecases/smart-office-v3.webm',
		],
		href: '/use-cases/smart-office/',
	},
	{
		type: 'General',
		name: 'Water Metering',
		description:
			'Collect and analyze water consumption data with fraud detection. Browse meter states and aggregated statistics on interactive dashboards. Set up alarms via SMS and email.',
		image: waterMetering,
		imageAlt: 'Water metering dashboard',
		video: [
			'https://video.thingsboard.io/usecases/water-metering.mp4',
			'https://video.thingsboard.io/usecases/water-metering.webm',
		],
		href: '/use-cases/water-metering/',
	},
	{
		type: 'General',
		name: 'Smart Retail',
		description:
			'Monitor chillers, freezers, and smart shelves to ensure food quality and product availability. Track supermarket assets, browse historical data, and generate threshold-based alarms.',
		image: smartRetail,
		imageAlt: 'Smart retail dashboard',
		video: [
			'https://video.thingsboard.io/usecases/smart-retail.mp4',
			'https://video.thingsboard.io/usecases/smart-retail.webm',
		],
		href: '/use-cases/smart-retail/',
	},
	{
		type: 'General',
		name: 'Smart Farming',
		description:
			'Collect important indicators for your agricultural production such as soil conditions or facilities state via IoT sensors and visualize them using end-user customizable dashboards provided by ThingsBoard platform.',
		image: smartFarming,
		imageAlt: 'Smart farming dashboard',
		video: [
			'https://video.thingsboard.io/usecases/smart-farming.mp4',
			'https://video.thingsboard.io/usecases/smart-farming.webm',
		],
		href: '/use-cases/smart-farming/',
	},
	{
		type: 'General',
		name: 'Site Fleet Tracking',
		description:
			'Track excavators, trucks, and machinery across mining and industrial zones in real time. Use geofencing and smart alarms to monitor fuel usage, detect violations, and boost efficiency.',
		image: fleetTracking,
		imageAlt: 'Fleet tracking dashboard',
		video: [
			'https://video.thingsboard.io/usecases/mine-site-monitoring.mp4',
			'https://video.thingsboard.io/usecases/mine-site-monitoring.webm',
		],
		href: '/use-cases/site-fleet-tracking/',
	},
	{
		type: 'General',
		name: 'Smart Metering',
		description:
			'Collect, store, and aggregate smart meter data reliably. Analyze resource consumption, detect leakage, anomalies, or fraud, and present insights to end users.',
		image: smartMetering,
		imageAlt: 'Smart metering dashboard',
		video: [
			'https://video.thingsboard.io/usecases/smart-metering.mp4',
			'https://video.thingsboard.io/usecases/smart-metering.webm',
		],
		href: '/use-cases/smart-metering/',
	},
	{
		type: 'General',
		name: 'Health Care: Smart Assisted Living Solution',
		description:
			'Track patient health metrics in real time and notify medical professionals of critical changes. Integrate connected devices, analytics, and automated alerts for a seamless caregiver experience with timely responses.',
		image: healthCare,
		imageAlt: 'Health Care dashboard',
		video: [
			'https://video.thingsboard.io/usecases/health-care.mp4',
			'https://video.thingsboard.io/usecases/health-care.webm',
		],
		href: '/use-cases/health-care/',
	},
	{
		type: 'General',
		name: 'Air Quality Monitoring',
		description:
			'Track air quality metrics including PM2.5, CO2, humidity, and temperature across locations. Visualize data on real-time dashboards, set threshold-based alerts, and analyze historical trends.',
		image: airQuality,
		imageAlt: 'Air quality dashboard',
		video: [
			'https://video.thingsboard.io/usecases/air-quality.mp4',
			'https://video.thingsboard.io/usecases/air-quality.webm',
		],
		href: '/use-cases/air-quality-monitoring/',
	},
	{
		type: 'General',
		name: 'Smart Irrigation',
		description:
			'Monitor the irrigation system and respond in time to changes in field conditions. List the fields and monitor their soil moisture, location, statistics, etc.',
		image: smartIrrigation,
		imageAlt: 'Smart irrigation dashboard',
		video: [
			'https://video.thingsboard.io/usecases/smart-irrigation.mp4',
			'https://video.thingsboard.io/usecases/smart-irrigation.webm',
		],
		href: '/use-cases/smart-irrigation/',
	},
	{
		type: 'General',
		name: 'Waste Management',
		description:
			'Optimize waste collection routes and schedules by monitoring fill levels in real time. Track container status, analyze collection patterns, and reduce operational costs with data-driven insights and automated alerts.',
		image: wasteMonitoring,
		imageAlt: 'Waste monitoring dashboard',
		href: '/use-cases/waste-management/',
	},
	{
		type: 'General',
		name: 'Tank Level Monitoring',
		description:
			'Monitor fuel, water, and chemical tank levels in real time. Set threshold alerts for low levels or overflow, visualize consumption trends, and optimize refill scheduling.',
		image: fuelLevelMonitoring,
		imageAlt: 'Fuel level monitoring',
		href: '/use-cases/tank-level-monitoring/',
	},
];
