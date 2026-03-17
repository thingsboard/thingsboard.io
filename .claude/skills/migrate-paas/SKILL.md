---
name: migrate-paas
description: Create PaaS (Cloud) documentation pages from existing PE pages. Copies the PE three-tier structure (shared includes + product stubs) to PaaS US and PaaS EU, adapting conditionals for the cloud environment.
---

# Migrate PE Docs to PaaS (Cloud)

Create PaaS US and PaaS EU documentation stubs that mirror the PE docs structure, reusing the same shared includes with appropriate product props and conditionals.

---

## Key Concepts

### PaaS = PE in the Cloud

ThingsBoard Cloud (PaaS) is the PE edition hosted as a managed service. It shares all PE features (dashboard groups, RBAC, device ownership, entity groups, etc.) with these differences:

- **User is a Tenant** — no access to System Administrator settings
- **No self-managed installation** — no Docker, no backend configuration
- **No custom rule nodes** — cannot deploy custom server-side code
- **Specific hostnames** per region (not `localhost`)

### Host Configuration by Product

| Field | CE | PE | PaaS (NA) | PaaS (EU) |
|-------|----|----|-----------|-----------|
| hostLabel | localhost | localhost | ThingsBoard Cloud | ThingsBoard Cloud EU |
| hostName | localhost | localhost | thingsboard.cloud | eu.thingsboard.cloud |
| mqttHostName | localhost | localhost | mqtt.thingsboard.cloud | mqtt.eu.thingsboard.cloud |
| coapHostName | localhost | localhost | coap.thingsboard.cloud | coap.eu.thingsboard.cloud |
| httpsUrl | https://localhost | https://thingsboard.cloud | https://thingsboard.cloud | https://eu.thingsboard.cloud |
| lwm2mHostName | localhost | lwm2m.thingsboard.cloud | lwm2m.thingsboard.cloud | lwm2m.eu.thingsboard.cloud |
| apiHostName | localhost | YOUR_SERVER_HOSTNAME | thingsboard.cloud | eu.thingsboard.cloud |

### Products Enum

```ts
Products.PAAS     // PaaS North America — prefix: paas/
Products.PAAS_EU  // PaaS Europe — prefix: paas/eu/
```

---

## Step 0: Identify the PE pages to migrate

The user will specify a section (e.g., "Getting Started tab", "Guides > Security"). Identify all PE stub files and their corresponding shared includes.

```
src/content/docs/docs/pe/{path}/{page}.mdx         ← PE stub to copy from
src/content/_includes/docs/{path}/{page}.mdx        ← shared include (already exists)
```

---

## Step 1: Create PaaS US stubs

For each PE stub, create a corresponding PaaS US stub at:

```
src/content/docs/docs/paas/{path}/{page}.mdx
```

**Template** — copy the PE stub exactly, change only the product:

```mdx
---
title: '<same as PE>'
description: '<same as PE>'
---
import PageComponent from '@includes/docs/{path}/{page}.mdx'
import { Products } from '~/models/site.models'

<PageComponent product={Products.PAAS}/>
```

**Important:**
- If the PE stub imports from a PE-specific include (e.g., `getting-started-pe/4.mdx`), the PaaS stub should import from the same PE-specific include.
- Copy frontmatter exactly from the PE stub (title, description, type, sidebar, head, etc.).

---

## Step 2: Create PaaS EU stubs

Same structure at:

```
src/content/docs/docs/paas/eu/{path}/{page}.mdx
```

Identical to PaaS US stubs but with `Products.PAAS_EU`.

---

## Step 3: Adapt shared includes for PaaS

Review every shared include used by the new PaaS stubs. Look for content that doesn't apply to PaaS users.

### 3.1 Expand PE-only conditionals

PaaS has all PE features. Any conditional that checks for PE must also include PaaS:

```diff
- {props.product === Products.PE && <li>PE-only content</li>}
+ {[Products.PE, Products.PAAS, Products.PAAS_EU].includes(props.product) && <li>PE-only content</li>}
```

Add the `Products` import if not already present:
```mdx
import { Products } from '@models/site.models.ts';
```

### 3.2 Image resolution — no action needed

`ImageGallery` has a built-in product fallback chain: PAAS → PE → base, PAAS_EU → PAAS → PE → base. PaaS pages automatically use PE screenshots when no `-paas` variant exists. **You do NOT need to create `-paas` image copies or symlinks.**

However, if an image's `products` array explicitly lists only `[Products.PE]`, you must expand it to include PaaS:
```diff
- products: [Products.PE]
+ products: [Products.PE, Products.PAAS, Products.PAAS_EU]
```

### 3.3 Hide system admin / installation content (if applicable)

