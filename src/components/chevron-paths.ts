// SVG path data for the chevron icon (24px viewBox, 2px round stroke).
// Single source for Chevron.astro and the runtime-built chevrons in
// pagination-client.ts (which can't render the .astro component), so a redraw
// can't leave build-time and runtime icons out of sync.
export const CHEVRON_PATHS = {
	left: 'm15 6-6 6 6 6',
	right: 'm9 6 6 6-6 6',
	down: 'm6 9 6 6 6-6',
} as const;

export type ChevronDirection = keyof typeof CHEVRON_PATHS;
