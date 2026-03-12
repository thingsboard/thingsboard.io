---
name: tbmq-migrate-guides
description: Migrates TBMQ documentation pages from the old Jekyll site (thingsboard.github.io) to the new Astro + Starlight site (thingsboard.io). Use when the user asks to migrate, rewrite, or create TBMQ-related documentation pages.
---

# TBMQ migrate guides

You are a technical writer migrating TBMQ documentation from a Jekyll site to Astro + Starlight. Your goal is clean, accurate MDX that follows the project conventions exactly.

## Working directories

| Role                      | Path                                                                    |
|---------------------------|-------------------------------------------------------------------------|
| Old site root             | `/home/dlandiak/projects/thingsboard.github.io`                        |
| Old TBMQ includes         | `{OLD}/_includes/docs/mqtt-broker/`                                    |
| Old TBMQ templates        | `{OLD}/_includes/templates/mqtt-broker/`                               |
| Old TBMQ CE page wrappers | `{OLD}/docs/mqtt-broker/`                                              |
| Old TBMQ PE page wrappers | `{OLD}/docs/pe/mqtt-broker/`                                           |
| Old images (CE)           | `{OLD}/images/mqtt-broker/`                                            |
| Old images (PE-only)      | `{OLD}/images/pe/mqtt-broker/`                                         |
| New site root             | `/home/dlandiak/projects/thingsboard.io`                               |
| New includes              | `src/content/_includes/docs/mqtt-broker/`                              |
| New CE stubs              | `src/content/docs/docs/mqtt-broker/`                                   |
| New PE stubs              | `src/content/docs/docs/mqtt-broker/pe/`                                |
| New images                | `src/assets/images/docs/mqtt-broker/`                                  |
| New PE images             | `src/assets/images/docs/mqtt-broker/pe/`                               |

---

## Step 0: Gather information

Before doing anything else:

1. **Derive the source path** from the argument provided by the user.

2. **Resolve Jekyll includes** — old TBMQ docs use heavy `{% include %}` chaining. Follow the full chain before writing anything. Common patterns:
   - `{% include docs/mqtt-broker/user-guide/ui/authentication-provider-control.md %}` → authentication config block
   - `{% include templates/mqtt-broker/install/linux-macos.md %}` → install script steps
   - `{% include templates/mqtt-broker/install/windows.md %}` → Windows install steps
   - `{% include templates/mqtt-broker/security/... %}` → TLS/SSL setup steps
   - `{% include templates/mqtt-broker/since.md %}` → version badge — **omit** in new docs

3. **Check for PE-only content** — old docs use `{% if docsPrefix == "pe/" %}`. In the new site, use `props.product === Products.TBMQ_PE` in JSX expressions.

4. **Ask clarifying questions** before writing. Examples:
   - Is any content outdated or superseded?
   - Should any sections be split into separate pages?
   - Are there related pages that should be cross-linked?

---

## Step 1: Read the source

Read the main include file and all files it references using `Glob` and `Read`. Follow the include chain completely.

Key Jekyll patterns to recognize:

```liquid
{% include docs/mqtt-broker/some-snippet.md %}
{% include templates/mqtt-broker/install/linux-macos.md %}
{% if docsPrefix == "pe/" %}...PE content...{% endif %}
{% if docsPrefix != "pe/" %}...CE content...{% endif %}
{% assign sinceVersion = "2.3.0" %}{% include templates/mqtt-broker/since.md %}
![image](/images/mqtt-broker/topic/screenshot.png)
![image](/images/pe/mqtt-broker/topic/screenshot.png)
```

Special includes — how to handle:
- **`since.md`**: version badges. **Omit** — content always reflects the current version.
- **`pe-tbmq-feature-banner.md`**: PE-feature notice. Replace with `<Banner variant="pe" />` from `~/components/Banner.astro`.
- **`pe-tbmq-explore-banner.md`**: upgrade CTA. **Omit** in new docs.

Identify:
- All content sections and whether each is CE-only, PE-only, or shared
- All image references (CE: `images/mqtt-broker/...`, PE: `images/pe/mqtt-broker/...`)

---

## Step 2: Handle images

### 2a. Find referenced images

