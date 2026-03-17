---
name: case-study-pages
description: Full reference for creating and editing data-driven case study pages at /case-studies/{slug}. Covers data types, page composition, layout, section components, and shared presets.
---

# Case-Study Pages System

Data-driven customer case study pages (`/case-studies/{slug}`) with composable section components. Each page is assembled from a TypeScript data file + layout + section components. The index page provides search, category filtering, pagination, and a featured hero card.

## File structure

```
src/data/case-studies/
  ├── types.ts              ← shared TypeScript interfaces
  ├── index.ts              ← card data, categories, featured card, shared banner presets
  ├── onedata.ts            ← CaseStudyData export (example)
  ├── schwarz.ts            ← CaseStudyData export
  └── ...
src/components/CaseStudy/
  ├── CaseStudyDetailHero.astro  ← hero with logo, category, paragraphs, background image
  ├── StatisticsSection.astro    ← animated stat counters
  ├── QuoteSection.astro         ← simple or authored quote
  ├── ProblemSection.astro       ← challenges + key results two-column grid
  ├── PowerSection.astro         ← zigzag blocks with images and text
  ├── HelpSection.astro          ← zigzag blocks with overlapping image pairs
  ├── ContactCTA.astro           ← dark overlay CTA with double-frame logos
  ├── FullWidthImage.astro       ← edge-to-edge image section
  └── AwardSection.astro         ← award badge with image, title, description
src/components/SectionBadge.astro ← colored monospace badge, shared with use-case pages
src/layouts/CaseStudyLayout.astro ← wraps all case study detail pages
src/pages/case-studies/
  ├── index.astro                ← card grid with search, filters, pagination
  ├── onedata.astro              ← detail page (example)
  ├── schwarz.astro
  └── ...
```

## Data types (`src/data/case-studies/types.ts`)

### `CaseStudyData` (root interface for detail pages)

```ts
interface CaseStudyData {
  title: string;           // card/SEO title
  pageTitle: string;       // <title> tag
  description: string;     // meta description
  pageSlug: string;        // URL slug (matches filename)
  breadcrumb: string;      // breadcrumb trail text
  categories: string[];    // for index page filtering

  hero: {
    category: string;           // uppercase label (e.g. "HEALTHCARE")
    heading: string;            // main heading
    paragraphs: string[];       // body text (rendered with set:html)
    logo: string;               // company logo URL
    logoAlt: string;
    logoWidth?: number;
    logoHeight?: number;
    backgroundImage: string;    // hero background image URL
  };

  statistics?: StatisticItem[];   // animated counter section
  quote?: QuoteData;              // simple testimonial quote
  problem: {                      // challenges & results section
    badge?: string;
    description?: string;         // rendered with set:html
    challenges: string[];         // warning-icon list items
    results: string[];            // success-icon list items
  };
  power: {                        // "How ThingsBoard powers {company}" section
    badge?: string;
    companyName: string;
    blocks: PowerBlock[];
  };
  customerQuote?: QuoteData;      // authored quote with photo
  fullWidthImage?: { src: string; alt: string };
  help: {                         // "How ThingsBoard helps {industry}" section
    badge?: string;
    industryName: string;
    blocks: HelpBlock[];
  };
  authoredQuote?: QuoteData;      // second authored quote (bottom of page)
  award?: AwardData;              // optional award badge
  contact: {                      // ContactCTA logo data
    companyLogo: string;
    companyLogoAlt: string;
    companyLogoWidth?: number;
    companyLogoHeight?: number;
  };
}
```

### Supporting interfaces

```ts
interface StatisticItem {
  value: number;
  prefix?: string;            // e.g. "~"
  suffix?: string;            // e.g. "%", "+"
  decimal?: { value: number; suffix?: string };
  label: string;
}

interface QuoteData {
  text: string;               // quote text (can contain HTML)
  author: string;
  role?: string;              // job title
  company?: string;           // company name (for authored variant)
  photo?: string;             // photo URL (triggers authored variant)
}

interface PowerBlock {
  title: string;
  text: string;               // rendered with set:html
  image: string;
  imageAlt: string;
}

interface HelpBlock {
  title: string;
  text: string;               // rendered with set:html
  listItems?: string[];       // optional bullet list below text
  images: { src: string; alt: string; title?: string }[];  // exactly 2 images (back + front overlap)
}

interface AwardData {
  image: string;
  imageAlt: string;
  title: string;
  titleHref?: string;         // optional link on title and image
  description: string;        // rendered with set:html
}
```

### Index-specific types

```ts
interface CaseStudyCard {
  slug: string;
  categories: string[];
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  logoHeight?: number;        // override default 56px logo height
  backgroundImage: string;
}

interface FeaturedCard {
  slug: string;
  category: string;           // single category label (uppercase)
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  backgroundImage: string;
}
```

## Page composition pattern

All case study detail pages follow this template:

```astro
---
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
import { exampleData as data } from '../../data/case-studies/example';
import CaseStudyDetailHero from '../../components/CaseStudy/CaseStudyDetailHero.astro';
import StatisticsSection from '../../components/CaseStudy/StatisticsSection.astro';
import QuoteSection from '../../components/CaseStudy/QuoteSection.astro';
import ProblemSection from '../../components/CaseStudy/ProblemSection.astro';
import PowerSection from '../../components/CaseStudy/PowerSection.astro';
import FullWidthImage from '../../components/CaseStudy/FullWidthImage.astro';
import HelpSection from '../../components/CaseStudy/HelpSection.astro';
import AwardSection from '../../components/CaseStudy/AwardSection.astro';
import ContactCTA from '../../components/CaseStudy/ContactCTA.astro';
import ContactUsBanner from '../../components/UseCase/ContactUsBanner.astro';
import { caseStudyContactBanner, caseStudyServicesBanner } from '../../data/case-studies/index';
---

<CaseStudyLayout title={data.pageTitle} description={data.description} pageSlug={data.pageSlug} breadcrumb={data.breadcrumb}>

  <CaseStudyDetailHero {...data.hero} />

  {data.statistics && <StatisticsSection items={data.statistics} />}

  {data.quote && <QuoteSection text={data.quote.text} author={data.quote.author} role={data.quote.role} />}

  <ProblemSection badge={data.problem.badge} description={data.problem.description} challenges={data.problem.challenges} results={data.problem.results} />

  <PowerSection badge={data.power.badge} companyName={data.power.companyName} blocks={data.power.blocks} />

  {data.customerQuote && (
    <QuoteSection
      text={data.customerQuote.text}
      author={data.customerQuote.author}
      role={data.customerQuote.role}
      company={data.customerQuote.company}
      photo={data.customerQuote.photo}
      variant="authored"
    />
  )}

  {data.fullWidthImage && <FullWidthImage src={data.fullWidthImage.src} alt={data.fullWidthImage.alt} />}

  {data.award && <AwardSection {...data.award} />}

  <ContactUsBanner {...caseStudyContactBanner} />

  <HelpSection badge={data.help.badge} industryName={data.help.industryName} blocks={data.help.blocks} />

  <ContactUsBanner {...caseStudyServicesBanner} />

  {data.authoredQuote && (
    <QuoteSection
      text={data.authoredQuote.text}
      author={data.authoredQuote.author}
      role={data.authoredQuote.role}
      company={data.authoredQuote.company}
      photo={data.authoredQuote.photo}
      variant="authored"
    />
  )}

  <ContactCTA
    companyLogo={data.contact.companyLogo}
    companyLogoAlt={data.contact.companyLogoAlt}
    companyLogoWidth={data.contact.companyLogoWidth}
    companyLogoHeight={data.contact.companyLogoHeight}
  />

</CaseStudyLayout>
```

Sections are rendered conditionally based on data presence. The two `ContactUsBanner` instances use shared presets from `index.ts`. The section order shown above is the standard order.

## Shared presets

Defined in `src/data/case-studies/index.ts`:

**`caseStudyContactBanner`** -- renders as "Contact Us" + "Use cases" buttons. Used after the power/quote sections.

```ts
export const caseStudyContactBanner = {
  buttons: [
    { label: 'Contact Us', href: '/contact-us/' },
    { label: 'Use cases', href: '/use-cases/', variant: 'outlined' as const },
  ],
};
```

**`caseStudyServicesBanner`** -- renders as a light-variant banner promoting ThingsBoard services. Used after the help section.

```ts
export const caseStudyServicesBanner = {
  title: 'Want to achieve similarly impactful results?',
  subtitle: 'Find your development partner for scalable solutions delivered fast and on a fixed timeline.',
  iconSrc: 'https://img.thingsboard.io/usecases/services-icon.svg',
  iconAlt: 'Services icon',
  buttons: [{ label: 'Explore our service', href: '/docs/services/' }],
  variant: 'light' as const,
};
```

Both use the `ContactUsBanner` component from `src/components/UseCase/ContactUsBanner.astro` (shared with use-case pages).

## Layout (`src/layouts/CaseStudyLayout.astro`)

Props: `title`, `description?`, `pageSlug`, `breadcrumb`.

Wraps pages with `BaseLayout` (pageId=`"case-studies"`). Provides:
- `.case-study-page` -- `container` mixin, top padding for header offset, left/right borders
- `.case-study-breadcrumb` -- "Case Studies > {breadcrumb}" trail with link back to index
- `.cs-section` -- shared bottom margin (`$spacing-16`, `$spacing-10` on mobile)
- Breadcrumb link restores sessionStorage filter state so users return to their filtered view

## Key components

**`CaseStudyDetailHero`** -- full-width hero card with background image, company logo (white-filtered), uppercase category label, heading, and body paragraphs. On desktop: text left, image right. On mobile: image inlined between heading and paragraphs.

