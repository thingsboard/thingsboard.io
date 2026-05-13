# ThingsBoard Docs

Source for the documentation site at [thingsboard.io/docs](https://thingsboard.io/docs/), built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## Quickstart

Prerequisites: Node.js (any recent LTS) and [pnpm](https://pnpm.io/installation).

```bash
pnpm install
pnpm dev          # http://localhost:4321/docs/
pnpm build:fast   # production build, skips OG image generation
```

## Repo layout

- `src/content/docs/` — pages (Markdown / MDX, organized by language)
- `src/content/_includes/` — shared content reused across product variants (CE / PE)
- `astro.sidebar.ts` — navigation tree
- `public/` — static assets and redirect rules

See [`CLAUDE.md`](./CLAUDE.md) for the full content architecture reference.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setup, the CI checks, content authoring conventions, and a playbook for common contributor tasks.

## Links

- [thingsboard.io](https://thingsboard.io/) — product homepage
- [thingsboard.io/docs](https://thingsboard.io/docs/) — live documentation site

## License

Licensed under the terms in [`LICENSE`](./LICENSE).
