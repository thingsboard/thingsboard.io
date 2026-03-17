---
name: tbmq-doc-review
description: Compare a migrated TBMQ MDX doc against its old Jekyll source to verify content coverage, technical accuracy, and writing quality. Use when the user asks to "compare", "verify", "check", or "review" a TBMQ page after migration — even if they just say "check basic.md" or "did I miss anything in the sessions page". Always use this skill for post-migration review rather than doing the comparison ad-hoc.
---

# TBMQ doc review

You are a technical editor verifying that a migrated TBMQ documentation page is complete, accurate, and well-written.

## Working directories

| Role | Path |
|---|---|
| Old site root | `/home/dlandiak/projects/thingsboard.github.io` |
| Old TBMQ includes | `{OLD}/_includes/docs/mqtt-broker/` |
| Old TBMQ CE wrappers | `{OLD}/docs/mqtt-broker/` |
| Old TBMQ PE wrappers | `{OLD}/docs/pe/mqtt-broker/` |
| New site root | `/home/dlandiak/projects/thingsboard.io` |
| New includes | `src/content/_includes/docs/mqtt-broker/` |

## Step 1: Resolve both sources fully

**Old doc** — follow the full Jekyll include chain:
- Read the CE wrapper (e.g. `docs/mqtt-broker/security/authentication/basic.md`) to find image collections and the `{% include %}` call
- Read the main include file (`_includes/docs/mqtt-broker/...`)
- Follow any nested `{% include %}` calls inside it (e.g. `authentication-provider-control.md`, template snippets)
- Reconstruct the full rendered content as a reader would see it

Ignore these Jekyll artifacts — they have no equivalent in the new doc:
- `{% include templates/mqtt-broker/since.md %}` — version badges
- `{% include templates/mqtt-broker-guides-banner.md %}` — Next steps banner
- `{% include templates/mqtt-broker/pe-tbmq-explore-banner.md %}` — upgrade CTA
- `* TOC\n{:toc}` — table of contents directive
- `{: .copy-code}` — copy button annotation

**New doc** — read the MDX include file (`src/content/_includes/docs/mqtt-broker/...`).

## Step 2: Compare systematically

Work through the old content section by section. For each section, answer:

1. **Coverage** — Is the same topic present in the new doc? If a section was restructured or merged, does the substance survive?
2. **Technical accuracy** — Are all technical details preserved exactly?
   - Command-line examples, flags, parameter names
   - Config field names (`pubAuthRulePatterns`, `credentialsId`, etc.)
   - Format rules, formulas, and enumerated values
   - Conditions and caveats ("only when X", "requires Y")
3. **Images** — Does every old screenshot have a corresponding image in the new doc? Is the `product` prop passed to `ImageGallery` so PE variants are resolved? When images are copied from the old Jekyll site, only the main `.png` files should be included — `*-preview.png` files must never be copied, as the new site does not use them.

## Step 3: Evaluate writing quality of the new doc

Read the new doc as a first-time reader. Flag:
- Sentences that are hard to follow or ambiguous
- Grammar or punctuation errors
- Inconsistent terminology (e.g. mixing "client ID" and "clientId" without reason)
- Violations of the ThingsBoard style guide:
  - First-person "we/our" → should be "you" or imperative
  - Banned words: easy, simple, straightforward, just, leverages, enables you to, utilize, in order to, seamless, robust, powerful, comprehensive
  - Navigation arrows: `>` should be `→`
  - External links must use `<a target="_blank" rel="noopener noreferrer">`, not bare markdown

## Step 4: Output — critical differences only

Do NOT list every minor rewording or structural improvement. Report only:

**Missing or changed content** (content from the old doc that is absent, incomplete, or technically different in the new doc)

**Technical inaccuracies** (wrong commands, wrong field names, wrong conditions)

**Image problems** (screenshots missing, wrong path, `product` prop not passed, `*-preview.png` files incorrectly copied)

**Writing issues in the new doc** (grammar errors, ambiguous sentences, style violations that a reader would notice)

Format your report as:

```
## Critical differences: {page name}

### Missing or changed content
- [section name] — [what is missing or changed]

### Technical inaccuracies
- [specific issue]

### Image problems
- [specific issue]

### Writing issues
- [specific issue]
```

If a category has no issues, omit it entirely. If there are no critical differences at all, say so explicitly: "No critical differences found."

Do not include praise or a summary of what was done well — the user only needs actionable issues.
