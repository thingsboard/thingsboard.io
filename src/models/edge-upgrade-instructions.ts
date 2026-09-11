// Relative import on purpose: keeps this module loadable from the Astro
// config chain, which resolves modules before tsconfig path aliases apply.
import { assertNewestFirst, latestPatchPerBaseline } from './upgrade-shared.ts';

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

export interface EdgeReleaseFamily {
	/** Major.minor family string, e.g. "4.3" */
	family: string;
	lts: boolean;
	/** Date of the first release in this family */
	releaseDate: string;
	/** Latest patch version tag, e.g. "v4.3.0.1" */
	latestPatch: string;
	/** Date of the latest patch release */
	latestPatchDate: string;
	/** All patches in this family, newest first */
	patches: { version: string; date: string }[];
}

/** Converts a family string to a URL slug, e.g. "4.3" → "v4-3-x" */
export function getFamilySlug(family: string): string {
	return 'v' + family.replace(/\./g, '-') + '-x';
}

/**
 * Versions to render on an Edge upgrade-instruction page (optionally scoped to
 * a family). Only the newest patch of each `baseVersion` is kept; entries
 * without a `baseVersion` are always kept. Input is assumed newest-first,
 * matching the ordering of `EDGE_UPGRADE_VERSIONS`.
 */
export function getEdgeUpgradeStepVersions(family?: string): EdgeUpgradeVersion[] {
	const scoped = family
		? EDGE_UPGRADE_VERSIONS.filter((v) => v.family === family)
		: EDGE_UPGRADE_VERSIONS;
	return latestPatchPerBaseline(scoped);
}

/** CE GitHub download URL for a Linux .deb or .rpm package */
export function cePkgDownloadUrl(v: EdgeUpgradeVersion, ext: 'deb' | 'rpm'): string {
	const tag = v.ceGhTagOverride ?? v.linuxPkgSuffix;
	return `https://github.com/thingsboard/thingsboard-edge/releases/download/v${tag}/tb-edge-${v.linuxPkgSuffix}.${ext}`;
}

/** PE dist URL for a Linux .deb or .rpm package */
export function pePkgDownloadUrl(v: EdgeUpgradeVersion, ext: 'deb' | 'rpm'): string {
	return `https://dist.thingsboard.io/tb-edge-${v.linuxPkgSuffix}pe.${ext}`;
}

/** CE Docker image tag, e.g. "4.3.0.1EDGE" */
export function ceDockerTag(v: EdgeUpgradeVersion): string {
	return `${v.version}EDGE`;
}

/** PE Docker image tag, e.g. "4.3.0.1EDGEPE" */
export function peDockerTag(v: EdgeUpgradeVersion): string {
	return `${v.version}EDGEPE`;
}

/**
 * All Edge upgrade-eligible versions, newest-first. Ordering is load-bearing:
 * EDGE_UPGRADE_FAMILIES dedups by position, steps render in array order, and
 * getEdgeUpgradeStepVersions treats the first entry per baseVersion as the
 * latest. The assertNewestFirst() call below fails the build on an
 * out-of-order insert.
 */
