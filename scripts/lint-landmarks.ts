/**
 * Checks three invariants that are invisible when broken — the page builds,
 * typechecks, lints and visually renders fine — in the built output.
 *
 * One <main> per page: BaseLayout renders through <StarlightPage>, which emits
 * its own <main id="_top">, so a page-level <main> is always a second, nested
 * landmark. Pages get copied from older templates, which is how twenty of them
 * had accumulated one before this check existed.
 *
 * Table integrity on the marketing pages listed in TABLE_PAGES: every table
 * has a caption, no cell is empty (a screen reader or a text extraction reads
 * nothing where the eye sees an icon), and no cell is self-closed (the source
 * of the "Stray end tag" validator error). Scoped to marketing pages — docs
 * tables are Markdown-authored and out of scope.
 *
 * Attribution on sign-up links: every page with the site chrome that links to
 * a Cloud or License Portal sign-up entry loads the script of UtmTracker.astro,
 * which adds the visitor's campaign to those links. The tag sits in a slot shared by all
 * pages (starlight/SkipLink.astro); docs pages once lost it when the component
 * that held it was rewritten for something else, and nothing reported it.
 *
 * Usage:
 *   pnpm lint:landmarks          (after a build)
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { isSignUpLink } from '../src/util/sign-up-links.ts';

const ROOT = 'dist';

/** Pages whose tables are held to the caption/no-empty-cell contract.
 *  allowEmpty grants a page a ceiling of intentionally blank cells. */
const TABLE_PAGES: { page: string; allowEmpty?: number }[] = [
	{ page: 'pricing' },
	{ page: 'products/paas' },
	{ page: 'products/thingsboard-edge' },
	{ page: 'products/thingsboard-pe' },
	{ page: 'google-iot-core-alternative' },
	{ page: 'ce-vs-pe-diff' },
	{ page: 'community-grant-program' },
	{ page: 'use-cases/scada' },
	// The project timeline is a schedule, not a value matrix: a blank cell
	// means the step is inactive that week, and every filled cell states its
	// own duration, so a blank carries no value a reader loses.
	{ page: 'services/development-services', allowEmpty: 49 },
];

const HTTPS_HREF = /href="(https:\/\/[^"]+)"/g;

/** True when the page has a link UtmTracker.astro patches. Both use the one rule in
 *  sign-up-links.ts, so a new Cloud region reaches the script and this check together. */
function hasSignUpLink(html: string): boolean {
	for (const [, href] of html.matchAll(HTTPS_HREF)) {
		if (URL.canParse(href) && isSignUpLink(new URL(href))) return true;
	}
	return false;
}

/** How Astro names the bundled script of UtmTracker.astro in a built page. */
const UTM_SCRIPT = 'UtmTracker.astro_astro_type_script';

/** Starlight puts data-theme on <html>. Legal pages (LegalLayout) render without the
 *  site chrome, cookie notice and tags on purpose, so their links are left alone. */
const SITE_CHROME = /<html[^>]*\sdata-theme=/;

function walkHtml(dir: string): string[] {
	const files: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walkHtml(fullPath));
		else if (entry.name.endsWith('.html')) files.push(fullPath);
	}
	return files;
}

/** Comments can legally contain "<main", so they never count. */
const stripComments = (html: string): string => html.replace(/<!--[\s\S]*?-->/g, '');

const cellText = (cell: string): string =>
	cell
		.replace(/<[^>]+>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

let hasErrors = false;
const fail = (msg: string): void => {
	console.error(msg);
	hasErrors = true;
};

try {
	statSync(ROOT);
} catch {
	console.error(`No ${ROOT}/ directory — run a build first.`);
	process.exit(1);
}

// ── one <main> per page ─────────────────────────────────────────────────────
const pages = walkHtml(ROOT);
let mainOk = 0;
let stubs = 0;
let signUpPages = 0;
const noAttribution: string[] = [];
for (const page of pages) {
	const html = stripComments(readFileSync(page, 'utf-8'));
	// Astro emits redirect entries as bare meta-refresh stubs with no layout —
	// not pages anyone lands on in production (the edge 301 wins), so exempt.
	if (html.includes('<meta http-equiv="refresh"')) {
		stubs += 1;
		continue;
	}
	const mains = html.match(/<main[\s>]/g)?.length ?? 0;
	if (mains === 1) mainOk += 1;
	else fail(`${relative(ROOT, page)}: ${mains} <main> landmarks (want exactly 1)`);

	if (SITE_CHROME.test(html) && hasSignUpLink(html)) {
		signUpPages += 1;
		if (!html.includes(UTM_SCRIPT)) noAttribution.push(relative(ROOT, page));
	}
}

// ── attribution on sign-up links ────────────────────────────────────────────
if (noAttribution.length > 0) {
	fail(
		`${noAttribution.length} of ${signUpPages} page(s) with a sign-up link do not load the UTM script, ` +
			`e.g. ${noAttribution.slice(0, 5).join(', ')}` +
			(noAttribution.length === signUpPages ? ' — none does, so the script may be built under a new name' : '')
	);
}

// ── table integrity on the marketing pages ──────────────────────────────────
for (const { page, allowEmpty = 0 } of TABLE_PAGES) {
	const file = join(ROOT, page, 'index.html');
	let html: string;
	try {
		html = stripComments(readFileSync(file, 'utf-8'));
	} catch {
		fail(`${page}: missing from the build — page renamed, or the list above is stale`);
		continue;
	}

	const selfClosed = html.match(/<t[dh][^>]*\/>/g)?.length ?? 0;
	if (selfClosed > 0) fail(`${page}: ${selfClosed} self-closing <td/>/<th/> cell(s)`);

	const tables = html.match(/<table[\s\S]*?<\/table>/g) ?? [];
	if (tables.length === 0) {
		fail(`${page}: no tables found — page restructured, or the list above is stale`);
		continue;
	}

	let empty = 0;
	for (const [i, table] of tables.entries()) {
		const caption = table.match(/<caption[^>]*>([\s\S]*?)<\/caption>/);
		if (!caption || !cellText(caption[1])) {
			fail(`${page}: table ${i + 1} of ${tables.length} has no caption text`);
		}
		for (const cell of table.match(/<(?:td|th)\b[^>]*>[\s\S]*?<\/(?:td|th)>/g) ?? []) {
			if (!cellText(cell)) empty += 1;
		}
	}
	if (empty > allowEmpty) {
		fail(
			`${page}: ${empty} empty cell(s)` +
				(allowEmpty ? ` — ${allowEmpty} are allowed for the timeline` : '') +
				`; a cell must carry its value as text, visible or visually hidden`
		);
	}
}

if (hasErrors) {
	console.error(`
Error: the invariant(s) above no longer hold. A second <main> usually means a
page template still declares its own landmark — Starlight already provides
one, so the page element should be a <div>. An empty cell usually means an
icon lost its visually hidden text — render values through DataTableValue, or
add a <span class="visually-hidden"> beside the icon. A sign-up link without
the UTM script usually means <UtmTracker /> left starlight/SkipLink.astro, or
the page uses a layout that does not render Starlight's chrome.`);
	process.exit(1);
}

console.log(
	`✓ one <main> on ${mainOk}/${pages.length - stubs} pages (${stubs} redirect stubs exempt); ` +
		`table contract holds on ${TABLE_PAGES.length} marketing pages; ` +
		`the UTM script is on all ${signUpPages} pages with a sign-up link.`
);
