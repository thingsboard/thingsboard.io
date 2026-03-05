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
- Click anywhere to close lightbox (backdrop, image, or X button); also Escape key
- Navigation: Prev/Next buttons and Left/Right arrow keys
- Caption shown as tooltip on thumbnail hover; in lightbox as a fixed pill at viewport bottom (18px, blurred background)
- Counter (`1 / 5`) shown below caption in multi-image mode
- Respects `prefers-reduced-motion`
- Images processed at build time via `astro:assets` → optimized WebP (thumb: 800px/80q, full: 90q)
- **SVGs bypass processing** — served as raw src, no WebP conversion. In lightbox, SVGs scale up to fill `90vw × 78vh` (vector = no quality loss), no box-shadow
- Supports `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`
- Lightbox teleported to `document.body` to escape any stacking context

**Props:**

```ts
interface ImageItem {
  src: string;           // Absolute path from project root, e.g. /src/assets/images/foo.png
  alt: string;           // Required alt text
  caption?: string;      // Optional caption (HTML allowed); shown as tooltip and in lightbox
  products?: Products[]; // If set, include this image only when current product is in the list
}

interface Props {
  images: ImageItem[];
  product?: Products;    // Enables product suffix resolution and per-image product filtering
}
```

**Important:** Images must live inside `/src/assets/` — the component uses `import.meta.glob` over that directory only.

#### Product suffix resolution

When `product` is passed, the component automatically resolves product-specific image files. For a given `src`, it tries `{base}-{suffix}{ext}` first, then falls back to the base file. CE is the default product — no suffix (the base file IS the CE file).

**Suffix mapping:** CE → `ce`, PE → `pe`, PAAS → `paas`, PAAS_EU → `paas-eu`, EDGE → `edge`, EDGE_PE → `edge-pe`, GW → `gw`, TRENDZ → `trendz`, MOBILE → `mobile`, MOBILE_PE → `mobile-pe`, TBMQ → `tbmq`, TBMQ_PE → `tbmq-pe`, LICENSE → `license`.

#### Dark theme variant resolution

The component automatically detects and uses dark-mode image variants. For each image, it checks (most specific → least specific):

1. `{base}-{product}-dark{ext}` — product + dark
2. `{base}-dark{ext}` — generic dark
3. Falls back to the light variant

If any image has a dark variant, the component renders both `<img>` elements and toggles visibility via CSS `[data-theme='dark']`. No extra props needed — just place a `-dark` suffixed file alongside the light version.

**Example:** `schema.svg` + `schema-dark.svg` → light/dark switching is automatic.

#### Usage in MDX

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

**With product resolution (in `_includes` files):**

```mdx
<ImageGallery product={props.product} images={[
  { src: '/src/assets/images/guide/step-1.png', alt: 'Step 1' },
  { src: '/src/assets/images/guide/step-2.png', alt: 'Step 2', products: [Products.PE] },
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

**Suffix mapping:** CE → `-ce`, PE → `-pe`, PAAS → `-paas`, PAAS_EU → `-paas-eu`, EDGE → `-edge`, EDGE_PE → `-edge-pe`, GW → `-gw`, TRENDZ → `-trendz`, MOBILE → `-mobile`, MOBILE_PE → `-mobile-pe`, TBMQ → `-tbmq`, TBMQ_PE → `-tbmq-pe`, LICENSE → `-license`.

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

### PEFeatureBanner Component

`src/components/PEFeatureBanner.astro` — reusable banner for PE/Cloud-only features. Only renders on CE pages.

**Message:** "This feature is available in **ThingsBoard Professional** and **ThingsBoard Cloud** only." with `DocLink` links to the PE and PAAS versions of the same page.

**Props:**

```ts
interface Props {
  product: Products;   // Current product — banner only shows when CE
  path?: string;       // Path to corresponding docs page (e.g. "user-guide/reporting/getting-started")
                       // Used to generate links to both PE and Cloud (PAAS) versions
                       // When omitted, links to installation pages
}
```

**Usage in MDX `_includes`:**

```mdx
import PEFeatureBanner from '~/components/PEFeatureBanner.astro';

{/* Links to specific PE and Cloud pages */}
<PEFeatureBanner product={props.product} path="user-guide/reporting/getting-started" />