export const EDGE_UPGRADE_VERSIONS: EdgeUpgradeVersion[] = [
	{
		version: '4.3.1.1',
		displayVersion: '4.3.1.1',
		family: '4.3',
		baseVersion: '4.3.1',
		patch: true,
		upgradableFrom: '4.2.1.x',
		patchableFrom: '4.3.x',
		prevVersionAnchor: 'v4-3-0-1',
		upgrade: true,
		manualVersionUpgrade: false,
		linuxPkgSuffix: '4.3.1.1',
		anchor: 'v4-3-1-1',
		releaseDate: 'Apr 1 2026',
		lts: true,
	},
	{
		version: '4.3.0.1',
		displayVersion: '4.3.0.1',
		family: '4.3',
		baseVersion: '4.3.0',
		patch: true,
		upgradableFrom: '4.2.1.x',
		prevVersionAnchor: 'v4-2-1-2',
		upgrade: true,
		manualVersionUpgrade: false,
		linuxPkgSuffix: '4.3.0.1',
		anchor: 'v4-3-0-1',
		releaseDate: 'Feb 3 2026',
		lts: true,
	},
	{
		version: '4.2.2.1',
		displayVersion: '4.2.2.1',
		family: '4.2',
		baseVersion: '4.2.2',
		patch: true,
		upgradableFrom: '4.2.0',
		prevVersionAnchor: 'v4-2-1-2',
		upgrade: true,
		manualVersionUpgrade: false,
		linuxPkgSuffix: '4.2.2.1',
		anchor: 'v4-2-2-1',
		releaseDate: 'Apr 1 2026',
		lts: true,
	},
	{
		version: '4.2.1.2',
		displayVersion: '4.2.1.2',
		family: '4.2',
		baseVersion: '4.2.1',
		patch: true,
		upgradableFrom: '4.2.0',
		prevVersionAnchor: 'v4-2-0',
		upgrade: true,
		manualVersionUpgrade: false,
		linuxPkgSuffix: '4.2.1.2',
		anchor: 'v4-2-1-2',
		releaseDate: 'Feb 3 2026',
		lts: true,
	},
	{
		version: '4.2.0',
		displayVersion: '4.2',
		family: '4.2',
		patch: false,
		upgradableFrom: '4.1.0',
		prevVersionAnchor: 'v4-1-0',
		upgrade: true,
		manualVersionUpgrade: false,
		linuxPkgSuffix: '4.2',
		anchor: 'v4-2-0',
		releaseDate: 'Aug 15 2025',
		lts: true,
	},
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
		releaseDate: 'Jul 3 2025',
		lts: false,
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
		releaseDate: 'Apr 22 2025',
		lts: false,
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
		releaseDate: 'Feb 19 2025',
		lts: false,
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
		releaseDate: 'Dec 31 2024',
		lts: false,
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
		releaseDate: 'Oct 3 2024',
		lts: false,
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
		releaseDate: 'Jun 17 2024',
		lts: false,
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
		releaseDate: 'Apr 11 2024',
		lts: false,
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
		releaseDate: 'Mar 18 2024',
		lts: false,
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
		releaseDate: 'Dec 28 2023',
		lts: false,
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
		releaseDate: 'Nov 13 2023',
		lts: false,
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
		releaseDate: 'Sep 21 2023',
		lts: false,
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
		releaseDate: 'May 31 2023',
		lts: false,
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
		releaseDate: 'May 31 2023',
		lts: false,
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
		releaseDate: 'May 9 2023',
		lts: false,
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
		releaseDate: 'Dec 21 2022',
		lts: false,
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
		releaseDate: 'Aug 18 2022',
		lts: false,
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
		releaseDate: 'Jul 19 2022',
		lts: false,
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
		releaseDate: 'Mar 22 2022',
		lts: false,
	},
];

assertNewestFirst(EDGE_UPGRADE_VERSIONS, 'EDGE_UPGRADE_VERSIONS');

export const EDGE_UPGRADE_FAMILIES = [...new Set(EDGE_UPGRADE_VERSIONS.map((v) => v.family))];

