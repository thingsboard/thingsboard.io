import type { HtmlPage } from './page.ts';

/** Links from one group of site sections to another, matched by section prefix. */
export interface SectionLinks {
	from: string[];
	to: string[];
	/** Only these target pathnames, when the exception is about specific pages rather than a whole section. */
	pages?: string[];
}

/**
 * Which links on a canonical page may point at a page whose canonical URL
 * points elsewhere (e.g. a CE page canonical to its PE twin). Every other link must use the
 * target's canonical URL. Links within one section are always allowed: they are that
 * product's own navigation.
 */
export interface CanonicalLinkPolicy {
	/** Site sections, most specific first. A page belongs to the first one its pathname starts with. */
	sections: string[];
	/** Links that are fine. */
	allow?: SectionLinks[];
	/** Links that are reported as warnings: allowed for now, but they should move to the canonical URL. */
	warn?: SectionLinks[];
}

/**
 * - `own`: the link may use the target's own URL.
 * - `warn`: it may, but gets a warning when the target's canonical URL points elsewhere.
 * - `canonical`: it must use the target's canonical URL.
 */
export type CanonicalLinkRule = 'own' | 'warn' | 'canonical';

/** The section a pathname belongs to; outside the listed ones, its first path segment. */
export function sectionOf(pathname: string, policy: CanonicalLinkPolicy): string {
	return policy.sections.find((section) => pathname.startsWith(section)) ?? `/${pathname.split('/')[1]}/`;
}

function matches(list: SectionLinks[] | undefined, from: string, to: string, target: string) {
	return Boolean(
		list?.some(
			(links) => links.from.includes(from) && links.to.includes(to) && (!links.pages || links.pages.includes(target))
		)
	);
}

/**
 * Decides which URL the link `linkHref` on `source` to `target` has to use.
 *
 * Every link on a canonical page is held to canonical URLs: content, header, sidebar and
 * footer alike, except the edition and product switcher, whose links lead to other editions on
 * purpose. A page whose canonical points elsewhere may link to any real page. A link that
 * only text from outside this repo makes (e.g. an IoT Hub readme) gets a warning instead of an
 * error.
 */
export function canonicalLinkRule(
	source: HtmlPage,
	linkHref: string,
	target: HtmlPage,
	policy: CanonicalLinkPolicy
): CanonicalLinkRule {
	if (!source.isCanonical || target.isCanonical || source.switcherOnlyLinkHrefs.has(linkHref)) return 'own';
	const from = sectionOf(source.pathname, policy);
	const to = sectionOf(target.pathname, policy);
	if (from === to || matches(policy.allow, from, to, target.pathname)) return 'own';
	if (matches(policy.warn, from, to, target.pathname) || source.externalOnlyLinkHrefs.has(linkHref)) return 'warn';
	return 'canonical';
}
