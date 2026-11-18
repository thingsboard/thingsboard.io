/**
 * Reads a built page's `<head>`: whether it is indexable and self-canonical, its title and description.
 * The sitemap and llms.txt integrations both use it, so they list the same pages.
 */

import { closeSync, existsSync, openSync, readSync } from 'node:fs';
import { join } from 'node:path';

export interface PageHead {
	noindex: boolean;
	canonical: string | null;
	title: string | null;
	description: string | null;
}

// Both integrations read the same pages in one build; this way each `<head>` is read and parsed once.
const heads = new Map<string, PageHead | null>();

/** The page's parsed `<head>`, or `null` when the build wrote no `index.html` for it. */
export function readPageHead(outDir: string, pathname: string): PageHead | null {
	const htmlPath = join(outDir, pathname, 'index.html');
	let head = heads.get(htmlPath);
	if (head === undefined) {
		head = existsSync(htmlPath) ? parseHead(readHead(htmlPath)) : null;
		heads.set(htmlPath, head);
	}
	return head;
}

/** True when the page has no `noindex` and any canonical points at the page itself. */
export function isIndexableCanonical(head: PageHead, pageUrl: string): boolean {
	if (head.noindex) return false;
	if (!head.canonical) return true;
	try {
		return new URL(head.canonical, pageUrl).href === new URL(pageUrl).href;
	} catch {
		return false;
	}
}

export function isIndexableCanonicalPage(outDir: string, pageUrl: string): boolean {
	const head = readPageHead(outDir, new URL(pageUrl).pathname);
	return head !== null && isIndexableCanonical(head, pageUrl);
}

function parseHead(html: string): PageHead {
	return {
		noindex: hasNoindex(html),
		canonical: getCanonicalHref(html),
		title: getTitle(html),
		description: getMetaDescription(html),
	};
}

function getTitle(head: string): string | null {
	const match = head.match(/<title[^>]*>([^<]*)<\/title>/i);
	return match?.[1] ? decodeEntities(match[1]).trim() : null;
}

function getMetaDescription(head: string): string | null {
	for (const match of head.matchAll(/<meta\s[^>]*>/gi)) {
		const tag = match[0];
		if (!/name=["']description["']/i.test(tag)) continue;
		const content = tag.match(/content=(["'])(.*?)\1/i);
		if (content?.[2]) return decodeEntities(content[2]).trim();
	}
	return null;
}

const HEAD_CHUNK_BYTES = 64 * 1024;
const HEAD_END = Buffer.from('</head>');

/** The document up to `</head>`, or all of it when there is none. Stops reading there: the body is most of a page. */
function readHead(htmlPath: string): string {
	const fd = openSync(htmlPath, 'r');
	try {
		let buf = Buffer.alloc(0);
		const chunk = Buffer.alloc(HEAD_CHUNK_BYTES);
		for (;;) {
			const bytesRead = readSync(fd, chunk, 0, HEAD_CHUNK_BYTES, buf.length);
			if (bytesRead === 0) return buf.toString('utf8');
			// Search from just before the new bytes, in case `</head>` straddles two chunks.
			const searchFrom = Math.max(0, buf.length - HEAD_END.length + 1);
			buf = Buffer.concat([buf, chunk.subarray(0, bytesRead)]);
			const end = buf.indexOf(HEAD_END, searchFrom);
			if (end >= 0) return buf.subarray(0, end).toString('utf8');
		}
	} finally {
		closeSync(fd);
	}
}

function hasNoindex(head: string): boolean {
	for (const match of head.matchAll(/<meta\s[^>]*>/gi)) {
		const tag = match[0];
		if (!/name=["']robots["']/i.test(tag)) continue;
		if (/content=["'][^"']*\bnoindex\b/i.test(tag)) return true;
	}
	return false;
}

function getCanonicalHref(head: string): string | null {
	for (const match of head.matchAll(/<link\s[^>]*>/gi)) {
		const tag = match[0];
		if (!/rel=["']canonical["']/i.test(tag)) continue;
		const href = tag.match(/href=["']([^"']+)["']/i);
		if (href) return href[1] ?? null;
	}
	return null;
}

const NAMED_ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function decodeEntities(text: string): string {
	return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code: string) => {
		if (code[0] === '#') {
			const point = code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
			return Number.isNaN(point) ? entity : String.fromCodePoint(point);
		}
		return NAMED_ENTITIES[code.toLowerCase()] ?? entity;
	});
}
