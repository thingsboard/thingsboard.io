/**
 * Centralized redirect rules for old Jekyll docs URLs → new Astro docs URLs.
 *
 * This file is the single source of truth for all redirect mappings.
 * It is consumed by:
 *   - Page-based redirect files in src/pages/docs/ (Astro.redirect)
 *   - scripts/generate-redirects.ts (generates public/_redirects and public/redirects.json)
 *
 * Redirect types:
 *   PREFIX_RENAME  — tree-preserving 1:1 (old prefix/* → new prefix/*)
 *   CONSOLIDATE    — many-to-one fan-in (old prefix/* → single target page)
 *   SINGLE         — one page moved to a different path
 *   GONE           — page removed, redirect to fallback
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RedirectEntry {
	/** Slug relative to the catch-all prefix (e.g. 'docker' or 'upgrade-instructions/docker/v3-0-x') */
	slug: string;
	/** Absolute target path with trailing slash (e.g. '/docs/installation/docker/') */
	target: string;
}

export interface CatchAllRedirect {
	/** Old path prefix (no leading/trailing slash). Maps to a [...slug].astro file at this location. */
	oldPrefix: string;
	/** Redirect entries — each slug is relative to oldPrefix */
	entries: RedirectEntry[];
}

export interface SingleRedirect {
	/** Old path (no leading/trailing slash, e.g. 'user-guide/audit-log') */
	oldPath: string;
	/** Absolute target path with trailing slash (e.g. '/docs/user-guide/security/audit-log/') */
	target: string;
}

// ---------------------------------------------------------------------------
// Helpers for generating upgrade instruction redirects
// ---------------------------------------------------------------------------

import { UPGRADE_FAMILIES, getFamilySlug } from '../models/upgrade-instructions.ts';

const PLATFORMS = ['ubuntu', 'centos', 'windows', 'docker', 'docker-compose'];

