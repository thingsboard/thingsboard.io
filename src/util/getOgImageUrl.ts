import {
	getDocsCardInputs,
	getBlogCardInputs,
	getIotHubCardInputs,
	getCaseStudyCardInputs,
	getUseCaseCardInputs,
	getMarketingCardInputs,
	getPartnerCardInputs,
	getCareerCardInputs,
	getCollectionIndexInputs,
	type CardInput,
} from '@root/pages/open-graph/_shared/page-data';

const COLLECTION_INDEX_URLS: Record<string, string> = {
	'docs-index':           '/docs',
	'case-studies-index':   '/case-studies',
	'use-cases-index':      '/use-cases',
};

/** A pathname → OG-image-pathname mapping derived from one CardInput list. */
function fromInputs(
	inputs: CardInput[],
	urlFn: (slug: string) => string,
	ogBase: string,
): Array<[string, string]> {
	return inputs.map(({ slug }) => [urlFn(slug), `${ogBase}/${slug}.png`]);
}

const routeIndex = new Map<string, string>([
	// Docs CE root has page.id === 'docs', which strips to slug 'docs'; map that
	// single case to the /docs landing.
	...fromInputs(await getDocsCardInputs(),       (s) => (s === 'docs' ? '/docs' : `/docs/${s}`), '/open-graph/docs'),
	// Blog index entry has slug 'index' — key it at /blog (not /blog/index).
	...fromInputs(await getBlogCardInputs(),       (s) => (s === 'index' ? '/blog' : `/blog/${s}`), '/open-graph/blog'),
	...fromInputs(await getCaseStudyCardInputs(),  (s) => `/case-studies/${s}`,                    '/open-graph/case-studies'),
	...fromInputs(await getUseCaseCardInputs(),    (s) => `/use-cases/${s}`,                       '/open-graph/use-cases'),
	// Homepage marketing card has slug 'index' — key it at '' so trailing-slash
	// strip turns the `/` lookup into '' and matches.
	...fromInputs(await getMarketingCardInputs(),  (s) => (s === 'index' ? '' : `/${s}`),          '/open-graph/pages'),
	...fromInputs(await getPartnerCardInputs(),    (s) => `/partners/hardware/${s}`,               '/open-graph/partners'),
	...fromInputs(await getCareerCardInputs(),     (s) => `/careers/${s}`,                         '/open-graph/careers'),
	...fromInputs(await getCollectionIndexInputs(),(s) => COLLECTION_INDEX_URLS[s] ?? `/${s}`,     '/open-graph/pages'),
	...fromInputs(await getIotHubCardInputs(),     (s) => (s === 'index' ? '/iot-hub' : `/iot-hub/${s}`), '/open-graph/iot-hub'),
]);

/**
 * Look up the OG image URL for a page pathname.
 * Walks up the URL tree if no exact match is found, so version-table sub-pages
 * (`/docs/foo/v3-X-x/`) inherit the parent docs card without needing their own
 * PNG. Returns undefined when no ancestor matches → caller falls back to
 * /thingsboard-og.png.
 *
 * UK pages reuse the EN card via path normalization (the /uk/ prefix is stripped).
 */
export function getOgImageUrl(pathname: string): string | undefined {
	let key = pathname;
	if (key.startsWith('/uk/')) key = key.slice(3);
	if (key.endsWith('/')) key = key.slice(0, -1);
	if (routeIndex.has(key)) return routeIndex.get(key);
	let parent = key;
	while (parent.lastIndexOf('/') > 0) {
		parent = parent.slice(0, parent.lastIndexOf('/'));
		const hit = routeIndex.get(parent);
		if (hit) return hit;
	}
	return undefined;
}
