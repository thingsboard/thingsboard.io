import AstroSitemap from '@astrojs/sitemap';
import type { AstroIntegration } from 'astro';
import { closeSync, existsSync, openSync, readSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	getSitemapLastmodRegistry,
	getSitemapSourceRegistry,
	maxEpochToIso,
	mergeWorkerSitemapRecords,
	normalizeSitemapPath,
	resetWorkerSitemapRecords,
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
	const innerBuildStartHook = integration.hooks['astro:build:start'];
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
			'astro:build:start': async (params) => {
				resetWorkerSitemapRecords();
				if (innerBuildStartHook) await innerBuildStartHook(params);
			},
			'astro:build:done': async (params) => {
				outDir = fileURLToPath(params.dir);
				mergeWorkerSitemapRecords();
				if (innerHook) await innerHook(params);
			},
		},
	};
}

function isIndexableCanonicalPage(outDir: string, pageUrl: string): boolean {
	const { pathname } = new URL(pageUrl);
	const htmlPath = join(outDir, pathname, 'index.html');
	if (!existsSync(htmlPath)) return false;
	const head = readHead(htmlPath);

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

const HEAD_CHUNK_BYTES = 64 * 1024;
const HEAD_END = Buffer.from('</head>');

/** The document up to `</head>`, or all of it when there is none. Stops reading there: the body is most of a page. */
function readHead(htmlPath: string): string {
	const fd = openSync(htmlPath, 'r');
	try {
		let buf = Buffer.alloc(0);
		const chunk = Buffer.alloc(HEAD_CHUNK_BYTES);
		for (;;) {
			const bytesRead = readSync(fd, chunk, 0, HEAD_CHUNK_BYTES, buf.length);
			if (bytesRead === 0) return buf.toString('utf8');
			// Search from just before the new bytes, in case `</head>` straddles two chunks.
			const searchFrom = Math.max(0, buf.length - HEAD_END.length + 1);
			buf = Buffer.concat([buf, chunk.subarray(0, bytesRead)]);
			const end = buf.indexOf(HEAD_END, searchFrom);
			if (end >= 0) return buf.subarray(0, end).toString('utf8');
		}
	} finally {
		closeSync(fd);
	}
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
