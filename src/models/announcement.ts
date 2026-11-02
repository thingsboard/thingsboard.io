import { z } from 'astro/zod';

/**
 * Route-level docs announcement, rendered by
 * `@components/starlight/Banner.astro`. Authored either per product in
 * `@data/docsAnnouncements` or per page via `announcement:` frontmatter, which
 * wins over the per-product entry.
 */
export const announcementSchema = z.object({
	/** Dismissal key. Announcements sharing a message should share an id. */
	id: z.string(),
	/** Bump to re-surface a reworded announcement for readers who dismissed it. */
	version: z.number().int().positive().default(1),
	/** `info` and `notice` (amber) break nothing; `warning` and `danger` escalate from there. */
	variant: z.enum(['info', 'notice', 'warning', 'danger']).default('warning'),
	/** Bold heading rendered above the message. */
	title: z.string().optional(),
	/** Rendered as HTML: inline markup works, Markdown does not. */
	message: z.string(),
	/**
	 * Optional call to action. Set it on the entry itself: nothing fills it in
	 * downstream, so an entry that leaves it unset renders with no button at all.
	 */
	cta: z
		.object({
			text: z.string(),
			href: z.string(),
		})
		.optional(),
	/**
	 * Drop the announcement once this instant has passed. Evaluated at **build
	 * time**, so a passed date only takes effect on the next deploy. `coerce`
	 * accepts both frontmatter spellings: a quoted ISO string and an unquoted
	 * YAML timestamp (which the parser hands over as a `Date`).
	 */
	expiresAt: z.coerce.date().optional(),
	dismissible: z.boolean().default(true),
});

/** Authoring shape — schema defaults not yet applied. */
export type AnnouncementInput = z.input<typeof announcementSchema>;

/** Rendered shape — schema defaults applied. */
export type Announcement = z.output<typeof announcementSchema>;

/**
 * Single source of truth for expiry. `now` is injected so a caller can pin one
 * instant for a whole build and avoid emitting the banner on only some pages.
 */
export function isAnnouncementExpired(
	announcement: Pick<Announcement, 'expiresAt'>,
	now: number = Date.now()
): boolean {
	return announcement.expiresAt ? announcement.expiresAt.getTime() < now : false;
}
