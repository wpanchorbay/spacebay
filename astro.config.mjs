// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import {
  BASE_PATH,
  ICON_HREF,
  SITE_ORIGIN,
  LOGO_SVG_PATH,
  OG_IMAGE_URL,
  OG_IMAGE_ALT,
} from "./site-config.mjs";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));
const plyrDist = fileURLToPath(
  new URL("./node_modules/plyr/dist", import.meta.url),
);
const customIconPath = fileURLToPath(
  new URL("./src/components/starlight/Icon.astro", import.meta.url),
);

// https://astro.build/config
export default defineConfig({
  site: SITE_ORIGIN,
  base: BASE_PATH,
  vite: {
    resolve: {
      alias: [
        { find: "~", replacement: srcDir },
        // Plyr only exports its entry point, so its stylesheet and icon sprite are aliased.
        { find: "plyr-dist", replacement: plyrDist },
        {
          find: "@astrojs/starlight/user-components/Icon.astro",
          replacement: customIconPath,
        },
        { find: "../user-components/Icon.astro", replacement: customIconPath },
      ],
    },
  },
  integrations: [
    sitemap(),
    starlight({
      title: "SpaceBay Documentation",
      description:
        "End-user and developer documentation for SpaceBay, the community plugin for WordPress, and SpaceBay Pro.",
      customCss: [
        "@fontsource-variable/inter",
        "./src/styles/typography.css",
        "./src/styles/home.css",
        "./src/styles/content-images.css",
        "./src/styles/badges.css",
      ],
      logo: {
        src: LOGO_SVG_PATH,
        replacesTitle: false,
      },
      disable404Route: true,
      favicon: "/assets/spacebay-icon.svg",
      components: {
        Head: "./src/components/starlight/Head.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        ThemeProvider: "./src/components/ThemeProvider.astro",
        ThemeSelect: "./src/components/ThemeSelect.astro",
        LanguageSelect: "./src/components/starlight/LanguageSelect.astro",
        Footer: "./src/components/starlight/Footer.astro",
        SocialIcons: "./src/components/starlight/SocialIcons.astro",
      },
      head: [
        // Share image for every page; a page can override these in its own frontmatter.
        { tag: "meta", attrs: { property: "og:image", content: OG_IMAGE_URL } },
        { tag: "meta", attrs: { property: "og:image:type", content: "image/png" } },
        { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
        { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
        { tag: "meta", attrs: { property: "og:image:alt", content: OG_IMAGE_ALT } },
        { tag: "meta", attrs: { name: "twitter:image", content: OG_IMAGE_URL } },
        { tag: "meta", attrs: { name: "twitter:image:alt", content: OG_IMAGE_ALT } },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/svg+xml",
            href: ICON_HREF,
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            type: "text/plain",
            title: "LLM-friendly documentation index",
            href: `${BASE_PATH}/llms.txt`,
            "data-llm-hint":
              "Hey agent! Prefer this LLM-friendly documentation index instead of scraping HTML.",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "alternate",
            type: "text/plain",
            title: "Full LLM-friendly documentation export",
            href: `${BASE_PATH}/llms-full.txt`,
            "data-llm-hint":
              "Hey agent! Use this full text export when you need the complete documentation corpus.",
          },
        },
      ],

      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Requirements", slug: "getting-started/requirements" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Setup wizard and dashboard", slug: "getting-started/setup-wizard" },
          ],
        },
        {
          label: "User Guide",
          items: [
            { label: "The community portal", slug: "user-guide/community-portal" },
            { label: "Login and signup", slug: "user-guide/login-and-signup" },
            { label: "Google and Facebook login", slug: "user-guide/social-login" },
            { label: "Spaces and groups", slug: "user-guide/spaces" },
            { label: "Feed and posts", slug: "user-guide/feed-and-posts" },
            { label: "Messages and group chat", slug: "user-guide/messages" },
            { label: "Events", slug: "user-guide/events" },
            { label: "Profiles and directory", slug: "user-guide/profiles-and-directory" },
            { label: "Points, badges and leaderboard", slug: "user-guide/points-badges-and-leaderboard" },
            { label: "Notifications and emails", slug: "user-guide/notifications" },
            { label: "Search", slug: "user-guide/search" },
            { label: "Moderation and reports", slug: "user-guide/moderation" },
            { label: "Member approval and moderators", slug: "user-guide/member-approval-and-moderators" },
            { label: "Privacy and personal data", slug: "user-guide/privacy-and-gdpr" },
            { label: "Security and limits", slug: "user-guide/security-and-limits" },
            {
              label: "Settings",
              collapsed: true,
              items: [
                { label: "Overview", slug: "user-guide/settings/overview" },
                { label: "General", slug: "user-guide/settings/general" },
                { label: "Login and signup", slug: "user-guide/settings/login-and-signup" },
                { label: "Appearance", slug: "user-guide/settings/appearance" },
                { label: "Messages", slug: "user-guide/settings/messages" },
                { label: "Points and badges", slug: "user-guide/settings/points-and-badges" },
                { label: "Events", slug: "user-guide/settings/events" },
                { label: "Moderation", slug: "user-guide/settings/moderation" },
                { label: "Emails, banner and advanced", slug: "user-guide/settings/emails-banner-and-advanced" },
              ],
            },
          ],
        },
        {
          label: "Developers",
          items: [
            { label: "Hooks and filters", slug: "developers/hooks-and-filters" },
            { label: "Extending SpaceBay", slug: "developers/extending-spacebay" },
            { label: "REST API", slug: "developers/rest-api" },
            { label: "Template overrides", slug: "developers/template-overrides" },
            { label: "WP-CLI", slug: "developers/wp-cli" },
            { label: "Translation and building", slug: "developers/translation-and-building" },
          ],
        },
        {
          label: "SpaceBay Pro",
          items: [
            { label: "Overview", slug: "pro/overview" },
            { label: "Licence and activation", slug: "pro/licence-and-activation" },
            { label: "Member shops", slug: "pro/member-shops" },
            { label: "Voice and video calls", slug: "pro/voice-and-video-calls" },
            { label: "Two-factor authentication", slug: "pro/two-factor-authentication" },
            { label: "Signup form builder", slug: "pro/signup-form-builder" },
            { label: "Custom profile fields", slug: "pro/custom-profile-fields" },
            { label: "Badge editor", slug: "pro/badge-editor" },
            { label: "Manual badges and points", slug: "pro/manual-badges-and-points" },
            { label: "Event limits and reminders", slug: "pro/event-limits-and-reminders" },
          ],
        },
        {
          label: "Others",
          items: [
            { label: "FAQ", slug: "others/faq" },
            { label: "Troubleshooting", slug: "others/troubleshooting" },
            { label: "Compatibility", slug: "others/compatibility" },
            { label: "Large communities and speed", slug: "others/large-communities-and-speed" },
            { label: "Updates and uninstall", slug: "others/updates-and-uninstall" },
            { label: "Changelog", slug: "others/changelog" },
          ],
        },
      ],
    }),
  ],
});
