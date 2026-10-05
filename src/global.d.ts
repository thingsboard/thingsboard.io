// Site-wide global type augmentations. No imports/exports → ambient.
// Feature-specific Window globals stay co-located with their owner.

interface Window {
	// Google Tag Manager data layer, bootstrapped by `<GtmHead />`.
	dataLayer?: unknown[];
	// `gtag` shim, also defined by `<GtmHead />` on every page.
	gtag: (...args: unknown[]) => void;
	// Stored cookie-consent choice, parsed by `<GtmHead />`, updated by `<CookieConsent />`.
	tbConsent: TbConsent | null;
}

interface TbConsent {
	v: number;
	analytics: boolean;
	marketing: boolean;
}
