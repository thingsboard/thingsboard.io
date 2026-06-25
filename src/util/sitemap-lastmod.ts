import {
	getSitemapLastmodRegistry,
	normalizeSitemapPath,
} from '../../config/sitemap-source-registry';

/**
 * Record an explicit sitemap `<lastmod>` from build-time data instead of git —
 * for IoT Hub pages, whose freshness is each listing's API `updatedTime` (epoch
 * ms) that git can't see.
 *
 * Pass a single timestamp or many (each item's `updatedTime`); the most recent
 * wins. Nullish/invalid values are ignored, and if none remain the page falls
 * back to the integration's git-based resolution.
 */
export function recordSitemapLastmod(
	pathname: string,
	epochMs: number | null | undefined | ReadonlyArray<number | null | undefined>
): void {
	const candidates = Array.isArray(epochMs) ? epochMs : [epochMs];
	let latest = 0;
	for (const ms of candidates) {
		if (typeof ms === 'number' && Number.isFinite(ms) && ms > latest) latest = ms;
	}
	if (latest > 0) {
		getSitemapLastmodRegistry().set(normalizeSitemapPath(pathname), new Date(latest).toISOString());
	}
}
