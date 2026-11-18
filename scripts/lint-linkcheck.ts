import { PROD_ORIGIN } from '../src/consts.ts';
import { legacyInstallationsSection } from '../src/data/installations-legacy.ts';
import { ADD_ONS_SUB_TAB_BY_HASH } from '../src/data/pricing/add-ons-links.ts';
import { type LinkCheckerOptions, LinkCheckerState } from './lib/linkcheck/base/base.ts';
import { CanonicalUrl } from './lib/linkcheck/checks/canonical-url.ts';
import { GoodLabels } from './lib/linkcheck/checks/good-link-label.ts';
import { LegacyUrl } from './lib/linkcheck/checks/legacy-url.ts';
import { RelativeUrl } from './lib/linkcheck/checks/relative-url.ts';
import { SameLanguage } from './lib/linkcheck/checks/same-language.ts';
import { TargetExists } from './lib/linkcheck/checks/target-exists.ts';
import { getPagePathnamesFromBuildOutput, parsePages } from './lib/linkcheck/steps/build-index.ts';
import { addSourceFileAnnotations, findLinkIssues } from './lib/linkcheck/steps/find-issues.ts';
import { handlePossibleAutofix } from './lib/linkcheck/steps/optional-autofix.ts';
import { outputAnnotationsForGitHub, outputIssues } from './lib/linkcheck/steps/output-issues.ts';

/**
 * Contains all link checking logic.
 */
class LinkChecker {
	readonly options: LinkCheckerOptions;
	readonly state: LinkCheckerState;

	constructor(options: LinkCheckerOptions) {
		this.options = options;
		this.state = new LinkCheckerState();
	}

	/**
	 * Checks all pages referenced by the sitemap for link issues
	 * and outputs the result to the console.
	 */
	async run() {
		const options = this.options;
		const state = this.state;

		// Get the pathnames of every page emitted to the build output
		const pagePathnames = getPagePathnamesFromBuildOutput(options);

		// Parse all built pages and build an index of their contents
		const allPages = await parsePages(pagePathnames, options);

		// Find all link issues
		const linkIssues = findLinkIssues(allPages, options, state);

		// If errors were found, let our caller know through the process exit code (warnings don't fail)
		process.exitCode = linkIssues.some((issue) => issue.type.severity === 'error') ? 1 : 0;

		// Try to annotate all found issues with their Markdown source code locations
		addSourceFileAnnotations(linkIssues, options);

		// Output all found issues to the console
		outputIssues(linkIssues, state);

		// Run autofix logic
		const performedAutofix = handlePossibleAutofix(linkIssues, options, state);
		if (performedAutofix) {
			// If we just performed an autofix, repeat our entire run
			// to show the user what's left for them to fix manually
			await this.run();
			return;
		}

		// If we're being run by a CI workflow, output annotations in GitHub format
		if (process.env.CI) {
			outputAnnotationsForGitHub(linkIssues);
		}
	}
}

// Mirror the `site` resolution from astro.config.ts so preview builds
// (Cloudflare Pages, Netlify, or an explicit PUBLIC_SITE_URL) match the
// origin the build emitted.
const resolvedSite =
	process.env.PUBLIC_SITE_URL ||
	(process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_URL) ||
	(process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL) ||
	PROD_ORIGIN;

// Strip the trailing slash so `pathnameToHref` in build-index.ts (which calls
// `new URL(pathname, baseUrl)`) doesn't end up with `//` between origin and path.
const baseUrl = resolvedSite.replace(/\/$/, '');

// On preview/staging builds, also treat the production origin as local so
// hardcoded `https://thingsboard.io/...` URLs in build artifacts (assets,
// inlined SVGs, component output) are still caught by `[abs]` / `[404]`.
// Otherwise they look like external links and slip past every check, which
// is how the IoT Gateway architecture SVG smuggled 15 hardcoded prod URLs
// into the build undetected.
const additionalLocalHosts = baseUrl === PROD_ORIGIN ? [] : [PROD_ORIGIN];

