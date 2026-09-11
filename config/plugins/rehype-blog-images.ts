import { join } from 'node:path';
import type { Root } from 'hast';
import sharp from 'sharp';
import type { Plugin, Transformer } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin for blog-post body images (scoped to `src/content/blog/`).
 *
 * Markdown images render as bare `<img>` tags with no dimensions and eager
 * loading. This plugin:
 *
 * 1. Injects intrinsic `width`/`height` (read from the file in `public/`) so
 *    the browser reserves layout space before the image downloads.
 * 2. Keeps the first body image eager (it is the usual LCP candidate) and
 *    lazy-loads every following image; all get `decoding="async"`.
 *
 * Images that already declare `loading`, `width`, or `height` are left as
 * authored. External URLs and unresolvable files are skipped gracefully.
 */

interface Dims {
	width: number;
	height: number;
}

// Module-level cache: many posts reuse images, and metadata reads repeat
// across dozens of posts on every build. `null` marks a failed read so broken
// paths aren't retried per occurrence. The cache is never invalidated, so in
// `pnpm dev` an edited image serves stale width/height until a server restart.
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

export function rehypeBlogImages(): Plugin<[], Root> {
	const transformer: Transformer<Root> = async (tree, file) => {
		const sourcePath = (file.path ?? file.history?.[0] ?? '').replaceAll('\\', '/');
		if (!sourcePath.includes('/src/content/blog/')) return;

		// Collect in document order first; async work inside a visitor is unsafe.
		const images: { properties: Record<string, unknown> }[] = [];
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'img') return;
			node.properties ??= {};
			images.push(node as { properties: Record<string, unknown> });
		});

		let isFirst = true;
		for (const img of images) {
			const props = img.properties;
			const first = isFirst;
			isFirst = false;

			// Respect explicitly authored loading behavior.
			if (props.loading == null) {
				props.loading = first ? 'eager' : 'lazy';
				props.decoding ??= 'async';
			}

			const src = typeof props.src === 'string' ? props.src : '';
			// Only local, root-relative assets ('/images/…', not '//host/…').
			if (!src.startsWith('/') || src.startsWith('//')) continue;
			if (props.width != null || props.height != null) continue;

			// Malformed percent-encoding (a literal `%` in a filename) makes
			// decodeURIComponent throw — degrade to skipping dimensions, like
			// every other failure path here.
			let cleanPath: string;
			try {
				cleanPath = decodeURIComponent(src.split(/[?#]/)[0] ?? '');
			} catch {
				continue;
			}
			const dims = await readDims(join(process.cwd(), 'public', cleanPath));
			if (dims) {
				props.width = dims.width;
				props.height = dims.height;
			}
		}
	};

	return function attacher() {
		return transformer;
	};
}
