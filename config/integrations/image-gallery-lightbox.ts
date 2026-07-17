import type { AstroIntegration } from 'astro';

/**
 * Site-wide lazy loader for the `<ImageGallery>` PhotoSwipe lightbox.
 *
 * A hoisted `<script>` in `ImageGallery.astro` is unreliable: Astro can drop it
 * when the component renders only inside a conditional slot (e.g. `<ShowFor>`),
 * leaving thumbnails as plain `<a>` navigation. This loader ships ~100 bytes in
 * the shared page bundle and dynamically imports the lightbox module only when
 * the page actually contains a gallery.
 */
export function imageGalleryLightbox(): AstroIntegration {
	return {
		name: 'image-gallery-lightbox',
		hooks: {
			'astro:config:setup'({ injectScript }) {
				injectScript(
					'page',
					"if (document.querySelector('.image-gallery')) import('@root/scripts/image-gallery-lightbox');"
				);
			},
		},
	};
}
