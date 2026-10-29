import { CERT_ISSUE, ISO_27001, ISO_9001 } from '@data/trust-center/compliance';
import {
	DPA_HREF,
	NDA_TURNAROUND,
	PRIVACY_POLICY_HREF,
	TERMS_OF_USE_HREF,
	requestHref,
	tc,
} from '@data/trust-center/nav';
import { isExternalHref } from '@util/external-links';

/**
 * The document library. `public`: View; `nda`: Request via the contact form; `pending`: planned, no action.
 * A public document with neither `file` nor `url` is awaiting its address and stays out of the library.
 */

export type Access = 'public' | 'nda' | 'pending';

type DocCategory =
	'Governance' | 'Compliance' | 'Security' | 'Legal' | 'Reports' | 'Resilience' | 'Questionnaires' | 'Operations';

export interface TcDoc {
	slug: string;
	name: string;
	category: DocCategory;
	access: Access;
	/** Unset until the document's owner gives one; the page shows a dash. */
	version?: string;
	owner?: string;
	/** Listed on the hub, in its category's group. */
	hub?: true;
	description: string;
	file?: string;
	/** A page the document is: opened directly, no detail page. */
	url?: string;
}

const linkMissing = (d: TcDoc): boolean => d.access === 'public' && !d.file && !d.url;

/** The hub's groups and the contact form's checklist groups, by category. */
const DOC_GROUPS: { name: string; icon: string; categories: DocCategory[] }[] = [
	{ name: 'Governance & compliance', icon: 'tabler:rosette-discount-check', categories: ['Governance', 'Compliance'] },
	{ name: 'Security policies', icon: 'tabler:shield-check', categories: ['Security'] },
	{ name: 'Legal & privacy', icon: 'tabler:scale', categories: ['Legal'] },
	{ name: 'Reports & resilience', icon: 'tabler:report-analytics', categories: ['Reports', 'Resilience'] },
];

/**
 * Everything an access state shows: its name (the document page's badge), its hint (a list's
 * hover), its icon, its action in a list and on the document page, and the badge's tone and note.
 */
export const ACCESS: Record<
	Access,
	{
		label: string;
		hint: string;
		/** The state on a document's card and in the library's access filter. */
		cardLabel: string;
		icon: string;
		listAction?: string;
		pageAction?: string;
		tone: 'ok' | 'nda' | 'flat';
		note?: string;
	}
> = {
	public: {
		label: 'Public',
		hint: 'Public',
		cardLabel: 'Public',
		icon: 'tabler:world',
		listAction: 'View',
		pageAction: 'View',
		tone: 'ok',
	},
	nda: {
		label: 'NDA',
		hint: 'NDA required',
		cardLabel: 'Under NDA',
		icon: 'tabler:lock',
		listAction: 'Request',
		pageAction: 'Request via NDA',
		tone: 'nda',
		note: `Released after a mutual NDA, usually within ${NDA_TURNAROUND}.`,
	},
	pending: {
		label: 'Planned',
		hint: 'Planned',
		cardLabel: 'Planned',
		icon: 'tabler:clock',
		tone: 'flat',
		note: 'Not published yet.',
	},
};

