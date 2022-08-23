import { toPersianChars } from '@persian-tools/persian-tools';
import { GenderType, MyTypeGender, RateType } from '../types';

const typesOptions = require('../assets/types.json');

export default class Utils {
  public static toPersianCharsText(text: string): string {
    return toPersianChars(text) || text;
  }

  public static trimName(name: string): string {
    name = name.toLowerCase();
    name = name.replace(/\ي/g, 'ی');
    name = name.replace(/\ك/g, 'ک');
    name = name.replace(/(\ـ|\َ|\ِ|\ُ|\ً|\ٍ|\ٌ|\ْ|\ْ)/g, '');
    name = name.replace(/^\s+|^0-9+|^۰-۹|[^(آ-ی)(a-z)]+/g, '');
    name = name.replace(/[a-zA-Z]/, '');
    return name;
  }

  public static convertCustomGenderType(
    genderId: string | number,
    type: MyTypeGender
  ) {
    const [male, female, both] = [type.male, type.female, type.both];

    switch (genderId) {
      case 1:
        return male ? male : genderId;
      case 2:
        return female ? female : genderId;
      case 3:
        return both ? both : genderId;
      default:
        return genderId;
    }
  }

  public static convertGenderType(
    genderId: string | number,
    type: GenderType | string
  ): string | number {
    type = typeof type == 'string' ? type : type.gender;

    switch (type) {
      case 'number':
        if (genderId == 1) return typesOptions.genderTypeNumber[1];
        if (genderId == 2) return typesOptions.genderTypeNumber[2];
        if (genderId == 3) return typesOptions.genderTypeNumber[3];
        else return genderId;

      case 'stringEn':
        if (genderId == 1) return typesOptions.genderTypeEn[1];
        if (genderId == 2) return typesOptions.genderTypeEn[2];
        if (genderId == 3) return typesOptions.genderTypeEn[3];
        else return genderId;

      case 'stringFa':
        if (genderId == 1) return typesOptions.genderTypeFa[1];
        if (genderId == 2) return typesOptions.genderTypeFa[2];
        if (genderId == 3) return typesOptions.genderTypeFa[3];
        else return genderId;

      case 'stringArb':
        if (genderId == 1) return typesOptions.genderTypeArb[1];
        if (genderId == 2) return typesOptions.genderTypeArb[2];
        if (genderId == 3) return typesOptions.genderTypeArb[3];
        else return genderId;

      case 'stringEmoji':
        if (genderId == 1) return typesOptions.genderTypeEmoji[1];
        if (genderId == 2) return typesOptions.genderTypeEmoji[2];
        if (genderId == 2) return typesOptions.genderTypeEmoji[3];
        else return genderId;

      default:
        return genderId;
    }
  }

  public static convertRateType(
    rateId: string | number,
    type: RateType | string
  ): string | number {
    type = typeof type == 'string' ? type : type.rate;

    switch (type) {
      case 'number':
        if (rateId == 1) return typesOptions.rateTypeNumber[1];
        if (rateId == 2) return typesOptions.rateTypeNumber[2];
        if (rateId == 3) return typesOptions.rateTypeNumber[3];
        else return rateId;

      case 'stringEn':
        if (rateId == 1) return typesOptions.rateTypeEn[1];
        if (rateId == 2) return typesOptions.rateTypeEn[2];
        if (rateId == 3) return typesOptions.rateTypeEn[3];
        else return rateId;

      case 'stringFa':
        if (rateId == 1) return typesOptions.rateTypeFa[1];
        if (rateId == 2) return typesOptions.rateTypeFa[2];
        if (rateId == 3) return typesOptions.rateTypeFa[3];
        else return rateId;

      default:
        return rateId;
    }
  }
}
