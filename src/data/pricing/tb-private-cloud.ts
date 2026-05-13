import type { PrivateCloudData, AddOnItem } from './types';

import edgeIcon from '../../assets/pricing/edge-add-on-icon.svg?raw';
import trendzIcon from '../../assets/pricing/trendz-add-on-icon.svg?raw';
import mobileIcon from '../../assets/pricing/wl-add-on-icon.svg?raw';

export const tbPrivateCloudData: PrivateCloudData = {
	sectionTitle: 'Choose your plan',
	sectionSubtitle:
		'All-inclusive hosting and infrastructure, so you can focus on building your solutions.',
	billingOptions: { monthly: 'Monthly', annual: 'Annual', discount: '10% off' },
	plans: [
		{
			name: 'Launch',
			description: 'Suitable for pilots and early stage deployments.',
			price: 1499,
			annualPrice: 1349,
			currency: '$',
			period: '/month',
			ctaText: 'Get Started',
			ctaHref: '/contact-us/?subject=Private%20Cloud&pcorder&message=I%20am%20interested%20in%20Launch%20plan%20for%20Private%20Cloud',
			ctaPrimary: true,
			popular: true,
			gtmId: 'Pricing_PE_PrivateCloud_Launch',
			features: [
				{ text: '5,000 devices included' },
				{ text: '99.9% uptime guarantee' },
				{
					text: '50,000 msg/minute',
					faqId: 'tb-private-cloud-how-are-datapoints-defined-and-metered',
					faqTooltip:
						'Calculated as the sum of all telemetry data points (key/value pairs) plus any messages without measurements (like RPC calls). This aggregate reflects your real-time platform throughput.',
				},
				{
					text: '500 GB of storage included',
					faqId: 'tb-private-cloud-what-telemetry-storage-is-included-and-what-data-consumes-it',
					faqTooltip:
						'Includes 500 GB to store your platform data (telemetry, attributes, events, files). Near the limit: prune old data, add storage, or upgrade plan.',
				},
				{
					text: '$0.10 /extra device',
					plusIcon: true,
					highlight: true,
					faqId: 'tb-private-cloud-what-happens-if-i-exceed-my-included-device-limit',
					faqTooltip:
						'You can add more devices anytime. After 5,000 included devices, extra devices are $0.10 per device per month.',
				},
			],
			productId: 'tb-private-cloud',
		},
		{
			name: 'Growth',
			description: 'Perfect for fast-growing deployments \u2014 adds capacity as you expand.',
			price: 2199,
			annualPrice: 1979,
			currency: '$',
			period: '/month',
			ctaText: 'Get Started',
			ctaHref: '/contact-us/?subject=Private%20Cloud&pcorder&message=I%20am%20interested%20in%20Growth%20plan%20for%20Private%20Cloud',
			ctaPrimary: false,
			gtmId: 'Pricing_PE_PrivateCloud_Growth',
			features: [
				{ text: '25,000 devices included' },
				{ text: '99.9% uptime guarantee' },
				{
					text: '100,000 msg/minute',
					faqId: 'tb-private-cloud-how-are-datapoints-defined-and-metered',
					faqTooltip:
						'Calculated as the sum of all telemetry data points (key/value pairs) plus any messages without measurements (like RPC calls). This aggregate reflects your real-time platform throughput.',
				},
				{
					text: '1 TB of storage included',
					faqId: 'tb-private-cloud-what-telemetry-storage-is-included-and-what-data-consumes-it',
					faqTooltip:
						'Includes 1 TB to store your platform data (telemetry, attributes, events, files). Near the limit: prune old data, add storage, or upgrade plan.',
				},
				{
					text: '$0.09 /extra device',
					plusIcon: true,
					highlight: true,
					faqId: 'tb-private-cloud-what-happens-if-i-exceed-my-included-device-limit',
					faqTooltip:
						'You can add more devices anytime. After 25,000 included devices, extra devices are $0.09 per device per month.',
				},
			],
			productId: 'tb-private-cloud',
		},
		{
			name: 'Scale',
			description: 'Designed for mission-critical, high-scale workloads.',
			price: 3999,
			annualPrice: 3599,
			currency: '$',
			period: '/month',
			ctaText: 'Get Started',
			ctaHref: '/contact-us/?subject=Private%20Cloud&pcorder&message=I%20am%20interested%20in%20Scale%20plan%20for%20Private%20Cloud',
			ctaPrimary: false,
			gtmId: 'Pricing_PE_PrivateCloud_Scale',
			features: [
				{ text: '50,000 devices included' },
				{ text: '99.95% uptime guarantee' },
				{
					text: '500,000 msg/minute',
					faqId: 'tb-private-cloud-how-are-datapoints-defined-and-metered',
					faqTooltip:
						'Calculated as the sum of all telemetry data points (key/value pairs) plus any messages without measurements (like RPC calls). This aggregate reflects your real-time platform throughput.',
				},
				{
					text: '2 TB of storage included',
					faqId: 'tb-private-cloud-what-telemetry-storage-is-included-and-what-data-consumes-it',
					faqTooltip:
						'Includes 2 TB to store your platform data (telemetry, attributes, events, files). Near the limit: prune old data, add storage, or upgrade plan.',
				},
				{
					text: '$0.08 /extra device',
					plusIcon: true,
					highlight: true,
					faqId: 'tb-private-cloud-what-happens-if-i-exceed-my-included-device-limit',
					faqTooltip:
						'You can add more devices anytime. After 50,000 included devices, extra devices are $0.08 per device per month.',
				},
			],
			productId: 'tb-private-cloud',
		},
		{
			name: 'Enterprise',
			description: 'Tailored architecture, pricing, and SLAs to fit your business.',
			price: null,
			priceFaqId: 'tb-private-cloud-what-features-are-unique-to-the-enterprise-plan',
			priceFaqTooltip: 'Enterprise pricing built around your scale. Share your devices, msg/min, and retention and we\u2019ll right-size the architecture and quote the best-fit package.',
			currency: '$',
			period: '',
			ctaText: 'Contact Us',
			ctaHref: '/contact-us/?subject=Private%20Cloud&pcorder&message=I%20am%20interested%20in%20Enterprise%20plan%20for%20Private%20Cloud',
			ctaPrimary: false,
			gtmId: 'Pricing_PE_PrivateCloud_Enterprise',
			features: [
				{ text: '100,000 devices included' },
				{ text: 'Custom SLA' },
				{ text: 'Unlimited message rate' },
				{ text: 'Unlimited storage' },
				{
					text: '<$0.05 /extra device',
					plusIcon: true,
					highlight: true,
					faqId: 'tb-private-cloud-what-happens-if-i-exceed-my-included-device-limit',
					faqTooltip:
						'Need more than 100,000 devices? Extra devices are < $0.05/device/month \u2014 contact us for the best rate.',
				},
			],
		},
	],
};

