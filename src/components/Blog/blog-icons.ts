/**
 * Line icons for the blog diagram boxes (`BlogSchema`) and icon cards (`BlogIconCard`): the inner
 * markup of a 24×24 viewBox drawn with `stroke="currentColor"`, so the tile sets the colour.
 * Add an icon here rather than passing raw SVG from a post.
 */
export const BLOG_ICONS = {
	device:
		'<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 2v5M15 2v5M9 17v5M15 17v5M2 9h5M2 15h5M17 9h5M17 15h5"/>',
	integration:
		'<path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z"/><path d="M13 7.5 8.8 13h3.1l-.9 3.5L15.2 11h-3.1z"/>',
	server:
		'<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>',
	'rule-engine':
		'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M6 8.5v1.5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8.5M12 13v2.5"/>',
	key: '<circle cx="8" cy="15" r="4"/><path d="M10.85 12.15 19 4M18 5l2 2M15 8l2 2"/>',
	bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
	braces:
		'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/>',
	lock: '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/>',
} as const;

export type BlogIconName = keyof typeof BLOG_ICONS;

/** Colour families shared by diagram boxes and icon tiles; tokens are `--schema-{family}-*` in _theme.scss. */
export type SchemaFamily = 'grey' | 'blue' | 'teal' | 'purple' | 'yellow' | 'green' | 'pink';
