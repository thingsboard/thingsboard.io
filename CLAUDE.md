# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Astro documentation site** (docs.astro.build), built with **Astro + Starlight**. It's a multi-language documentation site with 14 supported languages and ~396 English documentation pages.

## Commands

```bash
# Install dependencies (requires pnpm)
pnpm install

# Development
pnpm dev              # Start dev server
pnpm build            # Production build
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

### ImageGallery Component

`src/components/ImageGallery.astro` — responsive image grid with a built-in lightbox.

**Features:**
- **Single image mode**: 1 image renders as a centered clickable figure (zoom-in cursor, opens lightbox) — no grid
- **Multi image mode**: thumbnail grid (3 columns desktop, 2 on mobile)
- Lightbox with zoom-from-thumbnail open/close animation
- Navigation by clicking, keyboard arrows, and Prev/Next buttons
- Caption tooltip on thumbnail hover; caption + counter shown in lightbox footer
- Respects `prefers-reduced-motion`
- Images processed at build time via `astro:assets` → optimized WebP (thumb: 800px/80q, full: 90q)
- Supports `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`
- Lightbox teleported to `document.body` to escape any stacking context

**Props:**

```ts
interface ImageItem {
  src: string;      // Absolute path from project root, e.g. /src/assets/images/foo.png
  alt: string;      // Required alt text
  caption?: string; // Optional caption (HTML allowed); shown as tooltip and in lightbox footer
}

interface Props {
  images: ImageItem[];
}
```

**Important:** Images must live inside `/src/assets/` — the component uses `import.meta.glob` over that directory only.

**Usage in MDX:**

```mdx
import ImageGallery from '~/components/ImageGallery.astro';

<ImageGallery images={[
  {
    src: '/src/assets/images/dashboard-overview.png',
    alt: 'Dashboard overview',
    caption: 'Main dashboard with live telemetry',
  },
  {
    src: '/src/assets/images/device-list.png',
    alt: 'Device list',
    caption: 'Filtered device list view',
  },
]} />
```

**Conditional rendering (PE/CE) — use HTML `<table>` inside JSX expressions, not markdown tables:**

```mdx
{props.product === Products.PE && (
  <ImageGallery images={[
    { src: '/src/assets/images/pe-feature.png', alt: 'PE feature', caption: 'PE only' },
  ]} />
)}
```

### MultiProductImageGallery Component

`src/components/MultiProductImageGallery.astro` — thin wrapper around `ImageGallery` that automatically appends a product suffix (`-ce`, `-pe`, `-paas`, etc.) to each image `src` before the file extension.

**When to use:** Any time the same screenshot set exists for multiple products with identical alt text and captions, differing only by a `-ce`/`-pe`/`-paas` filename suffix. Replaces duplicated `{props.product === Products.CE && (...)}` / `{props.product === Products.PE && (...)}` blocks.

**Props:**

```ts
interface ImageItem {
  src: string;           // Base path WITHOUT product suffix, e.g. /src/assets/images/guide/step-1.png
  alt: string;           // Required alt text
  caption?: string;      // Optional caption
  products?: Products[]; // If set, include this image only for the listed products
}

interface Props {
  images: ImageItem[];
  product: Products;     // Current product — determines the suffix
}
```

**Suffix mapping:** CE → `-ce`, PE → `-pe`, PASS → `-paas`, PASS_EU → `-paas-eu`, EDGE → `-edge`, EDGE_PE → `-edge-pe`, GW → `-gw`, TRENDZ → `-trendz`, MOBILE → `-mobile`, MOBILE_PE → `-mobile-pe`, TBMQ → `-tbmq`, TBMQ_PE → `-tbmq-pe`, LICENSE → `-license`.

**Example:** `src="/src/assets/images/guide/step-1.png"` with `product=PE` resolves to `/src/assets/images/guide/step-1-pe.png`.

**Usage in MDX (include files):**

```mdx
import MultiProductImageGallery from '~/components/MultiProductImageGallery.astro';
import { Products } from '~/models/site.models';

{/* All images shared across products — same alt/caption, auto-suffixed src */}
<MultiProductImageGallery product={props.product} images={[
  { src: '/src/assets/images/guide/step-1.png', alt: 'Step 1', caption: 'First step.' },
  { src: '/src/assets/images/guide/step-2.png', alt: 'Step 2', caption: 'Second step.' },
]} />

