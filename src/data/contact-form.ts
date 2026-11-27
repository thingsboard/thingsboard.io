/** The Contact us form's topics, and its hand-off to the thank-you page. */

interface ContactTopic {
	/** What the form submits and `?subject=` links match: never changes. */
	value: string;
	label: string;
	/** The message placeholder for this topic. */
	prompt: string;
}

export const GITHUB_ISSUES_URL = 'https://github.com/thingsboard/thingsboard/issues';

export const DEFAULT_PROMPT = 'What you’re working on, where you’d like it to run, and any timeline you have in mind.';

/** The topics the reader picks from. Seven, so the list opens without a scroll. */
export const CONTACT_TOPICS: ContactTopic[] = [
	{
		value: 'ThingsBoard Products',
		label: 'ThingsBoard products and pricing',
		prompt: 'What you’re building, and whether you’d like us to host it or run it yourself.',
	},
	{
		value: 'Technical Support',
		label: 'Technical support',
		prompt: 'Your edition and version, what you expected, and what happened instead. Error messages help.',
	},
	{
		value: 'Professional Services',
		label: 'Consulting services',
		prompt: 'What you’d like a hand with: architecture, a review, a migration, training or a rollout.',
	},
	{
		value: 'Custom Development Service',
		label: 'Custom development',
		prompt: 'What you’d like built (a widget, an integration, a white-label app) and your timeline.',
	},
	{
		value: 'Partnership',
		label: 'Partnership',
		prompt: 'Your company, who you serve, and the kind of partnership you have in mind.',
	},
	{
		value: 'IoT Hub',
		label: 'IoT Hub',
		prompt: 'What you’d like to list or ask about (a device, a widget, a solution), with a link if you have one.',
	},
	{ value: 'Other', label: 'Something else', prompt: DEFAULT_PROMPT },
];

/**
 * Topics only a link sets (`?subject=`), from the page they belong to. The reader never sees them in the
 * list: a topic that comes with the link hides the whole field.
 */
export const LINKED_TOPICS: Omit<ContactTopic, 'label'>[] = [
	{
		value: 'Private Cloud',
		prompt: 'Your message volume, your preferred region, and when you’d like to go live.',
	},
	{
		value: 'Community Grant',
		prompt: 'Your deployment (its version and production servers) and your question about the grant.',
	},
	{
		value: 'Training',
		prompt: 'Who’s taking part, how many people, and the topics you want to cover.',
	},
	{
		value: 'TBMQ',
		prompt: 'Your message throughput, and whether you’d host the broker yourself.',
	},
];

export const CONTACT_US_SENT_KEY = 'tb-contact-sent';

export const CONTACT_SENT_FIELDS = ['name', 'email', 'company', 'subject', 'message'] as const;

/** What the form keeps in session storage for its thank-you page and for "Edit and send again". */
export interface SentContact extends Record<(typeof CONTACT_SENT_FIELDS)[number], string> {
	at: number;
	/** Sent from the Private Cloud order view (`?pcorder`). */
	order: boolean;
	/** The topic came with the link, so the reader never saw the field. */
	linked: boolean;
}
