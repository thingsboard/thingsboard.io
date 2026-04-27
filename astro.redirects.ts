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
const INDUSTRY_SLUGS = feedbackCategories.map((c) => c.key);

const devFallback: Record<string, string> = {
	'/docs/gw/search/': '/docs/iot-gateway/search/',
	'/docs/license/search/': '/docs/license-server/search/',
};
for (const slug of INDUSTRY_SLUGS) {
	devFallback[`/industries/${slug}/`] = `/clients-feedback/?category=${slug}`;
}
for (const cat of BLOG_CATEGORIES) {
	devFallback[`/blog/category/${cat}/`] = `/blog/?category=${cat}`;
	for (let page = 2; page <= 5; page++) {
		devFallback[`/blog/category/${cat}/page/${page}/`] = `/blog/?category=${cat}`;
	}
}
for (let page = 2; page <= 11; page++) {
	devFallback[`/blog/page/${page}/`] = `/blog/?page=${page}`;
}

export const redirects: AstroUserConfig['redirects'] = {
	...docsRedirects,
	...deviceLibraryRedirects,
	...NON_DOCS_REDIRECTS,
	...devFallback,
};
