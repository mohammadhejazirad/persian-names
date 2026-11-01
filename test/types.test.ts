import { getEnglish, getGender, getName, getNames, getNationality, isName } from '../dist/index.js';
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
const known: boolean = isName('علی');
const knownBatch: boolean[] = isName(['علی', 'زهرا']);
const onlyOrigin: Nationality | null = getNationality('علی');
const persianOnlyOrigin: NationalityPersian | null = getNationality('روژان', 'fa');
const spelling: string | null = getEnglish('علی');
const catalog: readonly NameInfo[] = getNames();
const persianCatalog: readonly NameInfo<'fa'>[] = getNames('fa');

void [
  english,
  persian,
  arabic,
  numeric,
  batch,
  origin,
  persianOrigin,
  originCode,
  known,
  knownBatch,
  onlyOrigin,
  persianOnlyOrigin,
  spelling,
  catalog,
  persianCatalog,
];

// @ts-expect-error Unknown formats must be rejected by TypeScript.
getGender('علی', 'invalid');

// @ts-expect-error Unknown formats must be rejected by TypeScript.
getName('علی', 'invalid');
