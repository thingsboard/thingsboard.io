import type { Document, Element } from 'domhandler';
import { parseDocument, DomUtils } from 'htmlparser2';
import type { ConsolidationPattern } from './base.ts';

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
	readonly anchors: Array<{
		label: string;
		name: string;
		href: string | undefined;
	}>;
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

	constructor({ html, href, pathname }: { html: string; href: string; pathname: string }) {
		// Attempt to read the HTML file and parse its DOM
		const parser = new DocumentParser(parseDocument(html));
		this.href = href;
		this.pathname = pathname;

		// Provide commonly used data as properties.
		// Inline SVGs may use SVG 1.1 `xlink:href` instead of the modern `href` — fall back to it
		// so anchors inside embedded SVG diagrams are validated. Anchors without any href form
		// (e.g. `<a name="…">` bookmarks) keep href undefined and are filtered out below.
		this.anchors = DomUtils.getElementsByTagName('a', parser.dom, true).map((el) => {
			const rawHref = el.attribs.href ?? el.attribs['xlink:href'];
			return {
				// Pass the strings through Buffer to allow Node to reallocate them into independent memory
				// instead of using slices of the original large string containing the full HTML document.
				//
				// This reduces memory usage significantly, at time of writing, 2.1Gib -> 300MiB.
				label: Buffer.from(DomUtils.innerText(el)).toString(),
				name: el.attribs.name && Buffer.from(el.attribs.name).toString(),
				href: rawHref && Buffer.from(rawHref).toString(),
			};
		});

		// Build a list of unique link hrefs on the page
		this.uniqueLinkHrefs = [
			...new Set(this.anchors.map((el) => el.href && decodeURI(el.href)).filter((h): h is string => Boolean(h))),
		];

		// Build a list of hashes that can be used as URL fragments to jump to parts of the page
		const anchorNames = this.anchors.map((el) => el.name).filter((name) => name !== undefined);
		const ids = parser
			.findAll((el) => Boolean(el.attribs.id))
			// Same reason as above.
			.map((el) => Buffer.from(el.attribs.id).toString());
		this.hashes = [...anchorNames, ...ids].map((name) => `#${name}`);

		// Check if the page redirects somewhere else using meta refresh
		const metaRefreshElement = parser.findFirst(
			(el) =>
				el.tagName.toLowerCase() === 'meta' && el.attribs['http-equiv']?.toLowerCase() === 'refresh'
		);
		const metaRefreshContent = metaRefreshElement?.attribs['content'];
		const metaRefreshMatches = metaRefreshContent?.match(/^([0-9]+)\s*;\s*url\s*=\s*(.+)$/i);
		this.redirectTargetUrl = metaRefreshMatches ? new URL(metaRefreshMatches[2], this.href) : null;
		this.isRedirect = Boolean(this.redirectTargetUrl);

		// Get the page's canonical URL (if any)
		const linkCanonicalElement = parser.findFirst(
			(el) =>
				el.tagName.toLowerCase() === 'link' && el.attribs['rel']?.toLowerCase() === 'canonical'
		);
		this.canonicalUrl =
			(linkCanonicalElement && new URL(linkCanonicalElement.attribs['href'])) || null;

		// Attempt to find the page's main content element
		const mainContent =
			parser.findFirst((el) => el.tagName.toLowerCase() === 'main') ||
			parser.findFirst((el) => el.tagName.toLowerCase() === 'body');

		this.hasContent = Boolean(mainContent);

		// Attempt to determine the main content language by traversing the tree upwards
		// until we find an element with a `lang` attribute
		const mainContentParentWithLang =
			mainContent && parser.findParent(mainContent, (el) => Boolean(el.attribs?.lang));
		this.mainContentLang = mainContentParentWithLang?.attribs.lang || null;

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

class DocumentParser {
	constructor(public readonly dom: Document) {}

	findFirst(test: (elem: Element) => boolean) {
		return DomUtils.findOne(test, this.dom.children);
	}

	findAll(test: (elem: Element) => boolean) {
		return DomUtils.findAll(test, this.dom.children);
	}

	findParent(start: Element, test: (elem: Element) => boolean) {
		let el: Element | null = start;
		while (el) {
			if (test(el)) return el;
			el = DomUtils.getParent(el) as Element;
		}
		return null;
	}
}
