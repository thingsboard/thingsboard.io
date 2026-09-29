import type { AgentStep, BannerSeg } from '@models/agent-terminal';
import { DASHBOARDS_BADGE, HOME_ROWS, type HomeRow } from '@data/home-rows';
import { CE_FULL_VER } from '@data/versions';

/** The homepage AI section's copy and the two sessions its windows play. */

export const AI_COPY = {
	// The non-breaking space keeps the balanced title from breaking between "than" and "ever".
	title: 'Build IoT solutions faster than\u00a0ever with AI inside ThingsBoard',
	badge: { icon: 'tabler:sparkles-filled', color: 'var(--color-brand)' },
};

interface AiColumn {
	switchLabel: string;
	/** The switch's label at phone width. */
	switchShort: string;
	title: string;
	body: string;
	accent: string;
	/** `accent` darkened for text: 5:1 against the deepest point of its wash, the accent at 20% over white. */
	accentText: string;
}

export const AI_COLUMNS: { assistant: AiColumn; cli: AiColumn } = {
	assistant: {
		switchLabel: 'AI Assistant',
		switchShort: 'Assistant',
		title: 'AI assistants built into the platform',
		body: 'Describe what you need in plain language and the platform builds it. AI Solution Creator creates your solution from scratch; the AI Assistant edits and improves it.',
		accent: '#0d7a5f',
		accentText: '#0b6952',
	},
	cli: {
		switchLabel: 'ThingsBoard CLI',
		switchShort: 'CLI',
		title: 'ThingsBoard CLI for AI coding agents',
		body: 'Develop your IoT solution from your terminal. Integrate with AI coding agents to build, test, and deploy your ThingsBoard solution as code. Every change is versioned in git, and one push ships it to dev, staging, or production.',
		accent: '#7c5cf0',
		accentText: '#6249be',
	},
};

export const AI_CTA = {
	assistant: {
		text: 'Try for free',
		href: '/installations/choose-region/',
		icon: 'tabler:cloud',
		line: 'Sign up for ThingsBoard Cloud and describe your first solution — nothing to install.',
	},
	cli: {
		text: 'Set up the CLI',
		href: '/docs/pe/user-guide/cli/',
		line: 'Install the CLI, open a project folder, and hand your agent the first change.',
	},
};

/**
 * One prompt and what the Assistant does with it. `reply` and `actions` are inserted as HTML: `<b>`
 * marks an entity, `<code>` a key or a value, `<code data-severity="critical">` a critical severity.
 */
interface AiAssistantExchange {
	prompt: string;
	reply: string;
	working: string;
	/** One ✓ line each, ahead of the reply. */
	actions: string[];
}

/** Keep each prompt to about 40 characters, one line of the composer, or its start scrolls away. */
export const AI_ASSISTANT_DEMO = {
	exchanges: [
		{
			prompt: 'Email the manager if a freezer stays open',
			working: 'Checking your freezers and alerts…',
			actions: ['Alarm rule ‘<b>Freezer Door Open</b>’ created', 'Notification rule ‘<b>Door Alert</b>’ created'],
			reply:
				'Done. A <code data-severity="critical">CRITICAL</code> alarm fires when a door stays open over 5 min and clears when it closes. The store manager gets an email right away.',
		},
		{
			prompt: 'Chart how long they stay open, per day',
			working: 'Looking at your door sensor data…',
			actions: [
				'Calculated field ‘<b>Door Open Time</b>’ created',
				'Last 30 days recalculated',
				'Dashboard ‘<b>Freezer Monitoring</b>’ updated',
			],
			reply:
				'Done. Each freezer now adds up its open-door minutes per day as <code>doorOpenDaily</code>, and the dashboard charts them side by side, so the door left open most stands out.',
		},
	] satisfies AiAssistantExchange[],
	hello: 'Hello! I’m your AI Assistant',
	lead: 'I can help you set up and manage your Devices, Dashboards, Calculated Fields, Alarm Rules and Notifications — just describe what you need, and I’ll handle the rest.',
	placeholder: 'Describe what you’d like to set up…',
};

