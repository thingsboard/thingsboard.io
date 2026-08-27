/**
 * TBMQ product site origin — single source of truth, internal TBMQ links point
 * at tbmq.io directly. The redirect story lives in src/data/redirects.ts, which
 * imports this via a plain relative path (its node-script consumers cannot
 * resolve the `@models` alias).
 *
 * Cutover note: do not deploy to production before tbmq.io resolves — until
 * then TBMQ redirects 301 to a dead host, which fails loud and self-heals at
 * cutover, unlike a cacheable 301 to the tbqa.cloud staging host that browsers
 * and crawlers would keep following long after the flip.
 */
export const TBMQ_ORIGIN = 'https://tbmq.io';

/** TBMQ site root (the landing lives at the root), with trailing slash. */
export const TBMQ_SITE_URL = `${TBMQ_ORIGIN}/`;

/**
 * TBMQ documentation root on tbmq.io. Its docs tree carries no mqtt-broker/
 * segment, so thingsboard.io's /docs/mqtt-broker/<path> lives at /docs/<path>
 * there.
 */
export const TBMQ_DOCS_URL = `${TBMQ_SITE_URL}docs/`;

/**
 * Deep link into the TBMQ docs. `path` is appended verbatim: pass page paths
 * with their trailing slash (e.g. 'installation/'), or ':splat' for dynamic
 * redirect rules — the splat capture already carries the original request's
 * trailing slash.
 */
export const tbmqDocsUrl = (path: string): string => `${TBMQ_DOCS_URL}${path}`;

/**
 * Contact page with the TBMQ subject pre-selected. The subject value must
 * match an <option> in ContactForm.astro — the prefill silently no-ops on
 * unknown values.
 */
export const TBMQ_CONTACT_US_URL = '/contact-us/?subject=TBMQ';
