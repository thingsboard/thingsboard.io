/**
 * `sizes` for the full-width images on the `_iot-article` marketing pages
 * (/asset-management/, /device-management/, /energy-management/,
 * /monitoring-dashboard/).
 *
 * Mirrors src/styles/_iot-article.scss: every `.block-wrapper` pads its sides with
 * `--band-gutter` (src/styles/_theme.scss), the same as the site footer. That leaves
 * the images `100vw - 40px` wide up to a 1080px window and 1040px wide past it
 * (`$home-measure` minus the two 20px gutters).
 *
 * Keep in step with those rules — nothing enforces the correspondence, and a
 * mismatch shows up only as slightly wrong candidate selection, with no build
 * error and no visual symptom.
 */
export const IOT_ARTICLE_IMAGE_SIZES = '(max-width: 1080px) calc(100vw - 40px), 1040px';
