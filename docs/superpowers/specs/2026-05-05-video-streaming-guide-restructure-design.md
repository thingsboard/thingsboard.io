# Video Streaming Guide Restructure — Design

**Date:** 2026-05-05
**Branch:** `feat/vs`
**Author:** dlandiak

## Problem

The Video Streaming widget guide is a single ~850-line page. It opens with overview, architecture diagram, and a concepts primer (RTSP, HLS, WebRTC, WHEP, MediaMTX, Caddy) before reaching a "Choose your path" gate that tells the reader they may not need any of the infrastructure material at all. Readers who already have a public stream URL — the cloud / SaaS-camera audience — are forced to scroll past ~60 lines of irrelevant on-prem content before the gate, and the in-browser TOC continues to advertise infrastructure sections they will never use.

CEO has asked for a restructure that lets each reader profile reach only what applies to them.

## Goal

Split the single guide into three sibling pages so the sidebar TOC itself communicates "you have two paths" and so the BYO-URL reader never has to scroll through edge-deployment material.

**Out of scope.** Rewriting prose, code blocks, configuration tables, or screenshots. The restructure preserves all existing content verbatim. New writing is limited to: a reframed decision section on the landing page, brief intros and back-links at page seams, and `DocLink` cross-references.

## Page topology

Three sibling pages under `reference/widgets/video/`, grouped in the sidebar:

| URL slug | Sidebar label | Page title | Role |
|---|---|---|---|
| `widgets/video/overview` | Overview | Video Streaming | Landing — what the bundle is, two-widget comparison, decision tree |
| `widgets/video/configure` | Configure the widget | Configure the Video Streaming widget | BYO-URL terminus — bundle import, device attribute, dashboard, settings reference |
| `widgets/video/deploy` | Deploy MediaMTX + Caddy | Deploy MediaMTX + Caddy | Edge deployment terminus — prereqs, concepts, HLS, WebRTC, security |

Sidebar group (replaces the current flat `Video streaming` leaf):

```
Video streaming        ← collapsed: true, matching sibling groups (Tables, Maps, etc.)
├── Overview
├── Configure the widget
└── Deploy MediaMTX + Caddy
```

The branch is unmerged; the `widgets/video/video-streaming` slug has never appeared on `main`. **No redirects are required.**

## Content split

### Overview (`overview.mdx`, ~80 lines)

Source paragraphs (verbatim, lifted from the current single guide):

- Lead paragraph ("The Video Streaming widget bundle plays live video…")
- "Widgets in this bundle" comparison table (HLS / WebRTC / latency / when-to-use)
- The "Both widgets read the stream URL from a configured data key…" paragraph (the one noting ThingsBoard never sees video bytes — kept here because it frames the topology for security-conscious readers)
- The "Quick-try / VOD" aside currently buried in the HLS section (Apple test stream) — promoted to the landing so a curious reader can play with the widget in 60 seconds without any of the infra

New writing on this page (the only substantive new prose in the restructure):

- A reframed "Choose your path" section using the decision question: *"Do you already have a public, browser-reachable HTTPS stream URL?"*
  - **Yes →** link to `Configure the widget`
  - **No →** link to `Deploy MediaMTX + Caddy`, then `Configure the widget`

The current 3-question check is preserved verbatim under the decision question as a "How do I know?" expansion.

### Configure the widget (`configure.mdx`, ~250 lines)

Verbatim sections lifted from the current guide:

- "Configure the widget in ThingsBoard" intro paragraph
- "Import the widget bundle" (with screenshot)
- "Create a camera device and the stream URL attribute" (with screenshots)
- "Add a widget to a dashboard" (with screenshots)
- "HLS Video Stream — settings reference" (table + paragraph + screenshot)
- "WebRTC Video Stream — settings reference" (table + paragraph + screenshot)

Verbatim items lifted from the current Troubleshooting section into a new page-local "Troubleshooting" section:

- "Widget displays 'Can't reach the stream…'" (its CORS preflight sub-bullet moves with it; the `404` sub-bullet also moves since it manifests in the widget)
- "Mixed-content blocking"

New writing on this page:

- A one-paragraph intro acknowledging both entry paths ("Whether you brought your own URL or just finished the deployment guide…") with a back-link to `Deploy MediaMTX + Caddy` for readers who realize mid-page that they need infrastructure.

### Deploy MediaMTX + Caddy (`deploy.mdx`, ~550 lines)

Everything else, in current order, verbatim:

