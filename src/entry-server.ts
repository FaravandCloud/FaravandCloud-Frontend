import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import type { Lang } from './content/site'
import { LangProvider } from './lib/lang'
import { buildHead } from './seo'

export function render(lang: Lang) {
  const html = renderToString(createElement(LangProvider, { initialLang: lang, children: createElement(App) }))
  return { html, head: buildHead(lang) }
}

export { SITE_URL, urlFor } from './content/config'
