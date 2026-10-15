/**
 * The keyframes of `FilterChart`'s loop for a given limit: rendered with the page and rewritten by the
 * chart's script on a drag, so the first play and a replay share one schedule.
 *
 * Built by concatenation, not template literals: Astro's frontmatter scanner loses its place in
 * nested template literals.
 */

interface FilterChartGeo {
	base: number;
	top: number;
	yMax: number;
}

interface FilterChartFrames {
	css: string;
	/** The climb as [loop %, open seconds], for the live reading. */
	climb: [number, number][];
	loop: number;
	fires: boolean;
}

/** Seconds: the pause before the climb, the full climb, the hold after it, the fade. */
const START = 0.3;
const FULL = 3.5;
const HOLD = 1.4;
const FADE = 0.35;
export const FILTER_CHART_FADE_S = FADE;

export const alarmCount = (n: number) => (n === 1 ? '1 alarm' : n + ' alarms');
/** The least the picture holds after the crossing, so the alarm's rise and ring settle. */
const SETTLE = 1.2;

export function filterChartFrames(uid: string, limit: number, peak: number, geo: FilterChartGeo): FilterChartFrames {
	const r2 = (v: number) => Math.round(v * 100) / 100;
	const yOf = (s: number) => geo.base - (s / geo.yMax) * (geo.base - geo.top);
	const rate = peak / FULL;
	const fires = limit < peak;
	const tStop = START + FULL;
	const tCross = START + limit / rate;
	const tHold = Math.max(tStop, fires ? tCross + SETTLE : 0) + HOLD;
	const loop = r2(tHold + FADE);
	const p = (t: number) => r2(Math.min(100, (t / loop) * 100));
	const ring = (spread: number, alpha: number) =>
		'0 0 0 ' + spread + 'px color-mix(in srgb, var(--fch-alarm) ' + alpha + '%, transparent)';
	const k = (name: string, body: string) => '@keyframes ' + uid + '-' + name + ' { ' + body + ' } ';
	const at = (t: number) => p(tCross + t);

	let css =
		k('grow', '0%, ' + p(START) + '% { transform: scaleY(0); } ' + p(tStop) + '%, 100% { transform: scaleY(1); }') +
		k(
			'ride',
			'0%, ' +
				p(START) +
				'% { transform: translateY(' +
				r2(yOf(0) - yOf(peak)) +
				'px); } ' +
				p(tStop) +
				'%, 100% { transform: none; }'
		) +
		k('fade', '0%, ' + p(tHold) + '% { opacity: 1; } 100% { opacity: 0; }');

	css += fires
		? k(
				'turn',
				'0%, ' + p(tCross) + '% { fill: var(--fch-hue); } ' + at(0.08) + '%, 100% { fill: var(--fch-alarm); }'
			) +
			k(
				'dot',
				'0%, ' +
					p(tCross) +
					'% { transform: scale(0); } ' +
					at(0.16) +
					'% { transform: scale(1.4); } ' +
					at(0.32) +
					'%, 100% { transform: scale(1); }'
			) +
			k('link', '0%, ' + at(0.08) + '% { transform: scaleX(0); } ' + at(0.4) + '%, 100% { transform: scaleX(1); }') +
			k(
				'alarm',
				'0%, ' +
					at(0.16) +
					'% { opacity: 0; transform: translateY(8px) scale(0.97); box-shadow: ' +
					ring(0, 0) +
					'; } ' +
					at(0.56) +
					'% { opacity: 1; transform: none; box-shadow: ' +
					ring(0, 0) +
					'; } ' +
					at(0.8) +
					'% { box-shadow: ' +
					ring(6, 20) +
					'; } ' +
					at(1.6) +
					'%, 100% { opacity: 1; transform: none; box-shadow: ' +
					ring(12, 0) +
					'; }'
			)
		: k('turn', '0%, 100% { fill: var(--fch-hue); }') +
			k('dot', '0%, 100% { transform: scale(0); }') +
			k('link', '0%, 100% { transform: scaleX(0); }') +
			k('alarm', '0%, 100% { opacity: 0; }');

	const on = "[data-fch='" + uid + "'] ";
	// The resting picture, outside the motion query: what shows without motion.
	const ink = fires ? 'var(--fch-alarm)' : 'var(--fch-hue)';
	css += on + '.fch__live { fill: ' + ink + '; } ' + on + '.fch__readout { fill: ' + ink + '; } ';
	const run = (name: string, ease = 'linear') => uid + '-' + name + ' var(--fch-loop) ' + ease + ' infinite';
	css +=
		'@media (prefers-reduced-motion: no-preference) { ' +
		on +
		'.fch__live { animation: ' +
		run('grow') +
		', ' +
		run('turn') +
		', ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__reading { animation: ' +
		run('ride') +
		', ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__readout { animation: ' +
		run('turn') +
		'; } ' +
		on +
		'.fch__fade { animation: ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__fired { animation: ' +
		run('dot', 'ease-out') +
		', ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__link { animation: ' +
		run('link', 'ease-out') +
		', ' +
		run('fade') +
		'; } ' +
		on +
		'.fch__alarm-move { animation: ' +
		run('alarm', 'cubic-bezier(0.2, 0.8, 0.2, 1)') +
		'; } ' +
		on +
		':is(.fch__live, .fch__reading, .fch__readout, .fch__fade, .fch__fired, .fch__link, .fch__alarm-move) { animation-play-state: var(--flow-play, running); } }';

	return {
		css,
		climb: [
			[p(START), 0],
			[p(tStop), peak],
		],
		loop,
		fires,
	};
}
