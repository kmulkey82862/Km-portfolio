# Katelyn Mulkey · Portfolio

A self-hosted portfolio site for **AI Operations & Marketing Systems** roles. It's a static Vite + React + TypeScript site, deployed to Netlify on your own domain.

It's a portfolio archive: work grouped by type, with the résumé content exactly as written. There's no sales copy, and résumé wording isn't rephrased.

## What's here

| Page | Content file | Notes |
| --- | --- | --- |
| **Work** (`/`) | `src/content/projects.ts` | Header with the résumé summary and contact details, then work grouped by type (see below). |
| **Résumé** (`/resume`) | `src/content/experience.ts`, `src/content/profile.ts` | Experience, skills, education, and awards, word for word from the résumé, plus the PDF download. Keep this in sync with the PDF. |
| **Lab** (`/lab`) | `src/pages/lab/*` | Browser versions of three tools on sample data (speaker graphic generator, logo resizer, client digest). |
| **Katelyn's World** (`/katelyns-world/`) | `public/katelyns-world/index.html` | The standalone HTML export, served as-is. To update it, replace that file. |

The Work page has four sections, each a list in `projects.ts`:

| Section | List | What's in it |
| --- | --- | --- |
| AI enablement | `aiEnablement` | The Claude Team rollout (with the systems diagram from `systems.ts`) and client digests. |
| Tools & automation | `tools` | The speaker graphic generator, logo resizer, and session archive pipeline. (The complimentary registration system is covered on the résumé.) |
| Marketing & creative | `marketingSites`, `creative` | The AdNet 2027 conference pages (hosted copies once imported; until then the card links to the live site) and the chronic disease convention site, plus campaign and design work once its media is imported. |
| Freelance work | `freelanceSites` | Web Deva sites: Matt Chapin, Lighthouse Strategy Group, Katelyn's World, Vermin Mother, and the component bank. |

Contact details are in the footer on every page.

**To change content, edit the files in `src/content/`.** You shouldn't need to touch any markup.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Look and feel

The site is a white background with Helvetica Now (Thin and Light) and a raspberry accent, plus a few personal touches:

- **Hero** (`src/components/Hero.tsx`): "Digital Portfolio" in bold black under a smaller "Katelyn Mulkey \| New Orleans, Louisiana" line, framed by four taped fabric squares that link to the sections.
- **Nav and title type:** the hero title and the name in the top bar use Inter Tight Bold. Helvetica Now is licensed in Thin and Light only, so it can't supply a true bold.
- **One pop of red:** poppy red (`--poppy` in `swatches.css`) is used sparingly, always with icy blue or the pinks and never with the olive. It appears as a thread in the ticking, tartan, and linen, and as the dot that marks the current page in the nav.
- **Section heads** (`src/components/Swatch.tsx`, `src/styles/swatches.css`): each section's title and description sit on a stitched label over a fabric pattern. All patterns are pure CSS.

| Section | Pattern |
| --- | --- |
| AI enablement | Icy-blue ticking stripe |
| Tools & automation | Blush and mulberry tartan with an olive line |
| Marketing & creative | Blush cabana stripe |
| Freelance work | Olive herringbone |
| Résumé | Icy-gray linen |
| Lab | Blush gingham |

To change a section's fabric, change its `pattern` prop.

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
   - To bring in the AdNet 2027 pages, also set `ADNET_PAGES_DIR` (your `liberty-strategy-group` folder). The import copies all eight pages and rewrites their links. Links between the eight pages point to the local copies; any other link points to adnetcf.org, so nothing leads to a missing page.
3. Run `npm run import-media`. Re-running skips files that haven't changed. Use `--force` to redo them, `--only hnoc,cura` to import a subset, or `--dry` for a dry run.
4. Commit `public/media/` and `media.generated.json`. Netlify serves them as static files.

`ffmpeg` comes bundled through `ffmpeg-static`, so there's nothing extra to install.

## Client confidentiality (ARB work)

Don't publish client logos, client names on assets, real people's names, or client results.

- **Logos** get the stand-in: a white or background-colored block plus `media-src/stand-in-logo-bare.png` ("Client Name · Stand-in logo · Client confidential"). A version on its own card is at `media-src/stand-in-logo.png`.
- **Data, numbers, and names** get black blocks (or white).
- **How:** add `redact` and `overlay` to the item in `media.config.json`, with coordinates in source pixels:

  ```json
  "redact":  [{ "x": 464, "y": 630, "w": 500, "h": 32 }],
  "overlay": [{ "x": 720, "y": 22, "w": 470, "h": 96, "src": "media-src/stand-in-logo-bare.png" }]
  ```

  The import applies these to the full-size original before resizing, so no unredacted version is written. Changing the config triggers a reprocess on the next import.
- **Sources in this repo** (`media-src/`) must already be redacted, because the repository is public.
- Work from your own employers (for example Comeaux) is fine to show as-is.

## Fonts

- **Helvetica Now Display:** licensed for web use. Thin and Light are served from `public/fonts/` (`src/styles/helvetica-now.css`).
- **Inter Tight:** the bold hero title and the name in the top bar use Inter Tight Bold, since Helvetica Now is licensed in Thin and Light only. Inter Tight is also the fallback while Helvetica loads.

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
