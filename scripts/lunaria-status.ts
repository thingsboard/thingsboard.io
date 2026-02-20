import { lunaria, type LocalizationStatus } from '@lunariajs/core';
import { validateConfig, type LunariaUserConfig } from '@lunariajs/core/config';
import rawConfig from '../lunaria.config.ts';

type Localization = LocalizationStatus['localizations'][string];
type PresentLocalization = Extract<Localization, { isMissing: false }>;
function present(loc: Localization): loc is PresentLocalization {
	return !loc.isMissing;
}

async function main() {
	console.log('Loading Lunaria configuration...\n');

	const userConfig = rawConfig as unknown as LunariaUserConfig;
	const config = validateConfig(userConfig);

	console.log('Config:', JSON.stringify(config, null, 2));

	const status = await lunaria(userConfig);

	const sourcePaths = status.map((f: LocalizationStatus) => f.sourceFile.path);
	console.log('\nSource paths found:', sourcePaths.length);
	if (sourcePaths.length > 0) {
		console.log('First 5 paths:', sourcePaths.slice(0, 5));
	}

	console.log('\n=== Translation Status ===\n');

	let totalFiles = 0;
	let translatedFiles = 0;
	let outdatedFiles = 0;
	let missingFiles = 0;

	for (const file of status) {
		totalFiles++;
		const sourcePath = file.sourceFile.path;

		console.log(`Source: ${sourcePath}`);

		for (const [lang, localization] of Object.entries(file.localizations)) {
			if (!present(localization)) {
				missingFiles++;
				console.log(`  [${lang}] ✗ Missing`);
			} else if (localization.isOutdated) {
				outdatedFiles++;
				console.log(`  [${lang}] ⚠ Outdated (needs update)`);
			} else {
				translatedFiles++;
				console.log(`  [${lang}] ✓ Up to date`);
			}
		}
		console.log('');
	}

	console.log('=== Summary ===');
	console.log(`Total source files: ${totalFiles}`);
	console.log(`Translated (up-to-date): ${translatedFiles}`);
	console.log(`Outdated: ${outdatedFiles}`);
	console.log(`Missing: ${missingFiles}`);

	const coverage = totalFiles > 0 ? ((translatedFiles / totalFiles) * 100).toFixed(1) : 0;
	console.log(`\nTranslation coverage: ${coverage}%`);
}

main().catch(console.error);
