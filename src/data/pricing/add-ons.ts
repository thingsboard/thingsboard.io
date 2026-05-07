import type { AddOnItem } from './types';

import edgeIcon from '../../assets/pricing/edge-add-on-icon.svg?raw';
import trendzIcon from '../../assets/pricing/trendz-add-on-icon.svg?raw';
import mobileIcon from '../../assets/pricing/wl-add-on-icon.svg?raw';

const EDGE_TOOLTIP =
	'Run a local on-prem instance to keep operations running even when the internet is down.';
const TRENDZ_TOOLTIP =
	'Turn raw IoT data into actionable insights with advanced analytics and trend prediction.';
const MOBILE_TOOLTIP =
	'Launch a client-ready mobile app under your brand \u2014 your name, logo, colors, and a fully polished look & feel \u2014 so customers experience your product, not a third-party app.';

export const cloudAddOns: { na: AddOnItem[]; eu: AddOnItem[] } = {
	na: [
		{
			id: 'cloud-edge',
			name: 'Edge Computing',
			description: 'Process data where it is collected',
			icon: edgeIcon,
			priceUsd: 9,
			period: '/month',
			startingFrom: true,
			faqId: 'edge-addon-cloud-what-is',
			faqTooltip: EDGE_TOOLTIP,
		},
		{
			id: 'cloud-trendz',
			name: 'Trendz Analytics',
			description: 'Advanced analytics for your solution',
			icon: trendzIcon,
			priceUsd: 29,
			period: '/month',
			startingFrom: true,
			faqId: 'trendz-what-is',
			faqTooltip: TRENDZ_TOOLTIP,
		},
		{
			id: 'cloud-mobile',
			name: 'White-labeled Mobile App',
			description: 'Customizable mobile application',
			icon: mobileIcon,
			priceUsd: 99,
			period: '/month',
			setupFee: 1000,
			faqId: 'tb-cloud-what-is-included-in-the-white-labeled-mobile-app-add-on',
			faqTooltip: MOBILE_TOOLTIP,
		},
	],
	eu: [
		{
			id: 'cloud-edge-eu',
			name: 'Edge Computing',
			description: 'Process data where it is collected',
			icon: edgeIcon,
			priceUsd: '\u20AC9',
			period: '/month',
			startingFrom: true,
			faqId: 'edge-addon-cloud-what-is',
			faqTooltip: EDGE_TOOLTIP,
		},
		{
			id: 'cloud-trendz-eu',
			name: 'Trendz Analytics',
			description: 'Advanced analytics for your solution',
			icon: trendzIcon,
			priceUsd: '\u20AC28',
			period: '/month',
			startingFrom: true,
			faqId: 'trendz-what-is',
			faqTooltip: TRENDZ_TOOLTIP,
		},
		{
			id: 'cloud-mobile-eu',
			name: 'White-labeled Mobile App',
			description: 'Customizable mobile application',
			icon: mobileIcon,
			priceUsd: '\u20AC95',
			period: '/month',
			setupFee: 969,
			setupFeeCurrency: '€',
			faqId: 'tb-cloud-what-is-included-in-the-white-labeled-mobile-app-add-on',
			faqTooltip: MOBILE_TOOLTIP,
		},
	],
};
