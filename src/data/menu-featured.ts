import { CLOUD_SIGNUP } from '@data/cta-destinations';

/**
 * Promo links at the bottom of a menu section; one can be `featured` (shown in the accent color).
 * A link that belongs under one list, such as "All use cases", goes in `SubMenuGroup.more` instead.
 */
export interface MenuPromo {
	icon: string;
	title: string;
	href: string;
	attrs?: Record<string, string>;
	featured?: boolean;
}

/** Keyed by section id (`SubMenu.id`). */
export const MENU_SECTION_PROMOS: Record<string, MenuPromo[]> = {
	'nav-products': [
		{ icon: 'tabler:tag', title: 'Pricing', href: '/pricing/' },
		{ icon: 'tabler:download', title: 'Installation options', href: '/installations/' },
		{
			icon: 'tabler:cloud',
			title: 'Start for free on Cloud',
			href: CLOUD_SIGNUP.href,
			attrs: CLOUD_SIGNUP.attrs,
			featured: true,
		},
	],
	'nav-docs': [{ icon: 'tabler:rocket', title: 'Getting started', href: '/docs/pe/getting-started/', featured: true }],
};
