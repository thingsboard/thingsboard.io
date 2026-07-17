// PhotoSwipe lightbox init for <ImageGallery>. Loaded lazily via the global
// loader in config/integrations/image-gallery-lightbox.ts.
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import type PhotoSwipe from 'photoswipe';
import type { SlideData } from 'photoswipe';
import { lockScroll, unlockScroll } from '@util/scroll-lock';

// Destroyed and rebuilt on each init() to avoid duplicate handlers / observers.
let currentLb: PhotoSwipeLightbox | undefined;

// CDN images skip the asset pipeline → no build-time dims. Use the visible
// <img>'s naturalWidth/Height (thumb === full-res for CDN sources).
function getVisibleImg(anchor: HTMLElement): HTMLImageElement | null {
	const isDark = document.documentElement.dataset.theme === 'dark';
	const selector = isDark ? 'img:not(.light-only)' : 'img:not(.dark-only)';
	return anchor.querySelector<HTMLImageElement>(selector);
}

function syncCdnAnchorDims(anchor: HTMLElement) {
	const img = getVisibleImg(anchor);
	if (!img) return;
	const apply = () => {
		if (img.naturalWidth && img.naturalHeight) {
			anchor.dataset.pswpWidth = String(img.naturalWidth);
			anchor.dataset.pswpHeight = String(img.naturalHeight);
		}
	};
	if (img.complete) apply();
	else img.addEventListener('load', apply, { once: true });
}

function init() {
	currentLb?.destroy();
	currentLb = undefined;
	if (!document.querySelector('.image-gallery')) return;

	document
		.querySelectorAll<HTMLElement>('.gallery-thumb[data-pswp-cdn="true"]')
		.forEach(syncCdnAnchorDims);

	const lb = new PhotoSwipeLightbox({
		gallery: '.image-gallery',
		children: '.gallery-thumb',
		pswpModule: () => import('photoswipe'),
		showHideAnimationType: 'zoom',
		bgOpacity: 1,
		padding: { top: 24, bottom: 64, left: 24, right: 24 },
		wheelToZoom: true,
		loop: false,
		zoom: false,
	});

	// Anchors inside interactive SVG thumbs navigate natively; lightbox stays closed.
	lb.addFilter('clickedIndex', (clickedIndex, e) =>
		(e.target as HTMLElement).closest('.gallery-thumb--interactive a') ? -1 : clickedIndex
	);

	// Interactive SVG slides + dark-theme src swap for raster images.
	lb.addFilter('itemData', (itemData: SlideData) => {
		const el = itemData.element as HTMLElement | undefined;
		if (!el) return itemData;

		if (el.dataset.pswpInteractiveSvg === 'true') {
			// PhotoSwipe's `_domElementToItemData` runs `querySelector('a')`
			// to extract an image href. With an SVG `<a>` inside, it returns
			// an `SVGAnimatedString` that stringifies to "[object
			// SVGAnimatedString]" — a broken URL. Build a fresh item with
			// `type: 'html'` instead of spreading the polluted one.
			return {
				element: el,
				type: 'html',
				html: el.innerHTML,
				width: parseInt(el.dataset.pswpWidth ?? '', 10) || 1600,
				height: parseInt(el.dataset.pswpHeight ?? '', 10) || 900,
			};
		}

		const isDark = document.documentElement.dataset.theme === 'dark';
		if (isDark) {
			const darkSrc = el.dataset.pswpSrcDark;
			if (darkSrc) itemData.src = darkSrc;
			const darkThumb = el.querySelector<HTMLImageElement>('img.dark-only');
			if (darkThumb?.src) itemData.msrc = darkThumb.src;
		}

		// Backup if init's load listener hasn't fired yet (fast click).
		if (el.dataset.pswpCdn === 'true') {
			const img = getVisibleImg(el);
			if (img?.naturalWidth && img.naturalHeight) {
				itemData.width = img.naturalWidth;
				itemData.height = img.naturalHeight;
			}
		}

		return itemData;
	});

	// Use the visible img for zoom bounds — the hidden variant has rect (0,0,0,0).
	lb.addFilter('thumbEl', (thumbnail, itemData) => {
		const el = itemData.element as HTMLElement | undefined;
		const isDark = document.documentElement.dataset.theme === 'dark';
		const selector = isDark ? 'img:not(.light-only)' : 'img:not(.dark-only)';
		return (el?.querySelector<HTMLImageElement>(selector) ?? thumbnail ?? el) as HTMLElement;
	});

	let pswp: PhotoSwipe | undefined;
	let themeObserver: MutationObserver | null = null;

	lb.on('beforeOpen', lockScroll);

	lb.on('afterInit', () => {
		pswp = lb.pswp;
		if (!pswp) return;

		pswp.ui!.registerElement({
			name: 'caption',
			appendTo: 'root',
			onInit: (el) => {
				el.className = 'pswp-caption';
				const refresh = () => {
					const src = pswp?.currSlide?.data.element as HTMLElement | undefined;
					const html = src?.dataset.caption ?? '';
					el.innerHTML = html;
					el.style.display = html ? '' : 'none';
				};
				pswp!.on('change', refresh);
				refresh();
			},
		});

		// Preload neighbours so swipe is instant.
		pswp.on('change', () => {
			if (!pswp) return;
			const cur = pswp.currIndex;
			[cur - 1, cur + 1].forEach((i) => {
				const data = pswp!.getItemData(i);
				if (data?.src) {
					new Image().src = data.src;
				}
			});
		});

		// Re-render current slide on site theme toggle.
		themeObserver = new MutationObserver(() => {
			if (pswp && pswp.currSlide) {
				pswp.refreshSlideContent(pswp.currIndex);
			}
		});
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});
	});

	lb.on('destroy', () => {
		unlockScroll();
		themeObserver?.disconnect();
		themeObserver = null;
		pswp = undefined;
	});

	lb.init();
	currentLb = lb;
}

init();
