import { allSubmenus, mainNavItems, type NavItem, type SubMenu } from '@data/navigation';

/** A top-level menu item and its section, if it has one. Both menus render from `MENU_ENTRIES`. */
export interface MenuEntry {
	item: NavItem;
	sub?: SubMenu;
}

export type MenuSection = Required<MenuEntry>;

export const MENU_ENTRIES: MenuEntry[] = mainNavItems.map((item) => {
	const sub = item.submenuId ? allSubmenus.find((s) => s.id === item.submenuId) : undefined;
	if (item.submenuId && !sub)
		throw new Error(`[menu] "${item.label}" names a section "${item.submenuId}" that does not exist`);
	if (!sub && !item.href) throw new Error(`[menu] "${item.label}" has neither a section nor a page`);
	return { item, sub };
});

export const MENU_SECTIONS: MenuSection[] = MENU_ENTRIES.filter(
	(entry): entry is MenuSection => entry.sub !== undefined
);

/** Whether the page is `href` or below it. Never true for `/`, which every path starts with. */
export const isHere = (pathname: string, href?: string) => !!href && href !== '/' && pathname.startsWith(href);

const sectionOwnsPage = (pathname: string, sub: SubMenu) => (sub.owns ?? []).some((path) => isHere(pathname, path));

/**
 * Whether the page belongs to this section. A section that owns the path (`SubMenu.owns`) wins, so
 * only one section is ever marked. Otherwise the page must be the item's page or one of the section's
 * internal links, or below one of them.
 */
export const inSection = (pathname: string, { item, sub }: MenuSection) => {
	const owningSection = MENU_SECTIONS.find((section) => sectionOwnsPage(pathname, section.sub));
	if (owningSection) return owningSection.sub.id === sub.id;
	if (isHere(pathname, item.href)) return true;
	return sub.groups.some((group) =>
		group.items.some((link) => link.href.startsWith('/') && isHere(pathname, link.href))
	);
};
