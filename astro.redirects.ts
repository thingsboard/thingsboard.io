import type { AstroUserConfig } from 'astro';

export const redirects: AstroUserConfig['redirects'] = {
	// Add redirects here. They work in both dev and production.
	// Example: '/old-path/': '/new-path/',
	// Example with params: '/docs/[...slug]': '/new-docs/[...slug]',
	'/docs/pe/edge/': '/docs/edge/pe/',
	'/docs/pe/edge/[...slug]': '/docs/edge/pe/[...slug]',
	'/docs/pe/mobile/': '/docs/mobile/pe/',
	'/docs/pe/mobile/[...slug]': '/docs/mobile/pe/[...slug]',
	'/docs/pe/mqtt-broker/': '/docs/mqtt-broker/pe/',
	'/docs/pe/mqtt-broker/[...slug]': '/docs/mqtt-broker/pe/[...slug]',
};
