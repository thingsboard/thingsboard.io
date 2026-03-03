import type { Root } from 'hast';
import type { Plugin, Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';

const INCLUDES_ALIAS = '@includes/';
const INCLUDES_DIR = path.resolve(process.cwd(), 'src/content/_includes');
const DOCS_CONTENT_DIR = 'src/content/docs/docs/';

interface HeadingInfo {
	depth: number;
	slug: string;
	text: string;
}

/**
 * Derive a short product id from the page file path.
 * Used to filter ConditionalHeading entries by product.
 */
function getProductFromFilePath(filePath: string): string {
	const normalized = filePath.replace(/\\/g, '/');
	const idx = normalized.indexOf(DOCS_CONTENT_DIR);
	if (idx === -1) return 'ce';

	const relative = normalized.slice(idx + DOCS_CONTENT_DIR.length);

	// Check more-specific prefixes first
	if (relative.startsWith('mqtt-broker/pe/')) return 'mqtt-broker-pe';
	if (relative.startsWith('mobile/pe/')) return 'mobile-pe';
	if (relative.startsWith('edge/pe/')) return 'edge-pe';
	if (relative.startsWith('paas/eu/')) return 'paas-eu';
	if (relative.startsWith('mqtt-broker/')) return 'mqtt-broker';
	if (relative.startsWith('mobile/')) return 'mobile';
	if (relative.startsWith('edge/')) return 'edge';
	if (relative.startsWith('paas/')) return 'paas';
	if (relative.startsWith('pe/')) return 'pe';
	if (relative.startsWith('trendz/')) return 'trendz';
	if (relative.startsWith('iot-gateway/')) return 'iot-gateway';
	if (relative.startsWith('license-server/')) return 'license-server';

	return 'ce';
}

function cleanHeadingText(raw: string): string {
	return raw
		.replace(/\*\*(.+?)\*\*/g, '$1')
		.replace(/\*(.+?)\*/g, '$1')
		.replace(/`(.+?)`/g, '$1')
		.replace(/\[(.+?)\]\(.+?\)/g, '$1')
		.trim();
}

/**
 * Extract headings from raw MDX include content, with two enhancements over a
 * simple line-by-line regex:
 *
 * 1. Markdown headings (### …) that appear inside JSX expression blocks { … }
 *    are skipped — they render as plain text and would produce broken TOC links.
 *
 * 2. <ConditionalHeading> component tags are parsed and included only when the
 *    page's product matches the tag's `exclude`/`showFor` attributes. The tag's
 *    `id` prop is used directly as the slug (matching the id rendered by the
 *    component).
 *
 * Headings are returned in document order.
 */
function extractHeadingsFromMdx(content: string, productId: string): HeadingInfo[] {
	const slugger = new GithubSlugger();
	const collected: Array<{ line: number; depth: number; text: string; useId?: string }> = [];

	// ── Phase 1: markdown headings outside JSX expression blocks ─────────────
	const lines = content.split('\n');
	let braceDepth = 0;
	let inCodeBlock = false;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Skip fenced code blocks entirely
		if (line.trimStart().startsWith('```')) {
			inCodeBlock = !inCodeBlock;
			continue;
		}
		if (inCodeBlock) continue;

		// Snapshot depth at the start of this line to determine whether we're
		// inside a JSX expression *before* this line's braces are counted.
		const isInsideJsx = braceDepth > 0;

		for (const char of line) {
			if (char === '{') braceDepth++;
			else if (char === '}') braceDepth = Math.max(0, braceDepth - 1);
		}

		if (!isInsideJsx) {
			const match = line.match(/^(#{1,6})\s+(.+)$/);
			if (match) {
				collected.push({
					line: i,
					depth: match[1].length,
					text: cleanHeadingText(match[2]),
				});
			}
		}
	}

	// ── Phase 2: <ConditionalHeading> elements (typically inside JSX blocks) ──
	// Supports single-line and multi-line content between the tags.
	const chRegex = /<ConditionalHeading([^>]*)>([\s\S]*?)<\/ConditionalHeading>/g;
	let chMatch: RegExpExecArray | null;

	while ((chMatch = chRegex.exec(content)) !== null) {
		const attrs = chMatch[1];
		const text = cleanHeadingText(chMatch[2]);

		// id is required — without it the TOC entry can't link anywhere
		const idMatch = attrs.match(/id="([^"]+)"/);
		if (!idMatch) continue;
		const useId = idMatch[1];

		// level={N} or level="N"
		const levelMatch = attrs.match(/level=\{?(\d)\}?/);
		const depth = levelMatch ? parseInt(levelMatch[1]) : 3;

		// exclude="ce" → skip for product 'ce'
		const excludeMatch = attrs.match(/exclude="([^"]+)"/);
		const excludeList = excludeMatch ? excludeMatch[1].split(',').map((s) => s.trim()) : [];

		// showFor="pe,paas" → only include for those products
		const showForMatch = attrs.match(/showFor="([^"]+)"/);
		const showForList = showForMatch ? showForMatch[1].split(',').map((s) => s.trim()) : null;

		if (excludeList.includes(productId)) continue;
		if (showForList !== null && !showForList.includes(productId)) continue;

		const lineNum = content.slice(0, chMatch.index).split('\n').length - 1;
		collected.push({ line: lineNum, depth, text, useId });
	}

	// ── Phase 3: sort by line number and produce final HeadingInfo list ───────
	collected.sort((a, b) => a.line - b.line);

	return collected.map(({ depth, text, useId }) => {
		let slug: string;
		if (useId) {
			slug = useId;
		} else {
			slug = slugger.slug(text);
			if (slug.endsWith('-')) slug = slug.slice(0, -1);
		}
		return { depth, slug, text };
	});
}

