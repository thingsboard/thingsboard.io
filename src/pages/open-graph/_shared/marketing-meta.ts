// Marketing pages share the brand-blue logo slab. The slab's section word
// is derived from the URL prefix.

export interface MarketingSection {
	/** Word to render under the TB logo on the slab (omit for homepage). */
	sectionName: string | null;
	/** Use the smaller "tight" font for two-word labels. */
	tight?: boolean;
}

/**
 * Per-pathname eyebrow + title override for marketing pages whose URL
 * fragments don't carry a usable display name (e.g. /products/mobile/ → "Mobile"
 * is too thin for a hero card; /products/paas/ → "Paas" is plain wrong).
 * Pathnames are stored with a trailing slash so they match the normaliser
 * inside `getMarketingSection` / `isAllowlistedMarketingPath`.
 */
export interface MarketingOverride {
	eyebrow: string;
	title: string;
}

const PRODUCT_OVERRIDES: Record<string, MarketingOverride> = {
	'/products/':                              { eyebrow: 'Products',                  title: 'A complete IoT platform suite for every deployment' },
	'/products/thingsboard-pe/':               { eyebrow: 'Professional Edition',      title: 'Advanced IoT platform with white-labeling, RBAC, and integrations' },
	'/products/thingsboard-pe/eula/':          { eyebrow: 'Professional Edition',      title: 'End-User License Agreement' },
	'/products/thingsboard-edge/':             { eyebrow: 'ThingsBoard Edge',          title: "IoT that keeps working when the internet doesn't" },
	'/products/thingsboard-edge/request-demo/':{ eyebrow: 'ThingsBoard Edge',          title: 'Request a personalized demo' },
	'/products/paas/':                         { eyebrow: 'ThingsBoard Cloud',         title: 'Fully managed IoT platform — no self-hosting required' },
	'/products/paas/privacy-policy/':          { eyebrow: 'ThingsBoard Cloud',         title: 'Privacy Policy' },
	'/products/paas/terms-of-use/':            { eyebrow: 'ThingsBoard Cloud',         title: 'Terms of Use' },
	'/products/paas/eu/privacy-policy/':       { eyebrow: 'ThingsBoard Cloud — Europe', title: 'Privacy Policy' },
	'/products/paas/eu/terms-of-use/':         { eyebrow: 'ThingsBoard Cloud — Europe', title: 'Terms of Use' },
	'/products/mqtt-broker/':                  { eyebrow: 'TBMQ',                      title: 'Scalable, fault-tolerant open-source MQTT broker' },
	'/products/mqtt-broker/privacy-policy/':   { eyebrow: 'TBMQ',                      title: 'Privacy Policy' },
	'/products/mqtt-broker/terms-of-use/':     { eyebrow: 'TBMQ',                      title: 'Terms of Use' },
	'/products/trendz/':                       { eyebrow: 'Trendz Analytics',          title: 'IoT anomaly detection and predictive maintenance with AI' },
	'/products/trendz/request-demo/':          { eyebrow: 'Trendz Analytics',          title: 'Request a personalized demo' },
	'/products/mobile/':                       { eyebrow: 'ThingsBoard Mobile',        title: 'Build your own IoT mobile app with minimal coding' },
	'/products/mobile-pe/':                    { eyebrow: 'ThingsBoard Mobile PE',     title: 'Build your own advanced IoT mobile app' },
	'/products/iot-hub/terms-of-use/':         { eyebrow: 'ThingsBoard IoT Hub',       title: 'Terms of Use' },
	'/products/license-server/privacy-policy/':{ eyebrow: 'License Server',            title: 'Privacy Policy' },
	'/products/license-server/terms-of-use/':  { eyebrow: 'License Server',            title: 'Terms of Use' },
	'/products/demo/privacy-policy/':          { eyebrow: 'Live Demo',                 title: 'Privacy Policy' },
	'/services/':                              { eyebrow: 'ThingsBoard',               title: 'Support and Services' }
};

export function getMarketingOverride(pathname: string): MarketingOverride | null {
	const normalized = pathname.endsWith('/') ? pathname : pathname + '/';
	return PRODUCT_OVERRIDES[normalized] ?? null;
}

interface PrefixRule {
	prefix: string;
	section: MarketingSection;
}

/** Order matters — first match wins. */
const PREFIX_RULES: PrefixRule[] = [
	{ prefix: '/pricing/',          section: { sectionName: 'Pricing' } },
	{ prefix: '/products/',         section: { sectionName: 'Products' } },
	{ prefix: '/industries/',       section: { sectionName: 'Industries' } },
	{ prefix: '/services/',         section: { sectionName: 'Services' } },
	{ prefix: '/careers/',          section: { sectionName: 'Careers' } },
	{ prefix: '/partners/',         section: { sectionName: 'Partners' } },
	{ prefix: '/community/',        section: { sectionName: 'Community' } },
	{ prefix: '/company/',          section: { sectionName: 'Company' } },
	{ prefix: '/clients-feedback/', section: { sectionName: 'Customers' } },
	{ prefix: '/contact-us/',       section: { sectionName: 'Contact' } },
	{ prefix: '/mediakit/',         section: { sectionName: 'Media Kit', tight: true } },
	{ prefix: '/cookie-policy/',    section: { sectionName: 'Legal' } },
	{ prefix: '/installations/',    section: { sectionName: 'Installations' } },
	{ prefix: '/energy-management/', section: { sectionName: 'Solutions' } },
];

const STANDALONE_SECTION: MarketingSection = { sectionName: 'Solutions' };

/**
 * Resolve a marketing pathname to its slab section.
 * - '/' → no section name (logo alone).
 * - Known prefixes → matching section word.
 * - Standalone allowlisted pages (asset-management/, device-management/, etc.) → 'Solutions'.
 */
export function getMarketingSection(pathname: string): MarketingSection {
	const normalized = pathname.endsWith('/') ? pathname : pathname + '/';
	if (normalized === '/') return { sectionName: null };
	for (const rule of PREFIX_RULES) {
		if (normalized.startsWith(rule.prefix)) return rule.section;
	}
	return STANDALONE_SECTION;
}
