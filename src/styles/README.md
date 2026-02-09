# ThingsBoard Styles Architecture

## File Structure

```
src/styles/
├── _variables.scss    # Design system: colors, typography, spacing, mixins
├── _reset.scss        # CSS reset/normalize
├── _base.scss         # Base element styles (body, links, buttons)
├── _utilities.scss    # Utility classes (display, flex, spacing, text)
├── _layout.scss       # Layout system (containers, grid, sections)
├── _header.scss       # Header/navigation styles
├── _footer.scss       # Footer styles
├── _home.scss         # Home page specific styles
└── global.scss        # Main entry point (imports all partials)
```

## Naming Conventions

### BEM Methodology

We use BEM (Block Element Modifier) naming convention:

```scss
// Block
.feature-card { }

// Element (part of a block)
.feature-card__title { }
.feature-card__icon { }
.feature-card__description { }

// Modifier (variation of block/element)
.feature-card--featured { }
.feature-card--dark { }
```

### Class Name Patterns

| Pattern | Usage | Example |
|---------|-------|---------|
| `.component` | Component block | `.feature-card` |
| `.component__element` | Child element | `.feature-card__title` |
| `.component--modifier` | Variant | `.feature-card--featured` |
| `.page-name` | Page container | `.page-home` |
| `.section-name` | Section container | `.products-section` |
| `.component-variant` | Layout variant | `.feature-row--dark` |

### Naming Categories

**Layout:**
- `.container`, `.container-narrow`, `.container-wide`
- `.section`, `.section-sm`, `.section-lg`
- `.row`, `.col-*`

**Components:**
- `.feature-card`, `.product-card`, `.ecosystem-card`
- `.feature-block`, `.feature-row`
- `.mode-selector`, `.read-more-link`

**Utilities:**
- `.d-flex`, `.d-none`, `.d-block`
- `.text-center`, `.text-left`
- `.mt-4`, `.mb-8`, `.p-6`

## Design System Variables

### Colors

```scss
// Primary
$color-primary: #2A7DEC;
$color-primary-hover: #4F97F8;
$color-primary-dark: #305680;

// Text
$color-text-primary: #212529;
$color-text-secondary: #75767C;
$color-text-muted: #707275;

// Background
$color-bg-light: #F7F9FC;
$color-bg-dark: #252628;
```

### Spacing Scale

```scss
$spacing-1: 4px;
$spacing-2: 8px;
$spacing-3: 12px;
$spacing-4: 16px;
$spacing-5: 20px;
$spacing-6: 24px;
$spacing-8: 32px;
$spacing-10: 40px;
$spacing-12: 48px;
$spacing-16: 64px;
$spacing-20: 80px;
$spacing-24: 100px;
$spacing-30: 120px;
```

### Typography

```scss
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-base: 16px;
$font-size-lg: 18px;
$font-size-xl: 20px;
$font-size-2xl: 24px;
$font-size-3xl: 28px;
$font-size-4xl: 32px;
$font-size-5xl: 36px;
$font-size-6xl: 42px;
```

### Breakpoints

```scss
$breakpoint-sm: 480px;
$breakpoint-md: 750px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1500px;
```

## Using Mixins

### Media Queries

```scss
// Desktop first (max-width)
@include media-down(md) {
  // Styles for < 750px
}

// Mobile first (min-width)
@include media-up(lg) {
  // Styles for >= 1024px
}
```

### Typography

```scss
@include heading-1;  // Large page title
@include heading-2;  // Section title
@include heading-3;  // Subsection title
@include body-text;  // Paragraph text
```

### Layout

```scss
@include container;     // Centered container with max-width
@include flex-center;   // Center items both axes
@include flex-between;  // Space between with center alignment
@include card;          // Card with shadow and border-radius
```

### Buttons

```scss
@include button-base;     // Base button styles
@include button-primary;  // Primary filled button
@include button-outline;  // Outlined button
```

## CSS Custom Properties

For runtime theming and component styles, use CSS custom properties:

```scss
// In component <style> tags
.my-component {
  color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
}
```

## Best Practices

1. **Component Styles**: Keep component-specific styles in `.astro` component files
2. **Global Styles**: Use global files only for truly global patterns
3. **Variables**: Always use design system variables, never hardcode values
4. **Responsive**: Use mixins (`@include media-up/down`) instead of raw media queries
5. **BEM Naming**: Follow BEM for all new classes
6. **Semantic HTML**: Let HTML structure drive styling, not arbitrary class names
