export interface TrendzPatchEntry {
	/** Patch version tag, e.g. "v1.15.0.4" */
	version: string;
	/** Release date exactly as it appears in the heading, e.g. "Feb 9, 2026" */
	date: string;
}

export interface TrendzReleaseFamily {
	/** Major.minor family string, e.g. "1.15" */
	family: string;
	/** True = LTS release (18-month support), false = Standard (6-month) */
	lts: boolean;
	/** Date of the first release in this family, e.g. "Jan 20 2026" */
	releaseDate: string;
	/** Latest patch version tag, e.g. "v1.15.0.4" */
	latestPatch: string;
	/** Date of the latest patch release */
	latestPatchDate: string;
	/** Short feature highlights */
	highlights: string;
	/** Minimum ThingsBoard version required for this Trendz release, e.g. "4.3" */
	tbVersion: string;
	/** All patches in this family, newest first */
	patches: TrendzPatchEntry[];
}

/** LTS releases are supported for 18 months from the first release date */
export const EOL_MONTHS_LTS = 18;
/** Standard releases are supported for 6 months from the first release date */
export const EOL_MONTHS_STANDARD = 6;

/** "1.15" → "v1-15-x" */
export function familySlug(family: string): string {
	return `v${family.replace(/\./g, '-')}-x`;
}

/**
 * Compute a GFM-compatible heading anchor slug from a heading text string.
 * e.g. "v1.15.0.4 (Feb 9, 2026)" → "v11504-feb-9-2026"
 */
export function patchSlug(version: string, date: string): string {
	return `${version} (${date})`
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-');
}

/** Trendz release families, newest first */
export const TRENDZ_RELEASE_FAMILIES: TrendzReleaseFamily[] = [
	{
		family: '1.15',
		lts: true,
		releaseDate: 'Jan 20 2026',
		latestPatch: 'v1.15.2.1',
		latestPatchDate: 'Jun 24 2026',
		highlights: 'Bidirectional TB Sync, Anomaly Wizard',
		tbVersion: '4.3',
		patches: [
			{ version: 'v1.15.2.1', date: 'Jun 24, 2026' },
			{ version: 'v1.15.2', date: 'May 15, 2026' },
			{ version: 'v1.15.1', date: 'Apr 15, 2026' },
			{ version: 'v1.15.0.5', date: 'Feb 26, 2026' },
			{ version: 'v1.15.0.4', date: 'Feb 9, 2026' },
			{ version: 'v1.15.0', date: 'Jan 20, 2026' },
		],
	},
	{
		family: '1.14',
		lts: false,
		releaseDate: 'Nov 6 2025',
		latestPatch: 'v1.14.0',
		latestPatchDate: 'Nov 6 2025',
		highlights: 'Metric Explorer, AI Cards',
		tbVersion: '4.2',
		patches: [{ version: 'v1.14.0', date: 'Nov 6, 2025' }],
	},
	{
		family: '1.13',
		lts: false,
		releaseDate: 'Mar 10 2025',
		latestPatch: 'v1.13.2',
		latestPatchDate: 'Jun 27 2025',
		highlights: 'AI Assistant, Anomaly Alerts',
		tbVersion: '4.0',
		patches: [
			{ version: 'v1.13.2', date: 'Jun 27, 2025' },
			{ version: 'v1.13.1', date: 'May 2, 2025' },
			{ version: 'v1.13.0', date: 'Mar 10, 2025' },
		],
	},
	{
		family: '1.12',
		lts: false,
		releaseDate: 'Dec 31 2024',
		latestPatch: 'v1.12.0',
		latestPatchDate: 'Dec 31 2024',
		highlights: 'Prediction Models, 2FA',
		tbVersion: '3.9',
		patches: [{ version: 'v1.12.0', date: 'Dec 31, 2024' }],
	},
	{
		family: '1.11',
		lts: false,
		releaseDate: 'Apr 2 2024',
		latestPatch: 'v1.11.2',
		latestPatchDate: 'Nov 12 2024',
		highlights: 'Calculation Fields, Scheduled Tasks',
		tbVersion: '3.8',
		patches: [
			{ version: 'v1.11.2', date: 'Nov 12, 2024' },
			{ version: 'v1.11.1', date: 'Nov 4, 2024' },
			{ version: 'v1.11.0', date: 'Apr 2, 2024' },
		],
	},
	{
		family: '1.10',
		lts: false,
		releaseDate: 'Feb 27 2023',
		latestPatch: 'v1.10.3-HF7',
		latestPatchDate: 'Feb 19 2024',
		highlights: 'New UI, Dark Mode, Forecasting',
		tbVersion: '3.5',
		patches: [
			{ version: 'v1.10.3-HF7', date: 'Feb 19, 2024' },
			{ version: 'v1.10.3', date: 'Sep 27, 2023' },
			{ version: 'v1.10.2', date: 'Aug 18, 2023' },
			{ version: 'v1.10.1', date: 'May 10, 2023' },
			{ version: 'v1.10.0', date: 'Feb 27, 2023' },
		],
	},
	{
		family: '1.9',
		lts: false,
		releaseDate: 'Feb 2 2022',
		latestPatch: 'v1.9.2-HF2',
		latestPatchDate: 'Jan 10 2023',
		highlights: 'View Templates, Alarm Reports',
		tbVersion: '3.4',
		patches: [
			{ version: 'v1.9.2-HF2', date: 'Jan 10, 2023' },
			{ version: 'v1.9.2', date: 'Nov 30, 2022' },
			{ version: 'v1.9.1', date: 'Jun 28, 2022' },
			{ version: 'v1.9.0', date: 'Feb 2, 2022' },
		],
	},
	{
		family: '1.8',
		lts: false,
		releaseDate: 'Aug 27 2021',
		latestPatch: 'v1.8.2',
		latestPatchDate: 'Dec 13 2021',
		highlights: 'Persistent Cache, TB Widget Bundle',
		tbVersion: '3.3',
		patches: [
			{ version: 'v1.8.2', date: 'Dec 13, 2021' },
			{ version: 'v1.8.0', date: 'Aug 27, 2021' },
		],
	},
];