{/* Links to PE and Cloud installation pages (default) */}
<PEFeatureBanner product={props.product} />
```

**When to use:** At the top of any include file for a feature that is only available in PE and Cloud editions. Do NOT use the old `<Aside type="note" title="... available in PE ...">` pattern or inline `PEOnly` badge spans for page-level banners.

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

### Typography System (All Non-Doc Pages)

Defined as SCSS mixins in `src/styles/_variables.scss`. These are the **single source of truth** for all font sizes, weights, and line-heights across all non-documentation pages (landing pages, use-case pages, and any other standalone pages). Do not hardcode font values — use these mixins.

**Scope:** All pages except Starlight doc pages (`src/content/docs/`). Doc pages use the separate `heading-1/2/3` and `body-text` base mixins via `_base.scss`.

| Mixin | Desktop | Mobile (≤md) | Weight | Color |
|-------|---------|-------------|--------|-------|
| `page-title` | 60px / lh:72px | 42px (≤lg) → 32px (≤md) | semibold | — |
| `section-title` | 40px / lh:48px | 32px | semibold | — |
| `subsection-title` | 32px / lh:40px | 24px | semibold | — |
| `card-title` | 24px / lh:1.2 | — | semibold | — |
| `card-title-sm` | 20px / lh:24px | — | semibold | — |
| `text-m` | 16px / lh:28px | — | normal | `$color-text-primary` |
| `text-s` | 14px / lh:24px | — | normal | `$color-text-primary` |
| `text-card` | 16px / lh:1.72 | — | normal | `$color-text-primary` |
| `text-card-sm` | 14px / lh:1.72 | — | normal | `$color-text-primary` |
| `action-link` | 18px | — | medium | — |

**Usage in component SCSS:**

```scss
@use '../../styles/variables' as *;

.my-section h2 {
  @include section-title;
  color: $color-text-primary;
  margin: 0;
}

.my-section p {
  @include body-text-lg;
  margin: 0;
}

.my-card h3 {
  @include card-title-sm;
  color: $color-text-primary;
  margin: 0 0 $spacing-3;
}
```

**Mixin selection guide:**
- **Page h1** → `page-title`
- **Section h2** (main sections) → `section-title`
- **Subsection h2** (banners, summaries) → `subsection-title`
- **Card h3** (application cards, large cards) → `card-title`
- **Card h3** (benefit cards, key functions) → `card-title-sm`
- **Section descriptions, subtitles** → `text-m`
- **Base text, paragraphs** → `text-s`
- **Card descriptions** → `text-card`
- **Small card descriptions** → `text-card-sm`
- **Links (Read more, card links)** → `action-link`

All text mixins include `color: $color-text-primary`. Title mixins do not set color — set it explicitly in the component.

### Use-Case Pages System

Data-driven IoT use-case pages (`/use-cases/{slug}`) with composable section components. Each page is assembled from a TypeScript data file + layout + section components.

**File structure:**

```
src/data/use-cases/
  ├── types.ts              ← shared TypeScript interfaces
  ├── index.ts              ← card data for index page grid
  ├── smart-energy.ts       ← UseCaseData export
  ├── smart-office.ts       ← UseCaseData export
  └── scada.ts              ← UseCaseData export (SCADA-specific fields)
src/components/UseCase/
  ├── AboutSection.astro
  ├── SolutionStructure.astro
  ├── BenefitsSection.astro
  ├── DashboardStructure.astro
  ├── ApplicationsSection.astro
  ├── SummarySection.astro
  ├── ContactUsBanner.astro
  ├── ImageComparison.astro
  ├── UseCaseCarousel.astro
  ├── UseCaseCard.astro
  ├── KeyFunctionsSection.astro   ← SCADA only
  ├── ComparisonTable.astro       ← SCADA only
  └── ScadaModeToggle.astro       ← SCADA only
src/layouts/UseCaseLayout.astro   ← wraps all use-case pages
src/pages/use-cases/
  ├── index.astro                 ← card grid with filter tabs
  ├── smart-energy.astro
  ├── smart-office.astro
  └── scada.astro
