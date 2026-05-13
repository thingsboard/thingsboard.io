// noinspection JSUnusedGlobalSymbols — `GET` is consumed by Astro's route convention, not called from our code.

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getAuthor } from '~/data/blog/authors';
import type { APIContext } from 'astro';
import type { z } from 'astro/zod';
import type { blogSchema } from '~/content.config';

type BlogData = z.infer<typeof blogSchema>;
type BlogPost = { id: string; data: BlogData; collection: 'blog' };

export async function GET(context: APIContext) {
	const posts = (await getCollection('blog', ({ data }) => !(data as BlogData).draft)) as unknown as BlogPost[];
	const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

	return rss({
		title: 'ThingsBoard Blog',
		description: 'Product updates, technical guides, and IoT solutions from ThingsBoard.',
		site: context.site!,
		items: sorted.map((post) => {
			const author = getAuthor(post.data.author);
			return {
				title: post.data.title,
				pubDate: post.data.date,
				description: post.data.description,
				link: `/blog/${post.id}/`,
				author: author?.name,
			};
		}),
		customData: '<language>en-us</language>',
	});
}
