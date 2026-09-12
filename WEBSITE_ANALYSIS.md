# Duud African Foods — Website Analysis

> Analysis of https://duudafricanfoods.com/
> Compiled 12 Sep 2026. All observations are from public website content, its HTML source, server responses, and the public sitemap. No forms were submitted, no purchases made, and no private data viewed.
>
> **Legend:** ✅ = verified fact · ⚠️ = estimate / inference · 🎯 = recommendation (my opinion, not site fact)

---

## 1. Executive Summary

Duud African Foods is a Dublin-based African grocery and beauty retailer operating on a WordPress + WooCommerce stack. The site is a functional, full-featured online store with ~498 products, two physical store locations, weekly imports from Nigeria, delivery and click-and-collect.

Techically it is a competent but **dated and demo-inherited** WooCommerce build:

- Theme: **Freshio** (Wpopal) with a child theme, heavily customised with Elementor.
- 15+ plugins provide wishlist, compare, quick view, variation swatches, product-just-purchased popups, sticky social icons, a dismissible top bar, and a 4-slide Slider Revolution hero.
- The core commerce experience (cart, checkout, account) is **stock WooCommerce** (v11.0.1) on WordPress (v7.1).
- Brand colours are a dark forest green (`#0a472e`) with a lime-olive accent (`#a8b324`) — green = "fresh/organic", which fits the food brand well.

The biggest issues are **trust and polish**, not capability:

- ❌ Fake/placeholder contact data persists in the pre-footer widget strip: "Call us 24/7 **(1800)-88-66-991**", "**contact@example.com**", and social links pointing at the theme vendor's demo profiles (`opalwordpress`) — leftover theme demo content.
- ❌ Shopify-style quick-win **OG image is a tiny decorative icon** (`shape-1.png`), so every social share shows a meaningless thumbnail.
- ❌ Thin product descriptions (many are just a weight), inconsistent image quality, and weak product SEO.
- ❌ Some product slugs contain a zero-width space character (URL-encoded `%e2%81%a0`), hurting URL quality.
- ⚠️ No Google Analytics detected; only Jetpack stats + a Facebook Pixel.

**Verdict:** a real, working, inventory-rich store that is under-optimised. With moderate effort it could be significantly more trustworthy, faster, and conversion-oriented. The brand story (fresh weekly imports, two Dublin stores, organic/no-chemical produce) is genuinely strong and currently under-exploited on the homepage.

---

## 2. Business & Brand

### 2.1 What the business is about
- ✅ Name: **Duud African Foods**
- ✅ Tagline / SEO title: "**African Online Grocery**"
- ✅ Self-description (About page): "We specialise in importation of all forms of African Exotic Fresh Foods."
- ✅ Primary focus: **Nigerian** foods and groceries, imported and flown in from Nigeria "within 2 days of production."

### 2.2 Products / services
- ✅ **Products:** exotic fresh vegetables (ugu, waterleaf, okazi, shoko, bitterleaf, uziza, oha, utazi, garden egg, okro…), tubers, fruits, dry foods & grocery (flour, oil, rice, beans, garri, spices/seasonings), meat, fish, seafood & poultry (many frozen/smoked), plus a large hair & beauty range (206 products — hair extensions, wigs, pomades, lotions, oils).
- ✅ **Services:**
  - Weekly import schedule: fresh vegetables every **Tuesday**, African vegetables every **Thursday**.
  - **Delivery** across Dublin and surrounding counties — flat €10.99 within Dublin, €19.99 outside (per T&Cs), 2–5 working days.
  - **Click & collect** (confirmed in FAQ).
  - **Two physical stores** in Dublin (Clonsilla + Lucan).
  - **Card payments** accepted (all major debit/credit, confirmed in FAQ).

### 2.3 Target audience
- ⚠️ African (primarily Nigerian) diaspora in and around Dublin, Ireland — people wanting authentic imported produce and grooming/beauty products not easily found in mainstream Irish supermarkets.
- ⚠️ Secondary: anyone seeking fresh organic-style African vegetables, smoked fish/meat, or African beauty/hair brands.

### 2.4 Main value proposition
- ✅ **Freshness + authenticity:** produce flown from Nigeria within 2 days; "We get them fresh before anyone else does."
- ✅ **No chemicals:** "We Do Not Import Produce Grown With Chemicals" (99% metric).
- ✅ **Convenience:** one online store spanning two physical locations + delivery + click & collect.
- ✅ **Product availability** (80%) and **fast delivery** (85%) are self-proclaimed stats.

### 2.5 Tone & branding
- Tone: warm, customer-centric, "we are here to help" (customer testimonials emphasised). Uses "All In One Store", "Your All In One Store For All Your Grocery Needs".
- Branding colours: natural green family (fresh/organic).
- Visual identity: green + lime + cream; serif headings (Merriweather) with sans body (Roboto).
- ✅ Genuine voice: FAQ and About copy are written in first person with specific, believable operational detail (import days, store hours, Delta-state garri, etc.).

---

## 3. Website Architecture

### 3.1 Discovered pages / routes