Scan for:
```
![image](/images/mqtt-broker/{topic}/screenshot.png)
![image](/images/pe/mqtt-broker/{topic}/screenshot.png)
```

Old `*-preview.png` files are thumbnails — **do not copy them**. Only copy full-size images (no `-preview` suffix).

### 2b. Copy images to the new site

```bash
# CE images
cp /home/dlandiak/projects/thingsboard.github.io/images/mqtt-broker/{topic}/ \
   src/assets/images/docs/mqtt-broker/{topic}/

# PE-only images
cp /home/dlandiak/projects/thingsboard.github.io/images/pe/mqtt-broker/{topic}/ \
   src/assets/images/docs/mqtt-broker/pe/{topic}/
```

Verify files exist before referencing them.

### 2c. Use images in the include file

**Group of screenshots** — use `ImageGallery`:

```mdx
import ImageGallery from '~/components/ImageGallery.astro';

<ImageGallery images={[
  {
    src: '/src/assets/images/docs/mqtt-broker/{topic}/screenshot.png',
    alt: 'Descriptive alt text',
    caption: 'Optional caption shown in lightbox',
  },
]} />
```

**PE-conditional images** — wrap in JSX:

```mdx
{props.product === Products.TBMQ_PE && (
  <ImageGallery images={[
    { src: '/src/assets/images/docs/mqtt-broker/pe/{topic}/pe-feature.png', alt: 'PE feature' },
  ]} />
)}
```

Rules:
- `src` must be an absolute path starting with `/src/assets/`
- Always provide meaningful `alt` text
- Do not reference images that no longer reflect the current TBMQ UI — add a `{/* TODO: update screenshot */}` comment instead

---

## Step 3: Plan the structure

TBMQ guide pages follow this structure:

1. **Intro** — what this feature is and what problem it solves (1–3 sentences, no "Overview" heading)
2. **Main sections** — use `<Steps>` for UI procedures; tables for structured data (fields, options, config parameters)
3. **Images** — screenshots placed after the step they illustrate
4. **Cross-links** — use `<DocLink>` for internal links (see rules below)

**Security pages**: overview → configure provider (Steps) → credential format → examples

**Installation pages**: intro → prerequisites → install script → configure → verify → upgrade note

---

## Step 4: Add diagrams (when appropriate)

Add a diagram when the topic involves a non-obvious flow. Use `plaintext` fenced code blocks (width ≤ 70 chars).

Valuable topics for TBMQ diagrams:

| Topic | Diagram type |
|---|---|
| Authentication | Sequence: CONNECT → credential lookup → CONNACK |
| Subscription matching | Trie traversal with wildcards |
| Client types | DEVICE vs APPLICATION routing paths |
| QoS levels | Message flow with ACK steps |
| Cluster | Node topology |
| Kafka integration | Publish → topic → consumer group flow |

Style: use `─`, `│`, `┌`, `┐`, `└`, `┘`, `├`, `┤`, `▶`, `●`, `╔`, `╗`, `╚`, `╝`, `║`, `═`. Label every box and arrow. Keep nodes perfectly aligned.

---

## Step 5: Create the include file

Path: `src/content/_includes/docs/mqtt-broker/{path}.mdx`

### Imports

Only import what you actually use:

```mdx
import { Steps, Aside } from '@astrojs/starlight/components';
import { Code } from '@astrojs/starlight/components';
import Tabs from '@components/Tabs.astro';
import TabItem from '@components/TabItem.astro';
import DocLink from '@components/DocLink.astro';
import ImageGallery from '~/components/ImageGallery.astro';
import ConditionalHeading from '~/components/ConditionalHeading.astro';
import { Products } from '~/models/site.models';
import { TBMQ_VER, TBMQ_PE_VER, TBMQ_BRANCH } from '~/data/versions';
```

Notes:
- `Tabs` / `TabItem` come from **`@components/`**, not from `@astrojs/starlight/components`
- `Code` is needed when interpolating version strings into code blocks
- `ConditionalHeading` is needed when you have headings inside JSX conditional blocks
- `TBMQ_VER` — Docker image tag for CE (e.g. `2.2.0`)
- `TBMQ_PE_VER` — Docker image tag for PE (e.g. `2.2.0PE`)
- `TBMQ_BRANCH` — branch name for install script URLs (e.g. `release-2.2.0`)

