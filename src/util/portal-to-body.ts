// Re-parent a fixed overlay to <body> so it escapes Starlight's
// `.main-pane { isolation: isolate }` and paints above the site header
// (z-index alone can't beat the isolation). No-op once it already lives there.
export function portalToBody(el: HTMLElement): void {
	if (el.parentElement !== document.body) document.body.appendChild(el);
}
