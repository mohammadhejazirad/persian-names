import { ValidationOptions, CustomGenderType } from './index';

export interface GetGenderOptions extends ValidationOptions, CustomGenderType {
  genderType?: 'number' | 'stringFa' | 'stringArb';
}
