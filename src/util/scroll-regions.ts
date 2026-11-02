/**
 * Keeps scrollable regions honest. The markup ships tabindex="0" and
 * role="region" so a keyboard user can scroll the region even without JS; this
 * removes both whenever the region does not actually overflow — a region that
 * cannot scroll is a needless tab stop, and with an accessible name it also
 * clutters the landmark list. Watches both the region and its content, since a
 * font swap can change scrollWidth without moving the region's own box.
 *
 * The `role` of a `[data-scroll-region]` element belongs to this function: it sets
 * `region` and removes it again, so a consumer ships `role="region"` in the markup
 * and never any other role — one placed here would be stripped on the first layout
 * where the region fits.
 */
export function initScrollRegions(): void {
	const regions = document.querySelectorAll<HTMLElement>('[data-scroll-region]');
	if (regions.length === 0) return;

	const sync = (el: HTMLElement): void => {
		if (el.scrollWidth > el.clientWidth) {
			el.setAttribute('tabindex', '0');
			el.setAttribute('role', 'region');
		} else {
			el.removeAttribute('tabindex');
			el.removeAttribute('role');
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
