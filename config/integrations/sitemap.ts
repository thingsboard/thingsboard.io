import AstroSitemap from '@astrojs/sitemap';
import type { AstroIntegration } from 'astro';

// Pages that ship `<meta robots="noindex">`. Listing them in the sitemap
// while serving noindex is a soft error in Search Console. Keep in sync with
// `noIndex={true}` in BaseLayout/SeoMeta and the `/search/` noindex injected
// in routeData.ts.
const NOINDEX_PATHS = new Set([
	'/contact-us-thanks/',
	'/partners/hardware/apply-thanks/',
]);
// Suffixes for paths that legitimately repeat across language/product trees
// (e.g. /404/, /uk/404/, /docs/pe/search/).
const NOINDEX_SUFFIXES = ['/404/', '/search/'];
// Path-prefix patterns excluded from the sitemap (work-in-progress sections
// that ship `<meta robots="noindex">`). Matches both root and `/uk/` trees.
const NOINDEX_PREFIX_REGEXES = [/^\/(uk\/)?docs\/iot-hub\//];

export function sitemap(): AstroIntegration {
	return AstroSitemap({
		filter: (page) => {
			const path = new URL(page).pathname;
			if (NOINDEX_PATHS.has(path)) return false;
			if (NOINDEX_SUFFIXES.some((s) => path.endsWith(s))) return false;
			return !NOINDEX_PREFIX_REGEXES.some((re) => re.test(path));
		},
	});
}
