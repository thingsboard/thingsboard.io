# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **ThingsBoard documentation site**, built with **Astro + Starlight**. It's a multi-language documentation site with 14 supported languages.

## Commands

```bash
# Install dependencies (requires pnpm)
pnpm install

# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm build:fast       # Fast build (skips OG image generation) — use this for verification

**Build policy:** Before running any build, always ask the user: "Run `pnpm build:fast` to verify, or skip?"
pnpm preview          # Preview production build

# Quality checks
pnpm check            # TypeScript/Astro type checking
pnpm lint:eslint      # ESLint
pnpm lint:linkcheck   # Link validation (runs build first)
pnpm lint:linkcheck:nobuild  # Link validation (skip build)
pnpm lint:slugcheck   # Validate slugs match across languages
pnpm format           # Format with Prettier
```

## Architecture

### Content System

All documentation lives in `src/content/docs/{lang}/` as `.mdx` files with YAML frontmatter. Content uses Astro's Content Collections with type-safe Zod schemas defined in `src/content.config.ts`.

**Schema types** determine frontmatter shape: `base`, `deploy`, `backend`, `cms`, `media`, `integration`, `migration`, `tutorial`, `recipe`. The `type` frontmatter field selects the schema.

**Sidebar** is configured in `astro.sidebar.ts` with 5 top-level tabs (Start, Guides, Reference, Integrations, Third-Party). Labels are translated via `src/content/nav/{lang}.ts` files.

### i18n

- 14 languages configured in `config/locales.ts`
- English (`en`) is the default/fallback language
- Each language has its own directory under `src/content/docs/`
- `i18nReady: true` frontmatter marks pages ready for translation
- Translation status tracked by Lunaria (`lunaria.config.ts`)
- Arabic (`ar`) uses RTL

### Path Alias

**Always use the `@`-prefixed path aliases for local imports** — never relative paths (`../../`) and never the legacy `~/*` alias for new code. Aliases are configured in `tsconfig.json`:

| Alias | Maps to |
|-------|---------|
| `@models/*` | `src/models/*` |
| `@components/*` | `src/components/*` |
| `@layouts/*` | `src/layouts/*` |
| `@styles/*` | `src/styles/*` |
| `@data/*` | `src/data/*` |
| `@util/*` | `src/util/*` |
| `@includes/*` | `src/content/_includes/*` |
| `@root/*` | `src/*` (catch-all for paths without a dedicated alias, e.g. `@root/consts`, `@root/pages/...`) |

Prefer the most specific alias whenever one matches the target folder; fall back to `@root/*` only for `src/` paths no other alias covers.

Example: `import { foo } from '@util/fetch-utils';` (not `~/util/fetch-utils` or `../../util/fetch-utils`).

`~/*` (maps to `./src/*`) still exists for legacy code, but always prefer an `@` alias. SCSS `@use`/`@import` use **relative paths** (e.g., `@use '../../styles/_variables.scss' as *;`); inside `src/styles/` use sibling imports like `@use 'variables' as *;`.

### Starlight Customization

Custom component overrides live in `src/components/starlight/` — these replace default Starlight components (Hero, Sidebar, Footer, Search, etc.).

Landing page components are in `src/components/Landing/` (Card, ListCard, SplitCard, Discord).

### Available Components

Use the `edit-doc` skill for full props, usage examples, and authoring rules for these components:

- **ImageGallery** — responsive image grid with lightbox, product suffix resolution, dark theme variants
- **MultiProductImageGallery** — auto product-suffix wrapper around ImageGallery
- **DocImage** — single optimized image with width/alignment options
- **Banner** — product/info banners (peFeature, ce, pe, cloud, trendz variants)
- **Badge** — tb-badge accent badge for sidebar and page titles
- **YouTubeVideo** — responsive 16:9 YouTube embed
- **ConditionalHeading** — TOC-aware heading for use inside JSX conditionals in `_includes`
- **InstallationCardGrid** — installation option card grid
- **RuleNodeCardGrid** — rule node category card grid
- **DocLink** — product-aware internal links (always use instead of bare markdown links)
- **Code blocks** — `maxLines`, `collapsible`, `wrap`, `download='file.ext'` meta options; `<Code>` component for dynamic code

