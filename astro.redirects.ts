import type { AstroUserConfig } from 'astro';
import { NON_DOCS_REDIRECTS } from './src/data/redirects.ts';
import { BLOG_CATEGORIES } from './src/data/blog/categories.ts';
import { feedbackCategories } from './src/data/clients-feedback/index.ts';
import deviceLibraryRedirects from './scripts/device-library-redirects.json' with { type: 'json' };
import docsRedirects from './public/redirects.json' with { type: 'json' };

// Thin adapter feeding Astro's config `redirects:`. Source of truth lives in
// src/data/redirects.ts. See CLAUDE.md → ## Redirects for the full workflow.

// Dev-mode-only fallback. In prod, DYNAMIC_REDIRECTS in src/data/redirects.ts
// already cover these URL spaces via splat/placeholder rules at the Cloudflare
// edge. We enumerate the finite shapes here to keep `pnpm dev` / `pnpm preview`
// from 404-ing, without bloating public/_redirects with duplicate static rules.
//
// Exported separately so the link checker can skip existence checks on these
// entries — their targets (search pages, paginated views) are not in the sitemap.
export const devFallbackRedirects: Record<string, string> = {
	'/docs/gw/search/': '/docs/iot-gateway/search/',
	'/docs/license/search/': '/docs/license-server/search/',
	'/docs/pe/edge/search/': '/docs/edge/pe/search/',
	'/docs/pe/mobile/search/': '/docs/mobile/pe/search/',
	'/docs/pe/mqtt-broker/search/': '/docs/mqtt-broker/pe/search/',
};
const INDUSTRY_SLUGS = feedbackCategories.map((c) => c.key);
for (const slug of INDUSTRY_SLUGS) {
	devFallbackRedirects[`/industries/${slug}/`] = `/clients-feedback/?category=${slug}`;
}
for (const cat of BLOG_CATEGORIES) {
	devFallbackRedirects[`/blog/category/${cat}/`] = `/blog/?category=${cat}`;
	for (let page = 2; page <= 5; page++) {
		devFallbackRedirects[`/blog/category/${cat}/page/${page}/`] = `/blog/?category=${cat}`;
	}
}
for (let page = 2; page <= 11; page++) {
	devFallbackRedirects[`/blog/page/${page}/`] = `/blog/?page=${page}`;
}

export const redirects: AstroUserConfig['redirects'] = {
	...docsRedirects,
	...deviceLibraryRedirects,
	...NON_DOCS_REDIRECTS,
	...devFallbackRedirects,
};
