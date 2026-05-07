/**
 * Detects redirect chains in src/data/redirects.ts.
 *
 * A "chain" is a SINGLE_REDIRECTS or NON_DOCS_REDIRECTS target that itself
 * matches a downstream CATCH_ALL or DYNAMIC pattern — meaning the browser
 * would have to follow two 301s to reach the final page. Cloudflare doesn't
 * follow internal redirects, so each hop is a fresh round-trip; chains hurt
 * Core Web Vitals and dilute PageRank.
 *
 * Exits non-zero if any chain is found.
 *
 * Usage: pnpm lint:redirects
 */

import {
	CATCH_ALL_REDIRECTS,
	SINGLE_REDIRECTS,
	DYNAMIC_REDIRECTS,
	NON_DOCS_REDIRECTS,
} from '../src/data/redirects.ts';

interface Pattern {
	source: string;
	regex: RegExp;
	origin: string;
}

/** Convert a Cloudflare-style redirect source into a regex. */
function patternToRegex(source: string): RegExp {
	// Escape regex specials, then re-introduce splat and :placeholder semantics.
	let body = source.replace(/[.+^${}()|[\]\\]/g, '\\$&');
	body = body.replace(/\*/g, '.*');
	body = body.replace(/:[A-Za-z_][A-Za-z0-9_]*/g, '[^/]+');
	return new RegExp(`^${body}$`);
}

const patterns: Pattern[] = [];

for (const group of CATCH_ALL_REDIRECTS) {
	const source = `/docs/${group.oldPrefix}/*`;
	patterns.push({
		source,
		regex: patternToRegex(source),
		origin: `CATCH_ALL_REDIRECTS[${group.oldPrefix}]`,
	});
}

for (const group of DYNAMIC_REDIRECTS) {
	for (const entry of group.entries) {
		patterns.push({
			source: entry.source,
			regex: patternToRegex(entry.source),
			origin: `DYNAMIC_REDIRECTS — ${group.comment}`,
		});
	}
}

interface Chain {
	from: string;
	target: string;
	matchedSource: string;
	matchedOrigin: string;
}

const chains: Chain[] = [];

for (const entry of SINGLE_REDIRECTS) {
	const source = `/docs/${entry.oldPath}/`;
	for (const pattern of patterns) {
		if (pattern.regex.test(entry.target)) {
			chains.push({
				from: `SINGLE_REDIRECTS: ${source}`,
				target: entry.target,
				matchedSource: pattern.source,
				matchedOrigin: pattern.origin,
			});
			break;
		}
	}
}

for (const [source, target] of Object.entries(NON_DOCS_REDIRECTS)) {
	for (const pattern of patterns) {
		if (pattern.regex.test(target)) {
			chains.push({
				from: `NON_DOCS_REDIRECTS: ${source}`,
				target,
				matchedSource: pattern.source,
				matchedOrigin: pattern.origin,
			});
			break;
		}
	}
}

if (chains.length === 0) {
	console.log(
		`✓ No redirect chains found across ${SINGLE_REDIRECTS.length} SINGLE + ${Object.keys(NON_DOCS_REDIRECTS).length} NON_DOCS targets.`,
	);
	process.exit(0);
}

console.error(`✗ Found ${chains.length} redirect chain${chains.length === 1 ? '' : 's'}:\n`);
for (const chain of chains) {
	console.error(`  ${chain.from}`);
	console.error(`    → ${chain.target}`);
	console.error(`    matches downstream pattern ${chain.matchedSource} (${chain.matchedOrigin})\n`);
}
console.error(
	'Rewrite the upstream target to point directly at the final destination so each request resolves in a single hop.',
);
process.exit(1);
