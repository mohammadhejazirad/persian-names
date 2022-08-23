import * as fs from 'fs';
import * as path from 'path';
import colors from 'colors';
import sortArray from 'sort-array';
import {
  FindNameOptions,
  FindNamesOptions,
  GetNamesOptions,
  ValidationOptions,
  GetGenderOptions,
  includeNameOptions,
} from './types';
import Utils from './utils/utils';

export class PersianNames {
  private database: Array<any>;
  private defaultJsonData: string = path.join(
    __dirname,
    './assets/database.json'
  );
  constructor(pathJsonData?: string) {
    this.database = this._checkDatabase(pathJsonData);
  }

  private _checkDatabase(pathData?: string) {
    if (
      !fs.existsSync(pathData || this.defaultJsonData) ||
      path.extname(pathData || this.defaultJsonData) != '.json'
    ) {
      console.log(colors.white.bgRed('json Data not found'));
      return process.on('exit', () => {
        process.exit(1);
      });
    }

    try {
      const data = JSON.parse(
        fs.readFileSync(pathData || this.defaultJsonData, 'utf8')
      );
      this._checkLengthData(data);
      return data;
    } catch (error) {
      console.log(colors.red.bgRed(`Error in parsing json file: ${error}`));
    }
  }

  private _checkLengthData(database?: any): boolean {
    const dataLength = database?.length || this.database?.length;
    if (!dataLength) {
      console.log(colors.white.bgRed('json Data undefined'));
      return false;
    }
    if (dataLength == 0) {
      console.log(colors.white.bgRed('json Data is empty'));
      return false;
    }
    return true;
  }

  validation(name: string, options?: ValidationOptions): boolean {
    if (!this._checkLengthData(this.database)) return false;
    if (options?.trimName) name = Utils.trimName(name);
    if (options?.convertToPersian) name = Utils.toPersianCharsText(name);
    let is_name: boolean = false;
    if (options?.typeCheck == 'exact')
      is_name = this.database.find(item => item.name == name) ? true : false;
    if (options?.typeCheck == 'include')
      is_name = this.database.find(item => item.name.includes(name))
        ? true
        : false;

    return is_name;
  }

  getNames(options?: GetNamesOptions) {
    if (!this._checkLengthData(this.database)) return;
    const names: Array<object | any> = [];
    this.database.forEach(item => {
      let id = options?.getParamsData?.id == false ? null : item.id;
      let name = options?.getParamsData?.name == false ? null : item.name;
      let gender = options?.getParamsData?.gender == false ? null : item.gender;
      let rate = options?.getParamsData?.rate == false ? null : item.rate;
      const my_gender_type = options?.myTypeGender;
      if (gender && my_gender_type)
        gender = Utils.convertCustomGenderType(gender, my_gender_type);

      if (gender && options?.genderType && !my_gender_type)
        gender = Utils.convertGenderType(gender, options?.genderType);

      if (rate && options?.rateType)
        rate = Utils.convertRateType(rate, options?.rateType);

      let result: any = {};
      if (id) result.id = id;
      if (name) result.name = name;
      if (gender) result.gender = gender;
      if (rate) result.rate = rate;

      names.push(result);
    });
    return names;
  }

  findName(name: string, options?: FindNameOptions) {
    if (!this._checkLengthData(this.database)) return;
    const convertToPersian = options?.convertToPersian;
    const typeCheck = options?.typeCheck || 'exact';
    const genderType = options?.genderType;
    const rateType = options?.rateType;
    const getParamsData = options?.getParamsData;
    const trimName = options?.trimName;
    const my_gender_type = options?.myTypeGender;
    if (trimName) name = Utils.trimName(name);
    if (convertToPersian) name = Utils.toPersianCharsText(name);
    let name_result;

    if (typeCheck == 'exact')
      name_result = this.database.find(item => item.name == name);
    if (typeCheck == 'include')
      name_result = this.database.find(item => item.name.includes(name));

    if (!name_result) return undefined;

    if (my_gender_type)
      name_result.gender = Utils.convertCustomGenderType(
        name_result.gender,
        my_gender_type
      );

    if (genderType && !my_gender_type)
      name_result.gender = Utils.convertGenderType(
        name_result.gender,
        genderType
      );

    if (rateType)
      name_result.rate = Utils.convertRateType(name_result.rate, rateType);

    if (getParamsData) {
      if (getParamsData.id == false) delete name_result.id;
      if (getParamsData.name == false) delete name_result.name;
      if (getParamsData.gender == false) delete name_result.gender;
      if (getParamsData.rate == false) delete name_result.rate;
    }
    return name_result;
  }

