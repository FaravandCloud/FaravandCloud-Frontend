import { urlFor, SITE_URL } from './content/config'
import { site, type Lang } from './content/site'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

export function jsonLd(lang: Lang) {
  const org = `${SITE_URL}/#organization`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': org,
      name: site.brand[lang],
      legalName: site.legalName.fa,
      alternateName: lang === 'fa' ? ['Faravand', site.legalName.en] : [site.legalName.fa, site.legalName.en],
      url: urlFor(lang),
      logo: `${SITE_URL}/icons/icon-512.png`,
      description: site.seo.description[lang],
      founder: {
        '@type': 'Person',
        name: site.founder.en,
        alternateName: site.founder.fa,
        jobTitle: lang === 'fa' ? 'بنیان‌گذار' : 'Founder',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: urlFor(lang),
      name: site.brand[lang],
      alternateName: site.legalName[lang],
      inLanguage: lang,
      publisher: { '@id': org },
    },
  ]
}

/** Per-language <head> tags (prerendered into the HTML). */
export function buildHead(lang: Lang): string {
  const title = esc(site.seo.title[lang])
  const desc = esc(site.seo.description[lang])
  const url = urlFor(lang)
  const other: Lang = lang === 'fa' ? 'en' : 'fa'
  const image = `${SITE_URL}/og.png`
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${desc}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="fa" href="${urlFor('fa')}" />`,
    `<link rel="alternate" hreflang="en" href="${urlFor('en')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${urlFor('fa')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.brand[lang])}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(site.brand[lang])}: ${esc(lang === 'fa' ? 'فراتر از پردازش' : 'Beyond processing')}" />`,
    `<meta property="og:locale" content="${site.seo.ogLocale[lang]}" />`,
    `<meta property="og:locale:alternate" content="${site.seo.ogLocale[other]}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${desc}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...(lang === 'fa'
      ? [
          `<link rel="preload" href="/fonts/dana/DanaFaNum-Medium.woff2" as="font" type="font/woff2" crossorigin />`,
          `<link rel="preload" href="/fonts/dana/DanaFaNum-ExtraBold.woff2" as="font" type="font/woff2" crossorigin />`,
        ]
      : []),
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
