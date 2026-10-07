// Site-wide global type augmentations. No imports/exports → ambient.
// Feature-specific Window globals stay co-located with their owner.

interface Window {
	// Google Tag Manager data layer, bootstrapped by `<GtmHead />`.
	dataLayer?: unknown[];
	// `gtag` shim, also defined by `<GtmHead />` on every page.
	gtag: (...args: unknown[]) => void;
	// Loads GTM once the visitor has granted Analytics or Marketing; no-op otherwise. Defined by `<GtmHead />`.
	tbLoadGtm: () => void;
	// Stored cookie-consent choice, parsed by `<GtmHead />`, updated by `<CookieConsent />`.
	tbConsent: TbConsent | null;
	// Cloud region memory and guess, defined by `scripts/cloud-region.js`; use it through `@util/cloud-regions`.
	tbCloudRegion: TbCloudRegion;
}

type CloudRegionId = import('@util/cloud-regions').CloudRegionId;

interface TbCloudRegion {
	readLast(): CloudRegionId | null;
	writeLast(id: CloudRegionId): void;
	nearest(): CloudRegionId;
}

interface TbConsent {
	v: number;
	analytics: boolean;
	marketing: boolean;
	media?: boolean;
}