{/* Mixed: shared images + product-specific images */}
<MultiProductImageGallery product={props.product} images={[
  { src: '/src/assets/images/guide/step-1.png', alt: 'Step 1', caption: 'Shared step.' },
  { src: '/src/assets/images/guide/step-2-ce-only.png', alt: 'CE result', caption: 'CE only.', products: [Products.CE] },
  { src: '/src/assets/images/guide/step-2-pe-only.png', alt: 'PE result', caption: 'PE only.', products: [Products.PE] },
]} />
```

**Important:** The actual image files on disk must include the product suffix (e.g., `step-1-ce.png`, `step-1-pe.png`). The `src` prop in MDX is the base name without the suffix.

### DocImage Component

`src/components/DocImage.astro` — single optimized image with optional width and alignment.

**Features:**
- Images processed at build time via `astro:assets` → WebP at quality 85
- Numeric `width` resizes the image via `getImage`; string `width` (e.g. `"50%"`) applies as CSS `max-width`
- `align` controls horizontal positioning (`left` / `center` / `right`); default is `center`
- Row layout: wrap multiple `DocImage` in `<div class="doc-image-row">` for side-by-side display; stacks to 100% on ≤640px
- Supports `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`

**Props:**

```ts
interface Props {
  src: string;                         // Absolute path from project root, e.g. /src/assets/images/foo.png
  alt: string;                         // Required alt text
  width?: number | string;             // number → resize (px); string → CSS max-width (e.g. "50%", "400px")
  align?: 'left' | 'center' | 'right'; // Default: 'center'
}
```

**Important:** Images must live inside `/src/assets/` — the component uses `import.meta.glob` over that directory only.

**Usage in MDX:**

```mdx
import DocImage from '~/components/DocImage.astro';

{/* Basic — centered, full width */}
<DocImage src="/src/assets/images/diagram.png" alt="System diagram" />

{/* Constrained width, centered */}
<DocImage src="/src/assets/images/diagram.png" alt="System diagram" width="60%" />

{/* Pixel resize (passed to getImage) */}
<DocImage src="/src/assets/images/diagram.png" alt="System diagram" width={800} />

{/* Alignment */}
<DocImage src="/src/assets/images/diagram.png" alt="System diagram" width="50%" align="left" />
<DocImage src="/src/assets/images/diagram.png" alt="System diagram" width="50%" align="right" />
```

**Row layout — two or more images side by side:**

```mdx
<div class="doc-image-row">
  <DocImage src="/src/assets/images/step-1.png" alt="Step 1" />
  <DocImage src="/src/assets/images/step-2.png" alt="Step 2" />
  <DocImage src="/src/assets/images/step-3.png" alt="Step 3" />
</div>
```

Images inside `.doc-image-row` share equal width (`flex: 1`) and stack vertically on screens ≤640px. The `.doc-image-row` styles are defined inside `DocImage.astro` via `:global()` and are available on any page that renders a `DocImage`.

### Badge Component & tb-badge

`src/components/Badge.astro` — thin wrapper around Starlight's `<Badge>` with custom styles.

#### tb-badge

A text-only accent badge: no border, no background, `--sl-color-text-accent` color, `font-weight: 600`, `vertical-align: top`.

**Styles defined in** `src/components/Badge.astro` via `<style is:global>`:

| Class | Size |
|-------|------|
| `.tb-badge` (default, `size="small"`) | 0.75rem (12px) |
| `.tb-badge` + `size="medium"` | 0.875rem (14px) |

**Usage in MDX:**

```mdx
import Badge from '~/components/Badge.astro';

{/* 12px — default */}
<Badge text="NEW" class="tb-badge" />

{/* 14px */}
<Badge text="NEW" class="tb-badge" size="medium" />
```

**Active sidebar item** — when the parent link has `aria-current="page"`, `.tb-badge` inherits the link's text color (avoids invisible badge on accent background).

#### Where to configure the badge

| Goal | Where to configure |
|------|--------------------|
| Badge **only in sidebar** (link or group) | `astro.sidebar.ts` only |
| Badge **on page title AND sidebar** | page frontmatter `sidebar.badge` only |

**Sidebar only** — configure in `astro.sidebar.ts`, do NOT add `sidebar.badge` to the page frontmatter:

```ts
// single page link
{ slug: 'docs/concepts/data-visualization', badge: { text: 'NEW', class: 'tb-badge' } }

// group label
{
  label: 'Key concepts',
  badge: { text: 'NEW', class: 'tb-badge' },
  items: [...],
}
```

**Page title + sidebar** — add `sidebar.badge` to the page frontmatter. The custom `PageTitle.astro` reads this field and renders the badge next to `<h1>` at `size="medium"`. No changes to `astro.sidebar.ts` needed — Starlight automatically picks up `sidebar.badge` from frontmatter and shows it on the sidebar link too:

```yaml
---
title: My Page
sidebar:
  badge:
    text: NEW
    class: tb-badge
