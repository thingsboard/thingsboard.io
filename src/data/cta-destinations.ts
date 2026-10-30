import { CLOUD_REGIONS, cloudRegionHref } from '@util/cloud-regions';
import { externalLinkAttrs } from '@util/external-links';

/**
 * Cloud sign-up links ("Try for free", "Start for free"). They open the region dialog
 * (`data-cloud-auth`); the href is only the fallback without JavaScript. It goes to the region page,
 * not a sign-up form, so the visitor still picks a region.
 */
export const CLOUD_SIGNUP = {
	href: '/installations/choose-region/',
	attrs: { 'data-cloud-auth': 'signup' } as Record<string, string>,
};

// Without JavaScript, "Sign in" falls back to the first region's login page, in a new tab.
const signinHref = cloudRegionHref(CLOUD_REGIONS[0], 'signin');
export const CLOUD_SIGNIN = {
	href: signinHref,
	attrs: { ...externalLinkAttrs(signinHref), 'data-cloud-auth': 'signin' } as Record<string, string>,
};
