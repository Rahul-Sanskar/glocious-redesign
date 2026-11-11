# MIGRATION REPORT — Glocious Website

**Project:** `c:\My Web Sites\glocious-redesign`
**Report date:** 2026-11-11
**Source design (UI, animation, layout):** `https://www.turaingrp.com/` (HTTrack clone)
**Source content & branding:** `https://glocious.com/`
**Result:** Fully migrated, static, production-ready Glocious website that retains the cloned
Turain UI and motion experience.

> This is the **final migration report** (Phase 10). It contains the page inventory, the results
> of the completed migration, verification evidence, the remaining-issues list, and both
> **local run** and **production deployment** instructions.
>
> Companion documents: [PROJECT_RECOVERY_REPORT.md](PROJECT_RECOVERY_REPORT.md) (audit) ·
> [ASSET_REPLACEMENT_MAP.md](ASSET_REPLACEMENT_MAP.md) (media map) ·
> [GLOCIOUS_CONTENT_INVENTORY.md](GLOCIOUS_CONTENT_INVENTORY.md) (source copy) ·
> [TURAIN_PAGE_INVENTORY.md](TURAIN_PAGE_INVENTORY.md) (original clone inventory).

---

## 1. Executive summary

| Area | Result |
|------|--------|
| Technology | Static HTML5 + CSS + vanilla JS. No framework, no build step, no runtime API keys. |
| Pages | **15** HTML pages, all Glocious-branded. |
| Entry point | `index.html` loads Glocious directly — no HTTrack splash/landing page. |
| Turain residue | **0** matches in any served file (`.html`/`.css`/`.js`/`.xml`/`.php`/`.txt`). |
| Turain geography | **0** matches for Kolkata / West Bengal. Retargeted to Delhi NCR / Ghaziabad. |
| Broken local links | **0** (1,096 `src`/`href` values resolved against disk). |
| Broken form actions | **0** (23 `action` values resolved). |
| Broken CSS assets | **0** active (2 `url()` hits sit inside commented-out rules). |
| Orphaned assets | **0**. |
| Brand tokens | `--primary:#008522` · `--pink:#E30086` · `--secondary:#DE003E` |
| Contact form | Working PHP endpoint (`contact/contact-submit.php`) → `info@glocious.com`. |
| reCAPTCHA | Widget rendered; guarded so it can never hard-block when the secret is empty. |
| Sitemap / robots | Present and consistent (15 URLs). |
| `.htaccess` | Complete for cPanel/shared hosting. |

**One item needs an owner decision:** the homepage hero video
`assets/images/main_video1.mp4` (12.7 MB) is inherited Turain footage — see §7 (V1).

---

## 2. Final page inventory

| # | Route (URL) | `<title>` | H1 |
|---|-------------|-----------|----|
| 1 | `/` | Glocious Infotech Pvt. Ltd. \| Bulk SMS, WhatsApp & Digital Marketing | We Provide Bulk SMS & Digital Marketing Solutions |
| 2 | `/about-us/` | About Us \| Glocious Infotech Pvt. Ltd. | About Our Company |
| 3 | `/bulk-sms-service-provider/` | Bulk SMS Service Provider \| DLT-Compliant Bulk SMS Gateway \| Glocious | Bulk SMS Service Provider for Promotional, Transactional and OTP SMS |
| 4 | `/voice-call-solution/` | Voice Call API Provider in India \| AI IVR \| Glocious Infotech | Voice Call API Provider in India with AI IVR Services |
| 5 | `/interactive-voice-response/` | AI-Powered IVR System \| Cloud IVR Service in India – Glocious | AI-Powered Cloud IVR System for Businesses (Conversational IVR + Smart Routing) |
| 6 | `/whatsapp-marketing/` | Bulk WhatsApp Marketing Agency in Delhi NCR \| Glocious Infotech | Bulk WhatsApp Marketing Agency in Delhi NCR to Generate More Sales for Your Business |
| 7 | `/email-marketing/` | Email Marketing Services \| Increase Engagement & Drive More Sales | Email Marketing Services That Drive Leads, Sales & Repeat Customers |
| 8 | `/digital-marketing/` | Digital marketing agency in Delhi NCR for SEO, Google Ads & Social Media \| Get a free growth audit - Glocious | Digital Marketing Agency in Delhi NCR |
| 9 | `/web-development-company/` | Web Development Company in Delhi NCR \| Custom Website, Ecommerce & UI/UX Experts | Whether you're a start-up or a large company, Glocious is the premier website development company in Delhi NCR. |
| 10 | `/lms/` | LMS (Lead Management Software) \| Glocious Infotech | Lead Management Software |
| 11 | `/industries/` | Industries We Serve \| Bulk SMS & Business Messaging \| Glocious Infotech | Industries We Serve |
| 12 | `/contact/` | Contact Glocious Infotech \| Sales & Support | Contact Us |
| 13 | `/privacy-policy/` | Glocious Infotech \| Privacy Policy | Privacy Policy |
| 14 | `/terms-and-conditions/` | Glocious Infotech \| Terms and Conditions | Terms and Conditions |
| 15 | `/refund/` | Glocious Infotech \| Cancellation & Refund Policy | Cancellation & Refund Policy |

