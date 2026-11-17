/**
 * All site content lives here: copy (fa + en), links and contact details.
 * Components only render what is defined in this file.
 *
 * !! PLACEHOLDERS !!  `domain`, `email` and the `social` handle below are
 * placeholders until the real ones exist. Change them here only.
 *
 * To add a project, add one more object to `projects.items`: the layout adapts.
 */

export type Lang = 'fa' | 'en'
export type L<T> = Record<Lang, T>

export interface Capability {
  title: L<string>
  body: L<string>
}

export interface Project {
  id: string
  name: L<string>
  kind: L<string>
  description: L<string>
  tags: L<string[]>
  href: string
  hrefLabel: string
  /** nodes of the abstract "one cycle" visual */
  cycle: L<string[]>
}

export interface SocialLink {
  label: string
  href: string
}

const handle = 'faravand' // PLACEHOLDER

export const site = {
  // ---- PLACEHOLDERS -------------------------------------------------------
  domain: 'faravand.ir',
  email: 'info@faravand.ir',
  handle,
  social: [
    { label: 'LinkedIn', href: `https://www.linkedin.com/company/${handle}` },
    { label: 'X', href: `https://x.com/${handle}` },
    { label: 'YouTube', href: `https://www.youtube.com/@${handle}` },
  ] satisfies SocialLink[],
  // -------------------------------------------------------------------------

  founder: { fa: 'علی مرادی', en: 'Ali Moradi' } satisfies L<string>,

  seo: {
    title: {
      fa: 'فراوند | پردازش هوشمند فراوند: فراتر از پردازش',
      en: 'Faravand | Faravand Intelligent Processing: Beyond processing',
    },
    description: {
      fa: 'فراوند (پردازش هوشمند فراوند) شرکت نرم‌افزاری ایرانی است که محصولات نرم‌افزاری هوشمند برای سازمان‌ها می‌سازد؛ محصول نخست آن تروفلو، پلتفرم مدیریت عملکرد است.',
      en: 'Faravand (Faravand Intelligent Processing) is an Iranian software company building intelligent software products for organizations. Its first product is TrueFlow, a performance management platform.',
    },
    ogLocale: { fa: 'fa_IR', en: 'en_US' },
  } satisfies Record<string, L<string>>,

  brand: { fa: 'فراوند', en: 'Faravand' } satisfies L<string>,
  legalName: {
    fa: 'پردازش هوشمند فراوند',
    en: 'Faravand Intelligent Processing',
  } satisfies L<string>,

  ui: {
    skip: { fa: 'پرش به محتوا', en: 'Skip to content' },
    menu: { fa: 'منو', en: 'Menu' },
    close: { fa: 'بستن', en: 'Close' },
    scroll: { fa: 'اسکرول', en: 'Scroll' },
    langLabel: { fa: 'تغییر زبان به انگلیسی', en: 'Switch language to Persian' },
    langShort: { fa: 'EN', en: 'فا' },
    copy: { fa: 'کپی ایمیل', en: 'Copy email' },
    copied: { fa: 'کپی شد', en: 'Copied' },
    visit: { fa: 'بازدید از', en: 'Visit' },
    loading: { fa: 'در حال بارگذاری', en: 'Loading' },
    marqueeLabel: { fa: 'حوزه‌های کار فراوند', en: 'Areas of work at Faravand' },
    mainNav: { fa: 'ناوبری اصلی', en: 'Main navigation' },
  } satisfies Record<string, L<string>>,

  nav: {
    links: [
      { id: 'about', label: { fa: 'درباره', en: 'About' } },
      { id: 'work', label: { fa: 'کار ما', en: 'What we do' } },
      { id: 'projects', label: { fa: 'محصول', en: 'Product' } },
    ],
    cta: { fa: 'تماس با ما', en: 'Contact' },
  },

  hero: {
    eyebrow: { fa: 'شرکت نرم‌افزاری ایرانی', en: 'Iranian software company' },
    lines: {
      fa: ['فراتر', 'از پردازش'],
      en: ['Beyond', 'processing'],
    } satisfies L<string[]>,
    sub: {
      fa: 'فراوند محصولات نرم‌افزاری هوشمند برای سازمان‌ها می‌سازد.',
      en: 'Faravand builds intelligent software products for organizations.',
    } satisfies L<string>,
    primary: { fa: 'محصول ما: تروفلو', en: 'Our product: TrueFlow' },
    secondary: { fa: 'گفتگو با ما', en: 'Talk to us' },
    side: { fa: 'محصول نخست', en: 'First product' },
  },

  marquee: {
    words: {
      fa: ['هوشمند', 'سازمان', 'داده', 'محصول', 'طراحی', 'مهندسی'],
      en: ['Intelligent', 'Organizations', 'Data', 'Product', 'Design', 'Engineering'],
    } satisfies L<string[]>,
  },

  about: {
    label: { fa: 'درباره', en: 'About' },
    statement: {
      fa: 'فراوند برای ساختن نرم‌افزارهای هوشمند شکل گرفته؛ ابزارهایی که پیچیدگی کار سازمان‌ها را به جریانی روشن، ساده و قابل‌اندازه‌گیری تبدیل می‌کنند.',
      en: 'Faravand exists to build intelligent software: tools that turn the complexity of organizational work into a flow that is clear, simple and measurable.',
    } satisfies L<string>,
    pointsTitle: { fa: 'اصول', en: 'Principles' },
    points: [
      {
        title: { fa: 'ساده، نه سطحی', en: 'Simple, not shallow' },
        body: {
          fa: 'پیچیدگی را پشت یک تجربه‌ی روشن پنهان می‌کنیم، نه اینکه حذفش کنیم.',
          en: 'We hide complexity behind a clear experience instead of pretending it is not there.',
        },
      },
      {
        title: { fa: 'هوش، جایی که به کار می‌آید', en: 'Intelligence where it helps' },
        body: {
          fa: 'هوش مصنوعی را برای جلوه نمی‌خواهیم؛ آن‌جا می‌گذاریم که واقعاً کار را سبک می‌کند.',
          en: 'We do not add AI for show. We put it where it genuinely lightens the work.',
        },
      },
      {
        title: { fa: 'ساخته‌شده با وسواس', en: 'Built with care' },
        body: {
          fa: 'از طراحی تا کد، جزئیات است که کیفیت نهایی را می‌سازد.',
          en: 'From design to code, details are what make the final quality.',
        },
      },
    ],
    nameTitle: { fa: 'درباره‌ی نام و نشان', en: 'On the name and the mark' },
    nameBody: {
      fa: '«فرا» یعنی فراتر. نشان فراوند حرف F با شانه‌ای گرد و بازویی مورب است و نقطه‌اش، هم نقطه‌ی «ف» است و هم گره‌ی یک پردازش.',
      en: '"Fara" means beyond. The mark is an F with a rounded shoulder and a diagonal-cut arm; its dot is both the dot of the Persian letter «ف» and a node of processing.',
    } satisfies L<string>,
  },

  work: {
    label: { fa: 'کار ما', en: 'What we do' },
    title: {
      fa: ['چهار حوزه،', 'یک نگاه.'],
      en: ['Four areas,', 'one outlook.'],
    } satisfies L<string[]>,
    intro: {
      fa: 'کار ما از ایده تا محصول است؛ با تمرکز بر آنچه سازمان‌ها هر روز با آن سروکار دارند.',
      en: 'Our work runs from idea to product, focused on what organizations deal with every day.',
    } satisfies L<string>,
    items: [
      {
        title: { fa: 'محصولات نرم‌افزاری هوشمند', en: 'Intelligent software products' },
        body: {
          fa: 'طراحی، ساخت و نگهداری نرم‌افزارهایی که خودشان کار را سبک‌تر می‌کنند؛ از ایده تا محصولی که در دسترس مردم است.',
          en: 'Designing, building and maintaining software that makes work lighter by itself, from the first idea to a product people can use.',
        },
      },
      {
        title: { fa: 'پردازش داده و هوش مصنوعی', en: 'Data and AI-driven processing' },
        body: {
          fa: 'داده‌های پراکنده را به نتیجه‌ی قابل‌استفاده تبدیل می‌کنیم و هوش مصنوعی را آن‌جا به کار می‌گیریم که ارزش می‌سازد.',
          en: 'We turn scattered data into usable results and apply AI where it creates real value.',
        },
      },
      {
        title: { fa: 'پلتفرم‌های سازمانی', en: 'Organizational platforms' },
        body: {
          fa: 'سامانه‌هایی که ساختار، هدف و کار روزمره‌ی تیم‌ها را به هم وصل می‌کنند تا تصویر کامل در یک نگاه دیده شود.',
          en: 'Systems that connect structure, goals and the daily work of teams, so the whole picture is visible at a glance.',
        },
      },
      {
        title: { fa: 'طراحی و مهندسی با وسواس', en: 'Design and engineering craft' },
        body: {
          fa: 'رابط‌هایی دقیق و کدی تمیز؛ چون تجربه‌ی نهایی از جزئیات ساخته می‌شود.',
          en: 'Precise interfaces and clean code, because the final experience is made of details.',
        },
      },
    ] satisfies Capability[],
  },

  projects: {
    label: { fa: 'محصول', en: 'Product' },
    title: { fa: ['محصول', 'نخست'], en: ['First', 'product'] } satisfies L<string[]>,
    featured: { fa: 'ویژه', en: 'Featured' },
    items: [
      {
        id: 'trueflow',
        name: { fa: 'تروفلو', en: 'TrueFlow' },
        kind: { fa: 'پلتفرم مدیریت عملکرد', en: 'Performance management platform' },
        description: {
          fa: 'تروفلو پلتفرم فارسی مدیریت عملکرد است. ساختار سازمان، اهداف، وظایف روزانه، بازخورد، ارزیابی و تحلیل را در یک چرخه به هم وصل می‌کند و دستیاری هوشمند هم کنار شما دارد.',
          en: 'TrueFlow is a Persian performance-management platform. It connects org structure, goals, daily tasks, feedback, evaluations and analytics in one cycle, with an AI assistant alongside.',
        },
        tags: {
          fa: ['مدیریت عملکرد', 'ساختار سازمانی', 'دستیار هوشمند', 'تحلیل'],
          en: ['Performance', 'Org structure', 'AI assistant', 'Analytics'],
        },
        href: 'https://trueflow.ir',
        hrefLabel: 'trueflow.ir',
        cycle: {
          fa: ['ساختار', 'اهداف', 'وظایف', 'بازخورد', 'ارزیابی', 'تحلیل'],
          en: ['Structure', 'Goals', 'Tasks', 'Feedback', 'Evaluation', 'Analytics'],
        },
      },
    ] satisfies Project[],
  },

  contact: {
    label: { fa: 'تماس', en: 'Contact' },
    lines: { fa: ['بیایید', 'گفتگو کنیم.'], en: ["Let's", 'talk.'] } satisfies L<string[]>,
    body: {
      fa: 'برای همکاری، پرسش درباره‌ی تروفلو یا هر گفتگوی دیگر، یک ایمیل کافی است.',
      en: 'For collaboration, questions about TrueFlow, or any other conversation, an email is enough.',
    } satisfies L<string>,
    button: { fa: 'ایمیل بزنید', en: 'Write to us' },
    followTitle: { fa: 'دنبال کنید', en: 'Follow' },
  },

  footer: {
    rights: { fa: 'همه‌ی حقوق محفوظ است.', en: 'All rights reserved.' },
    productsTitle: { fa: 'محصولات', en: 'Products' },
    sitemapTitle: { fa: 'صفحه', en: 'Sitemap' },
    top: { fa: 'بازگشت به بالا', en: 'Back to top' },
  },
}

export type Site = typeof site
