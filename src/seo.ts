import { BING_SITE_VERIFICATION, GOOGLE_SITE_VERIFICATION, SITE_URL, urlFor } from './content/config'
import { site, type Lang } from './content/site'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function jsonLd(lang: Lang) {
  const org = `${SITE_URL}/#organization`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': org,
      name: site.legalName[lang],
      legalName: site.legalName.fa,
      alternateName: lang === 'fa' ? [site.brand.fa, site.legalName.en, site.brand.en] : [site.legalName.fa, site.brand.en, site.brand.fa],
      url: urlFor(lang),
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icons/icon-512.png`, width: 512, height: 512 },
      image: `${SITE_URL}/og.png`,
      description: site.seo.description[lang],
      telephone: site.phone.tel,
      email: site.email,
      areaServed: 'IR',
      knowsAbout: lang === 'fa' ? ['نرم‌افزار سازمانی', 'مدیریت عملکرد', 'هوش مصنوعی'] : ['Enterprise software', 'Performance management', 'Artificial intelligence'],
      address: { '@type': 'PostalAddress', addressCountry: 'IR' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone.tel,
        email: site.email,
        contactType: 'customer service',
        availableLanguage: ['fa', 'en'],
      },
      sameAs: site.sameAs,
      founder: {
        '@type': 'Person',
        name: site.founder.en,
        alternateName: site.founder.fa,
        jobTitle: lang === 'fa' ? 'بنیان‌گذار' : 'Founder',
        image: `${SITE_URL}${site.team.members[0].photo}`,
        sameAs: site.team.members[0].links.map((l) => l.href),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: urlFor(lang),
      name: site.legalName[lang],
      alternateName: site.brand[lang],
      inLanguage: lang,
      publisher: { '@id': org },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${urlFor(lang)}#webpage`,
      url: urlFor(lang),
      name: site.seo.title[lang],
      description: site.seo.description[lang],
      inLanguage: lang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': org },
      primaryImageOfPage: `${SITE_URL}/og.png`,
    },
    ...site.projects.items.map((p) => ({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: p.name.en,
      alternateName: p.name.fa,
      url: p.href,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'fa',
      description: p.description[lang],
      publisher: { '@id': org },
    })),
  ]
}

/** Per-language <head> tags (prerendered into the HTML). */
export function buildHead(lang: Lang): string {
  const title = esc(site.seo.title[lang])
  const desc = esc(site.seo.description[lang])
  const url = urlFor(lang)
  const other: Lang = lang === 'fa' ? 'en' : 'fa'
  const image = `${SITE_URL}/og.png`
  const imageAlt = `${esc(site.legalName[lang])}: ${esc(lang === 'fa' ? 'فراتر از پردازش' : 'Beyond processing')}`
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${desc}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<meta name="author" content="${esc(site.legalName[lang])}" />`,
    ...(GOOGLE_SITE_VERIFICATION ? [`<meta name="google-site-verification" content="${esc(GOOGLE_SITE_VERIFICATION)}" />`] : []),
    ...(BING_SITE_VERIFICATION ? [`<meta name="msvalidate.01" content="${esc(BING_SITE_VERIFICATION)}" />`] : []),
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="fa" href="${urlFor('fa')}" />`,
    `<link rel="alternate" hreflang="en" href="${urlFor('en')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${urlFor('fa')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.legalName[lang])}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    `<meta property="og:locale" content="${site.seo.ogLocale[lang]}" />`,
    `<meta property="og:locale:alternate" content="${site.seo.ogLocale[other]}" />`,
    `<meta name="twitter:site" content="@${site.handle}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${desc}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${imageAlt}" />`,
    ...(lang === 'fa'
      ? [
          `<link rel="preload" href="/fonts/dana/DanaFaNum-Medium.woff2" as="font" type="font/woff2" crossorigin />`,
          `<link rel="preload" href="/fonts/dana/DanaFaNum-ExtraBold.woff2" as="font" type="font/woff2" crossorigin />`,
        ]
      : []),
    `<link rel="alternate" type="text/plain" href="${SITE_URL}/llms.txt" title="llms.txt" />`,
    ...jsonLd(lang).map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`),
  ]
  return tags.join('\n    ')
}

/** Keep head tags in sync when the language is switched on the client. */
export function applyHead(lang: Lang) {
  if (typeof document === 'undefined') return
  const set = (sel: string, attr: string, value: string) => document.head.querySelector(sel)?.setAttribute(attr, value)
  document.title = site.seo.title[lang]
  set('meta[name="description"]', 'content', site.seo.description[lang])
  set('link[rel="canonical"]', 'href', urlFor(lang))
  set('meta[property="og:title"]', 'content', site.seo.title[lang])
  set('meta[name="twitter:title"]', 'content', site.seo.title[lang])
  set('meta[property="og:description"]', 'content', site.seo.description[lang])
  set('meta[name="twitter:description"]', 'content', site.seo.description[lang])
  set('meta[property="og:url"]', 'content', urlFor(lang))
  set('meta[property="og:locale"]', 'content', site.seo.ogLocale[lang])
}
