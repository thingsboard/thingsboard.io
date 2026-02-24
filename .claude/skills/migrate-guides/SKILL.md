# Migrate Guides

Migrate user-guide pages from the old ThingsBoard Jekyll site to the new Astro + Starlight site.

---

## Step 0: Gather information

Before doing anything else:

1. **Ask the user** for the path to the old website repository if not already provided:
   > "What is the path to the old website repository on your system? (e.g. `/path/to/website`)"

2. **Ask clarifying questions** about scope and intent — do not assume. Examples:
   - Is this a single page or a group of related pages?
   - Should PE-only features be hidden or marked differently from CE features?
   - Are there screenshots or diagrams in the old page that should be reproduced?
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
- Whether a diagram would help explain a flow or hierarchy

---

## Step 2: Plan the structure

User-guide pages follow this structure:

1. **Intro** — key concept + immediate concrete example (1–3 sentences, no "Why use X?" sections)
2. **Main sections** — use `<Steps>` for UI procedures, tables for structured data (settings, field descriptions, option comparisons)
3. **Diagrams** — add ASCII or Mermaid diagrams for non-obvious flows, state machines, or entity hierarchies
4. **Cross-links** — link to related pages using `<DocLink>`; use `path='TODO'` for pages that don't exist yet

---

## Step 3: Create the include file

Path: `src/content/_includes/docs/user-guide/{page}.mdx`

Required imports:
```mdx
import DocLink from '@components/DocLink.astro';
import { Steps, Aside } from '@astrojs/starlight/components';
```

Follow all rules in `/edit-doc` (DocLink, Aside types, Steps, ENV variable names, no bare markdown links).

---

## Step 4: Create CE and PE stubs

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

## Step 5: Update the sidebar

User-guide items go in `guideItems(prefix)` in `astro.sidebar.ts`.

Use the Python replacement approach from `/edit-doc` if the Edit tool fails.

---

## Step 6: Review and surface open questions

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
