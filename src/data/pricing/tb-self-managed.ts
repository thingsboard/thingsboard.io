import type { SelfManagedData, AddOnItem, CommunityEditionData } from './types';

import edgeIcon from '../../assets/pricing/edge-add-on-icon.svg?raw';
import trendzIcon from '../../assets/pricing/trendz-add-on-icon.svg?raw';
import mobileIcon from '../../assets/pricing/wl-add-on-icon.svg?raw';
import offlineIcon from '../../assets/pricing/offline-add-on-icon.svg?raw';

export const tbSelfManagedData: SelfManagedData = {
	payg: {
		sectionTitle: 'Pay-as-you-go plans',
		sectionSubtitle: 'Flexible monthly licensing for your own infrastructure.',
		plans: [
			{
				name: 'Maker',
				description: 'Start exploring features',
				price: 10,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://license.thingsboard.io/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_SM_Maker',
				features: [
					{ text: '10 devices' },
					{ text: '10 assets' },
					{
						text: '1 production instance',
						faqId: 'pe-pay-as-you-go-production-instances',
						faqTooltip:
							'A single production node to run your solution. Perfect for getting to market quickly. Can be easily expanded into a cluster.',
					},
					{
						text: 'Community support',
						faqId: 'pe-pay-as-you-go-support-included',
						faqTooltip:
							'Leverage the collective expertise of the ThingsBoard community. Report bugs, request features, and find technical solutions alongside thousands of developers on our <a href="https://github.com/thingsboard/thingsboard/issues" target="_blank" rel="noopener noreferrer">GitHub Issues page</a>.',
					},
					{ text: '', noIcon: true },
					{ text: '', noIcon: true },
				],
				productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a',
				planId: 'fe493b90-f5ea-11f0-8e58-abbac8d0a38a',
			},
			{
				name: 'Prototype',
				description: 'For PoCs and MVPs',
				price: 39,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://license.thingsboard.io/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_SM_Prototype',
				features: [
					{ text: '50 devices' },
					{ text: '50 assets' },
					{
						text: '1 production instance',
						faqId: 'pe-pay-as-you-go-production-instances',
						faqTooltip:
							'A single production node to run your solution. Perfect for getting to market quickly. Can be easily expanded into a cluster.',
					},
					{
						text: 'Community support',
						faqId: 'pe-pay-as-you-go-support-included',
						faqTooltip:
							'Leverage the collective expertise of the ThingsBoard community. Report bugs, request features, and find technical solutions alongside thousands of developers on our <a href="https://github.com/thingsboard/thingsboard/issues" target="_blank" rel="noopener noreferrer">GitHub Issues page</a>.',
					},
					{ text: '', noIcon: true },
					{ text: '', noIcon: true },
				],
				productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a',
				planId: '648c95a0-f5eb-11f0-8e58-abbac8d0a38a',
			},
			{
				name: 'Pilot',
				description: 'For upcoming IoT Unicorns',
				price: 99,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://license.thingsboard.io/signup',
				ctaPrimary: true,
				popular: true,
				gtmId: 'Pricing_PE_SM_Pilot',
				features: [
					{ text: '100 devices' },
					{ text: '100 assets' },
					{
						text: '1 production instance',
						faqId: 'pe-pay-as-you-go-production-instances',
						faqTooltip:
							'A single production node to run your solution. Perfect for getting to market quickly. Can be easily expanded into a cluster.',
					},
					{
						text: 'Help desk',
						faqId: 'pe-pay-as-you-go-support-included',
						faqTooltip:
							'Official technical support channel for priority assistance. Get expert guidance to accelerate your rollout and optimize platform usage.',
					},
					{ text: 'White labeling', highlight: true },
					{ text: '', noIcon: true },
				],
				productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a',
				planId: '87f3b1e0-f5eb-11f0-8e58-abbac8d0a38a',
			},
			{
				name: 'Startup',
				description: 'Defined long term projects',
				price: 299,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://license.thingsboard.io/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_SM_Startup',
				features: [
					{ text: '500 devices' },
					{ text: '500 assets' },
					{
						text: '2 production instances',
						faqId: 'pe-pay-as-you-go-production-instances',
						faqTooltip:
							'Enables a basic cluster configuration. Running two nodes provides High Availability (HA) and redundancy, ensuring your platform stays online if one node fails.',
					},
					{
						text: 'Priority help desk',
						faqId: 'pe-pay-as-you-go-support-included',
						faqTooltip:
							'Get priority handling in the support desk \u2014 faster response, faster resolution, and fewer blockers as you scale and run production workloads.',
					},
					{ text: 'White labeling', highlight: true },
					{ text: '', noIcon: true },
				],
				productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a',
				planId: 'b8ad2500-f5eb-11f0-8e58-abbac8d0a38a',
			},
			{
				name: 'Business',
				description: 'Built for scalable IoT growth',
				price: 499,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://license.thingsboard.io/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_SM_Business',
				features: [
					{ text: '1,000 devices' },
					{ text: '1,000 assets' },
					{
						text: '3 production instances',
						faqId: 'pe-pay-as-you-go-production-instances',
						faqTooltip:
							'Supports a robust High Availability (HA) cluster. Three nodes allow for superior horizontal scaling and load balancing, designed for high-traffic environments and maximum uptime.',
					},
					{
						text: 'Priority help desk',
						faqId: 'pe-pay-as-you-go-support-included',
						faqTooltip:
							'Get priority handling in the support desk \u2014 faster response, faster resolution, and fewer blockers as you scale and run production workloads.',
					},
					{ text: 'White labeling', highlight: true },
					{
						text: '$0.1 /extra device',
						highlight: true,
						plusIcon: true,
					},
				],
				productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a',
				planId: 'f4b90050-f5eb-11f0-8e58-abbac8d0a38a',
			},
		],
	},
	perpetual: {
		sectionTitle: 'Perpetual license',
		sectionSubtitle: 'One-time payment, run forever on your infrastructure.',
		plans: [],
		benefits: [
			{
				icon: 'tabler:currency-dollar',
				title: 'Predictable CAPEX',
				description: 'A single, transparent license fee simplifies long-term financial planning.',
			},
			{
				icon: 'tabler:trending-down',
				title: 'Lower TCO',
				description: 'Eliminates recurring subscription fees, offering a lower total cost of ownership for long-term projects.',
			},
			{
				icon: 'tabler:server',
				title: 'On-Premises & Offline Mode',
				description: 'Deploy anywhere, including fully offline or isolated networks for 100% data sovereignty.',
			},
			{
				icon: 'tabler:settings',
				title: 'Customizable License',
				description: 'A flexible license that can be tailored to your exact business strategy.',
			},
		],
	},
};

