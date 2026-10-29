// Client-side protection for the Formspree contact forms: field validation with inline hints, an XSS
// pre-check, a honeypot and a render-to-submit timing check.

import { fillTrackingFields } from '@util/attribution';
import { onConsentChange } from '@util/consent';

// Catches obvious XSS before Cloudflare's WAF answers the post with a dead-end "you have been blocked" page.
// Conservative, so angle brackets in a code snippet pass; svg payloads with inline handlers hit on*=.
const XSS_PATTERN =
	/<\s*\/?\s*(?:script|iframe|object|embed)\b|javascript\s*:|on(?:click|error|load|focus|blur|mouseover|mouseout|change|submit|input|toggle|animationend)\s*=/i;

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;

// Seconds between render (or modal open) and submit below which the post counts as a bot.
const MIN_FILL_SECONDS = 3;

const FAKE_THANKS_HTML = '<p>Thank you! Your message has been received.</p>';

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface GuardedField {
	name: string;
	label: string;
	type: 'text' | 'email' | 'textarea';
}

export interface ValidateOptions {
	// Give the hint an id, role="alert" and link it from the field via aria-describedby.
	announce?: boolean;
	focusFirstInvalid?: boolean;
}

const nowSeconds = () => Math.floor(Date.now() / 1000);

export function clearFieldError(el: HTMLElement): void {
	el.classList.remove('invalid-input');
	el.setAttribute('aria-invalid', 'false');
	el.removeAttribute('aria-describedby');
	const hint = el.closest('label')?.nextElementSibling;
	if (hint?.classList.contains('error-message-hint')) hint.remove();
}

// The hint goes right after the field's wrapping <label>.
function setFieldError(el: HTMLElement, message: string, announce: boolean): void {
	clearFieldError(el);
	el.classList.add('invalid-input');
	el.setAttribute('aria-invalid', 'true');
	const hint = document.createElement('p');
	hint.className = 'error-message-hint';
	hint.textContent = message;
	if (announce) {
		const id = `error-hint-${el.id || el.getAttribute('name') || 'field'}`;
		el.setAttribute('aria-describedby', id);
		hint.id = id;
		hint.setAttribute('role', 'alert');
	}
	el.closest('label')?.insertAdjacentElement('afterend', hint);
}

function fieldError(value: string, { label, type }: GuardedField): string | null {
	if (value === '') return `${label} is required.`;
	if (type === 'email' && !EMAIL_PATTERN.test(value)) return `Please enter a valid ${label.toLowerCase()}.`;
	if (XSS_PATTERN.test(value)) return `Please remove HTML or script tags from ${label.toLowerCase()}.`;
	return null;
}

// Clears the previous hints, then marks every invalid field. Fields missing from the form are skipped.
function validateFields(
	form: HTMLFormElement,
	fields: readonly GuardedField[],
	{ announce = true, focusFirstInvalid = true }: ValidateOptions = {}
): boolean {
	const elements = fields.map((field) => ({ field, el: form.elements.namedItem(field.name) as FieldElement | null }));
	elements.forEach(({ el }) => el && clearFieldError(el));

	let valid = true;
	elements.forEach(({ field, el }) => {
		if (!el) return;
		const message = fieldError(el.value.trim(), field);
		if (message) {
			setFieldError(el, message, announce);
			valid = false;
		}
	});

	if (!valid && focusFirstInvalid) form.querySelector<HTMLElement>('.invalid-input')?.focus();
	return valid;
}

const honeypots = new WeakMap<HTMLFormElement, HTMLInputElement>();

// A random name each load, so bots can't learn the honeypot.
export function armHoneypot(form: HTMLFormElement, containerSelector: string): void {
	const input = form.querySelector<HTMLInputElement>(`${containerSelector} input`);
	const label = form.querySelector<HTMLLabelElement>(`${containerSelector} label`);
	if (!input || !label) return;
	const name = 'hp_' + Math.random().toString(36).substring(2, 10);
	input.name = name;
	input.id = name;
	label.htmlFor = name;
	honeypots.set(form, input);
}

// Drops the honeypot from the post once the submit is let through.
function disarmHoneypot(form: HTMLFormElement): void {
	honeypots.get(form)?.removeAttribute('name');
}

// Starts the timing check: call at render, and again when a modal holding the form opens.
export function stampRenderedAt(form: HTMLFormElement): void {
	const input = form.querySelector<HTMLInputElement>('.form-rendered-at');
	if (input) input.value = String(nowSeconds());
}

// True when the armed honeypot is filled or the form was submitted under MIN_FILL_SECONDS after its stamp.
function isLikelyBot(form: HTMLFormElement): boolean {
	if (honeypots.get(form)?.value.trim()) return true;
	const renderedAt = form.querySelector<HTMLInputElement>('.form-rendered-at')?.value;
	return !!renderedAt && nowSeconds() - parseInt(renderedAt, 10) < MIN_FILL_SECONDS;
}

// What a bot sees instead of an error, so it has nothing to retry against.
function showFakeThanks(form: HTMLFormElement): void {
	form.innerHTML = FAKE_THANKS_HTML;
}

// Validates on submit, then posts unless it looks like a bot, which gets the fake "Thank you" instead.
export function guardSubmit(form: HTMLFormElement, fields: readonly GuardedField[], options?: ValidateOptions): void {
	form.addEventListener('submit', (e) => {
		if (!validateFields(form, fields, options)) {
			e.preventDefault();
			return;
		}
		if (isLikelyBot(form)) {
			e.preventDefault();
			showFakeThanks(form);
			return;
		}
		disarmHoneypot(form);
	});
}

// Fills the utm_*, client_id and fpr inputs now and again on every consent change; returns the first fill
// for the dataLayer event.
export function bindTrackingFields(form: HTMLFormElement): Record<string, string> {
	onConsentChange(() => fillTrackingFields(form));
	return fillTrackingFields(form);
}
