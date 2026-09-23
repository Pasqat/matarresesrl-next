# Matarrese srl website

![](/public/img/readmemd.jpg)

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app),
for headless Wordpress and styled with Tailwindcss

## Getting Started

install the dependencies

```
yarn install
```

Remember to set the environmental variables in `.env.local` and then run the
development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

---

## Odoo Integration

Per abilitare la sincronizzazione dei lead/contatti su Odoo, configura queste
variabili in `.env.local`:

- `ODOO_ENABLED=true` – Abilita la sync Odoo.
- `ODOO_MUST_SYNC=true` – Rende bloccanti gli errori Odoo (il form fallisce se
  la sync non va a buon fine).
- `ODOO_URL` – URL del tuo Odoo (es: `https://your-odoo-domain.com`).
- `ODOO_DB` – Nome del database Odoo.
- `ODOO_USER` – Email dell’utente Odoo.
- `ODOO_API_KEY` – API key generata su Odoo (la password non è più usata).
- `ODOO_RETRY_MAX` e `ODOO_RETRY_BASE_MS` – (opzionali) Configurano il
  retry/backoff in caso di errori temporanei.

**Nota:** Il sistema usa XML-RPC per la creazione dei lead. Il tag
`sitoweb-form` viene assegnato automaticamente tramite ID 14 (modificare in caso
di necessità).

Assicurati che l’utente e la API key abbiano i permessi per creare lead
(`crm.lead`) nel database Odoo.
