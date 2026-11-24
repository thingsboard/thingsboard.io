import { defineHastPlugin } from 'satteri';
import { versionAnchor } from '../../src/models/upgrade-shared.ts';

/**
 * Sets a version-only id on release-notes headings, in place of the one Sätteri derives from the
 * text: `## v4.4.0.2 (Oct 30, 2026)` → `id="v4-4-0-2"` (not `v4402-oct-30-2026`), the anchor the
 * upgrade models use for that version; Trendz `## v1.10.3-HF7 (…)` → `v1-10-3-hf7`. Sätteri keeps
 * an explicit id, so the TOC and `getHeadings()` use it. A factory: other documents leave it out.
 */

const RELEASE_NOTES_INCLUDE_RE = /\/src\/content\/_includes\/docs\/(?:[a-z-]+\/)*releases\/v\d+-\d+-x\.mdx$/;
const RELEASE_HEADING_RE = /^v(\d+(?:\.\d+)+(?:-hf\d+)?)(?=\s|$)/i;

function textOf(node: any): string {
	if (node.type === 'text') return node.value ?? '';
	return (node.children ?? []).map(textOf).join('');
}

export function satteriReleaseAnchors(factoryCtx: { fileURL?: URL | undefined }) {
	const sourcePath = (factoryCtx.fileURL?.pathname ?? '').replaceAll('\\', '/');
	if (!RELEASE_NOTES_INCLUDE_RE.test(sourcePath)) return undefined;

	return defineHastPlugin({
		name: 'release-anchors',
		element: {
			filter: ['h2'],
			visit(node: any, ctx: any) {
				const version = RELEASE_HEADING_RE.exec(textOf(node).trim())?.[1];
				if (version) ctx.setProperty(node, 'id', versionAnchor(version.toLowerCase()));
			},
		},
	});
}
