# Mission Meddy — Official Static Website

A responsive, high-performance static multi-page website for **Mission Meddy: The Complete Trilogy Saga**.

**Created & Produced by:** KCoder Productions (`KCoder-programming`) in partnership with **Official Faltu Studios**.

---

## Features
- **Pure Static HTML, CSS & Vanilla JavaScript**: Zero build tools, framework, or Node.js runtime required to host.
- **The Saga with Spoiler Lock**: Keeps Books I, II, & III sealed until visitors deliberately confirm they want to unlock spoilers.
- **Spoiler-Free Characters**: 9 clean dossiers introducing the universe without ruining plot twists.
- **Play & Downloads**: Honest "not released yet" status. The browser build and the Android / PC download cards are prepared as commented-out `FUTURE:` blocks (see `FUTURE-BLOCKS.md`).
- **Development Roadmap & Devlogs**: 5-stage production timeline and milestone notes. Devlogs with story spoilers are collapsed behind a spoiler tag.
- **Community notes**: A personal notes box saved in the visitor's own browser (not sent anywhere). Real feedback goes through GitHub Issues.
- **Dual Licensing**: CC BY-NC-SA 4.0 for creative content, MIT License for code.

---

## Preview Locally
1. Open `index.html` in any browser.
2. Or run a lightweight local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`.

---

## Publish with GitHub Pages (2 Minutes)
1. Create a public repository named `mission-meddy-website` under your account on GitHub (`KCoder-programming`).
2. Upload all files from this folder directly into the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch** → Branch: `main` → Folder: `/ (root)` → Click **Save**.
5. Your live website will be accessible at:
   `https://kcoder-programming.github.io/mission-meddy-website/`

---

## Repository Structure
```text
mission-meddy-website/
├── index.html                    # Home Page
├── assets/
│   ├── css/
│   │   └── style.css            # Barlow Condensed & DM Sans styles
│   ├── js/
│   │   └── main.js              # Menu, spoiler lock, notes & copy tools
│   └── images/
├── pages/
│   ├── story.html               # The Saga (Spoiler-Locked)
│   ├── characters.html          # Characters (Spoiler-Free)
│   ├── development.html         # Roadmap & Devlogs
│   ├── downloads.html           # Release status (builds are planned)
│   ├── community.html           # Channels & personal notes
│   ├── about.html               # KCoder Productions & Faltu Studios
│   ├── coming-soon.html         # Unfinished Links
│   └── licenses.html            # CC BY-NC-SA 4.0 & MIT License
├── CREDITS.md
├── FUTURE-BLOCKS.md             # Index of every commented-out (not-ready-yet) block
├── LICENSE-CODE.md
├── LICENSE-CONTENT.md
└── README.md
```

---

## Not ready yet? Look for `FUTURE:`
Anything that is not true or not available yet (browser build, download cards, trailer, itch.io, Discord, voting, devlog 04) is **commented out, not deleted**. Search the project for `FUTURE:` or open `FUTURE-BLOCKS.md`.

Also remember to add `assets/images/dev/movie.mp4` (the dev video on `development.html`); it is not included in this folder.
