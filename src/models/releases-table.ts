export interface PatchEntry {
	/** Patch version tag, e.g. "v4.3.0.1" */
	version: string;
	/** Release date exactly as it appears in the heading, e.g. "Feb 3, 2026" */
	date: string;
}

export interface ReleaseFamily {
	/** Major.minor family string, e.g. "4.3" */
	family: string;
	/** True = LTS release (18-month support), false = Standard (6-month) */
	lts: boolean;
	/** Date of the first release in this family, e.g. "Jan 20 2026" */
	releaseDate: string;
	/** Latest patch version tag, e.g. "v4.3.0.1" */
	latestPatch: string;
	/** Date of the latest CE patch release */
	latestPatchDate: string;
	/** PE-specific latest patch date (only if different from CE) */
	latestPatchDatePe?: string;
	/** CE release highlights (short feature description) */
	highlightsCe: string;
	/** PE release highlights override — only set when different from CE */
	highlightsPe?: string;
	/** All patches in this family, newest first — dates match the heading format */
	patches: PatchEntry[];
}

/** LTS releases are supported for 18 months from the first release date */
export const EOL_MONTHS_LTS = 18;
/** Standard releases are supported for 6 months from the first release date */
export const EOL_MONTHS_STANDARD = 6;

/** "4.3" → "v4-3-x" */
export function familySlug(family: string): string {
	return `v${family.replace(/\./g, '-')}-x`;
}

/**
 * Compute a GFM-compatible heading anchor slug from a heading text string.
 * e.g. "v4.3.0.1 (Feb 3, 2026)" → "v4301-feb-3-2026"
 */
export function patchSlug(version: string, date: string): string {
	return `${version} (${date})`
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-');
}

