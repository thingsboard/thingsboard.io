// `PLATFORM_VALUES` + `DevicePlatform` live here (not in `content.config.ts`) so
// that client-side scripts can import them without dragging the Zod schema and
// `astro:content` (server-only) into the browser bundle. `content.config.ts`
// imports them from this file.
export const PLATFORM_VALUES = ['CE', 'PE', 'Cloud', 'Cloud EU', 'Edge', 'Edge PE'] as const;
export type DevicePlatform = (typeof PLATFORM_VALUES)[number];

export type ContentVariant = 'ce' | 'pe';

interface PlatformMeta {
	platform: DevicePlatform;
	label: string;
	variant: ContentVariant;
	docsPrefix: string;
	hostLabel: string;
	hostName: string;
	mqttHostName: string;
	coapHostName: string;
	lwm2mHostName: string;
	httpsUrl: string;
	apiHostName: string;
}

const PLATFORMS: Record<DevicePlatform, PlatformMeta> = {
	CE: {
		platform: 'CE',
		label: 'Community Edition',
		variant: 'ce',
		docsPrefix: '',
		hostLabel: 'localhost',
		hostName: 'localhost',
		mqttHostName: 'localhost',
		coapHostName: 'localhost',
		lwm2mHostName: 'localhost',
		httpsUrl: 'https://localhost',
		apiHostName: 'localhost',
	},
	PE: {
		platform: 'PE',
		label: 'Professional Edition',
		variant: 'pe',
		docsPrefix: 'pe/',
		hostLabel: 'YOUR_SERVER_HOSTNAME',
		hostName: 'YOUR_SERVER_HOSTNAME',
		mqttHostName: 'YOUR_SERVER_HOSTNAME',
		coapHostName: 'YOUR_SERVER_HOSTNAME',
		lwm2mHostName: 'YOUR_SERVER_HOSTNAME',
		httpsUrl: 'https://thingsboard.cloud',
		apiHostName: 'YOUR_SERVER_HOSTNAME',
	},
	Cloud: {
		platform: 'Cloud',
		label: 'Cloud (North America)',
		variant: 'pe',
		docsPrefix: 'paas/',
		hostLabel: 'ThingsBoard Cloud',
		hostName: 'thingsboard.cloud',
		mqttHostName: 'mqtt.thingsboard.cloud',
		coapHostName: 'coap.thingsboard.cloud',
		lwm2mHostName: 'lwm2m.thingsboard.cloud',
		httpsUrl: 'https://thingsboard.cloud',
		apiHostName: 'thingsboard.cloud',
	},
	'Cloud EU': {
		platform: 'Cloud EU',
		label: 'Cloud (Europe)',
		variant: 'pe',
		docsPrefix: 'paas/eu/',
		hostLabel: 'ThingsBoard Cloud EU',
		hostName: 'eu.thingsboard.cloud',
		mqttHostName: 'mqtt.eu.thingsboard.cloud',
		coapHostName: 'coap.eu.thingsboard.cloud',
		lwm2mHostName: 'lwm2m.eu.thingsboard.cloud',
		httpsUrl: 'https://eu.thingsboard.cloud',
		apiHostName: 'eu.thingsboard.cloud',
	},
	Edge: {
		platform: 'Edge',
		label: 'Edge',
		variant: 'ce',
		docsPrefix: 'edge/',
		hostLabel: 'localhost',
		hostName: 'localhost',
		mqttHostName: 'localhost',
		coapHostName: 'localhost',
		lwm2mHostName: 'localhost',
		httpsUrl: 'https://localhost',
		apiHostName: 'localhost',
	},
	'Edge PE': {
		platform: 'Edge PE',
		label: 'Edge Professional Edition',
		variant: 'pe',
		docsPrefix: 'pe/edge/',
		hostLabel: 'localhost',
		hostName: 'localhost',
		mqttHostName: 'localhost',
		coapHostName: 'localhost',
		lwm2mHostName: 'localhost',
		httpsUrl: 'https://localhost',
		apiHostName: 'localhost',
	},
};

export const PLATFORM_LIST = PLATFORM_VALUES.map((p) => PLATFORMS[p]);

export function getPlatformMeta(platform: DevicePlatform): PlatformMeta {
	return PLATFORMS[platform];
}

