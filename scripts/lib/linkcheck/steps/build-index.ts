import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import { dedentMd } from '../../output.mjs';
import type { LinkCheckerOptions } from '../base/base.ts';
import { HtmlPage, type AllPagesByPathname } from '../base/page.ts';

/**
 * Enumerates every page actually emitted into the build by globbing for
 * `**\/index.html` under `buildOutputDir`. This is broader than the sitemap
 * (which only lists indexable + canonical pages) and intentionally so —
 * the link checker must validate links on noindex and non-canonical pages
 * too, otherwise broken links inside them go undetected. The previous
 * sitemap-driven approach skipped pages excluded by `@astrojs/sitemap`.
 */
export function getPagePathnamesFromBuildOutput(options: LinkCheckerOptions) {
	const htmlFiles = fg.sync('**/index.html', {
		cwd: options.buildOutputDir,
		onlyFiles: true,
	});
	const paths = htmlFiles.map((p) => '/' + p.replace(/index\.html$/, ''));
	if (options.excludePagePatterns?.length) {
		return paths.filter((p) => !options.excludePagePatterns!.some((re) => re.test(p)));
	}
	return paths;
}

/**
 * Parses multiple HTML pages based on their pathnames and builds an index of their contents.
 */
export function parsePages(pathnames: string[], options: LinkCheckerOptions): AllPagesByPathname {
	const pages: AllPagesByPathname = {};
	pathnames.forEach((pathname) => {
		pages[pathname] = parsePage(pathname, options);
	});

	return pages;
}

/**
 * Parses an HTML page based on its pathname and builds an index of its contents.
 */
function parsePage(pathname: string, options: LinkCheckerOptions): HtmlPage {
	// Determine the html file path and full page URL from the given pathname
	const htmlFilePath = pathnameToHtmlFilePath(pathname, options.buildOutputDir);
	const href = pathnameToHref(pathname, options.baseUrl);

	try {
		// Attempt to load the HTML file and create a page instance to parse it
		const html = fs.readFileSync(htmlFilePath, 'utf8');
		const htmlPage = new HtmlPage({ html, href, pathname });

		// Do not allow pages without main content unless they are a redirect
		if (!htmlPage.isRedirect && !htmlPage.hasContent)
			throw new Error('Failed to find main content - page has no <article> or <body>');

		// Do not allow pages without a main content "lang" attribute unless they are a redirect
		if (!htmlPage.isRedirect && !htmlPage.mainContentLang)
			throw new Error('Failed to find "lang" attribute of main content');

		return htmlPage;
	} catch (err: unknown) {
		throw new Error(dedentMd`Error parsing HTML file "${htmlFilePath}"
			referenced by build output: ${err instanceof Error ? err.message : err}`);
	}
}

function pathnameToHref(pathname: string, baseUrl: string) {
	const url = new URL(pathname, baseUrl);
	return url.href;
}

function pathnameToHtmlFilePath(pathname: string, buildOutputDir: string) {
	return path.join(buildOutputDir, pathname, 'index.html');
}
