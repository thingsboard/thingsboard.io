const defaultCategory = 'Learn';

// Order is important here. Pages are tested to see if they *start* with one of
// these paths and will return early when one matches.
const categories = [
	['guides/rss/', 'Recipes'],
	['guides/backend/', 'Recipes'],
	['guides/cms/', 'Recipes'],
	['guides/deploy/', 'Recipes'],
	['guides/media/', 'Recipes'],
	['guides/integrations-guide/', 'Learn'],
	['guides/migrate-to-astro/', 'Recipes'],
	['guides/upgrade-to/', 'Upgrade Guides'],
	['recipes/', 'Recipes'],
	['reference/errors/', 'Error Reference'],
	['reference/', 'Reference'],
	['tutorial/', 'Tutorials'],
	['tutorials/', 'Tutorials'],
	// Upgrade instruction sub-pages (platform + version-family pages not listed in the sidebar)
	['pe/installation/upgrade-instructions/', 'PE Upgrade Instruction Subpage'],
	['installation/upgrade-instructions/', 'CE Upgrade Instruction Subpage'],
] as const;

/**
 * @param url URL for the current page.
 * @returns The category for the current page as used by Algolia DocSearch to group search results.
 */
export function getPageCategory(url: { pathname: string }) {
	// Remove language prefix (/uk/) and /docs/ prefix
	let path = url.pathname;
	if (path.startsWith('/uk/')) path = path.slice(4);
	path = path.replace(/^\/docs\//, '');
	for (const [prefix, label] of categories) {
		if (path.startsWith(prefix)) return label;
	}
	return defaultCategory;
}
