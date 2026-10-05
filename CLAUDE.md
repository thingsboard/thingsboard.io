# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **ThingsBoard documentation site**, built with **Astro + Starlight**. It is English-only today; the i18n scaffolding is in place but unused (see [i18n](#i18n)).

## Commands

```bash
# Install dependencies (requires pnpm)
pnpm install

# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm build:fast       # Fast build (skips OG image generation) — use this for verification
pnpm build:linkcheck  # Build used by linkcheck (also skips llms.txt and image optimization)
pnpm preview          # Preview production build

# Quality checks
pnpm check            # TypeScript/Astro type checking
pnpm lint:eslint      # ESLint
pnpm lint:linkcheck   # Link validation (runs build first)
pnpm lint:linkcheck:nobuild  # Link validation (skip build)
pnpm lint:slugcheck   # Validate slugs match across languages
pnpm lint:steps       # Catch <Steps> lists inside JSX {…} blocks (Markdown not parsed there)
pnpm lint:redirects   # Detect redirect chains in the redirect data
pnpm lint:dualrender  # Validate IoT Hub server/client card render parity (needs a build)
pnpm lint:landmarks   # One <main> per page + marketing table integrity (needs a build)
pnpm format           # Format with Prettier (format:code / format:imports / format:ci are the parts)

# Generators
pnpm generate:redirects   # Regenerate public/_redirects + public/redirects.json (see Redirects)
pnpm generate:nav-sprite  # Rebuild the mega-menu icon sprite after editing an icon (builds run it automatically)
```

**Build policy:** Before running any build, always ask the user: "Run `pnpm build:fast` to verify, or skip?"

## Architecture

### Content System

All documentation lives in `src/content/docs/{lang}/` as `.mdx` files with YAML frontmatter. Content uses Astro's Content Collections with type-safe Zod schemas defined in `src/content.config.ts`.

**Schema types** determine frontmatter shape: `base`, `deploy`, `backend`, `cms`, `media`, `integration`, `migration`, `tutorial`, `recipe`. The `type` frontmatter field selects the schema.

**Sidebar** is configured in `astro.sidebar.ts`. Each product has its own tab set, mapped from its URL prefix in `sidebarTabLinksByPrefix`; CE's is *Getting Started, Guides, Build with AI, Installation, APIs & SDKs, Reference*. The exported `sidebar` concatenates every product's items, and `src/routeData.ts` filters it down to the current product at request time.

### i18n

The site is currently **English only**. `astro.config.ts` declares one locale, `root`
(`lang: 'en'`); a `uk` entry sits commented out next to it, waiting on translations. There
are no per-language content directories — everything lives under `src/content/docs/docs/`.

`lunaria.config.ts` and the `lunaria:build` script are carried over from upstream and will
matter once a second locale is enabled. Until then, do not add `i18nReady` frontmatter or
`src/content/nav/{lang}.ts` files: nothing reads them.

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

Landing page components are in `src/components/Landing/` (Card, ListCard, SplitCard, HeaderContent).

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
- **DataTable** — semantic shell for comparison tables (caption → optional colgroup → `th scope="col"` header → tbody slot); callers pass `<tr>` rows whose first cell is `<th scope="row">`. `scrollable` wraps the table in a `role="region"` named from the caption, which `initScrollRegions` drops again on viewports where the table does not overflow. Styling contract: the caller's `<style>` must be `is:global`, nested under the caller's own class — scoped rules cannot match the shell DataTable renders
- **DataTableValue** — one comparison cell's value, always as text; icons are decorative, an empty value fails the build
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
| `IOT_HUB` | `iot-hub/` | |

**URL pattern:** `/[lang/]docs/[product-prefix][page-slug]/`

**Content directories** mirror the product prefixes under `src/content/docs/docs/`:
```
src/content/docs/docs/
  ├── user-guide/, getting-started/, installation/, reference/, releases/, …  ← CE pages (root)
  ├── pe/                ← PE pages
  ├── paas/              ← Cloud pages (paas/eu/ for EU)
  ├── edge/              ← Edge pages (edge/pe/ for Edge PE)
  ├── trendz/            ← Trendz pages
  ├── iot-gateway/       ← IoT Gateway pages
  ├── mobile/            ← Mobile pages
  ├── license-server/    ← License Server pages
  ├── iot-hub/           ← IoT Hub docs (user and contribution guides)
  └── private-cloud/     ← Private Cloud pages
```

TBMQ (`mqtt-broker/`) has a prefix in the enum but no content directory yet.

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

`src/data/versions.ts` — centralized product version strings. **Never hardcode version strings** in Docker image tags, download URLs, or code blocks. Import from `@data/versions`.

