// Open/close for the pricing calculator dialogs: `bindModalDialog` plus the close button and the hooks.

import { bindModalDialog } from '@util/modal-dialog';

// FADE_MS must match the `.calc-modal--closing` fade in CalculatorModal.astro.
const CLOSING_CLASS = 'calc-modal--closing';
const FADE_MS = 300;

interface ModalControllerOptions {
	modal: HTMLDialogElement;
	onOpen?: () => void;
	/** Runs once the dialog has closed, after its fade. */
	onClose?: () => void;
}

export interface ModalController {
	open: () => void;
	close: () => void;
}

export function makeModalController({ modal, onOpen, onClose }: ModalControllerOptions): ModalController {
	const dialog = bindModalDialog(modal, { fadeMs: FADE_MS, closingClass: CLOSING_CLASS });
	modal.querySelector('[data-calc-close]')?.addEventListener('click', () => dialog.close());
	if (onClose) modal.addEventListener('close', onClose);

	return {
		open() {
			// A second click while the chunk loads must not run onOpen twice.
			const wasOpen = modal.open;
			dialog.open();
			if (!wasOpen) onOpen?.();
		},
		close: () => dialog.close(),
	};
}