Sitemap priorities: `/` = 1.0 · service pages 0.8–0.9 · policy pages 0.3.

---

## 3. Route map (clone → shipped)

| Original clone route (Turain) | Shipped route (Glocious) | Action |
|-------------------------------|--------------------------|--------|
| `index.html` (HTTrack landing) | `/` | Replaced with Glocious homepage |
| `about-us/` | `/about-us/` | Content replaced |
| `bulk-sms-service-provider/` | `/bulk-sms-service-provider/` | Content replaced |
| `voice-call-solution/` | `/voice-call-solution/` | Content replaced |
| `interactive-voice-response/` | `/interactive-voice-response/` | Content replaced |
| `whatsapp-marketing/` | `/whatsapp-marketing/` | Content replaced |
| `digital-marketing-agency-kolkata/` | `/digital-marketing/` | **Renamed** + geo-retargeted |
| `web-development-company/` | `/web-development-company/` | Content replaced |
| `call-center-suite/` (Dial2connekt) | `/lms/` | **Replaced** with Lead Management Software |
| `contact/` | `/contact/` | Content replaced + PHP handler |
| `industries/` | `/industries/` | Content replaced |
| `privacy-policy/` | `/privacy-policy/` | Content replaced |
| `terms-and-conditions/` | `/terms-and-conditions/` | Content replaced |
| *(new)* | `/email-marketing/` | Built on the clone's service template |
| *(new)* | `/refund/` | Built on the clone's legal template |

Removed clone folders: `connect.facebook.net/` (Meta pixel, unreferenced),
`www.googletagmanager.com/` (empty GTM shell), `call-center-suite/`,
`unpkg.com/@studio-freight/` (dead 404 stub).

---

## 4. What the migration did

### 4.1 Content
- Every page carries Glocious `<title>`, meta description, canonical, Open Graph, Twitter card
  and JSON-LD graphs (Organization, WebSite, WebPage, BreadcrumbList, LocalBusiness) with **real**
  Glocious data: `+91 9319499699` · `info@glocious.com` · F-202, Aditya Plaza-II, Kaushambi,
  Ghaziabad, Uttar Pradesh 201010.
- Copy is source-faithful to `glocious.com`, including verbatim quirks ("Thoudsands") and the nav
  label "LMS (Lead Management Software)".
- **No fabricated** testimonials, client names, statistics or contact details. The four verified
  testimonials (Ritik Raj Patan / Flipkart · Anki Suman / Amazon Retail · Ranjan Kumar / Ebay Global ·
  Aman Singh) are the only ones present.
- Verified counters retained: 12+ years, 1565 projects, 265 clients across 24 countries, 15,000+ companies.

### 4.2 Structure & motion (preserved from the clone)
Hero layouts, header/nav (drawer + multi-level dropdown), footer, section structures, image masks,
parallax, sticky sections, hover effects, page transitions and responsive behaviour were **not**
redesigned. The animation system (`.zanim`/`.animated`, `.imgEffect-7`, `.titleEffect`, counters via
`data-count`, Slick sliders, Bootstrap scrollspy/tabs, Choices.js, SweetAlert2, Lenis smooth scroll)
is intact. No CSS/JS was rewritten for style reasons.

### 4.3 Branding
- `:root` tokens in `style.css` / `styleec92.css` re-pointed to the Glocious palette. Legacy alias
  names (`--royal-blue`, `--sky-blue`, `--soft-magenta`, `--bright-pink`, `--navy-blue`,
  `--slate-gray`) are **kept** but repointed, so every existing rule updated automatically.
- Residual legacy blue/purple **inline hex** in HTML and in the theme SVG icon set was realigned to
  the Glocious green/magenta/crimson family (fills only — no geometry changed).
- Third-party marks (`assets/images/technology/`, `assets/images/logos/`) were deliberately
  **excluded** from re-colouring.
- Legitimate third-party licence notices retained (Bootstrap MIT, jQuery, Choices.js, RemixIcon
  Apache-2.0).

### 4.4 Media
See [ASSET_REPLACEMENT_MAP.md](ASSET_REPLACEMENT_MAP.md). All media is local; aspect ratios, crops
and CSS masks preserved. 197 files under `assets/images`.