export const EDGE_RELEASE_FAMILIES: EdgeReleaseFamily[] = [
	{
		family: '4.3',
		lts: true,
		releaseDate: 'Jan 20 2026',
		latestPatch: 'v4.3.1.1',
		latestPatchDate: 'Apr 1 2026',
		patches: [
			{ version: 'v4.3.1.1', date: 'Apr 1, 2026' },
			{ version: 'v4.3.1', date: 'Mar 11, 2026' },
			{ version: 'v4.3.0.1', date: 'Feb 3, 2026' },
			{ version: 'v4.3.0', date: 'Jan 20, 2026' },
		],
	},
	{
		family: '4.2',
		lts: true,
		releaseDate: 'Aug 15 2025',
		latestPatch: 'v4.2.2.1',
		latestPatchDate: 'Apr 1 2026',
		patches: [
			{ version: 'v4.2.2.1', date: 'Apr 1, 2026' },
			{ version: 'v4.2.2', date: 'Mar 11, 2026' },
			{ version: 'v4.2.1.2', date: 'Feb 3, 2026' },
			{ version: 'v4.2.1', date: 'Oct 15, 2025' },
			{ version: 'v4.2.0', date: 'Aug 15, 2025' },
		],
	},
	{
		family: '4.1',
		lts: false,
		releaseDate: 'Jul 3 2025',
		latestPatch: 'v4.1.0',
		latestPatchDate: 'Jul 3 2025',
		patches: [{ version: 'v4.1.0', date: 'Jul 3, 2025' }],
	},
	{
		family: '4.0',
		lts: false,
		releaseDate: 'Apr 15 2025',
		latestPatch: 'v4.0.1',
		latestPatchDate: 'Apr 22 2025',
		patches: [
			{ version: 'v4.0.1', date: 'Apr 22, 2025' },
			{ version: 'v4.0.0', date: 'Apr 15, 2025' },
		],
	},
	{
		family: '3.9',
		lts: false,
		releaseDate: 'Dec 31 2024',
		latestPatch: 'v3.9.1',
		latestPatchDate: 'Feb 19 2025',
		patches: [
			{ version: 'v3.9.1', date: 'Feb 19, 2025' },
			{ version: 'v3.9.0', date: 'Dec 31, 2024' },
		],
	},
	{
		family: '3.8',
		lts: false,
		releaseDate: 'Oct 3 2024',
		latestPatch: 'v3.8.0',
		latestPatchDate: 'Oct 3 2024',
		patches: [{ version: 'v3.8.0', date: 'Oct 3, 2024' }],
	},
	{
		family: '3.7',
		lts: false,
		releaseDate: 'Jun 17 2024',
		latestPatch: 'v3.7.0',
		latestPatchDate: 'Jun 17 2024',
		patches: [{ version: 'v3.7.0', date: 'Jun 17, 2024' }],
	},
	{
		family: '3.6',
		lts: false,
		releaseDate: 'Sep 21 2023',
		latestPatch: 'v3.6.4',
		latestPatchDate: 'Apr 11 2024',
		patches: [
			{ version: 'v3.6.4', date: 'Apr 11, 2024' },
			{ version: 'v3.6.3', date: 'Mar 18, 2024' },
			{ version: 'v3.6.2', date: 'Dec 28, 2023' },
			{ version: 'v3.6.1', date: 'Nov 13, 2023' },
			{ version: 'v3.6.0', date: 'Sep 21, 2023' },
		],
	},
	{
		family: '3.5',
		lts: false,
		releaseDate: 'May 9 2023',
		latestPatch: 'v3.5.1.1',
		latestPatchDate: 'May 31 2023',
		patches: [
			{ version: 'v3.5.1.1', date: 'May 31, 2023' },
			{ version: 'v3.5.1', date: 'May 31, 2023' },
			{ version: 'v3.5.0', date: 'May 9, 2023' },
		],
	},
	{
		family: '3.4',
		lts: false,
		releaseDate: 'Jul 19 2022',
		latestPatch: 'v3.4.3',
		latestPatchDate: 'Dec 21 2022',
		patches: [
			{ version: 'v3.4.3', date: 'Dec 21, 2022' },
			{ version: 'v3.4.1', date: 'Aug 18, 2022' },
			{ version: 'v3.4.0', date: 'Jul 19, 2022' },
		],
	},
	{
		family: '3.3',
		lts: false,
		releaseDate: 'Mar 22 2022',
		latestPatch: 'v3.3.4.1',
		latestPatchDate: 'Mar 22 2022',
		patches: [{ version: 'v3.3.4.1', date: 'Mar 22, 2022' }],
	},
];
