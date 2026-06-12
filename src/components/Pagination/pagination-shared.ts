// Logic shared between Pagination.astro (build-time) and pagination-client.ts
// (runtime rebuilds). Single source for the page-window algorithm and chevron
// geometry so static and dynamic renders can never drift apart.

export type PageItem = number | 'ellipsis';

// ≤7 pages: all numbers. Otherwise: 1 … (current−1, current, current+1) … last.
export function buildPages(current: number, total: number): PageItem[] {
	if (total <= 7) {
		return Array.from({ length: total }, (_, i) => i + 1);
	}
	const result: PageItem[] = [1];
	if (current > 3) result.push('ellipsis');
	for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
		result.push(p);
	}
	if (current < total - 2) result.push('ellipsis');
	result.push(total);
	return result;
}

// Same geometry as Chevron.astro (24px viewBox, 2px round stroke).
export const CHEVRON_PATHS = {
	left: 'm15 6-6 6 6 6',
	right: 'm9 6 6 6-6 6',
} as const;

export function formatPageSummary(current: number, total: number): string {
	return `Page ${current} of ${total}`;
}

export const PAGINATION_STRINGS = {
	ariaLabel: 'Pagination',
	prevPageAriaLabel: 'Previous page',
	nextPageAriaLabel: 'Next page',
	perPageLabel: 'Items per page:',
} as const;
