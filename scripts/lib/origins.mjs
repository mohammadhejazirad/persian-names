/**
 * Linguistic origin of a normalized Persian-script given name.
 * This is the conventional root of the name, not a person's nationality.
 */

const EXACT = new Map();

function add(origin, words) {
  for (const word of words.split(/\s+/u)) {
    if (!word) continue;
    const previous = EXACT.get(word);
    if (previous && previous !== origin) {
      throw new Error(`Origin conflict for ${word}: ${previous} vs ${origin}`);
    }
    EXACT.set(word, origin);
  }
}

add(
  'arabic',
  `محمد احمد علی امیر حسین حسن رضا مهدی حمید سعید جواد عباس غلام ابراهیم اسماعیل
   یوسف مریم زهرا زینب فاطمه خدیجه معصومه مصطفی مرتضی مجتبی طاها محمود صادق باقر
   جعفر قاسم قادر اکبر اصغر سجاد وحید مسعود محسن ناصر رسول هادی کریم مجید امین
   ابو عبد الله لیلا دنیا زهره داوود موسی سلیمان هارون ایوب نوح آدم یونس
   یحیی زکریا بلال بشیر راشد رشید یاسر اکرم انور جمیل جابر سلمان انس زید اسامه
   مالک نادر ولید خالد تقی نقی مبین متین سمیه سمیرا منیره هدی اسما بتول
   آمنه آسیه هاله کریمه قدسی جلال جمال کمال نصیر فخر سیف بدر نور امام صفا مبینا
   مائده ندا خدیجه رقیه سکینه مجتبی باقر جواد ابراهیم زهرا مهدی زینب مریم`
);

add(
  'persian',
  `آرش کاوه رستم سهراب سیاوش کوروش داریوش جمشید فریدون منوچهر اردشیر خسرو بهرام
   افشین بابک اشکان آریا آرمان آرمین آرمیتا پارسا کیان امید شیرین باران ستاره
   نیلوفر سپهر سروش پویا پوریا پیمان نوید بهروز فرهاد فرزاد فرشید نگین نگار هستی
   دریا شادی لاله پروانه پروین نرگس نسترن نسرین ناهید مهسا مهتاب مهناز
   میترا مینا ساناز سپیده ستایش هلیا دینا دیبا درنا دلارام
   گلنار گلرخ گلناز گلشن گیتی لادن فیروزه شبنم شکوفه شقایق شیما شیوا زیبا یکتا
   یگانه یسنا آتوسا آزیتا آزاده آناهیتا کتایون رودابه تهمینه سودابه فرنگیس هما
   ویدا پانیذ پرنیا پریسا پگاه پدرام رادین ماهان میلاد کامران کامیار کیارش کیوان
   هومن هوشنگ اسفندیار بیژن ایرج کامبیز شاپور قباد آبتین مانی مزدک روزبه بامداد
   رامین هرمز نیکو شهریار شهرام شهناز شهرزاد شیرزاد سیامک شروین آبتین فریبرز کسرا
   کسری مازیار گردآفرید کیخسرو کاروان نوروز طناز طهمورث طهماسب تهمورث یاسمن نسیم
   ناز داد مهر شاه آذر شاد گل نوش رخ`
);

add(
  'turkish',
  `آیدین دنیز آیسل آیسان آیگون آیلار ایلگار ایلماز ایلدنیز ایلدرم ایلدیریم ایلحان
   ایلهان ایلکین گونای گونش گونل سولماز سلماز تورال پاشا اورهان تیمور آلپ یولدوز اولدوز
   یلدوز آتابیگ بایرام قلی گوزل`
);

add(
  'kurdish',
  `روژان روژین روژیار روژ ژینا ژیان ژیار هیوا هیمن دیار آوات روناک چیا هژار
   شیلان سوران کارزان کاژاو کاژین ئاگرو ئوژین آلان`
);

add('mongolian', 'چنگیز');
add('armenian', 'گئورگ گارنیک');

const AFFIX = new Set(['دخت', 'زاد', 'پور', 'یار', 'بانو', 'آسا', 'جان', 'فام']);
const PERSIAN_LETTER = /[پچژگ]/u;

add(
  'arabic',
  `اباذر ابوذر سحر غزل کیمیا صنم صدف فرح عجب اعظم ثنا طلا صبح حریر تحفه زیتون نرجس
   منا سلما نادیه`
);
add(
  'persian',
  `نوذر تذرو سفندارمذ آذرطوس پذیره سمانه یاسمین آناهید بوذرجمهر طهماسپ دلپذیر
   هرمزدیار ژیلا چهر طوس طوطی تاج جهان افسر آزرم فیروز ماه زر صدپر`
);
add(
  'turkish',
  `ارسلان آلبارسلان آلپارسلان آسلان اتابک طغرل بیگم آتا قلیچ خاتون خاتونک خانم
   آیخانم طرلان طرخان طغان طمغاج طغاترکان طغاتیمور اوغلی آتابای آتابیک آتالان
   آتامان آتاکان آتای`
);
add('mongolian', 'سلدوز سولدوز');
add(
  'kurdish',
  'ژیان ژیار ژینا ژیوار ژیوان ژیوا ژینو ژینار ژیانا ژیانو ژیوانا'
);
add(
  'greek',
  `سقراط افلاطون ارسطو اسکندر متیس ملیسا پطروس گرگیاس هلن سلنا کلویی درا دریس
   دوریس دلیا آیریس ایریس هلنا`
);
add(
  'hebrew',
  'سارا بنجامین داوید رافائل شارون تامارا آنا سیمون'
);
add(
  'latin',
  `ونوس دیانا ماریا امیلیا آرورا لونا آماندا اماندا میراندا مارتینا مارینا ویکتور
   آنجلا کارینا مارتین`
);
add('french', 'ژاکلین آرماند آرمند ژینوس');
add(
  'german',
  'ماتیلدا هیلدا گیلدا آلبرت ایرما هیدی السا الزا کاترین کاترینا لیندا'
);
add('spanish', 'کارلوس آنیتا انیتا الویرا نیلدا');
add('italian', 'الیسا ایلدا ماریو ماریسا ایزابلا ریتا النا مریسا');
add('english', 'ونسا جسیکا لیسا الیزا نل لیزا لیلین تینا');
add('russian', 'آلیسا علیسا نینا ناتاشا تاشا ساشا الگا لارا نادیا');
add('swedish', 'لنا');
add('finnish', 'الینا');
add('norse', 'آسترید اریکا');
add('phoenician', 'هانیبال');
add('syriac', 'یلدا');
add('aramaic', 'مارتا');
add('celtic', 'مونا فیونا سابرینا صبرینا');
add('danish', 'کارن');
add('sanskrit', 'تارا مایا');

