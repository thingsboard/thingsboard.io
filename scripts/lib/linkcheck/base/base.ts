import type { CanonicalLinkPolicy } from './canonical-links.ts';
import type { CheckBase } from './check.ts';

export interface LinkCheckerOptions {
	baseUrl: string;
	buildOutputDir: string;
	pageSourceDir: string;
	checks: CheckBase[];
	autofix?: boolean;
	excludePagePatterns?: RegExp[];
	/** Which links in the content of canonical pages may skip the target's canonical URL. */
	canonicalLinkPolicy: CanonicalLinkPolicy;
	/**
	 * Origins that should be treated as "local" in addition to `baseUrl` — e.g.
	 * the production origin `https://thingsboard.io` when the build was emitted
	 * against a staging/preview origin via `PUBLIC_SITE_URL`. Without this,
	 * hardcoded `https://thingsboard.io/...` links in build artifacts (assets,
	 * inlined SVGs, component output) slip past `[abs]` / `[404]` checks because
	 * they don't match the staging `baseUrl` and get treated as external.
	 */
	additionalLocalHosts?: string[];
}

export class LinkCheckerState {
	autofixedCount = 0;
	readonly autofixedPathnameHrefs = new Set<string>();
}

/**
 * Attempts to find the given link `href` inside `input` and returns its index on a match.
 *
 * Prevents false positive partial matches (like an href of `/en/install` matching
 * an input containing `/en/install/auto`) by requiring the characters surrounding a match
 * not to be a part of URLs in Markdown.
 */
export function indexOfHref(input: string, href: string, startIndex?: number) {
	let i = input.indexOf(href, startIndex);
	while (i !== -1) {
		// Get the characters surrounding the current match (if any)
		const charBefore = input[i - 1] || '';
		const charAfter = input[i + href.length] || '';
		// If both characters are not a part of URLs in Markdown,
		// we have a proper (non-partial) match, so return the index
		if ((charBefore + charAfter).match(/^[\s"'()[\],.]*$/)) return i;
		// Otherwise, keep searching for other matches
		i = input.indexOf(href, i + 1);
	}
	return -1;
}

/**
 * Uses `indexOfHref` to find all occurrences of `findHref` in the given `input`
 * and replaces them with `replaceWithHref`.
 */
export function replaceHrefs(input: string, findHref: string, replaceWithHref: string) {
	let i = indexOfHref(input, findHref);
	while (i !== -1) {
		input = input.slice(0, i) + replaceWithHref + input.slice(i + findHref.length);
		i = indexOfHref(input, findHref, i + 1 + replaceWithHref.length);
	}
	return input;
}