**`StatisticsSection`** -- horizontal row of animated counters. Supports `prefix` (e.g. "~"), `suffix` (e.g. "%"), and `decimal` sub-values. Numbers animate on scroll via IntersectionObserver with easeOutExpo curve over 2 seconds. Uses `Intl.NumberFormat` for grouping.

**`ProblemSection`** -- "What problem did they face?" section with optional badge and description. Two-column card grid: left card shows challenges (warning question-circle icons), right card shows key results (success check-circle icons). Items rendered with `set:html`. Default badge: "Challenges & results" (gold).

**`PowerSection`** -- "How ThingsBoard powers {companyName}?" section with zigzag layout. Odd blocks: text left, image right. Even blocks: reversed. Each block has a title (`card-title` mixin), text (`set:html`), and a 480px image. Default badge: "How it works" (blue).

**`HelpSection`** -- "How ThingsBoard helps {industryName}?" section with zigzag layout. Each block has text + optional bullet list on one side and two overlapping images on the other (back image top-left, front image bottom-right, 65% width each). Default badge: "Industry impact" (purple).

**`QuoteSection`** -- two variants selected by `variant` prop:
- `"simple"` (default): left border accent, quote-left icon, italic text, author line. Badge: "Client testimonial" (green).
- `"authored"`: left border accent, company name heading, italic quote, author name + role, photo on the right side. Badge: "Partner spotlight" (teal). Triggered when `variant="authored"` and `photo` is provided.
- **Feedback cross-reference**: Auto-detects case study slug from URL and looks up `caseStudyToFeedbackUrl` mapping. For truncated quotes (ending with `...`), appends an inline "Read full feedback" link right after the dots. For complete quotes, shows a "Clients feedback" pill chip below the author attribution.

**`FullWidthImage`** -- bleeds past container padding with negative margins. Simple `<img>` with lazy loading and rounded corners.

**`AwardSection`** -- horizontal layout with award image left and title + description right. Title and image optionally wrapped in a link via `titleHref`.

**`ContactCTA`** -- dark overlay section with handshake background image, double-frame design (outer rectangle border + inner corner brackets via pseudo-elements). Shows ThingsBoard logo top-right, company logo bottom-left (both white-filtered). Below: tagline text + "Contact us" button.

**`SectionBadge`** -- small colored monospace label used as section identifiers. Props: `text`, `color` (background), `borderColor` (defaults to `color`). Shared across use-case and case-study pages.

## Index page

Located at `src/pages/case-studies/index.astro`. Features:

- **Featured hero card**: `featuredCard` from `index.ts`, displayed as a horizontal card at the top with hover zoom effect
- **Search bar**: text input with debounced filtering (300ms), searches title, description, and categories
- **Category filter pills**: checkbox toggles built from `caseStudyCategories` array, with active state styling and "Clear all" button
- **Card grid**: 3 columns (2 on xl, 1 on mobile), 340px height cards with dark overlay, white-filtered logos, category badges, and hover zoom + "Learn more" reveal
- **Pagination**: 9 cards per page, numbered buttons with ellipsis, prev/next navigation, smooth scroll on page change
- **State persistence**: filter/search/page state saved to `sessionStorage` as `cs-index-state` (JSON). Restored only when navigating back from a case study detail page (checks `document.referrer`); cleared otherwise. Detail pages read `cs-filter-state` to restore breadcrumb link
- **No results**: message shown when filters yield zero matches
- **Success CTA**: "Got a success story?" banner shown on the last page
- **Client-side rendering**: all cards passed to `window.__CS_DATA__` and re-rendered via JS on filter/search/page changes

### Categories

Defined in `caseStudyCategories`:
`'Industry 4.0'`, `'Smart energy'`, `'Smart infrastructure'`, `'Cold chain monitoring'`, `'Smart city'`, `'Warehouse monitoring'`, `'Facility management'`, `'Smart IoT solution'`, `'Smart agriculture'`, `'Telecom'`

## Adding a new case study

1. **Create data file**: `src/data/case-studies/{slug}.ts` exporting a named `CaseStudyData` object (e.g. `export const exampleData: CaseStudyData = { ... }`). Use existing files like `onedata.ts` as a reference.
2. **Create page template**: `src/pages/case-studies/{slug}.astro` following the composition pattern above. Import the data file and conditionally render optional sections.
3. **Add card to index**: add a `CaseStudyCard` entry to the `caseStudyCards` array in `src/data/case-studies/index.ts`. The `slug` must match the page filename.
4. **Add images**: host images on `https://img.thingsboard.io/case-studies/` following the naming convention `{slug}.webp` for backgrounds and `{slug}.svg` for logos. Power/help section images use `{slug}-N.webp`.

## Typography & Design System

For fonts, spacing, breakpoints, color conventions, and dark theme rules, use the **`typography`** skill. It covers all non-doc pages including case studies.
