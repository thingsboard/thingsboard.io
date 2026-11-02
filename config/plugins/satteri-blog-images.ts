import { join } from 'node:path';
import sharp from 'sharp';
import { defineHastPlugin } from 'satteri';

/**
 * Sätteri port of `rehype-blog-images`, for blog-post body images (scoped to
 * `src/content/blog/`).
 *
 * Markdown images render as bare `<img>` tags with no dimensions and eager loading. This
 * plugin:
 *
 * 1. Injects intrinsic `width`/`height` (read from the file in `public/`) so the browser
 *    reserves layout space before the image downloads.
 * 2. Keeps the first body image eager (it is the usual LCP candidate) and lazy-loads every
 *    following image; all get `decoding="async"`.
 *
 * Images that already declare `loading`, `width`, or `height` are left as authored.
 * External URLs and unresolvable files are skipped gracefully.
 *
 * The rehype original had to collect nodes first and await afterwards, because unified
 * visitors cannot be async. Sätteri awaits a visitor, so the work happens in place.
 *
 * Exported as a plugin *factory*: Sätteri calls it once per document, which is what gives
 * the "first image is eager" counter its per-page scope. Registering an already-built
 * plugin instead would share one counter across every page in the build.
 */

interface Dims {
	width: number;
	height: number;
}

// Images repeat across posts (author avatars, shared covers), and `sharp().metadata()`
// is a file read each time. `null` marks a failed read so broken paths aren't retried per
// occurrence. The cache is never invalidated, so in `pnpm dev` an edited image serves
// stale width/height until a server restart.
const dimsCache = new Map<string, Dims | null>();

async function readDims(absPath: string): Promise<Dims | null> {
	const cached = dimsCache.get(absPath);
	if (cached !== undefined) return cached;
	let dims: Dims | null = null;
	try {
		const meta = await sharp(absPath).metadata();
		if (meta.width && meta.height) dims = { width: meta.width, height: meta.height };
	} catch {
		// Missing or unreadable file — leave dimensions off, keep the attrs.
	}
	dimsCache.set(absPath, dims);
	return dims;
}

export function satteriBlogImages(factoryCtx: { fileURL?: URL | undefined }) {
	// Scoped to blog posts. Returning undefined leaves the plugin out of this document's
	// pipeline entirely, so non-blog pages pay nothing.
	const sourcePath = (factoryCtx.fileURL?.pathname ?? '').replaceAll('\\', '/');
	if (!sourcePath.includes('/src/content/blog/')) return undefined;

	// Fresh per document, because the factory is called per document.
	let isFirst = true;

	return defineHastPlugin({
		name: 'blog-images',
		element: {
			filter: ['img'],
			async visit(node: any, ctx: any) {
				const props = node.properties ?? {};
				const first = isFirst;
				isFirst = false;

				// Respect explicitly authored loading behaviour.
				if (props.loading == null) {
					ctx.setProperty(node, 'loading', first ? 'eager' : 'lazy');
					if (props.decoding == null) ctx.setProperty(node, 'decoding', 'async');
				}

				const src = typeof props.src === 'string' ? props.src : '';
				// Only local, root-relative assets ('/images/…', not '//host/…').
				if (!src.startsWith('/') || src.startsWith('//')) return;
				if (props.width != null || props.height != null) return;

				// Malformed percent-encoding (a literal `%` in a filename) makes
				// decodeURIComponent throw — degrade to skipping dimensions, like every other
				// failure path here.
				let cleanPath: string;
				try {
					cleanPath = decodeURIComponent(src.split(/[?#]/)[0] ?? '');
				} catch {
					return;
				}

				const dims = await readDims(join(process.cwd(), 'public', cleanPath));
				if (dims) {
					ctx.setProperty(node, 'width', dims.width);
					ctx.setProperty(node, 'height', dims.height);
				}
			},
		},
	});
}
