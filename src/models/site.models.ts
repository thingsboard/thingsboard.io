export enum Products {
	CE = 'CE',
	PE = 'PE',
	PAAS = 'PAAS',
	PAAS_EU = 'PAAS_EU',
	EDGE = 'EDGE',
	EDGE_PE = 'EDGE_PE',
	GW = 'GW',
	LICENSE = 'LICENSE',
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
	const normalizedPath = path.endsWith('/') ? path : path + '/';
	return `/docs/${productDocsPrefix[product]}${normalizedPath}`;
}

/** Builds a full docs link: /docs/{prefix}{path}/ */
export function docLink(title: string, product: Products, path: string): string {
	const normalizedPath = path.endsWith('/') ? path : path + '/';
	return `<a href="/docs/${productDocsPrefix[product]}${normalizedPath}">${title}</a>`;
}
