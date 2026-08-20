/**
 * Checks the distributor dataset's invariants.
 *
 * These rules used to live in the finder page's frontmatter, which only runs
 * during a full astro build — so they never fired in the GitHub Actions lane.
 * Importing the data module validates the dataset against the region table; the
 * assertions below cover the coverage rules themselves, so a refactor that stops
 * expanding region-wide coverage fails here rather than on the live page, where
 * a card missing from a filter looks identical to a partner who doesn't cover
 * that country.
 *
 * Exits non-zero if any invariant is broken.
 *
 * Usage: pnpm lint:distributors
 */

import {
	COVERED_COUNTRIES,
	DISTRIBUTORS,
	REGION_MEMBERSHIP,
	REGIONS,
	findCoverageErrors,
	getCoverage,
	getNamedCountries,
	type Distributor,
} from '../src/data/partners/index.ts';

const failures: string[] = [];

function check(label: string, ok: boolean, detail = '') {
	if (!ok) failures.push(detail ? `${label} — ${detail}` : label);
}

for (const region of REGIONS) {
	check(`region "${region}" classifies no countries`, REGION_MEMBERSHIP[region].length > 0);
}

for (const d of DISTRIBUTORS) {
	check(`"${d.name}" lists no regions`, d.regions.length > 0);

	const coverage = getCoverage(d);
	check(`"${d.name}" covers no countries`, coverage.length > 0);

	if (d.countries === 'region-wide') {
		const union = new Set(d.regions.flatMap((r) => REGION_MEMBERSHIP[r]));
		check(
			`"${d.name}" covers whole regions but its coverage is not their union`,
			coverage.length === union.size && coverage.every((c) => union.has(c)),
			`${coverage.length} countries vs ${union.size} in ${d.regions.join(' + ')}`,
		);
		check(
			`"${d.name}" covers whole regions but still contributes dropdown options`,
			getNamedCountries(d).length === 0,
		);
	} else {
		check(
			`"${d.name}" coverage differs from the countries it lists`,
			coverage.join('|') === [...d.countries].join('|'),
		);
	}
}

const named = Array.from(new Set(DISTRIBUTORS.flatMap(getNamedCountries))).sort();
check(
	'COVERED_COUNTRIES is not the set of countries distributors name',
	COVERED_COUNTRIES.join('|') === named.join('|'),
	`${COVERED_COUNTRIES.length} offered vs ${named.length} named`,
);

// Both ways the table and the data can drift apart must be caught, not just the
// one the current data happens to exercise. Each fixture perturbs the real data
// by one country so only its own half of the check can fire, and the offending
// name has to appear in the message — otherwise a test passes on the other
// half's error and stops guarding anything.
const unclassified: Distributor = {
	name: 'fixture',
	regions: ['Europe'],
	countries: ['Wakanda'],
	email: '',
	website: '',
};
const missing = findCoverageErrors([...DISTRIBUTORS, unclassified], REGION_MEMBERSHIP);
check(
	'a country no region classifies does not trip findCoverageErrors',
	missing.some((e) => e.includes('Wakanda')),
	missing.join(' | ') || 'no errors returned',
);

const stray = findCoverageErrors(DISTRIBUTORS, {
	...REGION_MEMBERSHIP,
	Europe: [...REGION_MEMBERSHIP.Europe, 'Atlantis'],
});
check(
	'a table country nobody covers does not trip findCoverageErrors',
	stray.some((e) => e.includes('Atlantis')),
	stray.join(' | ') || 'no errors returned',
);
check(
	'the live dataset does not pass findCoverageErrors',
	findCoverageErrors(DISTRIBUTORS, REGION_MEMBERSHIP).length === 0,
	findCoverageErrors(DISTRIBUTORS, REGION_MEMBERSHIP).join(' | '),
);

if (failures.length > 0) {
	console.error(`✗ ${failures.length} problem(s) in the distributor data:`);
	for (const failure of failures) console.error(`  - ${failure}`);
	process.exit(1);
}

const wholeRegion = DISTRIBUTORS.filter((d) => d.countries === 'region-wide');
console.log(
	`✓ ${DISTRIBUTORS.length} distributors, ${COVERED_COUNTRIES.length} countries offered, ` +
		`${wholeRegion.length} covering whole regions`,
);
