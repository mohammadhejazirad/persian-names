import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { performance } from 'node:perf_hooks';
import {
  countNames,
  getEnglish,
  getGender,
  getName,
  getNames,
  getNationality,
  getTitle,
  isName,
  sameName,
  searchNames,
} from '../dist/index.js';
import { GOLD } from '../scripts/lib/gold.mjs';

const GENDER = ['', 'male', 'female', 'both'];
const PERSIAN = {
  persian: 'فارس',
  arabic: 'عرب',
  turkish: 'تُرک',
  kurdish: 'کُرد',
  mongolian: 'مغول',
  armenian: 'ارمنی',
  mixed: 'ترکیبی',
  other: 'دیگر',
  greek: 'یونانی',
  hebrew: 'عبری',
  latin: 'لاتین',
  french: 'فرانسوی',
  german: 'آلمانی',
  spanish: 'اسپانیایی',
  italian: 'ایتالیایی',
  english: 'انگلیسی',
  russian: 'روسی',
  swedish: 'سوئدی',
  finnish: 'فنلاندی',
  norse: 'نورس',
  phoenician: 'فنیقی',
  syriac: 'سریانی',
  aramaic: 'آرامی',
  celtic: 'سلتی',
  danish: 'دانمارکی',
  sanskrit: 'سانسکریت',
};
const ARABIC = {
  persian: 'فارسي',
  arabic: 'عربي',
  turkish: 'تركي',
  kurdish: 'كردي',
  mongolian: 'مغولي',
  armenian: 'أرمني',
  mixed: 'مختلط',
  other: 'آخر',
  greek: 'يوناني',
  hebrew: 'عبري',
  latin: 'لاتيني',
  french: 'فرنسي',
  german: 'ألماني',
  spanish: 'إسباني',
  italian: 'إيطالي',
  english: 'إنجليزي',
  russian: 'روسي',
  swedish: 'سويدي',
  finnish: 'فنلندي',
  norse: 'نورسي',
  phoenician: 'فينيقي',
  syriac: 'سرياني',
  aramaic: 'آرامي',
  celtic: 'سلتي',
  danish: 'دنماركي',
  sanskrit: 'سنسكريتي',
};
const NUMBER = {
  persian: 1,
  arabic: 2,
  turkish: 3,
  kurdish: 4,
  mongolian: 5,
  armenian: 6,
  mixed: 7,
  other: 8,
  greek: 9,
  hebrew: 10,
  latin: 11,
  french: 12,
  german: 13,
  spanish: 14,
  italian: 15,
  english: 16,
  russian: 17,
  swedish: 18,
  finnish: 19,
  norse: 20,
  phoenician: 21,
  syriac: 22,
  aramaic: 23,
  celtic: 24,
  danish: 25,
  sanskrit: 26,
};

test('every locked name has English, origin, and the existing gender', () => {
  for (const [name, english, origin, gender] of GOLD) {
    const info = getName(name);
    assert.ok(info);
    assert.equal(info.name, name);
    assert.equal(info.english, english);
    assert.equal(info.nationality, origin);
    assert.equal(info.gender, GENDER[gender]);
    assert.equal(getGender(name), GENDER[gender]);
    assert.equal(getName(name, 'fa')?.nationality, PERSIAN[origin]);
    assert.equal(getName(name, 'ar')?.nationality, ARABIC[origin]);
    assert.equal(getName(name, 'number')?.nationality, NUMBER[origin]);
    assert.equal(getName(name, 'number')?.gender, gender);
  }
});

test('normalizes Persian input and accepts a unique Latin spelling', () => {
  assert.deepEqual(getName('  عَلي  '), getName('علی'));
  assert.equal(getName('Ali')?.name, 'علی');
  assert.equal(getName('ali')?.gender, 'male');
  assert.equal(getName('MOHAMMAD REZA')?.name, 'محمدرضا');
  assert.equal(getGender('Zahra', 'fa'), 'زن');
  assert.equal(getName('Pasha', 'fa')?.nationality, 'تُرک');
  assert.equal(getName('ایدین')?.nationality, 'turkish');
  assert.equal(getName('آرش', 'fa')?.nationality, 'فارس');
  assert.equal(getName('Changiz')?.nationality, 'mongolian');
});

