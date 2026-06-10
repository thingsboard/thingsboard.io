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

// cta = Pricing/Try button shape: `marketing` gives a bordered Pricing button + filled Try.
export type HeaderCta = 'base' | 'marketing';

export interface HeaderConfig {
	variant: HeaderVariant;
	cta: HeaderCta;
	showSearch: boolean;
	showThemeToggle: boolean;
}

export interface HeaderConfigInput {
	variant?: HeaderVariant;
	cta?: HeaderCta;
	forceLight?: boolean;
	showSearch?: boolean;
	showThemeToggle?: boolean;
}

// Per-variant defaults; only `solid-shadow` defaults to the `marketing` CTA.
const VARIANT_DEFAULTS: Record<HeaderVariant, { cta: HeaderCta; showSearch: boolean; showThemeToggle: boolean }> = {
	base: { cta: 'base', showSearch: true, showThemeToggle: true },
	docs: { cta: 'base', showSearch: true, showThemeToggle: true },
	common: { cta: 'base', showSearch: false, showThemeToggle: true },
	transparent: { cta: 'base', showSearch: false, showThemeToggle: false },
	'transparent-hover': { cta: 'base', showSearch: true, showThemeToggle: true },
	'solid-shadow': { cta: 'marketing', showSearch: false, showThemeToggle: false },
	'solid-border': { cta: 'base', showSearch: true, showThemeToggle: true },
};

// `forceLight` always wins over `showThemeToggle` — a locked-light page must
// not offer a theme switch.
export function resolveHeaderConfig(input: HeaderConfigInput = {}): HeaderConfig {
	const variant = input.variant ?? 'docs';
	const defaults = VARIANT_DEFAULTS[variant];
	const forceLight = input.forceLight ?? false;
	const showThemeToggle = forceLight ? false : (input.showThemeToggle ?? defaults.showThemeToggle);
	const cta = input.cta ?? defaults.cta;
	return {
		variant,
		cta,
		showSearch: input.showSearch ?? defaults.showSearch,
		showThemeToggle,
	};
}
