/** ThingsBoard Cloud's regions and the one this browser last chose on the site. */
// The last choice and the guess live in `scripts/cloud-region.js`, a plain script /pricing/ inlines (`?raw`) to
// pick its region before first paint; inlined as is, so it carries no comments. It skips SSR, which imports this
// module too. Its region ids must match `CLOUD_REGIONS`.
import '@root/scripts/cloud-region.js';

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

export const readLastRegion = (): CloudRegionId | null => window.tbCloudRegion.readLast();

// Without storage the next visit simply has no "Last visited" chip.
export const writeLastRegion = (id: CloudRegionId): void => window.tbCloudRegion.writeLast(id);

/**
 * By hemisphere: UTC−2 and further west (the Americas) goes to North America; the rest, with Greenland
 * and the UTC−1 Atlantic islands (Azores, Cape Verde), to Europe.
 */
export const nearestCloudRegion = (): CloudRegionId => window.tbCloudRegion.nearest();
