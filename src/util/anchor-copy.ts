/** Copies the section URL to the clipboard when a heading's anchor link (`.sl-anchor-link`) is clicked. */
export function initAnchorCopy() {
	document.querySelectorAll<HTMLElement>('.sl-heading-wrapper').forEach((wrapper) => {
		if (wrapper.dataset.anchorInit) return;
		wrapper.dataset.anchorInit = '1';

		const link = wrapper.querySelector('.sl-anchor-link');
		if (!link) return;

		link.addEventListener('click', () => {
			// URL is updated by the browser after click — wait one tick
			requestAnimationFrame(() => {
				navigator.clipboard?.writeText(window.location.href);
			});
		});
	});
}
