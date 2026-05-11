import type { CommunityEditionData } from './types';

export const tbmqCeData: CommunityEditionData = {
	title: 'Your free ticket to IoT',
	description:
		'Community Edition is the fastest way to explore TBMQ, the open-source MQTT broker built for your success. TBMQ is engineered with massive scalability, fault-tolerance, and durability as core features, ensuring reliable messaging at any scale \u2014 from small pilots to millions of MQTT clients. It delivers millions of messages per second with very low latency while efficiently managing millions of concurrent client connections.',
	features: [
		'Unlimited sessions',
		'Unlimited message throughput',
		'Unlimited software updates',
		'Ability to contribute',
		'Community support',
	],
	ctaText: 'Install',
	ctaHref: '/docs/mqtt-broker/install/',
};
