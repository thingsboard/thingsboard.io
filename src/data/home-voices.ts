/**
 * The homepage's "Proven in production": four numbers, then six short customer quotes.
 * Each quote is checked as it loads to be verbatim from the customer's feedback or case study; the context lines are ours.
 */
import { allFeedbackEntries } from '@data/clients-feedback';
import { caseStudyBySlug } from '@data/case-studies';
import GITHUB_STARS from '@data/github-stars.json';
// The repo's own copies where it has them; the rest come from the feedback data. ÖBB's case study mark is
// white, for its dark hero.
import obbLogo from '@root/assets/images/landings/customer-logo/obb.svg';
import obbFace from '@root/assets/images/landings/edge/Dominic_Winkler.webp';
import tmobileLogo from '@root/assets/images/landings/customer-logo/t-mobile.svg';
import tektelicLogo from '@root/assets/images/landings/customer-logo/tektelic.svg';

type Picture = { src: string; width?: number; height?: number };

interface VoiceSource {
	text: string[];
	author: string;
	position?: string;
	company: string;
	caseStudy: string;
	logo: Picture;
	face?: Picture;
}

const feedback = (id: string): VoiceSource => {
	const e = allFeedbackEntries.find((entry) => entry.id === id);
	if (!e?.caseStudySlug) throw new Error(`home-voices: no feedback entry "${id}" with a case study`);
	return {
		text: e.text,
		author: e.author,
		position: e.position,
		company: e.companyName,
		caseStudy: e.caseStudySlug,
		logo: { src: e.companyImage, width: e.companyImageWidth, height: e.companyImageHeight },
		face: e.authorImage ? { src: e.authorImage } : undefined,
	};
};

const caseStudy = (slug: string): VoiceSource => {
	const d = caseStudyBySlug[slug];
	const q = d?.authoredQuote;
	if (!q?.company) throw new Error(`home-voices: no quote with a company in case study "${slug}"`);
	return {
		text: [q.text],
		author: q.author,
		position: q.role,
		company: q.company,
		caseStudy: slug,
		logo: { src: d.contact.companyLogo, width: d.contact.companyLogoWidth, height: d.contact.companyLogoHeight },
		face: q.photo ? { src: q.photo } : undefined,
	};
};

const PICKS: {
	source: VoiceSource;
	/** In place of the source's own. */
	logo?: Picture;
	face?: Picture;
	/** Verbatim from the source's text. */
	pull: string;
	/** Where the pull cuts into its sentence, marked with an ellipsis. */
	cut: { start: boolean; end: boolean };
	context: string;
	/** Set larger on the navy; the first and the last, in opposite corners. */
	accent?: boolean;
	/** Where the face sits in a photo that is not a centred headshot. */
	facePosition?: string;
	/** A heavy mark runs smaller than the 24px the rest share. */
	logoHeight?: number;
}[] = [
	{
		source: feedback('nettra'),
		logo: { src: '/images/usecases/partners-logos/nettra-logo.webp', width: 544, height: 141 },
		pull: 'Switching to ThingsBoard was a no-brainer',
		cut: { start: false, end: false },
		context:
			'Six months into building its own platform, it found every feature it had built, and the next ones, already there.',
		accent: true,
	},
	{
		source: feedback('kiotera'),
		pull: 'implement IoT-Solutions in a matter of days',
		cut: { start: true, end: false },
		context: 'Reuses the same gateways, sensors and rule chains as modules across its customers’ projects.',
	},
	{
		source: caseStudy('obb-infra'),
		logo: obbLogo,
		face: obbFace,
		facePosition: '28% 30%',
		logoHeight: 18,
		pull: 'allow data to flow within our IT network without the need to bridge Firewalls and Public Internet',
		cut: { start: true, end: false },
		context:
			'Monitors Austria’s rail infrastructure, from signals to bridges, with ThingsBoard Edge inside its own network.',
	},
	{
		source: feedback('tmobile'),
		logo: tmobileLogo,
		pull: 'done in nearly no time',
		cut: { start: true, end: false },
		context: 'Proofs of concept and prototypes for NB-IoT and Sigfox devices that arrive with no app.',
	},
	{
		source: feedback('tektelic'),
		logo: tektelicLogo,
		pull: 'dramatically reduce time to market',
		cut: { start: true, end: true },
		context: 'Completed its LoRaWAN gateways and sensors into end-to-end applications for its clients.',
	},
	{
		source: feedback('xtelia'),
		face: { src: '/images/development-services/Eric-Bourbeau.webp' },
		logoHeight: 18,
		pull: 'I can say that the dedication of ThingsBoard team blew me away',
		cut: { start: false, end: false },
		context: 'Deployed city-wide “No Parking” signs for snow removal against a tight, penalty-backed deadline.',
		accent: true,
	},
];

// Verbatim but for the brand's spelling, which some customers wrote as "Thingsboard".
const brand = (text: string) => text.replaceAll('Thingsboard', 'ThingsBoard');

export const HOME_VOICES = PICKS.map(
	({ source, pull, cut, logo = source.logo, face = source.face, accent = false, ...rest }) => {
		if (!source.text.some((paragraph) => brand(paragraph).includes(pull))) {
			throw new Error(`home-voices: the quote from ${source.company} is not verbatim`);
		}
		return {
			...rest,
			quote: `${cut.start ? '…' : ''}${pull}${cut.end ? '…' : ''}`,
			author: source.author,
			position: source.position,
			// The name people know, not the legal one.
			company: source.company.replace(/ (a\.s\.|Communications Inc\.|AG)$/, ''),
			logo,
			face,
			href: `/case-studies/${source.caseStudy}/`,
			accent,
		};
	}
);

const STARTED = 2016;

export const VOICES_STATS = [
	{ value: '5M+', label: 'devices connected' },
	// Rounded down to the thousand, so it can only read low.
	{ value: `${Math.floor(GITHUB_STARS['thingsboard/thingsboard'] / 1000)}K+`, label: 'GitHub stars' },
	{ value: '100+', label: 'countries with deployments' },
	{ value: String(new Date().getFullYear() - STARTED), label: 'years in production' },
];

export const VOICES_COPY = {
	title: 'Proven in production',
	lede: 'From small pilots to global enterprises — IoT projects running on ThingsBoard.',
};
