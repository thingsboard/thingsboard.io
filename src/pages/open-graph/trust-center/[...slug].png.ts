import { createOgEndpoint } from '../_shared/endpoint';
import { getTrustCenterCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getTrustCenterCardInputs());
