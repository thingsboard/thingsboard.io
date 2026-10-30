// Words and links for the site footer and the docs footer. A page the menu also links to takes its name and
// href from the menu, and the build fails when the menu no longer links to it.
import { CAREERS_URL } from '@models/careers';
import { MENU_SECTION_PROMOS } from '@data/menu-featured';
import { allSubmenus, mainNavItems, productsSubmenu } from '@data/navigation';
import { socialNetworks } from '@data/socialNetworks';

interface FooterLink {
	label: string;
	href: string;
}

/** A titled list of links, with an optional link under it, such as "All use cases". */
export interface FooterList {
	title: string;
	links: FooterLink[];
	more?: FooterLink;
}

const MENU_GROUPS = allSubmenus.flatMap((submenu) => submenu.groups);
const MENU_PROMOS = Object.values(MENU_SECTION_PROMOS).flat();

/** The menu's link to `href`, with the menu's label. Throws when the menu has no link to `href`. */
function menuLink(href: string): FooterLink {
	const label =
		mainNavItems.find((item) => item.href === href)?.label ??
		MENU_GROUPS.flatMap((group) => group.items).find((item) => item.href === href)?.heading ??
		MENU_PROMOS.find((promo) => promo.href === href)?.title ??
		MENU_GROUPS.find((group) => group.more?.href === href)?.more?.label;
	if (!label) throw new Error(`[footer-map] the menu has no link to ${href}`);
	return { label, href };
}

/**
 * The page that the "All …" link under the menu group `name` opens, named after the group. Throws when
 * there is none.
 */
function menuGroupPage(name: string): FooterLink {
	const href = MENU_GROUPS.find((group) => group.name === name)?.more?.href;
	if (!href) throw new Error(`[footer-map] the menu has no group "${name}" with a link under it`);
	return { label: name, href };
}

/**
 * The menu group `name`'s link to `href`, named after the group and the link ("SCADA swimming pool").
 * Throws when there is none.
 */
function menuGroupLink(name: string, href: string): FooterLink {
	const item = MENU_GROUPS.find((group) => group.name === name)?.items.find((link) => link.href === href);
	if (!item) throw new Error(`[footer-map] the menu group "${name}" has no link to ${href}`);
	return { label: `${name} ${item.heading.toLowerCase()}`, href };
}

export const FOOTER_TAGLINE =
	'All-in-one IoT platform that gives you everything you need to build, deploy, and scale IoT solutions.';

/** The newsletter form's words and the MailerLite form it posts to. */
export const FOOTER_NEWSLETTER = {
	label: 'Keep up with ThingsBoard',
	hint: 'Product news and IoT know-how.',
	consent: 'By subscribing you agree to receive newsletters from ThingsBoard, Inc.',
	action: 'https://static.mailerlite.com/webforms/submit/r9r9x7',
	thanks: { title: 'Thank you for your interest in ThingsBoard!', text: 'Have a great day!' },
};

/** The Follow line, picked from `socialNetworks` by icon. Each link's class is its icon, an analytics hook. */
export const FOOTER_SOCIAL = ['simple-icons:youtube', 'simple-icons:linkedin', 'simple-icons:github'].map((icon) => {
	const network = socialNetworks.find((entry) => entry.icon === icon);
	if (!network) throw new Error(`[footer-map] no social network has the icon ${icon}`);
	return network;
});

/** The Products panel: the menu's Products groups. Each needs a name, and each product a description. */
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

/** The row under the Products panel. */
export const FOOTER_PLATFORM_LINKS = [pricing, installations, iotHub];

/** The License Portal link at the end of that row, and the caption before it. */
export const FOOTER_LICENSE_PORTAL = { caption: 'Buying or renewing a license?', link: licensePortal };

const gettingStarted = menuLink('/docs/pe/getting-started/');
// The menu names this page "ThingsBoard", which only reads right under its Docs heading.
const documentation: FooterLink = { label: 'Documentation', href: '/docs/pe/' };
const caseStudies = menuGroupPage('Case studies');
const clientsFeedback = menuLink('/clients-feedback/');
const supportPlans = menuLink('/services/');
const blog = menuLink('/blog/');
const careers = menuLink(CAREERS_URL);
const contactUs = menuLink('/contact-us/');

/** The link columns. */
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
		{ title: 'Customers', links: [caseStudies, clientsFeedback] },
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

/** The docs footer's columns, made from the same links. */
export const FOOTER_DOCS_COLUMNS: FooterList[] = [
	{
		title: 'Platform',
		links: [menuLink('/products/thingsboard-pe/'), menuLink('/products/paas/'), pricing, installations, licensePortal],
	},
	{
		title: 'Learn',
		links: [gettingStarted, documentation, menuGroupPage('Use cases'), caseStudies, iotHub, blog],
	},
	{ title: 'Get help', links: [supportPlans, clientsFeedback, contactUs, careers] },
];
