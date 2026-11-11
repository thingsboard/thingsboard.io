/** Product badges for menu links (`SubMenuItem.badge`): a CSS tile with a nav-sprite glyph. */
export interface MenuBadge {
	/** `solid`: a tile filled with `hue` and a white glyph. `wash`: a light tint of `hue`. */
	fill: 'solid' | 'wash';
	/** The product's color. A `wash` color is picked for dark backgrounds. */
	hue: string;
	/** `wash` only: the color on a light background. Without it, `hue` is darkened there. */
	hueLight?: string;
	glyph: string;
	/** The glyph's width in px on a 32px tile; `badgeGlyphSize` scales it to other tiles. */
	size: number;
}

/** The glyph's width in px on a tile `tile` px wide, keeping its share of the tile. */
export const badgeGlyphSize = (badge: MenuBadge, tile: number) => (badge.size * tile) / 32;

const BADGE_FILE_PREFIX = '/src/assets/images/landings/nav/badge-';

export const MENU_BADGES = {
	thingsboard: { fill: 'solid', hue: '#178649', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 20 },
	cloud: { fill: 'solid', hue: '#3d50f5', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 20 },
	cli: { fill: 'wash', hue: '#b9a6ff', hueLight: '#7c5cf0', glyph: `${BADGE_FILE_PREFIX}cli.svg`, size: 20 },
	edge: { fill: 'wash', hue: '#2dd4bf', glyph: `${BADGE_FILE_PREFIX}edge.svg`, size: 23 },
	gateway: { fill: 'wash', hue: '#a78bfa', glyph: `${BADGE_FILE_PREFIX}gateway.svg`, size: 23 },
	tbmq: { fill: 'wash', hue: '#4ade80', glyph: `${BADGE_FILE_PREFIX}tbmq.svg`, size: 26 },
	trendz: { fill: 'wash', hue: '#60a5fa', glyph: `${BADGE_FILE_PREFIX}trendz.svg`, size: 23 },
	// TEMP: the ThingsBoard mark in black (white on dark) on a neutral wash, in place of the green one,
	// until the app has an icon of its own. To go back: `hue: '#4ade80'` and no `hueLight`.
	mobile: {
		fill: 'wash',
		hue: '#e6e8ef',
		hueLight: '#17181c',
		glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`,
		size: 20,
	},
} as const satisfies Record<string, MenuBadge>;

export type MenuBadgeKey = keyof typeof MENU_BADGES;
