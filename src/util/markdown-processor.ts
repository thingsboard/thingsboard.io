import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { rehypeIotHubLinkTargets, rehypeIotHubSafety } from '@util/iot-hub-markdown-safety';
import { rehypeLightboxImages } from '@util/lightbox-images';
import { rehypeNormalizeSiteHrefs } from '@util/site-links';

// Module-scoped lazy promise: the unified/remark/rehype pipeline is created
// once per build worker (or once per dev server lifetime) and reused across
// every render that needs Markdown -> HTML processing.
let processorPromise: ReturnType<typeof createMarkdownProcessor> | null = null;

export function getMarkdownProcessor(): ReturnType<typeof createMarkdownProcessor> {
	if (!processorPromise) {
		processorPromise = createMarkdownProcessor({
			// Externally-sourced markdown (IoT Hub readmes) links to thingsboard.io
			// with absolute URLs; normalize them to site-relative form in-pipeline.
			// Readme images become lightbox thumbnails, so a screenshot in the prose
			// opens full screen like the ones in the hero gallery do. The safety
			// pass goes first: creator text must not bring raw HTML or script URLs.
			// Link targets come before the lightbox, whose thumbnail links stay in-page.
			rehypePlugins: [rehypeIotHubSafety, rehypeNormalizeSiteHrefs, rehypeIotHubLinkTargets, rehypeLightboxImages],
		});
	}
	return processorPromise;
}
