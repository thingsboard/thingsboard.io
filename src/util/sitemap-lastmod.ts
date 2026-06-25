import {
	getSitemapLastmodRegistry,
	maxEpochToIso,
	normalizeSitemapPath,
} from '../../config/sitemap-source-registry';

/**
 * Record an explicit sitemap `<lastmod>` from build-time data instead of git —
 * for IoT Hub pages, whose freshness is each listing's API `updatedTime` that
 * git can't see.
 *
 * `epochMs` is epoch **milliseconds** (seconds would resolve to a 1970 date).
 * Pass a single timestamp or many (each item's `updatedTime`); the most recent
 * wins. Nullish/invalid values are ignored, and if none remain the page falls
 * back to the integration's git-based resolution.
 */
export function recordSitemapLastmod(
	pathname: string,
	epochMs: number | null | undefined | ReadonlyArray<number | null | undefined>
): void {
	const iso = maxEpochToIso(Array.isArray(epochMs) ? epochMs : [epochMs]);
	if (iso) getSitemapLastmodRegistry().set(normalizeSitemapPath(pathname), iso);
}
