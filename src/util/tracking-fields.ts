// Names of the hidden inputs a contact form posts its attribution in. Kept out of `attribution.ts`, which reads
// the page URL as it loads and so cannot be imported on the server (`TrackingFields.astro` renders from this list).

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

export const TRACKING_FIELDS = [...UTM_KEYS, 'client_id', 'fpr'] as const;