src/pages/iot-use-cases.astro     ← redirect to /use-cases/
```

#### Data types (`src/data/use-cases/types.ts`)

The root interface is `UseCaseData`:

```ts
interface UseCaseData {
  title: string;
  pageTitle: string;
  description: string;
  pageSlug: string;
  about: UseCaseAbout;                    // shortText + longText[] + demoUrl + demoButtonId
  overview?: {
    type: 'comparison' | 'carousel';      // comparison = slider, carousel = image slides
    baseImage?: string; overlayImage?: string;  // for comparison
    carouselImages?: CarouselImage[];            // for carousel
  };
  solutionStructure?: UseCaseSolutionStructure; // title + shortText + longText[] + schemeSrc/Alt/Caption
  benefits?: UseCaseBenefits;             // title? + subtitle? + Benefit[] (title + description)
  dashboardStructure?: UseCaseDashboardStructure; // tabbed panel viewer
  applications?: UseCaseApplications;     // zigzag layout cards
  summary?: UseCaseSummary;               // icon + title + text block
  // SCADA-specific sections
  scadaOverview?: { ... };
  scadaKeyFunctions?: { highPerformance: ..., traditional: ... };
  scadaDashboardStructure?: { highPerformance: ..., traditional: ... };
}
```

#### Page composition pattern

All use-case pages follow the same pattern:

```astro
---
import UseCaseLayout from '../../layouts/UseCaseLayout.astro';
import { smartEnergyData as data } from '../../data/use-cases/smart-energy';
// import section components...
---
<UseCaseLayout title={data.pageTitle} description={data.description} pageSlug={data.pageSlug}>
  <h1 class="usecase-title">{data.title}</h1>
  <AboutSection {...data.about} />
  {/* conditional overview (comparison or carousel) */}
  <ContactUsBanner />
  {data.solutionStructure && <SolutionStructure {...data.solutionStructure} />}
  {data.benefits && <BenefitsSection {...data.benefits} />}
  {data.dashboardStructure && <DashboardStructure {...data.dashboardStructure} />}
  {data.applications && <ApplicationsSection {...data.applications} />}
  <AdvantagesSection />
  {data.summary && <SummarySection {...data.summary} />}
</UseCaseLayout>
```

Sections are rendered conditionally based on data presence. `AdvantagesSection` (from `Landing/`) appears on every use-case page.

#### Layout (`src/layouts/UseCaseLayout.astro`)

Wraps pages with `BaseLayout` (pageId=`"use-cases"`). Provides global styles:
- `.usecase-title` — `page-title` mixin, 40px top margin
- `.uc-section-padding` — 60px vertical padding (8px on md)
- `.uc-section-header` — flex column with h2 (`section-title`) + p (`text-m`)
- `.uc-about-text` — split layout: `.uc-about-short` (flex: 1) + `.uc-about-long` (flex: 2), stacks on lg
- `.uc-solution-text` — single-column paragraph block, max-width 928px, `text-m`

#### Key components

**`AboutSection`** — split layout: left side has short text + "View live demo" button, right side has long text paragraphs (rendered with `set:html`).

**`SolutionStructure`** — section title + paragraphs (`.uc-solution-text`, `text-m`) + `ImageGallery` for the architecture diagram (enables lightbox zoom). Props: `schemeSrc`, `schemeAlt`, `schemeCaption`.

**`BenefitsSection`** — 3-column card grid (2 on lg, 1 on md). Cards have white background, `var(--sl-color-gray-5)` border, 12px radius, decorative color blob (blurred circle, top-right). Blob colors cycle: purple → blue → orange, offset per row via `nth-child(6n+X)`.

**`DashboardStructure`** — desktop: left sidebar with clickable tabs + CTA buttons, right area shows active panel (description + `ImageGallery`). Mobile (≤xl): stacked panels with `SmartImage`. Tab switching via JS (`data-dashboard-id` scoping).

**`ApplicationsSection`** — zigzag layout: desktop has text rows above/below an image row with staggered vertical offsets. Mobile (≤xl): simple alternating image+text blocks.

**`ImageComparison`** — before/after slider overlay. Drag handle moves a `clip-path` to reveal/hide the overlay image. Supports mouse and touch.

**`UseCaseCarousel`** — wraps `Landing/Carousel` with `variant="simple"`.

**`ContactUsBanner`** — CTA section with heading, description, two buttons (Contact us + custom link), and email icon.

**`SummarySection`** — conclusion block with text + icon, white background with border and shadow.

**SCADA-specific:** `ScadaModeToggle` switches between High-Performance and Traditional modes (toggles `data-mode-content` visibility). `KeyFunctionsSection` and `ComparisonTable` use this toggle.

#### Index page (`src/pages/use-cases/index.astro`)

Card grid with filter tabs (All / General / SCADA). Uses `UseCaseCard` component. Every 3rd card is `featured` (spans 2 columns, horizontal layout). Cards with video arrays use `GifVideo` (plays on hover). Filter switching via JS toggles `.filter-hidden` class.

#### Adding a new use-case page

1. Create data file: `src/data/use-cases/{slug}.ts` exporting `UseCaseData`
2. Create page: `src/pages/use-cases/{slug}.astro` following the composition pattern above
3. Add card entry to `src/data/use-cases/index.ts` (`useCaseItems` array)
4. Add images to `src/assets/images/usecases/{slug}/`

### Product Color CSS Variables

Defined in `src/styles/_variables.scss`. Available globally in all components and pages.

| Variable | Light | Dark |
|---|---|---|
| `--color-product-ce` | `#305680` | `#78b4f5` |
| `--color-product-pe` | `#00695c` | `#3fd9d1` |
| `--color-product-cloud` | `#3d50f5` | `#b3c7ff` |
| `--color-product-trendz` | `#2696f3` | `#4caeff` |

