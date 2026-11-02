/**
 * `sizes` for the full-width images on the `_iot-article` marketing pages
 * (/asset-management/, /device-management/, /energy-management/,
 * /monitoring-dashboard/).
 *
 * Mirrors src/styles/_iot-article.scss: `.block-content` caps at
 * `max-width: 1090px`, and `.block-wrapper` pads `0 20px` below 671px,
 * `0 40px` below 1000px and `0 80px` below 1280px. Clauses are
 * narrowest-first because `sizes` is first-match-wins.
 *
 * `min(…, 1090px)` is load-bearing: past 1250px `calc(100vw - 160px)` overshoots
 * the cap, and images with no candidate between 1090w and 2180w jump to 2180w.
 *
 * Keep in step with those rules — nothing enforces the correspondence, and a
 * mismatch shows up only as slightly wrong candidate selection, with no build
 * error and no visual symptom.
 */
export const IOT_ARTICLE_IMAGE_SIZES =
	'(max-width: 671px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 80px), (max-width: 1280px) min(calc(100vw - 160px), 1090px), 1090px';
