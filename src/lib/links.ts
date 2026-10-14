/**
 * Centralized links registry.
 *
 * Groups:
 *   EXTERNAL_LINKS - third-party / outbound URLs
 *   PAGE_LINKS     - internal page paths (site-relative, includes BASE_PATH)
 *   ASSET_LINKS    - static asset paths   (site-relative, includes BASE_PATH)
 *   FEED_LINKS     - full absolute URLs for machine-readable resources
 *
 * NOTE: YAML frontmatter in .md/.mdx files cannot reference JS expressions,
 * so any link that lives purely in frontmatter remains a plain string there.
 */

import {
  BASE_PATH,
  ICON_HREF,
  OG_IMAGE_HREF,
  REPO_URL,
  WPANCHORBAY_URL,
  WPANCHORBAY_PROJECT_LANDING_URL,
  buildAbsoluteUrl,
} from "../../site-config.mjs";

export const EXTERNAL_LINKS = {
  /** WPAnchorBay main website */
  wpAnchorBay: WPANCHORBAY_URL,

  /** Project-specific WPAnchorBay landing page */
  wpAnchorBayProjectLanding: WPANCHORBAY_PROJECT_LANDING_URL,

  /** SpaceBay Pro product site */
  spacebayPro: "https://wpanchorbay.com/plugins/spacebay/",

  /** SpaceBay plugin page on WordPress.org */
  wordpressPlugin: "https://wordpress.org/plugins/spacebay/",

  /** GitHub repository for this documentation project */
  githubRepo: REPO_URL,
} as const;

export const PAGE_LINKS = {
  /** Documentation home */
  home: `${BASE_PATH}/`,

  /** Getting Started - Introduction */
  introduction: `${BASE_PATH}/getting-started/introduction/`,
} as const;

export const ASSET_LINKS = {
  /** Site favicon and navbar logo icon (SVG) */
  icon: ICON_HREF,

  /** OpenGraph share image (PNG) */
  ogImage: OG_IMAGE_HREF,
} as const;

export const FEED_LINKS = {
  /** Canonical root URL */
  canonical: buildAbsoluteUrl("/"),

  /** Absolute URL of the OpenGraph share image */
  ogImage: buildAbsoluteUrl("/assets/spacebay-docs-og.png"),

  /** XML sitemap index */
  sitemap: buildAbsoluteUrl("/sitemap-index.xml"),

  /** LLM-friendly documentation index */
  llms: buildAbsoluteUrl("/llms.txt"),

  /** LLM-friendly full documentation */
  llmsFull: buildAbsoluteUrl("/llms-full.txt"),
} as const;