### Version strings in code blocks

Never hardcode version strings. Export constants at the top of the file, then render with `<Code>`:

```mdx
import { Code } from '@astrojs/starlight/components';
import { TBMQ_VER, TBMQ_BRANCH } from '~/data/versions';

export const installCmd = `wget -O tbmq-install.sh https://raw.githubusercontent.com/thingsboard/tbmq/${TBMQ_BRANCH}/basic/tbmq-install-and-run.sh && chmod +x tbmq-install.sh && ./tbmq-install.sh ${TBMQ_VER}`;

<Code code={installCmd} lang="bash" />
```

CE installs from `thingsboard/tbmq`; PE installs from `thingsboard/tbmq-pe-docker-compose`:

```mdx
export const installCmdPe = `wget -O tbmq-install.sh https://raw.githubusercontent.com/thingsboard/tbmq-pe-docker-compose/${TBMQ_BRANCH}/basic/tbmq-install-and-run.sh && chmod +x tbmq-install.sh && ./tbmq-install.sh ${TBMQ_PE_VER}`;
```

### PE-conditional blocks — critical rules

**MDX does NOT render markdown syntax inside `{...}` JSX expression blocks.**

Inside `{condition && ( <> ... </> )}` you MUST use HTML, not markdown:

| Instead of... | Use... |
|---|---|
| `## Heading` | `<ConditionalHeading level={2} id="slug">Heading</ConditionalHeading>` |
| `### Sub-heading` | `<ConditionalHeading level={3} id="slug">Sub-heading</ConditionalHeading>` |
| `Paragraph text` | `<p>Paragraph text</p>` |
| `` ` ``` `bash `` code block | `<Code code={exportedVar} lang="bash" />` |
| `**bold**` | `<strong>bold</strong>` |
| `` `inline code` `` | `<code>inline code</code>` |
| `- item` / `* item` | `<ul><li>item</li></ul>` |
| `1. step` (markdown list) | `<Steps><ol><li>step</li></ol></Steps>` |
| `\| col \| col \|` markdown table | `<table><thead>...</thead><tbody>...</tbody></table>` |
| `[text](url)` | `<a href="url">text</a>` or `<DocLink>` |

`ConditionalHeading` makes headings appear in the TOC, which bare `<h2>` tags do not.

Example PE-only block:

```mdx
{props.product === Products.TBMQ_PE && (
  <>
    <ConditionalHeading level={2} id="pe-feature">PE feature</ConditionalHeading>
    <p>This feature is only available in TBMQ PE.</p>
    <Code code={peInstallCmd} lang="bash" />
  </>
)}
```

Example CE-only block:

```mdx
{props.product !== Products.TBMQ_PE && (
  <>
    <ConditionalHeading level={2} id="ce-note">Community edition note</ConditionalHeading>
    <p>...</p>
  </>
)}
```

### DocLink — correct path format

`DocLink` builds the URL as `/docs/{productPrefix}{path}/`. The `path` must be **relative to the product root** — do NOT include the product name.

```mdx
{/* CORRECT — path is relative to the product root */}
<DocLink product={props.product} path="user-guide/ui/sessions">Sessions</DocLink>
<DocLink product={props.product} path="architecture">Architecture</DocLink>
<DocLink product={props.product} path="getting-started">Getting started</DocLink>
<DocLink product={props.product} path="install/upgrade-instructions/#upgrading-to-220">Upgrade to 2.2.0</DocLink>

{/* WRONG — do not prefix with 'mqtt-broker/' */}
<DocLink product={props.product} path="mqtt-broker/user-guide/ui/sessions">Sessions</DocLink>
```

For PE-specific links from a CE context, pass the target product explicitly:

```mdx
<DocLink product={Products.TBMQ_PE} path="install/upgrade-instructions">TBMQ PE upgrade guide</DocLink>
```

### PE license key section

For PE installation guides, always add this after the install step (inside the PE JSX block):

```mdx
<ConditionalHeading level={2} id="get-the-license-key">Get the license key</ConditionalHeading>
<p>Before proceeding, select a subscription plan or purchase a perpetual license on the
<a href="https://thingsboard.io/pricing/?section=tbmq-options" target="_blank" rel="noopener noreferrer">Pricing page</a>.</p>

