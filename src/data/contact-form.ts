/** The Contact us form's topics and device counts, and its hand-off to the thank-you page. */

interface ContactTopic {
	/** What the form submits and `?subject=` links match: never changes. */
	value: string;
	label: string;
	/** The message placeholder for this topic. */
	prompt: string;
	/** Asks the device count too: the fleet's size shapes the answer. */
	devices?: true;
}

export const SUPPORT_PORTAL_URL = 'https://thingsboard-portal.atlassian.net/servicedesk/customer/portal/1';
export const GITHUB_ISSUES_URL = 'https://github.com/thingsboard/thingsboard/issues';

export const DEFAULT_PROMPT =
	'What you’re working on, where you’d like it to run, and any timeline you have in mind.';

/** The topic that points to the Support portal. */
export const SUPPORT_TOPIC = 'Technical Support';
/** A broker counts connected clients, not devices. */
export const CLIENTS_TOPIC = 'TBMQ';

export const CONTACT_TOPICS: { group: string; options: ContactTopic[] }[] = [
	{
		group: 'Products and plans',
		options: [
			{
				value: 'ThingsBoard Products',
				label: 'ThingsBoard products and plans',
				prompt: 'What you’re building, and whether you’d like us to host it or run it yourself.',
				devices: true,
			},
			{
				value: 'Private Cloud',
				label: 'Private Cloud',
				prompt: 'Your message volume, your preferred region, and when you’d like to go live.',
				devices: true,
			},
			{
				value: 'Deployment Options',
				label: 'Deployment options',
				prompt: 'Where you’d like to run ThingsBoard: our cloud, your servers or at the edge.',
				devices: true,
			},
			{
				value: CLIENTS_TOPIC,
				label: 'TBMQ MQTT broker',
				prompt: 'Your message throughput, and whether you’d host the broker yourself.',
				devices: true,
			},
			{
				value: 'Community Grant',
				label: 'Community Grant Program',
				prompt: 'Your deployment (its version and production servers) and your question about the grant.',
				devices: true,
			},
		],
	},
	{
		group: 'Services',
		options: [
			{
				value: 'Professional Services',
				label: 'Professional services',
				prompt: 'What you’d like a hand with: architecture, a review, a migration or a rollout.',
				devices: true,
			},
			{
				value: 'Custom Development Service',
				label: 'Custom development',
				prompt: 'What you’d like built (a widget, an integration, a white-label app) and your timeline.',
				devices: true,
			},
			{
				value: 'Training',
				label: 'Training',
				prompt: 'Who’s taking part, how many people, and the topics you want to cover.',
			},
		],
	},
	{
		group: 'Support',
		options: [
			{
				value: SUPPORT_TOPIC,
				label: 'Technical support',
				prompt: 'Your edition and version, what you expected, and what happened instead. Error messages help.',
			},
		],
	},
	{
		group: 'Everything else',
		options: [
			{
				value: 'IoT Hub',
				label: 'IoT Hub',
				prompt: 'What you’d like to list or ask about (a device, a widget, a solution), with a link if you have one.',
			},
			{
				value: 'Partnership',
				label: 'Partnership',
				prompt: 'Your company, who you serve, and the kind of partnership you have in mind.',
			},
			{
				value: 'Press or Analyst Inquiry',
				label: 'Press or analyst inquiry',
				prompt: 'Your publication or firm, the story or report, and your deadline.',
			},
			{
				value: 'General Feedback',
				label: 'General feedback',
				prompt: 'What’s working for you, what isn’t, and what you’d change.',
			},
			{ value: 'Other', label: 'Something else', prompt: DEFAULT_PROMPT },
		],
	},
];

/**
 * The device slider's stops, after the pricing plans' device limits. Stop 0 is "not sure" and sends
 * nothing.
 */
export const DEVICE_STEPS = [
	'',
	'Under 100',
	'100–1,000',
	'1,000–5,000',
	'5,000–25,000',
	'25,000–100,000',
	'100,000–1M',
	'Over 1M',
];

export const CONTACT_US_SENT_KEY = 'tb-contact-sent';

export const CONTACT_SENT_FIELDS = ['firstName', 'lastName', 'email', 'company', 'subject', 'message'] as const;

/** What the form keeps in session storage for its thank-you page and for "Edit and send again". */
export interface SentContact extends Record<(typeof CONTACT_SENT_FIELDS)[number], string> {
	at: number;
	devicesStep: string;
	/** Sent from the Private Cloud order view (`?pcorder`). */
	order: boolean;
}
