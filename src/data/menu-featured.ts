import { CLOUD_SIGNUP } from '@data/cta-destinations';

/** Promo links at the bottom of a menu section. A link under one list goes in `SubMenuGroup.more`. */
interface MenuPromo {
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
		// Keep: this is the main menu's only link to `/installations/`.
		{ icon: 'tabler:download', title: 'Installation options', href: '/installations/' },
		{
			icon: 'tabler:cloud',
			title: 'Start for free on Cloud',
			href: CLOUD_SIGNUP.href,
			// A getter, so each render gets a fresh object (see `CLOUD_SIGNUP`).
			get attrs() {
				return CLOUD_SIGNUP.attrs;
			},
			featured: true,
		},
	],
	'nav-services': [{ icon: 'tabler:headset', title: 'Talk to an expert', href: '/contact-us/', featured: true }],
};
