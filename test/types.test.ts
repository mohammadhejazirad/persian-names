import { getGender } from '../dist/index.js';
import type {
  GenderArabic,
  GenderEnglish,
  GenderNumber,
  GenderPersian,
} from '../dist/index.js';

const english: GenderEnglish | null = getGender('علی');
const persian: GenderPersian | null = getGender('علی', 'fa');
const arabic: GenderArabic | null = getGender('علی', 'ar');
const numeric: GenderNumber | null = getGender('علی', 'number');
const batch: Array<GenderNumber | null> = getGender(
  ['علی', 'زهرا'] as const,
  'number'
);

void [english, persian, arabic, numeric, batch];

// @ts-expect-error Unknown formats must be rejected by TypeScript.
getGender('علی', 'invalid');
