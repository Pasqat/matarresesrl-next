# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server on http://localhost:3000
pnpm build        # production build (runs next-sitemap postbuild automatically)
pnpm start        # serve production build
pnpm lint         # ESLint
pnpm format       # ESLint with --fix
```

> **Package manager: `pnpm`** — there is no `yarn.lock`. The README references yarn but it is outdated.

There are no automated tests in this project.

## Architecture

**Next.js 14 Pages Router** — no App Router. All routes live in `pages/`.

### Backend
The site is a **headless WordPress** frontend. All content (posts, projects, events, products) is fetched from WordPress via:
- **Apollo Client + GraphQL** (`lib/apolloClient.js`) — used for SSG/SSR data fetching in `getStaticProps` / `getServerSideProps`.
- **Direct `fetchJson` + raw GraphQL** (`lib/fetchJson.js`) — used in authenticated API routes (preview mode, JWT-protected requests).

GraphQL queries are organized in `lib/query/`:
- `post.js`, `project.js`, `event.js` — main content types
- `fragment/` — reusable GraphQL fragments (image, seo, categories, faqs, event)

### API routes (`pages/api/`)
| Route | Purpose |
|-------|---------|
| `contact.js` | Contact form → Resend email + optional Odoo CRM lead |
| `subscribe.js` | Newsletter signup → MailerLite |
| `login.js` / `logout.js` | WordPress JWT auth via `iron-session` |
| `preview.js` / `exit-preview.js` | Next.js preview mode for WP drafts |
| `user.js` | Session user info |

### Auth / Session
WordPress JWT auth is handled through `iron-session` (cookie-based). `lib/authenticate.js` calls the WP GraphQL `login` mutation; `lib/refreshToken.js` refreshes expired tokens. Session helpers are in `lib/session.js` (`withSessionRoute`, `withSessionSsr`).

### Integrations
- **Resend** — transactional email from `contact.js`. Requires `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO`.
- **Odoo CRM** (`lib/odoo.js`) — lead creation via XML-RPC. Enabled by `ODOO_ENABLED=true`. IDs for tag and source are configurable via `ODOO_TAG_ID` / `ODOO_SOURCE_ID` (defaults: 14 / 11). Includes exponential backoff retry.
- **MailerLite** — newsletter groups fetched at build time in `lib/newsletter.js`.
- **Plausible** — analytics via `next-plausible`, always active.
- **Facebook Pixel + Google Tag Manager** — loaded in `_app.js` only after cookie consent.

### Grid system
`components/grid.jsx` provides a **12-column responsive grid**: `grid-cols-4` (mobile) → `md:grid-cols-8` → `lg:grid-cols-12`. Use `col-span-full lg:col-span-4` for 3-column layouts, `lg:col-span-6` for 2-column.

### Component conventions
- Typography: `H1`–`H6`, `Paragraph` from `components/typography.jsx`.
- Sections: self-contained layout blocks in `components/sections/` (hero, logo, blog, testimonial, etc.).
- Images: always use Next.js `<Image>` with `placeholder="blur"` for local imports; `unoptimized: true` is currently set in `next.config.js` as a temporary workaround.
- Logging: use `logStructuredError(context, err, extra?)` from `lib/logging.js` — never `console.log` in API routes or lib files.

### Environment variables
Copy `.env.local.example` to `.env.local`. Key variables:
- `NEXT_PUBLIC_WP_API_URL` — WordPress GraphQL endpoint
- `NEXT_PUBLIC_DOMAIN` — canonical domain (used in meta tags and sitemap)
- `SECRET_COOKIE_PASSWORD` — iron-session secret (min 32 chars)
- `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` — email sending
- `ODOO_*` — CRM integration (see README for full list)
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`, `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` — analytics

### ESLint
Config is in `.eslintrc.js` (ESLint 8, legacy format). The flat config format is **not** used — do not create `eslint.config.js`.
