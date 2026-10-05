import { allPages } from '~/content';
import { hasCommunityRelease } from '@models/community-cutoff';
import { RELEASE_FAMILIES, familySlug } from '@models/releases-table';
import { UPGRADE_FAMILIES, getFamilySlug } from '@models/upgrade-instructions';
import { EDGE_RELEASE_FAMILIES, getFamilySlug as getEdgeFamilySlug } from '@models/edge-upgrade-instructions';
import { TRENDZ_RELEASE_FAMILIES, familySlug as trendzFamilySlug } from '@models/trendz-releases-table';
import { TRENDZ_UPGRADE_FAMILIES, getTrendzFamilySlug } from '@models/trendz-upgrade-instructions';

/**
 * Every docs page id that exists, including the ones produced by dynamic routes.
 *
 * `switchVersionWithFallback` needs this to decide whether the equivalent page exists in
 * the product being switched to; a miss silently falls back to that product's root. Pages
 * from the `docs` collection come from `allPages`, but the `[familySlug]` / `[platform]`
 * routes under `src/pages/docs/**` are not collection entries, so their ids are rebuilt
 * here from the same model arrays their `getStaticPaths()` iterate.
 *
 * That mirroring is the fragile part: adding a dynamic docs route without adding it here
 * produces no error, just a version switch that quietly lands on the product root. If you
 * add one, add it below.
 *
 * Module scope on purpose. The sidebar renders VersionSwitcher on every docs page — 3,000+
 * of them — and this result is build-constant, so computing it per page was pure waste.
 * Vite caches the module, so the work happens once per build.
 */
function buildDocsPageIds(): ReadonlySet<string> {
	const ids = new Set(allPages.map((p) => p.id));

	// Core release tables — src/pages/docs[/pe]/releases/releases-table/[familySlug].astro
	// The CE route skips families without a Community release, so the CE ids must too.
	for (const f of RELEASE_FAMILIES) {
		const slug = familySlug(f.family);
		if (hasCommunityRelease(f.family)) ids.add(`docs/releases/releases-table/${slug}`);
		ids.add(`docs/pe/releases/releases-table/${slug}`);
	}

	// Edge release tables — src/pages/docs/edge[/pe]/releases/releases-table/[familySlug].astro
	// Both routes map the same unfiltered EDGE_RELEASE_FAMILIES, so CE and PE slugs stay in step.
	for (const f of EDGE_RELEASE_FAMILIES) {
		const slug = getEdgeFamilySlug(f.family);
		ids.add(`docs/edge/releases/releases-table/${slug}`);
		ids.add(`docs/edge/pe/releases/releases-table/${slug}`);
	}

	// Trendz release tables — src/pages/docs/trendz/releases/releases-table/[familySlug].astro
	for (const f of TRENDZ_RELEASE_FAMILIES) {
		ids.add(`docs/trendz/releases/releases-table/${trendzFamilySlug(f.family)}`);
	}

	// Core upgrade instructions — src/pages/docs[/pe]/installation/upgrade-instructions/[platform]/[familySlug].astro
	// Same Community cutoff as the CE route: post-cutover families get PE ids only.
	const upgradePlatforms = ['ubuntu', 'centos', 'windows', 'docker', 'docker-compose'];
	for (const family of UPGRADE_FAMILIES) {
		const slug = getFamilySlug(family);
		const community = hasCommunityRelease(family);
		for (const platform of upgradePlatforms) {
			if (community) ids.add(`docs/installation/upgrade-instructions/${platform}/${slug}`);
			ids.add(`docs/pe/installation/upgrade-instructions/${platform}/${slug}`);
		}
	}

	// Trendz upgrade instructions — note `kubernetes` here where core has `docker-compose`.
	const trendzUpgradePlatforms = ['ubuntu', 'centos', 'windows', 'docker', 'kubernetes'];
	for (const family of TRENDZ_UPGRADE_FAMILIES) {
		const slug = getTrendzFamilySlug(family);
		for (const platform of trendzUpgradePlatforms) {
			ids.add(`docs/trendz/installation/upgrade-instructions/${platform}/${slug}`);
		}
	}

	return ids;
}

export const docsPageIds: ReadonlySet<string> = buildDocsPageIds();