Eighteen constants are exported. CE, EDGE and EDGE_PE each have a version/package/branch triple (`CE_FULL_VER`, `CE_PKG_VER`, `CE_BRANCH`; `EDGE_VER`, `EDGE_PKG_VER`, `EDGE_BRANCH`; `EDGE_PE_VER`, `EDGE_PE_PKG_VER`, `EDGE_PE_BRANCH`), PE has `PE_FULL_VER`, `PE_PKG_VER`, `PE_RELEASE_URL` and `PE_BRANCH` (`PE_RELEASE_URL` is the GitHub Releases base for 4.4+ PE packages, while 4.3.x and older stay on dist.thingsboard.io and the upgrade components build their URLs; `PE_BRANCH` is `release-4.4` while `CE_BRANCH` stays on 4.3), and `TRENDZ_VER`, `AGENT_VER`, `TB_VER`, `SOURCE_AVAILABLE_FROM_VER` and `SOURCE_AVAILABLE_ANNOUNCEMENT_DATE` stand alone. Read the file rather than guessing which one a context needs.

### Markdown pipeline

Content is compiled by **Sätteri** (`markdown.processor` in `astro.config.ts`), Astro 7's Rust Markdown/MDX compiler. It runs neither remark nor rehype plugins, so `rehype-*` / `remark-*` packages cannot be added to this pipeline at all; smart punctuation and heading ids are built-in `features`. Our three visitors are `config/plugins/satteri-*.ts` — read the header of `satteri-tasklist-enhancer.ts` before writing another, the visitor API differs from remark/rehype in ways that each cost a build to find.

The one exception is `src/util/markdown-processor.ts`, which still uses `@astrojs/markdown-remark` for **externally-sourced** Markdown (IoT Hub readmes) rendered at runtime. Rehype plugins are fine there.

### Pages vs Content

- `src/content/docs/` — documentation pages rendered by Starlight
- `src/pages/` — everything outside the docs collection: the homepage, marketing and product landings (`products/`, `pricing/`, `partners/`, `iot-hub/`, …), `blog/`, `use-cases/`, `case-studies/`, 404, `llms.txt`, OG image generation
- `src/pages/docs/` — data-driven docs routes the collection can't express: `releases/releases-table/[familySlug]` and `installation/upgrade-instructions/[platform]/[familySlug]`, repeated under each product prefix that has them (`pe/`, `edge/`, `edge/pe/`, `trendz/`)

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

### Distributor Finder

Data-driven page at `/partners/distributors/`. Import distributor data from `@data/partners` — it exports the derived selectors the page renders from (`OFFERED_COUNTRIES`, `REGION_OFFERED_COUNTRIES`, `getCoverage`). Distributor-scoped: hardware partners live in `@data/partners/hardware-partners` and are imported directly.

A distributor either lists the countries it covers or sets `countries: 'region-wide'` to cover every country in its `regions`, expanded from `REGION_MEMBERSHIP` in `src/data/partners/regions.ts`; a declared region that none of its listed countries falls in counts as covered in full. That table and the countries distributors name must stay in step, so adding a country to a distributor means classifying it there too — and declaring every region the country falls under, because the finder only offers a region's own countries in its dropdown and a card only matches regions it declares. `distributors.ts` asserts both as it loads (via `coverage.ts`), so any import path — the barrel or the data file directly — fails the build until you do.

## Redirects

**Single source of truth:** `src/data/redirects.ts`. Four exports, chosen by pattern shape:

| Export | Use for | Example |
|---|---|---|
| `SINGLE_REDIRECTS` | one-off `/docs/*` page rename | `{ oldPath: 'pe/user-guide/roadmap', target: '/docs/pe/releases/roadmap/' }` |
| `CATCH_ALL_REDIRECTS` | `/docs/*` prefix rename (whole tree renamed 1:1) | `{ oldPrefix: 'pe/edge', entries: [] }` → `/docs/pe/edge/* → /docs/edge/pe/:splat` |
| `DYNAMIC_REDIRECTS` | splat / `:placeholder` patterns that aren't a simple prefix rename | `/blog/category/:category/page/* → /blog/?category=:category` |
| `NON_DOCS_REDIRECTS` | everything outside `/docs/*` (marketing, `/products/*`, `/industries/*`, external targets), plus `/docs/*` **file assets** — the other exports append a trailing slash, which a file URL must not have | `/iot-use-cases/` → `/use-cases/` |

**Workflow to add a redirect:**

1. Edit `src/data/redirects.ts` (pick the export that matches the pattern).
2. For new `CATCH_ALL_REDIRECTS` prefixes with empty entries, populate the `newPrefix` field on the same entry — the generator reads it directly.
3. Run `pnpm generate:redirects` — regenerates `public/_redirects` and `public/redirects.json`.
4. Commit both the data change and the regenerated output.

**Two places, two purposes:**

