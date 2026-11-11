/** Product badges for menu links (`SubMenuItem.badge`): a CSS tile with a nav-sprite glyph `size` px wide. */
interface MenuBadge {
	/**
	 * `solid`: a tile filled with `hue` and a white glyph. `wash`: a light tint of `hue`.
	 * `ink` (TEMP, Mobile only): a near-black tile with a white glyph, graphite on a dark background.
	 */
	fill: 'solid' | 'wash' | 'ink';
	hue: string;
	glyph: string;
	size: number;
}

const BADGE_FILE_PREFIX = '/src/assets/images/landings/nav/badge-';

export const MENU_BADGES = {
	thingsboard: { fill: 'solid', hue: '#178649', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 20 },
	cloud: { fill: 'solid', hue: '#3d50f5', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 20 },
	cli: { fill: 'solid', hue: '#7c5cf0', glyph: `${BADGE_FILE_PREFIX}cli.svg`, size: 20 },
	edge: { fill: 'wash', hue: '#2dd4bf', glyph: `${BADGE_FILE_PREFIX}edge.svg`, size: 23 },
	gateway: { fill: 'wash', hue: '#a78bfa', glyph: `${BADGE_FILE_PREFIX}gateway.svg`, size: 23 },
	tbmq: { fill: 'wash', hue: '#4ade80', glyph: `${BADGE_FILE_PREFIX}tbmq.svg`, size: 26 },
	trendz: { fill: 'wash', hue: '#60a5fa', glyph: `${BADGE_FILE_PREFIX}trendz.svg`, size: 23 },
	// TEMP: the ThingsBoard mark in white on black, in place of the green wash, until the app has an
	// icon of its own. To go back: `fill: 'wash', hue: '#4ade80'`.
	mobile: { fill: 'ink', hue: '#17181c', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 20 },
} as const satisfies Record<string, MenuBadge>;

export type MenuBadgeKey = keyof typeof MENU_BADGES;
