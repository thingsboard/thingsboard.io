import { join } from 'node:path';
import type { ConsolidationPattern } from './base.ts';
import type { LinkIssue } from './issue.ts';
import type { AllPagesByPathname, HtmlPage } from './page.ts';
import { existsSync } from 'node:fs';

export interface CheckHtmlPageContext {
	allPages: AllPagesByPathname;
	page: HtmlPage;
	baseUrl: string;
	additionalLocalHosts: string[];
	checkSingleLinkHref?: string;
	buildOutputDir: string;
	consolidationPatterns: ConsolidationPattern[];
	report: (issueData: Omit<LinkIssue, 'page' | 'check' | 'sourceFileAnnotations'>) => void;
}

const fileExtensionRegex = /\.[^/]+$/i;

export abstract class CheckBase {
	abstract checkHtmlPage(context: CheckHtmlPageContext): void;
	private foundFiles: Map<string, string> = new Map();

	protected forEachLocalLink(
		context: CheckHtmlPageContext,
		fn: (linkHref: string, url: URL) => void
	) {
		// If requested, only check a single link href (used to validate autofix suggestions),
		// or perform the default behavior and check all unique link hrefs on the page
		const hrefsToCheck = context.checkSingleLinkHref
			? [context.checkSingleLinkHref]
			: context.page.uniqueLinkHrefs;

		const localPrefixes = [context.baseUrl, ...context.additionalLocalHosts];

		hrefsToCheck.forEach((linkHref) => {
			const url = new URL(linkHref, context.page.href);

			// Ignore external links — accept the build's own origin plus any
			// `additionalLocalHosts` (e.g. the production origin on staging builds,
			// so hardcoded thingsboard.io URLs in assets don't slip past as external).
			if (!localPrefixes.some((prefix) => url.href.startsWith(prefix))) return;

			// If we arrive here, call the given callback for the current link
			fn(linkHref, url);
		});
	}

	protected findFileByPathname(
		context: CheckHtmlPageContext,
		pathname: string
	): string | undefined {
		if (this.foundFiles.has(pathname)) {
			return this.foundFiles.get(pathname);
		}

		if (!fileExtensionRegex.test(pathname)) {
			return undefined;
		}
		let decodedPathname: string;
		try {
			decodedPathname = decodeURIComponent(pathname);
		} catch {
			decodedPathname = pathname;
		}
		const filePath = join(context.buildOutputDir, decodedPathname);

		if (existsSync(filePath)) {
			this.foundFiles.set(pathname, filePath);
			return filePath;
		}
		return undefined;
	}

	protected findPageByPathname(context: CheckHtmlPageContext, pathname: string) {
		if (!pathname.endsWith('/')) {
			pathname += '/';
		}

		return context.allPages[pathname];
	}
}
