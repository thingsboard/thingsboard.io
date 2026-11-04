/**
 * Copy buttons under `root`: `data-copy` holds the text, or `data-copy-from` the id of the element
 * whose text is copied. A copied button reads "Copied" (its `[data-copy-label]`) and carries
 * `data-copied` for two seconds.
 */
interface CopyButtonOptions {
	/** Announces the copy: a button's own label change is not announced. */
	status: HTMLElement | null;
	copiedMessage: string;
	/** Empty `status` again when the button resets. */
	clearStatus?: boolean;
	/** Where the clipboard is refused: select the source text and announce this. Unset, a refusal is ignored. */
	refusedMessage?: string;
}

const RESET_MS = 2000;

export function initCopyButtons(root: ParentNode, options: CopyButtonOptions): void {
	const { status, copiedMessage, clearStatus = false, refusedMessage } = options;
	root.querySelectorAll<HTMLElement>('[data-copy], [data-copy-from]').forEach((button) => {
		const label = button.querySelector<HTMLElement>('[data-copy-label]');
		const sourceId = button.dataset.copyFrom;
		const source = sourceId ? root.querySelector<HTMLElement>(`#${sourceId}`) : null;

		const copied = () => {
			button.dataset.copied = '';
			if (label) label.textContent = 'Copied';
			if (status) status.textContent = copiedMessage;
			window.setTimeout(() => {
				delete button.dataset.copied;
				if (label) label.textContent = 'Copy';
				if (clearStatus && status) status.textContent = '';
			}, RESET_MS);
		};
		const refused = () => {
			if (refusedMessage === undefined) return;
			if (source) {
				source.focus();
				window.getSelection()?.selectAllChildren(source);
			}
			if (status) status.textContent = refusedMessage;
		};

		button.addEventListener('click', () => {
			const text = source ? (source.textContent ?? '') : (button.dataset.copy ?? '');
			if (navigator.clipboard) navigator.clipboard.writeText(text).then(copied, refused);
			else refused();
		});
	});
}
