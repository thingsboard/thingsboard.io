/**
 * ThingsBoard product version constants.
 * Import these in MDX or Astro files to reference Docker image tags,
 * download links, and other version-dependent content.
 *
 * Update this file when a new release is published.
 */

/** Community Edition */
export const CE_FULL_VER = '4.3.1.6';

/**
 * First release line that ships under the source-available license, as stated in
 * the notice on community docs (`@data/docsAnnouncements`).
 * A policy boundary, not a release pointer — it does not move with each release.
 */
export const SOURCE_AVAILABLE_FROM_VER = '4.4';

/** Day the relicensing is announced — the date every Community Grant is measured against. */
export const SOURCE_AVAILABLE_ANNOUNCEMENT_DATE = '2026-09-29';

/**
 * Client library version (Maven `rest-client`, PyPI `tb-rest-client` / `tb-*-client`) on the
 * reference pages, which CE, PE and Edge share. Follows CE until 4.4 client libraries are released.
 */
export const TB_VER = CE_FULL_VER;

/**
 * Drops the GA `.0` from artifact filenames and git tags (`4.4.0` → `4.4`).
 * Patches (`X.Y.Z`, Z>0) and GA hotfixes (`X.Y.0.P`) are returned unchanged.
 * NOT for Docker/Maven versions — those keep the full `X.Y.0`.
 */
const artifactVersion = (v: string): string => (/^\d+\.\d+\.0$/.test(v) ? v.slice(0, -2) : v);

/**
 * CE package filename / download-tag version — {@link CE_FULL_VER} with the GA
 * `.0` dropped. For `thingsboard-${CE_PKG_VER}.deb` / `.rpm` and
 * `releases/download/v${CE_PKG_VER}/…`.
 */
export const CE_PKG_VER = artifactVersion(CE_FULL_VER);

/**
 * Community Edition release branch (X.Y format) — only for repos branched per
 * minor release: `thingsboard`, `rule-node-examples`. For k8s repos use
 * `k8sCloneCmd` from `~/util/install-commands`.
 */
export const CE_BRANCH = 'release-4.3';

/**
 * Current ThingsBoard release shown on the Professional Edition docs — the Docker
 * image tag for `thingsboard/tb-*:${PE_FULL_VER}`. From 4.4 images carry neutral
 * names and plain version tags (no `tb-pe-` prefix, no `PE` suffix). Historical
 * upgrade steps below 4.4 build the old names themselves.
 */
export const PE_FULL_VER = '4.4.0';

/**
 * Package filename and GitHub release-tag version — {@link PE_FULL_VER} with the
 * GA `.0` dropped. For `thingsboard-${PE_PKG_VER}.deb` / `.rpm`,
 * `tb-web-report-${PE_PKG_VER}.deb`, `thingsboard-windows-${PE_PKG_VER}.zip`, etc.
 * Always download them from {@link PE_RELEASE_URL}.
 */
export const PE_PKG_VER = artifactVersion(PE_FULL_VER);

/** GitHub Releases base for current PE packages. 4.3.x and older stay on dist.thingsboard.io. */
export const PE_RELEASE_URL = `https://github.com/thingsboard/thingsboard/releases/download/v${PE_PKG_VER}`;

/**
 * Professional Edition release branch of `thingsboard/thingsboard` (X.Y format). PE source
 * is published there from {@link SOURCE_AVAILABLE_FROM_VER}, while CE stays on
 * {@link CE_BRANCH}, so PE build instructions must not reuse the CE branch.
 */
export const PE_BRANCH = 'release-4.4';

/** Trendz Analytics */
export const TRENDZ_VER = '1.15.2.1';

/** Remote Agent — Docker image tag for `thingsboard/tb-remote-agent:${AGENT_VER}`. */
export const AGENT_VER = '1.0.0';

/** Edge */
export const EDGE_VER = '4.3.1.1';

/**
 * Edge package filename / download-tag version — {@link EDGE_VER} with the GA
 * `.0` dropped. For `tb-edge-${EDGE_PKG_VER}.deb` / `.rpm` and
 * `thingsboard-edge/releases/download/v${EDGE_PKG_VER}/…`.
 */
export const EDGE_PKG_VER = artifactVersion(EDGE_VER);

/** Edge release branch (for git clone, X.Y format) */
export const EDGE_BRANCH = 'release-4.3';

/**
 * Edge Professional Edition — Docker image tag (Docker Hub).
 *
 * Use only for `docker pull thingsboard/tb-edge-pe:${EDGE_PE_VER}`. Docker
 * Hub publishes Edge PE tags with the `EDGEPE` suffix. For package filenames
 * on dist.thingsboard.io, use {@link EDGE_PE_PKG_VER}.
 */
export const EDGE_PE_VER = '4.3.1.1EDGEPE';

/**
 * Edge PE package filename version (dist.thingsboard.io) — {@link EDGE_PKG_VER}
 * plus the lowercase `pe` suffix. For `tb-edge-${EDGE_PE_PKG_VER}.deb` / `.rpm`,
 * `tb-edge-windows-${EDGE_PE_PKG_VER}.zip`. NOT `EDGE_PE_VER.toLowerCase()` —
 * dist drops the `EDGE` prefix and shares the Community Edge version.
 */
export const EDGE_PE_PKG_VER = `${EDGE_PKG_VER}pe`;

/** Edge PE release branch (for git clone, X.Y.Z format) */
export const EDGE_PE_BRANCH = 'release-4.3.0';

/**
 * Dart ThingsBoard API Client — pub.dev version of each edition's package
 * (`thingsboard_ce_client`, `thingsboard_pe_client`, `thingsboard_paas_client`).
 * Each package tracks the server version it is generated from, independently of
 * {@link CE_FULL_VER} and {@link PE_FULL_VER}.
 */
export const DART_CLIENT_VER = {
	ce: '4.3.0',
	pe: '4.4.0',
	paas: '4.4.0',
} as const;
