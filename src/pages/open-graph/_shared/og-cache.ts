// The on-disk cache of rendered OG cards. Imported by `render.ts` and by `astro.config.ts`, so it uses
// no path aliases and nothing from Astro.
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

/** Bump when the template, fonts, or rendering pipeline changes — invalidates cache. */
export const TEMPLATE_VERSION = 3;

const CACHE_DIR = path.resolve('node_modules/.og-cache');
const SENTINEL = path.join(CACHE_DIR, '.template-version');

let cacheReady: Promise<void> | null = null;

/**
 * Make sure the cache folder exists and holds this TEMPLATE_VERSION, emptying it otherwise. The build
 * runs this once on the main thread (`prepareOgCacheOnce` in `astro.config.ts`), so render workers
 * calling it again find the version in place and never empty a folder another worker is writing to.
 */
export function prepareOgCache(): Promise<void> {
	cacheReady ??= (async () => {
		try {
			const version = (await readFile(SENTINEL, 'utf8')).trim();
			if (version === String(TEMPLATE_VERSION)) return;
		} catch {
			// missing or unreadable — fall through to recreate
		}
		await rm(CACHE_DIR, { recursive: true, force: true });
		await mkdir(CACHE_DIR, { recursive: true });
		await writeFile(SENTINEL, String(TEMPLATE_VERSION));
	})();
	return cacheReady;
}

export async function readCache(key: string): Promise<Buffer | null> {
	try {
		return await readFile(path.join(CACHE_DIR, `${key}.png`));
	} catch (e) {
		if ((e as NodeJS.ErrnoException).code === 'ENOENT') return null;
		throw e;
	}
}

/** Temp file + rename, so a reader on another thread gets the whole card or none. */
export async function writeCache(key: string, buf: Buffer): Promise<void> {
	await prepareOgCache();
	const file = path.join(CACHE_DIR, `${key}.png`);
	const tmp = path.join(CACHE_DIR, `${key}.${randomUUID()}.tmp`);
	try {
		await writeFile(tmp, buf);
		await rename(tmp, file);
	} catch (e) {
		await rm(tmp, { force: true });
		throw e;
	}
}
