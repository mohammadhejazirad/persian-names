import { getGender, getName } from '../dist/index.js';
import type {
  GenderArabic,
  GenderEnglish,
  GenderNumber,
  GenderPersian,
  NameInfo,
  Nationality,
  NationalityNumber,
  NationalityPersian,
} from '../dist/index.js';

const english: GenderEnglish | null = getGender('علی');
const persian: GenderPersian | null = getGender('علی', 'fa');
const arabic: GenderArabic | null = getGender('علی', 'ar');
const numeric: GenderNumber | null = getGender('علی', 'number');
const batch: Array<GenderNumber | null> = getGender(
  ['علی', 'زهرا'] as const,
  'number'
);

const info: NameInfo | null = getName('علی');
const persianInfo: NameInfo<'fa'> | null = getName('آرش', 'fa');
const origin: Nationality | undefined = info?.nationality;
const persianOrigin: NationalityPersian | undefined = persianInfo?.nationality;
const originCode: NationalityNumber | undefined = getName('علی', 'number')?.nationality;

void [english, persian, arabic, numeric, batch, origin, persianOrigin, originCode];

// @ts-expect-error Unknown formats must be rejected by TypeScript.
getGender('علی', 'invalid');

// @ts-expect-error Unknown formats must be rejected by TypeScript.
getName('علی', 'invalid');
