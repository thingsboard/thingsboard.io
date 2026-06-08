import { CE_FULL_VER } from '~/data/versions';

/**
 * `git clone && cd` snippet for the `thingsboard-{ce|pe}-k8s` repos.
 * These repos are branched per full version (`release-4.3.1.2`), not per
 * minor release — never clone them with `CE_BRANCH`.
 */
export const k8sCloneCmd = (repo: 'ce' | 'pe', dir: string) =>
	`git clone -b release-${CE_FULL_VER} https://github.com/thingsboard/thingsboard-${repo}-k8s.git --depth 1
cd thingsboard-${repo}-k8s/${dir}`;
