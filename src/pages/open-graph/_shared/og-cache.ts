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
 * Make sure the cache folder exists and belongs to this TEMPLATE_VERSION. A folder from another
 * version (or with no version file) is emptied, so cards from old templates do not pile up.
 *
 * The build calls this once on the main thread before pages render (`prepareOgCacheOnce` in
 * `astro.config.ts`). Render worker threads each call it again, find the version file in place and
 * leave the folder alone. Without that first call every worker would empty the folder itself, and
 * one could delete cards another had just written.
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

/**
 * Write the card under a temporary name and rename it into place. A rename is a single step, so
 * another thread reading the same card gets either no file or the whole file, never half of one.
 */
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
