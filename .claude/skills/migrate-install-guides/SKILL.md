# Migrate Installation Guides

Migrate installation pages from the old ThingsBoard Jekyll site to the new Astro + Starlight site.

---

## Step 0: Gather information

Before doing anything else:

1. **Derive paths** from the source argument provided by the user:
   - Old install docs: `{OLD_WEBSITE_PATH}/docs/user-guide/install/` (page wrappers) and `{OLD_WEBSITE_PATH}/docs/user-guide/install/pe/` (PE variants)
   - Old install includes: `{OLD_WEBSITE_PATH}/_includes/docs/user-guide/install/` (shared content)
   - Old images root: `{OLD_WEBSITE_PATH}/images/`

   Example: if the user provides `/home/ashvayka/git/website/docs/user-guide/install/ubuntu.md`,
   then `OLD_WEBSITE_PATH = /home/ashvayka/git/website`.

2. **Identify all includes** referenced by the source page. Old Jekyll install guides heavily use `{% include ... %}` for shared snippets (queue parameters, docker compose fragments, upgrade steps, etc.). Read and inline all referenced includes before writing.

3. **Ask clarifying questions** — do not assume. Examples:
   - Should CE and PE guides be separate includes or a single shared include with conditionals?
   - Are there platform-specific variants (Linux/macOS vs Windows)?
   - Should upgrade instructions be included or left as a TODO link?
   - Should the Trendz section be included (PE only)?
   - Any sections that are outdated and should be omitted?

Only proceed once the answers are clear.

---

## Step 1: Read and understand the source

Read all related files for the installation guide being migrated:

1. The main page file (`docs/user-guide/install/{page}.md`)
2. The PE variant if it exists (`docs/user-guide/install/pe/{page}.md`)
3. All `{% include ... %}` files referenced by these pages — follow the chain recursively
4. Note which sections differ between CE and PE

Key differences to look for between CE and PE:
- PE has a license key step and `TB_LICENSE_SECRET` env var
- PE has `tb-web-report` sidecar service (PDF/PNG report generation)
- PE has port `9090` for Remote Integrations
- PE has optional Trendz Analytics section
- PE uses `thingsboard/tb-pe-node` image; CE uses `thingsboard/tb-node`
- PE has `license-data` Docker volume

---

## Step 2: Handle images

Same as the `migrate-guides` skill — copy images from `{OLD_WEBSITE_PATH}/images/` to `src/assets/images/` preserving directory structure. Installation guides typically have few or no screenshots, but check.

---

## Step 3: Use version constants

**Never hardcode version strings** in Docker image tags or download URLs.

Import from `src/data/versions.ts`:
```mdx
import { CE_FULL_VER } from '~/data/versions';        // CE guides
import { PE_FULL_VER, TRENDZ_VER } from '~/data/versions';  // PE guides
import { EDGE_VER, EDGE_PE_VER } from '~/data/versions';    // Edge guides
```

Available constants:
- `CE_FULL_VER` — Community Edition (e.g. `4.3.0.1`)
- `PE_FULL_VER` — Professional Edition (e.g. `4.3.0.1PE`)
- `TRENDZ_VER` — Trendz Analytics (e.g. `1.15.0.4`)
- `EDGE_VER`, `EDGE_PE_VER`, `TBMQ_VER`, `TBMQ_PE_VER` — other products

**Jekyll version placeholders** — replace as follows when encountered in source files:
- `{{ site.release.edge_full_ver }}` → `${EDGE_VER}` (inside template literals)
- `{{ site.release.pe_edge_full_ver }}` → `${EDGE_PE_VER}` (inside template literals)
- `{{ site.release.ce_full_ver }}` → `${CE_FULL_VER}` (inside template literals)
- `{{ site.release.pe_full_ver }}` → `${PE_FULL_VER}` (inside template literals)

To interpolate versions into code blocks, use the `<Code>` component with exported string constants:

```mdx
import { Code } from '@astrojs/starlight/components';
import { PE_FULL_VER } from '~/data/versions';

export const yamlContent = `services:
  thingsboard-pe:
    image: "thingsboard/tb-pe-node:${PE_FULL_VER}"
    ...`;

<Code code={yamlContent} lang="yml" meta="maxLines=20 collapsible" />
```

**Important:** The `<Code>` component requires Expressive Code config in `ec.config.mjs` (project root), not inline in `astro.config.ts`. This is already set up.

