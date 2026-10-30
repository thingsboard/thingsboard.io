/**
 * Field validation for `ui/Field` controls: an error clears as soon as the field is fixed but only
 * appears once the reader leaves the field, or on submit. The form needs `novalidate`, since every
 * `Field` is `required` unless `optional`.
 */
export type FieldControl = HTMLInputElement | HTMLTextAreaElement;
export type Problem = { kind: 'required' | 'format'; message: string } | null;
type Check = (el: FieldControl) => Problem;

const errorOf = (el: FieldControl) => document.getElementById(`${el.id}-error`);

function clearFieldError(el: FieldControl): void {
	el.setAttribute('aria-invalid', 'false');
	delete el.dataset.error;
	el.removeAttribute('aria-describedby');
	const message = errorOf(el);
	if (message) {
		message.hidden = true;
		message.textContent = '';
	}
}

// `aria-describedby` points at the error only while it shows.
function setFieldError(el: FieldControl, problem: NonNullable<Problem>): void {
	el.setAttribute('aria-invalid', 'true');
	el.dataset.error = problem.kind;
	const message = errorOf(el);
	if (message) {
		message.textContent = problem.message;
		message.hidden = false;
		el.setAttribute('aria-describedby', message.id);
	} else el.removeAttribute('aria-describedby');
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
			if (attempted || el.value.trim() !== '') validateField(el, check);
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
