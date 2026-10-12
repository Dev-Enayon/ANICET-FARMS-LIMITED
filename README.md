# ANICET-FARMS-LIMITED

Corporate website for ANICET FARMS LIMITED — original, professional agribusiness
site built with Astro.

## Development

```sh
npm install
npm run dev        # local dev server (SSR on-demand routes work out of the box)
```

## Build & preview

```sh
npm run build      # produces dist/ — prerendered static pages + a server bundle
npm start          # serve the built site (node adapter, standalone)
npm run verify:links
```

## Admin dashboard

Admins can add, update and delete catalogue products from `/admin/`:

- Product edits persist to `data/products.json` (a committed JSON store, seeded
  with the verified starter catalogue).
- The **home** and **Products** pages plus the header **search** read that store
  at request time, so admin edits appear immediately — no rebuild needed.
- Sign in uses a single shared password with an HMAC-signed session cookie.

### Configure credentials

Set these in your environment (or a `.env` file — `.env` is gitignored):

```dotenv
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_AUTH_SECRET=choose-a-long-random-string
COOKIE_SECURE=true   # only when serving over HTTPS
```

Without them the dashboard falls back to **dev-only** credentials
(`anicet-admin` / a hard-coded dev secret) with a visible warning on the login
screen. Never run production with the fallback.

### Adding product images

The image field must reference a file that exists under `public/` (e.g.
`/img/products/my-product.png`). Put the file in the repo, then reference its
served path. Remote `http(s)` URLs are also accepted.

### API

| Method | Route                   | Purpose                          |
| ------ | ----------------------- | -------------------------------- |
| POST   | `/api/auth/login`       | Verify password, set session     |
| POST   | `/api/auth/logout`      | Clear session                    |
| GET    | `/api/products`         | Catalogue (admin session)        |
| POST   | `/api/products`         | Create product (admin session)   |
| PUT    | `/api/products/:id`     | Update product (admin session)   |
| DELETE | `/api/products/:id`     | Delete product (admin session)   |

The admin dashboard and API routes are excluded from the sitemap and marked
`noindex`.