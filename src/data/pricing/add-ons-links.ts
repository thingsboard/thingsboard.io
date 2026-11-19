/**
 * #hash deep links to the Add-ons section of a pricing sub-tab. No element has these ids (Public
 * Cloud has an NA and an EU section), so the page script resolves them; linkcheck accepts them.
 * `scripts/lint-linkcheck.ts` imports this in plain Node, so it uses no path aliases and no `window`.
 */

// A Map, not an object: the hash is user-controlled, and `#constructor` must not resolve to a
// prototype member.
export const ADD_ONS_SUB_TAB_BY_HASH = new Map([
	['add-ons-cloud', 'thingsboard-cloud'],
	['add-ons-private-cloud', 'thingsboard-private-cloud'],
]);
