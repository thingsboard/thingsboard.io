import glob from 'fast-glob';
import kleur from 'kleur';

/**
 * Non-root locale codes.
 * Root locale (English) content lives directly in `src/content/docs/`
 * without a locale prefix. Non-root locales use a prefix directory (e.g. `uk/`).
 */
const NON_ROOT_LOCALES = ['uk'];

/** Makes sure that all translations' slugs match the root (English) slugs. */
class SlugChecker {
	async run() {
		const errors = await this.#findMismatchedSlugs();
		this.#outputResult(errors);
	}

	/** Load all Markdown pages and check non-root locale pages have counterparts in root locale. */
	async #findMismatchedSlugs() {
		const rootSlugs = new Set();
		/** @type {Record<string, string[]>} */
		const errorMap = {};
		(await glob('./src/content/docs/**/*.{md,mdx}'))
			.filter((file) => !file.endsWith('404.mdx'))
			.map((file) => {
				const relativePath = file.replace('./src/content/docs/', '');
				const locale = NON_ROOT_LOCALES.find((l) => relativePath.startsWith(l + '/'));
				if (locale) {
					return [locale, relativePath.substring(locale.length + 1)];
				}
				rootSlugs.add(relativePath);
				return ['root', relativePath];
			})
			.forEach(([lang, slug]) => {
				if (lang === 'root') return;
				if (rootSlugs.has(slug)) return;
				if (!errorMap[lang]) errorMap[lang] = [];
				errorMap[lang].push(slug);
			});
		return Object.entries(errorMap);
	}

	/**
	 * Print the result of the slug check to the console.
	 * @param {[lang: string, slugs: string[]][]} errors
	 */
	#outputResult(errors) {
		if (errors.length === 0) {
			console.log(kleur.green().bold(`\n*** Found no translations with mismatched slugs\n`));
			return;
		}
		const prefix = kleur.gray(`  [${kleur.red().bold(' ✖ ')}] `);
		let errorCount = 0;
		for (const [lang, slugs] of errors) {
			errorCount += slugs.length;
			const summary = [`\n/${lang}/`, ...slugs.map((slug) => prefix + slug)];
			console.error(summary.join('\n'));
		}
		console.error(kleur.red().bold(`\n*** Found ${errorCount} translations with mismatched slugs`));
		console.error('    Rename the files listed above to match English slugs\n');
		process.exit(1);
	}
}

const checker = new SlugChecker();
checker.run();
