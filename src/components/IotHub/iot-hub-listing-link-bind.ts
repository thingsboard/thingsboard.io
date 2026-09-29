import {
	getCategoryForItemType,
	getCardVariant,
	getPlaceholderIcon,
	resolveImage,
	type ListingView,
} from '@models/iot-hub';
import { bindIotHubIcon } from './iot-hub-icon-bind';

// Type-fallback icon map used when getPlaceholderIcon doesn't supply
// anything (or the supplied name fails to resolve) for the non-compact
// branch where the listing image is missing.
export const TYPE_FALLBACK_ICON: Record<string, string> = {
	WIDGET: 'widgets',
	SOLUTION_TEMPLATE: 'integration_instructions',
	CALCULATED_FIELD: 'functions',
	ALARM_RULE: 'notification_important',
	RULE_CHAIN: 'account_tree',
	DEVICE: 'memory',
};

// Icon size inside the thumb. A row draws a compact item's icon in a 36px tile rather than
// across the whole 56px thumb, so it gets a smaller glyph than the card does.
export function getThumbIconSize(isCompact: boolean, isRow: boolean): number {
	if (!isCompact) return 24;
	return isRow ? 22 : 28;
}

// Icon that marks an item's type next to the item, wherever a list mixes types
// (the search popup). The IoT Hub's type dictionary — the same icons the
// platform uses — rather than the thumbnail placeholders above, which picture
// the content and not the type.
export const TYPE_MARKER_ICON: Record<string, string> = {
	DEVICE: 'devices_other',
	SOLUTION_TEMPLATE: 'apps',
	WIDGET: 'widgets',
	CALCULATED_FIELD: 'mdi:function-variant',
	ALARM_RULE: 'mdi:bell-cog',
	RULE_CHAIN: 'settings_ethernet',
};

// Build the `/iot-hub/{category}/{slug}/` href for a listing, falling back to
// `#` when the itemType has no public category (see getCategoryForItemType).
export function getListingHref(item: ListingView): string {
	const cat = getCategoryForItemType(item.itemType);
	return cat ? `/iot-hub/${cat.slug}/${item.slug}/` : '#';
}

// Bind a card cloned from <IotHubListingLinkTemplate /> to a ListingView.
// Mirrors the static-render branches in IotHubListingLink.astro 1:1 so the
// static and clone-bound cards produce the same DOM shape and scoped styles
// match either way.
//
// Synchronous for everything except the thumb icon, which delegates to
// bindIotHubIcon — for MDI icons that triggers an async fetch. Callers
// don't need to await this function; the icon wrapper stays in its blank
// reset state until the SVG arrives.
export function bindListingLink(root: HTMLElement, item: ListingView): void {
	const isCompact = getCardVariant(item.itemType) === 'small';
	const imageUrl = resolveImage(item.image);
	const fallbackTypeIcon = TYPE_FALLBACK_ICON[item.itemType] ?? 'category';
	const compactIcon = getPlaceholderIcon(item);

	root.setAttribute('href', getListingHref(item));

	const thumb = root.querySelector<HTMLElement>('[data-listing-link-thumb]');
	const thumbImg = root.querySelector<HTMLImageElement>('[data-listing-link-thumb-img]');
	const thumbTile = thumb?.querySelector<HTMLElement>('.iot-hub-listing-link__thumb-tile');
	const thumbIconWrap = thumbTile?.querySelector<HTMLElement>('[data-icon-root]');
	if (!thumb || !thumbImg || !thumbTile || !thumbIconWrap) return;
	const isRow = root.classList.contains('iot-hub-listing-link--row');
	const thumbIconSize = getThumbIconSize(isCompact, isRow);

	if (isCompact) {
		thumb.classList.add('iot-hub-listing-link__thumb--compact');
		thumb.style.setProperty('--iot-hub-listing-link-tile-color', item.color ?? '#048ad3');
		thumbImg.removeAttribute('src');
		thumbImg.hidden = true;
		thumbTile.hidden = false;
		void bindIotHubIcon(thumbIconWrap, compactIcon, thumbIconSize);
	} else {
		thumb.classList.remove('iot-hub-listing-link__thumb--compact');
		thumb.style.removeProperty('--iot-hub-listing-link-tile-color');
		if (imageUrl) {
			thumbImg.src = imageUrl;
			thumbImg.hidden = false;
			thumbTile.hidden = true;
			void bindIotHubIcon(thumbIconWrap, null, thumbIconSize);
		} else {
			thumbImg.removeAttribute('src');
			thumbImg.hidden = true;
			thumbTile.hidden = false;
			void bindIotHubIcon(thumbIconWrap, fallbackTypeIcon, thumbIconSize);
		}
	}

	// Present only on cards cloned from a template rendered with `showType`.
	const typeMarker = root.querySelector<HTMLElement>('[data-listing-link-type]');
	const typeMarkerIcon = typeMarker?.querySelector<HTMLElement>('[data-icon-root]');
	if (typeMarker && typeMarkerIcon) {
		const category = getCategoryForItemType(item.itemType);
		typeMarker.hidden = !category;
		if (category) typeMarker.style.setProperty('--iot-hub-listing-link-type-color', category.tileColorDark);
		else typeMarker.style.removeProperty('--iot-hub-listing-link-type-color');
		const typeLabel = typeMarker.querySelector<HTMLElement>('[data-listing-link-type-label]');
		if (typeLabel) typeLabel.textContent = category?.singularLabel ?? '';
		void bindIotHubIcon(typeMarkerIcon, category ? TYPE_MARKER_ICON[item.itemType] : null, 14);
	}

	const name = root.querySelector<HTMLElement>('[data-listing-link-name]');
	if (name) name.textContent = item.name;

	const author = root.querySelector<HTMLElement>('[data-listing-link-author]');
	const authorText = root.querySelector<HTMLElement>('[data-listing-link-author-text]');
	if (author && authorText) {
		if (item.creatorDisplayName) {
			author.hidden = false;
			authorText.textContent = item.creatorDisplayName;
		} else {
			author.hidden = true;
			authorText.textContent = '';
		}
		// Swap the leading author glyph between `verified` (brand accent)
		// and the default `person` silhouette based on the creator's
		// verification status.
		const authorIcon = author.querySelector<HTMLElement>('[data-icon-root]');
		if (authorIcon) {
			authorIcon.classList.toggle(
				'iot-hub-listing-link__author-icon--verified',
				!!item.creatorVerified
			);
			void bindIotHubIcon(authorIcon, item.creatorVerified ? 'verified' : 'person', 16);
		}
	}
}
