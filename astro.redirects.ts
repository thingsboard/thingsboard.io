import type { AstroUserConfig } from 'astro';

export const redirects: AstroUserConfig['redirects'] = {
	// Add redirects here. They work in both dev and production.
	// Example: '/old-path/': '/new-path/',
	// Note: dynamic [...slug] redirects are NOT supported in static output mode —
	// Astro 5 requires getStaticPaths() for any dynamic route, including redirects.
	// For path-prefix renames use page files with getStaticPaths (see src/pages/docs/pe/).
};
