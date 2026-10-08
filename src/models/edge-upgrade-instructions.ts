// Relative import on purpose: keeps this module loadable from the Astro
// config chain, which resolves modules before tsconfig path aliases apply.
import { EDGE_NEUTRAL_NAMES_FROM_VER } from '../data/versions.ts';
import { isCommunityProduct, type Products } from './site.models.ts';
import { EDGE_RELEASES, EDGE_UPGRADE_GRAPH } from '../data/edge-releases.ts';
import type { ReleaseFamily } from './releases-table.ts';
import { assertNewestFirst, latestPatchPerBaseline, versionAtLeast } from './upgrade-shared.ts';

export interface EdgeUpgradeVersion {
	/** Raw version string, e.g. "4.3.0.1", "4.2.0", "3.9.1" */
	version: string;
	/** Display version — "4.2.0" → "4.2", patch keeps full string */
	displayVersion: string;
	/** The major.minor family, e.g. "4.3", "3.9" */
	family: string;
	/** Base version for patch releases only, e.g. "4.3.0" for 4.3.0.1, "3.9" for 3.9.1 */
	baseVersion?: string;
	/** true = this is a patch release with an active patch series warning */
	patch: boolean;
	/** "upgradable-from" value, e.g. "4.2.1.x" or "4.2.0" */
	upgradableFrom: string;
	/** Optional override for the in-family patch label, e.g. "4.3.x". Read by patchScriptLabel() (upgrade-shared), which falls back to baseVersion.x when unset. */
	patchableFrom?: string;
	/** Anchor of the upgradable-from version on the same platform page */
	prevVersionAnchor?: string;
	/** false = no upgrade script needed */
	upgrade: boolean;
	/** true = pass --fromVersion to upgrade.sh */
	manualVersionUpgrade: boolean;
	/**
	 * Version string used in Linux package filenames (and PE dist URL).
	 * X.Y.0 → "X.Y"  (e.g. 4.2.0 → "4.2"), all others → same as version.
	 */
	linuxPkgSuffix: string;
	/**
	 * Override for the CE GitHub release tag when it differs from linuxPkgSuffix
	 * (e.g. if a release is published under a different tag than its package name).
	 */
	ceGhTagOverride?: string;
	/** Anchor ID for version section on platform pages, e.g. "v4-3-0-1" */
	anchor: string;
	/** Release date, e.g. "Feb 3 2026" */
	releaseDate: string;
	/** True if this is an LTS release family */
	lts: boolean;
}

/** Converts a family string to a URL slug, e.g. "4.3" → "v4-3-x" */
export function getFamilySlug(family: string): string {
	return 'v' + family.replace(/\./g, '-') + '-x';
}

/**
 * Drops Edge releases from {@link EDGE_NEUTRAL_NAMES_FROM_VER} on for Community Edge, whose
 * last release predates it; Edge PE gets the full list. The cutoff falls inside the 4.4
 * family, so unlike the ThingsBoard cutoff it compares versions, not families.
 */
export function scopeEdgeToEdition<T extends { version: string }>(rows: readonly T[], product: Products): T[] {
	return isCommunityProduct(product)
		? rows.filter((r) => !versionAtLeast(r.version, EDGE_NEUTRAL_NAMES_FROM_VER))
		: [...rows];
}

/** Releases-table families for an edition: Community Edge has none from {@link EDGE_NEUTRAL_NAMES_FROM_VER} on. */
export function scopeEdgeFamiliesToEdition<T extends { family: string }>(families: readonly T[], product: Products): T[] {
	return isCommunityProduct(product)
		? families.filter((f) => !versionAtLeast(f.family, EDGE_NEUTRAL_NAMES_FROM_VER))
		: [...families];
}

/**
 * Versions to render on an Edge upgrade-instruction page (optionally scoped to
 * a family). Only the newest patch of each `baseVersion` is kept; entries
 * without a `baseVersion` are always kept. Input is assumed newest-first,
 * matching the ordering of `EDGE_UPGRADE_VERSIONS`. Community Edge stops at its
 * last release (see {@link scopeEdgeToEdition}).
 */
export function getEdgeUpgradeStepVersions(product: Products, family?: string): EdgeUpgradeVersion[] {
	const scoped = family
		? EDGE_UPGRADE_VERSIONS.filter((v) => v.family === family)
		: EDGE_UPGRADE_VERSIONS;
	return latestPatchPerBaseline(scopeEdgeToEdition(scoped, product));
}

