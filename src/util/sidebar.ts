import type { StarlightRouteData } from '@astrojs/starlight/route-data';

export type SidebarEntry = StarlightRouteData['sidebar'][number];

/** True when any link in `entries`, at any depth, is the current page. */
export const hasCurrentEntry = (entries: SidebarEntry[]): boolean =>
	entries.some((entry) => (entry.type === 'link' ? entry.isCurrent : hasCurrentEntry(entry.entries)));
