export interface TrendzUpgradeVersion {
	/** Raw version string, e.g. "1.15.0.4", "1.13.2", "1.10.3-HF7" */
	version: string;
	/** Display version — "1.14.0" → "1.14", otherwise same as version */
	displayVersion: string;
	/** The major.minor family, e.g. "1.15" */
	family: string;
	/** Base version for patch releases only, e.g. "1.15.0" for 1.15.0.4 */
	baseVersion?: string;
	/** Release date string, e.g. "Feb 9 2026" */
	releaseDate: string;
	/** true = LTS release (18-month support) */
	lts: boolean;
	/** true = this is a patch release within the family */
	patch: boolean;
	/** Anchor ID for version sections on platform pages, e.g. "v1-15-0-4" */
	anchor: string;
	/**
	 * The --fromVersion argument for upgrade.sh / upgrade.bat.
	 * Omit for new-style versions that don't need this flag (e.g. 1.15.x).
	 */
	fromVersion?: string;
	/**
	 * When true, do NOT run upgrade.sh / upgrade.bat.
	 * Used for security-only patch releases (e.g. 1.8.2).
	 */
	noUpgradeScript?: boolean;
	/**
	 * Override for the Windows .zip filename when it differs from the default
	 * "trendz-windows-{version}.zip" pattern (e.g. 1.10.0 uses "trendz-windows-1.10.0-HF1.zip").
	 */
	windowsZipOverride?: string;
	/** Warn the user about Java 17 migration before upgrading */
	java17Warning?: boolean;
	/** Show a note about running the widget bundle update after upgrading */
	widgetBundleNote?: boolean;
	/** Warn the user about Python Executor migration before upgrading */
	pythonExecutorWarning?: boolean;
	/** Show a routing/HAProxy note for this version */
	haproxyNote?: boolean;
}

/** Converts a family string to a URL slug, e.g. "1.15" → "v1-15-x" */
export function getTrendzFamilySlug(family: string): string {
	return 'v' + family.replace(/\./g, '-') + '-x';
}

