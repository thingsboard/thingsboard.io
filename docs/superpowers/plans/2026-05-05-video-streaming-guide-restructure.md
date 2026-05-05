# Video Streaming Guide Restructure — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the single ~850-line Video Streaming widget guide into three sibling pages (Overview / Configure the widget / Deploy MediaMTX + Caddy) so BYO-URL readers never have to scroll past edge-deployment material.

**Architecture:** Each page follows the existing multi-product pattern: one shared body in `_includes/docs/reference/widgets/video/` and four product stubs (`docs/`, `docs/pe/`, `docs/paas/`, `docs/paas/eu/`) that import it. The single existing include (`video-streaming.mdx`) is renamed to `overview.mdx`, then the deployment sections are cut into `deploy.mdx` and the widget-config sections into `configure.mdx`. **No prose is rewritten** — only intros, cross-links, and one reframed decision section are added.

**Tech Stack:** Astro + Starlight, MDX includes pattern, Astro Content Collections, `<DocLink>` for product-aware links.

**Source spec:** `docs/superpowers/specs/2026-05-05-video-streaming-guide-restructure-design.md`

---

## File Structure

| Path | Status | Responsibility |
|---|---|---|
| `src/content/_includes/docs/reference/widgets/video/overview.mdx` | renamed from `video-streaming.mdx`, then trimmed | Landing-page body: lead, widgets table, decision section, quick-try aside |
| `src/content/_includes/docs/reference/widgets/video/configure.mdx` | new | Widget-configuration body: import bundle, device attribute, dashboard placement, settings reference, widget troubleshooting |
| `src/content/_includes/docs/reference/widgets/video/deploy.mdx` | new | Edge-deployment body: architecture, concepts, prerequisites, HLS, WebRTC, end-to-end verification, more cameras, security, infra troubleshooting |
| `src/content/docs/docs/{,pe/,paas/,paas/eu/}reference/widgets/video/overview.mdx` | renamed × 4 | Product stubs that pass `Products.{CE,PE,PAAS,PAAS_EU}` to the overview include |
| `src/content/docs/docs/{,pe/,paas/,paas/eu/}reference/widgets/video/configure.mdx` | new × 4 | Product stubs for configure |
| `src/content/docs/docs/{,pe/,paas/,paas/eu/}reference/widgets/video/deploy.mdx` | new × 4 | Product stubs for deploy |
| `astro.sidebar.ts` | modified | Replace single leaf with grouped trio in `paasReferenceItems` and `referenceItems` |
| `src/content/_includes/docs/reference/index.mdx` | modified | Repoint reference-index DocLink from `video-streaming` to `overview` |

---

## Task 1: Rename `video-streaming` slug to `overview`

Pure slug rename — no content changes, no new sections, no new pages. After this task the site renders identically; only the URL of the existing page changes. This unblocks Tasks 2–4 by establishing the canonical filename for the landing page.

**Files:**

- Rename: `src/content/_includes/docs/reference/widgets/video/video-streaming.mdx` → `overview.mdx`
- Rename × 4: `src/content/docs/docs/{,pe/,paas/,paas/eu/}reference/widgets/video/video-streaming.mdx` → `overview.mdx`
- Modify × 4: each renamed stub — update `import PageComponent from '@includes/docs/reference/widgets/video/video-streaming.mdx'` → `'@includes/docs/reference/widgets/video/overview.mdx'`
- Modify: `src/content/_includes/docs/reference/index.mdx:92` — DocLink path
- Modify: `astro.sidebar.ts` — slug update in two functions

- [ ] **Step 1: Rename include + 4 stubs**

```bash
git mv src/content/_includes/docs/reference/widgets/video/video-streaming.mdx \
       src/content/_includes/docs/reference/widgets/video/overview.mdx
git mv src/content/docs/docs/reference/widgets/video/video-streaming.mdx \
       src/content/docs/docs/reference/widgets/video/overview.mdx
git mv src/content/docs/docs/pe/reference/widgets/video/video-streaming.mdx \
       src/content/docs/docs/pe/reference/widgets/video/overview.mdx
git mv src/content/docs/docs/paas/reference/widgets/video/video-streaming.mdx \
       src/content/docs/docs/paas/reference/widgets/video/overview.mdx
git mv src/content/docs/docs/paas/eu/reference/widgets/video/video-streaming.mdx \
       src/content/docs/docs/paas/eu/reference/widgets/video/overview.mdx
```

