/**
 * Sets `data-offscreen` on matching elements while they are out of view, so CSS can pause their
 * animations. Pausing rather than restarting keeps negative-delay staggers intact.
 */
export function pauseOffscreen(selector: string) {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	const io = new IntersectionObserver(
		(entries) => entries.forEach((e) => e.target.toggleAttribute('data-offscreen', !e.isIntersecting)),
		{ rootMargin: '80px' }
	);
	document.querySelectorAll(selector).forEach((el) => io.observe(el));
}
