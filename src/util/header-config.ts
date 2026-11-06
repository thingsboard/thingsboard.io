// The site header's settings, built from `BaseLayout`'s props and read by `starlight/Header.astro`.
// Two looks: `docs` for documentation pages, `marketing` for every other page.

export type HeaderLook = 'marketing' | 'docs';

export type HeaderHero = 'dark' | 'light';

export interface HeaderConfig {
	look: HeaderLook;
	hero?: HeaderHero;
	search: boolean;
	cloudSignupIds: boolean;
	/** Logo only: no menu, search or account buttons (for campaign landing pages). */
	minimal: boolean;
}

export interface HeaderConfigInput {
	look?: HeaderLook;
	hero?: HeaderHero;
	search?: boolean;
	cloudSignupIds?: boolean;
	minimal?: boolean;
}

export function resolveHeaderConfig(input: HeaderConfigInput = {}): HeaderConfig {
	const look = input.look ?? 'docs';
	const minimal = input.minimal ?? false;
	return {
		look,
		hero: look === 'marketing' ? input.hero : undefined,
		// A minimal header has no search, like it has no other buttons.
		search: !minimal && (input.search ?? true),
		cloudSignupIds: input.cloudSignupIds ?? true,
		minimal,
	};
}
