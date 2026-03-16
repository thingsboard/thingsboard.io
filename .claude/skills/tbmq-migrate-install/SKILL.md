---
name: tbmq-migrate-install
description: Migrate TBMQ installation guides from the old Jekyll site to the new Astro + Starlight site. Use this skill whenever you are asked to migrate any page under docs/mqtt-broker/install/ or docs/pe/mqtt-broker/install/ from the Jekyll site — including docker.md, docker-windows.md, building-from-source.md, config.md, ie-config.md, upgrade-instructions.md, and all cluster setup pages. Also use it for any TBMQ install-related writing task even if the user doesn't say "migrate" explicitly.
---

You are migrating TBMQ installation documentation from the old Jekyll site to a new Astro + Starlight project. Your goal is accurate, clean MDX that follows the project conventions exactly.

## Working directories

| Role | Path |
|---|---|
| Old CE page wrappers | `/home/dlandiak/projects/thingsboard.github.io/docs/mqtt-broker/install/` |
| Old PE page wrappers | `/home/dlandiak/projects/thingsboard.github.io/docs/pe/mqtt-broker/install/` |
| Old TBMQ install includes | `/home/dlandiak/projects/thingsboard.github.io/_includes/docs/mqtt-broker/install/` |
| Old install templates | `/home/dlandiak/projects/thingsboard.github.io/_includes/templates/mqtt-broker/install/` |
| Old upgrade templates | `/home/dlandiak/projects/thingsboard.github.io/_includes/templates/mqtt-broker/upgrade/` |
| Old images | `/home/dlandiak/projects/thingsboard.github.io/images/mqtt-broker/` |
| New CE stubs | `src/content/docs/docs/mqtt-broker/install/` |
| New PE stubs | `src/content/docs/docs/mqtt-broker/pe/install/` |
| New includes | `src/content/_includes/docs/mqtt-broker/install/` |
| New images | `src/assets/images/docs/mqtt-broker/` |

---

## Step 0: Read the source

Before writing anything, read:
1. The CE page wrapper (`docs/mqtt-broker/install/{page}.md`)
2. The PE page wrapper if it exists (`docs/pe/mqtt-broker/install/{page}.md`)
3. The shared Jekyll include (`_includes/docs/mqtt-broker/install/{page}.md`)
4. All templates referenced with `{% include templates/mqtt-broker/install/... %}` — follow the full chain

Key Jekyll variables set in page wrappers:
- `{% assign tbmqSuffix = "CE" %}` / `{% assign tbmqSuffix = "PE" %}` — product suffix (drop in new site)
- `{% assign cacheUrl = "redis_url" %}` (CE) / `{% assign cacheUrl = "valkey_url" %}` (PE) — becomes conditional in include

**Version variables → replace as follows:**

| Jekyll variable | Astro constant |
|---|---|
| `{{ site.release.broker_full_ver }}` | `${TBMQ_VER}` inside template literals |
| `{{ site.release.pe_broker_full_ver }}` | `${TBMQ_PE_VER}` inside template literals |
| `{{ site.release.broker_branch }}` | `${TBMQ_BRANCH}` inside template literals |

**Conditionals → replace as follows:**

| Jekyll | Astro MDX |
|---|---|
| `{% if docsPrefix == null %}` | `{props.product !== Products.TBMQ_PE && ( ... )}` |
| `{% if docsPrefix == "pe/" %}` | `{props.product === Products.TBMQ_PE && ( ... )}` |
| `{% unless docsPrefix == "pe/" %}` | `{props.product !== Products.TBMQ_PE && ( ... )}` |

---

## Step 1: Check what already exists

Before creating files, check:
1. Does `src/content/_includes/docs/mqtt-broker/install/{page}.mdx` already exist? (It may be a "coming soon" stub.)
2. Do CE/PE stubs already exist?
3. Is there already a sidebar entry?

Read any existing stubs before overwriting.

---

## Step 2: Handle images

Installation guides rarely have screenshots, but check. If images exist under `images/mqtt-broker/install/`, copy them:

