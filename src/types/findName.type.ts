import {
  CustomGenderType,
  TypeData,
  ShowParamsData,
  ValidationOptions,
} from './index';

export interface FindNameOptions
  extends ShowParamsData,
    TypeData,
    CustomGenderType,
    ValidationOptions {}
