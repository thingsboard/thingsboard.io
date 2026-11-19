// Prints the libuv threadpool size for `astro build`, where sharp encodes images and resvg draws OG cards.
// It has to be set before Node starts, since the pool exists before astro.config.ts loads. The default
// of 8 must match BUILD_CONCURRENCY's in astro.config.ts.
import os from 'node:os';

const concurrency = Number(process.env.BUILD_CONCURRENCY) || 8;
console.log(process.env.UV_THREADPOOL_SIZE || Math.max(concurrency, os.availableParallelism()));
