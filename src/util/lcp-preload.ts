/**
 * Preload target(s) for a page's LCP image.
 *
 * Use ONLY for the page's actual LCP candidate — typically a CSS background
 * that the preload scanner cannot see, such as the home page hero. Pointing it
 * at a decorative image makes that image compete with the real LCP target for
 * bandwidth.
 *
 * The array form preloads art-directed variants. `media` is required because a
 * <link rel="preload"> without one always matches, so a single omission
 * downloads every variant. Use the string form for the unconditional case.
 */
export type LcpPreloadEntry = { href: string; media: string };
export type LcpPreload = string | LcpPreloadEntry[];

/** Normalises either form to the list of <link> attributes BaseLayout emits. */
export function toLcpPreloadEntries(value: LcpPreload): Array<{ href: string; media?: string }> {
	return typeof value === 'string' ? [{ href: value }] : value;
}

/**
 * `$breakpoint-md` in src/styles/_variables.scss, where `media-down(md)` emits
 * `max-width: #{$breakpoint-md - 1px}`. Nothing ties this to the Sass variable,
 * so if that moves this must too — a mismatch is invisible in dev and costs a
 * wasted download plus a missed preload.
 */
const HERO_MOBILE_BREAKPOINT = 750;

/**
 * Preload entries for a `<Hero>` background, gated on the breakpoint its scoped
 * SCSS uses to swap the files. Pass the same URLs the `<Hero>` itself gets.
 */
export function heroLcpPreload(backgroundImage: string, backgroundImageMobile?: string): LcpPreload {
	if (!backgroundImageMobile) return backgroundImage;
	return [
		{ href: backgroundImageMobile, media: `(max-width: ${HERO_MOBILE_BREAKPOINT - 1}px)` },
		{ href: backgroundImage, media: `(min-width: ${HERO_MOBILE_BREAKPOINT}px)` },
	];
}