- `public/_redirects` — served by Cloudflare Pages. Gives **real 301s at the edge**. Cloudflare rule: *"Redirects are always followed, regardless of whether or not an asset matches the incoming request."* ([docs](https://developers.cloudflare.com/pages/configuration/redirects/)) — so a matching rule here always wins, even if a static HTML file exists at the same path.
- `astro.redirects.ts` → `redirects:` — used by Astro in `pnpm dev` / `pnpm preview` so old URLs resolve locally instead of 404-ing. In static build mode these emit a `200 + <meta refresh>` HTML stub, which Cloudflare's edge rule then supersedes in production. The file spreads `public/redirects.json` (all `/docs/*`) + `scripts/device-library-redirects.json` + `NON_DOCS_REDIRECTS`, so a single run of `pnpm generate:redirects` keeps dev and prod in sync. `scripts/device-library-redirects.json` is the exception: a one-off, frozen snapshot of the removed Device Library → IoT Hub mappings for dev, which `generate:redirects` does not touch. Production serves those URLs from the `devices-library/*` rules in `src/data/redirects.ts`.

**Why page-based `.astro` redirect stubs are deprecated:** they only emit meta-refresh pages (no real 301), they pollute the sitemap, and they duplicate rules already present in `_redirects`. The generator in `src/data/redirects.ts` → `public/_redirects` covers them all.

**Hard rules:**

- **Do NOT create new `.astro` stub files** under `src/pages/docs/` that only call `Astro.redirect()`. Put the entry in `src/data/redirects.ts` instead.
- **Do NOT hand-edit `public/_redirects` or `public/redirects.json`** below the auto-generated markers — they're rewritten by `pnpm generate:redirects`. Edit `src/data/redirects.ts` and regenerate.
- **Keep dynamic rules (splat / `:placeholder`) under 100.** Cloudflare Pages limit is 2,000 static + 100 dynamic = 2,100 total; the generator already quarantines dynamic rules to the tail block to keep the static zone uncapped.

## OG image generation

Per-page OG cards (1200×630 PNG) are generated at build time by Satori + Resvg. Each content collection has its own static endpoint under `src/pages/open-graph/`. There are two card variants: **docs** cards (a per-product slab with icon and edition label, plus an eyebrow line) and **logo** cards (the brand-blue slab with the stacked TB logo and an optional section name, for every other collection).

**Files:**
- `src/pages/open-graph/_shared/Card.tsx` — dispatches on `props.variant` to `DocsCard.tsx` or `LogoCard.tsx`
- `src/pages/open-graph/_shared/Slab.tsx`, `Background.tsx`, `colors.ts`, `text-block.ts` — shared pieces: left brand panel, canvas decoration, per-slab gradients, title sizing
- `src/pages/open-graph/_shared/product-meta.ts` / `marketing-meta.ts` — docs slug → slab/icon/edition; marketing URL prefix → section word
- `src/pages/open-graph/_shared/render.ts` — Satori → Resvg pipeline + content-hash cache
- `src/pages/open-graph/_shared/page-data.ts` — collection enumerators
- `src/pages/open-graph/_shared/endpoint.ts` — `createOgEndpoint()` factory every endpoint uses
- `src/pages/open-graph/_shared/jsx-runtime.ts` — minimal Satori-shaped JSX shim (no React)
- `src/pages/open-graph/{collection}/[…].png.ts` — static endpoints (docs, blog, case-studies, use-cases, iot-hub, partners, pages)
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
- Prettier with `prettier-plugin-astro`, printWidth 120, single quotes, ES5 trailing commas (see `.prettierrc`)
- ESLint flat config with TypeScript and Astro plugins
- **No Figma references in comments.** Don't write "Figma", "Figma node 1234:5678", or any tool-specific node IDs in source comments — they're meaningless to anyone without access to the Figma file and rot fast. Refer to the visual spec as "the design" (or "per the design", "matches the design") and describe what's actually being implemented (sizes, colors, behaviors) so the comment stands on its own.

## CI Checks

GitHub Actions runs: `astro check`, `eslint`, `slugcheck`.

`lint:linkcheck` runs in a separate CI pipeline (not GitHub Actions) because it needs a full build. It must also pass before a PR can merge — so run it locally before requesting review, especially when adding, renaming, or removing pages, changing redirects, or editing internal links. Use `pnpm lint:linkcheck` for a clean check, or `pnpm lint:linkcheck:nobuild` if you already produced a build in this session and just want to re-validate links.

`lint:dualrender` also needs a build and is **not wired into any pipeline yet** — run `pnpm lint:dualrender` by hand after a build when touching IoT Hub listing cards, their clone templates, or `iot-hub-listing-card-bind.ts`. It checks that the server render and the client-cloned render of a card still agree; breaking that is silent, since the page builds, typechecks and lints clean and only renders wrong once results come back from the API.

`lint:landmarks` also needs a build and is not wired into a pipeline yet — run `pnpm lint:landmarks` by hand after a build when adding pages or layouts, or touching the marketing comparison tables. It asserts exactly one `<main>` per built page (Starlight emits one; a page-level `<main>` is always a nested duplicate) and that the marketing tables keep captions and carry every value as text. Both defects are silent: the page builds, typechecks and lints clean.
