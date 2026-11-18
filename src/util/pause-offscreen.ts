/**
 * Sets `data-offscreen` on matching elements while they are out of view, so CSS can pause their
 * animations (keeps negative-delay staggers in phase) or stop them where a paused frame is unreadable.
 */
export function pauseOffscreen(selector: string) {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	const io = new IntersectionObserver(
		(entries) => entries.forEach((e) => e.target.toggleAttribute('data-offscreen', !e.isIntersecting)),
		{ rootMargin: '80px' }
	);
	document.querySelectorAll(selector).forEach((el) => io.observe(el));
}
