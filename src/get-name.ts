import { assertFormat, formatGender } from './get-gender.js';
import { findName } from './lookup.js';
import type { NationalityCode } from './lookup.js';
import type {
  GenderFormat,
  NameInfo,
  Nationality,
  NationalityArabic,
  NationalityNumber,
  NationalityPersian,
  NationalityResult,
} from './types.js';

const CODES = [
  'p',
  'a',
  't',
  'k',
  'm',
  'e',
  'x',
  'o',
  'g',
  'h',
  'l',
  'f',
  'd',
  's',
  'i',
  'n',
  'r',
  'w',
  'u',
  'v',
  'q',
  'y',
  'b',
  'c',
  'z',
  'j',
] as const;
const ENGLISH: readonly Nationality[] = [
  'persian',
  'arabic',
  'turkish',
  'kurdish',
  'mongolian',
  'armenian',
  'mixed',
  'other',
  'greek',
  'hebrew',
  'latin',
  'french',
  'german',
  'spanish',
  'italian',
  'english',
  'russian',
  'swedish',
  'finnish',
  'norse',
  'phoenician',
  'syriac',
  'aramaic',
  'celtic',
  'danish',
  'sanskrit',
];
const PERSIAN: readonly NationalityPersian[] = [
  'فارس',
  'عرب',
  'تُرک',
  'کُرد',
  'مغول',
  'ارمنی',
  'ترکیبی',
  'دیگر',
  'یونانی',
  'عبری',
  'لاتین',
  'فرانسوی',
  'آلمانی',
  'اسپانیایی',
  'ایتالیایی',
  'انگلیسی',
  'روسی',
  'سوئدی',
  'فنلاندی',
  'نورس',
  'فنیقی',
  'سریانی',
  'آرامی',
  'سلتی',
  'دانمارکی',
  'سانسکریت',
];
const ARABIC: readonly NationalityArabic[] = [
  'فارسي',
  'عربي',
  'تركي',
  'كردي',
  'مغولي',
  'أرمني',
  'مختلط',
  'آخر',
  'يوناني',
  'عبري',
  'لاتيني',
  'فرنسي',
  'ألماني',
  'إسباني',
  'إيطالي',
  'إنجليزي',
  'روسي',
  'سويدي',
  'فنلندي',
  'نورسي',
  'فينيقي',
  'سرياني',
  'آرامي',
  'سلتي',
  'دنماركي',
  'سنسكريتي',
];
const NUMBERS: readonly NationalityNumber[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
];

/** @internal */
export function formatNationality<Format extends GenderFormat>(
  code: NationalityCode,
  format: Format
): NationalityResult<Format> {
  const offset = CODES.indexOf(code);
  if (format === 'number') return NUMBERS[offset] as NationalityResult<Format>;
  if (format === 'fa') return PERSIAN[offset] as NationalityResult<Format>;
  if (format === 'ar') return ARABIC[offset] as NationalityResult<Format>;
  return ENGLISH[offset] as NationalityResult<Format>;
}

function describe<Format extends GenderFormat>(
  input: unknown,
  format: Format
): NameInfo<Format> | null {
  const entry = findName(input);
  if (!entry) return null;
  return {
    name: entry.name,
    english: entry.english,
    gender: formatGender(entry.gender, format),
    nationality: formatNationality(entry.nationality, format),
  };
}

/**
 * Returns the canonical spelling, Latin form, conventional gender, and
 * linguistic origin of one or more given names.
 *
 * @example
 * getName('علی')
 * // { name: 'علی', english: 'Ali', gender: 'male', nationality: 'arabic' }
 * getName('آرش', 'fa')
 * // { name: 'آرش', english: 'Arash', gender: 'مرد', nationality: 'فارس' }
 */
export function getName<Format extends GenderFormat = 'en'>(
  name: string,
  format?: Format
): NameInfo<Format> | null;
export function getName<Format extends GenderFormat = 'en'>(
  names: readonly string[],
  format?: Format
): Array<NameInfo<Format> | null>;
export function getName<Format extends GenderFormat = 'en'>(
  input: string | readonly string[],
  format: Format = 'en' as Format
): NameInfo<Format> | null | Array<NameInfo<Format> | null> {
  assertFormat(format);
  if (typeof input === 'string') return describe(input, format);
  if (Array.isArray(input)) return input.map((name) => describe(name, format));
  return null;
}
