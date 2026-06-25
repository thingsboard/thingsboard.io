import AstroSitemap from '@astrojs/sitemap';
import type { AstroIntegration } from 'astro';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	getRepoRoot,
	getSitemapLastmodRegistry,
	getSitemapSourceRegistry,
	normalizeSitemapPath,
	toRepoRelative,
} from '../sitemap-source-registry';

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

type ResolvedPageRoute = {
	type: string;
	isPrerendered: boolean;
	pathname?: string | null;
	patternRegex: RegExp;
	entrypoint: string;
};

/** Static URL → component (`src/pages/...`). */
const staticRouteComponents = new Map<string, string>();
/** Dynamic routes, matched by pattern when no static URL hits. */
const dynamicRouteComponents: { regex: RegExp; component: string }[] = [];

function captureRoutes(routes: ResolvedPageRoute[]): void {
	staticRouteComponents.clear();
	dynamicRouteComponents.length = 0;
	for (const route of routes) {
		if (route.type !== 'page' || !route.isPrerendered) continue;
		const component = toRepoRelative(route.entrypoint);
		// Only real page components; Starlight's content route resolves elsewhere
		// (handled by the middleware-populated registry) and yields a non-src entry.
		if (!component || !component.startsWith('src/pages/')) continue;
		if (route.pathname) staticRouteComponents.set(normalizeSitemapPath(route.pathname), component);
		else dynamicRouteComponents.push({ regex: route.patternRegex, component });
	}
}

/** Repo-relative `.astro` component that renders `pathname`, or `null`. */
function matchRouteComponent(pathname: string): string | null {
	const key = normalizeSitemapPath(pathname);
	const exact = staticRouteComponents.get(key);
	if (exact) return exact;
	const noTrailing = pathname.replace(/\/+$/, '');
	for (const route of dynamicRouteComponents) {
		if (route.regex.test(pathname) || route.regex.test(noTrailing) || route.regex.test(key)) {
			return route.component;
		}
	}
	return null;
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
 * `<lastmod>` for a sitemap entry, derived from git history of the page's source
 * file(s). The route middleware records, per page, the repo-relative sources it
 * was built from — the docs wrapper plus its `_includes` file (the same source
 * the "Edit page" link targets), or the data/MDX file for marketing pages. We
 * take the most recent commit date across them, so a content edit in the include
 * or a frontmatter edit in the wrapper both move the date.
 *
 * Returns `null` (entry left without `<lastmod>`) when no source was recorded or
 * none is tracked in git.
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
	let latest = 0;
	for (const rel of sources) {
		const epoch = dates.get(rel);
		if (epoch && epoch > latest) latest = epoch;
	}
	return latest > 0 ? new Date(latest).toISOString() : null;
}

/**
 * Per-collection slug → data-file rules for pages whose content lives outside a
 * Starlight content entry. We point at the file that actually holds the item's
 * content — editing one item should move only that page's `<lastmod>`, not every
 * sibling's (the shared `[slug].astro` template imports the whole collection).
 */
const SITEMAP_DATA_RULES: { re: RegExp; file: (slug: string) => string }[] = [
	{ re: /^\/use-cases\/([^/]+)\/$/, file: (s) => `src/data/use-cases/${s}.ts` },
	{ re: /^\/case-studies\/([^/]+)\/$/, file: (s) => `src/data/case-studies/${s}.ts` },
	{ re: /^\/blog\/(.+)\/$/, file: (s) => `src/content/blog/${s}.mdx` },
	// Careers detail pages all live in one aggregated data file.
	{ re: /^\/careers\/([^/]+)\/$/, file: () => `src/data/careers/jobs.ts` },
	{ re: /^\/clients-feedback\/$/, file: () => `src/data/clients-feedback/index.ts` },
];

/**
 * Repo-relative source file(s) for a non-docs page. A per-slug data rule pins the
 * item's content file; otherwise the route's `.astro` component plus the
 * data/JSON it imports for content. `[]` (→ no `<lastmod>`) when nothing maps.
 */
function resolveNonDocSources(pathname: string): string[] {
	for (const rule of SITEMAP_DATA_RULES) {
		const match = pathname.match(rule.re);
		if (!match) continue;
		const file = rule.file(match[1] ?? '');
		// Trust the rule only if its file exists; greedy rules also match sibling
		// URLs (e.g. `/blog/page/N/`), which fall through to the route component.
		if (existsSync(join(getRepoRoot(), file))) return [file];
		break;
	}
	const component = matchRouteComponent(pathname);
	if (!component) return [];
	return [component, ...scanContentImports(component)];
}

const IMPORT_FROM_REGEX = /\bfrom\s+['"]([^'"]+)['"]/g;
const BARE_IMPORT_REGEX = /^\s*import\s+['"]([^'"]+)['"]/gm;
/** Local component/layout imports worth descending into (one level) for their data. */
const LOCAL_UI_PREFIXES = ['@components/', '@layouts/', '@root/components/', '@root/layouts/'];
const contentImportCache = new Map<string, string[]>();

