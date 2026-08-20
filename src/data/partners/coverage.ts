/**
 * Coverage rules for the distributor dataset, and the assertion that enforces them.
 *
 * Separate from `index.ts` so `distributors.ts` can assert on itself without a
 * circular import.
 */
import { REGION_MEMBERSHIP, type Region } from './regions.ts';
import type { Distributor } from './types.ts';

/** Countries a distributor names itself. Empty when it covers whole regions. */
export function getNamedCountries(d: Distributor): string[] {
	return d.countries === 'region-wide' ? [] : [...d.countries];
}

/** Every country a distributor covers, expanding region-wide coverage. */
export function getCoverage(d: Distributor): string[] {
	if (d.countries !== 'region-wide') return [...d.countries];
	return Array.from(new Set(d.regions.flatMap((r) => REGION_MEMBERSHIP[r]))).sort();
}

/**
 * The region table and the distributor data must describe the same countries.
 * A named country the table doesn't classify silently narrows region-wide
 * coverage; a classified country nobody covers is dead weight that hides typos.
 */
function findCoverageErrors(distributors: Distributor[], membership: Record<Region, string[]>): string[] {
	const named = new Set(distributors.flatMap(getNamedCountries));
	const classified = new Set(Object.values(membership).flat());
	const errors: string[] = [];

	const missing = [...named].filter((c) => !classified.has(c)).sort();
	if (missing.length > 0) {
		errors.push(
			`countries named by a distributor but not classified in REGION_MEMBERSHIP — add them to a region in src/data/partners/regions.ts: ${missing.join(', ')}`
		);
	}

	// Compares names, not coverage: a region-wide distributor covers these without naming them.
	const stray = [...classified].filter((c) => !named.has(c)).sort();
	if (stray.length > 0) {
		const strayed = new Set(stray);
		const narrowed = distributors
			.filter((d) => d.countries === 'region-wide')
			.filter((d) => d.regions.some((r) => membership[r].some((c) => strayed.has(c))))
			.map((d) => d.name);
		const cost = narrowed.length > 0 ? ` Dropping them narrows coverage for ${narrowed.join(', ')}.` : '';
		errors.push(
			`countries classified in REGION_MEMBERSHIP that no distributor names — add a distributor that covers them, or drop them from the table: ${stray.join(', ')}.${cost}`
		);
	}

	return errors;
}

/** Throws if the dataset and the region table disagree. Called by `distributors.ts`. */
export function assertDistributorData(distributors: Distributor[], membership: Record<Region, string[]>): void {
	const errors = findCoverageErrors(distributors, membership);
	if (errors.length > 0) {
		throw new Error(`[distributors] ${errors.join(' | ')}`);
	}
}
