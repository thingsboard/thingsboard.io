// src/pages/open-graph/_shared/LogoCard.tsx
//
// Variant B: shared brand-blue slab with the stacked TB logo + optional section
// name. Used for blog, marketing landings, case studies, use cases, device library.

import { html } from 'satori-html';
import { TB_STACKED_LOGO } from '@root/pages/open-graph/_assets/icons';
import { Background } from '@root/pages/open-graph/_shared/Background';
import { Slab } from '@root/pages/open-graph/_shared/Slab';
import { pickTitleSize } from '@root/pages/open-graph/_shared/text-block';

const TEXT_COLOR = '#ffffff';
const URL_COLOR = 'rgba(255,255,255,0.62)';

export interface LogoCardProps {
	variant: 'logo';
	/** Word rendered under the logo on the slab (omit for homepage). */
	sectionName?: string;
	/** Use 22 px / 0.14em "tight" version (for two-word labels). */
	sectionTight?: boolean;
	/** Optional uppercase line above the title. Omit for self-explanatory titles. */
	eyebrow?: string;
	title: string;
	/** Optional small line below the title — used for blog "By {Author}". */
	authorLine?: string;
}

/** Stacked TB logo, cropped to its content bbox via tight viewBox. */
function StackedLogo() {
	// Crop the source SVG to its content bbox (151,36,135,127) and force explicit
	// pixel dimensions (Satori's Yoga layout doesn't honour `width:100%`).
	// The source SVG also wraps the icon in `<g clip-path="url(#clip0_…)">` with
	// an empty `<clipPath>` in `<defs>` — strip it so the content actually renders.
	const W = 180;
	const H = Math.round((W * 127) / 135);
	const svg = TB_STACKED_LOGO
		.replace(
			/<svg[^>]*viewBox="0 0 436 200"[^>]*>/,
			`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="151 36 135 127">`,
		)
		.replace(/\s*clip-path="url\(#[^"]+\)"/g, '');
	return (
		<div
			style={{
				width: W,
				height: H,
				display: 'flex',
				alignSelf: 'center',
			}}
		>
			{html(svg)}
		</div>
	);
}

export function LogoCard({ sectionName, sectionTight, eyebrow, title, authorLine }: LogoCardProps) {
	const titleSize = pickTitleSize(title);
	const sectionSize = sectionTight ? 22 : 26;
	const sectionSpacing = sectionTight ? '0.14em' : '0.18em';

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
			<Slab cls="brand">
				<StackedLogo />
				{sectionName && (
					<div
						style={{
							marginTop: 22,
							fontSize: sectionSize,
							fontWeight: 700,
							letterSpacing: sectionSpacing,
							textTransform: 'uppercase',
							lineHeight: 1.1,
							opacity: 0.92,
							textAlign: 'center',
							display: 'flex',
						}}
					>
						{sectionName}
					</div>
				)}
			</Slab>

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
				{eyebrow && (
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
				)}
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
				{authorLine && (
					<div
						style={{
							marginTop: 26,
							fontSize: 20,
							fontWeight: 500,
							opacity: 0.78,
							display: 'flex',
						}}
					>
						{authorLine}
					</div>
				)}
			</div>

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
