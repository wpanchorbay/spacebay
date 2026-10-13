# SpaceBay documentation

Source of the SpaceBay and SpaceBay Pro documentation, built with [Astro Starlight](https://starlight.astro.build/).
Live site: <https://docs.wpanchorbay.com/spacebay/>

## Commands

```bash
pnpm install
pnpm run dev       # local server
pnpm run check     # type and content check
pnpm run build     # build to dist/ (also builds the search index)
pnpm run preview   # serve dist/
```

## Where things are

- `src/content/docs/` has the pages: `getting-started`, `user-guide` (with `settings`), `developers`, `pro`, `others`.
- `public/assets/screenshots/` and `public/assets/videos/` hold the images and videos. `SCREENSHOTS.md` lists every file and what it should show. Keep the file names when you replace a screenshot.
- `astro.config.mjs` holds the sidebar. `site-config.mjs` holds the base path (`/spacebay`) and the site address.
- Mark a Pro feature with `<span class="sb-badge sb-badge--pro">Pro</span>` (styles in `src/styles/badges.css`).
- `llms.txt`, `llms-full.txt`, per-page Markdown (`/markdown/<page>.md`), `robots.txt` and the sitemap are generated at build time.

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages.
