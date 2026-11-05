import type { AstroIntegration } from 'astro';
import fg from 'fast-glob';
import { readFileSync } from 'node:fs';
// No alias covers `src/util/` from `config/`; relative import is the only option here.
import { PRERESOLVED_POSTERS_ENV, resolveYouTubePoster } from '../../src/util/youtube-poster';

const VIDEO_ID_ATTR = /\bvideoId=["']([A-Za-z0-9_-]{11})["']/g;

/**
 * Checks the poster of every literal `<YouTubeVideo videoId="…">` once, on the main thread before pages render, and
 * passes the results on through `process.env`, which worker threads copy when they start. Checked inside busy
 * parallel-prerender workers, the requests time out and pages lose their poster. Other ids are checked at render.
 */
export function youtubePosters(): AstroIntegration {
	return {
		name: 'youtube-posters',
		hooks: {
			'astro:build:start': async () => {
				const ids = new Set<string>();
				for (const file of fg.sync('src/**/*.{astro,md,mdx}')) {
					for (const match of readFileSync(file, 'utf8').matchAll(VIDEO_ID_ATTR)) ids.add(match[1]!);
				}
				const posters = await Promise.all(
					[...ids].map(async (id) => [id, (await resolveYouTubePoster(id)) ?? null] as const)
				);
				process.env[PRERESOLVED_POSTERS_ENV] = JSON.stringify(Object.fromEntries(posters));
			},
		},
	};
}
