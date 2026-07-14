import { getProductTitleName, getVersionFromSlug } from '@util/path-utils';

/**
 * SEO product label used in the eyebrow line.
 * Examples: 'ThingsBoard', 'ThingsBoard PE', 'ThingsBoard Edge PE'.
 */
export function getProductLabel(slug: string): string {
	return getProductTitleName(getVersionFromSlug(slug));
}

/**
 * First path segment after the docs/version prefix, prettified.
 * 'docs/pe/getting-started/quickstart' → 'Getting Started'
 * 'docs/getting-started'               → 'Getting Started'
 * Returns empty string for product-root pages.
 */
export function getSectionLabel(slug: string): string {
	let path = slug;
	if (path.startsWith('uk/')) path = path.slice(3);
	if (path.startsWith('docs/')) path = path.slice(5);
	const versionPrefixes = [
		'pe/', 'paas/eu/', 'paas/', 'edge/pe/', 'edge/',
		'trendz/', 'iot-gateway/', 'mqtt-broker/pe/', 'mqtt-broker/',
		'mobile/pe/', 'mobile/', 'license-server/', 'iot-hub/',
	];
	for (const prefix of versionPrefixes) {
		if (path.startsWith(prefix)) {
			path = path.slice(prefix.length);
			break;
		}
	}
	const firstSegment = path.split('/')[0] ?? '';
	if (!firstSegment) return '';
	return firstSegment
		.split('-')
		.map((word) => (word ? word[0]!.toUpperCase() + word.slice(1) : word))
		.join(' ');
}

/** Format a Date as 'Mon DD, YYYY' (e.g. 'Apr 28, 2026'). */
export function formatBlogDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
	});
}

/**
 * Word-boundary truncate. Returns the original if shorter than max.
 * Adds an ellipsis character when cutting.
 */
export function truncate(text: string, max: number): string {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	const lastSpace = cut.lastIndexOf(' ');
	const stem = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
	return stem + '…';
}

/**
 * Marketing pages we generate cards for.
 * Anything outside this list falls through to the global fallback PNG.
 * Curated from the spec's "Risks and open questions" section.
 *
 * Wildcard suffix `/*` means "this page and any direct children".
 */
export const MARKETING_ALLOWLIST: ReadonlyArray<string> = [
	'/',
	'/pricing/',
	'/products/*',
	'/industries/*',
	'/partners/*',
	'/services/*',
	'/careers/*',
	'/clients-feedback/',
	'/mediakit/',
	'/contact-us/',
	'/asset-management/',
	'/device-management/',
	'/installations/*',
	'/iot-data-visualization/',
	'/monitoring-dashboard/',
	'/smart-farming-demo/',
	'/google-iot-core-alternative/',
	'/ce-vs-pe-diff/',
	'/cookie-policy/',
	'/energy-management/',
	'/company/*',
];

/** Test whether a marketing pathname is in the allowlist. */
export function isAllowlistedMarketingPath(pathname: string): boolean {
	const normalized = pathname.endsWith('/') ? pathname : pathname + '/';
	for (const pattern of MARKETING_ALLOWLIST) {
		if (pattern.endsWith('/*')) {
			const prefix = pattern.slice(0, -1);
			if (normalized.startsWith(prefix)) return true;
		} else if (normalized === pattern) {
			return true;
		}
	}
	return false;
}
