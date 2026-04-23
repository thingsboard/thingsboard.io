import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const rasterMods = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/devices/*.{png,jpg,jpeg,webp}',
	{ eager: true },
);
const svgMods = import.meta.glob<string>('/src/assets/devices/*.svg', {
	eager: true,
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
		const url = svgMods[key];
		return url ? { src: url } : null;
	}
	const meta = rasterMods[key]?.default;
	if (!meta) return null;
	const out = await getImage({ src: meta, width, format: 'webp' });
	return {
		src: out.src,
		width: Number(out.attributes.width) || undefined,
		height: Number(out.attributes.height) || undefined,
	};
}
