// Submits a MailerLite webform without their script, as the same GET + `ajax=1` request their
// webforms.min.js makes: their bot protection refuses a background POST to the same endpoint.
// The form's own `action` / `method="post"` stays as the no-JS fallback.

const FALLBACK_ERROR = 'Something went wrong. Please try again.';

interface MailerLiteResponse {
	success?: boolean;
	errors?: { fatal?: string };
}

/**
 * Sends `form` on submit and swaps it for `success` once MailerLite accepts it. A rejection is
 * shown in the `[data-ml-error]` element in or next to the form, and the form stays.
 */
export function bindMailerLiteForm(form: HTMLFormElement, success: HTMLElement) {
	const submitBtn = form.querySelector<HTMLButtonElement>('[type="submit"]');
	const error = form.parentElement?.querySelector<HTMLElement>('[data-ml-error]');

	const setBusy = (busy: boolean) => {
		if (!submitBtn) return;
		submitBtn.disabled = busy;
		submitBtn.setAttribute('aria-busy', String(busy));
		submitBtn.classList.toggle('is-loading', busy);
	};

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		if (submitBtn?.disabled) return;
		if (error) error.hidden = true;
		setBusy(true);

		const params = new URLSearchParams();
		new FormData(form).forEach((value, key) => params.append(key, String(value)));
		params.set('ajax', '1');

		let message = FALLBACK_ERROR;
		try {
			const res = await fetch(`${form.action}?${params}`, { credentials: 'omit' });
			const data: MailerLiteResponse = await res.json();
			if (data.success) {
				form.reset();
				// Some forms are laid out with `display` rules that outrank the `hidden` attribute.
				form.style.setProperty('display', 'none', 'important');
				success.hidden = false;
				success.style.setProperty('display', 'block', 'important');
				success.focus();
				return;
			}
			message = data.errors?.fatal ?? message;
		} catch {
			// Network or parse failure: keep the generic message.
		} finally {
			setBusy(false);
		}

		if (error) {
			error.textContent = message;
			error.hidden = false;
		}
	});
}
