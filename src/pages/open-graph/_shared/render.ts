// src/pages/open-graph/_shared/render.ts
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { Card, type CardProps } from './Card';

/** Bump when the template, fonts, or rendering pipeline changes — invalidates cache. */
const TEMPLATE_VERSION = 3;

const CACHE_DIR = path.resolve('node_modules/.og-cache');
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

async function readCache(key: string): Promise<Buffer | null> {
	try {
		return await readFile(path.join(CACHE_DIR, `${key}.png`));
	} catch (e) {
		if ((e as NodeJS.ErrnoException).code === 'ENOENT') return null;
		throw e;
	}
}

async function writeCache(key: string, buf: Buffer): Promise<void> {
	await ensureCacheDir();
	await writeFile(path.join(CACHE_DIR, `${key}.png`), buf);
}

let cacheDirReady: Promise<void> | null = null;

/**
 * Ensure CACHE_DIR exists and matches TEMPLATE_VERSION. On a version mismatch
 * (or missing sentinel) we wipe the directory so stale PNGs from older
 * template revisions don't accumulate forever in `node_modules/.og-cache/`.
 */
function ensureCacheDir(): Promise<void> {
	if (cacheDirReady) return cacheDirReady;
	cacheDirReady = (async () => {
		const sentinel = path.join(CACHE_DIR, '.template-version');
		try {
			const v = (await readFile(sentinel, 'utf8')).trim();
			if (v === String(TEMPLATE_VERSION)) return;
		} catch {
			// missing or unreadable — fall through to recreate
		}
		await rm(CACHE_DIR, { recursive: true, force: true });
		await mkdir(CACHE_DIR, { recursive: true });
		await writeFile(sentinel, String(TEMPLATE_VERSION));
	})();
	return cacheDirReady;
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

	await ensureCacheDir();
	const key = cacheKey(props);
	const hit = await readCache(key);
	if (hit) return hit;

	const fonts = await loadFonts();
	const svg = await satori(Card(props) as never, {
		width: 1200,
		height: 630,
		fonts: fonts.map(({ name, data, weight, style }) => ({ name, data, weight, style })),
	});
	const buf = Buffer.from(new Resvg(svg).render().asPng());
	await writeCache(key, buf);
	return buf;
}
