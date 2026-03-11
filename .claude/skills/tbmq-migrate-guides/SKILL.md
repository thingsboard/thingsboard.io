---
name: tbmq-migrate-guides
description: Migrates TBMQ documentation pages from the old Jekyll site to the new Astro + Starlight site. Use when user asks to migrate or rewrite the TBMQ related documentation
---

# TBMQ Migrate Guides

You are a senior technical writer for ThingsBoard documentation. Your task is to review and edit MDX documentation files to ensure they comply with the ThingsBoard style guide. Apply all rules strictly and flag violations with inline comments.

## Working directories

| Role                      | Path                                            |
|---------------------------|-------------------------------------------------|
| Old site root             | `/home/dlandiak/projects/thingsboard.github.io` |
| Old TBMQ includes         | `{OLD}/\_includes/docs/mqtt-broker/`            |
| Old TBMQ templates        | `{OLD}/\_includes/templates/mqtt-broker/`       |
| Old TBMQ CE page wrappers | `{OLD}/docs/mqtt-broker/`                       |
| Old TBMQ PE page wrappers | `{OLD}/docs/pe/mqtt-broker/`                    |
| Old images (CE)           | `{OLD}/images/mqtt-broker/`                     |
| Old images (PE-only)      | `{OLD}/images/pe/mqtt-broker/`                  |
| New site root             | `/home/dlandiak/projects/thingsboard.io`        |
| New includes              | `src/content/_includes/docs/mqtt-broker/`       |
| New CE stubs              | `src/content/docs/docs/mqtt-broker/`            |
| New PE stubs              | `src/content/docs/docs/mqtt-broker/pe/`         |
| New images                | `src/assets/images/docs/mqtt-broker/`           |
| New PE images             | `src/assets/images/docs/mqtt-broker/pe/`        |

---

## Step 0: Gather information

Before doing anything else:

1. **Derive the source path** from the argument provided by the user.

2. **Resolve Jekyll includes** — old TBMQ docs use heavy `{% include %}` chaining. Common include chains to follow:
   - `{% include docs/mqtt-broker/user-guide/ui/authentication-provider-control.md %}` → authentication provider config block
   - `{% include templates/mqtt-broker/install/linux-macos.md %}` → install script steps
   - `{% include templates/mqtt-broker/install/windows.md %}` → Windows install script steps
   - `{% include templates/mqtt-broker/security/... %}` → TLS/SSL certificate setup steps
   - `{% include templates/mqtt-broker/since.md %}` → version badge (omit in new docs; content is always current)

3. **Check for PE-only content** — old docs use `{% if docsPrefix == "pe/" %}` conditionals. In the new site, use `props.product === Products.TBMQ_PE` JSX expressions.

4. **Ask clarifying questions** — do not assume. Examples:
   - Is there any content in the old page that is now outdated or superseded?
   - Should any sections be split into separate new pages?
   - Are there related pages that should be cross-linked?

Only proceed once the answers are clear.

---

## Step 1: Read the source

Read the main include file and all files it references. Use `Glob` and `Read` to follow the include chain completely before writing anything.

Key patterns in old TBMQ Jekyll files:

```liquid
{% include docs/mqtt-broker/some-snippet.md %}
{% include templates/mqtt-broker/install/linux-macos.md %}
{% if docsPrefix == "pe/" %}...PE content...{% endif %}
{% if docsPrefix != "pe/" %}...CE content...{% endif %}
{% assign sinceVersion = "2.3.0" %}{% include templates/mqtt-broker/since.md %}
![image](/images/mqtt-broker/topic/screenshot.png)
![image](/images/pe/mqtt-broker/topic/screenshot.png)
<img src="/images/mqtt-broker/topic/screenshot.png" />
```

- **`since.md`**: version badges. Omit in the new site — content always reflects the current version.
- **`pe-tbmq-feature-banner.md`**: PE-feature notice. Replace with `src/components/Banner.astro` component.
- **`pe-tbmq-explore-banner.md`**: upgrade CTA. Omit in the new site.

Identify:
- All content sections and whether each is CE, PE, or shared
- All image references (CE path: `images/mqtt-broker/...`, PE path: `images/pe/mqtt-broker/...`)
- Whether a diagram would help explain flows or architecture

---

## Step 2: Handle images

### 2a. Find referenced images

Scan for patterns:
```
![image](/images/mqtt-broker/{topic}/screenshot.png)
![image](/images/pe/mqtt-broker/{topic}/screenshot.png)
```

Old `*-preview.png` files are thumbnails used by the old Jekyll gallery — **do not copy these**. Only copy the full-size images (no `-preview` suffix).

### 2b. Copy images to the new site

