import { findName } from './lookup.js';

/**
 * Reports whether a spelling is a known given name.
 * A unique Latin spelling is accepted. Ambiguous Latin spellings are not.
 * Unknown, empty, and non-string values are false. Nothing else is returned.
 *
 * @example
 * isName('علی') // true
 * isName('ناشناخته') // false
 * isName('Arash') // false
 */
export function isName(name: string): boolean;
export function isName(names: readonly string[]): boolean[];
export function isName(input: string | readonly string[]): boolean | boolean[] {
  if (typeof input === 'string') return findName(input) !== null;
  if (Array.isArray(input)) return input.map((name) => findName(name) !== null);
  return false;
}
