import { TBMQ_PE_DOCS_URL, TBMQ_SITE_URL } from '@models/tbmq';
import { CAREERS_URL } from '@models/careers';
import { caseStudyBySlug } from '@data/case-studies';
import type { MenuBadgeKey } from '@data/product-badges';

export interface NavItem {
	label: string;
	href?: string;
	submenuId?: string;
	/**
	 * DOM id on the rendered link, for analytics hooks (`Menu_Pricing`). The link also shows in the menu
	 * sheet; `SiteMenu` keeps the id on whichever copy shows.
	 */
	id?: string;
	/** Extra class on the rendered link, e.g. `gtm_button` for GTM tracking. */
	linkClass?: string;
	items?: SubMenuItem[];
}

export interface SubMenuItem {
	href: string;
	icon?: string;
	/** A product badge (`data/product-badges`), shown instead of `icon`. Used in Products and Docs. */
	badge?: MenuBadgeKey;
	heading: string;
	/** A second line under the heading, where it helps tell links apart: the products and their docs. */
	description?: string;
	linkClass?: string;
	/** A customer logo shown instead of the heading, which becomes its alt text. */
	logo?: string;
	/** The logo's height in px. */
	logoHeight?: number;
}

export interface SubMenuGroup {
	/** Column heading, shown above the first column only. Omit for an unlabelled group. */
	name?: string;
	/** Items per column (a list takes at most 3 columns). Omit for one column. */
	perColumn?: number;
	items: SubMenuItem[];
	/** A link under the list, in the accent color, such as "All use cases". */
	more?: { label: string; href: string };
}

export interface SubMenu {
	id: string;
	/** Icon size in px: 32 where the icons are product badges (Products, Docs), otherwise 24 (the default). */
	iconSize?: 24 | 32;
	groups: SubMenuGroup[];
	/** Other paths (and the pages below them) that mark this section as current; see `inSection`. */
	owns?: string[];
}

// Main navigation items
export const mainNavItems: NavItem[] = [
	{ label: 'Products', submenuId: 'nav-products' },
	{ label: 'Solutions', submenuId: 'nav-solutions' },
	{ label: 'Services', submenuId: 'nav-services' },
	{ label: 'Docs', submenuId: 'nav-docs' },
	{ label: 'Company', submenuId: 'nav-company' },
	{ label: 'IoT Hub', href: '/iot-hub/' },
	{ label: 'Pricing', href: '/pricing/', id: 'Menu_Pricing', linkClass: 'gtm_button' },
];

// Products submenu
export const productsSubmenu: SubMenu = {
	id: 'nav-products',
	iconSize: 32,
	owns: ['/products/', '/installations/'],
	groups: [
		{
			name: 'IoT platforms',
			perColumn: 2,
			items: [
				{
					href: '/products/thingsboard-pe/',
					badge: 'thingsboard',
					heading: 'ThingsBoard',
					description: 'On-premises IoT Platform',
					linkClass: 'prof-lnk',
				},
				{
					href: '/products/paas/',
					badge: 'cloud',
					heading: 'ThingsBoard Cloud',
					description: 'Platform-as-a-Service',
					linkClass: 'cloud-lnk',
				},
			],
		},
		{
			name: 'Product ecosystem',
			perColumn: 3,
			items: [
				{
					href: '/docs/cli/',
					icon: '/src/assets/images/landings/nav/cli-icon.svg',
					heading: 'ThingsBoard CLI',
					description: 'Build IoT solutions with AI agents',
					linkClass: 'cli-lnk',
				},
				{
					href: '/products/thingsboard-edge/',
					badge: 'edge',
					heading: 'Edge',
					description: 'Edge computing',
					linkClass: 'edge-lnk',
				},
				{
					href: '/docs/iot-gateway/',
					badge: 'gateway',
					heading: 'IoT Gateway',
					description: 'Connect legacy protocols',
					linkClass: 'gateway-lnk',
				},
				{
					href: '/products/mobile/',
					badge: 'mobile',
					heading: 'Mobile Application',
					description: 'IoT mobile product',
					linkClass: 'mobile-lnk',
				},
				{
					href: TBMQ_SITE_URL,
					badge: 'tbmq',
					heading: 'TBMQ',
					description: 'Scalable MQTT broker',
					linkClass: 'mqtt-broker-lnk',
				},
				{
					href: '/products/trendz/',
					badge: 'trendz',
					heading: 'Trendz Analytics',
					description: 'Data analytics and Prediction',
					linkClass: 'trendz-lnk',
				},
			],
		},
	],
};

