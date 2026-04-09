import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getAuthor } from '~/data/blog/authors';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
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
