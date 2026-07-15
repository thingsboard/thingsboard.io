import type { CloudRegionData, TopUpGroup } from './types';

const DATA_POINT_TOOLTIP =
	'A data point is defined as a single telemetry measurement (e.g., temperature=22). Your monthly allowance covers all incoming data across your device fleet. Additional Traffic Packs are available on-demand. See full details on the <a class="pricing-paas-link" data-paas-path="/reference/subscriptions/" href="/docs/paas/reference/subscriptions/" target="_blank" rel="noopener noreferrer">plans definition page</a>.';

export const tbCloudData: CloudRegionData = {
	na: {
		sectionTitle: 'Subscription plans',
		sectionSubtitle: 'All subscription plans include hosting and email costs.',
		plans: [
			{
				name: 'Free',
				description: 'Start exploring features',
				price: 0,
				currency: '$',
				period: '/month',
				ctaText: 'Start Free',
				ctaHref: 'https://thingsboard.cloud/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_Cloud_Maker',
				features: [
					{ text: '5 devices' },
					{ text: '5 assets' },
					{
						text: '1M data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Community support',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Leverage the collective expertise of the ThingsBoard community. Report bugs, request features, and find technical solutions alongside thousands of developers on our <a href="https://github.com/thingsboard/thingsboard/issues" target="_blank" rel="noopener noreferrer">GitHub Issues page</a>.',
					},
					{ text: '', noIcon: true },
					{ text: '', noIcon: true },
				],
			},
			{
				name: 'Prototype',
				description: 'For PoCs and MVPs',
				price: 49,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://thingsboard.cloud/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_Cloud_Prototype',
				features: [
					{ text: '50 devices' },
					{ text: '50 assets' },
					{
						text: '10M data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Community support',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Leverage the collective expertise of the ThingsBoard community. Report bugs, request features, and find technical solutions alongside thousands of developers on our <a href="https://github.com/thingsboard/thingsboard/issues" target="_blank" rel="noopener noreferrer">GitHub Issues page</a>.',
					},
					{ text: '', noIcon: true },
					{ text: '', noIcon: true },
				],
			},
			{
				name: 'Pilot',
				description: 'For upcoming IoT Unicorns',
				price: 149,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://thingsboard.cloud/signup',
				ctaPrimary: true,
				popular: true,
				gtmId: 'Pricing_PE_Cloud_Pilot',
				features: [
					{ text: '100 devices' },
					{ text: '100 assets' },
					{
						text: '100M data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Help desk',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Official technical support channel for priority assistance. Get expert guidance to accelerate your rollout and optimize platform usage.',
					},
					{
						text: 'White labeling',
						highlight: true,
						faqId: 'tb-cloud-white-labeling',
					},
					{ text: '', noIcon: true },
				],
			},
			{
				name: 'Startup',
				description: 'Defined long term projects',
				price: 399,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://thingsboard.cloud/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_Cloud_Startup',
				features: [
					{ text: '500 devices' },
					{ text: '500 assets' },
					{
						text: '500M data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Priority help desk',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Get priority handling in the support desk\u2014faster response, faster resolution, and fewer blockers as you scale and run production workloads.',
					},
					{
						text: 'White labeling',
						highlight: true,
						faqId: 'tb-cloud-white-labeling',
						faqTooltip:
							'Brand the platform as your own. Fully customize it with your own logo, domain, color scheme, and menu items.',
					},
					{ text: '', noIcon: true },
				],
			},
			{
				name: 'Business',
				description: 'Built for scalable IoT growth',
				price: 749,
				currency: '$',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://thingsboard.cloud/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_Cloud_Business',
				features: [
					{ text: '1,000 devices' },
					{ text: '1,000 assets' },
					{
						text: '1B data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Priority help desk',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Get priority handling in the support desk\u2014faster response, faster resolution, and fewer blockers as you scale and run production workloads.',
					},
					{
						text: 'White labeling',
						highlight: true,
						faqId: 'tb-cloud-white-labeling',
						faqTooltip:
							'Brand the platform as your own. Fully customize it with your own logo, domain, color scheme, and menu items.',
					},
					{
						text: '$0.30 /extra device',
						highlight: true,
						plusIcon: true,
						faqId: 'tb-cloud-exceed-plan-limits',
						faqTooltip:
							'Supports scaling up to 5,000 devices. For large-scale deployments exceeding this, a <a target="_blank" href="/pricing/?section=thingsboard-pe-options&product=thingsboard-private-cloud" rel="noopener noreferrer">Private Cloud</a> transition is recommended for enhanced cost-efficiency and dedicated resources.',
					},
				],
			},
		],
	},
	eu: {
		sectionTitle: 'Subscription plans',
		sectionSubtitle: 'All subscription plans include hosting and email costs.',
		plans: [
			{
				name: 'Free',
				description: 'Start exploring features',
				price: 0,
				currency: '\u20AC',
				period: '/month',
				ctaText: 'Start Free',
				ctaHref: 'https://eu.thingsboard.cloud/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_Cloud_Maker_EU',
				features: [
					{ text: '5 devices' },
					{ text: '5 assets' },
					{
						text: '1M data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Community support',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Leverage the collective expertise of the ThingsBoard community. Report bugs, request features, and find technical solutions alongside thousands of developers on our <a href="https://github.com/thingsboard/thingsboard/issues" target="_blank" rel="noopener noreferrer">GitHub Issues page</a>.',
					},
					{ text: '', noIcon: true },
					{ text: '', noIcon: true },
				],
			},
			{
				name: 'Prototype',
				description: 'For PoCs and MVPs',
				price: 45,
				currency: '\u20AC',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://eu.thingsboard.cloud/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_Cloud_Prototype_EU',
				features: [
					{ text: '50 devices' },
					{ text: '50 assets' },
					{
						text: '10M data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Community support',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Leverage the collective expertise of the ThingsBoard community. Report bugs, request features, and find technical solutions alongside thousands of developers on our <a href="https://github.com/thingsboard/thingsboard/issues" target="_blank" rel="noopener noreferrer">GitHub Issues page</a>.',
					},
					{ text: '', noIcon: true },
					{ text: '', noIcon: true },
				],
			},
			{
				name: 'Pilot',
				description: 'For upcoming IoT Unicorns',
				price: 145,
				currency: '\u20AC',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://eu.thingsboard.cloud/signup',
				ctaPrimary: true,
				popular: true,
				gtmId: 'Pricing_PE_Cloud_Pilot_EU',
				features: [
					{ text: '100 devices' },
					{ text: '100 assets' },
					{
						text: '100M data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Help desk',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Official technical support channel for priority assistance. Get expert guidance to accelerate your rollout and optimize platform usage.',
					},
					{
						text: 'White labeling',
						highlight: true,
						faqId: 'tb-cloud-white-labeling',
					},
					{ text: '', noIcon: true },
				],
			},
			{
				name: 'Startup',
				description: 'Defined long term projects',
				price: 385,
				currency: '\u20AC',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://eu.thingsboard.cloud/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_Cloud_Startup_EU',
				features: [
					{ text: '500 devices' },
					{ text: '500 assets' },
					{
						text: '500M data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Priority help desk',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Get priority handling in the support desk\u2014faster response, faster resolution, and fewer blockers as you scale and run production workloads.',
					},
					{
						text: 'White labeling',
						highlight: true,
						faqId: 'tb-cloud-white-labeling',
						faqTooltip:
							'Brand the platform as your own. Fully customize it with your own logo, domain, color scheme, and menu items.',
					},
					{ text: '', noIcon: true },
				],
			},
			{
				name: 'Business',
				description: 'Built for scalable IoT growth',
				price: 725,
				currency: '\u20AC',
				period: '/month',
				ctaText: 'Get started',
				ctaHref: 'https://eu.thingsboard.cloud/signup',
				ctaPrimary: false,
				gtmId: 'Pricing_PE_Cloud_Business_EU',
				features: [
					{ text: '1,000 devices' },
					{ text: '1,000 assets' },
					{
						text: '1B data points/mo',
						faqId: 'tb-cloud-device-msg-data-storage-limits-for-plans',
						faqTooltip:
							DATA_POINT_TOOLTIP,
					},
					{
						text: 'Priority help desk',
						faqId: 'tb-cloud-support-included',
						faqTooltip:
							'Get priority handling in the support desk\u2014faster response, faster resolution, and fewer blockers as you scale and run production workloads.',
					},
					{
						text: 'White labeling',
						highlight: true,
						faqId: 'tb-cloud-white-labeling',
						faqTooltip:
							'Brand the platform as your own. Fully customize it with your own logo, domain, color scheme, and menu items.',
					},
					{
						text: '\u20AC0.30 /extra device',
						highlight: true,
						plusIcon: true,
						faqId: 'tb-cloud-exceed-plan-limits',
						faqTooltip:
							'Supports scaling up to 5,000 devices. For large-scale deployments exceeding this, a <a target="_blank" href="/pricing/?section=thingsboard-pe-options&product=thingsboard-private-cloud" rel="noopener noreferrer">Private Cloud</a> transition is recommended for enhanced cost-efficiency and dedicated resources.',
					},
				],
			},
		],
	},
};

