export enum Products {
	CE = 'CE',
	PE = 'PE',
	PAAS = 'PAAS',
	PAAS_EU = 'PAAS_EU',
	EDGE = 'EDGE',
	EDGE_PE = 'EDGE_PE',
	GW = 'GW',
	LICENSE = 'LICENSE',
	IOT_HUB = 'IOT_HUB',
	TRENDZ = 'TRENDZ',
	MOBILE = 'MOBILE',
	MOBILE_PE = 'MOBILE_PE',
	TBMQ = 'TBMQ',
	TBMQ_PE = 'TBMQ_PE',
}

/** Maps each product to its docs URL prefix (the segment after /docs/). */
export const productDocsPrefix: Record<Products, string> = {
	[Products.CE]: '',
	[Products.PE]: 'pe/',
	[Products.PAAS]: 'paas/',
	[Products.PAAS_EU]: 'paas/eu/',
	[Products.EDGE]: 'edge/',
	[Products.EDGE_PE]: 'edge/pe/',
	[Products.GW]: 'iot-gateway/',
	[Products.LICENSE]: 'license-server/',
	[Products.IOT_HUB]: 'iot-hub/',
	[Products.TRENDZ]: 'trendz/',
	[Products.MOBILE]: 'mobile/',
	[Products.MOBILE_PE]: 'mobile/pe/',
	[Products.TBMQ]: 'mqtt-broker/',
	[Products.TBMQ_PE]: 'mqtt-broker/pe/',
};

/** Returns the docs prefix for the given product (e.g. 'pe/' for PE, '' for CE). */
export function getDocsPrefix(product: Products): string {
	return productDocsPrefix[product];
}

/** Builds a full docs link: /docs/{prefix}{path}/ */
export function docsLink(product: Products, path: string): string {
	const normalizedPath = path === '' ? '' : (path.endsWith('/') ? path : path + '/');
	return `/docs/${productDocsPrefix[product]}${normalizedPath}`;
}

/** Builds a full docs link: /docs/{prefix}{path}/ */
export function docLink(title: string, product: Products, path: string): string {
	const normalizedPath = path === '' ? '' : (path.endsWith('/') ? path : path + '/');
	return `<a href="/docs/${productDocsPrefix[product]}${normalizedPath}">${title}</a>`;
}

/**
 * Maps the Community half of each CE/PE product pair to its Professional twin.
 *
 * Community is no longer a forward-looking product: its pages stay published and
 * reachable by direct URL, but are never offered as a destination in site UI.
 *
 * Deliberately excludes PAAS / PAAS_EU (paid hosted editions, not Community) and the
 * single-edition families TRENDZ, GW, LICENSE, IOT_HUB.
 *
 * `canonicalConsolidationMap` in @util/canonical spreads this map and adds PAAS / PAAS_EU,
 * which it folds into PE for SEO only. Keep that direction: those two must not appear here,
 * or the docs selector would hide the Cloud option.
 *
 * Scope, as of this change: the docs selector, the mega menu and the global chrome honour
 * this. Marketing pages do not yet — the homepage, /products/, /installations/ and the
 * pricing FAQs still link into Community, and are handled in the landings/pricing PRs.
 */
export const professionalCounterpart: Readonly<Partial<Record<Products, Products>>> = {
	[Products.CE]: Products.PE,
	[Products.EDGE]: Products.EDGE_PE,
	[Products.TBMQ]: Products.TBMQ_PE,
	[Products.MOBILE]: Products.MOBILE_PE,
};

/** True for the retired Community half of a CE/PE product pair. */
export function isCommunityProduct(product: Products): boolean {
	return professionalCounterpart[product] !== undefined;
}
