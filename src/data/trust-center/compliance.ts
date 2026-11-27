import { tc } from '@data/trust-center/nav';
import { formatDate } from '@util/format-date';

/** The Compliance page, its certificate pages, and the ISO certificates' facts. */

export interface Fact {
	label: string;
	html: string;
	/** Text a Copy button beside the value copies: a registration number, for the validator. */
	copy?: string;
}

const ISSUED = '2026-09-09';
const EXPIRES = '2027-09-08';
const CYCLE_ENDS = '2029-09-08';

/** Both ISO certificates: one body, one issue date, one cycle, the dates written out. */
export const CERT_ISSUE = {
	body: 'Swiss Approval North America',
	issued: formatDate(ISSUED, 'long'),
	issuedShort: formatDate(ISSUED),
	expires: formatDate(EXPIRES, 'long'),
	cycleEnds: formatDate(CYCLE_ENDS, 'long'),
	validator: 'swissapproval.ch/certificate-validator',
};

const VALIDITY = `${CERT_ISSUE.issued} – ${CERT_ISSUE.expires}, within a three-year cycle running to ${CERT_ISSUE.cycleEnds}, with annual surveillance audits.`;

export const ISO_27001 = {
	/** The standard's number, for the seal. */
	number: '27001',
	title: 'ISO/IEC 27001:2022',
	line: 'Information security management system',
	registration: '372-02-270-00460',
	href: tc('compliance/iso-27001'),
};

export const ISO_9001 = {
	number: '9001',
	title: 'ISO 9001:2015',
	line: 'Quality management system',
	registration: '372-02-100-02170',
	href: tc('compliance/iso-9001'),
};

export const ISO_CERTS = [ISO_27001, ISO_9001];

export const CERTIFIED_ON = `Certified · ${CERT_ISSUE.issuedShort}`;

/** The certificate validator, which asks for a card's registration number. */
export const VERIFY = {
	label: 'Verify a certificate',
	note: 'On swissapproval.ch, with the registration number from a card above.',
	site: 'swissapproval.ch',
	href: `https://${CERT_ISSUE.validator}/`,
};

export const COMPLIANCE_LEDE = `ThingsBoard is certified to ISO/IEC 27001 and ISO 9001 by ${CERT_ISSUE.body}, an IAS-accredited certification body. Both certificates cover how we develop, support and run ThingsBoard, including our cloud services, and you can verify them on ${VERIFY.site}.`;

export const CERT_DETAILS: Fact[] = [
	{
		label: 'Certification body',
		html: `${CERT_ISSUE.body} (IAS-accredited). Both certificates were issued on ${CERT_ISSUE.issued} and are valid until ${CERT_ISSUE.expires}, within a three-year cycle that runs to ${CERT_ISSUE.cycleEnds}, with a surveillance audit every year.`,
	},
	{
		label: 'Certified scope',
		html: 'Software design and development, maintenance, training, IT consulting services, support services, integration services; cloud services; software QA testing; software licensing.',
	},
];

export interface CertPage {
	/** The page's title and crumb are the registry's (`@data/trust-center/pages`). */
	slug: string;
	lede: string;
	facts: Fact[];
}

/** The Certified badge's line on the certificate pages. */
export const CERTIFIED_NOTE = `Issued ${CERT_ISSUE.issued} by ${CERT_ISSUE.body}.`;

export const CERT_PAGES: CertPage[] = [
	{
		slug: 'iso-27001',
		lede: 'Information security management system, including Amendment 1:2024.',
		facts: [
			{ label: 'Registration No', html: ISO_27001.registration, copy: ISO_27001.registration },
			{ label: 'Validity', html: VALIDITY },
			{
				label: 'Statement of Applicability',
				html: '93 Annex A controls: 91 implemented, 1 implemented partially (A.8.12) and 1 not applicable (A.8.30). Available under NDA.',
			},
			{
				label: 'What it covers',
				html: "Our management system, meaning how we build, maintain and support the software. It doesn't certify the product itself, and it doesn't cover your own installation.",
			},
			{
				label: 'For your vendor assessment',
				html: 'You can use the certificate and its scope as supplier evidence in your own ISMS (A.5.19–A.5.23). We share the Statement of Applicability and audit reports under NDA.',
			},
		],
	},
	{
		slug: 'iso-9001',
		lede: 'Quality management system, run as one integrated system together with information security.',
		facts: [
			{ label: 'Registration No', html: `${ISO_9001.registration} · IAF Code 33`, copy: ISO_9001.registration },
			{ label: 'Validity', html: VALIDITY },
			{ label: 'For procurement', html: 'Use it as supplier evidence under clause 8.4 of your own QMS.' },
		],
	},
];