export const tbCloudTopUps: { na: TopUpGroup[]; eu: TopUpGroup[] } = {
	na: [
		{
			title: 'Entities',
			items: [
				{
					name: 'Extra Device pack',
					priceUsd: '$15',
					period: '/month',
					details: [
						{ label: 'Devices', value: '+50 Devices' },
						{ label: 'Assets', value: '+50 Assets' },
					],
				},
				{
					name: 'Extra Customer pack',
					priceUsd: '$10',
					period: '/month',
					details: [
						{ label: 'Customers', value: '+10 Customers' },
						{ label: 'Users', value: '+10 Users' },
					],
				},
				{
					name: 'Extra Integration pack',
					priceUsd: '$10',
					period: '/month',
					details: [
						{ label: 'Integrations', value: '+1 Integration' },
						{ label: 'Converters', value: '+3 Converters' },
					],
				},
				{
					name: 'Extra Calculated Field',
					priceUsd: '$5',
					period: '/month',
					details: [
						{ label: 'Max Calculated Fields per entity', value: '+1 Calculated Field' },
					],
				},
			],
		},
		{
			title: 'API calls',
			items: [
				{
					name: 'Traffic pack',
					priceUsd: '$5',
					period: '/month',
					details: [
						{ label: 'Transport messages', value: '+2.5M Transport messages' },
						{ label: 'Transport data points', value: '+5M Transport data points' },
					],
				},
				{
					name: 'Compute pack',
					priceUsd: '$25',
					period: '/month',
					details: [
						{ label: 'Rule engine executions', value: '+5M Rule engine executions' },
						{ label: 'JS function executions', value: '+1M JS function executions' },
					],
				},
				{
					name: 'Storage pack',
					priceUsd: '$10',
					period: '/month',
					details: [
						{ label: 'Data points storage days', value: '+1B Data points storage days' },
					],
				},
				{
					name: 'Alarm pack',
					priceUsd: '$1',
					period: '/month',
					details: [{ label: 'Alarms created', value: '+1000 Alarms created' }],
				},
				{
					name: 'Email pack',
					priceUsd: '$1',
					period: '/month',
					details: [{ label: 'Emails', value: '+1000 Emails' }],
				},
				{
					name: 'SMS pack',
					priceUsd: '$15',
					period: '/month',
					details: [{ label: 'SMS', value: '+100 SMS' }],
				},
				{
					name: 'AI Credits Pack',
					priceUsd: '$5',
					period: '/month',
					details: [{ label: 'AI credits', value: '+1M AI credits' }],
				},
			],
		},
	],
	eu: [
		{
			title: 'Entities',
			items: [
				{
					name: 'Extra Device pack',
					priceUsd: '€15',
					period: '/month',
					details: [
						{ label: 'Devices', value: '+50 Devices' },
						{ label: 'Assets', value: '+50 Assets' },
					],
				},
				{
					name: 'Extra Customer pack',
					priceUsd: '€10',
					period: '/month',
					details: [
						{ label: 'Customers', value: '+10 Customers' },
						{ label: 'Users', value: '+10 Users' },
					],
				},
				{
					name: 'Extra Integration pack',
					priceUsd: '€10',
					period: '/month',
					details: [
						{ label: 'Integrations', value: '+1 Integration' },
						{ label: 'Converters', value: '+3 Converters' },
					],
				},
				{
					name: 'Extra Calculated Field',
					priceUsd: '€5',
					period: '/month',
					details: [
						{ label: 'Max Calculated Fields per entity', value: '+1 Calculated Field' },
					],
				},
			],
		},
		{
			title: 'API calls',
			items: [
				{
					name: 'Traffic pack',
					priceUsd: '€5',
					period: '/month',
					details: [
						{ label: 'Transport messages', value: '+2.5M Transport messages' },
						{ label: 'Transport data points', value: '+5M Transport data points' },
					],
				},
				{
					name: 'Compute pack',
					priceUsd: '€25',
					period: '/month',
					details: [
						{ label: 'Rule engine executions', value: '+5M Rule engine executions' },
						{ label: 'JS function executions', value: '+1M JS function executions' },
					],
				},
				{
					name: 'Storage pack',
					priceUsd: '€10',
					period: '/month',
					details: [
						{ label: 'Data points storage days', value: '+1B Data points storage days' },
					],
				},
				{
					name: 'Alarm pack',
					priceUsd: '€1',
					period: '/month',
					details: [{ label: 'Alarms created', value: '+1000 Alarms created' }],
				},
				{
					name: 'Email pack',
					priceUsd: '€1',
					period: '/month',
					details: [{ label: 'Emails', value: '+1000 Emails' }],
				},
				{
					name: 'SMS pack',
					priceUsd: '€15',
					period: '/month',
					details: [{ label: 'SMS', value: '+100 SMS' }],
				},
				{
					name: 'AI Credits Pack',
					priceUsd: '€5',
					period: '/month',
					details: [{ label: 'AI credits', value: '+1M AI credits' }],
				},
			],
		},
	],
};
