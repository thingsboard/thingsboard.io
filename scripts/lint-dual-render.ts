/**
 * Checks the IoT Hub dual-render contract in the built output.
 *
 * Listing cards are rendered twice: server-side by ListingCard.astro, and
 * client-side by cloning a <ListingCardTemplate> and filling it with
 * bindListingCard (see iot-hub-dynamic-search.ts). The binder finds the parts
 * it fills by `data-*` hook, so the contract is:
 *
 *   every hook a server-rendered card uses must exist in a template the same
 *   page emits — otherwise the clone can never be filled to match it.
 *
 * Breaking it is silent: the page builds, typechecks and lints clean, and only
 * renders wrong once the user types and results are re-rendered from the API.
 * The classic break is emitting only the `tile` template (which bakes the
 * icon-tile branch, so it has no [data-card-img]) on a page whose server cards
 * show previews — every dynamic result then falls back to a coloured tile.
 *
 * Scope: catches a missing template, a hook renamed on one side only, or a
 * page that cannot satisfy its own init guard. It cannot verify the binder
 * fills a hook *correctly*, so a green run does NOT cover: that the shape
 * passed to bindListingCard matches the template actually cloned; that the
 * glyph is 48px for [data-card-tile] and 32px for [data-card-icon-tile]; that
 * both sides apply DEFAULT_TILE_COLOR; or that HOOKS_BY_SHAPE still matches the
 * selectors the binder queries, since that table is maintained by hand. Those
 * need a DOM test.
 *
 * Usage:
 *   pnpm lint:dualrender          (after a build)
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import {
	CARD_HOOKS,
	HOOKS_BY_SHAPE,
	type CardHook,
	type CardShape,
} from '../src/components/IotHub/listing-card-hooks.ts';


const TEMPLATE_RE = /<template[^>]*data-listing-card-tmpl[\s\S]*?<\/template>/g;
const CARD_RE = /<a class="iot-hub-card[\s\S]*?<\/a>/g;

function walkHtml(dir: string): string[] {
	const files: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walkHtml(fullPath));
		else if (entry.name === 'index.html') files.push(fullPath);
	}
	return files;
}

/**
 * Exact attribute match. Plain `includes` would be wrong: `data-card-img` is a
 * prefix of `data-card-img-fallback`, `data-card-author` of three others, and
 * `data-card-installs` of `data-card-installs-wrap`.
 */
const HOOK_RE = new Map(CARD_HOOKS.map((h) => [h, new RegExp(`${h}(?![-\\w])`)]));

function hooksIn(html: string): Set<string> {
	return new Set(CARD_HOOKS.filter((h) => HOOK_RE.get(h)!.test(html)));
}

/** Variants the page emits, e.g. {'preview','tile'}. */
function variantsIn(templates: string[]): Set<string> {
	return new Set(
		templates.flatMap((t) => [...t.matchAll(/data-variant="([^"]+)"/g)].map((m) => m[1]))
	);
}

/**
 * Which templates this page's init guard demands. Mirrors
 * iot-hub-dynamic-search.ts: a page pinned to one item type clones
 * preview/compact, a mixed grid clones preview/tile. Read the item type off the search ROOT — the
 * attribute also appears on every install button, so a document-wide search
 * would misclassify every page.
 */
function requiredVariants(html: string): string[] {
	const root = html.match(/<[^>]*data-iot-hub-search-root[^>]*>/)?.[0] ?? '';
	const pinned = /data-item-type="[^"]+"/.test(root);
	return pinned ? ['preview', 'compact'] : ['preview', 'tile'];
}

const ROOT = 'dist/iot-hub';

if (!existsSync(ROOT)) {
	console.error(`No ${ROOT}/ — run \`pnpm build\` first, this checks the built output.`);
	process.exit(1);
}

let checked = 0;
let hasErrors = false;

