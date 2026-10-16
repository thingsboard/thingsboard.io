import type { StarlightRouteData } from '@astrojs/starlight/route-data';

/**
 * Single source of truth for the "Was this helpful?" feedback prompt visibility.
 * Used by both mount points (`PageSidebar.astro` and `DocMarkdownContent.astro`).
 *
 * Hidden on splash pages (no sidebar) and on pages that set `feedback: false`:
 * landing / overview pages and search pages, where feedback isn't actionable.
 */
export function shouldShowFeedback(route: StarlightRouteData): boolean {
	return !!route.hasSidebar && route.entry.data.feedback !== false;
}
