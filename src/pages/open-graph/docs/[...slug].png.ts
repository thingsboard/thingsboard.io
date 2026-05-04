import { createOgEndpoint } from '../_shared/endpoint';
import { getDocsCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getDocsCardInputs());
