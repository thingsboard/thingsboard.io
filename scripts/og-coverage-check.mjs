// scripts/og-coverage-check.mjs
//
// Compare sitemap URLs against generated OG PNGs and print URLs without a
// card. Exits with code 1 if any non-draft URL lacks an OG.
//
// Run after `pnpm build` so dist/sitemap-0.xml + dist/open-graph/ exist.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

if (!existsSync('dist/sitemap-0.xml') || !existsSync('dist/open-graph')) {
	console.error('Missing dist/sitemap-0.xml or dist/open-graph/. Run `pnpm build` first.');
	process.exit(2);
}

function walkPng(dir) {
	const out = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walkPng(full));
		else if (entry.name.endsWith('.png')) out.push(full);
	}
	return out;
}

const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
	.map((m) => m[1].replace('https://thingsboard.io', ''))
	.sort();

const ogPaths = walkPng('dist/open-graph');
const ogUrls = new Set(
	ogPaths.map((p) => {
		const rel = p.replace(/^dist\/open-graph\//, '').replace(/\.png$/, '');
		const [coll, ...rest] = rel.split('/');
		const slug = rest.join('/');
		if (coll === 'docs') return `/docs/${slug}/`;
		if (coll === 'pages') return slug === 'index' ? '/' : `/${slug}/`;
		return `/${coll}/${slug}/`;
	}),
);

const missing = sitemapUrls.filter((u) => !ogUrls.has(u));
const byPrefix = new Map();
for (const url of missing) {
	const top = url.split('/')[1] || '(root)';
	byPrefix.set(top, (byPrefix.get(top) ?? 0) + 1);
}

console.log(`Sitemap URLs: ${sitemapUrls.length}`);
console.log(`OG PNGs:      ${ogPaths.length}`);
console.log(`Missing OG:   ${missing.length}`);
if (missing.length > 0) {
	console.log('\nMissing by top-level prefix:');
	for (const [pfx, n] of [...byPrefix.entries()].sort((a, b) => b[1] - a[1])) {
		console.log(`  ${pfx.padEnd(20)} ${n}`);
	}
	console.log('\nFirst 30 missing URLs:');
	for (const u of missing.slice(0, 30)) console.log(`  ${u}`);
	process.exit(1);
}
console.log('\n✓ Every sitemap URL has its own OG.');
