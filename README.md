# Persian FirstName (JSON) 🇮🇷

Package of all Iranian (and Arabic) names

> پکیج تمامی اسامی ایرانی (و عربی)

## Using:

install:

```bash
npm install persian-names
```

```bash
yarn install persian-names
```

import:

```javascript
import { PersianNames } from 'persian-names';
```

require:

```javascript
const { PersianNames } = require('persian-names');
```

new class:

```javascript
const persianName = new PersianNames(); //using default json file

const persianName = new PersianNames('./assets/firstname.json'); //using custom json
```

---

## Examples

Validation Persian Name:

```javascript
const is_name = persianName.validation('آرش');
console.log(is_name); //true  or  false
```

using options

```javascript
const is_name = persianName.validation('امیر', {
  convertToPersian: true,
  typeCheck: 'exact',
  trimName: true,
});
console.log(is_name); //true  or  false
```

##

Get All FirstName:

```javascript
const get_names = persianName.getNames();
console.log(get_names);

/*
[
   { id: 1, name: 'اَبدەَ', gender: 1, rate: 3 },
   { id: 2, name: 'اَبیش', gender: 1, rate: 3 },
   ...
]
*/
```

using options:

```javascript
const get_names = persianName.getNames({
  genderType: 'stringFa',
  rateType: 'stringFa',
  getParamsData: {
    id: false,
    name: true,
    gender: true,
    rate: true,
  },
});
console.log(get_names);
/*
[
    { name: 'اَبدەَ', gender: 'مرد', rate: 'بسیار نادر' }
   { name: 'اَبیش', gender: 'مرد', rate: 'بسیار نادر' },
   ...
]
*/
```

Find Name:

```javascript
const find_name = persianName.findName('زهرا');
console.log(find_name);
// return { id: 2887, name: 'زهرا', gender: 2, rate: 1 }
```

using options:

```javascript
const find_name = persianName.findName('علی', {
  myTypeGender: {
    male: 'مردانه',
  },
  typeCheck: 'include',
});
```

##

Get Gender Name:

```javascript
const get_gender_name = persianName.getGenderName('سارا', {
  genderType: 'stringFa',
});
console.log(get_gender_name);
// return { gender: 'زن' }
```

Include Name:

```javascript
const include_name = persianName.includeName(
  'سلام من رضا هستم به همراه علی و احمد',
  {
    // options
  }
);
console.log(include_name);
/**  return {
  originalStr: 'سلام من رضا هستم به همراه علی و احمد',
  findNamesToStr: 'سلام من "رضا" هستم به همراه "علی" و "احمد"',
  names: [
    { id: 634, name: 'احمد', gender: 'male', rate: 1 },
    { id: 2399, name: 'رضا', gender: 'male', rate: 1 },
    { id: 3652, name: 'علی', gender: 'male', rate: 1 }
  ],
  length: 3
}
*/
```

## options:

|   **Options**    |                                  **Description**                                   |                     **type support**                      |   **Default**    |
| :--------------: | :--------------------------------------------------------------------------------: | :-------------------------------------------------------: | :--------------: |
| convertToPersian |                         convert alphabet arabic to persian                         |                     boolean,undefined                     |      false       |
|    typeCheck     |                      include type or exact type for find name                      |                     'exact','include'                     |      exact       |
|     trimName     | _trim name before validation (remove space and A-Z characters and emojis and ...)_ |                     boolean,undefined                     |      false       |
|   myTypeGender   |                 _custom gender (male,female,both) show in result_                  |    undefined, male:string, female:string, both:string,    |    undefined     |
|    genderType    |                           _convert gender name for show_                           | undefined, genderTypeFa, genderTypeNumber, genderTypeArb, | genderTypeNumber |
|     rateType     |                            _convert rate name for show_                            |           undefined, rateTypeNumber, rateTypeFa           |  rateTypeNumber  |
|  getParamsData   |                    _items that can be displayed in the output_                     |  undefined, id:bool, name:bool, gender:bool, rate:bool,   |    undefined     |

#

Rate Types:

| **value** | **number** | **stringFa** |
| :-------: | :--------: | :----------: |
|     1     |     1      |  پر کاربردی  |
|     2     |     2      |    معمولی    |
|     3     |     3      |  بسیار نادر  |

Gender Types:

| **value** | **Number** | **Fa** | **Arb** |
| :-------: | :--------: | :----: | :-----: |
|     1     |     1      |  مرد   |  مذکر   |
|     2     |     2      |   زن   |  مونث   |
|     3     |     3      |  هردو  |  هردو   |

##

##

## نکات

1- ممکن است یک سری از نام ها در این کتابخانه وجود نداشته باشد. که شما می توانید از طریق این لینک پروژه تبدیل کننده آن را دریافت کنید: [project](https://github.com/mohammadhejazirad/converExcelToSqlite_forLibrary)
که این پروژه شامل فایل اکسل آماده اسامی + کد های جاوااسکریپت برای تبدیل فایل اکسل به json است.

2- بعضی از اسامی مانند حشمت و یا احسان و... هم در مردان و هم در زنان استفاده می شود پس این کتابخانه در جواب آن به شما پاسخ 3 و یا هردو و... میدهد.

3-این کتابخانه برای سهولت در توسعه و کار کردن با آن از دیتابیس داخلی یعنی json استفاده می کند.

4- این کتابخانه تا به الان شامل 6179 عدد نام مرد و زن (عربی و فارسی) است.

5- نام هایی مثل محمد و محمدرضا و یا محمدمهدی جدا هستند و جدا حساب می شوند.

---

### مشتاق به دریافت پیشنهادات و نظرات دوستان هستم.

[✉️ email](mailto:hejazi00831@gmail.com) : hejazi00831@gmail.com

[🌐 github](https://github.com/mohammadhejazirad) : https://github.com/mohammadhejazirad
