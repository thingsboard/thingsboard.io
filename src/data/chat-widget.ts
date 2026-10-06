import { AI_HUE_CYCLE } from '@data/ai-visual';

/** The YourGPT widget the site loads. Its look and its window's position are set in the YourGPT dashboard. */
export const YOURGPT_WIDGET_ID = '388b06d9-9f7f-4125-81e7-0cd963efb031';

/** The launcher's accessible name and tooltip. The bot's name and greeting say it is an AI, in the dashboard. */
export const LAUNCHER_LABEL = 'Ask the ThingsBoard AI expert';

const CHAT_HUE_LEG_S = 2.5;

const stops = AI_HUE_CYCLE.map(
	(_, i) => `${((i * 100) / AI_HUE_CYCLE.length).toFixed(2)}% { --chat-hue: var(--chat-hue-${i}); }`
);

/**
 * `--chat-hue`, cycling through `AI_HUE_CYCLE`: read by our launcher, and by the dashboard's CSS for the chat
 * window, which renders in the page's DOM. `animation: var(--chat-anim) var(--chat-cycle) linear infinite`.
 */
export const CHAT_HUE_CSS = [
	`@property --chat-hue { syntax: '<color>'; inherits: true; initial-value: #3d50f5; }`,
	`@keyframes chat-hues { ${stops.join(' ')} 100% { --chat-hue: var(--chat-hue-0); } }`,
	`:root { ${AI_HUE_CYCLE.map((hue, i) => `--chat-hue-${i}: ${hue};`).join(' ')} --chat-anim: chat-hues; --chat-cycle: ${CHAT_HUE_LEG_S * AI_HUE_CYCLE.length}s; }`,
].join('\n');
