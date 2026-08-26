/** Column descriptor for `DataTable.astro`. */
export interface DataTableColumn {
	/** Header text. `\n` becomes a `<br />`. Pass `''` for a header with no visible text. */
	label: string;
	/** Visually-hidden header text used when `label` is `''`. */
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
	/** Inline declarations on the `<th scope="col">`, e.g. per-column custom properties. */
	thStyle?: string;
}
