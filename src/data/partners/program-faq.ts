import type { ProgramFaqCategory } from './types';

export const PROGRAM_FAQ: ProgramFaqCategory[] = [
	{
		title: 'Business',
		items: [
			{
				question: 'Who is eligible to become a Hardware Partner?',
				answer:
					'We welcome hardware manufacturers and hardware reseller companies to become ThingsBoard Partners.',
			},
			{
				question: 'Why should I become a Hardware Partner?',
				answer:
					'You will be listed on ThingsBoard website and become visible to existing and new ThingsBoard users which drives new business opportunities. Besides, you will get access to ThingsBoard Partner Portal where you can connect your device to the cloud and use this portal for demonstration and sales purposes.',
			},
			{
				question: 'Are there fees to becoming a Hardware Partner?',
				answer:
					'There are three different partnership levels listed above. Silver Partnership does not require any fees but assumes you have basic ThingsBoard knowledge and will prepare the online tutorial and demo dashboard on your own. Gold and Platinum Partnership levels introduce yearly fees and thus include our support services and help with preparing online tutorials and dashboards.',
			},
		],
	},
	{
		title: 'Technical',
		items: [
			{
				question: 'How can I enable free trial?',
				answer:
					'See the <a href="/docs/getting-started-guides/connectivity/">connectivity diagram</a> to get started and contact us if you have any questions.',
			},
			{
				question:
					'What if my device uses custom TCP or UDP based protocol instead of HTTP or MQTT?',
				answer:
					'Please contact us and supply your company info, numbers of devices produced and technical documentation about your protocol and we will provide multiple options how to connect your device.',
			},
			{
				question: 'How to connect my LoRaWAN device?',
				answer:
					'ThingsBoard supports <a href="/docs/user-guide/integrations/">integrations</a> with popular LoRaWAN network servers like <a href="/docs/user-guide/integrations/thingpark/">Actility ThingPark</a> and <a href="/docs/user-guide/integrations/ttn/">TheThingsNetwork</a>. You can also use generic integrations like <a href="/docs/user-guide/integrations/http/">HTTP</a> or <a href="/docs/user-guide/integrations/mqtt/">MQTT</a>. Once you stream data from your device to ThingsBoard, you will need to create a data converter to parse binary payload and extract meaningful information. We can assist you or even create the converters for you.',
			},
			{
				question: 'How to connect my Sigfox device?',
				answer:
					'ThingsBoard supports <a href="/docs/user-guide/integrations/sigfox/">Sigfox</a> integration. Once you stream data from your Sigfox backend to ThingsBoard, you will need to create a data converter to parse binary payload and extract meaningful information. We can assist you or even create the converters for you.',
			},
		],
	},
];
