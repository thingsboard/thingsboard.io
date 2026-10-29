import { ISO_27001, ISO_9001 } from '@data/trust-center/compliance';
import { ACCESS, DOCS_WITH_PAGE, type TcDoc } from '@data/trust-center/documents';
import { CLOSING, DPA_HREF, PRIVACY_POLICY_HREF, tc } from '@data/trust-center/nav';

/**
 * Every Trust Center page in one place: its title, crumb, card line and icon, read by the layout
 * (h1, breadcrumb), the hub's tiles and deployment cards, and "Read next".
 */

/** The Trust Center's last update, shown on the hub. */
export const TC_UPDATED = '2026-10-01';

export interface TcPage {
	href: string;
	title: string;
	/** The breadcrumb's label, where shorter than the title. */
	crumb?: string;
	/** The page the breadcrumb goes through, between the hub and this one. */
	parent?: string;
	line: string;
	icon: string;
	/** Also the "Next in …" label. */
	section?: 'Compliance' | 'Security' | 'Deployments';
	/** Hrefs to offer in "Read next", in order. */
	related?: string[];
}

const TC_PAGES: TcPage[] = [
	{
		href: tc('compliance'),
		title: 'Compliance',
		line: 'Independently verified security.',
		icon: 'tabler:shield-check',
		section: 'Compliance',
		related: [tc('appsec'), tc('product'), tc('onprem')],
	},
	{
		href: tc('compliance/iso-27001'),
		title: ISO_27001.title,
		crumb: 'ISO 27001',
		parent: tc('compliance'),
		line: 'Our certified information security management system.',
		icon: 'tabler:certificate',
		section: 'Compliance',
		related: [tc('documents/statement-of-applicability'), tc('documents/internal-audit-report-2026')],
	},
	{
		href: tc('compliance/iso-9001'),
		title: ISO_9001.title,
		crumb: 'ISO 9001',
		parent: tc('compliance'),
		line: 'Quality management, run as one system with information security.',
		icon: 'tabler:certificate',
		section: 'Compliance',
		related: [tc('compliance/iso-27001'), tc('documents/change-management-procedure')],
	},
	{
		href: tc('compliance/gdpr'),
		title: 'GDPR',
		parent: tc('compliance'),
		line: 'How our privacy program meets the GDPR.',
		icon: 'tabler:scale',
		section: 'Compliance',
		related: [DPA_HREF, PRIVACY_POLICY_HREF, tc('documents/data-protection-policy')],
	},
	{
		href: tc('compliance/ccpa'),
		title: 'CCPA',
		parent: tc('compliance'),
		line: 'The same privacy program, under the CCPA.',
		icon: 'tabler:scale',
		section: 'Compliance',
		related: [tc('subprocessors'), PRIVACY_POLICY_HREF],
	},

	{
		href: tc('data'),
		title: 'Data security',
		line: 'Your data stays protected.',
		icon: 'tabler:database',
		section: 'Security',
		related: [tc('subprocessors'), tc('cloud')],
	},
	{
		href: tc('product'),
		title: 'Product security',
		line: 'Security built into the product.',
		icon: 'tabler:cpu',
		section: 'Security',
		related: [tc('onprem'), tc('cloud')],
	},
	{
		href: tc('access'),
		title: 'Access control',
		line: 'You decide who sees what.',
		icon: 'tabler:lock',
		section: 'Security',
		related: [tc('data'), tc('product')],
	},
	{
		href: tc('appsec'),
		title: 'Dev security',
		line: 'Built through a secure process.',
		icon: 'tabler:code',
		section: 'Security',
		related: [tc('compliance/iso-27001'), tc('documents/pentest-executive-summary')],
	},

	{
		href: tc('cloud'),
		title: 'ThingsBoard Cloud and Private Cloud',
		crumb: 'Cloud and Private Cloud',
		line: 'We host and run the platform, so you can focus on your solution.',
		icon: 'tabler:cloud',
		section: 'Deployments',
		related: [tc('compliance/iso-27001'), tc('access')],
	},
	{
		href: tc('onprem'),
		title: 'On-premises',
		line: 'You run the platform; we provide the product code, security fixes and guides.',
		icon: 'tabler:server',
		section: 'Deployments',
		related: [tc('appsec'), tc('access')],
	},
	{
		href: tc('commitments'),
		title: 'Commitment and responsibility',
		line: 'What we promise and what we handle.',
		icon: 'tabler:clipboard-check',
		section: 'Deployments',
		related: [tc('compliance'), tc('compliance/iso-9001')],
	},

	{
		href: tc('documents'),
		title: 'Documents',
		line: 'Certificates, policies and reports, public or under NDA.',
		icon: 'tabler:file-text',
		related: [tc('compliance'), tc('data'), tc('commitments')],
	},
	{
		href: tc('subprocessors'),
		title: 'Sub-processors',
		line: 'The vendors that may access customer or personal data.',
		icon: 'tabler:building',
		related: [tc('compliance/gdpr'), tc('compliance/ccpa'), PRIVACY_POLICY_HREF],
	},

	// Off-site pages that `related` picks.
	{
		href: DPA_HREF,
		title: 'Data Processing Agreement (DPA)',
		line: 'Our contractual data protection terms.',
		icon: 'tabler:file-certificate',
	},
	{
		href: PRIVACY_POLICY_HREF,
		title: 'Privacy Policy',
		line: 'What personal data ThingsBoard Cloud processes, and your rights.',
		icon: 'tabler:shield-lock',
	},
];

