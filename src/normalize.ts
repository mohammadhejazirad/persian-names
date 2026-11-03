const DIACRITICS = /[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g;
const INVISIBLE_AND_SEPARATORS =
  /[\s\u200c-\u200f\u202a-\u202e\u2066-\u2069_-]+/g;

/** Names, titles, and spacing beyond this length are rejected before regex work. */
export const MAX_NAME_LENGTH = 128;

/** @internal */
export function normalizeName(value: unknown): string {
  if (typeof value !== 'string' || value.length === 0 || value.length > MAX_NAME_LENGTH) return '';

  // Global regexes keep lastIndex. Reset before each use so a future test() cannot skip characters.
  DIACRITICS.lastIndex = 0;
  INVISIBLE_AND_SEPARATORS.lastIndex = 0;

  const normalized = value
    .normalize('NFKC')
    .trim()
    .replace(DIACRITICS, '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[أإٱ]/g, 'ا')
    .replace(INVISIBLE_AND_SEPARATORS, '');

  return normalized.length > MAX_NAME_LENGTH ? '' : normalized;
}
