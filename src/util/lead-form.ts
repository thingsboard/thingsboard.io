// The name-and-email "ready to launch" form at the foot of the solution landing pages
// (asset, device and energy management, monitoring dashboard).

import { armHoneypot, bindTrackingFields, guardSubmit, stampRenderedAt } from '@util/form-guard';

const FIELDS = [
	{ name: 'name', label: 'Name', type: 'text' },
	{ name: 'email', label: 'Email Address', type: 'email' },
] as const;

export function initLeadForms(): void {
	document.querySelectorAll<HTMLFormElement>('form.readyToLaunchForm').forEach((form) => {
		bindTrackingFields(form);
		stampRenderedAt(form);
		armHoneypot(form);
		guardSubmit(form, FIELDS);
	});
}
