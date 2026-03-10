---
name: typography
description: Typography system for all non-doc pages — SCSS mixins, font sizes, weights, spacing, breakpoints, and dark-theme color conventions. Source of truth for landing, use-case, case-study, and all standalone pages.
---

# Typography & Design System (Non-Doc Pages)

Defined in `src/styles/_variables.scss`. This is the **single source of truth** for font sizes, weights, line-heights, spacing, breakpoints, and color conventions across all non-documentation pages.

**Scope:** All pages except Starlight doc pages (`src/content/docs/`). Doc pages use the separate `heading-1/2/3/4/5` and `body-text` base mixins applied via `_base.scss`.

## How to use

Import variables in any component's `<style lang="scss">` block:

```scss
@use '../../styles/variables' as *;
```

The path depth varies by component location — adjust `../../` accordingly.

---

## Semantic Typography Mixins

These mixins define the typographic scale for all non-doc pages. **Do not hardcode font values** — always use a mixin.

### Titles

| Mixin | Desktop | Mobile (≤md) | Weight |
|-------|---------|--------------|--------|
| `page-title` | 48px / lh:1.2 | 36px (≤lg) → 30px (≤md) | semibold |
| `section-title` | 40px / lh:48px | 32px | semibold |
| `subsection-title` | 32px / lh:40px | 24px | semibold |
| `card-title-lg` | 28px / lh:1.2 | 24px (≤sm) | medium |
| `card-title` | 24px / lh:1.2 | — | semibold |
| `card-title-sm` | 20px / lh:24px | — | semibold |

Title mixins **do not set color** — set it explicitly in the component.

### Text

| Mixin | Size / Line-height | Weight | Color |
|-------|-------------------|--------|-------|
| `text-m` | 16px / 28px | normal | `var(--color-text)` |
| `text-s` | 14px / 24px | normal | `var(--color-text)` |
| `text-card` | 16px / 1.72 | normal | `var(--color-text)` |
| `text-card-sm` | 14px / 1.72 | normal | `var(--color-text)` |
| `text-overlay` | 18px / 30px | medium | — (set explicitly, typically `$color-white` on dark bg) |
| `text-tab` | 18px / 1.3 | medium | — |
| `text-table-header` | 18px / 1.5 | semibold | — |
| `text-table-cell` | 16px / 1.5 | normal | — |
| `text-xs` | 12px / 1.5 | medium | — |
| `action-link` | 18px | medium | — |

### Special

| Mixin | Desktop | Mobile (≤md) | Weight |
|-------|---------|--------------|--------|
| `stat-value` | 56px / lh:1.1 | 40px | bold |
| `section-badge` | 14px / lh:1.2, monospace | — | medium |

### Mixin selection guide

- **Page h1** → `page-title`
- **Section h2** (main sections) → `section-title`
- **Subsection h2** (banners, summaries) → `subsection-title`
- **Index card h3** (featured cards, large index cards) → `card-title-lg`
- **Card h3** (large cards) → `card-title`
- **Card h3** (benefit cards, small cards) → `card-title-sm`
- **Section descriptions, subtitles** → `text-m`
- **Base text, paragraphs** → `text-s`
- **Card descriptions** → `text-card`
- **Small card descriptions** → `text-card-sm`
- **Text on dark overlays** → `text-overlay`
- **Sidebar tabs, toggle items** → `text-tab`
- **Table headers** → `text-table-header`
- **Table body cells** → `text-table-cell`
- **Badges, tags, labels** → `text-xs`
- **Large display numbers** → `stat-value`
- **Section badges** (colored labels above h2) → `section-badge`
- **Links (Read more, card links)** → `action-link`

---

## Base Heading Mixins (Doc Pages)

These are applied globally in `_base.scss` to `<h1>`–`<h5>` elements. They affect doc pages and serve as defaults everywhere. Non-doc pages typically override with the semantic mixins above.

