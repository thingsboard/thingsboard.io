/**
 * WordPress Blog → Astro MDX Extraction Script
 *
 * Reads static HTML exports from the old WordPress blog at
 * ../../thingsboard.github.io/blog/{slug}/index.html
 * and produces .mdx files in src/content/blog/{slug}.mdx
 * with proper frontmatter, cleaned markdown, and local image paths.
 *
 * Usage:
 *   npx tsx scripts/blog-extract.ts              # extract all posts
 *   npx tsx scripts/blog-extract.ts --dry-run    # preview without writing
 *   npx tsx scripts/blog-extract.ts dark-mode-for-a-dashboard  # single post
 */

import * as cheerio from 'cheerio';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Paths ──
const OLD_BLOG = resolve(__dirname, '../../thingsboard.github.io/blog');
const NEW_CONTENT = resolve(__dirname, '../src/content/blog');
const NEW_IMAGES = resolve(__dirname, '../public/images/blog');

// ── Category mapping (WordPress → our slugs) ──
const CATEGORY_MAP: Record<string, string> = {
	'Business': 'business',
	'Community': 'community',
	'Company news': 'company',
	'Events': 'events',
	'Guides': 'guides',
	'Solutions': 'solutions',
	'Tech': 'tech',
	'Updates': 'updates',
	'Use cases': 'use-cases',
	'Use Cases': 'use-cases',
};

// ── Author mapping (WordPress display name → our slug) ──
const AUTHOR_MAP: Record<string, string> = {
	'PR Team': 'alex-doan',
	'PR team': 'alex-doan',
	'Alex Doan': 'alex-doan',
	'Anastasia Antoniuk': 'anastasia-antoniuk',
	'Andrew Shvaika': 'andrew-shvaika',
	'Andrii Ponomarov': 'andrii-ponomarov',
	'Andrii Zaiko': 'andrii-zaiko',
	'Daria Shevchenko': 'daria-shevchenko',
	'Dima Landiak': 'dlandiak',
	'Dmytro Shvaika': 'dmytro-shvaika',
	'Iryna Kheroim': 'iryna-kheroim',
	'Iryna Matveieva': 'iryna-matveieva',
	'Vitaliy Paromskiy': 'marichka-kovalyk',
	'Mariia Naida': 'mariia-naida',
	'Maryna Zakharchenko': 'maryna',
	'Valeriia Koriavikova': 'valeriia-koriavikova',
	'Volodymyr Babak': 'volodymyr-babak',
	'Yevheniia Havrysh': 'yevheniia-havrysh',
	'Yevheniia Mala': 'yevheniia-mala',
};

interface PostMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
	updatedDate?: string;
	author: string;
	categories: string[];
	featuredImage: string;
	featuredImageAlt: string;
	_originalImageUrl: string;
}

// ── Find all post directories ──
function getPostSlugs(): string[] {
	const dirs = readdirSync(OLD_BLOG, { withFileTypes: true });
	const exclude = new Set(['wp-content', 'wp-includes', 'wp-admin', 'wp-json',
		'feed', 'page', 'author', 'category', 'xmlrpc.php', 'index.html']);

	return dirs
		.filter((d: { isDirectory: () => boolean; name: string }) => {
			if (!d.isDirectory()) return false;
			if (exclude.has(d.name)) return false;
			if (/^20\d{2}$/.test(d.name)) return false; // year archives
			// Must have index.html
			return existsSync(join(OLD_BLOG, d.name, 'index.html'));
		})
		.map((d: { name: string }) => d.name);
}

