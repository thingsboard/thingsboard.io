/**
 * Refreshes src/data/github-stars.json from the GitHub API.
 *
 * The file is rewritten only when a count pages show changes (see formatStars), so a few new stars
 * leave the pages, and the build cache, untouched. Uses GITHUB_TOKEN when set; without one the
 * unauthenticated limit of 60 requests an hour is plenty for a handful of repos.
 *
 * Usage: pnpm update:stars
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { formatStars } from '../src/util/github-stars.ts';

const FILE = new URL('../src/data/github-stars.json', import.meta.url);

const current: Record<string, number> = JSON.parse(readFileSync(FILE, 'utf8'));
const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const fetchStars = async (repo: string): Promise<number> => {
	const res = await fetch(`https://api.github.com/repos/${repo}`, { headers, signal: AbortSignal.timeout(10_000) });
	if (!res.ok) throw new Error(`${repo}: ${res.status} ${res.statusText}`);
	const { stargazers_count: stars } = await res.json();
	if (typeof stars !== 'number') throw new Error(`${repo}: no stargazers_count in the response`);
	return stars;
};

const repos = Object.keys(current);
const fresh = Object.fromEntries(await Promise.all(repos.map(async (repo) => [repo, await fetchStars(repo)])));

const changed = repos.filter((repo) => formatStars(fresh[repo]) !== formatStars(current[repo]));
for (const repo of repos) {
	console.log(`${repo}: ${current[repo]} → ${fresh[repo]}${changed.includes(repo) ? ' (shown count changed)' : ''}`);
}

if (changed.length) {
	writeFileSync(FILE, `${JSON.stringify(fresh, null, 2)}\n`);
	console.log(`Updated ${changed.length} shown count(s).`);
} else {
	console.log('No shown count changed; file left as is.');
}
