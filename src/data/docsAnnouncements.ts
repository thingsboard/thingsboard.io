import {
	announcementSchema,
	isAnnouncementExpired,
	type Announcement,
	type AnnouncementInput,
} from '@models/announcement';
import { Products } from '@models/site.models';
import { SOURCE_AVAILABLE_FROM_VER } from '@data/versions';

/**
 * BUSL repositioning — the license change, and the grant that keeps existing
 * deployments free.
 *
 * Copy is owned by marketing, and this object is the only place to change it.
 *
 * `version` is the dismissal generation: bump it whenever the wording or the CTA
 * changes, or readers who dismissed the previous notice never see the new one.
 * v1 was "Community Edition deprecated" + a per-page link to the reader's
 * Professional twin; v2 is the grant messaging with one shared guide link.
 *
 * `id` deliberately keeps its v1 name: it is the localStorage dismissal key, not
 * a label, and one stable key is what lets `version` supersede a dismissal
 * instead of orphaning it.
 */
const sourceAvailable = {
	id: 'community-edition-deprecated',
	version: 3,
	variant: 'notice',
	title: `ThingsBoard ${SOURCE_AVAILABLE_FROM_VER} is source-available`,
	// Both destinations live in the message so the banner reads as one line: the
	// announcement for what changed, the programme for what to do about it. A
	// separate `cta` would push the link onto a line of its own.
	message:
		'Read the <a href="/blog/one-thingsboard-source-available/">announcement</a>, and keep what you run today free with the <a href="/community-grant-program/">Community Grant Program</a>.',
} satisfies AnnouncementInput;

/**
 * Products that carry the notice. Stated as an allow-list rather than derived
 * from `professionalCounterpart` minus exclusions, because which editions are
 * announced is a messaging decision, not a property of the product model —
 * three of the four community products are deliberately out:
 *
 *  - **Edge** — excluded on request; its deprecation messaging is being decided
 *    separately.
 *  - **Mobile** — the mobile app stays Apache 2.0, so a license-change notice
 *    would misstate its licensing status.
 *  - **TBMQ** — moving to a site of its own; out of scope for the BUSL work.
 *
 * Single-edition families (IoT Gateway, Trendz, License Server) have no
 * professional counterpart at all, so they could not be announced even if
 * listed: `routeData` still gates on a page having a twin (see the comment
 * there — the twin is now only a filter, no longer the CTA target).
 */
const ANNOUNCED: readonly Products[] = [Products.CE];

/**
 * Per-product announcements.
 *
 * Expiry is resolved once here rather than per page, so a build cannot straddle
 * the expiry instant and emit the banner on only some pages.
 */
const entry = announcementSchema.parse(sourceAvailable);

export const docsAnnouncements: Partial<Record<Products, Announcement>> = isAnnouncementExpired(
	entry
)
	? {}
	: Object.fromEntries(ANNOUNCED.map((product) => [product, entry]));
