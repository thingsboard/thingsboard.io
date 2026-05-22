import AstroSitemap from '@astrojs/sitemap';
import type { AstroIntegration } from 'astro';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Sitemap filter driven by the built HTML itself: a page is included only when
 * it is indexable (no `<meta name="robots" content="noindex">`) and canonical
 * (any `<link rel="canonical">` resolves to the page's own URL). One rule —
 * no parallel allow/deny lists to drift from the actual output.
 */
export function sitemap(): AstroIntegration {
	// Populated by our `astro:build:done` wrapper below, before we delegate to
	// @astrojs/sitemap's own hook (the only place that invokes `filter`). If
	// a future upgrade ever calls the filter from an earlier hook, the explicit
	// throw below makes the broken assumption loud instead of silently letting
	// every page through.
	let outDir: string | null = null;
	const integration = AstroSitemap({
		filter: (page) => {
			if (outDir === null) {
				throw new Error('sitemap filter invoked before `astro:build:done` populated outDir');
			}
			return isIndexableCanonicalPage(outDir, page);
		},
	});
	const innerHook = integration.hooks['astro:build:done'];
	return {
		...integration,
		hooks: {
			...integration.hooks,
			'astro:build:done': async (params) => {
				outDir = fileURLToPath(params.dir);
				if (innerHook) await innerHook(params);
			},
		},
	};
}

function isIndexableCanonicalPage(outDir: string, pageUrl: string): boolean {
	const { pathname } = new URL(pageUrl);
	const htmlPath = join(outDir, pathname, 'index.html');
	if (!existsSync(htmlPath)) return false;
	const html = readFileSync(htmlPath, 'utf8');
	const headEnd = html.indexOf('</head>');
	const head = headEnd >= 0 ? html.slice(0, headEnd) : html;

	if (hasNoindex(head)) return false;

	const canonicalHref = getCanonicalHref(head);
	if (canonicalHref) {
		try {
			const canonical = new URL(canonicalHref, pageUrl);
			if (canonical.href !== new URL(pageUrl).href) return false;
		} catch {
			return false;
		}
	}
	return true;
}

function hasNoindex(head: string): boolean {
	for (const match of head.matchAll(/<meta\s[^>]*>/gi)) {
		const tag = match[0];
		if (!/name=["']robots["']/i.test(tag)) continue;
		if (/content=["'][^"']*\bnoindex\b/i.test(tag)) return true;
	}
	return false;
}

function getCanonicalHref(head: string): string | null {
	for (const match of head.matchAll(/<link\s[^>]*>/gi)) {
		const tag = match[0];
		if (!/rel=["']canonical["']/i.test(tag)) continue;
		const href = tag.match(/href=["']([^"']+)["']/i);
		if (href) return href[1] ?? null;
	}
	return null;
}
