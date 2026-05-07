// `PLATFORM_VALUES` + `DevicePlatform` live here (not in `content.config.ts`) so
// that client-side scripts can import them without dragging the Zod schema and
// `astro:content` (server-only) into the browser bundle. `content.config.ts`
// imports them from this file.
export const PLATFORM_VALUES = ['ThingsBoard', 'Edge'] as const;
export type DevicePlatform = (typeof PLATFORM_VALUES)[number];

interface PlatformMeta {
	platform: DevicePlatform;
	label: string;
}

const PLATFORMS: Record<DevicePlatform, PlatformMeta> = {
	ThingsBoard: { platform: 'ThingsBoard', label: 'ThingsBoard' },
	Edge: { platform: 'Edge', label: 'Edge' },
};

export const PLATFORM_LIST = PLATFORM_VALUES.map((p) => PLATFORMS[p]);

export function getPlatformMeta(platform: DevicePlatform): PlatformMeta {
	return PLATFORMS[platform];
}

const URL_QUERY_BY_PLATFORM: Record<DevicePlatform, string> = {
	ThingsBoard: 'tb',
	Edge: 'edge',
};

// New short codes (`tb`, `edge`) PLUS legacy aliases. Old `?platform=ce|pe|paas|
// paas-eu|pe-edge` URLs in the wild — partner pages, blog posts, bookmarks —
// keep resolving so inbound traffic still pre-selects a sensible filter chip.
const PLATFORM_BY_URL_QUERY: Record<string, DevicePlatform> = {
	tb: 'ThingsBoard',
	edge: 'Edge',
	// Legacy aliases — collapse to the two new buckets.
	ce: 'ThingsBoard',
	pe: 'ThingsBoard',
	paas: 'ThingsBoard',
	'paas-eu': 'ThingsBoard',
	'pe-edge': 'Edge',
};

export function platformToQueryParam(platform: DevicePlatform): string {
	return URL_QUERY_BY_PLATFORM[platform];
}

export function queryParamToPlatform(value: string | null | undefined): DevicePlatform | undefined {
	if (!value) return undefined;
	return PLATFORM_BY_URL_QUERY[value.toLowerCase()];
}
