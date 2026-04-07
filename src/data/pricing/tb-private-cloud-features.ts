import type { ComparisonRow } from './types';

export const pcFeatureHeaders = ['Launch', 'Growth', 'Scale', 'Enterprise'];

export const pcFeatureRows: ComparisonRow[] = [
	{
		feature: 'Automatic backups',
		values: [true, true, true, true],
		faqId: 'tb-private-cloud-what-is-automatic-backup',
	},
	{
		feature: '24/7 Monitoring',
		values: [true, true, true, true],
		faqId: 'tb-private-cloud-what-is-included-in-the-monthly-subscription-fee',
	},
	{
		feature: 'Production support',
		values: [true, true, true, true],
	},
	{
		feature: 'Engineering support',
		values: ['Contact us', 'Contact us', 'Contact us', true],
	},
	{
		feature: 'NoSQL Database',
		values: ['SQL + NoSQL', 'SQL + NoSQL', 'SQL + NoSQL', 'SQL + NoSQL'],
		faqId: 'tb-private-cloud-what-are-the-database-options-in-each-plan',
	},
	{
		feature: 'Custom data retention policies',
		values: [true, true, true, true],
		faqId: 'tb-private-cloud-what-are-custom-data-retention-policies',
	},
	{
		feature: 'Geo-region deployment choice',
		values: [true, true, true, true],
		faqId: 'tb-private-cloud-what-does-geo-region-deployment-selection-include',
	},
	{
		feature: 'Multi-AZ database replication',
		values: [true, true, true, true],
		faqId: 'tb-private-cloud-what-does-multi-az-database-replication-mean',
	},
	{
		feature: 'Priority Support Channel',
		values: [false, true, true, true],
	},
	{
		feature: 'High availability services',
		values: [false, false, true, true],
		faqId: 'tb-private-cloud-are-high-availability-services-available-as-an-add-on',
	},
	{
		feature: 'Maintenance window picking',
		values: [false, false, true, true],
		faqId: 'tb-private-cloud-can-i-choose-a-specific-maintenance-window',
	},
	{
		feature: 'Service reviews & architecture consults',
		values: [false, false, true, true],
		faqId: 'tb-private-cloud-what-is-included-in-service-reviews-and-architecture-consultations',
	},
	{
		feature: 'Dedicated customer success engineer',
		values: [false, false, false, true],
	},
];
