import { getMdiSvg, svgIcons } from '@util/icons';

// Runtime binder for an IotHubIcon wrapper cloned from a template. Mirrors
// the three-path resolution logic in IotHubIcon.astro:
//   * `icon in svgIcons`     → inline SVG from the registry (sync)
//   * `mdi:<name>` prefix    → fetch SVG from the IoT Hub asset endpoint
//                              and inline it (async; the underlying
//                              getMdiSvg cache dedupes repeated names)
//   * any other string       → render as a Material Icons font glyph
//   * empty / nullish        → clear the wrapper back to template state
//
// Each invocation resets the wrapper's modifier classes, inline style and
// children first, so a single icon root can be re-bound to a different
// icon (e.g. when the search popup re-renders results with new data).

export async function bindIotHubIcon(
	root: HTMLElement,
	icon: string | null | undefined,
	size: string | number = '1em'
): Promise<void> {
	// Reset to template state.
	root.classList.remove('iot-hub-icon--svg', 'iot-hub-icon--font', 'material-icons');
	root.removeAttribute('style');
	root.replaceChildren();

	if (!icon) return;

	const sizeCss = typeof size === 'number' ? `${size}px` : size;

	// Registry → inline SVG, no fetch.
	if (icon in svgIcons) {
		root.classList.add('iot-hub-icon--svg');
		root.style.width = sizeCss;
		root.style.height = sizeCss;
		root.innerHTML = svgIcons[icon];
		return;
	}

	// MDI → fetch then inline. The wrapper stays in its reset (empty) state
	// while the fetch is in flight, so a quick re-bind on the same root
	// won't race a stale SVG into place.
	if (icon.startsWith('mdi:')) {
		const svg = await getMdiSvg(icon.slice(4));
		if (svg) {
			root.classList.add('iot-hub-icon--svg');
			root.style.width = sizeCss;
			root.style.height = sizeCss;
			root.innerHTML = svg;
		}
		return;
	}

	// Material Icons font ligature.
	root.classList.add('iot-hub-icon--font', 'material-icons');
	root.style.fontSize = sizeCss;
	root.textContent = icon;
}
