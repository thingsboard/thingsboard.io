import type { PrivateCloudData } from './types';

export const tbmqPrivateCloudData: PrivateCloudData = {
	sectionTitle: 'Your private MQTT broker instance',
	sectionSubtitle:
		'We host your own private MQTT broker instance, so you can focus on building your solutions.',
	billingOptions: { monthly: 'Monthly', annual: 'Annual' },
	plans: [
		{
			name: 'TBMQ Cloud',
			description: 'Managed MQTT broker',
			price: 500,
			currency: '$',
			period: '/month base',
			ctaText: 'Get started',
			ctaHref: 'https://license.thingsboard.io/signup',
			ctaPrimary: true,
			features: [
				{
					text: '5,000 sessions included',
					faqTooltip:
						'Total unique logical states managed by the broker (identified by Client ID). Active connections and disconnected clients with persistent sessions both occupy quota slots.',
				},
				{
					text: '$0.05 per extra session',
					plusIcon: true,
					highlight: true,
					faqTooltip:
						'Sessions exceeding the included number are billed at a per-session, per-month rate.',
				},
				{
					text: '1,000 msg/sec throughput included',
					faqTooltip:
						'Combined number of MQTT PUBLISH packets processed per second, including both incoming (publisher) and outgoing (subscriber) messages.',
				},
				{
					text: '$0.10 per extra msg/sec',
					plusIcon: true,
					highlight: true,
					faqTooltip:
						'Throughput capacity exceeding the included amount is billed at a per-msg/sec, per-month rate.',
				},
				{
					text: '200 GB network traffic included',
					faqTooltip:
						'Expand your data transfer capacity beyond the included limit to ensure uninterrupted connectivity as your message volume scales.',
				},
				{
				text: '$0.10 per extra GB',
				plusIcon: true,
				faqTooltip:
					'Network traffic exceeding the included 200 GB allowance is billed per GB per month.',
			},
				{
					text: 'Multi-AZ replication: +$400/mo',
					faqTooltip:
						'Enable high availability (HA) and fault tolerance with deployment across multiple availability zones and a guaranteed uptime SLA.',
				},
			],
		},
	],
};