---

## Step 4: Plan the structure

Installation guides follow this structure:

1. **Intro** — one sentence: what this guide installs and on which platform
2. **Prerequisites** — Docker/package links, RAM requirements, Linux `docker` group note
3. **License key** (PE only) — how to obtain and where to use it
4. **Create docker compose file** — queue service tabs (In Memory / Kafka / Confluent Cloud) with `<Tabs>` and `<TabItem>`, each containing a `<Code>` block with the full YAML
5. **Docker compose parameters** — table explaining ports, volumes, services
6. **Initialize database** — `docker compose run` command with INSTALL_TB/LOAD_DEMO table
7. **Start the platform** — `docker compose up -d` + log streaming, default credentials, Getting Started link
8. **Inspect logs and control containers** — common commands
9. **Trendz Analytics** (PE only, optional) — separate compose file, database creation, combined commands
10. **Upgrading** — sequential upgrade note + link to upgrade instructions
11. **Troubleshooting** — DNS issues and other common problems

Platform-specific differences:
- **Linux/macOS vs Windows**: editor command (`nano` vs `notepad`), shell operator (`&&` vs `;` for PowerShell), Docker install links, DNS troubleshooting links
- **Code block language**: `bash` for Linux/macOS, `text` for Windows (notepad commands)

---

## Step 5: Create the include file(s)

Path: `src/content/_includes/docs/installation/{page}.mdx`

For Docker guides, create **separate includes** for CE and PE because the differences are substantial:
- `docker.mdx` — CE Linux/macOS
- `docker-windows.mdx` — CE Windows
- `pe-docker.mdx` — PE Linux/macOS
- `pe-docker-windows.mdx` — PE Windows

For package install guides (Ubuntu, CentOS/RHEL, RPi), a single shared include with `props.product` conditionals may work if differences are minor.

Required imports:
```mdx
import DocLink from '@components/DocLink.astro';
import { Steps, Aside, Tabs, TabItem } from '@astrojs/starlight/components';
import { Code } from '@astrojs/starlight/components';
import { CE_FULL_VER } from '~/data/versions';
```

Export YAML content as string constants at the top of the file (before any markdown content):
```mdx
export const inMemoryYaml = `services:
  ...
  image: "thingsboard/tb-node:${CE_FULL_VER}"
  ...`;

export const kafkaYaml = `services:
  ...`;

export const confluentYaml = `services:
  ...`;
```

Follow all rules in `/edit-doc` (DocLink, Aside types, Steps, no bare markdown links).

---

## Step 6: Create stub pages

CE stubs go in `src/content/docs/docs/installation/`.
PE stubs go in `src/content/docs/docs/pe/installation/`.

Stub template:
```mdx
---
title: "Installing ThingsBoard CE using Docker (Linux, macOS)"
description: "Install and run ThingsBoard Community Edition with Docker on Linux or macOS."
sidebar:
  label: "Docker (Linux, macOS)"
---
import PageComponent from '@includes/docs/installation/docker.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.CE}/>
```

- Use `sidebar.label` for short sidebar text when the title is long
- If the description contains a colon, wrap in double quotes

---

## Step 7: Update the sidebar

Installation items go in `installationItems(prefix)` in `astro.sidebar.ts`:

```ts
const installationItems = (prefix: string) => [
  { label: 'Installation options', slug: `${prefix}/installation` },
  `${prefix}/installation/docker`,
  `${prefix}/installation/docker-windows`,
  `${prefix}/installation/ubuntu`,
  // ... add new entries here
];
```

---

## Content to skip

The following sections must **not** be migrated — omit them entirely:

- `## Next Steps` / `{% include templates/edge/install/next-steps.md %}` — next steps are handled at the site level, not per-page.

---

## Step 8: Review and surface open questions

After writing the page, self-review it:

1. Are all version strings using `<Code>` + version constants (never hardcoded)?
2. Are CE/PE differences correctly handled (license, web-report, ports, Trendz)?
3. Are Linux/Windows differences correct (editor, shell operators, prerequisites)?
4. Do all `<DocLink>` paths point to existing pages or use `path='TODO'`?
5. Is the parameters table complete (all ports, volumes, services explained)?

Output a list of open questions for the user:

```
## Open questions (not covered in this page)

- Should we include instructions for custom SSL certificate setup?
- What about Docker volume backup/restore?
- ...
```

Present this list to the user so they can decide what to address.
