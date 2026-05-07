// Language system
import { Products } from '@models/site.models.ts';
import { SECTION_LABELS, SITE_NAME } from '~/consts';

export type SupportedLanguage = 'en' | 'uk';

/** Language configuration */
export const supportedLanguages: Record<SupportedLanguage, { label: string; prefix: string }> = {
	en: { label: 'English', prefix: '' },
	uk: { label: 'Українська', prefix: 'uk/' },
};

/** Product version configuration (all products including variants).
 *  `label` is used in version-switcher UI; `titleName` is the SEO brand form used in <title> tags. */
export const productVersions: Partial<Record<Products, { label: string; prefix: string; titleName: string }>> = {
	[Products.CE]: { label: 'Community Edition', prefix: '', titleName: 'ThingsBoard' },
	[Products.PE]: { label: 'Professional Edition', prefix: 'pe/', titleName: 'ThingsBoard PE' },
	[Products.PAAS]: { label: 'Cloud', prefix: 'paas/', titleName: 'ThingsBoard Cloud' },
	[Products.PAAS_EU]: {
		label: 'Cloud (EU)',
		prefix: 'paas/eu/',
		titleName: 'ThingsBoard Cloud (EU)',
	},
	[Products.EDGE]: { label: 'Edge', prefix: 'edge/', titleName: 'ThingsBoard Edge' },
	[Products.EDGE_PE]: {
		label: 'Edge Professional',
		prefix: 'edge/pe/',
		titleName: 'ThingsBoard Edge PE',
	},
	[Products.TRENDZ]: {
		label: 'Trendz Analytics',
		prefix: 'trendz/',
		titleName: 'ThingsBoard Trendz',
	},
	[Products.GW]: {
		label: 'IoT Gateway',
		prefix: 'iot-gateway/',
		titleName: 'ThingsBoard IoT Gateway',
	},
	[Products.TBMQ]: {
		label: 'TBMQ Broker',
		prefix: 'mqtt-broker/',
		titleName: 'ThingsBoard TBMQ',
	},
	[Products.TBMQ_PE]: {
		label: 'TBMQ PE Broker',
		prefix: 'mqtt-broker/pe/',
		titleName: 'ThingsBoard TBMQ PE',
	},
	[Products.MOBILE]: {
		label: 'Mobile Application',
		prefix: 'mobile/',
		titleName: 'ThingsBoard Mobile',
	},
	[Products.MOBILE_PE]: {
		label: 'Mobile PE',
		prefix: 'mobile/pe/',
		titleName: 'ThingsBoard Mobile PE',
	},
	[Products.LICENSE]: {
		label: 'License Server',
		prefix: 'license-server/',
		titleName: 'ThingsBoard License Server',
	},
};

/** Detect language from a URL pathname. */
export function getLanguageFromURL(pathname: string): SupportedLanguage {
	if (pathname.startsWith('/uk/')) return 'uk';
	return 'en';
}

/** Detect language from a content entry slug. */
export function getLanguageFromSlug(slug: string): SupportedLanguage {
	if (slug.startsWith('uk/')) return 'uk';
	return 'en';
}

/** Get the URL prefix for a language. */
export function getLanguagePrefix(lang: SupportedLanguage): string {
	return supportedLanguages[lang].prefix;
}

/** Strip language prefix from path. */
export function stripLanguagePrefix(path: string): string {
	if (path.startsWith('uk/')) return path.slice(3);
	return path;
}

/**
 * Detect product version from a URL pathname.
 * URL structure: /docs/pe/... or /uk/docs/pe/...
 */
