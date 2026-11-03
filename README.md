# persian-names

تشخیص سریع جنسیت، املای لاتین و خاستگاه زبانی نام‌های کوچک فارسی و عربی برای
JavaScript و TypeScript — بدون وابستگی runtime، بدون درخواست شبکه و قابل استفاده
در مرورگر و سرور.

Fast gender, Latin spelling, and linguistic origin for Persian and Arabic first
names.

## ویژگی‌ها

- `isName` فقط می‌گوید نام شناخته‌شده است یا نه
- `getGender` فقط جنسیت را برمی‌گرداند
- `getNationality` فقط خاستگاه زبانی را برمی‌گرداند
- `getEnglish` فقط املای لاتین را برمی‌گرداند
- `getName` جزئیات یک نام را یکجا برمی‌گرداند
- `getNames` فقط وقتی صدا زده شود کل فهرست را می‌سازد
- `getTitle` فقط لقب سید، سیده یا سادات را گزارش می‌کند
- `sameName` می‌گوید دو املا یک نام هستند یا نه
- `searchNames` برای پیشنهاد نام، چند مورد هم‌پیشوند برمی‌گرداند
- `countNames` فقط تعداد نام‌های فهرست را برمی‌گرداند
- شامل **۱۰٬۱۵۷ نام یکتای نرمال‌شده** از ۱۰٬۷۲۲ رکورد منبع و ۶۹ نام افزوده‌شده
- املای لاتین و خاستگاه زبانی برای تک‌تک نام‌ها
- خروجی انگلیسی، فارسی، عربی یا عددی
- پشتیبانی هم‌زمان از ESM، CommonJS و فایل global برای `<script>`
- قابل استفاده در Node.js، React، Next.js، Vue، Nuxt، Angular، AngularJS،
  Svelte، Vite، Webpack، Rollup، Bun و Deno
- lookup با میانگین زمانی `O(1)` و index داخلی lazy
- باندل ESM حدود ۷۲٫۳ KiB و باندل‌های CommonJS و global حدود ۷۲٫۶ KiB پس از gzip
- TypeScript declaration دقیق و بدون هیچ dependency در زمان اجرا
- اجرا به‌صورت آفلاین؛ نام کاربر به سرور دیگری ارسال نمی‌شود

## نصب

```bash
npm install persian-names
```

```bash
pnpm add persian-names
```

```bash
yarn add persian-names
```

```bash
bun add persian-names
```

## شروع سریع

```ts
import { getEnglish, getGender, getName, getNationality, isName } from 'persian-names';

isName('علی'); // true
isName('نام ناشناخته'); // false

getGender('علی'); // 'male'
getGender('زهرا', 'fa'); // 'زن'
getGender('باران', 'number'); // 3

getNationality('روژان', 'fa'); // 'کُرد'
getEnglish('علی'); // 'Ali'

getName('آرش', 'fa');
// { name: 'آرش', english: 'Arash', gender: 'مرد', nationality: 'فارس' }

getName('آیدین');
// { name: 'آیدین', english: 'Aydin', gender: 'male', nationality: 'turkish' }

getGender('سیدعلی'); // 'male'
getGender('سیده زهرا', 'fa'); // 'زن'
getName('زهرا سادات')?.name; // 'زهرا'
```

هر تابع فقط همان چیزی را می‌سازد که اسمش می‌گوید. برای اعتبارسنجی لازم نیست
جنسیت و خاستگاه را هم بخوانید، و برای جنسیت لازم نیست شیء کامل نام ساخته شود.
`getNames` فهرست هر ۱۰٬۱۵۷ نام را فقط در صورت فراخوانی می‌سازد و نتیجه‌ی همان
فرمت را برای دفعه‌ی بعد نگه می‌دارد.

به ساختن class یا بارگذاری فایل JSON نیازی نیست. دیتاست به‌شکل بهینه داخل build
قرار گرفته و در Node.js و مرورگر رفتار یکسانی دارد.

## API

