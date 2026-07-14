// Per-page-render "first content image" flag, backed by Astro.locals (one
// object per page render, so it's safe under concurrent builds — a
// module-level counter would leak across pages).
//
// The first content image on a docs page is its most likely LCP element, so
// the claimer renders it eager while everything after stays lazy. Deliberately
// no fetchpriority boost — see the consumers (DocImage, ImageGallery) for why.

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace App {
		interface Locals {
			firstContentImageClaimed?: boolean;
		}
	}
}

export function claimFirstContentImage(locals: App.Locals): boolean {
	if (locals.firstContentImageClaimed) return false;
	locals.firstContentImageClaimed = true;
	return true;
}
