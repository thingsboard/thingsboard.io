// The name-and-email "ready to launch" form at the foot of the solution landing pages
// (asset, device and energy management, monitoring dashboard).

import { armHoneypot, bindTrackingFields, clearFieldError, guardSubmit, stampRenderedAt } from '@util/form-guard';

const FIELDS = [
	{ name: 'name', label: 'Name', type: 'text' },
	{ name: 'email', label: 'Email Address', type: 'email' },
] as const;

export function initLeadForms(): void {
	document.querySelectorAll<HTMLFormElement>('form.readyToLaunchForm').forEach((form) => {
		bindTrackingFields(form);
		stampRenderedAt(form);
		armHoneypot(form, '.lead-form-hp');

		form.querySelectorAll<HTMLInputElement>('.contact-us-form-control').forEach((el) => {
			el.addEventListener('input', () => {
				if (el.classList.contains('invalid-input')) clearFieldError(el);
			});
		});

		guardSubmit(form, FIELDS);
	});
}
