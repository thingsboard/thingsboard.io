/**
 * Migration Progress Report
 *
 * Fetches the production sitemap from https://thingsboard.io/sitemap.xml,
 * tests every URL against a local server (default http://localhost:4321),
 * and generates a categorized HTML report showing migration progress.
 *
 * Usage:
 *   pnpm migration:progress
 *   node --experimental-transform-types ./scripts/migration-progress.ts
 *
 * Options (env vars):
 *   LOCAL_BASE=http://localhost:4321   — local server base URL
 *   CONCURRENCY=20                    — max parallel requests
 *   EXCLUDE_LIBRARY=true              — exclude /devices-library/ and /samples/ paths from stats and report
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SITEMAP_URL = 'https://thingsboard.io/sitemap.xml';
const LOCAL_BASE = process.env.LOCAL_BASE ?? 'http://localhost:4321';
const CONCURRENCY = Number(process.env.CONCURRENCY) || 20;
const EXCLUDE_LIBRARY = process.env.EXCLUDE_LIBRARY === 'true';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const REPORT_DIR = resolve(ROOT, 'reports');
const REPORT_PATH = resolve(REPORT_DIR, 'migration-progress.html');

// ---------------------------------------------------------------------------
// Category definitions (most-specific prefix first)
// ---------------------------------------------------------------------------

interface Category {
	id: string;
	label: string;
	/** Match function — returns true if this category owns the path. */
	match: (path: string) => boolean;
}

// Device Library / Samples pattern: paths containing /devices-library/, /device-library/, or /samples/
const DEVICES_LIBRARY_RE = /\/devices?-library\//;
const EXCLUDED_RE = /\/devices?-library\/|\/samples\//;

