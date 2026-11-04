// Plan data for the On-premises subscription (PAYG) calculator. The modal's markup
// (`TbPaygCalculator.astro`) renders the slider from it at build time, and the lazy
// calculator script (`calc-tb-payg.ts`) prices from it, so the two can't drift apart.

// Paid tiers only. The BUSL repositioning replaced Maker/Prototype with a free
// plan (see @data/pricing/tb-self-managed), and the free tier deliberately does
// NOT appear here: the calculator prices add-on-laden configurations, and the
// free plan's add-on/instance policy is undefined — every recommendation
// stays purchasable through the license portal CTA.
export const SM_PLANS = {
	mobileApp: 99, mobileAppSetup: 1000,
	plans: [
		{ name: 'Pilot', price: 99, includedDevices: 100, includedProdInstances: 1, extraProdInstancePrice: 100, edgeMonthPrice: 19, edgeInstancesIncluded: 1, extraEdgePrice: 39, trendzMonthPrice: 29, wl: true, productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a', planId: '87f3b1e0-f5eb-11f0-8e58-abbac8d0a38a' },
		{ name: 'Startup', price: 299, includedDevices: 500, includedProdInstances: 2, extraProdInstancePrice: 100, edgeMonthPrice: 49, edgeInstancesIncluded: 2, extraEdgePrice: 39, trendzMonthPrice: 89, wl: true, productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a', planId: 'b8ad2500-f5eb-11f0-8e58-abbac8d0a38a' },
		{ name: 'Business', price: 499, includedDevices: 1000, extraDevicePrice: 0.1, includedProdInstances: 3, extraProdInstancePrice: 100, edgeMonthPrice: 89, edgeInstancesIncluded: 3, extraEdgePrice: 39, trendzMonthPrice: 149, trendzExtraDevicePrice: 0.03, wl: true, productId: 'b5a35ce0-f5ea-11f0-8e58-abbac8d0a38a', planId: 'f4b90050-f5eb-11f0-8e58-abbac8d0a38a' },
	],
};

// Slider detents = each subscription tier's included-device count. The discrete
// stops are the plans; past the last one the slider is a continuous ramp up to
// SM_MAX, which takes the last slider unit (so the slider runs 0..SM_SLIDER_MAX).
export const SM_THRESHOLDS = SM_PLANS.plans.map((p) => p.includedDevices);
export const SM_LAST_TICK = SM_THRESHOLDS.length - 1;
export const SM_RAMP_START = SM_THRESHOLDS[SM_LAST_TICK];
export const SM_SLIDER_MAX = SM_LAST_TICK + 1;
export const SM_MAX = 150000;
export const SM_ENTERPRISE = 50000;
