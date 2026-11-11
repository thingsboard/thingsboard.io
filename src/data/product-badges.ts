/** Product badges for menu links (`SubMenuItem.badge`): a CSS tile with a nav-sprite glyph. */
export interface MenuBadge {
	/**
	 * `solid`: a tile filled with `hue` and a white glyph. `wash`: a light tint of `hue`.
	 * `waves` (the CLI): slow bands of the AI mark's colors behind a black or white glyph; `hue` is not used.
	 * `glass` (TEMP, Mobile only): an app icon's pale, top-lit tile; `hue` is the glyph's color on a light
	 * background, and the glyph is white on a dark one.
	 */
	fill: 'solid' | 'wash' | 'waves' | 'glass';
	hue: string;
	glyph: string;
	/** The glyph's width in px on a 32px tile. The menu and the footer scale it to their 40px tiles. */
	size: number;
}

const BADGE_FILE_PREFIX = '/src/assets/images/landings/nav/badge-';

export const MENU_BADGES = {
	// TEMP: the logomark at 22.4, 70% of its tile, on `thingsboard`, `cloud` and `mobile`. It was 20, 62.5%.
	thingsboard: { fill: 'solid', hue: '#178649', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 22.4 },
	cloud: { fill: 'solid', hue: '#3d50f5', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 22.4 },
	// The CLI's own glyph, a terminal window cropped to its outline.
	cli: { fill: 'waves', hue: '#7c5cf0', glyph: `${BADGE_FILE_PREFIX}cli.svg`, size: 21 },
	edge: { fill: 'wash', hue: '#2dd4bf', glyph: `${BADGE_FILE_PREFIX}edge.svg`, size: 23 },
	gateway: { fill: 'wash', hue: '#a78bfa', glyph: `${BADGE_FILE_PREFIX}gateway.svg`, size: 23 },
	tbmq: { fill: 'wash', hue: '#4ade80', glyph: `${BADGE_FILE_PREFIX}tbmq.svg`, size: 26 },
	trendz: { fill: 'wash', hue: '#60a5fa', glyph: `${BADGE_FILE_PREFIX}trendz.svg`, size: 23 },
	// TEMP: the ThingsBoard mark on an app icon's tile, in place of the green wash, until the app has an icon
	// of its own. To go back: `{ fill: 'wash', hue: '#4ade80', …, size: 20 }`.
	mobile: { fill: 'glass', hue: '#4a5068', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 22.4 },
} as const satisfies Record<string, MenuBadge>;

export type MenuBadgeKey = keyof typeof MENU_BADGES;
