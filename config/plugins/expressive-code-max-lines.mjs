/**
 * Expressive Code plugin with independent meta options:
 *
 *   maxLines=N          — limits the visible height to N lines with a scrollbar
 *   collapsible         — adds an Expand / Collapse button (requires maxLines)
 *   wrap                — wraps long lines instead of horizontal scroll; copy is unaffected
 *   download='file.ext' — adds a download button (Tabler icon) next to the copy button
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
 *   ```json download='config.json'
 *   ```                          ← download button appears next to the copy button
 *
 * maxLines clamps height from EC's own type tokens via calc(), and the
 * Expand button is rendered into the HAST — so nothing measures layout at
 * runtime and blocks inside still-hidden tab panels are already correct.
 *
 * Two mechanisms hide overflow, and which one is load-bearing depends on the
 * block. With `collapsible`, the lines past the cap sit in a hidden wrapper and
 * are out of layout entirely, so the clamp and `overflow-y` are inert until the
 * user expands — such a block is no longer scroll-to-read. Without it, the
 * clamp is the only thing hiding anything and the block stays scrollable.
 *
 * The line budget travels as the --tb-ec-max-lines custom property, not a data
 * attribute: the clamp is pure CSS and nothing reads it back.
 *
 * Notes on HAST conventions:
 *   - Classes → properties.className (array), NOT properties.class
 *   - Data attrs → camelCase: dataEcDownload → data-ec-download in HTML
 *
 * Plugin hook order (built-ins run first):
 *   pluginShiki → pluginTextMarkers → pluginFrames (wraps blockAst in <figure.frame>)
 *   → pluginCollapsibleSections → pluginMaxLines  ← our hook sees the final <figure>
 */

function appendClassName(node, name) {
	const existing = node.properties.className;
	const list = Array.isArray(existing)
		? existing.map(String)
		: existing
			? [String(existing)]
			: [];
	if (!list.includes(name)) list.push(name);
	node.properties.className = list;
}

function appendStyle(node, decl) {
	const existing = node.properties.style;
	node.properties.style = existing ? String(existing).replace(/;\s*$/, '') + ';' + decl : decl;
}

/** figure > pre > code — the element whose children are the .ec-line divs. */
function findCodeEl(blockAst) {
	const pre = blockAst.children.find((c) => c.type === 'element' && c.tagName === 'pre');
	const code = pre?.children.find((c) => c.type === 'element' && c.tagName === 'code');
	return code ?? null;
}

/**
 * Move every line past `maxLines` into a `hidden="until-found"` wrapper so the
 * browser skips styling and laying them out. Supporting browsers still find
 * them with in-page search and reveal them automatically; the Expand button
 * clears the attribute for everyone else.
 *
 * Returns whether a wrapper was created — the caller skips the button if not.
 */
function hideOverflowLines(blockAst, maxLines) {
	const code = findCodeEl(blockAst);
	if (!code) return false;

	// Descendants, not element children: pluginCollapsibleSections runs first and
	// wraps ranges in <details>. The split boundary below is still a top-level
	// index, so it can't land inside one — unreached, nothing uses `collapse=`.
	const countEcLines = (node) => {
		if (node.type !== 'element') return 0;
		const cls = node.properties?.className;
		const list = Array.isArray(cls) ? cls.map(String) : cls ? [String(cls)] : [];
		if (list.includes('ec-line')) return 1;
		return (node.children ?? []).reduce((n, c) => n + countEcLines(c), 0);
	};

	let seen = 0;
	let splitAt = -1;
	for (let i = 0; i < code.children.length; i++) {
		seen += countEcLines(code.children[i]);
		if (seen >= maxLines) {
			splitAt = i + 1;
			break;
		}
	}
	if (splitAt < 0 || splitAt >= code.children.length) return false;

	const overflow = code.children.splice(splitAt);
	if (!overflow.some((c) => countEcLines(c) > 0)) {
		// Nothing but whitespace past the cap — put it back untouched.
		code.children.push(...overflow);
		return false;
	}

	code.children.push({
		type: 'element',
		tagName: 'div',
		properties: { className: ['ec-overflow'], hidden: 'until-found' },
		children: overflow,
	});
	return true;
}

