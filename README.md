# Faravand website

The company website of Faravand Intelligent Processing: a single landing page in Persian and English that introduces the company, what it works on, and its products.

- Persian: https://www.faravandtech.ir
- English: https://www.faravandtech.ir/en/

## Run it locally

```bash
npm install
npm run dev
```

To create the production version, run `npm run build`. The result is placed in the `dist` folder.

## Deploy

Connect this repository to Vercel and deploy with the default settings, then add the `faravandtech.ir` domain in the project's Domains page.

## Search engines

The site publishes a sitemap at `/sitemap.xml` and a `robots.txt`, and every page carries its own title, description and share image.

To register it in Google Search Console, add `faravandtech.ir` as a Domain property and confirm ownership with the DNS record Google gives you, then submit `https://www.faravandtech.ir/sitemap.xml` under Sitemaps. If you prefer the HTML tag method instead, set the code as `VITE_GOOGLE_SITE_VERIFICATION` in the Vercel project settings and redeploy.

## Edit the content

All text in both languages, the contact details, social links and the product list live in one file: `src/content/site.ts`. Change it there and the whole site follows.

The image shown when the site is shared in a chat or on social media is `public/og.png`.

## Brand assets

- Logos in every form and colour: `public/brand/`
- Browser icons: `public/favicon.svg` and the icon files next to it
- Fonts: Dana for Persian, Sora for English

The source of the logos and the rest of the brand kit is the `faravand-brand` repository.
