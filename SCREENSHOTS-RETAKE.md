# Retaking the screenshots

How the screenshots in `public/assets/screenshots/` are made, so they can be taken again. The file names and sizes
are in `SCREENSHOTS.md`; keep them. Capture only, no pixel editing.

## Where the tools live

Everything is in `/home/forhad/projects/spacebay-demo/`:

- `seed/`: the PHP seed scripts (`boot.php` shared setup, then `seed1.php` to `seed4.php`, plus `fix.php`) and
  `make_posts.py` with `posts.json`. Run each with `wp eval-file`, in order.
  1. `seed1.php`: members, profiles, avatars, covers, spaces, topics.
  2. `seed2.php`: posts, comments and likes over the last two weeks.
  3. `seed3.php`: events, chats, reports, points and badges.
  4. `seed4.php`: live activity aimed at Emma, so the bell has content.
- `people.json`: the 31 members (login, name, headline, location, bio, avatar look).
- `avatars/`, `covers/`, `banners/`, `images/`, `shop/`: the artwork the seed uploads.
- `shots/`: the Playwright scripts (`lib.mjs` holds the shared setup; the others take the shots).
- `out/`: where the shots land (set `OUT` to change it).

The scripts expect the dev site at `http://127.0.0.1:8182`, a Chrome at `/usr/bin/google-chrome`, and Playwright
from the Playwright MCP install (see `shots/lib.mjs`).

## The demo community

- Name: **Creators Hub**. Site time zone `Europe/London`. Brand colour `#3f22ff`. English, light theme unless the
  file is a dark one.
- 31 members with English names. Their avatars are illustrations made with DiceBear "avataaars" by Pablo Stanley
  (free for commercial use; credit DiceBear and Pablo Stanley wherever the avatars are published). The covers, post
  images and other illustrations were made by Kolpona.
- 8 spaces: Announcements, General, Introductions, Showcase, Product Ideas, Events & Meetups, Photography Club
  (private) and Beta Testers (secret).
- Profile fields: Company, Role and Portfolio.
- Two-factor sign-in is optional. Voice and video calls are on.

## Demo accounts

These are for a throwaway local demo site only. Never use them anywhere else.

| Account | Role | Password |
| --- | --- | --- |
| `emma` (Emma Clarke) | Administrator | `admin-test-pw` |
| every other member | Member | `demo-pw-2026` |

`shots/lib.mjs` logs in with these when a script names a user.

## Free and Pro shots

- **Free-plugin screenshots are taken with SpaceBay Pro deactivated.** Pro adds a **Shop** item to the navigation and
  shop strips to some pages, and the free docs must not show them.
- **Pro screenshots are taken with SpaceBay Pro active.** These are `plugins-row`, `messages-settings`,
  `admin-profile-fields`, `shop-admin`, `shop-page`, `admin-login-settings` and `account-security`.
- Pro data: the shop **Mercer Print Studio** (owner Sam Mercer) with 3 products and 1 more awaiting review, and 1
  pending shop request. This data is not in `seed/`; it is set up on the site before the Pro shots.

## Rules for every shot

- Chrome through Playwright, gravatar and web fonts blocked, the WordPress admin bar hidden on community pages.
- Desktop shots are 1440x900 unless `SCREENSHOTS.md` says otherwise. `portal-mobile` is 375x812 at 2x (750x1624);
  the other phone shots are 390x844 at 1x.
- Dates in the data are relative to today, so seed again and take all shots on the same day.
- Look at each file before it goes in: no real names, no emoji in the header greeting, nothing cut off.

## What the shots should show now

- `comments`: nested replies, each indented under the comment it answers.
- `account-emails`: the **Email me when…** list with all 8 tick boxes (messages, events and points on).
- `space-feed`: a space with a pinned post. The "From our members' shops" strip is Pro, so it is not in free shots.
- `messages`: an open group chat.
- `events-calendar`: the Calendar tab with a month calendar.
- `composer`: the title field, the text, two images, topics and the space picker.

## Before you publish

- Remove the demo site's leftover test posts and comments, and any extra users made for a shot.
- Run an image optimiser on the PNGs if one is installed (`pngquant` was not on the last machine).
- Update `SCREENSHOTS.md` if a "Should show" cell no longer matches.
