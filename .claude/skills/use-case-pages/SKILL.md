---
name: use-case-pages
description: Full reference for creating and editing data-driven IoT use-case pages at /use-cases/{slug}. Covers data types, page composition, layout, section components, and typography system.
---

# Use-Case Pages System

Data-driven IoT use-case pages (`/use-cases/{slug}`) with composable section components. Each page is assembled from a TypeScript data file + layout + section components.

## File structure

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

## Data types (`src/data/use-cases/types.ts`)

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

## Page composition pattern

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

## Layout (`src/layouts/UseCaseLayout.astro`)

Wraps pages with `BaseLayout` (pageId=`"use-cases"`). Provides global styles:
- `.usecase-title` — `page-title` mixin, 40px top margin
- `.uc-section-padding` — 60px vertical padding (8px on md)
- `.uc-section-header` — flex column with h2 (`section-title`) + p (`text-m`)
- `.uc-about-text` — split layout: `.uc-about-short` (flex: 1) + `.uc-about-long` (flex: 2), stacks on lg
- `.uc-solution-text` — single-column paragraph block, max-width 928px, `text-m`

## Key components

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

## Index page (`src/pages/use-cases/index.astro`)

Card grid with filter tabs (All / General / SCADA). Uses `UseCaseCard` component. Every 3rd card is `featured` (spans 2 columns, horizontal layout). Cards with video arrays use `GifVideo` (plays on hover). Filter switching via JS toggles `.filter-hidden` class.

## Adding a new use-case page

1. Create data file: `src/data/use-cases/{slug}.ts` exporting `UseCaseData`
2. Create page: `src/pages/use-cases/{slug}.astro` following the composition pattern above
3. Add card entry to `src/data/use-cases/index.ts` (`useCaseItems` array)
4. Add images to `src/assets/images/usecases/{slug}/`

---

# Typography System (All Non-Doc Pages)

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

## Product Color CSS Variables

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
