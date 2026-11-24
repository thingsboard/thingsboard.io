import type { MarkdownHeading } from 'astro';
import { Products, getDocsPrefix, isCommunityProduct } from '@models/site.models';
import { hasCommunityRelease } from '@models/community-cutoff';
import { RELEASE_FAMILIES, familySlug } from '@models/releases-table';
import { getUpgradeTableVersions } from '@models/upgrade-instructions';
import {
	EDGE_RELEASE_FAMILIES,
	EDGE_UPGRADE_VERSIONS,
	hasCommunityEdgeRelease,
	scopeEdgeToEdition,
} from '@models/edge-upgrade-instructions';
import { familyOf } from '@models/upgrade-shared';

/**
 * Hash ids of the Jekyll docs, which had one long page per product. updates.thingsboard.io
 * still links the platform's version widget and new-version notification to them
 * (`/docs/reference/releases/#v4402`, `/docs/user-guide/install/upgrade-instructions/#upgrading-to-4402`),
 * and notifications already sent keep those links. The old paths 301 to the releases and upgrade
 * tables and the browser keeps the hash; `LegacyHashRedirect.astro` then looks it up in the map
 * built here, keyed by the version's digits.
 */

const notesHeadings = import.meta.glob<() => MarkdownHeading[]>(
	'/src/content/_includes/docs/{releases,pe/releases,edge/releases,edge/pe/releases}/v*-x.mdx',
	{ import: 'getHeadings', eager: true }
);

/** Ids of a family's release-notes headings, newest first (`v4-4-0-2`, set by `satteri-release-anchors`). */
export function notesAnchors(product: Products, family: string): string[] {
	const getHeadings =
		notesHeadings[`/src/content/_includes/docs/${getDocsPrefix(product)}releases/${familySlug(family)}.mdx`];
	return (getHeadings?.() ?? []).filter((h) => h.depth === 2 && /^v\d+(?:-\d+)+$/.test(h.slug)).map((h) => h.slug);
}

/** `v4-4-0-2` → `v4402`; a GA `v4-2-0` also → `v42`, the Jekyll id of GA headings. */
function legacyKeys(anchor: string): string[] {
	const parts = anchor.slice(1).split('-');
	const keys = [`v${parts.join('')}`];
	if (parts.length === 3 && parts[2] === '0') keys.push(`v${parts[0]}${parts[1]}`);
	return keys;
}

interface ProductLine {
	community: Products;
	commercial: Products;
	families: string[];
	hasCommunityRelease: (family: string) => boolean;
	upgradeTableRows: (edition: Products) => { anchor: string; family: string }[];
}

const THINGSBOARD: ProductLine = {
	community: Products.CE,
	commercial: Products.PE,
	families: RELEASE_FAMILIES.map((f) => f.family),
	hasCommunityRelease,
	upgradeTableRows: getUpgradeTableVersions,
};

const EDGE: ProductLine = {
	community: Products.EDGE,
	commercial: Products.EDGE_PE,
	families: EDGE_RELEASE_FAMILIES.map((f) => f.family),
	hasCommunityRelease: hasCommunityEdgeRelease,
	upgradeTableRows: (edition) => scopeEdgeToEdition(EDGE_UPGRADE_VERSIONS, edition),
};

/**
 * Legacy hash key → URL, for the releases table (`releases`) or the upgrade table (`upgrade`) of
 * `product`. Release notes go to the version's heading; upgrades to the table filtered to the
 * version's row, or to its family when it has no row (withdrawn, or superseded before the table
 * existed). A Community product sends a family it has no release in to the commercial pages.
 *
 * Versions are walked newest first and the first one to claim a key keeps it, so once a two-digit
 * version arrives (`4.10.0` and `4.1.0` both give `v410`), the newer release wins.
 */
export function legacyHashMap(product: Products, kind: 'releases' | 'upgrade'): Record<string, string> {
	const line = product === Products.EDGE || product === Products.EDGE_PE ? EDGE : THINGSBOARD;
	const editionOf = (family: string) =>
		isCommunityProduct(product) && line.hasCommunityRelease(family) ? line.community : line.commercial;
	const map: Record<string, string> = {};
	const add = (anchor: string, url: string) => {
		for (const key of legacyKeys(anchor)) map[key] ??= url;
	};

	if (kind === 'releases') {
		for (const family of line.families) {
			const edition = editionOf(family);
			for (const anchor of notesAnchors(edition, family)) {
				add(anchor, `/docs/${getDocsPrefix(edition)}releases/releases-table/${familySlug(family)}/#${anchor}`);
			}
		}
		return map;
	}

	const anchors = new Set([
		...line.families.flatMap((family) => notesAnchors(line.commercial, family)),
		...line.upgradeTableRows(line.commercial).map((v) => v.anchor),
	]);
	for (const anchor of anchors) {
		const family = familyOf(anchor.slice(1).replaceAll('-', '.'));
		const edition = editionOf(family);
		const rows = line.upgradeTableRows(edition);
		if (!rows.some((v) => v.family === family)) continue;
		const filter = rows.some((v) => v.anchor === anchor) ? anchor : familySlug(family);
		add(anchor, `/docs/${getDocsPrefix(edition)}installation/upgrade-instructions/?version=${filter}`);
	}
	return map;
}
