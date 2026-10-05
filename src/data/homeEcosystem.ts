import { TBMQ_SITE_URL } from '@models/tbmq';

export interface EcosystemItem {
	name: string;
	/** The category line over the name. */
	label: string;
	/** Several strings render as several paragraphs. */
	description: string | string[];
	icon: string;
	href: string;
	/** Link text. */
	action: string;
	/** Colour of the label and link. */
	accent: string;
	/** Sold as an add-on rather than part of the core platform. */
	addOn?: boolean;
	/** Spans two columns and carries a visual beside the copy. */
	wide?: boolean;
	/** Per grid tier: `flip` puts the visual left of the copy; `single` makes it a plain one-column card. */
	layout?: { cols3?: 'flip'; cols2?: 'flip' | 'single' };
	/** Shows `GatewayRelay` as the visual. */
	relay?: boolean;
	video?: { webm: string; mp4: string };
	/** Category links shown as the card's visual. */
	tiles?: { label: string; href: string; color: string; icon: string }[];
}

// In grid order: at three columns each wide card pairs with a single to fill a row.
export const homeEcosystem: EcosystemItem[] = [
	{
		name: 'IoT Gateway',
		label: 'Protocol bridge',
		description:
			'Brings legacy equipment online. Modbus, OPC UA, BACnet, SNMP, KNX and 25+ industrial protocols, translated to MQTT. Open-source, runs on a Raspberry Pi or industrial PC.',
		icon: '/src/assets/images/landings/ce/gateway-icon.svg',
		href: '/docs/iot-gateway/',
		action: 'See supported protocols',
		accent: '#7b3fe4',
		wide: true,
		relay: true,
	},
	{
		name: 'Edge',
		label: 'Edge computing',
		description:
			'Processes and visualizes data locally at the network edge, enabling autonomous operation during connectivity outages. Manage every remote edge location from one platform.',
		icon: '/src/assets/images/landings/ce/thingsboard-e-icon.svg',
		href: '/products/thingsboard-edge/',
		action: 'See how Edge works',
		accent: '#008478',
		addOn: true,
	},
	{
		name: 'Trendz',
		label: 'Analytics & AI',
		description:
			'Predictive analytics, anomaly detection and forecasting. Explore your data without code using natural-language queries, and run AI agents over it.',
		icon: '/src/assets/images/landings/ce/trendz-icon.svg',
		href: '/products/trendz/',
		action: 'Explore Trendz',
		accent: '#1976d2',
		addOn: true,
	},
	{
		name: 'Mobile App Builder',
		label: 'iOS & Android',
		description:
			'Dashboards, alarms and device control in your pocket. Push notifications when something needs attention, and white-label builds you can ship under your own brand.',
		icon: 'thingsboard-mark',
		href: '/products/mobile/',
		action: 'Tour the app',
		accent: '#178649',
		wide: true,
		layout: { cols3: 'flip', cols2: 'flip' },
		video: {
			webm: 'https://video.thingsboard.io/mobile/pe/mobile-actions.webm',
			mp4: 'https://video.thingsboard.io/mobile/pe/mobile-actions.mp4',
		},
	},
	{
		name: 'IoT Hub',
		label: 'Free marketplace',
		description: [
			'One marketplace, two ways in - install what others built, or publish your own.',
			'Skip the multi-page integration guide: get IoT solution components running in one click, each reviewed by our team.',
			'Or list your own components - showcase your work or route users to your hardware.',
		],
		icon: 'tabler:building-store',
		href: '/iot-hub/',
		action: 'Browse the Hub',
		accent: '#e8590c',
		wide: true,
		layout: { cols2: 'single' },
		// The colours are the categories' own `tileColor` from `src/models/iot-hub.ts`.
		tiles: [
			{ label: 'Device Library', href: '/iot-hub/devices/', color: '#ccd5ff', icon: 'tabler:cpu' },
			{ label: 'Solution Templates', href: '/iot-hub/solution-templates/', color: '#b8d9ff', icon: 'tabler:template' },
			{ label: 'Widgets', href: '/iot-hub/widgets/', color: '#a3ffc3', icon: 'tabler:layout-grid' },
			{
				label: 'Calculated Fields',
				href: '/iot-hub/calculated-fields/',
				color: '#bdedff',
				icon: 'tabler:math-function',
			},
			{ label: 'Alarm Rules', href: '/iot-hub/alarm-rules/', color: '#ffe6cc', icon: 'tabler:bell' },
			{ label: 'Rule Chains', href: '/iot-hub/rule-chains/', color: '#ecd1ff', icon: 'tabler:sitemap' },
		],
	},
	{
		name: 'TBMQ',
		label: 'Dedicated MQTT broker',
		description:
			'Drop-in replacement for legacy brokers, built for millions of concurrent connections. Keep your existing clients and topics, and connect it to ThingsBoard when you need the platform too.',
		icon: '/src/assets/images/landings/ce/tbmq-icon.svg',
		href: TBMQ_SITE_URL,
		action: 'Go to tbmq.io',
		accent: '#008741',
	},
];
