# ANICET FARMS LIMITED — Website Documentation

Project: original corporate website for **ANICET FARMS LIMITED**.
Scope: an honest, professional, accessible, and fast marketing site built from an
empty project. This document is the single source of truth for how the site is
built, how to update it, and what is still required from the company.

---

## 1. Project overview

ANICET FARMS LIMITED needs a corporate web presence. The site is built as an
**original design** (no template, no borrowed theme) with a deliberately
**non-green** palette — sable, fired clay, and parchment — forming a modern
agribusiness character distinct from common "farm green" designs.

Two non-negotiable principles guide the whole site:

- **No hallucinated facts.** Nothing is asserted about the company unless it has
  been verified. Empty data collections render honest placeholders; unconfirmed
  content is shown as a "framework" (dashed, labelled, obviously pending).
- **No broken promises.** The contact form never claims to have sent a message
  unless a real backend received it. Without a backend it validates and falls
  back to a pre-filled `mailto:` — or says the contact destination is unset.

The site intentionally exposes its structure to future content: company data,
products, statistics, leadership, and insights all flow through typed data files
so that verified material can be added without redesign.

---

## 2. Technology stack

| Area | Choice |
| --- | --- |
| Framework | Astro 7 (static site generation, `output: 'static'`) |
| Templates | Astro components / pages (`.astro`) on TypeScript |
| UI framework | None — Astro render only. No React/Vue/Svelte |
| Client scripting | 3 small vanilla TypeScript modules (nav, reveal, form) |
| Styling | Hand-written CSS design system (`src/styles/global.css`) |
| Fonts | Self-hosted via `@fontsource-variable/fraunces` + `@fontsource-variable/inter` |
| Type checking | `astro check` + `tsc --noEmit` (strict) |
| Linting | ESLint 10 (flat config) + `eslint-plugin-astro` |
| Testing | Vitest (unit tests for validation logic) |
| SEO | Built-in + `@astrojs/sitemap` (sitemap-index.xml) + robots.txt |

The project is `type: "module"` throughout (Astro config, scripts, ESLint).

---

## 3. Design system

Location: `src/styles/global.css`. The system is a set of CSS custom properties
plus page-agnostic utility/component classes.

### Tokens (exact values — do not drift without a design decision)

- **Primary "sable"**: `#24211b` · primary-soft `#322e27` · secondary `#4a443b`
- **Accent "fired clay"**: `#c0552c` · hover `#a1441f` · soft tint `#ecd0bd`
- **Backgrounds**: parchment `#f4f0e6` · deeper sand `#eae3d2` · surface `#fffdf8`
- **Text**: `#211d17` matter · muted `#6f675c` · borders `#dcd3bf`
- **On dark**: `#f4f0e6` · dimmed `#c6beac` · on accent `#fffdf8`
- **Typography**: `'Fraunces Variable'` (display serif) + `'Inter Variable'` (UI)
- **Radii**: sm 3px, md 8px, lg 16px, pill 999px
- **Container**: 76rem, gutters clamp(1.25rem, 4vw, 3rem)
- **Motion**: ease-out cubic-bezier(0.16, 1, 0.3, 1), 220ms default
- **Focus**: 2px accent ring with 3px offset

### Dark ("night sable") palette — `[data-theme='dark']`

A designed dark theme (not an inversion). Accent `#c0552c`, accent-soft
`#ecd0bd`, and on-accent `#fffdf8` carry over from light mode.

- **Backgrounds**: canvas `#14110c` · alt `#1b1710` · surface `#201b12`
- **Bands/primary**: `#211d16` · primary-soft `#2a2419` · secondary `#3a3324`
- **Text**: `#f1ebdc` · muted `#a79c84` · borders `#3b3324`
- **On dark**: `#f1ebdc` · dimmed `#b2a78b` · accent hover `#d0673b`
- **Header bar**: `rgb(20 17 12 / 0.86)` translucent · nav hover
  `rgb(244 240 230 / 0.07)`
- Theme selection is **not colour-coded**: the switch's thumb position from
  sun (left, light) to moon (right, dark), plus `aria-checked`, always
  communicates state.

### Responsive behaviour (breakpoints that genuinely change layout)

Fluid values (`clamp` for gutters, section padding, type scale, gaps) adapt the
page between the fixed breakpoints below; grid tracks use `minmax(0, 1fr)` so
content can never force a track wider than its container.

