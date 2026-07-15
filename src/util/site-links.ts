import { PROD_ORIGIN } from '@root/consts';
import docsRedirects from '../../public/redirects.json';

// Normalizes links that come from external content sources (e.g. IoT Hub
// listing readmes fetched at build time) so they pass the same linkcheck
// rules as authored Markdown:
//   - absolute `https://thingsboard.io/...` URLs become site-relative
//   - pathnames get a canonical trailing slash
//   - paths that moved are remapped through the generated redirects table
//     (`public/redirects.json`)

const REDIRECTS = docsRedirects as Record<string, string>;

// Trailing slash is only added to paths without a real file extension so file
// URLs (e.g. `/thingsboard-og.png`) stay untouched. The extension must contain
// at least one letter — an all-digit "extension" is a version-like page slug
// (e.g. `/docs/mobile/release-before-v1.7`), not a file.
const FILE_EXTENSION_RE = /\.[a-z0-9]*[a-z][a-z0-9]*$/i;

/**
 * Converts an absolute URL pointing at the production origin into its
 * canonical site-relative form. Non-site URLs are returned unchanged.
 */
export function normalizeSiteUrl(url: string): string {
	if (!url.startsWith(PROD_ORIGIN)) return url;
	let parsed: URL;
	try {
		parsed = new URL(url);
	} catch {
		return url;
	}
	// `startsWith` alone would also match e.g. `https://thingsboard.io.evil.com`.
	if (parsed.origin !== PROD_ORIGIN) return url;

	let pathname = parsed.pathname;
	if (!pathname.endsWith('/') && !FILE_EXTENSION_RE.test(pathname)) pathname += '/';

	const target = REDIRECTS[pathname];
	if (!target) return pathname + parsed.search + parsed.hash;

	// Redirect targets can carry their own `?query`/`#fragment`; those win over
	// the source's — concatenating both would emit a malformed double `?`/`#`.
	const hashIdx = target.indexOf('#');
	const base = hashIdx === -1 ? target : target.slice(0, hashIdx);
	const hash = hashIdx === -1 ? parsed.hash : target.slice(hashIdx);
	const search = base.includes('?') ? '' : parsed.search;
	return base + search + hash;
}

// Matches single- and double-quoted href attributes; the opening quote is
// back-referenced so the value can contain the other quote character.
const HREF_RE = /href=(["'])((?:(?!\1).)*)\1/g;

/** Rewrites every quoted `href` in a raw-HTML fragment through {@link normalizeSiteUrl}. */
function rewriteSiteHrefs(html: string): string {
	return html.replace(HREF_RE, (full, quote: string, url: string) => {
		const normalized = normalizeSiteUrl(url);
		return normalized === url ? full : `href=${quote}${normalized}${quote}`;
	});
}

// Minimal structural hast-node shape — enough for the walk below without
// depending on the (transitive) `hast` types package.
type HastNode = {
	type: string;
	tagName?: string;
	properties?: Record<string, unknown>;
	value?: string;
	children?: HastNode[];
};

/**
 * Rehype plugin: pipes every link in the rendered tree through
 * {@link normalizeSiteUrl}. Walking the AST (rather than regexing the rendered
 * HTML) keeps literal `href="…"` text inside code spans untouched; raw-HTML
 * nodes have no parsed attributes, so those go through the regex instead.
 */
export function rehypeNormalizeSiteHrefs() {
	return (tree: HastNode): void => {
		const visit = (node: HastNode): void => {
			if (node.type === 'element' && typeof node.properties?.href === 'string') {
				node.properties.href = normalizeSiteUrl(node.properties.href);
			} else if (node.type === 'raw' && typeof node.value === 'string') {
				node.value = rewriteSiteHrefs(node.value);
			}
			node.children?.forEach(visit);
		};
		visit(tree);
	};
}
