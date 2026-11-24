import type { AstroIntegration } from 'astro';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOCK_OPEN = '<div class="expressive-code">';
// The stylesheet link Expressive Code puts inside one code block per page, with the module script
// that follows it when there is one.
const STYLES =
	/<link rel="stylesheet" href="[^"]*\/ec\.[^"]+\.css">(?:<script type="module" src="[^"]*\/ec\.[^"]+\.js"><\/script>)?/;
const LINK_START = Buffer.from('<link rel="stylesheet"');
// A redirect stub is a few hundred bytes; no real page is this small.
const SMALLEST_REAL_PAGE = 4000;

/**
 * Moves the code-block stylesheet into the first code block of any page where it landed in a later one.
 *
 * Expressive Code attaches its stylesheet to the first `<Code>` component that *starts* rendering, and
 * Astro renders siblings in parallel, so a `<Code>` nested in `<Steps>` or `<Tabs>` starts after one
 * that sits at the top level further down the page. On such a page every block above the stylesheet
 * is painted unstyled until it loads: long lines do not scroll inside their block, and on a phone
 * they widen the whole page for a moment. Two pages had it when this was written (the PE Docker
 * installation guides, 20 blocks each).
 */
export function codeStylesFirst(): AstroIntegration {
	return {
		name: 'code-styles-first',
		hooks: {
			'astro:build:done': ({ dir, pages, logger }) => {
				const outDir = fileURLToPath(dir);
				const moved: string[] = [];
				for (const { pathname } of pages) {
					const file = join(outDir, pathname, 'index.html');
					// Searched as bytes: decoding every page to a string took about 20 seconds per build, and
					// all but a handful of pages are done after these two look-ups.
					let bytes: Buffer;
					try {
						if (statSync(file).size < SMALLEST_REAL_PAGE) continue;
						bytes = readFileSync(file);
					} catch {
						// Not every built route is `<pathname>/index.html` (404.html, endpoints).
						continue;
					}
					const firstBlockAt = bytes.indexOf(BLOCK_OPEN);
					if (firstBlockAt === -1) continue;
					const afterOpen = firstBlockAt + BLOCK_OPEN.length;
					// The usual case: the stylesheet link is the first thing inside the first block.
					if (bytes.subarray(afterOpen, afterOpen + LINK_START.length).equals(LINK_START)) continue;

					let html = bytes.toString('utf8');
					const firstBlock = html.indexOf(BLOCK_OPEN);
					const styles = STYLES.exec(html);
					// Nothing to do when the stylesheet is missing, or already ahead of the first block.
					if (!styles || styles.index <= firstBlock) continue;
					const insertAt = firstBlock + BLOCK_OPEN.length;
					html =
						html.slice(0, insertAt) +
						styles[0] +
						html.slice(insertAt, styles.index) +
						html.slice(styles.index + styles[0].length);
					writeFileSync(file, html);
					moved.push(pathname);
				}
				if (moved.length > 0) logger.info(`moved the code stylesheet up on ${moved.length} pages: ${moved.join(', ')}`);
			},
		},
	};
}
