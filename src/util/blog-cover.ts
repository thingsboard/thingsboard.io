// Resized copies of blog covers for cards. The originals in `public/images/blog/` stay full size
// for the post page, RSS and JSON-LD; `src/pages/blog-covers/[width]/[...path].webp.ts` writes
// the copies. No Astro imports: the endpoint and the pages share this file.
import path from 'node:path';
import sharp from 'sharp';

/** 480 and 800 for phones at 1x–2x, 1200 for a desktop card at 2x. */
const TARGET_WIDTHS = [480, 800, 1200];

/** A card in the blog index grid: two columns, one below 750px. */
export const BLOG_CARD_SIZES = '(min-width: 750px) min(50vw, 540px), 100vw';

/**
 * A featured-carousel slide: from 750px up the cover is cropped to the card's height and drawn
 * 670–850px wide at any screen width.
 */
export const BLOG_CAROUSEL_SIZES = '(min-width: 750px) 800px, 100vw';

const PREFIX = '/images/blog/';
const RASTER = /\.(webp|png|jpe?g)$/i;

/** `/images/blog/my-post/cover.webp` → `my-post/cover.webp`; `null` for anything the endpoint does not resize. */
export function blogCoverKey(image: string): string | null {
	if (!image.startsWith(PREFIX) || !RASTER.test(image)) return null;
	return image.slice(PREFIX.length);
}

/**
 * The endpoint's `path` parameter. A non-WebP source keeps its extension (`cover.png.webp`),
 * so two formats never share a URL.
 */
export const blogCoverPathParam = (key: string) => key.replace(/\.webp$/i, '');

export const blogCoverUrl = (key: string, width: number) => `/blog-covers/${width}/${blogCoverPathParam(key)}.webp`;

export const blogCoverFile = (key: string) => path.join(process.cwd(), 'public', PREFIX, key);

/** Off in `SKIP_IMG` builds (the link check): cards keep the original. */
export const blogCoversEnabled = () => !process.env.SKIP_IMG;

// Each file's size is read once per thread.
const widths = new Map<string, Promise<number[]>>();

/**
 * The widths a cover is generated at: the targets its source can fill, plus the source's own
 * width when that is narrower than the largest target. Empty when the file cannot be read.
 */
export function blogCoverWidths(key: string): Promise<number[]> {
	let known = widths.get(key);
	if (!known) {
		known = sharp(blogCoverFile(key))
			.metadata()
			.then(({ width }) => {
				if (!width) return [];
				const fits = TARGET_WIDTHS.filter((target) => target <= width);
				return fits.at(-1) === width || fits.length === TARGET_WIDTHS.length ? fits : [...fits, width];
			})
			.catch((error: unknown) => {
				console.warn(`[blog-cover] Could not read ${key}; its cards load the original.`, error);
				return [];
			});
		widths.set(key, known);
	}
	return known;
}

/**
 * `srcset` for a cover card, or `undefined` when the image is not a local cover or resizing is off.
 */
export async function blogCoverSrcset(image: string): Promise<string | undefined> {
	const key = blogCoverKey(image);
	if (!key || !blogCoversEnabled()) return undefined;
	const available = await blogCoverWidths(key);
	if (available.length === 0) return undefined;
	return available.map((width) => `${blogCoverUrl(key, width)} ${width}w`).join(', ');
}
