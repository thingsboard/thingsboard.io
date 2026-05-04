import { createOgEndpoint } from '../_shared/endpoint';
import { getCareerCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getCareerCardInputs());
