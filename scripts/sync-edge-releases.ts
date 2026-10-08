/**
 * Regenerates `src/data/edge-releases.ts` — the Edge release list and upgrade graph that
 * the Edge upgrade instructions and releases table are built from.
 *
 *   node scripts/sync-edge-releases.ts [--updates <path to edge-update-v2.json>] [--check]
 *
 * Sources:
 * - Release dates: GitHub releases of `thingsboard/thingsboard-edge`, read with the `gh` CLI.
 *   A version without a GitHub release is listed only if it is in {@link STUBS}.
 * - Upgrade paths: `edge-update-v2.json` from the `tb-updates` repo (default: a sibling
 *   checkout at `../tb-updates`). The same graph serves Community Edge and Edge PE.
 *
 * `--check` exits with code 1 when the generated file is out of date instead of writing it.
 * The script also reports releases that have no matching `## v<version> (<date>)` heading in
 * the Edge release notes.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src/data/edge-releases.ts');
const REPO = 'thingsboard/thingsboard-edge';

/** Releases not published on GitHub yet, listed with a provisional date. Drop an entry once its release is out. */
const STUBS: { version: string; tag: string; date: string }[] = [{ version: '4.4.0', tag: 'v4.4', date: '2026-10-10' }];

interface Release {
	version: string;
	tag: string;
	date: string;
	stub?: boolean;
}

function arg(name: string): string | undefined {
	const i = process.argv.indexOf(name);
	return i > 0 ? process.argv[i + 1] : undefined;
}

/** "v4.3" → "4.3.0", "v4.3.1.6" → "4.3.1.6". */
function normalize(tag: string): string {
	const parts = tag.replace(/^v/, '').split('.');
	while (parts.length < 3) parts.push('0');
	return parts.join('.');
}

function compare(a: string, b: string): number {
	const as = a.split('.').map(Number);
	const bs = b.split('.').map(Number);
	for (let i = 0; i < Math.max(as.length, bs.length); i++) {
		const d = (as[i] ?? 0) - (bs[i] ?? 0);
		if (d !== 0) return d;
	}
	return 0;
}

function readGithubReleases(): Release[] {
	const json = execFileSync('gh', ['release', 'list', '-R', REPO, '--limit', '500', '--json', 'tagName,publishedAt,isDraft,isPrerelease'], {
		encoding: 'utf8',
	});
	const byVersion = new Map<string, Release>();
	for (const r of JSON.parse(json) as { tagName: string; publishedAt: string; isDraft: boolean; isPrerelease: boolean }[]) {
		if (r.isDraft || r.isPrerelease || !/^v\d+(\.\d+)+$/.test(r.tagName)) continue;
		const version = normalize(r.tagName);
		const date = r.publishedAt.slice(0, 10);
		const seen = byVersion.get(version);
		// "v3.7" and "v3.7.0" are both published; the earlier one is the release.
		if (!seen || date < seen.date) byVersion.set(version, { version, tag: r.tagName, date });
	}
	return [...byVersion.values()];
}

function readGraph(path: string): Record<string, { to: string; db: boolean }[]> {
	const raw = JSON.parse(readFileSync(path, 'utf8')) as {
		edgeVersions: Record<string, { requiresUpdateDb: boolean; nextEdgeVersion: string | null }[]>;
	};
	const graph: Record<string, { to: string; db: boolean }[]> = {};
	for (const [from, targets] of Object.entries(raw.edgeVersions)) {
		graph[from] = targets.filter((t) => t.nextEdgeVersion).map((t) => ({ to: t.nextEdgeVersion as string, db: t.requiresUpdateDb }));
	}
	return graph;
}

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-10-01" → "Oct 1, 2026" — the date format of the release-notes headings. */
function headingDate(iso: string): string {
	const [y, m, d] = iso.split('-').map(Number);
	return `${SHORT_MONTHS[m - 1]} ${d}, ${y}`;
}

/** Releases without a matching release-notes heading, per notes folder. */
function missingNotes(releases: Release[]): string[] {
	const problems: string[] = [];
	const folders = [
		{ dir: 'src/content/_includes/docs/edge/releases', communityOnly: true },
		{ dir: 'src/content/_includes/docs/edge/pe/releases', communityOnly: false },
	];
	for (const { dir, communityOnly } of folders) {
		const text = readdirSync(join(ROOT, dir))
			.filter((f) => /^v\d+-\d+-x\.mdx$/.test(f))
			.map((f) => readFileSync(join(ROOT, dir, f), 'utf8'))
			.join('\n');
		for (const r of releases) {
			// Community Edge has no releases from the 4.4 rename on.
			if (communityOnly && compare(r.version, '4.4.0') >= 0) continue;
			const heading = `## v${r.version} (${headingDate(r.date)})`;
			if (!text.includes(heading)) problems.push(`${dir}: missing "${heading}"`);
		}
	}
	return problems;
}

const updatesPath = resolve(arg('--updates') ?? join(ROOT, '../tb-updates/src/main/resources/edge-update-v2.json'));
if (!existsSync(updatesPath)) {
	console.error(`edge-update-v2.json not found at ${updatesPath}; pass --updates <path>.`);
	process.exit(1);
}

const releases = readGithubReleases();
for (const s of STUBS) {
	if (!releases.some((r) => r.version === s.version)) releases.push({ ...s, stub: true });
}
releases.sort((a, b) => compare(b.version, a.version));
const released = new Set(releases.map((r) => r.version));

const graph: Record<string, { to: string; db: boolean }[]> = {};
for (const [from, targets] of Object.entries(readGraph(updatesPath)).sort(([a], [b]) => compare(b, a))) {
	if (!released.has(from)) continue;
	const kept = targets.filter((t) => released.has(t.to));
	if (kept.length) graph[from] = kept;
}

const out = `// Generated by scripts/sync-edge-releases.ts — do not edit by hand, re-run the script.
// Release dates: GitHub releases of ${REPO} (stubs marked \`stub: true\`).
// Upgrade paths: tb-updates edge-update-v2.json, limited to released versions.

export interface EdgeRelease {
	/** Full version, e.g. "4.3.0" for the \`v4.3\` tag */
	version: string;
	/** GitHub release tag */
	tag: string;
	/** Publication date, YYYY-MM-DD */
	date: string;
	/** true = not published on GitHub yet; the date is provisional */
	stub?: boolean;
}

/** All Edge releases, newest first. */
export const EDGE_RELEASES: EdgeRelease[] = [
${releases.map((r) => `\t{ version: '${r.version}', tag: '${r.tag}', date: '${r.date}'${r.stub ? ', stub: true' : ''} },`).join('\n')}
];

/** Direct upgrade paths: version → versions it upgrades to, and whether the database upgrade runs. */
export const EDGE_UPGRADE_GRAPH: Record<string, { to: string; db: boolean }[]> = {
${Object.entries(graph)
	.map(([from, ts]) => `\t'${from}': [${ts.map((t) => `{ to: '${t.to}', db: ${t.db} }`).join(', ')}],`)
	.join('\n')}
};
`;

const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
if (process.argv.includes('--check')) {
	if (current !== out) {
		console.error('src/data/edge-releases.ts is out of date; run node scripts/sync-edge-releases.ts');
		process.exit(1);
	}
} else if (current !== out) {
	writeFileSync(OUT, out);
	console.log(`Wrote ${OUT} (${releases.length} releases).`);
} else {
	console.log('src/data/edge-releases.ts is up to date.');
}

for (const p of missingNotes(releases)) console.warn(`WARN ${p}`);