```ts
isName(name)
isName(names)
getGender(name, format?)
getGender(names, format?)
getNationality(name, format?)
getNationality(names, format?)
getEnglish(name)
getEnglish(names)
getName(name, format?)
getName(names, format?)
getNames(format?)
getTitle(name)
getTitle(names)
sameName(left, right)
searchNames(query, limit?)
countNames()
```

| تابع | خروجی | نام ناشناخته |
| --- | --- | --- |
| `isName` | `boolean` | `false` |
| `getGender` | فقط جنسیت | `null` |
| `getNationality` | فقط خاستگاه | `null` |
| `getEnglish` | فقط املای لاتین | `null` |
| `getName` | املای معیار، لاتین، جنسیت و خاستگاه | `null` |
| `getNames` | آرایه‌ی همه‌ی نام‌ها با همان چهار فیلد | آرایه‌ی کامل |
| `getTitle` | `seyed`، `seyedeh`، `sadat` یا `null` | `null` |
| `sameName` | `boolean` | `false` |
| `searchNames` | حداکثر ۵۰ املای معیار | آرایه‌ی خالی |
| `countNames` | تعداد نام‌های فهرست | — |

پارامتر اول، به‌جز `getNames`، می‌تواند یک نام یا آرایه‌ای readonly از نام‌ها
باشد. در حالت آرایه ترتیب و تعداد ورودی‌ها حفظ می‌شود. `isName` برای عضو
ناشناخته‌ی آرایه `false` می‌دهد و بقیه‌ی تابع‌ها `null`. ورودی غیررشته، مثل
`null`، در `isName` برابر `false` و در بقیه برابر `null` است.

```ts
getGender(['علی', 'ناشناخته', 'زهرا'], 'number');
// [1, null, 2]
```

### فرمت خروجی

| `format` | مرد | زن | قابل استفاده برای هر دو | مقدار پیش‌فرض |
| --- | --- | --- | --- | --- |
| `'en'` | `'male'` | `'female'` | `'both'` | بله |
| `'fa'` | `'مرد'` | `'زن'` | `'هر دو'` | خیر |
| `'ar'` | `'ذكر'` | `'أنثى'` | `'كلاهما'` | خیر |
| `'number'` | `1` | `2` | `3` | خیر |

TypeScript بر اساس مقدار `format` نوع خروجی را دقیق inference می‌کند:

```ts
const faGender = getGender('سارا', 'fa');
// GenderPersian | null

const numericGenders = getGender(['محمد', 'مریم'] as const, 'number');
// Array<GenderNumber | null>
```

`getName` همان نرمال‌سازی و همان `format` را استفاده می‌کند. برای هر نام شناخته‌شده
شیء زیر را برمی‌گرداند:

```ts
interface NameInfo {
  name: string; // املای معیار فارسی
  english: string; // املای لاتین، مثل Ali یا Mohammadreza
  gender: GenderResult<Format>;
  nationality: NationalityResult<Format>;
}
```

```ts
getName(['علی', 'ناشناخته', 'روژان'], 'fa');
// [
//   { name: 'علی', english: 'Ali', gender: 'مرد', nationality: 'عرب' },
//   null,
//   { name: 'روژان', english: 'Rojan', gender: 'زن', nationality: 'کُرد' },
// ]
```

املای لاتین یکتا هم ورودی معتبر است: `getGender('Zahra')` و `getName('Changiz')`.
`آرش` و `ارش` هر دو `Arash` نوشته می‌شوند، پس `getName('Arash')` مقدار `null`
برمی‌گرداند.
اگر چند نام فارسی یک املای لاتین مشترک داشته باشند، جستجو با آن املا `null`
برمی‌گرداند تا بین آن‌ها حدس زده نشود.

### خاستگاه زبانی

خاستگاه، ریشه‌ی متداول خودِ صورت نام است نه ملیت یا قومیت شخص و نه لزوماً کهن‌ترین نیای واژه. برچسب `mixed` یعنی نام از بخش‌هایی با ریشه‌های متفاوت ساخته شده، مثل `امیرکوروش`. کد `other` فقط وقتی می‌ماند که برای آن صورت هیچ ریشه‌ی زبانی پیدا نشود؛ در دیتاست فعلی چنین نامی نیست. شماره‌های ۱ تا ۸ ثابت‌اند.

