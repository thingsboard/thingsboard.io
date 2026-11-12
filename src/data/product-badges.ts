/** Product badges for menu links (`SubMenuItem.badge`): a CSS tile with a nav-sprite glyph. */
interface MenuBadge {
	/**
	 * `solid`: a tile filled with `hue` and a white glyph. `wash`: a light tint of `hue`.
	 * `waves` (TEMP LOGO SET, the CLI): the AI mark's colors drifting behind a black or white glyph; it takes
	 * no `hue`.
	 * `glass` (TEMP LOGO SET, Mobile): an app icon's pale, top-lit tile; `hue` is the glyph's color on a
	 * light background, and the glyph is white on a dark one.
	 */
	fill: 'solid' | 'wash' | 'waves' | 'glass';
	hue?: string;
	glyph: string;
	/** The glyph's width in px on a `BADGE_TILE` tile. */
	size: number;
}

/** A badge tile's side in px, in the menu and the footer. Their styles draw the same size. */
export const BADGE_TILE = 40;

const BADGE_FILE_PREFIX = '/src/assets/images/landings/nav/badge-';

// TEMP LOGO SET: the 28px logomark, the CLI's `waves` tile and Mobile's `glass` tile stand in until the new
// logo set; search the tag for their styles.
export const MENU_BADGES = {
	thingsboard: { fill: 'solid', hue: '#178649', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 28 },
	cloud: { fill: 'solid', hue: '#3d50f5', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 28 },
	cli: { fill: 'waves', glyph: `${BADGE_FILE_PREFIX}cli.svg`, size: 26.25 },
	edge: { fill: 'wash', hue: '#2dd4bf', glyph: `${BADGE_FILE_PREFIX}edge.svg`, size: 28.75 },
	gateway: { fill: 'wash', hue: '#a78bfa', glyph: `${BADGE_FILE_PREFIX}gateway.svg`, size: 28.75 },
	tbmq: { fill: 'wash', hue: '#4ade80', glyph: `${BADGE_FILE_PREFIX}tbmq.svg`, size: 31.125 },
	trendz: { fill: 'wash', hue: '#60a5fa', glyph: `${BADGE_FILE_PREFIX}trendz.svg`, size: 28.75 },
	mobile: { fill: 'glass', hue: '#4a5068', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 28 },
} as const satisfies Record<string, MenuBadge>;

export type MenuBadgeKey = keyof typeof MENU_BADGES;

/** What a tile needs to draw a badge. */
export function badgeTile(badge: MenuBadgeKey) {
	const { fill, hue, glyph, size }: MenuBadge = MENU_BADGES[badge];
	return { fill, glyph, size, style: `${hue ? `--badge-hue: ${hue}; ` : ''}--badge-glyph: ${size}px` };
}
