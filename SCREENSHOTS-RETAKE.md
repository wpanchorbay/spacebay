# Screenshots retake (2026-10-13)

Retaken against the dev plugin at http://127.0.0.1:8182 (new brand colour #3f22ff, Phosphor icons, three-column
layout, borderless composer, no focus rings, nested comments, admin brand bar). Capture only, no pixel editing.
Chrome via Playwright, gravatar blocked, WordPress admin bar hidden on community pages, light theme unless the file is
dark. Mobile: `portal-mobile` is 375x812 at 2x (750x1624), the other mobile files are 390x844 at 1x.

## Retaken: 42 files, same names, exact sizes from SCREENSHOTS.md

account-emails, account-profile, admin-dashboard, admin-email-settings, admin-moderation-settings,
admin-moderators, admin-points-settings, admin-settings, admin-spaces, admin-topics, bell-open, comments,
composer, composer-pending, event-page, events-calendar, feed-post, leaderboard, login, member-profile, messages,
mobile-bell-dark, mobile-events, mobile-feed-dark, mobile-moderation-dark, moderation-queue, moderation-reports,
notifications-page, pending-member, portal-admin-light, portal-dark, portal-manage, portal-members, portal-mobile,
portal-space-dark-mobile, portal-spaces, profile-badges, report-dialog, search-all, setup-2, setup-3, space-feed.

## Skipped: old file left untouched (7)

All need SpaceBay Pro, which is not installed on the test site:

- `plugins-row.png` (needs Pro active in the plugin list)
- `messages-settings.png` (Messages settings with the Pro call settings)
- `admin-profile-fields.png`, `shop-admin.png`, `shop-page.png`, `admin-login-settings.png`, `account-security.png`
  (pages under `pro/`)

These still show the old look and should be retaken once Pro is available.

## Test-site data I changed or created

- Settings: community name and welcome title set to "Creators Hub" (was "Green Hub"); WordPress site title set to
  "Creators Hub" (the admin bar shows it). `signup_enabled` was set to 1 for the login shot and put back to 0.
- Mina Rahman (user 1) bio changed to "I look after Creators Hub. Say hello in Introductions and ask me anything about
  the community."
- Post 42 (a leftover test post, "nest-1791900242011", with comments 74 and 75) was edited into "Say hello to this
  week's new members". Delete was refused, so it stays. Junk comments 73 ("cache check comment" on post 32), 74 and 75
  are leftover test data and can be deleted.
- Reports on post 19 (from users 2 and 3, spam; the post is now auto-hidden) and a member report on user 22 by user 5,
  for the moderation shots.
- Maya Patel (user 2) added as a community moderator (admin-moderators).
- Throwaway passwords set: `demo_grace` (user 24) and `demo_ethan` (user 25). Ethan posted one real-looking first post
  ("Golden hour at the city reservoir"), now held in the moderation queue (composer-pending).
- Two images uploaded to the media library by the composer shot (not posted).
- No `tmp_` users created.

## Caveats

- `pngquant` is not installed, so PNGs are not optimised (49 files, 6.6 MB in total).
- `member-profile`: the About section is below the fold at 900 px high.
- `account-emails` shows 8 notification checkboxes, not 4.
- `portal-space-dark-mobile` shows Events, Members and Manage tabs because Mina is an administrator of every space.
- `portal-manage` is Photography Club (private): join request from Ethan, a pending invitation to Isabel Garcia, space
  details; the 1755 px height cuts off the Save button.
- Admin shots show the real WP admin bar and menu at 127.0.0.1:8182, as the old ones did.
- `composer-pending`: the mouse rests over the Showcase chip, so it looks slightly darker.
- Header greeting is "Hi, Mina" text only (no emoji) in the new build.
