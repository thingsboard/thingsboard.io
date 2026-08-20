import type { CardShape } from './listing-card-hooks';
import {
	DEFAULT_TILE_COLOR,
	formatInstallCount,
	formatInstalls,
	getCreatorHref,
	getInstallVerb,
	getPlaceholderIcon,
	type ListingView,
} from '@models/iot-hub';
import { bindIotHubIcon } from './iot-hub-icon-bind';

// Pattern C binder for ListingCard. Mirrors the static-render branches in
// ListingCard.astro 1:1 — preview, tile and compact — so a card cloned from
// <ListingCardTemplate variant="preview|tile|compact" /> can be bound to any
// ListingView and end up byte-identical to a build-time card.
//
// The caller passes the shape it cloned; the binder never re-derives it. That
// matters because the three shapes do not map onto item type: on a mixed grid
// an item is bound as `preview` or `tile` purely on whether it has a preview
// image, regardless of whether its type would otherwise be compact. Inferring
// the shape here would send such a card to a hook its clone does not carry,
// leaving the thumb unfilled with no error.
//
// Sync for everything except the icon glyph, which delegates to bindIotHubIcon
// (async for MDI). Callers don't await — the icon wrapper stays in its reset
// state until the SVG arrives.
//
// Runtime caller: iot-hub-dynamic-search.ts buildCardNode() binds every cloned
// result card on the search / category / creator listing pages.

interface BindOptions {
	/** The shape the clone was taken from. Never inferred — see the note above. */
	shape: CardShape;
	/** When false, hide the creator row entirely. */
	showCreator?: boolean;
	/** Preview URL already resolved by the caller, so it is derived once. */
	previewUrl?: string | null;
}

export function bindListingCard(
	root: HTMLElement,
	item: ListingView,
	categorySlug: string,
	{ shape, showCreator = true, previewUrl = null }: BindOptions
): void {
	// Root href. An empty categorySlug (item type with no public category, e.g.
	// a type the site doesn't surface) would yield `/iot-hub//slug/` — guard it
	// to '#' instead, matching getListingHref.
	root.setAttribute('href', categorySlug ? `/iot-hub/${categorySlug}/${item.slug}/` : '#');

	// Title.
	const title = root.querySelector<HTMLElement>('[data-card-title]');
	if (title) title.textContent = item.name;

	// Install count — dropped for built-in content (it ships with ThingsBoard,
	// so the counter says nothing useful), along with its leading separator.
	const installs = root.querySelector<HTMLElement>('[data-card-installs]');
	if (installs) installs.textContent = formatInstallCount(item.installCount);
	const installsWrap = root.querySelector<HTMLElement>('[data-card-installs-wrap]');
	if (installsWrap) {
		installsWrap.title = formatInstalls(item.installCount);
		installsWrap.hidden = item.builtIn;
	}
	const authorDot = root.querySelector<HTMLElement>('[data-card-author-dot]');
	if (authorDot) authorDot.hidden = item.builtIn;

	// Thumb, keyed on the shape that was cloned.
	if (shape === 'tile') {
		bindIconTile(root, item, '[data-card-tile]', 48);
	} else if (shape === 'compact') {
		bindIconTile(root, item, '[data-card-icon-tile]', 32);
	} else {
		bindPreview(root, item, previewUrl);
	}

	// Author row.
	bindAuthor(root, item, showCreator);

	// Install button — reads "Open" for content that ships with ThingsBoard.
	bindInstallButton(root, item);
}

function bindPreview(root: HTMLElement, item: ListingView, imageUrl: string | null): void {
	const img = root.querySelector<HTMLImageElement>('[data-card-img]');
	const fallback = root.querySelector<HTMLElement>('[data-card-img-fallback]');
	if (!img || !fallback) return;
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

/**
 * Colour tile with a centred glyph. Serves both tile-bearing shapes: the
 * compact card's 32px glyph and the tile card's 48px glyph — same markup,
 * different host element and glyph size.
 */
function bindIconTile(
	root: HTMLElement,
	item: ListingView,
	selector: string,
	glyphSize: number
): void {
	const tile = root.querySelector<HTMLElement>(selector);
	if (!tile) return;
	tile.style.background = item.color ?? DEFAULT_TILE_COLOR;
	const iconRoot = tile.querySelector<HTMLElement>('[data-icon-root]');
	if (iconRoot) {
		void bindIotHubIcon(iconRoot, getPlaceholderIcon(item), glyphSize);
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
	// Read back by the install dialog to pick its "open" wording.
	if (item.builtIn) {
		btn.dataset.builtIn = 'true';
	} else {
		delete btn.dataset.builtIn;
	}
	const label = getInstallVerb(item.itemType, 'card', item.builtIn);
	btn.setAttribute('aria-label', `${label} ${item.name}`);
	const labelSpan = btn.querySelector('span');
	if (labelSpan) labelSpan.textContent = label;
}
