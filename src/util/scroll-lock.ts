import './scroll-lock.css';

// Shared document scroll-lock for modal layers (dialogs, drawers, lightboxes).
// Hides the page scrollbar while a layer is open and compensates the freed
// scrollbar width on the document, the fixed promo banner, the fixed site
// header, and the chat widget so none of them jump wider.
//
// Locks are per owner; the page unlocks when the last owner releases.
// `@util/modal-dialog` uses owner `dialog`.

const HTML_LOCK_CLASS = 'tb-scroll-locked';
// Also added to <html> when the hidden scrollbar took up space (a classic scrollbar, not an overlay
// one) and the lock padded the page for it. The mobile menu sheet's views then reserve space for a
// scrollbar (`SiteMenu`).
const HTML_COMP_CLASS = 'tb-scroll-compensated';
// Full-width fixed bars padded from the inside to absorb the freed scrollbar
// width. The promo banner sits above the site header; both compensate the same.
const BAR_SELECTORS = ['#promo-banner', 'header.header'];
// Our launcher (`YourGptWidget.astro`) and, once loaded, the YourGPT window; both position by the same variable.
const CHAT_SELECTOR = '.ygpt-chatbot, #chat-launcher';
const CHAT_POSITION_VAR = '--yourgptChatbotPositionX';

const owners = new Set<string>();
let htmlOriginalPadding = '';
// The chat elements compensated by the active lock + their pre-lock inline offset. Drained on unlock.
const compensatedChats: { el: HTMLElement; original: string }[] = [];
// Bars compensated by the active lock + their pre-lock inline padding, so
// unlockScroll restores each exactly. Drained on unlock.
const compensatedBars: { selector: string; original: string }[] = [];

// Toggle the transition off around a padding change so the compensation
// applies instantly instead of animating.
function setPaddingInstant(el: HTMLElement, value: string): void {
	el.style.transition = 'none';
	el.style.paddingRight = value;
	requestAnimationFrame(() =>
		requestAnimationFrame(() => {
			el.style.transition = '';
		})
	);
}

// Full-width fixed bar: pad from the inside by the freed scrollbar width so its
// centred/edge content stays put when the page scrollbar disappears. The width
// is also set as `--tb-scrollbar-comp`, for fixed elements inside the bar that
// span the whole window and so don't get this padding (the bottom of the mobile
// menu sheet, in `SiteMenu`). Returns the compensation record to push onto
// `compensatedBars`, or null if the bar is absent, so the caller never has to
// tell null apart from an empty original padding.
function compensateBar(selector: string, sw: number): { selector: string; original: string } | null {
	const el = document.querySelector<HTMLElement>(selector);
	if (!el) return null;
	const original = el.style.paddingRight;
	const cur = parseFloat(getComputedStyle(el).paddingRight) || 0;
	setPaddingInstant(el, `${cur + sw}px`);
	el.style.setProperty('--tb-scrollbar-comp', `${sw}px`);
	return { selector, original };
}

function restoreBar(selector: string, original: string): void {
	const el = document.querySelector<HTMLElement>(selector);
	if (!el) return;
	el.style.removeProperty('--tb-scrollbar-comp');
	setPaddingInstant(el, original);
}

export function lockScroll(owner = 'default'): void {
	const alreadyLocked = owners.size > 0;
	owners.add(owner);
	if (alreadyLocked) return;

	const html = document.documentElement;
	const sw = window.innerWidth - html.clientWidth;
	htmlOriginalPadding = html.style.paddingRight;

	// Padding and overflow change together, before the bars below read computed styles: a layout
	// between the two lays the page out a scrollbar narrower and scroll anchoring shifts it.
	html.classList.add(HTML_LOCK_CLASS);

	if (sw > 0) {
		html.style.paddingRight = `${sw}px`;
		html.classList.add(HTML_COMP_CLASS);

		// Full-width fixed bars (promo banner + site header): pad each from the
		// inside; remember the original padding to restore on unlock.
		for (const selector of BAR_SELECTORS) {
			const bar = compensateBar(selector, sw);
			if (bar) compensatedBars.push(bar);
		}

		// The chat pins itself with a CSS-variable offset — shift it too.
		for (const el of document.querySelectorAll<HTMLElement>(CHAT_SELECTOR)) {
			const original = el.style.getPropertyValue(CHAT_POSITION_VAR);
			const cur = parseFloat(getComputedStyle(el).getPropertyValue(CHAT_POSITION_VAR)) || 0;
			el.style.setProperty(CHAT_POSITION_VAR, `${cur + sw}px`);
			compensatedChats.push({ el, original });
		}
	}
}

/** Whether an owner not listed in `mine` holds the lock, meaning another layer already covers the page. */
export function lockedByOther(...mine: string[]): boolean {
	for (const owner of owners) if (!mine.includes(owner)) return true;
	return false;
}

export function unlockScroll(owner = 'default'): void {
	// Unlock only when this owner held the lock and was the last one.
	if (!owners.delete(owner) || owners.size > 0) return;

	const html = document.documentElement;
	html.classList.remove(HTML_LOCK_CLASS, HTML_COMP_CLASS);
	html.style.paddingRight = htmlOriginalPadding;

	// Restore every bar this lock compensated (drain the list).
	for (const { selector, original } of compensatedBars.splice(0)) {
		restoreBar(selector, original);
	}

	for (const { el, original } of compensatedChats.splice(0)) {
		if (original) el.style.setProperty(CHAT_POSITION_VAR, original);
		else el.style.removeProperty(CHAT_POSITION_VAR);
	}
}
