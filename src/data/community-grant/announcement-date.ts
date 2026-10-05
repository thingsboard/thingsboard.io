import { SOURCE_AVAILABLE_ANNOUNCEMENT_DATE } from '@data/versions';

/** An ISO day as an inline `<time>`, for FAQ answers and page bodies that are HTML strings. */
const dateHtml = (iso: string) => {
	const formatted = new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	});
	return `<time datetime="${iso}">${formatted}</time>`;
};

/** The announcement day, which is also the first source-available release's. */
export const announcementDateHtml = dateHtml(SOURCE_AVAILABLE_ANNOUNCEMENT_DATE);

/** Four years on, when that release converts to Apache 2.0 under the LICENSE's change-date rule. */
export const apacheConversionDateHtml = dateHtml(
	SOURCE_AVAILABLE_ANNOUNCEMENT_DATE.replace(/^\d{4}/, (year) => String(Number(year) + 4))
);
