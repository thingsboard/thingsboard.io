/** ThingsBoard Cloud's regions and the one this browser last chose on the site. */
// The notes must match the Cloud FAQ, which names no country or datacentre.
// `gtm` is part of the click ids the GTM funnel keys on.
export const CLOUD_REGIONS = [
	{
		id: 'us',
		name: 'North America',
		note: 'Data stored in North America',
		host: 'thingsboard.cloud',
		gtm: 'NorthAmerica',
		hue: 'var(--color-brand)',
	},
	{
		id: 'eu',
		name: 'Europe',
		note: 'Data stored in the European Union',
		host: 'eu.thingsboard.cloud',
		gtm: 'Europe',
		hue: '#0e8aa8',
	},
] as const;

export type CloudRegion = (typeof CLOUD_REGIONS)[number];

export type CloudRegionId = CloudRegion['id'];

export type CloudFlow = 'signup' | 'signin';

export const cloudRegionHref = (region: CloudRegion, flow: CloudFlow) =>
	`https://${region.host}${flow === 'signin' ? '/login' : '/signup'}`;

/** Sign-up ids must match `/installations/choose-region/`'s, so every sign-up click lands in one funnel. */
export const cloudRegionGtmId = (region: CloudRegion, flow: CloudFlow) =>
	`${flow === 'signin' ? 'SignIn' : 'TryItNow'}_Cloud_${region.gtm}`;

const LAST_REGION_KEY = 'tb.site.lastSigninRegion';

export function readLastRegion(): CloudRegionId | null {
	try {
		const value = localStorage.getItem(LAST_REGION_KEY);
		return CLOUD_REGIONS.some((r) => r.id === value) ? (value as CloudRegionId) : null;
	} catch {
		return null;
	}
}

export function writeLastRegion(value: CloudRegionId): void {
	try {
		localStorage.setItem(LAST_REGION_KEY, value);
	} catch {
		// No storage: the next visit simply has no "Last visited" chip.
	}
}

const GREENLAND = /^America\/(Nuuk|Godthab|Scoresbysund|Danmarkshavn|Thule)$/;

/**
 * By hemisphere: UTC−2 and further west (the Americas) goes to North America; the rest, with Greenland
 * and the UTC−1 Atlantic islands (Azores, Cape Verde), to Europe.
 */
export function nearestCloudRegion(): CloudRegionId {
	const west = new Date().getTimezoneOffset() > 60;
	return west && !GREENLAND.test(Intl.DateTimeFormat().resolvedOptions().timeZone) ? 'us' : 'eu';
}
