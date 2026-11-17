import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import type { Lang } from './content/site'
import { LangProvider } from './lib/lang'
import { applyHead } from './seo'

const root = document.getElementById('root')!
const lang: Lang = location.pathname.startsWith('/en') ? 'en' : 'fa'
const tree = (
  <StrictMode>
    <LangProvider initialLang={lang}>
      <App />
    </LangProvider>
  </StrictMode>
)

if (root.firstElementChild) {
  hydrateRoot(root, tree)
} else {
  // dev server (no prerender)
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'
  applyHead(lang)
  createRoot(root).render(tree)
}