| Page | URL | Status |
|---|---|---|
| Home | `/` | live |
| Shop (all products) | `/shop/` | live — 498 products, paginated (42 pages) |
| About us | `/about-us/` | live |
| FAQs | `/faqs/` | live |
| Terms & Conditions | `/terms-conditions/` | live |
| Privacy Policy | `/privacy-policy/` | live |
| Accessibility Statement | `/accessibility-statement/` | live |
| Contact | `/contact-us/` | live |
| Cart | `/cart/` | live |
| Checkout | `/checkout/` | exists (redirects to cart when empty) |
| My Account | `/my-account/` | WooCommerce account area (login/register/orders) |
| Wishlist | `/wishlist/WOOSW` | WooSmartWishlist page |
| Shop categories | `/product-category/<slug>/` | live (23 category URLs) |
| Product pages | `/shop/<product-slug>/` | live (498 product URLs) |
| Compare | — | overlay + bottom comparison bar (plugin) |
| Quick view | — | modal (plugin) |

### 3.2 Category taxonomy (with product counts — verified from the shop "Explore" widget)

✅ Product hierarchy (mega-menu nesting):

- **Fruits & Vegetables** — 35 (`fruit-vegetable`) · + `Tuber` (2)
- **Dry Foods & Grocery** — 121 (`dry-foods-grocery`)
  - Grocery (60), Flour (20), Oil (5), Rice (13), Beans (11), Drinks (15)
- **Meat, Seafood & Poultry** — 33 (`meat-seafood-poultry`)
  - Fish (34), Seafood (3), Poultry (6), Meat (8)
- **Spices, Condiments & Seasonings** — 42
- **Hair & Beauty Products** — 206
  - Hair Extension (8), Wigs (0)
- Cross-cutting "delivery" categories (not in main menu): **Thursday Delivery** (22), **Tuesday Delivery** (8) — used by the homepage carousels.
- ⚠️ 9 products in **Uncategorized** (housekeeping issue).

> Note the taxonomy is messy: categories overlap and aren't mutually exclusive (a product can sit in BOTH `fruit-vegetable` and `every-thursday-delivery`; "Dry Foods & Grocery" also contains Grocery as a child while sharing the word). Counts in child categories can exceed the parent (e.g., Fish 34 vs parent Meat/Seafood/Poultry 33).

### 3.3 Information architecture

```
Top bar (dismissible)
Header: logo | search | WhatsApp | account | wishlist | cart | burger(→off-canvas)
Category mega-menu "Explore Our Products"
Main nav: Home · Our Store · About us · FAQs · Terms & Conditions · Contact
──────
Content pages (Home / Shop / About / FAQ / T&C / Privacy / Accessibility / Contact / Cart / Checkout / Account / Wishlist)
──────
Footer: opening hours · store locations · contact+social · Information · Categories · My Account · legal bar
Sticky side social icons + bottom compare bar
```

---

## 4. Homepage Breakdown

Sections in page order:

### 4.1 Dismissible top bar
- **Purpose:** promotion / freshness hook. Text: "Fresh vegetable online! [Dismiss]".
- **Why:** instant value-recall loop; reminds that produce is fresh. (Top Bar plugin)
- **Weakness:** single static message; not timed/rotated.

### 4.2 Header
- **Purpose:** brand + utility (search, WhatsApp call, account, wishlist, cart, menu).
- Contains: logo, search field, "Whatsapp Us 24/7 0899723223", account icon, wishlist count, cart `0 €0.00`, and a "Menu" trigger.
- **Why:** standard commerce utility bar; the prominent WhatsApp number supports a phone-first customer base.

### 4.3 Hero slider (4 slides — Slider Revolution)
- **Purpose:** brand positioning + category discovery. Auto-rotating with arrows/dots.
- Slide 1 "Welcome To Duud African Foods" → "We specialise in importation of all forms of African Exotic Foods" → CTA **LEARN MORE** → About.
- Slide 2 "Dry Foods & Grocery" → "…your all in one store for all your grocery needs" → CTA → dry-foods-grocery category.
- Slide 3 "Meat, Seafood & Poultry" → "We have in stock the best fresh meat in the market…" → CTA → category.
- Slide 4 "Hair & Beauty Products" → "Shop for the best and original hair & beauty products" → CTA → category.
- **Why:** communicates the 4 pillars and routes users into shopping immediately.
- **Weakness:** CTAs say generic "LEARN MORE" — a wasted conversion step.

### 4.4 Trust / feature strip (4 icon cards)
- Fresh Products (import every Tue & Thu) · Affordability ("good and affordable deals") · Customer Care ("customer centric… always give our best") · Fast Shipping ("express shipping in some regions").
- **Why:** classic reassurance markers above the fold.

### 4.5 "Explore Our Thursdays Import" carousel
- Heading "Explore Our Thursdays Import" + **See More Items** CTA → `/product-category/every-thursday-delivery/`; plus a "Thursdays Import / **Shop now**" banner.
- 8 products shown (Waterleaf €6, Uziza Leaf €3.50, Utazi €3, Ugu Leaf €3.90, Sweet potatoes €7.50, Suger cane €10, Soursop €16, Shoko €3.90).
- **Why:** drives the "just landed / fly-in freshness" story to purchases.

### 4.6 "Explore Our Tuesday Import" carousel
- Same pattern for Tuesday deliveries (Spinach €2.50, Scotch bonnet chilli €10–18.50, Plantain €2.90, Igbo Coco Yam €10, Garden Egg €5–10, Red Bell Pepper €1, Fresh okro €5–9).
- **Why:** second freshness pillar; shows varied/variable-weight items.