export const RELEASE_FAMILIES: ReleaseFamily[] = [
	{
		family: '4.3',
		lts: true,
		releaseDate: 'Jan 20 2026',
		latestPatch: 'v4.3.1.2',
		latestPatchDate: 'May 28 2026',
		highlightsCe: 'Alarm Rules 2.0 & new Calculated Fields',
		patches: [
			{ version: 'v4.3.1.2', date: 'May 28, 2026' },
			{ version: 'v4.3.1.1', date: 'Mar 31, 2026' },
			{ version: 'v4.3.1', date: 'Mar 10, 2026' },
			{ version: 'v4.3.0.1', date: 'Feb 3, 2026' },
			{ version: 'v4.3.0', date: 'Jan 20, 2026' },
		],
	},
	{
		family: '4.2',
		lts: true,
		releaseDate: 'Aug 15 2025',
		latestPatch: 'v4.2.2.2',
		latestPatchDate: 'May 28 2026',
		highlightsCe: 'AI Rule Node & Security Fixes',
		highlightsPe: 'Reporting 2.0, Secrets Storage, AI Rule Node',
		patches: [
			{ version: 'v4.2.2.2', date: 'May 28, 2026' },
			{ version: 'v4.2.2.1', date: 'Mar 31, 2026' },
			{ version: 'v4.2.2', date: 'Mar 10, 2026' },
			{ version: 'v4.2.1.2', date: 'Feb 3, 2026' },
			{ version: 'v4.2.1.1', date: 'Dec 24, 2025' },
			{ version: 'v4.2.0', date: 'Aug 15, 2025' },
		],
	},
	{
		family: '4.1',
		lts: false,
		releaseDate: 'Jul 3 2025',
		latestPatch: 'v4.1.0',
		latestPatchDate: 'Jul 3 2025',
		highlightsCe: 'Cassandra 5.0, ValKey, Units Conversion',
		highlightsPe: 'Units Conversion, CF Reprocessing',
		patches: [{ version: 'v4.1.0', date: 'Jul 3, 2025' }],
	},
	{
		family: '4.0',
		lts: false,
		releaseDate: 'Apr 15 2025',
		latestPatch: 'v4.0.2',
		latestPatchDate: 'Jul 3 2025',
		highlightsCe: 'Calculated Fields, EDQS & New Maps',
		patches: [
			{ version: 'v4.0.2', date: 'Jul 3, 2025' },
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
		highlightsCe: 'Mobile App Center & JS Modules',
		patches: [
			{ version: 'v3.9.1', date: 'Feb 19, 2025' },
			{ version: 'v3.9.0', date: 'Dec 31, 2024' },
		],
	},
	{
		family: '3.8',
		lts: false,
		releaseDate: 'Oct 3 2024',
		latestPatch: 'v3.8.1',
		latestPatchDate: 'Oct 15 2024',
		highlightsCe: 'SCADA, Dashboard Layouts, Timewindow redesign',
		highlightsPe: 'SCADA, Dashboard Layouts, Converters Library',
		patches: [
			{ version: 'v3.8.1', date: 'Oct 15, 2024' },
			{ version: 'v3.8.0', date: 'Oct 3, 2024' },
		],
	},
	{
		family: '3.7',
		lts: false,
		releaseDate: 'Jun 17 2024',
		latestPatch: 'v3.7.0',
		latestPatchDate: 'Jun 17 2024',
		highlightsCe: 'Java 17, New Charts widgets',
		highlightsPe: 'Java 17, New Charts, Advanced Localization',
		patches: [{ version: 'v3.7.0', date: 'Jun 17, 2024' }],
	},
	{
		family: '3.6',
		lts: false,
		releaseDate: 'Sep 21 2023',
		latestPatch: 'v3.6.4',
		latestPatchDate: 'Apr 11 2024',
		highlightsCe: 'Isolated Queues, New Card Widgets',
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
		latestPatch: 'v3.5.1',
		latestPatchDate: 'May 31 2023',
		highlightsCe: 'Notification System & Alarm Assign + Comments',
		patches: [
			{ version: 'v3.5.1', date: 'May 31, 2023' },
			{ version: 'v3.5.0', date: 'May 9, 2023' },
		],
	},
	{
		family: '3.4',
		lts: false,
		releaseDate: 'Jul 19 2022',
		latestPatch: 'v3.4.4',
		latestPatchDate: 'Feb 7 2023',
		highlightsCe: 'Git VC, 2FA, Queues Configuration',
		highlightsPe: 'Git VC, 2FA, Integration Executor',
		patches: [
			{ version: 'v3.4.4', date: 'February 7, 2023' },
			{ version: 'v3.4.3', date: 'December 21, 2022' },
			{ version: 'v3.4.2', date: 'December 1, 2022' },
			{ version: 'v3.4.1', date: 'August 18, 2022' },
			{ version: 'v3.4', date: 'July 19, 2022' },
		],
	},
	{
		family: '3.3',
		lts: false,
		releaseDate: 'Aug 13 2021',
		latestPatch: 'v3.3.4.1',
		latestPatchDate: 'Mar 22 2022',
		latestPatchDatePe: 'Mar 18 2022',
		highlightsCe: 'Edge, FOTA, LwM2M, SNMP',
		patches: [
			{ version: 'v3.3.4.1', date: 'March 22, 2022' },
			{ version: 'v3.3.4', date: 'March 11, 2022' },
			{ version: 'v3.3.3', date: 'January 27, 2022' },
			{ version: 'v3.3.2', date: 'November 11, 2021' },
			{ version: 'v3.3.1', date: 'September 3, 2021' },
			{ version: 'v3.3', date: 'August 13, 2021' },
		],
	},
	{
		family: '3.2',
		lts: false,
		releaseDate: 'Dec 1 2020',
		latestPatch: 'v3.2.2',
		latestPatchDate: 'Mar 24 2021',
		highlightsCe: 'Tenant & Device Profiles, OAuth2',
		patches: [
			{ version: 'v3.2.2', date: 'March 24, 2021' },
			{ version: 'v3.2.1', date: 'January 26, 2021' },
			{ version: 'v3.2', date: 'December 1, 2020' },
		],
	},
	{
		family: '3.1',
		lts: false,
		releaseDate: 'Aug 12 2020',
		latestPatch: 'v3.1.1',
		latestPatchDate: 'Aug 28 2020',
		highlightsCe: 'Filters & Alarm Widget',
		patches: [
			{ version: 'v3.1.1', date: 'August 28, 2020' },
			{ version: 'v3.1', date: 'August 12, 2020' },
		],
	},
	{
		family: '3.0',
		lts: false,
		releaseDate: 'Jun 1 2020',
		latestPatch: 'v3.0.1',
		latestPatchDate: 'Jun 9 2020',
		highlightsCe: 'Angular 9, SQL for Entities',
		patches: [
			{ version: 'v3.0.1', date: 'June 9, 2020' },
			{ version: 'v3.0', date: 'June 1, 2020' },
		],
	},
];
