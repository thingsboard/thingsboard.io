import {
	formatInstallCount,
	formatInstalls,
	getCardVariant,
	getCreatorHref,
	getInstallVerb,
	getPlaceholderIcon,
	resolvePreviewImage,
	type ListingView,
} from '@models/iot-hub';
import { bindIotHubIcon } from './iot-hub-icon-bind';

// Pattern C binder for ListingCard. Mirrors the static-render branches in
// ListingCard.astro 1:1 — both big and compact variants — so a card cloned
// from <ListingCardTemplate variant="big|compact" /> can be bound to any
// ListingView and end up byte-identical to a build-time card.
//
// Sync for everything except the compact thumb glyph, which delegates to
// bindIotHubIcon (async for MDI). Callers don't await — the icon wrapper
// stays in its reset state until the SVG arrives.

export function bindListingCard(
	root: HTMLElement,
	item: ListingView,
	categorySlug: string,
	showCreator = true
): void {
	const variant = getCardVariant(item.itemType);

	// Root href.
	root.setAttribute('href', `/iot-hub/${categorySlug}/${item.slug}/`);

	// DEVICE cards get a white preview background (vs the light gray default).
	root.classList.toggle('iot-hub-card--device', item.itemType === 'DEVICE');

	// Title.
	const title = root.querySelector<HTMLElement>('[data-card-title]');
	if (title) title.textContent = item.name;

	// Install count.
	const installs = root.querySelector<HTMLElement>('[data-card-installs]');
	if (installs) installs.textContent = formatInstallCount(item.installCount);
	const installsWrap = root.querySelector<HTMLElement>('[data-card-installs-wrap]');
	if (installsWrap) installsWrap.title = formatInstalls(item.installCount);

	// Variant-specific thumb.
	if (variant === 'big') {
		bindBigThumb(root, item);
	} else {
		bindCompactThumb(root, item);
	}

	// Author row.
	bindAuthor(root, item, showCreator);

	// Install button.
	bindInstallButton(root, item);
}

function bindBigThumb(root: HTMLElement, item: ListingView): void {
	const img = root.querySelector<HTMLImageElement>('[data-card-img]');
	const fallback = root.querySelector<HTMLElement>('[data-card-img-fallback]');
	if (!img || !fallback) return;
	const imageUrl = resolvePreviewImage(item.image);
	if (imageUrl) {
		img.src = imageUrl;
		img.alt = item.name;
		img.hidden = false;
		fallback.hidden = true;
	} else {
		img.removeAttribute('src');
		img.hidden = true;
		fallback.hidden = false;
	}
}

function bindCompactThumb(root: HTMLElement, item: ListingView): void {
	const tile = root.querySelector<HTMLElement>('[data-card-icon-tile]');
	if (!tile) return;
	tile.style.background = item.color ?? '#4caf50';
	const iconRoot = tile.querySelector<HTMLElement>('[data-icon-root]');
	if (iconRoot) {
		void bindIotHubIcon(iconRoot, getPlaceholderIcon(item), 32);
	}
}

function bindAuthor(root: HTMLElement, item: ListingView, showCreator: boolean): void {
	const wrap = root.querySelector<HTMLElement>('[data-card-author-wrap]');
	const author = root.querySelector<HTMLElement>('[data-card-author]');
	const name = root.querySelector<HTMLElement>('[data-card-author-name]');
	const icon = root.querySelector<HTMLElement>('[data-card-author-icon]');
	if (!wrap || !author || !name || !icon) return;

	if (!showCreator || !item.creatorDisplayName) {
		wrap.hidden = true;
		return;
	}
	wrap.hidden = false;

	name.textContent = item.creatorDisplayName;
	icon.textContent = item.creatorVerified ? 'verified' : 'person';
	icon.classList.toggle(
		'iot-hub-card__author-icon--verified',
		!!item.creatorVerified
	);

	const creatorHref = item.creatorId ? getCreatorHref(item.creatorId) : null;
	if (creatorHref) {
		author.setAttribute('role', 'link');
		author.setAttribute('tabindex', '0');
		author.dataset.creatorHref = creatorHref;
		author.title = item.creatorDisplayName;
		author.classList.add('iot-hub-card__author--link');
	} else {
		author.removeAttribute('role');
		author.removeAttribute('tabindex');
		delete author.dataset.creatorHref;
		author.removeAttribute('title');
		author.classList.remove('iot-hub-card__author--link');
	}
}

function bindInstallButton(root: HTMLElement, item: ListingView): void {
	const btn = root.querySelector<HTMLButtonElement>('[data-iot-hub-install-trigger]');
	if (!btn) return;
	btn.dataset.slug = item.slug;
	btn.dataset.itemType = item.itemType;
	if (item.creatorAffiliateId) {
		btn.dataset.affiliateId = item.creatorAffiliateId;
	} else {
		delete btn.dataset.affiliateId;
	}
	const label = getInstallVerb(item.itemType, 'card');
	btn.setAttribute('aria-label', `${label} ${item.name}`);
	const labelSpan = btn.querySelector('span');
	if (labelSpan) labelSpan.textContent = label;
}
