import {
	INSTALL_INSTANCES,
	INSTALL_LOCAL_DEFAULT,
	INSTALL_LOCAL_STORAGE_KEY,
	INSTALL_LOCAL_URL_PATTERN,
	IOT_HUB_STRINGS,
	buildInstallUrl,
	getInstallVerb,
	stripScheme,
	stripTrailingSlash,
	type InstallInstance,
} from '@models/iot-hub';
import './install-dialog.scss';
import { lockScroll, unlockScroll } from '@util/scroll-lock';

const S = IOT_HUB_STRINGS.installDialog;

interface OpenContext {
	slug: string;
	itemType: string;
	affiliateId: string | null;
}

let dialog: HTMLDialogElement | null = null;
let localBase = INSTALL_LOCAL_DEFAULT;
let current: OpenContext | null = null;
let copyResetTimer: number | undefined;
let flashedCopyBtn: HTMLElement | null = null;
let unlockTimer: number | undefined;

// Keep in sync with the dialog transition duration in install-dialog.scss.
const CLOSE_FADE_MS = 200;

// --- Icons ---------------------------------------------------------------
// Lucide-style 24×24 stroke icons (matching the Chevron convention).
// Keys hold the inner SVG markup; `icon()` wraps them in a sized <svg>.

const ICON_PATHS: Record<string, string> = {
	cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
	server:
		'<path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/><path d="M2 15a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/><path d="M6 8h.01"/><path d="M6 17h.01"/>',
	copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
	'external-link':
		'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
	pencil:
		'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
	check: '<path d="M20 6 9 17l-5-5"/>',
	x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};

function icon(name: string, size: number): string {
	return `<svg class="iot-hub-install-dialog__icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] ?? ''}</svg>`;
}

// --- localStorage (privacy-mode safe) -----------------------------------

function readLocalBase(): string {
	try {
		const v = localStorage.getItem(INSTALL_LOCAL_STORAGE_KEY);
		if (v && INSTALL_LOCAL_URL_PATTERN.test(v)) return stripTrailingSlash(v);
	} catch {
		/* ignore — storage unavailable */
	}
	return INSTALL_LOCAL_DEFAULT;
}

function writeLocalBase(v: string): void {
	try {
		localStorage.setItem(INSTALL_LOCAL_STORAGE_KEY, v);
	} catch {
		/* ignore — storage unavailable */
	}
}

// --- Markup (static shell, data-driven from INSTALL_INSTANCES) -----------

function rowMarkup(inst: InstallInstance): string {
	const editBtn = inst.editable
		? `<button type="button" class="iot-hub-install-dialog__edit" data-edit aria-label="${S.editLocal}">${icon('pencil', 16)}</button>`
		: '';
	const errorId = `iot-hub-install-${inst.key}-error`;
	// Edit mode replaces the text + action area with an inline input + save/cancel
	//; it's a row-level sibling toggled via `.is-editing`.
	const editCluster = inst.editable
		? `<div class="iot-hub-install-dialog__edit-row" data-edit-row hidden>
				<div class="iot-hub-install-dialog__edit-controls">
					<input type="url" class="iot-hub-install-dialog__input" data-input aria-describedby="${errorId}" placeholder="${INSTALL_LOCAL_DEFAULT}" />
					<button type="button" class="iot-hub-install-dialog__icon-btn" data-save aria-label="${S.save}">${icon('check', 24)}</button>
					<button type="button" class="iot-hub-install-dialog__icon-btn" data-cancel aria-label="${S.cancel}">${icon('x', 24)}</button>
				</div>
				<p class="iot-hub-install-dialog__error" id="${errorId}" data-error hidden>${S.invalidUrl}</p>
			</div>`
		: '';
	return `<li class="iot-hub-install-dialog__row" data-instance="${inst.key}">
			<span class="iot-hub-install-dialog__row-icon" aria-hidden="true">${icon(inst.icon, 32)}</span>
			<div class="iot-hub-install-dialog__row-main">
				<span class="iot-hub-install-dialog__row-label">${inst.label}</span>
				<div class="iot-hub-install-dialog__row-host"><span data-host></span>${editBtn}</div>
			</div>
			<div class="iot-hub-install-dialog__row-actions">
				<button type="button" class="iot-hub-install-dialog__icon-btn" data-copy aria-label="${S.copy}">${icon('copy', 24)}</button>
				<a class="iot-hub-install-dialog__action" data-open target="_blank" rel="noopener"><span data-verb></span>${icon('external-link', 20)}</a>
			</div>
			${editCluster}
		</li>`;
}

