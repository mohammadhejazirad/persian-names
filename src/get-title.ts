import { resolveName } from './lookup.js';
import type { NameTitle } from './types.js';

/**
 * Returns the honorific that was ignored while detecting a given name.
 * سید is `seyed`, سیده is `seyedeh`, and سادات is `sadat`.
 * A known name with no honorific, or an unknown string, returns `null`.
 * When both سیده and سادات are present, the first removed title is returned.
 * The title never changes the gender of the remaining name.
 *
 * @example
 * getTitle('سیدعلی') // 'seyed'
 * getTitle('زهرا سادات') // 'sadat'
 * getTitle('علی') // null
 */
export function getTitle(name: string): NameTitle | null;
export function getTitle(names: readonly string[]): Array<NameTitle | null>;
export function getTitle(
  input: string | readonly string[]
): NameTitle | null | Array<NameTitle | null> {
  if (typeof input === 'string') return resolveName(input)?.title ?? null;
  if (Array.isArray(input)) return input.map((name) => resolveName(name)?.title ?? null);
  return null;
}
