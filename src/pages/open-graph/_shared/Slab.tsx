// src/pages/open-graph/_shared/Slab.tsx
//
// Left brand panel: full-height vertical gradient + dotted texture + bottom
// highlight, with a feather overlay on its right edge that fades into the
// canvas base colour #171a23. Children render in a centred column inside the
// solid (non-feathered) 65 % portion.

import type { SatoriNode } from '@root/pages/open-graph/_shared/jsx-runtime';
import { slabBackground, type SlabClass } from '@root/pages/open-graph/_shared/colors';

const PANEL_BASE = '#171a23';

interface SlabProps {
	cls: SlabClass;
	children?: SatoriNode;
}

export function Slab({ cls, children }: SlabProps) {
	return (
		<div
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				bottom: 0,
				width: '36%',
				display: 'flex',
				background: slabBackground(cls),
				overflow: 'hidden',
			}}
		>
			{/* Dotted texture overlay (1.4 px white dots every 22 px, 10 % alpha) */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage:
						'radial-gradient(rgba(255,255,255,0.10) 1.4px, transparent 1.6px)',
					backgroundSize: '22px 22px',
				}}
			/>
			{/* Bottom radial highlight glow (cheap stand-in for the mockup's mix-blend-mode) */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(120% 80% at 50% 115%, rgba(255,255,255,0.18), transparent 60%)',
				}}
			/>
			{/* Right-edge feather: linear gradient transparent → panel-base, sits on top */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					width: '35%',
					background: `linear-gradient(90deg, rgba(23,26,35,0) 0%, ${PANEL_BASE} 100%)`,
				}}
			/>
			{/* Content column: occupies the solid 65 % of the slab (= 0..23.4 % of canvas) */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					width: '65%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{children}
			</div>
		</div>
	);
}
