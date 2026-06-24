/**
 * Shared, process-wide registry mapping a built docs page's pathname to the
 * repo-relative source file(s) it was rendered from (the content wrapper plus,
 * for thin stubs, its `_includes` file). Populated by the Starlight route
 * middleware (`src/routeData.ts`) while real content-collection pages render at
 * build time — those are the only pages that actually run the route middleware.
 * Consumed afterwards by the sitemap integration (`config/integrations/sitemap.ts`)
 * to derive `<lastmod>` from git history; the integration resolves every NON-docs
 * page (marketing, blog, dynamic docs) itself from the build's route table, so it
 * does not rely on this registry for them.
 *
 * The two consumers live in different Vite module graphs (config loader vs. the
 * SSR app bundle), so a plain module-level `Map` would be duplicated — each side
 * would see its own empty copy. Anchoring the Map on `globalThis` via a
 * `Symbol.for` (a realm-global, shared symbol) guarantees both sides resolve the
 * exact same instance within the single Node process that `astro build` uses.
 *
 * Stored paths are relative to the repo root (e.g. `src/content/docs/...mdx`),
 * matching the keys emitted by `git log --name-only`, so the sitemap can look
 * them up directly.
 */

const REGISTRY_KEY = Symbol.for('thingsboard.sitemap.source-registry');

/** Repo-relative source file paths a page is built from, e.g. `[wrapper, include?]`. */
export type SitemapSources = string[];

type Registry = Map<string, SitemapSources>;

export function getSitemapSourceRegistry(): Registry {
	const store = globalThis as Record<symbol, unknown>;
	if (!store[REGISTRY_KEY]) store[REGISTRY_KEY] = new Map<string, SitemapSources>();
	return store[REGISTRY_KEY] as Registry;
}

/**
 * Companion registry of EXPLICIT `<lastmod>` values (ISO strings) keyed by
 * pathname, for pages whose freshness comes from data the build fetched rather
 * than git — e.g. IoT Hub catalog pages, where each listing carries an API
 * `updatedTime`. Written by `src/util/sitemap-lastmod.ts` during page render and
 * read by the sitemap integration, which prefers it over any git-derived date.
 */
const LASTMOD_REGISTRY_KEY = Symbol.for('thingsboard.sitemap.lastmod-registry');

export function getSitemapLastmodRegistry(): Map<string, string> {
	const store = globalThis as Record<symbol, unknown>;
	if (!store[LASTMOD_REGISTRY_KEY]) store[LASTMOD_REGISTRY_KEY] = new Map<string, string>();
	return store[LASTMOD_REGISTRY_KEY] as Map<string, string>;
}

/** Canonical key shape: always a single leading and trailing slash. */
export function normalizeSitemapPath(pathname: string): string {
	let p = pathname;
	if (!p.startsWith('/')) p = '/' + p;
	if (!p.endsWith('/')) p = p + '/';
	return p;
}
