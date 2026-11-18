import { CLOUD_REGIONS, cloudRegionHref } from '@util/cloud-regions';
import { externalLinkAttrs } from '@util/external-links';

/**
 * Cloud sign-up links. `data-cloud-auth` opens the region dialog; the href is the no-JS fallback.
 *
 * `attrs` returns a new object on every read: Astro writes a component's scoped class into the object
 * it spreads, so one shared object would gain another class on every page built.
 */
export const CLOUD_SIGNUP = {
	href: '/installations/choose-region/',
	get attrs(): Record<string, string> {
		return { 'data-cloud-auth': 'signup' };
	},
};

// Without JavaScript, "Sign in" falls back to the first region's login page, in a new tab.
const signinHref = cloudRegionHref(CLOUD_REGIONS[0], 'signin');
export const CLOUD_SIGNIN = {
	href: signinHref,
	get attrs(): Record<string, string> {
		return { ...externalLinkAttrs(signinHref), 'data-cloud-auth': 'signin' };
	},
};