| `'en'` | `'fa'` | `'ar'` | `'number'` |
| --- | --- | --- | ---: |
| `persian` | `فارس` | `فارسي` | `1` |
| `arabic` | `عرب` | `عربي` | `2` |
| `turkish` | `تُرک` | `تركي` | `3` |
| `kurdish` | `کُرد` | `كردي` | `4` |
| `mongolian` | `مغول` | `مغولي` | `5` |
| `armenian` | `ارمنی` | `أرمني` | `6` |
| `mixed` | `ترکیبی` | `مختلط` | `7` |
| `other` | `دیگر` | `آخر` | `8` |
| `greek` | `یونانی` | `يوناني` | `9` |
| `hebrew` | `عبری` | `عبري` | `10` |
| `latin` | `لاتین` | `لاتيني` | `11` |
| `french` | `فرانسوی` | `فرنسي` | `12` |
| `german` | `آلمانی` | `ألماني` | `13` |
| `spanish` | `اسپانیایی` | `إسباني` | `14` |
| `italian` | `ایتالیایی` | `إيطالي` | `15` |
| `english` | `انگلیسی` | `إنجليزي` | `16` |
| `russian` | `روسی` | `روسي` | `17` |
| `swedish` | `سوئدی` | `سويدي` | `18` |
| `finnish` | `فنلاندی` | `فنلندي` | `19` |
| `norse` | `نورس` | `نورسي` | `20` |
| `phoenician` | `فنیقی` | `فينيقي` | `21` |
| `syriac` | `سریانی` | `سرياني` | `22` |
| `aramaic` | `آرامی` | `آرامي` | `23` |
| `celtic` | `سلتی` | `سلتي` | `24` |
| `danish` | `دانمارکی` | `دنماركي` | `25` |
| `sanskrit` | `سانسکریت` | `سنسكريتي` | `26` |

نوع‌های زیر نیز export شده‌اند:

```ts
import type {
  GenderArabic,
  GenderEnglish,
  GenderFormat,
  GenderNumber,
  GenderPersian,
  GenderResult,
  NameInfo,
  NameTitle,
  Nationality,
  NationalityArabic,
  NationalityNumber,
  NationalityPersian,
  NationalityResult,
} from 'persian-names';
```

## نرمال‌سازی نام

نرمال‌سازی امن و خودکار پیش از lookup انجام می‌شود. موارد زیر نتیجه‌ی یکسان دارند:

```ts
getGender('علی');
getGender('  عَلي  '); // Arabic Yeh + diacritic

getGender('محمدرضا');
getGender('محمد رضا');
getGender('محمد‌رضا'); // نیم‌فاصله
```

پردازش شامل Unicode NFKC، حذف اعراب و کشیده، یکسان‌سازی `ي/ی` و `ك/ک`،
اصلاح شکل‌های رایج الف عربی و نادیده گرفتن فاصله، نیم‌فاصله و خط تیره است.
رشته‌های بلندتر از ۱۲۸ نویسه پیش از این کار رد می‌شوند.

## لقب سید، سیده و سادات

این سه لقب بخشی از نام کوچک نیستند. اگر بعد از حذف آن‌ها یک نام شناخته‌شده
بماند، جنسیت و خاستگاه از همان نام می‌آید و لقب آن را عوض نمی‌کند. املای
معیاری که `getName` برمی‌گرداند هم همان نام، بدون لقب، است.

| ورودی | نام تشخیص‌داده‌شده | جنسیت | `getTitle` |
| --- | --- | --- | --- |
| `سیدعلی`، `سید علی`، `سيدعلي` | علی | مرد | `seyed` |
| `سیده زهرا`، `سیده‌فاطمه` | زهرا / فاطمه | زن | `seyedeh` |
| `سادات مریم`، `زهرا سادات`، `فاطمه‌سادات` | مریم / زهرا / فاطمه | زن | `sadat` |
| `سیدهعلی` | علی | مرد | `seyedeh` |
| `سیدزهرا` | زهرا | زن | `seyed` |
| `علی` یا `سعیده` | همان نام | جنسیت خود نام | `null` |

