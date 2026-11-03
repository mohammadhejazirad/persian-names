import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { getGender } from '../dist/index.js';

test('returns English labels by default', () => {
  assert.equal(getGender('علی'), 'male');
  assert.equal(getGender('زهرا'), 'female');
  assert.equal(getGender('باران'), 'both');
});

test('returns Persian, Arabic, and numeric formats', () => {
  assert.equal(getGender('علی', 'fa'), 'مرد');
  assert.equal(getGender('زهرا', 'ar'), 'أنثى');
  assert.equal(getGender('باران', 'number'), 3);
});

test('normalizes common Persian and Arabic spelling differences', () => {
  assert.equal(getGender('  عَلي  '), 'male');
  assert.equal(getGender('أحمد'), 'male');
  assert.equal(getGender('محمد رضا'), 'male');
  assert.equal(getGender('محمد‌رضا'), 'male');
});

test('expands aliases and cleans source disambiguation suffixes', () => {
  assert.equal(getGender('زائر'), 'male');
  assert.equal(getGender('زایر'), 'male');
  assert.equal(getGender('سلوی'), 'female');
  assert.equal(getGender('برید'), 'male');
});

test('preserves order and unknown values in batch lookups', () => {
  assert.deepEqual(getGender(['علی', 'ناشناخته', 'زهرا'], 'number'), [
    1,
    null,
    2,
  ]);
});

test('returns null for empty, unknown, and invalid JavaScript inputs', () => {
  assert.equal(getGender(''), null);
  assert.equal(getGender('ناشناخته'), null);
  assert.equal(getGender(null), null);
  assert.deepEqual(getGender(['علی', null]), ['male', null]);
});

test('throws a useful error for an unsupported runtime format', () => {
  assert.throws(() => getGender('علی', 'invalid'), {
    name: 'RangeError',
    message: /Unsupported gender format/,
  });
  assert.throws(() => getGender('ناشناخته', 'invalid'), RangeError);
  const huge = 'x'.repeat(5_000);
  assert.throws(() => getGender('علی', huge), (error) => {
    assert.ok(error instanceof RangeError);
    assert.match(error.message, /Unsupported gender format/);
    assert.ok(error.message.length < 120);
    return true;
  });
});

test('rejects oversized input instead of scanning it', () => {
  const huge = `علی${'ا'.repeat(200)}`;
  assert.equal(getGender(huge), null);
});

test('supports CommonJS require()', () => {
  const require = createRequire(import.meta.url);
  const commonJs = require('../dist/index.cjs');
  assert.equal(commonJs.getGender('زهرا'), 'female');
});

test('supports a direct browser global build without Node.js APIs', async () => {
  const source = await readFile(
    new URL('../dist/index.global.js', import.meta.url),
    'utf8'
  );
  const context = {};
  vm.runInNewContext(source, context);

  assert.equal(context.PersianNames.getGender('علی'), 'male');
  assert.doesNotMatch(source, /node:|require\(["'](?:fs|path|zlib)["']\)/);
});
