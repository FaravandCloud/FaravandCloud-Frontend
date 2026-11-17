# Faravand website

The company website of Faravand Intelligent Processing: a single landing page in Persian and English that introduces the company, what it works on, and its products.

- Persian: https://faravandtech.ir
- English: https://faravandtech.ir/en/

## Run it locally

```bash
npm install
npm run dev
```

To create the production version, run `npm run build`. The result is placed in the `dist` folder.

## Deploy

Connect this repository to Vercel and deploy with the default settings, then add the `faravandtech.ir` domain in the project's Domains page.

## Edit the content

All text in both languages, the contact details, social links and the product list live in one file: `src/content/site.ts`. Change it there and the whole site follows.

The image shown when the site is shared in a chat or on social media is `public/og.png`.

## Brand assets

- Logos in every form and colour: `public/brand/`
- Browser icons: `public/favicon.svg` and the icon files next to it
- Fonts: Dana for Persian, Sora for English

The source of the logos and the rest of the brand kit is the `faravand-brand` repository.
