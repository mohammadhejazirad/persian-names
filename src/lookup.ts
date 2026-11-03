import { RECORDS } from './generated-data.js';
import { MAX_NAME_LENGTH, normalizeName } from './normalize.js';
import type { GenderNumber, NameTitle } from './types.js';

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

/** @internal Latin folding shared by lookup and search. */
export function latinKey(value: string): string {
  return value.trim().toLowerCase().replace(/[\s'’_-]+/gu, '');
}

const PERSIAN_PREFIXES = ['سادات', 'سیده', 'سید'] as const;
const PERSIAN_SUFFIXES = ['سادات', 'سیده'] as const;
const LATIN_PREFIXES = [
  'seyyedeh',
  'seyedeh',
  'sayyedeh',
  'sayedeh',
  'seyyed',
  'seyed',
  'sayyed',
  'sayed',
  'sayyid',
  'sadat',
] as const;
const LATIN_SUFFIXES = ['seyyedeh', 'seyedeh', 'sayyedeh', 'sayedeh', 'sadat'] as const;

/** Spellings that are the same given name as an existing canonical record. */
const SPELLING_ALIASES = new Map<string, string>([
  ['اناهید', 'آناهید'],
  ['ارتمیس', 'آرتمیس'],
]);

function titleOf(token: string): NameTitle {
  if (
    token === 'سید' ||
    token === 'seyyed' ||
    token === 'seyed' ||
    token === 'sayyed' ||
    token === 'sayed' ||
    token === 'sayyid'
  ) {
    return 'seyed';
  }
  if (token === 'سادات' || token === 'sadat') return 'sadat';
  return 'seyedeh';
}

export interface ResolvedName {
  entry: NameEntry;
  title: NameTitle | null;
}

let listed: NameEntry[] | undefined;

/** Canonical records in dataset order. Built on the first catalog request. */
export function listNames(): readonly NameEntry[] {
  if (listed) return listed;
  listed = [...loadTables().names.values()];
  return listed;
}

function persianEntry(names: Map<string, NameEntry>, key: string): NameEntry | null {
  const direct = names.get(key);
  if (direct) return direct;
  const alias = SPELLING_ALIASES.get(key);
  return alias ? (names.get(alias) ?? null) : null;
}

function peelTitles(
  value: string,
  prefixes: readonly string[],
  suffixes: readonly string[],
  lookup: (key: string) => NameEntry | null
): ResolvedName | null {
  let current = value;
  let title: NameTitle | null = null;

  for (let step = 0; step < 3; step += 1) {
    let token = '';
    for (const prefix of prefixes) {
      if (current.startsWith(prefix) && current.length >= prefix.length + 2) {
        token = prefix;
        current = current.slice(prefix.length);
        break;
      }
    }
    if (!token) {
      for (const suffix of suffixes) {
        if (current.endsWith(suffix) && current.length >= suffix.length + 2) {
          token = suffix;
          current = current.slice(0, -suffix.length);
          break;
        }
      }
    }
    if (!token) return null;
    if (!title) title = titleOf(token);
    const entry = lookup(current);
    if (entry) return { entry, title };
  }

  return null;
}

/**
 * Resolves a Persian-script or Latin spelling to one canonical record.
 * سید، سیده، and سادات are removed only when the remainder is a known name.
 * An exact catalog spelling always wins, so an existing name is never rewritten.
 */
export function resolveName(input: unknown): ResolvedName | null {
  if (typeof input !== 'string' || input.length === 0 || input.length > MAX_NAME_LENGTH) return null;

  const { names, english } = loadTables();
  const direct = names.get(input);
  if (direct) return { entry: direct, title: null };

  const normalized = normalizeName(input);
  if (normalized.length > 0) {
    const normalizedMatch = persianEntry(names, normalized);
    if (normalizedMatch) return { entry: normalizedMatch, title: null };

    const peeled = peelTitles(normalized, PERSIAN_PREFIXES, PERSIAN_SUFFIXES, (key) =>
      persianEntry(names, key)
    );
    if (peeled) return peeled;
  }

  const latin = latinKey(input);
  if (!/^[a-z]+$/u.test(latin)) return null;
  if (english.has(latin)) {
    const entry = english.get(latin);
    return entry ? { entry, title: null } : null;
  }

  return peelTitles(latin, LATIN_PREFIXES, LATIN_SUFFIXES, (key) => {
    if (!/^[a-z]{2,}$/u.test(key) || !english.has(key)) return null;
    return english.get(key) ?? null;
  });
}

/** Resolves a Persian-script or Latin spelling to one canonical record. */
export function findName(input: unknown): NameEntry | null {
  return resolveName(input)?.entry ?? null;
}
