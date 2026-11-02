/**
 * Deterministic, human-readable element id from a text and a namespace prefix —
 * table caption ids and pagination label ids that `aria-labelledby` points at.
 *
 * Two calls with the same text produce the same id. That cannot be resolved
 * here — a component cannot see its siblings — so a caller rendering two
 * instances with identical texts on one page must pass distinct ids instead.
 */
export function slugId(text: string, prefix: string): string {
	const slug = text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

	// Slugifying keeps Latin alphanumerics only, so a text in any of the site's
	// non-Latin locales reduces to nothing. Fall back to a hash of the original
	// rather than emitting a bare prefix, which would collide with every other one.
	return `${prefix}-${slug || hash(text)}`;
}

/** Short, stable, non-cryptographic digest — only needs to differ per input. */
function hash(text: string): string {
	let h = 0;
	for (let i = 0; i < text.length; i += 1) {
		h = (h * 31 + text.charCodeAt(i)) | 0;
	}
	return Math.abs(h).toString(36);
}