/** All Trendz versions available for upgrade (newest first, non-vulnerable) */
export const TRENDZ_UPGRADE_VERSIONS: TrendzUpgradeVersion[] = [
	{
		version: '1.15.2',
		displayVersion: '1.15.2',
		family: '1.15',
		releaseDate: 'May 15 2026',
		lts: true,
		patch: false,
		anchor: 'v1-15-2',
		// 1.15.x uses the new upgrade mechanism — no --fromVersion flag needed
		haproxyNote: false,
	},
	{
		version: '1.15.1',
		displayVersion: '1.15.1',
		family: '1.15',
		releaseDate: 'Apr 15 2026',
		lts: true,
		patch: false,
		anchor: 'v1-15-1',
		// 1.15.x uses the new upgrade mechanism — no --fromVersion flag needed
		haproxyNote: false,
	},
	{
		version: '1.15.0.5',
		displayVersion: '1.15.0.5',
		family: '1.15',
		baseVersion: '1.15.0',
		releaseDate: 'Feb 26 2026',
		lts: true,
		patch: true,
		anchor: 'v1-15-0-5',
		// 1.15.x uses the new upgrade mechanism — no --fromVersion flag needed
		haproxyNote: true,
	},
	{
		version: '1.14.0',
		displayVersion: '1.14',
		family: '1.14',
		releaseDate: 'Nov 6 2025',
		lts: false,
		patch: false,
		anchor: 'v1-14-0',
		fromVersion: '1.13.2',
		widgetBundleNote: true,
		pythonExecutorWarning: true,
	},
	{
		version: '1.13.2',
		displayVersion: '1.13.2',
		family: '1.13',
		releaseDate: 'Jun 27 2025',
		lts: false,
		patch: false,
		anchor: 'v1-13-2',
		fromVersion: '1.13.1',
		widgetBundleNote: true,
	},
	{
		version: '1.13.1',
		displayVersion: '1.13.1',
		family: '1.13',
		releaseDate: 'May 2 2025',
		lts: false,
		patch: false,
		anchor: 'v1-13-1',
		fromVersion: '1.13.0',
		widgetBundleNote: true,
	},
	{
		version: '1.13.0',
		displayVersion: '1.13',
		family: '1.13',
		releaseDate: 'Mar 10 2025',
		lts: false,
		patch: false,
		anchor: 'v1-13-0',
		fromVersion: '1.12.0',
		widgetBundleNote: true,
	},
	{
		version: '1.12.0',
		displayVersion: '1.12',
		family: '1.12',
		releaseDate: 'Dec 31 2024',
		lts: false,
		patch: false,
		anchor: 'v1-12-0',
		fromVersion: '1.11.2',
		widgetBundleNote: true,
	},
	{
		version: '1.11.2',
		displayVersion: '1.11.2',
		family: '1.11',
		releaseDate: 'Nov 12 2024',
		lts: false,
		patch: false,
		anchor: 'v1-11-2',
		fromVersion: '1.11.1',
	},
	{
		version: '1.11.1',
		displayVersion: '1.11.1',
		family: '1.11',
		releaseDate: 'Nov 4 2024',
		lts: false,
		patch: false,
		anchor: 'v1-11-1',
		fromVersion: '1.11.0',
	},
	{
		version: '1.11.0',
		displayVersion: '1.11',
		family: '1.11',
		releaseDate: 'Apr 2 2024',
		lts: false,
		patch: false,
		anchor: 'v1-11-0',
		fromVersion: '1.10.3',
		java17Warning: true,
	},
	{
		version: '1.10.3-HF7',
		displayVersion: '1.10.3-HF7',
		family: '1.10',
		releaseDate: 'Feb 19 2024',
		lts: false,
		patch: false,
		anchor: 'v1-10-3-hf7',
		fromVersion: '1.10.3',
	},
	{
		version: '1.10.3',
		displayVersion: '1.10.3',
		family: '1.10',
		releaseDate: 'Sep 27 2023',
		lts: false,
		patch: false,
		anchor: 'v1-10-3',
		fromVersion: '1.10.2',
	},
	{
		version: '1.10.2',
		displayVersion: '1.10.2',
		family: '1.10',
		releaseDate: 'Aug 18 2023',
		lts: false,
		patch: false,
		anchor: 'v1-10-2',
		fromVersion: '1.10.1',
	},
	{
		version: '1.10.1',
		displayVersion: '1.10.1',
		family: '1.10',
		releaseDate: 'May 10 2023',
		lts: false,
		patch: false,
		anchor: 'v1-10-1',
		fromVersion: '1.10.0',
	},
	{
		version: '1.10.0',
		displayVersion: '1.10',
		family: '1.10',
		releaseDate: 'Feb 27 2023',
		lts: false,
		patch: false,
		anchor: 'v1-10-0',
		fromVersion: '1.9.2',
		// Windows uses a special zip filename for this version
		windowsZipOverride: 'trendz-windows-1.10.0-HF1.zip',
	},
	{
		version: '1.9.2-HF3',
		displayVersion: '1.9.2-HF3',
		family: '1.9',
		releaseDate: 'Jan 10 2023',
		lts: false,
		patch: false,
		anchor: 'v1-9-2-hf3',
		fromVersion: '1.8.0',
	},
	{
		version: '1.8.2',
		displayVersion: '1.8.2',
		family: '1.8',
		releaseDate: 'Dec 13 2021',
		lts: false,
		patch: false,
		anchor: 'v1-8-2',
		// No upgrade script — old site did not include one for this version
		noUpgradeScript: true,
	},
	{
		version: '1.8.1',
		displayVersion: '1.8.1',
		family: '1.8',
		releaseDate: 'Aug 27 2021',
		lts: false,
		patch: false,
		anchor: 'v1-8-1',
		fromVersion: '1.7.0',
	},
];

/** Unique family strings derived from TRENDZ_UPGRADE_VERSIONS (insertion order = newest first) */
export const TRENDZ_UPGRADE_FAMILIES: string[] = [
	...new Set(TRENDZ_UPGRADE_VERSIONS.map((v) => v.family)),
];
