# Migrate Rule Nodes

Migrate individual rule node pages from the old ThingsBoard Jekyll site to the new Astro + Starlight reference section.

---

## Step 0: Gather information

Before doing anything else:

1. **Ask the user** for the path to the old website repository if not already provided:
   > "What is the path to the old website repository on your system? (e.g. `/path/to/website`)"

2. **Ask clarifying questions** — do not assume. Examples:
   - Which node(s) are being migrated? (name and category: filter / enrichment / transformation / action / external / flow / analytics)
   - Is this a PE-only node? (analytics nodes typically are)
   - Are there any known outdated sections in the old page that should be omitted?
   - Are there related pages this node should link to (e.g. templatization, message-types, device-profiles)?

Only proceed once the answers are clear.

---

## Step 1: Read the source

Old site rule node includes live at:
```
{OLD_WEBSITE_PATH}/_includes/docs/user-guide/rule-engine-2-0/nodes/{category}/{node}.md
```

Categories match the directory names: `filter`, `enrichment`, `transformation`, `action`, `external`, `flow`, `analytics`.

Read the source file in full. Identify:
- All configuration fields and their descriptions
- The processing algorithm (how messages flow through the node)
- Outgoing message changes (data and metadata modifications)
- Output connections and their conditions
- Examples (incoming → config → outgoing)
- Whether the node emits one or multiple outputs per input
- Whether the node is PE/Cloud-only

**Do not skip content.** The old source is often richer than it appears — it may have multiple examples, detailed field explanations, and edge-case notes that must be preserved.

---

## Step 2: Create the include file

Path:
```
src/content/_includes/docs/reference/rule-engine/nodes/{category}/{node}.mdx
```

Required imports (always include both):
```mdx
import DocLink from '@components/DocLink.astro';
import { Aside } from '@astrojs/starlight/components';
```

### Section order (mandatory)

Every node page must follow this exact order:

1. **Intro** (2–3 sentences, no heading) — describe *when* and *why* to use this node. Name the concrete problem it solves. Do not use "Why use X?" headings — fold intent into the intro.

2. **`## Configuration`** — document every configuration field. Use a **markdown table** for simple scalar fields. Use **bullet points with sub-items** for complex fields that have nested options or conditional behavior. Always include:
   - Field name (bold)
   - Whether it is required or optional
   - Full description including default value, accepted values, and edge cases
   - A DocLink to templatization wherever the field supports `${metadata.key}` or `${data.key}` substitution

3. **`## Message processing algorithm`** (or `## Message processing`) — numbered list of the exact steps the node takes for each incoming message. Copy and adapt from the source. Do not simplify.

4. **`## Outgoing message format`** — only include this section when the node modifies message data or metadata. Use tables to describe each added/changed field. Split into sub-sections for success vs. failure if they differ.

5. **`## Output connections`** — markdown table with two columns: `Connection` and `Condition`. List every output label the node can emit.

6. **`## Examples`** — one or more concrete examples. Structure:
   - Brief scenario description (one sentence)
   - **Incoming message** (data + metadata as separate fenced code blocks)
   - **Node configuration** (fenced JSON code block)
   - **Outgoing message** (data + metadata) with routing annotation
   - One-sentence explanation of what happened

7. **`## JSON schema`** — the node's JSON configuration schema. Always placed **last**, after all examples. Always collapsible.

### Code block rules

- All example JSON (incoming, config, outgoing): `maxLines=15 collapsible` or `maxLines=20 collapsible` (use 20+ for complex nested JSON)
- All example scripts (TBEL/JS): `maxLines=20 collapsible`
- JSON schema blocks: `maxLines=20 collapsible` (or `maxLines=25 collapsible` for large schemas)
- **Never put a bare JSON schema inside a `### JSON schema` sub-section** — it must always be a top-level `## JSON schema` section at the very end

---

## Step 3: Key conventions

### Templatization links

Whenever a configuration field supports `${metadata.key}` or `${data.key}` substitution, add this DocLink in the description:

```mdx
Supports <DocLink product={props.product} path="reference/rule-engine/templatization">templatization</DocLink> — use `${metadata.key}` and `${data.key}` to build dynamic values.
```

Fields that commonly support templatization:
- Alarm type
- Alarm severity pattern
- REST API URL pattern
- HTTP header keys and values
- Any "pattern" field

### Script sandboxing note

For any node that executes a TBEL or JavaScript script, always add this Aside immediately after explaining the script signature:

