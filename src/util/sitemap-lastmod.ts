import {
	getSitemapLastmodRegistry,
	normalizeSitemapPath,
} from '../../config/sitemap-source-registry';

/**
 * Record an explicit sitemap `<lastmod>` for the current page from data the build
 * already has (rather than git history). Used by IoT Hub catalog pages, whose
 * content comes from the API — each listing's `updatedTime` (epoch ms) is the
 * real freshness signal, which git can't see.
 *
 * Pass every relevant timestamp (e.g. the `updatedTime` of each item shown on a
 * listing page); the most recent wins. Nullish/invalid values are ignored, and
 * if none remain the page is left to the integration's git-based resolution.
 */
export function recordSitemapLastmod(
	pathname: string,
	epochMsCandidates: Array<number | null | undefined>
): void {
	let latest = 0;
	for (const ms of epochMsCandidates) {
		if (typeof ms === 'number' && Number.isFinite(ms) && ms > latest) latest = ms;
	}
	if (latest > 0) {
		getSitemapLastmodRegistry().set(normalizeSitemapPath(pathname), new Date(latest).toISOString());
	}
}
