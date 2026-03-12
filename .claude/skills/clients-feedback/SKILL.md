---
description: Reference for creating and editing the clients feedback page and feedback data entries. Covers data types, component structure, filtering, and cross-references with case studies.
user_invocable: false
---

# Clients Feedback Page

Data-driven page at `/clients-feedback/` showing client testimonials grouped by industry category.

## File Structure

```
src/data/clients-feedback/
  ├── types.ts        ← FeedbackEntry, FeedbackCategory interfaces
  └── index.ts        ← all feedback data, categories, exports, caseStudyToFeedbackUrl mapping

src/components/Feedback/
  └── FeedbackCard.astro  ← individual testimonial card component

src/pages/clients-feedback/
  └── index.astro     ← feedback index page with filtering

src/pages/industries/
  ├── index.astro              ← 301 redirect → /clients-feedback/
  ├── smart-energy.astro       ← 301 redirect → /clients-feedback/?category=smart-energy
  ├── agriculture.astro        ← ...same pattern for each category
  └── ...
```

## Data Types

```typescript
interface FeedbackEntry {
  author: string;
  position?: string;          // e.g. "CEO", "CTO"
  companyName: string;
  id: string;                 // unique identifier
  link?: string;              // company website URL
  authorImage?: string;       // CDN path to author photo
  companyImage: string;       // CDN path to company logo
  companyImageWidth?: number;
  companyImageHeight?: number;
  tagline: string;            // short company/use-case description
  text: string[];             // multi-paragraph feedback content
  caseStudySlug?: string;     // links to /case-studies/{slug}/
}

interface FeedbackCategory {
  key: string;    // URL slug: 'smart-energy', 'agriculture', etc.
  label: string;  // display name: 'Smart Energy', 'Agriculture', etc.
}
```

## Categories

7 industry categories: `smart-energy`, `agriculture`, `smart-buildings`, `smart-city`, `telecom`, `industry40`, `warehouse-monitoring`.

## Key Exports from `src/data/clients-feedback/index.ts`

- `feedbackCategories` — ordered array of `FeedbackCategory`
- `feedbackEntries` — `Record<string, FeedbackEntry[]>` keyed by category slug
- `allFeedbackEntries` — flattened array of all entries
- `caseStudyToFeedbackUrl` — reverse mapping: case study slug → `/clients-feedback/?category={catKey}`

## FeedbackCard Component

Props: `entry` (FeedbackEntry), `category` (string), `duplicate` (boolean).

Features:
- Author avatar with first-letter fallback when no `authorImage`
- Company logo with optional link
- Tagline + multi-paragraph text body
- "Read more" toggle for long content (600+ chars)
- "Read case study" link button when `caseStudySlug` is set
- CSS classes: `cf-card`, `cf-dupe` (duplicate across categories), `cf-hidden` (filtered out)

## Page Features

- URL query param `?category=` for deep-linking to a specific category
- Client-side filtering with pill toggles (All + 7 categories)
- Duplicate detection: entries in multiple categories get `cf-dupe` class
- "Got a success story to tell?" CTA at bottom
- Supports Astro view transitions via `astro:page-load`

## Cross-Reference with Case Studies

`QuoteSection` (in case study pages) auto-detects the case study slug from the URL and looks up `caseStudyToFeedbackUrl`. Two behaviors:
- **Truncated quotes** (ending with `...`): inline "Read full feedback" link appended right after the dots
- **Complete quotes**: "Clients feedback" pill chip shown below author attribution

## Adding a New Feedback Entry

1. Add the entry to the appropriate category array in `src/data/clients-feedback/index.ts`
2. Upload author photo and company logo to CDN (`https://img.thingsboard.io/customers/`)
3. If linking to a case study, set `caseStudySlug` to match the case study's `pageSlug`
4. The `caseStudyToFeedbackUrl` mapping is auto-generated — no manual update needed

## Adding a New Category

1. Add to `feedbackCategories` array in `index.ts`
2. Add entry array to `feedbackEntries` with the new key
3. Create redirect page in `src/pages/industries/{key}.astro`
