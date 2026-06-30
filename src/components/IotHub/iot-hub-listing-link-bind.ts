import {
	IOT_HUB_CATEGORIES,
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

// Build the `/iot-hub/{category}/{slug}/` href for a listing, falling back
// to `#` when the itemType isn't in IOT_HUB_CATEGORIES (defensive — every
// known item type is registered).
export function getListingHref(item: ListingView): string {
	const cat = IOT_HUB_CATEGORIES.find((c) => c.itemType === item.itemType);
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
	const thumbIconWrap = thumb?.querySelector<HTMLElement>('[data-icon-root]');
	if (!thumb || !thumbImg || !thumbIconWrap) return;

	if (isCompact) {
		thumb.classList.add('iot-hub-listing-link__thumb--compact');
		thumb.style.background = item.color ?? '#048ad3';
		thumbImg.removeAttribute('src');
		thumbImg.hidden = true;
		thumbIconWrap.hidden = false;
		void bindIotHubIcon(thumbIconWrap, compactIcon, 28);
	} else {
		thumb.classList.remove('iot-hub-listing-link__thumb--compact');
		thumb.style.background = '';
		if (imageUrl) {
			thumbImg.src = imageUrl;
			thumbImg.hidden = false;
			thumbIconWrap.hidden = true;
			void bindIotHubIcon(thumbIconWrap, null, 24);
		} else {
			thumbImg.removeAttribute('src');
			thumbImg.hidden = true;
			thumbIconWrap.hidden = false;
			void bindIotHubIcon(thumbIconWrap, fallbackTypeIcon, 24);
		}
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
