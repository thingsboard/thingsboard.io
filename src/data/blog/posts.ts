import { getCollection, type CollectionEntry } from 'astro:content';
import { BLOG_AUTHORS, type BlogAuthor } from '@data/blog/authors';

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

/**
 * Authors from `BLOG_AUTHORS` that are the byline of at least one post.
 *
 * `BLOG_AUTHORS` is the full byline roster and can outlive the posts it was
 * written for — entries whose posts were removed or moved to another site stay
 * behind, so mapping it directly would build author landing pages with nothing
 * to list. Route enumerators filter through here instead.
 */
export async function getAuthorsWithPosts(): Promise<BlogAuthor[]> {
	const posts = await getCollection('blog');
	const authorSlugs = new Set(posts.map((post) => post.data.author));
	return BLOG_AUTHORS.filter((author) => authorSlugs.has(author.slug));
}
