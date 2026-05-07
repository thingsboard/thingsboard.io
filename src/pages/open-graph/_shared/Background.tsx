// src/pages/open-graph/_shared/Background.tsx
//
// Full-canvas decoration painted under every card: a 1200×630 dark base with
// scattered nodes (mostly brand-blue, two accent-orange) connected by faint
// lines and a soft brand-blue glow. Coordinates are in % of canvas so the SVG
// scales to whatever the parent gives it.

import { html } from 'satori-html';

const DOTS: Array<[number, number, number, 'blue' | 'orange']> = [
	// [xPct, yPct, radiusUnits, colorKey]   radiusUnits scaled to 1.6/1.8 px at 1200 wide
	[6, 12, 1.8, 'blue'], [14, 28, 1.6, 'blue'], [22, 56, 1.8, 'blue'],
	[30, 18, 1.6, 'blue'], [36, 44, 1.8, 'blue'], [44, 70, 1.6, 'blue'],
	[52, 22, 2.0, 'orange'],
	[56, 50, 1.8, 'blue'], [64, 36, 1.6, 'blue'], [68, 76, 1.8, 'blue'],
	[74, 14, 1.6, 'blue'], [78, 56, 1.8, 'blue'],
	[82, 32, 1.8, 'orange'],
	[86, 78, 1.8, 'blue'], [92, 22, 1.6, 'blue'], [94, 60, 1.8, 'blue'],
	[50, 88, 1.6, 'blue'], [60, 64, 1.6, 'blue'],
];

const LINES: Array<[number, number, number, number, 'blue' | 'orange']> = [
	[6, 12, 14, 28, 'blue'],   [14, 28, 22, 56, 'blue'],  [14, 28, 30, 18, 'blue'],
	[22, 56, 36, 44, 'blue'],  [30, 18, 36, 44, 'blue'],  [36, 44, 44, 70, 'blue'],
	[36, 44, 56, 50, 'blue'],  [52, 22, 64, 36, 'orange'],
	[56, 50, 64, 36, 'blue'],  [56, 50, 68, 76, 'blue'],  [64, 36, 74, 14, 'blue'],
	[64, 36, 78, 56, 'blue'],  [74, 14, 82, 32, 'blue'],  [78, 56, 82, 32, 'orange'],
	[78, 56, 86, 78, 'blue'],  [82, 32, 92, 22, 'blue'],  [82, 32, 94, 60, 'blue'],
	[44, 70, 50, 88, 'blue'],  [50, 88, 68, 76, 'blue'],  [50, 88, 86, 78, 'blue'],
	[60, 64, 78, 56, 'blue'],  [60, 64, 50, 88, 'blue'],
];

const W = 1200;
const H = 630;

const COLOR = { blue: '#7986cb', orange: '#ff5722' } as const;

/** Build the SVG markup for the network. Inlined as a string and parsed into a Satori-compatible VNode tree by `satori-html` at render time. */
function networkSvg(): string {
	const lineEls = LINES.map(
		([x1, y1, x2, y2, key]) =>
			`<line x1="${(x1 * W) / 100}" y1="${(y1 * H) / 100}" x2="${(x2 * W) / 100}" y2="${(y2 * H) / 100}" stroke="${COLOR[key]}" stroke-width="${key === 'orange' ? 0.6 : 0.5}" opacity="${key === 'orange' ? 0.55 : 0.42}"/>`,
	).join('');
	const dotEls = DOTS.map(
		([x, y, r, key]) =>
			`<circle cx="${(x * W) / 100}" cy="${(y * H) / 100}" r="${r}" fill="${COLOR[key]}" opacity="${key === 'orange' ? 0.95 : 0.78}"/>`,
	).join('');
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0">${lineEls}${dotEls}</svg>`;
}

/**
 * Render the background. The network SVG is parsed into a Satori-compatible
 * VNode tree by satori-html (Satori does not support dangerouslySetInnerHTML).
 * Caller is responsible for wrapping in a relative container (the Card root).
 */
export function Background() {
	return (
		<>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(70% 70% at 70% 50%, rgba(48,86,128,0.55), transparent 60%)',
				}}
			/>
			<div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
				{html(networkSvg())}
			</div>
		</>
	);
}
