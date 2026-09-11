// schema.org FAQPage builder shared by every FaqSection consumer.

import type { FaqCategory } from '@data/pricing/types';

// Answers are HTML strings; the schema wants plain text. Entities are decoded
// because `<script>` raw text is never entity-decoded by the browser — a
// literal `&rarr;` would otherwise surface verbatim in search results.
// Named entities beyond HTML's five predefined ones have no algorithmic
// mapping, so the common ones authors reach for are listed here; anything else
// is flagged at build time (see `decodeEntity`) rather than passed through.
const NAMED_ENTITIES: Record<string, string> = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&apos;': "'",
	'&nbsp;': ' ',
	'&rarr;': '→',
	'&larr;': '←',
	'&mdash;': '—',
	'&ndash;': '–',
	'&hellip;': '…',
	'&trade;': '™',
	'&copy;': '©',
	'&reg;': '®',
	'&times;': '×',
	'&deg;': '°',
};

function fromCodePoint(cp: number): string | null {
	// Reject NaN and out-of-range values that would make String.fromCodePoint
	// throw; surrogate halves (0xD800–0xDFFF) are technically invalid too but
	// harmless as a lone char, so we don't special-case them.
	return Number.isInteger(cp) && cp >= 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : null;
}

// Decode a single HTML entity to its character. Numeric entities decode
// generically; named entities use the allowlist above. Unknown entities are
// left verbatim AND logged, turning a silent structured-data bug into a
// visible build warning.
function decodeEntity(entity: string): string {
	const lower = entity.toLowerCase();

	// Numeric: &#8594; (decimal) or &#x2192; (hex).
	const numeric = /^&#(x)?([0-9a-f]+);$/i.exec(entity);
	if (numeric) {
		const cp = parseInt(numeric[2], numeric[1] ? 16 : 10);
		const char = fromCodePoint(cp);
		if (char !== null) return char;
	} else if (lower in NAMED_ENTITIES) {
		return NAMED_ENTITIES[lower];
	}

	console.warn(
		`[faq-schema] Unrecognized HTML entity "${entity}" in a FAQ answer — it will appear verbatim in the FAQPage structured data. Add it to NAMED_ENTITIES in src/util/faq-schema.ts.`
	);
	return entity;
}

function toPlainText(html: string): string {
	return html
		// Tags become spaces, not nothing — '</p><p>' must not fuse adjacent
		// words; the whitespace collapse below normalizes the spacing.
		.replace(/<[^>]+>/g, ' ')
		.replace(/&#?[a-z0-9]+;/gi, decodeEntity)
		.replace(/\s+/g, ' ')
		.trim();
}

export function buildFaqPageSchema(categories: FaqCategory[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: categories.flatMap((cat) =>
			cat.items.map((item) => ({
				'@type': 'Question',
				name: item.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: toPlainText(item.answer),
				},
			}))
		),
	};
}

// `<` is escaped so hand-edited answer content can never terminate the
// surrounding `<script type="application/ld+json">` element.
export function serializeJsonLd(schema: unknown): string {
	return JSON.stringify(schema).replace(/</g, '\\u003c');
}
