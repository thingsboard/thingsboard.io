// Shared TypeScript interfaces for case study pages

export interface StatisticItem {
	value: number;
	prefix?: string;
	suffix?: string;
	decimal?: { value: number; suffix?: string };
	label: string;
}

export interface QuoteData {
	text: string;
	author: string;
	role?: string;
	company?: string;
	photo?: string;
}

export interface PowerBlock {
	title: string;
	text: string | string[];
	listItems?: string[];
	secondText?: string;
	image: string;
	imageAlt: string;
}

export interface HelpBlock {
	title: string;
	text: string;
	listItems?: string[];
	secondText?: string;
	images: { src: string; alt: string; title?: string }[];
}

export interface AwardData {
	image: string;
	imageAlt: string;
	imageWidth?: number;
	imageHeight?: number;
	title: string;
	titleHref?: string;
	description: string;
}

export interface CaseStudyData {
	title: string;
	pageTitle: string;
	description: string;
	pageSlug: string;
	breadcrumb: string;
	categories: string[];

	hero: {
		category: string;
		heading: string;
		paragraphs: string[];
		logo: string;
		logoAlt: string;
		logoWidth?: number;
		logoHeight?: number;
		backgroundImage: string;
	};

	statistics?: StatisticItem[];

	quote?: QuoteData;

	problem: {
		badge?: string;
		description?: string;
		challenges: string[];
		results: string[];
	};

	power: {
		badge?: string;
		companyName: string;
		/** Overrides the default "How ThingsBoard powers {companyName}?" section heading. */
		heading?: string;
		blocks: PowerBlock[];
	};

	customerQuote?: QuoteData;

	fullWidthImage?: {
		src: string;
		alt: string;
		width?: number;
		height?: number;
	};

	help: {
		badge?: string;
		industryName: string;
		blocks: HelpBlock[];
	};

	authoredQuote?: QuoteData;

	award?: AwardData;

	contact: {
		companyLogo: string;
		companyLogoAlt: string;
		companyLogoWidth?: number;
		companyLogoHeight?: number;
	};
}

export interface FeaturedCard {
	slug: string;
	category: string;
	title: string;
	description: string;
	logo: string;
	logoAlt: string;
	backgroundImage: string;
}

export interface CaseStudyCard {
	slug: string;
	categories: string[];
	title: string;
	description: string;
	logo: string;
	logoAlt: string;
	logoHeight?: number;
	backgroundImage: string;
}
