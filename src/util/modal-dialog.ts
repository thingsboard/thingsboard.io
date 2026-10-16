// Scroll lock and backdrop click for native modal <dialog>s; `showModal()` itself gives the top layer,
// inert page, focus trap, Esc and focus return.

import { lockScroll, unlockScroll } from '@util/scroll-lock';

export interface ModalDialogOptions {
	// Length of the dialog's exit transition: the page scrollbar comes back once it has faded out.
	// An `opacity` transitionend on the dialog releases it sooner.
	fadeMs?: number;
}

export interface ModalDialog {
	open(): void;
	close(): void;
}

const bound = new WeakMap<HTMLDialogElement, ModalDialog>();

// Binds once: a later call for the same dialog (e.g. from a component wrapping `Modal.astro`, whose
// script may run first or second) returns the first binding and ignores its options.
export function bindModalDialog(dialog: HTMLDialogElement, { fadeMs = 0 }: ModalDialogOptions = {}): ModalDialog {
	const existing = bound.get(dialog);
	if (existing) return existing;
	let unlockTimer = 0;

	// The panel fills the dialog box, so a click on the dialog element itself landed on the backdrop. The press
	// must have too: a text selection dragged out of a field ends with a click on the dialog.
	let pressedBackdrop = false;
	dialog.addEventListener('pointerdown', (e) => {
		pressedBackdrop = e.target === dialog;
	});
	dialog.addEventListener('click', (e) => {
		if (e.target === dialog && pressedBackdrop) dialog.close();
	});

	dialog.addEventListener('close', () => {
		window.clearTimeout(unlockTimer);
		if (fadeMs > 0) unlockTimer = window.setTimeout(unlockScroll, fadeMs);
		else unlockScroll();
	});

	if (fadeMs > 0) {
		dialog.addEventListener('transitionend', (e) => {
			if (e.target === dialog && e.propertyName === 'opacity' && !dialog.open) {
				window.clearTimeout(unlockTimer);
				unlockScroll();
			}
		});
	}

	const modal: ModalDialog = {
		// A reopen during the exit fade keeps the lock instead of releasing it under the open dialog.
		open() {
			window.clearTimeout(unlockTimer);
			if (dialog.open) return;
			dialog.showModal();
			lockScroll();
		},
		close() {
			if (dialog.open) dialog.close();
		},
	};
	bound.set(dialog, modal);
	return modal;
}
