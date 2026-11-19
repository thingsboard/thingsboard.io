// src/pages/open-graph/_shared/render.ts
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Card, type CardProps } from './Card';
import { prepareOgCache, readCache, TEMPLATE_VERSION, writeCache } from './og-cache';

const FONT_DIR = path.resolve('src/pages/open-graph/_fonts');

type RobotoWeight = 400 | 500 | 700;
const ROBOTO_SUBSETS = [
	'latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese',
] as const;
const ROBOTO_WEIGHTS: RobotoWeight[] = [400, 500, 700];

interface LoadedFont {
	name: 'Roboto' | 'Noto Sans Symbols';
	data: Buffer;
	weight: 400 | 500 | 700;
	style: 'normal';
}

let cachedFonts: LoadedFont[] | null = null;

/**
 * Load the full Roboto family (Latin + Latin-ext + Cyrillic + Cyrillic-ext +
 * Greek + Greek-ext + Vietnamese) as 21 separate subset files registered under
 * the same `Roboto` family — Satori falls through across them per glyph.
 * Noto Sans Symbols (regular only) covers Arrows / misc symbols that Roboto
 * doesn't carry (e.g. U+2194 ↔). Cards declare it as the `font-family` fallback
 * after Roboto so symbol glyphs land correctly.
 */
async function loadFonts(): Promise<LoadedFont[]> {
	if (cachedFonts) return cachedFonts;
	const subsetReads = ROBOTO_SUBSETS.flatMap((subset) =>
		ROBOTO_WEIGHTS.map(async (weight): Promise<LoadedFont> => ({
			name: 'Roboto',
			data: await readFile(path.join(FONT_DIR, `roboto/${subset}-${weight}-normal.ttf`)),
			weight,
			style: 'normal',
		})),
	);
	const symbolsRead: Promise<LoadedFont> = readFile(
		path.join(FONT_DIR, 'noto-sans-symbols/symbols-400-normal.ttf'),
	).then((data) => ({ name: 'Noto Sans Symbols', data, weight: 400, style: 'normal' }));
	cachedFonts = await Promise.all([...subsetReads, symbolsRead]);
	return cachedFonts;
}

function cacheKey(props: CardProps): string {
	const payload = JSON.stringify({ v: TEMPLATE_VERSION, ...props });
	return createHash('sha1').update(payload).digest('hex');
}

interface Renderers {
	satori: typeof import('satori').default;
	renderAsync: typeof import('@resvg/resvg-js').renderAsync;
}

let renderers: Promise<Renderers> | null = null;

/**
 * Imported on the first cache miss: loading resvg's native binding costs ~2 s per thread,
 * and a warm cache or `SKIP_OG` never renders a card.
 */
function loadRenderers(): Promise<Renderers> {
	renderers ??= Promise.all([import('satori'), import('@resvg/resvg-js')]).then(([s, r]) => ({
		satori: s.default,
		renderAsync: r.renderAsync,
	}));
	return renderers;
}

/**
 * Render a single OG card to PNG.
 * In SKIP_OG mode, returns the global fallback so endpoints can keep declaring
 * their static paths without paying the rendering cost.
 */
export async function renderCard(props: CardProps): Promise<Buffer> {
	if (process.env.SKIP_OG) {
		return readFile(path.resolve('public/thingsboard-og.png'));
	}

	await prepareOgCache();
	const key = cacheKey(props);
	const hit = await readCache(key);
	if (hit) return hit;

	const [fonts, { satori, renderAsync }] = await Promise.all([loadFonts(), loadRenderers()]);
	const svg = await satori(Card(props) as never, {
		width: 1200,
		height: 630,
		fonts: fonts.map(({ name, data, weight, style }) => ({ name, data, weight, style })),
	});
	// Rasterise on the napi threadpool rather than blocking the main thread the way
	// the synchronous `Resvg#render()` does. Rasterising is ~91 % of a card's cost
	// (≈145 ms of 158 ms; satori itself is only ~13 ms), so this is what lets
	// `build.concurrency` actually overlap renders: measured 158 → 36 ms per card,
	// dropping the 3314-card OG phase from 8m13s to ~2m.
	const buf = Buffer.from((await renderAsync(svg)).asPng());
	await writeCache(key, buf);
	return buf;
}
