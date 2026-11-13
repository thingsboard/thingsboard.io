import { lockedByOther } from '@util/scroll-lock';

// Checks used before the header opens a layer (menu sheet, search dialog, edge swipe).

// Browsers without the Popover API can't parse the `:popover-open` selector.
const supportsPopover = () => typeof HTMLElement.prototype.hidePopover === 'function';

// The IoT Hub filter drawer hangs below the header, so layers may open over it.
const UNDER_HEADER = ['iot-hub-filter'];

/**
 * Whether another layer already covers the page and the header: an open `<dialog>`, an open popover
 * or a layer holding the scroll lock. `mine` lists the caller's own scroll-lock owners, which don't
 * count.
 */
export function layerOver(...mine: string[]): boolean {
	if (lockedByOther(...mine, ...UNDER_HEADER) || document.querySelector('dialog[open]')) return true;
	return supportsPopover() && document.querySelector(':popover-open') !== null;
}

/**
 * Closes Starlight's sidebar if it is open. On phones the sidebar is a popover in the browser's top
 * layer, so it would be drawn over anything the header opens.
 */
export function dismissSidebar(): void {
	const sidebar = document.getElementById('starlight__sidebar');
	if (sidebar && supportsPopover() && sidebar.matches(':popover-open')) sidebar.hidePopover();
}
