/**
 * Centralized redirect rules for old Jekyll docs URLs → new Astro docs URLs.
 *
 * This file is the single source of truth for all redirect mappings.
 * It is consumed by:
 *   - Page-based redirect files in src/pages/docs/ (Astro.redirect)
 *   - scripts/generate-redirects.ts (generates public/_redirects and public/redirects.json)
 *
 * Redirect types:
 *   PREFIX_RENAME  — tree-preserving 1:1 (old prefix/* → new prefix/*)
 *   CONSOLIDATE    — many-to-one fan-in (old prefix/* → single target page)
 *   SINGLE         — one page moved to a different path
 *   GONE           — page removed, redirect to fallback
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RedirectEntry {
	/** Slug relative to the catch-all prefix (e.g. 'docker' or 'upgrade-instructions/docker/v3-0-x') */
	slug: string;
	/** Absolute target path with trailing slash (e.g. '/docs/installation/docker/') */
	target: string;
}

export interface CatchAllRedirect {
	/** Old path prefix (no leading/trailing slash). Maps to a [...slug].astro file at this location. */
	oldPrefix: string;
	/** Redirect entries — each slug is relative to oldPrefix */
	entries: RedirectEntry[];
}

export interface SingleRedirect {
	/** Old path (no leading/trailing slash, e.g. 'user-guide/audit-log') */
	oldPath: string;
	/** Absolute target path with trailing slash (e.g. '/docs/user-guide/security/audit-log/') */
	target: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

/**
 * Catch-all redirect groups.
 * Each group maps to one [...slug].astro file under src/pages/docs/{oldPrefix}/.
 * Add new groups here when the user provides a prefix-level redirect mapping.
 */
export const CATCH_ALL_REDIRECTS: CatchAllRedirect[] = [
	// Groups will be added here as the user provides mappings.
	// Example:
	// {
	//   oldPrefix: 'user-guide/install',
	//   entries: [
	//     { slug: 'docker', target: '/docs/installation/docker/' },
	//     { slug: 'upgrade-instructions/docker/v3-0-x', target: '/docs/installation/upgrade-instructions/docker/' },
	//   ],
	// },
];

/**
 * Individual page redirects.
 * Each entry maps to a single .astro file at src/pages/docs/{oldPath}.astro.
 * Add entries here for one-off page renames or removed pages.
 */
export const SINGLE_REDIRECTS: SingleRedirect[] = [
	{ oldPath: 'api', target: '/docs/apis-and-sdks/' },
	{ oldPath: 'pe/api', target: '/docs/pe/apis-and-sdks/' },
	{ oldPath: 'paas/api', target: '/docs/paas/apis-and-sdks/' },
	{ oldPath: 'paas/eu/api', target: '/docs/paas/eu/apis-and-sdks/' },
	{ oldPath: 'domains', target: '/docs/user-guide/security/domains/' },
	{ oldPath: 'pe/domains', target: '/docs/pe/user-guide/security/domains/' },
	{ oldPath: 'paas/domains', target: '/docs/paas/user-guide/security/domains/' },
	{ oldPath: 'paas/eu/domains', target: '/docs/paas/eu/user-guide/security/domains/' },
	{ oldPath: 'getting-started-guides/connectivity', target: '/docs/user-guide/connectivity-guide/' },
	{ oldPath: 'pe/getting-started-guides/connectivity', target: '/docs/pe/user-guide/connectivity-guide/' },
	{ oldPath: 'paas/getting-started-guides/connectivity', target: '/docs/paas/user-guide/connectivity-guide/' },
	{ oldPath: 'paas/eu/getting-started-guides/connectivity', target: '/docs/paas/eu/user-guide/connectivity-guide/' },
	{ oldPath: 'getting-started-guides/helloworld', target: '/docs/getting-started/' },
	{ oldPath: 'pe/getting-started-guides/helloworld', target: '/docs/pe/getting-started/' },
	{ oldPath: 'paas/getting-started-guides/helloworld', target: '/docs/paas/getting-started/' },
	{ oldPath: 'paas/eu/getting-started-guides/helloworld', target: '/docs/paas/eu/getting-started/' },
	{ oldPath: 'getting-started-guides/what-is-thingsboard', target: '/docs/why-thingsboard/' },
	{ oldPath: 'pe/getting-started-guides/what-is-thingsboard', target: '/docs/pe/why-thingsboard/' },
	{ oldPath: 'paas/getting-started-guides/what-is-thingsboard', target: '/docs/paas/why-thingsboard/' },
	{ oldPath: 'paas/eu/getting-started-guides/what-is-thingsboard', target: '/docs/paas/eu/why-thingsboard/' },
	{ oldPath: 'faq', target: '/docs/why-thingsboard/' },
	{ oldPath: 'pe/faq', target: '/docs/pe/why-thingsboard/' },
	{ oldPath: 'paas/faq', target: '/docs/paas/why-thingsboard/' },
	{ oldPath: 'paas/eu/faq', target: '/docs/paas/eu/why-thingsboard/' },
	{ oldPath: 'mobile-center/mobile-center', target: '/docs/user-guide/mobile-app-center/' },
	{ oldPath: 'pe/mobile-center/mobile-center', target: '/docs/pe/user-guide/mobile-app-center/' },
	{ oldPath: 'paas/mobile-center/mobile-center', target: '/docs/paas/user-guide/mobile-app-center/' },
	{ oldPath: 'paas/eu/mobile-center/mobile-center', target: '/docs/paas/eu/user-guide/mobile-app-center/' },
	{ oldPath: 'mobile-center/applications', target: '/docs/user-guide/mobile-app-center/applications/' },
	{ oldPath: 'pe/mobile-center/applications', target: '/docs/pe/user-guide/mobile-app-center/applications/' },
	{ oldPath: 'paas/mobile-center/applications', target: '/docs/paas/user-guide/mobile-app-center/applications/' },
	{ oldPath: 'paas/eu/mobile-center/applications', target: '/docs/paas/eu/user-guide/mobile-app-center/applications/' },
	{ oldPath: 'reference/monolithic', target: '/docs/reference/architecture/monolithic/' },
	{ oldPath: 'pe/reference/monolithic', target: '/docs/pe/reference/architecture/monolithic/' },
	{ oldPath: 'reference/performance', target: '/docs/reference/architecture/performance/' },
	{ oldPath: 'pe/reference/performance', target: '/docs/pe/reference/architecture/performance/' },
	{ oldPath: 'reference/msa', target: '/docs/reference/architecture/microservices/' },
	{ oldPath: 'pe/reference/msa', target: '/docs/pe/reference/architecture/microservices/' },
	{ oldPath: 'user-guide/attributes', target: '/docs/user-guide/digital-twins/attributes/' },
	{ oldPath: 'pe/user-guide/attributes', target: '/docs/pe/user-guide/digital-twins/attributes/' },
	{ oldPath: 'paas/user-guide/attributes', target: '/docs/paas/user-guide/digital-twins/attributes/' },
	{ oldPath: 'paas/eu/user-guide/attributes', target: '/docs/paas/eu/user-guide/digital-twins/attributes/' },
	{ oldPath: 'user-guide/audit-log', target: '/docs/user-guide/security/audit-log/' },
	{ oldPath: 'pe/user-guide/audit-log', target: '/docs/pe/user-guide/security/audit-log/' },
	{ oldPath: 'paas/user-guide/audit-log', target: '/docs/paas/user-guide/security/audit-log/' },
	{ oldPath: 'paas/eu/user-guide/audit-log', target: '/docs/paas/eu/user-guide/security/audit-log/' },
	{ oldPath: 'user-guide/calculated-fields/geofencing-calculated-field', target: '/docs/user-guide/calculated-fields/geofencing/' },
	{ oldPath: 'pe/user-guide/calculated-fields/geofencing-calculated-field', target: '/docs/pe/user-guide/calculated-fields/geofencing/' },
	{ oldPath: 'paas/user-guide/calculated-fields/geofencing-calculated-field', target: '/docs/paas/user-guide/calculated-fields/geofencing/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/geofencing-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/geofencing/' },
	{ oldPath: 'user-guide/calculated-fields/propagation-calculated-field', target: '/docs/user-guide/calculated-fields/propagation/' },
	{ oldPath: 'pe/user-guide/calculated-fields/propagation-calculated-field', target: '/docs/pe/user-guide/calculated-fields/propagation/' },
	{ oldPath: 'paas/user-guide/calculated-fields/propagation-calculated-field', target: '/docs/paas/user-guide/calculated-fields/propagation/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/propagation-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/propagation/' },
	{ oldPath: 'user-guide/calculated-fields/related-entities-aggregation-calculated-field', target: '/docs/user-guide/calculated-fields/related-entities-aggregation/' },
	{ oldPath: 'pe/user-guide/calculated-fields/related-entities-aggregation-calculated-field', target: '/docs/pe/user-guide/calculated-fields/related-entities-aggregation/' },
	{ oldPath: 'paas/user-guide/calculated-fields/related-entities-aggregation-calculated-field', target: '/docs/paas/user-guide/calculated-fields/related-entities-aggregation/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/related-entities-aggregation-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/related-entities-aggregation/' },
	{ oldPath: 'user-guide/calculated-fields/script-calculated-field', target: '/docs/user-guide/calculated-fields/script/' },
	{ oldPath: 'pe/user-guide/calculated-fields/script-calculated-field', target: '/docs/pe/user-guide/calculated-fields/script/' },
	{ oldPath: 'paas/user-guide/calculated-fields/script-calculated-field', target: '/docs/paas/user-guide/calculated-fields/script/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/script-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/script/' },
	{ oldPath: 'user-guide/calculated-fields/simple-calculated-field', target: '/docs/user-guide/calculated-fields/simple/' },
	{ oldPath: 'pe/user-guide/calculated-fields/simple-calculated-field', target: '/docs/pe/user-guide/calculated-fields/simple/' },
	{ oldPath: 'paas/user-guide/calculated-fields/simple-calculated-field', target: '/docs/paas/user-guide/calculated-fields/simple/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/simple-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/simple/' },
	{ oldPath: 'user-guide/calculated-fields/time-series-data-aggregation-calculated-field', target: '/docs/user-guide/calculated-fields/time-series-data-aggregation/' },
	{ oldPath: 'pe/user-guide/calculated-fields/time-series-data-aggregation-calculated-field', target: '/docs/pe/user-guide/calculated-fields/time-series-data-aggregation/' },
	{ oldPath: 'paas/user-guide/calculated-fields/time-series-data-aggregation-calculated-field', target: '/docs/paas/user-guide/calculated-fields/time-series-data-aggregation/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/time-series-data-aggregation-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/time-series-data-aggregation/' },
	{ oldPath: 'user-guide/entities-and-relations', target: '/docs/user-guide/digital-twins/entities/' },
	{ oldPath: 'pe/user-guide/entities-and-relations', target: '/docs/pe/user-guide/digital-twins/entities/' },
	{ oldPath: 'paas/user-guide/entities-and-relations', target: '/docs/paas/user-guide/digital-twins/entities/' },
	{ oldPath: 'paas/eu/user-guide/entities-and-relations', target: '/docs/paas/eu/user-guide/digital-twins/entities/' },
	{ oldPath: 'user-guide/telemetry', target: '/docs/user-guide/digital-twins/time-series-data/' },
	{ oldPath: 'pe/user-guide/telemetry', target: '/docs/pe/user-guide/digital-twins/time-series-data/' },
	{ oldPath: 'paas/user-guide/telemetry', target: '/docs/paas/user-guide/digital-twins/time-series-data/' },
	{ oldPath: 'paas/eu/user-guide/telemetry', target: '/docs/paas/eu/user-guide/digital-twins/time-series-data/' },
	{ oldPath: 'user-guide/install/building-from-source', target: '/docs/installation/building-from-source/' },
	{ oldPath: 'user-guide/install/pe/building-from-source', target: '/docs/pe/installation/building-from-source/' },
	{ oldPath: 'user-guide/install/config', target: '/docs/reference/configuration/how-to-change-config/' },
	{ oldPath: 'user-guide/install/pe/config', target: '/docs/pe/reference/configuration/how-to-change-config/' },
	{ oldPath: 'user-guide/install/docker', target: '/docs/installation/docker/' },
	{ oldPath: 'user-guide/install/pe/docker', target: '/docs/pe/installation/docker/' },
	{ oldPath: 'user-guide/install/docker-windows', target: '/docs/installation/docker-windows/' },
	{ oldPath: 'user-guide/install/pe/docker-windows', target: '/docs/pe/installation/docker-windows/' },
	{ oldPath: 'user-guide/install/installation-options', target: '/docs/installation/' },
	{ oldPath: 'user-guide/install/pe/installation-options', target: '/docs/pe/installation/' },
	{ oldPath: 'user-guide/install/rhel', target: '/docs/installation/rhel/' },
	{ oldPath: 'user-guide/install/pe/rhel', target: '/docs/pe/installation/rhel/' },
	{ oldPath: 'user-guide/install/rpi', target: '/docs/installation/rpi/' },
	{ oldPath: 'user-guide/install/pe/rpi', target: '/docs/pe/installation/rpi/' },
	{ oldPath: 'user-guide/install/ubuntu', target: '/docs/installation/ubuntu/' },
	{ oldPath: 'user-guide/install/pe/ubuntu', target: '/docs/pe/installation/ubuntu/' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns entries for a catch-all prefix, or empty array if not found. */
export function getCatchAllEntries(oldPrefix: string): RedirectEntry[] {
	const group = CATCH_ALL_REDIRECTS.find((g) => g.oldPrefix === oldPrefix);
	return group?.entries ?? [];
}

/**
 * Returns a flat map of ALL redirects: oldPath (with /docs/ prefix and trailing slash) → target.
 * Used by scripts/generate-redirects.ts to produce the JSON map.
 */
export function getAllRedirectsFlat(): Record<string, string> {
	const map: Record<string, string> = {};

	for (const group of CATCH_ALL_REDIRECTS) {
		for (const entry of group.entries) {
			const oldPath = entry.slug
				? `/docs/${group.oldPrefix}/${entry.slug}/`
				: `/docs/${group.oldPrefix}/`;
			map[oldPath] = entry.target;
		}
	}

	for (const entry of SINGLE_REDIRECTS) {
		map[`/docs/${entry.oldPath}/`] = entry.target;
	}

	return map;
}
