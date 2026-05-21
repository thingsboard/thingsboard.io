import type { Announcement } from '~/types/announcement';
import { Products } from '~/models/site.models';

/**
 * Per-product site-wide announcements. Each key targets a specific
 * product (CE, PE, PAAS, EDGE, …). A docs page receives the entry
 * matching its product, derived from its URL prefix. Products with no
 * entry get no banner.
 *
 * A page-level `announcement` in frontmatter still wins over the entry
 * here. After `expiresAt` passes, the entry is dropped at build time —
 * the next deploy will not ship it.
 *
 * Tip: announcements that span multiple products (same release rolled
 * out everywhere) can share a single `id` so dismissing on one product
 * also clears the same banner on the others.
 */
export const docsAnnouncements: Partial<Record<Products, Announcement>> = {
	[Products.CE]: {
		id: 'whats-new-4-3',
		version: 1,
		variant: 'info',
		eyebrow: "What's new in 4.3",
		message: '11 chart types are now available in the reports module.',
		cta: { text: 'See charts', href: '/docs/user-guide/reporting/charts/' },
		expiresAt: '2026-08-01T00:00:00Z',
		icon: true,
		dismissible: true,
	},
	[Products.PE]: {
		id: 'whats-new-4-3',
		version: 1,
		variant: 'info',
		eyebrow: "What's new in 4.3",
		message: '11 chart types are now available in the reports module.',
		cta: { text: 'See charts', href: '/docs/pe/user-guide/reporting/charts/' },
		expiresAt: '2026-08-01T00:00:00Z',
		icon: true,
		dismissible: true,
	},
	[Products.PAAS]: {
		id: 'whats-new-4-3',
		version: 1,
		variant: 'info',
		eyebrow: "What's new in 4.3",
		message: '11 chart types are now available in the reports module.',
		cta: { text: 'See charts', href: '/docs/paas/user-guide/reporting/charts/' },
		expiresAt: '2026-08-01T00:00:00Z',
		icon: true,
		dismissible: true,
	},
	[Products.PAAS_EU]: {
		id: 'whats-new-4-3',
		version: 1,
		variant: 'info',
		eyebrow: "What's new in 4.3",
		message: '11 chart types are now available in the reports module.',
		cta: { text: 'See charts', href: '/docs/paas/eu/user-guide/reporting/charts/' },
		expiresAt: '2026-08-01T00:00:00Z',
		icon: true,
		dismissible: true,
	},
	[Products.MOBILE]: {
		id: 'mobile-release-1-8-1',
		version: 1,
		variant: 'info',
		eyebrow: "What's new in Mobile 1.8.1",
		message: 'Multi-select notifications, 9 new localizations, and entity labels.',
		cta: { text: 'Read the release notes', href: '/docs/mobile/releases/' },
		expiresAt: '2026-08-01T00:00:00Z',
		icon: true,
		dismissible: true,
	},
	[Products.MOBILE_PE]: {
		id: 'mobile-release-1-8-1',
		version: 1,
		variant: 'info',
		eyebrow: "What's new in Mobile 1.8.1",
		message: 'Multi-select notifications, 9 new localizations, and entity labels.',
		cta: { text: 'Read the release notes', href: '/docs/mobile/pe/releases/' },
		expiresAt: '2026-08-01T00:00:00Z',
		icon: true,
		dismissible: true,
	},
	[Products.LICENSE]: {
		id: 'license-maintenance-2026-05-24',
		version: 1,
		variant: 'warning',
		eyebrow: 'Scheduled maintenance',
		message:
			'License Server will be unavailable on May 24, 2026 from 02:00 to 04:00 UTC for planned maintenance.',
		cta: { text: 'View status page', href: 'https://status.thingsboard.io/' },
		expiresAt: '2026-05-24T04:00:00Z',
		icon: true,
		dismissible: true,
	},
};
