# ASSET REPLACEMENT MAP — Glocious Website Migration

**Project:** `c:\My Web Sites\glocious-redesign`
**Status date:** 2026-11-11
**Design source (UI / animation / layout):** `https://www.turaingrp.com/` (HTTrack clone)
**Content & media source:** `https://glocious.com/`
**Nature of work:** Content & asset migration — **not a redesign**

> This document records **every media asset** now shipped with the site, what it is, which
> page(s) use it, and how third-party material is handled. It supersedes the missing map
> referenced by the earlier recovery draft.
>
> Rule applied throughout: **preserve filenames, aspect ratios, crops and CSS masks** so the
> cloned Turain layout keeps rendering identically — only the *content* of the files changed.

---

## 1. Asset root

```
assets/
├── css/     style.css · styleec92.css (byte-identical) · nav2.css · remixicon.css
├── js/      nav2.js · scripts.js · product.js · copy.js
├── fonts/   remixicon9711.{eot,ttf,woff,woff2}
└── images/
    ├── (top level) 108 files — 107 images + main_video1.mp4
    ├── companies/   18 client logos + whatsapp.svg
    ├── icons/       20 theme SVG icons
    ├── logos/       10 email-platform logos
    └── technology/  40 third-party technology logos
```

**Totals:** 197 files under `assets/images` (≈19.4 MB, of which `main_video1.mp4` = 12.7 MB).

---

## 2. Brand & identity assets

| Asset | Size | Purpose | Used on |
|-------|------|---------|---------|
| `assets/images/glocious-logo.png` | 283 KB | Primary logo (header + footer) | all 15 pages |
| `assets/images/favicon.png` | 153 KB | Browser tab / bookmark icon | all 15 pages |
| `assets/images/whatsapp.svg` | — | Floating WhatsApp CTA + footer social icon | all 15 pages |
| `assets/images/avatar-placeholder.svg` | — | Testimonial avatar fallback | `index.html` |

All Turain logo marks were removed. `glocious-mark.png` (a byte-identical duplicate of
`favicon.png`) was deleted as an orphan during recovery.

---

## 3. Page & section media (Glocious subject matter)

Every image below is Glocious-relevant subject matter — bulk messaging, IVR/telephony,
WhatsApp, e-mail marketing, digital marketing and web development — replacing the Turain
originals while keeping the same filename slots used by the clone's CSS/HTML.

### Home / About
| Asset | Used on |
|-------|---------|
| `about_home.webp` | `index.html`, `about-us` |
| `about_img1.webp`, `about_img2.webp` | `about-us` |
| `mission.webp`, `vision.svg` | `about-us` |
| `industry_img.webp` | `about-us` |
| `homeSupport.webp` | `index.html` |
| `projects.svg`, `teams.svg`, `clients.svg` | `index.html`, `about-us` |
| `digital_marketing.webp` | `about-us` |

### Messaging / SMS
| Asset | Used on |
|-------|---------|
| `bulk_sms.webp` | `about-us`, `interactive-voice-response`, `voice-call-solution` |
| `transactional_sms.webp` | `bulk-sms-service-provider`, `voice-call-solution` |
| `rcs_sms.webp` | `bulk-sms-service-provider`, `interactive-voice-response`, `voice-call-solution` |
| `whatsapp_api.webp` | `bulk-sms-service-provider`, `interactive-voice-response`, `voice-call-solution` |
| `whatsapp_marketing.webp` | `about-us`, `whatsapp-marketing` |
| `bulk_compose.webp`, `bulk_monitor.webp`, `bulk_register.webp`, `bulk_route.webp` | `bulk-sms-service-provider` |

### Voice / IVR
| Asset | Used on |
|-------|---------|
| `ivr_voice.webp` | `about-us`, `bulk-sms-service-provider`, `interactive-voice-response` |
| `ivr-call.webp` | `interactive-voice-response` |
| `voice_call.webp` | `about-us`, `voice-call-solution` |

### Email marketing
| Asset | Used on |
|-------|---------|
| `email_strategy.webp` | `about-us`, `email-marketing` |
| `email_audit.webp`, `email_build.webp`, `email_launch.webp`, `email_optimise.webp` | `email-marketing` |
| `why_choose_email.webp` | `email-marketing` |

### Digital marketing
| Asset | Used on |
|-------|---------|
| `smm_marketing.webp` | `digital-marketing` |
| `why-choose-graphic.webp` | `digital-marketing`, `whatsapp-marketing` |
| `cta-service.webp` | `digital-marketing`, `web-development-company` |

### Web development
| Asset | Used on |
|-------|---------|
| `ui_ux_img.webp`, `web-app-development.webp`, `web-app-development1.webp`, `web-development2.webp` | `web-development-company` |
| `informative-website.webp`, `informative-website1.webp` | `web-development-company` |
| `progressive-web.webp`, `progressive-web1.webp` | `web-development-company` |
| `ecommerce.webp` | `index.html`, `web-development-company` |

### Shared CTA / contact
| Asset | Used on |
|-------|---------|
| `cta_img.webp` | `bulk-sms-service-provider`, `email-marketing`, `interactive-voice-response`, `voice-call-solution`, `whatsapp-marketing` |
| `contactImg.webp` | `contact` |

### Industry banners
| Asset | Used on |
|-------|---------|
| `banking.webp`, `healthcare.webp`, `education.webp`, `ecommerce.webp`, `realestate.webp` | `index.html` (industries strip) |
| `banking_b.webp`, `healthcare_b.webp`, `education_b.webp`, `ecommerce_b.webp`, `government_b.webp`, `real_estate_b.webp`, `travel_b.webp`, `automobile_b.webp` | `about-us`, `digital-marketing`, `web-development-company` |