| Mixin | Size | Weight |
|-------|------|--------|
| `heading-1` | 42px (h1) | semibold |
| `heading-2` | 35px (h2) | semibold |
| `heading-3` | 29px (h3) | medium |
| `heading-4` | 24px (h4) | medium |
| `heading-5` | 18px (h5) | medium |
| `body-text` | 16px → 18px (≥md) | normal |

---

## Font Variables

```scss
$font-family-base: ui-sans-serif, system-ui, 'Segoe UI', Roboto, ...;
$font-family-mono: ui-monospace, SFMono-Regular, Menlo, ...;

// Weights
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Sizes (rem, base 16px)
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.75rem;   // 28px
$font-size-4xl: 2rem;      // 32px
$font-size-5xl: 2.25rem;   // 36px
$font-size-6xl: 2.625rem;  // 42px
```

---

## Spacing Scale

```scss
$spacing-0: 0;       $spacing-1: 4px;    $spacing-2: 8px;
$spacing-3: 12px;    $spacing-4: 16px;   $spacing-5: 20px;
$spacing-6: 24px;    $spacing-8: 32px;   $spacing-10: 40px;
$spacing-12: 48px;   $spacing-16: 64px;  $spacing-20: 80px;
$spacing-24: 100px;  $spacing-30: 120px;
```

---

## Breakpoints

| Name | Width | Mixin |
|------|-------|-------|
| sm | 480px | `@include media-up(sm)` / `media-down(sm)` |
| md | 750px | `@include media-up(md)` / `media-down(md)` |
| lg | 1024px | `@include media-up(lg)` / `media-down(lg)` |
| xl | 1280px | `@include media-up(xl)` / `media-down(xl)` |
| 2xl | 1500px | `@include media-up(2xl)` / `media-down(2xl)` |

`media-up` = min-width (mobile-first). `media-down` = max-width (desktop-first, value - 1px).

---

## Border Radius

```scss
$radius-sm: 4px;    $radius-md: 6px;    $radius-lg: 8px;
$radius-xl: 16px;   $radius-2xl: 24px;  $radius-full: 100px;
```

---

## Common Mixins

```scss
@include button-base;      // inline-flex, padding, font, radius, transition
@include button-primary;   // blue bg, white text, shadow on hover
@include button-outline;   // transparent bg, border, dark theme aware

@include card;             // var(--color-bg-surface), radius-md, shadow-lg

@include flex-center;      // display:flex, center both axes
@include flex-between;     // display:flex, center vertical, space-between

@include container;        // max-width 1080px, centered, horizontal padding
```

---

## Dark Theme Color Conventions

Non-doc pages use CSS custom properties for all theme-dependent colors. **Never use compile-time SCSS variables** (`$color-white`, `$color-text-primary`, etc.) for backgrounds, text, or borders.

| Purpose | Use | NOT |
|---------|-----|-----|
| Background (page) | `var(--color-bg)` | `$color-bg-white` |
| Background (card/surface) | `var(--color-bg-surface)` | `$color-white` |
| Background (section alt) | `var(--color-bg-light)` | `$color-bg-light` |
| Text (primary) | `var(--color-text)` | `$color-text-primary` |
| Text (secondary) | `var(--color-text-secondary)` | `$color-text-secondary` |
| Border | `var(--color-border)` | `$color-border` |
| Border (light) | `var(--color-border-light)` | `$color-border-light` |

**Exception:** Use SCSS vars for intentionally fixed colors (e.g., `$color-white` for white text on a dark overlay or colored background).

### Product Color CSS Variables

| Variable | Light | Dark |
|----------|-------|------|
| `--color-product-ce` | `#305680` | `#78b4f5` |
| `--color-product-pe` | `#00695c` | `#3fd9d1` |
| `--color-product-cloud` | `#3d50f5` | `#b3c7ff` |
| `--color-product-trendz` | `#2696f3` | `#4caeff` |
| `--color-product-gw` | `#6d28d9` | `#a78bfa` |
