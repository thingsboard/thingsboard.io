import { existsSync, readFileSync } from 'node:fs';

/**
 * Simulates how Cloudflare Pages evaluates `public/_redirects` against
 * incoming requests. The linkcheck previously looked up files in `dist/`
 * directly, which missed cases where a redirect rule shadows a real file
 * (e.g. a catch-all `/foo/* → /bar/:splat 301` that rewrites the URL to a
 * destination where no file exists). By replaying redirects in the same
 * order as Cloudflare, the linkcheck can validate the final URL a user
 * would actually reach.
 *
 * Supports `*` (splat) and `:name` placeholders in source patterns, and
 * substitutes `:splat` / `:name` in destinations. Treats status < 300 or
 * >= 400 as non-redirect (rewrite, proxy, etc.) and stops the chain.
 */

export interface RedirectRule {
	source: string;
	sourceRegex: RegExp;
	destination: string;
	status: number;
	placeholderNames: string[];
}

/**
 * Index over redirect rules. Static rules (no `*` / `:` placeholders) go into
 * a `Map<source, rule>` for O(1) lookup; dynamic rules keep their declaration
 * order and are scanned linearly. With ~1k rules in `public/_redirects` (of
 * which ~95% are static), this avoids regex-testing every rule on every link
 * during a full link check pass.
 */
export interface RedirectRuleIndex {
	staticRules: Map<string, RedirectRule>;
	dynamicRules: RedirectRule[];
	ordered: RedirectRule[];
}

export interface RedirectChain {
	steps: { from: string; to: string; status: number }[];
	finalPathname: string;
	external: boolean;
	loop: boolean;
}

const MAX_REDIRECT_DEPTH = 10;

function escapeRegex(s: string) {
	return s.replace(/[.+^${}()|[\]\\]/g, '\\$&');
}

function compileSourcePattern(source: string): {
	regex: RegExp;
	placeholderNames: string[];
} {
	const placeholderNames: string[] = [];
	let regex = '';
	for (let i = 0; i < source.length; ) {
		const ch = source[i];
		if (ch === '*') {
			placeholderNames.push('splat');
			regex += '(.*)';
			i++;
			continue;
		}
		if (ch === ':') {
			let name = '';
			i++;
			while (i < source.length && /[a-zA-Z0-9_]/.test(source[i])) {
				name += source[i];
				i++;
			}
			if (name) {
				placeholderNames.push(name);
				regex += '([^/]+)';
			} else {
				regex += escapeRegex(':');
			}
			continue;
		}
		regex += escapeRegex(ch);
		i++;
	}
	return { regex: new RegExp('^' + regex + '$'), placeholderNames };
}

function substituteDestination(
	destination: string,
	match: RegExpMatchArray,
	placeholderNames: string[]
): string {
	const values: Record<string, string> = {};
	placeholderNames.forEach((name, idx) => {
		values[name] = match[idx + 1] ?? '';
	});
	return destination.replace(/:([a-zA-Z0-9_]+)/g, (whole, name: string) => {
		return values[name] ?? whole;
	});
}

export function parseRedirectsFile(content: string): RedirectRuleIndex {
	const ordered: RedirectRule[] = [];
	const staticRules = new Map<string, RedirectRule>();
	const dynamicRules: RedirectRule[] = [];

	for (const rawLine of content.split('\n')) {
		const line = rawLine.replace(/#.*$/, '').trim();
		if (!line) continue;
		const parts = line.split(/\s+/);
		if (parts.length < 2) continue;
		const source = parts[0];
		const destination = parts[1];
		const status = parts[2] ? parseInt(parts[2], 10) : 301;
		if (Number.isNaN(status)) continue;
		// Skip rules whose source isn't a path (e.g. accidental comment leftovers)
		if (!source.startsWith('/')) continue;
		const { regex, placeholderNames } = compileSourcePattern(source);
		const rule: RedirectRule = {
			source,
			sourceRegex: regex,
			destination,
			status,
			placeholderNames,
		};
		ordered.push(rule);
		if (placeholderNames.length === 0) {
			// Static rule: first declaration wins (matches Cloudflare's first-match-wins).
			if (!staticRules.has(source)) staticRules.set(source, rule);
		} else {
			dynamicRules.push(rule);
		}
	}

	return { staticRules, dynamicRules, ordered };
}

function findMatchingRule(pathname: string, index: RedirectRuleIndex): RedirectRule | undefined {
	const staticHit = index.staticRules.get(pathname);
	if (staticHit) return staticHit;
	for (const rule of index.dynamicRules) {
		if (rule.sourceRegex.test(pathname)) return rule;
	}
	return undefined;
}

export function applyRedirects(pathname: string, index: RedirectRuleIndex): RedirectChain {
	const steps: { from: string; to: string; status: number }[] = [];
	const visited = new Set<string>();
	let current = pathname;

	for (let depth = 0; depth <= MAX_REDIRECT_DEPTH; depth++) {
		if (visited.has(current)) {
			return { steps, finalPathname: current, external: false, loop: true };
		}
		visited.add(current);

		const rule = findMatchingRule(current, index);
		if (!rule) {
			return { steps, finalPathname: current, external: false, loop: false };
		}
		if (rule.status < 300 || rule.status >= 400) {
			return { steps, finalPathname: current, external: false, loop: false };
		}

		const match = current.match(rule.sourceRegex)!;
		const dest = substituteDestination(rule.destination, match, rule.placeholderNames);
		steps.push({ from: current, to: dest, status: rule.status });

		if (/^([a-z][a-z0-9+\-.]*:)?\/\//i.test(dest)) {
			return { steps, finalPathname: dest, external: true, loop: false };
		}

		current = dest;
	}
	return { steps, finalPathname: current, external: false, loop: true };
}

const EMPTY_INDEX: RedirectRuleIndex = {
	staticRules: new Map(),
	dynamicRules: [],
	ordered: [],
};

let cachedPath: string | null = null;
let cachedIndex: RedirectRuleIndex = EMPTY_INDEX;

export function loadRedirectsFile(path: string): RedirectRuleIndex {
	if (cachedPath === path) return cachedIndex;
	cachedPath = path;
	cachedIndex = existsSync(path) ? parseRedirectsFile(readFileSync(path, 'utf-8')) : EMPTY_INDEX;
	return cachedIndex;
}

export function formatRedirectChain(chain: RedirectChain): string {
	if (chain.steps.length === 0) return '(no redirect)';
	const parts: string[] = [];
	for (const step of chain.steps) {
		parts.push(`${step.from} →[${step.status}]→ ${step.to}`);
	}
	return parts.join('; ');
}
