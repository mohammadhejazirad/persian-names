import { UNIQUE_NAME_COUNT } from './generated-data.js';

/**
 * Returns how many canonical given names are in the catalog.
 * This does not build the formatted list that `getNames` builds.
 *
 * @example
 * countNames() // 10157
 */
export function countNames(): number {
  return UNIQUE_NAME_COUNT;
}
