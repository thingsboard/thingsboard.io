import type { AstroUserConfig } from 'astro';
import { NON_DOCS_REDIRECTS } from './src/data/redirects.ts';
import { BLOG_CATEGORIES } from './src/data/blog/categories.ts';
import { feedbackCategories } from './src/data/clients-feedback/index.ts';
import { UPGRADE_FAMILIES, getFamilySlug } from './src/models/upgrade-instructions.ts';
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

// Blog — WordPress year/month archives → blog index.
// Mirrors DYNAMIC_REDIRECTS splats /blog/{2023..2026}/* → /blog/ in public/_redirects.
for (const year of [2023, 2024, 2025, 2026]) {
	for (let month = 1; month <= 12; month++) {
		const mm = String(month).padStart(2, '0');
		devFallbackRedirects[`/blog/${year}/${mm}/`] = '/blog/';
	}
}

// Edge upgrade-instructions — legacy versioned paths collapse to the per-platform page.
// Mirrors DYNAMIC_REDIRECTS placeholder rule. UPGRADE_FAMILIES covers all v3-0-x..v4-3-x.
const EDGE_PLATFORMS = ['centos', 'docker', 'ubuntu', 'windows'];
for (const platform of EDGE_PLATFORMS) {
	for (const family of UPGRADE_FAMILIES) {
		const slug = getFamilySlug(family);
		devFallbackRedirects[
			`/docs/user-guide/install/edge/upgrade-instructions/${platform}/${slug}/`
		] = `/docs/edge/installation/upgrade-instructions/${platform}/`;
		devFallbackRedirects[
			`/docs/user-guide/install/pe/edge/upgrade-instructions/${platform}/${slug}/`
		] = `/docs/edge/pe/installation/upgrade-instructions/${platform}/`;
	}
}

// Trendz upgrade-instructions — legacy /install/ paths kept their version suffix under
// /installation/. Mirrors the prefix-rename splat /docs/trendz/install/* → /docs/trendz/installation/:splat
// in public/_redirects (CATCH_ALL_REDIRECTS group with empty entries).
const TRENDZ_PLATFORMS = ['centos', 'docker', 'ubuntu', 'windows'];
const TRENDZ_FAMILY_SLUGS = ['v1-8-x', 'v1-9-x', 'v1-10-x', 'v1-11-x', 'v1-12-x', 'v1-13-x', 'v1-14-x', 'v1-15-x'];
for (const platform of TRENDZ_PLATFORMS) {
	for (const slug of TRENDZ_FAMILY_SLUGS) {
		devFallbackRedirects[`/docs/trendz/install/upgrade-instructions/${platform}/${slug}/`] =
			`/docs/trendz/installation/upgrade-instructions/${platform}/${slug}/`;
	}
}

export const redirects: AstroUserConfig['redirects'] = {
	...docsRedirects,
	...deviceLibraryRedirects,
	...NON_DOCS_REDIRECTS,
	...devFallbackRedirects,
};
