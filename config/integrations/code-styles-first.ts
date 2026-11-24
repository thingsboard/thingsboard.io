import type { AstroIntegration } from 'astro';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BLOCK_OPEN = Buffer.from('<div class="expressive-code');
const QUOTE = 0x22;
const SPACE = 0x20;
const TAG_END = 0x3e;

function firstBlockContentAt(bytes: Buffer): number {
	for (let at = bytes.indexOf(BLOCK_OPEN); at !== -1; at = bytes.indexOf(BLOCK_OPEN, at + 1)) {
		const next = bytes[at + BLOCK_OPEN.length];
		if (next !== QUOTE && next !== SPACE) continue;
		const tagEnd = bytes.indexOf(TAG_END, at);
		return tagEnd === -1 ? -1 : tagEnd + 1;
	}
	return -1;
}

const STYLES =
	/<link rel="stylesheet" href="[^"]*\/ec\.[^"]+\.css">(?:<script type="module" src="[^"]*\/ec\.[^"]+\.js"><\/script>)?/;
const LINK_START = Buffer.from('<link rel="stylesheet"');
const SMALLEST_REAL_PAGE = 4000;

/**
 * Moves the code-block stylesheet into a page's first code block when it landed in a later one.
 * Expressive Code attaches it to the first `<Code>` that starts rendering, which is not always the
 * first on the page; the blocks above it are then painted unstyled and can widen a phone page.
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
					let bytes: Buffer;
					try {
						if (statSync(file).size < SMALLEST_REAL_PAGE) continue;
						bytes = readFileSync(file);
					} catch {
						continue;
					}
					const afterOpen = firstBlockContentAt(bytes);
					if (afterOpen === -1) continue;
					if (bytes.subarray(afterOpen, afterOpen + LINK_START.length).equals(LINK_START)) continue;

					let html = bytes.toString('utf8');
					const insertAt = bytes.subarray(0, afterOpen).toString('utf8').length;
					const styles = STYLES.exec(html);
					if (!styles || styles.index < insertAt) continue;
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
