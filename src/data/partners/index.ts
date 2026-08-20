/**
 * Distributor data and the selectors the finder renders from. Importing
 * `./distributors.ts` validates the dataset, so every consumer gets the check.
 *
 * Distributor-scoped: hardware partners are imported from
 * `./hardware-partners.ts` directly.
 */
import { getNamedCountries } from './coverage.ts';
import { DISTRIBUTORS } from './distributors.ts';
import { REGION_MEMBERSHIP, REGIONS, type Region } from './regions.ts';
import type { Distributor } from './types.ts';

export { DISTRIBUTORS, REGION_MEMBERSHIP, REGIONS };
export { getCoverage } from './coverage.ts';
export type { Distributor, Region };

/** Countries the finder offers as filter options — the ones distributors name. */
export const OFFERED_COUNTRIES: string[] = Array.from(new Set(DISTRIBUTORS.flatMap(getNamedCountries))).sort();

/**
 * Countries each region offers in its dropdown — names distributors list, not
 * their coverage, so a region-wide entry adds no options of its own.
 */
const regionOffered = {} as Record<Region, string[]>;
for (const region of REGIONS) {
	regionOffered[region] = Array.from(
		new Set(DISTRIBUTORS.filter((d) => d.regions.includes(region)).flatMap(getNamedCountries))
	).sort();
}
export const REGION_OFFERED_COUNTRIES: Record<Region, string[]> = regionOffered;
