/**
 * Data shape for `ProductComparisonTable.astro`: named groups of rows, each row
 * holding one cell per compared column. Cells are never empty — a "not included"
 * value is an explicit `no` cell that renders with screen-reader text.
 */

export type ComparisonCell =
	/** Plain text value, rendered as-is. */
	| { kind: 'text'; value: string }
	/** Not included — rendered as a dash with screen-reader text, never an empty cell. */
	| { kind: 'no' };

export interface ComparisonRow {
	label: string;
	/** One cell per column, in column order. */
	values: readonly ComparisonCell[];
}

export interface ComparisonColumn {
	name: string;
	/** Tabler icon shown before the name in the header row. */
	icon?: string;
}

export interface ComparisonGroup {
	/** Category heading rendered above the group's rows. Omit for a lead-in group that needs no heading. */
	label?: string;
	/** Tabler icon drawn white on a rounded tile of `color` before the heading. */
	mark?: { icon: string; color: string };
	rows: ComparisonRow[];
}

export const text = (value: string): ComparisonCell => ({ kind: 'text', value });
export const no = (): ComparisonCell => ({ kind: 'no' });
