/** Numeric gender codes kept compatible with persian-names v1. */
export type GenderNumber = 1 | 2 | 3;

export type GenderEnglish = 'male' | 'female' | 'both';

export type GenderPersian = 'مرد' | 'زن' | 'هر دو';

export type GenderArabic = 'ذكر' | 'أنثى' | 'كلاهما';

/** Output format accepted by getGender. */
export type GenderFormat = 'en' | 'fa' | 'ar' | 'number';

/** Resolves a format literal to its exact return type. */
export type GenderResult<Format extends GenderFormat> =
  Format extends 'number'
    ? GenderNumber
    : Format extends 'fa'
      ? GenderPersian
      : Format extends 'ar'
        ? GenderArabic
        : GenderEnglish;
