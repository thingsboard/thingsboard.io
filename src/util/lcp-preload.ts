/**
 * Preload target(s) for a page's LCP image.
 *
 * Use ONLY for the page's actual LCP candidate — typically a CSS background
 * that the preload scanner cannot see, such as the home page hero. Pointing it
 * at a decorative image makes that image compete with the real LCP target for
 * bandwidth.
 *
 * The array form preloads art-directed variants. Every entry needs a `media`
 * matching the CSS that selects it; without one the browser downloads all of
 * them and the preload is a net loss.
 */
export type LcpPreload = string | Array<{ href: string; media?: string }>;
