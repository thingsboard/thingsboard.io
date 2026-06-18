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

// Re-exported so pagination-client.ts gets the chevron geometry from the same
// source as the build-time <Chevron> renders — no second copy to drift.
export { CHEVRON_PATHS } from '@components/chevron-paths';

export function formatPageSummary(current: number, total: number): string {
	return PAGINATION_STRINGS.pageSummary
		.replace('{current}', String(current))
		.replace('{total}', String(total));
}

export const PAGINATION_STRINGS = {
	ariaLabel: 'Pagination',
	prevPageAriaLabel: 'Previous page',
	nextPageAriaLabel: 'Next page',
	perPageLabel: 'Items per page:',
	// {current}/{total} placeholders so the compact summary stays a single
	// translatable phrase (word order varies by language) and lives with the
	// other labels rather than as an inline string in formatPageSummary.
	pageSummary: 'Page {current} of {total}',
} as const;