// Services submenu
export const servicesSubmenu: SubMenu = {
	id: 'nav-services',
	owns: ['/services/'],
	groups: [
		{
			items: [
				{
					href: '/services/development-services/',
					icon: '/src/assets/images/landings/nav/development-services.svg',
					heading: 'Development services',
				},
				{
					href: '/services/',
					icon: '/src/assets/images/landings/nav/support-icon.svg',
					heading: 'Support plans',
				},
				{
					href: '/services/trainings/',
					icon: '/src/assets/images/landings/nav/train-icon.svg',
					heading: 'Trainings',
				},
			],
			more: { label: 'Talk to an expert', href: '/contact-us/' },
		},
	],
};

/**
 * Builds a case-study menu link: its page, the customer's name, and a logo. `logoFile` names a file in
 * `customer-logo/` (single-color logos cropped to the artwork). Without it, the link uses the logo
 * from the case study's page. Throws when the slug is not a known case study.
 */
const CUSTOMER_LOGO_DIR = '/src/assets/images/landings/customer-logo/';
function caseStudy(slug: string, heading: string, logoHeight: number, logoFile?: string): SubMenuItem {
	const study = caseStudyBySlug[slug];
	if (!study) throw new Error(`[navigation] no case study "${slug}"`);
	const logo = logoFile ? `${CUSTOMER_LOGO_DIR}${logoFile}` : study.hero.logo;
	return { href: `/case-studies/${slug}/`, heading, logo, logoHeight };
}

// Solutions submenu. Smart irrigation, water metering and air quality are left out: each is a narrower
// version of a listed use case (smart farming, smart metering, environment monitoring).
export const solutionsSubmenu: SubMenu = {
	id: 'nav-solutions',
	owns: ['/use-cases/', '/case-studies/'],
	groups: [
		{
			name: 'Use cases',
			perColumn: 5,
			items: [
				{
					href: '/use-cases/smart-energy/',
					icon: '/src/assets/images/landings/nav/case-eng-icon.svg',
					heading: 'Smart energy',
				},
				{
					href: '/use-cases/environment-monitoring/',
					icon: '/src/assets/images/landings/nav/case-env-icon.svg',
					heading: 'Environment monitoring',
				},
				{
					href: '/use-cases/smart-office/',
					icon: '/src/assets/images/landings/nav/case-off-icon.svg',
					heading: 'Smart office',
				},
				{
					href: '/use-cases/smart-retail/',
					icon: '/src/assets/images/landings/nav/case-ret-icon.svg',
					heading: 'Smart retail',
				},
				{
					href: '/use-cases/smart-farming/',
					icon: '/src/assets/images/landings/nav/case-fam-icon.svg',
					heading: 'Smart farming',
				},
				{
					href: '/use-cases/site-fleet-tracking/',
					icon: '/src/assets/images/landings/nav/site-fleet-tracking-icon.svg',
					heading: 'Site fleet tracking',
				},
				{
					href: '/use-cases/health-care/',
					icon: '/src/assets/images/landings/nav/case-health-care-icon.svg',
					heading: 'Health care',
				},
				{
					href: '/use-cases/smart-metering/',
					icon: '/src/assets/images/landings/nav/case-met-icon.svg',
					heading: 'Smart metering',
				},
				{
					href: '/use-cases/waste-management/',
					icon: '/src/assets/images/landings/nav/case-waste-icon.svg',
					heading: 'Waste management',
				},
				{
					href: '/use-cases/tank-level-monitoring/',
					icon: '/src/assets/images/landings/nav/case-level-icon.svg',
					heading: 'Tank level monitoring',
				},
			],
			more: { label: 'All use cases', href: '/use-cases/' },
		},
		{
			name: 'SCADA',
			items: [
				{
					href: '/use-cases/scada/',
					icon: '/src/assets/images/landings/nav/case-scada-icon.svg',
					heading: 'Swimming pool',
				},
				{
					href: '/use-cases/scada-oil-and-gas-drilling-system/',
					icon: '/src/assets/images/landings/nav/case-scada-drilling-system-icon.svg',
					heading: 'Oil & gas drilling system',
				},
				{
					href: '/use-cases/scada-energy-management/',
					icon: '/src/assets/images/landings/nav/case-scada-energy-management.svg',
					heading: 'Energy management',
				},
			],
		},
		{
			// Headings are customer names: a case study's own title is a full sentence.
			name: 'Case studies',
			items: [
				caseStudy('schwarz', 'Schwarz Group', 15, 'schwarz-gruppe.svg'),
				caseStudy('t-mobile-cz', 'T-Mobile', 15, 't-mobile.svg'),
				caseStudy('obb-infra', 'ÖBB-Infrastruktur', 18, 'obb.svg'),
				caseStudy('super-bock', 'Super Bock', 24, 'super-bock.svg'),
				caseStudy('circutor', 'Circutor', 16, 'circutor.svg'),
			],
			more: { label: 'All case studies', href: '/case-studies/' },
		},
	],
};

