/**
 * Expressive Code plugin with two independent meta options:
 *
 *   maxLines=N    — limits the visible height to N lines with a scrollbar
 *   collapsible   — adds an Expand / Collapse button (requires maxLines)
 *   wrap          — wraps long lines instead of horizontal scroll; copy is unaffected
 *
 * Usage examples:
 *   ```js maxLines=15
 *   ```                          ← height-limited + scrollable, no button
 *
 *   ```js maxLines=15 collapsible
 *   ```                          ← height-limited + scrollable + Expand/Collapse button
 *
 *   ```bash wrap
 *   ```                          ← long lines wrap; copy copies original text unchanged
 *
 * Notes on HAST conventions:
 *   - Classes → properties.className (array), NOT properties.class
 *   - Data attrs → camelCase: dataMaxLines → data-max-lines in HTML → el.dataset.maxLines in JS
 *
 * Plugin hook order (built-ins run first):
 *   pluginShiki → pluginTextMarkers → pluginFrames (wraps blockAst in <figure.frame>)
 *   → pluginCollapsibleSections → pluginMaxLines  ← our hook sees the final <figure>
 */

type HastElement = {
	type: 'element';
	tagName: string;
	properties: Record<string, unknown>;
	children: unknown[];
};

type EcPlugin = {
	name: string;
	baseStyles?: string;
	jsModules?: string[];
	hooks?: {
		postprocessRenderedBlock?: (ctx: {
			codeBlock: {
				code: string;
				metaOptions: {
					getInteger(key: string): number | undefined;
					getBoolean(key: string): boolean | undefined;
				};
			};
			renderData: { blockAst: HastElement };
		}) => void;
	};
};

function appendClassName(node: HastElement, name: string): void {
	const existing = node.properties.className;
	const list: string[] = Array.isArray(existing)
		? existing.map(String)
		: existing
			? [String(existing)]
			: [];
	if (!list.includes(name)) list.push(name);
	node.properties.className = list;
}

export function pluginMaxLines(): EcPlugin {
	return {
		name: 'Max Lines',

		baseStyles: `
			/* maxLines: height-limited scrollable block */
			.ec-max-lines pre {
				overflow-y: auto;
			}

			/* collapsible: expand/collapse button */
			.ec-expand-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 0.35em;
				width: 100%;
				padding: 0.4rem 0;
				background: transparent;
				border: none;
				border-top: 1px solid rgba(128, 128, 128, 0.2);
				color: inherit;
				opacity: 0.55;
				font-size: 0.75rem;
				font-family: inherit;
				letter-spacing: 0.04em;
				cursor: pointer;
				transition: opacity 0.15s;
			}
			.ec-expand-btn:hover,
			.ec-expand-btn:focus-visible {
				opacity: 0.9;
				outline: none;
			}
		`,

		jsModules: [
			`
			function initMaxLines() {
				document.querySelectorAll('.ec-max-lines[data-max-lines]').forEach((el) => {
					if (el.dataset.mlInit) return;
					el.dataset.mlInit = '1';

					const maxLines = parseInt(el.dataset.maxLines, 10);
					const pre = el.querySelector('pre');
					if (!pre) return;

					const firstLine = pre.querySelector('.ec-line');
					const lineH = firstLine ? firstLine.getBoundingClientRect().height : 20;
					const maxH = Math.round(maxLines * lineH);

					if (pre.scrollHeight <= maxH + lineH) return;

					pre.style.maxHeight = maxH + 'px';

					// Expand/Collapse button — only when the collapsible attribute is set
					if (!el.classList.contains('ec-collapsible')) return;

					const btn = document.createElement('button');
					btn.className = 'ec-expand-btn';
					btn.setAttribute('type', 'button');
					btn.setAttribute('aria-expanded', 'false');
					btn.innerHTML = '&#9660;&nbsp;Expand';
					el.appendChild(btn);

					btn.addEventListener('click', () => {
						const expanded = el.classList.toggle('is-expanded');
						if (expanded) {
							pre.style.maxHeight = '';
							btn.setAttribute('aria-expanded', 'true');
							btn.innerHTML = '&#9650;&nbsp;Collapse';
						} else {
							pre.style.maxHeight = maxH + 'px';
							btn.setAttribute('aria-expanded', 'false');
							btn.innerHTML = '&#9660;&nbsp;Expand';
							el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
						}
					});
				});
			}

			initMaxLines();
			document.addEventListener('astro:page-load', initMaxLines);
			`,
		],

		hooks: {
			postprocessRenderedBlock: ({ codeBlock, renderData }) => {
				const maxLines = codeBlock.metaOptions.getInteger('maxLines');
				if (!maxLines) return;

				const lineCount = codeBlock.code.split('\n').length;
				if (lineCount <= maxLines) return;

				appendClassName(renderData.blockAst, 'ec-max-lines');
				renderData.blockAst.properties['dataMaxLines'] = maxLines;

				// collapsible is a boolean flag — adds the Expand/Collapse button
				const collapsible = codeBlock.metaOptions.getBoolean('collapsible');
				if (collapsible) {
					appendClassName(renderData.blockAst, 'ec-collapsible');
				}
			},
		},
	};
}

export function pluginWrap(): EcPlugin {
	return {
		name: 'Wrap',

		baseStyles: `
			/* wrap: long lines wrap instead of scrolling horizontally */
			.ec-wrap pre {
				white-space: pre-wrap;
				overflow-wrap: anywhere;
			}
			.ec-wrap .ec-line {
				white-space: pre-wrap;
				word-break: break-word;
			}
		`,

		hooks: {
			postprocessRenderedBlock: ({ codeBlock, renderData }) => {
				const wrap = codeBlock.metaOptions.getBoolean('wrap');
				if (wrap) {
					appendClassName(renderData.blockAst, 'ec-wrap');
				}
			},
		},
	};
}