test('uses the linguistic root rather than the spelling alone', () => {
  assert.equal(getName('سارا')?.nationality, 'hebrew');
  assert.equal(getName('سارادخت')?.nationality, 'hebrew');
  assert.equal(getName('یلدا')?.nationality, 'syriac');
  assert.equal(getName('سحر')?.nationality, 'arabic');
  assert.equal(getName('سمانه')?.nationality, 'persian');
  assert.equal(getName('یاسمین')?.nationality, 'persian');
  assert.equal(getName('آناهید')?.nationality, 'persian');
  assert.equal(getName('آناهیتا')?.nationality, 'persian');
  assert.equal(getName('ژیلا')?.nationality, 'persian');
  assert.equal(getName('ارسلان')?.nationality, 'turkish');
  assert.equal(getName('طغرل')?.nationality, 'turkish');
  assert.equal(getName('سلدوز')?.nationality, 'mongolian');
  assert.equal(getName('شاهصنم')?.nationality, 'mixed');
  assert.equal(getName('بوذرجمهر')?.nationality, 'persian');
  assert.equal(getName('طهماسپ')?.nationality, 'persian');
  assert.equal(getName('سوسن')?.nationality, 'persian');
  assert.equal(getName('مینا')?.nationality, 'persian');
  assert.equal(getName('ژینوس')?.nationality, 'french');
  assert.equal(getName('هانیبال')?.nationality, 'phoenician');
  assert.equal(getName('صبرینا')?.nationality, 'celtic');
  assert.equal(getName('سابرینا')?.nationality, 'celtic');
  assert.equal(getName('مونا')?.nationality, 'celtic');
  assert.equal(getName('منا')?.nationality, 'arabic');
  assert.equal(getName('نادیا')?.nationality, 'russian');
  assert.equal(getName('نادیه')?.nationality, 'arabic');
  assert.equal(getName('داوود')?.nationality, 'arabic');
  assert.equal(getName('داوید')?.nationality, 'hebrew');
  assert.equal(getName('مریم')?.nationality, 'arabic');
  assert.equal(getName('ماریا')?.nationality, 'latin');
  assert.equal(getName('سیمون')?.nationality, 'hebrew');
  assert.equal(getName('مارتین')?.nationality, 'latin');
});

test('does not guess when several names share one Latin spelling', () => {
  assert.equal(getName('Abtin'), null);
  assert.equal(getGender('Abtin'), null);
  assert.equal(getName('آبتین')?.english, 'Abtin');
  assert.equal(getName('ابتین')?.english, 'Abtin');
  assert.equal(getName('Arash'), null);
  assert.equal(getName('آرش')?.english, 'Arash');
  assert.equal(getName('ارش')?.english, 'Arash');
});

test('keeps batch order and rejects an unknown format', () => {
  assert.deepEqual(
    getName(['علی', 'ناشناخته', 'روژان'], 'number')?.map((item) => item?.nationality ?? null),
    [2, null, 4]
  );
  assert.throws(() => getName('علی', 'invalid'), {
    name: 'RangeError',
    message: /Unsupported gender format/,
  });
});

test('answers one question without building the rest of the record', () => {
  assert.equal(isName('علی'), true);
  assert.equal(isName('  عَلي  '), true);
  assert.equal(isName('Ali'), true);
  assert.equal(isName('ناشناخته'), false);
  assert.equal(isName('Arash'), false);
  assert.equal(isName(''), false);
  assert.equal(isName(null), false);
  assert.deepEqual(isName(['علی', 'ناشناخته', 'روژان']), [true, false, true]);

  assert.equal(getNationality('علی'), 'arabic');
  assert.equal(getNationality('روژان', 'fa'), 'کُرد');
  assert.equal(getNationality('Pasha', 'fa'), 'تُرک');
  assert.equal(getNationality('ناشناخته'), null);
  assert.deepEqual(getNationality(['علی', 'ناشناخته'], 'number'), [2, null]);
  assert.throws(() => getNationality('علی', 'invalid'), {
    name: 'RangeError',
    message: /Unsupported gender format/,
  });

  assert.equal(getEnglish('علی'), 'Ali');
  assert.equal(getEnglish('محمد رضا'), 'Mohammadreza');
  assert.equal(getEnglish('ناشناخته'), null);
  assert.deepEqual(getEnglish(['علی', 'ناشناخته']), ['Ali', null]);
});

test('ignores seyed, seyedeh, and sadat without changing the given name', () => {
  assert.equal(getGender('سیدعلی'), 'male');
  assert.equal(getGender('سید علی'), 'male');
  assert.equal(getGender('سيدعلي'), 'male');
  assert.equal(getGender('سید‌علی'), 'male');
  assert.equal(getName('سیدمحمد')?.name, 'محمد');
  assert.equal(getEnglish('سید حسن'), 'Hasan');
  assert.equal(getNationality('سیدعلی'), 'arabic');
  assert.equal(getTitle('سیدعلی'), 'seyed');

  assert.equal(getGender('سیده زهرا'), 'female');
  assert.equal(getGender('سیده‌فاطمه'), 'female');
  assert.equal(getGender('سيدة مریم'), 'female');
  assert.equal(getName('سیدهزهرا')?.name, 'زهرا');
  assert.equal(getTitle('سیده زهرا'), 'seyedeh');

  assert.equal(getGender('سادات مریم'), 'female');
  assert.equal(getName('زهرا سادات')?.name, 'زهرا');
  assert.equal(getName('زهراسادات')?.english, 'Zahra');
  assert.equal(getName('فاطمه‌سادات')?.name, 'فاطمه');
  assert.equal(getGender('مریم سادات', 'fa'), 'زن');
  assert.equal(getTitle('زهرا سادات'), 'sadat');
  assert.equal(getName('سیده زهرا سادات')?.name, 'زهرا');
  assert.equal(getTitle('سیده زهرا سادات'), 'seyedeh');

  assert.equal(getGender('سیدهعلی'), 'male');
  assert.equal(getGender('سیدزهرا'), 'female');
  assert.equal(getTitle('علی'), null);
  assert.equal(getTitle('سعیده'), null);
  assert.equal(getName('سعیده')?.english, 'Saeedeh');
  assert.equal(getName('سیدا')?.name, 'سیدا');
  assert.equal(getGender('سید'), null);
  assert.equal(getGender('سیدناشناخته'), null);
  assert.deepEqual(getTitle(['سیدعلی', 'علی', 'ناشناخته']), ['seyed', null, null]);

  assert.equal(getGender('Seyed Ali'), 'male');
  assert.equal(getName('Zahra Sadat')?.name, 'زهرا');
  assert.equal(getTitle('FatemehSadat'), 'sadat');
  assert.equal(getName('Anahid')?.name, 'آناهید');
  assert.deepEqual(getName('اناهید'), getName('آناهید'));
  assert.deepEqual(getName('ارتمیس'), getName('آرتمیس'));

  assert.equal(sameName('سید علی', 'علی'), true);
  assert.equal(sameName('زهرا سادات', 'سیده زهرا'), true);
  assert.equal(sameName('  عَلي  ', 'سیدعلی'), true);
  assert.equal(sameName('علی', 'زهرا'), false);
  assert.equal(sameName('علی', 'ناشناخته'), false);
  assert.equal(sameName(null, 'علی'), false);
});

