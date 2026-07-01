// Lazy client-side loader for `/iot-hub-known-slugs.json` (emitted by
// the static endpoint in src/pages/iot-hub-known-slugs.json.ts). Used by
// the search-page and hero-popup dynamic-fetch scripts to filter results
// to slugs that exist statically — listings published in the IoT Hub
// portal after the last site deploy would otherwise 404 when clicked.
//
// Module-scoped Promise cache dedupes parallel calls (e.g. the hero popup
// and the search page both kicking off on the same view), so the manifest
// JSON is fetched once per worker / page load.
//
// Fail-open: when the fetch errors (offline, missing manifest, …) we
// return an empty `KnownSlugs` whose `has()` returns true for everything.
// That way a CDN hiccup never hides results — the user just keeps the
// previous (potentially stale) behaviour where every result is clickable.

export interface KnownSlugs {
	has(slug: string): boolean;
	/** `null` when the manifest hasn't loaded — callers can short-circuit. */
	readonly size: number | null;
}

const PASSTHROUGH: KnownSlugs = {
	has: () => true,
	size: null,
};

let cached: Promise<KnownSlugs> | null = null;

export function getKnownSlugs(): Promise<KnownSlugs> {
	if (cached) return cached;
	cached = (async () => {
		try {
			const res = await fetch('/iot-hub-known-slugs.json');
			if (!res.ok) return PASSTHROUGH;
			const body = (await res.json()) as { slugs: string[] };
			const set = new Set(body.slugs ?? []);
			const result: KnownSlugs = { has: (s) => set.has(s), size: set.size };
			return result;
		} catch {
			return PASSTHROUGH;
		}
	})();
	return cached;
}