const CATEGORIES: Category[] = [
	// --- Device Library & Samples (extracted first, before any product match) ---
	{
		id: 'devices-library',
		label: 'Device Library',
		match: (p) => DEVICES_LIBRARY_RE.test(p),
	},
	{
		id: 'samples',
		label: 'Samples',
		match: (p) => /\/samples\//.test(p),
	},

	// --- Product categories (most-specific first) ---
	// Edge PE: any docs path containing /edge/pe/ or /pe/edge/
	{
		id: 'edge-pe',
		label: 'Edge PE',
		match: (p) => p.startsWith('/docs/') && (/\/edge\/pe\//.test(p) || /\/pe\/edge\//.test(p)),
	},
	// Edge: any docs path containing /edge/ (after Edge PE is matched)
	{
		id: 'edge',
		label: 'Edge',
		match: (p) => p.startsWith('/docs/') && /\/edge\//.test(p),
	},

	// Prefix-based products (order: most-specific prefix first)
	{ id: 'paas-eu', label: 'PaaS EU (Cloud EU)', match: (p) => p.startsWith('/docs/paas/eu/') },
	{ id: 'paas', label: 'PaaS (Cloud)', match: (p) => p.startsWith('/docs/paas/') },
	{ id: 'pe', label: 'Professional Edition (PE)', match: (p) => p.startsWith('/docs/pe/') && !p.startsWith('/docs/pe/mqtt-broker/') },
	{ id: 'trendz', label: 'Trendz', match: (p) => p.startsWith('/docs/trendz/') },
	{ id: 'gw', label: 'IoT Gateway', match: (p) => p.startsWith('/docs/iot-gateway/') },
	{ id: 'tbmq-pe', label: 'TBMQ PE', match: (p) => p.startsWith('/docs/mqtt-broker/pe/') || p.startsWith('/docs/pe/mqtt-broker/') },
	{ id: 'tbmq', label: 'TBMQ', match: (p) => p.startsWith('/docs/mqtt-broker/') },
	{ id: 'mobile-pe', label: 'Mobile PE', match: (p) => p.startsWith('/docs/mobile/pe/') },
	{ id: 'mobile', label: 'Mobile', match: (p) => p.startsWith('/docs/mobile/') },
	{ id: 'license', label: 'License Server', match: (p) => p.startsWith('/docs/license-server/') },
	{ id: 'ce', label: 'Community Edition (CE)', match: (p) => p.startsWith('/docs/') && !p.startsWith('/docs/services/') },
	// Non-docs is the fallback — matched when nothing above matches
];

const NON_DOCS_ID = 'non-docs';
const NON_DOCS_LABEL = 'Non-docs pages';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PageResult {
	path: string;
	status: number | 'error';
	migrated: boolean;
}

interface CategoryResult {
	id: string;
	label: string;
	total: number;
	migrated: number;
	missing: string[];
}

// ---------------------------------------------------------------------------
// Sitemap fetching
// ---------------------------------------------------------------------------

async function fetchSitemapPaths(): Promise<string[]> {
	console.log(`Fetching sitemap from ${SITEMAP_URL}...`);
	const res = await fetch(SITEMAP_URL);
	if (!res.ok) {
		throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
	}
	const xml = await res.text();

	const locRegex = /<loc>https?:\/\/thingsboard\.io(\/.*?)<\/loc>/gi;
	const paths = Array.from(xml.matchAll(locRegex), (m) => m[1]!);

	// Deduplicate, keep only trailing-slash URLs, and sort
	const unique = [...new Set(paths)];
	const filtered = unique.filter((p) => p.endsWith('/')).sort();

	console.log(`Found ${unique.length} unique URLs in sitemap (${unique.length - filtered.length} non-trailing-slash URLs removed).`);
	return filtered;
}

// ---------------------------------------------------------------------------
// URL classification
// ---------------------------------------------------------------------------

function classifyPath(path: string): string {
	for (const cat of CATEGORIES) {
		if (cat.match(path)) {
			return cat.id;
		}
	}
	return NON_DOCS_ID;
}

// ---------------------------------------------------------------------------
// Parallel URL testing
// ---------------------------------------------------------------------------

async function testUrl(path: string): Promise<PageResult> {
	const url = `${LOCAL_BASE}${path}`;
	try {
		const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
		return { path, status: res.status, migrated: res.status === 200 };
	} catch {
		return { path, status: 'error', migrated: false };
	}
}

async function testAllUrls(paths: string[]): Promise<PageResult[]> {
	const results: PageResult[] = [];
	let completed = 0;

	// Process in batches
	for (let i = 0; i < paths.length; i += CONCURRENCY) {
		const batch = paths.slice(i, i + CONCURRENCY);
		const batchResults = await Promise.all(batch.map(testUrl));
		results.push(...batchResults);
		completed += batchResults.length;

		// Progress indicator
		const pct = ((completed / paths.length) * 100).toFixed(1);
		process.stdout.write(`\rTesting URLs: ${completed}/${paths.length} (${pct}%)`);
	}
	process.stdout.write('\n');

	return results;
}

// ---------------------------------------------------------------------------
// Build category results
// ---------------------------------------------------------------------------

function buildCategoryResults(results: PageResult[]): CategoryResult[] {
	const buckets = new Map<string, PageResult[]>();

	// Initialize all buckets
	for (const cat of CATEGORIES) {
		buckets.set(cat.id, []);
	}
	buckets.set(NON_DOCS_ID, []);

	// Classify results
	for (const r of results) {
		const catId = classifyPath(r.path);
		buckets.get(catId)!.push(r);
	}

	// Build summary for each category
	const categoryResults: CategoryResult[] = [];

	for (const cat of CATEGORIES) {
		const pages = buckets.get(cat.id)!;
		if (pages.length === 0) continue;
		categoryResults.push({
			id: cat.id,
			label: cat.label,
			total: pages.length,
			migrated: pages.filter((p) => p.migrated).length,
			missing: pages
				.filter((p) => !p.migrated)
				.map((p) => p.path)
				.sort(),
		});
	}

	// Non-docs
	const nonDocs = buckets.get(NON_DOCS_ID)!;
	if (nonDocs.length > 0) {
		categoryResults.push({
			id: NON_DOCS_ID,
			label: NON_DOCS_LABEL,
			total: nonDocs.length,
			migrated: nonDocs.filter((p) => p.migrated).length,
			missing: nonDocs
				.filter((p) => !p.migrated)
				.map((p) => p.path)
				.sort(),
		});
	}

	return categoryResults;
}

// ---------------------------------------------------------------------------
// HTML report generation
// ---------------------------------------------------------------------------

function progressColor(pct: number): string {
	if (pct >= 80) return '#22c55e';
	if (pct >= 50) return '#eab308';
	return '#ef4444';
}

function formatDuration(ms: number): string {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
	return `${remainingSeconds}s`;
}

function generateHtml(categories: CategoryResult[], totalUrls: number, elapsedMs: number): string {
	const now = new Date().toISOString().split('T')[0];
	const overallMigrated = categories.reduce((s, c) => s + c.migrated, 0);
	const overallTotal = categories.reduce((s, c) => s + c.total, 0);
	const overallPct = overallTotal > 0 ? (overallMigrated / overallTotal) * 100 : 0;

	const summaryRows = categories
		.map((c) => {
			const pct = c.total > 0 ? (c.migrated / c.total) * 100 : 0;
			const missingCount = c.total - c.migrated;
			const color = progressColor(pct);
			return `
			<tr>
				<td><a href="#${c.id}">${c.label}</a></td>
				<td class="num">${c.total}</td>
				<td class="num">${c.migrated}</td>
				<td class="num">${missingCount}</td>
				<td>
					<div class="progress-bar">
						<div class="progress-fill" style="width:${pct.toFixed(1)}%;background:${color}"></div>
					</div>
				</td>
				<td class="num" style="color:${color};font-weight:600">${pct.toFixed(1)}%</td>
			</tr>`;
		})
		.join('\n');

	const overallColor = progressColor(overallPct);

	const detailSections = categories
		.map((c) => {
			const pct = c.total > 0 ? (c.migrated / c.total) * 100 : 0;
			const missingCount = c.total - c.migrated;
			const color = progressColor(pct);

			const missingList =
				missingCount > 0
					? `<ul class="missing-list">${c.missing.map((p) => `<li><a href="https://thingsboard.io${p}" target="_blank" rel="noopener noreferrer">${p}</a></li>`).join('\n')}</ul>`
					: '<p class="all-done">All pages migrated!</p>';

			return `
			<div class="category-section" id="${c.id}">
				<details${missingCount > 0 ? '' : ''}>
					<summary>
						<h2>${c.label}
							<span class="badge" style="background:${color}">${pct.toFixed(1)}%</span>
							<span class="counts">${c.migrated} / ${c.total} migrated, ${missingCount} missing</span>
						</h2>
					</summary>
					${missingList}
				</details>
			</div>`;
		})
		.join('\n');

	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ThingsBoard Migration Progress Report — ${now}</title>
<style>
	* { margin: 0; padding: 0; box-sizing: border-box; }
	body {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		color: #1e293b;
		background: #f8fafc;
		padding: 2rem;
		line-height: 1.5;
	}
	.container { max-width: 1100px; margin: 0 auto; }

	header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 1.5rem;
		border-bottom: 2px solid #e2e8f0;
	}
	header h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
	header .meta { color: #64748b; font-size: 0.875rem; }

	/* Overall banner */
	.overall {
		background: #fff;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}
	.overall h2 { font-size: 1.125rem; margin-bottom: 0.75rem; }
	.overall .big-pct { font-size: 3rem; font-weight: 700; }
	.overall .big-counts { color: #64748b; font-size: 0.95rem; margin-top: 0.25rem; }
	.overall .progress-bar { height: 12px; margin-top: 0.75rem; }

	/* Summary table */
	.summary-table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
	.summary-table th, .summary-table td { padding: 0.625rem 0.75rem; text-align: left; border-bottom: 1px solid #f1f5f9; }
	.summary-table th { background: #f8fafc; font-size: 0.75rem; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; }
	.summary-table td.num { text-align: right; font-variant-numeric: tabular-nums; }
	.summary-table a { color: #3b82f6; text-decoration: none; }
	.summary-table a:hover { text-decoration: underline; }
	.summary-table tr:last-child td { border-bottom: none; }

	/* Progress bars */
	.progress-bar {
		background: #e2e8f0;
		border-radius: 999px;
		height: 8px;
		overflow: hidden;
		min-width: 120px;
	}
	.progress-fill { height: 100%; border-radius: 999px; transition: width 0.3s; }

	/* Detail sections */
	.category-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem; }
	.category-section details { padding: 1rem 1.25rem; }
	.category-section summary { cursor: pointer; list-style: none; }
	.category-section summary::-webkit-details-marker { display: none; }
	.category-section summary::before {
		content: '▶';
		display: inline-block;
		margin-right: 0.5rem;
		font-size: 0.75rem;
		transition: transform 0.2s;
	}
	.category-section details[open] summary::before { transform: rotate(90deg); }
	.category-section h2 { display: inline; font-size: 1rem; }
	.badge {
		display: inline-block;
		color: #fff;
		padding: 0.125rem 0.5rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 600;
		margin-left: 0.5rem;
		vertical-align: middle;
	}
	.counts { color: #94a3b8; font-size: 0.8rem; font-weight: 400; margin-left: 0.75rem; }
	.missing-list { margin-top: 0.75rem; padding-left: 1.5rem; columns: 2; column-gap: 2rem; }
	.missing-list li { font-size: 0.8rem; padding: 0.125rem 0; break-inside: avoid; }
	.missing-list a { color: #64748b; text-decoration: none; }
	.missing-list a:hover { color: #3b82f6; text-decoration: underline; }
	.all-done { margin-top: 0.75rem; color: #22c55e; font-weight: 600; font-size: 0.875rem; }

	/* Print */
	@media print {
		body { background: #fff; padding: 0.5cm; font-size: 10pt; }
		.container { max-width: 100%; }
		.category-section { break-inside: avoid; page-break-inside: avoid; }
		.category-section details { open: true; }
		details[open] summary::before { content: '' !important; }
		.missing-list { columns: 2; }
		a { color: inherit !important; text-decoration: none !important; }
		.summary-table a { color: #1e293b !important; }
	}
</style>
</head>
<body>
<div class="container">
	<header>
		<h1>ThingsBoard Migration Progress Report</h1>
		<div class="meta">
			Generated: ${now} &nbsp;|&nbsp;
			Source: <code>${SITEMAP_URL}</code> (${totalUrls} URLs) &nbsp;|&nbsp;
			Target: <code>${LOCAL_BASE}</code> &nbsp;|&nbsp;
			Duration: ${formatDuration(elapsedMs)}
		</div>
	</header>

	<div class="overall">
		<h2>Overall Progress</h2>
		<div class="big-pct" style="color:${overallColor}">${overallPct.toFixed(1)}%</div>
		<div class="big-counts">${overallMigrated} of ${overallTotal} pages migrated — ${overallTotal - overallMigrated} remaining</div>
		<div class="progress-bar">
			<div class="progress-fill" style="width:${overallPct.toFixed(1)}%;background:${overallColor}"></div>
		</div>
	</div>

	<table class="summary-table">
		<thead>
			<tr>
				<th>Category</th>
				<th style="text-align:right">Total</th>
				<th style="text-align:right">Migrated</th>
				<th style="text-align:right">Missing</th>
				<th>Progress</th>
				<th style="text-align:right">%</th>
			</tr>
		</thead>
		<tbody>
			${summaryRows}
			<tr style="font-weight:700;border-top:2px solid #cbd5e1">
				<td>Overall</td>
				<td class="num">${overallTotal}</td>
				<td class="num">${overallMigrated}</td>
				<td class="num">${overallTotal - overallMigrated}</td>
				<td>
					<div class="progress-bar" style="height:10px">
						<div class="progress-fill" style="width:${overallPct.toFixed(1)}%;background:${overallColor}"></div>
					</div>
				</td>
				<td class="num" style="color:${overallColor}">${overallPct.toFixed(1)}%</td>
			</tr>
		</tbody>
	</table>

	<h2 style="font-size:1.25rem;margin-bottom:1rem">Details by category</h2>
	${detailSections}
</div>

<script>
	// Auto-open details sections when printing
	window.addEventListener('beforeprint', () => {
		document.querySelectorAll('details').forEach(d => d.open = true);
	});
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	const startTime = Date.now();

	// 1. Fetch sitemap
	let paths = await fetchSitemapPaths();

	// 1b. Optionally exclude device-library and samples paths
	if (EXCLUDE_LIBRARY) {
		const before = paths.length;
		paths = paths.filter((p) => !EXCLUDED_RE.test(p));
		console.log(`EXCLUDE_LIBRARY=true — removed ${before - paths.length} device-library/samples URLs (${paths.length} remaining).`);
	}

	// 2. Test all URLs
	console.log(`Testing ${paths.length} URLs against ${LOCAL_BASE} (concurrency: ${CONCURRENCY})...`);
	const results = await testAllUrls(paths);

	// 3. Build category results
	const categories = buildCategoryResults(results);

	const elapsedMs = Date.now() - startTime;

	// 4. Generate HTML report
	const html = generateHtml(categories, paths.length, elapsedMs);

	mkdirSync(REPORT_DIR, { recursive: true });
	writeFileSync(REPORT_PATH, html);

	// 5. Print summary to console
	console.log('\n=== Migration Progress Summary ===\n');
	for (const c of categories) {
		const pct = c.total > 0 ? ((c.migrated / c.total) * 100).toFixed(1) : '0.0';
		const missing = c.total - c.migrated;
		console.log(`  ${c.label.padEnd(30)} ${c.migrated}/${c.total} (${pct}%) — ${missing} missing`);
	}

	const overallMigrated = categories.reduce((s, c) => s + c.migrated, 0);
	const overallTotal = categories.reduce((s, c) => s + c.total, 0);
	const overallPct = overallTotal > 0 ? ((overallMigrated / overallTotal) * 100).toFixed(1) : '0.0';
	console.log(`\n  ${'OVERALL'.padEnd(30)} ${overallMigrated}/${overallTotal} (${overallPct}%)`);
	console.log(`\nCompleted in ${formatDuration(elapsedMs)}`);
	console.log(`Report written to: ${REPORT_PATH}`);
}

main().catch((err) => {
	console.error('Error:', err);
	process.exit(1);
});
