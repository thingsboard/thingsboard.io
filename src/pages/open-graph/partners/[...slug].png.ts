import { createOgEndpoint } from '../_shared/endpoint';
import { getPartnerCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getPartnerCardInputs());
