import { SECURITY_TOPICS } from '@data/trust-center/forms';
import { DPA_HREF, MARK_COLOR, SECURITY_EMAIL, contactHref, requestHref, tc } from '@data/trust-center/nav';
import { formatDate } from '@util/format-date';

/** The Compliance page, its four certificate pages, and the ISO certificates' facts. */

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

export const COMPLIANCE_LEDE =
	'ThingsBoard is certified to ISO/IEC 27001 and ISO 9001, independently tested every year, and declares its GDPR and CCPA compliance through its own data protection program.';

/** The certificate validator, which asks for a card's registration number. */
export const VERIFY = {
	label: 'Verify a certificate',
	note: 'On swissapproval.ch, with the registration number from a card above.',
	site: 'swissapproval.ch',
	href: `https://${CERT_ISSUE.validator}/`,
};

export const CERT_DETAILS: Fact[] = [
	{
		label: 'Certification body',
		html: `${CERT_ISSUE.body} (IAS-accredited). Both certificates were issued on ${CERT_ISSUE.issued} and are valid until ${CERT_ISSUE.expires}, within a three-year cycle that runs to ${CERT_ISSUE.cycleEnds}, with a surveillance audit every year.`,
	},
	{
		label: 'Certified scope',
		html: 'Software design and development, maintenance, training, IT consulting services, support services, integration services; cloud services; software QA testing; software licensing.',
	},
	{
		label: 'Penetration testing',
		html: 'An independent penetration test runs every year. The latest, by DataArt, took place in February 2026, with a retest in March 2026.',
	},
	{
		label: 'Data centers',
		html: 'ThingsBoard Cloud and Private Cloud run in data centers with ISO 27001, PCI DSS and SOC 2 attestations (AWS for ThingsBoard Cloud; AWS, Azure or GCP for Private Cloud).',
	},
];

export const AUDIT = {
	title: 'Using our compliance in your audit',
	text: 'You can certify the solution you build on ThingsBoard, for example to ISO/IEC 27001. Our ISO certificates count as supplier evidence in your audit, and under NDA we share the Statement of Applicability and audit reports.',
	controlsLead: "The platform gives you the controls auditors look for, so you don't need to build them from scratch:",
	controls: [
		{ label: 'Access control', href: tc('access') },
		{ label: 'An audit log', href: tc('access') },
		{ label: 'Encryption in transit', href: tc('data') },
		{ label: 'A choice of data region', href: tc('cloud') },
	],
	cta: {
		label: 'Request the Statement of Applicability',
		href: requestHref('statement-of-applicability'),
	},
};

export const PRIVACY = {
	title: 'Privacy and data protection',
	lead: 'We protect personal data under the GDPR and the CCPA through our own data protection program, backed by the same ISO 27001 controls.',
	commitments: [
		`Data stays in the EU on ThingsBoard Cloud’s <a href="${tc('cloud')}">EU region</a>, and never moves between regions.`,
		`Our <a href="${DPA_HREF}">DPA</a> includes standard-contractual-clause terms for transfers outside the EU (DPA §11).`,
		`Published <a href="${tc('subprocessors')}">sub-processors</a>, with notice of material changes.`,
		`<a href="${contactHref(SECURITY_TOPICS.dsr.value)}">Data subject requests</a> and breach notification as set out in our DPA.`,
	],
	laws: [
		{
			title: 'GDPR',
			icon: 'eu-stars',
			accent: 'brand',
			text: 'For personal data of people in the EU; we apply data minimization to all personal data we process. Our DPA includes standard-contractual-clause terms for transfers outside the EU (DPA §11).',
			href: tc('compliance/gdpr'),
		},
		{
			title: 'CCPA',
			icon: 'tabler:user-shield',
			accent: MARK_COLOR.graphite,
			text: "For personal information of California residents. We don't sell personal information.",
			href: tc('compliance/ccpa'),
		},
	],
	note: 'We declare our GDPR and CCPA compliance ourselves, and commit to GDPR contractually in our DPA.',
};

export interface CertPage {
	/** The page's title and crumb are the registry's (`@data/trust-center/pages`). */
	slug: string;
	lede: string;
	/** An ISO page: its Status row, the Certified badge with the issue line. */
	certified?: true;
	facts: Fact[];
}

/** The Certified badge's line on the ISO pages. */
export const CERTIFIED_NOTE = `Issued ${CERT_ISSUE.issued} by ${CERT_ISSUE.body}.`;

export const CERT_PAGES: CertPage[] = [
	{
		slug: 'iso-27001',
		lede: 'Information security management system, including Amendment 1:2024.',
		certified: true,
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
		certified: true,
		facts: [
			{ label: 'Registration No', html: `${ISO_9001.registration} · IAF Code 33`, copy: ISO_9001.registration },
			{ label: 'Validity', html: VALIDITY },
			{ label: 'For procurement', html: 'Use it as supplier evidence under clause 8.4 of your own QMS.' },
		],
	},
	{
		slug: 'gdpr',
		lede: 'We meet GDPR requirements through our own privacy program and declare our compliance.',
		facts: [
			{
				label: 'Scope of application',
				html: 'We apply data minimization to all personal data we process, wherever the person lives.',
			},
			{
				label: 'Legal basis',
				html: `When we process data on your behalf, the <a href="${DPA_HREF}">Data Processing Agreement</a> applies.`,
			},
			{
				label: 'Data residency',
				html: `ThingsBoard Cloud runs in two independent regions, North America and the EU, and data never moves between them. Private Cloud runs in North America, the EU or APAC. <a href="${tc('cloud')}">Cloud and Private Cloud</a>.`,
			},
			{
				label: 'International transfers',
				html: `Our <a href="${DPA_HREF}">DPA</a> includes standard-contractual-clause terms for transfers outside the EU (DPA §11).`,
			},
			{
				label: 'Sub-processors',
				html: `Every vendor that may access personal data is listed on our <a href="${tc('subprocessors')}">Sub-processors</a> page; we notify customers of material changes.`,
			},
			{
				label: 'Security of processing',
				html: `Our information security management system is certified to <a href="${tc('compliance/iso-27001')}">ISO/IEC 27001:2022</a>.`,
			},
			{
				label: 'Data subject requests',
				html: `We handle requests to access, correct or delete data under a documented procedure. Write to ${SECURITY_EMAIL}.`,
			},
			{
				label: 'Breach notification',
				html: 'Breaches go through our incident process. We notify affected parties and regulators as the law and our contracts require.',
			},
		],
	},
	{
		slug: 'ccpa',
		lede: 'We meet CCPA requirements through the same privacy program and declare our compliance.',
		facts: [
			{
				label: 'Consumer rights',
				html: `We handle requests to know, delete and correct personal information through the same procedure as GDPR requests. Write to ${SECURITY_EMAIL}.`,
			},
			{ label: 'Sale of data', html: 'We do not sell personal information.' },
		],
	},
];