- Architecture (topology diagram)
- Concepts (RTSP, HLS, WebRTC, WHEP, MediaMTX, Caddy)
- Common prerequisites
- Stream with HLS (when-to-choose, docker-compose, Caddyfile, verify locally, publish, codec notes)
- Stream with WebRTC (when-to-choose, docker-compose, Caddyfile, verify on loopback, publish, codec notes)
- End-to-end verification
- Adding more cameras
- Security
- Infra-only troubleshooting:
  - Caddy ACME failures
  - `502 Bad Gateway`
  - WebRTC ICE/UDP problems
  - Codec mismatches (camera HEVC, mute button disabled, video stays black)

New writing on this page:

- One-paragraph intro: when this page applies, what it covers
- Closing line that cross-links to `Configure the widget`

## Cross-link map

| From | Anchor / context | To |
|---|---|---|
| Overview decision | Yes branch | Configure |
| Overview decision | No branch | Deploy |
| Configure intro | "If you don't have a URL yet…" | Deploy |
| Configure CORS troubleshooting | "If MediaMTX strips the header…" | Deploy → infra troubleshooting |
| Deploy → end of HLS publish | "Now plug it into the widget" | Configure |
| Deploy → end of WebRTC publish | Same | Configure |
| Deploy → verify-on-loopback step | "Configure the widget on the same laptop" | Configure |
| Deploy → closing | "Now configure the widget" | Configure |
| Reference index (`_includes/docs/reference/index.mdx`) | The widgets list item | Overview (was: video-streaming) |

All cross-links use `<DocLink product={props.product} path="…">` so they remain product-aware (CE / PE / PaaS / PaaS-EU).

## Implementation mechanics

### Includes

Shared content bodies used by every product stub.

| Action | Path |
|---|---|
| `git mv` | `_includes/docs/reference/widgets/video/video-streaming.mdx` → `overview.mdx` |
| Edit | Strip `overview.mdx` to landing-only content (lead + widgets table + bytes paragraph + decision + quick-try aside). All other sections move out — they are not re-typed. |
| Create | `_includes/docs/reference/widgets/video/configure.mdx` — sections lifted out of the original include verbatim |
| Create | `_includes/docs/reference/widgets/video/deploy.mdx` — sections lifted out of the original include verbatim |

### Stubs

12 stubs total: 4 products × 3 pages. Products: `docs/`, `docs/pe/`, `docs/paas/`, `docs/paas/eu/`.

| Action | Pattern |
|---|---|
| `git mv` | `{product}/reference/widgets/video/video-streaming.mdx` → `overview.mdx` (4 files) |
| Edit | Each renamed stub: update `title:` to `Video Streaming` and the `import PageComponent` to point at `overview.mdx` |
| Create | `{product}/reference/widgets/video/configure.mdx` (4 files) — title `Configure the Video Streaming widget`, imports `configure.mdx` |
| Create | `{product}/reference/widgets/video/deploy.mdx` (4 files) — title `Deploy MediaMTX + Caddy`, imports `deploy.mdx` |

### Sidebar (`astro.sidebar.ts`)

Two functions: `paasReferenceItems` (line ~748) and `referenceItems` (line ~1045). Both currently contain a flat leaf. Both replaced with the same group structure:

```ts
{
  label: 'Video streaming',
  collapsed: true,
  items: [
    { label: 'Overview', slug: `${prefix}/widgets/video/overview` },
    { label: 'Configure the widget', slug: `${prefix}/widgets/video/configure` },
    { label: 'Deploy MediaMTX + Caddy', slug: `${prefix}/widgets/video/deploy` },
  ],
},
```

### Reference index DocLink

`src/content/_includes/docs/reference/index.mdx` line 92:

```diff
- <DocLink product={props.product} path='reference/widgets/video/video-streaming' …>Video Streaming</DocLink>
+ <DocLink product={props.product} path='reference/widgets/video/overview' …>Video Streaming</DocLink>
```

## Verification

- `pnpm check` (Astro / TypeScript) — must pass; broken slugs surface as build errors (the user has already hit one this session).
- `pnpm build:fast` — confirms all 12 stubs render across products.
- Manual spot check in dev: walk the cross-link map above and confirm each link resolves to the correct page on at least CE and PE variants.
- `pnpm lint:slugcheck` — confirms slugs match across translations (currently EN-only, but the check still runs).

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Cross-page links rot if a section heading is renamed later | Use `<DocLink>` with `path=` for page-level links; use plain anchors only for in-page hops |
| In-page anchors that worked when content lived on a single page (e.g., `#configure-the-widget-in-thingsboard`) silently 404 | Replace each with a `<DocLink>` to the new page |
| The "Choose your path" decision question on the new Overview reads as marketing fluff if it duplicates the widgets table | Keep the table and the decision side-by-side, with the decision framed as a single yes/no question rather than a re-explanation |
| Future translators only see the split; they have to re-translate strings if any prose was rewritten | None needed — the constraint that no prose is rewritten means existing translation work (when added) covers the moved content as-is |
