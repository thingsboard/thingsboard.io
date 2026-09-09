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

// Alphabetical for readers, so "Åland Islands" files under A rather than after Z.
const byName = new Intl.Collator('en').compare;

/** Countries the finder offers as filter options — the ones distributors name. */
export const OFFERED_COUNTRIES: string[] = Array.from(new Set(DISTRIBUTORS.flatMap(getNamedCountries))).sort(byName);

/**
 * Countries each region offers in its dropdown — the region's own countries that
 * a distributor declaring the region names. Region-wide entries name nothing, so
 * they add no options; a multi-region distributor's other countries stay out.
 */
const regionOffered = {} as Record<Region, string[]>;
for (const region of REGIONS) {
	const named = new Set(DISTRIBUTORS.filter((d) => d.regions.includes(region)).flatMap(getNamedCountries));
	regionOffered[region] = REGION_MEMBERSHIP[region].filter((c) => named.has(c)).sort(byName);
}
export const REGION_OFFERED_COUNTRIES: Record<Region, string[]> = regionOffered;
