/**
 * Refreshes src/data/github-stars.json from the GitHub API, rewriting it only when a shown count
 * (formatStars) changes, so a few new stars leave the pages and the build cache untouched.
 *
 * Usage: pnpm update:stars (uses GITHUB_TOKEN when set)
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

for (const repo of repos) console.log(`${repo}: ${current[repo]} → ${fresh[repo]}`);

if (repos.some((repo) => formatStars(fresh[repo]) !== formatStars(current[repo]))) {
	writeFileSync(FILE, `${JSON.stringify(fresh, null, 2)}\n`);
	console.log('Shown counts changed; file updated.');
}
