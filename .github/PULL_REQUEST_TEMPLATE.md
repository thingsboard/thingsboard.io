<!-- Thanks for contributing to the ThingsBoard documentation site! -->

## Description

<!-- What does this PR change and why? Link any related ticket or context. -->

## Type of change

<!-- Tick all that apply -->

- [ ] New / updated documentation page (`src/content/docs/**`)
- [ ] Shared include file (`src/content/_includes/**`)
- [ ] Component, layout, or styling change (`src/components/**`, `src/styles/**`)
- [ ] Landing / use-case / case-study page (`src/pages/**`, `src/data/**`)
- [ ] Redirects (`src/data/redirects.ts`)
- [ ] Version bump / release (see `release` skill)
- [ ] Build, CI, scripts, or tooling
- [ ] Other (please describe)

## Affected products

<!-- e.g. CE only, PE + PaaS, Edge, TBMQ, all products. Mention if the PaaS/EU variant is impacted. -->

## Related issues

- Closes #

## Checklist

- [ ] `pnpm check` passes (Astro / TypeScript)
- [ ] `pnpm lint:eslint` passes
- [ ] `pnpm lint:slugcheck` passes (required if pages were added/renamed/moved across languages)
- [ ] `pnpm lint:linkcheck` passes locally — required to merge; run it before requesting review (use `pnpm lint:linkcheck:nobuild` if you already ran a build)
- [ ] Renamed/removed pages have a redirect in `src/data/redirects.ts`, and `pnpm generate:redirects` was run
- [ ] No hardcoded versions — values come from `src/data/versions.ts`
- [ ] Screenshots attached for visual changes