export function pluginMaxLines() {
	return {
		name: 'Max Lines',

		baseStyles: `
			/* maxLines: height-limited scrollable block.
			   Height comes from EC's own type tokens rather than a measured
			   line box, so no JS ever reads layout. --ec-codeLineHt is a
			   unitless multiplier, --ec-codeFontSize a length. */
			.ec-max-lines pre {
				overflow-y: auto;
				/* EC puts padding on 'pre > code', not on 'pre', so the clamp adds
				   it back or the last visible line is cut mid-glyph.
				   The --ec-* names are EC 0.42.0 internals; the fallbacks matter
				   because an unresolvable var() drops max-height entirely. They
				   mirror Starlight's overrides, NOT @expressive-code/core's
				   defaults — core's 1.65/0.85rem would clamp ~8% short per line. */
				max-height: calc(
					var(--ec-codeLineHt, 1.75) * var(--ec-codeFontSize, 0.875rem) *
						var(--tb-ec-max-lines) + 2 * var(--ec-codePadBlk, 0.75rem)
				);
			}

			/* EC clears room for the copy button with
			   ':nth-child(1 of .ec-line) .code'. That matches within any parent,
			   so the first line inside the overflow wrapper picks it up too once
			   expanded — an early wrap under 'wrap', extra scroll width without. */
			.ec-overflow > .ec-line:first-child .code {
				padding-inline-end: var(--ec-codePadInl, 1rem);
			}

			.ec-max-lines.is-expanded pre {
				max-height: none;
			}

			/* [hidden] would collapse the wrapper to 'display: none', dropping the
			   lines out of in-page search. Render it and let the clamp hide them. */
			.ec-overflow[hidden] {
				display: block;
			}

			/* Re-declared because EC resets every descendant of .expressive-code
			   with 'all: revert', discarding the UA sheet's content-visibility for
			   [hidden="until-found"] — without this the lines stay in layout.

			   Gated on .tb-until-found (set from jsModules below) because this
			   selector matches an attribute present in every browser: where the
			   value is unsupported, skipping layout would also make the lines
			   unfindable, leaving Expand as the only way in.

			   'html' is required, not stylistic: EC scopes baseStyles under
			   '.expressive-code' and only un-scopes selectors containing :root,
			   html or body. */
			html.tb-until-found .ec-overflow[hidden='until-found'] {
				content-visibility: hidden;
			}

			/* With the overflow lines out of layout there is nothing left to scroll,
			   and the clamp turns harmful: max-height is border-box, so the pre's
			   border and any horizontal scrollbar eat into the very lines it was
			   sized for — 15 lines became 14.3 on a block with long lines. Dropping
			   it lets the block size itself to exactly maxLines, with the scrollbar
			   added outside rather than taken out of the text. Scoped to blocks that
			   really have a hidden wrapper, so non-collapsible ones keep the clamp
			   they still need to scroll. */
			html.tb-until-found .ec-max-lines.ec-collapsible pre {
				max-height: none;
			}

			/* Hide the default browser scrollbar-corner box where the
			   horizontal and vertical scrollbar tracks meet — without this
			   it renders as a white square in the bottom-right of the block. */
			.ec-max-lines pre::-webkit-scrollbar-corner {
				background: transparent;
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
			// Delegated listeners only: there is no per-block init pass, so blocks
			// inside tab panels that are still hidden are already correct.
			if (!window.__ecMaxLinesInit) {
				window.__ecMaxLinesInit = true;

				// Gates the content-visibility rule in baseStyles. onbeforematch is the
				// proxy for hidden="until-found" support, which is an HTML attribute
				// behaviour that @supports cannot test. Landing after first paint costs
				// no layout shift — the clamp pins the pre's height either way.
				if ('onbeforematch' in document.documentElement)
					document.documentElement.classList.add('tb-until-found');

				// The class lifts the clamp, the attribute reveals the lines, the button
				// describes the result — all three move together, from here or beforematch.
				const setExpanded = (el, expanded) => {
					el.classList.toggle('is-expanded', expanded);

					const btn = el.querySelector('.ec-expand-btn');
					if (btn) {
						btn.setAttribute('aria-expanded', String(expanded));
						const glyph = btn.querySelector('.ec-expand-btn__glyph');
						const label = btn.querySelector('.ec-expand-btn__label');
						if (glyph) glyph.textContent = expanded ? '\\u25B2' : '\\u25BC';
						if (label) label.textContent = expanded ? 'Collapse' : 'Expand';
					}

					const overflow = el.querySelector('.ec-overflow');
					if (overflow) {
						if (expanded) overflow.removeAttribute('hidden');
						else overflow.setAttribute('hidden', 'until-found');
					}
				};

				document.addEventListener('click', (e) => {
					const btn = e.target instanceof Element && e.target.closest('.ec-expand-btn');
					if (!btn) return;

					const el = btn.closest('.ec-max-lines');
					if (!el) return;

					const expanded = !el.classList.contains('is-expanded');
					setExpanded(el, expanded);
					if (!expanded) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
				});

				// Find-in-page drops the attribute itself; without this the lines would
				// show while the button still read "Expand". beforematch bubbles.
				document.addEventListener('beforematch', (e) => {
					const overflow = e.target instanceof Element && e.target.closest('.ec-overflow');
					if (!overflow) return;

					const el = overflow.closest('.ec-max-lines');
					if (el) setExpanded(el, true);
				});
			}
			`,
		],

		hooks: {
			postprocessRenderedBlock: ({ codeBlock, renderData }) => {
				const maxLines = codeBlock.metaOptions.getInteger('maxLines');
				if (!maxLines) return;

				const sourceLineCount = codeBlock.code.split('\n').length;
				if (sourceLineCount <= maxLines) return;

				const blockAst = renderData.blockAst;
				appendClassName(blockAst, 'ec-max-lines');
				appendStyle(blockAst, '--tb-ec-max-lines:' + maxLines);

				// collapsible is a boolean flag — adds the Expand/Collapse button.
				// Without it the block is merely scrollable, so the overflow lines
				// must stay rendered or scrolling would reveal nothing.
				const collapsible = codeBlock.metaOptions.getBoolean('collapsible');
				if (!collapsible) return;

				// No wrapper means nothing to reveal — the clamp alone hides the tail.
				if (!hideOverflowLines(blockAst, maxLines)) return;

				// Marks "has a hidden wrapper and a button", which is what lets the
				// max-height override in baseStyles drop the clamp.
				appendClassName(blockAst, 'ec-collapsible');

				// Rendered here rather than injected on load, so it is present at
				// first paint and costs no post-parse layout.
				blockAst.children.push({
					type: 'element',
					tagName: 'button',
					properties: {
						type: 'button',
						className: ['ec-expand-btn'],
						ariaExpanded: 'false',
					},
					// Glyph and word as separate spans: one representation shared with the
					// runtime toggle, and it lets the button's flex gap do its job rather
					// than relying on a non-breaking space.
					children: [
						{
							type: 'element',
							tagName: 'span',
							properties: { className: ['ec-expand-btn__glyph'], ariaHidden: 'true' },
							children: [{ type: 'text', value: '▼' }],
						},
						{
							type: 'element',
							tagName: 'span',
							properties: { className: ['ec-expand-btn__label'] },
							children: [{ type: 'text', value: 'Expand' }],
						},
					],
				});
			},
		},
	};
}