```mdx
<Aside type="note">
  Scripts run in a sandboxed environment. Importing or calling external libraries is not supported — all logic must be self-contained within the script body.
</Aside>
```

### PE-only nodes

For analytics nodes (and any other PE/Cloud-only nodes), add this Aside at the very top of the file (before any other content, after the imports):

```mdx
<Aside type="note">
  This node requires **ThingsBoard PE** or **ThingsBoard Cloud**.
</Aside>
```

### Aggregate-stream / order-sensitive nodes

For the aggregate-stream node (and any other nodes that process messages in time order), add this Aside after the processing algorithm:

```mdx
<Aside type="caution">
  This node is order-sensitive. Messages that arrive after the aggregation interval has already ended are silently ignored — the interval is not reopened. If your data may arrive out of order or delayed, use <DocLink product={props.product} path="user-guide/calculated-fields/time-series-data-aggregation">Time Series Data Aggregation</DocLink> or <DocLink product={props.product} path="user-guide/calculated-fields/related-entities-aggregation">Related Entities Aggregation</DocLink> calculated fields instead — they support data reprocessing and are not sensitive to message ordering or duplicates.
</Aside>
```

### Alarm severity — empty/invalid value

In the create-alarm node (and similar), the severity pattern field must state:

> Any other value (including an empty string) routes the message to `Failure`.

### Message type filter — link to message types reference

In the message-type-filter node, always include a DocLink:

```mdx
<DocLink product={props.product} path="reference/rule-engine/message-types">message types reference</DocLink>
```

### Rule chain node — link to device profiles

In the rule-chain node, link to device profiles when describing the "Forward to originator's default rule chain" option:

```mdx
<DocLink product={props.product} path="user-guide/device-profiles">Device Profile</DocLink>
```

---

## Step 4: Create CE and PE stubs

For each include, create two stubs.

CE stub (`src/content/docs/docs/reference/rule-engine/nodes/{category}/{node}.mdx`):
```mdx
---
title: Node Display Name
description: One-sentence description of what this node does.
---
import NodeComponent from '@includes/docs/reference/rule-engine/nodes/{category}/{node}.mdx'
import { Products } from '~/models/site.models'

<NodeComponent product={Products.CE}/>
```

PE stub (`src/content/docs/docs/pe/reference/rule-engine/nodes/{category}/{node}.mdx`):
```mdx
---
title: Node Display Name
description: One-sentence description of what this node does.
---
import NodeComponent from '@includes/docs/reference/rule-engine/nodes/{category}/{node}.mdx'
import { Products } from '~/models/site.models'

<NodeComponent product={Products.PE}/>
```

**If the description contains a colon, wrap the value in double quotes.**

---

## Step 5: Update the sidebar

Rule node reference items go in `referenceItems(prefix)` in `astro.sidebar.ts`.

The existing structure nests nodes under their category:
```ts
{
  label: 'Rule Nodes',
  items: [
    {
      label: 'Filter',
      items: [
        `${prefix}/reference/rule-engine/nodes/filter/message-type-filter`,
        // ...
      ],
    },
    {
      label: 'Enrichment',
      items: [ ... ],
    },
    // etc.
  ],
},
```

Add the new node entry under its correct category. Use the Python replacement approach from `/edit-doc` if the Edit tool fails.

---

## Step 6: Quality checklist

Before finishing, verify:

- [ ] All example JSON is in collapsible code blocks (`maxLines=N collapsible`)
- [ ] All example scripts are in collapsible code blocks
- [ ] JSON schema is at the **end** of the file as `## JSON schema` (not `### JSON schema`)
- [ ] Every cross-link to another page uses `<DocLink>` (no bare markdown links)
- [ ] Templatization DocLink added to every field that supports `${...}` substitution
- [ ] Script nodes have the sandboxing `<Aside type="note">`
- [ ] PE-only nodes have the PE requirement `<Aside type="note">` at the top
- [ ] The intro is 2–3 sentences (not a "Why use X?" section)
- [ ] Configuration section has every field from the source (nothing dropped)
- [ ] Processing algorithm is complete and numbered
- [ ] Output connections table is complete

---

## Step 7: Review and surface open questions

After writing the page, re-read it as if you are a developer integrating this node for the first time.

Output a list of questions a reader might have that are **not answered** in the new doc:

```
## Open questions (not covered in this page)

- What happens when X and Y are both enabled simultaneously?
- Is there a maximum size for the script?
- How does this node behave when the queue is full?
- ...
```

Present this list to the user so they can decide which gaps to address in follow-up edits.
