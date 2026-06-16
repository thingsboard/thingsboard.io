import type { EmblaCarouselType } from 'embla-carousel';

type EmblaCarouselFn = typeof import('embla-carousel').default;
type AutoplayFn = typeof import('embla-carousel-autoplay').default;
let emblaPromise: Promise<[EmblaCarouselFn, AutoplayFn]> | null = null;
const loadEmbla = () =>
	(emblaPromise ??= Promise.all([
		import('embla-carousel').then((m) => m.default),
		import('embla-carousel-autoplay').then((m) => m.default),
	]));

function createDot(index: number): HTMLButtonElement {
	const dot = document.createElement('button');
	dot.type = 'button';
	dot.className = 'carousel-dot';
	dot.dataset.index = index.toString();
	dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
	return dot;
}

export async function initCarousel(wrapper: HTMLElement) {
	const [EmblaCarousel, Autoplay] = await loadEmbla();
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const viewport = wrapper.querySelector<HTMLElement>('.carousel-viewport');
	if (!viewport) return;

	const loop = wrapper.dataset.loop === 'true';
	const autoplay = wrapper.dataset.autoplay === 'true';
	const autoplayInterval = parseInt(wrapper.dataset.autoplayInterval || '5000', 10);

	// On touch (coarse pointer) a swipe should stop autoplay so it doesn't fight the user —
	// mouseenter/leave never fires there, so stopOnMouseEnter alone can't pause it. On mouse,
	// keep hover-pause + resume-after-drag (stopOnInteraction:false enables the pointerUp resume).
	const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
	const plugins =
		autoplay && !reducedMotion
			? [
					Autoplay({
						delay: autoplayInterval,
						stopOnInteraction: coarsePointer,
						stopOnMouseEnter: true,
					}),
				]
			: [];

	const embla = EmblaCarousel(
		viewport,
		{
			loop,
			align: 'start',
			containScroll: 'trimSnaps',
		},
		plugins
	);

	// Slot-mode slides can't know their position server-side
	const slides = viewport.querySelectorAll<HTMLElement>('.carousel-slide');
	slides.forEach((slide, index) => {
		if (!slide.hasAttribute('aria-label')) {
			slide.setAttribute('aria-label', `${index + 1} of ${slides.length}`);
		}
	});

	// Navigation buttons
	const prevButton = wrapper.querySelector<HTMLButtonElement>('.carousel-button-prev');
	const nextButton = wrapper.querySelector<HTMLButtonElement>('.carousel-button-next');

	if (prevButton) {
		prevButton.addEventListener('click', () => embla.scrollPrev());
	}

	if (nextButton) {
		nextButton.addEventListener('click', () => embla.scrollNext());
	}

	// Dots — SSR-rendered in items mode, built from snap points in slot mode
	const dotsContainer = wrapper.querySelector<HTMLElement>('.carousel-dots');
	if (dotsContainer && !dotsContainer.children.length) {
		embla.scrollSnapList().forEach((_, index) => dotsContainer.appendChild(createDot(index)));
	}
	const dots = wrapper.querySelectorAll<HTMLButtonElement>('.carousel-dot');

	const updateDots = (emblaApi: EmblaCarouselType) => {
		const selectedIndex = emblaApi.selectedScrollSnap();
		dots.forEach((dot, index) => {
			dot.classList.toggle('active', index === selectedIndex);
			if (index === selectedIndex) {
				dot.setAttribute('aria-current', 'true');
			} else {
				dot.removeAttribute('aria-current');
			}
		});
	};

	dots.forEach((dot) => {
		dot.addEventListener('click', () => {
			const index = parseInt(dot.dataset.index || '0', 10);
			embla.scrollTo(index);
		});
	});

	// embla defers the 'init' event to a macrotask; call directly so initial
	// dot/button state applies synchronously — 'select'/'reInit' cover later updates
	updateDots(embla);
	embla.on('select', updateDots);
	embla.on('reInit', updateDots);

	const updateButtons = (emblaApi: EmblaCarouselType) => {
		if (prevButton) prevButton.disabled = !emblaApi.canScrollPrev();
		if (nextButton) nextButton.disabled = !emblaApi.canScrollNext();
	};

	if (!loop) {
		updateButtons(embla);
		embla.on('select', updateButtons);
		embla.on('reInit', updateButtons);
	}

	// Let host pages react to slide changes (e.g. master-detail sections)
	embla.on('select', () =>
		wrapper.dispatchEvent(
			new CustomEvent('carousel:select', { detail: { index: embla.selectedScrollSnap() } })
		)
	);
}

// Initialize carousels lazily when they approach the viewport
export function observeCarousels() {
	const carouselWrappers = document.querySelectorAll<HTMLElement>(
		'.carousel-wrapper:not([data-carousel-init])'
	);
	if (!carouselWrappers.length) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const wrapper = entry.target as HTMLElement;
				observer.unobserve(wrapper);
				// Re-check the flag here, not just at querySelectorAll time: if observeCarousels
				// runs twice before any intersection, two observers can watch the same wrapper.
				// The flag keeps initCarousel from running twice on it.
				if (wrapper.dataset.carouselInit) return;
				wrapper.dataset.carouselInit = 'true';
				initCarousel(wrapper);
			});
		},
		{ rootMargin: '200px' }
	);

	carouselWrappers.forEach((wrapper) => observer.observe(wrapper));
}
