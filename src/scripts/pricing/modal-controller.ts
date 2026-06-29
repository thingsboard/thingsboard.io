// Shared open/close controller for the pricing calculator modals
// (TB Private Cloud + PAYG). Encapsulates the choreography both modals share:
//   • portal the fixed overlay to <body> so it escapes Starlight's
//     `.main-pane { isolation: isolate }` and paints above the site header;
//   • lock page scroll (scrollbar-width compensated) while open;
//   • defer hide + unlock by `fadeMs` to match the CSS fade-out, cancelling that
//     timer if the modal is reopened within the window.
// Calculator-specific work runs through the onOpen / onClose / onEscape hooks.

import { lockScroll, unlockScroll } from '@util/scroll-lock';

// Defined by the inline script in CalculatorModal.astro (toggles the fade class).
declare function calcModalOpen(): void;
declare function calcModalClose(): void;

interface ModalControllerOptions {
	/** The `.calc-modal-overlay` element (e.g. #tb-pc-calc). Must be non-null. */
	modal: HTMLElement;
	/** Fade-out duration in ms; hide + unlock are deferred by this. Default 300. */
	fadeMs?: number;
	/** Per-calculator work after the modal is shown (e.g. recalc, init sliders). */
	onOpen?: () => void;
	/** Per-calculator work when closing (e.g. hide a nested sub-modal). */
	onClose?: () => void;
	/** Handle Escape for a higher layer (e.g. a sub-modal) — return true if handled
	 *  so the controller leaves the main modal open. */
	onEscape?: () => boolean;
}

export interface ModalController {
	open: () => void;
	close: () => void;
}

// Re-parent a fixed overlay to <body> so it escapes Starlight's
// `.main-pane { isolation: isolate }` and paints above the site header
// (z-index alone can't beat the isolation). No-op once it already lives there.
export function portalToBody(el: HTMLElement): void {
	if (el.parentElement !== document.body) document.body.appendChild(el);
}

export function makeModalController(opts: ModalControllerOptions): ModalController {
	const { modal, fadeMs = 300, onOpen, onClose, onEscape } = opts;
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	function open(): void {
		// Cancel a pending close so a fast close→reopen isn't clobbered by the
		// stale timer.
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
		portalToBody(modal);
		modal.style.display = '';
		lockScroll();
		calcModalOpen();
		onOpen?.();
	}

	function close(): void {
		calcModalClose();
		onClose?.();
		if (closeTimer) clearTimeout(closeTimer);
		// Defer hide + scroll-unlock until the fade finishes; cancelled by open().
		closeTimer = setTimeout(() => {
			modal.style.display = 'none';
			unlockScroll();
			closeTimer = null;
		}, fadeMs);
	}

	modal.querySelector('[data-calc-close]')?.addEventListener('click', close);
	modal.addEventListener('click', (e) => {
		if (e.target === modal) close();
	});
	document.addEventListener('keydown', (e) => {
		if (e.key !== 'Escape') return;
		if (onEscape?.()) return; // a higher layer handled it
		if (modal.style.display !== 'none') close();
	});

	return { open, close };
}
