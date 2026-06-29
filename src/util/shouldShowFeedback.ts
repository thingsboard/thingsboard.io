import type { StarlightRouteData } from '@astrojs/starlight/route-data';

/**
 * Single source of truth for the "Was this helpful?" feedback prompt visibility.
 * Used by both mount points (`PageSidebar.astro` and `DocMarkdownContent.astro`).
 *
 * Hidden on splash pages (no sidebar) and on landing / overview pages (those
 * with a hero block in frontmatter) — they aggregate links to sub-pages, so
 * feedback isn't actionable there.
 */
export function shouldShowFeedback(route: StarlightRouteData): boolean {
	return !!route.hasSidebar && !route.entry.data.hero;
}
