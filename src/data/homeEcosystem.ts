export interface EcosystemItem {
	name: string;
	description: string;
	icon: string;
	href: string;
}

export const homeEcosystem: EcosystemItem[] = [
	{
		name: 'Edge',
		description: 'Edge computing',
		icon: '/src/assets/images/landings/ce/thingsboard-e-icon.svg',
		href: '/products/thingsboard-edge/',
	},
	{
		name: 'IoT Gateway',
		description: 'Connect legacy protocols',
		icon: '/src/assets/images/landings/ce/gateway-icon.svg',
		href: '/docs/iot-gateway/what-is-iot-gateway/',
	},
	{
		name: 'MQTT Broker',
		description: 'Connect MQTT clients',
		icon: '/src/assets/images/landings/ce/tbmq-icon.svg',
		href: '/products/mqtt-broker/',
	},
	{
		name: 'Trendz Analytics',
		description: 'Data analytics and Prediction',
		icon: '/src/assets/images/landings/ce/trendz-icon.svg',
		href: '/products/trendz/',
	},
	{
		name: 'Mobile Application',
		description: 'IoT mobile product',
		icon: '/src/assets/images/landings/ce/tb-mobile-icon.svg',
		href: '/products/mobile/',
	},
	{
		name: 'PE Mobile Application',
		description: 'Advanced IoT mobile product',
		icon: '/src/assets/images/landings/ce/tb-pe-mobile-icon.svg',
		href: '/products/mobile-pe/',
	},
];