- [ ] **Step 2: Update each stub's `import PageComponent` path**

In all four renamed stubs (`docs/`, `docs/pe/`, `docs/paas/`, `docs/paas/eu/`), replace exactly:

```diff
- import PageComponent from '@includes/docs/reference/widgets/video/video-streaming.mdx'
+ import PageComponent from '@includes/docs/reference/widgets/video/overview.mdx'
```

The frontmatter `title: Video Streaming` stays unchanged. Each stub passes a different `Products.{CE,PE,PAAS,PAAS_EU}` — leave that line as-is.

- [ ] **Step 3: Repoint the reference-index DocLink**

In `src/content/_includes/docs/reference/index.mdx`:

```diff
-    - <DocLink product={props.product} path='reference/widgets/video/video-streaming' bold={false}>Video Streaming</DocLink>
+    - <DocLink product={props.product} path='reference/widgets/video/overview' bold={false}>Video Streaming</DocLink>
```

- [ ] **Step 4: Update sidebar slug in both functions**

In `astro.sidebar.ts`, `paasReferenceItems` (around line 748) — replace exactly:

```diff
-				{ label: 'Video streaming', slug: `${prefix}/widgets/video/video-streaming` },
+				{ label: 'Video streaming', slug: `${prefix}/widgets/video/overview` },
```

Same edit in `referenceItems` (around line 1045).

- [ ] **Step 5: Verify with `pnpm check`**

```bash
pnpm check
```

Expected: passes with zero diagnostics for the video-streaming files. If it complains "The slug specified in the Starlight sidebar config does not exist," a stub or sidebar entry still references the old slug.

- [ ] **Step 6: Ask the user before running the build**

Per project policy: ask "Run `pnpm build:fast` to verify, or skip?" If yes, run and confirm clean exit.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor(docs): rename video-streaming slug to overview"
```

---

## Task 2: Create the Deploy page (move infra content out of overview)

Cut the deployment-related sections out of `overview.mdx` and paste them — verbatim — into a new `deploy.mdx` include. Create four product stubs that import it. Sidebar update is deferred to Task 5 so we only reshape the sidebar once.

**Files:**

- Create: `src/content/_includes/docs/reference/widgets/video/deploy.mdx`
- Create × 4: `src/content/docs/docs/{,pe/,paas/,paas/eu/}reference/widgets/video/deploy.mdx`
- Modify: `src/content/_includes/docs/reference/widgets/video/overview.mdx` — delete the moved sections

**Sections that move into `deploy.mdx`** (verbatim, in this order):

1. `## Architecture` (incl. the topology `<MultiProductImageGallery>`)
2. `## Concepts` (RTSP, HLS, WebRTC, WHEP, MediaMTX, Caddy subsections)
3. `## Common prerequisites`
4. `## Stream with HLS` (incl. all its `###` subsections, code blocks, tables, screenshots)
5. `## Stream with WebRTC` (same)
6. `## End-to-end verification`
7. `## Adding more cameras`
8. `## Security`
9. `## Troubleshooting` — but only these items:
   - "Caddy logs show `acme: error: 400`…" (under "Common to both protocols")
   - All of "HLS-specific"
   - All of "WebRTC-specific"

**Sections that stay in `overview.mdx` after this task:**

- Lead paragraph + "Widgets in this bundle" table + "Both widgets read…" paragraph
- The current `## Choose your path` section (still in its old form — Task 4 reframes it)
- `## Configure the widget in ThingsBoard` and everything inside it (Task 3 will move these out)
- The two widget troubleshooting items: "Widget displays 'Can't reach the stream…'" and "Mixed-content blocking" (Task 3 will move these out as part of configure)

- [ ] **Step 1: Create `deploy.mdx` include with the moved content**

Create `src/content/_includes/docs/reference/widgets/video/deploy.mdx` with this header:

```mdx
import MultiProductImageGallery from '~/components/MultiProductImageGallery.astro';
import DocLink from '@components/DocLink.astro';
import { Products } from '~/models/site.models';
import { Steps, Aside } from '@astrojs/starlight/components';

This page covers the on-prem path: deploying MediaMTX (which republishes your camera's RTSP stream as HLS or WebRTC) and Caddy (which terminates TLS at the edge) on a host on your LAN. If you already have a public, browser-reachable HTTPS stream URL, skip this page and go straight to <DocLink product={props.product} path="reference/widgets/video/configure">Configure the widget</DocLink>.
```