export function getVersionFromURL(pathname: string): Products {
	let path = pathname;
	// Remove language prefix if present
	if (path.startsWith('/uk/')) path = path.slice(3);
	// Remove /docs/ prefix
	path = path.replace(/^\/docs\/?/, '');
	// Normalize: ensure trailing slash so "paas/eu" matches "paas/eu/" prefix
	const p = path.endsWith('/') ? path : path + '/';

	if (p.startsWith('pe/')) return Products.PE;
	if (p.startsWith('paas/eu/')) return Products.PAAS_EU;
	if (p.startsWith('paas/')) return Products.PAAS;
	if (p.startsWith('edge/pe/')) return Products.EDGE_PE;
	if (p.startsWith('edge/')) return Products.EDGE;
	if (p.startsWith('trendz/')) return Products.TRENDZ;
	if (p.startsWith('iot-gateway/')) return Products.GW;
	if (p.startsWith('mqtt-broker/pe/')) return Products.TBMQ_PE;
	if (p.startsWith('mqtt-broker/')) return Products.TBMQ;
	if (p.startsWith('mobile/pe/')) return Products.MOBILE_PE;
	if (p.startsWith('mobile/')) return Products.MOBILE;
	if (p.startsWith('license-server/')) return Products.LICENSE;
	return Products.CE;
}

/**
 * Detect product version from a content entry slug.
 * Slug structure: docs/pe/... or uk/docs/pe/...
 */
export function getVersionFromSlug(slug: string): Products {
	let path = slug;
	// Remove language prefix
	path = stripLanguagePrefix(path);
	// Remove docs/ prefix
	if (path.startsWith('docs/')) path = path.slice(5);
	// Normalize: ensure trailing slash so index slugs like "paas/eu" match "paas/eu/" prefix
	const p = path.endsWith('/') ? path : path + '/';

	if (p.startsWith('pe/')) return Products.PE;
	if (p.startsWith('paas/eu/')) return Products.PAAS_EU;
	if (p.startsWith('paas/')) return Products.PAAS;
	if (p.startsWith('edge/pe/')) return Products.EDGE_PE;
	if (p.startsWith('edge/')) return Products.EDGE;
	if (p.startsWith('trendz/')) return Products.TRENDZ;
	if (p.startsWith('iot-gateway/')) return Products.GW;
	if (p.startsWith('mqtt-broker/pe/')) return Products.TBMQ_PE;
	if (p.startsWith('mqtt-broker/')) return Products.TBMQ;
	if (p.startsWith('mobile/pe/')) return Products.MOBILE_PE;
	if (p.startsWith('mobile/')) return Products.MOBILE;
	if (p.startsWith('license-server/')) return Products.LICENSE;
	return Products.CE;
}

/** Get the URL prefix for a product version. */
export function getVersionPrefix(version: Products): string {
	return productVersions[version]?.prefix ?? '';
}

/** Get the SEO brand form of a product name, used in <title> tags. */
export function getProductTitleName(version: Products): string {
	return productVersions[version]?.titleName ?? SITE_NAME;
}

/** Return the marketing section label for a URL pathname, or undefined if the path
 *  is not inside a tracked section (defined in SECTION_LABELS). */
export function getSectionFromPath(pathname: string): string | undefined {
	const p = pathname.endsWith('/') ? pathname : pathname + '/';
	for (const [prefix, label] of Object.entries(SECTION_LABELS)) {
		if (p.startsWith(prefix)) return label;
	}
	return undefined;
}

/** Get the base/landing URL for a product version (in English). */
export function getVersionBaseURL(version: Products, lang: SupportedLanguage = 'en'): string {
	const langPrefix = getLanguagePrefix(lang);
	const versionPrefix = getVersionPrefix(version);
	return `/${langPrefix}docs/${versionPrefix}`;
}

/**
 * Get the page slug (without language, docs, and version prefix) from a URL pathname.
 * E.g. '/uk/docs/pe/guides/routing/' => 'guides/routing'
 */
