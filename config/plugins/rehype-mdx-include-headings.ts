import type { Root } from 'hast';
import type { Plugin, Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';

const INCLUDES_ALIAS = '@includes/';
const INCLUDES_DIR = path.resolve(process.cwd(), 'src/content/_includes');

interface HeadingInfo {
	depth: number;
	slug: string;
	text: string;
}

function extractHeadingsFromMdx(content: string): HeadingInfo[] {
	const headings: HeadingInfo[] = [];
	const slugger = new GithubSlugger();
	const lines = content.split('\n');

	for (const line of lines) {
		const match = line.match(/^(#{1,6})\s+(.+)$/);
		if (match) {
			const depth = match[1].length;
			const text = match[2]
				.replace(/\*\*(.+?)\*\*/g, '$1')
				.replace(/\*(.+?)\*/g, '$1')
				.replace(/`(.+?)`/g, '$1')
				.replace(/\[(.+?)\]\(.+?\)/g, '$1')
				.trim();
			let slug = slugger.slug(text);
			if (slug.endsWith('-')) slug = slug.slice(0, -1);
			headings.push({ depth, slug, text });
		}
	}

	return headings;
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
				if (!source || !source.startsWith(INCLUDES_ALIAS) || !source.endsWith('.mdx'))
					continue;

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
					const headings = extractHeadingsFromMdx(content);
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