### 4.5 Functionality
- 23 forms post to `contact/contact-submit.php` (relative path).
- Handler features: `mail()` delivery, honeypot timing (`MIN_FILL_SECONDS = 3`), file-based IP rate
  limiting (5/hour), input sanitisation, duplicate-key-tolerant field mapping, guarded reCAPTCHA v2.

### 4.6 Housekeeping / bug fixes
- Fixed ten pages that referenced the Lenis bundle as `lenis%401.3.11` while the folder is
  `lenis@1.3.11`.
- Deleted orphan assets (`content_marketing.webp`, `Customer.svg`, `glocious-mark.png`).
- Removed dead commented markup in `index.html`.
- Removed the dead `unpkg.com/@studio-freight/` 404 stub.

---

## 5. Verification evidence

| # | Check | Method | Result |
|---|-------|--------|--------|
| 1 | Turain string residue | grep `turain\|turaingrp` (all served files) | **0** |
| 2 | Turain geography | grep `kolkata\|west bengal` (all served files) | **0** |
| 3 | Old route / product name | grep `call-center-suite\|dial2connekt` | **0** |
| 4 | Internal links & assets | resolved 1,096 `src`/`href` against disk | **0 broken** |
| 5 | Form endpoints | resolved 23 `action` against disk | **0 broken** |
| 6 | CSS `url()` targets | resolved 48 against disk | **0 active broken** (2 inside comments) |
| 7 | Orphaned assets | every `assets/` file matched against all refs | **0** |
| 8 | Third-party logos unmodified | grep Glocious palette hex in `technology/`, `logos/` | **0** |
| 9 | Legacy blue/purple in HTML | grep `#626CAB\|#2E3E9E\|#9272df`… | **0** |
| 10 | Brand tokens | `style.css` `:root` | green / magenta / crimson ✅ |
| 11 | Page titles | grep `<title>` | **15/15** |
| 12 | Sitemap | `sitemap.xml` | **15 `<loc>`**, matches all routes |
| 13 | reCAPTCHA | grep `data-sitekey` | 8 widgets across 8 pages |

> Console/JS errors were assessed by static review (no headless browser available in this
> environment). The animation scripts are unchanged from the working clone; the only script edit
> was normalising the Lenis asset path. Browser-side verification is recommended post-upload (see §8).

---

## 6. Deployment constraints honoured

| Constraint | Status |
|------------|--------|
| Preserve original UI, animations, responsiveness | ✅ |
| Replace Turain content, media, branding with Glocious | ✅ |
| Use the Glocious logo/favicon | ✅ |
| Remove HTTrack blue landing page | ✅ (root loads Glocious) |
| Remove unintended Turain references | ✅ (0 in served files) |
| White-dominant palette, green/magenta/crimson accents, not all-blue | ✅ |
| No fabricated data | ✅ (placeholders/omit where unverified) |
| Zero-paid: no paid plugins, no external runtime dependencies | ✅ (all vendors self-hosted) |
| No framework migration | ✅ |
| Keep PHP contact endpoint | ✅ |
| Retarget geography to Delhi NCR / Ghaziabad | ✅ |
| Do not publish to live / do not change hosting config in place | ✅ (nothing published) |

---

## 7. Remaining issues

| # | Severity | Issue | Recommended action |
|---|----------|-------|--------------------|
| V1 | Medium | `assets/images/main_video1.mp4` (12.7 MB) is inherited Turain footage in the homepage hero. | Supply Glocious footage and overwrite the same filename. No code change needed. |
| V2 | Low | `RECAPTCHA_SECRET` in `contact/contact-submit.php` is empty (line 35). | Paste the production reCAPTCHA v2 secret before go-live, or define env `GLOCIOUS_RECAPTCHA_SECRET`. The form works meanwhile (verification is skipped when empty). |
| V3 | Low | `www.google.com/recaptcha/api.js` is self-hosted and will drift from Google's current version. | Re-download if reCAPTCHA ever breaks. Not urgent. |
| V4 | Info | Homepage is heavier than the rest because of V1. | Resolves with V1. |
| V5 | Info | `GLOCIOUS_CONTENT_INVENTORY.md` and `TURAIN_PAGE_INVENTORY.md` name Turain (internal references only). | They are not linked from the site and are blocked from public serving by `.htaccess` (`\.md$ → Require all denied`). Safe to keep privately or delete before upload. |
| V6 | Info | Browser console / JS errors not verified in a live browser in this environment. | Run the §8 smoke test after upload. |

---

## 8. Local run instructions

The site is plain static files; **any** static file server works. PHP is only needed for the
contact form.

**Option A — Python (built in, no install):**
```powershell
cd "c:\My Web Sites\glocious-redesign"
python -m http.server 8000
# open http://localhost:8000/
```

