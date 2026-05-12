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
 * Notes on HAST conventions:
 *   - Classes → properties.className (array), NOT properties.class
 *   - Data attrs → camelCase: dataMaxLines → data-max-lines in HTML → el.dataset.maxLines in JS
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

export function pluginMaxLines() {
	return {
		name: 'Max Lines',

		baseStyles: `
			/* maxLines: height-limited scrollable block */
			.ec-max-lines pre {
				overflow-y: auto;
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
			// Guard against double-registration: Astro view transitions can re-run
			// this module, which would stack another set of document-level
			// listeners on every navigation.
			if (!window.__ecMaxLinesInit) {
				window.__ecMaxLinesInit = true;

				function initMaxLines() {
					document.querySelectorAll('.ec-max-lines[data-max-lines]').forEach((el) => {
						if (el.dataset.mlInit) return;

						const maxLines = parseInt(el.dataset.maxLines, 10);
						const pre = el.querySelector('pre');
						if (!pre) return;

						const firstLine = pre.querySelector('.ec-line');
						const lineH = firstLine ? firstLine.getBoundingClientRect().height : 20;
						const maxH = Math.round(maxLines * lineH);

						// Hidden tab panels report scrollHeight as 0 — skip and retry when visible
						if (pre.scrollHeight <= maxH + lineH) return;

						el.dataset.mlInit = '1';
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

				// Re-run when a tab becomes visible — hidden panels have scrollHeight 0
				document.addEventListener('click', (e) => {
					if (e.target && e.target.closest('[role="tab"]')) {
						requestAnimationFrame(initMaxLines);
					}
				});

				// Device-library PlatformToggle dispatches this when it swaps the
				// visible variant. Double RAF so layout settles after display: block.
				document.addEventListener('dl-variant-change', () => {
					requestAnimationFrame(() => requestAnimationFrame(initMaxLines));
				});
			}
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
			// Guard against double-registration on view transitions, same as pluginMaxLines.
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
				document.addEventListener('astro:page-load', initDownload);

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