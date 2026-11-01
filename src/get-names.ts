import { assertFormat, formatGender } from './get-gender.js';
import { formatNationality } from './get-name.js';
import { listNames } from './lookup.js';
import type { GenderFormat, NameInfo } from './types.js';

const cache = new Map<GenderFormat, readonly NameInfo<GenderFormat>[]>();

/**
 * Returns every canonical name and its Latin spelling, gender, and origin.
 * The list is built on the first call for each format and then reused.
 * Call this only when the whole catalog is needed.
 *
 * @example
 * getNames('fa')[0]
 * // { name: '...', english: '...', gender: 'مرد', nationality: 'فارس' }
 */
export function getNames<Format extends GenderFormat = 'en'>(
  format?: Format
): readonly NameInfo<Format>[] {
  const selected = (format ?? 'en') as Format;
  assertFormat(selected);
  const cached = cache.get(selected);
  if (cached) return cached as readonly NameInfo<Format>[];

  const rows = listNames().map((entry) =>
    Object.freeze({
      name: entry.name,
      english: entry.english,
      gender: formatGender(entry.gender, selected),
      nationality: formatNationality(entry.nationality, selected),
    })
  );
  const frozen = Object.freeze(rows) as readonly NameInfo<GenderFormat>[];
  cache.set(selected, frozen);
  return frozen as readonly NameInfo<Format>[];
}
