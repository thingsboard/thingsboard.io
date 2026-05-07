import { createOgEndpoint } from '../_shared/endpoint';
import { getCaseStudyCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getCaseStudyCardInputs());
