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
//
// It also warns about a background grid drawn one dot at a time. Redraw it as one tile
// with one dot, repeated over a rect, as the schemas in src/assets/schemas/ do:
//   <pattern id="dots-<file name>" width="14" height="14" patternUnits="userSpaceOnUse">…
//   <path fill="url(#dots-<file name>)" d="…"/>

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

// The larger side of the drawing, in its own units; NaN when the root has no size.
function drawingSize(svg) {
	const root = svg.match(/<svg\b[^>]*>/)?.[0] ?? '';
	const viewBox = root
		.match(/\bviewBox="([^"]+)"/)?.[1]
		.trim()
		.split(/[\s,]+/)
		.map(Number);
	return viewBox?.length === 4
		? Math.max(viewBox[2], viewBox[3])
		: Number.parseFloat(root.match(/\bwidth="([\d.]+)/)?.[1]);
}

function floatPrecision(svg) {
	const size = drawingSize(svg);
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

// A background grid exported one dot at a time (small `<circle>`s or round subpaths): SVGO
// cannot shrink it, a `<pattern>` with one dot can.
const GRID_DOT_LIMIT = 200;
// A dot's radius is at most this share of the drawing's larger side, so the same grid
// exported at any scale counts, and the round shapes of a 24-unit icon do not.
const DOT_RADIUS_RATIO = 1 / 150;
const FIRST_ARC_RADIUS = /[Aa]\s*([-+]?(?:\d+\.?\d*|\.\d+))/;
// A round subpath: a moveto, then only arcs and curves, at least one arc. A line in it
// (`v`, `h`, `l`) makes it something else, such as one dash of a dashed line.
const ROUND_SUBPATH = /^[Mm][^a-df-zA-DF-Z]*(?:[AaCcSsQqTtZz][^a-df-zA-DF-Z]*)+$/;

function gridDots(svg) {
	const maxR = drawingSize(svg) * DOT_RADIUS_RATIO;
	if (!(maxR > 0)) return 0;
	const radii = [];
	for (const [, attrs] of svg.matchAll(/<circle\b([^>]*)>/g)) {
		// Gradient-filled circles are artwork (SCADA bolts), not grid dots.
		if (/\sfill="url\(/.test(attrs)) continue;
		radii.push(Number(attrs.match(/\sr="([^"]*)"/)?.[1]));
	}
	for (const [, d] of svg.matchAll(/<path\b[^>]*\sd="([^"]*)"/g)) {
		for (const sub of d.match(/[Mm][^Mm]*/g) ?? []) {
			if (ROUND_SUBPATH.test(sub)) radii.push(Number(sub.match(FIRST_ARC_RADIUS)?.[1]));
		}
	}
	// The dots of one grid share a size, whatever their colour; round shapes of many
	// sizes (map markers, chart points) are not a grid. Count the dots within 5% of the
	// most common radius.
	const counts = new Map();
	for (const r of radii) {
		if (r > 0 && r <= maxR) counts.set(r.toFixed(2), (counts.get(r.toFixed(2)) ?? 0) + 1);
	}
	if (!counts.size) return 0;
	const common = Number([...counts].reduce((a, b) => (b[1] > a[1] ? b : a))[0]);
	return radii.filter((r) => Math.abs(r - common) <= common * 0.05).length;
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
