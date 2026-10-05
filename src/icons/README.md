# Local SVG icons

`astro-icon` looks here for project-local icons, referenced as `<Icon name="filename" />`
(no collection prefix). Everything else on the site comes either from an Iconify collection
(`tabler:*`, `simple-icons:*`) or from Starlight's 275 built-ins, which
`src/components/starlight/Icon.astro` resolves before astro-icon sees them.

`thingsboard-mark` is the platform's own mark, drawn in `currentColor` so a card can knock it
out white and a drawing can ink it; the homepage visuals also import it raw for their badges.
`citus` and `valkey` are here because Simple Icons publishes neither: both were supplied as
brand SVGs and redrawn in `currentColor` so the database chips in `ScaleDuo` are all one kind
of mark.

The directory must exist even when empty — astro-icon aborts its whole setup step without it,
including the icon type definitions it generates, and warns on every dev server start.