// Company submenu
export const companySubmenu: SubMenu = {
	id: 'nav-company',
	owns: ['/partners/'],
	groups: [
		{
			// `small-link` has no styles. It stays on these links as an analytics hook, like the products'
			// `-lnk` classes.
			name: 'Company',
			perColumn: 4,
			items: [
				{
					href: '/company/',
					icon: '/src/assets/images/landings/nav/about-s-icon.svg',
					heading: 'About us',
					linkClass: 'small-link',
				},
				{
					href: '/trust-center/',
					icon: '/src/assets/images/landings/nav/trust-s-icon.svg',
					heading: 'Trust Center',
					linkClass: 'small-link',
				},
				{
					href: '/clients-feedback/',
					icon: '/src/assets/images/landings/nav/feedback.svg',
					heading: 'Clients feedback',
					linkClass: 'small-link',
				},
				{
					href: '/blog/',
					icon: '/src/assets/images/landings/nav/blog-s-icon.svg',
					heading: 'Blog',
					linkClass: 'small-link',
				},
				{
					href: '/mediakit/',
					icon: '/src/assets/images/landings/nav/media-s-icon.svg',
					heading: 'Media kit',
					linkClass: 'small-link',
				},
				{
					href: CAREERS_URL,
					icon: '/src/assets/images/landings/nav/careers-s-icon.svg',
					heading: 'Careers',
					linkClass: 'small-link',
				},
				{
					href: '/contact-us/',
					icon: '/src/assets/images/landings/nav/contact-s-icon.svg',
					heading: 'Contact us',
					linkClass: 'small-link',
				},
			],
		},
		{
			name: 'Partners',
			items: [
				{
					href: '/partners/affiliate/',
					icon: '/src/assets/images/landings/nav/affiliate-s-icon.svg',
					heading: 'Affiliate program',
					linkClass: 'small-link',
				},
				{
					href: '/partners/hardware/',
					icon: '/src/assets/images/landings/nav/hard-s-icon.svg',
					heading: 'Hardware partners',
					linkClass: 'small-link',
				},
				{
					href: '/partners/distributors/',
					icon: '/src/assets/images/landings/nav/dis-s-icon.svg',
					heading: 'Distributors',
					linkClass: 'small-link',
				},
			],
		},
	],
};

// Docs submenu: the same products as Products, with the same badges (`product-badges`). The CLI is
// first in Product ecosystem, as in Products.
export const docsSubmenu: SubMenu = {
	id: 'nav-docs',
	iconSize: 32,
	owns: ['/docs/'],
	groups: [
		{
			name: 'IoT platforms',
			perColumn: 2,
			items: [
				{
					href: '/docs/pe/',
					badge: 'thingsboard',
					heading: 'ThingsBoard',
					description: 'On-premises IoT Platform',
					linkClass: 'prof-lnk',
				},
				{
					href: '/docs/paas/',
					badge: 'cloud',
					heading: 'ThingsBoard Cloud',
					description: 'Platform-as-a-Service',
					linkClass: 'cloud-lnk',
				},
			],
		},
		{
			name: 'Product ecosystem',
			perColumn: 3,
			items: [
				{
					href: '/docs/cli/',
					icon: '/src/assets/images/landings/nav/cli-icon.svg',
					heading: 'ThingsBoard CLI',
					description: 'Build IoT solutions with AI agents',
					linkClass: 'cli-lnk',
				},
				{
					href: '/docs/edge/pe/',
					badge: 'edge',
					heading: 'Edge',
					description: 'Edge computing',
					linkClass: 'edge-lnk',
				},
				{
					href: '/docs/iot-gateway/',
					badge: 'gateway',
					heading: 'IoT Gateway',
					description: 'Connect legacy protocols',
					linkClass: 'gateway-lnk',
				},
				{
					href: '/docs/mobile/pe/',
					badge: 'mobile',
					heading: 'Mobile Application',
					description: 'IoT mobile product',
					linkClass: 'mobile-pe-lnk',
				},
				{
					href: TBMQ_PE_DOCS_URL,
					badge: 'tbmq',
					heading: 'TBMQ',
					description: 'Scalable MQTT broker',
					linkClass: 'mqtt-broker-lnk',
				},
				{
					href: '/docs/trendz/',
					badge: 'trendz',
					heading: 'Trendz Analytics',
					description: 'Data analytics and Prediction',
					linkClass: 'trendz-lnk',
				},
			],
		},
	],
};

// All submenus
export const allSubmenus: SubMenu[] = [productsSubmenu, servicesSubmenu, solutionsSubmenu, companySubmenu, docsSubmenu];
