import { IOT_HUB_API_URL, type ListingDetail } from '@models/iot-hub';
import { fetchWithRetry } from '@util/fetch-utils';

// slug → ListingDetail cache, shared across IotHubListingLink renders.
// Promise-valued so concurrent fetches for the same slug dedupe. Module
// state in a .ts persists across renders within a build worker; state in
// an .astro frontmatter would be re-created per render.
const cache = new Map<string, Promise<ListingDetail | null>>();

export function getListingBySlug(slug: string): Promise<ListingDetail | null> {
	let p = cache.get(slug);
	if (!p) {
		p = (async () => {
			try {
				const res = await fetchWithRetry(
					`${IOT_HUB_API_URL}/api/listings/public/by-slug/${slug}`
				);
				return (await res.json()) as ListingDetail;
			} catch {
				return null;
			}
		})();
		cache.set(slug, p);
	}
	return p;
}
