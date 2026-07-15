import {
	IOT_HUB_API_URL,
	IOT_HUB_CATEGORIES,
	IOT_HUB_STRINGS,
	SEARCH_PAGE_SIZE,
	DEFAULT_IOT_HUB_SORT_ID,
	getCardVariant,
	getCategoryForItemType,
	getIotHubSortOption,
	type IotHubItemType,
	type ListingView,
	type PageData,
} from '@models/iot-hub';
import { bindListingCard } from './iot-hub-listing-card-bind';
import { getKnownSlugs } from './iot-hub-known-slugs';
import { updatePagination } from '@components/Pagination/pagination-client';
import { setPerPageValue } from '@components/Pagination/per-page-client';

// Host-visible "N results" line next to the pagination.
function updateResultsCount(countEl: HTMLElement, totalResults: number): void {
	const word =
		totalResults === 1
			? IOT_HUB_STRINGS.searchPage.resultSingular
			: IOT_HUB_STRINGS.searchPage.resultPlural;
	countEl.textContent = `${totalResults} ${word}`;
}

// Shared dynamic-search pipeline used by the search page, the creator
// page, the category pages, and any future surface that lists
// ListingViews with live filters. Discovers all wiring from data
// attributes on `[data-iot-hub-search-root]`:
//
//   * `data-creator-id`  — when set, every fetch adds &creatorId=<id> and
//                          cards render with the creator row hidden.
//   * `data-item-type`   — when set (category pages), every fetch adds
//                          &type=<itemType> so results stay scoped.
//   * `data-page-size`   — initial page size; falls back to SEARCH_PAGE_SIZE.
//   * `data-base-path`   — root path used by `history.replaceState` when
//                          syncing URL state; falls back to `location.pathname`.
//
// FilterPanel integration: when the page renders a FilterPanel, this
// pipeline listens for `iot-hub-filter:change` and adds the selected
// values to each fetch + URL state. Filter param names match the API:
//   panel section key → API/URL param
//   vendor            → vendors
//   hardwareType      → hardwareTypes
//   connectivity      → connectivity
//   category          → categories
//   useCase           → useCases
//   type              → widgetTypes / cfTypes / ruleChainTypes
//                       (resolved from `data-item-type`)
//
// Triggers (each clears + refetches):
//   * SearchFilterBar input change (300ms debounce) → resets page to 1
//   * IotHubSort selection change                   → resets page to 1
//   * Pagination items-per-page change              → resets page to 1
//   * Pagination page change                        → keeps page index
//
// URL state: q / sort / page / pageSize are mirrored in the query string
// via history.replaceState on every fetch. On load, any non-default value
// triggers an immediate fetch and is reflected in the matching UI control
// (SearchFilterBar input, IotHubSort selection, Pagination per-page).

const DEBOUNCE_MS = 300;

// FilterPanel section keys are translated to API/URL params here.
// `type` resolves to one of three names depending on the page's itemType
// (widgets / calculated fields / rule chains each have their own param).
const FILTER_KEY_TO_PARAM: Record<string, string> = {
	vendor: 'vendors',
	hardwareType: 'hardwareTypes',
	connectivity: 'connectivity',
	category: 'categories',
	useCase: 'useCases',
};

function filterParamName(filterKey: string, itemType: string): string {
	if (filterKey === 'type') {
		switch (itemType) {
			case 'WIDGET':
				return 'widgetTypes';
			case 'CALCULATED_FIELD':
				return 'cfTypes';
			case 'RULE_CHAIN':
				return 'ruleChainTypes';
			default:
				return 'types';
		}
	}
	return FILTER_KEY_TO_PARAM[filterKey] ?? filterKey;
}

