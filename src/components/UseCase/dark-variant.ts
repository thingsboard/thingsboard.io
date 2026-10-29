// Dark twins of the vector art on the use-case pages (application icons, SCADA
// key-function symbols, solution schemes): the `-dark.svg` next to the light file.
//
// Every such asset has a twin, or is listed in SAME_IN_DARK. A missing twin fails the
// build by file name, because a missing file looks exactly like a forgotten export.
// Rasters (dashboard captures) and the docs galleries are not covered.

/** Dark twins of the use-case icons and symbols. Keys only; the loaders stay lazy. */
export const USECASE_DARK_SVGS = import.meta.glob('/src/assets/images/usecases/**/*-dark.svg', {
	query: '?url',
	import: 'default',
});

/** Light assets that read the same in dark and need no twin. */
const SAME_IN_DARK = new Set<string>([]);

/** The twin to render for `src`. An asset in SAME_IN_DARK gets its own path, so callers stay unconditional. */
export function darkTwinOf(src: string, available: Record<string, unknown> = USECASE_DARK_SVGS): string {
	if (SAME_IN_DARK.has(src)) return src;
	if (!src.endsWith('.svg')) {
		throw new Error(
			`[use-cases] ${src} is not an SVG, so it has no dark twin — list it in SAME_IN_DARK to render it as is`
		);
	}
	const twin = `${src.slice(0, -'.svg'.length)}-dark.svg`;
	if (!(twin in available)) {
		throw new Error(`[use-cases] no dark variant for ${src} — add ${twin}`);
	}
	return twin;
}
