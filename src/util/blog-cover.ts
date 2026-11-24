// Resized copies of blog cover images, for the places that show a cover as a card.
//
// Covers live in `public/images/blog/<post>/cover.webp` at full size (1024–2560px wide), because
// the post page, the RSS feed and the JSON-LD all link to that file. A card shows it 390–540px
// wide, so the blog index downloaded about four times the bytes it could draw. The endpoint
// `src/pages/blog-covers/[width]/[...path].webp.ts` writes each cover at the widths
// `blogCoverWidths()` lists, and `blogCoverSrcset()` builds the `srcset` that points at them.
//
// Framework-free on purpose (no Astro imports): the endpoint and the pages share it.
import path from 'node:path';
import sharp from 'sharp';

/** Widths a cover is offered at. 480 and 800 cover phones at 1x–2x, 1200 a desktop card at 2x. */
const TARGET_WIDTHS = [480, 800, 1200];

/** For a card in the blog's two-column layout (one column below 750px, content up to 1080px wide). */
export const BLOG_CARD_SIZES = '(min-width: 750px) min(50vw, 540px), 100vw';

const PREFIX = '/images/blog/';
const RASTER = /\.(webp|png|jpe?g)$/i;

/** `/images/blog/my-post/cover.webp` → `my-post/cover.webp`; `null` for anything the endpoint does not resize. */
export function blogCoverKey(image: string): string | null {
	if (!image.startsWith(PREFIX) || !RASTER.test(image)) return null;
	return image.slice(PREFIX.length);
}

/**
 * The endpoint's `path` parameter for a cover. The route adds `.webp` itself, so a WebP source
 * drops its extension and any other keeps it (`cover.png` → `…/cover.png.webp`): two covers that
 * differ only in format never share a URL.
 */
export const blogCoverPathParam = (key: string) => key.replace(/\.webp$/i, '');

export const blogCoverUrl = (key: string, width: number) => `/blog-covers/${width}/${blogCoverPathParam(key)}.webp`;

/** The source file of a cover on disk. */
export const blogCoverFile = (key: string) => path.join(process.cwd(), 'public', PREFIX, key);

/** Builds with `SKIP_IMG` (the link check) do not resize images, so they keep the original file. */
export const blogCoversEnabled = () => !process.env.SKIP_IMG;

// Promises, so the index page and the endpoint read each file's size once per thread.
const widths = new Map<string, Promise<number[]>>();

/**
 * The widths a cover is generated at: the target widths its source can fill, topped by the
 * source's own width when that is narrower than the largest target. A 1024px cover gets
 * 480, 800 and 1024 — never a "1200w" file that is really 1024px wide.
 * Empty when the file cannot be read.
 */
export function blogCoverWidths(key: string): Promise<number[]> {
	let known = widths.get(key);
	if (!known) {
		known = sharp(blogCoverFile(key))
			.metadata()
			.then(({ width }) => {
				if (!width) return [];
				const fits = TARGET_WIDTHS.filter((target) => target <= width);
				return fits.length < TARGET_WIDTHS.length ? [...fits, width] : fits;
			})
			// A cover that is missing or unreadable gets no resized copies; its card keeps the `src`.
			.catch((error: unknown) => {
				console.warn(`[blog-cover] Could not read ${key}; its cards load the original.`, error);
				return [];
			});
		widths.set(key, known);
	}
	return known;
}

/**
 * `srcset` for a cover shown as a card; pair it with a `sizes` attribute. `undefined` when the
 * image is not a local blog cover or resizing is off: the `<img>` then loads its `src` as before.
 */
export async function blogCoverSrcset(image: string): Promise<string | undefined> {
	const key = blogCoverKey(image);
	if (!key || !blogCoversEnabled()) return undefined;
	const available = await blogCoverWidths(key);
	if (available.length === 0) return undefined;
	return available.map((width) => `${blogCoverUrl(key, width)} ${width}w`).join(', ');
}
