// schema.org FAQPage builder shared by every FaqSection consumer.

import type { FaqCategory } from '@data/pricing/types';

// Answers are HTML strings; the schema wants plain text. Entities are decoded
// because `<script>` raw text is never entity-decoded by the browser — a
// literal `&rarr;` would otherwise surface verbatim in search results.
const ENTITIES: Record<string, string> = {
	'&amp;': '&',
	'&lt;': '<',
	'&gt;': '>',
	'&quot;': '"',
	'&#39;': "'",
	'&nbsp;': ' ',
	'&rarr;': '→',
};

function toPlainText(html: string): string {
	return html
		// Tags become spaces, not nothing — '</p><p>' must not fuse adjacent
		// words; the whitespace collapse below normalizes the spacing.
		.replace(/<[^>]+>/g, ' ')
		.replace(/&[a-z0-9#]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? entity)
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