### Product System

All product identifiers live in `src/models/site.models.ts` as the `Products` enum:

| Enum value | URL prefix | Notes |
|------------|------------|-------|
| `CE` | *(empty)* | Default/root product |
| `PE` | `pe/` | |
| `PAAS` | `paas/` | Sub-variant: PAAS_EU (`paas/eu/`) |
| `EDGE` | `edge/` | Sub-variant: EDGE_PE (`edge/pe/`) |
| `TRENDZ` | `trendz/` | |
| `GW` | `iot-gateway/` | |
| `TBMQ` | `mqtt-broker/` | Sub-variant: TBMQ_PE (`mqtt-broker/pe/`) |
| `MOBILE` | `mobile/` | Sub-variant: MOBILE_PE (`mobile/pe/`) |
| `LICENSE` | `license-server/` | |

**URL pattern:** `/[lang/]docs/[product-prefix][page-slug]/`

**Content directories** mirror the product prefixes under `src/content/docs/docs/`:
```
src/content/docs/docs/
  ├── user-guide/        ← CE pages
  ├── pe/user-guide/     ← PE pages
  ├── paas/              ← Cloud pages
  ├── edge/              ← Edge pages
  ├── trendz/            ← Trendz pages
  ├── iot-gateway/       ← IoT Gateway pages
  ├── mqtt-broker/       ← TBMQ pages
  ├── mobile/            ← Mobile pages
  └── license-server/    ← License Server pages
```

### Shared Content via _includes

Documentation pages are thin wrappers that import a shared **include file** and pass the current `product` as a prop. This avoids duplicating content across products.

```
src/content/_includes/docs/{path}/{page}.mdx   ← actual content (shared)
src/content/docs/docs/{path}/{page}.mdx         ← CE stub (passes Products.CE)
src/content/docs/docs/pe/{path}/{page}.mdx      ← PE stub (passes Products.PE)
```

**Product-conditional content:** wrap it in `<ShowFor product={props.product} show={[Products.PE]}>…</ShowFor>` and write **normal Markdown** inside (`**bold**`, `-`/`1.` lists, `` `code` ``, `<Tabs>`/`<Aside>`/`<Code>` components). Do **not** use `{props.product === … && (<>…</>)}` with hand-written `<p>`/`<ul>`/`<li>`/`<code>` HTML — a JSX `{…}` expression disables Markdown parsing, forcing ugly raw HTML; `<ShowFor>` does not. The one exception: headings inside still use `<ConditionalHeading … showFor="…">` (not `##`), because the TOC plugin needs that metadata to add them conditionally.

See the `edit-doc` skill for detailed _includes rules, conditional rendering patterns, and common pitfalls.

### Version Constants

`src/data/versions.ts` — centralized product version strings. **Never hardcode version strings** in Docker image tags, download URLs, or code blocks. Import from `~/data/versions`.

Available: `CE_FULL_VER`, `PE_FULL_VER`, `TRENDZ_VER`, `EDGE_VER`, `EDGE_PE_VER`, `TBMQ_VER`, `TBMQ_PE_VER`.

### Custom Plugins

- `config/plugins/remark-fallback-lang.ts` — marks untranslated content
- `config/plugins/rehype-tasklist-enhancer.ts` — enhanced task lists
- `config/plugins/rehype-mdx-include-headings.ts` — extracts headings from `_includes` MDX files and injects them into the page TOC; supports `<ConditionalHeading>` for product-conditional headings
- `config/plugins/llms-txt.ts` — generates llms.txt
- `config/plugins/smoke-test.ts` — build validation

### Pages vs Content

- `src/content/docs/` — documentation pages rendered by Starlight
- `src/pages/` — special routes: root redirect, language redirects, 404, OG image generation, use-cases, case-studies
- `src/pages/[lang]/` — dynamic per-language routes (index, install, tutorial redirects)

### Typography & Design System

