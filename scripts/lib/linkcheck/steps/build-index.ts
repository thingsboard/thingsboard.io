import path from 'node:path';
import { Worker } from 'node:worker_threads';
import fg from 'fast-glob';
import { pickWorkerCount } from '../../../../config/worker-count.ts';
import { dedentMd } from '../../output.mjs';
import type { LinkCheckerOptions } from '../base/base.ts';
import { readPageData, type ParseRequest, type ParseResult } from '../base/page-data.ts';
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

/** Pages sent to a worker per message: small enough to balance uneven page sizes. */
const BATCH_SIZE = 50;

/**
 * Worker threads that read and parse pages. The main thread keeps the page index (about 1.5 GB for
 * the whole site), each worker adds about 0.15 GB; the budget leaves room on top of both.
 * `LINKCHECK_WORKERS=0` or `1` parses on the main thread, 2 or more forces that count.
 */
function pickParseWorkers(pageCount: number) {
	const plan = pickWorkerCount({ envVar: 'LINKCHECK_WORKERS', baseGb: 2, perWorkerGb: 0.5 });
	const workers = Math.min(plan.workers, Math.ceil(pageCount / BATCH_SIZE));
	console.log(
		workers >= 2
			? `Parsing pages on ${workers} worker threads (${plan.source}). LINKCHECK_WORKERS=0 turns this off.`
			: `Parsing pages on the main thread (${plan.source}).`
	);
	return workers;
}

/**
 * Parses multiple HTML pages based on their pathnames and builds an index of their contents.
 *
 * Reading and parsing take most of a run, so they are spread over worker threads;
 * the index keeps the order of `pathnames` either way.
 */
export async function parsePages(pathnames: string[], options: LinkCheckerOptions): Promise<AllPagesByPathname> {
	const htmlFilePaths = pathnames.map((pathname) => pathnameToHtmlFilePath(pathname, options.buildOutputDir));
	const results = await readAllPageData(htmlFilePaths, pickParseWorkers(pathnames.length));

	const pages: AllPagesByPathname = {};
	pathnames.forEach((pathname, idx) => {
		pages[pathname] = createPage(pathname, htmlFilePaths[idx], results[idx], options);
	});
	return pages;
}

async function readAllPageData(htmlFilePaths: string[], workerCount: number): Promise<ParseResult[]> {
	const results: ParseResult[] = new Array(htmlFilePaths.length);

	if (workerCount <= 1) {
		return htmlFilePaths.map((htmlFilePath, index) => readPageData(htmlFilePath, index));
	}

	let next = 0;
	const takeBatch = (): ParseRequest | null => {
		if (next >= htmlFilePaths.length) return null;
		const indexes: number[] = [];
		for (; next < htmlFilePaths.length && indexes.length < BATCH_SIZE; next++) indexes.push(next);
		return { indexes, htmlFilePaths: indexes.map((i) => htmlFilePaths[i]) };
	};

	const runWorker = () =>
		new Promise<void>((resolve, reject) => {
			const worker = new Worker(new URL('./build-index.worker.ts', import.meta.url));
			const sendNext = () => {
				const batch = takeBatch();
				if (batch) {
					worker.postMessage(batch);
				} else {
					worker.terminate().then(() => resolve(), reject);
				}
			};
			worker.on('message', (batchResults: ParseResult[]) => {
				batchResults.forEach((result) => (results[result.index] = result));
				sendNext();
			});
			worker.on('error', reject);
			worker.on('online', sendNext);
		});

	await Promise.all(Array.from({ length: workerCount }, runWorker));
	return results;
}

/**
 * Creates the index entry of one page from its parsed data.
 */
function createPage(pathname: string, htmlFilePath: string, result: ParseResult, options: LinkCheckerOptions) {
	const href = pathnameToHref(pathname, options.baseUrl);

	try {
		if ('error' in result) throw new Error(result.error);
		const htmlPage = new HtmlPage({ data: result.data, href, pathname });

		// Do not allow pages without main content unless they are a redirect
		if (!htmlPage.isRedirect && !htmlPage.hasContent)
			throw new Error('Failed to find main content - page has no <article> or <body>');

		// Do not allow pages without a main content "lang" attribute unless they are a redirect
		if (!htmlPage.isRedirect && !htmlPage.mainContentLang)
			throw new Error('Failed to find "lang" attribute of main content');

		return htmlPage;
	} catch (err: unknown) {
		throw new Error(
			dedentMd`Error parsing HTML file "${htmlFilePath}"
			referenced by build output: ${err instanceof Error ? err.message : err}`,
			{ cause: err }
		);
	}
}

function pathnameToHref(pathname: string, baseUrl: string) {
	const url = new URL(pathname, baseUrl);
	return url.href;
}

function pathnameToHtmlFilePath(pathname: string, buildOutputDir: string) {
	return path.join(buildOutputDir, pathname, 'index.html');
}
