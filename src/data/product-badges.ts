/** Product badges for menu links (`SubMenuItem.badge`): a CSS tile with a nav-sprite glyph. */
export interface MenuBadge {
	/**
	 * `solid`: a tile filled with `hue` and a white glyph. `wash`: a light tint of `hue`.
	 * `glass` (TEMP, Mobile only): an app icon's tile, a soft top-lit gradient; `hue` is not used.
	 */
	fill: 'solid' | 'wash' | 'glass';
	/** The product's color. A `wash` color is picked for dark backgrounds. */
	hue: string;
	/** `wash` only: the color on a light background. Without it, `hue` is darkened there. */
	hueLight?: string;
	/**
	 * `wash` only, in the menu: the badge runs the AI mark's hue cycle while its panel is shown. Under
	 * reduced motion, and in the footer, it keeps `hue` and `hueLight`.
	 */
	cycle?: boolean;
	glyph: string;
	/** The glyph's width in px on a 32px tile; `badgeGlyphSize` scales it to other tiles. */
	size: number;
}

/** The glyph's width in px on a tile `tile` px wide, keeping its share of the tile. */
export const badgeGlyphSize = (badge: MenuBadge, tile: number) => (badge.size * tile) / 32;

const BADGE_FILE_PREFIX = '/src/assets/images/landings/nav/badge-';
/** TEMP: the ThingsBoard logomark at 70% of its tile (22.4 of 32), in the menu and the footer. It was 20, 62.5%. */
const LOGOMARK_SIZE = 22.4;

export const MENU_BADGES = {
	thingsboard: {
		fill: 'solid',
		hue: '#178649',
		glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`,
		size: LOGOMARK_SIZE,
	},
	cloud: {
		fill: 'solid',
		hue: '#3d50f5',
		glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`,
		size: LOGOMARK_SIZE,
	},
	cli: {
		fill: 'wash',
		hue: '#b9a6ff',
		hueLight: '#7c5cf0',
		cycle: true,
		glyph: `${BADGE_FILE_PREFIX}cli.svg`,
		size: 20,
	},
	edge: { fill: 'wash', hue: '#2dd4bf', glyph: `${BADGE_FILE_PREFIX}edge.svg`, size: 23 },
	gateway: { fill: 'wash', hue: '#a78bfa', glyph: `${BADGE_FILE_PREFIX}gateway.svg`, size: 23 },
	tbmq: { fill: 'wash', hue: '#4ade80', glyph: `${BADGE_FILE_PREFIX}tbmq.svg`, size: 26 },
	trendz: { fill: 'wash', hue: '#60a5fa', glyph: `${BADGE_FILE_PREFIX}trendz.svg`, size: 23 },
	// TEMP: the ThingsBoard mark in black (white on dark) on an app icon's tile, in place of the green
	// wash, until the app has an icon of its own. To go back: `fill: 'wash', hue: '#4ade80'`.
	mobile: {
		fill: 'glass',
		hue: '#17181c',
		glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`,
		size: LOGOMARK_SIZE,
	},
} as const satisfies Record<string, MenuBadge>;

export type MenuBadgeKey = keyof typeof MENU_BADGES;