function buildDialog(): HTMLDialogElement {
	const el = document.createElement('dialog');
	el.className = 'iot-hub-install-dialog';
	// Only our own constants are interpolated here — safe to set as innerHTML.
	el.innerHTML = `<div class="iot-hub-install-dialog__panel">
			<header class="iot-hub-install-dialog__header">
				<h2 class="iot-hub-install-dialog__title" data-title></h2>
				<button type="button" class="iot-hub-install-dialog__close" data-close aria-label="${S.closeAriaLabel}">${icon('x', 24)}</button>
			</header>
			<p class="iot-hub-install-dialog__subtitle">${S.subtitle}</p>
			<ul class="iot-hub-install-dialog__rows" role="list">${INSTALL_INSTANCES.map(rowMarkup).join('')}</ul>
		</div>`;

	// Backdrop click (target is the dialog itself, not the panel) closes.
	el.addEventListener('click', (e) => {
		if (e.target === el) {
			el.close();
			return;
		}
		onDialogClick(e);
	});

	// showModal() traps focus but does not lock page scroll — restore it after
	// close, once the exit fade ends (timeout fallback for browsers without
	// transition support).
	el.addEventListener('close', () => {
		window.clearTimeout(unlockTimer);
		unlockTimer = window.setTimeout(unlockScroll, CLOSE_FADE_MS);
	});
	el.addEventListener('transitionend', (e) => {
		if (e.target === el && e.propertyName === 'opacity' && !el.open) {
			window.clearTimeout(unlockTimer);
			unlockScroll();
		}
	});

	// Native Esc fires the dialog `cancel` event (not a bubbling keydown). While
	// editing the local URL, intercept it so Esc cancels the inline edit instead
	// of closing the whole dialog.
	el.addEventListener('cancel', (e) => {
		const row = localRow();
		if (row?.classList.contains('is-editing')) {
			e.preventDefault();
			cancelEdit();
		}
	});

	const input = el.querySelector<HTMLInputElement>('[data-input]');
	input?.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			saveEdit();
		}
		// Escape is handled by the dialog `cancel` listener above.
	});
	input?.addEventListener('input', () => clearInvalid(input));

	document.body.appendChild(el);
	return el;
}

// --- Per-open refresh ----------------------------------------------------

function instanceBase(inst: InstallInstance): string {
	return inst.editable ? localBase : inst.base;
}

function refresh(): void {
	if (!dialog || !current) return;
	window.clearTimeout(copyResetTimer);
	flashedCopyBtn = null;
	const verb = getInstallVerb(current.itemType);
	const title = dialog.querySelector('[data-title]');
	if (title) title.textContent = verb === 'Connect' ? S.titleConnect : S.title;

	for (const inst of INSTALL_INSTANCES) {
		const row = dialog.querySelector<HTMLElement>(`[data-instance="${inst.key}"]`);
		if (!row) continue;
		const base = instanceBase(inst);
		const url = buildInstallUrl(base, current.slug, {
			referral: inst.referral,
			affiliateId: current.affiliateId,
		});
		const host = row.querySelector('[data-host]');
		if (host) host.textContent = stripScheme(base);
		const open = row.querySelector<HTMLAnchorElement>('[data-open]');
		if (open) {
			open.href = url;
			// Distinct accessible name per row — the visible verb alone repeats
			// across rows with no context for screen readers.
			open.setAttribute('aria-label', `${verb} — ${inst.label}`);
		}
		const verbEl = row.querySelector('[data-verb]');
		if (verbEl) verbEl.textContent = verb;
		const copy = row.querySelector<HTMLElement>('[data-copy]');
		if (copy) {
			copy.dataset.url = url;
			resetCopy(copy);
		}
	}
}

// --- Dialog interactions -------------------------------------------------