Then paste the nine sections listed above, **verbatim** from the current `overview.mdx`, in the order given. Preserve every code block, table, `<MultiProductImageGallery>`, `<Aside>`, and `<Steps>` exactly as written. The Troubleshooting section in this new file becomes the heading `## Troubleshooting` containing only the items listed above (the two widget items stay in `overview.mdx` for now and move to `configure.mdx` in Task 3).

- [ ] **Step 2: Delete the same sections from `overview.mdx`**

Open `src/content/_includes/docs/reference/widgets/video/overview.mdx` and remove every section that was just copied into `deploy.mdx`. After this step, `overview.mdx` should contain (top to bottom):

1. The four `import` lines (already present, unchanged)
2. The lead paragraph (line ~6 of the current file)
3. `## Widgets in this bundle` heading + table + "Both widgets read…" paragraph
4. `## Choose your path` (entire section, still in its current form)
5. `## Configure the widget in ThingsBoard` and everything under it (intact)
6. A `## Troubleshooting` section containing only:
   - "Widget displays 'Can't reach the stream. Check the URL and try again.'" item (full body, including the CORS and `404` sub-bullets)
   - "Mixed-content blocking." item

The Common-to-both wrapper heading and the HLS-specific / WebRTC-specific subheadings from the original Troubleshooting tree do not appear in `overview.mdx` because all their items have moved to `deploy.mdx`.

- [ ] **Step 3: Create the four product stubs for `deploy.mdx`**

Create `src/content/docs/docs/reference/widgets/video/deploy.mdx`:

```mdx
---
title: Deploy MediaMTX + Caddy
description: Deploy MediaMTX and Caddy on the edge so a ThingsBoard dashboard can play live video from an RTSP IP camera over HLS or WebRTC. Covers the docker-compose stack, Caddy reverse-proxy with Let's Encrypt, and end-to-end verification.
---
import PageComponent from '@includes/docs/reference/widgets/video/deploy.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.CE}/>
```

Create the same file at the three remaining product paths, varying only the `<PageComponent product={Products.…}/>` value:

| Path | Product enum |
|---|---|
| `src/content/docs/docs/pe/reference/widgets/video/deploy.mdx` | `Products.PE` |
| `src/content/docs/docs/paas/reference/widgets/video/deploy.mdx` | `Products.PAAS` |
| `src/content/docs/docs/paas/eu/reference/widgets/video/deploy.mdx` | `Products.PAAS_EU` |

- [ ] **Step 4: Verify with `pnpm check`**

```bash
pnpm check
```

Expected: passes. The new slug `widgets/video/deploy` is not yet in the sidebar (intentional — Task 5 wires it up), so Astro won't complain about a missing slug. If `check` reports duplicate IDs or broken anchors, you've left a section in `overview.mdx` that is also in `deploy.mdx`.

- [ ] **Step 5: Ask the user before running the build**

Ask "Run `pnpm build:fast` to verify, or skip?"

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "docs: extract MediaMTX + Caddy deployment into its own page"
```

---

## Task 3: Create the Configure page (move widget-config content out of overview)

Cut the widget-configuration sections out of `overview.mdx` and paste them verbatim into a new `configure.mdx` include. Same pattern as Task 2.

**Files:**

- Create: `src/content/_includes/docs/reference/widgets/video/configure.mdx`
- Create × 4: `src/content/docs/docs/{,pe/,paas/,paas/eu/}reference/widgets/video/configure.mdx`
- Modify: `src/content/_includes/docs/reference/widgets/video/overview.mdx` — delete the moved sections

**Sections that move into `configure.mdx`** (verbatim, in this order):

1. The intro paragraph of `## Configure the widget in ThingsBoard` (the line "This section applies to both protocols. Whether you brought your own URL or deployed MediaMTX + Caddy, the widget configuration is the same — only the URL string changes.")
2. `### Import the widget bundle` (entire body, incl. screenshot)
3. `### Create a camera device and the stream URL attribute` (entire body, both screenshots)
4. `### Add a widget to a dashboard` (entire body, all screenshots)
5. `### HLS Video Stream — settings reference` (entire body, table + screenshot + paragraph)
6. `### WebRTC Video Stream — settings reference` (entire body, table + screenshot + paragraph)
7. The two widget troubleshooting items currently in `overview.mdx`'s Troubleshooting section: "Widget displays 'Can't reach the stream…'" (incl. CORS + `404` sub-bullets) and "Mixed-content blocking"