export function getPageSlugFromURL(pathname: string): string {
	let path = pathname;
	// Remove language prefix (keep leading slash)
	if (path.startsWith('/uk/')) path = path.slice(3);
	// Remove /docs/ prefix
	path = path.replace(/^\/docs\/?/, '');
	// Strip version prefix (order matters: more specific first)
	const prefixes = [
		'pe/',
		'paas/eu/',
		'paas/',
		'edge/pe/',
		'edge/',
		'trendz/',
		'iot-gateway/',
		'mqtt-broker/pe/',
		'mqtt-broker/',
		'mobile/pe/',
		'mobile/',
		'license-server/',
	];
	for (const prefix of prefixes) {
		if (path.startsWith(prefix)) {
			path = path.slice(prefix.length);
			break;
		}
	}
	return path.replace(/^\/|\/$/g, '');
}

/**
 * Switch the current path to a different product version, preserving language.
 * E.g. switchVersion('/uk/docs/getting-started/', 'pe') => '/uk/docs/pe/getting-started/'
 */
export function switchVersion(pathname: string, targetVersion: Products): string {
	const lang = getLanguageFromURL(pathname);
	const pageSlug = getPageSlugFromURL(pathname);
	const langPrefix = getLanguagePrefix(lang);
	const versionPrefix = getVersionPrefix(targetVersion);
	return `/${langPrefix}docs/${versionPrefix}${pageSlug}/`;
}

/**
 * Switch the current path to a different language, preserving version.
 * E.g. switchLanguage('/docs/pe/getting-started/', 'uk') => '/uk/docs/pe/getting-started/'
 */
export function switchLanguage(pathname: string, targetLang: SupportedLanguage): string {
	const version = getVersionFromURL(pathname);
	const pageSlug = getPageSlugFromURL(pathname);
	const langPrefix = getLanguagePrefix(targetLang);
	const versionPrefix = getVersionPrefix(version);
	return `/${langPrefix}docs/${versionPrefix}${pageSlug}/`;
}

/**
 * Build version switch URL, falling back to the version's base page
 * if the equivalent page doesn't exist in the target version.
 * @param pathname - current URL pathname
 * @param targetVersion - version to switch to
 * @param existingPageIds - set of all existing content page IDs (slugs)
 */
export function switchVersionWithFallback(
	pathname: string,
	targetVersion: Products,
	existingPageIds: Set<string>
): string {
	const lang = getLanguageFromURL(pathname);
	const pageSlug = getPageSlugFromURL(pathname);
	const langPrefix = getLanguagePrefix(lang);
	const versionPrefix = getVersionPrefix(targetVersion);

	// Build the target content ID (slug format: docs/... or uk/docs/...)
	const docsPrefix = lang === 'uk' ? 'uk/docs/' : 'docs/';
	const targetId = `${docsPrefix}${versionPrefix}${pageSlug}`;

	if (existingPageIds.has(targetId)) {
		return `/${langPrefix}docs/${versionPrefix}${pageSlug}/`;
	}

	// Fallback to the base page of the target version
	return getVersionBaseURL(targetVersion, lang);
}

/**
 * Build language switch URL, falling back to English if the page doesn't exist in target language.
 * @param pathname - current URL pathname
 * @param targetLang - language to switch to
 * @param existingPageIds - set of all existing content page IDs (slugs)
 */
export function switchLanguageWithFallback(
	pathname: string,
	targetLang: SupportedLanguage,
	existingPageIds: Set<string>
): { url: string; isFallback: boolean } {
	const version = getVersionFromURL(pathname);
	const pageSlug = getPageSlugFromURL(pathname);
	const versionPrefix = getVersionPrefix(version);

	if (targetLang === 'uk') {
		// Check if Ukrainian version exists
		const ukContentId = `uk/docs/${versionPrefix}${pageSlug}`;
		if (existingPageIds.has(ukContentId)) {
			return { url: `/uk/docs/${versionPrefix}${pageSlug}/`, isFallback: false };
		}
		// Fallback to English URL
		return { url: `/docs/${versionPrefix}${pageSlug}/`, isFallback: true };
	}

	// English always exists
	return { url: `/docs/${versionPrefix}${pageSlug}/`, isFallback: false };
}
