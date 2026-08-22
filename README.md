# persian-names

تشخیص سریع جنسیت متداول نام‌های کوچک فارسی و عربی برای JavaScript و
TypeScript — بدون وابستگی runtime، بدون درخواست شبکه و قابل استفاده در مرورگر
و سرور.

Fast Persian and Arabic first-name gender detection for every modern JavaScript
runtime.

## ویژگی‌ها

- API کوچک و ساده: فقط `getGender`
- شامل **۱۰٬۰۸۸ نام یکتای نرمال‌شده** از ۱۰٬۷۲۲ رکورد منبع
- خروجی انگلیسی، فارسی، عربی یا عددی
- پشتیبانی هم‌زمان از ESM، CommonJS و فایل global برای `<script>`
- قابل استفاده در Node.js، React، Next.js، Vue، Nuxt، Angular، AngularJS،
  Svelte، Vite، Webpack، Rollup، Bun و Deno
- lookup با میانگین زمانی `O(1)` و index داخلی lazy
- حدود ۳۳ KiB برای هر build پس از gzip
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
import { getGender } from 'persian-names';

getGender('علی'); // 'male'
getGender('زهرا', 'fa'); // 'زن'
getGender('باران', 'number'); // 3
getGender('نام ناشناخته'); // null
```

به ساختن class یا بارگذاری فایل JSON نیازی نیست. دیتاست به‌شکل بهینه داخل build
قرار گرفته و در Node.js و مرورگر رفتار یکسانی دارد.

## API

```ts
getGender(name, format?)
getGender(names, format?)
```

پارامتر اول می‌تواند یک نام یا آرایه‌ای readonly از نام‌ها باشد. در حالت آرایه،
ترتیب و تعداد ورودی‌ها حفظ می‌شود و برای نام‌های ناشناخته `null` برمی‌گردد.

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

نوع‌های زیر نیز export شده‌اند:

```ts
import type {
  GenderArabic,
  GenderEnglish,
  GenderFormat,
  GenderNumber,
  GenderPersian,
  GenderResult,
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
| فقط مرد | ۴٬۷۳۲ |
| فقط زن | ۴٬۹۱۸ |
| هر دو | ۴۳۸ |
| **مجموع** | **۱۰٬۰۸۸** |

نام مرکب یک نام مستقل محسوب می‌شود؛ برای مثال `محمد` و `محمدرضا` دو ورودی جدا
هستند.

## نکته‌ی مهم درباره‌ی تشخیص جنسیت

خروجی این پکیج بیانگر کاربرد متداول یک نام در دیتاست است، نه هویت جنسیتی قطعی
یک شخص. برای فرم‌های واقعی بهتر است مقدار تشخیص‌داده‌شده قابل اصلاح باشد و از آن
برای تصمیم‌های حساس یا تبعیض‌آمیز استفاده نشود.

## مهاجرت از نسخه‌ی ۱

نسخه‌ی ۲ یک نسخه‌ی major و دارای API ساده‌شده است. class و متدهای عمومی قدیمی
مانند `validation`، `getNames`، `findName`، `findNames` و `includeName` حذف شده‌اند؛
زیرا هدف پکیج فقط برگرداندن جنسیت نام است.

```ts
// v1
const names = new PersianNames();
names.getGender('علی', { genderType: 'stringFa' });
// { gender: 'مرد' }

// v2
import { getGender } from 'persian-names';
getGender('علی', 'fa');
// 'مرد'
```

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
از OIDC و اعتبارنامه‌ی کوتاه‌عمر استفاده می‌کند؛ بنابراین secret دائمی
`NPM_TOKEN` لازم نیست.

برای انتشار، ابتدا نسخه و changelog را در `main` به‌روزرسانی کنید، tag متناظر
مانند `v2.0.1` را push کنید و برای همان tag یک GitHub Release بسازید. tag باید
دقیقاً به‌شکل `v<package-version>` باشد.

## مجوز

[MIT](./LICENSE)