export function pluginDownload() {
	return {
		name: 'Download',

		baseStyles: `
			/* download: button sits inside .copy alongside the EC copy button */
			.ec-download-btn {
				position: relative;
				align-self: flex-end;
				margin: 0;
				padding: 0;
				border: 0;
				background: transparent;
				color: inherit;
				cursor: pointer;
				/* size matches EC copy button */
				width: 2rem;
				height: 2rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			/* EC uses button::after with mask-image for the copy icon —
			   suppress it on the download button so only the SVG shows */
			.ec-download-btn::after {
				content: none !important;
			}
			.ec-download-btn svg {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				padding: 0.4rem;
				box-sizing: border-box;
				pointer-events: none;
			}
			/* EC already reveals .copy button on frame hover via its own CSS */
		`,

		jsModules: [
			`
			// Guard against double-registration if the module is ever evaluated twice.
			if (!window.__ecDownloadInit) {
				window.__ecDownloadInit = true;

				const EC_DL_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"/><polyline points="7 11 12 16 17 11"/><line x1="12" y1="4" x2="12" y2="16"/></svg>';

				function initDownload() {
					document.querySelectorAll('figure[data-ec-download]').forEach((fig) => {
						if (fig.dataset.dlInit) return;

						const filename = fig.dataset.ecDownload;
						if (!filename) return;

						// EC copy button: button[data-code] inside div.copy inside the figure
						const copyBtn = fig.querySelector('.copy button[data-code]');
						if (!copyBtn) return;

						fig.dataset.dlInit = '1';

						const btn = document.createElement('button');
						btn.className = 'ec-download-btn';
						btn.setAttribute('type', 'button');
						btn.setAttribute('aria-label', 'Download ' + filename);
						btn.setAttribute('title', 'Download ' + filename);
						// div is required for EC's hover background overlay (same as copy button)
						btn.innerHTML = '<div></div>' + EC_DL_SVG;

						// Insert before the copy button inside the same .copy container
						copyBtn.parentElement.insertBefore(btn, copyBtn);

						btn.addEventListener('click', () => {
							// EC encodes newlines as \\x7F in data-code — decode them back
							const raw = copyBtn.getAttribute('data-code') || '';
							const code = raw.replace(/\\x7F/g, '\\n');
							const blob = new Blob([code], { type: 'text/plain' });
							const url = URL.createObjectURL(blob);
							const a = document.createElement('a');
							a.href = url;
							a.download = filename;
							document.body.appendChild(a);
							a.click();
							document.body.removeChild(a);
							URL.revokeObjectURL(url);
						});
					});
				}

				initDownload();

				// Re-run when tabs become visible (hidden panels load after click)
				document.addEventListener('click', (e) => {
					if (e.target && e.target.closest('[role="tab"]')) {
						requestAnimationFrame(initDownload);
					}
				});
			}
			`,
		],

		hooks: {
			postprocessRenderedBlock: ({ codeBlock, renderData }) => {
				const filename = codeBlock.metaOptions.getString('download');
				if (!filename) return;
				renderData.blockAst.properties['dataEcDownload'] = filename;
			},
		},
	};
}

export function pluginWrap() {
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