// src/pages/open-graph/_shared/product-meta.ts
//
// Maps a docs slug to the slab class, icon key, and edition labels.
// Driven by the existing `getVersionFromSlug` + `Products` enum in path-utils.ts —
// same source of truth as the docs URL routing.

import { Products } from '@models/site.models';
import { getVersionFromSlug } from '@util/path-utils';
import type { SlabClass } from '@root/pages/open-graph/_shared/colors';

export type IconKey =
	| 'cm' | 'p' | 'c' | 'e'
	| 'tbmq' | 'trendz'
	| 'mobile' | 'pe-mobile'
	| 'gateway' | 'license' | 'iot-hub';

export interface DocsProductMeta {
	slabClass: SlabClass;
	iconKey: IconKey;
	/** Big primary label rendered under the icon. */
	primaryLabel: string;
	/** Smaller second-line label (used for "Edge / Professional", "License / Server", etc.). */
	secondaryLabel?: string;
	/** True when the (single-line) primary label needs the smaller `tight` font size. */
	tight?: boolean;
}

const META_BY_PRODUCT: Record<Products, DocsProductMeta> = {
	[Products.CE]:        { slabClass: 'brand',   iconKey: 'cm',        primaryLabel: 'Community' },
	[Products.PE]:        { slabClass: 'pe',      iconKey: 'p',         primaryLabel: 'Professional' },
	[Products.PAAS]:      { slabClass: 'cloud',   iconKey: 'c',         primaryLabel: 'Cloud', secondaryLabel: 'North America' },
	[Products.PAAS_EU]:   { slabClass: 'cloud',   iconKey: 'c',         primaryLabel: 'Cloud', secondaryLabel: 'Europe' },
	[Products.EDGE]:      { slabClass: 'edge',    iconKey: 'e',         primaryLabel: 'Edge' },
	[Products.EDGE_PE]:   { slabClass: 'edge',    iconKey: 'e',         primaryLabel: 'Edge', secondaryLabel: 'Professional' },
	[Products.TBMQ]:      { slabClass: 'tbmq',    iconKey: 'tbmq',      primaryLabel: 'TBMQ' },
	[Products.TBMQ_PE]:   { slabClass: 'tbmq',    iconKey: 'tbmq',      primaryLabel: 'TBMQ', secondaryLabel: 'Professional' },
	[Products.TRENDZ]:    { slabClass: 'trendz',  iconKey: 'trendz',    primaryLabel: 'Trendz' },
	[Products.MOBILE]:    { slabClass: 'mobile',  iconKey: 'mobile',    primaryLabel: 'Mobile' },
	[Products.MOBILE_PE]: { slabClass: 'mobile',  iconKey: 'pe-mobile', primaryLabel: 'Mobile', secondaryLabel: 'Professional' },
	[Products.GW]:        { slabClass: 'gateway', iconKey: 'gateway',   primaryLabel: 'IoT Gateway', tight: true },
	[Products.LICENSE]:   { slabClass: 'license', iconKey: 'license',   primaryLabel: 'License', secondaryLabel: 'Server' },
	[Products.IOT_HUB]:   { slabClass: 'brand',   iconKey: 'iot-hub',   primaryLabel: 'IoT Hub' },
};

/** Resolve docs slug (e.g. 'docs/pe/getting-started/quickstart') to product meta. */
export function getDocsProductMeta(slug: string): DocsProductMeta {
	return META_BY_PRODUCT[getVersionFromSlug(slug)];
}
