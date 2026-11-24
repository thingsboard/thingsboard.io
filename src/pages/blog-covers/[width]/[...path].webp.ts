// Blog cover images resized for cards: `/blog-covers/<width>/<post>/cover.webp`.
// See `src/util/blog-cover.ts` for why and for the list of widths.
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { getSortedBlogPosts } from '@data/blog/posts';
import { blogCoverFile, blogCoverKey, blogCoverPathParam, blogCoversEnabled, blogCoverWidths } from '@util/blog-cover';

// Resized covers, kept between builds. Named by the source file's content, so an edited cover
// gets a new entry and an unchanged one is never encoded twice.
const CACHE_DIR = path.resolve('node_modules/.blog-cover-cache');

export const getStaticPaths: GetStaticPaths = async () => {
	if (!blogCoversEnabled()) return [];
	const posts = await getSortedBlogPosts();
	// A set, so two posts that share one image produce one set of files.
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
	const cached = path.join(CACHE_DIR, `${createHash('sha1').update(source).digest('hex').slice(0, 16)}-${width}.webp`);
	let resized = await readFile(cached).catch(() => null);
	if (!resized) {
		// `blogCoverWidths` never lists a width above the source's, so this only ever shrinks.
		resized = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
		await mkdir(CACHE_DIR, { recursive: true });
		// Under a temporary name first: builds render on several threads.
		const tmp = `${cached}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
		await writeFile(tmp, resized);
		await rename(tmp, cached);
	}
	return new Response(new Uint8Array(resized), { headers: { 'Content-Type': 'image/webp' } });
};
