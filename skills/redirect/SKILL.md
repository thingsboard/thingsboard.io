---
name: redirect
description: Configure redirects from old Jekyll docs URLs to new Astro docs URLs. Handles prefix renames, consolidation, single page moves, and removed pages.
---

# Docs Redirect Skill

Configure redirects from old ThingsBoard docs URLs to new Astro site URLs.

## Redirect Types

### PREFIX_RENAME — tree-preserving, 1:1

**User says:** `user-guide/rule-engine-2-0/nodes/action/* are now reference/rule-engine/nodes/action/*`

Both sides have `*`. Each old page maps to a new page at the same relative position.

**Creates:**
- Catch-all `[...slug].astro` at old prefix
- `getStaticPaths()` enumerates content at NEW prefix via `getCollection('docs')`
- `public/_redirects`: splat rule with `:splat`

### CONSOLIDATE — many-to-one

**User says:** `user-guide/install/upgrade-instructions/docker/* are now installation/upgrade-instructions/docker`

Old side has `*`, new side does NOT. Many old pages all redirect to one new page.

**Creates:**
- Catch-all `[...slug].astro` at old prefix
- `getStaticPaths()` with hardcoded slug list from old sitemap data
- `public/_redirects`: splat rule without `:splat`

**Finding old slugs for CONSOLIDATE:** Look up old paths in `old-to-new-docs-mapping.csv` or ask the user for the list.

### SINGLE — one page rename

**User says:** `user-guide/audit-log is now user-guide/security/audit-log`

No `*` on either side. One page moved.

**Creates:**
- Simple `.astro` file at old path
- `public/_redirects`: individual rule

### GONE — removed page

**User says:** `search is gone`

Contains "gone". Page removed with no replacement.

**Creates:**
- Simple `.astro` file redirecting to `/docs/` or nearest section
- `public/_redirects`: individual rule to fallback

---

## Multi-Product Redirects

When a CE page has a redirect, **always check** if PE, PaaS, and PaaS EU variants exist and create redirects for all of them.

**Product prefixes to check:** `pe/`, `paas/`, `paas/eu/`

**How to check:** Use `Glob` to find all product variants of the target page:
```
src/content/docs/docs/{new-path}.mdx         ← CE
src/content/docs/docs/pe/{new-path}.mdx      ← PE
src/content/docs/docs/paas/{new-path}.mdx    ← PaaS
src/content/docs/docs/paas/eu/{new-path}.mdx ← PaaS EU
```

For each existing variant, create:
- A `.astro` redirect page at `src/pages/docs/{prefix}/{old-slug}.astro`
- An entry in `SINGLE_REDIRECTS` with the prefixed paths
- A line in `public/_redirects`

**Example:** `api` → `apis-and-sdks` produces 4 redirects:

| Old | New | File |
|-----|-----|------|
| `/docs/api/` | `/docs/apis-and-sdks/` | `src/pages/docs/api.astro` |
| `/docs/pe/api/` | `/docs/pe/apis-and-sdks/` | `src/pages/docs/pe/api.astro` |
| `/docs/paas/api/` | `/docs/paas/apis-and-sdks/` | `src/pages/docs/paas/api.astro` |
| `/docs/paas/eu/api/` | `/docs/paas/eu/apis-and-sdks/` | `src/pages/docs/paas/eu/api.astro` |

For catch-all PREFIX_RENAME redirects, do the same: create `[...slug].astro` files under each product prefix that has matching content.

---

## Step-by-Step Workflow

**IMPORTANT: Always confirm with the user before making changes.**

### Step 1: Parse the user's message

Determine:
- Old path (everything before "are now" / "is now")
- New path (everything after)
- Type: `*` on both sides → PREFIX_RENAME, `*` only on old → CONSOLIDATE, no `*` → SINGLE, "gone" → GONE

### Step 2: Check multi-product variants

Use Glob to find which product variants of the target page exist. Include all variants in the confirmation table.

### Step 3: Present what will be created

Show the user:
- Redirect type detected
- Files to create/modify (including all product variants)
- Sample redirect rules
- Ask: "Does this look correct?"

### Step 3: After confirmation, create files

#### For PREFIX_RENAME:

1. **Add to `src/data/redirects.ts`** — add a new `CatchAllRedirect` entry (or merge into existing group if `oldPrefix` already exists):

```ts
{
  oldPrefix: 'OLD_PREFIX',
  entries: [
    // Will be auto-populated from content collection by the .astro file
  ],
},
```

Note: For PREFIX_RENAME, the entries array can be empty because the `.astro` file enumerates content dynamically.

2. **Create `src/pages/docs/{OLD_PREFIX}/[...slug].astro`:**

```astro
---
/**
 * Redirects old /docs/{OLD_PREFIX}/[...slug] URLs
 * to the new /docs/{NEW_PREFIX}/[...slug] structure.
 */
import { getCollection } from 'astro:content';

const CONTENT_PREFIX = 'docs/{NEW_PREFIX}';

export async function getStaticPaths() {
	const docs = await getCollection('docs');
	const entries = docs.filter(
		(e) => e.id === CONTENT_PREFIX || e.id.startsWith(CONTENT_PREFIX + '/')
	);

	return entries.map((entry) => {
		const slug =
			entry.id === CONTENT_PREFIX
				? undefined
				: entry.id.replace(CONTENT_PREFIX + '/', '');
		return { params: { slug } };
	});
}

const { slug } = Astro.params;
const target = slug ? `/docs/{NEW_PREFIX}/${slug}/` : `/docs/{NEW_PREFIX}/`;

return Astro.redirect(target, 301);
---
```

