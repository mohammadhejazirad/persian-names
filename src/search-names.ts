import { latinKey, listNames } from './lookup.js';
import { MAX_NAME_LENGTH, normalizeName } from './normalize.js';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;
const ARABIC_SCRIPT = /[^\p{Script=Arabic}]/gu;

function clampLimit(limit: number | undefined): number {
  if (limit === undefined) return DEFAULT_LIMIT;
  if (!Number.isInteger(limit) || limit < 1) return 0;
  return Math.min(limit, MAX_LIMIT);
}

/**
 * Returns canonical Persian spellings that start with a query.
 * A Latin query matches the Latin spelling instead.
 * An empty query returns an empty list. The result is capped at 50 names.
 * Call this for suggestions. It does not build gender or origin objects.
 *
 * @example
 * searchNames('هلی') // ['هلیا', ...]
 * searchNames('ali', 5) // ['علی', ...]
 */
export function searchNames(query: string, limit?: number): readonly string[] {
  if (typeof query !== 'string' || query.length === 0 || query.length > MAX_NAME_LENGTH) return [];

  const size = clampLimit(limit);
  if (size === 0) return [];

  ARABIC_SCRIPT.lastIndex = 0;
  const persian = normalizeName(query).replace(ARABIC_SCRIPT, '');
  const latin = latinKey(query);
  const useLatin = persian.length === 0 && /^[a-z]{1,}$/u.test(latin);
  if (persian.length === 0 && !useLatin) return [];

  const matches: string[] = [];
  for (const entry of listNames()) {
    const matched = useLatin
      ? entry.english.toLowerCase().startsWith(latin)
      : entry.name.startsWith(persian);
    if (!matched) continue;
    matches.push(entry.name);
    if (matches.length === size) break;
  }
  return matches;
}
