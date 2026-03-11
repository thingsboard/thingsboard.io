---
name: release
description: Full checklist for releasing a new ThingsBoard version. Covers version constants, upgrade instructions, releases table, and release notes.
---

# Releasing a New Version

## Files to update

| File | What to change |
|------|---------------|
| `src/data/versions.ts` | Update `CE_FULL_VER`, `PE_FULL_VER`, etc. |
| `src/models/upgrade-instructions.ts` | Prepend new entry to `UPGRADE_VERSIONS` (newest first) |
| `src/models/releases-table.ts` | Update `latestPatch` + `latestPatchDate` for the family (patch), or prepend new `ReleaseFamily` entry (new major/minor) |
| Release notes MDX files | Create or update CE + PE include files and page wrappers |

---

## Case 1 — New patch release (e.g. 4.3.0.2)

**1. `src/data/versions.ts`**

```ts
export const CE_FULL_VER = '4.3.0.2';
export const PE_FULL_VER = '4.3.0.2PE';
```

**2. `src/models/upgrade-instructions.ts`** — prepend to `UPGRADE_VERSIONS`:

```ts
{
  version: '4.3.0.2',
  displayVersion: '4.3.0.2',    // patch → keep full version
  family: '4.3',
  baseVersion: '4.3.0',          // base: X.Y.0 of this patch
  releaseDate: 'Mar 3 2026',
  // releaseDatePe: 'Mar 3 2026', // only if PE date differs
  upgradableFrom: '4.2.1.x',    // same as previous patch in this family
  prevVersionAnchor: 'v4-2-1-2', // anchor of the upgradableFrom version
  lts: true,
  patch: true,
  x: true,
  upgrade: true,
  manualVersionUpgrade: false,
  windowsZip: false,
  anchor: 'v4-3-0-2',           // v + version with dots→dashes
},
```

**Anchor format:** `v` + version with dots replaced by dashes → `4.3.0.2` → `v4-3-0-2`.

**3. `src/models/releases-table.ts`** — update the existing family entry:

```ts
{
  family: '4.3',
  latestPatch: 'v4.3.0.2',           // update
  latestPatchDate: 'Mar 3 2026',      // update
  // latestPatchDatePe: 'Mar 3 2026', // only if PE date differs
  patches: [
    { version: 'v4.3.0.2', date: 'Mar 3, 2026' }, // prepend
    { version: 'v4.3.0.1', date: 'Feb 3, 2026' },
    { version: 'v4.3.0',   date: 'Jan 20, 2026' },
  ],
  // ... rest unchanged
},
```

**4. Release notes MDX** — add a new patch section to the existing include files:

- `src/content/_includes/docs/releases/v4-3-x.mdx`
- `src/content/_includes/docs/pe/releases/v4-3-x.mdx`

---

## Case 2 — New minor/major release (e.g. 4.4.0)

**1. `src/data/versions.ts`** — update as above.

**2. `src/models/upgrade-instructions.ts`** — prepend to `UPGRADE_VERSIONS`:

```ts
{
  version: '4.4.0',
  displayVersion: '4.4',             // X.Y.0 → drop trailing .0 for display
  family: '4.4',
  // no baseVersion for X.Y.0
  releaseDate: 'Apr 1 2026',
  upgradableFrom: '4.3.0.x',
  prevVersionAnchor: 'v4-3-0-1',
  lts: false,                         // set true if this is an LTS release
  patch: false,
  x: true,
  upgrade: true,
  manualVersionUpgrade: false,
  windowsZip: false,
  anchor: 'v4-4-0',
},
```

**3. `src/models/releases-table.ts`** — prepend a new `ReleaseFamily` entry:

```ts
{
  family: '4.4',
  lts: false,                         // true if LTS
  releaseDate: 'Apr 1 2026',
  latestPatch: 'v4.4.0',
  latestPatchDate: 'Apr 1 2026',
  highlightsCe: 'Short CE feature description',
  // highlightsPe: 'Override for PE if different',
  patches: [
    { version: 'v4.4.0', date: 'Apr 1, 2026' },
  ],
},
```

**4. Create new release notes MDX files:**

- `src/content/_includes/docs/releases/v4-4-x.mdx` (CE include)
- `src/content/_includes/docs/pe/releases/v4-4-x.mdx` (PE include)
- `src/content/docs/docs/user-guide/releases-table/v4-4-x.mdx` (CE page wrapper)
- `src/content/docs/docs/pe/user-guide/releases-table/v4-4-x.mdx` (PE page wrapper)

Copy an existing `v4-3-x.mdx` as a starting template.

---

## Marking a version as vulnerable

Set `vulnerable: true` in the `UPGRADE_VERSIONS` entry — the version will be excluded from the upgrade table automatically:

```ts
{
  version: '4.3.0.0',
  // ...
  vulnerable: true,
},
```

---

## Key rules

- `UPGRADE_VERSIONS` is ordered **newest first** — always prepend.
- `RELEASE_FAMILIES` is ordered **newest first** — always prepend.
- `displayVersion`: `X.Y.0` → `X.Y`; all others keep the full version string.
- `anchor`: replace all dots with dashes, prefix `v` → `4.3.0.1` → `v4-3-0-1`.
- `upgradableFrom` for patches within same family: use `X.Y.Z.x` notation (with `.x`).
- After adding a new LTS family, check that `status` logic in `ReleasesTable.astro` correctly identifies **Active LTS** (first non-EOL LTS) vs **Maintenance LTS** (older non-EOL LTS) — it's computed automatically from `RELEASE_FAMILIES` order.
