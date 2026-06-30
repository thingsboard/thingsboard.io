import AstroSitemap from '@astrojs/sitemap';
import type { AstroIntegration } from 'astro';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	getSitemapLastmodRegistry,
	getSitemapSourceRegistry,
	maxEpochToIso,
	normalizeSitemapPath,
} from '../sitemap-source-registry';
import { getGitDateMap } from '../sitemap/git-date';
import { captureRoutes } from '../sitemap/route-match';
import { resolveNonDocSources } from '../sitemap/source-resolve';

/**
 * Sitemap integration. Includes a page only when its built HTML is indexable
 * (no `noindex`) and self-canonical — reading the real output instead of keeping
 * allow/deny lists that drift from it — and adds a `<lastmod>` per entry.
 */
export function sitemap(): AstroIntegration {
	// Set by our `astro:build:done` wrapper before @astrojs/sitemap's own hook
	// (the only caller of `filter`). The throw guards a future version that calls
	// `filter` earlier — better loud than letting every page through.
	let outDir: string | null = null;
	const integration = AstroSitemap({
		filter: (page) => {
			if (outDir === null) {
				throw new Error('sitemap filter invoked before `astro:build:done` populated outDir');
			}
			return isIndexableCanonicalPage(outDir, page);
		},
		serialize: (item) => {
			const lastmod = getLastmod(item.url);
			if (lastmod) item.lastmod = lastmod;
			return item;
		},
	});
	const innerHook = integration.hooks['astro:build:done'];
	const innerRoutesHook = integration.hooks['astro:routes:resolved'];
	return {
		...integration,
		hooks: {
			...integration.hooks,
			// Capture the route table so non-docs pages (which never run the Starlight
			// route middleware) can be mapped from their URL to a source `.astro` file.
			'astro:routes:resolved': async (params) => {
				captureRoutes(params.routes);
				if (innerRoutesHook) await innerRoutesHook(params);
			},
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

/**
 * `<lastmod>` for an entry: the newest git commit date across the page's source
 * file(s) — so editing the wrapper, its `_includes`, or a marketing page's data
 * file all move the date. Returns `null` (no `<lastmod>`) when nothing maps or
 * the sources aren't in git.
 */
function getLastmod(url: string): string | null {
	let pathname: string;
	try {
		pathname = new URL(url).pathname;
	} catch {
		return null;
	}
	const key = normalizeSitemapPath(pathname);

	// Explicit build-data dates (IoT Hub `updatedTime`) win over git.
	const explicit = getSitemapLastmodRegistry().get(key);
	if (explicit) return explicit;

	// Docs come from the route-middleware registry; non-docs are resolved here
	// (they never run the middleware).
	const sources = getSitemapSourceRegistry().get(key) ?? resolveNonDocSources(pathname);
	if (sources.length === 0) return null;

	const dates = getGitDateMap();
	return maxEpochToIso(sources.map((rel) => dates.get(rel)));
}
