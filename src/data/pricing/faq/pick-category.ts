import type { FaqCategory } from '@data/pricing/types';

/**
 * Selects one pricing FAQ category for reuse on a product page. Fails the build
 * if the category was renamed or removed, instead of silently dropping a tab.
 */
export function pickCategory(source: FaqCategory[], id: string, origin: string): FaqCategory {
	const category = source.find((c) => c.id === id);
	if (!category) {
		throw new Error(`${origin}: FAQ category "${id}" no longer exists`);
	}
	return category;
}
