import { createOgEndpoint } from '../_shared/endpoint';
import { getCollectionIndexInputs, getMarketingCardInputs } from '../_shared/page-data';

const inputs = [...(await getMarketingCardInputs()), ...(await getCollectionIndexInputs())];
export const { getStaticPaths, GET } = createOgEndpoint(inputs);
