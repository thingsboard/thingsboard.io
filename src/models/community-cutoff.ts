// Relative imports on purpose: `upgrade-instructions.ts` imports this module and is
// pulled into the Astro config chain, which loads before tsconfig path aliases apply.
import { SOURCE_AVAILABLE_FROM_VER } from '../data/versions.ts';
import { isCommunityProduct, type Products } from './site.models.ts';
import { versionAtLeast } from './upgrade-shared.ts';

/** No Community release from SOURCE_AVAILABLE_FROM_VER on — CE and PE merge into one product. */
export function hasCommunityRelease(family: string): boolean {
	return !versionAtLeast(family, SOURCE_AVAILABLE_FROM_VER);
}

/** Drops post-cutover families for Community products; every other product gets the full list. */
export function scopeToEdition<T extends { family: string }>(rows: readonly T[], product: Products): T[] {
	return isCommunityProduct(product) ? rows.filter((r) => hasCommunityRelease(r.family)) : [...rows];
}
