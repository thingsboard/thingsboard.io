/**
 * Star counts as GitHub shows them: thousands floored to one decimal ("22.5k").
 * No `@` imports: `scripts/update-github-stars.ts` loads this file with plain Node.
 */
const thousands = (stars: number): number => Math.floor(stars / 100) / 10;

export const formatStars = (stars: number): string => (stars < 1000 ? `${stars}` : `${thousands(stars)}k`);

/** The same value for screen readers, which would read "22.5k" as letters. */
export const formatStarsLong = (stars: number): string => (stars < 1000 ? `${stars}` : `${thousands(stars)} thousand`);
