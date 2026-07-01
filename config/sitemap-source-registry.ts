/**
 * State shared between the two halves of the sitemap feature — the route
 * middleware (`src/routeData.ts`) that records docs sources, and the integration
 * (`config/integrations/sitemap.ts`) that derives `<lastmod>`. They live in
 * different Vite module graphs, so a module-level `Map` would be duplicated;
 * anchoring on `globalThis` via `Symbol.for` gives one instance per `astro build`.
 *
 * Stored paths are repo-relative (e.g. `src/content/docs/...mdx`), matching the
 * keys from `git log --name-only` so the sitemap can look them up directly.
 *
 * The maps are append-only for the process lifetime and never cleared — this
 * assumes one `astro build` per process. A process that builds twice (a watch
 * mode, a test runner) would accumulate stale entries and must reset them first.
 */

import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * Env that makes git trust a checkout owned by another user (CI "dubious
 * ownership"). `safe.directory` is only read from global/system config, so we
 * point `GIT_CONFIG_GLOBAL` at a temp config setting it to `*`.
 */
let cachedGitEnv: NodeJS.ProcessEnv | null = null;
export function gitEnvTrustingRepo(): NodeJS.ProcessEnv {
	if (cachedGitEnv) return cachedGitEnv;
	try {
		const configPath = join(tmpdir(), 'tb-sitemap-safe-directory.gitconfig');
		writeFileSync(configPath, '[safe]\n\tdirectory = *\n');
		cachedGitEnv = { ...process.env, GIT_CONFIG_GLOBAL: configPath };
	} catch {
		cachedGitEnv = process.env;
	}
	return cachedGitEnv;
}

/** Lazily create-or-fetch a `globalThis`-anchored `Map` for the given shared symbol. */
function globalMap<K, V>(key: symbol): Map<K, V> {
	const store = globalThis as Record<symbol, unknown>;
	if (!store[key]) store[key] = new Map<K, V>();
	return store[key] as Map<K, V>;
}

const REGISTRY_KEY = Symbol.for('thingsboard.sitemap.source-registry');

/** Repo-relative source file paths a page is built from, e.g. `[wrapper, include?]`. */
export type SitemapSources = string[];

export function getSitemapSourceRegistry(): Map<string, SitemapSources> {
	return globalMap<string, SitemapSources>(REGISTRY_KEY);
}

/**
 * Companion registry of EXPLICIT `<lastmod>` ISO strings, for pages whose
 * freshness comes from build-time data rather than git (IoT Hub listings'
 * `updatedTime`). Written by `src/util/sitemap-lastmod.ts`; the integration
 * prefers it over any git-derived date.
 */
const LASTMOD_REGISTRY_KEY = Symbol.for('thingsboard.sitemap.lastmod-registry');

export function getSitemapLastmodRegistry(): Map<string, string> {
	return globalMap<string, string>(LASTMOD_REGISTRY_KEY);
}

/**
 * Largest finite, positive epoch (ms) among the inputs, as an ISO string — or
 * `null` if none qualify. Shared by both `<lastmod>` paths (git commit dates and
 * explicit API timestamps) so the formatting stays identical.
 */
export function maxEpochToIso(epochsMs: Iterable<number | null | undefined>): string | null {
	let latest = 0;
	for (const ms of epochsMs) {
		if (typeof ms === 'number' && Number.isFinite(ms) && ms > latest) latest = ms;
	}
	return latest > 0 ? new Date(latest).toISOString() : null;
}

/** Canonical key shape: always a single leading and trailing slash. */
export function normalizeSitemapPath(pathname: string): string {
	let p = pathname;
	if (!p.startsWith('/')) p = '/' + p;
	if (!p.endsWith('/')) p = p + '/';
	return p;
}

/** Absolute (or already-relative) source path → repo-relative (`src/...`), or `null`. */
export function toRepoRelative(filePath: string): string | null {
	const marker = filePath.indexOf('/src/');
	if (marker >= 0) return filePath.slice(marker + 1);
	return filePath.startsWith('src/') ? filePath : null;
}

/**
 * Repo root, resolved once via `git rev-parse` (cwd fallback when git is absent).
 * Shared so both consumers anchor repo-relative paths to the same root.
 */
let cachedRepoRoot: string | null = null;
export function getRepoRoot(): string {
	if (cachedRepoRoot === null) {
		try {
			cachedRepoRoot = execFileSync('git', ['rev-parse', '--show-toplevel'], {
				encoding: 'utf8',
				env: gitEnvTrustingRepo(),
			}).trim();
		} catch {
			cachedRepoRoot = process.cwd();
		}
	}
	return cachedRepoRoot;
}
