// Runs after `vite build` and `vite build --ssr`: writes static HTML for / (fa) and /en/ (en),
// plus sitemap.xml and robots.txt. No browser needed.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-server')

const { render, SITE_URL, urlFor } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const pages = [
  { lang: 'fa', dir: 'rtl', out: 'index.html' },
  { lang: 'en', dir: 'ltr', out: path.join('en', 'index.html') },
]

for (const p of pages) {
  const { html, head } = render(p.lang)
  const page = template
    .replace(/<html[^>]*>/, `<html lang="${p.lang}" dir="${p.dir}">`)
    .replace('<!--seo-->', head)
    .replace('<!--app-->', html)
  if (page.includes('<!--app-->') || page.includes('<!--seo-->')) throw new Error('template markers missing')
  await mkdir(path.dirname(path.join(dist, p.out)), { recursive: true })
  await writeFile(path.join(dist, p.out), page)
}

const lastmod = new Date().toISOString().slice(0, 10)
const alt = (l, u) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${u}"/>`
const urlEntry = (l) => `  <url>
    <loc>${urlFor(l)}</loc>
    <lastmod>${lastmod}</lastmod>
${alt('fa', urlFor('fa'))}
${alt('en', urlFor('en'))}
${alt('x-default', urlFor('fa'))}
  </url>`
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntry('fa')}\n${urlEntry('en')}\n</urlset>\n`,
)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
await rm(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${pages.length} pages for ${SITE_URL}`)
