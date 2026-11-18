/**
 * Addresses of the old tabbed installations page (`?product=thingsboard-cloud`, `#tab-thingsboard-pe`)
 * and the /installations/ section each one now opens. The page sends a visitor who arrives on an old
 * address to its section; linkcheck reports links on this site that still use one.
 *
 * `scripts/lint-linkcheck.ts` imports this in plain Node, so it uses no path aliases and no `window`.
 */

// A Map, not an object: `?product=constructor` must not resolve to a prototype member.
const LEGACY_SECTIONS = new Map([
	['thingsboard-cloud', 'cloud'],
	['thingsboard-pe', 'on-premises'],
	['thingsboard-ce', 'on-premises'],
	['thingsboard-edge', 'edge'],
	['thingsboard-trendz', 'trendz'],
]);

/** The /installations/ section an old address opens, or `undefined` when the address is current. */
export function legacyInstallationsSection(search: string, hash: string): string | undefined {
	const product = new URLSearchParams(search).get('product') ?? '';
	return (
		LEGACY_SECTIONS.get(product) ??
		(hash.startsWith('#tab-') ? LEGACY_SECTIONS.get(hash.slice('#tab-'.length)) : undefined)
	);
}
