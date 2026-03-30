import type { FaqCategory } from '../types';

import { tbCeFaq } from './tb-ce';
import { tbCloudFaq } from './tb-cloud';
import { tbPrivateCloudFaq } from './tb-private-cloud';
import { tbSelfManagedFaq } from './tb-self-managed';
import { tbmqCeFaq } from './tbmq-ce';
import { tbmqSelfManagedPaygFaq } from './tbmq-self-managed-payg';
import { tbmqSelfManagedPerpFaq } from './tbmq-self-managed-perp';
import { tbmqPrivateCloudFaq } from './tbmq-private-cloud';

export interface FaqContextData {
	contextId: string;
	title: string;
	categories: FaqCategory[];
}

export const pricingFaqData: FaqContextData[] = [
	{ contextId: 'thingsboard-ce', title: 'ThingsBoard Community Edition FAQs', categories: tbCeFaq },
	{ contextId: 'thingsboard-cloud', title: 'ThingsBoard Cloud FAQs', categories: tbCloudFaq },
	{ contextId: 'thingsboard-private-cloud', title: 'ThingsBoard Private Cloud FAQs', categories: tbPrivateCloudFaq },
	{ contextId: 'thingsboard-pe', title: 'ThingsBoard Self-managed FAQs', categories: tbSelfManagedFaq },
	{ contextId: 'tbmq-ce', title: 'TBMQ Community Edition FAQs', categories: tbmqCeFaq },
	{ contextId: 'tbmq-pe-payg', title: 'TBMQ Self-managed Pay-as-you-go FAQs', categories: tbmqSelfManagedPaygFaq },
	{ contextId: 'tbmq-pe-perpetual', title: 'TBMQ Self-managed Perpetual FAQs', categories: tbmqSelfManagedPerpFaq },
	{ contextId: 'tbmq-private-cloud', title: 'TBMQ Private Cloud FAQs', categories: tbmqPrivateCloudFaq },
];
