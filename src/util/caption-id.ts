/**
 * Builds the id a table's `<caption>` carries so its scroll region can point at it
 * with `aria-labelledby`.
 *
 * Two captions with the same text still produce the same id. That cannot be resolved
 * here — a component cannot see its siblings — so a caller rendering two tables with
 * identical captions on one page must pass an explicit id for at least one of them.
 */
export function captionId(text: string, prefix: string): string {
	const slug = text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

	// Slugifying keeps Latin alphanumerics only, so a caption in any of the site's
	// non-Latin locales reduces to nothing. Fall back to a hash of the original
	// rather than emitting a bare prefix, which would collide with every other one.
	return `${prefix}-${slug || hash(text)}`;
}

/** Short, stable, non-cryptographic digest — only needs to differ per caption. */
function hash(text: string): string {
	let h = 0;
	for (let i = 0; i < text.length; i += 1) {
		h = (h * 31 + text.charCodeAt(i)) | 0;
	}
	return Math.abs(h).toString(36);
}
