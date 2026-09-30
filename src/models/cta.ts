import type { CloudFlow } from '@util/cloud-regions';

/** A call to action rendered by `CtaButton`. */
export interface Cta {
	text: string;
	href: string;
	icon: string;
	variant: 'brand' | 'outline';
	ariaLabel?: string;
	target?: string;
	cloudAuth?: CloudFlow;
}
