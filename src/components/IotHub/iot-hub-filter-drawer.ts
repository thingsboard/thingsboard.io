import { lockScroll, unlockScroll } from '@util/scroll-lock';

// FilterPanel open/close behaviour, shared by every page that renders the
// panel beside a list. Above `lg` the panel is a static sidebar and this only
// tracks the toggle's state; below it, the panel becomes an overlay drawer
// with a backdrop and a scroll lock.
//
// Discovered from the DOM: a `[data-iot-hub-listings-wrap]` element containing
// `[data-iot-hub-filter-panel]`, `[data-iot-hub-filter-toggle]` and, if the
// page has one, `[data-iot-hub-filter-backdrop]`.

// 1023px === Sass `media-down(lg)` so JS + CSS agree on the breakpoint
// where the panel switches to overlay-drawer.
const MOBILE_MQ = '(max-width: 1023px)';

function setupFilterDrawer(): void {
	document.querySelectorAll<HTMLElement>('[data-iot-hub-listings-wrap]').forEach((wrap) => {
		if (wrap.dataset.filterDrawerInited) return;
		const panel = wrap.querySelector<HTMLElement>('[data-iot-hub-filter-panel]');
		const toggle = wrap.querySelector<HTMLButtonElement>('[data-iot-hub-filter-toggle]');
		const backdrop = wrap.querySelector<HTMLElement>('[data-iot-hub-filter-backdrop]');
		if (!panel || !toggle) return;
		wrap.dataset.filterDrawerInited = 'true';

		const mobileMq = window.matchMedia(MOBILE_MQ);

		// Scroll lock while the mobile drawer is open. The shared util also
		// compensates the fixed site header so it doesn't jump wider.
		const setScrollLock = (lock: boolean) => {
			if (lock) lockScroll();
			else unlockScroll();
		};

		const setOpen = (open: boolean) => {
			const wasOpen = panel.dataset.open === 'true';
			panel.dataset.open = open ? 'true' : 'false';
			wrap.dataset.filterOpen = open ? 'true' : 'false';
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			setScrollLock(open && mobileMq.matches);
			// Gate focus restoration on focus being inside the panel so we
			// don't steal focus when the user closed via a click outside
			// while focus was already elsewhere.
			if (wasOpen && !open && panel.contains(document.activeElement)) {
				toggle.focus();
			}
		};

		toggle.addEventListener('click', () => {
			setOpen(panel.dataset.open !== 'true');
		});
		wrap.addEventListener('iot-hub-filter-close', () => setOpen(false));
		backdrop?.addEventListener('click', () => setOpen(false));
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && panel.dataset.open === 'true') setOpen(false);
		});
		// Drop the lock when the viewport grows past lg while open
		// (e.g. rotated tablet) so desktop layout doesn't stay frozen.
		mobileMq.addEventListener('change', (e) => {
			setScrollLock(panel.dataset.open === 'true' && e.matches);
		});
	});
}

export function initFilterDrawer(): void {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setupFilterDrawer);
	} else {
		setupFilterDrawer();
	}
}