PaaS users are tenants — they don't install or configure the server. Hide content about:
- Self-managed installation instructions
- Backend configuration / `thingsboard.yml` settings
- System administrator operations
- Custom rule node development/deployment
- Docker commands, server startup

Choose the right approach based on scope (in order of preference):

**Option A: Separate or composable includes** — best when large sections diverge between CE/PE and Cloud. Split the include into two files (one for CE/PE, one for Cloud), or split into smaller composable pieces and assemble in each stub. Avoids JSX complexity entirely.

**Option B: `<ShowFor>` component** — best for hiding a single large section. Markdown inside renders normally (headings, `<Steps>`, lists, code blocks all work):
```mdx
import ShowFor from '~/components/ShowFor.astro';

<ShowFor product={props.product} show={[Products.CE, Products.PE]}>

## System admin section

<Steps>
1. Markdown renders normally inside the slot.
</Steps>

</ShowFor>
```

**Option C: JSX conditional** — only for **small inline content** (a sentence, a table row, an `<li>`). Markdown does NOT render inside `{condition && <>...</>}` — use HTML tags (`<h2>`, `<p>`, `<ul><li>`, `<strong>`, `<code>`, `<hr/>`, `<a href>`).

### 3.4 Add PaaS-specific content

For content that differs between PaaS and CE/PE (e.g., login instructions, cloud URLs):

```mdx
{props.product === Products.PAAS && (
<p>Open <a href="https://thingsboard.cloud/"><strong>ThingsBoard Cloud</strong></a> and sign in.</p>
)}
{props.product === Products.PAAS_EU && (
<p>Open <a href="https://eu.thingsboard.cloud/"><strong>ThingsBoard Cloud EU</strong></a> and sign in.</p>
)}
{![Products.PAAS, Products.PAAS_EU].includes(props.product) && <>
<p>Open the ThingsBoard web interface and sign in with your credentials.</p>
</>}
```

### 3.5 Host name substitution

When includes contain `localhost` or hardcoded hostnames in code examples, commands, or URLs — add product-aware conditionals using the host table above.

---

## Step 4: Fix broken links in shared includes

**Before creating stubs**, scan every shared include that will be reused by the new PaaS pages for `path='TODO'` or `path='user-guide/TBD/'` placeholder links. Fixing them in the include fixes CE, PE, and PaaS pages simultaneously.

For each TODO link:

1. Glob for the target page: `src/content/docs/docs/{guessed-path}.mdx` and `src/content/docs/docs/pe/{guessed-path}.mdx`.
2. **If the page exists** — replace `path='TODO'` with the correct path (no leading slash, no trailing slash).
3. **If the page does not exist** — convert the `<DocLink>` to bold text: `**Link Text**`.
4. **Cross-product links** (e.g., IoT Gateway pages) — use a hardcoded product prop: `<DocLink product={Products.GW} path='config/mqtt'>`. Add the `Products` import (`import { Products } from '~/models/site.models';`) if not already present.
5. For external URLs (cloud signup, etc.), use `<a href="...">` — not `<DocLink>`.
6. Use `bold={false}` on `<DocLink>` when the link appears in running text and bold styling would be distracting.

---

## Step 5: Update sidebar (`astro.sidebar.ts`)

Add entries to `paasSidebar` and `paasEuSidebar`. Mirror the PE sidebar structure:

```ts
export const paasSidebar: SidebarConfig = [
  {
    label: 'Section Name',
    translations: { uk: 'Назва' },
    items: [
      'docs/paas/{path}/{page}',
      // ...
    ],
  },
  // ... existing sections
];
```

Same for `paasEuSidebar` with `docs/paas/eu/` prefix.

**Do NOT use `mainSidebarItems()` for PaaS** — the PaaS sidebar is manually defined because not all CE/PE sections apply (no Installation tab, for example).

---

## Step 6: Verify

1. Run `pnpm build:fast` to check for build errors.
2. Navigate to the new PaaS pages in the browser to verify rendering.
3. Check that the sidebar shows all new entries.
4. Verify PE conditionals render correctly on PaaS pages.
5. Verify hidden content (installation, sysadmin) does not appear on PaaS pages.

---

## Checklist

- [ ] PaaS US stubs created for all pages
- [ ] PaaS EU stubs created for all pages
- [ ] PE-only conditionals expanded to include PAAS/PAAS_EU
- [ ] System admin / installation content hidden from PaaS
- [ ] PaaS-specific content added (cloud URLs, login instructions)
- [ ] Sidebar updated for both paasSidebar and paasEuSidebar
- [ ] All TBD/TODO links resolved
- [ ] Build passes (`pnpm build:fast`)
