import type { CollectionEntry } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { allPages } from '~/content';
import { fetchBrandFont } from './_fetchFont';

type OGImageOptions = Awaited<ReturnType<Parameters<typeof OGImageRoute>[0]['getImageOptions']>>;

const brandFont = await fetchBrandFont();

/** Paths for all of our Markdown content we want to generate OG images for. */
// OG generation temporarily disabled — all pages fall back to /thingsboard-og.png.
// To re-enable: const paths = process.env.SKIP_OG ? [] : allPages;
const paths: typeof allPages = [];

/** An object mapping file paths to file metadata. */
const pages = Object.fromEntries(
	paths.map(
		({ filePath, id, data }) =>
			[filePath, { data, id }] as [string, Pick<CollectionEntry<'docs'>, 'data' | 'id'>]
	)
);

export const { getStaticPaths, GET } = await OGImageRoute({
	param: 'path',

	pages,

	getSlug(_, page: (typeof pages)[string]) {
		return page.id + '.webp';
	},

	getImageOptions: async (_, { data }: (typeof pages)[string]): Promise<OGImageOptions> => {
		return {
			format: 'WEBP',
			quality: 90,
			title: data.title,
			description: data.description,
			dir: 'ltr',
			logo: {
				path: './src/pages/open-graph/_images/tb-logo-white.png',
				size: [260],
			},
			border: { width: 32, side: 'inline-start' },
			padding: 80,
			bgImage: {
				path: './src/pages/open-graph/_images/background-ltr.png',
			},
			font: {
				title: {
					size: 60,
					lineHeight: 1.2,
					families: ['Obviously', 'Inter', 'Noto Sans'],
					weight: 'Medium',
					color: [255, 255, 255],
				},
				description: {
					size: 32,
					lineHeight: 1.3,
					families: ['Inter', 'Noto Sans'],
					weight: 'Normal',
					color: [191, 193, 201],
				},
			},
			fonts: [
				brandFont,
				'./src/pages/open-graph/_fonts/inter/inter-400-normal.ttf',
				'./src/pages/open-graph/_fonts/inter/inter-500-normal.ttf',
				'./src/pages/open-graph/_fonts/noto-sans/noto-400-normal.ttf',
				'./src/pages/open-graph/_fonts/noto-sans/noto-500-normal.ttf',
			].filter((val): val is string => typeof val === 'string'),
		};
	},
});