// ── Extract metadata from JSON-LD + meta tags ──
function extractMeta(slug: string, $: cheerio.CheerioAPI): PostMeta {
	// Parse JSON-LD
	let jsonLd: any = {};
	const ldScript = $('script.aioseo-schema').html();
	if (ldScript) {
		try {
			const parsed = JSON.parse(ldScript);
			const graph = parsed['@graph'] || [];
			jsonLd = graph.find((n: any) => n['@type'] === 'BlogPosting') || {};
		} catch { /* ignore parse errors */ }
	}

	// Title — from JSON-LD headline, fallback to og:title, then <title>
	let title = jsonLd.headline
		|| $('meta[property="og:title"]').attr('content')
		|| $('title').text();
	// Clean up " - Thingsboard's blog" suffix
	title = title.replace(/\s*[-–—]\s*Thingsboard'?s?\s*blog.*$/i, '').trim();

	// Description
	const description = ($('meta[name="description"]').attr('content') || '')
		.replace(/^#\s*/, '') // Remove leading # from some descriptions
		.trim();

	// Dates
	const date = $('meta[property="article:published_time"]').attr('content') || '';
	const modified = $('meta[property="article:modified_time"]').attr('content') || '';
	const updatedDate = modified && modified !== date ? modified : undefined;

	// Author — from JSON-LD Person node
	let authorName = '';
	if (ldScript) {
		try {
			const parsed = JSON.parse(ldScript);
			const graph = parsed['@graph'] || [];
			const person = graph.find((n: any) => n['@type'] === 'Person');
			if (person) authorName = person.name || '';
		} catch { /* ignore */ }
	}
	if (!authorName) {
		authorName = $('meta[property="article:author"]').attr('content') || '';
	}
	const author = AUTHOR_MAP[authorName] || 'dlandiak';

	// Categories — from JSON-LD articleSection
	const rawCategories = jsonLd.articleSection || '';
	const categories = rawCategories
		.split(',')
		.map((c: string) => c.trim())
		.filter(Boolean)
		.map((c: string) => CATEGORY_MAP[c] || c.toLowerCase().replace(/\s+/g, '-'))
		.filter((c: string) => c);

	// Featured image
	const imageUrl = jsonLd.image?.url
		|| $('meta[property="og:image"]').attr('content')
		|| '';
	const imageAlt = jsonLd.image?.caption || title;

	// Rewrite image path
	const featuredImage = rewriteImagePath(imageUrl, slug, true);

	return {
		slug,
		title,
		_originalImageUrl: imageUrl, // keep for copying
		description: description.slice(0, 300), // Truncate long descriptions
		date: date ? new Date(date).toISOString().split('T')[0] : '2024-01-01',
		updatedDate: updatedDate ? new Date(updatedDate).toISOString().split('T')[0] : undefined,
		author,
		categories: categories.length > 0 ? categories : ['updates'],
		featuredImage,
		featuredImageAlt: imageAlt,
	};
}

// ── Image counter per slug for clean naming ──
const imageCounters = new Map<string, number>();

function getNextImageName(slug: string, originalName: string): string {
	const ext = originalName.match(/\.\w+$/)?.[0] || '.webp';
	const count = (imageCounters.get(slug) || 0) + 1;
	imageCounters.set(slug, count);
	return `image-${count}${ext}`;
}

// ── Rewrite image path to /images/blog/{slug}/{clean-name} ──
function rewriteImagePath(url: string, slug: string, isFeatured = false): string {
	if (!url) return `/images/blog/${slug}/cover.webp`;

	const ext = url.match(/\.\w+$/)?.[0] || '.webp';
	if (isFeatured) return `/images/blog/${slug}/cover${ext}`;

	// Extract original base name, strip WordPress size suffixes
	let baseName = url.split('/').pop() || 'image.webp';
	baseName = baseName.replace(/-\d+x\d+(\.\w+)$/, '$1'); // strip -1024x454
	baseName = baseName.replace(/-scaled(\.\w+)$/, '$1'); // strip -scaled

	return `/images/blog/${slug}/${baseName}`;
}

// ── Find the best source file for a WordPress image URL ──
function findBestSourceFile(srcPath: string): string | null {
	const cleaned = srcPath
		.replace(/^https?:\/\/wp\.thingsboard\.io/, '')
		.replace(/^\/blog\//, '');

	// Try exact path first
	const exact = join(OLD_BLOG, cleaned);
	if (existsSync(exact)) return exact;

	// Try without size suffix (get the -scaled or original)
	const withoutSize = cleaned.replace(/-\d+x\d+(\.\w+)$/, '$1');
	const scaledPath = withoutSize.replace(/(\.\w+)$/, '-scaled$1');

	for (const candidate of [
		join(OLD_BLOG, scaledPath),
		join(OLD_BLOG, withoutSize),
	]) {
		if (existsSync(candidate)) return candidate;
	}

	// Try with common large sizes
	const base = withoutSize.replace(/(\.\w+)$/, '');
	const extMatch = withoutSize.match(/(\.\w+)$/);
	const ext = extMatch ? extMatch[1] : '.webp';

	for (const size of ['1920', '1600', '1536', '1024']) {
		const sized = join(OLD_BLOG, `${base}-${size}x*${ext}`);
		// Simple glob - check common aspect ratios
		for (const height of ['1080', '900', '852', '768', '681', '576', '454', '288']) {
			const path = join(OLD_BLOG, cleaned.replace(/(\.\w+)$/, `-${size}x${height}$1`));
			if (existsSync(path)) return path;
		}
	}

	return null;
}

// ── Copy image file to new organized location ──
function copyImage(srcPath: string, slug: string, isFeatured = false): string {
	const newRelPath = rewriteImagePath(srcPath, slug, isFeatured);
	const newFile = join(NEW_IMAGES, slug, newRelPath.split('/').pop()!);

	const sourceFile = findBestSourceFile(srcPath);
	if (!sourceFile) return newRelPath;

	const dir = dirname(newFile);
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

	if (!existsSync(newFile)) {
		copyFileSync(sourceFile, newFile);
	}
	return newRelPath;
}

// ── Convert entry-content HTML to clean Markdown/MDX ──
function convertContent($: cheerio.CheerioAPI, slug: string): string {
	const content = $('.entry-content');
	if (!content.length) return '';

	const lines: string[] = [];
	const images: string[] = [];

	content.children().each((_, el) => {
		const $el = $(el);
		const block = convertBlock($, $el, slug, images);
		if (block !== null) {
			lines.push(block);
		}
	});

	// Copy all referenced images
	for (const img of images) {
		copyImage(img, slug);
	}

	let result = lines.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();

	// Escape curly braces outside of code fences and JSX tags to prevent MDX parse errors.
	// Split by code fences, only process non-code sections.
	result = escapeBracesOutsideCode(result);
	result = result.replace(/\n{3,}/g, '\n\n');

	return result.trim();
}

function convertBlock($: cheerio.CheerioAPI, $el: cheerio.Cheerio<cheerio.Element>, slug: string, images: string[]): string | null {
	const tag = $el.prop('tagName')?.toLowerCase() || '';
	const classes = $el.attr('class') || '';

	// Skip style, script, and WordPress custom CTA/button blocks
	if (tag === 'style' || tag === 'script' || tag === 'noscript') {
		return null;
	}

	// Skip WordPress button blocks and custom CTA sections
	if (classes.includes('wp-block-button') || classes.includes('wp-block-buttons')
		|| classes.includes('stk-button') || classes.includes('ai-custom')
		|| classes.includes('pt-btn') || classes.includes('ta-card')) {
		return null;
	}

	// Headings
	if (/^h[1-6]$/.test(tag)) {
		const level = parseInt(tag[1]);
		const text = cleanInlineHtml($, $el);
		if (!text.trim()) return null;
		return `${'#'.repeat(level)} ${text}`;
	}

	// Paragraphs
	if (tag === 'p') {
		const text = cleanInlineHtml($, $el);
		if (!text.trim()) return null;
		// Skip orphaned CTA button text (short lines that were button labels)
		const stripped = text.replace(/\[.*?\]\(.*?\)/g, '').trim();
		if (stripped.length < 30 && /^(Try|Sign up|Get started|Learn more|Read more|Apply|Subscribe|Download|Register|Join|Start|US Cloud|EU Cloud|View|Watch|See|Explore)/i.test(stripped)) {
			return null;
		}
		return text;
	}

	// Images (figure.wp-block-image)
	if (tag === 'figure' && classes.includes('wp-block-image')) {
		const img = $el.find('img');
		const src = getBestImageSrc(img);
		const alt = img.attr('alt') || '';
		const caption = $el.find('figcaption').text().trim();

		if (src) {
			images.push(src);
			const newSrc = rewriteImagePath(src, slug);
			if (caption) {
				return `![${alt}](${newSrc})\n*${caption}*`;
			}
			return `![${alt}](${newSrc})`;
		}
		return null;
	}

	// Code blocks
	if (tag === 'pre' && classes.includes('wp-block-code')) {
		const code = $el.find('code');
		const lang = detectCodeLanguage(code.attr('class') || '', code.text());
		const text = code.text().trim();
		return `\`\`\`${lang}\n${text}\n\`\`\``;
	}

	// Lists
	if (tag === 'ul' || tag === 'ol') {
		return convertList($, $el, tag === 'ol');
	}

	// Blockquote
	if (tag === 'blockquote') {
		const text = $el.find('p').map((_, p) => $(p).text().trim()).get().join('\n');
		return text.split('\n').map((l: string) => `> ${l}`).join('\n');
	}

	// Separator / HR
	if (tag === 'hr' || classes.includes('wp-block-separator')) {
		return '---';
	}

	// wp-block-group — recurse into children
	if (classes.includes('wp-block-group')) {
		const innerContainer = $el.find('.wp-block-group__inner-container');
		const target = innerContainer.length ? innerContainer : $el;
		const childBlocks: string[] = [];
		target.children().each((_, child) => {
			const block = convertBlock($, $(child), slug, images);
			if (block !== null) childBlocks.push(block);
		});
		return childBlocks.join('\n\n');
	}

	// wp-block-columns — flatten to sequential content
	if (classes.includes('wp-block-columns')) {
		const childBlocks: string[] = [];
		$el.find('.wp-block-column').each((_, col) => {
			$(col).children().each((_, child) => {
				const block = convertBlock($, $(child), slug, images);
				if (block !== null) childBlocks.push(block);
			});
		});
		return childBlocks.join('\n\n');
	}

	// YouTube embeds
	if (classes.includes('wp-block-embed') && (classes.includes('youtube') || $el.find('iframe[src*="youtube"]').length)) {
		const iframe = $el.find('iframe');
		const src = iframe.attr('src') || '';
		const match = src.match(/embed\/([a-zA-Z0-9_-]+)/);
		if (match) {
			return `<iframe width="100%" style="aspect-ratio:16/9" src="https://www.youtube.com/embed/${match[1]}" frameborder="0" allowfullscreen></iframe>`;
		}
	}

	// Tables
	if (tag === 'figure' && classes.includes('wp-block-table')) {
		return convertTable($, $el);
	}
	if (tag === 'table') {
		return convertTable($, $el);
	}

	// Generic div — try to recurse
	if (tag === 'div') {
		const childBlocks: string[] = [];
		$el.children().each((_, child) => {
			const block = convertBlock($, $(child), slug, images);
			if (block !== null) childBlocks.push(block);
		});
		if (childBlocks.length > 0) return childBlocks.join('\n\n');

		// If no structured children, try plain text
		const text = $el.text().trim();
		if (text) return text;
	}

	// Fallback: extract text if any
	const text = $el.text().trim();
	if (text && text.length > 10) return text;

	return null;
}

// ── Escape braces outside code fences ──
function escapeBracesOutsideCode(text: string): string {
	const lines = text.split('\n');
	const result: string[] = [];
	let inCodeFence = false;

	for (const line of lines) {
		if (line.startsWith('```')) {
			inCodeFence = !inCodeFence;
			result.push(line);
			continue;
		}

		if (inCodeFence) {
			result.push(line);
			continue;
		}

		// Skip lines that are JSX component tags (BlogImage, YouTubeVideo, etc.)
		if (/^\s*<[A-Z]/.test(line)) {
			result.push(line);
			continue;
		}

		// Escape { and } with backslash for MDX
		// But preserve markdown link syntax [text](url) and inline code `{}`
		let escaped = line;
		// Temporarily protect inline code
		const codeSpans: string[] = [];
		escaped = escaped.replace(/`[^`]+`/g, (match) => {
			codeSpans.push(match);
			return `__CODE_SPAN_${codeSpans.length - 1}__`;
		});

		escaped = escaped.replace(/\{/g, '\\{').replace(/\}/g, '\\}');

		// Restore inline code
		codeSpans.forEach((span, i) => {
			escaped = escaped.replace(`__CODE_SPAN_${i}__`, span);
		});

		result.push(escaped);
	}

	return result.join('\n');
}

// ── Helpers ──

function cleanInlineHtml($: cheerio.CheerioAPI, $el: cheerio.Cheerio<cheerio.Element>): string {
	let html = $el.html() || '';

	// Convert inline elements
	html = html
		.replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
		.replace(/<b>(.*?)<\/b>/gi, '**$1**')
		.replace(/<em>(.*?)<\/em>/gi, '*$1*')
		.replace(/<i>(.*?)<\/i>/gi, '*$1*')
		.replace(/<code>(.*?)<\/code>/gi, '`$1`')
		.replace(/<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<mark[^>]*>(.*?)<\/mark>/gi, '$1')
		.replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
		.replace(/<sup>(.*?)<\/sup>/gi, '$1')
		.replace(/<sub>(.*?)<\/sub>/gi, '$1')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/<\/?[^>]+>/g, '') // Strip remaining tags
		.trim();

	return html;
}

function getBestImageSrc(img: cheerio.Cheerio<cheerio.Element>): string {
	// Get the largest image from srcset, or fallback to src
	const srcset = img.attr('srcset') || '';
	if (srcset) {
		const sources = srcset.split(',').map(s => {
			const parts = s.trim().split(/\s+/);
			const url = parts[0];
			const width = parseInt(parts[1]) || 0;
			return { url, width };
		});
		// Pick the largest that's ≤1920px, or the largest available
		const sorted = sources.sort((a, b) => b.width - a.width);
		const best = sorted[0]; // Always pick the largest available
		if (best) return best.url;
	}
	return img.attr('src') || '';
}

function convertList($: cheerio.CheerioAPI, $el: cheerio.Cheerio<cheerio.Element>, ordered: boolean): string {
	const items: string[] = [];
	$el.children('li').each((i, li) => {
		const text = cleanInlineHtml($, $(li));
		const prefix = ordered ? `${i + 1}.` : '-';
		items.push(`${prefix} ${text}`);
	});
	return items.join('\n');
}

function convertTable($: cheerio.CheerioAPI, $el: cheerio.Cheerio<cheerio.Element>): string {
	const table = $el.is('table') ? $el : $el.find('table');
	if (!table.length) return '';

	const rows: string[][] = [];
	table.find('tr').each((_, tr) => {
		const cells: string[] = [];
		$(tr).find('th, td').each((_, cell) => {
			cells.push($(cell).text().trim().replace(/\|/g, '\\|'));
		});
		rows.push(cells);
	});

	if (rows.length === 0) return '';

	const colCount = Math.max(...rows.map(r => r.length));
	const normalized = rows.map(r => {
		while (r.length < colCount) r.push('');
		return r;
	});

	const header = `| ${normalized[0].join(' | ')} |`;
	const separator = `| ${normalized[0].map(() => '---').join(' | ')} |`;
	const body = normalized.slice(1).map(r => `| ${r.join(' | ')} |`).join('\n');

	return `${header}\n${separator}\n${body}`;
}

function detectCodeLanguage(className: string, code: string): string {
	// Check class for language hints
	const match = className.match(/language-(\w+)/);
	if (match) return match[1];

	// Heuristic detection
	if (code.includes('function') || code.includes('const ') || code.includes('var ')) return 'javascript';
	if (code.includes('import ') && code.includes('from ')) return 'javascript';
	if (code.includes('{') && code.includes('}') && code.includes(':') && !code.includes('function')) return 'css';
	if (code.includes('curl ') || code.includes('#!/')) return 'bash';
	if (code.includes('SELECT ') || code.includes('INSERT ')) return 'sql';
	if (code.includes('<') && code.includes('>') && code.includes('/')) return 'html';
	if (code.includes('.tb-') || code.includes('background-color')) return 'css';

	return '';
}

function escapeAttr(str: string): string {
	return str.replace(/"/g, '\\"').replace(/\n/g, ' ');
}

// ── Generate frontmatter ──
function generateFrontmatter(meta: PostMeta): string {
	const lines = [
		'---',
		`title: '${meta.title.replace(/'/g, "''")}'`,
		`description: '${meta.description.replace(/'/g, "''")}'`,
		`date: ${meta.date}`,
	];
	if (meta.updatedDate) {
		lines.push(`updatedDate: ${meta.updatedDate}`);
	}
	lines.push(
		`author: ${meta.author}`,
		`categories: [${meta.categories.map(c => `'${c}'`).join(', ')}]`,
		`featuredImage: '${meta.featuredImage}'`,
		`featuredImageAlt: '${meta.featuredImageAlt.replace(/'/g, "''")}'`,
		`draft: false`,
		'---',
	);
	return lines.join('\n');
}

// ── Process a single post ──
function processPost(slug: string, dryRun: boolean): { slug: string; ok: boolean; error?: string } {
	const htmlPath = join(OLD_BLOG, slug, 'index.html');
	if (!existsSync(htmlPath)) {
		return { slug, ok: false, error: 'index.html not found' };
	}

	try {
		const html = readFileSync(htmlPath, 'utf-8');
		const $ = cheerio.load(html);

		const meta = extractMeta(slug, $);
		const content = convertContent($, slug);

		if (!content) {
			return { slug, ok: false, error: 'No content extracted' };
		}

		const frontmatter = generateFrontmatter(meta);
		const mdx = `${frontmatter}\n\n${content}\n`;

		if (dryRun) {
			console.log(`\n── ${slug} ──`);
			console.log(`  Title: ${meta.title}`);
			console.log(`  Date: ${meta.date}`);
			console.log(`  Author: ${meta.author}`);
			console.log(`  Categories: ${meta.categories.join(', ')}`);
			console.log(`  Featured: ${meta.featuredImage}`);
			console.log(`  Content: ${content.length} chars, ${content.split('\n').length} lines`);
		} else {
			// Copy featured image
			if (meta._originalImageUrl) copyImage(meta._originalImageUrl, slug, true);

			// Write MDX
			if (!existsSync(NEW_CONTENT)) mkdirSync(NEW_CONTENT, { recursive: true });
			const mdxPath = join(NEW_CONTENT, `${slug}.mdx`);
			writeFileSync(mdxPath, mdx, 'utf-8');
			console.log(`  ✓ ${slug} (${content.length} chars)`);
		}

		return { slug, ok: true };
	} catch (err: any) {
		return { slug, ok: false, error: err.message };
	}
}

// ── Main ──
function main() {
	const args = process.argv.slice(2);
	const dryRun = args.includes('--dry-run');
	const specificSlug = args.find(a => !a.startsWith('--'));

	console.log(`Blog Extraction ${dryRun ? '(DRY RUN)' : ''}`);
	console.log(`Old blog: ${OLD_BLOG}`);
	console.log(`Output:   ${NEW_CONTENT}`);
	console.log(`Images:   ${NEW_IMAGES}`);
	console.log('');

	const slugs = specificSlug ? [specificSlug] : getPostSlugs();
	console.log(`Found ${slugs.length} posts\n`);

	let ok = 0;
	let fail = 0;
	const errors: { slug: string; error: string }[] = [];

	for (const slug of slugs.sort()) {
		const result = processPost(slug, dryRun);
		if (result.ok) {
			ok++;
		} else {
			fail++;
			errors.push({ slug, error: result.error || 'Unknown error' });
			console.error(`  ✗ ${slug}: ${result.error}`);
		}
	}

	console.log(`\nDone: ${ok} succeeded, ${fail} failed`);
	if (errors.length > 0) {
		console.log('\nFailed posts:');
		for (const e of errors) {
			console.log(`  - ${e.slug}: ${e.error}`);
		}
	}
}

main();
