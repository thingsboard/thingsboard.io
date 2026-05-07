import { createOgEndpoint } from '../_shared/endpoint';
import { getUseCaseCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getUseCaseCardInputs());
