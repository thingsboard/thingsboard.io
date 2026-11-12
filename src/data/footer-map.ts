// Copy and links for both footers. A page the menu also links to takes its name from the menu, and the build
// fails when the menu no longer links to it.
import { CAREERS_URL } from '@models/careers';
import { MENU_SECTION_PROMOS } from '@data/menu-featured';
import { allSubmenus, mainNavItems, productsSubmenu } from '@data/navigation';
import { socialNetworks } from '@data/socialNetworks';

interface FooterLink {
	label: string;
	href: string;
}

export interface FooterList {
	title: string;
	links: FooterLink[];
	more?: FooterLink;
}

const MENU_GROUPS = allSubmenus.flatMap((submenu) => submenu.groups);
const MENU_PROMOS = Object.values(MENU_SECTION_PROMOS).flat();

function menuLink(href: string): FooterLink {
	const label =
		mainNavItems.find((item) => item.href === href)?.label ??
		MENU_GROUPS.flatMap((group) => group.items).find((item) => item.href === href)?.heading ??
		MENU_PROMOS.find((promo) => promo.href === href)?.title ??
		MENU_GROUPS.find((group) => group.more?.href === href)?.more?.label;
	if (!label) throw new Error(`[footer-map] the menu has no link to ${href}`);
	return { label, href };
}

/** The page the "All …" link under menu group `name` opens, labelled with the group's name. */
function menuGroupPage(name: string): FooterLink {
	const href = MENU_GROUPS.find((group) => group.name === name)?.more?.href;
	if (!href) throw new Error(`[footer-map] the menu has no group "${name}" with a link under it`);
	return { label: name, href };
}

/** Menu group `name`'s link to `href`, labelled with both ("SCADA swimming pool"). */
function menuGroupLink(name: string, href: string): FooterLink {
	const item = MENU_GROUPS.find((group) => group.name === name)?.items.find((link) => link.href === href);
	if (!item) throw new Error(`[footer-map] the menu group "${name}" has no link to ${href}`);
	return { label: `${name} ${item.heading.toLowerCase()}`, href };
}

export const FOOTER_TAGLINE =
	'All-in-one IoT platform that gives you everything you need to build, deploy, and scale IoT solutions.';

export const FOOTER_NEWSLETTER = {
	label: 'Keep up with ThingsBoard',
	hint: 'Product news and IoT know-how.',
	consent: 'By subscribing you agree to receive newsletters from ThingsBoard, Inc.',
	action: 'https://static.mailerlite.com/webforms/submit/r9r9x7',
	thanks: { title: 'Thank you for your interest in ThingsBoard!', text: 'Have a great day!' },
};

/** Each Follow link's class is its icon, an analytics hook. */
export const FOOTER_SOCIAL = ['simple-icons:youtube', 'simple-icons:linkedin', 'simple-icons:github'].map((icon) => {
	const network = socialNetworks.find((entry) => entry.icon === icon);
	if (!network) throw new Error(`[footer-map] no social network has the icon ${icon}`);
	return network;
});

export const FOOTER_PRODUCT_GROUPS = productsSubmenu.groups;
for (const { name, items } of FOOTER_PRODUCT_GROUPS) {
	if (!name) throw new Error('[footer-map] a Products group in the menu has no name');
	for (const { heading, description } of items) {
		if (!description) throw new Error(`[footer-map] "${heading}" in the menu's Products has no description`);
	}
}

const pricing = menuLink('/pricing/');
const installations = menuLink('/installations/');
const iotHub = menuLink('/iot-hub/');
const licensePortal: FooterLink = { label: 'License Portal', href: 'https://license.thingsboard.io/' };

export const FOOTER_PLATFORM_LINKS = [pricing, installations, iotHub];

export const FOOTER_LICENSE_PORTAL = { caption: 'Buying or renewing a license?', link: licensePortal };

// The menu's Docs section does not link here: the page is the on-premises one.
const gettingStarted: FooterLink = { label: 'Getting started', href: '/docs/pe/getting-started/' };
// The menu names this page "ThingsBoard", which only reads right under its Docs heading.
const documentation: FooterLink = { label: 'Documentation', href: '/docs/pe/' };
// The menu calls this link "All use cases", which only reads right under its list.
const useCases: FooterLink = { label: 'Use cases', href: '/use-cases/' };
const caseStudies = menuGroupPage('Case studies');
const clientsFeedback = menuLink('/clients-feedback/');
const supportPlans = menuLink('/services/');
const blog = menuLink('/blog/');
const careers = menuLink(CAREERS_URL);
const contactUs = menuLink('/contact-us/');

export const FOOTER_COLUMNS: FooterList[][] = [
	[
		{
			title: 'Use cases',
			links: [
				...[
					'/use-cases/smart-energy/',
					'/use-cases/environment-monitoring/',
					'/use-cases/smart-farming/',
					'/use-cases/site-fleet-tracking/',
					'/use-cases/smart-metering/',
				].map(menuLink),
				menuGroupLink('SCADA', '/use-cases/scada/'),
			],
			more: menuLink('/use-cases/'),
		},
	],
	[
		{
			title: 'Services',
			links: [menuLink('/services/development-services/'), supportPlans, menuLink('/services/trainings/')],
		},
		{ title: 'Clients', links: [caseStudies, clientsFeedback] },
	],
	[
		{
			title: 'Docs',
			links: [
				gettingStarted,
				{ label: 'Connect devices', href: '/docs/pe/connect-iot-devices/' },
				{ label: 'REST API', href: '/docs/pe/reference/rest-api/' },
			],
			more: documentation,
		},
	],
	[
		{
			title: 'Company',
			links: [menuLink('/company/'), menuLink('/trust-center/'), blog, menuLink('/mediakit/'), careers],
			more: contactUs,
		},
	],
];

export const FOOTER_DOCS_COLUMNS: FooterList[] = [
	{
		title: 'Platform',
		links: [menuLink('/products/thingsboard-pe/'), menuLink('/products/paas/'), pricing, installations, licensePortal],
	},
	{
		title: 'Learn',
		links: [gettingStarted, documentation, useCases, caseStudies, iotHub, blog],
	},
	{ title: 'Get help', links: [supportPlans, clientsFeedback, contactUs, careers] },
];
