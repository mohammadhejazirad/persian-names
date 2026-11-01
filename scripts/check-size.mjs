import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';

const LIMIT = 76 * 1024;
const files = ['dist/index.js', 'dist/index.cjs', 'dist/index.global.js'];
let failed = false;

for (const file of files) {
  const contents = await readFile(new URL(`../${file}`, import.meta.url));
  const gzipBytes = gzipSync(contents, { level: 9 }).byteLength;
  console.log(`${file}: ${(gzipBytes / 1024).toFixed(2)} KiB gzip`);
  if (gzipBytes > LIMIT) failed = true;
}

if (failed) {
  throw new RangeError(`A bundle exceeded the ${(LIMIT / 1024).toFixed(0)} KiB gzip limit.`);
}
