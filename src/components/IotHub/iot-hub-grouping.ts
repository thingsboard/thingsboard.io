import {
	IOT_HUB_TYPE_ORDER,
	getCategoryForItemType,
	type IotHubItemType,
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
 * Turns one grouped response into the sections the hero popup renders:
 * type order, labels, "+N more" arithmetic and the header href.
 *
 * The popup is the only caller. `/iot-hub/search/`, the creator profile and the
 * type pages stay flat and paginated — a filtered catalogue with shareable page
 * URLs — so nothing else groups on this site.
 *
 * `remaining` is computed from the rows STILL PRESENT, not from the per-type cap
 * the backend applied: rows published since the last deploy have no static detail
 * page and are filtered out by `getKnownSlugs()` before this runs. Counting from
 * the cap instead would leave a section showing three cards under a header
 * promising "+3 more" while `typeTotal` says seven exist — the two numbers on
 * screen have to add up to the one the header is quoting.
 *
 * A section whose rows were all dropped does not render at all — an empty section
 * under a populated header is worse than the section being absent.
 */
export function toGroupedSections(
	items: ListingView[],
	opts: GroupedSectionOptions = {}
): GroupedSection[] {
	const byType = new Map<IotHubItemType, ListingView[]>();
	const totals = new Map<IotHubItemType, number>();
	for (const item of items) {
		const cat = getCategoryForItemType(item.itemType);
		// A type the site has no category for (a backend type it doesn't surface)
		// cannot be laid out, so it is skipped rather than rendered headerless.
		if (!cat) continue;
		const type = cat.itemType;
		const list = byType.get(type) ?? [];
		list.push(item);
		byType.set(type, list);
		// Every row of a type carries the same typeTotal; the fallback keeps a
		// non-grouped response rendering as plain sections with no "+N more".
		// `??` rather than `||` because a flat read sends the field as null, not
		// absent, and 0 is a value this must not swallow.
		totals.set(type, item.typeTotal ?? list.length);
	}

	return IOT_HUB_TYPE_ORDER.filter((type) => (byType.get(type)?.length ?? 0) > 0).map((type) => {
		const sectionItems = byType.get(type)!;
		const total = Math.max(totals.get(type) ?? sectionItems.length, sectionItems.length);
		return {
			itemType: type,
			label: getCategoryForItemType(type)?.label ?? type,
			items: sectionItems,
			total,
			remaining: Math.max(0, total - sectionItems.length),
			href: sectionHref(type, opts),
		};
	});
}

function sectionHref(type: IotHubItemType, opts: GroupedSectionOptions): string {
	const slug = getCategoryForItemType(type)?.slug;
	if (!slug) return '#';
	const q = opts.query?.trim();
	return `/iot-hub/${slug}/${q ? `?q=${encodeURIComponent(q)}` : ''}`;
}
