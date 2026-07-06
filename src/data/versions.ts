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
 * Artifact/package version for dist filenames and the CE GitHub release tag.
 *
 * A GA release (exactly `X.Y.0`) drops the trailing `.0` in artifact filenames,
 * the CE git tag, and the PE package label (e.g. `4.4.0` → `4.4`, tag `v4.4`,
 * `4.4pe`). Patches (`X.Y.Z`, Z > 0) and GA hotfixes (`X.Y.0.P`) keep the full
 * version everywhere, so this equals the input for them. Docker image tags and
 * the pom/Maven version ({@link CE_FULL_VER} / {@link PE_FULL_VER} /
 * {@link TB_VER}) always keep the full `X.Y.0` — do NOT use this for those.
 */
const artifactVersion = (v: string): string => (/^\d+\.\d+\.0$/.test(v) ? v.slice(0, -2) : v);

/**
 * Community Edition — package filename / download-tag version.
 *
 * Derived from {@link CE_FULL_VER} so a single source of truth bumps both Docker
 * tags and package URLs on release, dropping the trailing `.0` for a GA (see
 * {@link artifactVersion}). Used for `thingsboard-${CE_PKG_VER}.deb` / `.rpm`
 * and `releases/download/v${CE_PKG_VER}/…`.
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
 * Professional Edition — package filename suffix (dist.thingsboard.io).
 *
 * Derived from {@link CE_FULL_VER} so a single source of truth bumps both
 * Docker tags and package URLs on release, dropping the trailing `.0` for a GA
 * (see {@link artifactVersion}) and appending the lowercase `pe` suffix the
 * dist host serves PE packages with. Used for `thingsboard-${PE_PKG_VER}.deb`,
 * `.rpm`, `tb-web-report-${PE_PKG_VER}.deb`, `thingsboard-windows-${PE_PKG_VER}.zip`,
 * and any other dist asset URL. (For a patch this equals `PE_FULL_VER.toLowerCase()`.)
 */
export const PE_PKG_VER = `${artifactVersion(CE_FULL_VER)}pe`;

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
