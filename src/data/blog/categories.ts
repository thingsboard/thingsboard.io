export const BLOG_CATEGORIES = [
	'business',
	'community',
	'company',
	'events',
	'guides',
	'solutions',
	'tech',
	'updates',
	'use-cases',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
	business: 'Business',
	community: 'Community',
	company: 'Company',
	events: 'Events',
	guides: 'Guides',
	solutions: 'Solutions',
	tech: 'Tech',
	updates: 'Updates',
	'use-cases': 'Use Cases',
};

