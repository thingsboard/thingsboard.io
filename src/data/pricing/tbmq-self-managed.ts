import type { SelfManagedData } from './types';

export const tbmqSelfManagedData: SelfManagedData = {
	payg: {
		sectionTitle: 'Pay-as-you-go',
		sectionSubtitle: 'Flexible monthly licensing for TBMQ PE.',
		plans: [
			{
				name: 'TBMQ PE',
				description: 'Professional MQTT broker',
				price: 15,
				currency: '$',
				period: '/month base',
				ctaText: 'Get License',
				ctaHref: 'https://license.thingsboard.io/signup',
				ctaPrimary: true,
				features: [
					{
						text: '100 sessions included',
						faqId: 'tbmq-payg-session-def',
						faqTooltip:
							'Total unique logical states managed by the broker (identified by Client ID). Active connections and disconnected clients with persistent sessions both occupy quota slots.',
					},
					{
						text: '$0.05 per extra session',
						plusIcon: true,
						highlight: true,
						faqId: 'tbmq-payg-session-price',
						faqTooltip:
							'Sessions exceeding the subscription plan\'s included number are billed at a per-session, per-month rate.',
					},
					{
						text: '100 msg/sec throughput included',
						faqId: 'tbmq-payg-throughput-def',
						faqTooltip:
							'Combined number of MQTT PUBLISH packets processed per second, including both incoming (publisher) and outgoing (subscriber) messages.',
					},
					{
						text: '$0.10 per extra msg/sec',
						plusIcon: true,
						highlight: true,
						faqId: 'tbmq-payg-throughput-price',
						faqTooltip:
							'Throughput capacity exceeding the subscription plan\'s included amount is billed at a per-msg/sec, per-month rate.',
					},
					{
						text: '1 production instance',
						faqId: 'tbmq-payg-instance-price',
						faqTooltip:
							'Dedicated compute instances for your production environment. Add instances to enable clustering and High Availability (HA).',
					},
					{
						text: 'Community support',
						faqId: 'tbmq-payg-priority-support',
						faqTooltip:
							'Self-service access to public knowledge base, documentation, and community forums.',
					},
				],
				productId: '6d811b30-f5ec-11f0-8e58-abbac8d0a38a',
				planId: 'a2a848b0-f5ec-11f0-8e58-abbac8d0a38a',
			},
		],
	},
	perpetual: {
		sectionTitle: 'Perpetual license',
		sectionSubtitle: 'One-time purchase for TBMQ PE.',
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
		plans: [
			{
				name: 'TBMQ PE',
				description: 'Perpetual MQTT broker license',
				price: 2999,
				currency: '$',
				period: ' one-time',
				ctaText: 'Get License',
				ctaHref: 'https://license.thingsboard.io/signup',
				ctaPrimary: true,
				features: [
					{
						text: '10,000 sessions included',
						faqId: 'tbmq-perp-session-def',
						faqTooltip:
							'Total unique logical states managed by the broker (identified by Client ID). Active connections and disconnected clients with persistent sessions both occupy quota slots.',
					},
					{
						text: '$0.25 per extra session',
						plusIcon: true,
						highlight: true,
						faqId: 'tbmq-perp-session-price',
						faqTooltip:
							'Sessions exceeding the perpetual license\'s included number are billed at a one-time, per-session rate.',
					},
					{
						text: '1,000 msg/sec throughput included',
						faqId: 'tbmq-perp-throughput-def',
						faqTooltip:
							'Combined number of MQTT PUBLISH packets processed per second, including both incoming (publisher) and outgoing (subscriber) messages.',
					},
					{
						text: '$0.50 per extra msg/sec',
						plusIcon: true,
						highlight: true,
						faqId: 'tbmq-perp-throughput-price',
						faqTooltip:
							'Throughput capacity exceeding the perpetual license\'s included amount is billed at a one-time, per-msg/sec rate.',
					},
					{
						text: '1 production instance',
						faqId: 'tbmq-perp-instance-price',
						faqTooltip:
							'Dedicated compute instances for your production environment. Add instances to enable clustering and High Availability (HA).',
					},
					{ text: 'Perpetual usage rights' },
				],
			},
		],
	},
};
