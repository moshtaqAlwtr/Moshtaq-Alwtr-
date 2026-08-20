# موقع مشتاق الوتر الشخصي

بورتفوليو شخصي بواجهة React وتصميم ليلي (Dark Theme) ودعم كامل للغة العربية واتجاه RTL.

## التقنيات

- **React 18** + **Vite 5**
- **TailwindCSS 3** — نظام تصميم مبني على متغيّرات CSS
- **Framer Motion** — حركات الظهور والانتقالات
- **lucide-react** — الأيقونات

## التشغيل محلياً

```bash
npm install
npm run dev
```

ثم افتح الرابط الذي يظهر في الطرفية (عادةً `http://localhost:5173/Moshtaq-Alwtr-/`).

## البناء للإنتاج

```bash
npm run build      # ينتج مجلد dist/
npm run preview    # معاينة نسخة الإنتاج محلياً
```

## النشر على GitHub Pages

المشروع مهيّأ للنشر على المستودع `Moshtaq-Alwtr-`، أي على الرابط:
`https://moshtaqalwtr.github.io/Moshtaq-Alwtr-/`

### الطريقة الأولى — أمر واحد

```bash
npm run deploy
```

يبني المشروع ويرفع مجلد `dist` إلى فرع `gh-pages`.

### الطريقة الثانية — نشر تلقائي

الملف `.github/workflows/deploy.yml` ينشر الموقع تلقائياً مع كل `push` على الفرع الرئيسي.
لتفعيله: من إعدادات المستودع اذهب إلى **Settings → Pages → Source** واختر **GitHub Actions**.

### النشر على نطاق خاص (مثل `moshtaq.dev`)

المسار الأساسي (`base`) مضبوط على `/Moshtaq-Alwtr-/`. عند النشر على جذر نطاق خاص:

```bash
DEPLOY_TARGET=root npm run build
```

## تعديل المحتوى

كل نصوص الموقع — البيانات الشخصية، المهارات، المشاريع، الخدمات، خطوات العمل —
موجودة في ملف واحد:

```
src/data/content.js
```

لإضافة مشروع جديد، أضف كائناً جديداً إلى مصفوفة `projects`:

```js
{
  id: 'my-project',           // معرّف فريد
  title: 'اسم المشروع',
  subtitle: 'وصف قصير',
  category: 'أنظمة',           // يظهر تلقائياً كفلتر جديد
  featured: true,             // شارة "مميّز"
  accent: '#10b981',          // لون البطاقة
  icon: 'Receipt',            // اسم أيقونة من src/components/icons.js
  summary: '...',
  problem: '...',
  solution: '...',
  features: ['...'],
  stack: ['Laravel', 'React'],
}
```

> ملاحظة: الأيقونات تُستورد بأسمائها صراحةً في `src/components/icons.js` بدلاً من
> استيراد مكتبة lucide بالكامل — هذا يقلّص حجم الحزمة من ‎1085KB إلى ‎325KB.
> عند استخدام أيقونة جديدة، أضِفها إلى ذلك الملف أولاً.

## بنية المشروع

```
src/
├── data/content.js          # كل محتوى الموقع
├── components/
│   ├── ui.jsx               # مكوّنات مشتركة (Reveal, SectionTitle, CountUp, Typewriter)
│   ├── icons.js             # سجل الأيقونات المستخدمة
│   ├── Navbar.jsx           # شريط علوي بتتبّع القسم النشط
│   ├── Hero.jsx             # الواجهة الرئيسية
│   ├── About.jsx            # نبذة + لماذا تختارني
│   ├── Skills.jsx           # المهارات بأشرطة تقدّم
│   ├── Projects.jsx         # المشاريع + فلاتر + نافذة التفاصيل
│   ├── Services.jsx         # الخدمات
│   ├── Process.jsx          # خطوات العمل السبع
│   ├── Contact.jsx          # قنوات التواصل
│   ├── Footer.jsx           # التذييل
│   └── FloatingUI.jsx       # شريط تقدّم القراءة + أزرار عائمة
├── App.jsx
└── index.css                # نظام التصميم والمتغيّرات
```

## لوحة الألوان

| المتغيّر | القيمة | الاستخدام |
|---|---|---|
| `--page-bg` | `#020617` | خلفية الصفحة |
| `--section-bg` | `#0f172a` | خلفية الأقسام المظللة |
| `--accent` | `#10b981` | اللون الأساسي |
| `--accent-2` | `#06b6d4` | اللون الثانوي |
| `--accent-3` | `#8b5cf6` | لون التمييز |
