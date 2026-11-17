// Shared TypeScript interfaces for use case pages

import type { AdvantageCard } from '@components/Landing/AdvantagesCarousel.astro';
import type { FaqCategory } from '@data/pricing/types';

export interface DashboardPanel {
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	imageTitle?: string;
}

export interface Benefit {
	title: string;
	description: string;
}

export interface ApplicationItem {
	title: string;
	description: string;
	desktopImage: string;
	imageAlt: string;
	imageTitle?: string;
}

export interface CarouselImage {
	src: string;
	alt: string;
	title?: string;
	width: number;
	height: number;
}

export interface ScadaKeyFunction {
	title: string;
	description: string;
	image: string;
	imageAlt: string;
}

export interface ComparisonRow {
	criteria: string;
	highPerformance: string;
	traditional: string;
}

export interface UseCaseAbout {
	shortText: string;
	longText: string[];
	demoUrl: string;
	demoButtonId: string;
}

export interface UseCaseSolutionStructure {
	title: string;
	badge?: string;
	shortText: string;
	longText?: string[];
	schemeSrc: string;
	schemeAlt: string;
	schemeCaption?: string;
}

export interface UseCaseBenefits {
	title?: string;
	badge?: string;
	subtitle?: string;
	benefits: Benefit[];
}

export interface UseCaseDashboardStructure {
	title: string;
	badge?: string;
	subtitle?: string;
	panels: DashboardPanel[];
	demoUrl: string;
	demoButtonId: string;
	contactUsId: string;
}

export interface UseCaseApplications {
	title: string;
	badge?: string;
	subtitle?: string;
	applications: ApplicationItem[];
}

export interface UseCaseSummary {
	title: string;
	text: string;
	icon: string;
	iconAlt: string;
}

/** The call-to-action banner under the overview. Its title is the page's first H2. */
export interface UseCaseCta {
	title: string;
	text: string;
	/** Main button: a solution template or a filtered template list in the IoT Hub. */
	button: { label: string; href: string };
}

export interface UseCaseAdvantages {
	title: string;
	cards: AdvantageCard[];
}

export interface UseCaseData {
	title: string;
	pageTitle: string;
	description: string;
	pageSlug: string;
	/** Without it the page shows the default "Contact Us" banner. */
	cta?: UseCaseCta;
	about: UseCaseAbout;
	overview?: {
		type: 'comparison' | 'carousel';
		// For comparison type
		baseImage?: string;
		baseImageAlt?: string;
		baseImageTitle?: string;
		overlayImage?: string;
		overlayImageAlt?: string;
		overlayImageTitle?: string;
		// For carousel type
		carouselImages?: CarouselImage[];
	};
	solutionStructure?: UseCaseSolutionStructure;
	benefits?: UseCaseBenefits;
	dashboardStructure?: UseCaseDashboardStructure;
	applications?: UseCaseApplications;
	/** Without it the page shows the shared ThingsBoard advantages block. */
	advantages?: UseCaseAdvantages;
	/** Answers are HTML. Shown after the advantages block. */
	faq?: FaqCategory[];
	summary?: UseCaseSummary;
	// SCADA-specific
	scadaOverview?: {
		baseImage: string;
		overlayImage: string;
		comparisonRows: ComparisonRow[];
	};
	scadaKeyFunctions?: {
		/** Section heading; defaults to "Key functions of SCADA systems". */
		title?: string;
		highPerformance: ScadaKeyFunction[];
		traditional: ScadaKeyFunction[];
	};
	scadaDashboardStructure?: {
		highPerformance: UseCaseDashboardStructure;
		traditional: UseCaseDashboardStructure;
	};
}
