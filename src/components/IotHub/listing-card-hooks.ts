/**
 * The `data-*` hooks bindListingCard fills, and which shape provides each.
 *
 * This is the contract scripts/lint-dual-render.ts checks the built output
 * against. The binder and ListingCard.astro still write these attribute names
 * as literals, so renaming a hook means editing here too — the lint asserts the
 * names in this file, not the ones the binder happens to query.
 *
 * Deliberately import-free so a plain node script can read it.
 */
export const CARD_HOOKS = [
	'data-card-img',
	'data-card-img-fallback',
	'data-card-tile',
	'data-card-icon-tile',
	'data-card-title',
	'data-card-author-wrap',
	'data-card-author',
	'data-card-author-name',
	'data-card-author-icon',
	'data-card-installs-wrap',
	'data-card-installs',
	'data-card-author-dot',
	'data-iot-hub-install-trigger',
	'data-icon-root',
] as const;

export type CardHook = (typeof CARD_HOOKS)[number];

/** The three shapes a listing card can be built in. */
export type CardShape = 'preview' | 'tile' | 'compact';

/**
 * Hooks each template shape must provide, independent of what the catalogue
 * happens to contain at build time. `buildCardNode` relies on exactly this.
 *
 * Typed by CardShape so a new shape is a compile error here rather than a
 * silently unchecked one in the lint, and by CardHook so a typo'd hook cannot
 * be written — `hooksIn` only ever returns members of CARD_HOOKS, so an
 * unknown name could never be satisfied.
 */
export const HOOKS_BY_SHAPE: Record<CardShape, readonly CardHook[]> = {
	preview: ['data-card-img', 'data-card-img-fallback'],
	// The glyph inside a tile is bound through IotHubIcon's own root, so a tile
	// template without it renders an uncoloured, glyphless block.
	tile: ['data-card-tile', 'data-icon-root'],
	compact: ['data-card-icon-tile', 'data-icon-root'],
};
