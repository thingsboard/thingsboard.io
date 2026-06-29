import { normalizeSitemapPath, toRepoRelative } from '../sitemap-source-registry';

/**
 * Maps a built URL back to the `src/pages/...` component that rendered it, using
 * the route table captured at `astro:routes:resolved`. Needed for non-docs pages,
 * which never run the Starlight route middleware that records docs sources.
 */

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

export function captureRoutes(routes: ResolvedPageRoute[]): void {
	staticRouteComponents.clear();
	dynamicRouteComponents.length = 0;
	for (const route of routes) {
		if (route.type !== 'page' || !route.isPrerendered) continue;
		const component = toRepoRelative(route.entrypoint);
		// Only real page components — Starlight's content route yields a non-src
		// entry and is handled by the registry instead.
		if (!component || !component.startsWith('src/pages/')) continue;
		if (route.pathname) staticRouteComponents.set(normalizeSitemapPath(route.pathname), component);
		else dynamicRouteComponents.push({ regex: route.patternRegex, component });
	}
}

/** Repo-relative `.astro` component that renders `pathname`, or `null`. */
export function matchRouteComponent(pathname: string): string | null {
	const key = normalizeSitemapPath(pathname);
	const exact = staticRouteComponents.get(key);
	if (exact) return exact;
	// `patternRegex`'s expected trailing-slash shape depends on Astro's config, so
	// try the raw, stripped, and single-trailing-slash forms to match either way.
	const noTrailing = pathname.replace(/\/+$/, '');
	for (const route of dynamicRouteComponents) {
		if (route.regex.test(pathname) || route.regex.test(noTrailing) || route.regex.test(key)) {
			return route.component;
		}
	}
	return null;
}
