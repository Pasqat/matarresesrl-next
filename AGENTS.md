# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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
Content comes from the **Matarrese pannello** (separate PHP app, online at cms.matarrese.it; WordPress is retired). `lib/pannello.js` reads its public JSON at `${NEXT_PUBLIC_PANNELLO_URL}/dati/*` (with `lib/fetchWithRetry.js`) and reshapes it into the objects the pages read. `lib/query/` (`post.js`, `project.js`, `event.js`) are thin wrappers the pages call from `getStaticProps`. Detail pages are generated on first visit (ISR); the sitemap lists them by reading the slugs from the pannello (`next-sitemap.config.js`).

### API routes (`pages/api/`)
| Route | Purpose |
|-------|---------|
| `contact.js` | Contact form → Resend email + optional Odoo CRM lead |
| `subscribe.js` | Newsletter signup → MailerLite |
| `anteprima.js` / `exit-preview.js` | Preview of a pannello draft: the pannello signs the link, `anteprima.js` checks it and turns on Next preview mode; no login |

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
- `NEXT_PUBLIC_PANNELLO_URL` — pannello base URL (required: news, realizzazioni, eventi, avviso, chiusure, recensioni, marchi)
- `NEXT_PUBLIC_DOMAIN` — canonical domain (used in meta tags and sitemap)
- `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` — email sending
- `ODOO_*` — CRM integration (see README for full list)
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`, `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` — analytics

### ESLint
Config is in `eslint.config.mjs` (ESLint 9, flat config). `eslint-config-next` 16 ships a native flat config, so we spread `eslint-config-next/core-web-vitals` and `eslint-config-prettier` directly — no `FlatCompat`, no `.eslintrc`. The old `.eslintrc.js` legacy format is gone; do not reintroduce it. The React Compiler rules that `eslint-plugin-react-hooks` 7 now enables (`react-hooks/set-state-in-effect`, `react-hooks/immutability`) are intentionally turned **off** — the codebase predates them; see the comment in `eslint.config.mjs`.
