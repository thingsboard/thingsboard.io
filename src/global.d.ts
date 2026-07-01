// Site-wide global type augmentations. No imports/exports → ambient.
// Feature-specific Window globals stay co-located with their owner.

interface Window {
	// Google Tag Manager data layer, bootstrapped by `<GtmHead />`.
	dataLayer?: unknown[];
}