test('answers catalog questions without changing single-name lookups', () => {
  const names = getNames();
  assert.equal(countNames(), names.length);
  assert.ok(countNames() > 10_088);
  for (const item of names) {
    assert.deepEqual(getName(item.name), item);
    assert.equal(getTitle(item.name), null);
  }

  assert.deepEqual(searchNames(''), []);
  assert.deepEqual(searchNames('هلی').filter((name) => name === 'هلیا'), ['هلیا']);
  const latin = searchNames('ali', 5);
  assert.equal(latin.length, 5);
  for (const name of latin) assert.match(getEnglish(name) ?? '', /^ali/iu);
  assert.equal(searchNames('آ', 1000).length, 50);
  assert.deepEqual(searchNames('آ', 0), []);

  assert.equal(isName('پوری'), true);
  assert.equal(getGender('پوری'), 'female');
  assert.equal(getGender('دری'), 'female');
  assert.equal(getGender('پاییزه'), 'female');
  assert.equal(getName('روان')?.gender, 'both');
  assert.equal(getNationality('سوگول'), 'turkish');
  assert.equal(getNationality('شیرکو'), 'kurdish');
  assert.equal(getName('امیرعلیرضا')?.english, 'Amiralireza');
});

test('lists every name only when the whole catalog is requested', () => {
  const names = getNames();
  assert.equal(names.length, countNames());
  assert.equal(getNames(), names);
  assert.equal(Object.isFrozen(names), true);
  assert.deepEqual(
    names.find((item) => item.name === 'علی'),
    getName('علی')
  );
  assert.equal(getNames('fa').find((item) => item.name === 'روژان')?.nationality, 'کُرد');
  assert.equal(getNames('fa').find((item) => item.name === 'آیدین')?.nationality, 'تُرک');
  assert.throws(() => getNames('invalid'), {
    name: 'RangeError',
    message: /Unsupported gender format/,
  });
});

test('exposes getName from CommonJS and the browser build', async () => {
  const require = createRequire(import.meta.url);
  const commonJs = require('../dist/index.cjs');
  assert.equal(commonJs.getName('چنگیز').nationality, 'mongolian');
  assert.equal(commonJs.isName('چنگیز'), true);
  assert.equal(commonJs.getNationality('چنگیز'), 'mongolian');
  assert.equal(commonJs.getEnglish('چنگیز'), 'Changiz');

  const source = await readFile(new URL('../dist/index.global.js', import.meta.url), 'utf8');
  const context = {};
  vm.runInNewContext(source, context);
  assert.equal(context.PersianNames.getName('گارنیک', 'fa').nationality, 'ارمنی');
  assert.equal(context.PersianNames.getGender('زهرا'), 'female');
  assert.equal(context.PersianNames.isName('زهرا'), true);
  assert.equal(context.PersianNames.getEnglish('زهرا'), 'Zahra');
  assert.equal(context.PersianNames.getGender('سیدعلی'), 'male');
  assert.equal(context.PersianNames.getTitle('سیده زهرا'), 'seyedeh');
  assert.equal(context.PersianNames.sameName('زهراسادات', 'زهرا'), true);
  assert.equal(context.PersianNames.countNames(), context.PersianNames.getNames().length);
  assert.ok(context.PersianNames.searchNames('علی').includes('علی'));
});

test('looks up a hundred thousand names quickly after the index is built', () => {
  const inputs = ['علی', 'زهرا', 'آرش', 'آیدین', 'Ali', 'ناشناخته'];
  getName(inputs);
  const startedAt = performance.now();
  for (let index = 0; index < 100_000; index += 1) getName(inputs[index % inputs.length]);
  const duration = performance.now() - startedAt;
  assert.ok(duration < 2_000, `lookup took ${duration.toFixed(0)} ms`);
});
