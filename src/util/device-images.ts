import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Lazy glob (no `eager: true`) so importing this module doesn't force Vite to
// materialize metadata for every image at startup — with ~1,700 device images
// the eager variant inflated dev-server heap usage past 6 GB. Each entry is
// a function that returns the real module on first await, keeping the catalog
// page's 123 cover resolves cheap and deferring the other ~1,580 body images
// until the slug page that actually needs them is built.
const rasterMods = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/devices/*.{png,jpg,jpeg,webp}',
);
const svgMods = import.meta.glob<string>('/src/assets/devices/*.svg', {
	query: '?url',
	import: 'default',
});

export interface ResolvedDeviceImage {
	src: string;
	width?: number;
	height?: number;
}

// Rasterize through astro:assets so thumbnails get content-hashed URLs,
// width/height metadata (prevents layout shift), and WebP re-encoding. SVGs
// pass through verbatim — Astro can't resize vector art, and shrinking via
// intrinsic width would lose the crispness SVGs exist for.
export async function resolveDeviceImage(
	filename: string,
	width: number,
): Promise<ResolvedDeviceImage | null> {
	const key = `/src/assets/devices/${filename}`;
	if (filename.toLowerCase().endsWith('.svg')) {
		const loader = svgMods[key];
		if (!loader) return null;
		const url = await loader();
		return { src: url };
	}
	const loader = rasterMods[key];
	if (!loader) return null;
	const mod = await loader();
	const out = await getImage({ src: mod.default, width, format: 'webp' });
	return {
		src: out.src,
		width: Number(out.attributes.width) || undefined,
		height: Number(out.attributes.height) || undefined,
	};
}
