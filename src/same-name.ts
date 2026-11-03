import { findName } from './lookup.js';

/**
 * Reports whether two spellings are the same canonical given name.
 * Spacing, Arabic letter variants, and the honorifics سید، سیده، and سادات
 * are ignored. Unknown inputs are false.
 *
 * @example
 * sameName('سید علی', 'علی') // true
 * sameName('زهرا سادات', 'سیده زهرا') // true
 * sameName('علی', 'زهرا') // false
 */
export function sameName(left: string, right: string): boolean {
  const first = findName(left);
  const second = findName(right);
  return first !== null && second !== null && first.name === second.name;
}
