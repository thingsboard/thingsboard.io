# `/docs/iot-solutions-with-ai/` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the "Build IoT solutions with AI" docs landing page at `/docs/iot-solutions-with-ai/` (× 4 product variants) plus a new top-level **"Build with AI"** sidebar entry.

**Architecture:** Standard ThingsBoard docs three-tier pattern: one shared `_include` + four thin product stubs (CE, PE, PAAS US, PAAS EU). Page renders four outcome H2 sections, each with one or two `Landing/Card` cards carrying inline edition badges and `DocLink`-routed CTAs. A single-link entry is inserted into the sidebar in three places (the `mainSidebarItems` helper, plus the two PAAS arrays). To keep `pnpm lint:linkcheck` green, this plan also creates a one-line placeholder `user-guide/ai-assistant` page (real doc lands separately).

**Tech Stack:** Astro + Starlight, MDX, TypeScript (sidebar config). pnpm. No tests — verification is `pnpm check`, `pnpm lint:eslint`, manual visual check in `pnpm dev`, and `pnpm lint:linkcheck`.

**Spec:** `docs/superpowers/specs/2026-05-26-iot-solutions-with-ai-page-design.md`

---

## File structure (all changes)

| File | Action | Responsibility |
|---|---|---|
| `src/content/_includes/docs/user-guide/ai-assistant.mdx` | **NEW** | Minimal placeholder include for AI Assistant feature page |
| `src/content/docs/docs/user-guide/ai-assistant.mdx` | **NEW** | CE stub of AI Assistant placeholder |
| `src/content/docs/docs/pe/user-guide/ai-assistant.mdx` | **NEW** | PE stub of AI Assistant placeholder |
| `src/content/docs/docs/paas/user-guide/ai-assistant.mdx` | **NEW** | PAAS US stub of AI Assistant placeholder |
| `src/content/docs/docs/paas/eu/user-guide/ai-assistant.mdx` | **NEW** | PAAS EU stub of AI Assistant placeholder |
| `src/content/_includes/docs/iot-solutions-with-ai.mdx` | **NEW** | Shared include — page intro, four H2 sections, six cards |
| `src/content/docs/docs/iot-solutions-with-ai.mdx` | **NEW** | CE stub at `/docs/iot-solutions-with-ai/` |
| `src/content/docs/docs/pe/iot-solutions-with-ai.mdx` | **NEW** | PE stub (canonical) at `/docs/pe/iot-solutions-with-ai/` |
| `src/content/docs/docs/paas/iot-solutions-with-ai.mdx` | **NEW** | PAAS US stub at `/docs/paas/iot-solutions-with-ai/` |
| `src/content/docs/docs/paas/eu/iot-solutions-with-ai.mdx` | **NEW** | PAAS EU stub at `/docs/paas/eu/iot-solutions-with-ai/` |
| `astro.sidebar.ts` | **MOD** | Three insertion points for `Build with AI` single-link entry |

No redirects. No new components. No OG/marketing-allowlist work (docs OG endpoint already covers these routes).

---

## Task 1: AI Assistant placeholder doc

**Why first:** Final task runs `pnpm lint:linkcheck`. The `iot-solutions-with-ai` page links to `user-guide/ai-assistant` (a doc that has not been written yet). Creating a minimal stub now lets the linkcheck step pass. The real AI Assistant doc lands separately and overwrites the stub copy without touching the file paths.

**Files:**
- Create: `src/content/_includes/docs/user-guide/ai-assistant.mdx`
- Create: `src/content/docs/docs/user-guide/ai-assistant.mdx`
- Create: `src/content/docs/docs/pe/user-guide/ai-assistant.mdx`
- Create: `src/content/docs/docs/paas/user-guide/ai-assistant.mdx`
- Create: `src/content/docs/docs/paas/eu/user-guide/ai-assistant.mdx`

- [ ] **Step 1: Write the shared include**

Create `src/content/_includes/docs/user-guide/ai-assistant.mdx` with this exact content:

