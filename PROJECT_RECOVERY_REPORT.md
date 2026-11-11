# PROJECT RECOVERY REPORT — Glocious Website Migration

**Project:** `c:\My Web Sites\glocious-redesign`
**Audit / recovery date:** 2026-11-11
**Auditor role:** Recovery / continuation agent
**Source design (UI, animations, layout):** `https://www.turaingrp.com/` (HTTrack clone)
**Source content (copy, data, branding):** `https://glocious.com/`
**Nature of work:** Content & asset migration — **NOT a redesign**

> This report supersedes the earlier draft. Every claim below was re-verified against the
> files on disk (grep, link crawl, asset scan). Items that the earlier draft marked as
> "outstanding" were in fact already complete; they are corrected here.

---

## 1. Executive Summary

The migration is **functionally complete and production-ready**. The site is a
**static HTML/CSS/JS website** (no framework, no build tooling, no runtime API keys) whose
project root **is** the site root.

| Area | Status |
|------|--------|
| Page count | 15 HTML pages, all Glocious-branded |
| Turain string residue | **0 matches** in any `.html` / `.css` / `.js` / `.xml` / `.php` |
| Kolkata / West Bengal (Turain geography) | **0 matches** — retargeted to Delhi NCR / Ghaziabad |
| Dead routes | `call-center-suite/` removed → replaced by `/lms/` |
| Brand accent re-theme | **Applied** (green `#008522`, magenta `#E30086`, crimson `#DE003E`) |
| Contact form backend | **Working** — `contact/contact-submit.php` exists; 23 form actions all resolve |
| reCAPTCHA | 8 widgets rendered; handler never hard-blocks when the secret is empty |
| Internal links / assets | **0 broken references** (1,097 `src`/`href` checked) |
| Form actions | **0 broken** (23 checked) |
| True orphaned assets | **0** (3 found and removed in this pass; 211 KB reclaimed) |
| Sitemap | 15 `<loc>` entries, all matching live routes |
| `.htaccess` | Complete (HTTPS + non-www canonical, clean URLs, deflate, expires, security headers) |

