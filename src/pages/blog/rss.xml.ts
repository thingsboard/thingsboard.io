// noinspection JSUnusedGlobalSymbols — `GET` is consumed by Astro's route convention, not called from our code.

import rss from '@astrojs/rss';
import { getSortedBlogPosts } from '@data/blog/posts';
import { getAuthor } from '~/data/blog/authors';
import type { APIContext } from 'astro';
export async function GET(context: APIContext) {
	const sorted = await getSortedBlogPosts();

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