**Sections that stay in `overview.mdx` after this task:**

- Lead, widgets table, "Both widgets read…" paragraph
- `## Choose your path` (still in its current form — Task 4 reframes it)

- [ ] **Step 1: Create `configure.mdx` include with the moved content**

Create `src/content/_includes/docs/reference/widgets/video/configure.mdx` with this header:

```mdx
import MultiProductImageGallery from '~/components/MultiProductImageGallery.astro';
import DocLink from '@components/DocLink.astro';
import { Products } from '~/models/site.models';
import { Steps } from '@astrojs/starlight/components';

This page assumes you already have a public, browser-reachable stream URL. If your camera only speaks RTSP on your LAN or your only existing URL is `http://`, deploy <DocLink product={props.product} path="reference/widgets/video/deploy">MediaMTX + Caddy</DocLink> first, then come back here.
```

Then paste the seven items listed above, **verbatim** from `overview.mdx`. Promote `## Configure the widget in ThingsBoard` to the page-top H1 — Starlight already renders the page title from frontmatter, so drop the `##` heading itself and keep only its intro paragraph at the top of the body. The `###` settings-reference and step subsections become `##` (top-level on this page) since there is no longer a containing H2 to nest under. Likewise, the two widget troubleshooting items become a final `## Troubleshooting` section on this page.

- [ ] **Step 2: Delete the same sections from `overview.mdx`**

After this step, `overview.mdx` contains exactly:

1. The four `import` lines
2. Lead paragraph
3. `## Widgets in this bundle` + table + "Both widgets read…" paragraph
4. `## Choose your path` (still in old form — Task 4 will reframe)

Nothing else.

- [ ] **Step 3: Create the four product stubs for `configure.mdx`**

Create `src/content/docs/docs/reference/widgets/video/configure.mdx`:

```mdx
---
title: Configure the Video Streaming widget
description: Import the Video Streaming widget bundle, bind it to a camera device's stream URL attribute, and tune the HLS or WebRTC player on a ThingsBoard dashboard.
---
import PageComponent from '@includes/docs/reference/widgets/video/configure.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.CE}/>
```

Repeat for the other three product paths with `Products.PE`, `Products.PAAS`, `Products.PAAS_EU`.

- [ ] **Step 4: Verify with `pnpm check`**

```bash
pnpm check
```

Expected: passes. After this step the codebase contains three valid pages (overview, configure, deploy) but only `overview` is wired into the sidebar. Visiting `/docs/reference/widgets/video/configure/` and `/docs/reference/widgets/video/deploy/` directly still works.

- [ ] **Step 5: Ask the user before running the build**

Ask "Run `pnpm build:fast` to verify, or skip?"

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "docs: extract Video Streaming widget configuration into its own page"
```

---

## Task 4: Reframe the Overview page

Replace the existing `## Choose your path` section with the new top-line decision (Yes/No paths) and move the existing 3-question check into a `<details>` expansion. Relocate the quick-try / VOD aside (currently inside the HLS section of `deploy.mdx`) into `overview.mdx` so curious readers can play with the widget without reading the deploy page.

The quick-try aside's *content* changes location but **not text** — same `<Aside type="tip" title="Playing recorded video (VOD)">` block.

**Files:**

- Modify: `src/content/_includes/docs/reference/widgets/video/overview.mdx`
- Modify: `src/content/_includes/docs/reference/widgets/video/deploy.mdx` (remove the relocated aside)

- [ ] **Step 1: Cut the quick-try aside out of `deploy.mdx`**

In `deploy.mdx`, find the `<Aside type="tip" title="Playing recorded video (VOD)">…</Aside>` block (it currently sits at the top of `## Stream with HLS`, immediately after the "When to choose HLS" subsection — see lines 102–108 of the original include). Remove the entire `<Aside>` block, including the surrounding blank lines that bracket it. Keep it on your clipboard for Step 2.

