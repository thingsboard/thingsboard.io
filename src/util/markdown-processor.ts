import { createMarkdownProcessor } from '@astrojs/markdown-remark';
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
			rehypePlugins: [rehypeNormalizeSiteHrefs],
		});
	}
	return processorPromise;
}
