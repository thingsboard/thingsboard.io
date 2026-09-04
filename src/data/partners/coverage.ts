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

/**
 * Declared regions that contain none of the entry's named countries. Such a
 * card shows under the region's "All countries" view but disappears as soon as
 * any country is picked, so this is worth a look — but whether the region is a
 * genuine claim or a leftover is a data-owner call, hence a warning, not an error.
 */
function findDanglingRegions(distributors: Distributor[], membership: Record<Region, string[]>): string[] {
	return distributors.flatMap((d) => {
		const countries = getNamedCountries(d);
		if (countries.length === 0) return [];
		const dangling = d.regions.filter((r) => !countries.some((c) => membership[r].includes(c)));
		return dangling.length > 0 ? [`${d.name} → ${dangling.join(', ')}`] : [];
	});
}

/** Throws if the dataset and the region table disagree. Called by `distributors.ts`. */
export function assertDistributorData(distributors: Distributor[], membership: Record<Region, string[]>): void {
	const errors = findCoverageErrors(distributors, membership);
	if (errors.length > 0) {
		throw new Error(`[distributors] ${errors.join(' | ')}`);
	}
	const dangling = findDanglingRegions(distributors, membership);
	if (dangling.length > 0) {
		console.warn(
			`[distributors] regions declared without any named country in them (card vanishes once a country is picked): ${dangling.join('; ')}`
		);
	}
}