/**
 * Repo-relative data/JSON files a page renders, so a content edit there moves the
 * page's `<lastmod>` even though the content lives outside the `.astro` template.
 * Scans the template's own imports plus those of the components/layouts it imports
 * directly (one level deep). Limitation: content loaded via `getCollection()` is
 * not traced — only static `import` specifiers are.
 */
function scanContentImports(templateRel: string, descend = true): string[] {
	const cacheKey = `${descend ? 'd' : 's'}:${templateRel}`;
	const cached = contentImportCache.get(cacheKey);
	if (cached) return cached;

	let source: string;
	try {
		source = readFileSync(join(getRepoRoot(), templateRel), 'utf8');
	} catch {
		contentImportCache.set(cacheKey, []);
		return [];
	}

	const dir = templateRel.slice(0, templateRel.lastIndexOf('/'));
	const specs = new Set<string>();
	for (const m of source.matchAll(IMPORT_FROM_REGEX)) specs.add(m[1]!);
	for (const m of source.matchAll(BARE_IMPORT_REGEX)) specs.add(m[1]!);

	const out = new Set<string>();
	for (const spec of specs) {
		for (const dataPath of dataSpecToRepoRel(spec, dir)) out.add(dataPath);
		if (descend) {
			const ui = uiSpecToRepoRel(spec, dir);
			if (ui) for (const nested of scanContentImports(ui, false)) out.add(nested);
		}
	}

	const result = [...out];
	contentImportCache.set(cacheKey, result);
	return result;
}

/** Module extensions a data import may already carry. */
const DATA_FILE_EXTS = ['.json', '.ts', '.js', '.mjs'];

/** Strip an alias prefix and re-root under `src/` — offset derived, never hand-counted. */
function aliasToSrc(spec: string, alias: string, srcSub: string): string {
	return `src/${srcSub}${spec.slice(alias.length)}`;
}

/** Map a `@data`/`~/data`/relative/`.json` import to repo-relative candidate paths. */
function dataSpecToRepoRel(spec: string, dir: string): string[] {
	let base: string | null = null;
	if (spec.startsWith('@data/')) base = aliasToSrc(spec, '@data/', 'data/');
	else if (spec.startsWith('~/data/')) base = aliasToSrc(spec, '~/data/', 'data/');
	else if (spec.startsWith('@root/data/')) base = aliasToSrc(spec, '@root/', '');
	else if (spec.startsWith('./') || spec.startsWith('../')) {
		const resolved = join(dir, spec);
		if (resolved.startsWith('src/data/') || resolved.startsWith('src/content/')) base = resolved;
		else if (resolved.endsWith('.json')) base = resolved;
		else return [];
	} else return [];

	if (DATA_FILE_EXTS.some((ext) => base!.endsWith(ext))) return [base];
	// Extensionless module: a file or a directory index.
	return [`${base}.ts`, `${base}/index.ts`];
}

/** Map a local component/layout import to its repo-relative `.astro` path, else `null`. */
function uiSpecToRepoRel(spec: string, dir: string): string | null {
	let rel: string | null = null;
	for (const prefix of LOCAL_UI_PREFIXES) {
		if (spec.startsWith(prefix)) {
			// `@root/x` → `src/x`; `@components/x`/`@layouts/x` → `src/components|layouts/x`.
			rel = spec.startsWith('@root/')
				? `src/${spec.slice('@root/'.length)}`
				: `src/${spec.slice('@'.length)}`;
			break;
		}
	}
	if (!rel && (spec.startsWith('./') || spec.startsWith('../'))) {
		const resolved = join(dir, spec);
		if (resolved.startsWith('src/')) rel = resolved;
	}
	if (!rel || !rel.endsWith('.astro')) return null;
	return existsSync(join(getRepoRoot(), rel)) ? rel : null;
}

/** Generous ceiling for the one-shot `git log` buffer (output is a few MB for `src/`). */
const GIT_LOG_MAX_BUFFER = 256 * 1024 * 1024;

/**
 * Map of repo-relative path → last-commit epoch (ms), from a single `git log`
 * pass instead of one subprocess per file. Commits are newest-first, so a path's
 * first appearance is its latest commit. The `\x1f` prefix marks date lines (file
 * paths never contain it). Scoped to `src/`, where every sitemap source lives, to
 * keep the output and map small.
 */
let gitDateMap: Map<string, number> | null = null;
function getGitDateMap(): Map<string, number> {
	if (gitDateMap !== null) return gitDateMap;
	const dates = new Map<string, number>();
	try {
		const out = execFileSync(
			'git',
			['log', '--no-renames', '--format=\x1f%cI', '--name-only', '--', 'src/'],
			{
				encoding: 'utf8',
				maxBuffer: GIT_LOG_MAX_BUFFER,
				cwd: getRepoRoot(),
			}
		);
		let current = 0;
		for (const line of out.split('\n')) {
			if (line.startsWith('\x1f')) {
				current = Date.parse(line.slice(1));
			} else if (line && current > 0 && !dates.has(line)) {
				dates.set(line, current);
			}
		}
	} catch {
		// git unavailable (e.g. shallow CI checkout without history) — leave empty;
		// every entry then renders without <lastmod> rather than failing the build.
	}
	gitDateMap = dates;
	return gitDateMap;
}