for (const file of walkHtml(ROOT)) {
	const html = readFileSync(file, 'utf8');
	// Only pages that re-render results from the API are subject to the contract.
	if (!html.includes('data-iot-hub-search-root')) continue;
	checked++;

	const templates = html.match(TEMPLATE_RE) ?? [];
	const templateHooks = hooksIn(templates.join(''));
	// Server-rendered cards only — strip the templates first so their own
	// markup can't satisfy the check.
	const page = html.replace(TEMPLATE_RE, '');
	const serverCards = (page.match(CARD_RE) ?? []).join('');
	const missing = [...hooksIn(serverCards)].filter((h) => !templateHooks.has(h));
	// A page can satisfy every hook and still be broken: the init guard bails if
	// a variant it expects is absent, and because it runs after the
	// "already initialised" flag is set, dynamic search is then dead with no
	// retry. Hook containment alone would not notice.
	const emitted = variantsIn(templates);
	const missingVariants = requiredVariants(html).filter((v) => !emitted.has(v));

	const rel = relative(process.cwd(), file);

	// The checks above are only as strong as the catalogue: if every listing on
	// this page happens to have a preview, no server card carries
	// data-card-tile and a regression that dropped it would pass. Assert what
	// each emitted shape must provide regardless of the data.
	for (const t of templates) {
		const shape = t.match(/data-variant="([^"]+)"/)?.[1] as CardShape | undefined;
		const required = shape ? HOOKS_BY_SHAPE[shape] : undefined;
		if (!required) continue;
		const present = hooksIn(t);
		const absent = required.filter((h: CardHook) => !present.has(h));
		if (absent.length > 0) {
			console.error(
				`${rel}: the \`${shape}\` template is missing ${absent.join(', ')}, ` +
					`which the binder fills for that shape`
			);
			hasErrors = true;
		}
	}

	// Fail closed. If the card regex stops matching — attribute order changes,
	// a minifier lands, quotes get stripped — serverCards goes empty, `missing`
	// goes empty, and every page would silently pass.
	// CARD_RE carries /g, so calling .test() here would mutate its lastIndex —
	// serverCards already holds the answer from the single match() above.
	if (templates.length === 0 || serverCards.length === 0) {
		console.error(
			`${rel}: found ${templates.length} template(s) and ` +
				`${serverCards.length === 0 ? 'no' : 'some'} server-rendered cards — ` +
				`the selectors in this script no longer match the build output`
		);
		hasErrors = true;
	}

	if (missing.length > 0) {
		console.error(
			`${rel}: server cards use ${missing.join(', ')}, ` +
				`but no emitted template provides ${missing.length > 1 ? 'them' : 'it'} ` +
				`(${templates.length} template${templates.length === 1 ? '' : 's'} emitted)`
		);
		hasErrors = true;
	}
	if (missingVariants.length > 0) {
		console.error(
			`${rel}: the init guard requires the ` +
				`${missingVariants.map((v) => `\`${v}\``).join(' and ')} ` +
				`template${missingVariants.length > 1 ? 's' : ''}, which the page does not emit ` +
				`(emitted: ${[...emitted].join(', ') || 'none'})`
		);
		hasErrors = true;
	}
}

if (hasErrors) {
	console.error(`
Error: the page(s) above render a card shape that their clone templates cannot
produce, so results re-rendered from the API will not match the server render.

Fix — emit a <ListingCardTemplate> for every shape the page renders, e.g. a
page showing both previews and icon tiles needs both:

  <ListingCardTemplate variant="preview" />
  <ListingCardTemplate variant="tile" />

and the init guard in iot-hub-dynamic-search.ts must require exactly the
templates that page uses — it runs after the "already initialised" flag is
set, so an over-strict guard disables dynamic search with no retry.`);
	process.exit(1);
}

if (checked === 0) {
	console.error(
		`No pages with [data-iot-hub-search-root] under ${ROOT}/. Either the build ` +
			`is stale or that attribute was renamed — either way this check verified nothing.`
	);
	process.exit(1);
}

console.log(`✓ Dual-render contract holds on ${checked} dynamic page(s).`);
