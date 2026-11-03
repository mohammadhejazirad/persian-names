import { readFile, rm, writeFile } from 'node:fs/promises';

const DIST = new URL('../dist/', import.meta.url);
const declarations = [
  'index.d.ts',
  'count-names.d.ts',
  'get-english.d.ts',
  'get-gender.d.ts',
  'get-name.d.ts',
  'get-names.d.ts',
  'get-nationality.d.ts',
  'get-title.d.ts',
  'is-name.d.ts',
  'same-name.d.ts',
  'search-names.d.ts',
  'types.d.ts',
];

await Promise.all(
  declarations.map(async (file) => {
    const source = await readFile(new URL(file, DIST), 'utf8');
    const commonJsSource = source
      .replace(/\.js(['"])/g, '.cjs$1')
      .replace(/\n\/\/# sourceMappingURL=.*$/u, '\n');
    const output = file.replace(/\.d\.ts$/u, '.d.cts');
    await writeFile(new URL(output, DIST), commonJsSource, 'utf8');
  })
);

await Promise.all(
  ['generated-data.d.ts', 'normalize.d.ts', 'lookup.d.ts'].map((file) =>
    rm(new URL(file, DIST), { force: true })
  )
);
