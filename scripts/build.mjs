import { rm } from 'node:fs/promises';
import { build } from 'esbuild';

const DIST = new URL('../dist', import.meta.url);
await rm(DIST, { force: true, recursive: true });

const common = {
  bundle: true,
  charset: 'utf8',
  entryPoints: ['src/index.ts'],
  legalComments: 'none',
  minify: true,
  platform: 'neutral',
  target: ['es2018'],
  treeShaking: true,
};

await Promise.all([
  build({ ...common, format: 'esm', outfile: 'dist/index.js' }),
  build({ ...common, format: 'cjs', outfile: 'dist/index.cjs' }),
  build({
    ...common,
    format: 'iife',
    globalName: 'PersianNames',
    outfile: 'dist/index.global.js',
    platform: 'browser',
  }),
]);