`سیده` پیش از `سید` بررسی می‌شود تا از `سیدهزهرا` فقط `سید` جدا نشود.
اگر هم `سیده` و هم `سادات` باشد، مثل `سیده زهرا سادات`، نام `زهرا` است و
`getTitle` اولین لقب حذف‌شده را برمی‌گرداند. شکل‌های لاتین `Seyed Ali` و
`Zahra Sadat` هم همین‌طور عمل می‌کنند.

نامی که خودش در فهرست است تغییر نمی‌کند. `سعیده` و `سیدا` لقب نیستند.
`sameName('سید علی', 'علی')` برابر `true` است.

`searchNames('هلی')` نام‌هایی را می‌دهد که با آن پیشوند شروع می‌شوند.
ورودی لاتین روی املای لاتین جستجو می‌کند. نتیجه‌ی پیش‌فرض ۲۰ نام است و از ۵۰
نام بیشتر نمی‌شود. پرسش خالی آرایه‌ی خالی می‌دهد. `countNames()` فقط عدد
فهرست است و شیء نام‌ها را نمی‌سازد.

## استفاده در محیط‌های مختلف

### ESM — React, Next.js, Vue, Nuxt, Angular, Svelte

همه‌ی bundlerهای مدرن می‌توانند مستقیماً named export پکیج را مصرف کنند:

```ts
import { getGender } from 'persian-names';

const gender = getGender(firstName, 'fa');
```

پکیج از APIهای Node.js مانند `fs` استفاده نمی‌کند؛ بنابراین همین import در
کامپوننت client، SSR و server component قابل استفاده است.

نمونه‌ی React:

```tsx
import { useState } from 'react';
import { getGender } from 'persian-names';

export function FirstNameField() {
  const [name, setName] = useState('');
  const gender = getGender(name, 'fa');

  return (
    <>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      {gender && <span>{gender}</span>}
    </>
  );
}
```

نمونه‌ی Vue/Nuxt:

```ts
import { computed, ref } from 'vue';
import { getGender } from 'persian-names';

const name = ref('');
const gender = computed(() => getGender(name.value, 'fa'));
```

### CommonJS — Node.js

```js
const { getGender } = require('persian-names');

console.log(getGender('مریم')); // 'female'
```

### مرورگر مستقیم و AngularJS

```html
<script src="https://cdn.jsdelivr.net/npm/persian-names@2/dist/index.global.js"></script>
<script>
  const gender = PersianNames.getGender('آرش', 'fa');
  console.log(gender); // 'مرد'
</script>
```

### Deno و Bun

```ts
// Deno
import { getGender } from 'npm:persian-names@2';

// Bun (پس از bun add persian-names)
// import { getGender } from 'persian-names';
```

## دیتاست

فایل فشرده‌ی منبع در زمان build اعتبارسنجی و به index کم‌حجم تبدیل می‌شود.
پسوندهای مخصوص تفکیک رکورد، املای جایگزین و رکوردهای تکراری در این مرحله پاک‌سازی
می‌شوند. اگر یک نام هم برای مرد و هم برای زن ثبت شده باشد، خروجی آن `both` است.

| گروه | تعداد نام یکتا |
| --- | ---: |
| فقط مرد | ۴٬۷۵۵ |
| فقط زن | ۴٬۹۶۳ |
| هر دو | ۴۳۹ |
| **مجموع** | **۱۰٬۱۵۷** |

| خاستگاه | تعداد |
| --- | ---: |
| فارس | ۷٬۷۳۱ |
| عرب | ۱٬۹۸۹ |
| ترکیبی | ۲۱۱ |
| تُرک | ۶۲ |
| کُرد | ۵۵ |
| یونانی | ۱۸ |
| لاتین | ۱۶ |
| آلمانی | ۱۱ |
| روسی | ۹ |
| عبری | ۹ |
| ایتالیایی | ۸ |
| انگلیسی | ۸ |
| اسپانیایی | ۵ |
| سانسکریت | ۴ |
| فرانسوی | ۴ |
| سلتی | ۴ |
| مغول | ۳ |
| نورس | ۲ |
| ارمنی | ۲ |
| فنلاندی | ۱ |
| دانمارکی | ۱ |
| سوئدی | ۱ |
| آرامی | ۱ |
| فنیقی | ۱ |
| سریانی | ۱ |

