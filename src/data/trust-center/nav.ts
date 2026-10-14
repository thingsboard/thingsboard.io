/** The Trust Center's addresses, shared facts, mark colours and closing band. */

const TC_ROOT = '/trust-center/';

/** `tc('compliance/gdpr')` → `/trust-center/compliance/gdpr/`; `tc()` is the hub. */
export const tc = (path = ''): string => (path ? `${TC_ROOT}${path.replace(/^\/|\/$/g, '')}/` : TC_ROOT);

/** The contact page, prefilled with a topic and a ticked document. */
export const contactHref = (subject?: string, doc?: string): string => {
	const params = new URLSearchParams();
	if (subject) params.set('subject', subject);
	if (doc) params.set('doc', doc);
	const query = params.toString();
	return `${tc('contact')}${query ? `?${query}` : ''}`;
};

/** The colours the Trust Center's marks take (`ui/Mark`'s `accent`): the site's tokens. */
export const MARK_COLOR = {
	blue: 'var(--color-brand)',
	green: 'var(--brand-pe)',
	violet: 'var(--color-accent-violet)',
	cyan: 'var(--color-accent-cyan)',
	amber: 'var(--color-accent-amber)',
	graphite: 'var(--color-accent-graphite)',
} as const;

export const SECURITY_EMAIL = 'security@thingsboard.io';
export const DPA_HREF = '/products/paas/dpa/';
export const PRIVACY_POLICY_HREF = '/products/paas/privacy-policy/';

/** How soon NDA documents follow a signed NDA, and how soon a vulnerability report gets a reply. */
export const NDA_TURNAROUND = 'two business days';
export const REPORT_REPLY_TIME = 'three business days';

interface ClosingCard {
	title: string;
	line: string;
	href: string;
	icon: string;
	/** `data-accent` values defined in trust-center.scss (`library`, `alert`) or the kit's `brand`. */
	accent: 'brand' | 'library' | 'alert';
}

/** The band under every Trust Center page; "Read next" never repeats its links. */
export const CLOSING = {
	title: 'Can’t find what you need?',
	lead: 'Our security team answers questions, shares documents under NDA and handles vulnerability reports.',
	cards: [
		{
			title: 'Contact our security team',
			line: 'Questions, questionnaires and data requests.',
			href: tc('contact'),
			icon: 'tabler:message-circle',
			accent: 'brand',
		},
		{
			title: 'Get documents',
			line: 'Certificates and policies; request the NDA ones from the library.',
			href: tc('documents'),
			icon: 'tabler:file-text',
			accent: 'library',
		},
		{
			title: 'Report a vulnerability',
			line: `Tell us privately. We reply within ${REPORT_REPLY_TIME}.`,
			href: tc('report-vulnerability'),
			icon: 'tabler:shield-exclamation',
			accent: 'alert',
		},
	] satisfies ClosingCard[],
};