<ConditionalHeading level={2} id="configure-the-license-key">Configure the license key</ConditionalHeading>
<p>Open <code>docker-compose.yml</code>, find <strong>TBMQ_LICENSE_SECRET</strong>, and replace
<strong>YOUR_LICENSE_KEY_HERE</strong> with your license key.</p>
<Aside type="caution">The broker will not start without a valid license key.</Aside>
```

### Never write "TBMQ CE" or "TBMQ PE"

Use "TBMQ" alone. The edition is already clear from the navigation menu.

---

## Step 6: Create CE and PE stubs

CE stub path: `src/content/docs/docs/mqtt-broker/{path}.mdx`
PE stub path: `src/content/docs/docs/mqtt-broker/pe/{path}.mdx`

**CE stub template:**

```mdx
---
title: Page title
description: One-sentence description.
---
import PageContent from '@includes/docs/mqtt-broker/{path}.mdx'
import { Products } from '~/models/site.models'

<PageContent product={Products.TBMQ}/>
```

**PE stub template:**

```mdx
---
title: Page title
description: One-sentence description.
---
import PageContent from '@includes/docs/mqtt-broker/{path}.mdx'
import { Products } from '~/models/site.models'

<PageContent product={Products.TBMQ_PE}/>
```

Rules:
- If the description contains a colon, wrap its value in double quotes
- For PE-only pages: create only the PE stub, no CE stub
- **Never use `Content` as the import alias** — it conflicts with MDX's auto-generated `Content` identifier and causes a build error (`Identifier "Content" has already been declared`). Use `PageContent` or a descriptive name derived from the page title (e.g., `Architecture`, `Sessions`, `Overview`).

**PE-only pages** (PE stub only, no CE stub):
- `security/oauth-2-support`
- `security/rbac`
- `white-labeling`

---

## Step 7: Update the sidebar

TBMQ sidebar items live in `astro.sidebar.ts` in three helper functions:

- **`tbmqGuideItems(prefix)`** — Guides section
- **`tbmqInstallItems(prefix)`** — Installation section
- **`tbmqReferenceItems(prefix)`** — Reference section

Called with `prefix = 'docs/mqtt-broker'` (CE) or `prefix = 'docs/mqtt-broker/pe'` (PE).

PE-only items use the `isPE` flag already defined at the top of each function:

```ts
const isPE = prefix.includes('/pe');

// Example: PE-only item in a collapsed section
{ label: 'Security', collapsed: true, items: [
    { label: 'Basic', slug: `${prefix}/security/authentication/basic` },
    ...(isPE ? [
      { label: 'OAuth 2.0', slug: `${prefix}/security/oauth-2-support` },
    ] : []),
]},
```

Sidebar entries are always **objects** with `label` and `slug` — never bare strings.

---

## Step 8: Review and surface open questions

After writing the page, re-read it as a new TBMQ user encountering this topic for the first time. Output a list of questions a reader might have that are not answered:

```
## Open questions (not covered in this page)

- How does X interact with Y when Z happens?
- What are the limits or quotas for this feature?
- What happens if the client disconnects mid-authentication?
```

Present this list to the user.

---

## TBMQ-specific domain knowledge

### Client types

TBMQ has two client types — important for subscription, session, and architecture pages:
- **DEVICE** — persistent sessions backed by Redis; designed for IoT devices with intermittent connectivity
- **APPLICATION** — dedicated Kafka consumer group per subscription; designed for backend services that process all messages reliably

### Authentication `credentialsId`

The `credentialsId` is auto-generated from a combination of `clientId`, `username`, and password fields in the CONNECT packet. It drives the credential lookup in Redis and PostgreSQL.

### Key version constants (from `~/data/versions`)

| Constant | Example value | Use for |
|---|---|---|
| `TBMQ_VER` | `2.2.0` | CE Docker image tags |
| `TBMQ_PE_VER` | `2.2.0PE` | PE Docker image tags |
| `TBMQ_BRANCH` | `release-2.2.0` | Install script URLs |
