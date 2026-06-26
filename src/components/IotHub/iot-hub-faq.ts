// Self-contained interactivity for the reused Pricing/FaqSection markup on IoT
// Hub pages: accordion toggle, "Load more", category tabs, copy-link, and
// hash deep-linking. Kept local (not shared with the pricing page's inline
// script) so the IoT Hub FAQ owns its own behavior.

export function initIotHubFaq(): void {
	const root = document.querySelector<HTMLElement>('[data-iot-hub-faq]');
	if (!root) return;

	root.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;

		// Copy link to a question
		const copyLink = target.closest<HTMLElement>('.faq-copy-link');
		if (copyLink) {
			e.stopPropagation();
			const faqId = copyLink.dataset.faqId;
			if (faqId?.trim()) {
				const url = new URL(window.location.href);
				url.hash = faqId;
				navigator.clipboard
					.writeText(url.toString())
					.then(() => {
						copyLink.classList.add('copied');
						setTimeout(() => copyLink.classList.remove('copied'), 2000);
					})
					.catch(() => {});
			}
			return;
		}

		// Accordion toggle
		const question = target.closest<HTMLElement>('.faq-question');
		if (question) {
			const item = question.closest('.faq-item');
			if (item) {
				item.classList.toggle('expanded');
				question.setAttribute('aria-expanded', String(item.classList.contains('expanded')));
			}
			return;
		}

		// "Load more"
		const loadMore = target.closest<HTMLElement>('.faq-load-more');
		if (loadMore) {
			const content = loadMore.closest('.faq-category-content');
			if (content) {
				content
					.querySelectorAll('.faq-item--hidden')
					.forEach((el) => el.classList.remove('faq-item--hidden'));
				loadMore.classList.add('faq-load-more--used');
			}
			return;
		}

		// Category tabs
		const catTab = target.closest<HTMLElement>('.faq-cat-tab');
		if (catTab) {
			const section = catTab.closest('.faq-section');
			if (section) {
				const catId = catTab.dataset.faqCat;
				section.querySelectorAll<HTMLElement>('.faq-cat-tab').forEach((t) => {
					const isActive = t.dataset.faqCat === catId;
					t.classList.toggle('active', isActive);
					t.setAttribute('aria-current', isActive ? 'true' : 'false');
				});
				section
					.querySelectorAll<HTMLElement>('.faq-category-content')
					.forEach((c) => c.classList.toggle('active', c.dataset.faqCatContent === catId));
			}
			return;
		}
	});

	// Deep-link: open the FAQ item referenced by the URL hash.
	const hash = window.location.hash.slice(1);
	if (!hash) return;
	const item = document.getElementById(hash);
	if (!item?.classList.contains('faq-item')) return;

	const content = item.closest<HTMLElement>('.faq-category-content');
	const section = item.closest('.faq-section');
	if (content && section) {
		const catId = content.dataset.faqCatContent;
		section.querySelectorAll<HTMLElement>('.faq-cat-tab').forEach((t) => {
			const isActive = t.dataset.faqCat === catId;
			t.classList.toggle('active', isActive);
			t.setAttribute('aria-current', isActive ? 'true' : 'false');
		});
		section
			.querySelectorAll<HTMLElement>('.faq-category-content')
			.forEach((c) => c.classList.toggle('active', c === content));
	}
	item.classList.remove('faq-item--hidden');
	item.classList.add('expanded');
	item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'true');
	item.scrollIntoView({ block: 'center' });
}
