import type { FaqCategory } from '../types';

import { tbCloudFaq } from './tb-cloud';
import { tbPrivateCloudFaq } from './tb-private-cloud';
import { tbSelfManagedFaq } from './tb-self-managed';

export interface FaqContextData {
	contextId: string;
	title: string;
	categories: FaqCategory[];
}

export const pricingFaqData: FaqContextData[] = [
	{ contextId: 'thingsboard-cloud', title: 'ThingsBoard Cloud FAQs', categories: tbCloudFaq },
	{ contextId: 'thingsboard-private-cloud', title: 'ThingsBoard Private Cloud FAQs', categories: tbPrivateCloudFaq },
	{ contextId: 'thingsboard-pe', title: 'ThingsBoard On-premises FAQs', categories: tbSelfManagedFaq },
];
