// Swaps a creator avatar that fails to load for the initials block rendered
// next to it. Pages are built ahead of time, so an avatar deleted on the IoT Hub
// keeps its URL here until the next build and would otherwise show as a broken
// image. The component renders `<img data-avatar-img>` followed by a `hidden`
// `[data-avatar-initials]` sibling; on failure the image is removed and the
// initials revealed, leaving the same markup as when there is no avatar at all.

const showInitials = (img: HTMLImageElement) => {
	const initials = img.parentElement?.querySelector<HTMLElement>(':scope > [data-avatar-initials]');
	if (!initials) return;
	img.remove();
	initials.hidden = false;
};

export function initAvatarFallback() {
	document.querySelectorAll<HTMLImageElement>('img[data-avatar-img]').forEach((img) => {
		// Module scripts run after parsing, so the request may already have failed.
		if (img.complete && img.naturalWidth === 0) {
			showInitials(img);
			return;
		}
		img.addEventListener('error', () => showInitials(img), { once: true });
	});
}
