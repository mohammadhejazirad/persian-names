import { PersianNames } from '../src';

const persianName = new PersianNames();

// const is_name = persianName.validation('طا', {
//   typeCheck: 'include',
// });

// console.log(is_name);

// const names = persianName.getNames({
//   myTypeGender: {
//     male: 'مردانه',
//     female: 'زنانه',
//     both: 'هردوگانه',
//   },
//   genderType: 'stringFa',
//   rateType: 'stringFa',
//   getParamsData: {
//     id: false,
//   },
// });

// console.log(names);

// const find_name = persianName.findName('حمد', {
//   myTypeGender: {
//     male: 'مردانه',
//   },
//   typeCheck: 'include',
// });
// console.log(find_name);

// const list_name = [
//   'محمد',
//   'علی',
//   'رضا',
//   'اکبر',
//   'ملیکا',
//   'زینب',
//   'زهرا',
//   'حشمت',
// ];

// const find_names = persianName.findNames('حمد', {
//   trimName: true,
//   myTypeGender: {
//     male: 'مرد',
//     female: 'زن',
//     both: 'هیچکدام',
//   },
//   typeCheck: 'include',
//   sortParam: {
//     sortBy: 'name',
//   },
// });
// console.log(find_names);

// const getGender = persianName.getGender(list_name, {
//   genderType: 'stringFa',
//   myTypeGender: {
//     male: 'man',
//     female: 'female',
//     both: 'both',
//   },
//   trimName: true,
// });
// console.log(getGender);

const includeName = persianName.includeName(
  'سلام من رضا هستم به همراه علی و احمد',
  {
    trimName: false,
    genderType: 'stringFa',
    // myTypeGender: {
    //   male: 'male',
    //   female: 'female',
    //   both: 'both',
    // },
  }
);
console.log(includeName);
