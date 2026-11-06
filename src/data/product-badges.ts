/**
 * Product badges for the Products and Docs menu sections, picked by `SubMenuItem.badge`. The tile is
 * drawn in CSS (`.sm__badge` in `SiteMenu`); the glyph comes from the nav sprite, drawn at `size` px.
 */
export interface MenuBadge {
	/** `solid`: a tile filled with `hue` and a white glyph. `wash`: a light tint of `hue`. */
	fill: 'solid' | 'wash';
	hue: string;
	glyph: string;
	size: number;
}

const BADGE_FILE_PREFIX = '/src/assets/images/landings/nav/badge-';

export const MENU_BADGES = {
	thingsboard: { fill: 'solid', hue: '#178649', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 20 },
	cloud: { fill: 'solid', hue: '#3d50f5', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 20 },
	edge: { fill: 'wash', hue: '#2dd4bf', glyph: `${BADGE_FILE_PREFIX}edge.svg`, size: 23 },
	gateway: { fill: 'wash', hue: '#a78bfa', glyph: `${BADGE_FILE_PREFIX}gateway.svg`, size: 23 },
	tbmq: { fill: 'wash', hue: '#4ade80', glyph: `${BADGE_FILE_PREFIX}tbmq.svg`, size: 26 },
	trendz: { fill: 'wash', hue: '#60a5fa', glyph: `${BADGE_FILE_PREFIX}trendz.svg`, size: 23 },
	mobile: { fill: 'wash', hue: '#4ade80', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 20 },
} as const satisfies Record<string, MenuBadge>;

export type MenuBadgeKey = keyof typeof MENU_BADGES;
