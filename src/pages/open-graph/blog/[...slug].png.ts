import { createOgEndpoint } from '../_shared/endpoint';
import { getBlogCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getBlogCardInputs());
