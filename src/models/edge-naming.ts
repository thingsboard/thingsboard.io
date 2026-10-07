/**
 * ThingsBoard Edge artifact names. Edge PE releases before EDGE_NEUTRAL_NAMES_FROM_VER
 * are published under PE names; from it on, Edge PE uses the same names as Community
 * Edge. Every Edge install and upgrade page builds its names here, so the switch is a
 * version comparison rather than a hardcoded `-pe` / `PE` in each page.
 */

// Relative imports on purpose: `edge-upgrade-instructions.ts` imports this module and
// is pulled into the Astro config chain, which loads before tsconfig path aliases apply.
import { EDGE_NEUTRAL_NAMES_FROM_VER, EDGE_PE_BRANCH, EDGE_PE_FULL_VER, EDGE_VER, artifactVersion } from '../data/versions.ts';
import { versionAtLeast } from './upgrade-shared.ts';

/**
 * True for Edge PE releases published under PE names: `thingsboard/tb-edge-pe` images
 * tagged `<ver>EDGEPE`, `tb-edge-<ver>pe` packages on dist.thingsboard.io, the
 * `thingsboard-edge-pe-docker-compose` setup and the "Edge PE" product name. Accepts
 * family labels such as `4.3.1.x`.
 */
function isLegacyEdgePe(isPE: boolean, version: string): boolean {
	return isPE && !versionAtLeast(version.replace(/\.x$/, ''), EDGE_NEUTRAL_NAMES_FROM_VER);
}

/** Product name for headings and version labels: "Edge PE" for legacy PE releases, else "Edge". */
export function edgeProductName(isPE: boolean, version: string): string {
	return isLegacyEdgePe(isPE, version) ? 'Edge PE' : 'Edge';
}

/** Version label with the legacy " PE" marker, e.g. "4.3.1.1 PE" or "4.4.0.1". */
export function edgeVersionLabel(isPE: boolean, version: string): string {
	return isLegacyEdgePe(isPE, version) ? `${version} PE` : version;
}

/** Docker image without tag, e.g. "thingsboard/tb-edge-pe" or "thingsboard/tb-edge". */
export function edgeDockerImage(isPE: boolean, version: string): string {
	return isLegacyEdgePe(isPE, version) ? 'thingsboard/tb-edge-pe' : 'thingsboard/tb-edge';
}

/** Docker image tag, e.g. "4.3.1.1EDGEPE" or "4.4.0.1EDGE". */
export function edgeDockerTag(isPE: boolean, version: string): string {
	return isLegacyEdgePe(isPE, version) ? `${version}EDGEPE` : `${version}EDGE`;
}

/**
 * Linux package or Windows ZIP filename. `pkgVersion` is the package version: the
 * release version with the GA `.0` dropped (`4.2.0` → `4.2`).
 */
export function edgePkgFile(isPE: boolean, version: string, pkgVersion: string, ext: 'deb' | 'rpm' | 'zip'): string {
	const name = ext === 'zip' ? 'tb-edge-windows' : 'tb-edge';
	return `${name}-${pkgVersion}${isLegacyEdgePe(isPE, version) ? 'pe' : ''}.${ext}`;
}

/**
 * Download URL of a Linux package or Windows ZIP: dist.thingsboard.io for legacy PE
 * releases, the `thingsboard-edge` GitHub release `v<tag>` otherwise. `tag` defaults to
 * the package version.
 */
export function edgePkgUrl(
	isPE: boolean,
	version: string,
	pkgVersion: string,
	ext: 'deb' | 'rpm' | 'zip',
	tag: string = pkgVersion,
): string {
	const file = edgePkgFile(isPE, version, pkgVersion, ext);
	return isLegacyEdgePe(isPE, version)
		? `https://dist.thingsboard.io/${file}`
		: `https://github.com/thingsboard/thingsboard-edge/releases/download/v${tag}/${file}`;
}

/** Full image reference of the current Community Edge release, e.g. "thingsboard/tb-edge:4.3.1.1EDGE". */
export const EDGE_IMAGE = `${edgeDockerImage(false, EDGE_VER)}:${edgeDockerTag(false, EDGE_VER)}`;

/** Current Edge PE release — install-page values, all derived from {@link EDGE_PE_FULL_VER}. */
const isLegacyCurrent = isLegacyEdgePe(true, EDGE_PE_FULL_VER);

/** Docker image tag of the current Edge PE release, e.g. "4.3.1.1EDGEPE". */
const EDGE_PE_VER = edgeDockerTag(true, EDGE_PE_FULL_VER);

/** Full image reference of the current Edge PE release, e.g. "thingsboard/tb-edge-pe:4.3.1.1EDGEPE". */
export const EDGE_PE_IMAGE = `${edgeDockerImage(true, EDGE_PE_FULL_VER)}:${EDGE_PE_VER}`;

/** Package version of the current Edge PE release (GA `.0` dropped). */
const EDGE_PE_PKG_VER = artifactVersion(EDGE_PE_FULL_VER);

/** Package download URL of the current Edge PE release. */
export function edgePePkgUrl(ext: 'deb' | 'rpm' | 'zip'): string {
	return edgePkgUrl(true, EDGE_PE_FULL_VER, EDGE_PE_PKG_VER, ext);
}

/** Package filename of the current Edge PE release. */
export function edgePePkgFile(ext: 'deb' | 'rpm' | 'zip'): string {
	return edgePkgFile(true, EDGE_PE_FULL_VER, EDGE_PE_PKG_VER, ext);
}

/** `TB_EDGE_NODE_DOCKER_NAME` in the Docker Compose `.env` of the current Edge PE release. */
export const EDGE_PE_COMPOSE_NODE_NAME = isLegacyCurrent ? 'tb-edge-pe-node' : 'tb-edge-node';

/** Commands that clone the Docker Compose setup of the current Edge PE release and enter it. */
export const EDGE_PE_COMPOSE_CLONE = isLegacyCurrent
	? `git clone -b ${EDGE_PE_BRANCH} https://github.com/thingsboard/thingsboard-edge-pe-docker-compose.git tb-edge-pe-docker-compose --depth 1\ncd tb-edge-pe-docker-compose`
	: `git clone -b ${EDGE_PE_BRANCH} https://github.com/thingsboard/thingsboard-edge.git --depth 1\ncd thingsboard-edge/docker-edge`;
