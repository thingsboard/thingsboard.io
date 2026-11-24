// Blog covers resized for cards: `/blog-covers/<width>/<post>/cover.webp`. See `@util/blog-cover`.
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { getSortedBlogPosts } from '@data/blog/posts';
import { blogCoverFile, blogCoverKey, blogCoverPathParam, blogCoversEnabled, blogCoverWidths } from '@util/blog-cover';

// Part of each cache entry's name, so a change here re-encodes the covers.
const RESIZE = { withoutEnlargement: true } as const;
const WEBP = { quality: 80 } as const;
const SETTINGS = JSON.stringify([RESIZE, WEBP]);

// Kept between builds. Entries are named by the source's content and the settings above.
const CACHE_DIR = path.resolve('node_modules/.blog-cover-cache');

export const getStaticPaths: GetStaticPaths = async () => {
	if (!blogCoversEnabled()) return [];
	const posts = await getSortedBlogPosts();
	const keys = new Set<string>();
	for (const post of posts) {
		const key = blogCoverKey(post.data.featuredImage);
		if (key) keys.add(key);
	}
	const paths = await Promise.all(
		[...keys].map(async (key) =>
			(await blogCoverWidths(key)).map((width) => ({
				params: { width: String(width), path: blogCoverPathParam(key) },
				props: { key },
			}))
		)
	);
	return paths.flat();
};

export const GET: APIRoute = async ({ params, props }) => {
	const source = await readFile(blogCoverFile(props.key as string));
	const width = Number(params.width);
	const hash = createHash('sha1').update(source).update(SETTINGS).digest('hex').slice(0, 16);
	const cached = path.join(CACHE_DIR, `${hash}-${width}.webp`);
	let resized = await readFile(cached).catch(() => null);
	if (!resized) {
		resized = await sharp(source)
			.resize({ width, ...RESIZE })
			.webp(WEBP)
			.toBuffer();
		await mkdir(CACHE_DIR, { recursive: true });
		// Under a temporary name first: builds render on several threads.
		const tmp = `${cached}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
		try {
			await writeFile(tmp, resized);
			await rename(tmp, cached);
		} catch (error) {
			await rm(tmp, { force: true });
			throw error;
		}
	}
	return new Response(new Uint8Array(resized), { headers: { 'Content-Type': 'image/webp' } });
};
