export interface FeedbackEntry {
	author: string;
	position?: string;
	companyName: string;
	id: string;
	link?: string;
	authorImage?: string;
	companyImage: string;
	companyImageWidth?: number;
	companyImageHeight?: number;
	tagline?: string;
	text: string[];
	caseStudySlug?: string;
	source?: { url: string; label: string };
}

export interface FeedbackCategory {
	key: string;
	label: string;
}
