// Carries a visitor's place in a listing across to the item they open.
//
// Sort and filters live in the list page's query string (see `syncUrl` in
// iot-hub-dynamic-search.ts), which is why the browser's Back button already
// returns someone to the list exactly as they left it. A breadcrumb on a
// statically built detail page cannot: it is rendered long before anyone
// picks a sort, so its parent crumb points at the bare category index and a
// click there silently drops the sort and every filter.
//
// So the list records where the visitor was standing when they opened a card,
// and the detail page retargets its parent crumb at that exact URL.
//
// Why each guard is shaped the way it is sits at the guard itself.
//
// Accepted limitation: an entry is replaced or dropped only by another card
// click on a list, so reaching the same item later by some other route (the
// home grid, say) still shows the crumb from the earlier visit. Bounding that
// would mean proving how the visitor arrived, and the only signal for it —
// `document.referrer` — is lost on reload, which is the case this is built to
// survive. The destination is always a list that does contain the item and
// that the visitor did browse this session, so the cost is a stale sort, not
// a wrong place.

/** Marks the crumb to retarget. Shared so the two sides can't drift apart. */
export const ORIGIN_CRUMB_ID = 'iot-hub-parent';

const STORAGE_KEY = 'iot-hub:list-origin';

interface ListOrigin {
	/** Pathname of the detail page this origin was recorded for. */
	itemPath: string;
	/** List URL to return to, query string included. */
	listUrl: string;
	/** Parent-crumb label for that list, e.g. "Widgets" / "Search results". */
	label: string;
}

function clearOrigin(): void {
	try {
		sessionStorage.removeItem(STORAGE_KEY);
	} catch {
		// Storage unavailable — nothing was written, nothing to clear.
	}
}

// Clicks inside a card that do not open the item. Both are driven by
// `document`-level listeners (install-dialog-boot.ts, ListingCard.astro),
// which bubble *after* the one below and so cannot undo a write it makes —
// hence the check here rather than relying on `defaultPrevented`.
const NON_NAVIGATING_IN_CARD = '[data-iot-hub-install-trigger],[data-creator-href]';

// Records the current list URL against the item a click is about to open.
// Delegated from the search root because result cards are re-created on every
// refetch; the card root *is* the anchor (see ListingCard.astro).
export function recordListOrigin(root: HTMLElement, stateParams: readonly string[]): void {
	root.addEventListener('click', (event) => {
		const target = event.target as Element | null;
		const card = target?.closest<HTMLAnchorElement>('a.iot-hub-card');
		if (!card) return;
		if (target?.closest(NON_NAVIGATING_IN_CARD)) return;

		// Rebuilt from the list's own params rather than passing the address
		// through, so nothing the visitor arrived with rides along.
		const incoming = new URLSearchParams(location.search);
		const state = new URLSearchParams();
		for (const name of stateParams) {
			const value = incoming.get(name);
			if (value) state.set(name, value);
		}

		// Until the first refetch moves it into the query, the page index lives
		// in the path — PaginationBar renders real `/iot-hub/widgets/2/` links.
		// Fold it in so what gets stored is the canonical form `syncUrl` writes,
		// and so paging with no other state still counts as somewhere to return.
		const basePath = root.dataset.basePath || location.pathname;
		const rest = location.pathname.startsWith(basePath) ? location.pathname.slice(basePath.length) : '';
		const pathPage = /^(\d+)\/?$/.exec(rest)?.[1];
		if (pathPage && !state.has('page')) state.set('page', pathPage);

		const query = state.toString();

		// With a query the catalogue renames its own heading to "Search results
		// for …", so the build-time label would name the whole catalogue while
		// linking at the narrowed list. Take the name off the live heading in
		// that case — it is the page's own answer to what it currently is.
		//
		// Gated on the bar, not on the URL: a bar rewrites its heading only when
		// it was given a prefix, which is the same condition
		// iot-hub-search-bar-init.ts checks. The creator page renders a heading
		// without one ("Published Items (57)"), and reading that would replace
		// the creator's name with a section title and a build-time count.
		const bar = root.querySelector<HTMLElement>('[data-iot-hub-search-bar]');
		const searchHeading =
			bar?.dataset.headingPrefix && state.has('q')
				? bar.querySelector<HTMLElement>('[data-search-heading]')?.textContent?.trim()
				: '';
		const label = searchHeading || root.dataset.backLabel;
		if (!label) return;

		// A default-sorted, unfiltered list has nothing worth carrying over —
		// the static parent crumb already points at the right place. Drop any
		// earlier entry rather than leaving it: the visitor has since left that
		// state, so it must not outlive it and win over this visit.
		if (!query) {
			clearOrigin();
			return;
		}

		let itemPath: string;
		try {
			itemPath = new URL(card.href).pathname;
		} catch {
			return;
		}

		const origin: ListOrigin = {
			itemPath,
			listUrl: `${basePath}?${query}`,
			label,
		};

		try {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(origin));
		} catch {
			// Private mode or a full quota just means no restore. Never let
			// this throw into the navigation the click is about to perform.
		}
	});
}

// Points the detail page's parent crumb back at the list the visitor came
// from. A no-op unless a stored origin names this exact page.
export function applyListOrigin(): void {
	let raw: string | null;
	try {
		raw = sessionStorage.getItem(STORAGE_KEY);
	} catch {
		return;
	}
	if (!raw) return;

	let origin: Partial<ListOrigin>;
	try {
		origin = JSON.parse(raw) as Partial<ListOrigin>;
	} catch {
		clearOrigin();
		return;
	}

	// This equality is the whole correctness guard: retarget only when the
	// stored entry names the item on screen. Exact, survives a reload of this
	// page, and cannot send anyone to a list the item isn't in — a
	// `document.referrer` check (what CaseStudyLayout.astro does) gives up all
	// three. The entry itself stays: it is still the way back for the item it
	// names, and this check is what keeps it off every other item.
	if (origin?.itemPath !== location.pathname) return;
	if (!origin.listUrl || !origin.label) return;

	const crumb = document.querySelector<HTMLAnchorElement>(`[data-crumb-id="${ORIGIN_CRUMB_ID}"]`);
	if (!crumb) return;

	// The entry is kept, not consumed: a reload of this page should still
	// offer the same way back.
	crumb.href = origin.listUrl;
	crumb.textContent = origin.label;
}
