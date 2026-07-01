// Below-hero marketing content for IoT Hub category pages, modeled as an ordered
// list of typed blocks (prose / bullets / table / steps) so each page can
// interleave them freely — e.g. a prose explainer sitting between two tables.
// Kept separate from IOT_HUB_CATEGORIES (that array stays structural/SEO).
// Data lives in `@data/iot-hub/sections`; rendered by `CategoryInfoSections`.

import type { FaqCategory, FaqItem } from '@data/pricing/types';

/** A "Label: description" pair — backs bullet lists and how-it-works steps. */
export interface LabeledItem {
	label: string;
	description?: string;
}

/** Heading (optional) + one or more paragraphs separated by a blank line. */
export interface ProseBlock {
	kind: 'prose';
	heading?: string;
	body: string;
}

/** "What Makes Unique" style — heading + optional intro + Label:description bullets. */
export interface BulletsBlock {
	kind: 'bullets';
	heading: string;
	intro?: string;
	items: LabeledItem[];
}

/** N-column reference table (rule anatomy, type/category taxonomies, …). */
export interface TableBlock {
	kind: 'table';
	heading: string;
	intro?: string;
	/** Column header labels. */
	columns: string[];
	/** Each row: cell strings, length === columns.length. First cell is the row header. */
	rows: string[][];
}

/** "How It Works" — heading + optional intro + steps + optional "Learn More" link. */
export interface StepsBlock {
	kind: 'steps';
	heading: string;
	intro?: string;
	steps: LabeledItem[];
	/** href omitted when the target is still a TODO. */
	cta?: { label: string; href?: string };
}

export type InfoBlock = ProseBlock | BulletsBlock | TableBlock | StepsBlock;

// Aliased to the shared Pricing FAQ types (consumed by `FaqSection`) so any
// drift in the source shape surfaces as a compile error here, not at runtime.
/** One FAQ Q&A. `answer` is an HTML string (rendered via set:html). */
export type FaqQa = FaqItem;

export type FaqGroup = FaqCategory;

export interface IotHubCategorySections {
	/** Ordered below-hero content blocks, rendered top-to-bottom. */
	info?: InfoBlock[];
	faq?: FaqGroup[];
}
