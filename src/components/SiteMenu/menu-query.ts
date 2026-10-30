/**
 * Media queries for the menu's layout widths, read from the CSS custom properties in `_theme.scss`.
 * Keep this file free of imports: browser scripts load it, and importing `menu-model` here would add
 * all the navigation data to the page's JavaScript.
 */

const rootCssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export const menuRowQuery = () => `(min-width: ${rootCssVar('--menu-row-from')})`;

/** Wide enough for Sign in and Try for free in the header; below it they move into the menu sheet. */
export const fullHeaderQuery = () => `(min-width: ${rootCssVar('--bar-compact-below')})`;

export const menuSplitQuery = () =>
	`(min-width: ${rootCssVar('--menu-split-from')}) and (min-height: ${rootCssVar('--menu-split-min-height')})`;