```bash
# CE images (shared or CE-specific)
cp /home/dlandiak/projects/thingsboard.github.io/images/mqtt-broker/{topic}/ \
   src/assets/images/docs/mqtt-broker/{topic}/

# PE-only images
cp /home/dlandiak/projects/thingsboard.github.io/images/pe/mqtt-broker/{topic}/ \
   src/assets/images/docs/mqtt-broker/pe/{topic}/
```

Verify files exist before referencing them.

### 2c. Use images in the include file

**For a group of screenshots** — use `ImageGallery`:

```mdx
import ImageGallery from '@components/ImageGallery.astro';

<ImageGallery images={[
  {
    src: '/src/assets/images/docs/mqtt-broker/{topic}/screenshot.png',
    alt: 'Descriptive alt text',
    caption: 'Optional caption shown in lightbox',
  },
]} />
```

**For PE-conditional images** — wrap in JSX:

```mdx
{props.product === Products.TBMQ_PE && (
  <ImageGallery images={[
    { src: '/src/assets/images/docs/mqtt-broker/{topic}/pe-feature.png', alt: 'PE feature' },
  ]} />
)}
```

**Rules:**
- `src` must be an absolute path starting with `/src/assets/`
- Always provide meaningful `alt` text
- Do not reference images that no longer reflect the current TBMQ UI — note as TODO instead

---

## Step 3: Plan the structure

TBMQ guide pages follow this structure:

1. **Intro** — what this feature is and what problem it solves (1–3 sentences, no "Overview" heading before it)
2. **Main sections** — use `<Steps>` for UI procedures; tables for structured data (field descriptions, option comparisons, configuration parameters)
3. **Diagrams** — ASCII or Mermaid for non-obvious flows (auth handshake, message routing, subscription matching)
4. **Images** — screenshots placed after the UI step they illustrate
5. **Cross-links** — use `<DocLink product={props.product} path='mqtt-broker/...'>` for internal links

**Security pages**: follow the pattern — overview → configure provider (Steps) → credential format → examples

**Installation pages**: follow the pattern — intro → prerequisites → install script → configure → verify → upgrade note

---

## Step 4: Add diagrams

Add a diagram when the topic involves a non-obvious flow. Use `plaintext` code blocks (no syntax highlight noise), width ≤ 70 characters.

**Especially valuable for TBMQ pages:**

| Topic | Diagram type |
|-------|-------------|
| Authentication | Sequence: CONNECT → credential lookup → CONNACK |
| Subscription matching | Trie traversal with wildcards |
| Client types | DEVICE vs APPLICATION routing paths |
| QoS levels | Message flow with ACK steps |
| Cluster | Node topology, no single coordinator |
| Kafka integration | Publish → topic → consumer group flow |

**Style rules:**
- Use `─`, `│`, `┌`, `┐`, `└`, `┘`, `├`, `┤`, `▶`, `●`, `╔`, `╗`, `╚`, `╝`, `║`, `═`
- Label every box and arrow
- All related components must be perfectly aligned on a single vertical or horizontal axis. Ensure there is zero "jitter" or offset between stacked nodes

---

## Step 5: Create the include file

Path: `src/content/_includes/docs/mqtt-broker/{path}.mdx`

Required imports:

```mdx
import { Steps, Aside } from '@astrojs/starlight/components';
import DocLink from '@components/DocLink.astro';
import { Products } from '~/models/site.models';
```

Add only what is needed:
- `ImageGallery` only if the page has screenshots
- `Code` from `@astrojs/starlight/components` only if the page has code with version interpolation
- `TBMQ_VER`, `TBMQ_PE_VER`, `TBMQ_BRANCH` from `~/data/versions` only if version strings appear in code blocks

**PE-conditional blocks:**

```mdx
{props.product === Products.TBMQ_PE && (
  <>
    <h2>PE-only section title</h2>
    <p>Content here. Use HTML headings and paragraphs, not markdown.</p>
    <Code code={peCommandVar} lang="shell" />
  </>
)}
```

