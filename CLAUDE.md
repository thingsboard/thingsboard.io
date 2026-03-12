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

# Content generation (pulls from withastro/astro repo)
pnpm docgen           # Generate configuration reference
pnpm docgen:errors    # Generate error reference
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

`~/*` maps to `./src/*` (configured in tsconfig.json).

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

### Generated Content

Configuration reference and error docs are auto-generated from the Astro source repo via `pnpm docgen` and `pnpm docgen:errors`. Do not edit these manually.

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

## Releasing a New Version

Use the `release` skill for the full checklist. Key files:
- `src/data/versions.ts` — version constants
- `src/models/upgrade-instructions.ts` — `UPGRADE_VERSIONS` array (newest first)
- `src/models/releases-table.ts` — `RELEASE_FAMILIES` array (newest first)

## Code Style

- Tabs for indentation in code files; spaces for JSON, Markdown, MDX, YAML, TOML
- Prettier with `prettier-plugin-astro`, printWidth 100, single quotes, trailing commas
- ESLint flat config with TypeScript and Astro plugins

## CI Checks

PRs run: `astro check`, `eslint`, `slugcheck`, `linkcheck`. All must pass.
