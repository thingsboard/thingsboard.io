import type { Root } from 'hast';
import { h } from 'hastscript';
import type { Plugin, Transformer } from 'unified';
import { CONTINUE, EXIT, SKIP, visit } from 'unist-util-visit';

/**
 * Rehype plugin to enhance the output of GitHub-Flavored Markdown’s task lists.
 * This improves possibilities for our `<Checklist>` component.
 *
 * 1. Drops the list marker + indent so a checkbox isn't preceded by a “•”.
 * 2. Wraps checkboxes and siblings in a `<label>` to associate them.
 * 3. Wraps sibling nodes after checkboxes in `<span>` to ease styling `:checked ~ *`.
 */
export function rehypeTasklistEnhancer(): Plugin<[], Root> {
	const transformer: Transformer<Root> = (tree) => {
		// Find task list items.
		visit(tree, 'element', (node, _index, parent) => {
			if (
				!node.properties ||
				!Array.isArray(node.properties.className) ||
				!node.properties.className.includes('task-list-item')
			) {
				return CONTINUE;
			}
			// Strip the bullet from the task item and the indent from its list,
			// inline on the generated markup, so a checkbox isn't preceded by a
			// “•”. Inline styles win the cascade, so no global list-style override
			// is needed. The list's indent is zeroed once, on the parent <ul>.
			node.properties.style = appendStyle(node.properties.style, 'list-style: none');
			if (parent && parent.type === 'element' && parent.tagName === 'ul') {
				parent.properties ??= {};
				const cur = typeof parent.properties.style === 'string' ? parent.properties.style : '';
				if (!cur.includes('padding-inline-start')) {
					parent.properties.style = appendStyle(cur, 'padding-inline-start: 0');
				}
			}
			// Find checkboxes inside task list items.
			visit(node, 'element', (child, index, itemParent) => {
				if (child.tagName !== 'input' || typeof index !== 'number' || !itemParent) {
					return CONTINUE;
				}
				// Split children after checkbox.
				const [head, tail] = [
					itemParent.children.slice(0, index + 1),
					itemParent.children.slice(index + 1),
				];
				itemParent.children = [h('label', {}, ...head, h('span', {}, ...tail))];
				return EXIT;
			});
			return SKIP;
		});
	};

	return function attacher() {
		return transformer;
	};
}

/** Append a `prop: value` declaration to an existing inline style string. */
function appendStyle(existing: unknown, declaration: string): string {
	const current = typeof existing === 'string' ? existing.trim() : '';
	if (!current) return declaration;
	return current.endsWith(';') ? `${current} ${declaration}` : `${current}; ${declaration}`;
}