Light values are set in `:root`, dark overrides in `[data-theme='dark']` (Starlight applies this attribute to `<html>`).

**Usage:**

```css
color: var(--color-product-ce);
border-color: var(--color-product-pe);
background: var(--color-product-cloud);
```

### InstallationCardGrid Component

`src/components/InstallationCardGrid.astro` — responsive card grid for installation option pages.

**Features:**
- 3-column grid (2 on tablet ≤900px, 1 on mobile ≤480px)
- When exactly **2 cards** are passed, the grid switches to 2 columns so both cards fill the full width
- SVGs loaded as raw inline HTML (`?raw`) so CSS custom properties (e.g. `fill="var(--sl-color-white)"`) work correctly
- Three `path` modes: relative doc path, absolute URL, or omitted (→ "Coming soon")
- "Coming soon" cards render as a non-clickable `<div>`, `opacity: 0.5`, no hover, auto badge "Coming soon"
- Optional Starlight `<Badge>` positioned absolutely in the top-right corner (`top/right: 1.5rem`) inside the link
- Accent glow blob in the top-right corner via `--landing-card-accent`

**Props (`CardItem`):**

```ts
interface CardItem {
  path?: string;        // Relative: 'installation/docker' → /docs/{prefix}installation/docker/
                        // Absolute: 'https://...' → used as-is
                        // Omitted  → Coming soon (non-clickable card)
  title: string;
  icon: string;         // SVG path inside /src/assets/, e.g. '/src/assets/images/installation/ubuntu.svg'
  accent?: string;      // CSS color for the glow blob, e.g. '#e63946'
  target?: string;      // e.g. '_blank'
  badge?: string;       // Badge label, e.g. 'NEW'
  badgeVariant?: 'default' | 'note' | 'tip' | 'caution' | 'danger' | 'success';
}
```

**Important:** `icon` paths must be inside `/src/assets/` — the component uses `import.meta.glob` with `?raw` over that directory only.

**Usage in MDX:**

```mdx
import InstallationCardGrid from '~/components/InstallationCardGrid.astro';
import { Products } from '~/models/site.models';

<InstallationCardGrid product={props.product} items={[
  {
    path: 'installation/ubuntu',
    title: 'Ubuntu',
    icon: '/src/assets/images/installation/ubuntu.svg',
    accent: '#e95420',
  },
  {
    path: 'https://thingsboard.cloud/signup',
    title: 'ThingsBoard Cloud',
    icon: '/src/assets/images/installation/trendz-cloud.svg',
    target: '_blank',
    badge: 'FREE',
    badgeVariant: 'tip',
  },
  {
    title: 'OpenShift',
    icon: '/src/assets/images/installation/open-shift.svg',
    // no path → Coming soon
  },
]} />
```

### RuleNodeCardGrid Component

`src/components/RuleNodeCardGrid.astro` — responsive card grid for rule node category overviews.

**Features:**
- 3-column grid (2 on tablet ≤900px, 1 on mobile ≤480px)
- Each card links to an anchor section on the page
- Image area (16:9): shows an optimised raster screenshot, or a grid-background placeholder with a centered SVG icon
- SVG icon scales to 1.2× on card hover
- Optional Starlight `<Badge>` in the top-right corner of the image area
- Raster images processed at build time → WebP 480px/85q via `astro:assets`
- SVGs resolved via a separate `import.meta.glob` (not processed, served as-is)