/** Families from here on are LTS. */
const EDGE_LTS_FROM_FAMILY = '4.2';
/** Upgrade entries from this version on are derived from the release list and upgrade graph. */
const EDGE_DERIVED_FROM_VER = '4.2.0';

const isLtsFamily = (family: string) => versionAtLeast(family, EDGE_LTS_FROM_FAMILY);
const familyOf = (version: string) => version.split('.').slice(0, 2).join('.');
/** "4.3.1.6" → "4.3.1" (patch releases are grouped under their base release); others → themselves. */
const groupOf = (version: string) => (version.split('.').length > 3 ? version.split('.').slice(0, 3).join('.') : version);
/** "4.2.0" → "4.2" — release labels and package versions drop the GA ".0". */
const shortVersion = (version: string) => version.replace(/^(\d+\.\d+)\.0$/, '$1');
const anchorOf = (version: string) => `v${version.replace(/\./g, '-')}`;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** "2026-10-01" → "Oct 1 2026" */
const displayDate = (iso: string) => {
	const [y, m, d] = iso.split('-').map(Number);
	return `${MONTHS[m - 1]} ${d} ${y}`;
};
const releaseDateOf = (version: string): string => {
	const r = EDGE_RELEASES.find((x) => x.version === version);
	if (!r) throw new Error(`Edge ${version} is not in src/data/edge-releases.ts; run node scripts/sync-edge-releases.ts`);
	return displayDate(r.date);
};

/**
 * Upgrade entries from {@link EDGE_DERIVED_FROM_VER} on: one per base release (its newest
 * patch), built from the upgrade graph.
 * - upgradableFrom: the oldest version outside the base release with a direct path, shown as
 *   "<family>.x" or "<base>.x" when the paths cover the whole family or base release.
 * - upgrade: a path from outside the base release runs the database upgrade.
 * - patchableFrom: "<family>.x" when every earlier release of the family upgrades without it.
 * - prevVersionAnchor: the entry holding the newest version outside the base release that
 *   upgrades directly; its image tag is what the Docker steps replace.
 */
function deriveUpgradeVersions(): EdgeUpgradeVersion[] {
	const released = EDGE_RELEASES.map((r) => r.version).filter((v) => versionAtLeast(v, EDGE_DERIVED_FROM_VER));
	const newestOfGroup = new Map<string, string>();
	for (const v of released) if (!newestOfGroup.has(groupOf(v))) newestOfGroup.set(groupOf(v), v);
	/** Versions with a direct path to `target`, oldest first. */
	const sources = (target: string) =>
		Object.entries(EDGE_UPGRADE_GRAPH)
			.flatMap(([from, edges]) => edges.filter((e) => e.to === target).map((e) => ({ from, db: e.db })))
			.sort((a, b) => (versionAtLeast(a.from, b.from) ? 1 : -1));
	const label = (versions: string[]) => {
		const oldest = versions[0];
		const family = familyOf(oldest);
		const coversFamilyFromOldest = released
			.filter((v) => familyOf(v) === family && versionAtLeast(v, oldest))
			.every((v) => versions.includes(v));
		if (new Set(versions.map(groupOf)).size > 1 && versions.every((v) => familyOf(v) === family) && coversFamilyFromOldest) {
			return `${family}.x`;
		}
		return released.filter((v) => groupOf(v) === groupOf(oldest)).length > 1 ? `${groupOf(oldest)}.x` : oldest;
	};
	return [...newestOfGroup.values()].map((version) => {
		const group = groupOf(version);
		const family = familyOf(version);
		const all = sources(version);
		const outside = all.filter((s) => groupOf(s.from) !== group);
		const inFamilyNoDb = all.filter((s) => !s.db && familyOf(s.from) === family).map((s) => s.from);
		const earlierInFamily = released.filter((v) => familyOf(v) === family && !versionAtLeast(v, version));
		const newestOutside = outside.at(-1)?.from;
		const patch = version.split('.').length > 3;
		return {
			version,
			displayVersion: shortVersion(version),
			family,
			...(patch ? { baseVersion: group } : {}),
			patch,
			upgradableFrom: outside.length ? label(outside.map((s) => s.from)) : '',
			...(earlierInFamily.length > 1 && earlierInFamily.every((v) => inFamilyNoDb.includes(v)) ? { patchableFrom: `${family}.x` } : {}),
			...(newestOutside ? { prevVersionAnchor: anchorOf(newestOfGroup.get(groupOf(newestOutside)) ?? newestOutside) } : {}),
			upgrade: outside.some((s) => s.db),
			manualVersionUpgrade: false,
			linuxPkgSuffix: shortVersion(version),
			anchor: anchorOf(version),
			releaseDate: releaseDateOf(version),
			lts: isLtsFamily(family),
		};
	});
}