3. **Append to `public/_redirects`:**
```
/docs/{OLD_PREFIX}/* /docs/{NEW_PREFIX}/:splat 301
```

#### For CONSOLIDATE:

1. **Determine all old slugs.** Check `old-to-new-docs-mapping.csv` or ask the user. These are the individual page paths under the old prefix.

2. **Add to `src/data/redirects.ts`** — add entries with hardcoded slugs:

```ts
{
  oldPrefix: 'OLD_PREFIX',
  entries: [
    { slug: 'v3-0-x', target: '/docs/{NEW_TARGET}/' },
    { slug: 'v3-1-x', target: '/docs/{NEW_TARGET}/' },
    // ... all old slugs point to the same target
  ],
},
```

3. **Create `src/pages/docs/{OLD_PREFIX}/[...slug].astro`:**

```astro
---
/**
 * Redirects old /docs/{OLD_PREFIX}/* URLs to /docs/{NEW_TARGET}/.
 * All old versioned pages are consolidated into a single page.
 */
import { getCatchAllEntries } from '~/data/redirects';

const PREFIX = '{OLD_PREFIX}';

export function getStaticPaths() {
	return getCatchAllEntries(PREFIX).map((e) => ({
		params: { slug: e.slug || undefined },
		props: { target: e.target },
	}));
}

const { target } = Astro.props as { target: string };
return Astro.redirect(target, 301);
---
```

4. **Append to `public/_redirects`:**
```
/docs/{OLD_PREFIX}/* /docs/{NEW_TARGET}/ 301
```

#### For SINGLE / GONE:

1. **Add to `src/data/redirects.ts`** — add to `SINGLE_REDIRECTS`:

```ts
{ oldPath: 'OLD_PATH', target: '/docs/{NEW_PATH}/' },
```

2. **Create `src/pages/docs/{OLD_PATH}.astro`** (or `src/pages/docs/{OLD_DIR}/index.astro` if old path is a directory):

```astro
---
return Astro.redirect('/docs/{NEW_PATH}/', 301);
---
```

3. **Append to `public/_redirects`:**
```
/docs/{OLD_PATH}/ /docs/{NEW_PATH}/ 301
```

### Step 4: Regenerate output files

```bash
pnpm generate:redirects
```

### Step 5: Update CSV

Update `old-to-new-docs-mapping.csv`:
- Set `redirect_type` to the detected type (PREFIX_RENAME, CONSOLIDATE, SINGLE, GONE)
- Set `new_slug` and `redirect_target` to the new path
- Set `redirect_rule` to the Netlify rule

### Step 6: Verify

```bash
pnpm build:fast
```

Check that no route conflicts occur and sample redirect pages exist in `dist/`.

---

## Merging into existing catch-all groups

When the user provides a mapping that falls under an existing catch-all prefix (e.g., adding more entries to `user-guide/install`), **merge into the existing group** in `redirects.ts` rather than creating a new file:

1. Add new entries to the existing `CatchAllRedirect` in `src/data/redirects.ts`
2. The existing `[...slug].astro` file already handles them (if it uses `getCatchAllEntries()`)
3. If the `.astro` file uses `getCollection('docs')` (PREFIX_RENAME pattern), new content pages are picked up automatically — no data file changes needed

---

## Key Files

| File | Purpose |
|------|---------|
| `src/data/redirects.ts` | Centralized redirect rules and helpers |
| `src/pages/docs/**/*.astro` | Page-based redirect files |
| `public/_redirects` | Netlify-format redirect rules |
| `public/redirects.json` | JSON map for Node.js middleware |
| `old-to-new-docs-mapping.csv` | Migration tracking CSV |
| `scripts/generate-redirects.ts` | Generates `_redirects` and `redirects.json` |

## Astro scoping gotcha

**All variables used inside `getStaticPaths()` must be declared INSIDE the function.** Variables declared in the frontmatter outside `getStaticPaths()` are NOT accessible — Astro runs `getStaticPaths()` in a separate scope at build time.

```astro
// ❌ WRONG — PLATFORMS is not defined inside getStaticPaths
const PLATFORMS = ['ubuntu', 'centos'];
export function getStaticPaths() {
  for (const p of PLATFORMS) { ... } // ReferenceError
}

// ✅ CORRECT — declare inside the function
export function getStaticPaths() {
  const platforms = ['ubuntu', 'centos'];
  for (const p of platforms) { ... }
}
```

Imports (`import { ... } from '...'`) ARE available inside `getStaticPaths()`.

## Reference patterns

- `src/pages/docs/pe/edge/[...slug].astro` — existing PREFIX_RENAME pattern (content-enumerated)
- `src/pages/docs/tutorial/getting-started/[...slug].astro` — existing PREFIX_RENAME pattern
- `src/pages/docs/contact-us-thanks.astro` — existing SINGLE redirect pattern
