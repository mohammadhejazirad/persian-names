import { assertFormat } from './get-gender.js';
import { formatNationality } from './get-name.js';
import { findName } from './lookup.js';
import type { GenderFormat, NationalityResult } from './types.js';

/**
 * Returns only the linguistic origin of one or more given names.
 *
 * @example
 * getNationality('علی') // 'arabic'
 * getNationality('روژان', 'fa') // 'کُرد'
 */
export function getNationality<Format extends GenderFormat = 'en'>(
  name: string,
  format?: Format
): NationalityResult<Format> | null;
export function getNationality<Format extends GenderFormat = 'en'>(
  names: readonly string[],
  format?: Format
): Array<NationalityResult<Format> | null>;
export function getNationality<Format extends GenderFormat = 'en'>(
  input: string | readonly string[],
  format: Format = 'en' as Format
): NationalityResult<Format> | null | Array<NationalityResult<Format> | null> {
  assertFormat(format);
  if (typeof input === 'string') {
    const entry = findName(input);
    return entry ? formatNationality(entry.nationality, format) : null;
  }
  if (Array.isArray(input)) {
    return input.map((name) => {
      const entry = findName(name);
      return entry ? formatNationality(entry.nationality, format) : null;
    });
  }
  return null;
}
