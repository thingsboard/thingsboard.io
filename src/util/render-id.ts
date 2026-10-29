/**
 * A unique id per page render for components that scope keyframes, gradients or ARIA references. Counted per page,
 * so a page gets the same ids whatever else the build rendered before it.
 */
export function renderId(locals: App.Locals, prefix: string): string {
	const counts = (locals.renderIdCounts ??= {});
	const count = (counts[prefix] ?? 0) + 1;
	counts[prefix] = count;
	return `${prefix}-${count.toString(36)}`;
}
