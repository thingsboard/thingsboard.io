/**
 * The use cases the solution flow's app shell rotates through. Metrics and wording follow the
 * published pages in `src/data/use-cases/`.
 */

export interface SolutionCase {
	brand: {
		name: string;
		accent: string;
		/** The customer's own domain, shown in the browser bar. */
		host: string;
		/** Stands in for the customer's logo. A Tabler icon name. */
		icon: string;
	};
	metricLabel: string;
	/** Appended verbatim, including any leading space. */
	unit: string;
	decimals: number;
	/**
	 * The metric's history as a closed loop: the last point leads back into the first. The sparkline
	 * slides a window of `SPARK_WINDOW` points along it, and the reading is the newest point shown.
	 */
	series: number[];
	alarms: number;
	domain: [number, number];
}

export const SPARK_WINDOW = 32;

const TAU = Math.PI * 2;

/** Samples `f` across one period; every term below uses whole cycles so the loop has no seam. */
const loop = (n: number, f: (t: number) => number): number[] =>
	Array.from({ length: n }, (_, i) => Math.round(f(i / n) * 100) / 100);

export const SOLUTION_CASES: SolutionCase[] = [
	{
		brand: { name: 'Acme Cold Chain', accent: '#3d50f5', host: 'acme.com', icon: 'tabler:snowflake' },
		metricLabel: 'Temperature',
		unit: '°',
		decimals: 1,
		// A chilled room inside the 2-8°C cold-chain band.
		series: loop(
			64,
			(t) => 4.2 + 0.9 * Math.sin(TAU * t) + 0.35 * Math.sin(TAU * 3 * t + 1.2) + 0.12 * Math.sin(TAU * 7 * t + 0.4)
		),
		alarms: 0,
		domain: [0, 10],
	},
	{
		brand: { name: 'Northwind Fuel', accent: '#1f8b4d', host: 'tanks.nw.com', icon: 'tabler:gas-station' },
		metricLabel: 'Fuel level',
		unit: '%',
		decimals: 0,
		// Drains in steps from 88% to 58%, then refills over the last eighth of the loop.
		series: loop(64, (t) => {
			const drain = 0.86;
			if (t < drain) {
				const p = t / drain;
				return 88 - 30 * (0.7 * p + (0.3 * Math.floor(p * 8)) / 8);
			}
			return 58 + 30 * ((t - drain) / (1 - drain));
		}),
		alarms: 1,
		domain: [0, 100],
	},
	{
		brand: { name: 'Civica Air', accent: '#c2703a', host: 'air.civica.org', icon: 'tabler:wind' },
		metricLabel: 'PM2.5',
		unit: ' µg/m³',
		decimals: 0,
		// A jittery base with three spikes per loop, staying under the 35 µg/m³ "good" threshold.
		series: loop(
			64,
			(t) =>
				12 +
				3 * Math.sin(TAU * 2 * t) +
				2.2 * Math.sin(TAU * 5 * t + 2) +
				1.5 * Math.sin(TAU * 11 * t + 0.7) +
				8 * Math.pow(Math.max(0, Math.sin(TAU * 3 * t + 0.9)), 8)
		),
		alarms: 0,
		domain: [0, 35],
	},
];

export const SOLUTION_RAIL = [
	{ icon: 'tabler:layout-dashboard', active: true },
	{ icon: 'tabler:bell-ringing' },
	{ icon: 'tabler:list' },
	{ icon: 'tabler:user' },
];