function hasArabicLetter(name) {
  const withoutPersianZal = name.replace(/آذین|اذین|آذر|اذر|پذیر/gu, '');
  return /[عثحصضطظء]/u.test(name) || /ذ/u.test(withoutPersianZal);
}

function originOfRest(rest, leftOrigin) {
  if (!rest) return leftOrigin;
  if (EXACT.has(rest)) return EXACT.get(rest);
  if (AFFIX.has(rest)) return leftOrigin;
  if (rest.length >= 3) return combine(rest);
  return null;
}

function combine(name) {
  let best = null;
  const consider = (length, origin) => {
    if (!origin) return;
    if (!best || length > best.length) best = { length, origin };
  };

  for (const [root, origin] of EXACT) {
    if (root.length < 3 || root.length >= name.length || !name.startsWith(root)) continue;
    const restOrigin = originOfRest(name.slice(root.length), origin);
    if (!restOrigin) continue;
    consider(root.length, restOrigin === origin ? origin : 'mixed');
  }

  for (const [root, origin] of EXACT) {
    if (root.length < 2 || root.length >= name.length || !name.endsWith(root)) continue;
    const head = name.slice(0, -root.length);
    const headOrigin = EXACT.get(head) ?? (AFFIX.has(head) ? origin : null);
    if (!headOrigin) continue;
    consider(root.length, headOrigin === origin ? origin : 'mixed');
  }

  return best?.origin ?? null;
}

function turkishPattern(name) {
  if (name.includes('گوزل')) return 'turkish';
  if (name.length > 3 && name.endsWith('دوز')) {
    const stem = name.slice(0, -2);
    if (EXACT.get(stem) === 'persian' || PERSIAN_LETTER.test(stem)) return 'mixed';
    return 'turkish';
  }
  if (name.length > 3 && name.endsWith('قلی')) {
    const stem = name.slice(0, -3);
    const stemOrigin = EXACT.get(stem);
    if (
      (stemOrigin && stemOrigin !== 'turkish') ||
      PERSIAN_LETTER.test(stem) ||
      hasArabicLetter(stem)
    ) {
      return 'mixed';
    }
    return 'turkish';
  }
  return null;
}

function arabicPattern(name) {
  if (name.endsWith('الدین') && name.length > 5) {
    const stem = name.slice(0, -5);
    if (EXACT.get(stem) === 'persian' || PERSIAN_LETTER.test(stem)) return 'mixed';
    return 'arabic';
  }
  if (name.endsWith('الله') && name.length > 4) {
    const stem = name.slice(0, -4);
    if (EXACT.get(stem) === 'persian' || PERSIAN_LETTER.test(stem)) return 'mixed';
    return 'arabic';
  }
  if (
    (name.startsWith('عبد') || name.startsWith('ابو') || name.startsWith('ابن')) &&
    name.length > 3
  ) {
    return PERSIAN_LETTER.test(name) ? 'mixed' : 'arabic';
  }
  return null;
}

function letters(name) {
  const persian = PERSIAN_LETTER.test(name);
  const arabic = hasArabicLetter(name);
  if (persian && arabic) return 'mixed';
  if (arabic) return 'arabic';
  return 'persian';
}

export function originFor(name) {
  const exact = EXACT.get(name);
  if (exact) return exact;

  if (name.startsWith('ا')) {
    const withMadda = EXACT.get(`آ${name.slice(1)}`);
    if (withMadda) return withMadda;
  }

  const combined = combine(name);
  if (combined) return combined;

  if (name.startsWith('روژ')) return 'kurdish';

  const turkish = turkishPattern(name);
  if (turkish) return turkish;

  const arabic = arabicPattern(name);
  if (arabic) return arabic;

  return letters(name);
}

export const ORIGIN_CODE = {
  persian: 'p',
  arabic: 'a',
  turkish: 't',
  kurdish: 'k',
  mongolian: 'm',
  armenian: 'e',
  mixed: 'x',
  other: 'o',
  greek: 'g',
  hebrew: 'h',
  latin: 'l',
  french: 'f',
  german: 'd',
  spanish: 's',
  italian: 'i',
  english: 'n',
  russian: 'r',
  swedish: 'w',
  finnish: 'u',
  norse: 'v',
  phoenician: 'q',
  syriac: 'y',
  aramaic: 'b',
  celtic: 'c',
  danish: 'z',
  sanskrit: 'j',
};