```bash
cp images/mqtt-broker/install/*.png src/assets/images/docs/mqtt-broker/install/
```

---

## Step 3: Create or update the include file

Path: `src/content/_includes/docs/mqtt-broker/install/{page}.mdx`

### Required imports

Only import what you use:

```mdx
import { Aside, Steps, Code } from '@astrojs/starlight/components';
import Tabs from '@components/Tabs.astro';
import TabItem from '@components/TabItem.astro';
import DocLink from '@components/DocLink.astro';
import ConditionalHeading from '~/components/ConditionalHeading.astro';
import { Products } from '~/models/site.models';
import { TBMQ_VER, TBMQ_PE_VER, TBMQ_BRANCH } from '~/data/versions';
```

### Version strings in code blocks

**Never hardcode version strings.** Export constants at the top of the file and render with `<Code>`:

```mdx
import { Code } from '@astrojs/starlight/components';
import { TBMQ_VER, TBMQ_PE_VER, TBMQ_BRANCH } from '~/data/versions';

export const installCmdCe = `wget https://raw.githubusercontent.com/thingsboard/tbmq/${TBMQ_BRANCH}/msa/tbmq/configs/tbmq-install-and-run.sh && \
sudo chmod +x tbmq-install-and-run.sh && ./tbmq-install-and-run.sh`;

export const installCmdPe = `wget https://raw.githubusercontent.com/thingsboard/tbmq-pe-docker-compose/${TBMQ_BRANCH}/basic/tbmq-install-and-run.sh && \
sudo chmod +x tbmq-install-and-run.sh && ./tbmq-install-and-run.sh`;

{props.product !== Products.TBMQ_PE && <Code code={installCmdCe} lang="bash" />}
{props.product === Products.TBMQ_PE && <Code code={installCmdPe} lang="bash" />}
```

### Install script URLs

- CE installs from `thingsboard/tbmq`, path `msa/tbmq/configs/`
- PE installs from `thingsboard/tbmq-pe-docker-compose`, path `basic/`

### PE-conditional blocks — critical rules

MDX does **not** render markdown inside `{...}` JSX expression blocks. Use HTML elements:

| Instead of... | Use... |
|---|---|
| `## Heading` | `<ConditionalHeading level={2} id="slug">Heading</ConditionalHeading>` |
| `Paragraph text` | `<p>Paragraph text</p>` |
| `` ```bash ``` `` | `<Code code={exportedVar} lang="bash" />` |
| `**bold**` | `<strong>bold</strong>` |
| `` `inline code` `` | `<code>inline code</code>` |
| `- item` | `<ul><li>item</li></ul>` |
| `[text](url)` | `<a href="url">text</a>` or `<DocLink>` |

`ConditionalHeading` ensures headings inside JSX conditionals still appear in the TOC.

### PE License key section

For PE install pages, always add this block:

```mdx
{props.product === Products.TBMQ_PE && (
  <>
    <ConditionalHeading level={2} id="get-the-license-key">Get the license key</ConditionalHeading>
    <p>Before proceeding, select a subscription plan or purchase a perpetual license on the{' '}
    <a href="https://thingsboard.io/pricing/?section=tbmq-options" target="_blank" rel="noopener noreferrer">Pricing page</a>.</p>

    <ConditionalHeading level={2} id="configure-the-license-key">Configure the license key</ConditionalHeading>
    <p>In the downloaded <code>docker-compose.yml</code>, find <code>TBMQ_LICENSE_SECRET</code> and replace
    <strong>YOUR_LICENSE_KEY_HERE</strong> with your actual license key.</p>
    <Aside type="caution">The broker will not start without a valid license key.</Aside>
  </>
)}
```

### CE/PE key differences