```mdx
import { Aside } from '@astrojs/starlight/components';

The **AI Assistant** is built into the ThingsBoard UI. It edits **calculated fields** and **alarm rules** in natural language, and generates ready-to-use **dashboards** for any device or asset in one click.

<Aside type="note">
  Full documentation for the AI Assistant is on the way. In the meantime, see the [ThingsBoard CLI](/docs/user-guide/cli/) and [AI Solution Creator](/docs/user-guide/ai-solution-creator/) for related AI-driven workflows.
</Aside>
```

- [ ] **Step 2: Write the CE stub**

Create `src/content/docs/docs/user-guide/ai-assistant.mdx` with this exact content:

```mdx
---
title: AI Assistant
description: "Edit calculated fields, alarm rules, and dashboards in natural language with the in-platform AI Assistant."
---
import PageComponent from '@includes/docs/user-guide/ai-assistant.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.CE}/>
```

- [ ] **Step 3: Write the PE stub**

Create `src/content/docs/docs/pe/user-guide/ai-assistant.mdx` with this exact content:

```mdx
---
title: AI Assistant
description: "Edit calculated fields, alarm rules, and dashboards in natural language with the in-platform AI Assistant."
---
import PageComponent from '@includes/docs/user-guide/ai-assistant.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.PE}/>
```

- [ ] **Step 4: Write the PAAS US stub**

Create `src/content/docs/docs/paas/user-guide/ai-assistant.mdx` with this exact content:

```mdx
---
title: AI Assistant
description: "Edit calculated fields, alarm rules, and dashboards in natural language with the in-platform AI Assistant."
---
import PageComponent from '@includes/docs/user-guide/ai-assistant.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.PAAS}/>
```

- [ ] **Step 5: Write the PAAS EU stub**

Create `src/content/docs/docs/paas/eu/user-guide/ai-assistant.mdx` with this exact content:

```mdx
---
title: AI Assistant
description: "Edit calculated fields, alarm rules, and dashboards in natural language with the in-platform AI Assistant."
---
import PageComponent from '@includes/docs/user-guide/ai-assistant.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.PAAS_EU}/>
```

- [ ] **Step 6: Verify the four routes type-check**

Run: `pnpm check`

Expected: zero errors. (`astro check` indexes content collections; type-check will fail loudly if frontmatter, imports, or `Products` references are wrong.)

- [ ] **Step 7: Commit**

```bash
git add src/content/_includes/docs/user-guide/ai-assistant.mdx \
        src/content/docs/docs/user-guide/ai-assistant.mdx \
        src/content/docs/docs/pe/user-guide/ai-assistant.mdx \
        src/content/docs/docs/paas/user-guide/ai-assistant.mdx \
        src/content/docs/docs/paas/eu/user-guide/ai-assistant.mdx
git commit -m "docs(user-guide): add AI Assistant placeholder page

One-line placeholder so the upcoming /docs/iot-solutions-with-ai/ landing
can link to user-guide/ai-assistant without breaking linkcheck. Real doc
lands separately and overwrites the include body."
```

---

## Task 2: Shared include for `iot-solutions-with-ai`

**File:**
- Create: `src/content/_includes/docs/iot-solutions-with-ai.mdx`

- [ ] **Step 1: Write the full include**

Create `src/content/_includes/docs/iot-solutions-with-ai.mdx` with this exact content:

```mdx
import { CardGrid } from '@astrojs/starlight/components';
import Card from '~/components/Landing/Card.astro';
import DocLink from '@components/DocLink.astro';

export const CE = () => <span style="background:#22c55e;color:white;padding:2px 10px;border-radius:999px;font-size:0.75em;font-weight:600;white-space:nowrap;margin-right:6px">Community</span>;
export const PE = () => <span style="background:#3b82f6;color:white;padding:2px 10px;border-radius:999px;font-size:0.75em;font-weight:600;white-space:nowrap;margin-right:6px">Professional</span>;
export const Cloud = () => <span style="background:#a855f7;color:white;padding:2px 10px;border-radius:999px;font-size:0.75em;font-weight:600;white-space:nowrap;margin-right:6px">Cloud</span>;

ThingsBoard ships with a complete AI stack for IoT — built into the platform, exposed through tooling, and ready to plug into your favourite AI agents. Whether you're scaffolding a new solution from a one-line description, running anomaly detection on live telemetry, or letting Claude or n8n drive ThingsBoard for you, the sections below cover what you can do today.

## Build IoT solutions with AI coding agents

<CardGrid>
  <Card title="ThingsBoard CLI + Claude Code" icon="tabler:terminal-2">
    <PE/><Cloud/>

    Scaffold an entire IoT solution as code with one `tb init`, then let your AI coding agent — **Claude Code**, **Codex**, **Cursor**, or any other — design the entity model, dashboards, alarm rules, and calculated fields for you. **Commit the generated solution to git** like any other codebase, and roll the **same solution** out to your **dev, QA, and production** ThingsBoard instances with `tb push --profile <env>` — no clicking through the UI in each environment. Drive it yourself from the terminal for scripting and CI, or hand the wheel to your agent.

    <DocLink product={props.product} path='user-guide/cli' bold={false}>Learn more about ThingsBoard CLI →</DocLink>
  </Card>
</CardGrid>

## Build IoT solutions with AI inside the platform

<CardGrid>
  <Card title="AI Solution Creator" icon="rocket">
    <Cloud/>

    Describe your use case in plain English — _"Track temperature in cold storage facilities and alert on spoilage"_ — and the in-platform wizard designs entity profiles, alarm rules, calculated fields, roles, and dashboards for you, then deploys them straight to your tenant.

    <DocLink product={props.product} path='user-guide/ai-solution-creator' bold={false}>Learn more about AI Solution Creator →</DocLink>
  </Card>

  <Card title="AI Assistant" icon="star">
    <PE/><Cloud/>

    Edit calculated fields and alarm rules in natural language, and generate ready-to-use dashboards for any device or asset in one click — directly inside the ThingsBoard UI.

    <DocLink product={props.product} path='user-guide/ai-assistant' bold={false}>Learn more about AI Assistant →</DocLink>
  </Card>
</CardGrid>

## Process IoT data with AI models

<CardGrid>
  <Card title="AI Models" icon="setting">
    Plug **OpenAI**, **Google Gemini**, **Anthropic**, **Azure OpenAI**, **Amazon Bedrock**, or any OpenAI-compatible provider into your tenant. Predict future values, detect anomalies, classify device states, or generate natural-language insights from live telemetry — invoked from any rule chain via the **AI request rule node**.

    <DocLink product={props.product} path='user-guide/ai-models' bold={false}>Learn more about AI Models →</DocLink>
  </Card>

  <Card title="Local AI with Ollama" icon="laptop">
    Run inference on-premise with self-hosted Ollama models — keep sensitive telemetry inside your perimeter and avoid per-token costs.

    <DocLink product={props.product} path='user-guide/local-ai-ollama' bold={false}>Learn more about Local AI with Ollama →</DocLink>
  </Card>
</CardGrid>

## Connect ThingsBoard to AI agents & automation

<CardGrid>
  <Card title="MCP Server" icon="puzzle">
    Expose your ThingsBoard tenant as a **Model Context Protocol** server. Talk to your devices, telemetry, alarms, and entity relations from **Claude Desktop**, **Claude Code**, **Cursor**, **VS Code Copilot**, or any MCP-compatible client — no REST calls or dashboard clicks required.

    <DocLink product={props.product} path='user-guide/mcp-server' bold={false}>Learn more about MCP Server →</DocLink>
  </Card>

  <Card title="n8n node" icon="tabler:arrows-exchange">
    Drive ThingsBoard from **n8n** workflows — connect to AWS S3, Snowflake, Salesforce, Jira, AI agents, and hundreds of other services. Build IoT automation that reaches far beyond the rule engine.

    <DocLink product={props.product} path='user-guide/n8n-node' bold={false}>Learn more about n8n node →</DocLink>
  </Card>
</CardGrid>
```

Notes for the implementer:

