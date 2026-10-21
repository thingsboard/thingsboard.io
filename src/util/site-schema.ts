// schema.org Organization + WebSite for the homepage. The `#organization` id must match the
// publisher reference in `src/pages/blog/[...slug].astro`.

import { SITE_NAME } from '@root/consts';
import { socialNetworks } from '@data/socialNetworks';

export function getSiteSchema(site: URL) {
	const home = new URL('/', site).href;
	const organizationId = `${home}#organization`;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': organizationId,
				name: SITE_NAME,
				legalName: 'ThingsBoard, Inc.',
				url: home,
				logo: { '@type': 'ImageObject', url: new URL('/images/thingsboard_logo_blue.svg', site).href },
				sameAs: socialNetworks.filter(({ profile }) => profile).map(({ href }) => href),
			},
			{
				'@type': 'WebSite',
				'@id': `${home}#website`,
				url: home,
				name: SITE_NAME,
				inLanguage: 'en-US',
				publisher: { '@id': organizationId },
			},
		],
	};
}