**Option B — Node:**
```powershell
cd "c:\My Web Sites\glocious-redesign"
npx --yes serve -l 8000 .
# open http://localhost:8000/
```

**Option C — PHP (so the contact form also works locally):**
```powershell
cd "c:\My Web Sites\glocious-redesign"
php -S localhost:8000
# open http://localhost:8000/
```

Notes
- Open the site via the server URL above, **not** by double-clicking `index.html` — the clean-URL
  folder structure (`/about-us/` → `/about-us/index.html`) and relative asset paths resolve
  correctly only over HTTP.
- `.htaccess` is ignored by these dev servers; it applies only on Apache/cPanel.
- The contact form needs a mail-capable host to actually deliver; locally it returns the
  success/error JSON the front-end expects.

---

## 9. Production deployment instructions (cPanel / shared hosting)

**Target:** Apache + PHP, document root `public_html`, canonical URL `https://glocious.com`.

1. **Upload.** Upload the **contents** of `c:\My Web Sites\glocious-redesign` into `public_html`
   (so that `public_html/index.html` is the homepage). Keep the folder structure exactly:
   `assets/`, `cdnjs.cloudflare.com/`, `unpkg.com/`, `www.google.com/`, and every route folder
   (`about-us/`, `contact/`, …).
2. **Delete before upload (optional).** The four `.md` documents in the root are internal notes.
   You may delete them — or leave them, since `.htaccess` blocks `.md` from being served.
3. **`.htaccess`.** Ensure the shipped `.htaccess` is present in `public_html`. It provides:
   `DirectoryIndex`, `Options -Indexes`, HTTPS redirect, non-www canonical redirect, clean-URL
   rewrite, `mod_deflate` compression, `mod_expires` caching and security headers. If your host
   already forces HTTPS/domain canonicalisation, the duplicate rules are harmless.
4. **PHP.** Confirm PHP is enabled (any modern 7.x/8.x). `contact/contact-submit.php` uses
   `mail()`, file-based rate limiting (writes a temp file) and optional `curl` for reCAPTCHA — all
   standard on cPanel.
5. **Contact form.**
   - Set `RECAPTCHA_SECRET` in `contact/contact-submit.php` (line 35) to your reCAPTCHA **v2**
     secret. The `data-sitekey` in the pages must match the same v2 site key.
   - Verify `info@glocious.com` is a real, deliverable mailbox on the cPanel account.
   - Submit one test enquiry and confirm delivery (check spam).
6. **HTTPS.** Issue/confirm the SSL certificate (AutoSSL or Let's Encrypt) so the HTTPS redirect
   in `.htaccess` resolves without a loop.
7. **SEO files.** `sitemap.xml` and `robots.txt` are in the root and reference
   `https://glocious.com`. Re-submit the sitemap in Google Search Console after go-live.
8. **Smoke test after upload** (see §10).
9. **Cache.** After replacing files, purge any host-level/CDN cache and hard-refresh.

---

## 10. Post-upload smoke test

1. Homepage loads at `https://glocious.com/` (no HTTrack splash, no `www.` duplicate).
2. Visit each of the 15 routes directly; confirm clean-URL resolution and the HTTP→HTTPS redirect.
3. Header dropdowns, mobile drawer and footer links all navigate correctly.
4. Hero video plays silently and loops; all images render (check the Network tab for 404s).
5. Sliders (`.logo-slider`, `.service-slider`, `.cSlider`) auto-play; counters animate on scroll;
   reveal/parallax effects fire.
6. Submit the contact form → success alert → email received at `info@glocious.com`.
7. reCAPTCHA checkbox renders on the form pages.
8. Browser console is free of JS errors.
9. `https://glocious.com/sitemap.xml` and `robots.txt` load; `.md` documents return 403.
10. Test on a phone (or DevTools mobile view) across the breakpoints.

---

## 11. Deliverables index

| Deliverable | File |
|-------------|------|
| Migrated Glocious website | project root (`index.html` + 14 route folders) |
| Page inventory | §2 of this report + [TURAIN_PAGE_INVENTORY.md](TURAIN_PAGE_INVENTORY.md) |
| Asset replacement map | [ASSET_REPLACEMENT_MAP.md](ASSET_REPLACEMENT_MAP.md) |
| Project recovery (audit) report | [PROJECT_RECOVERY_REPORT.md](PROJECT_RECOVERY_REPORT.md) |
| Source content capture | [GLOCIOUS_CONTENT_INVENTORY.md](GLOCIOUS_CONTENT_INVENTORY.md) |
| Final migration report | this file |
| Remaining issues | §7 of this report |
| Local run instructions | §8 of this report |
| Deployment instructions | §9 of this report |
