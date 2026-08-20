# موقع مشتاق الوتر الشخصي

بورتفوليو شخصي بواجهة React، بوضعين (ليلي وساطع) ولغتين (عربي/إنجليزي) مع دعم كامل لاتجاه RTL و LTR.

**Personal portfolio — React, dual theme (dark/light), bilingual (Arabic/English) with full RTL & LTR support.**

## التقنيات

- **React 18** + **Vite 5**
- **TailwindCSS 3** — نظام تصميم قائم على متغيّرات CSS
- **Framer Motion** — الحركات والانتقالات
- **lucide-react** — الأيقونات

## التشغيل محلياً

```bash
npm install
npm run dev
```

## البناء

```bash
npm run build      # ينتج مجلد dist/
npm run preview    # معاينة نسخة الإنتاج
```

## النشر على GitHub Pages

المشروع مهيّأ للمستودع `Moshtaq-Alwtr-`:
`https://moshtaqalwtr.github.io/Moshtaq-Alwtr-/`

```bash
npm run deploy     # يبني ويرفع dist إلى فرع gh-pages
```

أو نشر تلقائي عبر `.github/workflows/deploy.yml` مع كل `push`
(فعّله من **Settings → Pages → Source → GitHub Actions**).

للنشر على نطاق خاص (جذر الدومين):

```bash
DEPLOY_TARGET=root npm run build
```

---

## نظام التصميم

### الوضع الليلي والساطع

كل الألوان معرّفة كمتغيّرات CSS في [src/index.css](src/index.css) على شكل ثلاثيات `R G B`،
ما يسمح لـ Tailwind بتطبيق الشفافية عليها (`bg-brand/10`). الثيمان يعيدان تعريف
**نفس أسماء المتغيّرات**، فلا يحتاج أي مكوّن أن يعرف أي وضع مفعّل:

```css
:root, [data-theme='dark'] { --bg: 8 8 12;      --brand: 139 124 255; ... }
[data-theme='light']       { --bg: 252 252 253; --brand: 105 84 226;  ... }
```

| الرمز | ليلي | ساطع |
|---|---|---|
| `--bg` | `#08080c` | `#fcfcfd` |
| `--surface` | `#14141c` | `#ffffff` |
| `--brand` | `#8b7cff` | `#6954e2` |
| `--brand-2` | `#4da3ff` | `#2076d6` |
| `--brand-3` | `#ffb444` | `#c77a00` |

يُحسم الوضع في سكربت صغير داخل `<head>` **قبل أول رسم للصفحة**، فلا يحدث وميض
أبيض عند فتح الموقع في الوضع الليلي. الاختيار يُحفظ في `localStorage`
(`mw-theme`)، وأول زيارة تتبع إعداد النظام.

### الخطوط

| الاستخدام | الخط |
|---|---|
| العربية | **IBM Plex Sans Arabic** |
| الإنجليزية | **Plus Jakarta Sans** |
| الكود والأرقام | **JetBrains Mono** |

مرتّبة في stack واحد بحيث تُرسم الحروف اللاتينية من Jakarta والعربية من IBM Plex
تلقائياً، مع عكس الأولوية عندما تكون لغة الصفحة عربية.

---

## نظام اللغتين

الفصل بين **البنية** و**النص** يمنع اختلاف الملفين مع الوقت:

```
src/data/structure.js   ← المعرّفات، الأيقونات، الألوان، مستويات المهارات، التقنيات
src/i18n/ar.js          ← النص العربي فقط
src/i18n/en.js          ← النص الإنجليزي فقط
```

المكوّنات تقرأ الاثنين معاً عبر `useI18n()`:

```jsx
const { t, lang, toggleLang, isRTL } = useI18n()
<h2>{t.projects.title}</h2>
```

تبديل اللغة يغيّر `lang` و `dir` على `<html>`، ويحدّث `<title>` و `meta description`،
ويُحفظ في `localStorage` (`mw-lang`). الزيارة الأولى تفتح **بالعربية** دائماً
(الجمهور المستهدف عربي حتى لو كان جهازه بلغة إنجليزية)، والإنجليزية بضغطة واحدة.

### إضافة نص جديد

أضِف المفتاح في **كلا** الملفين `ar.js` و `en.js` بنفس المسار، ثم استخدمه عبر `t`.

### إضافة مشروع جديد

1. أضِف البنية في `src/data/structure.js` ضمن `projectsMeta`:

