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

/**
 * Every country a distributor covers. A region-wide entry covers all of its
 * regions; otherwise it covers the countries it names, plus the whole of any
 * declared region none of those countries falls in — declaring a region
 * without naming a country in it means "all of it".
 */
export function getCoverage(d: Distributor): string[] {
	const named = getNamedCountries(d);
	const whole =
		d.countries === 'region-wide'
			? d.regions
			: d.regions.filter((r) => !REGION_MEMBERSHIP[r].some((c) => named.includes(c)));
	return Array.from(new Set([...named, ...whole.flatMap((r) => REGION_MEMBERSHIP[r])])).sort();
}

/** Regions the table files a country under. */
function regionsOf(country: string, membership: Record<Region, string[]>): Region[] {
	return (Object.keys(membership) as Region[]).filter((r) => membership[r].includes(country));
}

/**
 * The region table and the distributor data must describe the same countries,
 * and every distributor must declare every region its named countries fall
 * under. A named country the table doesn't classify silently narrows
 * region-wide coverage; a classified country nobody covers is dead weight that
 * hides typos; a named country in an undeclared region can't be reached through
 * that region's filter, since the dropdown offers only the region's own
 * countries and a card only matches regions it declares.
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

	const undeclared = distributors.flatMap((d) => {
		// Unclassified countries are already reported above.
		const outside = getNamedCountries(d).filter(
			(c) => classified.has(c) && regionsOf(c, membership).some((r) => !d.regions.includes(r))
		);
		return outside.length > 0 ? [`${d.name} (${outside.join(', ')})`] : [];
	});
	if (undeclared.length > 0) {
		errors.push(
			`countries in a region their distributor doesn't declare — add that region to the entry in src/data/partners/distributors.ts, or fix the country's classification in src/data/partners/regions.ts: ${undeclared.join('; ')}`
		);
	}

	// Compares names, not coverage: a region-wide entry or a whole-region claim covers these without naming them.
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