**Props (`CardItem`):**

```ts
interface CardItem {
  title: string;
  href: string;
  description: string;
  image?: string;       // Raster image path inside /src/assets/ (png/jpg/webp/gif)
  icon?: string;        // SVG path inside /src/assets/ — shown in placeholder when no image
  alt?: string;         // Alt text for image; falls back to title
  badge?: string;       // Badge label in top-right corner of image area
  badgeVariant?: 'default' | 'note' | 'tip' | 'caution' | 'danger' | 'success';
}
```

**Important:** Both `image` and `icon` paths must be inside `/src/assets/` — the component uses `import.meta.glob` over that directory only.

**Usage in MDX:**

```mdx
import RuleNodeCardGrid from '~/components/RuleNodeCardGrid.astro';

<RuleNodeCardGrid items={[
  {
    href: '#filter-nodes',
    title: 'Filter',
    description: 'Route messages based on conditions — no data modification',
    icon: '/src/assets/images/user-guide/rule-nodes/node-filter.svg',
  },
  {
    href: '#analytics-nodes',
    title: 'Analytics',
    description: 'Aggregate data streams and compute statistics',
    icon: '/src/assets/images/user-guide/rule-nodes/node-analytics.svg',
    badge: 'PE only',
    badgeVariant: 'success',
  },
]} />
```

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

`config/plugins/expressive-code-max-lines.mjs` — custom Expressive Code plugin that adds independent meta options to fenced code blocks.

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
- Plugins registered in `ec.config.mjs` (project root) — **not** in `astro.config.ts`. This separate file is required for the `<Code>` component to work alongside custom plugins.
- HAST uses `properties.className` (array), not `properties.class` — the plugin uses a local `appendClassName` helper
- Data attribute stored as `dataMaxLines` in HAST properties → rendered as `data-max-lines` in HTML → read as `el.dataset.maxLines` in JS
- Hook order: `pluginFrames` wraps `blockAst` in `<figure.frame>` before our hook runs, so `renderData.blockAst` is already the final `<figure>`
- The plugin file is `.mjs` (not `.ts`) because `ec.config.mjs` is executed directly by Node.js on CI without Vite — TypeScript extensions cause `ERR_UNKNOWN_FILE_EXTENSION`

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

### Version Constants

`src/data/versions.ts` — centralized product version strings. **Never hardcode version strings** in Docker image tags, download URLs, or code blocks.

```ts
import { CE_FULL_VER } from '~/data/versions';        // '4.3.0.1'
import { PE_FULL_VER, TRENDZ_VER } from '~/data/versions';  // '4.3.0.1PE', '1.15.0.4'
```

Available: `CE_FULL_VER`, `PE_FULL_VER`, `TRENDZ_VER`, `EDGE_VER`, `EDGE_PE_VER`, `TBMQ_VER`, `TBMQ_PE_VER`.

To interpolate versions into code blocks, use the `<Code>` component with exported string constants:

