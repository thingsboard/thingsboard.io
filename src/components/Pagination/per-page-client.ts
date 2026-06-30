// Items-per-page dropdown behavior, shared between PerPageSelector.astro
// (the inline init) and host pipelines that need to reflect a restored page
// size back into the control (e.g. iot-hub-dynamic-search's `?pageSize=`
// restore). Keeping the option-selection logic here means it lives in one
// place instead of being re-implemented against PerPageSelector's internal
// DOM by every consumer.

// Reflect `value` as the selected option: toggle the selected class +
// aria-pressed across all options, update the trigger label, and store the
// value on the root's dataset. Does NOT dispatch an event — callers decide
// whether a programmatic change should notify the host (option clicks do;
// URL restores don't).
export function setPerPageValue(root: HTMLElement, value: number): void {
	root.querySelectorAll<HTMLButtonElement>('[data-per-page-option]').forEach((opt) => {
		const isSelected = Number.parseInt(opt.dataset.perPageValue ?? '', 10) === value;
		opt.classList.toggle('tb-pagination__per-page-option--selected', isSelected);
		opt.setAttribute('aria-pressed', String(isSelected));
	});
	const label = root.querySelector<HTMLElement>('[data-per-page-label]');
	if (label) label.textContent = String(value);
	root.dataset.perPage = String(value);
}

// Wire one selector instance. Click toggles the popup; an option click
// commits via setPerPageValue, closes, and dispatches a bubbling
// `tb-pagination:page-size-change` { perPage } for the host's data pipeline.
export function setupPerPage(root: HTMLElement): void {
	if (root.dataset.perPageInited) return;
	root.dataset.perPageInited = 'true';

	const button = root.querySelector<HTMLButtonElement>('[data-per-page-button]');
	const popup = root.querySelector<HTMLElement>('[data-per-page-popup]');
	if (!button || !popup) return;

	const openPopup = () => {
		popup.hidden = false;
		button.setAttribute('aria-expanded', 'true');
	};
	const closePopup = () => {
		popup.hidden = true;
		button.setAttribute('aria-expanded', 'false');
	};

	button.addEventListener('click', (e) => {
		e.stopPropagation();
		if (popup.hidden) openPopup();
		else closePopup();
	});

	for (const opt of root.querySelectorAll<HTMLButtonElement>('[data-per-page-option]')) {
		opt.addEventListener('click', (e) => {
			e.stopPropagation();
			const value = Number.parseInt(opt.dataset.perPageValue ?? '0', 10);
			if (!Number.isFinite(value) || value <= 0) return;
			setPerPageValue(root, value);
			closePopup();
			root.dispatchEvent(
				new CustomEvent('tb-pagination:page-size-change', {
					detail: { perPage: value },
					bubbles: true,
				})
			);
		});
	}

	document.addEventListener('click', (e) => {
		if (!popup.hidden && !root.contains(e.target as Node)) closePopup();
	});
	root.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && !popup.hidden) {
			closePopup();
			button.focus();
		}
	});
}

export function initPerPageSelectors(): void {
	document.querySelectorAll<HTMLElement>('[data-per-page-root]').forEach(setupPerPage);
}
