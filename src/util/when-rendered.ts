/** Runs `start` once `el` is rendered: now, or the first time it leaves `display: none`. */
export function whenRendered(el: Element, start: () => void): void {
	if (el.getClientRects().length) {
		start();
		return;
	}
	const ro = new ResizeObserver(() => {
		if (!el.getClientRects().length) return;
		ro.disconnect();
		start();
	});
	ro.observe(el);
}
