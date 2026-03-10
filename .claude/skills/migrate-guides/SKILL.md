# Migrate Guides

Migrate user-guide pages from the old ThingsBoard Jekyll site to the new Astro + Starlight site.

---

## Step 0: Gather information

Before doing anything else:

1. **Derive paths** from the source argument provided by the user:
   - Old includes root: `{OLD_WEBSITE_PATH}/_includes/docs/user-guide/`
   - Old images root:   `{OLD_WEBSITE_PATH}/images/`

   Example: if the user provides `/home/ashvayka/git/website/_includes/docs/user-guide/calculated-fields`,
   then `OLD_WEBSITE_PATH = /home/ashvayka/git/website` and images live at `/home/ashvayka/git/website/images/`.

2. **Ask clarifying questions** about scope and intent — do not assume. Examples:
   - Is this a single page or a group of related pages?
   - Should PE-only features be hidden or marked differently from CE features?
   - Is there anything in the old page that is outdated and should be omitted?
   - Should the page link to any related pages that don't exist yet?

Only proceed once the answers are clear.

---

## Step 1: Read the source

Old site user-guide includes live at:
```
{OLD_WEBSITE_PATH}/_includes/docs/user-guide/{topic}.md
```

Read the file. Identify:
- What sections it covers
- What is still accurate vs. outdated
- Whether it should be one page or split into multiple focused pages
- All image references (Jekyll `{% include images.html image="..." %}` tags, `<img src="...">`, or markdown `![](...)`)
- Whether diagrams would help explain flows, hierarchies, or state machines

---

## Step 2: Handle images

### 2a. Find referenced images

Scan the source file for image references. Common patterns in the old Jekyll site:

```liquid
{% include images.html image="images/docs/user-guide/topic/screenshot.png" %}
{% include images.html image="images/docs/user-guide/topic/screenshot.png" alt="..." %}
<img src="/images/docs/user-guide/topic/screenshot.png" />
![alt text](/images/docs/user-guide/topic/screenshot.png)
```

For each referenced image, check whether it exists at `{OLD_WEBSITE_PATH}/images/...`.

### 2b. Copy images to the new site

Images must live under `src/assets/images/` to be used by the `ImageGallery` component.
Preserve the subdirectory structure under `images/docs/`:

```bash
# Example — copy all images for the topic
cp -r {OLD_WEBSITE_PATH}/images/docs/user-guide/{topic}/ \
      src/assets/images/docs/user-guide/{topic}/
```

Verify the files were copied before referencing them.

### 2c. Use images in the include file

**For a group of screenshots** — use `ImageGallery`:

```mdx
import ImageGallery from '@components/ImageGallery.astro';

<ImageGallery images={[
  {
    src: '/src/assets/images/docs/user-guide/{topic}/screenshot1.png',
    alt: 'Descriptive alt text',
    caption: 'Optional caption shown in lightbox',
  },
  {
    src: '/src/assets/images/docs/user-guide/{topic}/screenshot2.png',
    alt: 'Descriptive alt text',
  },
]} />
```

**For PE/CE conditional images** — wrap in a JSX expression using an HTML `<table>` if needed,
or a fragment:

```mdx
{props.product === Products.PE && (
  <ImageGallery images={[
    { src: '/src/assets/images/docs/user-guide/{topic}/pe-only.png', alt: 'PE feature' },
  ]} />
)}
```

**Rules:**
- `src` must be an absolute path starting with `/src/assets/`
- Always provide meaningful `alt` text
- Use `caption` for context that helps the reader understand what they are looking at
- If an image no longer reflects the current UI, omit it and note it as a TODO comment

---

## Step 3: Plan the structure

User-guide pages follow this structure:

1. **Intro** — key concept + immediate concrete example (1–3 sentences, no "Why use X?" sections)
2. **Main sections** — use `<Steps>` for UI procedures, tables for structured data (settings, field descriptions, option comparisons)
3. **Diagrams** — ASCII pseudo-graphics for non-obvious concepts (see Step 4)
4. **Images** — screenshots placed near the UI step or section they illustrate
5. **Cross-links** — link to related pages using `<DocLink>`; use `path='TODO'` for pages that don't exist yet

---

## Step 4: Add ASCII pseudo-graphics diagrams

Add a `plaintext` code block diagram wherever a visual would make the concept significantly
clearer than text alone. Do **not** add diagrams for things that are already obvious from the
prose or a table.

**When diagrams are most valuable:**

