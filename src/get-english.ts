import { findName } from './lookup.js';

/**
 * Returns only the conventional Latin spelling of one or more given names.
 *
 * @example
 * getEnglish('علی') // 'Ali'
 * getEnglish('محمد رضا') // 'Mohammadreza'
 */
export function getEnglish(name: string): string | null;
export function getEnglish(names: readonly string[]): Array<string | null>;
export function getEnglish(
  input: string | readonly string[]
): string | null | Array<string | null> {
  if (typeof input === 'string') return findName(input)?.english ?? null;
  if (Array.isArray(input)) return input.map((name) => findName(name)?.english ?? null);
  return null;
}