All non-doc pages (landing, use-cases, case-studies, standalone pages) share a unified typography system defined as SCSS mixins in `src/styles/_variables.scss`. Use the `typography` skill for the full reference: semantic mixins (`page-title`, `section-title`, `text-m`, etc.), spacing scale, breakpoints, and dark-theme color conventions.

Key rule: **Never hardcode font values** — use mixins. **Never use compile-time SCSS color variables** for theme-dependent colors — use CSS custom properties (`var(--color-*)`).

### Use-Case Pages

Data-driven pages at `/use-cases/{slug}`. Use the `use-case-pages` skill for data types, page composition, layout, and section components.

Key dirs: `src/data/use-cases/`, `src/components/UseCase/`, `src/pages/use-cases/`.

### Case-Study Pages

Data-driven pages at `/case-studies/{slug}`. Use the `case-study-pages` skill for data types, page composition, layout, and section components.

Key dirs: `src/data/case-studies/`, `src/components/CaseStudy/`, `src/pages/case-studies/`.

### Clients Feedback Page

Data-driven page at `/clients-feedback/`. Key dirs: `src/data/clients-feedback/`, `src/components/Feedback/`, `src/pages/clients-feedback/`.

## Redirects

**Single source of truth:** `src/data/redirects.ts`. Four exports, chosen by pattern shape:

| Export | Use for | Example |
|---|---|---|
| `SINGLE_REDIRECTS` | one-off `/docs/*` page rename | `{ oldPath: 'pe/user-guide/roadmap', target: '/docs/pe/releases/roadmap/' }` |
| `CATCH_ALL_REDIRECTS` | `/docs/*` prefix rename (whole tree renamed 1:1) | `{ oldPrefix: 'pe/edge', entries: [] }` → `/docs/pe/edge/* → /docs/edge/pe/:splat` |
| `DYNAMIC_REDIRECTS` | splat / `:placeholder` patterns that aren't a simple prefix rename | `/blog/category/:category/page/* → /blog/?category=:category` |
| `NON_DOCS_REDIRECTS` | everything outside `/docs/*` (marketing, `/products/*`, `/industries/*`, external targets) | `/iot-use-cases/` → `/use-cases/` |

**Workflow to add a redirect:**

1. Edit `src/data/redirects.ts` (pick the export that matches the pattern).
2. For new `CATCH_ALL_REDIRECTS` prefixes with empty entries, populate the `newPrefix` field on the same entry — the generator reads it directly.
3. Run `pnpm generate:redirects` — regenerates `public/_redirects` and `public/redirects.json`.
4. Commit both the data change and the regenerated output.

**Two places, two purposes:**

