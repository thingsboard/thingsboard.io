import { getCollection } from 'astro:content';
import { isRecipeEntry, isTutorialEntry } from '@root/content.config';
import { getLanguageFromSlug } from '@util/path-utils';

export const allPages = await getCollection('docs');

export const englishPages = allPages.filter((page) => getLanguageFromSlug(page.id) === 'en');
export const ukrainianPages = allPages.filter((page) => getLanguageFromSlug(page.id) === 'uk');

export const tutorialPages = englishPages.filter(isTutorialEntry);
export const recipePages = englishPages.filter(isRecipeEntry);