- `720px` — editorial `split-grid` / `split-grid--reverse` stack to one column.
- `960px` — header swaps desktop nav + hamburger for the `<dialog>` mobile menu
  (theme switch hides from the header and is offered inside the menu instead).
- `1200px` — value chain drops from six to three columns; header CTA hides on
  medium screens.
- `900px` — value chain (3→2), footer (4→2 columns), contact grid (→1).
- `640px` — `grid-2` / `grid-3` stack; WhatsApp FAB gets pointer hover sweep.
- `620px` — enquiry form (2→1 column); `560px` chain (2→1); `600px` footer (→1).
- Very large screens: the `.container` caps content at 76rem with a
  `clamp`ed gutter, so 1600–2560px views stay visually controlled and centred.

### Good-enough contrast notes

The palette is chosen so common text pairs reach WCAG 2.1 AA (e.g. sable text on
parchment), while deliberately muted/low-contrast elements (e.g. `.chip--on-dark`,
`.text-on-dark-dim`, small ghost buttons) are used only for **decorative or
supplementary** content, not for essential navigation or instructions. Verify
specific pairs with a contrast checker when styling changes.

---

## 4. Architecture

```
anise-farm/
├── astro.config.mjs        # site, trailingSlash 'ignore', static, sitemap
├── eslint.config.js        # flat config (eslint + astro plugin + node globals)
├── tsconfig.json           # extends astro/tsconfigs/strict, noUnusedLocals/Parameters
├── package.json            # scripts listed in §7-adjacent "Working with the site"
├── public/                 # favicon.svg, robots.txt, og-default.png (generated)
├── scripts/
│   ├── generate-og.mjs     # zero-dependency OG image generator (1200×630)
│   └── check-links.mjs     # post-build internal link checker (dist)
├── src/
│   ├── components/         # UI components (see §5)
│   ├── layouts/BaseLayout.astro
│   ├── pages/              # one file per route (see §7)
│   ├── data/               # typed content layer (see §6)
│   ├── styles/global.css   # design system
│   ├── scripts/            # nav.ts, reveal.ts, forms.ts (vanilla)
│   └── utils/validate.ts   # pure, testable form validation + mailto builder
└── tests/validate.test.ts  # Vitest coverage for validate.ts
```

### Key conventions

- Data is read only in the **frontmatter** of pages/components and mapped to
  markup. No DOM manipulation produces content.
- Components are **presentational**: they receive props from data files.
- All reveal-on-scroll is progressive enhancement in `src/scripts/reveal.ts`
  (IntersectionObserver, honours reduced motion).
- Client JS is minimal, dependency-free, injected per-page by Astro.

---

## 5. Components (`src/components/`)

| Component | Purpose |
| --- | --- |
| `Seo.astro` | Head meta: title, description, canonical, OG, Twitter, favicon, theme-color, Organization JSON-LD (verified fields only), optional extra schema |
| `Logo.astro` | Official brand logo (`public/img/logo.png`) by default in header, mobile menu and footer. The text wordmark remains only as a fallback; pass `logoSrc` to override |
| `Button.astro` | Link/button with variants `primary`, `accent`, `ghost`, `ghost-dark`, sizes `md`/`lg`, `arrow`, `external` |
| `Header.astro` | Sticky header; desktop nav + accessible mobile `<dialog>` menu (native focus trap) |
| `Footer.astro` | Brand blurb, footer nav columns, copyright. No invented social links |
| `PageHero.astro` | Dark inner-page hero with eyebrow/title/lede + breadcrumb slot |
| `Breadcrumbs.astro` | Accessible trail, dark-optimised by default |
| `Reveal.astro` | On-scroll reveal wrapper (`delay` prop for stagger) |
| `SectionHeading.astro` | Eyebrow + display title + optional lede, `align`, `dark` |
| `EmptyState.astro` | The honest "awaiting verified information" block (light/dark tone) |
| `AuroraField.astro` | Original abstract "aerial fields" SVG artwork (decorative, aria-hidden, swap for real photography later) |
| `ValueChain.astro` | Value-chain diagram: unconfirmed stages rendered dashed with "Awaiting confirmation" chips; confirmed stages activate |
| `CtaBand.astro` | Full-width closing call-to-action (dark or accent tone) |
| `ContactForm.astro` | Enquiry form wired to `src/scripts/forms.ts` |
| `WhatsAppButton.astro` / `WhatsAppIcon.astro` / `WhatsAppFloating.astro` | Verified WhatsApp CTA: header/CTA/404 buttons, floating pulsing dot on every page (`src/data/whatsapp.ts`) |
| `ThemeToggle.astro` | Light/dark switch — one control (role="switch"), header (desktop) + mobile menu variants, wired to `src/scripts/theme.ts` |

