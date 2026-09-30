import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import GithubSlugger from 'github-slugger';
import { defineHastPlugin } from 'satteri';
import { EDGE_UPGRADE_VERSIONS } from '../../src/models/edge-upgrade-instructions';

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
	if (relative.startsWith('iot-hub/')) return 'iot-hub';

	return 'ce';
}

/** Edge upgrade step component pattern — all three platform components share this suffix */
const EDGE_UPGRADE_STEPS_PATTERN = /Edge(?:Linux|Docker|Windows)UpgradeSteps\.astro/;

/**
 * Generate TOC headings for Edge upgrade step includes.
 * Called when the include file delegates to an Edge*UpgradeSteps Astro component.
 */
function generateEdgeUpgradeHeadings(productId: string, filterFamily?: string): HeadingInfo[] {
	const isPE = productId === 'edge-pe';
	const versions = filterFamily
		? EDGE_UPGRADE_VERSIONS.filter((v) => v.family === filterFamily)
		: EDGE_UPGRADE_VERSIONS;

	return versions.map((v) => {
		const text = v.patch
			? `Upgrading Edge${isPE ? ' PE' : ''} to latest ${v.baseVersion} (${v.displayVersion})`
			: `Upgrading Edge${isPE ? ' PE' : ''} to ${v.displayVersion}`;
		return { depth: 2, slug: v.anchor, text };
	});
}

function cleanHeadingText(raw: string): string {
	return (
		raw
			.replace(/\*\*(.+?)\*\*/g, '$1')
			.replace(/\*(.+?)\*/g, '$1')
			.replace(/`(.+?)`/g, '$1')
			.replace(/\[(.+?)\]\(.+?\)/g, '$1')
			// Strip JSX/HTML tags (e.g. <ProductBadge/>, <Badge text="…" />). Open tags
			// keep their inner text, self-closing tags vanish entirely.
			.replace(/<[^>]+\/>/g, '')
			.replace(/<[^>]+>([\s\S]*?)<\/[^>]+>/g, '$1')
			.replace(/\s+/g, ' ')
			.trim()
	);
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
function extractHeadingsFromMdx(content: string, productId: string, filterFamily?: string): HeadingInfo[] {
	// Short-circuit: if this include delegates to an Edge upgrade steps component,
	// generate headings from EDGE_UPGRADE_VERSIONS instead of parsing MDX.
	if (EDGE_UPGRADE_STEPS_PATTERN.test(content)) {
		return generateEdgeUpgradeHeadings(productId, filterFamily);
	}
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
			// Must match Astro's `heading-ids` plugin byte for byte: it sets the rendered
			// heading's id to `slugger.slug(text)` and nothing else. Trimming anything here
			// (a trailing `-`, say, which a heading like `Column width (px or %)` produces)
			// makes the TOC link to an anchor the page never renders.
			slug = slugger.slug(text);
		}
		return { depth, slug, text };
	});
}

/** Read a JSX attribute as a string, handling `id="x"` and `level={2}` alike. */
function getJsxAttr(node: any, name: string): string | undefined {
	for (const attr of node.attributes ?? []) {
		if (attr?.type !== 'mdxJsxAttribute' || attr.name !== name) continue;
		const value = attr.value;
		if (typeof value === 'string') return value;
		if (value && typeof value === 'object' && typeof value.value === 'string') return value.value;
	}
	return undefined;
}

/**
 * Sätteri port of `rehype-mdx-include-headings`: pulls headings out of imported MDX
 * include files and injects them into the page's heading list at the position the include
 * component occupies relative to the page's own headings.
 *
 * The parsing above is processor-independent — it reads the include from disk and runs a
 * regex over it — so only the traversal and the injection differ from the rehype original.
 *
 * **Injection.** Sätteri runs user plugins as a pass *before* Astro's `heading-ids` plugin,
 * so there is no point at which our code runs with the headings already collected; an
 * `after` hook sees an empty list. Astro's plugin assigns `astro.headings = headings` on
 * *every* heading it visits, so intercepting the setter — what the rehype version did —
 * loses the injection to the next assignment. `ctx.data.astro` is a plain JS object, so we
 * intercept the **getter** instead: the processor reads `data.astro.headings` exactly once,
 * at the end, and that read returns the merged list.
 *
 * This keeps a dependency on Astro internals, which is the honest cost — no deeper than
 * the rehype original's, but real: if Astro changes when or how `heading-ids` writes, the
 * TOC on every `_includes` page goes quietly wrong, and no existing check would say so.
 */
export function satteriMdxIncludeHeadings(factoryCtx: { fileURL?: URL | undefined }) {
	const filePath = factoryCtx.fileURL ? fileURLToPath(factoryCtx.fileURL) : '';
	const productId = getProductFromFilePath(filePath);

	/** local import name → absolute path of the `@includes/*.mdx` file */
	const mdxImports = new Map<string, string>();
	/** where each include's headings belong, as a count of real headings seen before it */
	const insertions: { afterIndex: number; headings: HeadingInfo[] }[] = [];
	let headingCount = 0;

	return defineHastPlugin({
		name: 'mdx-include-headings',

		before(_root: any, ctx: any) {
			const astro = ctx.data?.astro;
			if (!astro) return;
			let real: HeadingInfo[] = astro.headings ?? [];
			Object.defineProperty(astro, 'headings', {
				get() {
					if (!insertions.length) return real;
					const merged = [...real];
					// Splice from the back so earlier indices stay valid.
					for (let i = insertions.length - 1; i >= 0; i--) {
						merged.splice(insertions[i].afterIndex, 0, ...insertions[i].headings);
					}
					return merged;
				},
				set(value: HeadingInfo[]) {
					real = value;
				},
				configurable: true,
			});
		},

		// Imports sit at the top of the document, so document order guarantees these are
		// collected before any component that uses them is visited.
		mdxjsEsm(node: any) {
			const program = node.parseExpression?.();
			for (const statement of program?.body ?? []) {
				if (statement.type !== 'ImportDeclaration') continue;
				const source = statement.source?.value;
				if (typeof source !== 'string') continue;
				if (!source.startsWith(INCLUDES_ALIAS) || !source.endsWith('.mdx')) continue;
				for (const spec of statement.specifiers ?? []) {
					if (spec.type === 'ImportDefaultSpecifier') {
						mdxImports.set(spec.local.name, path.join(INCLUDES_DIR, source.slice(INCLUDES_ALIAS.length)));
					}
				}
			}
		},

		// Counts the page's own headings. Must match what Astro's heading-ids plugin
		// collects, which is every `<h1>`-`<h6>` element, so the splice index lines up.
		element: {
			filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
			visit() {
				headingCount++;
			},
		},

		mdxJsxFlowElement: {
			filter: [],
			visit(node: any) {
				const includePath = mdxImports.get(node.name);
				if (!includePath) return;
				// `family="4.3"` narrows Edge upgrade includes to one release family.
				const filterFamily = getJsxAttr(node, 'family');
				try {
					const content = fs.readFileSync(includePath, 'utf-8');
					const headings = extractHeadingsFromMdx(content, productId, filterFamily);
					if (headings.length) insertions.push({ afterIndex: headingCount, headings });
				} catch {
					// Include missing or unreadable — leave the TOC as the page itself produced it.
				}
			},
		},
	});
}
