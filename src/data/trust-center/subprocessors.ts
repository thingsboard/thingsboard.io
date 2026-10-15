import { text, type ComparisonRow } from '@models/product-comparison';

/** The Sub-processors page's table and note. */

interface Subprocessor {
	vendor: string;
	purpose: string;
	location: string;
}

const SUBPROCESSORS: Subprocessor[] = [
	{
		vendor: 'Amazon Web Services (AWS)',
		purpose: 'Hosting for ThingsBoard Cloud and Private Cloud',
		location: 'North America or EU for ThingsBoard Cloud; North America, EU or APAC for Private Cloud',
	},
	{ vendor: 'Google Cloud', purpose: 'Private Cloud hosting, on request', location: 'The region you choose' },
	{ vendor: 'Microsoft Azure', purpose: 'Private Cloud hosting, on request', location: 'The region you choose' },
	{ vendor: 'netcup', purpose: 'Development instances for Private Cloud', location: 'Germany' },
	{ vendor: 'Cloudflare', purpose: 'DNS, CDN and DDoS protection', location: 'Global network (USA)' },
	{ vendor: 'Google Workspace', purpose: 'Email, documents, identity', location: 'USA' },
	{ vendor: 'Microsoft 365', purpose: 'Email, documents, identity', location: 'USA' },
	{ vendor: 'Atlassian', purpose: 'Issue tracking', location: 'USA, Australia' },
	{ vendor: 'Slack', purpose: 'Internal communication', location: 'USA' },
	{ vendor: 'PeopleForce', purpose: 'HR management', location: 'United Kingdom' },
	{ vendor: 'Pipedrive', purpose: 'CRM', location: 'Estonia' },
	{ vendor: 'Stripe', purpose: 'Payments', location: 'USA, Ireland' },
	{ vendor: 'QuickBooks (Intuit)', purpose: 'Accounting', location: 'USA' },
	{ vendor: 'OpenAI', purpose: 'AI services under the AI Services Policy', location: 'USA' },
	{ vendor: 'Google (Gemini)', purpose: 'AI services under the AI Services Policy', location: 'USA' },
	{ vendor: 'Anthropic', purpose: 'AI services under the AI Services Policy', location: 'USA' },
];

// CLARIFY (Legal): whether the DPA gets a clause on notifying customers of sub-processor changes.
export const SUBPROCESSORS_NOTE =
	"Location means the hosting region for infrastructure providers and the country of the contracting entity for other vendors; exact data regions are set out in each vendor's DPA if applicable. We notify customers of material changes to this list.";

/** The list as the page's table rows: the vendor, its purpose and location. */
export const SUBPROCESSOR_ROWS: ComparisonRow[] = SUBPROCESSORS.map((s) => ({
	label: s.vendor,
	values: [text(s.purpose), text(s.location)],
}));
