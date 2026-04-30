/**
 * Checks all MDX files for <Steps> components that use a markdown numbered list
 * inside a JSX expression block {…}.
 *
 * Inside {condition && (<>…<Steps>1. item</Steps>…</>)}, MDX does NOT process
 * markdown — the numbered list stays as raw text, never compiled to <ol>.
 * Starlight's <Steps> then receives no child elements and throws:
 *   "The `<Steps>` component expects its content to be a single ordered list
 *    (`<ol>`) but found no child elements."
 * This error only surfaces during llms-full.txt generation, far from the source.
 *
 * Fix: replace the markdown list with explicit <ol>/<li> HTML.
 * See CLAUDE.md "Rules for _includes" for details.
 *
 * Usage:
 *   pnpm lint:steps
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

function walkMdx(dir: string): string[] {
	const files: string[] = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) files.push(...walkMdx(fullPath));
		else if (entry.name.endsWith('.mdx')) files.push(fullPath);
	}
	return files;
}

/**
 * Counts the net brace depth ({…}) at a given character index in the content,
 * skipping code fences (``` and ~~~) to avoid counting literal braces in code.
 *
 * This is a best-effort heuristic: it correctly handles all well-formed MDX
 * (balanced braces in JSX expressions and attributes). It does NOT handle
 * unbalanced braces inside JS string literals or regex literals, but those
 * patterns are not expected in documentation MDX files.
 */
function braceDepthAt(content: string, index: number): number {
	const text = content.slice(0, index);
	let depth = 0;
	let inCodeFence = false;
	let fenceMarker = '';

	for (const line of text.split('\n')) {
		const trimmed = line.trimStart();

		if (!inCodeFence && (trimmed.startsWith('```') || trimmed.startsWith('~~~'))) {
			inCodeFence = true;
			fenceMarker = trimmed.startsWith('```') ? '```' : '~~~';
			continue;
		}
		if (inCodeFence) {
			if (trimmed.startsWith(fenceMarker)) inCodeFence = false;
			continue;
		}

		for (const ch of line) {
			if (ch === '{') depth++;
			else if (ch === '}') depth--;
		}
	}

	return depth;
}

// Replace MDX block comments (the `{/* … */}` form) with same-length
// whitespace so brace depth counting and offset-based line numbers stay correct.
function stripMdxComments(content: string): string {
	return content.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, (m) =>
		m.replace(/[^\n]/g, ' '),
	);
}

function checkFile(filePath: string): Array<{ line: number }> {
	const raw = readFileSync(filePath, 'utf-8');
	const content = stripMdxComments(raw);
	const errors: Array<{ line: number }> = [];

	const stepsRegex = /<Steps>([\s\S]*?)<\/Steps>/g;
	let match: RegExpExecArray | null;

	while ((match = stepsRegex.exec(content)) !== null) {
		// Only care about <Steps> whose content has markdown numbered list items
		if (!/^\s*\d+\.\s/m.test(match[1])) continue;

		if (braceDepthAt(content, match.index) > 0) {
			const line = content.slice(0, match.index).split('\n').length;
			errors.push({ line });
		}
	}

	return errors;
}

let hasErrors = false;

for (const file of walkMdx('src/content')) {
	const rel = relative(process.cwd(), file);
	for (const { line } of checkFile(file)) {
		console.error(`${rel}:${line}: <Steps> with markdown list inside JSX expression {…}`);
		hasErrors = true;
	}
}

if (hasErrors) {
	console.error(`
Error: the <Steps> component(s) above use a markdown numbered list inside a
JSX expression {…}. Inside {…} MDX does not process markdown, so the list
is never compiled to <ol>. Starlight's <Steps> then throws at render time
with a confusing "no child elements" error during llms-full.txt generation.

Fix — replace the markdown list with explicit <ol>/<li> HTML:

  <Steps>
    <ol>
      <li>First step.</li>
      <li>Second step.</li>
    </ol>
  </Steps>

See CLAUDE.md "Rules for _includes" for details.`);
	process.exit(1);
}

console.log('✓ No <Steps>-in-JSX-expression issues found.');
