/**
 * ThingsBoard product version constants.
 * Import these in MDX or Astro files to reference Docker image tags,
 * download links, and other version-dependent content.
 *
 * Update this file when a new release is published.
 */

/** Community Edition */
export const CE_FULL_VER = '4.3.1.3';

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
 * Professional Edition — Docker image tag (Docker Hub).
 *
 * Use only for `docker pull thingsboard/tb-pe-*:${PE_FULL_VER}` and similar
 * Docker contexts. Docker Hub publishes PE tags with uppercase `PE` suffix.
 * For package filenames (.deb/.rpm/.zip/.exe on dist.thingsboard.io), use
 * {@link PE_PKG_VER} — the dist host serves PE packages with lowercase `pe`.
 */
export const PE_FULL_VER = '4.3.1.3PE';

/**
 * PE package filename version (dist.thingsboard.io) — {@link CE_PKG_VER} plus
 * the lowercase `pe` suffix the dist host uses. For `thingsboard-${PE_PKG_VER}.deb`
 * / `.rpm`, `tb-web-report-${PE_PKG_VER}.deb`, `thingsboard-windows-${PE_PKG_VER}.zip`,
 * etc. (For a patch this equals `PE_FULL_VER.toLowerCase()`.)
 */
export const PE_PKG_VER = `${CE_PKG_VER}pe`;

/** Trendz Analytics */
export const TRENDZ_VER = '1.15.2';

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

/** TBMQ Broker */
export const TBMQ_VER = '2.3.0';

/** TBMQ Broker Professional Edition */
export const TBMQ_PE_VER = '2.3.0PE';

/** TBMQ Broker release branch (for installation scripts) */
export const TBMQ_BRANCH = 'release-2.3.0';
