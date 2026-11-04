/**
 * Content for the homepage's Automate switch: the Normalize, Alert and Deliver drawings of one freezer alarm.
 */

interface AutomateStage {
	id: 'normalize' | 'alert' | 'deliver';
	/** One word: three share a pill that has to fit a phone. */
	label: string;
	icon: string;
}

export const AUTOMATE_STAGES: AutomateStage[] = [
	{
		id: 'normalize',
		label: 'Normalize',
		icon: 'tabler:transform',
	},
	{
		id: 'alert',
		label: 'Alert',
		icon: 'tabler:alert-triangle',
	},
	{
		id: 'deliver',
		label: 'Deliver',
		icon: 'tabler:send',
	},
];

/** Accessible name of the switch. */
export const AUTOMATE_SWITCH_LABEL = 'What the platform does with your data';

/** The alarm rule the AI demo creates: keep in step with `AI_ASSISTANT_DEMO` in `ai-visual.ts`. */
export const FREEZER_ALARM = {
	severity: 'CRITICAL',
	name: 'Freezer Door Open',
	source: 'Freezer 3',
	/** Threshold in seconds. */
	over: 3 * 60,
};

export const FILTER_CHART = {
	title: `${FREEZER_ALARM.source} · Door open time`,
	/** Seconds since midnight. */
	openedAt: 8 * 3600 + 38 * 60,
	limit: FREEZER_ALARM.over,
	status: 'Active · Unacknowledged',
};

/** The morning's earlier openings: minutes after 06:00, and seconds open. All must stay under the limit. */
export const FILTER_HISTORY: { at: number; open: number }[] = [
	{ at: 96, open: 4 },
	{ at: 110, open: 58 },
	{ at: 123, open: 3 },
	{ at: 135, open: 75 },
	{ at: 147, open: 5 },
];

if (FILTER_HISTORY.some((o) => o.open > FILTER_CHART.limit)) {
	throw new Error('automate-visual: a past opening passes the rule, so the chart would show two alarms');
}

/** `hh:mm:ss` from seconds since midnight. */
export const clock = (seconds: number) =>
	[Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), Math.floor(seconds % 60)]
		.map((n) => String(n).padStart(2, '0'))
		.join(':');

export const ALARM_FIRED_AT = clock(FILTER_CHART.openedAt + FILTER_CHART.limit);

/** `m:ss`. */
export const openFor = (seconds: number) =>
	`${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

interface NotifyMessage {
	/** Two icons for a destination two products share. */
	icons: string[];
	/** The accessible name: the glyph alone says it only to a sighted reader. */
	channel: string;
	text: string;
	/** Reserved example values (example.com, 555-01xx). */
	address: string;
	detail: string;
}

/**
 * `{time}` and `{limit}` are filled in by NotifyFeed, which keeps them in step with the limit dragged in FilterChart.
 * Email, SMS and Slack are Notification Center delivery methods. The CRM has no built-in connector — it is
 * reached through the n8n node — so its card must keep saying "via n8n".
 */
export const NOTIFY_FEED: NotifyMessage[] = [
	{
		icons: ['tabler:mail'],
		channel: 'Email',
		text: FREEZER_ALARM.name,
		address: 'manager@example.com',
		detail: `A critical alarm on ${FREEZER_ALARM.source}, raised at {time}.`,
	},
	{
		icons: ['tabler:device-mobile-message'],
		channel: 'SMS',
		text: `${FREEZER_ALARM.source} · open over {limit}`,
		address: '+1 555 0142',
		detail: `${FREEZER_ALARM.name} · ${FREEZER_ALARM.severity.toLowerCase()}`,
	},
	{
		icons: ['simple-icons:slack'],
		channel: 'Slack',
		text: `${FREEZER_ALARM.severity} · ${FREEZER_ALARM.source}`,
		address: '#cold-chain',
		detail: `${FREEZER_ALARM.name}, raised at {time}`,
	},
	{
		icons: ['simple-icons:salesforce', 'simple-icons:hubspot'],
		channel: 'CRM',
		text: 'Ticket opened',
		address: 'Ticket #148',
		detail: `${FREEZER_ALARM.name} · ${FREEZER_ALARM.source}`,
	},
];
