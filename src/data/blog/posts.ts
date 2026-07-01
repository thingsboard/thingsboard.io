import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/**
 * Blog posts sorted newest-first. `getCollection` returns entries in load order,
 * so every consumer would otherwise repeat the same date sort — this is the one
 * place that ordering lives. Pass `filter` to narrow the set (e.g. by author)
 * before sorting.
 */
export async function getSortedBlogPosts(
	filter?: (post: BlogPost) => boolean,
): Promise<BlogPost[]> {
	const posts = await getCollection('blog', filter);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
