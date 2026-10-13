/**
 * Star counts as GitHub shows them: thousands floored to one decimal ("22.5k"), smaller counts in full.
 * The counts come from `src/data/github-stars.json`, which `pnpm update:stars` refreshes, so pages
 * never call GitHub. No `@` imports: that script loads this file with plain Node.
 */
const thousands = (stars: number): number => Math.floor(stars / 100) / 10;

export const formatStars = (stars: number): string => (stars < 1000 ? `${stars}` : `${thousands(stars)}k`);

/** The same value for screen readers, which would read "22.5k" as letters. */
export const formatStarsLong = (stars: number): string => (stars < 1000 ? `${stars}` : `${thousands(stars)} thousand`);
