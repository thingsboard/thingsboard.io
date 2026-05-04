/**
 * Language Router - centralized language switching logic for all site sections.
 *
 * To add a new section:
 * 1. Add a new SectionConfig to the `sections` array
 * 2. Define the URL pattern matcher and URL builder for the section
 *
 * Example for adding a new "/blog/" section:
 * ```ts
 * {
 *   name: 'blog',
 *   match: (pathname) => pathname.includes('/blog'),
 *   buildUrl: (pathname, targetLang, currentLang) => {
 *     const slug = extractSlugFromPath(pathname, '/blog/');
 *     const prefix = targetLang === DEFAULT_LOCALE ? '' : `/${targetLang}`;
 *     return `${prefix}/blog/${slug}`;
 *   },
 * }
 * ```
 */

import { allPages } from '~/content';
import {
	getLanguageFromURL,
	supportedLanguages,
	switchLanguageWithFallback,
	type SupportedLanguage,
} from './path-utils';
import { DEFAULT_LOCALE } from '~/content/i18n/i18n';

export { DEFAULT_LOCALE };

export interface LanguageOption {
	value: string;
	selected: boolean;
	label: string;
	isFallback?: boolean;
}

interface SectionConfig {
	/** Section name for debugging */
	name: string;
	/** Returns true if pathname belongs to this section */
	match: (pathname: string) => boolean;
	/** Builds URL for target language */
	buildUrl: (
		pathname: string,
		targetLang: SupportedLanguage,
		currentLang: SupportedLanguage
	) => { url: string; isFallback?: boolean };
}

// ============================================================================
// Section Configurations
// ============================================================================

const sections: SectionConfig[] = [
	// Docs section (with fallback support)
	{
		name: 'docs',
		match: (pathname) => pathname.includes('/docs/'),
		buildUrl: (pathname, targetLang) => {
			const existingPageIds = new Set(allPages.map((page) => page.id));
			return switchLanguageWithFallback(pathname, targetLang, existingPageIds);
		},
	},
];

// Default fallback for pages not matching any section
const defaultSection: SectionConfig = {
	name: 'default',
	match: () => true,
	buildUrl: (pathname, targetLang) => {
		// Simple prefix switch for generic pages
		let path = pathname;
		if (path.startsWith('/uk/')) {
			path = path.slice(3);
		}
		const prefix = targetLang === DEFAULT_LOCALE ? '' : `/${targetLang}`;
		return { url: `${prefix}${path}` };
	},
};

// ============================================================================
// Public API
// ============================================================================

/**
 * Finds the section configuration for a given pathname.
 */
export function findSection(pathname: string): SectionConfig {
	return sections.find((section) => section.match(pathname)) || defaultSection;
}

/**
 * Generates language options for the language switcher.
 */
export function getLanguageOptions(pathname: string): LanguageOption[] {
	const currentLang = getLanguageFromURL(pathname);
	const section = findSection(pathname);

	return (Object.keys(supportedLanguages) as SupportedLanguage[]).map((lang) => {
		const { url, isFallback } = section.buildUrl(pathname, lang, currentLang);
		const baseLabel = supportedLanguages[lang].label;

		return {
			value: url,
			selected: lang === currentLang,
			label: isFallback ? `${baseLabel} (EN)` : baseLabel,
			isFallback,
		};
	});
}

/**
 * Gets the URL for switching to a specific language.
 */
export function getLanguageUrl(
	pathname: string,
	targetLang: SupportedLanguage
): { url: string; isFallback?: boolean } {
	const currentLang = getLanguageFromURL(pathname);
	const section = findSection(pathname);
	return section.buildUrl(pathname, targetLang, currentLang);
}