function buildUpgradeRedirectEntries(newPrefix: string): RedirectEntry[] {
	const entries: RedirectEntry[] = [];
	for (const family of UPGRADE_FAMILIES) {
		const familySlug = getFamilySlug(family);
		for (const platform of PLATFORMS) {
			entries.push({
				slug: `${platform}/${familySlug}`,
				target: `/docs/${newPrefix}/${platform}/${familySlug}/`,
			});
		}
	}
	return entries;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

/**
 * Catch-all redirect groups.
 * Each group maps to one [...slug].astro file under src/pages/docs/{oldPrefix}/.
 * Add new groups here when the user provides a prefix-level redirect mapping.
 */
export const CATCH_ALL_REDIRECTS: CatchAllRedirect[] = [
	// Rule engine nodes: user-guide/rule-engine-2-0/nodes/* → reference/rule-engine/nodes/*
	// Entries generated dynamically by [..slug].astro via getCollection('docs').
	// Listed here for public/_redirects and redirects.json generation.
	{
		oldPrefix: 'user-guide/rule-engine-2-0/nodes',
		entries: [], // PREFIX_RENAME — splat rule in _redirects, JSON populated by generate script
	},
	{
		oldPrefix: 'pe/user-guide/rule-engine-2-0/nodes',
		entries: [],
	},
	{
		oldPrefix: 'paas/user-guide/rule-engine-2-0/nodes',
		entries: [],
	},
	{
		oldPrefix: 'paas/eu/user-guide/rule-engine-2-0/nodes',
		entries: [],
	},
	{
		oldPrefix: 'user-guide/install/upgrade-instructions',
		entries: buildUpgradeRedirectEntries('installation/upgrade-instructions'),
	},
	{
		oldPrefix: 'user-guide/install/pe/upgrade-instructions',
		entries: buildUpgradeRedirectEntries('pe/installation/upgrade-instructions'),
	},
];

/**
 * Individual page redirects.
 * Each entry maps to a single .astro file at src/pages/docs/{oldPath}.astro.
 * Add entries here for one-off page renames or removed pages.
 */
export const SINGLE_REDIRECTS: SingleRedirect[] = [
	{ oldPath: 'api', target: '/docs/apis-and-sdks/' },
	{ oldPath: 'pe/api', target: '/docs/pe/apis-and-sdks/' },
	{ oldPath: 'paas/api', target: '/docs/paas/apis-and-sdks/' },
	{ oldPath: 'paas/eu/api', target: '/docs/paas/eu/apis-and-sdks/' },
	{ oldPath: 'domains', target: '/docs/user-guide/security/domains/' },
	{ oldPath: 'pe/domains', target: '/docs/pe/user-guide/security/domains/' },
	{ oldPath: 'paas/domains', target: '/docs/paas/user-guide/security/domains/' },
	{ oldPath: 'paas/eu/domains', target: '/docs/paas/eu/user-guide/security/domains/' },
	{ oldPath: 'getting-started-guides/connectivity', target: '/docs/user-guide/connectivity-guide/' },
	{ oldPath: 'pe/getting-started-guides/connectivity', target: '/docs/pe/user-guide/connectivity-guide/' },
	{ oldPath: 'paas/getting-started-guides/connectivity', target: '/docs/paas/user-guide/connectivity-guide/' },
	{ oldPath: 'paas/eu/getting-started-guides/connectivity', target: '/docs/paas/eu/user-guide/connectivity-guide/' },
	{ oldPath: 'getting-started-guides/helloworld', target: '/docs/getting-started/' },
	{ oldPath: 'pe/getting-started-guides/helloworld', target: '/docs/pe/getting-started/' },
	{ oldPath: 'paas/getting-started-guides/helloworld', target: '/docs/paas/getting-started/' },
	{ oldPath: 'paas/eu/getting-started-guides/helloworld', target: '/docs/paas/eu/getting-started/' },
	{ oldPath: 'getting-started-guides/what-is-thingsboard', target: '/docs/why-thingsboard/' },
	{ oldPath: 'pe/getting-started-guides/what-is-thingsboard', target: '/docs/pe/why-thingsboard/' },
	{ oldPath: 'paas/getting-started-guides/what-is-thingsboard', target: '/docs/paas/why-thingsboard/' },
	{ oldPath: 'paas/eu/getting-started-guides/what-is-thingsboard', target: '/docs/paas/eu/why-thingsboard/' },
	{ oldPath: 'faq', target: '/docs/why-thingsboard/' },
	{ oldPath: 'pe/faq', target: '/docs/pe/why-thingsboard/' },
	{ oldPath: 'paas/faq', target: '/docs/paas/why-thingsboard/' },
	{ oldPath: 'paas/eu/faq', target: '/docs/paas/eu/why-thingsboard/' },
	{ oldPath: 'mobile-center/mobile-center', target: '/docs/user-guide/mobile-app-center/' },
	{ oldPath: 'pe/mobile-center/mobile-center', target: '/docs/pe/user-guide/mobile-app-center/' },
	{ oldPath: 'paas/mobile-center/mobile-center', target: '/docs/paas/user-guide/mobile-app-center/' },
	{ oldPath: 'paas/eu/mobile-center/mobile-center', target: '/docs/paas/eu/user-guide/mobile-app-center/' },
	{ oldPath: 'mobile-center/applications', target: '/docs/user-guide/mobile-app-center/applications/' },
	{ oldPath: 'pe/mobile-center/applications', target: '/docs/pe/user-guide/mobile-app-center/applications/' },
	{ oldPath: 'paas/mobile-center/applications', target: '/docs/paas/user-guide/mobile-app-center/applications/' },
	{ oldPath: 'paas/eu/mobile-center/applications', target: '/docs/paas/eu/user-guide/mobile-app-center/applications/' },
	{ oldPath: 'reference/monolithic', target: '/docs/reference/architecture/monolithic/' },
	{ oldPath: 'pe/reference/monolithic', target: '/docs/pe/reference/architecture/monolithic/' },
	{ oldPath: 'reference/performance', target: '/docs/reference/architecture/performance/' },
	{ oldPath: 'pe/reference/performance', target: '/docs/pe/reference/architecture/performance/' },
	{ oldPath: 'reference/msa', target: '/docs/reference/architecture/microservices/' },
	{ oldPath: 'pe/reference/msa', target: '/docs/pe/reference/architecture/microservices/' },
	{ oldPath: 'user-guide/attributes', target: '/docs/user-guide/digital-twins/attributes/' },
	{ oldPath: 'pe/user-guide/attributes', target: '/docs/pe/user-guide/digital-twins/attributes/' },
	{ oldPath: 'paas/user-guide/attributes', target: '/docs/paas/user-guide/digital-twins/attributes/' },
	{ oldPath: 'paas/eu/user-guide/attributes', target: '/docs/paas/eu/user-guide/digital-twins/attributes/' },
	{ oldPath: 'user-guide/audit-log', target: '/docs/user-guide/security/audit-log/' },
	{ oldPath: 'pe/user-guide/audit-log', target: '/docs/pe/user-guide/security/audit-log/' },
	{ oldPath: 'paas/user-guide/audit-log', target: '/docs/paas/user-guide/security/audit-log/' },
	{ oldPath: 'paas/eu/user-guide/audit-log', target: '/docs/paas/eu/user-guide/security/audit-log/' },
	{ oldPath: 'user-guide/calculated-fields/geofencing-calculated-field', target: '/docs/user-guide/calculated-fields/geofencing/' },
	{ oldPath: 'pe/user-guide/calculated-fields/geofencing-calculated-field', target: '/docs/pe/user-guide/calculated-fields/geofencing/' },
	{ oldPath: 'paas/user-guide/calculated-fields/geofencing-calculated-field', target: '/docs/paas/user-guide/calculated-fields/geofencing/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/geofencing-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/geofencing/' },
	{ oldPath: 'user-guide/calculated-fields/propagation-calculated-field', target: '/docs/user-guide/calculated-fields/propagation/' },
	{ oldPath: 'pe/user-guide/calculated-fields/propagation-calculated-field', target: '/docs/pe/user-guide/calculated-fields/propagation/' },
	{ oldPath: 'paas/user-guide/calculated-fields/propagation-calculated-field', target: '/docs/paas/user-guide/calculated-fields/propagation/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/propagation-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/propagation/' },
	{ oldPath: 'user-guide/calculated-fields/related-entities-aggregation-calculated-field', target: '/docs/user-guide/calculated-fields/related-entities-aggregation/' },
	{ oldPath: 'pe/user-guide/calculated-fields/related-entities-aggregation-calculated-field', target: '/docs/pe/user-guide/calculated-fields/related-entities-aggregation/' },
	{ oldPath: 'paas/user-guide/calculated-fields/related-entities-aggregation-calculated-field', target: '/docs/paas/user-guide/calculated-fields/related-entities-aggregation/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/related-entities-aggregation-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/related-entities-aggregation/' },
	{ oldPath: 'user-guide/calculated-fields/script-calculated-field', target: '/docs/user-guide/calculated-fields/script/' },
	{ oldPath: 'pe/user-guide/calculated-fields/script-calculated-field', target: '/docs/pe/user-guide/calculated-fields/script/' },
	{ oldPath: 'paas/user-guide/calculated-fields/script-calculated-field', target: '/docs/paas/user-guide/calculated-fields/script/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/script-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/script/' },
	{ oldPath: 'user-guide/calculated-fields/simple-calculated-field', target: '/docs/user-guide/calculated-fields/simple/' },
	{ oldPath: 'pe/user-guide/calculated-fields/simple-calculated-field', target: '/docs/pe/user-guide/calculated-fields/simple/' },
	{ oldPath: 'paas/user-guide/calculated-fields/simple-calculated-field', target: '/docs/paas/user-guide/calculated-fields/simple/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/simple-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/simple/' },
	{ oldPath: 'user-guide/calculated-fields/time-series-data-aggregation-calculated-field', target: '/docs/user-guide/calculated-fields/time-series-data-aggregation/' },
	{ oldPath: 'pe/user-guide/calculated-fields/time-series-data-aggregation-calculated-field', target: '/docs/pe/user-guide/calculated-fields/time-series-data-aggregation/' },
	{ oldPath: 'paas/user-guide/calculated-fields/time-series-data-aggregation-calculated-field', target: '/docs/paas/user-guide/calculated-fields/time-series-data-aggregation/' },
	{ oldPath: 'paas/eu/user-guide/calculated-fields/time-series-data-aggregation-calculated-field', target: '/docs/paas/eu/user-guide/calculated-fields/time-series-data-aggregation/' },
	{ oldPath: 'user-guide/entities-and-relations', target: '/docs/user-guide/digital-twins/entities/' },
	{ oldPath: 'pe/user-guide/entities-and-relations', target: '/docs/pe/user-guide/digital-twins/entities/' },
	{ oldPath: 'paas/user-guide/entities-and-relations', target: '/docs/paas/user-guide/digital-twins/entities/' },
	{ oldPath: 'paas/eu/user-guide/entities-and-relations', target: '/docs/paas/eu/user-guide/digital-twins/entities/' },
	{ oldPath: 'user-guide/telemetry', target: '/docs/user-guide/digital-twins/time-series-data/' },
	{ oldPath: 'pe/user-guide/telemetry', target: '/docs/pe/user-guide/digital-twins/time-series-data/' },
	{ oldPath: 'paas/user-guide/telemetry', target: '/docs/paas/user-guide/digital-twins/time-series-data/' },
	{ oldPath: 'paas/eu/user-guide/telemetry', target: '/docs/paas/eu/user-guide/digital-twins/time-series-data/' },
	{ oldPath: 'user-guide/install/building-from-source', target: '/docs/installation/building-from-source/' },
	{ oldPath: 'user-guide/install/pe/building-from-source', target: '/docs/pe/installation/building-from-source/' },
	{ oldPath: 'user-guide/install/config', target: '/docs/reference/configuration/how-to-change-config/' },
	{ oldPath: 'user-guide/install/pe/config', target: '/docs/pe/reference/configuration/how-to-change-config/' },
	{ oldPath: 'user-guide/install/docker', target: '/docs/installation/docker/' },
	{ oldPath: 'user-guide/install/pe/docker', target: '/docs/pe/installation/docker/' },
	{ oldPath: 'user-guide/install/docker-windows', target: '/docs/installation/docker-windows/' },
	{ oldPath: 'user-guide/install/pe/docker-windows', target: '/docs/pe/installation/docker-windows/' },
	{ oldPath: 'user-guide/install/installation-options', target: '/docs/installation/' },
	{ oldPath: 'user-guide/install/pe/installation-options', target: '/docs/pe/installation/' },
	{ oldPath: 'user-guide/install/rhel', target: '/docs/installation/rhel/' },
	{ oldPath: 'user-guide/install/pe/rhel', target: '/docs/pe/installation/rhel/' },
	{ oldPath: 'user-guide/install/rpi', target: '/docs/installation/rpi/' },
	{ oldPath: 'user-guide/install/pe/rpi', target: '/docs/pe/installation/rpi/' },
	{ oldPath: 'user-guide/install/ubuntu', target: '/docs/installation/ubuntu/' },
	{ oldPath: 'user-guide/install/pe/ubuntu', target: '/docs/pe/installation/ubuntu/' },
	{ oldPath: 'reference/filters/message-type-filter', target: '/docs/reference/rule-engine/nodes/filter/message-type-filter/' },
	{ oldPath: 'pe/reference/filters/message-type-filter', target: '/docs/pe/reference/rule-engine/nodes/filter/message-type-filter/' },
	{ oldPath: 'paas/reference/filters/message-type-filter', target: '/docs/paas/reference/rule-engine/nodes/filter/message-type-filter/' },
	{ oldPath: 'paas/eu/reference/filters/message-type-filter', target: '/docs/paas/eu/reference/rule-engine/nodes/filter/message-type-filter/' },
	{ oldPath: 'reference/mcp-server', target: '/docs/user-guide/mcp-server/' },
	{ oldPath: 'pe/reference/mcp-server', target: '/docs/pe/user-guide/mcp-server/' },
	{ oldPath: 'paas/reference/mcp-server', target: '/docs/paas/user-guide/mcp-server/' },
	{ oldPath: 'paas/eu/reference/mcp-server', target: '/docs/paas/eu/user-guide/mcp-server/' },
	{ oldPath: 'reference/plugins/rabbitmq', target: '/docs/reference/rule-engine/nodes/external/rabbitmq/' },
	{ oldPath: 'pe/reference/plugins/rabbitmq', target: '/docs/pe/reference/rule-engine/nodes/external/rabbitmq/' },
	{ oldPath: 'paas/reference/plugins/rabbitmq', target: '/docs/paas/reference/rule-engine/nodes/external/rabbitmq/' },
	{ oldPath: 'paas/eu/reference/plugins/rabbitmq', target: '/docs/paas/eu/reference/rule-engine/nodes/external/rabbitmq/' },
	{ oldPath: 'reference/roadmap', target: '/docs/user-guide/roadmap/' },
	{ oldPath: 'pe/reference/roadmap', target: '/docs/pe/user-guide/roadmap/' },
	{ oldPath: 'releases/releases-table', target: '/docs/user-guide/releases-table/' },
	{ oldPath: 'pe/releases/releases-table', target: '/docs/pe/user-guide/releases-table/' },
	{ oldPath: 'releases/roadmap', target: '/docs/user-guide/roadmap/' },
	{ oldPath: 'pe/releases/roadmap', target: '/docs/pe/user-guide/roadmap/' },
	{ oldPath: 'samples/analytics/ai-models', target: '/docs/user-guide/ai-models/' },
	{ oldPath: 'pe/samples/analytics/ai-models', target: '/docs/pe/user-guide/ai-models/' },
	{ oldPath: 'paas/samples/analytics/ai-models', target: '/docs/paas/user-guide/ai-models/' },
	{ oldPath: 'paas/eu/samples/analytics/ai-models', target: '/docs/paas/eu/user-guide/ai-models/' },
	{ oldPath: 'samples/analytics/ai-predictive-maintenance', target: '/docs/user-guide/ai-predictive-maintenance/' },
	{ oldPath: 'pe/samples/analytics/ai-predictive-maintenance', target: '/docs/pe/user-guide/ai-predictive-maintenance/' },
	{ oldPath: 'paas/samples/analytics/ai-predictive-maintenance', target: '/docs/paas/user-guide/ai-predictive-maintenance/' },
	{ oldPath: 'paas/eu/samples/analytics/ai-predictive-maintenance', target: '/docs/paas/eu/user-guide/ai-predictive-maintenance/' },
	{ oldPath: 'samples/analytics/n8n-node', target: '/docs/user-guide/n8n-node/' },
	{ oldPath: 'pe/samples/analytics/n8n-node', target: '/docs/pe/user-guide/n8n-node/' },
	{ oldPath: 'paas/samples/analytics/n8n-node', target: '/docs/paas/user-guide/n8n-node/' },
	{ oldPath: 'paas/eu/samples/analytics/n8n-node', target: '/docs/paas/eu/user-guide/n8n-node/' },
	{ oldPath: 'trendz/business-entities', target: '/docs/trendz/concepts/business-entities/' },
	{ oldPath: 'tutorials/send-email', target: '/docs/reference/rule-engine/nodes/external/send-email/' },
	{ oldPath: 'pe/tutorials/send-email', target: '/docs/pe/reference/rule-engine/nodes/external/send-email/' },
	{ oldPath: 'paas/tutorials/send-email', target: '/docs/paas/reference/rule-engine/nodes/external/send-email/' },
	{ oldPath: 'paas/eu/tutorials/send-email', target: '/docs/paas/eu/reference/rule-engine/nodes/external/send-email/' },
	{ oldPath: 'user-guide/install/cluster/docker-compose-setup', target: '/docs/installation/docker-compose-setup/' },
	{ oldPath: 'user-guide/install/cluster/minikube-cluster-setup', target: '/docs/installation/minikube-cluster-setup/' },
	{ oldPath: 'user-guide/install/cluster/openshift-cluster-setup', target: '/docs/installation/openshift-cluster-setup/' },
	{ oldPath: 'user-guide/install/coap-transport-config', target: '/docs/reference/configuration/coap-transport-config/' },
	{ oldPath: 'user-guide/install/digital-ocean', target: '/docs/installation/digital-ocean/' },
	{ oldPath: 'user-guide/install/gcp', target: '/docs/installation/gcp/' },
	{ oldPath: 'user-guide/install/http-transport-config', target: '/docs/reference/configuration/http-transport-config/' },
	{ oldPath: 'user-guide/install/lwm2m-transport-config', target: '/docs/reference/configuration/lwm2m-transport-config/' },
	{ oldPath: 'user-guide/install/mqtt-transport-config', target: '/docs/reference/configuration/mqtt-transport-config/' },
	{ oldPath: 'user-guide/install/snmp-transport-config', target: '/docs/reference/configuration/snmp-transport-config/' },
	{ oldPath: 'user-guide/install/upgrade-instructions', target: '/docs/installation/upgrade-instructions/' },
	{ oldPath: 'user-guide/install/vc-executor-config', target: '/docs/reference/configuration/vc-executor-config/' },
	{ oldPath: 'user-guide/oauth-2-support', target: '/docs/user-guide/security/oauth-2-support/' },
	{ oldPath: 'pe/user-guide/oauth-2-support', target: '/docs/pe/user-guide/security/oauth-2-support/' },
	{ oldPath: 'paas/user-guide/oauth-2-support', target: '/docs/paas/user-guide/security/oauth-2-support/' },
	{ oldPath: 'paas/eu/user-guide/oauth-2-support', target: '/docs/paas/eu/user-guide/security/oauth-2-support/' },
	{ oldPath: 'user-guide/queue', target: '/docs/reference/architecture/queue/' },
	{ oldPath: 'pe/user-guide/queue', target: '/docs/pe/reference/architecture/queue/' },
	{ oldPath: 'user-guide/rule-engine-2-0/architecture', target: '/docs/reference/architecture/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/architecture', target: '/docs/pe/reference/architecture/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/architecture', target: '/docs/paas/reference/architecture/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/architecture', target: '/docs/paas/eu/reference/architecture/' },
	{ oldPath: 'user-guide/rule-engine-2-0/nodes/action', target: '/docs/reference/rule-engine/nodes/action/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/nodes/action', target: '/docs/pe/reference/rule-engine/nodes/action/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/nodes/action', target: '/docs/paas/reference/rule-engine/nodes/action/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/nodes/action', target: '/docs/paas/eu/reference/rule-engine/nodes/action/' },
	{ oldPath: 'user-guide/rule-engine-2-0/nodes/analytics', target: '/docs/reference/rule-engine/nodes/analytics/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/nodes/analytics', target: '/docs/pe/reference/rule-engine/nodes/analytics/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/nodes/analytics', target: '/docs/paas/reference/rule-engine/nodes/analytics/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/nodes/analytics', target: '/docs/paas/eu/reference/rule-engine/nodes/analytics/' },
	{ oldPath: 'user-guide/rule-engine-2-0/nodes/enrichment', target: '/docs/reference/rule-engine/nodes/enrichment/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/nodes/enrichment', target: '/docs/pe/reference/rule-engine/nodes/enrichment/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/nodes/enrichment', target: '/docs/paas/reference/rule-engine/nodes/enrichment/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/nodes/enrichment', target: '/docs/paas/eu/reference/rule-engine/nodes/enrichment/' },
	{ oldPath: 'user-guide/rule-engine-2-0/nodes/external', target: '/docs/reference/rule-engine/nodes/external/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/nodes/external', target: '/docs/pe/reference/rule-engine/nodes/external/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/nodes/external', target: '/docs/paas/reference/rule-engine/nodes/external/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/nodes/external', target: '/docs/paas/eu/reference/rule-engine/nodes/external/' },
	{ oldPath: 'user-guide/rule-engine-2-0/nodes/filter', target: '/docs/reference/rule-engine/nodes/filter/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/nodes/filter', target: '/docs/pe/reference/rule-engine/nodes/filter/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/nodes/filter', target: '/docs/paas/reference/rule-engine/nodes/filter/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/nodes/filter', target: '/docs/paas/eu/reference/rule-engine/nodes/filter/' },
	{ oldPath: 'user-guide/rule-engine-2-0/nodes/flow', target: '/docs/reference/rule-engine/nodes/flow/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/nodes/flow', target: '/docs/pe/reference/rule-engine/nodes/flow/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/nodes/flow', target: '/docs/paas/reference/rule-engine/nodes/flow/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/nodes/flow', target: '/docs/paas/eu/reference/rule-engine/nodes/flow/' },
	{ oldPath: 'user-guide/rule-engine-2-0/nodes/transformation', target: '/docs/reference/rule-engine/nodes/transformation/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/nodes/transformation', target: '/docs/pe/reference/rule-engine/nodes/transformation/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/nodes/transformation', target: '/docs/paas/reference/rule-engine/nodes/transformation/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/nodes/transformation', target: '/docs/paas/eu/reference/rule-engine/nodes/transformation/' },
	{ oldPath: 'user-guide/rule-engine-2-5/queues', target: '/docs/user-guide/rule-engine/queues/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-5/queues', target: '/docs/pe/user-guide/rule-engine/queues/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-5/queues', target: '/docs/paas/user-guide/rule-engine/queues/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-5/queues', target: '/docs/paas/eu/user-guide/rule-engine/queues/' },
	{ oldPath: 'user-guide/self-registration', target: '/docs/user-guide/security/self-registration/' },
	{ oldPath: 'pe/user-guide/self-registration', target: '/docs/pe/user-guide/security/self-registration/' },
	{ oldPath: 'paas/user-guide/self-registration', target: '/docs/paas/user-guide/security/self-registration/' },
	{ oldPath: 'paas/eu/user-guide/self-registration', target: '/docs/paas/eu/user-guide/security/self-registration/' },
	{ oldPath: 'user-guide/ssl/http-over-ssl', target: '/docs/user-guide/security/http-over-ssl/' },
	{ oldPath: 'pe/user-guide/ssl/http-over-ssl', target: '/docs/pe/user-guide/security/http-over-ssl/' },
	{ oldPath: 'user-guide/templatization', target: '/docs/reference/rule-engine/templatization/' },
	{ oldPath: 'pe/user-guide/templatization', target: '/docs/pe/reference/rule-engine/templatization/' },
	{ oldPath: 'paas/user-guide/templatization', target: '/docs/paas/reference/rule-engine/templatization/' },
	{ oldPath: 'paas/eu/user-guide/templatization', target: '/docs/paas/eu/reference/rule-engine/templatization/' },
	{ oldPath: 'user-guide/troubleshooting', target: '/docs/guides/troubleshooting/' },
	{ oldPath: 'user-guide/two-factor-authentication', target: '/docs/user-guide/security/two-factor-authentication/' },
	{ oldPath: 'pe/user-guide/two-factor-authentication', target: '/docs/pe/user-guide/security/two-factor-authentication/' },
	{ oldPath: 'paas/user-guide/two-factor-authentication', target: '/docs/paas/user-guide/security/two-factor-authentication/' },
	{ oldPath: 'paas/eu/user-guide/two-factor-authentication', target: '/docs/paas/eu/user-guide/security/two-factor-authentication/' },
	{ oldPath: 'user-guide/ui/aliases', target: '/docs/user-guide/aliases/' },
	{ oldPath: 'pe/user-guide/ui/aliases', target: '/docs/pe/user-guide/aliases/' },
	{ oldPath: 'paas/user-guide/ui/aliases', target: '/docs/paas/user-guide/aliases/' },
	{ oldPath: 'paas/eu/user-guide/ui/aliases', target: '/docs/paas/eu/user-guide/aliases/' },
	{ oldPath: 'user-guide/ui/api-keys', target: '/docs/user-guide/security/api-keys/' },
	{ oldPath: 'pe/user-guide/ui/api-keys', target: '/docs/pe/user-guide/security/api-keys/' },
	{ oldPath: 'paas/user-guide/ui/api-keys', target: '/docs/paas/user-guide/security/api-keys/' },
	{ oldPath: 'paas/eu/user-guide/ui/api-keys', target: '/docs/paas/eu/user-guide/security/api-keys/' },
	{ oldPath: 'user-guide/ui/asset-profiles', target: '/docs/user-guide/asset-profiles/' },
	{ oldPath: 'pe/user-guide/ui/asset-profiles', target: '/docs/pe/user-guide/asset-profiles/' },
	{ oldPath: 'paas/user-guide/ui/asset-profiles', target: '/docs/paas/user-guide/asset-profiles/' },
	{ oldPath: 'paas/eu/user-guide/ui/asset-profiles', target: '/docs/paas/eu/user-guide/asset-profiles/' },
	{ oldPath: 'user-guide/ui/assets', target: '/docs/user-guide/assets/' },
	{ oldPath: 'pe/user-guide/ui/assets', target: '/docs/pe/user-guide/assets/' },
	{ oldPath: 'paas/user-guide/ui/assets', target: '/docs/paas/user-guide/assets/' },
	{ oldPath: 'paas/eu/user-guide/ui/assets', target: '/docs/paas/eu/user-guide/assets/' },
	{ oldPath: 'user-guide/ui/chart-widget', target: '/docs/reference/widgets/chart-widget/' },
	{ oldPath: 'pe/user-guide/ui/chart-widget', target: '/docs/pe/reference/widgets/chart-widget/' },
	{ oldPath: 'paas/user-guide/ui/chart-widget', target: '/docs/paas/reference/widgets/chart-widget/' },
	{ oldPath: 'paas/eu/user-guide/ui/chart-widget', target: '/docs/paas/eu/reference/widgets/chart-widget/' },
	{ oldPath: 'user-guide/ui/customers', target: '/docs/user-guide/customers/' },
	{ oldPath: 'pe/user-guide/ui/customers', target: '/docs/pe/user-guide/customers/' },
	{ oldPath: 'paas/user-guide/ui/customers', target: '/docs/paas/user-guide/customers/' },
	{ oldPath: 'paas/eu/user-guide/ui/customers', target: '/docs/paas/eu/user-guide/customers/' },
	{ oldPath: 'user-guide/ui/device-profiles', target: '/docs/user-guide/device-profiles/' },
	{ oldPath: 'pe/user-guide/ui/device-profiles', target: '/docs/pe/user-guide/device-profiles/' },
	{ oldPath: 'paas/user-guide/ui/device-profiles', target: '/docs/paas/user-guide/device-profiles/' },
	{ oldPath: 'paas/eu/user-guide/ui/device-profiles', target: '/docs/paas/eu/user-guide/device-profiles/' },
	{ oldPath: 'user-guide/ui/devices', target: '/docs/user-guide/devices/' },
	{ oldPath: 'pe/user-guide/ui/devices', target: '/docs/pe/user-guide/devices/' },
	{ oldPath: 'paas/user-guide/ui/devices', target: '/docs/paas/user-guide/devices/' },
	{ oldPath: 'paas/eu/user-guide/ui/devices', target: '/docs/paas/eu/user-guide/devices/' },
	{ oldPath: 'user-guide/ui/entity-table-widget', target: '/docs/reference/widgets/entity-table-widget/' },
	{ oldPath: 'pe/user-guide/ui/entity-table-widget', target: '/docs/pe/reference/widgets/entity-table-widget/' },
	{ oldPath: 'paas/user-guide/ui/entity-table-widget', target: '/docs/paas/reference/widgets/entity-table-widget/' },
	{ oldPath: 'paas/eu/user-guide/ui/entity-table-widget', target: '/docs/paas/eu/reference/widgets/entity-table-widget/' },
	{ oldPath: 'user-guide/ui/entity-views', target: '/docs/user-guide/entity-views/' },
	{ oldPath: 'pe/user-guide/ui/entity-views', target: '/docs/pe/user-guide/entity-views/' },
	{ oldPath: 'paas/user-guide/ui/entity-views', target: '/docs/paas/user-guide/entity-views/' },
	{ oldPath: 'paas/eu/user-guide/ui/entity-views', target: '/docs/paas/eu/user-guide/entity-views/' },
	{ oldPath: 'user-guide/ui/roles', target: '/docs/user-guide/roles/' },
	{ oldPath: 'pe/user-guide/ui/roles', target: '/docs/pe/user-guide/roles/' },
	{ oldPath: 'paas/user-guide/ui/roles', target: '/docs/paas/user-guide/roles/' },
	{ oldPath: 'paas/eu/user-guide/ui/roles', target: '/docs/paas/eu/user-guide/roles/' },
	{ oldPath: 'user-guide/ui/templatization', target: '/docs/reference/rule-engine/templatization/' },
	{ oldPath: 'pe/user-guide/ui/templatization', target: '/docs/pe/reference/rule-engine/templatization/' },
	{ oldPath: 'paas/user-guide/ui/templatization', target: '/docs/paas/reference/rule-engine/templatization/' },
	{ oldPath: 'paas/eu/user-guide/ui/templatization', target: '/docs/paas/eu/reference/rule-engine/templatization/' },
	{ oldPath: 'user-guide/ui/users', target: '/docs/user-guide/users/' },
	{ oldPath: 'pe/user-guide/ui/users', target: '/docs/pe/user-guide/users/' },
	{ oldPath: 'paas/user-guide/ui/users', target: '/docs/paas/user-guide/users/' },
	{ oldPath: 'paas/eu/user-guide/ui/users', target: '/docs/paas/eu/user-guide/users/' },
	{ oldPath: 'user-guide/ui/widget-library', target: '/docs/reference/widgets/widget-library/' },
	{ oldPath: 'pe/user-guide/ui/widget-library', target: '/docs/pe/reference/widgets/widget-library/' },
	{ oldPath: 'paas/user-guide/ui/widget-library', target: '/docs/paas/reference/widgets/widget-library/' },
	{ oldPath: 'paas/eu/user-guide/ui/widget-library', target: '/docs/paas/eu/reference/widgets/widget-library/' },
	{ oldPath: 'user-guide/widgets/cards/markdown-html-card', target: '/docs/reference/widgets/markdown-html-card/' },
	{ oldPath: 'pe/user-guide/widgets/cards/markdown-html-card', target: '/docs/pe/reference/widgets/markdown-html-card/' },
	{ oldPath: 'paas/user-guide/widgets/cards/markdown-html-card', target: '/docs/paas/reference/widgets/markdown-html-card/' },
	{ oldPath: 'paas/eu/user-guide/widgets/cards/markdown-html-card', target: '/docs/paas/eu/reference/widgets/markdown-html-card/' },
	{ oldPath: 'user-guide/widgets/map-widgets', target: '/docs/reference/widgets/map-widgets/' },
	{ oldPath: 'pe/user-guide/widgets/map-widgets', target: '/docs/pe/reference/widgets/map-widgets/' },
	{ oldPath: 'paas/user-guide/widgets/map-widgets', target: '/docs/paas/reference/widgets/map-widgets/' },
	{ oldPath: 'paas/eu/user-guide/widgets/map-widgets', target: '/docs/paas/eu/reference/widgets/map-widgets/' },
	{ oldPath: 'guides', target: '/docs/recipes/' },
	{ oldPath: 'pe/guides', target: '/docs/pe/recipes/' },
	{ oldPath: 'paas/guides', target: '/docs/paas/recipes/' },
	{ oldPath: 'paas/eu/guides', target: '/docs/paas/eu/recipes/' },
	{ oldPath: 'user-guide/integrations/apache-pulsar', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/apache-pulsar', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/apache-pulsar', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/apache-pulsar', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/aws-kinesis', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/aws-kinesis', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/aws-kinesis', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/aws-kinesis', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/azure-event-hub', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/azure-event-hub', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/azure-event-hub', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/azure-event-hub', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/azure-service-bus', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/azure-service-bus', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/azure-service-bus', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/azure-service-bus', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/custom', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/custom', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/custom', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/custom', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/decode', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/decode', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/decode', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/decode', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/ibm-watson-iot', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/ibm-watson-iot', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/ibm-watson-iot', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/ibm-watson-iot', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/kpn-things', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/kpn-things', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/kpn-things', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/kpn-things', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/loriot', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/loriot', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/loriot', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/loriot', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/ocean-connect', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/ocean-connect', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/ocean-connect', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/ocean-connect', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/particle', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/particle', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/particle', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/particle', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/remote-integrations', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/remote-integrations', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/remote-integrations', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/remote-integrations', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/send-data-external-mqtt-brokers', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/send-data-external-mqtt-brokers', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/send-data-external-mqtt-brokers', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/send-data-external-mqtt-brokers', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/sigfox', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/sigfox', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/sigfox', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/sigfox', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/sigfox-example', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/sigfox-example', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/sigfox-example', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/sigfox-example', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/sodaq', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/sodaq', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/sodaq', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/sodaq', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/sodaq-udp', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/sodaq-udp', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/sodaq-udp', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/sodaq-udp', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/t-mobile-iot-cdp', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/t-mobile-iot-cdp', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/t-mobile-iot-cdp', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/t-mobile-iot-cdp', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/tcp', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/tcp', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/tcp', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/tcp', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/tuya', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/tuya', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/tuya', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/tuya', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/integrations/udp', target: '/docs/user-guide/integrations/' },
	{ oldPath: 'pe/user-guide/integrations/udp', target: '/docs/pe/user-guide/integrations/' },
	{ oldPath: 'paas/user-guide/integrations/udp', target: '/docs/paas/user-guide/integrations/' },
	{ oldPath: 'paas/eu/user-guide/integrations/udp', target: '/docs/paas/eu/user-guide/integrations/' },
	{ oldPath: 'user-guide/rule-engine-2-0/action-nodes', target: '/docs/reference/rule-engine/nodes/action/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/action-nodes', target: '/docs/pe/reference/rule-engine/nodes/action/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/action-nodes', target: '/docs/paas/reference/rule-engine/nodes/action/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/action-nodes', target: '/docs/paas/eu/reference/rule-engine/nodes/action/' },
	{ oldPath: 'user-guide/rule-engine-2-0/enrichment-nodes', target: '/docs/reference/rule-engine/nodes/enrichment/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/enrichment-nodes', target: '/docs/pe/reference/rule-engine/nodes/enrichment/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/enrichment-nodes', target: '/docs/paas/reference/rule-engine/nodes/enrichment/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/enrichment-nodes', target: '/docs/paas/eu/reference/rule-engine/nodes/enrichment/' },
	{ oldPath: 'user-guide/rule-engine-2-0/external-nodes', target: '/docs/reference/rule-engine/nodes/external/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/external-nodes', target: '/docs/pe/reference/rule-engine/nodes/external/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/external-nodes', target: '/docs/paas/reference/rule-engine/nodes/external/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/external-nodes', target: '/docs/paas/eu/reference/rule-engine/nodes/external/' },
	{ oldPath: 'user-guide/rule-engine-2-0/filter-nodes', target: '/docs/reference/rule-engine/nodes/filter/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/filter-nodes', target: '/docs/pe/reference/rule-engine/nodes/filter/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/filter-nodes', target: '/docs/paas/reference/rule-engine/nodes/filter/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/filter-nodes', target: '/docs/paas/eu/reference/rule-engine/nodes/filter/' },
	{ oldPath: 'user-guide/rule-engine-2-0/flow-nodes', target: '/docs/reference/rule-engine/nodes/flow/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/flow-nodes', target: '/docs/pe/reference/rule-engine/nodes/flow/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/flow-nodes', target: '/docs/paas/reference/rule-engine/nodes/flow/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/flow-nodes', target: '/docs/paas/eu/reference/rule-engine/nodes/flow/' },
	{ oldPath: 'user-guide/rule-engine-2-0/transformation-nodes', target: '/docs/reference/rule-engine/nodes/transformation/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/transformation-nodes', target: '/docs/pe/reference/rule-engine/nodes/transformation/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/transformation-nodes', target: '/docs/paas/reference/rule-engine/nodes/transformation/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/transformation-nodes', target: '/docs/paas/eu/reference/rule-engine/nodes/transformation/' },
	{ oldPath: 'user-guide/rule-engine-2-0/nodes', target: '/docs/user-guide/rule-nodes/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/nodes', target: '/docs/pe/user-guide/rule-nodes/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/nodes', target: '/docs/paas/user-guide/rule-nodes/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/nodes', target: '/docs/paas/eu/user-guide/rule-nodes/' },
	{ oldPath: 'user-guide/rule-engine-2-0/overview', target: '/docs/user-guide/rule-engine/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/overview', target: '/docs/pe/user-guide/rule-engine/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/overview', target: '/docs/paas/user-guide/rule-engine/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/overview', target: '/docs/paas/eu/user-guide/rule-engine/' },
	{ oldPath: 'user-guide/rule-engine-2-0/re-getting-started', target: '/docs/user-guide/rule-engine/' },
	{ oldPath: 'pe/user-guide/rule-engine-2-0/re-getting-started', target: '/docs/pe/user-guide/rule-engine/' },
	{ oldPath: 'paas/user-guide/rule-engine-2-0/re-getting-started', target: '/docs/paas/user-guide/rule-engine/' },
	{ oldPath: 'paas/eu/user-guide/rule-engine-2-0/re-getting-started', target: '/docs/paas/eu/user-guide/rule-engine/' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns entries for a catch-all prefix, or empty array if not found. */
export function getCatchAllEntries(oldPrefix: string): RedirectEntry[] {
	const group = CATCH_ALL_REDIRECTS.find((g) => g.oldPrefix === oldPrefix);
	return group?.entries ?? [];
}

/**
 * Returns a flat map of ALL redirects: oldPath (with /docs/ prefix and trailing slash) → target.
 * Used by scripts/generate-redirects.ts to produce the JSON map.
 */
export function getAllRedirectsFlat(): Record<string, string> {
	const map: Record<string, string> = {};

	for (const group of CATCH_ALL_REDIRECTS) {
		for (const entry of group.entries) {
			const oldPath = entry.slug
				? `/docs/${group.oldPrefix}/${entry.slug}/`
				: `/docs/${group.oldPrefix}/`;
			map[oldPath] = entry.target;
		}
	}

	for (const entry of SINGLE_REDIRECTS) {
		map[`/docs/${entry.oldPath}/`] = entry.target;
	}

	return map;
}