### Case-study imagery
| Asset | Used on |
|-------|---------|
| `case_banking.webp`, `case_ecommerce.webp`, `case_education.webp`, `case_government.webp`, `case_health.webp`, `case_logistic.webp`, `case_omnichannel.webp` | `bulk-sms-service-provider`, `email-marketing`, `interactive-voice-response` |

---

## 4. Theme icon system (SVG — recoloured to the Glocious palette)

These are **theme-owned** flat two-tone icons (originally periwinkle/blue + magenta). They were
recoloured to the Glocious palette so the whole site reads green / magenta / crimson instead of
Turain blue. **No geometry, viewBox or path data was altered — fills only.**

| Folder / file | Palette applied |
|---------------|-----------------|
| `assets/images/icons/*.svg` (20 files) | `#626CAB`→`#008522`, `#445279`→`#0A5A1C`, `#2A3554`→`#0A3D14`; magenta kept `#E30086` |
| `assets/images/{api,audio,call_contain,chatbot,communication,company_serv,cover_region,customer-support,delivery_uptime,design,developed,go-live,id-card,ideas,interactive_features,multi_language,photo-frame,sms_send,testing,video-editing,workflow}.svg` | same mapping |
| `assets/images/vision.svg` | `#DEE2F7`→`#D9F2DF`, `#E05696`→`#E30086`, `#CD347B`→`#DE003E`, `#2E3E9E`→`#008522` |
| `assets/images/step1.svg … step4.svg` | blue→green family |

---

## 5. Client logos — `assets/images/companies/`

18 client logos shown in the homepage / service-page trust slider, plus `whatsapp.svg`.
Source: the client-logo row of `glocious.com` (the live source exposes image files only — no
alt text or readable names), so they are **kept as-is** and **not renamed**.

```
eci · fortis · ifb · iiser · iris · karuna · keventer · merlin · msme · ori-plast ·
pathfinder · pathway · piceeducare · railway · rb · rupa · skipper · ssjalan
```

No client name, statistic or endorsement has been invented anywhere in the copy.

---

## 6. Third-party platform logos — `assets/images/logos/` (e-mail marketing)

Integration/platform marks shown on `email-marketing`. **Third-party trademarks — not recoloured,
not renamed, not modified.**

```
amazonses · brevo · hubshot · klaviyo · mailchimp · salseforce · sendgrid · shopify · woocommerce · zoho
```

---

## 7. Third-party technology logos — `assets/images/technology/` (web development)

40 stack logos shown on `web-development-company`. **Third-party trademarks — explicitly EXCLUDED
from the brand re-colour pass** and left byte-for-byte as shipped.

```
Angular · ReactNative · reactjs · nextjs · svelte-1 · javascript · TypeScript-1 · jquery ·
nodejs · express · django · laravel · php · python · java · spring · dotnet · kotlin ·
swift-technology · iOS-Native · androidnative · Flutter · xamarin · ReactNative ·
Kubernetes-Docker · aws · google-cloud · firebase-r-database · Microsoft-Azure-Symbol ·
mongodb · mysql-1 · postgresql · mssql-server · RestApi · Webflow · wordpress · WooCommerce ·
shopify · html · css · ajax-color-300x130-1
```

---

## 8. Decorative / background assets

Referenced from CSS, so filenames are fixed by the stylesheet. All present.

| Asset | Referenced from |
|-------|-----------------|
| `pattern.svg` | `style.css`:569 |
| `pattern.webp` | `style.css`:257 |
| `pattern2.svg` | `style.css`:794, 1031 |
| `shape_01.svg`, `dots.png` | `style.css`:203, 211, 5062 |
| `counterBg.png` | `style.css`:1048, 1980 (counter band) |
| `liner.svg` | `style.css`:3975 |
| `curve_vec.svg` | `style.css`:4617, 4627 |
| `curvedArrows-1.svg`, `curvedArrows-2.svg` | `style.css`:4295, 4306 |
| `about_bg.webp`, `about_bg1.webp` | `style.css`:4329, 2137 |
| `bg-colors-scaled-1.webp` | `style.css`:1379, 3765, 4515 |
| `cta_bg.svg` | CTA bands (4 pages) |

> Two CSS `url()` targets — `bg-pattern2.jpeg` and `shape2.svg` — do **not** exist on disk, but
> both live inside **commented-out** CSS blocks (`style.css`:250-253 and :1799-1807), so they are
> never requested by the browser. No action required.

---

## 9. Video

| Asset | Size | Used on | Note |
|-------|------|---------|------|
| `assets/images/main_video1.mp4` | 12.7 MB | `index.html` hero (`<video autoplay loop muted playsinline>`) | **Inherited Turain footage — see Outstanding item V1** |

---

## 10. Outstanding items

| # | Item | Action |
|---|------|--------|
| V1 | `main_video1.mp4` is inherited Turain corporate footage shown in the homepage hero. It works and is on-brand (corporate/tech), but is not Glocious-owned. | Owner to supply Glocious footage and overwrite the same filename. No CSS/HTML change needed. |
| A1 | `companies/` client logos have no source alt text/names. | Add descriptive `alt` text only if the client names are confirmed; do **not** invent them. |

---

## 11. Verification

- Every asset referenced by HTML/JS resolves on disk — **0 broken** (1,096 `src`/`href` checked).
- Every active CSS `url()` target resolves — **0 broken** (48 checked; 2 hits are inside comments).
- Orphaned assets — **0**.
- Third-party `technology/` and `logos/` marks — **unmodified** (verified: no Glocious palette hex present).
- Brand palette tokens verified in `style.css` / `styleec92.css`: `--primary:#008522`,
  `--pink:#E30086`, `--secondary:#DE003E`.
