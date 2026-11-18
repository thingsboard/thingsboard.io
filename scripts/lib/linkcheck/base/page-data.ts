import fs from 'node:fs';
import { Parser } from 'htmlparser2';

/**
 * Everything `HtmlPage` needs from a page's HTML, as plain data, so it can be
 * extracted on a worker thread and sent back with a structured clone.
 */
export interface PageData {
	/** Every `<a>` element in document order. */
	anchors: Array<{
		label: string;
		name: string | undefined;
		href: string | undefined;
		/** Inside a `<main>`: the page's own content, not the header, sidebar or footer. */
		inMain: boolean;
	}>;
	/** Every truthy `id` attribute in document order. */
	ids: string[];
	/** `content` of the first `<meta http-equiv="refresh">`, if one exists. */
	metaRefreshContent: string | undefined;
	/** Whether a `<link rel="canonical">` exists, and the `href` of the first one. */
	hasCanonical: boolean;
	canonicalHref: string | undefined;
	/** Whether the page has a `<main>` or a `<body>`. */
	hasContent: boolean;
	/** Nearest truthy `lang` on the first `<main>` (else the first `<body>`) or its ancestors. */
	mainContentLang: string | null;
}

interface OpenElement {
	/** Nearest truthy `lang` on this element or its ancestors. */
	lang: string | null;
	/** Index into `anchors` when this element is an `<a>`, otherwise -1. */
	anchorIndex: number;
	/** `<script>` and `<style>` text is not part of `innerText`. */
	isRawText: boolean;
	isMain: boolean;
}

/**
 * Copies a string into its own memory instead of keeping a slice of the whole
 * HTML document alive, which kept every page's HTML in memory at once.
 */
function detach(value: string) {
	return Buffer.from(value).toString();
}

/**
 * Reads the page data with htmlparser2's streaming callbacks instead of building
 * a DOM and querying it. The parser emits the same open and close events that
 * `parseDocument` builds its tree from, so the element stack below matches the
 * DOM's ancestry, implied and void tags included. Labels follow
 * `DomUtils.innerText`: text of descendant elements, but not of `<script>` or
 * `<style>`.
 */
export function extractPageData(html: string): PageData {
	const anchors: PageData['anchors'] = [];
	const labels: string[][] = [];
	const ids: string[] = [];
	const stack: OpenElement[] = [];
	let openAnchors = 0;
	let openMains = 0;
	let metaRefresh: { content: string | undefined } | undefined;
	let canonical: { href: string | undefined } | undefined;
	let main: { lang: string | null } | undefined;
	let body: { lang: string | null } | undefined;

	const parser = new Parser({
		onopentag(name, attribs) {
			const parentLang = stack.length ? stack[stack.length - 1].lang : null;
			const lang = attribs.lang || parentLang;
			let anchorIndex = -1;

			if (attribs.id) ids.push(detach(attribs.id));

			if (name === 'a') {
				const rawHref = attribs.href ?? attribs['xlink:href'];
				anchorIndex = anchors.length;
				anchors.push({
					label: '',
					name: attribs.name && detach(attribs.name),
					href: rawHref && detach(rawHref),
					inMain: openMains > 0,
				});
				labels.push([]);
				openAnchors++;
			} else if (name === 'meta') {
				if (!metaRefresh && attribs['http-equiv']?.toLowerCase() === 'refresh') {
					metaRefresh = { content: attribs.content };
				}
			} else if (name === 'link') {
				if (!canonical && attribs.rel?.toLowerCase() === 'canonical') {
					canonical = { href: attribs.href };
				}
			} else if (name === 'main') {
				if (!main) main = { lang };
			} else if (name === 'body') {
				if (!body) body = { lang };
			}

			if (name === 'main') openMains++;
			stack.push({ lang, anchorIndex, isRawText: name === 'script' || name === 'style', isMain: name === 'main' });
		},
		onclosetag() {
			const element = stack.pop();
			if (element && element.anchorIndex !== -1) openAnchors--;
			if (element?.isMain) openMains--;
		},
		ontext(text) {
			if (openAnchors === 0) return;
			// Walk up to the nearest <script>/<style>: anchors above it don't see this text
			for (let i = stack.length - 1; i >= 0; i--) {
				const element = stack[i];
				if (element.isRawText) break;
				if (element.anchorIndex !== -1) labels[element.anchorIndex].push(text);
			}
		},
	});
	parser.end(html);

	anchors.forEach((anchor, idx) => {
		anchor.label = detach(labels[idx].join(''));
	});

	const mainContent = main || body;
	return {
		anchors,
		ids,
		metaRefreshContent: metaRefresh?.content && detach(metaRefresh.content),
		hasCanonical: Boolean(canonical),
		canonicalHref: canonical?.href && detach(canonical.href),
		hasContent: Boolean(mainContent),
		mainContentLang: mainContent?.lang ? detach(mainContent.lang) : null,
	};
}

/** A batch of pages for a parse worker; `indexes` are the pages' positions in the caller's list. */
export interface ParseRequest {
	indexes: number[];
	htmlFilePaths: string[];
}

export type ParseResult = { index: number; data: PageData } | { index: number; error: string };

/**
 * Reads one built page and extracts its data. A failure comes back as a message, so that a
 * worker can send it to the main thread, which reports it with the file path.
 */
export function readPageData(htmlFilePath: string, index: number): ParseResult {
	try {
		return { index, data: extractPageData(fs.readFileSync(htmlFilePath, 'utf8')) };
	} catch (err: unknown) {
		return { index, error: err instanceof Error ? err.message : String(err) };
	}
}
