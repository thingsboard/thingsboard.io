// Runtime updater for Pagination.astro. Client-driven surfaces (filtered
// grids, dynamic search) call `updatePagination(nav, state)` after every
// filter/page change to rebuild the page-number list with event-emitting
// buttons. Clicks dispatch a bubbling `tb-pagination:page-change` { page }
// CustomEvent on the nav root — the host listens, updates its state, and
// calls updatePagination again. The per-page dropdown (when enabled on the
// component) dispatches `tb-pagination:page-size-change` { perPage } the
// same way.

import { buildPages, CHEVRON_PATHS, formatPageSummary, PAGINATION_STRINGS } from './pagination-shared';

export interface PaginationState {
	currentPage: number;
	totalPages: number;
	/** Hide the whole nav when there is only one page. Default false. */
	hideOnSinglePage?: boolean;
}

function chevronSvgHtml(direction: 'left' | 'right'): string {
	return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="${CHEVRON_PATHS[direction]}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
}

// <button> factories. UA button defaults (font-family, appearance, :disabled
// colour) are reset in the component's `pagination-btn` styles so runtime
// buttons render identical to build-time markup. `.is-disabled` /
// `.is-current` block clicks via pointer-events rather than the `disabled`
// attribute (which would apply the UA disabled colour and fight the accent
// background).

function makeChevron(
	direction: 'left' | 'right',
	enabled: boolean,
	targetPage: number,
	label: string
): HTMLElement {
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = `tb-pagination__chevron${enabled ? '' : ' is-disabled'}`;
	btn.dataset.navRole = direction === 'left' ? 'prev' : 'next';
	btn.setAttribute('aria-label', label);
	if (!enabled) btn.setAttribute('aria-disabled', 'true');
	btn.innerHTML = chevronSvgHtml(direction);
	btn.addEventListener('click', () => {
		if (!enabled) return;
		dispatchPageChange(btn, targetPage);
	});
	return btn;
}

function makePageButton(page: number, isCurrent: boolean): HTMLElement {
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = `tb-pagination__page${isCurrent ? ' is-current' : ''}`;
	btn.dataset.navRole = `page-${page}`;
	if (isCurrent) btn.setAttribute('aria-current', 'page');
	btn.textContent = String(page);
	btn.addEventListener('click', () => {
		if (isCurrent) return;
		dispatchPageChange(btn, page);
	});
	return btn;
}

// replaceChildren() destroys the control the user just activated, which
// would drop keyboard focus to <body> on every page change. Capture the
// focused control's role before the rebuild and re-focus its successor.
function capturedFocusRole(nav: HTMLElement): string | null {
	const active = document.activeElement as HTMLElement | null;
	if (!active || !nav.contains(active)) return null;
	return active.dataset.navRole ?? null;
}

function restoreFocus(nav: HTMLElement, role: string | null): void {
	if (!role) return;
	// Pick the visible row's control. `offsetParent === null` detects hidden
	// here only because the numbers/compact rows are toggled with
	// `display: none` (media query) — a row hidden via visibility/opacity/clip
	// would slip through, so that toggle must stay on `display`.
	// Also skip `.is-disabled`: navigating to the first/last page rebuilds that
	// boundary chevron as disabled, and focusing it would park focus on a
	// control the user can no longer activate. Falling through to the
	// current-page button keeps focus on a live, meaningful target.
	const focusable = (el: HTMLElement) =>
		el.offsetParent !== null && !el.classList.contains('is-disabled');
	const candidates = [
		...nav.querySelectorAll<HTMLElement>(`[data-nav-role="${role}"]`),
		nav.querySelector<HTMLElement>('.tb-pagination__page.is-current'),
	].filter((el): el is HTMLElement => !!el);
	candidates.find(focusable)?.focus();
}

function dispatchPageChange(el: HTMLElement, page: number): void {
	el.dispatchEvent(
		new CustomEvent('tb-pagination:page-change', {
			detail: { page },
			bubbles: true,
		})
	);
}

function navLabels(nav: HTMLElement): { prev: string; next: string } {
	return {
		prev: nav.dataset.prevLabel || PAGINATION_STRINGS.prevPageAriaLabel,
		next: nav.dataset.nextLabel || PAGINATION_STRINGS.nextPageAriaLabel,
	};
}

export function updatePagination(
	nav: HTMLElement,
	{ currentPage, totalPages, hideOnSinglePage = false }: PaginationState
): void {
	if (hideOnSinglePage) {
		nav.hidden = totalPages <= 1;
		if (nav.hidden) return;
	}

	const focusRole = capturedFocusRole(nav);
	const labels = navLabels(nav);

	// Rebuild the "numbers" list (desktop layout).
	const numbersList = nav.querySelector<HTMLUListElement>('.tb-pagination__pages--numbers');
	if (numbersList) {
		numbersList.replaceChildren();
		const prevLi = document.createElement('li');
		prevLi.appendChild(makeChevron('left', currentPage > 1, currentPage - 1, labels.prev));
		numbersList.appendChild(prevLi);
		for (const item of buildPages(currentPage, totalPages)) {
			const li = document.createElement('li');
			if (item === 'ellipsis') {
				li.className = 'tb-pagination__ellipsis';
				li.setAttribute('aria-hidden', 'true');
				li.textContent = '…';
			} else {
				li.appendChild(makePageButton(item, item === currentPage));
			}
			numbersList.appendChild(li);
		}
		const nextLi = document.createElement('li');
		nextLi.appendChild(
			makeChevron('right', currentPage < totalPages, currentPage + 1, labels.next)
		);
		numbersList.appendChild(nextLi);
	}

	// Rebuild the compact summary row (mobile layout).
	const compact = nav.querySelector<HTMLElement>('.tb-pagination__pages--compact');
	if (compact) {
		compact.replaceChildren();
		compact.appendChild(makeChevron('left', currentPage > 1, currentPage - 1, labels.prev));
		const summary = document.createElement('span');
		summary.className = 'tb-pagination__summary';
		summary.textContent = formatPageSummary(currentPage, totalPages);
		compact.appendChild(summary);
		compact.appendChild(
			makeChevron('right', currentPage < totalPages, currentPage + 1, labels.next)
		);
	}

	restoreFocus(nav, focusRole);
}