---
```

- `text` — badge label (required)
- `variant` — `default` | `note` | `tip` | `caution` | `danger` | `success` (optional, default: `default`)
- `class` — CSS class, use `tb-badge` for the text-only style

### YouTubeVideo Component

`src/components/YouTubeVideo.astro` — responsive YouTube video embed that fills the full content width.

**Features:**
- Fills 100% of the available content width
- Maintains 16:9 aspect ratio at all viewport sizes
- Uses `class` (not `id`) — multiple videos per page are supported
- No JavaScript required

**Props:**

```ts
interface Props {
  videoId: string;  // YouTube video ID, e.g. '3xRWm1W1IM4'
  title?: string;   // Accessible iframe title (default: 'YouTube video')
}
```

**Usage in MDX:**

```mdx
import YouTubeVideo from '~/components/YouTubeVideo.astro';

<YouTubeVideo videoId="3xRWm1W1IM4" title="ThingsBoard overview" />
```

### Code Block Meta Options (pluginMaxLines)

`config/plugins/expressive-code-max-lines.ts` — custom Expressive Code plugin that adds independent meta options to fenced code blocks.

**Meta options:**

| Option | Type | Description |
|--------|------|-------------|
| `maxLines=N` | number | Limits the visible height to N lines; enables vertical scroll when content overflows |
| `collapsible` | boolean flag | Adds an ▼ Expand / ▲ Collapse button below the block (requires `maxLines`) |
| `wrap` | boolean flag | Wraps long lines instead of horizontal scroll; copy button copies original text unchanged |

`maxLines` and `collapsible` are independent — `maxLines` alone gives a scrollable block without a button; adding `collapsible` enables the toggle. `wrap` can be used alone or combined with `maxLines`.

**Usage in MDX fenced code blocks:**

````
```js maxLines=15
// height-limited + scrollable, no expand/collapse button
```

```js maxLines=15 collapsible
// height-limited + scrollable + Expand/Collapse button
```

```js maxLines=15 collapsible title="script.js"
// can be combined with other EC meta options
```

```bash wrap
// long lines wrap visually; copy button copies the original single-line text
```

```bash wrap maxLines=5
// wrap + maxLines can be combined
```
````

**Implementation notes:**
- Plugin registered in `astro.config.ts` → `expressiveCode.plugins`
- HAST uses `properties.className` (array), not `properties.class` — the plugin uses a local `appendClassName` helper
- Data attribute stored as `dataMaxLines` in HAST properties → rendered as `data-max-lines` in HTML → read as `el.dataset.maxLines` in JS
- Hook order: `pluginFrames` wraps `blockAst` in `<figure.frame>` before our hook runs, so `renderData.blockAst` is already the final `<figure>`
- `@expressive-code/core` is not hoisted in pnpm flat `node_modules`, so the plugin defines minimal local types instead of importing from that package

### Tabbed Code Blocks

For multiple files shown as tabs, use Starlight's `<Tabs>` and `<TabItem>` from `@astrojs/starlight/components`. Fenced code blocks (including EC meta options) work correctly inside `<TabItem>` in MDX.

**Usage in MDX:**

````mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="decoder.js">
```js maxLines=15 collapsible
// decoder code
```
</TabItem>
<TabItem label="encoder.js">
```js maxLines=15 collapsible
// encoder code
```
</TabItem>
</Tabs>
````

**Note:** IDE diagnostics may show false `} expected` errors for curly braces inside fenced code blocks within `<TabItem>`. These are TypeScript language server noise — the MDX compiler handles them correctly.

### Code Block — `<Code>` component vs fenced blocks

Both approaches use Expressive Code under the hood and support the same meta options.

**When to use each:**
- **Fenced block** ` ``` ` — static code, preferred in most cases, cleaner syntax
- **`<Code>` component** — when the code string comes from a variable or needs to be passed as a prop

**`<Code>` component usage:**

```mdx
import { Code } from '@astrojs/starlight/components';

{/* Inline string — use template literal to avoid JSX curly-brace conflicts */}
<Code code={`var result = {};
return result;`} lang="js" title="script.js" />

{/* From a variable — preferred for long code */}
export const snippet = `
var data = decodeToJson(payload);
var result = { telemetry: {} };
return result;
`;

<Code code={snippet} lang="js" title="decoder.js" meta="maxLines=15 collapsible" />
```

