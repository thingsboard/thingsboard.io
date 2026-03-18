/**
 * Generates redirect output files from src/data/redirects.ts:
 *   - public/_redirects   (Netlify format)
 *   - public/redirects.json (flat JSON map for Node.js middleware)
 *
 * Usage: pnpm generate:redirects
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	CATCH_ALL_REDIRECTS,
	SINGLE_REDIRECTS,
	getAllRedirectsFlat,
} from '../src/data/redirects.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// 1. Generate public/redirects.json
// ---------------------------------------------------------------------------

const flatMap = getAllRedirectsFlat();
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

// Group catch-all entries by type for cleaner output
// PREFIX_RENAME: entries where different slugs map to different targets (tree-preserving)
// CONSOLIDATE: entries where all slugs map to the same target (fan-in)
for (const group of CATCH_ALL_REDIRECTS) {
	if (group.entries.length === 0) continue;

	// Check if all entries share the same target (CONSOLIDATE)
	const targets = new Set(group.entries.map((e) => e.target));

	if (targets.size === 1) {
		// CONSOLIDATE — one splat rule covers all
		const target = group.entries[0].target;
		lines.push(`/docs/${group.oldPrefix}/* ${target} 301`);
	} else {
		// PREFIX_RENAME — try to detect common prefix mapping for a splat rule
		// Check if there's a consistent prefix transformation
		const firstEntry = group.entries[0];
		const oldFull = `${group.oldPrefix}/${firstEntry.slug}`;
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

if (SINGLE_REDIRECTS.length > 0) {
	lines.push('');
	lines.push('# Single page redirects');
	for (const entry of SINGLE_REDIRECTS) {
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