---

## 6. Data architecture (`src/data/`)

Content lives in typed data files so company stakeholders can update the site
in one place without touching markup.

| File | Exports | Status |
| --- | --- | --- |
| `types.ts` | Shared domain types (Value, Capability, Product, Statistic, Insight, etc.) | Complete |
| `site.ts` | `siteUrl` (placeholder domain), default OG image + alt | **TODO: real domain** |
| `company.ts` | `company` (legalName, operatingName, industry, shortStatement + optional registration/address/phone/email; `mission`, `vision` (`null`), `values`, `contactChannels` | legalName/operatingName/industry verified; rest **TODO** |
| `navigation.ts` | `primaryNav`, `ctaNav`, `footerNav` | Complete |
| `services.ts` | `capabilities` (`[]`), `valueChain` (6 stages, all `unconfirmed`), `valueChainNote` | capabilities **TODO**; chain is framework |
| `products.ts` | `products` (`[]`), `productEnquiryLabel` (`Request information`), `catalogueNote` | products **TODO** |
| `impact.ts` | `statistics` (`[]`), `reportAreas` (4 commitment areas), `metricRegistry` (6 labels + definitions) | statistics **TODO** |
| `insights.ts` | `insights` (`[]`), `topics` (4 intended topics) | insights **TODO** |
| `people.ts` | `locations` (`[]`), `leadership` (`[]`), `testimonials` (`[]`) | all **TODO** |

### The no-hallucination contract

- Empty arrays (`[]`) render explicit, honest empty states — never invented values.
- `mission`/`vision` are `string | null`; `null` renders a placeholder phrase.
- Value-chain stages are `unconfirmed` until marked `confirmed` (dashed → solid
  visual treatment automatically).
- Statistics only render when `statistics` is populated; the "Mirror" registry
  communicates what *will* be reported without inventing numbers.

---

## 7. Routes

Astro static output, `trailingSlash: 'ignore'`, `build.format: 'directory'`.

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Editorial hero, who-we-are, values, value chain, capabilities state, partnership band, CTA |
| `/about/` | `about.astro` | Story slot, mission/vision, values, leadership (empty state), operations |
| `/what-we-do/` | `what-we-do.astro` | Value chain, principles, capabilities |
| `/products/` | `products.astro` | Enquiry-first catalogue + sourcing transparency |
| `/impact/` | `impact.astro` | Statistic band (hidden until verified), reporting areas, metric registry |
| `/insights/` | `insights.astro` | Topics + publications (empty until real articles) |
| `/contact/` | `contact.astro` | Contact channels (placeholders) + working enquiry form |
| `/privacy-policy/` | `privacy-policy.astro` | **Placeholder** — needs legal drafting |
| `/terms/` | `terms.astro` | **Placeholder** — needs legal drafting |
| 404 | `404.astro` | On-brand 404 (`/404.html` emitted) |

Sitemap is generated automatically: `dist/sitemap-index.xml`.

### Working with the site

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run generate:og` | Re-generate `public/og-default.png` |
| `npm run check` | `astro check` (types) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Vitest unit tests |
| `npm run verify:links` | Link-check `dist/` (build first) |
| `npm run verify` | build + verify:links |

---

## 8. Features

- **Honest content system** — placeholders everywhere real data is missing.
- **Native `<dialog>` mobile menu** — free focus management, Escape-to-close,
  backdrop click to close, body scroll lock, aria-expanded wiring
  (`src/scripts/nav.ts`).
- **Enquiry form** (`src/scripts/forms.ts`): strict client-side validation,
  inline field errors with `aria-invalid`, focus management on invalid submit,
  real POST when configured, honest `mailto:` fallback otherwise.
- **Reveal-on-scroll** (`src/scripts/reveal.ts`): IntersectionObserver, unobserves
  after reveal, fully disabled under reduced motion.
- **Replaceable brand imagery** — `AuroraField` artwork remains a structural
  placeholder for real photography (the official logo is now integrated; see §15).
- **Value-chain diagram** — renders as a framework until stages are confirmed.
- **WhatsApp as the verified direct channel** — the only confirmed contact
  detail; the default `wa.me` link carries a pre-filled, encoded enquiry message.
- **Light/dark theme switch** — one accessible control in the header (and mobile
  menu), persisted in `localStorage` (`anicet-theme`), system-preference fallback,
  applied before first paint to avoid any theme flash, with a designed dark
  palette, not an inversion.

---

## 9. Accessibility (WCAG 2.1 AA targets)

- Skip link to `#main` on every page.
- Semantic landmarks: `<main id="main">`, `<header>`, `<footer>`, `<nav aria-label>`.
- Native `<dialog>` for the mobile menu (focus trap + Escape for free).
- `:focus-visible` ring everywhere; never `user-scalable=no` (viewport allows zoom).
- `aria-current="page"` on active nav links.
- Form fields use real `<label for>`, `aria-required`, `aria-invalid`, `role="alert"` error nodes.
- Decorative SVG artwork is `aria-hidden` / `role="presentation"`.
- Full explicit support for `prefers-reduced-motion` in CSS and JS.
- All interactive elements are keyboard-reachable; hover states have focus analogues.
- Contrast reviewed for essential content (see §3 note for decorative-only exceptions).

---

## 10. SEO

- Unique `<title>`, meta description, canonical per page (`Seo.astro`).
- Open Graph (type, site_name, title, description, url, image 1200×630) and
  Twitter summary_large_image cards.
- `robots.txt` (with sitemap reference) and automatic `sitemap-index.xml`.
- Organization JSON-LD containing **only verified facts**: legal name, url, logo.
  Extra structured data passes through the `schema` prop when needed.
- OG image generated reproducibly by `scripts/generate-og.mjs`.
- **TODO before launch**: replace placeholder domain `https://anicetfarms.example`
  in `src/data/site.ts` and `astro.config.mjs`.

---

## 11. Performance

- Static site — no client-side framework, so no hydration cost.
- Fonts self-hosted (Fraunces + Inter variable) — no third-party font requests.
- Single CSS file; three tiny vanilla JS modules injected only where needed.
- Inline SVG artwork instead of raster images on the homepage.
- No analytics/tracking scripts (info gathering creates no page weight).
- Aspect-ratio reserved boxes reduce layout shift.

---

## 12. Environment variables

Read by `src/scripts/forms.ts` at runtime via `import.meta.env` (see `.env.example`):

| Variable | Purpose | Default |
| --- | --- | --- |
| `PUBLIC_CONTACT_FORM_ENDPOINT` | Backend URL receiving JSON POSTs | unset → mailto fallback |
| `PUBLIC_CONTACT_EMAIL` | Verified destination for the `mailto:` fallback | unset → "not configured" status |

No secrets are baked into the build; forms run in the browser.

---

## 13. Backend integration

The site is static today. When a real submission endpoint exists:

1. Set `PUBLIC_CONTACT_FORM_ENDPOINT` (and preferably the contact email too).
2. Optionally implement server-side validation + spam protection (e.g.
   honeypot, rate limiting) on that endpoint — the client only sends JSON.
3. The form will POST `{ name, email, phone, company, subject, message }` as
   `application/json` and show a success/error status from the response.

Until then the form behaves honestly: it validates, then either opens a
pre-filled email (when `PUBLIC_CONTACT_EMAIL` is set) or tells the visitor the
contact destination is not configured. It will **never** fake a submission.

---

## 14. Limitations

- **Placeholder domain** in `siteUrl` and `astro.config.mjs` (`anicetfarms.example`).
- **AuroraField artwork is still a placeholder** — real company photography is
  not yet integrated. The official logo (from `img/logo.jpg` / `img/favicon.jpg`)
  is now live across header, footer, favicon and OG image.
- **Legal pages are structural placeholders** (`/privacy-policy/`, `/terms/`) and
  must not be treated as binding documents. Real drafting is required.
- **No e-commerce** — this is an enquiry-first corporate site.
- **No social links** until verified accounts are provided (by design).
- **Email delivery depends on the visitor's email client** in the fallback mode.
- **No analytics** (intentional). Add deliberately if required.

---

## 15. Image assets (inventory)

Source materials live in `img/` at the project root. Because Astro serves
static files only from `public/`, every asset referenced by the site lives under
`public/img/` or `public/`. Paths are case-sensitive — reference them exactly as
below.

| File | Source | Dimensions / type | Used for |
| --- | --- | --- | --- |
| `img/logo.jpg` | supplied by owner (original) | 1136×912 JPG, RGB, ~145 KB, near-white `#F9F9F9` background | Archival source — green/gold brand emblem. Kept unmodified |
| `public/img/logo.jpg` | copy of `img/logo.jpg` | identical | Same as above; also the destination OG generator references |
| `public/img/logo.png` | derived from `img/logo.jpg` via ImageMagick (white → alpha, 8% fuzz) | 1136×912 PNG, RGBA, ~462 KB | Official logo in header, mobile menu and footer (`Logo.astro` default `logoSrc`) |
| `img/favicon.jpg` | supplied by owner (original) | 1024×1008 JPG, RGB, ~143 KB, dark green `#033723` background | Archival source — mark used for icon family |
| `public/img/favicon.jpg` | copy of `img/favicon.jpg` | identical | Kept so the archive is served alongside the site |
| `public/favicon.png` | derived from `img/favicon.jpg` (resize 32×32) | 32×32 PNG | Browser favicon (`<link rel="icon" type="image/png" sizes="32x32">` in `Seo.astro`) |
| `public/apple-touch-icon.png` | derived from `img/favicon.jpg` (resize 180×180, padded to square with `#033723`) | 180×180 PNG | iOS home-screen icon (`<link rel="apple-touch-icon">`) |
| `public/og-default.png` | generated by `scripts/generate-og.mjs` (procedural parchment/sable/clay card + `public/img/logo.png` composited via ImageMagick `convert`) | 1200×630 PNG | Default Open Graph / `summary_large_image` social card |
| `public/favicon.svg` | original placeholder (not from `img/`) | 64×64 SVG | Legacy favicon — superseded by `favicon.png`, retained but no longer referenced in `<head>` |
| `public/robots.txt` | original | text | SEO robots handling (unchanged) |

Notes:

- **Who invented the palette?** The green/gold mark colours come straight from
  the owner-supplied images (verified by pixel sampling, not assumed from
  filenames). The site's own sable/clay/parchment palette is unchanged.
- **Transparency derivation:** `public/img/logo.png` uses an 8% ImageMagick fuzz
  tolerance to drop the near-white background. The nearest content colour
  (`#AFC6A6` sage) sits ~143 RGB units from white, far beyond the ~35-unit fuzz
  threshold, so the emblem strokes are preserved. Re-derive with: `convert
  public/img/logo.jpg -fuzz 8% -transparent '#F9F9F9' public/img/logo.png`.
- **OG card** renders the transparent emblem at 360px wide, centred above the
  sable bar (which begins at y=512). Regenerate with `node
  scripts/generate-og.mjs` (requires ImageMagick's `convert` on PATH).
- **Hero / photography:** no `img/` file was suitable as hero or site photography,
  so the `AuroraField` artwork stays untouched. Only the logo/favicon/OG slots
  were replaced.

---

## 16. Missing company information (TODO handover list)

An ANICET FARMS LIMITED stakeholder must supply verified values for:

1. **Mission and vision** (`src/data/company.ts`).
2. **Contact details** — address, phone, email, business hours, registration
   number, established year (`company.contactChannels` + optional fields).
3. **Production domain** (replace `.example` placeholder in `site.ts` + config).
4. **Capabilities** — confirmed activities (`services.capabilities`).
5. **Value chain** — which of the 6 stages are real, inapplicable stages removed
   (`services.valueChain` status fields).
6. **Products** — names, categories, packaging, units, availability (`products`).
7. **Statistics** — production area, volumes, years of operation, headcount,
   locations, partners (`impact.statistics`).
8. **Leadership** — names, roles, bios, photos (`people.leadership`).
9. **Locations** (`people.locations`) and **testimonials** (`people.testimonials`).
10. **Insights** — real, finalised articles only (`insights.insights`).
11. **Logo variants** — a light/white version of the emblem for dark surfaces, and
    **photography** (replace `AuroraField` artwork).
12. **Legal review** for privacy policy and terms.
13. **Refine wording** of short statement, values, and placeholders with the company.

---

## 17. Next steps

Short term (for the site owner/developer):

1. Fill the verified company data per §15 and re-run `npm run verify`.
2. Design review pass of the palette/tone with stakeholders.
3. Replace placeholder artwork (`AuroraField`) and add a light-variant of the
   logo for dark surfaces once the owner provides one.
4. Wire a real contact endpoint (§13) when available.

Before production:

- Replace the domain, review all remaining TODO comments, run the full suite
  (`npm run build && npm run check && npm run typecheck && npm run lint &&
  npm test && npm run verify:links`), and do a manual accessibility pass
  (keyboard walkthrough, screen-reader smoke test, zoom test).