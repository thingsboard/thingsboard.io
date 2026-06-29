import { createOgEndpoint } from '../_shared/endpoint';
import { getIotHubCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getIotHubCardInputs());
