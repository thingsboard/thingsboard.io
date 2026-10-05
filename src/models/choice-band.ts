/** Data shape for `ChoiceBand.astro`. */

import type { Cta } from '@models/cta';

export interface ChoiceOption {
	icon: string;
	name: string;
	/** A phrase, e.g. "Free" or "From $4,999". */
	price: string;
	priceNote: string;
	summary: string;
	points: string[];
	cta: Cta;
	plansHref: string;
	/** Overrides the link's default "See plans" — for an option that has one plan, not several. */
	plansLabel?: string;
}

/** The line under the cards: `lead`, then a link reading `text`, then `tail`. */
export interface ChoiceNote {
	lead: string;
	text: string;
	tail?: string;
	href: string;
	icon: string;
}
