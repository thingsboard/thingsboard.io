import AstroSitemap from '@astrojs/sitemap';
import type { AstroIntegration } from 'astro';

/** Get a preconfigured instance of the `@astrojs/sitemap` integration. */
export function sitemap(): AstroIntegration {
	return AstroSitemap({
		filter: (page) => {
			const path = new URL(page).pathname;
			// Exclude 404 and search pages — no SEO value.
			return !path.endsWith('/404/') && !path.endsWith('/search/');
		},
	});
}
