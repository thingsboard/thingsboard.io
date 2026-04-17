export interface TbmqNewsItem {
	image: string;
	imageAlt: string;
	tag: string;
	tagHref: string;
	title: string;
	href: string;
	excerpt: string;
}

export const tbmqNews: TbmqNewsItem[] = [
	{
		image: '/src/assets/images/landings/mqtt-broker/news-1.webp',
		imageAlt: 'TBMQ 2.2: Strengthening MQTT security with JWT and Client Blocking',
		tag: 'Updates',
		tagHref: '/blog/?category=updates',
		title: 'TBMQ 2.2: Strengthening MQTT security with JWT and Client Blocking',
		href: '/blog/tbmq-2-2-strengthening-mqtt-security-with-jwt-and-client-blocking/',
		excerpt:
			"We're excited to announce the release of TBMQ 2.2.0! This release brings powerful new features that make TBMQ more secure, resilient, and easier to operate in production at scale.",
	},
	{
		image: '/src/assets/images/landings/mqtt-broker/news-4.webp',
		imageAlt: 'TBMQ 2.1: New chapter in MQTT messaging with embedded Integrations',
		tag: 'Updates',
		tagHref: '/blog/?category=updates',
		title: 'TBMQ 2.1: New chapter in MQTT messaging with embedded Integrations',
		href: '/blog/tbmq-2-1-new-chapter-in-mqtt-messaging-with-embedded-integrations/',
		excerpt:
			"We're excited to announce the release of TBMQ 2.1.0! This version marks a major milestone by introducing the Integration Executor microservice, responsible for managing integrations.",
	},
	{
		image: '/src/assets/images/landings/mqtt-broker/news-3.webp',
		imageAlt: 'TBMQ one million messages per second',
		tag: 'Tech',
		tagHref: '/blog/?category=tech',
		title: '1 Million reasons to choose TBMQ as a high-performance MQTT broker',
		href: '/blog/1-million-reasons-to-choose-tbmq-as-high-performance-mqtt-broker/',
		excerpt:
			'Can an open-source MQTT broker handle one million messages per second for persistent sessions? TBMQ 2.x proves it can!',
	},
	{
		image: '/src/assets/images/landings/mqtt-broker/news-2.webp',
		imageAlt: 'TBMQ 2.0.0 release',
		tag: 'Updates',
		tagHref: '/blog/?category=updates',
		title: 'TBMQ 2.0.0 release: migration to Redis, MQTT 5.0 support, and more',
		href: '/blog/tbmq-2-0-migration-to-redis-mqtt-5-0-support-and-more/',
		excerpt:
			'TBMQ 2.0.0 release brings a major update with data migration of persistent sessions for devices from PostgreSQL to Redis.',
	},
];