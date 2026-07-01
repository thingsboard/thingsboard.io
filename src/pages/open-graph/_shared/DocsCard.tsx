// src/pages/open-graph/_shared/DocsCard.tsx
//
// Variant A: docs cards. Slab carries a per-product icon + edition label.

import { html } from 'satori-html';
import { ICONS } from '@root/pages/open-graph/_assets/icons';
import { Background } from '@root/pages/open-graph/_shared/Background';
import { Slab } from '@root/pages/open-graph/_shared/Slab';
import type { DocsProductMeta } from '@root/pages/open-graph/_shared/product-meta';
import { pickTitleSize } from '@root/pages/open-graph/_shared/text-block';

const TEXT_COLOR = '#ffffff';
const URL_COLOR = 'rgba(255,255,255,0.62)';

export interface DocsCardProps {
	variant: 'docs';
	meta: DocsProductMeta;
	eyebrow: string;
	title: string;
}

const CIRCLE_SIZE = 130;
const ICON_SIZE = 100; // default — fills the circle with a comfortable inset

/** Per-icon tight viewBox covering only the visible content, computed by
 *  rasterising the source SVG and finding its non-transparent bbox.
 *  Used to crop out the natural padding around icons whose content doesn't
 *  fill the source viewBox. Each entry adds a small margin around the raw
 *  bbox so the rendered icon doesn't sit flush against the glass-circle
 *  edge. */
const TIGHT_VIEWBOX: Partial<Record<DocsProductMeta['iconKey'], string>> = {
	// PE bbox 3.38 5 24.5 22.5 — match Mobile PE's natural ~12% padding ratio
	// so the cog reads at the same comfortable size as other icons.
	p:       '1 2 28 28',
	// Gateway bbox 6.33 4.22 41.34 45.56 — wide content, add ~15 % margin
	gateway: '1 -2 52 58',
	// Trendz bbox 0 0.84 54 36.92 — content fills the source viewBox edge-to-edge
	// horizontally, so add ~8 % margin and recentre vertically so the chart
	// glyph doesn't sit flush against the glass circle.
	trendz:  '-5 -13 64 64',
};

/** Icons whose inner detail paths (originally rendered at fill-opacity="0.55"
 *  in the recoloured source) should be stripped at render time, leaving only
 *  the outer silhouette. PE is the only icon where the inner B-circuit pattern
 *  visually clutters the cog and reads as "behind" the glass-circle border. */
const STRIP_DIM_PARTS: ReadonlySet<DocsProductMeta['iconKey']> = new Set(['p']);

/** Rewrite the first <svg> tag with explicit width/height and (when known)
 *  a tight viewBox covering the visible content. Optionally strips inner
 *  detail paths (those originally rendered at fill-opacity="0.55"), then
 *  normalises remaining fill-opacity values so the icon reads at uniform
 *  brightness against the glass circle's faint border. */
function prepareIcon(
	svg: string,
	w: number,
	h: number,
	tightViewBox?: string,
	stripDim = false,
): string {
	let result = svg.replace(/<svg([^>]*)>/, (_match, attrs: string) => {
		const origW = (attrs as string).match(/\bwidth="([^"]+)"/)?.[1];
		const origH = (attrs as string).match(/\bheight="([^"]+)"/)?.[1];
		const hasViewBox = /\bviewBox="/.test(attrs as string);
		let cleaned = (attrs as string)
			.replace(/\s*(width|height)="[^"]*"/g, '')
			.replace(/\s*viewBox="[^"]*"/g, '');
		const viewBox = tightViewBox ?? (hasViewBox
			? (attrs as string).match(/\bviewBox="([^"]+)"/)![1]
			: `0 0 ${origW ?? w} ${origH ?? h}`);
		cleaned = ` viewBox="${viewBox}"` + cleaned;
		return `<svg width="${w}" height="${h}"${cleaned}>`;
	});
	if (stripDim) {
		// Remove any <path …/> whose attributes include fill-opacity="0.55"
		// (the dim inner detail in the recoloured source SVGs).
		result = result.replace(/<path[^>]*\bfill-opacity="0\.55"[^>]*\/>/g, '');
	}
	result = result.replace(/fill-opacity="0\.\d+"/g, 'fill-opacity="0.95"');
	result = result.replace(/fill-opacity:0\.\d+/g, 'fill-opacity:0.95');
	return result;
}