export const AI_ASSISTANT_LABEL =
	'The ThingsBoard AI Assistant: asked to email the manager if a freezer stays open, it creates an alarm rule and a notification rule. Asked in a follow-up to chart how long the doors stay open per day, it creates a calculated field, recalculates the last 30 days, and adds the chart to the freezer dashboard.';

const AGENT_STATUS: BannerSeg[][] = [
	[
		{ t: 'brand', v: 'ThingsBoard CLI ' },
		{ t: 'dim', v: CE_FULL_VER },
	],
	[
		{ t: 'ok', v: '\u2714 ' },
		{ t: 'text', v: 'profile ' },
		{ t: 'arg', v: 'dev' },
		{ t: 'dim', v: ' \u203a thingsboard.cloud' },
	],
	[
		{ t: 'ok', v: '\u2714 ' },
		{ t: 'text', v: 'Coding agent detected' },
	],
];

const AGENT_TURNS: AgentStep[] = [
	{
		role: 'user',
		text: 'Each freezer in my stores needs its own alarm limit. Let me set it from the dashboard.',
	},
	{
		role: 'tool',
		text: 'Skill(update-solution)',
		spin: 1600,
		result: 'attribute, alarm rule and dashboard updated',
	},
	{
		role: 'agent',
		text: 'Done. Each freezer now has its own temperature threshold:',
		items: [
			'New attribute temperatureThreshold, set to -15 °C on all freezers',
			'Freezer Too Warm alarm now reads each freezer’s own threshold',
			'Dashboard: the freezer view has a Temperature Threshold card to set it per freezer',
		],
		tail: 'Want me to push this to dev?',
	},
	{ role: 'user', suggested: true, text: 'Push to dev' },
	{
		role: 'tool',
		text: 'Bash(tb push smart-retail --profile dev)',
		spin: 2600,
		result: 'smart-retail deployed → dev · 9 entities',
	},
	{ role: 'user', suggested: true, pending: true, text: 'Easy!' },
];

export const AI_AGENT_SESSION: AgentStep[] = [
	{ role: 'banner', art: [' _____ ___', '|_   _| _ )', '  | | | _ \\', '  |_| |___/'], lines: [[], ...AGENT_STATUS] },
	...AGENT_TURNS,
];

/** "ThingsBoard" in figlet's standard font: 59 columns, too wide for a phone's log, which gets the small mark. */
const AI_AGENT_WORDMARK = [
	' _____ _     _                 ____                      _ ',
	'|_   _| |__ (_)_ __   __ _ ___| __ )  ___   __ _ _ __ __| |',
	"  | | | '_ \\| | '_ \\ / _` / __|  _ \\ / _ \\ / _` | '__/ _` |",
	'  | | | | | | | | | | (_| \\__ \\ |_) | (_) | (_| | | | (_| |',
	'  |_| |_| |_|_|_| |_|\\__, |___/____/ \\___/ \\__,_|_|  \\__,_|',
	'                     |___/                                 ',
];

/** The status lines are a second banner with blank art, so they print under the wordmark, not beside it. */
export const AI_AGENT_SESSION_WORDMARK: AgentStep[] = [
	{ role: 'banner', art: AI_AGENT_WORDMARK, lines: [] },
	{ role: 'banner', art: ['', '', ''], lines: AGENT_STATUS },
	...AGENT_TURNS,
];

export const AI_AGENT_LABEL =
	'A coding agent in a terminal: asked in plain English to give each freezer its own alarm limit, it updates the solution, lists what changed, and the smart-retail solution is pushed to the dev profile.';

const rowColor = (slug: HomeRow['slug']) => {
	const row = HOME_ROWS.find((r) => r.slug === slug);
	if (!row) throw new Error(`AI_BADGE_CYCLE: no homepage row "${slug}".`);
	return row.badge.color;
};

/**
 * The other sections' badge colours, which the AI mark cycles through from `AI_COPY.badge.color`.
 * Neighbours stay close on the wheel: sRGB interpolation between distant hues passes through grey.
 * Exactly five: `ai-badge-hues` in AiSection has one keyframe stop per entry.
 */
export const AI_BADGE_CYCLE: readonly [string, string, string, string, string] = [
	rowColor('normalize'),
	rowColor('twin'),
	DASHBOARDS_BADGE.color,
	rowColor('connect'),
	rowColor('scale'),
];
