import './scroll-lock.css';

// Shared document scroll-lock for modal layers (dialogs, drawers, lightboxes).
// Hides the page scrollbar while a layer is open and compensates the freed
// scrollbar width on the document, the fixed promo banner, the fixed site
// header, and the chat widget so none of them jump wider.
//
// Idempotent + single-flag: repeated lock/unlock calls are no-ops. One overlay
// is expected open at a time; if two ever overlap, the first close unlocks
// (same limitation the inlined copies had).

const HTML_LOCK_CLASS = 'tb-scroll-locked';
// Full-width fixed bars padded from the inside to absorb the freed scrollbar
// width. The promo banner sits above the site header; both compensate the same.
const BAR_SELECTORS = ['#promo-banner', 'header.header'];
const CHAT_SELECTOR = '.ygpt-chatbot';
const CHAT_POSITION_VAR = '--yourgptChatbotPositionX';

let locked = false;
let htmlOriginalPadding = '';
let chatOriginalX = '';
let chatCompensated = false;
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
// centred/edge content stays put when the page scrollbar disappears. Returns the
// compensation record to push onto `compensatedBars`, or null if the bar is
// absent — so the caller never has to disambiguate null from an empty original.
function compensateBar(selector: string, sw: number): { selector: string; original: string } | null {
	const el = document.querySelector<HTMLElement>(selector);
	if (!el) return null;
	const original = el.style.paddingRight;
	const cur = parseFloat(getComputedStyle(el).paddingRight) || 0;
	setPaddingInstant(el, `${cur + sw}px`);
	return { selector, original };
}

function restoreBar(selector: string, original: string): void {
	const el = document.querySelector<HTMLElement>(selector);
	if (el) setPaddingInstant(el, original);
}

export function lockScroll(): void {
	if (locked) return;
	locked = true;

	const html = document.documentElement;
	const sw = window.innerWidth - html.clientWidth;
	htmlOriginalPadding = html.style.paddingRight;

	if (sw > 0) {
		html.style.paddingRight = `${sw}px`;

		// Full-width fixed bars (promo banner + site header): pad each from the
		// inside; remember the original padding to restore on unlock.
		for (const selector of BAR_SELECTORS) {
			const bar = compensateBar(selector, sw);
			if (bar) compensatedBars.push(bar);
		}

		// Chat widget pins itself with a CSS-variable offset — shift it too.
		const chat = document.querySelector<HTMLElement>(CHAT_SELECTOR);
		if (chat) {
			chatOriginalX = chat.style.getPropertyValue(CHAT_POSITION_VAR);
			const cur =
				parseFloat(getComputedStyle(chat).getPropertyValue(CHAT_POSITION_VAR)) || 0;
			chat.style.setProperty(CHAT_POSITION_VAR, `${cur + sw}px`);
			chatCompensated = true;
		}
	}

	html.classList.add(HTML_LOCK_CLASS);
}

export function unlockScroll(): void {
	if (!locked) return;
	locked = false;

	const html = document.documentElement;
	html.classList.remove(HTML_LOCK_CLASS);
	html.style.paddingRight = htmlOriginalPadding;

	// Restore every bar this lock compensated (drain the list).
	for (const { selector, original } of compensatedBars.splice(0)) {
		restoreBar(selector, original);
	}

	if (chatCompensated) {
		const chat = document.querySelector<HTMLElement>(CHAT_SELECTOR);
		if (chat) {
			if (chatOriginalX) chat.style.setProperty(CHAT_POSITION_VAR, chatOriginalX);
			else chat.style.removeProperty(CHAT_POSITION_VAR);
		}
		chatCompensated = false;
	}
}
