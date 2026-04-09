/**
 * Generates redirect output files from src/data/redirects.ts:
 *   - public/_redirects   (Netlify format)
 *   - public/redirects.json (flat JSON map for Node.js middleware)
 *
 * Usage: pnpm generate:redirects
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	CATCH_ALL_REDIRECTS,
	SINGLE_REDIRECTS,
	getAllRedirectsFlat,
} from '../src/data/redirects.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Helpers for PREFIX_RENAME groups with empty entries
// ---------------------------------------------------------------------------

/**
 * For PREFIX_RENAME groups with empty entries (content-enumerated by .astro files),
 * map old prefix → new prefix so we can scan the content directory and populate
 * redirects.json with individual entries.
 */
const PREFIX_RENAME_MAP: Record<string, string> = {
	'user-guide/rule-engine-2-0/nodes': 'reference/rule-engine/nodes',
	'pe/user-guide/rule-engine-2-0/nodes': 'pe/reference/rule-engine/nodes',
	'paas/user-guide/rule-engine-2-0/nodes': 'paas/reference/rule-engine/nodes',
	'paas/eu/user-guide/rule-engine-2-0/nodes': 'paas/eu/reference/rule-engine/nodes',
	'pe/solution-templates': 'pe/recipes/solution-templates',
	'paas/solution-templates': 'paas/recipes/solution-templates',
	'paas/eu/solution-templates': 'paas/eu/recipes/solution-templates',
	'iot-gateway/install': 'iot-gateway/installation',
};

/** Recursively find all .mdx files under a directory, returning relative paths without extension. */
function findMdxSlugs(dir: string, base: string = ''): string[] {
	const slugs: string[] = [];
	try {
		for (const entry of readdirSync(dir)) {
			const fullPath = join(dir, entry);
			const relPath = base ? `${base}/${entry}` : entry;
			if (statSync(fullPath).isDirectory()) {
				slugs.push(...findMdxSlugs(fullPath, relPath));
			} else if (entry.endsWith('.mdx')) {
				const slug = relPath.replace(/\.mdx$/, '').replace(/\/index$/, '');
				slugs.push(slug);
			}
		}
	} catch {
		// Directory doesn't exist
	}
	return slugs;
}

// ---------------------------------------------------------------------------
// 1. Generate public/redirects.json
// ---------------------------------------------------------------------------

const flatMap = getAllRedirectsFlat();

// Add entries for PREFIX_RENAME groups with empty entries by scanning content
for (const [oldPrefix, newPrefix] of Object.entries(PREFIX_RENAME_MAP)) {
	const contentDir = resolve(ROOT, 'src/content/docs/docs', newPrefix);
	const slugs = findMdxSlugs(contentDir);
	for (const slug of slugs) {
		flatMap[`/docs/${oldPrefix}/${slug}/`] = `/docs/${newPrefix}/${slug}/`;
	}
}
const jsonPath = resolve(ROOT, 'public/redirects.json');
writeFileSync(jsonPath, JSON.stringify(flatMap, null, 2) + '\n');

const jsonCount = Object.keys(flatMap).length;
console.log(`✓ public/redirects.json — ${jsonCount} entries`);

// ---------------------------------------------------------------------------
// 2. Generate public/_redirects (Netlify format)
// ---------------------------------------------------------------------------

const redirectsPath = resolve(ROOT, 'public/_redirects');

// Read existing file and preserve manually-added rules above the auto-generated section
const existing = readFileSync(redirectsPath, 'utf-8');
const AUTO_START = '# === Auto-generated redirects from src/data/redirects.ts ===';
const AUTO_END = '# === End auto-generated redirects ===';

// Extract manual section (everything before auto-generated block, or the whole file if no block yet)
let manualSection: string;
const startIdx = existing.indexOf(AUTO_START);
if (startIdx >= 0) {
	manualSection = existing.slice(0, startIdx).trimEnd();
} else {
	manualSection = existing.trimEnd();
}

// Build auto-generated rules
const lines: string[] = [];
lines.push(AUTO_START);
lines.push('');