- **Why exported pill components rather than a shared `Badge.astro` component:** the existing `connectivity-guide.mdx` pattern (recorded in project memory) inlines these in the include itself. Stay consistent — do not factor them out in this PR.
- **`bold={false}` on every DocLink:** matches the apis-and-sdks reference page; the card already styles its prose.
- **Icons:** all icons used (`tabler:terminal-2`, `rocket`, `star`, `setting`, `laptop`, `puzzle`, `tabler:arrows-exchange`) are already in use elsewhere in `src/content/_includes/docs/` — verified to exist in the project's icon set.
- The first `<CardGrid>` has only one card; Starlight's CardGrid stretches a sole card to full width, which is the desired flagship layout for Section 1.

- [ ] **Step 2: Run the type check**

Run: `pnpm check`

Expected: zero errors. If `astro check` complains about an unknown icon, swap `tabler:arrows-exchange` → `random` and `tabler:terminal-2` → `puzzle` (both already in use in this codebase).

- [ ] **Step 3: Run ESLint**

Run: `pnpm lint:eslint`

Expected: zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/_includes/docs/iot-solutions-with-ai.mdx
git commit -m "docs(iot-solutions-with-ai): add shared include with four AI capability sections"
```

---

## Task 3: Four product stubs for `iot-solutions-with-ai`

**Files:**
- Create: `src/content/docs/docs/iot-solutions-with-ai.mdx`
- Create: `src/content/docs/docs/pe/iot-solutions-with-ai.mdx`
- Create: `src/content/docs/docs/paas/iot-solutions-with-ai.mdx`
- Create: `src/content/docs/docs/paas/eu/iot-solutions-with-ai.mdx`

All four stubs share the same frontmatter; only the `Products.*` value differs.

- [ ] **Step 1: Write the CE stub**

Create `src/content/docs/docs/iot-solutions-with-ai.mdx` with this exact content:

```mdx
---
title: Build IoT solutions with AI
description: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
tableOfContents: false
editUrl: false
prev: false
next: false
hero:
  variant: simple
  title: Build IoT solutions with AI
  tagline: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
---
import IotSolutionsWithAi from '@includes/docs/iot-solutions-with-ai.mdx'
import { Products } from '~/models/site.models'

<IotSolutionsWithAi product={Products.CE}/>
```

- [ ] **Step 2: Write the PE stub**

Create `src/content/docs/docs/pe/iot-solutions-with-ai.mdx` with this exact content:

```mdx
---
title: Build IoT solutions with AI
description: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
tableOfContents: false
editUrl: false
prev: false
next: false
hero:
  variant: simple
  title: Build IoT solutions with AI
  tagline: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
---
import IotSolutionsWithAi from '@includes/docs/iot-solutions-with-ai.mdx'
import { Products } from '~/models/site.models'

<IotSolutionsWithAi product={Products.PE}/>
```

- [ ] **Step 3: Write the PAAS US stub**

Create `src/content/docs/docs/paas/iot-solutions-with-ai.mdx` with this exact content:

```mdx
---
title: Build IoT solutions with AI
description: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
tableOfContents: false
editUrl: false
prev: false
next: false
hero:
  variant: simple
  title: Build IoT solutions with AI
  tagline: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
---
import IotSolutionsWithAi from '@includes/docs/iot-solutions-with-ai.mdx'
import { Products } from '~/models/site.models'

<IotSolutionsWithAi product={Products.PAAS}/>
```

- [ ] **Step 4: Write the PAAS EU stub**

Create `src/content/docs/docs/paas/eu/iot-solutions-with-ai.mdx` with this exact content:

```mdx
---
title: Build IoT solutions with AI
description: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
tableOfContents: false
editUrl: false
prev: false
next: false
hero:
  variant: simple
  title: Build IoT solutions with AI
  tagline: "Develop, generate, and operate IoT solutions with AI assistants, AI models, and AI agents in ThingsBoard."
---
import IotSolutionsWithAi from '@includes/docs/iot-solutions-with-ai.mdx'
import { Products } from '~/models/site.models'

