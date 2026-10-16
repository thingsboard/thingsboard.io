# Contributing to ThingsBoard Docs

Thanks for helping improve the ThingsBoard documentation. This repo holds the source for the [ThingsBoard Docs](https://thingsboard.io/docs/pe/) and the rest of the thingsboard.io website (home, pricing, blog, use cases, partners, IoT Hub), along with the site code that renders them and the redirects. Bugs and feature requests for ThingsBoard products belong in each product's own repository: [New issue](https://github.com/thingsboard/thingsboard.io/issues/new/choose) lists where to report each one.

## Prerequisites

- Node.js — any recent LTS release.
- [pnpm](https://pnpm.io/installation) — the package manager this repo uses.
- Python 3 — only needed for the configuration-page regeneration task in [Common tasks](#common-tasks).

## Local development

1. Fork this repo on GitHub.
2. Clone your fork:
   ```bash
   git clone git@github.com:<your-username>/thingsboard.io.git
   cd thingsboard.io
   ```
3. Install dependencies and start the dev server:
   ```bash
   pnpm install
   pnpm dev
   ```
4. Open <http://localhost:4321/> in your browser.

`pnpm dev` rebuilds incrementally and is the normal authoring loop. Before opening a PR, run `pnpm build:fast` for a full production build. It skips OG image generation for speed.

## Before you open a PR

CI runs four checks on every PR. All must pass for the PR to be merged. Run them locally first:

- `pnpm check` — TypeScript and Astro type checking.
- `pnpm lint:eslint` — ESLint.
- `pnpm lint:slugcheck` — verifies slugs match across languages.
- `pnpm lint:linkcheck` — full link validation (slow; builds the site first). If you already have a build, `pnpm lint:linkcheck:nobuild` re-checks the links only.

Other commands worth knowing:

- `pnpm build:fast` — production build (catches broken imports, missing assets, schema errors).
- `pnpm format` — Prettier formatting.

## Content authoring basics

A 30-second orientation. For the full architecture (product system, schemas, redirects, OG cards), see [`CLAUDE.md`](./CLAUDE.md).

**Where pages live.** Documentation pages are MDX files under `src/content/docs/docs/...`. The site is English only.

**The CE / PE three-tier pattern.** Pages that exist for both Community Edition (CE) and Professional Edition (PE) do not duplicate content. The actual content lives in a shared MDX file under `src/content/_includes/docs/{path}/{page}.mdx`. Two thin stub pages import it. The CE stub at `src/content/docs/docs/{path}/{page}.mdx` passes `Products.CE`; the PE stub at `src/content/docs/docs/pe/{path}/{page}.mdx` passes `Products.PE`:

```mdx
---
title: My Page
---
import Content from '@includes/docs/path/page.mdx';
import { Products } from '@models/site.models';

<Content {...{ product: Products.CE }} />
```

**Internal links.** Use the `<DocLink>` component, never bare Markdown links to other doc pages. Bare links break when product prefixes change.

**Version strings.** Never hardcode ThingsBoard version numbers in Docker image tags, download URLs, or code samples. Import constants from `@data/versions` (`CE_FULL_VER`, `PE_FULL_VER`, `TRENDZ_VER`, etc.).

**Sidebar.** When you add a new page, register it in `astro.sidebar.ts`. The shared helpers `guideItems(prefix)` and `installationItems(prefix)` cover both CE and PE — add the entry once and both products pick it up.

## Common tasks

### Fix a typo or broken link

1. Edit the affected file.
2. Run `pnpm lint:linkcheck:nobuild` if you touched a link (skip for pure typos).
3. Commit and open a PR.

### Add a new documentation page

1. Create the shared include at `src/content/_includes/docs/{path}/{page}.mdx`.
2. Create the CE stub at `src/content/docs/docs/{path}/{page}.mdx` that imports the include with `Products.CE`.
3. Create the PE stub at `src/content/docs/docs/pe/{path}/{page}.mdx` that imports the include with `Products.PE`.
4. Register the page's slug in `astro.sidebar.ts` (typically inside the matching `guideItems` or `installationItems` helper).
5. Run `pnpm dev` and verify the page renders for both products.

### Add a redirect

1. Edit `src/data/redirects.ts` and pick the export that matches your pattern:
   - `SINGLE_REDIRECTS` — one-off page rename under `/docs/*`.
   - `CATCH_ALL_REDIRECTS` — prefix rename (whole subtree renamed 1:1).
   - `DYNAMIC_REDIRECTS` — splat or `:placeholder` patterns.
   - `NON_DOCS_REDIRECTS` — anything outside `/docs/*`.
2. Run `pnpm generate:redirects` — this regenerates `public/_redirects` and `public/redirects.json`.
3. Commit both the data change and the regenerated output.

Do not hand-edit `public/_redirects` or `public/redirects.json` directly — they are rewritten by the generator.

### Regenerate configuration reference pages

When ThingsBoard's upstream `*.yml` config files change, regenerate the configuration reference MDX pages with `scripts/generate_config_pages.py`. The script fetches the upstream config files directly from GitHub via the [`gh` CLI](https://cli.github.com/) — no local checkout needed. Run `gh auth login` once (required for the private PE / Edge-PE / TBMQ-PE repos), then from this repo's root:

```bash
python3 scripts/generate_config_pages.py <repo_type> <branch>
```

`<repo_type>` is one of: `ce`, `pe`, `tbmq`, `tbmq-pe`, `edge`, `edge-pe`. `<branch>` is the upstream branch to read the config files from. For example, to regenerate CE pages from the `master` branch:

```bash
python3 scripts/generate_config_pages.py ce master
```

Each `<repo_type>` maps to a fixed upstream repo (`ce` → `thingsboard/thingsboard`, `pe` → `thingsboard/thingsboard-pe`, `tbmq` → `thingsboard/tbmq`, `tbmq-pe` → `thingsboard/tbmq-pe`, `edge` → `thingsboard/thingsboard-edge`, `edge-pe` → `thingsboard/thingsboard-edge-pe`).

Commit the regenerated files (under `src/content/docs/docs/.../reference/configuration/` for CE / PE, or the equivalent path for TBMQ / Edge).

### Translate a page

The site is English only for now. Translations are not accepted until a second language is enabled.

## Which branch and label

Pick the base branch and the label of your PR by what the change is:

| The change is | Branch | Label |
|---|---|---|
| docs for a released feature | `main` | none |
| docs for the next ThingsBoard release, not an LTS release | `develop` | none |
| docs for a sub-product or an LTS release, not released yet | `main` | `awaiting-release` |
| a blog post | `develop` | none |
| a change that another person must review on a running site, when it cannot be shown in a local network | `develop` | none |

If the feature is not merged into the product repository yet, also add the label `awaiting-product-merge`.

## Opening the PR

- Branch naming is loose; descriptive is enough (`fix/mqtt-quickstart-typo`, `add/edge-installation-page`).
- Use imperative-mood commit messages. Keep the subject brief; add a body if the motivation isn't obvious from the diff.
- The PR title should describe the change. The body should mention the affected pages and include screenshots if there's a visual change.
- The four CI checks must pass before merge.

## Getting help

- Found a documentation bug, broken link, or unclear page? [Open an issue](https://github.com/thingsboard/thingsboard.io/issues).
- Read the live docs at [thingsboard.io/docs/pe](https://thingsboard.io/docs/pe/) to see what's already published.
- PRs are reviewed by the ThingsBoard docs team on a best-effort basis.
