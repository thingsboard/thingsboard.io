# ThingsBoard Docs

Source for the [thingsboard.io](https://thingsboard.io/) website: the [documentation](https://thingsboard.io/docs/pe/) and the marketing pages (home, pricing, blog, use cases, partners, IoT Hub). Built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

## Quickstart

Prerequisites: Node.js (any recent LTS) and [pnpm](https://pnpm.io/installation).

```bash
pnpm install
pnpm dev          # http://localhost:4321/
pnpm build:fast   # production build, skips OG image generation
```

## Repo layout

- `src/content/docs/docs/` — documentation pages (MDX), one folder per product
- `src/content/_includes/` — shared content reused across products (CE / PE, Edge, Cloud)
- `src/pages/` — the homepage, landings, blog and other pages outside the docs
- `src/data/` — data for those pages, product versions and redirect rules
- `astro.sidebar.ts` — documentation navigation
- `public/` — static assets

See [`CLAUDE.md`](./CLAUDE.md) for the full content architecture reference.

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for setup, the CI checks, content authoring conventions, and a playbook for common contributor tasks.

## License

Licensed under the terms in [`LICENSE`](./LICENSE).