export const DOCS: TcDoc[] = [
	{
		slug: 'information-security-policy',
		name: 'Information Security Policy',
		category: 'Governance',
		access: 'nda',
		version: 'v1.2',
		owner: 'IMS Manager',
		hub: true,
		description:
			'The policy behind our information security management system: objectives, roles, our approach to risk and the policy framework. Approved by the CEO and shared with all staff and contractors.',
	},
	{
		slug: 'iso-27001-certificate',
		// The library opens the Compliance page; the action opens the file.
		url: ISO_27001.href,
		file: '/trust-center/files/thingsboard-iso-27001-certificate.pdf',
		name: 'ISO/IEC 27001:2022 certificate',
		category: 'Compliance',
		access: 'public',
		version: '09.09.2026',
		owner: CERT_ISSUE.body,
		hub: true,
		description: `Registration No ${ISO_27001.registration}, issued ${CERT_ISSUE.issued}, valid to ${CERT_ISSUE.expires}. Verify at ${CERT_ISSUE.validator}.`,
	},
	{
		slug: 'iso-9001-certificate',
		url: ISO_9001.href,
		file: '/trust-center/files/thingsboard-iso-9001-certificate.pdf',
		name: 'ISO 9001:2015 certificate',
		category: 'Compliance',
		access: 'public',
		version: '09.09.2026',
		owner: CERT_ISSUE.body,
		hub: true,
		description: `Registration No ${ISO_9001.registration} (IAF Code 33), issued ${CERT_ISSUE.issued}, valid to ${CERT_ISSUE.expires}. Verify at ${CERT_ISSUE.validator}.`,
	},
	{
		slug: 'statement-of-applicability',
		name: 'Statement of Applicability',
		category: 'Compliance',
		access: 'nda',
		version: 'v1.0',
		owner: 'IMS Manager',
		hub: true,
		description:
			'All 93 Annex A controls with their status and justification: 91 implemented, 1 implemented partially (A.8.12, data leakage prevention) and 1 not applicable (A.8.30).',
	},
	{
		slug: 'risk-assessment-report',
		name: 'Risk assessment and treatment report',
		category: 'Compliance',
		access: 'nda',
		version: 'v1.1',
		owner: 'IMS Manager',
		hub: true,
		description:
			'The scoring method, every assessed risk, treatment decisions and each residual risk accepted by management.',
	},
	{
		slug: 'secure-development-policy',
		name: 'Secure Development Policy',
		category: 'Security',
		access: 'nda',
		version: 'v1.0',
		owner: 'IMS Manager',
		hub: true,
		description:
			'Security across the engineering lifecycle: mandatory review, separate environments, weekly code and dependency scanning, and change control.',
	},
	{
		slug: 'change-management-procedure',
		name: 'Change Management Procedure',
		category: 'Security',
		access: 'nda',
		version: 'v1.0',
		owner: 'IMS Manager',
		hub: true,
		description:
			'How changes to our systems and processes are requested, assessed, approved, implemented and reviewed, tracked in Jira.',
	},
	{
		slug: 'incident-management-procedure',
		name: 'Incident Management Procedure',
		category: 'Security',
		access: 'nda',
		version: 'v1.0',
		owner: 'IMS Manager',
		hub: true,
		description: 'Reporting channels, severity classification, registration and escalation timings, evidence handling.',
	},
	{
		slug: 'supplier-security-policy',
		name: 'Supplier Security Policy',
		category: 'Security',
		access: 'nda',
		version: 'v1.0',
		owner: 'Legal Counsel',
		hub: true,
		description:
			'NDA before any access, security clauses in contracts, scored supplier evaluation with a minimum security rating, and annual supplier review.',
	},
	{
		slug: 'ai-services-policy',
		name: 'AI Services Policy',
		category: 'Security',
		access: 'nda',
		version: 'v1.0',
		owner: 'IMS Manager',
		hub: true,
		description:
			'Which data may reach AI services and how we control it, aligned with GDPR, the EU AI Act and the NIST AI RMF.',
	},
	{
		slug: 'private-cloud-architecture',
		name: 'Private Cloud cluster architecture and read-only metrics',
		category: 'Security',
		access: 'nda',
		owner: 'CTO',
		description:
			"Your Private Cloud cluster's architecture, with read-only access to its metrics and Kubernetes dashboards.",
	},
	{
		slug: 'terms-of-use',
		url: TERMS_OF_USE_HREF,
		name: 'Terms of Use (ThingsBoard Cloud)',
		category: 'Legal',
		access: 'public',
		version: 'current',
		owner: 'Legal Counsel',
		description: 'The terms under which you use ThingsBoard Cloud in North America and the EU.',
	},
	{
		slug: 'privacy-policy',
		url: PRIVACY_POLICY_HREF,
		name: 'Privacy Policy (ThingsBoard Cloud)',
		category: 'Legal',
		access: 'public',
		version: 'current',
		owner: 'Legal Counsel',
		hub: true,
		description:
			'What personal data ThingsBoard Cloud processes in North America and the EU, on what basis, for how long, and how you exercise your rights.',
	},
	{
		slug: 'data-processing-addendum',
		url: DPA_HREF,
		name: 'Data Processing Agreement (DPA)',
		category: 'Legal',
		access: 'public',
		version: 'current',
		owner: 'Legal Counsel',
		hub: true,
		description:
			'Contractual data protection terms: processor obligations, sub-processor rules, transfer mechanisms and breach notification.',
	},
	{
		slug: 'sub-processor-list',
		url: tc('subprocessors'),
		name: 'Sub-processor list',
		category: 'Legal',
		access: 'public',
		version: 'living',
		owner: 'IMS Manager',
		hub: true,
		description:
			'Every vendor that may access customer or personal data, with its purpose, location and assessment status.',
	},
	{
		slug: 'data-protection-policy',
		name: 'Privacy Policy (Product Data Protection Policy)',
		category: 'Legal',
		access: 'nda',
		version: 'v1.0',
		owner: 'IMS Manager',
		hub: true,
		description: 'Our internal rules for protecting personal data, including privacy by design.',
	},
	{
		slug: 'pentest-executive-summary',
		name: 'Penetration test executive summary',
		category: 'Reports',
		access: 'nda',
		version: 'Mar 2026',
		owner: 'CTO',
		hub: true,
		description:
			"Scope, methodology (OWASP, OSSTMM, NIST SP 800-115) and an overview of findings and remediation. We don't share the full report with anyone.",
	},
	{
		slug: 'internal-audit-report-2026',
		name: 'Internal audit report 2026',
		category: 'Reports',
		access: 'nda',
		version: 'Jul 2026',
		owner: 'IMS Manager',
		hub: true,
		description:
			'Full-scope audit of both standards by an independent contractor (30 June – 1 July 2026): no major and 3 minor nonconformities, with the deadline for corrective actions.',
	},
	{
		slug: 'bcp-drp',
		name: 'Business Continuity Plan',
		category: 'Resilience',
		access: 'nda',
		version: 'v1.0',
		owner: 'IMS Manager',
		hub: true,
		description:
			'Continuity of company operations: crisis team, emergency response, alternate sites and the exercise program.',
	},
	{
		slug: 'backup-policy',
		name: 'Backup Policy',
		category: 'Resilience',
		access: 'nda',
		version: 'v1.0',
		owner: 'IMS Manager',
		hub: true,
		description:
			'Encryption, separation from primary systems, archiving media and deadlines, and the annual restore test.',
	},
	{
		slug: 'caiq-lite',
		name: 'CAIQ Lite',
		category: 'Questionnaires',
		access: 'pending',
		owner: 'IMS Manager',
		description:
			"Our self-assessment against the Cloud Security Alliance's Consensus Assessment Initiative Questionnaire (Lite).",
	},
	{
		slug: 'sig-lite',
		name: 'SIG Lite',
		category: 'Questionnaires',
		access: 'pending',
		owner: 'IMS Manager',
		description: 'Our answers to the Standardized Information Gathering (Lite) questionnaire.',
	},
	{
		slug: 'private-cloud-sla',
		url: '/pricing/?product=thingsboard-private-cloud',
		name: 'Private Cloud SLA and service description',
		category: 'Legal',
		access: 'public',
		description: 'The uptime formula and exclusions for Private Cloud, in the Private Cloud pricing FAQ.',
	},
	{
		slug: 'license-server',
		url: '/docs/license-server/what-is-license-server/',
		name: 'License server and client information',
		category: 'Operations',
		access: 'public',
		description:
			'How the license server and its client work: subscriptions, perpetual licenses, activation and the connection to license.thingsboard.io.',
	},
	{
		slug: 'license-agreement',
		url: '/legal/license-agreement/',
		name: 'ThingsBoard License Agreement (for on-premises deployed software)',
		category: 'Legal',
		access: 'public',
		description: 'The agreement governing paid commercial licenses to the ThingsBoard Software.',
	},
	{
		slug: 'support-services',
		url: '/services/',
		name: 'Support services information',
		category: 'Operations',
		access: 'public',
		description: 'Our support plans and response targets, managed platform operations and on-demand experts.',
	},
];

