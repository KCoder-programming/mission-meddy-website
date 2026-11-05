# FUTURE blocks (hidden until ready)

Everything that is not true or not ready yet has been **commented out, not deleted**, so the exact markup is still here.
Search the project for `FUTURE:` to find them all. Each comment explains how to switch it back on.

| File | Line | Block |
|---|---|---|
| `index.html` | 102 | OFFICIAL TRAILER SECTION (hidden until the trailer exists) |
| `pages/community.html` | 80 | ITCH.IO TILE |
| `pages/community.html` | 98 | DISCORD TILE |
| `pages/development.html` | 123 | DEVELOPER NOTE (editor-only hint, not for visitors) |
| `pages/development.html` | 190 | DEVLOG 04 - Cross-platform builds |
| `pages/development.html` | 224 | VOTE FOOTER (Upvote button + counter) |
| `pages/development.html` | 243 | VOTE FOOTER (Upvote button + counter) |
| `pages/development.html` | 262 | VOTE FOOTER (Upvote button + counter) |
| `pages/downloads.html` | 90 | browser build button. When the web build is live, replace the <span> above with: |
| `pages/downloads.html` | 120 | NATIVE BUILD CARDS (Android APK / Windows / Linux) |
| `pages/downloads.html` | 269 | EXAMPLE RELEASE-NOTES TEMPLATE (the claims below are NOT true yet: rewrite them before use) |
| `pages/downloads.html` | 285 | RELEASE DOWNLOAD LINK for v0.1.0-Alpha |

## Placeholders to replace when you enable a block

- `GAME_REPO` - the GitHub repository that hosts the game releases is `mission-meddy` (this website's repo is `mission-meddy-website`).
- `vX.Y.Z`, `FILENAME`, `SIZE`, `PASTE_REAL_SHA256_HERE` - real release values. Get the checksum with `sha256sum <file>`.
- `WEB_BUILD_URL`, `DISCORD_INVITE_URL`, `VIDEO_ID` - the real links once they exist.

## Not an HTML block

- Voting code in `assets/js/main.js` (section 6) is dormant: it only runs when `[data-vote-item]` buttons exist on the page.
