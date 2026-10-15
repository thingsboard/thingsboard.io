/**
 * A unique id per render for components that scope their own keyframes or CSS by attribute. A counter,
 * not `Math.random()`, so builds are deterministic.
 */
let count = 0;

export function renderId(prefix: string): string {
	count += 1;
	return `${prefix}-${count.toString(36)}`;
}