export const tbPerpetualHero: CommunityEditionData = {
	title: 'Own Your IoT Solution. Perpetually.',
	subtitle:
		'The one-time, enterprise-grade license for maximum security, permanent data control, and predictable costs.',
	description:
		'A perpetual license transforms your core IoT platform into a permanent asset, giving you a predictable financial model and complete control over your technology roadmap. It\u2019s the ideal foundation for a long-term, large-scale enterprise deployment.',
	priceLabel: 'Starting from $4,999',
	features: [
		'Your security policy requires an isolated, on-premises, or development deployment.',
		'Your financial model favors a one-time capital investment (CAPEX) over recurring expenses.',
		'Your business needs a unique, tailored solution, not a one-size-fits-all subscription.',
	],
	ctaText: 'Contact Us',
	ctaHref: '/contact-us/?subject=ThingsBoard%20Products&message=I%20am%20interested%20in%20Self-managed%20perpetual%20license',
};

export const tbSelfManagedAddOns: AddOnItem[] = [
	{
		id: 'sm-edge',
		name: 'Edge Computing',
		description: 'Process data where it is collected',
		icon: edgeIcon,
		priceUsd: 7,
		period: '/month',
		startingFrom: true,
		faqId: 'edge-addon-payg-what-is',
		faqTooltip: 'Run a local on-prem instance to keep operations running even when the internet is down.',
	},
	{
		id: 'sm-trendz',
		name: 'Trendz Analytics',
		description: 'Advanced analytics for your solution',
		icon: trendzIcon,
		priceUsd: 12,
		period: '/month',
		startingFrom: true,
		faqId: 'trendz-payg-what-is',
		faqTooltip: 'Turn raw IoT data into actionable insights with advanced analytics and trend prediction.',
	},
	{
		id: 'sm-mobile',
		name: 'White-labeled Mobile App',
		description: 'Customizable mobile application',
		icon: mobileIcon,
		priceUsd: 99,
		period: '/month',
		setupFee: 1000,
		faqId: 'pe-pay-as-you-go-what-is-included-in-the-white-labeled-mobile-app-add-on',
		faqTooltip:
			'Launch a client-ready mobile app under your brand \u2014 your name, logo, colors, and a fully polished look & feel \u2014 so customers experience your product, not a third-party app.',
	},
];

export const tbPerpetualAddOns: AddOnItem[] = [
	{
		id: 'perp-edge',
		name: 'Edge Computing',
		description: 'Process data where it is collected.',
		icon: edgeIcon,
		priceUsd: 849,
		period: '',
		startingFrom: true,
		faqId: 'edge-addon-payg-what-is',
		faqTooltip: 'Deploy and manage Edge instances at remote locations for offline operation, local processing, and automatic cloud sync.',
	},
	{
		id: 'perp-trendz',
		name: 'Trendz Analytics',
		description: 'Advanced analytics for your solution.',
		icon: trendzIcon,
		priceUsd: 1499,
		period: '',
		startingFrom: true,
		faqId: 'trendz-payg-what-is',
		faqTooltip: 'Advanced analytics for data insights, custom dashboards, and trend discovery.',
	},
	{
		id: 'perp-offline',
		name: 'Offline Mode',
		description: 'Full functionality without internet.',
		icon: offlineIcon,
		priceUsd: '$19 999',
		period: '',
		faqId: 'perp-offline-mode',
		faqTooltip: 'Enables full platform functionality in environments without internet connection.',
	},
];
