import {
  CustomGenderType,
  TypeData,
  ShowParamsData,
  ValidationOptions,
  SortNameOptions,
} from './index';

export interface FindNamesOptions
  extends ShowParamsData,
    TypeData,
    CustomGenderType,
    ValidationOptions,
    SortNameOptions {}
