// src/pages/open-graph/_shared/Card.tsx
//
// Dispatcher between the two card variants. Page-data emits one of these per
// page, render.ts hands it to Satori.

import { DocsCard, type DocsCardProps } from '@root/pages/open-graph/_shared/DocsCard';
import { LogoCard, type LogoCardProps } from '@root/pages/open-graph/_shared/LogoCard';

export type CardProps = DocsCardProps | LogoCardProps;

export function Card(props: CardProps) {
	if (props.variant === 'docs') return DocsCard(props);
	return LogoCard(props);
}