- `public/_redirects` — served by Cloudflare Pages. Gives **real 301s at the edge**. Cloudflare rule: *"Redirects are always followed, regardless of whether or not an asset matches the incoming request."* ([docs](https://developers.cloudflare.com/pages/configuration/redirects/)) — so a matching rule here always wins, even if a static HTML file exists at the same path.
- `astro.redirects.ts` → `redirects:` — used by Astro in `pnpm dev` / `pnpm preview` so old URLs resolve locally instead of 404-ing. In static build mode these emit a `200 + <meta refresh>` HTML stub, which Cloudflare's edge rule then supersedes in production. The file spreads `public/redirects.json` (all `/docs/*`) + `device-library-redirects.json` + `NON_DOCS_REDIRECTS`, so a single run of `pnpm generate:redirects` keeps dev and prod in sync.

**Why page-based `.astro` redirect stubs are deprecated:** they only emit meta-refresh pages (no real 301), they pollute the sitemap, and they duplicate rules already present in `_redirects`. The generator in `src/data/redirects.ts` → `public/_redirects` covers them all.

**Hard rules:**

- **Do NOT create new `.astro` stub files** under `src/pages/docs/` that only call `Astro.redirect()`. Put the entry in `src/data/redirects.ts` instead.
- **Do NOT hand-edit `public/_redirects` or `public/redirects.json`** below the auto-generated markers — they're rewritten by `pnpm generate:redirects`. Edit `src/data/redirects.ts` and regenerate.
- **Keep dynamic rules (splat / `:placeholder`) under 100.** Cloudflare Pages limit is 2,000 static + 100 dynamic = 2,100 total; the generator already quarantines dynamic rules to the tail block to keep the static zone uncapped.

## OG image generation

Per-page OG cards (1200×630 PNG) are generated at build time by Satori + Resvg. Each content collection has its own static endpoint under `src/pages/open-graph/`. One JSX template (`_shared/Card.tsx`) is varied only by an "eyebrow" line and an optional bottom-left meta line.

**Files:**
- `src/pages/open-graph/_shared/Card.tsx` — template
- `src/pages/open-graph/_shared/render.ts` — Satori → Resvg pipeline + content-hash cache
- `src/pages/open-graph/_shared/page-data.ts` — collection enumerators
- `src/pages/open-graph/_shared/jsx-runtime.ts` — minimal Satori-shaped JSX shim (no React)
- `src/pages/open-graph/{collection}/[…].png.ts` — static endpoints (docs, blog, case-studies, use-cases, careers, iot-hub, partners, pages)
- `src/util/ogContext.ts` — eyebrow / label helpers + `MARKETING_ALLOWLIST`
- `src/util/getOgImageUrl.ts` — pathname → OG PNG URL aggregator

**Key facts:**
- Cache lives at `node_modules/.og-cache/` (gitignored). Bump `TEMPLATE_VERSION` in `render.ts` to invalidate.
- `SKIP_OG=true` (used by `pnpm build:fast`) makes `renderCard` return the global fallback instead of running Satori — endpoints still register paths.
- Pages outside `MARKETING_ALLOWLIST` (or otherwise unmapped) fall back to `/thingsboard-og.png` via `SeoMeta.astro`.
- Roboto 400/500/700 (7 subsets each: latin, latin-ext, cyrillic, cyrillic-ext, greek, greek-ext, vietnamese) + Noto Sans Symbols 400 for arrows. CJK / Arabic / Hebrew not covered — render as `.notdef`. Site CSS uses an unrelated system font stack; no `FONT_CREDENTIALS` env var.
- **Astro dev quirk:** `trailingSlash: 'always'` makes dev-server 404 dynamic-route URLs that end in `.png`. `SeoMeta.astro` and `routeData.ts` append `/` to `og:image` only when `import.meta.env.DEV` so dev links resolve to `localhost:.../foo.png/` while production HTML keeps the clean `.png` URL Cloudflare Pages serves directly.

**To add a new marketing landing to OG generation:** add its pathname to `MARKETING_ALLOWLIST` in `src/util/ogContext.ts` and rebuild.

## Releasing a New Version

Use the `release` skill for the full checklist. Key files:
- `src/data/versions.ts` — version constants
- `src/models/upgrade-instructions.ts` — `UPGRADE_VERSIONS` array (newest first)
- `src/models/releases-table.ts` — `RELEASE_FAMILIES` array (newest first)

## Code Style

- Tabs for indentation in code files; spaces for JSON, Markdown, MDX, YAML, TOML
- Prettier with `prettier-plugin-astro`, printWidth 100, single quotes, trailing commas
- ESLint flat config with TypeScript and Astro plugins
- **No Figma references in comments.** Don't write "Figma", "Figma node 1234:5678", or any tool-specific node IDs in source comments — they're meaningless to anyone without access to the Figma file and rot fast. Refer to the visual spec as "the design" (or "per the design", "matches the design") and describe what's actually being implemented (sizes, colors, behaviors) so the comment stands on its own.

## CI Checks

GitHub Actions runs: `astro check`, `eslint`, `slugcheck`.

`lint:linkcheck` runs in a separate CI pipeline (not GitHub Actions) because it needs a full build. It must also pass before a PR can merge — so run it locally before requesting review, especially when adding, renaming, or removing pages, changing redirects, or editing internal links. Use `pnpm lint:linkcheck` for a clean check, or `pnpm lint:linkcheck:nobuild` if you already produced a build in this session and just want to re-validate links.