**One item needs an owner decision:** the homepage hero video
`assets/images/main_video1.mp4` (12.7 MB) is inherited Turain footage. It works, but it is
not Glocious material. See [§6 — Remaining issues](#6-remaining-issues).

---

## 2. Project Structure (verified on disk)

```
glocious-redesign/                     <- site root (= web root / public_html)
├── index.html                         <- Homepage (Glocious) — entry point
├── sitemap.xml                        <- 15 URLs
├── robots.txt
├── .htaccess                          <- Apache config for cPanel / shared hosting
├── PROJECT_RECOVERY_REPORT.md         <- this file
├── ASSET_REPLACEMENT_MAP.md           <- asset + content mapping
├── MIGRATION_REPORT.md                <- final report / run / deploy instructions
├── GLOCIOUS_CONTENT_INVENTORY.md      <- verbatim content capture from glocious.com
├── TURAIN_PAGE_INVENTORY.md           <- original clone inventory (reference only)
├── about-us/index.html
├── bulk-sms-service-provider/index.html
├── contact/index.html
├── contact/contact-submit.php         <- form handler (PHP mail + reCAPTCHA + rate limit)
├── digital-marketing/index.html
├── email-marketing/index.html
├── industries/index.html
├── interactive-voice-response/index.html
├── lms/index.html
├── privacy-policy/index.html
├── refund/index.html
├── terms-and-conditions/index.html
├── voice-call-solution/index.html
├── web-development-company/index.html
├── whatsapp-marketing/index.html
├── assets/
│   ├── css/    style.css, styleec92.css [byte-identical], nav2.css, remixicon.css
│   ├── js/     nav2.js (all pages), scripts.js (homepage), product.js (homepage), copy.js, …
│   ├── fonts/  remixicon9711.{eot,ttf,woff,woff2}
│   └── images/ 108 top-level files (107 images + main_video1.mp4)
│                + subfolders companies/, icons/, logos/, technology/
├── cdnjs.cloudflare.com/              <- self-hosted vendor mirror
├── unpkg.com/                         <- self-hosted vendor mirror (Lenis)
└── www.google.com/                    <- self-hosted vendor mirror (reCAPTCHA api.js)
```

- **Homepage entry point:** `index.html` loads Glocious directly. No HTTrack splash/landing page. ✅
- **Removed since the clone:** `connect.facebook.net/` (Meta pixel, 431 KB, zero references),
  `www.googletagmanager.com/` (empty GTM shell), `call-center-suite/` (Turain product page).
- **Not a Git repository** — the brief's "do not reset Git" instruction is moot.

---

## 3. Verification Evidence

All of the following were executed against the working tree during this recovery pass.

| # | Check | Command / method | Result |
|---|-------|------------------|--------|
| 1 | Turain residue | grep `turain\|turaingrp\|dial2connekt\|dial2connect` (all non-`.md`) | **0 matches** |
| 2 | Turain geography | grep `kolkata\|west bengal\|bengal` (all non-`.md`) | **0 matches** |
| 3 | Old route | grep `call-center-suite` | **0 matches** |
| 4 | Broken internal refs | resolved 1,097 `src`/`href` values against disk | **0 broken** |
| 5 | Broken form actions | resolved 23 `action` values against disk | **0 broken** |
| 6 | Contact endpoint | `contact/contact-submit.php` present, 308 lines, `MAIL_TO=info@glocious.com` | **OK** |
| 7 | reCAPTCHA widgets | grep `data-sitekey` | **8 widgets in 8 pages** |
| 8 | Titles | grep `<title>` | **15/15 pages** |
| 9 | Brand tokens | `style.css` `:root` | `--primary:#008522`, `--pink:#E30086`, `--secondary:#DE003E` |
| 10 | Orphaned assets | every file under `assets/` matched against all HTML/CSS/JS/XML/PHP | **0 remaining** |
| 10a | CSS `url()` targets | resolved 48 against disk | **0 active broken** (2 hits sit inside commented-out rules) |
| 10b | Legacy blue/purple in HTML | grep `#626CAB\|#2E3E9E\|#9272df\|#445279\|#2A3554` | **0 matches** |
| 10c | Third-party logos unmodified | grep Glocious palette hex in `technology/`, `logos/` | **0 matches** |
| 11 | Lenis asset path | grep `lenis%40` | **0** (normalised to `lenis@1.3.11`) |
| 12 | Sitemap | `sitemap.xml` | **15 `<loc>`**, includes `/lms/` and `/digital-marketing/` |

---

## 4. Completed Work

### 4.1 Content & branding
- All 15 pages carry Glocious `<title>`, meta description, canonical, Open Graph, Twitter card
  and JSON-LD graphs using **real** Glocious data
  (+91 9319499699 · info@glocious.com · F-202… Aditya Plaza-II, Kaushambi, Ghaziabad, Uttar Pradesh 201010).
- Navigation and footer rebuilt around Glocious routes, services and social profiles
  (LinkedIn, Instagram, Facebook, X, Pinterest).
- Zero fabricated testimonials, client names or statistics. The four verified testimonials
  (Ritik Raj Patan / Flipkart, Anki Suman / Amazon Retail, Ranjan Kumar / Ebay Global, Aman Singh)
  are the only ones present.
- Source-faithful quirks preserved verbatim: the "Thoudsands" typo and the nav label
  "LMS (Lead Management Software)".

### 4.2 Route correction — Turain product page
The clone's `call-center-suite/` page was serving Turain's **"Call Center Suite / Dial2connekt"**
product under a Glocious title, while every nav/footer link labelled it "LMS".
- Replaced with verbatim Glocious **Lead Management Software** content at `/lms/`.
- Removed the `call-center-suite/` folder.
- Repointed **28 links** across 14 pages and updated `sitemap.xml`.

### 4.3 Route rename — `digital-marketing-agency-kolkata` → `digital-marketing`
- Folder renamed.
- **27 link/URL substitutions** across 12 HTML files + `sitemap.xml`.

### 4.4 Geographic retarget — Kolkata / West Bengal → Delhi NCR / Ghaziabad
Turain is a Kolkata company; the clone's geo-targeting was inherited wholesale. Retargeted in:
- `digital-marketing/` — SEO head block, keywords, JSON-LD (`areaServed`, `@id` fragments,
  Offer names), H1/hero, service headings, "Why Glocious…" block, "Areas served" list,
  city field placeholder, 2 FAQs.
- `whatsapp-marketing/` — title/description/OG/Twitter, JSON-LD `name` + `areaServed`, H1/h3,
  body copy, FAQ, city-agnostic CTA copy.
- `web-development-company/` — title/description/OG/Twitter, JSON-LD `name`/`description`,
  H1/h3, 6 body paragraphs, image `title`, city field placeholder.
- `bulk-sms-service-provider/` — JSON-LD `@id` `#kolkata-office` → `#delhi-ncr-office`.
- Areas-served list replaced with a genuine Delhi NCR list: Kaushambi, Vaishali, Indirapuram,
  Ghaziabad, Noida, Greater Noida, East Delhi, New Delhi, Gurugram, Faridabad, Meerut, Hapur.

### 4.5 Brand accent re-theme
`:root` tokens in `style.css` / `styleec92.css` now resolve to the Glocious palette.
The legacy aliases (`--royal-blue`, `--sky-blue`, `--soft-magenta`) are **kept as variable names**
but repointed to the new colours, so every existing rule that referenced them updated
automatically — no layout, spacing or animation was touched.

### 4.6 Contact form
- All **23** forms post to `contact/contact-submit.php` (relative path).
- Handler: `mail()` delivery to `info@glocious.com`, honeypot timing (`MIN_FILL_SECONDS = 3`),
  file-based IP rate limiting (5/hour), input sanitisation, duplicate-key-tolerant field
  mapping (`name`/`full_name`, `email`/`business_email`, `phone`/`phone_no`, `city`/`citys`).
- reCAPTCHA v2 verification is **guarded**: it only runs when the POST contains
  `g-recaptcha-response`, and returns `true` when `RECAPTCHA_SECRET` is empty — so the form
  can never be hard-blocked by a missing key. Fill in the secret before go-live.

### 4.7 Housekeeping
- Fixed a real bug: ten pages referenced the Lenis bundle as `lenis%401.3.11` while the folder
  is literally `lenis@1.3.11` — all ten normalised.
- Deleted unreferenced tracking vendor folders (`connect.facebook.net/`, `www.googletagmanager.com/`).
- Deleted the three genuine orphan assets (`content_marketing.webp`, `Customer.svg`,
  `glocious-mark.png` — the last a byte-identical MD5 duplicate of `favicon.png`).
- Removed dead commented-out markup in `index.html` (the only broken reference in the tree).
- Deleted the dead `unpkg.com/@studio-freight/lenis@1.0.42/` 404 mirror stub (0 references; the
  live Lenis bundle is `unpkg.com/lenis@1.3.11/dist/lenis.min.js`).
- `assets/css/style.css` and `styleec92.css` are byte-identical duplicates — both are referenced
  by different pages, so both are retained deliberately.

### 4.8 Residual brand-colour alignment (this recovery pass)
The re-theme was originally applied at the **CSS token** level only, which left legacy Turain
blue/purple values in *inline* HTML styles and in the theme SVG icon set. Aligned in this pass:
- **Inline HTML hex** repointed to the Glocious palette across the 15 pages.
- **Theme SVG icons** recoloured (`#626CAB`→`#008522`, `#445279`→`#0A5A1C`, `#2A3554`→`#0A3D14`;
  `vision.svg` `#DEE2F7`→`#D9F2DF`, `#E05696`→`#E30086`, `#CD347B`→`#DE003E`, `#2E3E9E`→`#008522`).
  **Fills only — no geometry/viewBox/path data changed.**
- **Deliberately excluded:** `assets/images/technology/` and `assets/images/logos/` — these are
  third-party trademarks and must not be recoloured (verified: 0 Glocious-palette hex present).

---

## 5. Correction Log (earlier draft vs. verified reality)

| Earlier draft claim | Verified reality |
|---------------------|------------------|
| "Accent re-theme NOT applied (still Turain blue `#1B2A7A`)" | **Applied** — `--primary:#008522`, `--pink:#E30086`, `--secondary:#DE003E` |
| "Contact form has no working backend; posts to a non-existent PHP file; uses `mailto:`; no reCAPTCHA widget" | **False** — `contact/contact-submit.php` exists; all 23 forms post to it; 8 reCAPTCHA widgets rendered |
| "~32 orphaned Turain assets remain" | **0** true orphans remain (earlier counts ignored CSS `url()` references) |
| "Fabricated testimonials / case studies present" | **Not present** — 0 matches for every previously listed fabricated name |
| "`www.googletagmanager.com/` and `connect.facebook.net/` vendor folders" | **Deleted** — zero references |
| "`call-center-suite/index.html` and `digital-marketing-agency-kolkata/index.html` in structure" | **Renamed/removed** → `/lms/` and `/digital-marketing/` |
| "`~8 unused Turain solution MP4s`" | **1** `.mp4` on disk: `main_video1.mp4` (12.7 MB), used by the homepage hero |

---

## 6. Remaining Issues

| # | Severity | Issue | Recommended action |
|---|----------|-------|--------------------|
| R1 | Medium | `assets/images/main_video1.mp4` (12.7 MB) is inherited Turain footage shown in the homepage hero. | Owner to supply Glocious footage and overwrite the same filename. Keep for now (user decision). |
| R2 | Resolved | `assets/images/glocious-mark.png` (unreferenced duplicate of `favicon.png`) has been deleted. | None — closed. |
| R3 | Low | `RECAPTCHA_SECRET` in `contact-submit.php` is empty. | Paste the production secret before go-live (or set env `GLOCIOUS_RECAPTCHA_SECRET`). |
| R4 | Low | `www.google.com/recaptcha/api.js` is self-hosted; Google updates this script periodically. | Fine for now; re-download if reCAPTCHA breaks. |
| R5 | Info | Homepage is ~13 MB heavier than the rest of the site because of R1. | Resolved together with R1. |
| R6 | Info | `GLOCIOUS_CONTENT_INVENTORY.md` and `TURAIN_PAGE_INVENTORY.md` are internal working documents that still name Turain. | They are **not** linked from the site and `.htaccess` blocks `.md` from public serving (`Require all denied`). Keep privately or delete before upload. |

---

## 7. Constraints & Decisions (from the user)

- **Palette:** *Re-theme accents only* — layouts, animations and dark surfaces preserved. ✅ done
- **Contact form:** *Keep PHP endpoint*. ✅ done
- **Hosting:** *cPanel with PHP*. ✅ `.htaccess` + `contact-submit.php` prepared
- **Trust badges:** *Remove whole badge row*. ✅ done
- **reCAPTCHA:** *Keep widget, never hard-block*. ✅ done (guarded verification)
- **Turain assets:** *Delete all orphans*. ✅ done (only genuine orphans removed)
- **Hero video:** *Keep it, flag for your review*. ✅ flagged as R1
- **Geography:** *Retarget to Delhi NCR / Ghaziabad*. ✅ done
- Do not start from scratch · do not overwrite working implementations · do not fabricate data ·
  do not make the site entirely blue · no framework migration · no Git operations.

---

## 8. Follow-up (this recovery pass)

- ✅ `ASSET_REPLACEMENT_MAP.md` — created (was referenced but missing).
- ✅ `MIGRATION_REPORT.md` — created (final report + local run + deployment instructions).
- ✅ Residual inline/SVG brand colours aligned (§4.8).
- ✅ Dead `unpkg.com/@studio-freight/` mirror stub removed; orphan count now **0**.
- ⏳ R1 / R3 remain owner actions (hero video footage; reCAPTCHA secret).

See [MIGRATION_REPORT.md](MIGRATION_REPORT.md) §7 for the consolidated final issue list (V1–V6).
