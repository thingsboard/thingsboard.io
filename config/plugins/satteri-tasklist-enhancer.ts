import { defineHastPlugin } from 'satteri';

/**
 * ── Writing a Sätteri plugin ───────────────────────────────────────────────────────────
 *
 * Read this before adding another one. Sätteri is not remark/rehype, and four differences
 * each cost a build to discover:
 *
 * 1. A visitor's **return value is treated as replacement content**. Return nothing, or the
 *    build fails with `cannot encode replacement content into the structural op-stream` —
 *    an `array.push()` returning a number is enough to trigger it.
 * 2. The tree lives on the Rust side, so `node.children` cannot be assigned. Structural
 *    edits go through the context: `replaceNode`, `wrapNode`, `setProperty`, `appendChild`,
 *    `insertBefore`. Nodes handed to a visitor are readable, so build the replacement from
 *    what you read.
 * 3. Hooks are `(root, ctx)`, not `(ctx)`. Visitors may be `async` and are awaited — unlike
 *    unified, where async work has to be hoisted out of the walk.
 * 4. Plugins run as **sequential passes**, in registration order, and user plugins run
 *    *before* Astro's built-ins. Nothing of yours can observe the headings Astro collects;
 *    `satteri-mdx-include-headings.ts` documents the getter interception that works around
 *    it. Node types dispatched to one plugin — elements, `mdxJsxFlowElement`, `mdxjsEsm` —
 *    do arrive in document order, so position-dependent logic is safe.
 *
 * Export a plain plugin object for stateless work, or a factory `(ctx) => plugin` when you
 * need per-document state: Sätteri calls a factory once per compile, and returning
 * `undefined` from it leaves the plugin out of that document entirely.
 *
 * ──────────────────────────────────────────────────────────────────────────────────────
 *
 * Sätteri port of `rehype-tasklist-enhancer`. Enhances the output of GitHub-Flavored
 * Markdown's task lists so our `<Checklist>` component has something to style.
 *
 * 1. Drops the list marker + indent so a checkbox isn't preceded by a "•".
 * 2. Wraps checkboxes and siblings in a `<label>` to associate them.
 * 3. Wraps sibling nodes after checkboxes in `<span>` to ease styling `:checked ~ *`.
 *
 * Unlike the rehype original this cannot assign `parent.children` directly — Sätteri's
 * tree lives on the Rust side and edits go through the context as commands — so the
 * restructuring is expressed as a single `replaceNode` of the whole `<li>`.
 */

/** Append a `prop: value` declaration to an existing inline style string. */
function appendStyle(existing: unknown, declaration: string): string {
	const current = typeof existing === 'string' ? existing.trim() : '';
	if (!current) return declaration;
	return current.endsWith(';') ? `${current} ${declaration}` : `${current}; ${declaration}`;
}

function element(tagName: string, children: unknown[]) {
	return { type: 'element', tagName, properties: {}, children };
}

/**
 * Depth-first search for the element that directly holds the task checkbox.
 *
 * GFM wraps a *loose* list item's content in a `<p>`, so the `<input>` is not always a direct
 * child of the `<li>`. The rehype original located it with a recursive `visit()` and then
 * restructured the input's immediate parent; this reproduces that search.
 */
function findCheckboxContainer(node: any): any {
	for (const child of node.children ?? []) {
		if (child.type !== 'element') continue;
		if (child.tagName === 'input') return node;
		const found = findCheckboxContainer(child);
		if (found) return found;
	}
	return undefined;
}

/**
 * Loose task item: the checkbox lives inside a wrapper (`<p>`) rather than directly under the
 * `<li>`, so the wrapper is what gets the `<label>`/`<span>` treatment. The `<li>` itself only
 * needs its marker removed, which `setProperty` does without rebuilding the subtree —
 * rebuilding it on the JS side would risk perturbing nested attribute order.
 */
function enhanceLooseItem(node: any, ctx: any) {
	const container = findCheckboxContainer(node);
	if (!container) return;

	const children = container.children ?? [];
	const checkbox = children.findIndex((child: any) => child.type === 'element' && child.tagName === 'input');
	const head = children.slice(0, checkbox + 1);
	const tail = children.slice(checkbox + 1);

	ctx.setProperty(node, 'style', appendStyle(node.properties?.style, 'list-style: none'));
	ctx.replaceNode(container, {
		type: 'element',
		tagName: container.tagName,
		properties: container.properties ?? {},
		children: [element('label', [...head, element('span', tail)])],
	});
}

export const satteriTasklistEnhancer = defineHastPlugin({
	name: 'tasklist-enhancer',
	element: {
		filter: ['li'],
		visit(node: any, ctx: any) {
			const className = node.properties?.className;
			if (!Array.isArray(className) || !className.includes('task-list-item')) return;

			// Strip the bullet from the task item and the indent from its list, inline on the
			// generated markup, so a checkbox isn't preceded by a "•". Inline styles win the
			// cascade, so no global list-style override is needed. The list's indent is zeroed
			// once, on the parent <ul>.
			const parent = ctx.parent(node);
			if (parent?.tagName === 'ul') {
				const current = typeof parent.properties?.style === 'string' ? parent.properties.style : '';
				if (!current.includes('padding-inline-start')) {
					ctx.setProperty(parent, 'style', appendStyle(current, 'padding-inline-start: 0'));
				}
			}

			const children = node.children ?? [];
			const checkbox = children.findIndex((child: any) => child.type === 'element' && child.tagName === 'input');
			if (checkbox === -1) {
				// A loose list item wraps its content in a <p>, so the checkbox is one level down.
				// Bailing here would leave the <li> with its bullet while the <ul>'s indent is
				// already gone above, and drop the <label>/<span> the <Checklist> styling needs.
				enhanceLooseItem(node, ctx);
				return;
			}

			// Split children after the checkbox: everything up to and including it stays put,
			// everything after moves into the <span>.
			const head = children.slice(0, checkbox + 1);
			const tail = children.slice(checkbox + 1);

			ctx.replaceNode(node, {
				type: 'element',
				tagName: 'li',
				properties: {
					...node.properties,
					style: appendStyle(node.properties?.style, 'list-style: none'),
				},
				children: [element('label', [...head, element('span', tail)])],
			});
		},
	},
});