**`<Code>` props:**

| Prop | Type | Description |
|------|------|-------------|
| `code` | `string` | The code to display (required) |
| `lang` | `string` | Language for syntax highlighting |
| `title` | `string` | Filename shown in the frame tab |
| `mark` | `string` | Lines to highlight, e.g. `"{3,5-7}"` |
| `ins` | `string` | Lines to mark green (inserted) |
| `del` | `string` | Lines to mark red (deleted) |
| `meta` | `string` | Raw meta string — pass any EC options including custom ones: `"maxLines=15 collapsible"` |
| `frame` | `string` | Frame style: `auto` (default), `code`, `terminal`, `none` |

**Tabbed `<Code>` blocks — same `<Tabs>` + `<TabItem>` wrapper:**

````mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';
import { Code } from '@astrojs/starlight/components';

<Tabs>
<TabItem label="decoder.js">
  <Code code={decoderSnippet} lang="js" meta="maxLines=15 collapsible" />
</TabItem>
<TabItem label="encoder.js">
  <Code code={encoderSnippet} lang="js" meta="maxLines=15 collapsible" />
</TabItem>
</Tabs>
````

**Supported `lang` values (Shiki):**

| Category | Values |
|----------|--------|
| JavaScript / TypeScript | `js`, `javascript`, `ts`, `typescript`, `jsx`, `tsx` |
| JVM | `java`, `kotlin`, `groovy`, `scala` |
| Systems | `c`, `cpp`, `csharp`, `cs`, `rust`, `go` |
| Scripting | `python`, `ruby`, `php`, `bash`, `sh`, `shell`, `powershell` |
| Data / Config | `json`, `json5`, `yaml`, `yml`, `toml`, `ini`, `properties`, `xml` |
| Web | `html`, `css`, `scss`, `graphql`, `sql` |
| DevOps | `dockerfile`, `docker`, `nginx`, `terraform` |
| Docs / Other | `markdown`, `md`, `mdx`, `plaintext`, `txt` |
| Mobile | `swift`, `dart`, `objc` |
| Other | `proto`, `r`, `matlab`, `lua` |

