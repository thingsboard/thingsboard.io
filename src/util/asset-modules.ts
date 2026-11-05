import type { ImageMetadata } from 'astro';
import { imageMetadata } from 'astro/assets/utils';

// Asset lookups for the image components, keyed by project-relative path (`/src/assets/...`). Kept in a module
// because Astro re-runs component frontmatter on every render, and these globs have ~7,000 keys.

/** Raster images as loaders of their `ImageMetadata`. Lazy, so a render loads only the images its page uses. */
export const rasterLoaders = import.meta.glob<ImageMetadata>('/src/assets/**/*.{png,jpg,jpeg,webp,gif}', {
	import: 'default',
});

/** SVGs as built URLs. Imported as `ImageMetadata`, Astro would compile each one into a component. */
export const svgUrls = import.meta.glob<string>('/src/assets/**/*.svg', {
	// `no-inline`: Vite would turn files under `build.assetsInlineLimit` into `data:` URIs, repeated in every page.
	query: '?url&no-inline',
	import: 'default',
	eager: true,
});

/**
 * Raw SVG sources, for inlining an SVG into the page — a diagram whose `<a>` links must stay clickable
 * (`<img src>` disables SVG interactivity), or an icon its card styles.
 */
export const svgRawLoaders = import.meta.glob<string>('/src/assets/**/*.svg', { query: '?raw', import: 'default' });

/**
 * An SVG with `<a>` links, ready to inline: `alt` becomes its accessible name and every link opens in a new tab (the
 * sources ship `target="_parent"`). `undefined` for an SVG without links. No `role="img"`: it would hide the links
 * from assistive tech, while the SVG's default role keeps them reachable and still takes the `aria-label`.
 */
export function prepareInteractiveSvg(raw: string | undefined, alt: string): string | undefined {
	if (!raw || !/<a[\s>]/i.test(raw)) return undefined;
	const escapedAlt = alt.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
	return raw.replace(/<svg\b/, `<svg aria-label="${escapedAlt}"`).replace(/<a\b([^>]*)>/g, (_m, attrs: string) => {
		const stripped = attrs.replace(/\s+target="[^"]*"/g, '').replace(/\s+rel="[^"]*"/g, '');
		return `<a${stripped} target="_blank" rel="noopener noreferrer">`;
	});
}

export function assetExists(path: string): boolean {
	return path in rasterLoaders || path in svgUrls;
}

/** An SVG's intrinsic size, read the way Astro reads it for an imported SVG (`width`/`height`, else `viewBox`). */
export async function svgDimensions(path: string): Promise<{ width: number; height: number } | undefined> {
	const raw = await svgRawLoaders[path]?.();
	if (!raw) return undefined;
	const { width, height } = await imageMetadata(new TextEncoder().encode(raw), path);
	return { width, height };
}
