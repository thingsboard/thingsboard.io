/**
 * Distributor data with its invariants checked at import time.
 *
 * Importing this module validates the dataset against the region table, so every
 * consumer — the finder page, a future map or partner page, the lint script —
 * fails the same way instead of each having to remember the checks itself.
 */
import { DISTRIBUTORS } from './distributors.ts';
import { REGION_MEMBERSHIP, REGIONS, type Region } from './regions.ts';
import type { Distributor } from './types.ts';

export { DISTRIBUTORS, REGION_MEMBERSHIP, REGIONS };
export type { Distributor, Region };

/** Countries a distributor names itself. Empty when it covers whole regions. */
export function getNamedCountries(d: Distributor): string[] {
	return d.countries === 'region-wide' ? [] : [...d.countries];
}

/** Every country a distributor covers, expanding region-wide coverage. */
export function getCoverage(d: Distributor): string[] {
	if (d.countries !== 'region-wide') return [...d.countries];
	return Array.from(new Set(d.regions.flatMap((r) => REGION_MEMBERSHIP[r]))).sort();
}

/** Countries the finder can offer as filter options. */
export const COVERED_COUNTRIES: string[] = Array.from(
	new Set(DISTRIBUTORS.flatMap(getNamedCountries)),
).sort();

/**
 * The region table and the distributor data must describe the same countries.
 * A named country the table doesn't classify silently narrows region-wide
 * coverage; a classified country nobody covers is dead weight that hides typos.
 *
 * Pure so the lint script can exercise both failure modes without a fixture file.
 */
export function findCoverageErrors(
	distributors: Distributor[],
	membership: Record<Region, string[]>,
): string[] {
	const named = new Set(distributors.flatMap(getNamedCountries));
	const classified = new Set(Object.values(membership).flat());
	const errors: string[] = [];

	const missing = [...named].filter((c) => !classified.has(c)).sort();
	if (missing.length > 0) {
		errors.push(
			`countries named by a distributor but not classified in REGION_MEMBERSHIP — add them to a region in src/data/partners/regions.ts: ${missing.join(', ')}`,
		);
	}

	const stray = [...classified].filter((c) => !named.has(c)).sort();
	if (stray.length > 0) {
		errors.push(
			`countries classified in REGION_MEMBERSHIP that no distributor covers — drop them, or add the distributor that covers them: ${stray.join(', ')}`,
		);
	}

	return errors;
}

const coverageErrors = findCoverageErrors(DISTRIBUTORS, REGION_MEMBERSHIP);
if (coverageErrors.length > 0) {
	throw new Error(`[distributors] ${coverageErrors.join(' | ')}`);
}