| Situation | Example |
|-----------|---------|
| Entity hierarchies | Parent asset → child devices with relation type labels |
| Data flow / pipeline | Input sources → arguments → calculation → output |
| Directional operations | "Up to parent" vs "Down to child" propagation |
| State machines | OUTSIDE ↔ INSIDE with ENTERED / LEFT transitions |
| Sliding time windows | Data points on a timeline with a moving window bracket |
| Timestamp alignment | Two telemetry streams merged onto a unified timeline |
| Interval bucketing | Raw data points grouped into hourly/daily buckets |
| Chaining | CF A output → triggers CF B → triggers CF C, with loop guard |

**Style rules:**

- Use `plaintext` as the code block language (renders in monospace, no syntax highlight noise)
- Keep width ≤ 70 characters so it doesn't overflow on narrow screens
- Use `─`, `│`, `┌`, `┐`, `└`, `┘`, `├`, `┤`, `▶`, `▼`, `◀`, `●`, `╔`, `╗`, `╚`, `╝`, `║`, `═` for box-drawing
- Label every box and arrow — never leave a shape unexplained
- Add a short result comment below the diagram if it shows a computation

**Example — entity hierarchy:**

```plaintext
  ┌────────────────────────────────────────────┐
  │  Building A  (CF applied here)             │
  │  avgTemperature: 22.7  ◀── computed        │
  └──────────────────┬─────────────────────────┘
                     │ Manages — Down to child
         ┌───────────┼───────────┐
         ▼           ▼           ▼
  ┌───────────┐ ┌───────────┐ ┌───────────┐
  │ Sensor 1  │ │ Sensor 2  │ │ Sensor 3  │
  │ temp: 21  │ │ temp: 23  │ │ temp: 24  │
  └───────────┘ └───────────┘ └───────────┘
```

**Example — sliding time window:**

```plaintext
  time ──────────────────────────────────────────▶

  data   72.3    72.9    73.6    NaN    74.1
          ●───────●───────●───────●───────●

  w1    ╔══════════════════════╗
        ║  72.3   72.9   73.6  ║  .mean() → 72.93
        ╚══════════════════════╝

  w2             ╔══════════════════════╗
                 ║  72.9   73.6   NaN   ║  .mean() → 73.25
                 ╚══════════════════════╝
```

---

## Content to skip

The following sections must **not** be migrated — omit them entirely:

- `## Next Steps` / `{% include templates/edge/install/next-steps.md %}` — next steps are handled at the site level, not per-page.

---

## Version placeholders

Replace Jekyll version placeholders as follows when encountered in source files:

- `{{ site.release.edge_full_ver }}` → `${EDGE_VER}` (inside template literals); add `import { EDGE_VER } from '~/data/versions';`
- `{{ site.release.pe_edge_full_ver }}` → `${EDGE_PE_VER}` (inside template literals); add `import { EDGE_PE_VER } from '~/data/versions';`
- `{{ site.release.ce_full_ver }}` → `${CE_FULL_VER}` (inside template literals); add `import { CE_FULL_VER } from '~/data/versions';`
- `{{ site.release.pe_full_ver }}` → `${PE_FULL_VER}` (inside template literals); add `import { PE_FULL_VER } from '~/data/versions';`

---

## Step 5: Create the include file

Path: `src/content/_includes/docs/user-guide/{page}.mdx`

Required imports:
```mdx
import DocLink from '@components/DocLink.astro';
import { Steps, Aside } from '@astrojs/starlight/components';
```

Add `ImageGallery` import only if the page uses images:
```mdx
import ImageGallery from '@components/ImageGallery.astro';
```

Follow all rules in `/edit-doc` (DocLink, Aside types, Steps, ENV variable names, no bare markdown links).

Place diagrams and images close to the section they explain — diagrams before the prose that
references them, screenshots after the step that produces the UI shown.

---

## Step 6: Create CE and PE stubs

```
src/content/docs/docs/user-guide/{page}.mdx        ← Products.CE
src/content/docs/docs/pe/user-guide/{page}.mdx     ← Products.PE
```

Stub template:
```mdx
---
title: Page Title
description: One-sentence description.
---
import PageComponent from '@includes/docs/user-guide/{page}.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.CE}/>
```

If the description contains a colon, wrap in double quotes.

---

## Step 7: Update the sidebar

User-guide items go in `guideItems(prefix)` in `astro.sidebar.ts`.

Use the Python replacement approach from `/edit-doc` if the Edit tool fails.

---

## Step 8: Review and surface open questions

After writing the page, re-read it as if you are a new ThingsBoard user encountering this topic for the first time.

Output a list of questions that a reader might have after reading the page, but that are **not answered** in it. Format as:

```
## Open questions (not covered in this page)

- How does X interact with Y when Z happens?
- What are the limits or quotas for this feature?
- Is this feature available on ThingsBoard Cloud?
- What happens if the user does A before B?
- ...
```

Present this list to the user so they can decide which questions to address in follow-up edits or additional pages.
