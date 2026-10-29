/** The accent schemes `ui-kit.scss` defines for `data-accent`; keep the two in sync. */
const SCHEMES = ['brand', 'onprem', 'neutral'] as const;
export type Scheme = (typeof SCHEMES)[number];

/** A scheme by name, or any CSS colour. */
export type Accent = Scheme | (string & {});

export const isScheme = (accent: string): accent is Scheme => (SCHEMES as readonly string[]).includes(accent);