<IotSolutionsWithAi product={Products.PAAS_EU}/>
```

- [ ] **Step 5: Type-check**

Run: `pnpm check`

Expected: zero errors.

- [ ] **Step 6: Commit**

```bash
git add src/content/docs/docs/iot-solutions-with-ai.mdx \
        src/content/docs/docs/pe/iot-solutions-with-ai.mdx \
        src/content/docs/docs/paas/iot-solutions-with-ai.mdx \
        src/content/docs/docs/paas/eu/iot-solutions-with-ai.mdx
git commit -m "docs(iot-solutions-with-ai): add CE/PE/PAAS US/PAAS EU product stubs"
```

---

## Task 4: Sidebar — add `Build with AI` entry in three locations

**File:**
- Modify: `astro.sidebar.ts`

`astro.sidebar.ts` has three insertion points that all need the same single-link entry inserted **between the existing `Guides` block and `Recipes` block**:

1. `mainSidebarItems(prefix, ...)` helper (~line 1617) — covers CE (`opensourceSidebar`) **and** PE (`peSidebar`).
2. `paasSidebar` array (~line 1722) — PAAS US.
3. `paasEuSidebar` array (~line 2065) — PAAS EU.

- [ ] **Step 1: Insert into `mainSidebarItems` helper**

Open `astro.sidebar.ts` and locate this block (around line 1617):

```ts
		{
			label: 'Guides',
			collapsed: true,
			translations: { uk: 'Посібники' },
			items: guideItems(`${prefix}/user-guide`, { isPE: prefix.includes('/pe') }),
		},
		{
			label: 'Recipes',
			collapsed: true,
			translations: { uk: 'Рецепти' },
			items: [...recipeItems(`${prefix}/recipes`, extraProcessingItems), ...extraRecipeItems],
		},
```

Insert a new entry **between** the `Guides` and `Recipes` objects, so the block becomes:

```ts
		{
			label: 'Guides',
			collapsed: true,
			translations: { uk: 'Посібники' },
			items: guideItems(`${prefix}/user-guide`, { isPE: prefix.includes('/pe') }),
		},
		{
			label: 'Build with AI',
			link: `${prefix}/iot-solutions-with-ai`,
		},
		{
			label: 'Recipes',
			collapsed: true,
			translations: { uk: 'Рецепти' },
			items: [...recipeItems(`${prefix}/recipes`, extraProcessingItems), ...extraRecipeItems],
		},
```

- [ ] **Step 2: Insert into `paasSidebar`**

Search the file for `export const paasSidebar:` and scroll forward to the `Recipes` block in that array. It looks similar but the entries use string slugs starting with `docs/paas/...`. Find the `Guides` → `Recipes` sequence and insert the new entry between them:

```ts
		{
			label: 'Build with AI',
			link: 'docs/paas/iot-solutions-with-ai',
		},
```

(The PAAS arrays use literal string slugs without backticks because there is no `prefix` variable in scope. Match the surrounding style.)

- [ ] **Step 3: Insert into `paasEuSidebar`**

Find `export const paasEuSidebar:` and repeat. Insert:

```ts
		{
			label: 'Build with AI',
			link: 'docs/paas/eu/iot-solutions-with-ai',
		},
```

between the `Guides` and `Recipes` entries.

- [ ] **Step 4: Type-check**

Run: `pnpm check`

Expected: zero errors. `astro check` validates that the `link:` slugs resolve to real content collection entries, so if any of the four `iot-solutions-with-ai.mdx` stubs are missing, this will catch it.

- [ ] **Step 5: ESLint**

Run: `pnpm lint:eslint`

Expected: zero errors.

- [ ] **Step 6: Commit**

```bash
git add astro.sidebar.ts
git commit -m "sidebar: add Build with AI entry between Guides and Recipes (CE, PE, PAAS US, PAAS EU)"
```

---

## Task 5: Local visual verification

No new test code — Astro / Starlight don't ship a render-test rig in this project. Verification is manual via the dev server.

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`

Wait for the line `Local   http://localhost:4321/` (or similar). Keep the dev server running for the rest of this task.

- [ ] **Step 2: Visit the CE page**

Open: `http://localhost:4321/docs/iot-solutions-with-ai/`

