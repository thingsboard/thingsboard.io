import {
	getCategoryForItemType,
	getCardVariant,
	getPlaceholderIcon,
	resolveImage,
	type IotHubItemType,
	type ListingView,
} from '@models/iot-hub';
import { bindIotHubIcon } from './iot-hub-icon-bind';

// Type-fallback icon map used when getPlaceholderIcon doesn't supply
// anything (or the supplied name fails to resolve) for the non-compact
// branch where the listing image is missing.
export const TYPE_FALLBACK_ICON = {
	WIDGET: 'widgets',
	SOLUTION_TEMPLATE: 'integration_instructions',
	CALCULATED_FIELD: 'functions',
	ALARM_RULE: 'notification_important',
	RULE_CHAIN: 'account_tree',
	DEVICE: 'memory',
} satisfies Record<IotHubItemType, string>;

// The pixel sizes live in IotHubListingLink.astro's styles, next to the boxes
// they have to fit.
export const THUMB_ICON_SIZE = 'var(--iot-hub-listing-link-thumb-icon-size)';

// Type-marker icons: the IoT Hub type dictionary the platform uses, not the
// thumbnail placeholders above, which picture the content rather than the type.
const TYPE_MARKER_ICON = {
	DEVICE: 'devices_other',
	SOLUTION_TEMPLATE: 'apps',
	WIDGET: 'widgets',
	CALCULATED_FIELD: 'mdi:function-variant',
	ALARM_RULE: 'mdi:bell-cog',
	RULE_CHAIN: 'settings_ethernet',
} satisfies Record<IotHubItemType, string>;

export const TYPE_MARKER_ICON_SIZE = 14;

interface TypeMarker {
	icon: string;
	/** The type's colour; the styles pull it toward the text colour for legibility. */
	color: string;
	label: string;
}

// Shared by the markup and the binder. Null for a type with no category: no marker.
export function getTypeMarker(itemType: string): TypeMarker | null {
	const category = getCategoryForItemType(itemType);
	if (!category) return null;
	return {
		icon: TYPE_MARKER_ICON[category.itemType],
		color: category.tileColorDark,
		label: category.singularLabel,
	};
}

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
	const thumbTile = thumb?.querySelector<HTMLElement>('[data-listing-link-thumb-tile]');
	const thumbIconWrap = thumbTile?.querySelector<HTMLElement>('[data-icon-root]');
	if (!thumb || !thumbImg || !thumbTile || !thumbIconWrap) return;

	const shownImage = isCompact ? null : imageUrl;
	thumb.classList.toggle('iot-hub-listing-link__thumb--compact', isCompact);
	// Set only when the item has a colour, as the markup does; otherwise the default
	// declared on `.iot-hub-listing-link__thumb` in IotHubListingLink.astro applies.
	if (isCompact && item.color) thumb.style.setProperty('--iot-hub-listing-link-tile-color', item.color);
	else thumb.style.removeProperty('--iot-hub-listing-link-tile-color');
	if (shownImage) thumbImg.src = shownImage;
	else thumbImg.removeAttribute('src');
	thumbImg.hidden = !shownImage;
	thumbTile.hidden = !!shownImage;
	const thumbIcon = isCompact ? compactIcon : shownImage ? null : fallbackTypeIcon;
	void bindIotHubIcon(thumbIconWrap, thumbIcon, THUMB_ICON_SIZE);

	// Present only on cards cloned from a template rendered with `showType`.
	const typeMarker = root.querySelector<HTMLElement>('[data-listing-link-type]');
	const typeMarkerIcon = typeMarker?.querySelector<HTMLElement>('[data-icon-root]');
	if (typeMarker && typeMarkerIcon) {
		const marker = getTypeMarker(item.itemType);
		typeMarker.hidden = !marker;
		if (marker) typeMarker.style.setProperty('--iot-hub-listing-link-type-color', marker.color);
		else typeMarker.style.removeProperty('--iot-hub-listing-link-type-color');
		const typeLabel = typeMarker.querySelector<HTMLElement>('[data-listing-link-type-label]');
		if (typeLabel) typeLabel.textContent = marker?.label ?? '';
		void bindIotHubIcon(typeMarkerIcon, marker?.icon ?? null, TYPE_MARKER_ICON_SIZE);
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