function onDialogClick(e: MouseEvent): void {
	const t = e.target as Element;
	if (t.closest('[data-close]')) {
		dialog?.close();
		return;
	}
	const copy = t.closest<HTMLElement>('[data-copy]');
	if (copy) {
		void doCopy(copy);
		return;
	}
	if (t.closest('[data-edit]')) {
		startEdit();
		return;
	}
	if (t.closest('[data-save]')) {
		saveEdit();
		return;
	}
	if (t.closest('[data-cancel]')) {
		cancelEdit();
		return;
	}
	if (t.closest('[data-open]')) {
		// Anchor opens the deep link in a new tab (default); close behind it.
		dialog?.close();
	}
}

function resetCopy(btn: HTMLElement): void {
	btn.innerHTML = icon('copy', 24);
	btn.classList.remove('is-copied');
	btn.setAttribute('aria-label', S.copy);
}

async function doCopy(btn: HTMLElement): Promise<void> {
	const url = btn.dataset.url;
	if (!url || !navigator.clipboard) return;
	try {
		await navigator.clipboard.writeText(url);
		// Reset a different row still showing its "copied" tick (one shared timer).
		if (flashedCopyBtn && flashedCopyBtn !== btn) resetCopy(flashedCopyBtn);
		flashedCopyBtn = btn;
		btn.innerHTML = icon('check', 24);
		btn.classList.add('is-copied');
		btn.setAttribute('aria-label', S.copied);
		window.clearTimeout(copyResetTimer);
		copyResetTimer = window.setTimeout(() => {
			resetCopy(btn);
			flashedCopyBtn = null;
		}, 1500);
	} catch {
		/* ignore — clipboard blocked */
	}
}

function localRow(): HTMLElement | null {
	return dialog?.querySelector<HTMLElement>('[data-instance="local"]') ?? null;
}

function clearInvalid(input: HTMLInputElement): void {
	input.classList.remove('is-invalid');
	input.removeAttribute('aria-invalid');
	localRow()?.querySelector<HTMLElement>('[data-error]')?.setAttribute('hidden', '');
}

function startEdit(): void {
	const row = localRow();
	if (!row) return;
	const input = row.querySelector<HTMLInputElement>('[data-input]');
	const editRow = row.querySelector<HTMLElement>('[data-edit-row]');
	if (!input || !editRow) return;
	input.value = localBase;
	clearInvalid(input);
	editRow.hidden = false;
	row.classList.add('is-editing');
	input.focus();
}

function cancelEdit(): void {
	const row = localRow();
	if (!row) return;
	const wasEditing = row.classList.contains('is-editing');
	const editRow = row.querySelector<HTMLElement>('[data-edit-row]');
	if (editRow) editRow.hidden = true;
	row.classList.remove('is-editing');
	if (wasEditing) row.querySelector<HTMLElement>('[data-edit]')?.focus();
}

function saveEdit(): void {
	const row = localRow();
	if (!row) return;
	const input = row.querySelector<HTMLInputElement>('[data-input]');
	if (!input) return;
	const value = stripTrailingSlash(input.value.trim());
	if (!INSTALL_LOCAL_URL_PATTERN.test(value)) {
		input.classList.add('is-invalid');
		input.setAttribute('aria-invalid', 'true');
		row.querySelector<HTMLElement>('[data-error]')?.removeAttribute('hidden');
		input.focus();
		return;
	}
	localBase = value;
	writeLocalBase(value);
	cancelEdit();
	refresh();
}

// --- Open + global wiring ------------------------------------------------

function open(ctx: OpenContext): void {
	if (!ctx.slug) return;
	if (!dialog) dialog = buildDialog();
	window.clearTimeout(unlockTimer);
	current = ctx;
	cancelEdit();
	refresh();
	lockScroll();
	dialog.showModal();
}

function onDocClick(e: MouseEvent): void {
	const trigger = (e.target as Element).closest<HTMLElement>(
		'[data-iot-hub-install-trigger]'
	);
	if (!trigger) return;
	// The card button is nested inside the card's <a> — block navigation.
	e.preventDefault();
	e.stopPropagation();
	open({
		slug: trigger.dataset.slug ?? '',
		itemType: trigger.dataset.itemType ?? '',
		affiliateId: trigger.dataset.affiliateId || null,
	});
}

function init(): void {
	localBase = readLocalBase();
	document.addEventListener('click', onDocClick);
}

declare global {
	interface Window {
		__tbInstallDialogInit?: boolean;
	}
}

if (typeof window !== 'undefined' && !window.__tbInstallDialogInit) {
	window.__tbInstallDialogInit = true;
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init, { once: true });
	} else {
		init();
	}
}
