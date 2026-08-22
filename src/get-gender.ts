import { FEMALE_NAMES, MALE_NAMES, UNISEX_NAMES } from './generated-data.js';
import { normalizeName } from './normalize.js';
import type {
  GenderArabic,
  GenderEnglish,
  GenderFormat,
  GenderNumber,
  GenderPersian,
  GenderResult,
} from './types.js';

const ENGLISH_LABELS: readonly GenderEnglish[] = ['male', 'female', 'both'];
const PERSIAN_LABELS: readonly GenderPersian[] = ['مرد', 'زن', 'هر دو'];
const ARABIC_LABELS: readonly GenderArabic[] = ['ذكر', 'أنثى', 'كلاهما'];

let index: Map<string, GenderNumber> | undefined;

function assertFormat(format: unknown): asserts format is GenderFormat {
  if (
    format === 'en' ||
    format === 'fa' ||
    format === 'ar' ||
    format === 'number'
  ) {
    return;
  }

  throw new RangeError(
    `Unsupported gender format: ${String(format)}. Use "en", "fa", "ar", or "number".`
  );
}

function addNames(
  target: Map<string, GenderNumber>,
  encodedNames: string,
  gender: GenderNumber
): void {
  for (const name of encodedNames.split('|')) target.set(name, gender);
}

function getIndex(): Map<string, GenderNumber> {
  if (index) return index;

  const nextIndex = new Map<string, GenderNumber>();
  addNames(nextIndex, MALE_NAMES, 1);
  addNames(nextIndex, FEMALE_NAMES, 2);
  addNames(nextIndex, UNISEX_NAMES, 3);
  index = nextIndex;
  return nextIndex;
}

function findGender(name: unknown): GenderNumber | null {
  if (typeof name !== 'string' || !name) return null;

  const genderIndex = getIndex();
  const directMatch = genderIndex.get(name);
  if (directMatch !== undefined) return directMatch;

  const normalizedName = normalizeName(name);
  if (!normalizedName || normalizedName === name) return null;
  return genderIndex.get(normalizedName) ?? null;
}

function formatGender<Format extends GenderFormat>(
  gender: GenderNumber,
  format: Format
): GenderResult<Format> {
  if (format === 'number') return gender as GenderResult<Format>;

  const offset = gender - 1;
  if (format === 'fa') return PERSIAN_LABELS[offset] as GenderResult<Format>;
  if (format === 'ar') return ARABIC_LABELS[offset] as GenderResult<Format>;
  if (format === 'en') return ENGLISH_LABELS[offset] as GenderResult<Format>;

  throw new RangeError(`Unsupported gender format: ${String(format)}.`);
}

function getOne<Format extends GenderFormat>(
  name: unknown,
  format: Format
): GenderResult<Format> | null {
  const gender = findGender(name);
  return gender === null ? null : formatGender(gender, format);
}

/**
 * Detects the conventional gender associated with one or more Persian/Arabic
 * first names. Unknown or empty values return `null`.
 *
 * @example
 * getGender('علی') // 'male'
 * getGender('زهرا', 'fa') // 'زن'
 * getGender(['علی', 'زهرا'], 'number') // [1, 2]
 */
export function getGender<Format extends GenderFormat = 'en'>(
  name: string,
  format?: Format
): GenderResult<Format> | null;
export function getGender<Format extends GenderFormat = 'en'>(
  names: readonly string[],
  format?: Format
): Array<GenderResult<Format> | null>;
export function getGender<Format extends GenderFormat = 'en'>(
  input: string | readonly string[],
  format: Format = 'en' as Format
): GenderResult<Format> | null | Array<GenderResult<Format> | null> {
  assertFormat(format);
  if (typeof input === 'string') return getOne(input, format);
  if (Array.isArray(input)) return input.map((name) => getOne(name, format));
  return null;
}
