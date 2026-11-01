import { RECORDS } from './generated-data.js';
import { normalizeName } from './normalize.js';
import type { GenderNumber } from './types.js';

export type NationalityCode =
  | 'p'
  | 'a'
  | 't'
  | 'k'
  | 'm'
  | 'e'
  | 'x'
  | 'o'
  | 'g'
  | 'h'
  | 'l'
  | 'f'
  | 'd'
  | 's'
  | 'i'
  | 'n'
  | 'r'
  | 'w'
  | 'u'
  | 'v'
  | 'q'
  | 'y'
  | 'b'
  | 'c'
  | 'z'
  | 'j';

export interface NameEntry {
  name: string;
  english: string;
  gender: GenderNumber;
  nationality: NationalityCode;
}

interface Tables {
  names: Map<string, NameEntry>;
  english: Map<string, NameEntry | null>;
}

let tables: Tables | undefined;

function loadTables(): Tables {
  if (tables) return tables;

  const names = new Map<string, NameEntry>();
  const english = new Map<string, NameEntry | null>();

  for (const row of RECORDS.split('|')) {
    const first = row.indexOf('\t');
    const second = row.indexOf('\t', first + 1);
    const name = row.slice(0, first);
    const spelling = row.slice(first + 1, second);
    const meta = row.slice(second + 1);
    const entry: NameEntry = {
      name,
      english: spelling,
      gender: Number(meta[0]) as GenderNumber,
      nationality: meta[1] as NationalityCode,
    };
    names.set(name, entry);

    const key = spelling.toLowerCase();
    english.set(key, english.has(key) ? null : entry);
  }

  tables = { names, english };
  return tables;
}

function latinKey(value: string): string {
  return value.trim().toLowerCase().replace(/[\s'’_-]+/gu, '');
}

/** Resolves a Persian-script or Latin spelling to one canonical record. */
export function findName(input: unknown): NameEntry | null {
  if (typeof input !== 'string' || input.length === 0) return null;

  const { names, english } = loadTables();
  const direct = names.get(input);
  if (direct) return direct;

  const normalized = normalizeName(input);
  if (normalized.length > 0 && normalized !== input) {
    const normalizedMatch = names.get(normalized);
    if (normalizedMatch) return normalizedMatch;
  }

  const latin = latinKey(input);
  if (!/^[a-z]+$/u.test(latin)) return null;
  return english.get(latin) ?? null;
}
