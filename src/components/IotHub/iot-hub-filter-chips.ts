// Active-filter chips strip, shared by every bar that sits above a
// FilterPanel-backed list (ListingsFilterBar on the category pages,
// SearchFilterBar on the catalogue page).
//
// The FilterPanel emits `iot-hub-filter:change`
// { filters: Record<key, { value, label }[]> } whenever a checkbox toggles;
// each bar that declares `[data-filter-chips]` re-renders its strip from that
// snapshot. Removing a chip flips the matching checkbox off, which bubbles
// back out as another `iot-hub-filter:change` for the next render.

export type FilterEntry = { value: string; label: string };
export type FiltersByKey = Record<string, FilterEntry[]>;

const REMOVE_X_SVG =
	'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
	'<path d="M5 5 19 19M19 5 5 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
	'</svg>';

function findCheckbox(key: string, value: string): HTMLInputElement | null {
	return document.querySelector<HTMLInputElement>(
		`.iot-hub-filter-option__input[name="${CSS.escape(key)}"][value="${CSS.escape(value)}"]`
	);
}

function uncheckFilter(key: string, value: string): void {
	const cb = findCheckbox(key, value);
	if (!cb) return;
	cb.checked = false;
	cb.dispatchEvent(new Event('change', { bubbles: true }));
}

function clearAllFilters(): void {
	const panel = document.querySelector<HTMLElement>('[data-iot-hub-filter-panel]');
	if (!panel) return;
	const checked = Array.from(
		panel.querySelectorAll<HTMLInputElement>('.iot-hub-filter-option__input:checked')
	);
	if (checked.length === 0) return;
	for (const input of checked) input.checked = false;
	// Single dispatch — the FilterPanel listener re-collects the whole
	// snapshot, so one bubble is enough to update everything.
	checked[0].dispatchEvent(new Event('change', { bubbles: true }));
}

function makeChip(key: string, entry: FilterEntry): HTMLElement {
	const chip = document.createElement('span');
	chip.className = 'iot-hub-filter-bar__chip';
	const label = document.createElement('span');
	label.className = 'iot-hub-filter-bar__chip-label';
	label.textContent = entry.label;
	chip.appendChild(label);
	const remove = document.createElement('button');
	remove.type = 'button';
	remove.className = 'iot-hub-filter-bar__chip-remove';
	remove.setAttribute('aria-label', `Remove ${entry.label}`);
	remove.innerHTML = REMOVE_X_SVG;
	remove.addEventListener('click', () => uncheckFilter(key, entry.value));
	chip.appendChild(remove);
	return chip;
}

function makeClearAll(): HTMLElement {
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'iot-hub-filter-bar__clear-all';
	btn.textContent = 'Clear all';
	btn.addEventListener('click', clearAllFilters);
	return btn;
}

function renderChips(chipsEl: HTMLElement, filters: FiltersByKey): void {
	chipsEl.replaceChildren();
	let hasAny = false;
	for (const [key, entries] of Object.entries(filters)) {
		for (const entry of entries) {
			chipsEl.appendChild(makeChip(key, entry));
			hasAny = true;
		}
	}
	if (hasAny) chipsEl.appendChild(makeClearAll());
}

function setupFilterChips(): void {
	document.querySelectorAll<HTMLElement>('[data-iot-hub-search-bar]').forEach((bar) => {
		const chipsEl = bar.querySelector<HTMLElement>('[data-filter-chips]');
		if (!chipsEl || bar.dataset.chipsInited) return;
		bar.dataset.chipsInited = 'true';
		document.addEventListener('iot-hub-filter:change', ((e: CustomEvent) => {
			renderChips(chipsEl, e.detail?.filters ?? {});
		}) as EventListener);
	});
}

export function initFilterChips(): void {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setupFilterChips);
	} else {
		setupFilterChips();
	}
}
