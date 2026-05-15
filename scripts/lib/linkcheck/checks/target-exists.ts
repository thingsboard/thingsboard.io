import kleur from 'kleur';
import { dedentMd } from '../../output.mjs';
import { CheckBase, type CheckHtmlPageContext } from '../base/check.ts';
import { IssueType } from '../base/issue.ts';
import {
	applyRedirects,
	formatRedirectChain,
	loadRedirectsFile,
	type RedirectChain,
	type RedirectRuleIndex,
} from '../util/redirects-file.ts';

export interface TargetExistsOptions {
	/**
	 * A list of link pathnames whose missing targets should not be reported.
	 *
	 * Subpaths of the given pathnames are automatically ignored as well,
	 * so adding `/example/` will also ignore `/example/some-subpath/`.
	 */
	ignoredLinkPathnames?: string[];
	/**
	 * Path to a Cloudflare-style `_redirects` file (e.g. `./public/_redirects`).
	 *
	 * When provided, the checker simulates Cloudflare's edge evaluation: rules
	 * are matched against each link's pathname before the file system is
	 * consulted, mirroring the rule *"Redirects are always followed, regardless
	 * of whether or not an asset matches the incoming request."* Without this,
	 * a catch-all that rewrites a URL to a non-existent destination passes
	 * locally (the original file is on disk) but breaks on Cloudflare.
	 */
	redirectsFilePath?: string;
}

export class TargetExists extends CheckBase {
	private static readonly BrokenPageLink = new IssueType({
		title: 'broken page link(s)',
		prefix: kleur.gray(`[${kleur.red().bold('404')}]`),
		sortOrder: 100,
	});
	private static readonly BrokenFragmentLink = new IssueType({
		title: 'broken fragment link(s)',
		prefix: kleur.gray(`[${kleur.yellow().bold(' # ')}]`),
		sortOrder: 101,
	});
	private static readonly BrokenRedirectChain = new IssueType({
		title: 'broken redirect chain(s)',
		prefix: kleur.gray(`[${kleur.red().bold('30x')}]`),
		sortOrder: 102,
	});

	readonly ignoredLinkPathnames: string[];
	private readonly redirectRules: RedirectRuleIndex | null;

	constructor({ ignoredLinkPathnames, redirectsFilePath }: TargetExistsOptions = {}) {
		super();

		this.ignoredLinkPathnames = ignoredLinkPathnames || [];
		this.redirectRules = redirectsFilePath ? loadRedirectsFile(redirectsFilePath) : null;
	}

	checkHtmlPage(context: CheckHtmlPageContext) {
		this.forEachLocalLink(context, (linkHref, url) => {
			// Skip paths found in the ignore list
			if (this.ignoredLinkPathnames.some((ignoredPath) => url.pathname.startsWith(ignoredPath)))
				return;

			// Simulate Cloudflare's _redirects evaluation: a matching rule wins
			// over a static file on disk. Without this, a link to a path that's
			// rewritten by a catch-all can pass locally (the file exists in dist)
			// but 404 on Cloudflare because the redirect intercepts the request.
			let effectivePathname = url.pathname;
			let chain: RedirectChain | undefined;
			if (this.redirectRules) {
				const result = applyRedirects(url.pathname, this.redirectRules);
				if (result.steps.length > 0) {
					chain = result;
					if (result.external) return;
					if (result.loop) {
						context.report({
							type: TargetExists.BrokenRedirectChain,
							linkHref,
							annotationText: dedentMd`Redirect chain loops or exceeds max depth:
								${formatRedirectChain(result)}`,
						});
						return;
					}
					effectivePathname = result.finalPathname;
				}
			}

			const linkedPage = this.findPageByPathname(context, effectivePathname);

			// Report links to missing pages
			if (!linkedPage) {
				// If it's not a page it may be a file
				if (this.findFileByPathname(context, effectivePathname)) {
					return;
				}

				if (chain) {
					context.report({
						type: TargetExists.BrokenRedirectChain,
						linkHref,
						annotationText: dedentMd`Redirect destination does not exist:
							${formatRedirectChain(chain)}`,
					});
					return;
				}

				context.report({
					type: TargetExists.BrokenPageLink,
					linkHref,
				});
				return;
			}

			// Skip hash validation after a redirect — the chain may have landed
			// on a different page where the original fragment isn't meaningful.
			if (chain) return;

			// Skip hash validation on redirect pages
			if (linkedPage.isRedirect) return;

			// Report links to missing page fragments (unknown URL hashes)
			const decodedHash = url.hash && decodeURIComponent(url.hash);
			if (decodedHash && !linkedPage.hashes.includes(decodedHash)) {
				context.report({
					type: TargetExists.BrokenFragmentLink,
					linkHref,
					annotationText: dedentMd`The linked page does not contain a fragment with
						the name "${decodedHash}".
						Available fragments: ${linkedPage.hashes.length ? linkedPage.hashes.join(', ') : 'none'}`,
				});
			}
		});
	}
}
