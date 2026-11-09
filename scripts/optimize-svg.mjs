import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { optimize } from 'svgo';

// Minifies SVG assets in place with SVGO. Safe to re-run: optimized files come out byte-identical.
//
//   pnpm optimize:svg                      # every SVG under src/assets and public
//   pnpm optimize:svg path/to/file.svg dir # just these files / directories
//
// After touching src/assets/images/landings/nav/, run `pnpm generate:nav-sprite`
// so the committed sprite matches its sources.

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_TARGETS = [join(ROOT, 'src/assets'), join(ROOT, 'public')];

const SVGO_CONFIG = {
	multipass: true,
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					// Inlined SVGs share the page: page CSS may target their ids, and
					// minified ids (`a`, `b`, …) would collide between two of them.
					cleanupIds: false,
					// SVGO's attribute table predates SVG 2 and drops `href`/`title` from `<a>`.
					removeUnknownsAndDefaults: { unknownAttrs: false },
					// Collapses `<g opacity=".26"><path opacity=".26"/>` into one opacity (~4× darker).
					collapseGroups: false,
					// Embedded rasters use scales like `scale(0.000244141)` that need every decimal.
					convertTransform: { transformPrecision: 10 },
					// SCADA symbol editor data (`tb:tag`, `<tb:metadata>`); the site only displays them.
					removeEditorsNSData: { additionalNamespaces: ['https://thingsboard.io/svg'] },
				},
			},
		},
	],
};

// Rounding step ≤ 1/50000 of the larger viewBox side: 2 decimals on schemas, 4 on small icons.
const MAX_STEP_RATIO = 1 / 50000;

function floatPrecision(svg) {
	const root = svg.match(/<svg\b[^>]*>/)?.[0] ?? '';
	const viewBox = root
		.match(/\bviewBox="([^"]+)"/)?.[1]
		.trim()
		.split(/[\s,]+/)
		.map(Number);
	const size =
		viewBox?.length === 4 ? Math.max(viewBox[2], viewBox[3]) : Number.parseFloat(root.match(/\bwidth="([\d.]+)/)?.[1]);
	if (!(size > 0)) return 3; // SVGO's default
	return Math.max(2, Math.ceil(Math.log10(1 / (size * MAX_STEP_RATIO))));
}

// Left as-is, even when passed explicitly. Downloads are imported into ThingsBoard
// byte-for-byte; SVGO may drop ids or styles an animation refers to.
const SKIP = [
	{ reason: 'download', path: /^public\/resources\// },
	{ reason: 'generated', path: /^public\/nav-sprite\.svg$/ },
	{ reason: 'template', content: /\{\{/ },
	{ reason: 'animated', content: /<animate|<set\b|@keyframes|animation\s*:|<script/i },
];

// A background grid exported one dot at a time (small `<circle>`s or arc subpaths): SVGO
// cannot shrink it, a `<pattern>` with one dot can.
// SVGO packs radii under 1 without a separator: `a.5.5`.
const ARC_DOT = /a(?:[0-2](?:\.\d+)?|\.\d+)(?:[ ,]|(?=\.))(?:[0-2](?:\.\d+)?|\.\d+)[ ,]0[ ,]1[ ,]?[01]/g;
const GRID_DOT_LIMIT = 200;

function gridDots(svg) {
	// Circles are counted per radius and fill, so artwork full of small circles that
	// each have their own gradient (SCADA bolts) does not add up to a grid.
	const byLook = new Map();
	for (const [, attrs] of svg.matchAll(/<circle\b([^>]*)>/g)) {
		const r = Number(attrs.match(/\sr="([^"]*)"/)?.[1]);
		if (!(r > 0 && r <= 2)) continue;
		const look = `${r} ${attrs.match(/\sfill="([^"]*)"/)?.[1] ?? ''}`;
		byLook.set(look, (byLook.get(look) ?? 0) + 1);
	}
	return Math.max(0, ...byLook.values()) + (svg.match(ARC_DOT)?.length ?? 0);
}

function collect(target, out) {
	if (statSync(target).isDirectory()) {
		for (const entry of readdirSync(target)) collect(join(target, entry), out);
	} else if (target.endsWith('.svg')) {
		out.push(target);
	}
	return out;
}

const targets = process.argv.slice(2).map((p) => resolve(p));
const files = (targets.length ? targets : DEFAULT_TARGETS).flatMap((t) => collect(t, [])).sort();

let changed = 0;
let before = 0;
let after = 0;
const skipped = new Map();
const failed = [];
const dotGrids = [];

for (const file of files) {
	const rel = relative(ROOT, file);
	const input = readFileSync(file, 'utf8');
	const skip = SKIP.find((s) => s.path?.test(rel) || s.content?.test(input));
	let output;
	if (!skip) {
		try {
			output = optimize(input, { ...SVGO_CONFIG, floatPrecision: floatPrecision(input), path: file }).data;
		} catch (err) {
			failed.push(`${rel}: ${String(err.message).split('\n')[0]}`);
		}
	}
	// Downloads and generated files are never edited by hand, so there is nothing to redraw.
	// The SVGO output is checked when there is one: SVGO redraws curve-drawn dots as arcs.
	if (!skip?.path) {
		const dots = gridDots(output ?? input);
		if (dots > GRID_DOT_LIMIT) dotGrids.push(`${rel} (${dots} dots)`);
	}
	if (skip) {
		skipped.set(skip.reason, (skipped.get(skip.reason) ?? 0) + 1);
		continue;
	}
	if (output === undefined || output.length >= input.length) continue;
	writeFileSync(file, output);
	changed++;
	before += input.length;
	after += output.length;
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
console.log(`optimize-svg: ${files.length} files, ${changed} rewritten (${kb(before)} → ${kb(after)})`);
for (const [reason, count] of skipped) console.log(`  skipped ${count} (${reason})`);
if (dotGrids.length) {
	console.warn(
		`  background grid drawn dot by dot; redraw it as one <pattern>-filled rect:\n    ${dotGrids.join('\n    ')}`
	);
}
if (failed.length) {
	console.error(`  failed to parse:\n    ${failed.join('\n    ')}`);
	process.exitCode = 1;
}
