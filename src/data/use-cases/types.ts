// Shared TypeScript interfaces for use case pages

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
	mobileImage: string;
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
	shortText: string;
	longText?: string[];
	schemeSrc: string;
	schemeAlt: string;
	schemeCaption?: string;
}

export interface UseCaseBenefits {
	title?: string;
	subtitle?: string;
	benefits: Benefit[];
}

export interface UseCaseDashboardStructure {
	title: string;
	subtitle?: string;
	panels: DashboardPanel[];
	demoUrl: string;
	demoButtonId: string;
	contactUsId: string;
}

export interface UseCaseApplications {
	title: string;
	subtitle?: string;
	applications: ApplicationItem[];
}

export interface UseCaseSummary {
	title: string;
	text: string;
	icon: string;
	iconAlt: string;
}

export interface UseCaseData {
	title: string;
	pageTitle: string;
	description: string;
	pageSlug: string;
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
	summary?: UseCaseSummary;
	// SCADA-specific
	scadaOverview?: {
		baseImage: string;
		overlayImage: string;
		comparisonRows: ComparisonRow[];
	};
	scadaKeyFunctions?: {
		highPerformance: ScadaKeyFunction[];
		traditional: ScadaKeyFunction[];
	};
	scadaDashboardStructure?: {
		highPerformance: UseCaseDashboardStructure;
		traditional: UseCaseDashboardStructure;
	};
}
