export const SITE_ORIGIN =
  process.env.SITE_ORIGIN ||
  process.env.PUBLIC_SITE_ORIGIN ||
  "https://docs.wpanchorbay.com";

export const BASE_PATH = "/spacebay";

export const REPO_URL =
  process.env.DOCS_REPO_URL ??
  "";

export const LOGO_SVG_PATH = "./src/assets/spacebay-icon.svg";

/** Absolute site-relative path to the icon used as the page favicon and navbar logo. */
export const ICON_HREF = `${BASE_PATH}/assets/spacebay-icon.svg`;

/** Absolute site-relative path to the OpenGraph share image. */
export const OG_IMAGE_HREF = `${BASE_PATH}/assets/spacebay-docs-og.png`;

/** Absolute URL of the OpenGraph share image (crawlers need a full URL). */
export const OG_IMAGE_URL = new URL(OG_IMAGE_HREF, SITE_ORIGIN).toString();

export const OG_IMAGE_ALT = "SpaceBay Documentation by WPAnchorBay";

export const WPANCHORBAY_URL = "https://wpanchorbay.com";
export const WPANCHORBAY_PROJECT_LANDING_URL = "https://wpanchorbay.com/plugins/spacebay/";

export function buildAbsoluteUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(`${BASE_PATH}${normalizedPath}`, SITE_ORIGIN).toString();
}