const docPage = (d: TcDoc): TcPage => ({
	href: tc(`documents/${d.slug}`),
	title: d.name,
	parent: tc('documents'),
	line: `${d.category} · ${ACCESS[d.access].cardLabel}`,
	icon: d.access === 'public' ? 'tabler:file-text' : 'tabler:lock',
});

const byHref = new Map(TC_PAGES.map((p) => [p.href, p]));
const docByHref = new Map(DOCS_WITH_PAGE.map((d) => [tc(`documents/${d.slug}`), docPage(d)]));

/** Every page the Trust Center serves from the registry, document pages included (no off-site ones). */
export const SITE_PAGES: TcPage[] = [...TC_PAGES.filter((p) => p.href.startsWith(tc())), ...docByHref.values()];

/** The page at an href: a listed page or a document's detail page. */
export const pageAt = (href: string): TcPage | undefined => byHref.get(href) ?? docByHref.get(href);

const IN_CLOSING = CLOSING.cards.map((card) => card.href);

/**
 * "Read next": the next page in the section (wrapping), then `related`, then Compliance; three at most,
 * skipping the page itself, pages its content already links to (`linked`) and the closing band's.
 */
export const keepReading = (page: TcPage | undefined, linked: Set<string> = new Set(), count = 3): TcPage[] => {
	if (!page) return [];
	const siblings = page.section ? TC_PAGES.filter((p) => p.section === page.section) : [];
	const at = siblings.findIndex((p) => p.href === page.href);
	const following = at < 0 ? undefined : siblings[(at + 1) % siblings.length];
	const next =
		following && following.href !== page.href && page.section
			? { ...following, line: `Next in ${page.section}` }
			: undefined;
	const picks = [next, ...(page.related ?? []).map(pageAt), byHref.get(tc('compliance'))];
	const seen = new Set([page.href, ...linked, ...IN_CLOSING]);
	return picks.filter((p): p is TcPage => !!p && !seen.has(p.href) && !!seen.add(p.href)).slice(0, count);
};

/** The registry's page for a path, `tc('path')`'s; an unknown one fails the build. */
export const pageFor = (path: string): TcPage => {
	const found = pageAt(tc(path));
	if (!found) throw new Error(`[trust-center] no page "${path}"`);
	return found;
};

/** A page's breadcrumb: Trust Center › its parent, if any › the page. */
export const crumbsFor = (page: TcPage): { label: string; href?: string }[] => {
	const parent = page.parent ? byHref.get(page.parent) : undefined;
	return [
		{ label: 'Trust Center', href: tc() },
		...(parent ? [{ label: parent.crumb ?? parent.title, href: parent.href }] : []),
		{ label: page.crumb ?? page.title },
	];
};

// An unknown `related` href fails the build instead of silently dropping a card.
for (const p of TC_PAGES) {
	for (const r of p.related ?? []) {
		if (!pageAt(r)) throw new Error(`[trust-center] "${p.title}" picks an unknown page: ${r}`);
	}
}