### 4.7 "Spices, Seasonings & Condiments" CTA band + newsletter
- Band → **Shop Now**; adjacent newsletter block: "**Stay up to date with us** / Be the first to know about discounts and promotional offer."
- **Why:** promotion capture … **but** the newsletter has no visible integrated provider (no Mailchimp/MC4WP detected) — ⚠️ likely an incomplete/dead signup. 🎯 verify this.

### 4.8 "Proteins" → Meat, Seafood & Poultry carousel
- Header "Proteins" + **See More Items**, banner "Meat, Seafood & Poultry / **Shop now**".
- 8 products (Stockfish Fillet €5, Smoked Turkey €7–13, Smoked cow face €7.50, Smoked chicken €6.50, Red Headless Fish €10, Pluvera Whole chicken €3.50–7.50, Pluvera Cut chicken €9–18, Pluvera Wings €4.80).
- **Why:** monetises the higher-value frozen protein lines.

### 4.9 "Beauty" → Hair & Beauty Products carousel
- Header "Beauty", banner "Hair & Beauty Products / **Shop now**".
- 8 products (Xpression braids €10, Vatika conditioner €10, Vatika hair oil €10, Vaseline Blue Seal €7, Ultimate olive oil €6, Morgan pomade €9, Sulphur 8 shampoo €12, Sulfur 8 treatment €9–14).
- **Why:** taps a major secondary category (206 items).

### 4.10 Pre-footer widget strip — ❌ demo content
- "**Call us 24/7 (1800)-88-66-991**", "**email us contact@example.com**", "follow us" → Facebook/Instagram links to `opalwordpress` (the theme vendor).
- **Why it exists:** it did not — this is inherited theme demo data that was never configured. **High-priority cleanup.**

### 4.11 Footer
- Opening hours (Mon–Sat 9–8, Sun 11–7), two store addresses + phones, email, social icons (Facebook/Instagram/WhatsApp/mail), Information links, quick Categories, My Account links, copyright + Company Registration Number **202461**, **SECURE-PAYMENT** badge image.

### 4.12 Ambient elements
- ⚠️ Sticky social icons (left edge: Facebook, Instagram, WhatsApp — `sticky-social-icons` plugin). One WhatsApp link (`wa.me/353894254279`) differs from the header number (`0899723223`) — flag for review.
- Woo Notifications ("someone just bought X") popups on activity.
- Bottom **Compare** bar + mini-cart "You're viewing:" popup on add-to-cart.

---

## 5. Product & E-commerce System

### 5.1 Product cards (shop grid & home carousels)
- Structure: image → (on hover) wishlist · compare · quick-view icons → product title → price (or price range) → **Add to cart** / **Select options**.
- Cards are WooCommerce `li.product` items in grids (shop: 12/page, default ordering).
- ✅ **Grid/list toggle** (`/?layout=grid|list`).
- ✅ **Sorting:** default, popularity, latest, price low→high, price high→low.
- ✅ **Filtering (sidebar "Explore"):** category list (with counts) + a price-range slider ("Min price / Max price / Filter"; shows "Price: —").
- ✅ **Pagination:** 42 pages with standard pager.
- Results count: "Showing 1–12 of 498 results".

### 5.2 Product names, prices & variations
- Names are descriptive + weight (e.g., "Waterleaf 500grms", "Achi Powder – 60grms", "Sweet potatoes 1kg", "Scotch bonnet chilli Peppers(Hot pepper)").
- ✅ Prices in **Euro (€)** — Ireland, VAT inclusive (per T&Cs), delivery extra.
- ✅ **Variations** exist widely (e.g., 1kg/500g; size/weight attributes) using **WooCommerce Variation Swatches** plugin. Variable products show price range + "Select options".
- ❌ Case inconsistency in names ("Suger cane", "Tuesdays Import" vs "Tuesday Delivery").

### 5.3 Single product page
- Breadcrumbs (Home / Shop / Category / Product).
- Image gallery with **prev/next thumbs**.
- "**In Stock**" badge (and presumably out-of-stock states).
- Title · price (range for variables) · attribute swatches (e.g., "Size: 1kg / 500g") · quantity · **Add to cart** · **Compare** · **Add to wishlist**.
- Meta: **SKU: N/A** (many products have no SKU ❌), Categories, plus a description tab and "Additional information" tab.
- **Related products** carousel.
- ⚠️ Visual lightweight: no zoom, minimal gallery, often only 1 image.