/**
 * Rehype plugin that extracts headings from imported MDX include files
 * and injects them into the parent page's heading collection at the
 * correct position (where the component appears relative to other headings).
 *
 * Works by intercepting the `file.data.astro.headings` setter via
 * Object.defineProperty, so when rehypeHeadingIds writes its collected
 * headings, the extra headings from includes are spliced in at the
 * right index.
 */
export function rehypeMdxIncludeHeadings(): Plugin<[], Root> {
	const transformer: Transformer<Root> = (tree, file) => {
		// Collect imports of @includes/*.mdx files
		const mdxImports = new Map<string, string>();

		visit(tree, 'mdxjsEsm', (node: any) => {
			const estree = node.data?.estree;
			if (!estree) return;

			for (const statement of estree.body) {
				if (statement.type !== 'ImportDeclaration') continue;
				const source = statement.source?.value;
				if (!source || !source.startsWith(INCLUDES_ALIAS) || !source.endsWith('.mdx')) continue;

				for (const spec of statement.specifiers) {
					if (spec.type === 'ImportDefaultSpecifier') {
						const relativePath = source.slice(INCLUDES_ALIAS.length);
						const fullPath = path.join(INCLUDES_DIR, relativePath);
						mdxImports.set(spec.local.name, fullPath);
					}
				}
			}
		});

		if (mdxImports.size === 0) return;

		const productId = getProductFromFilePath(file.path ?? '');

		// Single tree walk: count heading elements and track where
		// include components appear relative to them.
		// This mirrors the traversal order of rehypeHeadingIds (depth-first visit).
		const insertions: { afterIndex: number; headings: HeadingInfo[] }[] = [];
		let headingCount = 0;

		visit(tree, (node: any) => {
			// Count h1-h6 elements (same logic as rehypeHeadingIds)
			if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
				headingCount++;
			}

			// When we encounter an include component, record insert position
			if (node.type === 'mdxJsxFlowElement') {
				const filePath = mdxImports.get(node.name);
				if (!filePath) return;

				try {
					const content = fs.readFileSync(filePath, 'utf-8');
					const headings = extractHeadingsFromMdx(content, productId);
					if (headings.length > 0) {
						insertions.push({ afterIndex: headingCount, headings });
					}
				} catch {
					// File not found, skip
				}
			}
		});

		if (insertions.length === 0) return;

		// Intercept rehypeHeadingIds writing to file.data.astro.headings.
		// When it sets headings, splice in include headings at correct positions.
		const astroData: Record<string, any> = (file.data.astro ??= {});
		let _headings: any[] = astroData.headings ?? [];

		Object.defineProperty(astroData, 'headings', {
			get() {
				return _headings;
			},
			set(value: any[]) {
				const result = [...value];
				// Insert in reverse order so earlier splice indices stay valid
				for (let i = insertions.length - 1; i >= 0; i--) {
					const { afterIndex, headings } = insertions[i];
					result.splice(afterIndex, 0, ...headings);
				}
				_headings = result;
			},
			configurable: true,
			enumerable: true,
		});
	};

	return function attacher() {
		return transformer;
	};
}