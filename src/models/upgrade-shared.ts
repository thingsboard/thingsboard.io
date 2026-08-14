/**
 * Helpers shared by the ThingsBoard, Edge, and Trendz upgrade-instruction
 * models and *UpgradeSteps components.
 */

/** Minimal shape of an upgrade-version entry needed by the label helpers. */
export interface UpgradePatchInfo {
	/** true = this is a patch release within a family */
	patch: boolean;
	displayVersion: string;
	/** Base version for patch releases only, e.g. "4.3.1" for 4.3.1.3 */
	baseVersion?: string;
	/** Optional override for the in-family patch label, e.g. "4.3.x" */
	patchableFrom?: string;
}

/**
 * Section heading for a version on upgrade pages, e.g.
 * "Upgrading ThingsBoard to 4.3.1.3 (latest 4.3.1 patch)". Page templates
 * build their TOC entries with this helper too — generate both through it so
 * the TOC text can never drift from the rendered <h2>.
 */
export function getUpgradeHeading(v: UpgradePatchInfo, productLabel: string): string {
	return v.patch && v.baseVersion && v.baseVersion !== v.displayVersion
		? `Upgrading ${productLabel} to ${v.displayVersion} (latest ${v.baseVersion} patch)`
		: `Upgrading ${productLabel} to ${v.displayVersion}`;
}

/** Label for the "… or any X patch" applicability note, e.g. "4.3.x" or "4.2.2". */
export function patchFamilyLabel(v: UpgradePatchInfo): string {
	return v.patchableFrom ?? v.baseVersion ?? v.displayVersion;
}

/**
 * Label for the "if you are upgrading from version X, do not run the upgrade
 * script" note, e.g. "4.3.x" or "4.2.2.x".
 */
export function patchScriptLabel(v: UpgradePatchInfo): string {
	return v.patchableFrom ?? `${v.baseVersion}.x`;
}

/**
 * Keeps only the newest patch of each `baseVersion` group — older patches
 * within the same baseline only duplicate the same steps. Entries without a
 * `baseVersion` are always kept. Input must be newest-first (the first entry
 * seen per baseVersion wins); see assertNewestFirst.
 */
export function latestPatchPerBaseline<T extends { baseVersion?: string }>(versions: readonly T[]): T[] {
	const seenBaselines = new Set<string>();
	return versions.filter((v) => {
		if (!v.baseVersion) return true;
		if (seenBaselines.has(v.baseVersion)) return false;
		seenBaselines.add(v.baseVersion);
		return true;
	});
}

/**
 * Build-time guard for the newest-first ordering invariant the upgrade models
 * rely on (family dedup order, render order, latest-patch-per-baseVersion
 * selection). Call it right after declaring a version array — it throws at
 * module load, failing the build, when an entry is out of order.
 */
export function assertNewestFirst(versions: readonly { version: string }[], listName: string): void {
	for (let i = 1; i < versions.length; i++) {
		if (compareVersions(versions[i - 1].version, versions[i].version) <= 0) {
			throw new Error(
				`${listName} must be ordered newest-first, but "${versions[i].version}" follows "${versions[i - 1].version}". ` +
					'Move the entry so versions are strictly descending.'
			);
		}
	}
}

/**
 * Segment-wise numeric version compare; missing segments count as 0, so
 * "4.3.1.1" > "4.3.1". Hotfix suffixes sort as an extra segment, so
 * "1.10.3-HF7" > "1.10.3" (Trendz).
 */
function compareVersions(a: string, b: string): number {
	const parse = (ver: string) => ver.replace(/-HF/i, '.').split('.').map(Number);
	const as = parse(a);
	const bs = parse(b);
	for (let i = 0; i < Math.max(as.length, bs.length); i++) {
		const d = (as[i] ?? 0) - (bs[i] ?? 0);
		if (d !== 0) return d;
	}
	return 0;
}
