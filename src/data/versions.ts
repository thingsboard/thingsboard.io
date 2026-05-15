/**
 * ThingsBoard product version constants.
 * Import these in MDX or Astro files to reference Docker image tags,
 * download links, and other version-dependent content.
 *
 * Update this file when a new release is published.
 */

/** Community Edition */
export const CE_FULL_VER = '4.3.1.1';

/** Community Edition release branch (for git clone) */
export const CE_BRANCH = 'release-4.3';

/**
 * Professional Edition — Docker image tag (Docker Hub).
 *
 * Use only for `docker pull thingsboard/tb-pe-*:${PE_FULL_VER}` and similar
 * Docker contexts. Docker Hub publishes PE tags with uppercase `PE` suffix.
 * For package filenames (.deb/.rpm/.zip/.exe on dist.thingsboard.io), use
 * {@link PE_PKG_VER} — the dist host serves PE packages with lowercase `pe`.
 */
export const PE_FULL_VER = '4.3.1.1PE';

/**
 * Professional Edition — package filename suffix (dist.thingsboard.io).
 *
 * Derived from {@link PE_FULL_VER} via `.toLowerCase()` so a single source
 * of truth bumps both Docker tags and package URLs on release. Used for
 * `thingsboard-${PE_PKG_VER}.deb`, `.rpm`, `tb-web-report-${PE_PKG_VER}.deb`,
 * `thingsboard-windows-${PE_PKG_VER}.zip`, and any other dist asset URL —
 * the dist host serves PE packages with lowercase `pe`.
 */
export const PE_PKG_VER = PE_FULL_VER.toLowerCase();

/** Trendz Analytics */
export const TRENDZ_VER = '1.15.2';

/** Edge */
export const EDGE_VER = '4.3.1.1';

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
 * Edge Professional Edition — package filename suffix (dist.thingsboard.io).
 *
 * Derived from {@link EDGE_VER} + lowercase `pe` so it follows a single
 * source of truth on release. Used for `tb-edge-${EDGE_PE_PKG_VER}.deb`,
 * `.rpm`, `tb-edge-windows-${EDGE_PE_PKG_VER}.zip`. Note this is NOT
 * `EDGE_PE_VER.toLowerCase()` — dist drops the `EDGE` prefix entirely
 * and the version is the same as Community Edge for the same release.
 */
export const EDGE_PE_PKG_VER = `${EDGE_VER}pe`;

/** Edge PE release branch (for git clone, X.Y.Z format) */
export const EDGE_PE_BRANCH = 'release-4.3.0';

/** TBMQ Broker */
export const TBMQ_VER = '2.3.0';

/** TBMQ Broker Professional Edition */
export const TBMQ_PE_VER = '2.3.0PE';

/** TBMQ Broker release branch (for installation scripts) */
export const TBMQ_BRANCH = 'release-2.3.0';
