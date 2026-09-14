// Minimal structural hast-node shape — enough for the walk below without
// depending on the (transitive) `hast` types package. Mirrors the one in
// `@util/site-links`.
type HastNode = {
	type: string;
	tagName?: string;
	properties?: Record<string, unknown>;
	value?: string;
	children?: HastNode[];
};

// Hub images are served from the API and have no dimensions at build time. The
// lightbox reads the real ones off the loaded image (`data-pswp-cdn`); these are
// just the shape PhotoSwipe insists on having up front.
const PLACEHOLDER_WIDTH = '1600';
const PLACEHOLDER_HEIGHT = '900';

/**
 * Wraps one `<img>` in the markup the site-wide PhotoSwipe loader looks for:
 * a `.gallery-thumb` anchor pointing at the full image, inside its own
 * `.image-gallery` root.
 *
 * One root per image rather than one around the whole readme, because a readme
 * can also contain `${images.gallery(…)}` blocks, which render an
 * `<ImageGallery>` with an `.image-gallery` root of its own. Nesting the two
 * would hand the outer gallery the inner one's thumbnails as well, so arrowing
 * out of a prose image would wander into an unrelated set.
 */
function wrapImage(node: HastNode): HastNode | null {
	if (node.type !== 'element' || node.tagName !== 'img') return null;
	const src = node.properties?.src;
	if (typeof src !== 'string' || src.length === 0) return null;
	const alt = typeof node.properties?.alt === 'string' ? node.properties.alt : '';
	return {
		type: 'element',
		tagName: 'span',
		properties: { className: ['image-gallery'] },
		children: [
			{
				type: 'element',
				tagName: 'a',
				properties: {
					className: ['gallery-thumb'],
					href: src,
					dataPswpWidth: PLACEHOLDER_WIDTH,
					dataPswpHeight: PLACEHOLDER_HEIGHT,
					dataPswpCdn: 'true',
					ariaLabel: alt ? `View full size: ${alt}` : 'View full size',
				},
				children: [node],
			},
		],
	};
}

/**
 * Rehype plugin: makes every image in an IoT Hub readme open full screen.
 *
 * Images the author already wrapped in a link are left alone — that link is the
 * behaviour they asked for, and an anchor inside an anchor is invalid markup
 * besides. Images written as raw HTML rather than Markdown are left alone too:
 * they arrive as unparsed `raw` nodes with no attributes to read.
 */
export function rehypeLightboxImages() {
	return (tree: HastNode): void => {
		const visit = (node: HastNode, insideAnchor: boolean): void => {
			if (!node.children) return;
			const anchorHere = insideAnchor || node.tagName === 'a';
			if (!anchorHere) {
				node.children = node.children.map((child) => wrapImage(child) ?? child);
			}
			for (const child of node.children) visit(child, anchorHere);
		};
		visit(tree, false);
	};
}