export const LIBRARY_DOCS = DOCS.filter((d) => !linkMissing(d));

/** A document that is a page opens that page; the rest open their detail page. */
export const docHref = (d: TcDoc): string => d.url ?? tc(`documents/${d.slug}`);

/** The documents with a detail page. */
export const DOCS_WITH_PAGE = LIBRARY_DOCS.filter((d) => !d.url);

const publicFirst = (docs: TcDoc[]) => [
	...docs.filter((d) => d.access === 'public'),
	...docs.filter((d) => d.access !== 'public'),
];

/** The hub's groups with their documents, the public ones first. Computed once, not per render. */
export const HUB_GROUPS = DOC_GROUPS.map((group) => ({
	...group,
	docs: publicFirst(LIBRARY_DOCS.filter((d) => d.hub && group.categories.includes(d.category))),
}));

/** The library's categories, in order of first appearance: the Documents page's filter. */
export const DOC_CATEGORIES = [...new Set(LIBRARY_DOCS.map((d) => d.category))];

/** A public document's file (else its page); an NDA one's request form; none if planned. */
export const docActionHref = (d: TcDoc): string | undefined => {
	if (d.access === 'public') return d.file ?? d.url;
	if (d.access === 'nda') return requestHref(d.slug);
	return undefined;
};

