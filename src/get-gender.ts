import { findName } from './lookup.js';
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

function formatLabel(format: unknown): string {
  let label: string;
  if (typeof format === 'string') label = format;
  else if (format === null) label = 'null';
  else if (typeof format === 'symbol') label = 'symbol';
  else label = typeof format;
  return label.length > 32 ? `${label.slice(0, 32)}…` : label;
}

export function assertFormat(format: unknown): asserts format is GenderFormat {
  if (format === 'en' || format === 'fa' || format === 'ar' || format === 'number') return;

  throw new RangeError(
    `Unsupported gender format: ${formatLabel(format)}. Use "en", "fa", "ar", or "number".`
  );
}

export function formatGender<Format extends GenderFormat>(
  gender: GenderNumber,
  format: Format
): GenderResult<Format> {
  if (format === 'number') return gender as GenderResult<Format>;

  const offset = gender - 1;
  if (format === 'fa') return PERSIAN_LABELS[offset] as GenderResult<Format>;
  if (format === 'ar') return ARABIC_LABELS[offset] as GenderResult<Format>;
  return ENGLISH_LABELS[offset] as GenderResult<Format>;
}

/**
 * Detects the conventional gender associated with one or more Persian/Arabic
 * first names. A unique Latin spelling is accepted too. Unknown or empty
 * values return `null`.
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
  if (typeof input === 'string') {
    const entry = findName(input);
    return entry ? formatGender(entry.gender, format) : null;
  }
  if (Array.isArray(input)) {
    return input.map((name) => {
      const entry = findName(name);
      return entry ? formatGender(entry.gender, format) : null;
    });
  }
  return null;
}