**MDX restrictions inside `{...}` JSX expressions:**
- Never use fenced code blocks (` ``` `) → use `<Code code={var} lang="shell" />` instead
- Never use markdown headings (`##`) → use `<h2>`, `<h3>` HTML tags instead
- Never use markdown tables → use HTML `<table>` instead
- Never use `<Steps>` with a markdown numbered list → use `<Steps><ol><li>...</li></ol></Steps>`

**DocLink for TBMQ pages:**

```mdx
<DocLink product={props.product} path='mqtt-broker/user-guide/ui/sessions'>Sessions</DocLink>
```

TBMQ path prefix is always `mqtt-broker/`, not `user-guide/`.

**Never write "TBMQ CE" or "TBMQ PE"** — just use "TBMQ". The edition is shown in the navigation menu.

**Version strings in install commands** — use `TBMQ_BRANCH` for script URLs, never hardcode branch names:

```mdx
import { TBMQ_BRANCH } from '~/data/versions';

export const installCmd = `wget https://raw.githubusercontent.com/thingsboard/tbmq/${TBMQ_BRANCH}/...`;
export const installCmdPe = `wget https://raw.githubusercontent.com/thingsboard/tbmq-pe-docker-compose/${TBMQ_BRANCH}/...`;
```

---

## Step 6: Create CE and PE stubs

CE stub path: `src/content/docs/docs/mqtt-broker/{path}.mdx`
PE stub path: `src/content/docs/docs/mqtt-broker/pe/{path}.mdx`

**CE stub template:**

```mdx
---
title: Page Title
description: One-sentence description.
---
import Content from '@includes/docs/mqtt-broker/{path}.mdx'
import { Products } from '~/models/site.models'

<Content product={Products.TBMQ}/>
```

**PE stub template:**

```mdx
---
title: Page Title
description: One-sentence description.
---
import Content from '@includes/docs/mqtt-broker/{path}.mdx'
import { Products } from '~/models/site.models'

<Content product={Products.TBMQ_PE}/>
```

- If the description contains a colon, wrap in double quotes
- For PE-only pages (no CE counterpart): create only the PE stub, not a CE stub

**PE-only pages** (create PE stub only, no CE stub):
- `security/oauth-2-support`
- `security/rbac`
- `white-labeling`

---

## Step 7: Update the sidebar

TBMQ sidebar items live in three helper functions in `astro.sidebar.ts`:

- **`tbmqGuideItems(prefix)`** — Guides section (MQTT protocol, Client management, Security, Integrations, Administration)
- **`tbmqInstallItems(prefix)`** — Installation section
- **`tbmqReferenceItems(prefix)`** — Reference section

These functions are called with `prefix = 'docs/mqtt-broker'` (CE) or `prefix = 'docs/mqtt-broker/pe'` (PE).

PE-only items in `tbmqGuideItems` are already gated with `isPE`:

```ts
const isPE = prefix.includes('/pe');
...(isPE ? [`${prefix}/security/oauth-2-support`, `${prefix}/security/rbac`] : []),
```

Use the Python replacement approach from `/edit-doc` if the Edit tool fails on `astro.sidebar.ts`.

---

## Step 8: Review and surface open questions

After writing the page, re-read it as a new TBMQ user encountering this topic for the first time.

Output a list of questions that a reader might have that are **not answered** in the page:

```
## Open questions (not covered in this page)

- How does X interact with Y when Z happens?
- What are the limits or quotas for this feature?
- What happens if the client disconnects mid-authentication?
- ...
```

Present this list to the user.

---

## TBMQ-specific patterns

### CE vs PE install scripts

CE installs from `thingsboard/tbmq`:
```
https://raw.githubusercontent.com/thingsboard/tbmq/{TBMQ_BRANCH}/basic/tbmq-install-and-run.sh
https://raw.githubusercontent.com/thingsboard/tbmq/{TBMQ_BRANCH}/basic/windows/tbmq-install-and-run.ps1
```

PE installs from `thingsboard/tbmq-pe-docker-compose`:
```
https://raw.githubusercontent.com/thingsboard/tbmq-pe-docker-compose/{TBMQ_BRANCH}/basic/tbmq-install-and-run.sh
https://raw.githubusercontent.com/thingsboard/tbmq-pe-docker-compose/{TBMQ_BRANCH}/basic/windows/tbmq-install-and-run.ps1
```

### PE license key section

Always add this after the install step for PE guides (use HTML tags, not markdown, because this goes inside `{props.product === Products.TBMQ_PE && (<>...</>)}`):

```mdx
<h2>Get the license key</h2>
<p>Before proceeding, select a subscription plan or purchase a perpetual license on the
<a href="https://thingsboard.io/pricing/?section=tbmq-options" target="_blank">Pricing page</a>.</p>

<h2>Configure the license key</h2>
<p>Open <code>docker-compose.yml</code>, find <strong>TBMQ_LICENSE_SECRET</strong>, and replace
<strong>YOUR_LICENSE_KEY_HERE</strong> with your license key.</p>
<Aside type="caution">The broker will not start without a valid license key.</Aside>
```

### Client types

TBMQ has two client types — important for subscription pages and architecture:
- **DEVICE** — persistent sessions backed by Redis; designed for IoT devices
- **APPLICATION** — dedicated Kafka consumer group per subscription; designed for backend services

### Authentication `credentialsId`

The `credentialsId` is auto-generated from a combination of clientId, username, and password fields in the CONNECT packet. It drives the credential lookup in Redis and PostgreSQL.