املای لاتین از مجموعه‌ی PNGT-26K گرفته شده و سپس یکدست و در نام‌های پرکاربرد
اصلاح شده است. جزئیات مجوز در [NOTICE](./NOTICE) است.

نام‌های پرتکرار منتشرشده توسط سازمان ثبت احوال از قبل در همین فهرست بودند.
در نسخه‌ی ۲٫۱٫۱ فقط نام‌هایی اضافه شده‌اند که در فهرست نبودند و در
[فهرست نام‌های ایرانی](https://fa.wikipedia.org/wiki/فهرست_نام‌های_ایرانی)
یا فهرست‌های نام رایج کردی، مازندرانی و آذری واقعاً به‌عنوان نام کوچک ثبت شده‌اند.
ترکیب‌های `سید`، `سیده` و `سادات` جداگانه ذخیره نمی‌شوند.

نام مرکب یک نام مستقل محسوب می‌شود؛ برای مثال `محمد` و `محمدرضا` دو ورودی جدا
هستند.

## نکته‌ی مهم درباره‌ی تشخیص جنسیت

خروجی این پکیج بیانگر کاربرد متداول یک نام در دیتاست است، نه هویت جنسیتی قطعی
یک شخص. برای فرم‌های واقعی بهتر است مقدار تشخیص‌داده‌شده قابل اصلاح باشد و از آن
برای تصمیم‌های حساس یا تبعیض‌آمیز استفاده نشود.

## تغییرات نسخه‌های ۲

تابع‌های نسخه‌ی ۲ حذف نشده‌اند. برنامه‌ای که `getGender` نسخه‌ی ۲٫۰٫۰ را صدا
می‌زند، پس از نصب ۲٫۱٫۱ همان شکل فراخوانی و برای نام‌های قبلی همان نتیجه را
دارد. نام ناشناخته همچنان `null` است و هیچ چیز در console چاپ نمی‌شود.

### ۲٫۰٫۰

- فقط یک تابع عمومی بود: `getGender(name, format?)`.
- ورودی یک نام یا آرایه است. خروجی پیش‌فرض انگلیسی است: `male`، `female`، `both`.
- `fa` مرد/زن/هر دو، `ar` ذكر/أنثى/كلاهما، و `number` مقدارهای ۱ و ۲ و ۳ را می‌دهد.
- class نسخه‌ی ۱ و متدهای `validation`، `findName`، `findNames` و `includeName` حذف شدند.
- وابستگی runtime حذف شد. همین بسته در مرورگر و سرور کار می‌کند.
- فهرست داخلی ۱۰٬۰۸۸ نام یکتا از ۱۰٬۷۲۲ رکورد بود.

### ۲٫۱٫۰

تابع‌های جدید، بدون تغییر نتیجه‌ی `getGender` برای ورودی فارسی:

| تابع | کار |
| --- | --- |
| `isName` | فقط شناخته‌بودن نام |
| `getNationality` | فقط خاستگاه زبانی |
| `getEnglish` | فقط املای لاتین |
| `getName` | نام معیار، لاتین، جنسیت و خاستگاه |
| `getNames` | کل فهرست، فقط هنگام فراخوانی |

خاستگاه، ریشه‌ی زبانی صورت نام است نه ملیت شخص. کدهای ۱ تا ۸ ثابت ماندند و
زبان‌های ۹ تا ۲۶ به آن‌ها اضافه شدند. برچسب فارسی ترکی و کردی `تُرک` و `کُرد` است.
املای لاتین یکتا، مثل `Ali`، پذیرفته می‌شود. اگر چند نام یک املای لاتین داشته
باشند نتیجه `null` است. `getGender` هم از این به بعد املای لاتین یکتا را می‌پذیرد
و نتیجه‌اش برای خط فارسی عوض نشده است.

### ۲٫۱٫۱

- `سیدعلی`، `سیده زهرا` و `زهرا سادات` تشخیص داده می‌شوند. لقب روی جنسیت اثری ندارد.
- `getTitle`، `sameName`، `searchNames` و `countNames` اضافه شدند.
- ۶۹ نام واقعی که در فهرست نبود اضافه شد. تعداد نام‌های یکتا ۱۰٬۱۵۷ است.
- ورودی بلندتر از ۱۲۸ نویسه رد می‌شود. متن خطای فرمت نامعتبر هم دیگر مقدار خام
  ورودی را در خودش کپی نمی‌کند.

جزئیات هر نسخه در [CHANGELOG.md](./CHANGELOG.md) است.

## مهاجرت از نسخه‌ی ۱

نسخه‌ی ۲ یک نسخه‌ی major است. class قدیمی و متدهای `validation`، `findName`،
`findNames` و `includeName` حذف شده‌اند. از ۲٫۱٫۰ همان کارها با تابع‌های جدا
انجام می‌شود و هر فراخوان فقط خروجی خودش را می‌سازد.

```ts
// v1
const names = new PersianNames();
names.getGender('علی', { genderType: 'stringFa' });
// { gender: 'مرد' }
names.validation('علی');

// v2.1
import { getGender, isName } from 'persian-names';
getGender('علی', 'fa');
// 'مرد'
isName('علی');
// true
```

`getNames()` در نسخه‌ی ۲٫۱ کل فهرست را با جزئیات برمی‌گرداند. این تابع جایگزین
class قدیمی نیست و تا وقتی صدا زده نشود فهرستی ساخته نمی‌شود.

برای نام ناشناخته، نسخه‌ی ۲ همیشه `null` می‌دهد و هیچ‌گاه process را متوقف یا در
console چیزی چاپ نمی‌کند.

## توسعه و کنترل کیفیت

```bash
npm ci
npm test
npm run check
npm run benchmark
npm pack --dry-run
```

`npm run check` علاوه بر تست runtime و type، محدودیت اندازه و صحت exportهای ESM،
CommonJS و TypeScript را نیز بررسی می‌کند.

برای توسعه و build به Node.js 20 یا جدیدتر نیاز است؛ فایل منتشرشده در Node.js 14
یا جدیدتر قابل استفاده است.

## انتشار نسخه

انتشار روی npm فقط پس از ساختن یک GitHub Release انجام می‌شود. workflow پیش از
انتشار، تمام کنترل‌های `npm run check` را اجرا می‌کند و یکسان بودن tag ریلیز با
نسخه‌های `package.json` و `package-lock.json` را بررسی می‌کند. نسخه‌های پایدار با
dist-tag برابر `latest` و نسخه‌های prerelease با dist-tag برابر `next` منتشر
می‌شوند.

برای راه‌اندازی اولیه، در تنظیمات پکیج `persian-names` در npm یک
**Trusted Publisher** از نوع GitHub Actions با مقادیر زیر بسازید:

- Organization or user: `mohammadhejazirad`
- Repository: `persian-names`
- Workflow filename: `publish.yml`
- Environment: `npm`
- Allowed action: `npm publish`

سپس در GitHub یک Environment به نام `npm` بسازید. برای کنترل بیشتر می‌توان روی
آن required reviewer و محدودیت deployment tag با الگوی `v*` تنظیم کرد. workflow
از OIDC برای provenance استفاده می‌کند. انتشار خود بسته با secret
`NPM_TOKEN` انجام می‌شود و این توکن باید اجازه‌ی publish روی همین بسته را داشته باشد.

برای انتشار، ابتدا نسخه و changelog را در `main` به‌روزرسانی کنید، tag متناظر
مانند `v2.0.1` را push کنید و برای همان tag یک GitHub Release بسازید. tag باید
دقیقاً به‌شکل `v<package-version>` باشد.

## توسعه با agentهای کدنویسی

از نسخه‌ی ۲ به بعد، بخشی از توسعه و نوشتن کد این پکیج با agentهای کدنویسی انجام
شده است. تصمیم‌های API، داده‌ی خاستگاه، تست‌ها و متن منتشرشده بازبینی شده‌اند.

## مجوز

[MIT](./LICENSE)
