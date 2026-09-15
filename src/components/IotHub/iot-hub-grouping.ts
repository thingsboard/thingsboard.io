import {
	getCategoryForItemType,
	type IotHubItemType,
	type IotHubSearchSection,
	type ListingView,
} from '@models/iot-hub';

export interface GroupedSection {
	itemType: IotHubItemType;
	label: string;
	items: ListingView[];
	/** Rows of this type behind the response, before the backend's per-type cap. */
	total: number;
	/** total - items.length, floored at 0. Zero means "no +N more link". */
	remaining: number;
	/** Type page for this section, already carrying the current query. */
	href: string;
}

export interface GroupedSectionOptions {
	query?: string;
}

/**
 * Turns the API's sections into the ones the hero popup renders: labels, the
 * "+N more" arithmetic and the header href. The type order is the server's and
 * is kept as given, so the site and the platform lay the same query out alike.
 *
 * The popup is the only caller. `/iot-hub/search/`, the creator profile and the
 * type pages stay flat and paginated — a filtered catalogue with shareable page
 * URLs — so nothing else groups on this site.
 *
 * `remaining` is computed from the rows STILL PRESENT, not from the per-type cap
 * the backend applied: rows published since the last deploy have no static detail
 * page and are filtered out by `getKnownSlugs()` before this runs. Counting from
 * the cap instead would leave a section showing three cards under a header
 * promising "+3 more" while `total` says seven exist — the two numbers on screen
 * have to add up to the one the header is quoting.
 *
 * A section whose rows were all dropped does not render at all — an empty section
 * under a populated header is worse than the section being absent.
 */
export function toGroupedSections(
	sections: IotHubSearchSection[],
	opts: GroupedSectionOptions = {}
): GroupedSection[] {
	return sections.flatMap((section) => {
		const category = getCategoryForItemType(section.itemType);
		// A type the site has no category for (a backend type it doesn't surface)
		// cannot be laid out, so it is skipped rather than rendered headerless.
		if (!category || section.items.length === 0) return [];
		const total = Math.max(section.total, section.items.length);
		return [
			{
				itemType: section.itemType,
				label: category.label,
				items: section.items,
				total,
				remaining: Math.max(0, total - section.items.length),
				href: sectionHref(section.itemType, opts),
			},
		];
	});
}

function sectionHref(type: IotHubItemType, opts: GroupedSectionOptions): string {
	const slug = getCategoryForItemType(type)?.slug;
	if (!slug) return '#';
	const q = opts.query?.trim();
	return `/iot-hub/${slug}/${q ? `?q=${encodeURIComponent(q)}` : ''}`;
}