// Reverse direction used when restoring from URL. The three `type` aliases
// all collapse back to the panel's `type` section key.
const PARAM_TO_FILTER_KEY: Record<string, string> = {
	vendors: 'vendor',
	hardwareTypes: 'hardwareType',
	connectivity: 'connectivity',
	categories: 'category',
	useCases: 'useCase',
	widgetTypes: 'type',
	cfTypes: 'type',
	ruleChainTypes: 'type',
};
const FILTER_PARAM_NAMES = Object.keys(PARAM_TO_FILTER_KEY);

function filtersEqual(
	a: Record<string, string[]>,
	b: Record<string, string[]>
): boolean {
	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	if (aKeys.length !== bKeys.length) return false;
	for (const key of aKeys) {
		const av = a[key] ?? [];
		const bv = b[key] ?? [];
		if (av.length !== bv.length) return false;
		const aSet = new Set(av);
		for (const v of bv) if (!aSet.has(v)) return false;
	}
	return true;
}

export function setupDynamicSearch(): void {
	const root = document.querySelector<HTMLElement>('[data-iot-hub-search-root]');
	if (!root) return;
	if (root.dataset.dynamicSearchInited) return;
	root.dataset.dynamicSearchInited = 'true';

	const creatorId = root.dataset.creatorId ?? '';
	const itemType = root.dataset.itemType ?? '';
	const initialPageSize =
		Number.parseInt(root.dataset.pageSize ?? '', 10) || SEARCH_PAGE_SIZE;
	const basePath = root.dataset.basePath ?? location.pathname;
	// Hide the creator row on listing cards when scoped to a single creator
	// (all cards share that creator — the row would be repetitive).
	const showCreator = creatorId.length === 0;

	const input = root.querySelector<HTMLInputElement>('[data-search-input]');
	const resultsContainer = root.querySelector<HTMLElement>('[data-search-results]');
	const itemsWrap = root.querySelector<HTMLElement>('[data-search-items]');
	const paginationNav = root.querySelector<HTMLElement>('[data-tb-pagination]');
	// The bar wraps the nav + the items-per-page selector. Error/no-data states
	// hide the whole bar; a single page of results hides only the nav (via
	// updatePagination's hideOnSinglePage) so the per-page control stays usable.
	const paginationBar = root.querySelector<HTMLElement>('[data-tb-pagination-bar]');
	const countEl = root.querySelector<HTMLElement>('[data-search-count]');
	const noResults = root.querySelector<HTMLElement>('[data-iot-hub-no-results]');
	const fetchError = root.querySelector<HTMLElement>('[data-iot-hub-fetch-error]');
	const retryBtn = root.querySelector<HTMLButtonElement>(
		'[data-iot-hub-fetch-error-retry]'
	);
	if (!input || !resultsContainer || !itemsWrap || !countEl || !noResults) return;

	const bigTmpl = document.querySelector<HTMLTemplateElement>(
		'[data-listing-card-tmpl][data-variant="big"]'
	);
	const compactTmpl = document.querySelector<HTMLTemplateElement>(
		'[data-listing-card-tmpl][data-variant="compact"]'
	);
	const sectionTmpl = document.querySelector<HTMLTemplateElement>(
		'[data-category-section-tmpl]'
	);
	if (!bigTmpl || !compactTmpl || !sectionTmpl) return;

	let searchText = '';
	let sortId: string = DEFAULT_IOT_HUB_SORT_ID;
	let pageSize = initialPageSize;
	let currentPage = 1;
	let abort: AbortController | null = null;
	let debounceTimer: number | undefined;
	let retryTimer: number | undefined;
	// FilterPanel selections keyed by section key (vendor, useCase, …).
	// Values are the raw checkbox values; labels live with the chips.
	let filters: Record<string, string[]> = {};
	// Last refetch options, replayed when the user clicks "Try again"
	// after a fetch error. resetPage=false keeps the page index the user
	// was on when the failure happened.
	let lastRefetchOpts: { resetPage?: boolean } = { resetPage: false };
	let lastTrackedQuery: string | null = null;

	// Push an `iot_hub_query` event to dataLayer once per changed query state
	// (search text + active filters). Pagination, sort and repeats don't
	// re-count. Marketing owns the GTM trigger + GA4 tag.
	function trackQuery(term: string, resultsCount: number): void {
		// Canonical (key- and value-sorted) string so the same selection always
		// yields the same de-dupe key; copy before sorting to avoid mutating state.
		const activeFilters = Object.entries(filters)
			.map(([k, v]) => `${k}:${[...v].sort().join(',')}`)
			.sort()
			.join(';');
		// Nothing meaningful to report on a default, unfiltered browse.
		if (!term && !activeFilters) {
			lastTrackedQuery = null;
			return;
		}
		const key = `${term} ${activeFilters}`;
		if (key === lastTrackedQuery) return;
		lastTrackedQuery = key;
		window.dataLayer?.push({
			event: 'iot_hub_query',
			search_term: term,
			search_filters: activeFilters,
			search_results_count: resultsCount,
			search_surface: itemType || (creatorId ? 'creator' : 'all'),
			search_sort: sortId,
		});
	}

	function setLoading(loading: boolean): void {
		itemsWrap!.classList.toggle('is-loading', loading);
	}

	function showNoResults(show: boolean): void {
		noResults!.hidden = !show;
		if (show) resultsContainer!.replaceChildren();
	}

	function showFetchError(show: boolean): void {
		if (!fetchError) return;
		fetchError.hidden = !show;
		if (show) {
			resultsContainer!.replaceChildren();
			noResults!.hidden = true;
			// Hide the whole bar (nav + per-page) on error; the success path
			// re-shows it and updatePagination re-applies the single-page rule.
			if (paginationBar) paginationBar.hidden = true;
		} else if (paginationBar) {
			paginationBar.hidden = false;
		}
	}

	// --- URL state sync ---------------------------------------------------

	function syncUrl(): void {
		const params = new URLSearchParams();
		const trimmed = searchText.trim();
		if (trimmed) params.set('q', trimmed);
		if (sortId !== DEFAULT_IOT_HUB_SORT_ID) params.set('sort', sortId);
		if (currentPage > 1) params.set('page', String(currentPage));
		if (pageSize !== initialPageSize) params.set('pageSize', String(pageSize));
		for (const [key, values] of Object.entries(filters)) {
			if (values.length === 0) continue;
			params.set(filterParamName(key, itemType), values.join(','));
		}
		const query = params.toString();
		const next = basePath + (query ? `?${query}` : '') + location.hash;
		if (next !== location.pathname + location.search + location.hash) {
			history.replaceState(history.state, '', next);
		}
	}

	function applySortToUi(id: string): void {
		const sortRoot = root!.querySelector<HTMLElement>('[data-iot-hub-sort]');
		if (!sortRoot) return;
		const target = sortRoot.querySelector<HTMLButtonElement>(
			`[data-sort-option][data-sort-option-id="${id}"]`
		);
		if (!target) return;
		sortRoot.querySelectorAll<HTMLButtonElement>('[data-sort-option]').forEach((opt) => {
			const isSelected = opt === target;
			opt.classList.toggle('iot-hub-sort__option--selected', isSelected);
			opt.setAttribute('aria-pressed', String(isSelected));
		});
		const labelEl = sortRoot.querySelector<HTMLElement>('[data-sort-label]');
		const optText = target.querySelector<HTMLElement>('.iot-hub-sort__option-text')?.textContent;
		if (labelEl && optText) labelEl.textContent = optText;
		sortRoot.dataset.sortId = id;
	}

	function applyPageSizeToUi(size: number): void {
		const perPageRoot = root!.querySelector<HTMLElement>('[data-per-page-root]');
		if (perPageRoot) setPerPageValue(perPageRoot, size);
	}

	// --- DOM builders ------------------------------------------------------

	function buildCardNode(item: ListingView, categorySlug: string): HTMLElement {
		const variant = getCardVariant(item.itemType);
		const tmpl = variant === 'big' ? bigTmpl! : compactTmpl!;
		const card = tmpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
		bindListingCard(card, item, categorySlug, showCreator);
		return card;
	}

	function buildSectionNode(
		slug: string,
		label: string,
		items: ListingView[]
	): HTMLElement {
		const section = sectionTmpl!.content.firstElementChild!.cloneNode(true) as HTMLElement;
		const headingLink = section.querySelector<HTMLAnchorElement>(
			'[data-category-section-heading]'
		);
		const exploreLink = section.querySelector<HTMLAnchorElement>(
			'[data-category-section-explore]'
		);
		const labelEl = section.querySelector<HTMLElement>('[data-category-section-label]');
		const exploreLabel = section.querySelector<HTMLElement>(
			'[data-category-section-explore-label]'
		);
		const grid = section.querySelector<HTMLElement>('[data-category-section-grid]');
		const href = `/iot-hub/${slug}/`;
		if (headingLink) headingLink.href = href;
		if (exploreLink) exploreLink.href = href;
		if (labelEl) labelEl.textContent = label;
		if (exploreLabel) exploreLabel.textContent = label.toLowerCase();
		if (grid) {
			const variant = getCardVariant(items[0]?.itemType ?? 'WIDGET');
			grid.classList.add(`iot-hub-grid--${variant}`);
			for (const item of items) grid.appendChild(buildCardNode(item, slug));
		}
		return section;
	}

	function groupResults(
		items: ListingView[]
	): Array<{ slug: string; label: string; items: ListingView[] }> {
		const byType = new Map<IotHubItemType, ListingView[]>();
		for (const it of items) {
			const cat = getCategoryForItemType(it.itemType);
			if (!cat) continue;
			const list = byType.get(cat.itemType) ?? [];
			list.push(it);
			byType.set(cat.itemType, list);
		}
		return IOT_HUB_CATEGORIES
			.filter((c) => byType.has(c.itemType))
			.map((c) => ({ slug: c.slug, label: c.label, items: byType.get(c.itemType)! }));
	}

	function renderResults(items: ListingView[]): void {
		if (items.length === 0) {
			showNoResults(true);
			return;
		}
		showNoResults(false);
		resultsContainer!.replaceChildren();
		if (itemType) {
			// Single-category context (category page) — emit a flat grid
			// without a section header, matching the static SSR shape.
			const cat = getCategoryForItemType(itemType);
			// Unknown item type has no public category — skip rather than emit
			// cards with a `/iot-hub//slug/` href (matches groupResults).
			if (!cat) return;
			const categorySlug = cat.slug;
			const variant = getCardVariant(itemType);
			const grid = document.createElement('div');
			grid.className = `iot-hub-grid iot-hub-grid--${variant}`;
			for (const item of items) grid.appendChild(buildCardNode(item, categorySlug));
			resultsContainer!.appendChild(grid);
			return;
		}
		for (const group of groupResults(items)) {
			resultsContainer!.appendChild(buildSectionNode(group.slug, group.label, group.items));
		}
	}

	// --- Fetch -------------------------------------------------------------

	async function refetch(opts: { resetPage?: boolean } = {}): Promise<void> {
		lastRefetchOpts = opts;
		if (opts.resetPage) currentPage = 1;
		syncUrl();
		if (abort) abort.abort();
		abort = new AbortController();
		// The error panel is left in place across every refetch — only a
		// successful response (below) is allowed to take it down. The
		// loading overlay still runs on top so the user sees that the
		// request is in flight.
		setLoading(true);
		const sort = getIotHubSortOption(sortId);
		const params = new URLSearchParams({
			pageSize: String(pageSize),
			page: String(currentPage - 1), // backend is 0-based
			sortProperty: sort.sortProperty,
			sortOrder: sort.sortOrder,
		});
		const trimmed = searchText.trim();
		if (trimmed) params.set('textSearch', trimmed);
		if (creatorId) params.set('creatorId', creatorId);
		if (itemType) params.set('type', itemType);
		for (const [key, values] of Object.entries(filters)) {
			if (values.length === 0) continue;
			params.set(filterParamName(key, itemType), values.join(','));
		}

		try {
			const [res, knownSlugs] = await Promise.all([
				fetch(
					`${IOT_HUB_API_URL}/api/listings/published?${params.toString()}`,
					{ signal: abort.signal }
				),
				getKnownSlugs(),
			]);
			if (!res.ok) {
				// 4xx/5xx — treat the same as a network error so the user
				// gets a recoverable "Try again" path instead of stale data.
				showFetchError(true);
				return;
			}
			const body = (await res.json()) as PageData<ListingView>;
			// Drop listings published after the last deploy — no static
			// detail page exists for them yet. Trade-off: a page may show
			// < pageSize items until the next rebuild.
			const items = (body.data ?? []).filter((item) => knownSlugs.has(item.slug));
			const totalPages = Math.max(1, body.totalPages || 1);
			// Only a successful response is allowed to take the error
			// panel down — every other refetch trigger leaves it alone.
			showFetchError(false);
			renderResults(items);
			if (paginationNav) {
				// Hide the page-number nav when a filter narrows results to a
				// single page, matching the other surfaces. Safe here because the
				// per-page selector lives in the bar (sibling of the nav), so it
				// stays visible — letting the user lower the page size again.
				updatePagination(paginationNav, { currentPage, totalPages, hideOnSinglePage: true });
			}
			updateResultsCount(countEl!, body.totalElements ?? 0);
			trackQuery(trimmed, body.totalElements ?? 0);
		} catch (err) {
			// Aborts happen on every superseding fetch — don't treat them
			// as failures or the error panel would flash on every keystroke.
			if (err instanceof DOMException && err.name === 'AbortError') return;
			showFetchError(true);
		} finally {
			setLoading(false);
		}
	}

	// --- Initial URL state -------------------------------------------------

	const urlParams = new URLSearchParams(location.search);
	let hasUrlState = false;

	const urlQ = urlParams.get('q') ?? '';
	if (urlQ) {
		searchText = urlQ;
		if (!input.value) input.value = urlQ;
		hasUrlState = true;
	}

	const urlSort = urlParams.get('sort') ?? '';
	if (urlSort && getIotHubSortOption(urlSort).id === urlSort) {
		sortId = urlSort;
		applySortToUi(sortId);
		if (urlSort !== DEFAULT_IOT_HUB_SORT_ID) hasUrlState = true;
	}

	const urlPageSize = Number.parseInt(urlParams.get('pageSize') ?? '', 10);
	if (Number.isFinite(urlPageSize) && urlPageSize > 0) {
		pageSize = urlPageSize;
		applyPageSizeToUi(pageSize);
		if (urlPageSize !== initialPageSize) hasUrlState = true;
	}

	const urlPage = Number.parseInt(urlParams.get('page') ?? '', 10);
	if (Number.isFinite(urlPage) && urlPage > 1) {
		currentPage = urlPage;
		hasUrlState = true;
	}

	for (const paramName of FILTER_PARAM_NAMES) {
		const value = urlParams.get(paramName);
		if (!value) continue;
		const key = PARAM_TO_FILTER_KEY[paramName];
		if (!key) continue;
		const values = value.split(',').filter(Boolean);
		if (values.length === 0) continue;
		// Merge so the three `type` aliases collapse into one section if
		// they ever appear together in a URL.
		filters[key] = Array.from(new Set([...(filters[key] ?? []), ...values]));
		hasUrlState = true;
	}

	// Re-check the matching FilterPanel checkboxes so the panel reflects
	// the restored URL state, then emit a change so chips render. rAF
	// defers this past FilterPanel's own DOMContentLoaded init so the
	// change listener is in place when the synthetic event fires.
	if (Object.keys(filters).length > 0) {
		requestAnimationFrame(() => {
			const panel = document.querySelector<HTMLElement>('[data-iot-hub-filter-panel]');
			if (!panel) return;
			for (const [key, values] of Object.entries(filters)) {
				for (const value of values) {
					const cb = panel.querySelector<HTMLInputElement>(
						`.iot-hub-filter-option__input[name="${CSS.escape(key)}"][value="${CSS.escape(value)}"]`
					);
					if (cb) cb.checked = true;
				}
			}
			const anyInput = panel.querySelector<HTMLInputElement>(
				'.iot-hub-filter-option__input'
			);
			if (anyInput) anyInput.dispatchEvent(new Event('change', { bubbles: true }));
		});
	}

	if (hasUrlState) {
		void refetch({ resetPage: false });
	}

	// --- Event listeners ---------------------------------------------------

	root.addEventListener('iot-hub-search-text:change', ((e: CustomEvent) => {
		searchText = e.detail?.searchText ?? '';
		if (debounceTimer !== undefined) clearTimeout(debounceTimer);
		// setLoading kept inside refetch so the spinner only flashes once
		// the fetch is actually in flight, not on every keystroke.
		debounceTimer = window.setTimeout(() => {
			void refetch({ resetPage: true });
		}, DEBOUNCE_MS);
	}) as EventListener);

	root.addEventListener('iot-hub-sort:change', ((e: CustomEvent) => {
		sortId = e.detail?.id ?? DEFAULT_IOT_HUB_SORT_ID;
		void refetch({ resetPage: true });
	}) as EventListener);

	root.addEventListener('tb-pagination:page-size-change', ((e: CustomEvent) => {
		const next = Number.parseInt(e.detail?.perPage ?? '0', 10);
		if (!Number.isFinite(next) || next <= 0) return;
		pageSize = next;
		void refetch({ resetPage: true });
	}) as EventListener);

	root.addEventListener('tb-pagination:page-change', ((e: CustomEvent) => {
		const next = Number.parseInt(e.detail?.page ?? '0', 10);
		if (!Number.isFinite(next) || next <= 0) return;
		currentPage = next;
		void refetch({ resetPage: false });
	}) as EventListener);

	const RETRY_DEBOUNCE_MS = 350;
	retryBtn?.addEventListener('click', () => {
		// Flip the loading overlay on right away so rapid clicks feel
		// responsive, then debounce the actual fetch by 350ms so a burst
		// of clicks collapses into a single API call. `resetPage` carries
		// the flag from the call that failed, so "Try again" keeps the
		// user's page index intact deep into results.
		setLoading(true);
		if (retryTimer !== undefined) clearTimeout(retryTimer);
		retryTimer = window.setTimeout(() => {
			retryTimer = undefined;
			void refetch(lastRefetchOpts);
		}, RETRY_DEBOUNCE_MS);
	});

	// FilterPanel emits this on any checkbox change (real or synthetic).
	// Guard against the synthetic emit fired during URL restore by
	// comparing values — if the incoming state already matches what we
	// reconstructed from the URL, skip the refetch (the chip strip still
	// renders, since ListingsFilterBar listens to the same event).
	root.addEventListener('iot-hub-filter:change', ((e: CustomEvent) => {
		const incoming = (e.detail?.filters ?? {}) as Record<
			string,
			Array<{ value: string; label: string }>
		>;
		const next: Record<string, string[]> = {};
		for (const [key, entries] of Object.entries(incoming)) {
			if (entries.length > 0) next[key] = entries.map((entry) => entry.value);
		}
		if (filtersEqual(filters, next)) return;
		filters = next;
		void refetch({ resetPage: true });
	}) as EventListener);
}

export function initDynamicSearch(): void {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setupDynamicSearch);
	} else {
		setupDynamicSearch();
	}
}