- [ ] **Step 2: Replace the `## Choose your path` section in `overview.mdx`**

In `overview.mdx`, replace the entire `## Choose your path` section (from the `## Choose your path` line through the last paragraph beginning "If any are missing —") with this new content:

```mdx
## Choose your path

Do you already have a public, browser-reachable HTTPS stream URL?

- **Yes** — go to <DocLink product={props.product} path="reference/widgets/video/configure">Configure the widget</DocLink> and plug in the URL.
- **No** — work through <DocLink product={props.product} path="reference/widgets/video/deploy">Deploy MediaMTX + Caddy</DocLink> first, then continue with <DocLink product={props.product} path="reference/widgets/video/configure">Configure the widget</DocLink>.

<details>
<summary>How do I know which one I am?</summary>

Answer three questions to classify your situation:

1. Is your stream URL served over **HTTPS** and does it end in `.m3u8` (HLS) or respond to a WHEP `POST` (WebRTC)?
2. Is the URL reachable from a browser **outside your LAN**, not only from inside your network?
3. Does the URL match the widget you want to use — `.m3u8` for the HLS Video Stream widget, WHEP for the WebRTC Video Stream widget?

If the answer to all three is yes, you're ready to <DocLink product={props.product} path="reference/widgets/video/configure">Configure the widget</DocLink>. If any are missing — for instance, your camera only speaks RTSP on your LAN, or your only existing URL is `http://` (browsers block mixed content under HTTPS) — start with <DocLink product={props.product} path="reference/widgets/video/deploy">Deploy MediaMTX + Caddy</DocLink>.

</details>
```

The three numbered questions are preserved verbatim from the original section. The two routing paragraphs are preserved verbatim too, with the in-page anchors swapped for `<DocLink>`s and the lead-in changed to "If the answer to all three is yes" / "If any are missing".

- [ ] **Step 3: Add the quick-try aside under `## Choose your path`**

Paste the cut `<Aside>` block (Step 1) into `overview.mdx` directly after the closing `</details>` of the new Choose-your-path section. The aside's body is unchanged — same Apple test stream URL, same wording.

- [ ] **Step 4: Verify with `pnpm check`**

```bash
pnpm check
```

Expected: passes. If it complains about an unused `Aside` import in `deploy.mdx`, leave the import — `<Aside>` is still used elsewhere on the deploy page (e.g., the "Non-standard HTTPS port" caution). Likewise, `overview.mdx` already imports `Aside` from its header, so no new imports are needed there.

- [ ] **Step 5: Ask the user before running the build**

Ask "Run `pnpm build:fast` to verify, or skip?" If yes, manually open `/docs/reference/widgets/video/overview/` after `pnpm dev` and confirm the Yes/No bullet links resolve to the configure and deploy pages.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "docs: reframe Video Streaming Overview decision and relocate VOD aside"
```

---

## Task 5: Wire up the sidebar group and add cross-links

This is the final wire-up step. Reshape the sidebar from a single leaf into a three-item group (in both sidebar functions), then add the cross-links from the Cross-link map in the spec.

**Files:**

- Modify: `astro.sidebar.ts` — both `paasReferenceItems` (~line 748) and `referenceItems` (~line 1045)
- Modify: `src/content/_includes/docs/reference/widgets/video/deploy.mdx` — add closing cross-link to configure; cross-link from the "Verify on loopback" step to configure
- Modify: `src/content/_includes/docs/reference/widgets/video/configure.mdx` — already has its intro back-link from Task 3; add a back-link in the CORS troubleshooting bullet

- [ ] **Step 1: Reshape both sidebar functions**

In `astro.sidebar.ts`, `paasReferenceItems` — replace exactly:

```diff
-				{ label: 'Video streaming', slug: `${prefix}/widgets/video/overview` },
+				{
+					label: 'Video streaming',
+					collapsed: true,
+					items: [
+						{ label: 'Overview', slug: `${prefix}/widgets/video/overview` },
+						{ label: 'Configure the widget', slug: `${prefix}/widgets/video/configure` },
+						{ label: 'Deploy MediaMTX + Caddy', slug: `${prefix}/widgets/video/deploy` },
+					],
+				},
```

Apply the identical change in `referenceItems` (the second occurrence of the same single-leaf line).

- [ ] **Step 2: Add closing cross-link to `deploy.mdx`**

At the very end of `deploy.mdx` (after the `## Troubleshooting` section), append:

```mdx
---

Once your stream URL is reachable from outside your LAN, head to <DocLink product={props.product} path="reference/widgets/video/configure">Configure the widget</DocLink> to bind it to a dashboard widget.
```

- [ ] **Step 3: Cross-link the loopback-verification step in `deploy.mdx`**

Find the step in `### Verify on loopback` that currently reads:

> See [Configure the widget in ThingsBoard](#configure-the-widget-in-thingsboard) for the full attribute setup.

Replace the inline anchor link with a DocLink:

```diff
-   See [Configure the widget in ThingsBoard](#configure-the-widget-in-thingsboard) for the full attribute setup.
+   See <DocLink product={props.product} path="reference/widgets/video/configure">Configure the widget</DocLink> for the full attribute setup.
```

- [ ] **Step 4: Cross-link the CORS troubleshooting bullet in `configure.mdx`**

In `configure.mdx`'s `## Troubleshooting` section, find the "Widget displays 'Can't reach the stream…'" item. Inside its body it has a sub-bullet beginning "A failed CORS preflight or `Access-Control-Allow-Origin` mismatch means MediaMTX's…". Append a sentence at the end of that sub-bullet:

```diff
- A failed CORS preflight or `Access-Control-Allow-Origin` mismatch means MediaMTX's `MTX_HLSALLOWORIGINS` or `MTX_WEBRTCALLOWORIGINS` is not making it through; check that no upstream proxy is stripping the header.
+ A failed CORS preflight or `Access-Control-Allow-Origin` mismatch means MediaMTX's `MTX_HLSALLOWORIGINS` or `MTX_WEBRTCALLOWORIGINS` is not making it through; check that no upstream proxy is stripping the header. If you deployed MediaMTX yourself, see the matching item under <DocLink product={props.product} path="reference/widgets/video/deploy">Deploy MediaMTX + Caddy</DocLink> → Troubleshooting.
```

- [ ] **Step 5: Verify with `pnpm check`**

```bash
pnpm check
```

Expected: passes. If it complains "The slug specified in the Starlight sidebar config does not exist," double-check that the configure and deploy stubs from Tasks 2 and 3 exist for all four products.

- [ ] **Step 6: Ask the user before running the build**

Ask "Run `pnpm build:fast` to verify, or skip?"

If they say yes, run it. After it passes, manually:

1. Open `/docs/reference/widgets/video/overview/` and confirm the Yes/No DocLinks resolve.
2. Open `/docs/reference/widgets/video/configure/` and click the intro back-link to confirm it returns to the deploy page.
3. Open `/docs/reference/widgets/video/deploy/` and click the closing cross-link to confirm it lands on configure.
4. Repeat at least one of the above on a PE URL (e.g., `/docs/pe/reference/widgets/video/overview/`) to confirm the product-aware link resolution works.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "docs: group video streaming pages in the sidebar and wire cross-links"
```

---

## Self-review

**Spec coverage:**

- Page topology (Overview / Configure / Deploy with the three target slugs) — Tasks 1, 2, 3
- Content split per page — Tasks 2, 3 (move sections), Task 4 (overview polish)
- Cross-link map (six entries in the spec) — Tasks 4 (overview Yes/No), 3 (configure intro back-link is in the include header from Step 1), 5 (the rest)
- Sidebar group form in both functions — Task 5
- Reference index DocLink repointed to overview — Task 1
- "No prose rewriting" constraint — explicitly enforced; the only new prose is in the Overview decision section, the deploy/configure intro paragraphs, and the closing cross-link of deploy
- No redirects (page is unmerged) — confirmed in spec, no task needed

**Placeholder scan:** no TBDs, no "implement later", every code block is concrete.

**Type / slug consistency:**

- `widgets/video/overview` used identically across Tasks 1, 4, 5
- `widgets/video/configure` used identically across Tasks 2 (header), 3 (stubs), 4 (overview link), 5 (cross-links)
- `widgets/video/deploy` used identically across Tasks 2 (stubs), 3 (header back-link), 4 (overview link), 5 (cross-links)
- `Products.{CE,PE,PAAS,PAAS_EU}` matches `src/models/site.models.ts` enum members

No issues found.
