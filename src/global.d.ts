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

// Global Privacy Control, sent by Brave and Firefox; not in TypeScript's DOM types yet.
interface Navigator {
	readonly globalPrivacyControl?: boolean;
}

// An absent field reads as denied. Analytics and Marketing are absent until the cookie banner is answered, and
// External media in choices saved before that category existed. `ts` is when the choice was saved (epoch seconds),
// `gpc` that Global Privacy Control held Marketing off; older choices lack both.
interface TbConsent extends TbConsentChoices {
	v: number;
	ts?: number;
	gpc?: boolean;
}

interface TbConsentChoices {
	analytics?: boolean;
	marketing?: boolean;
	media?: boolean;
}

type TbConsentCategory = keyof TbConsentChoices;
