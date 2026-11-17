/**
 * Field validation for `ui/Field` controls: an error clears as soon as the field is fixed but only
 * appears once the reader leaves the field, or on submit. The form needs `novalidate`, since every
 * `Field` is `required` unless `optional`.
 */
export type FieldControl = HTMLInputElement | HTMLTextAreaElement;
export type Problem = { kind: 'required' | 'format'; message: string } | null;
type Check = (el: FieldControl) => Problem;

const errorOf = (el: FieldControl) => document.getElementById(`${el.id}-error`);

// `aria-describedby` lists the error only while it shows, after the field's hint if it has one.
function describeError(el: FieldControl, errorId: string, shown: boolean): void {
	const ids = (el.getAttribute('aria-describedby') ?? '').split(' ').filter((id) => id && id !== errorId);
	if (shown) ids.push(errorId);
	if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
	else el.removeAttribute('aria-describedby');
}

function clearFieldError(el: FieldControl): void {
	el.setAttribute('aria-invalid', 'false');
	delete el.dataset.error;
	const message = errorOf(el);
	if (message) {
		message.hidden = true;
		message.textContent = '';
		describeError(el, message.id, false);
	}
	if (announcedField === el) announce(null);
}

function setFieldError(el: FieldControl, problem: NonNullable<Problem>): void {
	el.setAttribute('aria-invalid', 'true');
	el.dataset.error = problem.kind;
	const message = errorOf(el);
	if (message) {
		message.textContent = problem.message;
		message.hidden = false;
		describeError(el, message.id, true);
	}
}

// One polite live region for the page: an error that shows when the reader leaves a field is not read
// out otherwise. After a failed submit, focus on the first failing field reads its error instead.
let announcer: HTMLElement | null = null;
let announceTimer: number | undefined;
let announcedField: FieldControl | null = null;

function announce(el: FieldControl | null, text = ''): void {
	if (!announcer) {
		announcer = document.createElement('div');
		announcer.className = 'ui-sr';
		announcer.setAttribute('aria-live', 'polite');
		document.body.append(announcer);
	}
	const region = announcer;
	window.clearTimeout(announceTimer);
	region.textContent = '';
	announcedField = el;
	if (!el) return;
	const label = el.labels?.[0]?.textContent?.replace(/\s+/g, ' ').trim();
	// A moment later, so it doesn't talk over the field that takes focus next.
	announceTimer = window.setTimeout(() => {
		region.textContent = label ? `${label}: ${text}` : text;
	}, 500);
}

function validateField(el: FieldControl, check: Check): boolean {
	const problem = check(el);
	if (problem) setFieldError(el, problem);
	else clearFieldError(el);
	return !problem;
}

/** Checks every field, focuses the first that fails, and says whether the form may go. */
export function validateAll(fields: FieldControl[], check: Check): boolean {
	const invalid = fields.filter((el) => !validateField(el, check));
	invalid[0]?.focus();
	return invalid.length === 0;
}

/** Returns a function for the submit handler: after it, a field is checked on leave even if empty. */
export function wireValidation(fields: FieldControl[], check: Check): () => void {
	let attempted = false;
	fields.forEach((el) => {
		el.addEventListener('input', () => {
			if (!el.dataset.error) return;
			if (!check(el) || (el.dataset.error === 'required' && el.value.trim() !== '')) clearFieldError(el);
		});
		el.addEventListener('blur', () => {
			if (!attempted && el.value.trim() === '') return;
			const before = errorOf(el)?.textContent ?? '';
			if (validateField(el, check)) return;
			const now = errorOf(el)?.textContent ?? '';
			if (now && now !== before) announce(el, now);
		});
	});
	return () => {
		attempted = true;
	};
}

const counters = new WeakMap<FieldControl, () => void>();

/**
 * Shows `n / max` from 80% of the cap. Calling it again for the same field recounts (after a draft is
 * restored, say) instead of adding a second listener.
 */
export function wireCounter(el: FieldControl): void {
	const known = counters.get(el);
	if (known) return known();
	const count = document.getElementById(`${el.id}-count`);
	if (!count || !el.maxLength || el.maxLength < 0) return;
	const update = () => {
		const max = el.maxLength;
		const len = el.value.length;
		count.hidden = len < max * 0.8;
		count.textContent = `${len.toLocaleString('en-US')} / ${max.toLocaleString('en-US')}`;
		count.classList.toggle('is-full', len >= max);
	};
	counters.set(el, update);
	update();
	el.addEventListener('input', update);
}
