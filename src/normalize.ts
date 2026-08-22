const DIACRITICS = /[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g;
const INVISIBLE_AND_SEPARATORS =
  /[\s\u200c-\u200f\u202a-\u202e\u2066-\u2069_-]+/g;

/** @internal */
export function normalizeName(value: unknown): string {
  if (typeof value !== 'string') return '';

  return value
    .normalize('NFKC')
    .trim()
    .replace(DIACRITICS, '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[أإٱ]/g, 'ا')
    .replace(INVISIBLE_AND_SEPARATORS, '');
}
