// Resolves the marketing header's appearance from BaseLayout props, consumed by
// the Starlight Header override.

export type HeaderVariant =
	| 'base' // sidebar bg, no border, icons shown (id'd marketing pages, e.g. device library)
	| 'docs' // hairline border, sidebar bg, both icons (real docs pages)
	| 'common' // docs look but search hidden — 404 + unconfigured marketing pages (BaseLayout default)
	| 'transparent' // over-hero, white text, flips to solid on scroll
	| 'transparent-hover' // transparent, opaque on hover + scroll (pricing, affiliate)
	| 'solid-shadow' // solid bg + drop shadow (product/marketing pages)
	| 'solid-border'; // surface bg + bottom border (use-cases, blog, partners, …)

export interface HeaderConfig {
	variant: HeaderVariant;
	showSearch: boolean;
	showThemeToggle: boolean;
	cloudSignupIds: boolean;
}

export interface HeaderConfigInput {
	variant?: HeaderVariant;
	forceLight?: boolean;
	showSearch?: boolean;
	showThemeToggle?: boolean;
	cloudSignupIds?: boolean;
}

// Per-variant defaults for the two icons.
const VARIANT_DEFAULTS: Record<HeaderVariant, { showSearch: boolean; showThemeToggle: boolean }> = {
	base: { showSearch: true, showThemeToggle: true },
	docs: { showSearch: true, showThemeToggle: true },
	common: { showSearch: false, showThemeToggle: true },
	transparent: { showSearch: false, showThemeToggle: false },
	'transparent-hover': { showSearch: true, showThemeToggle: true },
	'solid-shadow': { showSearch: false, showThemeToggle: false },
	'solid-border': { showSearch: true, showThemeToggle: true },
};

// `forceLight` always wins over `showThemeToggle` — a locked-light page must
// not offer a theme switch.
export function resolveHeaderConfig(input: HeaderConfigInput = {}): HeaderConfig {
	const variant = input.variant ?? 'docs';
	const defaults = VARIANT_DEFAULTS[variant];
	const forceLight = input.forceLight ?? false;
	const showThemeToggle = forceLight ? false : (input.showThemeToggle ?? defaults.showThemeToggle);
	return {
		variant,
		showSearch: input.showSearch ?? defaults.showSearch,
		showThemeToggle,
		cloudSignupIds: input.cloudSignupIds ?? true,
	};
}