Full list: [shiki.style/languages](https://shiki.style/languages). Use `plaintext` or omit `lang` entirely for no syntax highlighting.

### Product System & Version Switcher

#### Products enum

All product identifiers live in `src/models/site.models.ts` as the `Products` enum:

| Enum value    | Label                  | URL prefix           | Notes                         |
|---------------|------------------------|----------------------|-------------------------------|
| `CE`          | Community Edition      | *(empty)*            | Default/root product          |
| `PE`          | Professional Edition   | `pe/`                | Main product list             |
| `PAAS`        | Cloud                  | `paas/`              | Has sub-variant PAAS_EU       |
| `PAAS_EU`     | Cloud (EU)             | `paas/eu/`           | Sub-variant of PAAS           |
| `EDGE`        | Edge                   | `edge/`              | Has sub-variant EDGE_PE       |
| `EDGE_PE`     | Edge Professional      | `edge/pe/`           | Sub-variant of EDGE           |
| `TRENDZ`      | Trendz Analytics       | `trendz/`            | Main product list             |
| `GW`          | IoT Gateway            | `iot-gateway/`       | Main product list             |
| `TBMQ`        | TBMQ Broker            | `mqtt-broker/`       | Has sub-variant TBMQ_PE       |
| `TBMQ_PE`     | TBMQ PE Broker         | `mqtt-broker/pe/`    | Sub-variant of TBMQ           |
| `MOBILE`      | Mobile Application     | `mobile/`            | Has sub-variant MOBILE_PE     |
| `MOBILE_PE`   | Mobile PE              | `mobile/pe/`         | Sub-variant of MOBILE         |
| `LICENSE`     | License Server         | `license-server/`    | Main product list             |

**Main product list** (shown in the primary switcher dropdown): CE, PE, PAAS, EDGE, TRENDZ, GW, TBMQ, MOBILE, LICENSE.

**Sub-variants** (shown in a secondary dropdown when a parent is selected): PAAS_EU, EDGE_PE, MOBILE_PE, TBMQ_PE.

#### URL Structure

```
/[lang/]docs/[product-prefix][page-slug]/
```

Examples:
- `/docs/getting-started/` — CE page
- `/docs/pe/getting-started/` — PE page
- `/docs/paas/getting-started/` — Cloud page
- `/uk/docs/pe/getting-started/` — PE page in Ukrainian

#### Content Directory Structure

Each product has its own mirror directory under `src/content/docs/docs/`:

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

#### Shared Content via _includes

To avoid duplicating content across products, documentation pages are thin wrappers that import a shared **include file** and pass the current `product` as a prop.

**Include file** (`src/content/_includes/docs/user-guide/digital-twins/relations.mdx`):
```mdx
import DocLink from '@components/DocLink.astro';
import { Products } from '~/models/site.models';

Shared content here, using `props.product` for conditional blocks.

{props.product === Products.PE && (
  <p>PE-only content</p>
)}
```

**Page file** (`src/content/docs/docs/pe/user-guide/digital-twins/relations.mdx`):
```mdx
---
title: Relations
description: Learn about relations in ThingsBoard
---

import Relations from '@includes/docs/user-guide/digital-twins/relations.mdx'
import { Products } from '~/models/site.models'

<Relations product={Products.PE}/>
```

The CE page would be identical but pass `product={Products.CE}`.

**Rules for _includes:**
- Never use markdown tables inside `{...}` JSX expressions — use HTML `<table>` instead (MDX parses markdown only inside JSX angle-bracket tags, not curly braces)
- Never use `<Steps>` with a markdown numbered list inside `{...}` JSX expressions (e.g. `{condition && (<>...<Steps>1. item</Steps>...</>)}`). Inside `{...}`, markdown lists are not compiled to `<ol>` and `<Steps>` receives no child elements, causing a build error. Use explicit `<ol>/<li>` HTML instead:
  ```mdx
  <Steps>
    <ol>
      <li>First step.</li>
      <li>Second step.</li>
    </ol>
  </Steps>
  ```
  Outside of `{...}` JSX expressions (top-level or inside `<ComponentTag>` children), `<Steps>` with a markdown numbered list works normally.
- Use `props.product` (not `Astro.props`) inside include files since they receive props as a component
- Conditional blocks: `{props.product === Products.PE && (<>...</>)}` or ternary `{props.product === Products.CE ? <A/> : <B/>}`

#### DocLink Component

`src/components/DocLink.astro` — generates a product-aware internal link.

```mdx
import DocLink from '@components/DocLink.astro';

<DocLink product={props.product} path="user-guide/devices">Devices</DocLink>
```

Renders as `<a href="/docs/pe/user-guide/devices/"><b>Devices</b></a>` for PE, `/docs/user-guide/devices/` for CE, etc.

Props: `product` (required), `path` (required, without trailing slash), `bold` (default `true`), `target`.

### Custom Plugins

- `config/plugins/remark-fallback-lang.ts` — marks untranslated content
- `config/plugins/rehype-tasklist-enhancer.ts` — enhanced task lists
- `config/plugins/llms-txt.ts` — generates llms.txt
- `config/plugins/smoke-test.ts` — build validation

### Dynamic Data Collections

- `contributors` — weekly contributor data from JSON
- `packages` — live npm versions from fast-npm-meta API
- `astroContributors` — top contributors from astro.badg.es

### Generated Content

Configuration reference and error docs are auto-generated from the Astro source repo via `pnpm docgen` and `pnpm docgen:errors`. Do not edit these manually.

### Pages vs Content

- `src/content/docs/` — documentation pages rendered by Starlight
- `src/pages/` — special routes: root redirect, language redirects, 404, OG image generation
- `src/pages/[lang]/` — dynamic per-language routes (index, install, tutorial redirects)

### Static Files (public/)

Files that must be served as-is (not processed by the build) go in the `public/` directory. They are copied to `dist/` preserving the path structure, and are available at the root URL.

**Use `public/` for:**
- JSON files available for download
- PDFs or other binary assets linked from docs
- Any file referenced by a direct URL (not via `astro:assets`)

**Do NOT put these in `src/assets/`** — that directory is for images processed via `astro:assets` (optimization, format conversion).

**Example — downloadable JSON:**

File location: `public/resources/airconditioners_dashboard.json`

Link in MDX:
```html
<a href="/resources/airconditioners_dashboard.json" download="airconditioners_dashboard.json">
  airconditioners_dashboard.json
</a>
```

## Code Style

- Tabs for indentation in code files; spaces for JSON, Markdown, MDX, YAML, TOML
- Prettier with `prettier-plugin-astro`, printWidth 100, single quotes, trailing commas
- ESLint flat config with TypeScript and Astro plugins

## CI Checks

PRs run: `astro check`, `eslint`, `slugcheck`, `linkcheck`. All must pass.
