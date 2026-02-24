# Migrate Reference

Migrate API reference pages from the old ThingsBoard Jekyll site to the new Astro + Starlight site.

---

## Step 0: Gather information

Before doing anything else:

1. **Ask the user** for the path to the old website repository if not already provided:
   > "What is the path to the old website repository on your system? (e.g. `/path/to/website`)"

2. **Ask clarifying questions** — do not assume. Examples:
   - Is this a single-topic API (one page) or a multi-page group (e.g. MQTT API with getting-connected, telemetry, etc.)?
   - Are there protocol-specific behaviors (DTLS, Observe, provisioning strategies) that need special treatment?
   - Are there PE-only features that should be marked or hidden for CE?
   - Should any outdated content from the old page be omitted?
   - Are there related pages (user-guide, other API groups) this should link to?

Only proceed once the answers are clear.

---

## Step 2: Read the source

Old site reference includes live at:
```
{OLD_WEBSITE_PATH}/_includes/docs/reference/{topic}.md
```

Also check for supporting content:
```
{OLD_WEBSITE_PATH}/_includes/templates/provisioning/   ← provisioning strategy templates
{OLD_WEBSITE_PATH}/_includes/docs/user-guide/ssl/      ← DTLS/TLS credential setup
```

Read all relevant files. Identify what sections map to which new pages.

---

## Step 2: Plan the sub-page structure

A long old-site file typically splits into focused pages. Standard split for transport protocol APIs:

| Page | Content |
|------|---------|
| `getting-connected` | Connection parameters, ports, credential types table, auth examples, DTLS/TLS server config env vars, error codes |
| `telemetry` | All payload formats with field tables and examples |
| `attributes` | Publish client-side, request values, subscribe to shared updates |
| `rpc` | Server-side RPC subscribe + reply; client-side RPC if applicable |
| `claiming` | Claiming payload, field table, examples |
| `provisioning` | Provisioning strategies with request/response examples |

For gateway-style APIs (single connection proxying many devices):

| Page | Content |
|------|---------|
| `overview` | Enabling gateway mode, topic overview table, connect/disconnect |
| `telemetry` | Multi-device telemetry payload |
| `attributes` | Publish, request, subscribe |
| `rpc` | Subscribe to commands, send replies |
| `claiming` | Multi-device claiming |

For tightly scoped single-topic APIs (e.g. Sparkplug): use a single page.

Add a **diagram** whenever the topic involves a non-obvious flow:
- Connection and authentication sequence
- Message routing (gateway → ThingsBoard → downstream device)
- OTA state machine
- Provisioning handshake

---

## Step 3: Create include files

Path: `src/content/_includes/docs/reference/{group-name}/{page}.mdx`

Required imports:
```mdx
import DocLink from '@components/DocLink.astro';
import { Aside } from '@astrojs/starlight/components';
```

Follow all rules in `/edit-doc` (DocLink, Aside types, ENV variable names, simplified JSON, no bare markdown links).

---

## Step 4: Create CE and PE stubs

For each include, create two stubs:
```
src/content/docs/docs/reference/{group-name}/{page}.mdx        ← Products.CE
src/content/docs/docs/pe/reference/{group-name}/{page}.mdx     ← Products.PE
```

If the description contains a colon, wrap in double quotes.

---

## Step 5: Update the sidebar

Reference items go in `referenceItems(prefix)` in `astro.sidebar.ts`. New API groups go inside the appropriate parent (`Device API`, `Gateway API`, or top-level).

Use the Python replacement approach from `/edit-doc` if the Edit tool fails.

---

## Protocol-Specific Patterns

### MQTT
- Credential types: Access Token, X.509 Certificate, MQTT Basic
- MQTT v5: include PUBACK error codes table (14 codes, 128–153)
- Subscriptions are persistent topic subscriptions

### HTTP
- Three telemetry payload formats: single object · array without timestamps · **array with client-side timestamps** (`[{"ts":..., "values":{...}}]`)
- The third format is critical — without `ts`, records sharing the same server receive time overwrite each other

### CoAP
- UDP; ports 5683 (plain) / 5684 (DTLS)
- Subscriptions use CoAP Observe option (RFC 7641), not polling
- Only two credential types: Access Token (URL path) / X.509 (DTLS mutual auth)
- Provisioning: only access-token strategy — no MQTT Basic or X.509 provisioning via CoAP
- Tools: `coap-client` (libcoap2-bin) for plain, `coap-client-openssl` for DTLS

### LwM2M
- Object/Resource URI: `/{ObjectId}/{ObjectInstance}/{ResourceId}`; versioned: `/3_1.2/0/9`
- Four credential types: NoSec / PSK / RPK / X.509
- Three observe strategies: Single · Composite All · Composite by Object
- Notification attributes: `pmin`, `pmax`, `gt`, `lt`, `st`
- 16 RPC operations (Read, Write, Execute, Observe, ObserveCancel, etc.)
- OTA: Object 5 (firmware) / Object 9 (software)

### Gateway API
- Device must have **Is gateway** flag enabled in ThingsBoard UI
- **Overwrite activity time**: keeps downstream devices Active while gateway is connected
- All topics prefixed `v1/gateway/`; every payload includes the `device` name field
- Gateway uses standard Device API for its own telemetry/attributes/RPC

---

## Step 6: Review and surface open questions

After writing all pages, re-read the group as if you are a developer integrating this protocol for the first time.

Output a list of questions a reader might have that are **not answered** in the new docs. Format as:

```
## Open questions (not covered in this reference group)

- What happens when the device limit is reached (error handling)?
- How does ThingsBoard handle duplicate telemetry timestamps?
- Is there a maximum payload size, and what error is returned if exceeded?
- How do you debug connection issues (logging, diagnostics)?
- ...
```

Present this list to the user so they can decide which gaps to address in follow-up edits.
