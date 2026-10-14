import { PE_FULL_VER } from '@data/versions';
import { NDA_TURNAROUND, REPORT_REPLY_TIME } from '@data/trust-center/nav';

/**
 * The contact form's topics, the hand-off to its thank-you page, and the vulnerability report template.
 *
 * INTEGRATION NOTE: the contact form is not connected; a valid submit only shows the thank-you page.
 * Before launch its topics must reach security@ (a routed CRM tag or an endpoint), not the sales pipeline.
 */

type SecurityTopicKey = 'documents' | 'questionnaire' | 'question' | 'dsr';

interface SecurityTopic {
	/** What the form submits and `?subject=` matches. */
	value: string;
	label: string;
	/** The message placeholder for this topic. */
	prompt: string;
	messageOptional?: boolean;
	/** Shows the documents checklist and requires one. */
	documents?: boolean;
	/** "Email" instead of "Work email", and Company optional. */
	personal?: boolean;
}

export const SECURITY_TOPICS: Record<SecurityTopicKey, SecurityTopic> = {
	documents: {
		value: 'Security Documents',
		label: 'Request documents',
		prompt: 'Optional: the project or vendor assessment you need them for.',
		messageOptional: true,
		documents: true,
	},
	questionnaire: {
		value: 'Security Questionnaire',
		label: 'Security questionnaire or vendor assessment',
		prompt: 'Which questionnaire or framework you use, and your deadline.',
	},
	question: {
		value: 'Security Question',
		label: 'Security, compliance or privacy question',
		prompt: 'Your question: our certificates, personal data and the DPA, hosting and backups, or anything else.',
	},
	dsr: {
		value: 'Data Subject Request',
		label: 'Data subject request (access, correction, deletion)',
		prompt: 'Which account or data the request is about, and what you want us to do.',
		personal: true,
	},
};

export const SECURITY_TOPIC_LIST: SecurityTopic[] = Object.values(SECURITY_TOPICS);

/**
 * The thank-you page's words per topic, keyed by the topic's value: the lede around the reader's
 * email, and what a document request adds (its eyebrow, "request" for "message", the documents and
 * the NDA steps) or a data subject request (the identity note).
 */
export const THANKS_BY_TOPIC: Record<
	string,
	{ lede: [string, string]; eyebrow?: string; noun?: string; documents?: true; identity?: true }
> = {
	[SECURITY_TOPICS.documents.value]: {
		lede: ['We’ll email our mutual NDA to ', '.'],
		eyebrow: 'Request sent',
		noun: 'request',
		documents: true,
	},
	[SECURITY_TOPICS.questionnaire.value]: {
		lede: ['Our security team will read it and reply to ', ' about your questionnaire.'],
	},
	[SECURITY_TOPICS.question.value]: { lede: ['Our security team will read it and reply to ', '.'] },
	[SECURITY_TOPICS.dsr.value]: { lede: ['We’ll reply to ', ' about your request.'], identity: true },
};

export const NDA_NOTE = `We send you our mutual NDA first. Once it's signed, you get the documents within ${NDA_TURNAROUND}.`;

export const REPORT_SUBJECT = 'Vulnerability report: <short summary>';
export const REPORT_TEMPLATE = [
	`Product and version: <for example ThingsBoard Cloud, or ThingsBoard ${PE_FULL_VER} self-hosted>`,
	'Vulnerability type: <for example access control, injection, XSS, or other>',
	'What an attacker can do: <and what access they need first: none, a customer user, a tenant administrator or device credentials>',
	'Steps to reproduce:',
	'1.',
	'2.',
	'3.',
	'',
	'Where, if you know: <the URL, API endpoint or component>',
	'Severity, in your view: <critical, high, medium, low or not sure; a CVSS vector if you have one>',
	'Already public or seen exploited? <no, or yes and where>',
	'Planning to publish? <the date, if so>',
	'Credit: <your name or handle, or anonymous>',
].join('\n');

/** sessionStorage hand-off from the contact form to its thank-you page; ignored once older than an hour. */
export const CONTACT_SENT_KEY = 'tc-contact-sent';
export const SENT_MAX_AGE_MS = 60 * 60 * 1000;

/** CLARIFY: how the NDA is signed and how documents arrive is the team's process; confirm before adding detail. */
export const NDA_STEPS: { title: string; line?: string }[] = [
	{ title: 'We email you our mutual NDA' },
	{ title: 'You sign it' },
	{ title: 'You get the documents', line: `Within ${NDA_TURNAROUND} of signing.` },
];

export const REPORT_NEXT = [
	`We reply within ${REPORT_REPLY_TIME} with a plan to investigate.`,
	'We keep you updated until the fix is released.',
	'Fixed CVE IDs are listed in the release notes.',
];

export const REPORT_RULES = [
	'Use your own installation or your own Cloud account.',
	"Don't access, change or delete other people's data.",
	"Don't run denial-of-service or load tests against ThingsBoard Cloud.",
	'Keep the details private until the fix is out.',
];
