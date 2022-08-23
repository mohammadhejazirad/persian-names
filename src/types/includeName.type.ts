import { ShowParamsData, TypeData, CustomGenderType } from './index';

export interface includeNameOptions
  extends ShowParamsData,
    TypeData,
    CustomGenderType {
  convertToPersian?: boolean;
  trimName?: boolean;
}
