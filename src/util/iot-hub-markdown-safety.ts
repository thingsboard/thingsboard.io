import { externalLinkAttrs, relForTarget } from '@util/external-links';
import type { HastNode } from '@util/site-links';

// IoT Hub readmes and descriptions are written by third-party creators, and the
// hub accepts Markdown only: raw HTML has no place in them. These guards keep
// the rendered output to what Markdown itself produces.

/**
 * Prefix of the `<!--ih-slot-N-->` comments IotHubMarkdown puts in the source
 * and later splits the rendered HTML on. They are the only raw HTML kept.
 */
export const IOT_HUB_SLOT_PREFIX = 'ih-slot-';
const SLOT_COMMENT_RE = new RegExp(`^<!--${IOT_HUB_SLOT_PREFIX}\\d+-->$`);

// Browsers drop ASCII whitespace and control characters inside a scheme
// (`java\tscript:`), so they are stripped before the scheme is read.
// eslint-disable-next-line no-control-regex
const IGNORED_URL_CHARS_RE = /[\u0000- ]/g;
const SCHEME_RE = /^([a-z][a-z0-9+.-]*):/i;
const ALLOWED_SCHEMES = new Set(['http', 'https', 'mailto']);

/** True for relative URLs and for http, https and mailto ones. */
export function isSafeUrl(url: string): boolean {
	const scheme = url.replace(IGNORED_URL_CHARS_RE, '').match(SCHEME_RE)?.[1];
	return !scheme || ALLOWED_SCHEMES.has(scheme.toLowerCase());
}

/**
 * Rehype plugin: removes raw HTML other than the slot comments, and drops
 * `href` / `src` values with a scheme outside the allow-list. Runs before the
 * other plugins, so an image `src` is checked before it becomes a lightbox link.
 */
export function rehypeIotHubSafety() {
	return (tree: HastNode): void => {
		const visit = (node: HastNode): void => {
			if (node.type === 'element' && node.properties) {
				for (const key of ['href', 'src']) {
					const value = node.properties[key];
					if (typeof value === 'string' && !isSafeUrl(value)) delete node.properties[key];
				}
			}
			if (node.children) {
				node.children = node.children.filter(
					(child) => child.type !== 'raw' || SLOT_COMMENT_RE.test((child.value ?? '').trim())
				);
				node.children.forEach(visit);
			}
		};
		visit(tree);
	};
}

// The IoT Hub UI's own new-tab marker, written at the end of the link text:
// `[text{:target="_blank"}](url)`. Smart punctuation may curl its quotes.
const TARGET_BLANK_SUFFIX_RE = /\s*\{:target=["\u201C\u201D]_blank["\u201C\u201D]\}\s*$/;

/** Removes the marker from the link's last text node; true when it was there. */
function stripTargetBlankSuffix(link: HastNode): boolean {
	let last: HastNode | undefined = link;
	while (last?.children?.length) last = last.children[last.children.length - 1];
	if (last?.type !== 'text' || !last.value || !TARGET_BLANK_SUFFIX_RE.test(last.value)) return false;
	last.value = last.value.replace(TARGET_BLANK_SUFFIX_RE, '');
	return true;
}

/**
 * Rehype plugin: applies the site's off-site link policy (`@util/external-links`)
 * to rendered links, so an absolute http(s) link opens in a new tab with
 * rel="noopener noreferrer" and creators need no HTML for it. A link carrying
 * the IoT Hub `{:target="_blank"}` marker opens in a new tab even when local.
 * Runs after the site-href normalizer, so thingsboard.io links are local by then.
 */
export function rehypeIotHubLinkTargets() {
	return (tree: HastNode): void => {
		const visit = (node: HastNode): void => {
			if (node.type === 'element' && node.tagName === 'a' && node.properties) {
				const href = typeof node.properties.href === 'string' ? node.properties.href : undefined;
				const attrs = stripTargetBlankSuffix(node)
					? { target: '_blank', ...relForTarget('_blank') }
					: externalLinkAttrs(href);
				Object.assign(node.properties, attrs);
			}
			node.children?.forEach(visit);
		};
		visit(tree);
	};
}