/** Annual billing discount (10%) */
export const PC_ANNUAL_DISCOUNT = 0.1;

export const PC_MSG_PER_DEVICE_OPTIONS = [
	{ label: '1 per hour', value: 1 / 60 },
	{ label: '1 per 5 min', value: 1 / 5 },
	{ label: '1 per min', value: 1 },
	{ label: '1 per 10 sec', value: 6 },
	{ label: '1 per sec', value: 60 },
] as const;

export const PC_PLAN_TIERS = [
	{ name: 'Launch', maxDevices: 5000, maxMsgPerMin: 50000, storageGB: 512 },
	{ name: 'Growth', maxDevices: 25000, maxMsgPerMin: 100000, storageGB: 1024 },
	{ name: 'Scale', maxDevices: 50000, maxMsgPerMin: 500000, storageGB: 2048 },
] as const;

export const tbPrivateCloudAddOns: AddOnItem[] = [
	{
		id: 'pc-edge',
		name: 'Edge Computing',
		description: 'Process data where it is collected',
		icon: edgeIcon,
		priceUsd: 249,
		period: '/month',
		startingFrom: true,
		faqId: 'tb-private-cloud-edge-addon-cloud-what-is',
		faqTooltip: 'Run a local on-prem instance to keep operations running even when the internet is down.',
	},
	{
		id: 'pc-trendz',
		name: 'Trendz Analytics',
		description: 'Advanced analytics for your solution',
		icon: trendzIcon,
		priceUsd: 449,
		period: '/month',
		startingFrom: true,
		faqId: 'tb-private-cloud-trendz-what-is',
		faqTooltip: 'Turn raw IoT data into actionable insights with advanced analytics and trend prediction.',
	},
	{
		id: 'pc-mobile',
		name: 'White-labeled Mobile App',
		description: 'Customizable mobile application',
		icon: mobileIcon,
		priceUsd: 99,
		period: '/month',
		setupFee: 1000,
		faqId: 'tb-private-cloud-what-is-included-in-the-white-labeled-mobile-app-add-on',
		faqTooltip:
			'Launch a client-ready mobile app under your brand \u2014 your name, logo, colors, and a fully polished look & feel \u2014 so customers experience your product, not a third-party app.',
	},
];
