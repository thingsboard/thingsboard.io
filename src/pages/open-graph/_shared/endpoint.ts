// Common factory for the 8 OG endpoints. Each endpoint enumerates a
// collection-specific input list and binds a `slug` route param; the only
// thing that varies is which `getXxxCardInputs()` it calls.
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderCard } from './render';
import type { CardInput } from './page-data';

export function createOgEndpoint(inputs: CardInput[]): {
	getStaticPaths: GetStaticPaths;
	GET: APIRoute;
} {
	const inputMap = new Map<string, CardInput>(inputs.map((i) => [i.slug, i]));
	const getStaticPaths: GetStaticPaths = () =>
		inputs.map(({ slug }) => ({ params: { slug } }));
	const GET: APIRoute = async ({ params }) => {
		const input = inputMap.get((params.slug as string) ?? '');
		if (!input) return new Response(null, { status: 404 });
		const png = await renderCard(input.props);
		return new Response(new Uint8Array(png), {
			headers: { 'Content-Type': 'image/png' },
		});
	};
	return { getStaticPaths, GET };
}