/** Cache the rewritten SVG markup per icon — `prepareIcon` runs ~5 regex
 *  replaces and the inputs are static, so we only ever do the work once
 *  per process per icon (regardless of how many cards reference it). */
const PREPARED_ICONS = new Map<DocsProductMeta['iconKey'], string>();
function getPreparedIcon(iconKey: DocsProductMeta['iconKey']): string {
	let svg = PREPARED_ICONS.get(iconKey);
	if (svg === undefined) {
		svg = prepareIcon(
			ICONS[iconKey],
			ICON_SIZE,
			ICON_SIZE,
			TIGHT_VIEWBOX[iconKey],
			STRIP_DIM_PARTS.has(iconKey),
		);
		PREPARED_ICONS.set(iconKey, svg);
	}
	return svg;
}

/** Icon container — glass circle 130×130 with the product icon centred and
 *  scaled to fill via tight per-icon viewBoxes. */
function IconCircle({ iconKey }: { iconKey: DocsProductMeta['iconKey'] }) {
	const svg = getPreparedIcon(iconKey);
	return (
		<div
			style={{
				width: CIRCLE_SIZE,
				height: CIRCLE_SIZE,
				borderRadius: 999,
				background: 'rgba(255,255,255,0.12)',
				border: '1px solid rgba(255,255,255,0.20)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				marginBottom: 22,
			}}
		>
			<div style={{ width: ICON_SIZE, height: ICON_SIZE, display: 'flex' }}>
				{html(svg)}
			</div>
		</div>
	);
}

export function DocsCard({ meta, eyebrow, title }: DocsCardProps) {
	const titleSize = pickTitleSize(title);
	const primarySize = meta.tight ? 22 : 26;
	const primarySpacing = meta.tight ? '0.12em' : '0.16em';

	return (
		<div
			style={{
				width: 1200,
				height: 630,
				display: 'flex',
				background: '#171a23',
				color: TEXT_COLOR,
				fontFamily: '"Roboto", "Noto Sans Symbols"',
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			<Background />
			<Slab cls={meta.slabClass}>
				<IconCircle iconKey={meta.iconKey} />
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						fontSize: primarySize,
						fontWeight: 700,
						letterSpacing: primarySpacing,
						textTransform: 'uppercase',
						lineHeight: 1.1,
						opacity: 0.92,
					}}
				>
					<span>{meta.primaryLabel}</span>
					{meta.secondaryLabel && (
						<span
							style={{
								fontSize: primarySize * 0.62,
								letterSpacing: '0.16em',
								marginTop: primarySize * 0.5,
								opacity: 0.78,
							}}
						>
							{meta.secondaryLabel}
						</span>
					)}
				</div>
			</Slab>

			{/* Text block — top:25%, left:40%, right:80px */}
			<div
				style={{
					position: 'absolute',
					top: '25%',
					left: '40%',
					right: 80,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<div
					style={{
						fontSize: 21,
						fontWeight: 700,
						letterSpacing: '0.16em',
						textTransform: 'uppercase',
						opacity: 0.82,
					}}
				>
					{eyebrow}
				</div>
				<div
					style={{
						fontSize: titleSize,
						fontWeight: 500,
						lineHeight: 1.22,
						letterSpacing: '-0.018em',
						marginTop: 22,
						maxWidth: 600,
						display: 'flex',
					}}
				>
					{title}
				</div>
			</div>

			{/* Footer URL */}
			<div
				style={{
					position: 'absolute',
					bottom: 32,
					right: 80,
					fontSize: 18,
					fontWeight: 600,
					letterSpacing: '0.04em',
					color: URL_COLOR,
					display: 'flex',
				}}
			>
				thingsboard.io
			</div>
		</div>
	);
}