/** Upgrade entries before {@link EDGE_DERIVED_FROM_VER}: not in the upgrade graph, kept by hand. Dates come from the release list. */
const EDGE_LEGACY_UPGRADE_VERSIONS: Omit<EdgeUpgradeVersion, 'releaseDate' | 'lts'>[] = [
	{
		version: '4.1.0',
		displayVersion: '4.1',
		family: '4.1',
		patch: false,
		upgradableFrom: '4.0.1',
		prevVersionAnchor: 'v4-0-1',
		upgrade: true,
		manualVersionUpgrade: false,
		linuxPkgSuffix: '4.1',
		anchor: 'v4-1-0',
	},
	{
		version: '4.0.1',
		displayVersion: '4.0.1',
		family: '4.0',
		patch: false,
		upgradableFrom: '3.9.1',
		prevVersionAnchor: 'v3-9-1',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '4.0.1',
		anchor: 'v4-0-1',
	},
	{
		version: '3.9.1',
		displayVersion: '3.9.1',
		family: '3.9',
		baseVersion: '3.9',
		patch: false,
		upgradableFrom: '3.9.0',
		prevVersionAnchor: 'v3-9-0',
		upgrade: true,
		manualVersionUpgrade: false,
		linuxPkgSuffix: '3.9.1',
		anchor: 'v3-9-1',
	},
	{
		version: '3.9.0',
		displayVersion: '3.9',
		family: '3.9',
		patch: false,
		upgradableFrom: '3.8.0',
		prevVersionAnchor: 'v3-8-0',
		upgrade: true,
		manualVersionUpgrade: false,
		linuxPkgSuffix: '3.9',
		anchor: 'v3-9-0',
	},
	{
		version: '3.8.0',
		displayVersion: '3.8',
		family: '3.8',
		patch: false,
		upgradableFrom: '3.7.0',
		prevVersionAnchor: 'v3-7-0',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.8',
		anchor: 'v3-8-0',
	},
	{
		version: '3.7.0',
		displayVersion: '3.7',
		family: '3.7',
		patch: false,
		upgradableFrom: '3.6.4',
		prevVersionAnchor: 'v3-6-4',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.7',
		anchor: 'v3-7-0',
	},
	{
		version: '3.6.4',
		displayVersion: '3.6.4',
		family: '3.6',
		patch: false,
		upgradableFrom: '3.6.3',
		prevVersionAnchor: 'v3-6-3',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.6.4',
		anchor: 'v3-6-4',
	},
	{
		version: '3.6.3',
		displayVersion: '3.6.3',
		family: '3.6',
		patch: false,
		upgradableFrom: '3.6.2',
		prevVersionAnchor: 'v3-6-2',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.6.3',
		anchor: 'v3-6-3',
	},
	{
		version: '3.6.2',
		displayVersion: '3.6.2',
		family: '3.6',
		patch: false,
		upgradableFrom: '3.6.1',
		prevVersionAnchor: 'v3-6-1',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.6.2',
		anchor: 'v3-6-2',
	},
	{
		version: '3.6.1',
		displayVersion: '3.6.1',
		family: '3.6',
		patch: false,
		upgradableFrom: '3.6.0',
		prevVersionAnchor: 'v3-6-0',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.6.1',
		anchor: 'v3-6-1',
	},
	{
		version: '3.6.0',
		displayVersion: '3.6',
		family: '3.6',
		patch: false,
		upgradableFrom: '3.5.1.1',
		prevVersionAnchor: 'v3-5-1-1',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.6',
		anchor: 'v3-6-0',
	},
	{
		version: '3.5.1.1',
		displayVersion: '3.5.1.1',
		family: '3.5',
		baseVersion: '3.5.1',
		patch: false,
		upgradableFrom: '3.5.1',
		prevVersionAnchor: 'v3-5-1',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.5.1.1',
		anchor: 'v3-5-1-1',
	},
	{
		version: '3.5.1',
		displayVersion: '3.5.1',
		family: '3.5',
		patch: false,
		upgradableFrom: '3.5.0',
		prevVersionAnchor: 'v3-5-0',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.5.1',
		anchor: 'v3-5-1',
	},
	{
		version: '3.5.0',
		displayVersion: '3.5',
		family: '3.5',
		patch: false,
		upgradableFrom: '3.4.3',
		prevVersionAnchor: 'v3-4-3',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.5',
		anchor: 'v3-5-0',
	},
	{
		version: '3.4.3',
		displayVersion: '3.4.3',
		family: '3.4',
		patch: false,
		upgradableFrom: '3.4.1',
		prevVersionAnchor: 'v3-4-1',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.4.3',
		anchor: 'v3-4-3',
	},
	{
		version: '3.4.1',
		displayVersion: '3.4.1',
		family: '3.4',
		patch: false,
		upgradableFrom: '3.4.0',
		prevVersionAnchor: 'v3-4-0',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.4.1',
		anchor: 'v3-4-1',
	},
	{
		version: '3.4.0',
		displayVersion: '3.4',
		family: '3.4',
		patch: false,
		upgradableFrom: '3.3.4.1',
		prevVersionAnchor: 'v3-3-4-1',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.4',
		anchor: 'v3-4-0',
	},
	{
		version: '3.3.4.1',
		displayVersion: '3.3.4.1',
		family: '3.3',
		baseVersion: '3.3.4',
		patch: false,
		upgradableFrom: '3.3.4',
		upgrade: true,
		manualVersionUpgrade: true,
		linuxPkgSuffix: '3.3.4.1',
		anchor: 'v3-3-4-1',
	},
];

