/**
 * Reads a built page's `<head>` to decide whether search engines and AI agents
 * should be pointed at it. Shared by the sitemap and the llms.txt integrations,
 * so both list exactly the same pages: the ones whose built HTML is indexable
 * (no `noindex`) and self-canonical.
 */

import { closeSync, existsSync, openSync, readSync } from 'node:fs';
import { join } from 'node:path';

/** The page's `<head>`, or `null` when the build wrote no `index.html` for it. */
export function readBuiltHead(outDir: string, pathname: string): string | null {
	const htmlPath = join(outDir, pathname, 'index.html');
	if (!existsSync(htmlPath)) return null;
	return readHead(htmlPath);
}

/** True when the page has no `noindex` and any canonical points at the page itself. */
export function isIndexableCanonicalHead(head: string, pageUrl: string): boolean {
	if (hasNoindex(head)) return false;

	const canonicalHref = getCanonicalHref(head);
	if (canonicalHref) {
		try {
			const canonical = new URL(canonicalHref, pageUrl);
			if (canonical.href !== new URL(pageUrl).href) return false;
		} catch {
			return false;
		}
	}
	return true;
}

export function isIndexableCanonicalPage(outDir: string, pageUrl: string): boolean {
	const head = readBuiltHead(outDir, new URL(pageUrl).pathname);
	return head !== null && isIndexableCanonicalHead(head, pageUrl);
}

/** Text of the `<title>` element, entities decoded. */
export function getTitle(head: string): string | null {
	const match = head.match(/<title[^>]*>([^<]*)<\/title>/i);
	return match?.[1] ? decodeEntities(match[1]).trim() : null;
}

/** Content of `<meta name="description">`, entities decoded. */
export function getMetaDescription(head: string): string | null {
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
