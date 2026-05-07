import { createOgEndpoint } from '../_shared/endpoint';
import { getDeviceCardInputs } from '../_shared/page-data';

export const { getStaticPaths, GET } = createOgEndpoint(await getDeviceCardInputs());
