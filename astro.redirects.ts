import type { AstroUserConfig } from 'astro';

export const redirects: AstroUserConfig['redirects'] = {
	// Add redirects here. They work in both dev and production.
	// Example: '/old-path/': '/new-path/',
	// Note: dynamic [...slug] redirects are NOT supported in static output mode —
	// Astro 5 requires getStaticPaths() for any dynamic route, including redirects.
	// For path-prefix renames use page files with getStaticPaths (see src/pages/docs/pe/).
	// IMPORTANT: Do NOT add /docs/ redirects here — Starlight treats them as content pages
	// and fails sidebar resolution. Use page-based redirects instead.

	// Trendz
	'/products/trendz/trndz-request-demo/': '/products/trendz/request-demo/',
	'/images/trendz/trndz-request-demo/': '/products/trendz/request-demo/',

	// PaaS
	'/products/paas/billing-info/': '/docs/paas/user-guide/billing-info/',
	'/products/paas/domains/': '/docs/paas/user-guide/security/domains/',
	'/products/paas/subscription/': '/docs/paas/reference/subscriptions/',
	'/products/paas/eu/subscription/': '/docs/paas/eu/reference/subscriptions/',
	'/products/paas/what-is-thingsboard-cloud/': '/docs/paas/why-thingsboard/',
	'/products/thingsboard-pe/install/': '/docs/pe/installation/',
	'/products/thingsboard-pe/install/aws/': '/docs/pe/installation/aws-marketplace/',
	'/products/thingsboard-pe/install-thanks/': '/contact-us-thanks/',

	// License Server
	'/products/license-server/': '/docs/license-server/what-is-license-server/',
	'/products/license-server/billing-info/': '/docs/license-server/billing-info/',
	'/products/license-server/subscription/': '/docs/license-server/subscription/',
	'/products/license-server/perpetual/': '/docs/license-server/perpetual/',
	'/products/license-server/instance/': '/docs/license-server/instance/',
	'/products/license-server/user/': '/docs/license-server/user/',

	// Use Cases
	'/use-cases/fleet-tracking/': '/use-cases/site-fleet-tracking/',
	'/fleet-tracking/': '/use-cases/site-fleet-tracking/',
	'/smart-metering/': '/use-cases/smart-metering/',
	'/smart-farming/': '/use-cases/smart-farming/',
	'/smart-energy/': '/use-cases/smart-energy/',

	// Partners
	'/partners/hardware/iotracker/': '/partners/hardware/iothings/',
	'/partners/hardware/makerfabs/': '/partners/hardware/agrosense-makerfabs/',
	'/partners/hardware/apply/thanks/': '/partners/hardware/apply-thanks/',

	// Services
	'/services/development-services/customers-full-reviews/': '/services/development-services/',
	'/iot-solutions/': '/services/development-services/',
};
