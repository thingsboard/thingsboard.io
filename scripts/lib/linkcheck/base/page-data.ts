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
		/** Inside text from outside this repo (`isExternalContent`). */
		inExternal: boolean;
		/** Inside an edition or product switcher (`isProductSwitcher`): links to other editions or products. */
		inSwitcher: boolean;
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
	isExternal: boolean;
	isSwitcher: boolean;
}

/**
 * Wrappers of IoT Hub listing text, which comes from the IoT Hub API: must match the classes in
 * `src/pages/iot-hub/[category]/[slug].astro` and `src/components/IotHub/DetailHero.astro`.
 */
const EXTERNAL_CONTENT_CLASS = /(?:^|\s)(?:iot-hub-detail__readme|iot-hub-detail-hero__desc)(?:\s|$)/;

function isExternalContent(attribs: Record<string, string>) {
	return attribs.class !== undefined && EXTERNAL_CONTENT_CLASS.test(attribs.class);
}

/**
 * The docs sidebar's product switcher (`VersionSwitcher.astro`) and the header's Docs menu
 * (`data-sm-body` is `docsSubmenu.id` in `src/data/navigation.ts`).
 */
function isProductSwitcher(name: string, attribs: Record<string, string>) {
	return name === 'product-selector' || attribs['data-sm-body'] === 'nav-docs';
}

/** Copies a string out of the HTML, so a kept slice does not keep the whole page in memory. */
function detach(value: string) {
	return Buffer.from(value).toString();
}

/**
 * Reads the page data with htmlparser2's streaming callbacks. The element stack matches the DOM's
 * ancestry, implied and void tags included; labels follow `DomUtils.innerText` (no `<script>` or
 * `<style>` text).
 */
export function extractPageData(html: string): PageData {
	const anchors: PageData['anchors'] = [];
	const labels: string[][] = [];
	const ids: string[] = [];
	const stack: OpenElement[] = [];
	let openAnchors = 0;
	let openExternal = 0;
	let openSwitchers = 0;
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
				// Inline SVG diagrams may still use SVG 1.1 `xlink:href`
				const rawHref = attribs.href ?? attribs['xlink:href'];
				anchorIndex = anchors.length;
				anchors.push({
					label: '',
					name: attribs.name && detach(attribs.name),
					href: rawHref && detach(rawHref),
					inExternal: openExternal > 0,
					inSwitcher: openSwitchers > 0,
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

			const isExternal = isExternalContent(attribs);
			if (isExternal) openExternal++;
			const isSwitcher = isProductSwitcher(name, attribs);
			if (isSwitcher) openSwitchers++;
			stack.push({
				lang,
				anchorIndex,
				isRawText: name === 'script' || name === 'style',
				isExternal,
				isSwitcher,
			});
		},
		onclosetag() {
			const element = stack.pop();
			if (element && element.anchorIndex !== -1) openAnchors--;
			if (element?.isExternal) openExternal--;
			if (element?.isSwitcher) openSwitchers--;
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

/** Reads one built page; a failure comes back as a message the main thread reports with the file path. */
export function readPageData(htmlFilePath: string, index: number): ParseResult {
	try {
		return { index, data: extractPageData(fs.readFileSync(htmlFilePath, 'utf8')) };
	} catch (err: unknown) {
		return { index, error: err instanceof Error ? err.message : String(err) };
	}
}