// Use our class to check for link issues
const linkChecker = new LinkChecker({
	baseUrl,
	additionalLocalHosts,
	buildOutputDir: './dist',
	pageSourceDir: './src/content/docs',
	canonicalLinkPolicy: {
		// A canonical page must link to canonical URLs in its content. Within one of these sections
		// the product's own pages are always fine; outside them, a page's section is its first path
		// segment (`/blog/`, `/iot-hub/`, ...). Most specific first.
		sections: [
			'/docs/edge/pe/',
			'/docs/edge/',
			'/docs/paas/eu/',
			'/docs/paas/',
			'/docs/pe/',
			'/docs/mobile/pe/',
			'/docs/mobile/',
			'/docs/mqtt-broker/pe/',
			'/docs/mqtt-broker/',
			'/docs/trendz/',
			'/docs/iot-gateway/',
			'/docs/license-server/',
			'/docs/iot-hub/',
			'/docs/cli/',
			'/docs/',
			'/products/paas/',
		],
		allow: [
			// The CLI works with ThingsBoard Cloud and with your own PE server. Where the steps differ
			// (Cloud hosts and CA file, DTLS already on, no SNMP transport to configure), its guides link
			// both versions of the page.
			{
				from: ['/docs/cli/'],
				to: ['/docs/paas/'],
				pages: [
					'/docs/paas/reference/mqtt-api/getting-connected/',
					'/docs/paas/reference/lwm2m-api/getting-started/',
					'/docs/paas/reference/snmp-api/getting-connected/',
				],
			},
			// The Cloud pricing and product pages link the Cloud docs home and the Cloud custom domain
			// guide (CNAME to thingsboard.cloud, unlike the self-hosted one)
			{
				from: ['/pricing/', '/products/paas/'],
				to: ['/docs/paas/'],
				pages: ['/docs/paas/', '/docs/paas/user-guide/security/domains/'],
			},
			// CE upgrade instructions check compatibility against the Community Edge releases table,
			// which has no 4.4 row
			{ from: ['/docs/'], to: ['/docs/edge/'], pages: ['/docs/edge/releases/releases-table/'] },
			// The push notifications post sends Community Edition users to the CE mobile guide on purpose,
			// next to its link to the PE guide
			{ from: ['/blog/'], to: ['/docs/mobile/'], pages: ['/docs/mobile/getting-started/'] },
			// Temporary: the CE vs PE comparison predates 4.4 and links its CE column to the CE docs.
			// Drop this once the page is rewritten for the source-available release.
			{ from: ['/ce-vs-pe-diff/'], to: ['/docs/'], pages: ['/docs/', '/docs/installation/'] },
		],
	},
	checks: [
		new TargetExists({
			// Replay Cloudflare's _redirects on each link before the on-disk lookup,
			// so rules that shadow real files (e.g. catch-alls rewriting to a
			// non-existent destination) surface as broken instead of passing
			// because the original file happens to be in dist/.
			//
			// Noindex pages (contact-us-thanks, partners apply-thanks,
			// blog/author/*, installations/choose-region) are discovered
			// automatically via a cached `dist/{pathname}/index.html` fallback
			// in TargetExists itself — no manual prefix list needed.
			redirectsFilePath: './public/_redirects',
			scriptFragments: {
				'/pricing/': [...ADD_ONS_SUB_TAB_BY_HASH.keys()],
			},
		}),
		new SameLanguage({
			ignoredLinkPathnames: ['/lighthouse/'],
		}),
		new CanonicalUrl({
			ignoreMissingCanonicalUrl: ['/lighthouse/'],
		}),
		new RelativeUrl(),
		new LegacyUrl({
			rules: [
				{
					// The old tabbed page: `?product=thingsboard-cloud`, `#tab-thingsboard-pe`
					pathname: '/installations/',
					resolve: (url) => {
						const section = legacyInstallationsSection(url.search, url.hash);
						return section && `/installations/#${section}`;
					},
				},
				{
					// `?section=thingsboard-pe-options` opens the PE tab, and any `product=` overrides it
					// (`__resolvePricingState` in src/pages/pricing/index.astro)
					pathname: '/pricing/',
					resolve: (url) => {
						if (url.searchParams.get('section') !== 'thingsboard-pe-options') return undefined;
						const params = url.search
							.slice(1)
							.split('&')
							.filter((param) => param !== 'section=thingsboard-pe-options');
						if (!url.searchParams.has('product')) params.unshift('product=thingsboard-pe');
						return `/pricing/${params.length ? `?${params.join('&')}` : ''}${url.hash}`;
					},
				},
			],
		}),
		new GoodLabels(),
	],
	autofix: process.argv.includes('--autofix') || Boolean(process.env.npm_config_autofix),
});

await linkChecker.run();
