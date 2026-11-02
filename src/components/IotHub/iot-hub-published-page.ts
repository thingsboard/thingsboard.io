import {
	IOT_HUB_API_URL,
	getIotHubSortOption,
	isNumericSlug,
	type ListingView,
	type PageData,
} from '@models/iot-hub';
import { getKnownSlugs } from './iot-hub-known-slugs';

// One page of the published catalogue, shared by the search page
// (iot-hub-dynamic-search.ts) and the hero popup so both send the same request
// and drop the same rows.

export interface PublishedPageQuery {
	text: string;
	/** 0-based, as the backend counts. */
	page: number;
	pageSize: number;
	sortId: string;
	/** Surface-specific filters (type, creator, facets), set after the shared ones. */
	params?: Iterable<[string, string]>;
}

export interface PublishedPage {
	/** The rows this build can open, in the server's order. */
	items: ListingView[];
	/**
	 * Everything the search matched, which every surface shows and analytics reports.
	 * Dropped rows are still counted, so between a Hub publish and the next site build
	 * a count can include a row the site cannot open yet (accepted: it goes away once
	 * detail pages render dynamically).
	 */
	matchedCount: number;
	totalPages: number;
}

/** Throws on a network failure, an abort, or a non-2xx answer. */
export async function fetchPublishedPage(
	query: PublishedPageQuery,
	signal: AbortSignal
): Promise<PublishedPage> {
	const sort = getIotHubSortOption(query.sortId);
	const params = new URLSearchParams({
		pageSize: String(query.pageSize),
		page: String(query.page),
		sortProperty: sort.sortProperty,
		sortOrder: sort.sortOrder,
	});
	const trimmed = query.text.trim();
	if (trimmed) params.set('textSearch', trimmed);
	// A caller adds filters; it cannot override the request this function owns.
	for (const [param, value] of query.params ?? []) {
		if (!params.has(param)) params.set(param, value);
	}

	const [res, knownSlugs] = await Promise.all([
		fetch(`${IOT_HUB_API_URL}/api/listings/published?${params.toString()}`, { signal }),
		getKnownSlugs(),
	]);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const body = (await res.json()) as PageData<ListingView>;
	// Drop listings with no static detail page to click through to: ones published
	// after the last deploy (absent from the slug manifest), and numeric slugs, which
	// `[category]/[slug].astro` excludes but the manifest still lists — without this
	// the card would link to `/iot-hub/devices/2/`, page 2 of the listing. Same rule
	// `getStaticPaths` applies, so a static first render and every refetch agree.
	// Nothing is fetched to replace them: a page shows fewer rows until the next rebuild.
	const items = (body.data ?? []).filter((item) => knownSlugs.has(item.slug) && !isNumericSlug(item.slug));
	return {
		items,
		matchedCount: body.totalElements ?? 0,
		totalPages: Math.max(1, body.totalPages || 1),
	};
}
