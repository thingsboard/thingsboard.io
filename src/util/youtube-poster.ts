// Build-time lookup of a YouTube video's thumbnail, used as the poster of `<YouTubeVideo>`. Framework-free on purpose
// (no Astro imports), so it can be unit-tested once the repository has a runner.
//
// The check is needed because `getImage()` does not download a remote image when called: it queues the fetch for the
// end of the build, where a 404 fails the whole build and can't be caught at the call site. Older videos have no
// `maxresdefault`, and a removed video has neither size.

/** Off: no video gets a thumbnail, every poster is the CSS-only one. The switch if storing thumbnails is ruled out. */
const POSTERS_ENABLED = true;

const TIMEOUT_MS = 10_000;

export interface YouTubePoster {
	src: string;
	width: number;
	height: number;
}

// Best first. `hqdefault` is 4:3 with black bars baked in above and below the 16:9 frame; the poster crops them.
const CANDIDATES = [
	{ name: 'maxresdefault', width: 1280, height: 720 },
	{ name: 'hqdefault', width: 480, height: 360 },
];

// Promises, so concurrent pages rendering the same video share one check.
const cache = new Map<string, Promise<YouTubePoster | undefined>>();

async function exists(url: string): Promise<boolean> {
	const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(TIMEOUT_MS) });
	return res.ok;
}

async function resolve(videoId: string): Promise<YouTubePoster | undefined> {
	try {
		for (const { name, width, height } of CANDIDATES) {
			const src = `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/${name}.jpg`;
			if (await exists(src)) return { src, width, height };
		}
		console.warn(`[youtube-poster] No thumbnail for video ${videoId}; using the neutral poster.`);
	} catch (error) {
		console.warn(`[youtube-poster] Thumbnail check failed for video ${videoId}; using the neutral poster.`, error);
	}
	return undefined;
}

/** The best existing thumbnail for `videoId`, or `undefined` when there is none or YouTube can't be reached. */
export function resolveYouTubePoster(videoId: string): Promise<YouTubePoster | undefined> {
	if (!POSTERS_ENABLED) return Promise.resolve(undefined);
	let poster = cache.get(videoId);
	if (!poster) {
		poster = resolve(videoId);
		cache.set(videoId, poster);
	}
	return poster;
}
