# Katelyn Mulkey · Portfolio

A self-hosted portfolio site for **AI Operations & Marketing Systems** roles. It's a static Vite + React + TypeScript site, deployed to Netlify on your own domain.

The idea is **proof, not claims**: every resume number links to the work behind it, and the `/lab` pages run working versions of tools you built, using sample data.

## What's here

| Area | Where | Notes |
| --- | --- | --- |
| Hero with the vertical name | `src/components/Hero.tsx` | KATELYN in raspberry, MULKEY in ink. On phones it stacks horizontally. |
| Results | `src/content/metrics.ts` | Each metric links to the case study or demo behind it. |
| Systems map | `src/components/SystemsMap.tsx`, `src/content/systems.ts` | Interactive "Claude as the hub" diagram. Select a node to trace its connections. |
| Lab demos | `src/pages/lab/*` | Speaker graphic generator, logo resizer (ZIP export), comp registration codes, client digest. All run in the browser on fictional data. |
| Case studies, sites, creative | `src/content/projects.ts` | Media for these comes from the import pipeline below. |
| Experience, skills, awards | `src/content/experience.ts`, `src/content/profile.ts` | Final resume wording. |

**To change content, edit the files in `src/content/`.** You shouldn't need to touch any markup.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Media pipeline (no manual uploading)

`npm run import-media` copies the files you choose from your local Google Drive sync folders into `public/media/` and optimizes them on the way:

- **Images** become AVIF and WebP at 480, 960, and 1600px wide, plus a tiny blur placeholder.
- **HEIC** files (the Cura OS phone photos) are converted first.
- **Videos** get a poster frame and, if you ask for one, a short muted web loop (8s, 720p). Long videos like the 128MB gesso promo shouldn't ship in the repo. Host the full version on Bunny Stream and put its URL in `"full"`.
- **PDF and HTML** files are copied as-is. HTML renders in sandboxed iframes.

It also writes `src/content/media.generated.json`, which the site reads. Any media id that hasn't been imported shows as a labeled placeholder in dev and is hidden in production.

**One-time setup:**

1. Copy `.env.example` to `.env.local` and set `DRIVE_ROOT` (e.g. `G:\My Drive`) and `WEB_DEVA_ROOT`.
2. Copy `media.config.example.json` to `media.config.json`. It already lists the Portfolio folders from the handoff. Fix any filenames that differ on disk.
3. Run `npm run import-media`. Re-running skips files that haven't changed. Use `--force` to redo them, `--only hnoc,cura` to import a subset, or `--dry` for a dry run.
4. Commit `public/media/` and `media.generated.json`. Netlify serves them as static files.

`ffmpeg` comes bundled through `ffmpeg-static`, so there's nothing extra to install.

## Fonts

The site uses **Inter Tight** (open license, light weights) as a stand-in. Helvetica Now Display only switches on after you confirm the license:

1. Confirm your Helvetica Now license allows **web embedding**.
2. Put the `.woff2` files in `public/fonts/`, named as listed in `src/styles/helvetica-now.css` (Hairline, ExtLt, Light, Regular, Medium).
3. Set `VITE_HELVETICA_NOW=true` in `.env.local` locally and in Netlify's environment settings.

Font files are git-ignored on purpose until the license is confirmed. Once it is, remove the `public/fonts/*` lines from `.gitignore`.

## Deploy to Netlify

1. In Netlify, choose **Add new site → Import from Git** and pick this repo. `netlify.toml` already sets the build command, publish folder, SPA redirects, and cache headers.
2. Add your custom domain under **Domain management**.
3. Update the domain in `index.html` (`canonical`, `og:url`, `og:image`). It currently says `katelynmulkey.com` as a placeholder.
4. Add `public/og-image.png` (1200×630) for link previews.

## Still needed from Katelyn

- [ ] **Resume PDF:** save `Katelyn_Mulkey_Resume_Redesign.pdf` as `public/Katelyn_Mulkey_Resume.pdf`. The download buttons already point to it.
- [ ] **Domain**, and whether the site lives under your name or the Web Deva brand.
- [ ] **Client permissions:** which ARB client work (Equifax/NAMD emails, sponsor pages, dashboard, AdNet plan) you can show. The email gallery component (`DeviceFrame`) is ready for approved HTML emails.
- [ ] **Second session archive URL** (NAMD?).
- [ ] **Source files for the speaker graphic tool and logo resizer**, in case you want to compare them with the lab rebuilds.
- [ ] **Helvetica Now web license** (see Fonts).
- [ ] **Spelling of "YourEvent"**. It's left out of the skills list until confirmed.
- [ ] **Favorite pieces** from the portfolio folders. Add them to `media.config.json` and `creative` in `projects.ts`.
- [ ] **LinkedIn URL**, which goes in `profile.ts`.

## Privacy rules this repo follows

- **Every demo uses fictional people, companies, and `example.org` addresses.** Never commit `headshots-data.js` or real speaker headshots.
- **Client materials stay out until permission is confirmed.** Prefer public finals, anonymized versions, or blurred screenshots.
- **The chronic disease convention site is labeled "In progress"** because it's on a staging URL. Switch it to the live URL at launch, in `projects.ts`.
- **The in-progress AI time tracker is intentionally not presented** as a finished tool.
