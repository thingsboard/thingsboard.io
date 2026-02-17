// Language system
export type SupportedLanguage = 'en' | 'uk';

/** Language configuration */
export const supportedLanguages: Record<SupportedLanguage, { label: string; prefix: string }> = {
	en: { label: 'English', prefix: '' },
	uk: { label: 'Українська', prefix: 'uk/' },
};

// Product version system
export type ProductVersion = 'opensource' | 'pe' | 'paas';

/** Product version configuration */
export const productVersions: Record<ProductVersion, { label: string; prefix: string }> = {
	opensource: { label: 'OpenSource', prefix: '' },
	pe: { label: 'Professional', prefix: 'pe/' },
	paas: { label: 'Cloud', prefix: 'paas/' },
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
export function getVersionFromURL(pathname: string): ProductVersion {
	let path = pathname;
	// Remove language prefix if present
	if (path.startsWith('/uk/')) path = path.slice(3);
	// Remove /docs/ prefix
	path = path.replace(/^\/docs\/?/, '');

	if (path.startsWith('pe/')) return 'pe';
	if (path.startsWith('paas/')) return 'paas';
	return 'opensource';
}

/**
 * Detect product version from a content entry slug.
 * Slug structure: docs/pe/... or uk/docs/pe/...
 */
export function getVersionFromSlug(slug: string): ProductVersion {
	let path = slug;
	// Remove language prefix
	path = stripLanguagePrefix(path);
	// Remove docs/ prefix
	if (path.startsWith('docs/')) path = path.slice(5);

	if (path.startsWith('pe/')) return 'pe';
	if (path.startsWith('paas/')) return 'paas';
	return 'opensource';
}

/** Get the URL prefix for a product version. */
export function getVersionPrefix(version: ProductVersion): string {
	return productVersions[version].prefix;
}

/** Get the base/landing URL for a product version (in English). */
export function getVersionBaseURL(version: ProductVersion, lang: SupportedLanguage = 'en'): string {
	const langPrefix = getLanguagePrefix(lang);
	const versionPrefix = getVersionPrefix(version);
	return `/${langPrefix}docs/${versionPrefix}introduction/`;
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
	// Remove version prefix
	if (path.startsWith('pe/')) path = path.slice(3);
	else if (path.startsWith('paas/')) path = path.slice(5);
	return path.replace(/^\/|\/$/g, '');
}

/**
 * Switch the current path to a different product version, preserving language.
 * E.g. switchVersion('/uk/docs/getting-started/', 'pe') => '/uk/docs/pe/getting-started/'
 */
export function switchVersion(pathname: string, targetVersion: ProductVersion): string {
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
	targetVersion: ProductVersion,
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