| Aspect | CE | PE |
|---|---|---|
| Cache backend | Redis (`redis_url`) | Valkey (`valkey_url`) |
| Docker image | `thingsboard/tbmq` | `thingsboard/tbmq-pe-node` |
| Postgres image | `postgres:16` | `postgres:17` |
| Kafka image | `bitnamilegacy/kafka:3.7.0` | `apache/kafka:4.0.0` |
| Redis/Valkey image | `bitnami/redis:7.0` | `bitnami/valkey:8.0` |
| Git repo | `thingsboard/tbmq` | `thingsboard/tbmq-pe-docker-compose` |
| License key | Not required | Required (`TBMQ_LICENSE_SECRET`) |
| Data volume | `tbmq-redis-data:/bitnami/redis/data` | `tbmq-valkey-data:/data` |
| Kafka data volume | `tbmq-kafka-data:/bitnami/kafka` | `tbmq-kafka-data:/var/lib/kafka/data` |

### DocLink — correct path format

The path is **relative to the product root** — never include `mqtt-broker/` prefix:

```mdx
{/* CORRECT */}
<DocLink product={props.product} path="install/installation-options">Installation options</DocLink>
<DocLink product={props.product} path="install/cluster/docker-compose-setup">Cluster setup</DocLink>

{/* WRONG */}
<DocLink product={props.product} path="mqtt-broker/install/installation-options">...</DocLink>
```

### `building-from-source.md` is CE-only

This page has no PE equivalent. Create only a CE stub. No product conditionals needed inside the include.

### Omit "Next steps" section

The `{% assign currentGuide = "InstallationGuides" %}{% include templates/mqtt-broker-guides-banner.md %}` block at the end of old pages provides a "next steps" banner. **Omit this** — next steps are handled at the site level.

---

## Step 4: Create CE and PE stubs

**CE stub** (`src/content/docs/docs/mqtt-broker/install/{page}.mdx`):

```mdx
---
title: Install TBMQ with Docker (Linux, macOS)
description: Install and run TBMQ with Docker Compose on Linux or macOS.
---
import PageContent from '@includes/docs/mqtt-broker/install/{page}.mdx'
import { Products } from '~/models/site.models'

<PageContent product={Products.TBMQ}/>
```

**PE stub** (`src/content/docs/docs/mqtt-broker/pe/install/{page}.mdx`):

```mdx
---
title: Install TBMQ with Docker (Linux, macOS)
description: Install and run TBMQ with Docker Compose on Linux or macOS.
---
import PageContent from '@includes/docs/mqtt-broker/install/{page}.mdx'
import { Products } from '~/models/site.models'

<PageContent product={Products.TBMQ_PE}/>
```

Rules:
- Use `sidebar.label` for a short sidebar label when the title is long
- If description contains a colon, wrap the value in double quotes
- For CE-only pages (like `building-from-source`): create only a CE stub
- **Never use `Content` as the import alias** — use `PageContent` or a descriptive name

---

## Step 5: Update the sidebar

TBMQ install items live in the `tbmqInstallItems(prefix)` function in `astro.sidebar.ts`.

```ts
const isPE = prefix.includes('/pe');
```

CE-only pages use `!isPE`:
```ts
...(!isPE ? [
  { label: 'Building from source', slug: `${prefix}/install/building-from-source` },
] : []),
```

PE-only pages use `isPE`:
```ts
...(isPE ? [
  { label: 'PE-only page', slug: `${prefix}/install/pe-only-page` },
] : []),
```

Sidebar entries are always **objects** with `label` and `slug` — never bare strings. Check that entries exist for both CE and PE prefix calls.

---

## Step 6: Review checklist

After writing the page, verify:

1. No hardcoded version strings — all use `<Code>` + imported constants
2. CE/PE differences correctly reflected (cache backend, images, volumes, license)
3. All markdown inside JSX blocks replaced with HTML elements
4. `ConditionalHeading` used for any headings inside `{...}` blocks
5. `DocLink` paths don't include `mqtt-broker/` prefix
6. "Next steps" section omitted
7. PE-only pages have no CE stub; CE-only pages have no PE stub
8. Build passes: `pnpm build:fast`

---

## Open questions to surface after each migration

After writing each page, tell the user about:
- Any content that appears outdated or references deprecated features
- Any upgrade migration paths that might need verification against the current codebase
- Sections with complex conditional logic that should be double-checked
- Links to external services (Docker Hub, GitHub) that may need updating