### 5.4 Add-to-cart / cart / checkout
- Add-to-cart via standard WooCommerce endpoints (`/?add-to-cart=<id>`); AJAX mini-cart "You're viewing: …" popup (WooSmartWishlist/theme's added-to-cart modal).
- Cart = stock WooCommerce table (empty in our test); **Coupon** area, totals, proceed to checkout.
- Checkout = stock WooCommerce (redirects to cart if empty). Payment details not inspectable without an active cart; FAQ confirms "all major debit & credit cards". ⚠️ A "SECURE-PAYMENT" badge image exists in the footer — could not verify the live payment gateways actually enabled.

### 5.5 Wishlist / Compare / Quick view
- **Wishlist:** WooSmartWishlist → `/wishlist/WOOSW`, count badge in header.
- **Compare:** WooSmartCompare → add from cards, bottom bar with "Hide similarities / Highlight differences", column field selection (Image/SKU/Rating/Price/Stock/Availability/Add-to-cart/Description/Content/Weight/Dimensions/Additional info), print + share.
- **Quick view:** WooSmartQuickView modal from product cards.
- ⚠️ **No product reviews/ratings seen** on product pages despite "Rating" being a compare field — likely empty review system.
- ❌ **No stock-status filters, no "in stock only" toggle, no search-inside-category refinement** beyond price.

---

## 6. Navigation

### 6.1 Header & menus
- **Top utility bar:** search input + WhatsApp 24/7 number + icon row (account, wishlist count, cart count+€total).
- **Category mega-menu:** "Explore Our Products" triggers dropdown with nested category tree (verified in markup).
- **Main menu:** Home · Our Store · About us · FAQs · Terms & Conditions · Contact.
- **Mobile:** burger "**Menu**" opens a full off-canvas drawer mirroring the same tree with nested items; cart/wishlist/account stay in the header strip.

### 6.2 Search
- Search field in header (site-wide WooCommerce search, "Search for:" placeholder). 
- ❌ No live/instant suggestions; no result page SEO tuning beyond default archive.

### 6.3 Footer navigation
Four companion link groups: **Information**, **Categories**, **My Account**, plus location/contact widgets.

### 6.4 How users flow
1. Land on hero → pick category pillar → category archive → product → add to cart → cart → checkout.
2. Or homepage carousel → direct product → quick add.
3. Or search → results → product.
4. Or category mega-menu from anywhere.
5. Non-store paths: About (trust) → Contact / WhatsApp → FAQ (objections).

### 6.5 Navigation issues
- ❌ **No cart/breadcrumb in footer** — standard, fine.
- ⚠️ Account icon link is present but the account page hard-redirects (HTTP 202) in our probe — could not confirm it renders normally; worth a manual check.
- ❌ Mega-menu has no imagery/descriptions (text-only), missing merchandising opportunity.
- ❌ "Explore Our Products" + main nav are separate menus — two competing navigation systems in one header.

---

## 7. Design System

> Colour values extracted from the live `freshio/style.css` (counted appearances). Typography from the Google Fonts calls actually loaded on the homepage. All exact-ish but presented as observed, not "official" tokens.

### 7.1 Colours (verified from CSS)
- **Primary:** `#0a472e` — dark forest green (57 occurrences) — buttons, headings, brand blocks.
- **Accent / CTA:** `#a8b324` (lime-olive, 62 occurrences), darker sibling `#80891b` — hovers, highlights, icon accents.
- **Secondary / warm neutrals:** `#dfb178` (caramel/tan), `#f8eee3` (light cream/beige) — used in organic/fresh themed sections.
- **Base:** `#fff`; borders `#ebebeb`; body text `#555`; muted `#999`.
- **Elementor palette staples** also loadable (`#1890d7` blue, `#ffab00` amber) but not clearly the brand look.

### 7.2 Typography
- **Headings:** Merriweather (serif) — loaded via `Roboto%7CMerriweather`. Serif headings = "trustworthy, editorial grocery" feel.
- **Body:** Roboto (sans-serif).
- **Also loaded:** Plus Jakarta Sans (variable, 200–800) — used for selected Elementor widgets/elements.
- Body sizes cluster at 14–16px; larger display headings ~20/30px.

### 7.3 Buttons
- Solid green background (`#0a472e`), white text, small radius. Secondary/outline styles present for "See More" etc. Add-to-cart buttons prominent on cards.
- Radius: mostly **3–5px** (sharp-ish); some pill (30/50px) shapes in the theme; circular icon buttons (50%) for wishlist/compare/quick-view.

### 7.4 Cards, spacing, shadows
- Product cards: white, thin `#ebebeb` borders, image top, centred content, hover overlay with icon actions.
- Border radius 3–5px on cards (estimate).
- ⚠️ Shadows: theme has box-shadows on hover (estimate — not precisely measurable from source); generally flat, low-shadow aesthetic.
- Spacing: generous grids; standard 12px-based spacing in theme variables.

### 7.5 Icons & imagery
- FontAwesome/inline SVGs (a11y arrows, subtle). Feature icons use PNG "shape-*" images.
- Image style: mixed. Best = clean white/green backgrounds (e.g., Waterleaf cutout). Worst = raw product/spec photos, inconsistent backgrounds, low resolution; some duplicated images, some `webp`, some 450×450 crops, some non-square.
- ⚠️ Some images clearly sourced from African e-commerce listings (e.g., "s-l400.jpg", "yhst-…") — varying quality.

### 7.6 Visual hierarchy
- Hero → feature trust strip → category carousels (repeat) → footer. Consistent title/CTA/tab pattern per block; the "header + See More + Shop now banner + carousel" rhythm is uniform and scannable.
- ✅ Good hierarchy overall; ❌ hero CTAs undersell ("LEARN MORE"), and the demo pre-footer block breaks the brand.

---

## 8. Responsive Design

### 8.1 Desktop
- Full header (search + WhatsApp + icons), mega-menu hover dropdown, 4+ column product grids, side-by-side store schemas on contact, hover-driven card overlays.

### 8.2 Tablet
- Grids collapse (3→2 columns), header condenses (search collapses), off-canvas menu available via "Menu".

### 8.3 Mobile
- Burger off-canvas navigation with nested accordion categories; icons-only utility strip; 1–2 column grids; Slider Revolution re-renders hero copy at mobile breakpoints (markup contains separate mobile H2 variants — verified); sticky social icons shrink (CSS evidence at ≤415px); quantity/price stack on product page.

### 8.4 Verdict
- ✅ Responsive out of the box (Freshio is a modern responsive theme; Slider Revolution + Elementor are responsive-first).
- ⚠️ No mobile-specific speed or UX strategy observed (no AMP, no critical-CSS tweaks evident); carousels rely on touch swipe — acceptable.

---

## 9. User Experience

### 9.1 Strengths
- ✅ Easy to find categories (mega menu + homepage carousels + footer).
- ✅ Fast add-to-cart; wishlist/compare/quick-view add modern "shop" behaviors.
- ✅ Transparent shipping costs in T&Cs, opening hours everywhere, two store addresses, WhatsApp support — trust anchors.
- ✅ QA/FAQ genuinely useful and specific.
- ✅ Breadcrumbs on shop/product pages.
- ✅ Local favorites merchandised (Stockfish, Ugu, Scotch bonnet, Sulphur 8…).

### 9.2 Friction / weaknesses
- ❌ **Trust breakers:** `(1800)-88-66-991`, `contact@example.com`, theme-demo social links in the pre-footer strip.
- ❌ **Two WhatsApp numbers / conflicting store name** (FAQ says "Blanchardstown store"; contact page says Clonsilla).
- ❌ **Thin product content:** many descriptions = one line or a weight only; no nutrition/usage/origin info; SKUs N/A.
- ❌ **Inconsistent product images** — biggest credibility drag for fresh food.
- ❌ No visible reviews/ratings.
- ❌ Newsletter block appears non-functional (no provider detected).
- ⚠️ Readability: serif headings + Roboto body is fine; some long unspaced product names (e.g., "Scotch bonnet chilli Peppers(Hot pepper)") wrap awkwardly.
- ⚠️ Performance: 330KB of HTML on the homepage plus a full slider, mega-menu, multiple carousels — likely a heavy initial payload (flagged below).
- ⚠️ Accessibility: skip-navigation not detected; icon-only links lack obvious text in places; user-scalable=no meta on viewport (⚠️ `content="width=device-width, initial-scale=1.0, user-scalable=no"` is a mobile accessibility problem).
- ❌ No back-in-stock, no stock levels, no order tracking UX beyond WooCommerce default.

---

## 10. Content Inventory

### 10.1 Brand
- **Name:** Duud African Foods
- **Tagline:** "African Online Grocery" (title tag)
- **Hero promise:** "We specialise in importation of all forms of African Exotic Foods"
- **Description:** Nigerian/African foods + beauty importer; two Dublin stores; weekly fresh imports (Tue & Thu); delivery & click & collect.
- **Registration:** Company No. 202461

### 10.2 Store facts
- **Addresses:**
  - Unit 2 Pinewood House, Hunstown Community Centre, Huntstown Way, Clonsilla, Dublin, D15 P086 — Tel (01) 813 0827 — Mon–Sat 9–8, Sun 11–7.
  - Adventure House, Chapel Hill, 1 St. Edmondsbury, Lucan, Co. Dublin, K78 K1C9 — Tel (01) 621 8830 — Mon–Sat 9–8, Sun closed.
- **Email:** duudafricanfoods@gmail.com
- **Phones:** (01) 813 0827 · (01) 621 8830 · WhatsApp 0899723223; T&Cs also list 0894254279.
- **Delivery:** €10.99 flat within Dublin; €19.99 outside; 2–5 working days; click & collect offered.
- **Payments:** all major debit/credit cards; prices include VAT.

### 10.3 Value props & stats (homepage/About)
- Fresh Products (Tue & Thu imports) · Affordability · Customer Care · Fast Shipping.
- Why Choose: Fresh & Organic **99%** · Product Availability **80%** · Fast Delivery **85%**.

### 10.4 Testimonials (6, from About)
Eko; Eyiwumi Netufo; David Tuohy; Victor Laurnce (sic); Roxy Muonye; Lanre Adigun — praising prices, freshness, service, quality.

### 10.5 Categories (with item counts)
Beans 11 · Drinks 15 · Dry Foods & Grocery 121 · Fish 34 · Flour 20 · Fruit & Vegetable 35 · Grocery 60 · Hair & Beauty 206 · Hair Extension 8 · Meat 8 · Meat/Seafood/Poultry 33 · Oil 5 · Poultry 6 · Rice 13 · Seafood 3 · Spices/Condiments/Seasonings 42 · Thursday Delivery 22 · Tuber 2 · Tuesday Delivery 8 · Uncategorized 9 · Wigs 0 · **Total ≈ 498**.

### 10.6 Representative products (name / price / variation)

| Product | Price | Variation |
|---|---|---|
| Waterleaf 500grms | €6.00 | — |
| Uziza Leaf | €3.50 | — |
| Utazi | €3.00 | — |
| Ugu Leaf | €3.90 | — |
| Sweet potatoes 1kg | €7.50 | — |
| Suger cane 1kg | €10.00 | — |
| Soursop 1kg | €16.00 | — |
| Shoko | €3.90 | — |
| Spinach | €2.50 | — |
| Scotch bonnet chilli Peppers | €10.00–€18.50 | 1kg / 500g |
| Plantain | €2.90 | size variants |
| Igbo Coco Yam / Edeh 1kg | €10.00 | — |
| Garden Egg | €5.00–€10.00 | variants |
| Fresh Peppers (Red Bell) | €1.00 | — |
| Fresh okro | €5.00–€9.00 | variants |
| Stockfish Fillet | €5.00 | — |
| Smoked Turkey (Frozen) | €7.00–€13.00 | variants |
| Smoked cow face 1kg | €7.50 | — |
| Smoked chicken | €6.50 | — |
| Red Headless Fish | €10.00 | — |
| Pluvera Whole Hard Chicken | €3.50–€7.50 | variants |
| Pluvera Cut Chicken | €9.00–€18.00 | variants |
| Pluvera Chicken Wings | €4.80 | — |
| Xpression Kanekalon Braid Hair | €10.00 | — |
| Vaseline Blue Seal | €7.00 | — |
| Morgan pomade 200ml | €9.00 | — |
| Sulphur 8 deep conditioning shampoo 340ml | €12.00 | — |
| Sulfur 8 treatment | €9.00–€14.00 | variants |
| 20 Large Eggs | €6.00 | — |
| Abacha | €4.00–€16.00 | variants |
| Achi Powder 60grms | €3.50 | — |
| Ades Plantain Chips Sweet 12×35g | €9.00 | — |
| Af jollof rice seasoning 100g | €3.80 | — |

### 10.7 FAQ topics (8)
Fresh vegetables (Tue/Thu) · Open Sundays (Lucan only?) · Card payment · Physical locations · Delivery areas · Parking · Contact channels · Click & collect.

---

## 11. Technical Analysis

### 11.1 Stack (all verified from HTML/source)
- **CMS:** WordPress 7.1 (generator meta)
- **E-commerce:** WooCommerce 11.0.1; add-to-cart endpoints standard; checkout/cart standard.
- **Theme:** `freshio` (Wpopal) + `freshio-child` (active child)
- **Page builder:** Elementor 4.2.3 (external CSS, google_font enabled)
- **Theme framework:** Redux 4.5.13
- **Slider:** Slider Revolution 6.5.9
- **SEO:** Yoast SEO (sitemap: post / page / product / product_cat / author)
- **Plugins detected in asset paths:** `astra-sites`, `elementor`, `facebook-for-woocommerce`, `jetpack`, `revslider`, `smart-slider-3`, `sticky-social-icons`, `top-bar`, `woocommerce`, `woo-notification`, `woo-smart-compare`, `woo-smart-quick-view`, `woo-smart-wishlist`, `woo-variation-swatches`, `wordpress-seo` (Yoast), `meta-capi-param-builder-clientjs` (FB CAPI SDK 3.7.6).

### 11.2 Third-party services / scripts
- ✅ **Facebook Pixel** ID `5407849622560721` + `fbq` + Facebook for WooCommerce (Meta CAPI param builder); `connect.facebook.net/en_US/fbevents.js`.
- ✅ **Jetpack Stats** (`stats.wp.com/e-202637.js` / `s-202637.js`).
- ⚠️ **No Google Analytics / GTM** detected (grep found none).
- ✅ **Google Fonts** (Merriweather, Roboto, Plus Jakarta Sans); fonts.googleapis loaded.
- ✅ **unpkg.com** (FB CAPI param builder).
- ✅ **External image hosting:** none — all images self-hosted under `/wp-content/uploads/` (product, slider cache, 2020–2026).
- ⚠️ Payment branding shown via static images (`payment_1.png`, `SECURE-PAYMENT-1.png`); live gateways unverifiable without checkout.

### 11.3 Infrastructure
- Server `nginx` (HTTP/2), PHP behind it (`x-httpd-modphp: 1`), `host-header` present (shared/panel hosting), proxy cache headers (`x-proxy-cache-info: DT:1`), WooCommerce-style `set-cookie` for `_fbp`.
- robots.txt correctly disallows `/wp-admin/`, cart URLs, and WooCommerce transient logs; Yoast sitemap block present.
- Page weight: **~331 KB** raw HTML on the homepage (before CSS/JS/images).

### 11.4 SEO structure / image tags
- `loading="lazy"` applied (43 uses) — good.
- Images often lack explicit width/height; alt text present but sometimes generic (filename-based).

---

## 12. SEO Analysis

### 12.1 What's good
- ✅ Clean, keyword-friendly URL slugs (`/product-category/fruit-vegetable/`, `/shop/waterleaf/`).
- ✅ **Yoast sitemaps** alive (post/page/product/product_cat/author).
- ✅ Breadcrumbs (product/category) feeding internal structure.
- ✅ Descriptive page titles: "Home - African Online Grocery - Duud African Foods".
- ✅ Open Graph + Twitter cards present (Yoast).
- ✅ Google site verification present (`GK0r9…`).
- ✅ Lazy images; robots clean; VAT/pricing visible.

### 12.2 What's weak
- ❌ **OG image = `shape-1.png`** (a small decorative arrow-corner icon) — social shares show a broken/nonsense thumbnail. 🎯 Set a proper branded 1200×630 OG image.
- ❌ **Thin product content:** descriptions often a single weight string; no meta descriptions apparent per product; weak for long-tail "Nigerian waterleaf Dublin" queries.
- ❌ **Slug hygiene:** beauty-product slugs contain a zero-width space (e.g., `%e2%81%a0vatika-…`) — poor URLs, duplication risk.
- ❌ `Uncategorized` (9) products; category taxonomy overlaps create thin/duplicate archive surfaces.
- ⚠️ Sitemap `lastmod` for product cats updated Sep 2026 (fresh) — good signal.
- ⚠️ Only 5 sitemap fractions; no video/image sitemaps; blog essentially absent (post-sitemap stale Feb 2026).
- ❌ No obvious FAQ schema / Product schema markup on product pages (not detected in source extracts).

### 12.3 🎯 SEO improvement wins
1. Proper OG/social images site-wide.
2. Write 60–150 word product descriptions incl. region + usage + "where to buy" wording.
3. Fix zero-width-space slugs; 301 old URLs.
4. Add Product + FAQPage schema.
5. Reclaim `Uncategorized` products into proper categories.
6. Category landing pages with intro copy + internal links (they're currently pure archives).

---

## 13. Strengths

1. **Real, functioning store** with ~498 products and genuine fulfillment (stores, delivery zones, imports, click & collect).
2. **Strong, distinctive brand story** — daily-fresh flown produce from Nigeria, no chemicals.
3. **Solid commerce feature set:** wishlist, compare, quick view, variation swatches, AJAX add-to-cart, coupon-ready cart.
4. **Helpful content:** a genuinely useful FAQ, real testimonials, clear T&Cs with shipping prices.
5. **Transparent local presence:** two Dublin addresses, phone numbers, opening hours, WhatsApp — huge trust asset vs dropshippers.
6. **Coherent green identity** for "fresh/organic".
7. **Good taxonomy localization** (Nigerian ingredient names map directly to product names — excellent for targeted shoppers).
8. **Breadcrumbed, clean URL structure**, Yoast managed.

---

## 14. Weaknesses

1. ❌ **Demo/placeholder content left live** (fake phone, `contact@example.com`, theme-owner social links) — actively damages credibility.
2. ❌ **Inconsistent contact/identity data** (two WhatsApp numbers; FAQ "Blanchardstown" vs site "Clonsilla").
3. ❌ **Inconsistent product imagery and thin descriptions** — undermines a fresh-produce brand.
4. ❌ **Social sharing thumbnails are broken** (OG icon).
5. ❌ **Heavy homepage** (big slider + multiple carousels; ~331KB HTML; no GA for insight).
6. ❌ **Newsletter block appears non-functional.**
7. ❌ Products lack SKUs, reviews, ratings, back-in-stock — weak trust signals at PDP.
8. ⚠️ **Accessibility:** `user-scalable=no` on the viewport meta; icon-only controls; no skip link observed.
9. ⚠️ Overlapping categories and an `Uncategorized` bucket — IA cleanup needed.
10. ⚠️ No live chat product beyond WhatsApp; checkout trust (badges/logos) undemonstrated on the live pages themselves.

---

## 15. Recommended Improvements

### 15.1 Quick wins (1–2 days)
- 🎯 Replace pre-footer demo strip with real phone/email/socials (or remove it).
- 🎯 Unify phone/WhatsApp numbers and store names across header, footer, FAQ, T&Cs, contact.
- 🎯 Upload a proper 1200×630 OG/social image; configure Yoast defaults.
- 🎯 Verify/fix or remove the newsletter signup.
- 🎯 Fix intro-hero CTAs to action-oriented text ("Shop Fresh Vegetables", "Browse Groceries").
- 🎯 Remove or re-home `Uncategorized` products.

### 15.2 Medium effort (product/content)
- 🎯 Write real product descriptions (origin, use, storage, "fresh every Tuesday" hooks) for the top 100 SKUs.
- 🎯 Standardise product imagery (bright, consistent light-green/white background, square 800×800, WebP).
- 🎯 Assign SKUs; clean titles/case; fix zero-width-space slugs with redirects.
- 🎯 Enable reviews + seed them from the existing testimonials; add rating stars to cards.
- 🎯 Add stock level / "back in stock" notification via WooCommerce or plugin.
- 🎯 Create rich category landing pages (intro copy, sub-links, SEO text).

### 15.3 Trust & conversion
- 🎯 Show delivery/click&collect options at PDP ("Delivers in 2–5 days · Click & Collect available").
- 🎯 Add payment logos inline at checkout + a "Secure checkout" trust bar.
- 🎯 Add order tracking, email confirmations (WooCommerce order emails styled on-brand).
- 🎯 Add a measurement/weight unit clarity on products (500g/1kg toggles already exist via swatches — reinforce with "+ Add" flows from the carousel).

### 15.4 Performance & analytics
- 🎯 Add GA4 (or GA4 consent) and configure Enhanced E-commerce / purchase events alongside the existing Facebook Pixel.
- 🎯 Install a caching/CDN layer; serve WebP/AVIF; lazy-load below-fold carousels; trim jQuery/Slider Revolution bloat on non-home pages.
- 🎯 Consider server-side rendering friendly approach and preload hero.

### 15.5 Accessibility & UX
- 🎯 Restore user zoom (remove `user-scalable=no`), add skip-to-content, aria-labels on icon buttons.
- 🎯 Improve keyboard nav for mega menu.
- 🎯 Add persistent mini-cart and sticky checkout on mobile.
- 🎯 Simplify the header: one primary nav concept (merge "Explore Our Products" and main menu).

---

## 16. Suggested Modern Website Architecture

If rebuilding from scratch (for the eventual rebuild task):

### Platform & stack
- 🎯 **Headless or decoupled store** recommended: **Next.js (App Router) + TypeScript + Tailwind CSS** front-end with a commerce backend (WooCommerce REST via GraphQL proxy, or a modern headless like Medusa/Shopify/storefront API). Choose a decoupled WooCommerce/GraphQL if the catalog (498 products, variants) must be preserved as-is; choose Medusa/Shopify if migrating.
- 🎯 Keep the catalog structure but normalise the taxonomy into clean, mutually exclusive primary categories + optional "delivery day" tags.

### Design direction
- **Theme:** "fresh market meets premium grocery."
  - Palette: keep the brand greens (`#0a472e`, `#a8b324`), neutral cream `#f8eee3`, deep charcoal text.
  - Typography: one strong display font pair (e.g., serif display for "fresh/artisan" + clean grotesk for UI), 1–2 typefaces max (matches current serif+sans identity).
  - Rounded cards (12–16px), soft shadows, generous whitespace; vivid food photography on light-green/cream backgrounds.
- **Reusable system:** Button, Card, PriceRange, Rating, Badge, QuantityStepper, Carousel, Accordion, Breadcrumbs, Toast/MiniCart, Modal (quick view), Compare bar.

### Information architecture (modernised)
- Header: sticky, logo · megamenu (categories w/ imagery) · search-with-suggestions · account · wishlist · cart (drawer).
- Homepage:
  1. Hero (value prop + category shortcut cards)
  2. "This week's imports" freshness strip w/ countdown ("Next Thursday delivery")
  3. Category tiles (6)
  4. Best sellers carousel
  5. Value props + testimonials
  6. Store locations + click & collect banner
  7. Newsletter (functional, with consent) + footer
- Product page: gallery w/ zoom, variants, stock badge, delivery info, description tabs, related products, review widget.
- Checkout: one-page or multi-step with progress; guest checkout + express (Apple Pay / cards); click & collect + delivery selectors.

### Performance targets
- Lighthouse ≥ 90 (4G): image pipeline (WebP/AVIF, 800px), font preload, streaming SSR, edge caching, WebVitals budgets.
- Analytics: GA4 + Meta Pixel (CAPI) + consent management (GDPR — Ireland audience, EU).
- Accessibility: WCAG 2.1 AA (zoom enabled, keyboard nav, ARIA, focus states, contrast on brand green).

### Migration
- 🎯 Export products/variations/images via WooCommerce REST → transform → import; preserve URLs with 301s; preserve account/order history if feasible.

---

## 17. Final Assessment

**Overall: 6/10 as a working store · 4/10 as a modern web experience.**

Duud African Foods is a **genuinely operational niche retailer** with real inventory, real stores, and a compelling freshness story — the hard part (trust, sourcing, logistics, product range) is solved. What holds it back is entirely addressable polish: demo leftovers, thin product content, inconsistent visuals, missing analytics, and a dated generic-grocery theme that never "feels premium."

It is **not** a website that needs to be thrown away because it's broken — but it *is* one that a professional rebuild would elevate enormously, because the brand underneath is stronger than the site selling it.

---

## Summary: what I learned & what a rebuild needs

**What the site taught us:**
1. The business DNA is: *weekly flown-in Nigerian produce, two Dublin stores, delivery + click & collect, big beauty range*, and the € euro market.
2. Catalog reality: ~498 products across an overlapping, delivery-day-based taxonomy; heavy use of size/weight variants; prices €1–€20 per item.
3. The existing trust anchors to preserve: real addresses/phones/WhatsApp, genuine testimonials, clear delivery/pricing terms, honest FAQ.
4. The current weakest points to fix in any rebuild: fake demo contact data, broken social-share thumbnails, thin descriptions, poor image consistency, no visible analytics/reviews, heavy homepage.

**To recreate a modern version from scratch you would need:**
1. **A product data layer** — structured JSON/DB of ~498 products with name, price (range support), weight/size variant attributes, images, descriptions, stock, categories/tags. This is the real work: clean, enrich, and standardise the existing 2020–2026 catalog.
2. **A modern stack** — Next.js/React front end + a commerce engine (WooCommerce GraphQL, Medusa, or Shopify) for cart/checkout/payments; Tailwind design system on the brand green/cream palette.
3. **Content strategy** — rewritten category pages and product descriptions using the freshness narrative and local-Irish-delivery facts, plus proper OG/schema.
4. **Imagery pipeline** — consistent product photography (or AI-assisted cleanup), WebP/AVIF, CDN.
5. **Analytics & trust plumbing** — GA4, Meta CAPI, consent (GDPR), reviews, order tracking, secure-checkout trust elements.
6. **Evidence of the real business** carried into the UX: import schedule, store hours, click & collect, local delivery — woven into every touchpoint, because *that* is the differentiator, not the groceries alone.

The blueprint above (Section 16 + 15) is what will be executed when we build the new site.