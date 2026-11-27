import kleur from 'kleur';
import { dedentMd } from '../../output.mjs';
import { canonicalLinkRule } from '../base/canonical-links.ts';
import { CheckBase, type CheckHtmlPageContext } from '../base/check.ts';
import { IssueType } from '../base/issue.ts';

export interface CanonicalUrlOptions {
	/**
	 * A list of page pathnames that are allowed not to contain a
	 * <link rel="canonical" href="..."> element.
	 *
	 * Subpaths of the given pathnames are automatically ignored as well,
	 * so adding `/example/` will also ignore `/example/some-subpath/`.
	 * */
	ignoreMissingCanonicalUrl?: string[];
}

export class CanonicalUrl extends CheckBase {
	private static readonly LinkToRedirectPage = new IssueType({
		title: 'link(s) to meta refresh page(s)',
		prefix: kleur.gray(`[${kleur.blue().bold('ref')}]`),
		sortOrder: 500,
	});
	private static readonly LinkToNonCanonicalUrl = new IssueType({
		title: 'link(s) not using canonical url(s)',
		prefix: kleur.gray(`[${kleur.blue().bold('can')}]`),
		sortOrder: 501,
	});
	private static readonly LinkToNonCanonicalPage = new IssueType({
		title: 'link(s) to non-canonical page(s), allowed for now',
		prefix: kleur.gray(`[${kleur.yellow().bold('can')}]`),
		sortOrder: 503,
		severity: 'warning',
	});
	private static readonly MissingCanonicalUrl = new IssueType({
		title: 'page(s) missing canonical url(s)',
		prefix: kleur.gray(`[${kleur.blue().bold('mcu')}]`),
		sortOrder: 502,
	});

	readonly ignoreMissingCanonicalUrl: string[];

	constructor({ ignoreMissingCanonicalUrl }: CanonicalUrlOptions = {}) {
		super();

		this.ignoreMissingCanonicalUrl = ignoreMissingCanonicalUrl || [];
	}

	checkHtmlPage(context: CheckHtmlPageContext) {
		// Skip all checks if the current page is a language fallback page
		// to avoid reporting duplicates for all missing translations
		if (context.page.isLanguageFallback) return;

		this.forEachLocalLink(context, (linkHref, url) => {
			const linkedPage = this.findPageByPathname(context, url.pathname);
			if (!linkedPage) return;

			// Ignore links that do not contain a pathname
			const rawUrl = new URL(linkHref, 'https://example.com/no-pathname/');
			if (rawUrl.pathname === '/no-pathname/') return;

			// Report links to redirect pages
			if (linkedPage.redirectTargetUrl) {
				// Attempt to find the page targeted by the redirect and get its proper pathname
				const redirectTargetPage = this.findPageByPathname(
					context,
					linkedPage.redirectTargetUrl.pathname
				);
				const targetPathname = redirectTargetPage
					? redirectTargetPage.getExpectedLinkPathname(context.page, linkHref, context.canonicalLinkPolicy)
					: null;
				const autofixHref = targetPathname
					? targetPathname + decodeURIComponent(url.hash)
					: undefined;
				context.report({
					type: CanonicalUrl.LinkToRedirectPage,
					linkHref,
					autofixHref,
					annotationText: dedentMd`Please link directly to the target page
						instead of a redirect page that uses meta refresh to forward the user.
						This improves ranking in search engines and avoids unnecessary requests.`,
				});
				return;
			}

			// Handle cases where the linked page does not define its canonical URL
			if (!linkedPage.canonicalUrl) {
				// If the linked page is not on the ignore list,
				// report the missing canonical URL
				const isOnIgnoreList = this.ignoreMissingCanonicalUrl.some((ignoredPath) =>
					url.pathname.startsWith(ignoredPath)
				);
				if (!isOnIgnoreList) {
					context.report({
						type: CanonicalUrl.MissingCanonicalUrl,
						linkHref,
						annotationText: dedentMd`The target page does not have a canonical URL.
							Please consider adding a <link rel="canonical" href="..."> element
							to the page.`,
					});
				}
				// Always skip further processing
				return;
			}

			// Skip links that point to the wrong language (those are handled by SameLanguage)
			if (linkedPage.pathnameLang !== context.page.pathnameLang) return;

			// It's an error if the link URL pathname does not match the expected pathname of the
			// linked page: its canonical one where `canonicalLinkPolicy` requires it, otherwise its
			// own. A link in another URL form (no trailing slash, wrong case) is an error anywhere.
			const policy = context.canonicalLinkPolicy;
			const expectedPathname = linkedPage.getExpectedLinkPathname(context.page, linkHref, policy);
			if (url.pathname !== expectedPathname) {
				const autofixHref = expectedPathname + decodeURIComponent(url.hash);
				context.report({
					type: CanonicalUrl.LinkToNonCanonicalUrl,
					linkHref,
					autofixHref,
					annotationText: dedentMd`Please use the proper canonical URL of the target page.
						This improves ranking in search engines and avoids unnecessary redirects.`,
				});
				return;
			}

			// Links the policy allows for now, though the target's canonical URL points elsewhere
			if (linkedPage.canonicalUrl && canonicalLinkRule(context.page, linkHref, linkedPage, policy) === 'warn') {
				context.report({
					type: CanonicalUrl.LinkToNonCanonicalPage,
					linkHref,
					annotationText: dedentMd`The target page is canonical to
						${linkedPage.canonicalUrl.pathname}. Link there instead where it fits.`,
				});
			}
		});
	}
}
