/** Colour families of diagram boxes and icon tiles; each has a `[data-schema-family]` block in _blog-tokens.scss. */
export type SchemaFamily = 'grey' | 'blue' | 'teal' | 'purple' | 'yellow' | 'green' | 'pink';

// The post column is at most 826px wide and 1652 covers it on a 2x screen. `src` keeps the
// original width, which the blog lightbox opens.
export const BLOG_IMAGE_WIDTHS = [640, 828, 1240, 1652];
export const BLOG_IMAGE_SIZES = '(max-width: 860px) 100vw, 826px';
