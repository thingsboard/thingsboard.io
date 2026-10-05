/**
 * FAQ shown on /products/thingsboard-pe/, assembled from the pricing page's
 * On-premises FAQ so the two pages cannot drift. The Edge and Trendz add-on
 * categories are left out: their answers open the pricing page's plan
 * calculator, which does not exist on the product page.
 */
import { pickCategory } from '@data/pricing/faq/pick-category';
import { tbSelfManagedFaq } from '@data/pricing/faq/tb-self-managed';
import type { FaqCategory } from '@data/pricing/types';

const ONPREM_CATEGORIES = [
	'general',
	'billingAndPayments',
	'usageDeploymentsAndLimits',
	'securityAndCompliance',
	'trialsCancellationsAndRefunds',
	'supportAndAssistance',
];

export const onPremFaq: FaqCategory[] = ONPREM_CATEGORIES.map((id) => pickCategory(tbSelfManagedFaq, id, 'onprem-faq'));

// `data-open-calc` links are wired up by /pricing/ alone; elsewhere they are a
// dead `href="#"`. The exclusion above is by category, but the links are per
// item — assert item-wise so a new one fails the build instead of shipping.
for (const category of onPremFaq) {
	for (const item of category.items) {
		if (item.answer.includes('data-open-calc')) {
			throw new Error(`onprem-faq: item "${item.id}" (${category.id}) links to the pricing page's plan calculator`);
		}
	}
}
