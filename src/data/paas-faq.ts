/**
 * FAQ shown on /products/paas/, assembled from the pricing FAQ so the two pages
 * cannot drift: the ThingsBoard Cloud categories are reused wholesale (minus the
 * Trendz and Edge add-on categories, which belong to the pricing context), and
 * the Private Cloud "General" category is appended as its own tab.
 *
 * Item ids do not collide across the two sources: every Private Cloud item is
 * `tb-private-cloud-*` and no ThingsBoard Cloud item uses that prefix (most are
 * `tb-cloud-*`, a few are bare, e.g. `migrate-cloud-to-sm`,
 * `how-tb-cloud-billing-works`), so anchors and the FAQPage JSON-LD stay
 * collision-free.
 */
import { tbCloudFaq } from '@data/pricing/faq/tb-cloud';
import { tbPrivateCloudFaq } from '@data/pricing/faq/tb-private-cloud';
import { pickCategory } from '@data/pricing/faq/pick-category';
import type { FaqCategory } from '@data/pricing/types';

const PUBLIC_CLOUD_CATEGORIES = [
	'general',
	'billingAndPayments',
	'usageAndLimits',
	'securityAndCompliance',
	'trialsCancellationsAndRefunds',
	'supportAndAssistance',
];

const privateCloudGeneral = pickCategory(tbPrivateCloudFaq, 'general', 'tb-private-cloud');

// Answers that send the reader to the pricing page's plan calculator, which does
// not exist on the Cloud product page. Like `pickCategory`, fail the build if an
// id no longer matches — a renamed item would otherwise silently reappear here.
const PRICING_PAGE_ONLY_ITEMS = new Set(['tb-private-cloud-what-are-the-prerequisites-to-get-started']);
for (const id of PRICING_PAGE_ONLY_ITEMS) {
	if (!privateCloudGeneral.items.some((item) => item.id === id)) {
		throw new Error(`paas-faq: excluded item "${id}" no longer exists in tb-private-cloud general`);
	}
}

export const paasFaq: FaqCategory[] = [
	...PUBLIC_CLOUD_CATEGORIES.map((id) => pickCategory(tbCloudFaq, id, 'tb-cloud')),
	// Distinct id: the ThingsBoard Cloud set already owns 'general'.
	{
		id: 'privateCloud',
		label: 'Private Cloud',
		items: privateCloudGeneral.items.filter((item) => !PRICING_PAGE_ONLY_ITEMS.has(item.id)),
	},
];