/** An off-site address or the document's own file (a PDF): either opens in a new tab. */
export const opensInNewTab = (d: TcDoc, href: string): boolean => href === d.file || isExternalHref(href);

const ndaDocs = LIBRARY_DOCS.filter((d) => d.access === 'nda');
const ungrouped = ndaDocs.filter((d) => !DOC_GROUPS.some((g) => g.categories.includes(d.category)));
if (ungrouped.length) throw new Error(`[trust-center] NDA documents in no group: ${ungrouped.map((d) => d.slug)}`);

/** The contact form's NDA documents, in the hub's groups. */
export const REQUEST_GROUPS = DOC_GROUPS.map((g) => ({
	name: g.name,
	docs: ndaDocs.filter((d) => g.categories.includes(d.category)).map((d) => ({ value: d.slug, label: d.name })),
})).filter((g) => g.docs.length > 0);

export interface DocAction {
	label: string;
	href: string;
	/** Opens in a new tab: off-site, or the document's file. */
	external?: boolean;
	/** No address yet: "Link needed" in the action's place. */
	missing?: boolean;
}

/** A list row's actions: View, Request, "Link needed", or none for a planned document. */
export const docActions = (d: TcDoc): DocAction[] => {
	if (d.access === 'pending') return [];
	const href = docActionHref(d);
	if (!href) return [{ label: 'View', href: '#', missing: true }];
	const label = ACCESS[d.access].listAction;
	return label ? [{ label, href, external: opensInNewTab(d, href) }] : [];
};

/** A library document as a deployment page's row, optionally under another name. */
export const docRow = (slug: string, name?: string) => {
	const d = DOCS.find((doc) => doc.slug === slug);
	if (!d) throw new Error(`[trust-center] no document "${slug}"`);
	return { name: name ?? d.name, access: d.access, actions: docActions(d) };
};