```js
{
  id: 'myProject',        // المفتاح الرابط بين البنية والنص
  icon: 'Receipt',        // اسم أيقونة من src/components/icons.js
  category: 'systems',    // يجب أن يوجد له مفتاح في projects.filters
  featured: true,
  visual: 'dashboard',    // dashboard | factory | map | subscriptions | store
  hue: 258,               // درجة لون البطاقة (0-360)
  stack: ['Laravel', 'React'],
}
```

2. أضِف النص في `ar.js` و `en.js` تحت `projects.items.myProject`
   (`title`, `subtitle`, `summary`, `problem`, `solution`, `features`).

> **ملاحظة:** الأيقونات تُستورد بأسمائها صراحةً في `src/components/icons.js`
> بدل استيراد lucide بالكامل — هذا يقلّص الحزمة من ‎1085KB إلى ‎~350KB.
> عند استخدام أيقونة جديدة أضِفها إلى ذلك الملف أولاً.

---

## بنية المشروع

```
src/
├── app/providers.jsx        # سياق الثيم واللغة (ThemeProvider + I18nProvider)
├── data/structure.js        # البنية غير القابلة للترجمة
├── i18n/
│   ├── ar.js                # النصوص العربية
│   └── en.js                # النصوص الإنجليزية
├── components/
│   ├── ui.jsx               # Reveal · SectionHeading · CountUp · Typewriter · LevelMeter
│   ├── icons.js             # سجل الأيقونات المستخدمة
│   ├── ProjectVisual.jsx    # مخططات UI مجرّدة لبطاقات المشاريع
│   ├── Navbar.jsx           # شريط علوي + مبدّل اللغة والوضع
│   ├── Hero.jsx             # الواجهة الرئيسية
│   ├── About.jsx            # نبذة + لماذا تختارني
│   ├── Skills.jsx           # المهارات بمؤشّر مستوى مقسّم
│   ├── Projects.jsx         # المشاريع + فلاتر + دراسة حالة
│   ├── Services.jsx         # الخدمات
│   ├── Process.jsx          # خطوات العمل السبع
│   ├── Contact.jsx          # قنوات التواصل
│   ├── Footer.jsx           # التذييل
│   └── FloatingUI.jsx       # شريط التقدّم + شريط الأقسام الجانبي + أزرار عائمة
├── App.jsx
└── index.css                # متغيّرات الثيمين والفئات المشتركة
```

### مخططات المشاريع (`ProjectVisual`)

بطاقات المشاريع لا تستخدم صوراً — بل مخططات UI مرسومة بـ CSS و SVG من متغيّرات
الثيم، فتتكيّف مع الوضعين ولا تضيف أي حجم تحميل. المتاح حالياً:
`dashboard`, `factory`, `map`, `subscriptions`, `store`.

### إذا ظهر خطأ ``The `bg-bg` class does not exist``

كان يحدث لأن `postcss.config.js` كان يمرّر `tailwindcss: {}` بلا مسار، فيبحث
Tailwind عن `tailwind.config.js` **بالنسبة لمجلّد التشغيل الحالي** لا لمجلّد
المشروع. عند تشغيل الخادم من أي مجلّد آخر، لا يجد الإعدادات ويرجع للثيم
الافتراضي — فتختفي كل الألوان المخصّصة (`bg-bg`، `text-text` ...).

الحل مطبّق الآن: `postcss.config.js` و `tailwind.config.js` يستخدمان مسارات
مطلقة مشتقّة من موقع الملف نفسه، فلا يعتمدان على مجلّد التشغيل إطلاقاً.

**ملاحظة أخرى:** إذا رأيت الخطأ رغم ذلك، تأكّد أنه لا يوجد خادم Vite قديم يعمل
على المنفذ. Vite ينتقل تلقائياً لمنفذ آخر (5174، 5175 ...) إذا كان 5173 مشغولاً،
فقد يكون متصفّحك يفتح خادماً قديماً:

```bash
npx kill-port 5173 5174 5175 5176
```

---

## ملاحظات RTL

- استُخدمت الخصائص المنطقية (`ms-*`, `-start-*`, `border-e`) بدل `left/right`.
- **مهم:** لا تضع `dir="ltr"` على عنصر يستخدم `-start-*` أو `-end-*` — الخصائص
  المنطقية تُحسب باتجاه العنصر نفسه، فينقلب موضعه. ضع `dir` على عنصر داخلي.
- النصوص اللاتينية داخل فقرة عربية (البريد، الهاتف) مغلّفة بـ `<bdi>` لتُقرأ
  من اليسار لليمين مع بقائها في بداية السطر.