Visual checklist:
- Hero renders with the simple variant: title "Build IoT solutions with AI" + tagline.
- No table of contents in the right rail (page-level `tableOfContents: false`).
- No prev / next footer links.
- Sidebar shows **"Build with AI"** between **"Guides"** and **"Recipes"**, highlighted as the active page.
- All four H2 sections render with the exact headings from the spec.
- Section 1 has one full-width card; sections 2, 3, 4 each have two side-by-side cards.
- CLI card shows two pills (`Professional`, `Cloud`); AI Solution Creator shows one (`Cloud`); AI Assistant shows two (`Professional`, `Cloud`); AI Models / Local AI / MCP Server / n8n node show no pills.
- All six "Learn more …" links are clickable and resolve to `/docs/user-guide/...` (CE-prefixed) targets.

- [ ] **Step 3: Visit the PE page**

Open: `http://localhost:4321/docs/pe/iot-solutions-with-ai/`

Same checklist. **Additionally:** all "Learn more …" DocLinks must now resolve to `/docs/pe/user-guide/...` (PE-prefixed).

- [ ] **Step 4: Visit the PAAS US page**

Open: `http://localhost:4321/docs/paas/iot-solutions-with-ai/`

Same checklist. DocLinks resolve to `/docs/paas/user-guide/...`.

- [ ] **Step 5: Visit the PAAS EU page**

Open: `http://localhost:4321/docs/paas/eu/iot-solutions-with-ai/`

Same checklist. DocLinks resolve to `/docs/paas/eu/user-guide/...`.

- [ ] **Step 6: Stop the dev server**

`Ctrl-C` in the dev-server terminal.

- [ ] **Step 7: No commit**

This task is verification only — there are no files to commit. If a visual issue is found, return to the relevant earlier task (Task 2 for include / card content, Task 3 for stub frontmatter, Task 4 for sidebar) and fix in place.

---

## Task 6: Build verification

Per CLAUDE.md: **Before running any build, ask the user: "Run `pnpm build:fast` to verify, or skip?"**

- [ ] **Step 1: Ask the user**

Send the message verbatim:

> Run `pnpm build:fast` to verify, or skip?

Wait for the user's response. If skipped, jump to Step 3 (linkcheck).

- [ ] **Step 2: Run `pnpm build:fast` (only if user said yes)**

Run: `pnpm build:fast`

Expected: build completes successfully, no MDX/JSX/type errors, no Starlight warnings about missing routes.

If errors appear, fix them in place (most likely an unknown icon name, a typo in a frontmatter field, or a sidebar `link:` pointing to a slug that doesn't match a content file) and re-run.

- [ ] **Step 3: Run linkcheck (no rebuild)**

Run: `pnpm lint:linkcheck:nobuild`

Expected: zero broken links.

The previously feared link — `user-guide/ai-assistant` — resolves because Task 1 created the four `ai-assistant` stubs.

If linkcheck does flag the `user-guide/ai-assistant` route, re-verify Task 1 produced the four product stubs and the include exists.

- [ ] **Step 4: Commit (only if anything was changed by Step 2 fixes)**

```bash
git status
# If there are tracked changes from fixes:
git add <changed files>
git commit -m "docs(iot-solutions-with-ai): fixes from build verification"
```

If nothing changed, skip the commit — verification passes are not committed.

---

## Self-review summary

- **Spec coverage:** every spec section maps to a task. Files, hero, sidebar, badges, DocLinks, CLI's git/dev-QA-prod story, AI Assistant 404 mitigation, OG handling (no action needed), out-of-scope items all addressed.
- **Placeholder scan:** clean — every code block is full content, every step has an exact command, the only "TODO" is the deliberate placeholder doc for AI Assistant.
- **Type / name consistency:** include filename, stub imports, sidebar `link:` slugs, and DocLink `path:` values all align (`iot-solutions-with-ai`, `user-guide/ai-assistant`).
- **Verification gates:** Tasks 2, 3, 4 each end on `pnpm check` + commit; Task 5 visual check across 4 URLs; Task 6 build + linkcheck.
- **Commit cadence:** one focused commit per task, never amending, never skipping hooks.
