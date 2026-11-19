import kleur from 'kleur';
import { dedentMd } from '../../output.mjs';
import { CheckBase, type CheckHtmlPageContext } from '../base/check.ts';
import { IssueType } from '../base/issue.ts';

/**
 * An old address form that a page still accepts in client-side code, e.g. a query parameter or
 * #hash of a page that no longer has tabs. The target page exists, so no other check sees it.
 */
export interface LegacyUrlRule {
	/** Pathname of the page that accepts the old form, with a trailing slash. */
	pathname: string;
	/** The current href for an old-form link to that page, or `undefined` when the link is current. */
	resolve: (url: URL) => string | undefined;
}

export interface LegacyUrlOptions {
	rules: LegacyUrlRule[];
}

export class LegacyUrl extends CheckBase {
	private static readonly LegacyLink = new IssueType({
		title: 'link(s) to old address form(s)',
		prefix: kleur.gray(`[${kleur.magenta().bold('old')}]`),
		sortOrder: 400,
	});

	readonly rules: LegacyUrlRule[];

	constructor({ rules }: LegacyUrlOptions) {
		super();
		this.rules = rules;
	}

	checkHtmlPage(context: CheckHtmlPageContext) {
		this.forEachLocalLink(context, (linkHref, url) => {
			for (const rule of this.rules) {
				if (url.pathname !== rule.pathname) continue;
				const autofixHref = rule.resolve(url);
				if (!autofixHref) continue;
				context.report({
					type: LegacyUrl.LegacyLink,
					linkHref,
					autofixHref,
					annotationText: dedentMd`This address form only works through a script on the target page.
						Link the current address instead.`,
				});
			}
		});
	}
}
