/** Sparkline geometry, shared by the app shell's server render and its client frames. */

export type Domain = [number, number];

export interface SparkView {
	w: number;
	h: number;
	pad: number;
}

/**
 * Spacing between points when `n` span the box. The window may hold one extra point past the
 * right edge, so spacing depends on the window size, not the array length.
 */
export function segmentWidth(n: number, view: SparkView): number {
	return view.w / (n - 1);
}

export function sparkY(value: number, [lo, hi]: Domain, view: SparkView): number {
	return view.h - view.pad - ((value - lo) / (hi - lo)) * (view.h - view.pad * 2);
}

/**
 * Smooth line and area path data (Catmull-Rom as cubic Béziers). `values` may hold one point more
 * than `window`, drawn past the right edge.
 */
export function sparkPaths(
	values: number[],
	domain: Domain,
	view: SparkView,
	window: number = values.length
): { line: string; area: string } {
	const seg = segmentWidth(window, view);
	const pts = values.map((v, i) => [i * seg, sparkY(v, domain, view)] as const);
	const f = (n: number) => n.toFixed(2);

	if (pts.length < 2) {
		const [x, y] = pts[0] ?? [0, view.h];
		return { line: `M${f(x)},${f(y)}`, area: `M${f(x)},${f(y)} L${f(x)},${f(view.h)} Z` };
	}

	let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
	for (let i = 0; i < pts.length - 1; i++) {
		const p0 = pts[Math.max(0, i - 1)];
		const p1 = pts[i];
		const p2 = pts[i + 1];
		const p3 = pts[Math.min(pts.length - 1, i + 2)];
		// Catmull-Rom tangents (neighbour chord / 6) as Bézier control points.
		const c1x = p1[0] + (p2[0] - p0[0]) / 6;
		const c1y = p1[1] + (p2[1] - p0[1]) / 6;
		const c2x = p2[0] - (p3[0] - p1[0]) / 6;
		const c2y = p2[1] - (p3[1] - p1[1]) / 6;
		d += ` C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
	}

	const last = pts[pts.length - 1];
	return {
		line: d,
		area: `${d} L${f(last[0])},${f(view.h)} L${f(pts[0][0])},${f(view.h)} Z`,
	};
}
