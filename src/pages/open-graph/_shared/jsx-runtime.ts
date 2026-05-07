// src/pages/open-graph/_shared/jsx-runtime.ts
//
// Minimal JSX runtime targeting Satori's input shape.
// Satori reads { type, props: { children, ...rest } } where `type` is a
// lowercase tag string ('div', 'span', etc.) or a function component.
// We never run this in a DOM — it's a build-time JSON tree producer.

export type SatoriNode =
	| string
	| number
	| { type: string | ((props: Record<string, unknown>) => SatoriNode); props: Record<string, unknown> }
	| SatoriNode[]
	| null
	| undefined
	| boolean;

export const Fragment = Symbol.for('og.fragment');

export function jsx(
	type: string | ((props: Record<string, unknown>) => SatoriNode),
	props: Record<string, unknown>
): SatoriNode {
	return { type, props: props ?? {} };
}

export const jsxs = jsx;

declare global {
	// JSX type augmentation must use `namespace` — TypeScript has no module-syntax
	// equivalent for declaring `JSX.IntrinsicElements` globally.
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			[k: string]: Record<string, unknown>;
		}
	}
}

