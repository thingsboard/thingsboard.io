// Scroll lock and backdrop click for native modal <dialog>s; `showModal()` itself gives the top layer,
// inert page, Esc and focus return. Dialogs may stack: the page unlocks when the last one has faded out.

import { lockScroll, unlockScroll } from '@util/scroll-lock';

export interface ModalDialogOptions {
	// Length of the dialog's exit transition: the page scrollbar comes back once it has faded out.
	// An `opacity` transitionend on the dialog releases it sooner.
	fadeMs?: number;
	// Close by fading the still-open dialog out under this class, then `close()` after `fadeMs`. Leaving the
	// modal state restyles the whole page, and this keeps that out of the closing click or key press.
	closingClass?: string;
}

export interface ModalDialog {
	open(): void;
	close(): void;
}

const bound = new WeakMap<HTMLDialogElement, ModalDialog>();

// Dialogs holding the scroll lock; each is released after its fade, not on `close`.
const holders = new Set<HTMLDialogElement>();

function release(dialog: HTMLDialogElement): void {
	if (holders.delete(dialog) && holders.size === 0) unlockScroll();
}

// Binds once: a later call for the same dialog (e.g. from a component wrapping `Modal.astro`, whose
// script may run first or second) returns the first binding and ignores its options.
export function bindModalDialog(
	dialog: HTMLDialogElement,
	{ fadeMs = 0, closingClass }: ModalDialogOptions = {}
): ModalDialog {
	const existing = bound.get(dialog);
	if (existing) return existing;
	let unlockTimer = 0;
	let closeTimer = 0;
	const closing = fadeMs > 0 ? closingClass : undefined;

	const stopClosing = () => {
		window.clearTimeout(closeTimer);
		if (closing) dialog.classList.remove(closing);
	};

	// WebKit leaves a modal dialog under a stacked one interactive, so mark those inert while this one is
	// open, and lift that before closing so focus can return into them. Close a stacked dialog through
	// `close()` here, not `dialog.close()`, or focus lands on <body>.
	let covered: HTMLDialogElement[] = [];
	const uncover = () => {
		for (const d of covered) d.inert = false;
		covered = [];
	};

	// The panel fills the dialog box, so a click on the dialog element itself landed on the backdrop. The press
	// must have too: a text selection dragged out of a field ends with a click on the dialog.
	let pressedBackdrop = false;
	dialog.addEventListener('pointerdown', (e) => {
		pressedBackdrop = e.target === dialog;
	});
	dialog.addEventListener('click', (e) => {
		if (e.target === dialog && pressedBackdrop) modal.close();
	});

	dialog.addEventListener('cancel', (e) => {
		// Esc fades out first too, when the browser lets it be held back (not without a user activation since
		// the last one). Otherwise the browser closes the dialog now.
		if (closing && e.cancelable) {
			e.preventDefault();
			modal.close();
		} else uncover();
	});

	dialog.addEventListener('close', () => {
		// `close` is queued: the dialog may have been reopened before it fired.
		if (dialog.open) return;
		uncover();
		stopClosing();
		window.clearTimeout(unlockTimer);
		// A fade-first dialog has already faded out.
		if (fadeMs > 0 && !closing) unlockTimer = window.setTimeout(() => release(dialog), fadeMs);
		else release(dialog);
	});

	if (fadeMs > 0 && !closing) {
		dialog.addEventListener('transitionend', (e) => {
			// Not a `::backdrop` transition, which fires on the dialog too.
			if (e.target === dialog && e.propertyName === 'opacity' && !e.pseudoElement && !dialog.open) {
				window.clearTimeout(unlockTimer);
				release(dialog);
			}
		});
	}

	const modal: ModalDialog = {
		// A reopen during the exit fade keeps the lock instead of releasing it under the open dialog.
		open() {
			window.clearTimeout(unlockTimer);
			stopClosing();
			if (dialog.open) return;
			dialog.showModal();
			covered = [...holders].filter((d) => d !== dialog && d.open && !d.inert);
			for (const d of covered) d.inert = true;
			holders.add(dialog);
			lockScroll();
		},
		close() {
			if (!dialog.open) return;
			if (!closing) {
				uncover();
				dialog.close();
				return;
			}
			if (dialog.classList.contains(closing)) return;
			dialog.classList.add(closing);
			closeTimer = window.setTimeout(() => {
				uncover();
				dialog.close();
				dialog.classList.remove(closing);
			}, fadeMs);
		},
	};
	bound.set(dialog, modal);
	return modal;
}
