import { redirects, devFallbackRedirects } from '../astro.redirects.ts';
import { LinkCheckerState, type LinkCheckerOptions } from './lib/linkcheck/base/base.ts';
import { CanonicalUrl } from './lib/linkcheck/checks/canonical-url.ts';
import { GoodLabels } from './lib/linkcheck/checks/good-link-label.ts';
import { RelativeUrl } from './lib/linkcheck/checks/relative-url.ts';
import { SameLanguage } from './lib/linkcheck/checks/same-language.ts';
import { TargetExists } from './lib/linkcheck/checks/target-exists.ts';
import { getPagePathnamesFromSitemap, parsePages } from './lib/linkcheck/steps/build-index.ts';
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
	run() {
		const options = this.options;
		const state = this.state;

		// Get the pathnames of all content pages from the sitemap contained in the build output
		const pagePathnames = getPagePathnamesFromSitemap(options);

		// Parse all pages referenced by the sitemap and build an index of their contents
		const allPages = parsePages(pagePathnames, options);

		// Find all link issues
		const linkIssues = findLinkIssues(allPages, options, state);

		// If issues were found, let our caller know through the process exit code
		process.exitCode = linkIssues.length > 0 ? 1 : 0;

		// Try to annotate all found issues with their Markdown source code locations
		addSourceFileAnnotations(linkIssues, options);

		// Output all found issues to the console
		outputIssues(linkIssues, state);

		// Run autofix logic
		const performedAutofix = handlePossibleAutofix(linkIssues, options, state);
		if (performedAutofix) {
			// If we just performed an autofix, repeat our entire run
			// to show the user what's left for them to fix manually
			this.run();
			return;
		}

		// If we're being run by a CI workflow, output annotations in GitHub format
		if (process.env.CI) {
			outputAnnotationsForGitHub(linkIssues);
		}
	}
}

// Mirror the `site` resolution from astro.config.ts so preview builds
// (Cloudflare Pages, Netlify, or an explicit PUBLIC_SITE_URL) parse the
// sitemap under the same origin the build emitted.
const resolvedSite =
	process.env.PUBLIC_SITE_URL ||
	(process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_URL) ||
	(process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL) ||
	'https://thingsboard.io';

// build-index.ts greps `<loc>${baseUrl}(/.*?)</loc>`, so the origin must not
// carry a trailing slash.
const baseUrl = resolvedSite.replace(/\/$/, '');

// Use our class to check for link issues
const linkChecker = new LinkChecker({
	baseUrl,
	buildOutputDir: './dist',
	pageSourceDir: './src/content/docs',
	// Include `astro.redirects` entries as pages so `[ref]` and its autofix can
	// reason about them. Their built HTML carries `noindex` and is filtered from
	// the sitemap, so without this they would be invisible to the link checker.
	// Exclude devFallbackRedirects — their targets (search pages, paginated views)
	// are not in the sitemap and would always produce false-positive 404 errors.
	additionalPathnames: Object.keys(redirects ?? {}).filter((p) => !(p in devFallbackRedirects)),
	// SEO canonical consolidation: pages in "free" versions whose content is ~95% identical
	// to the "professional" equivalent have their <link rel="canonical"> rewritten to the PE
	// URL (see `src/routeData.ts`). Edition-specific pages (installation/*, install/*,
	// getting-started/*) and stubs with `selfCanonical: true` in frontmatter are self-canonical
	// instead. These patterns tell the link checker which URL pairs count as consolidation —
	// runtime still filters per page via `isConsolidationCanonical` (which returns false when
	// canonical === pathname), so self-canonical pages fall through automatically. Effect:
	// `[can]` does not fire for links to the actual pathname of a consolidation source, and
	// `[ref]` / `[lng]` / `[abs]` autofixes preserve product context.
	consolidationPatterns: [
		{ from: '/docs/paas/eu/user-guide/billing-info/', to: '/docs/paas/user-guide/billing-info/' },
		// Main product: CE / PaaS / PaaS EU → PE
		{ from: '/docs/paas/eu/', to: '/docs/pe/' },
		{ from: '/docs/paas/', to: '/docs/pe/' },
		{ from: '/docs/', to: '/docs/pe/' },
		// Sub-products: free → professional
		{ from: '/docs/edge/', to: '/docs/edge/pe/' },
		{ from: '/docs/mqtt-broker/', to: '/docs/mqtt-broker/pe/' },
		{ from: '/docs/mobile/', to: '/docs/mobile/pe/' },
		{ from: '/docs/edge/pe/reference/', to: '/docs/pe/reference/' },
		{ from: '/docs/edge/reference/', to: '/docs/pe/reference/' },
		{ from: '/docs/edge/pe/user-guide/', to: '/docs/pe/user-guide/' },
		{ from: '/docs/edge/user-guide/', to: '/docs/pe/user-guide/' },
		{ from: '/docs/pe/installation/building-from-source/', to: '/docs/installation/building-from-source/' },
	],
	checks: [
		new TargetExists({
			// Replay Cloudflare's _redirects on each link before the on-disk lookup,
			// so rules that shadow real files (e.g. catch-alls rewriting to a
			// non-existent destination) surface as broken instead of passing
			// because the original file happens to be in dist/.
			//
			// Noindex pages (contact-us-thanks, partners apply-thanks, careers,
			// blog/author/*, installations/choose-region) are discovered
			// automatically via a cached `dist/{pathname}/index.html` fallback
			// in TargetExists itself — no manual prefix list needed.
			redirectsFilePath: './public/_redirects',
		}),
		new SameLanguage({
			ignoredLinkPathnames: ['/lighthouse/'],
		}),
		new CanonicalUrl({
			ignoreMissingCanonicalUrl: ['/lighthouse/'],
		}),
		new RelativeUrl(),
		new GoodLabels(),
	],
	autofix: process.argv.includes('--autofix') || Boolean(process.env.npm_config_autofix),
});

linkChecker.run();