/**
 * All Edge upgrade-eligible versions, newest-first. Ordering is load-bearing:
 * EDGE_UPGRADE_FAMILIES dedups by position, steps render in array order, and
 * getEdgeUpgradeStepVersions treats the first entry per baseVersion as the
 * latest. The assertNewestFirst() call below fails the build on an
 * out-of-order insert.
 */
export const EDGE_UPGRADE_VERSIONS: EdgeUpgradeVersion[] = [
	...deriveUpgradeVersions(),
	...EDGE_LEGACY_UPGRADE_VERSIONS.map((v) => ({ ...v, releaseDate: releaseDateOf(v.version), lts: false })),
];

assertNewestFirst(EDGE_UPGRADE_VERSIONS, 'EDGE_UPGRADE_VERSIONS');

export const EDGE_UPGRADE_FAMILIES = [...new Set(EDGE_UPGRADE_VERSIONS.map((v) => v.family))];

/** Releases-table highlights per family. A new family needs an entry here. */
const EDGE_FAMILY_HIGHLIGHTS: Record<string, string> = {
	'4.4': 'Remote Agent, tb-edge artifact names',
	'4.3': 'AI Model sync, User & entity deletion sync',
	'4.2': 'Calculated Fields sync, AI Rule Node',
	'4.1': 'Calculated Fields support on Edge',
	'4.0': 'Edge clustering, direct Rule Chain editing',
	'3.9': 'Kafka queue support, mobile app sync',
	'3.8': 'SCADA, Dashboard Layouts, Timewindow redesign',
	'3.7': 'Notification center, Java 17',
	'3.6': 'Isolated Queues, New Card Widgets',
	'3.5': 'Notification System & Alarm Assign + Comments',
	'3.4': 'Git VC, 2FA, Cluster support',
	'3.3': 'Initial Edge release',
};
/** First release of a family when it predates the GitHub release list. */
const EDGE_FAMILY_FIRST_RELEASE: Record<string, string> = { '3.3': 'Aug 13 2021' };

/** Releases table rows, one per family, newest first — built from the release list. */
export const EDGE_RELEASE_FAMILIES: ReleaseFamily[] = [...new Set(EDGE_RELEASES.map((r) => familyOf(r.version)))].map((family) => {
	const releases = EDGE_RELEASES.filter((r) => familyOf(r.version) === family);
	const latest = releases[0];
	const highlightsCe = EDGE_FAMILY_HIGHLIGHTS[family];
	if (!highlightsCe) throw new Error(`Add releases-table highlights for Edge ${family} to EDGE_FAMILY_HIGHLIGHTS`);
	return {
		family,
		lts: isLtsFamily(family),
		releaseDate: EDGE_FAMILY_FIRST_RELEASE[family] ?? displayDate(releases.at(-1)!.date),
		latestPatch: `v${latest.version}`,
		latestPatchDate: displayDate(latest.date),
		highlightsCe,
		patches: releases.map((r) => ({ version: `v${r.version}`, date: displayDate(r.date).replace(/ (\d{4})$/, ', $1') })),
	};
});
