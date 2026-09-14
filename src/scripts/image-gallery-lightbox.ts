// PhotoSwipe lightbox init for <ImageGallery>. Loaded lazily via the global
// loader in config/integrations/image-gallery-lightbox.ts.
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import type PhotoSwipe from 'photoswipe';
import type { PhotoSwipeEventsMap, SlideData, ZoomLevelOption } from 'photoswipe';
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

// Share of the pan area a CDN image is allowed to take. Short of 1 on purpose:
// it keeps a strip of backdrop on every side, so the picture never runs under
// the close button and there is always somewhere to click to dismiss.
const CDN_VIEWPORT_FILL = 0.86;
// PhotoSwipe's 'fit' never scales past 1:1, so an image smaller than the
// viewport opens as a small rectangle marooned on a large screen. Pipeline
// images are wide enough for that to be the right call; CDN images are not —
// an IoT Hub widget preview is often ~800px — so scale those up too, capped
// so a small source doesn't smear into mush.
const MAX_CDN_UPSCALE = 2;

// PhotoSwipe exports the option union but not the object its function form
// receives, and the class isn't reachable through the package exports map —
// so pull the parameter type back out of the union.
type ZoomLevelArg<T> = T extends (zoomLevelObject: infer Z) => number ? Z : never;
type ZoomLevel = ZoomLevelArg<ZoomLevelOption>;

function fitCdnImage(zoomLevel: ZoomLevel): number {
	const { panAreaSize, elementSize } = zoomLevel;
	const el = zoomLevel.itemData?.element as HTMLElement | undefined;
	if (el?.dataset.pswpCdn !== 'true' || !panAreaSize || !elementSize?.x || !elementSize.y) {
		return zoomLevel.fit;
	}
	const fitRatio =
		Math.min(panAreaSize.x / elementSize.x, panAreaSize.y / elementSize.y) * CDN_VIEWPORT_FILL;
	return Math.min(fitRatio, MAX_CDN_UPSCALE);
}

type LightboxSlide = PhotoSwipeEventsMap['slideActivate']['slide'];

function syncSlideToImage(slide: LightboxSlide | undefined) {
	if (!slide) return;
	const content = slide.content;
	if (!content) return;
	const img = content.element;
	if (!(img instanceof HTMLImageElement)) return;

	const { naturalWidth, naturalHeight } = img;
	if (!naturalWidth || !naturalHeight) {
		// Still decoding — measure it when it lands.
		img.addEventListener('load', () => syncSlideToImage(slide), { once: true });
		return;
	}
	if (slide.width === naturalWidth && slide.height === naturalHeight) return;

	content.width = naturalWidth;
	content.height = naturalHeight;
	slide.width = naturalWidth;
	slide.height = naturalHeight;
	// Keep the item data and the anchor in step too, so reopening the gallery —
	// and the zoom-from-thumbnail animation — start from the real ratio.
	slide.data.width = naturalWidth;
	slide.data.height = naturalHeight;
	const anchor = slide.data.element;
	if (anchor) {
		anchor.dataset.pswpWidth = String(naturalWidth);
		anchor.dataset.pswpHeight = String(naturalHeight);
	}
	// Re-lay the slide out from the corrected size. Deliberately not
	// `slide.resize()`: when the dimensions land mid opening-animation — the
	// common case, since that is when the image finishes loading — its current
	// zoom level does not yet equal the initial one, so it takes the branch that
	// only readjusts panning and never re-sizes the element, leaving the picture
	// in its stretched box. This is that method's other branch, forced. Resetting
	// the zoom is correct regardless: the level it would preserve was computed
	// from the wrong dimensions.
	slide.calculateSize();
	slide.currentResolution = 0;
	slide.zoomAndPanToInitial();
	slide.applyCurrentZoomPan();
	slide.updateContentSize(true);
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
		initialZoomLevel: fitCdnImage,
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

	// A CDN thumbnail that hasn't loaded yet leaves its anchor on the placeholder
	// dimensions, and PhotoSwipe sizes the slide from those — so the picture
	// opens stretched to the placeholder's 16:9 and stays that way, because
	// nothing re-measures it once the full image arrives. Carousel slides load
	// lazily, so the last one regularly hasn't loaded by the time it is clicked.
	//
	// `slideActivate` covers the slide that was clicked: the lightbox preloads
	// its image before a Slide exists, so `loadComplete` is never dispatched for
	// it — only for the neighbours it preloads afterwards. Between the two hooks
	// every slide is measured from the image PhotoSwipe actually loaded. For a
	// pipeline image, whose build-time dimensions are already right, both are
	// no-ops.
	lb.on('slideActivate', ({ slide }) => syncSlideToImage(slide));
	lb.on('loadComplete', ({ slide, isError }) => {
		if (!isError) syncSlideToImage(slide);
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
