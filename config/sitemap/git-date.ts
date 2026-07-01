import { execFileSync } from 'node:child_process';
import { getRepoRoot, gitEnvTrustingRepo } from '../sitemap-source-registry';

/** Generous ceiling for the one-shot `git log` buffer (output is a few MB for `src/`). */
const GIT_LOG_MAX_BUFFER = 256 * 1024 * 1024;

/**
 * Map of repo-relative path → last-commit epoch (ms), from a single `git log`
 * pass instead of one subprocess per file. Commits are newest-first, so a path's
 * first appearance is its latest commit. The `\x1f` prefix marks date lines (file
 * paths never contain it). Scoped to `src/`, where every sitemap source lives, to
 * keep the output and map small. `core.quotePath=false` keeps non-ASCII/spaced
 * paths unquoted so they match the unquoted keys in the source registry.
 */
let gitDateMap: Map<string, number> | null = null;
export function getGitDateMap(): Map<string, number> {
	if (gitDateMap !== null) return gitDateMap;
	const dates = new Map<string, number>();
	try {
		const out = execFileSync(
			'git',
			[
				'-c',
				'core.quotePath=false',
				'log',
				'--no-renames',
				'--format=\x1f%cI',
				'--name-only',
				'--',
				'src/',
			],
			{
				encoding: 'utf8',
				maxBuffer: GIT_LOG_MAX_BUFFER,
				cwd: getRepoRoot(),
				env: gitEnvTrustingRepo(), // trust other-user checkouts (CI)
			}
		);
		let current = 0;
		for (const line of out.split('\n')) {
			if (line.startsWith('\x1f')) {
				current = Date.parse(line.slice(1));
			} else if (line && current > 0 && !dates.has(line)) {
				dates.set(line, current);
			}
		}
	} catch {
		// git unavailable (e.g. shallow CI checkout without history) — leave empty;
		// every entry then renders without <lastmod> rather than failing the build.
	}
	gitDateMap = dates;
	return gitDateMap;
}
