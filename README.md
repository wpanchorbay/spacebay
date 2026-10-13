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
- **Since tags:** SpaceBay 1.0.0 is the baseline, so pages describe 1.0.0 without any tag. Every feature, setting, hook or behaviour change released **after 1.0.0** gets a since tag, in the same commit that documents it: `<span class="sb-badge sb-badge--since">Since 1.1.0</span>` at the end of the heading (or right after the feature name in prose and table cells). Use the version of the plugin that ships it; a Pro-only feature gets both badges (`Pro` first, then `Since`, using the Pro version). Do not tag anything that was in 1.0.0, and keep the tag when a later release changes the feature (add a second line such as "Changed in 1.2.0" in the text).
- `llms.txt`, `llms-full.txt`, per-page Markdown (`/markdown/<page>.md`), `robots.txt` and the sitemap are generated at build time.

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages.
