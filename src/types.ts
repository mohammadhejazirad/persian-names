/** Numeric gender codes kept compatible with persian-names v1. */
export type GenderNumber = 1 | 2 | 3;

/**
 * Honorific removed before gender and name detection.
 * `seyed` is سید, `seyedeh` is سیده, and `sadat` is سادات.
 * The title does not change the gender of the remaining given name.
 */
export type NameTitle = 'seyed' | 'seyedeh' | 'sadat';

export type GenderEnglish = 'male' | 'female' | 'both';

export type GenderPersian = 'مرد' | 'زن' | 'هر دو';

export type GenderArabic = 'ذكر' | 'أنثى' | 'كلاهما';

/** Output language accepted by getGender and getName. */
export type GenderFormat = 'en' | 'fa' | 'ar' | 'number';

/** Resolves a format literal to its exact gender type. */
export type GenderResult<Format extends GenderFormat> = Format extends 'number'
  ? GenderNumber
  : Format extends 'fa'
    ? GenderPersian
    : Format extends 'ar'
      ? GenderArabic
      : GenderEnglish;

/**
 * Conventional linguistic root of the name form, not a person's nationality.
 * Codes 1–8 stay stable. Later codes are appended.
 */
export type Nationality =
  | 'persian'
  | 'arabic'
  | 'turkish'
  | 'kurdish'
  | 'mongolian'
  | 'armenian'
  | 'mixed'
  | 'other'
  | 'greek'
  | 'hebrew'
  | 'latin'
  | 'french'
  | 'german'
  | 'spanish'
  | 'italian'
  | 'english'
  | 'russian'
  | 'swedish'
  | 'finnish'
  | 'norse'
  | 'phoenician'
  | 'syriac'
  | 'aramaic'
  | 'celtic'
  | 'danish'
  | 'sanskrit';

export type NationalityPersian =
  | 'فارس'
  | 'عرب'
  | 'تُرک'
  | 'کُرد'
  | 'مغول'
  | 'ارمنی'
  | 'ترکیبی'
  | 'دیگر'
  | 'یونانی'
  | 'عبری'
  | 'لاتین'
  | 'فرانسوی'
  | 'آلمانی'
  | 'اسپانیایی'
  | 'ایتالیایی'
  | 'انگلیسی'
  | 'روسی'
  | 'سوئدی'
  | 'فنلاندی'
  | 'نورس'
  | 'فنیقی'
  | 'سریانی'
  | 'آرامی'
  | 'سلتی'
  | 'دانمارکی'
  | 'سانسکریت';

export type NationalityArabic =
  | 'فارسي'
  | 'عربي'
  | 'تركي'
  | 'كردي'
  | 'مغولي'
  | 'أرمني'
  | 'مختلط'
  | 'آخر'
  | 'يوناني'
  | 'عبري'
  | 'لاتيني'
  | 'فرنسي'
  | 'ألماني'
  | 'إسباني'
  | 'إيطالي'
  | 'إنجليزي'
  | 'روسي'
  | 'سويدي'
  | 'فنلندي'
  | 'نورسي'
  | 'فينيقي'
  | 'سرياني'
  | 'آرامي'
  | 'سلتي'
  | 'دنماركي'
  | 'سنسكريتي';

/**
 * 1 persian, 2 arabic, 3 turkish, 4 kurdish, 5 mongolian, 6 armenian,
 * 7 mixed, 8 other, 9 greek, 10 hebrew, 11 latin, 12 french, 13 german,
 * 14 spanish, 15 italian, 16 english, 17 russian, 18 swedish, 19 finnish,
 * 20 norse, 21 phoenician, 22 syriac, 23 aramaic, 24 celtic, 25 danish,
 * 26 sanskrit.
 */
export type NationalityNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26;

export type NationalityResult<Format extends GenderFormat> = Format extends 'number'
  ? NationalityNumber
  : Format extends 'fa'
    ? NationalityPersian
    : Format extends 'ar'
      ? NationalityArabic
      : Nationality;

export interface NameInfo<Format extends GenderFormat = 'en'> {
  /** Canonical Persian-script spelling. */
  name: string;
  /** Conventional Latin spelling. */
  english: string;
  gender: GenderResult<Format>;
  nationality: NationalityResult<Format>;
}
