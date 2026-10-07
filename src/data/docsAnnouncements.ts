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
 * two of the four community products are deliberately out:
 *
 *  - **Edge** — announced: Community Edge stops at 4.3.x like Community Edition.
 *  - **Mobile** — the mobile app stays Apache 2.0, so a license-change notice
 *    would misstate its licensing status.
 *  - **TBMQ** — moving to a site of its own; out of scope for the BUSL work.
 *
 * Single-edition families (IoT Gateway, Trendz, License Server) have no
 * professional counterpart at all, so they could not be announced even if
 * listed: `routeData` still gates on a page having a twin (see the comment
 * there — the twin is now only a filter, no longer the CTA target).
 */
const ANNOUNCED: readonly Products[] = [Products.CE, Products.EDGE];

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

/**
 * Remote Agent on every Edge installation and upgrade page, both editions. Keyed by
 * path rather than product: it is about how Edge is installed, not about the edition.
 * The agent page itself is excluded, and Community Edge pages link to the
 * Professional Edition agent page because Community Edge has no agent install flow.
 */
const edgeRemoteAgent = announcementSchema.parse({
	id: 'edge-remote-agent',
	version: 2,
	variant: 'info',
	title: 'Skip the manual setup with Remote Agent',
	message:
		'Instead of running these commands on every host, install Remote Agent once and manage Edge from the ThingsBoard UI, either for a single Edge or your whole fleet: one-click install, safe upgrades with automatic backups and rollback, live container metrics and logs. <a href="/docs/edge/pe/installation/agent/">Install Edge with Remote Agent</a>.',
} satisfies AnnouncementInput);

/** Upgrade pages get the upgrade-specific wording; shares the id so one dismissal covers both. */
const edgeRemoteAgentUpgrade = announcementSchema.parse({
	id: 'edge-remote-agent',
	version: 2,
	variant: 'info',
	title: 'Upgrade Edge from the ThingsBoard UI',
	message:
		'With Remote Agent, you skip these manual steps on every host: push a new Edge version to a single Edge or your whole fleet, and the agent backs up volumes, migrates the database and rolls back automatically if something fails. <a href="/docs/edge/pe/installation/agent/#upgrade-edge-remotely">Upgrade Edge remotely</a>.',
} satisfies AnnouncementInput);

// Edge PE only: Community Edge pages carry the source-available notice instead.
const EDGE_INSTALL_PREFIXES = ['docs/edge/pe/installation'];
const EDGE_AGENT_PAGE = 'docs/edge/pe/installation/agent';

/** Announcement for a docs page by its route id, ahead of the per-product ones; undefined when none applies. */
export function docsPathAnnouncement(id: string): Announcement | undefined {
	const route = id.replace(/\/$/, '');
	if (route === EDGE_AGENT_PAGE || isAnnouncementExpired(edgeRemoteAgent)) return undefined;
	const prefix = EDGE_INSTALL_PREFIXES.find((p) => route === p || route.startsWith(`${p}/`));
	if (!prefix) return undefined;
	return route.startsWith(`${prefix}/upgrade-instructions`) ? edgeRemoteAgentUpgrade : edgeRemoteAgent;
}
