export interface TypeData {
  genderType?: GenderType | 'number' | 'stringFa' | 'stringArb';
  rateType?: RateType | 'number' | 'stringFa';
}

export interface GenderType {
  gender: 'number' | 'stringFa' | 'stringArb';
}

export interface RateType {
  rate: 'number' | 'stringFa';
}

export interface MyTypeGender {
  male?: string;
  female?: string;
  both?: string;
}

export interface CustomGenderType {
  myTypeGender?: {
    male?: string;
    female?: string;
    both?: string;
  };
}
