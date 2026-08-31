/** Column descriptor for `DataTable.astro`. */
export interface DataTableColumn {
	/** Header text. `\n` becomes a `<br />`. Omit for the row-header column — the
	 *  cell then carries visually hidden text (`srLabel`) instead. */
	label?: string;
	/** Visually-hidden header text used when `label` is absent. Defaults to `'Feature'`. */
	srLabel?: string;
	/**
	 * Width for the matching `<col>`, emitted inline. Inline is the only form that
	 * survives a scoped-style hash change, so prefer it over CSS where the width is
	 * static. Use `colClass` instead when the width varies by breakpoint — a `calc()`
	 * containing a percentage is silently dropped on `<col>`.
	 */
	width?: string;
	/** Class on the `<col>`, for callers that key widths or column paint off it. */
	colClass?: string;
	/** Class on the `<th scope="col">`, e.g. to neutralise an inherited `thead th` rule. */
	thClass?: string;
	/** Inline declarations on the `<th scope="col">` — an object for per-column
	 *  custom properties (diffable per property, no hand-glued semicolons). */
	thStyle?: string | Record<string, string | number>;
}
