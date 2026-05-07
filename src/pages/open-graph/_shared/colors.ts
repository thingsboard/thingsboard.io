// src/pages/open-graph/_shared/colors.ts
//
// Three-stop gradient per slab class. Top → middle → bottom (vertical).
// `brand` is the default ThingsBoard core colour, reused by CE docs and by all
// logo-card slabs (blog, marketing, case studies, use cases, device library).

export type SlabClass =
	| 'brand'
	| 'pe'
	| 'cloud'
	| 'edge'
	| 'tbmq'
	| 'trendz'
	| 'mobile'
	| 'gateway'
	| 'license';

export const SLAB_GRADIENTS: Record<SlabClass, [string, string, string]> = {
	brand:   ['#305680', '#264466', '#182a3f'],
	pe:      ['#00695C', '#00574b', '#003c33'],
	cloud:   ['#2A7DEC', '#1f5fb7', '#173f7a'],
	edge:    ['#009688', '#00766a', '#054c44'],
	tbmq:    ['#1F8B4D', '#166e3c', '#0c4525'],
	trendz:  ['#2696F3', '#1572be', '#0d4a7e'],
	mobile:  ['#3a6190', '#2c4c70', '#1c3148'],
	gateway: ['#7a4dc4', '#5d3a99', '#3b246a'],
	license: ['#1F8B4D', '#166e3c', '#0c4525'],
};

/** Build the CSS background string for a slab class. */
export function slabBackground(cls: SlabClass): string {
	const [a, b, c] = SLAB_GRADIENTS[cls];
	return `linear-gradient(180deg, ${a} 0%, ${b} 50%, ${c} 100%)`;
}
