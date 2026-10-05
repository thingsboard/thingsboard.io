/** Content for `NormalizeSeries`: mixed device payloads becoming one data model. */

export const NORMALIZE_STAGES = { in: 'Mixed payloads', out: 'One data model' };

export const NORMALIZE_NODE = { label: 'Normalize' };

export type TokenRole = 'key' | 'punct' | 'num' | 'unit';

export interface PayloadToken {
	t: string;
	role: TokenRole;
}

export type PayloadFormat = 'fahrenheit' | 'json-comma' | 'hex-register' | 'kelvin';

export interface NormalizeCase {
	/** The reading in °C; the payload and the model row derive from it. */
	celsius: number;
	format: PayloadFormat;
	drift: number;
	/** What makes this payload awkward. Carried as a title attribute, not drawn. */
	note: string;
}

/** Drifts stay small so no reading changes digit count: the chips are fixed-width. */
export const NORMALIZE_CASES: NormalizeCase[] = [
	{ celsius: 24.5, format: 'fahrenheit', drift: 1.4, note: 'Fahrenheit' },
	{ celsius: 21.8, format: 'json-comma', drift: 1.4, note: 'JSON, decimal comma' },
	{ celsius: 24, format: 'hex-register', drift: 3, note: 'raw register, whole degrees in hex' },
	{ celsius: 19.3, format: 'kelvin', drift: 1.4, note: 'Kelvin' },
];

/** A register reports whole degrees, so its reading is snapped before anything is derived from it. */
export function canonical(c: NormalizeCase, celsius: number): number {
	return c.format === 'hex-register' ? Math.round(celsius) : celsius;
}

/**
 * The payload as the device sends it, split into syntax tokens. Spaces are non-breaking: flex
 * items trim edge whitespace.
 */
export function payloadTokens(c: NormalizeCase, celsius = c.celsius): PayloadToken[] {
	const v = canonical(c, celsius);
	switch (c.format) {
		case 'fahrenheit':
			return [
				{ t: (v * (9 / 5) + 32).toFixed(1), role: 'num' },
				{ t: ' °F', role: 'unit' },
			];
		case 'json-comma':
			return [
				{ t: '"t"', role: 'key' },
				{ t: ': ', role: 'punct' },
				{ t: '"', role: 'punct' },
				{ t: v.toFixed(1).replace('.', ','), role: 'num' },
				{ t: '"', role: 'punct' },
			];
		case 'hex-register':
			return [
				{ t: '0x', role: 'punct' },
				{ t: v.toString(16), role: 'num' },
			];
		case 'kelvin':
			return [
				{ t: 'TEMP_K', role: 'key' },
				{ t: '=', role: 'punct' },
				{ t: (v + 273.15).toFixed(1), role: 'num' },
			];
	}
}

export function readingText(c: NormalizeCase, celsius = c.celsius): string {
	return `${canonical(c, celsius).toFixed(1)} °C`;
}

export const NORMALIZE_WINDOW = 24;

/** A bounded walk around the starting reading; `rnd` lets the server pass a seeded source. */
export function nextCelsius(c: NormalizeCase, current: number, rnd: () => number = Math.random): number {
	const step = c.drift * 0.5 * (rnd() - 0.5) * 2;
	return Math.min(c.celsius + c.drift, Math.max(c.celsius - c.drift, current + step));
}

/** mulberry32, so every build renders the same HTML. */
function prng(seed: number): () => number {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) >>> 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function seedSeries(c: NormalizeCase, i: number, n: number = NORMALIZE_WINDOW): number[] {
	const rnd = prng(0x9e3779b9 ^ Math.imul(i + 1, 2654435761) ^ Math.round(c.celsius * 10));
	const out = [c.celsius];
	while (out.length < n) out.push(nextCelsius(c, out[out.length - 1], rnd));
	return out;
}

/** The walk's bounds, not the window's min/max, so a still device draws a still line. */
export function sparkDomain(c: NormalizeCase): [number, number] {
	const pad = c.drift * 0.25;
	return [c.celsius - c.drift - pad, c.celsius + c.drift + pad];
}