```mdx
import { Code } from '@astrojs/starlight/components';
import { CE_FULL_VER } from '~/data/versions';

export const yamlContent = `services:
  thingsboard:
    image: "thingsboard/tb-node:${CE_FULL_VER}"`;

<Code code={yamlContent} lang="yml" meta="maxLines=20 collapsible" />
```

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
- Never use fenced code blocks (`` ``` ``) inside `{...}` JSX expressions — `${...}` inside the block is parsed as a JSX expression and the build fails. Use `<pre><code>{'content with ${literal} dollar braces'}</code></pre>` instead, where the content is a JS string literal so `${...}` is treated as plain text
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
- To render a literal `${varName}` string in MDX text (not as a JS expression), escape the curly braces: `$\{varName\}` — this renders as `${varName}` without any "varName is not defined" build error
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

#### ConditionalHeading Component

`src/components/ConditionalHeading.astro` — renders a heading with the full Starlight anchor-link structure (`sl-heading-wrapper` + `sl-anchor-link`) for use inside JSX conditional expressions in `_includes` files.

**The problem it solves:** Headings inside `{...}` JSX expressions (`{condition && (<><h3>...</h3></>)}`) are invisible to Starlight's TOC and don't get anchor icons. A markdown `### heading` inside `{...}` renders as plain text. `ConditionalHeading` provides a heading that:
- Renders the correct HTML structure (identical to what Starlight generates for markdown headings)
- Gets picked up by `rehype-mdx-include-headings` plugin and injected into the TOC **only for matching products**
- Has a working anchor link (explicit `id` prop)

**Props:**

```ts
interface Props {
  level?: 2 | 3 | 4 | 5 | 6;  // heading level, default 3
  id: string;                   // anchor id, e.g. "export-dashboard" (required)
  exclude?: string;             // comma-separated product ids to EXCLUDE (plugin only)
  showFor?: string;             // comma-separated product ids to INCLUDE (plugin only)
}
```

`exclude` and `showFor` are parsed by the `rehype-mdx-include-headings` plugin from raw MDX source — they are not used in rendering.

**Product ids** (for `exclude`/`showFor`): `ce`, `pe`, `paas`, `paas-eu`, `edge`, `edge-pe`, `trendz`, `iot-gateway`, `mqtt-broker`, `mqtt-broker-pe`, `mobile`, `mobile-pe`, `license-server`.

**Usage in MDX `_includes`:**

```mdx
import ConditionalHeading from '~/components/ConditionalHeading.astro';

{props.product !== Products.CE && (
  <>
    <ConditionalHeading level={3} id="export-dashboard" exclude="ce">Export dashboard</ConditionalHeading>

    Content visible only for non-CE products...
  </>
)}
```

**TOC level rules** — the `level` value determines where the heading appears in the right sidebar:
- `level={2}` → same indentation as `##` headings (top level)
- `level={3}` → nested under the previous `##` heading (same visual level as `####` siblings due to `injectChild` algorithm — use `level={2}` for top-level placement)
- `level={4}` → nested one level deeper

**How it works:** The `rehype-mdx-include-headings` plugin (`config/plugins/rehype-mdx-include-headings.ts`):
1. Determines the current page's product from its file path (`src/content/docs/docs/pe/...` → `pe`)
2. Skips `### markdown` headings inside `{...}` JSX blocks (they render as plain text anyway)
3. Parses `<ConditionalHeading>` tags and injects the heading into the TOC only when the page product matches `exclude`/`showFor`

**Important:** If the dev server doesn't pick up a change to `level` or `id` inside an include file, restart it (`pnpm dev`) — hot-reload may miss include file changes when only the include (not the page file) is modified.

### Custom Plugins

- `config/plugins/remark-fallback-lang.ts` — marks untranslated content
- `config/plugins/rehype-tasklist-enhancer.ts` — enhanced task lists
- `config/plugins/rehype-mdx-include-headings.ts` — extracts headings from `_includes` MDX files and injects them into the page TOC; supports `<ConditionalHeading>` for product-conditional headings
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

## Releasing a New Version

### Files to update

| File | What to change |
|------|---------------|
| `src/data/versions.ts` | Update `CE_FULL_VER`, `PE_FULL_VER`, etc. |
| `src/models/upgrade-instructions.ts` | Prepend new entry to `UPGRADE_VERSIONS` (newest first) |
| `src/models/releases-table.ts` | Update `latestPatch` + `latestPatchDate` for the family (patch), or prepend new `ReleaseFamily` entry (new major/minor) |
| Release notes MDX files | Create or update CE + PE include files and page wrappers |

---

### Case 1 — New patch release (e.g. 4.3.0.2)

**1. `src/data/versions.ts`**

```ts
export const CE_FULL_VER = '4.3.0.2';
export const PE_FULL_VER = '4.3.0.2PE';
```

**2. `src/models/upgrade-instructions.ts`** — prepend to `UPGRADE_VERSIONS`:

```ts
{
  version: '4.3.0.2',
  displayVersion: '4.3.0.2',    // patch → keep full version
  family: '4.3',
  baseVersion: '4.3.0',          // base: X.Y.0 of this patch
  releaseDate: 'Mar 3 2026',
  // releaseDatePe: 'Mar 3 2026', // only if PE date differs
  upgradableFrom: '4.2.1.x',    // same as previous patch in this family
  prevVersionAnchor: 'v4-2-1-2', // anchor of the upgradableFrom version
  lts: true,
  patch: true,
  x: true,
  upgrade: true,
  manualVersionUpgrade: false,
  windowsZip: false,
  anchor: 'v4-3-0-2',           // v + version with dots→dashes
},
```

**Anchor format:** `v` + version with dots replaced by dashes → `4.3.0.2` → `v4-3-0-2`.

**3. `src/models/releases-table.ts`** — update the existing family entry:

```ts
{
  family: '4.3',
  latestPatch: 'v4.3.0.2',           // update
  latestPatchDate: 'Mar 3 2026',      // update
  // latestPatchDatePe: 'Mar 3 2026', // only if PE date differs
  patches: [
    { version: 'v4.3.0.2', date: 'Mar 3, 2026' }, // prepend
    { version: 'v4.3.0.1', date: 'Feb 3, 2026' },
    { version: 'v4.3.0',   date: 'Jan 20, 2026' },
  ],
  // ... rest unchanged
},
```

**4. Release notes MDX** — add a new patch section to the existing include files:

- `src/content/_includes/docs/releases/v4-3-x.mdx`
- `src/content/_includes/docs/pe/releases/v4-3-x.mdx`

---

### Case 2 — New minor/major release (e.g. 4.4.0)

**1. `src/data/versions.ts`** — update as above.

**2. `src/models/upgrade-instructions.ts`** — prepend to `UPGRADE_VERSIONS`:

```ts
{
  version: '4.4.0',
  displayVersion: '4.4',             // X.Y.0 → drop trailing .0 for display
  family: '4.4',
  // no baseVersion for X.Y.0
  releaseDate: 'Apr 1 2026',
  upgradableFrom: '4.3.0.x',
  prevVersionAnchor: 'v4-3-0-1',
  lts: false,                         // set true if this is an LTS release
  patch: false,
  x: true,
  upgrade: true,
  manualVersionUpgrade: false,
  windowsZip: false,
  anchor: 'v4-4-0',
},
```

**3. `src/models/releases-table.ts`** — prepend a new `ReleaseFamily` entry:

```ts
{
  family: '4.4',
  lts: false,                         // true if LTS
  releaseDate: 'Apr 1 2026',
  latestPatch: 'v4.4.0',
  latestPatchDate: 'Apr 1 2026',
  highlightsCe: 'Short CE feature description',
  // highlightsPe: 'Override for PE if different',
  patches: [
    { version: 'v4.4.0', date: 'Apr 1, 2026' },
  ],
},
```

**4. Create new release notes MDX files:**

- `src/content/_includes/docs/releases/v4-4-x.mdx` (CE include)
- `src/content/_includes/docs/pe/releases/v4-4-x.mdx` (PE include)
- `src/content/docs/docs/user-guide/releases-table/v4-4-x.mdx` (CE page wrapper)
- `src/content/docs/docs/pe/user-guide/releases-table/v4-4-x.mdx` (PE page wrapper)

Copy an existing `v4-3-x.mdx` as a starting template.

---

### Marking a version as vulnerable

Set `vulnerable: true` in the `UPGRADE_VERSIONS` entry — the version will be excluded from the upgrade table automatically:

```ts
{
  version: '4.3.0.0',
  // ...
  vulnerable: true,
},
```

---

### Key rules

- `UPGRADE_VERSIONS` is ordered **newest first** — always prepend.
- `RELEASE_FAMILIES` is ordered **newest first** — always prepend.
- `displayVersion`: `X.Y.0` → `X.Y`; all others keep the full version string.
- `anchor`: replace all dots with dashes, prefix `v` → `4.3.0.1` → `v4-3-0-1`.
- `upgradableFrom` for patches within same family: use `X.Y.Z.x` notation (with `.x`).
- After adding a new LTS family, check that `status` logic in `ReleasesTable.astro` correctly identifies **Active LTS** (first non-EOL LTS) vs **Maintenance LTS** (older non-EOL LTS) — it's computed automatically from `RELEASE_FAMILIES` order.

## Code Style

- Tabs for indentation in code files; spaces for JSON, Markdown, MDX, YAML, TOML
- Prettier with `prettier-plugin-astro`, printWidth 100, single quotes, trailing commas
- ESLint flat config with TypeScript and Astro plugins

## CI Checks

PRs run: `astro check`, `eslint`, `slugcheck`, `linkcheck`. All must pass.