  findNames(names: string[] | string, options?: FindNamesOptions) {
    if (!this._checkLengthData(this.database)) return;
    const convertToPersian = options?.convertToPersian;
    const typeCheck = options?.typeCheck || 'exact';
    const genderType = options?.genderType;
    const rateType = options?.rateType;
    const getParamsData = options?.getParamsData;
    const trimName = options?.trimName;
    const sortParam = options?.sortParam;
    const my_gender_type = options?.myTypeGender;

    let get_name: any = [];

    if (typeof names == 'string') names = [names];

    names = names.filter((name: string, index: number) => {
      return names.indexOf(name) == index;
    });

    names.forEach((name: string) => {
      let to_name;
      if (trimName) name = Utils.trimName(name);
      if (convertToPersian) name = Utils.toPersianCharsText(name);
      if (typeCheck == 'exact')
        to_name = this.database.find(item => item.name == name);
      if (typeCheck == 'include')
        to_name = this.database.find(item => item.name.includes(name));
      if (!to_name) return;

      console.log(to_name);

      if (my_gender_type)
        to_name.gender = Utils.convertCustomGenderType(
          to_name.gender,
          my_gender_type
        );

      if (genderType && !my_gender_type)
        to_name.gender = Utils.convertGenderType(to_name.gender, genderType);

      if (rateType)
        to_name.rate = Utils.convertRateType(to_name.rate, rateType);

      if (getParamsData) {
        if (getParamsData.id == false) delete to_name.id;
        if (getParamsData.name == false) delete to_name.name;
        if (getParamsData.gender == false) delete to_name.gender;
        if (getParamsData.rate == false) delete to_name.rate;
      }

      get_name.push(to_name);
    });

    if (sortParam)
      get_name = sortArray(get_name, {
        order: sortParam.sortType || 'asc',
        by: sortParam.sortBy || 'name',
      });

    return get_name;
  }

  getGender(name: string | string[], options?: GetGenderOptions) {
    if (!this._checkLengthData(this.database)) return;
    const trimName = options?.trimName;
    const convertToPersian = options?.convertToPersian;
    const gender = options?.genderType;
    const typeCheck = options?.typeCheck || 'exact';
    const my_gender_type = options?.myTypeGender;
    const get_name: any = [];
    let typeName = 'string[]';

    if (typeof name == 'string') {
      typeName = 'string';
      name = [name];
    }

    name = name.filter((item: string, index: number) => {
      return name.indexOf(item) == index;
    });

    name.forEach((name: string) => {
      if (trimName) name = Utils.trimName(name);
      if (convertToPersian) name = Utils.toPersianCharsText(name);

      let to_name;
      if (typeCheck == 'exact')
        to_name = this.database.find(item => item.name == name);
      if (typeCheck == 'include')
        to_name = this.database.find(item => item.name.includes(name));
      if (!to_name) return;

      if (my_gender_type)
        to_name.gender = Utils.convertCustomGenderType(
          to_name.gender,
          my_gender_type
        );

      if (gender && !my_gender_type)
        to_name.gender = Utils.convertGenderType(to_name.gender, gender);

      delete to_name.id;
      delete to_name.name;
      delete to_name.rate;

      get_name.push(to_name);
    });

    if (typeName == 'string') return get_name[0];
    return get_name;
  }

  includeName(str: string, options?: includeNameOptions) {
    if (!this._checkLengthData(this.database)) return;
    const names: any = [];
    let find_str_name: string = str;
    const convertToPersian = options?.convertToPersian;
    const genderType = options?.genderType;
    const rateType = options?.rateType;
    const getParamsData = options?.getParamsData;
    const trimName = options?.trimName;
    const my_gender_type = options?.myTypeGender;

    if (trimName) str = Utils.trimName(str);
    if (convertToPersian) str = Utils.toPersianCharsText(str);

    this.database.forEach((item: any) => {
      if (str.search(item.name) <= 0) return;
      if (my_gender_type)
        item.gender = Utils.convertCustomGenderType(
          item.gender,
          my_gender_type
        );

      if (genderType && !my_gender_type)
        item.gender = Utils.convertGenderType(item.gender, genderType);

      if (rateType) item.rate = Utils.convertRateType(item.rate, rateType);

      if (getParamsData) {
        if (getParamsData.id == false) delete item.id;
        if (getParamsData.name == false) delete item.name;
        if (getParamsData.gender == false) delete item.gender;
        if (getParamsData.rate == false) delete item.rate;
      }
      find_str_name = find_str_name.replace(item.name, `"${item.name}"`);
      names.push(item);
    });

    return {
      originalStr: str,
      findNamesToStr: find_str_name,
      names: names,
      length: names.length,
    };
  }
}
