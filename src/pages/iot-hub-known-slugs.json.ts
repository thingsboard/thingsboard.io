import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Static JSON manifest of every listing slug present at build time —
// emitted to `/iot-hub-known-slugs.json` in dist. The search page's
// dynamic-search script fetches it once and filters runtime API results
// against the set, so users can't click through to a /iot-hub/{cat}/{slug}/
// page that was published after the last deploy and therefore doesn't
// exist statically.
//
// The runtime fail-opens (no filter) when the manifest can't be loaded,
// so a CDN hiccup doesn't break the popup or the search page.

export const GET: APIRoute = async () => {
	const categories = await getCollection('iotHubCategories');
	const slugs: string[] = [];
	for (const cat of categories) {
		for (const item of cat.data.items) {
			slugs.push(item.slug);
		}
	}
	return new Response(JSON.stringify({ slugs }), {
		headers: {
			'content-type': 'application/json',
			// Stale-while-revalidate gives users near-realtime updates
			// without thundering-herd on every navigation. The manifest is
			// regenerated on every deploy anyway.
			'cache-control': 'public, max-age=60, stale-while-revalidate=86400',
		},
	});
};
