/** Product badges for menu links (`SubMenuItem.badge`): a CSS tile with a nav-sprite glyph. */
interface MenuBadge {
	/**
	 * `solid`: a tile filled with `hue` and a white glyph. `wash`: a light tint of `hue`.
	 * `waves` (TEMP LOGO SET, the CLI): the AI mark's colors drifting behind a black or white glyph; `hue`
	 * is not used.
	 * `glass` (TEMP LOGO SET, Mobile): an app icon's pale, top-lit tile; `hue` is the glyph's color on a
	 * light background, and the glyph is white on a dark one.
	 */
	fill: 'solid' | 'wash' | 'waves' | 'glass';
	hue: string;
	glyph: string;
	/** The glyph's width in px on a 32px tile. The menu and the footer scale it to their 40px tiles. */
	size: number;
}

const BADGE_FILE_PREFIX = '/src/assets/images/landings/nav/badge-';

/**
 * TEMP LOGO SET. Three things here stand in until the design team's new logo proposal (Maria) and go
 * when it lands; search for "TEMP LOGO SET" to find their styles:
 * - the logomark at 22.4, 70% of its tile, on `thingsboard`, `cloud` and `mobile`. It was 20, 62.5%;
 * - the CLI's glyph (`nav/badge-cli.svg`) and its `waves` tile. Before, the CLI had no badge: its menu
 *   entries used `icon: nav/cli-icon.svg`, which is still in the repo;
 * - Mobile's `glass` tile. Before: `{ fill: 'wash', hue: '#4ade80', …, size: 20 }`.
 */
export const MENU_BADGES = {
	thingsboard: { fill: 'solid', hue: '#178649', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 22.4 },
	cloud: { fill: 'solid', hue: '#3d50f5', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 22.4 },
	// A terminal window cropped to its outline.
	cli: { fill: 'waves', hue: '#7c5cf0', glyph: `${BADGE_FILE_PREFIX}cli.svg`, size: 21 },
	edge: { fill: 'wash', hue: '#2dd4bf', glyph: `${BADGE_FILE_PREFIX}edge.svg`, size: 23 },
	gateway: { fill: 'wash', hue: '#a78bfa', glyph: `${BADGE_FILE_PREFIX}gateway.svg`, size: 23 },
	tbmq: { fill: 'wash', hue: '#4ade80', glyph: `${BADGE_FILE_PREFIX}tbmq.svg`, size: 26 },
	trendz: { fill: 'wash', hue: '#60a5fa', glyph: `${BADGE_FILE_PREFIX}trendz.svg`, size: 23 },
	mobile: { fill: 'glass', hue: '#4a5068', glyph: `${BADGE_FILE_PREFIX}thingsboard.svg`, size: 22.4 },
} as const satisfies Record<string, MenuBadge>;

export type MenuBadgeKey = keyof typeof MENU_BADGES;

/** A badge's glyph width in px on a tile `tile` px wide. */
export const badgeGlyphSize = (badge: MenuBadgeKey, tile: number) => (MENU_BADGES[badge].size * tile) / 32;
