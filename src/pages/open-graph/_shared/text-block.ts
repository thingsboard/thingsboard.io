// Title fonts shrink in two steps as the title grows, so 3-line wrapping
// stays bounded. Eyebrow/author/url sizes are constant and live in the JSX.

export const TITLE_SIZES = { short: 56, medium: 48, long: 40 } as const;

/** Pick a title font size in px based on character length. */
export function pickTitleSize(title: string): number {
	if (title.length > 80) return TITLE_SIZES.long;
	if (title.length > 50) return TITLE_SIZES.medium;
	return TITLE_SIZES.short;
}
