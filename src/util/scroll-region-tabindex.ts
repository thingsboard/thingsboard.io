/**
 * Keeps scrollable-region tab stops honest. The markup ships tabindex="0" so a
 * keyboard user can scroll the region even without JS; this removes the stop
 * whenever the region does not actually overflow — an always-focusable
 * non-interactive box is announced on every page for no benefit. Watches both
 * the region and its content, since a font swap can change scrollWidth without
 * moving the region's own box.
 */
export function initScrollRegionTabindex(): void {
	const regions = document.querySelectorAll<HTMLElement>('[data-scroll-region]');
	if (regions.length === 0) return;

	const sync = (el: HTMLElement): void => {
		if (el.scrollWidth > el.clientWidth) {
			el.setAttribute('tabindex', '0');
		} else {
			el.removeAttribute('tabindex');
		}
	};

	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			const region = (entry.target as HTMLElement).closest<HTMLElement>('[data-scroll-region]');
			if (region) sync(region);
		}
	});

	for (const el of regions) {
		sync(el);
		observer.observe(el);
		if (el.firstElementChild) observer.observe(el.firstElementChild);
	}
}