// Collect SINGLE_REDIRECTS that fall under a CATCH_ALL prefix so we can
// emit them right before the corresponding wildcard rule (Netlify matches
// the first rule, so specific overrides must precede their catch-all).
const catchAllPrefixes = CATCH_ALL_REDIRECTS.map((g) => g.oldPrefix);
const singlesByPrefix = new Map<string, typeof SINGLE_REDIRECTS>();
const remainingSingles: typeof SINGLE_REDIRECTS = [];

for (const entry of SINGLE_REDIRECTS) {
	const matchedPrefix = catchAllPrefixes.find((p) => entry.oldPath.startsWith(p + '/'));
	if (matchedPrefix) {
		if (!singlesByPrefix.has(matchedPrefix)) singlesByPrefix.set(matchedPrefix, []);
		singlesByPrefix.get(matchedPrefix)!.push(entry);
	} else {
		remainingSingles.push(entry);
	}
}

// Group catch-all entries by type for cleaner output
// PREFIX_RENAME: entries where different slugs map to different targets (tree-preserving)
// CONSOLIDATE: entries where all slugs map to the same target (fan-in)
for (const group of CATCH_ALL_REDIRECTS) {
	// Emit any single-page overrides for this prefix before the wildcard
	const overrides = singlesByPrefix.get(group.oldPrefix);
	if (overrides?.length) {
		for (const entry of overrides) {
			lines.push(`/docs/${entry.oldPath}/ ${entry.target} 301`);
		}
	}

	// PREFIX_RENAME with empty entries — content-enumerated, emit splat rule
	if (group.entries.length === 0) {
		const newPrefix = PREFIX_RENAME_MAP[group.oldPrefix];
		if (newPrefix) {
			lines.push(`/docs/${group.oldPrefix}/* /docs/${newPrefix}/:splat 301`);
		}
		continue;
	}

	// Check if all entries share the same target (CONSOLIDATE)
	const targets = new Set(group.entries.map((e) => e.target));

	if (targets.size === 1) {
		// CONSOLIDATE — one splat rule covers all
		const target = group.entries[0].target;
		lines.push(`/docs/${group.oldPrefix}/* ${target} 301`);
	} else {
		// PREFIX_RENAME — try to detect common prefix mapping for a splat rule
		const firstEntry = group.entries[0];
		const newFull = firstEntry.target.replace(/^\/docs\//, '').replace(/\/$/, '');
		const newPrefix = newFull.slice(0, newFull.length - firstEntry.slug.length).replace(/\/$/, '');

		const allMatch = group.entries.every((e) => {
			const expected = `/docs/${newPrefix}/${e.slug}/`;
			return e.target === expected;
		});

		if (allMatch && newPrefix) {
			// Clean prefix rename — one splat rule
			lines.push(`/docs/${group.oldPrefix}/* /docs/${newPrefix}/:splat 301`);
		} else {
			// Mixed targets — emit individual rules
			lines.push(`# ${group.oldPrefix} (mixed targets)`);
			for (const entry of group.entries) {
				const oldPath = entry.slug
					? `/docs/${group.oldPrefix}/${entry.slug}/`
					: `/docs/${group.oldPrefix}/`;
				lines.push(`${oldPath} ${entry.target} 301`);
			}
		}
	}
}

if (remainingSingles.length > 0) {
	lines.push('');
	lines.push('# Single page redirects');
	for (const entry of remainingSingles) {
		lines.push(`/docs/${entry.oldPath}/ ${entry.target} 301`);
	}
}

lines.push('');
lines.push(AUTO_END);

const output = manualSection + '\n\n' + lines.join('\n') + '\n';
writeFileSync(redirectsPath, output);

const ruleCount =
	CATCH_ALL_REDIRECTS.reduce((sum, g) => sum + (g.entries.length > 0 ? 1 : 0), 0) +
	SINGLE_REDIRECTS.length;
console.log(`✓ public/_redirects — ${ruleCount} rules (${jsonCount} total redirects)`);
