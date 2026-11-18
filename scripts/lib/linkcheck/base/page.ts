import type { ConsolidationPattern } from './base.ts';
import type { PageData } from './page-data.ts';

export interface AllPagesByPathname {
	[key: string]: HtmlPage;
}

export class HtmlPage {
	/**
	 * The full page URL.
	 *
	 * Example: `https://docs.astro.build/en/getting-started/`
	 */
	readonly href: string;
	/**
	 * The `pathname` part of the page's URL.
	 *
	 * Example: `/en/getting-started/`
	 */
	readonly pathname: string;
	/**
	 * A list of all anchor elements on the page.
	 */
	readonly anchors: PageData['anchors'];
	/**
	 * A list of unique link hrefs on the page.
	 */
	readonly uniqueLinkHrefs: string[];
	/**
	 * A list of hashes that can be used as URL fragments to jump to specific parts of the page.
	 */
	readonly hashes: string[];
	/**
	 * Contains the unique absolute page URL as declared by the
	 * `<link rel="canonical" href="...">` element (if any).
	 */
	readonly canonicalUrl: URL | null;
	/**
	 * The target URL of a `<meta http-equiv="refresh" content="...">` element
	 * contained on the page (if any).
	 */
	readonly redirectTargetUrl: URL | null;
	/**
	 * Determines if the page redirects to another URL because it contains a
	 * meta refresh element with a valid URL.
	 */
	readonly isRedirect: boolean;
	/**
	 * Indicates whether the page contains content.
	 *
	 * Set to `false` if the page even doesn't have a `<body>` element (a partial or invalid page).
	 */
	readonly hasContent: boolean;
	/**
	 * The language of the page's main content.
	 *
	 * Searches for the first `lang` attribute in the tree, starting at `mainContent` (if any)
	 * and traversing its parents. Can be `null` if no such attribute is found.
	 */
	readonly mainContentLang: string | null;
	/**
	 * The language defined by the page's pathname prefix (if any).
	 */
	readonly pathnameLang: string | null;
	/**
	 * Determines if the page is a language fallback page
	 * for content that has not been translated yet.
	 */
	readonly isLanguageFallback: boolean;

	constructor({ data, href, pathname }: { data: PageData; href: string; pathname: string }) {
		this.href = href;
		this.pathname = pathname;

		// Inline SVGs may use SVG 1.1 `xlink:href` instead of the modern `href`; `extractPageData`
		// falls back to it so anchors inside embedded SVG diagrams are validated. Anchors without
		// any href form (e.g. `<a name="…">` bookmarks) keep href undefined and are filtered out below.
		this.anchors = data.anchors;

		// Build a list of unique link hrefs on the page
		this.uniqueLinkHrefs = [
			...new Set(this.anchors.map((el) => el.href && decodeURI(el.href)).filter((h): h is string => Boolean(h))),
		];

		// Build a list of hashes that can be used as URL fragments to jump to parts of the page
		const anchorNames = this.anchors.map((el) => el.name).filter((name) => name !== undefined);
		this.hashes = [...anchorNames, ...data.ids].map((name) => `#${name}`);

		// Check if the page redirects somewhere else using meta refresh
		const metaRefreshMatches = data.metaRefreshContent?.match(/^([0-9]+)\s*;\s*url\s*=\s*(.+)$/i);
		this.redirectTargetUrl = metaRefreshMatches ? new URL(metaRefreshMatches[2], this.href) : null;
		this.isRedirect = Boolean(this.redirectTargetUrl);

		// Get the page's canonical URL (if any). A canonical element without a valid absolute
		// href throws, which fails the run for this page.
		this.canonicalUrl = data.hasCanonical ? new URL(data.canonicalHref as string) : null;

		// Whether the page has a <main> or <body>, and the language of the first one found
		this.hasContent = data.hasContent;
		this.mainContentLang = data.mainContentLang;

		// Attempt to determine the page's pathname-based language
		this.pathnameLang = this.getLanguageCodeFromPathname(this.pathname) || null;

		// Detect if this is a language fallback page
		this.isLanguageFallback =
			Boolean(this.pathnameLang) && this.pathnameLang !== 'en' && this.mainContentLang === 'en';
	}

	/**
	 * Determines whether this page's canonical URL represents SEO consolidation —
	 * i.e. the canonical points to a different physical page that serves related
	 * but distinct content (e.g. CE → PE cross-product consolidation), as opposed
	 * to URL-form canonicalization (trailing slash, language prefix, etc.).
	 *
	 * Returns `true` only if the transformation `pathname → canonical.pathname`
	 * exactly matches one of the provided patterns (after stripping optional
	 * language prefix). An empty patterns list always returns `false`.
	 */
	isConsolidationCanonical(patterns: ConsolidationPattern[]): boolean {
		if (!this.canonicalUrl) return false;
		if (this.canonicalUrl.pathname === this.pathname) return false;
		const stripLang = (p: string) => p.replace(/^\/uk(?=\/|$)/, '');
		const source = stripLang(this.pathname);
		const canonical = stripLang(this.canonicalUrl.pathname);
		return patterns.some(({ from, to }) => {
			if (!source.startsWith(from) || !canonical.startsWith(to)) return false;
			return to + source.slice(from.length) === canonical;
		});
	}

	/**
	 * Determines the URL pathname that should be used to link to this page
	 * from a page with the given source language.
	 *
	 * When the page's canonical URL matches a known SEO consolidation pattern,
	 * the actual pathname is used instead of the canonical — consolidation
	 * canonicals are SEO signals, not navigation targets. Otherwise, the
	 * canonical pathname is preferred (normal URL-form canonicalization).
	 */
	getExpectedLinkPathname(
		sourceLang: string | null,
		consolidationPatterns: ConsolidationPattern[] = []
	) {
		const useActual = this.isConsolidationCanonical(consolidationPatterns);
		let pathname = useActual ? this.pathname : this.canonicalUrl?.pathname || this.pathname;
		if (sourceLang && (this.isLanguageFallback || pathname.startsWith('/en/'))) {
			pathname = pathname.replace(/^\/en\//, `/${sourceLang}/`);
		}
		return pathname;
	}

	private getLanguageCodeFromPathname(pathname: string) {
		// Assuming that `pathname` always starts with a `/`, retrieve the first path part,
		// which is usually the language code
		const firstPathPart = pathname.split('/')[1];
		// Only return parts that look like a two-letter language code
		// with optional two-letter country code
		if (firstPathPart.match(/^[a-z]{2}(-[a-zA-Z]{2})?$/)) return firstPathPart;
	}
}
