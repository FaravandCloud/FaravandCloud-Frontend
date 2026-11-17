# فراوند (Faravand): وب‌سایت شرکتی

صفحه‌ی معرفی شرکت «پردازش هوشمند فراوند». React + TypeScript + Vite، Tailwind CSS v4، `motion` برای انیمیشن و `lenis` برای اسکرول نرم. دو‌زبانه (فارسی پیش‌فرض و انگلیسی).

## اجرا

```bash
npm install
npm run dev        # توسعه
npm run build      # ساخت + پیش‌رندر HTML استاتیک (dist/index.html و dist/en/index.html)
npm run preview    # پیش‌نمایش نسخه‌ی ساخته‌شده
npm run lint       # oxlint
```

## استقرار روی Vercel

پروژه یک اپ استاتیک Vite است. ریپو را به Vercel وصل کنید؛ تنظیمات به‌صورت خودکار شناسایی می‌شود (Build: `npm run build`، Output: `dist`). فایل `vercel.json` فقط کش بلندمدت برای `/assets/` را تنظیم می‌کند. دامنه‌ی `faravand.ir` را از بخش Domains اضافه کنید.

## ویرایش محتوا

همه‌ی متن‌ها (فارسی و انگلیسی)، ایمیل، دامنه، شبکه‌های اجتماعی، پروژه‌ها و اعضای تیم فقط در یک فایل هستند:

`src/content/site.ts`

- مقادیر **placeholder** (`domain`, `email`, `handle`, لینک‌های social) بالای فایل علامت‌گذاری شده‌اند و باید با مقدار واقعی عوض شوند.
- افزودن پروژه: یک آبجکت به `projects.items` اضافه کنید.
- عنوان و توضیح صفحه و تگ‌های OG در `index.html` هستند. تصویر اشتراک‌گذاری: `public/og.png` (۱۲۰۰×۶۳۰).

## لوگو و فونت

- فایل‌های لوگو (۲۶ فایل SVG): `public/brand/`
- نشان درون‌خطی (با `currentColor`): `src/components/Logo.tsx`
- فاوآیکون: `public/favicon.svg` (سازگار با تم روشن/تاریک)
- فونت‌ها self-hosted: Dana (فارسی)، Sora (لاتین)، Instrument Serif.

## ساختار کد

- `src/components/`: بخش‌های صفحه (Hero، Marquee، About، Work، Projects، Contact، Footer) و ابزارهای انیمیشن (`motion.tsx`)
- `src/lib/`: زبان و جهت (`lang.tsx`, `langContext.ts`)، اسکرول نرم (`smooth.ts`)

## نکات

- با `prefers-reduced-motion` اسکرول نرم، پیش‌لودر و افکت‌ها ساده یا غیرفعال می‌شوند.
- افکت‌های وابسته به ماوس (magnetic، spotlight) فقط روی ماوس فعال‌اند.

## سئو و پیش‌رندر

- `npm run build` سه کار می‌کند: `vite build` (کلاینت)، `vite build --ssr` (ورودی سرور `src/entry-server.ts`) و `scripts/prerender.mjs` که با `renderToString` دو صفحه‌ی HTML کامل می‌نویسد، همراه با `sitemap.xml` و `robots.txt`. نیازی به مرورگر یا Playwright نیست و روی Vercel کار می‌کند.
- دو نشانی: فارسی `/` (`lang="fa" dir="rtl"`) و انگلیسی `/en/` (`lang="en" dir="ltr"`). زبان از روی نشانی تعیین می‌شود و دکمه‌ی زبان بین این دو جابه‌جا می‌شود.
- آدرس سایت فقط از یک‌جا خوانده می‌شود: متغیر محیطی `VITE_SITE_URL` (پیش‌فرض `https://faravand.ir`). همه‌ی canonical، hreflang، OG، JSON-LD و sitemap از آن ساخته می‌شوند.
- عنوان و توضیح هر زبان: `site.seo` در `src/content/site.ts`. تگ‌های head: `src/seo.ts`.
- `sameAs` در JSON-LD عمداً خالی است چون لینک‌های اجتماعی placeholder هستند؛ بعد از ساخت حساب‌های واقعی به `src/seo.ts` اضافه کنید.
- فونت فارسی Dana از `public/fonts/dana/` (self-hosted).