export function getDefaultPlatform(available: DevicePlatform[]): DevicePlatform {
	return available.includes('PE') ? 'PE' : (available[0] ?? 'PE');
}

export function getVariantForPlatform(platform: DevicePlatform): ContentVariant {
	return PLATFORMS[platform].variant;
}

const URL_QUERY_BY_PLATFORM: Record<DevicePlatform, string> = {
	CE: 'ce',
	PE: 'pe',
	Cloud: 'paas',
	'Cloud EU': 'paas-eu',
	Edge: 'edge',
	'Edge PE': 'pe-edge',
};

const PLATFORM_BY_URL_QUERY: Record<string, DevicePlatform> = Object.fromEntries(
	Object.entries(URL_QUERY_BY_PLATFORM).map(([k, v]) => [v, k as DevicePlatform]),
);

export function platformToQueryParam(platform: DevicePlatform): string {
	return URL_QUERY_BY_PLATFORM[platform];
}

export function queryParamToPlatform(value: string | null): DevicePlatform | undefined {
	if (!value) return undefined;
	return PLATFORM_BY_URL_QUERY[value.toLowerCase()];
}

export const TOKEN_NAMES = [
	'HOST',
	'MQTT_HOST',
	'COAP_HOST',
	'LWM2M_HOST',
	'HTTPS_URL',
	'HOST_LABEL',
	'API_HOST',
	'DOCS_PREFIX',
] as const;

export type TokenName = (typeof TOKEN_NAMES)[number];

export function resolvePlatformTokens(platform: DevicePlatform): Record<TokenName, string> {
	const meta = PLATFORMS[platform];
	return {
		HOST: meta.hostName,
		MQTT_HOST: meta.mqttHostName,
		COAP_HOST: meta.coapHostName,
		LWM2M_HOST: meta.lwm2mHostName,
		HTTPS_URL: meta.httpsUrl,
		HOST_LABEL: meta.hostLabel,
		API_HOST: meta.apiHostName,
		DOCS_PREFIX: meta.docsPrefix,
	};
}

// Sentinel strings baked into PE-family MDX bodies by the importer
// (`scripts/migrate-device-library/post-process.ts`). A client-side pass on the
// device page reads `?platform=` and text-replaces each sentinel with the real
// value from the selected platform's `PLATFORMS[platform]` entry — so switching
// Cloud NA ↔ Cloud EU swaps every hostname/code snippet on the page.
//
// DOCS_PREFIX is intentionally excluded: my importer bakes doc-link prefixes
// per-variant already, and alt-prefixes (paas/ paas/eu/) don't yet have their
// own docs pages to link to.
export const PE_SENTINELS: Record<Exclude<TokenName, 'DOCS_PREFIX'>, string> = {
	HOST: 'YOUR_TB_HOST',
	MQTT_HOST: 'YOUR_TB_MQTT_HOST',
	COAP_HOST: 'YOUR_TB_COAP_HOST',
	LWM2M_HOST: 'YOUR_TB_LWM2M_HOST',
	HTTPS_URL: 'YOUR_TB_HTTPS_URL',
	HOST_LABEL: 'YOUR_TB_HOST_LABEL',
	API_HOST: 'YOUR_TB_API_HOST',
};

/**
 * Maps each sentinel string found in PE-family MDX bodies to the actual value
 * for the given platform. Used by the client-side swap script to rewrite text
 * nodes (and Expressive Code `data-code` attrs) when the user lands on a page
 * with `?platform=paas`, `?platform=paas-eu`, etc.
 */
export function resolveSentinelMap(platform: DevicePlatform): Record<string, string> {
	const meta = PLATFORMS[platform];
	return {
		[PE_SENTINELS.HOST]: meta.hostName,
		[PE_SENTINELS.MQTT_HOST]: meta.mqttHostName,
		[PE_SENTINELS.COAP_HOST]: meta.coapHostName,
		[PE_SENTINELS.LWM2M_HOST]: meta.lwm2mHostName,
		[PE_SENTINELS.HTTPS_URL]: meta.httpsUrl,
		[PE_SENTINELS.HOST_LABEL]: meta.hostLabel,
		[PE_SENTINELS.API_HOST]: meta.apiHostName,
	};
}
