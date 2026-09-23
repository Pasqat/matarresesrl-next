# Migrazione al dominio canonico `www.matarrese.it`

Guida operativa per rendere `https://www.matarrese.it` l'unico host canonico del
sito ed eliminare i problemi di contenuto duplicato / pagine non indicizzabili.

## Contesto

Il codice del frontend Next.js usa come host canonico il valore di
`process.env.NEXT_PUBLIC_DOMAIN`, con fallback `https://www.matarrese.it`
(vedi `lib/seo/schema.js`, `next-sitemap.js`, `pages/feed.xml.js`).

> ⚠️ **La cosa più importante è la variabile d'ambiente su Vercel, non il codice.**
> Se `NEXT_PUBLIC_DOMAIN` in produzione vale `https://matarrese.it`, il canonical,
> l'`og:url` e la sitemap restano **senza www** anche dopo aver deployato le
> modifiche al codice, perché la env var vince sul fallback.

## 1. Vercel (hosting di produzione)

1. **Environment Variables** → Production: impostare
   `NEXT_PUBLIC_DOMAIN = https://www.matarrese.it`.
   Controllare anche gli ambienti *Preview*/*Development*.
2. **Domains**: aggiungere **entrambi** i domini al progetto:
   - `www.matarrese.it` → impostarlo come **Primary**.
   - `matarrese.it` (apex) → Vercel lo configura automaticamente come
     **redirect 308 → `www.matarrese.it`** mantenendo il path.
   > Oggi l'apex `matarrese.it` **non risponde** (non risolve su HTTPS): va
   > aggiunto e fatto puntare a Vercel via record DNS (A/ALIAS o CNAME secondo
   > le istruzioni mostrate da Vercel).
3. **Redeploy** del branch di produzione: il postbuild `next-sitemap` rigenera
   `public/sitemap.xml` e `public/sitemap-0.xml` con gli URL su www.
4. **Verifica** (vedi sezione 4).

Il redirect apex→www è già presente anche in `next.config.js` come fallback
(utile per deploy non-Vercel); su Vercel è ridondante ma innocuo.

## 2. cPanel / hosting Node (scenario alternativo o legacy)

Se il sito venisse servito da cPanel invece che da Vercel:

1. **DNS**: record `A`/`CNAME` per far risolvere sia apex sia www all'hosting.
2. **Redirect 301 apex → www** a livello server:
   - Node app: il redirect in `next.config.js` (`has host: matarrese.it`) lo
     copre già.
   - Apache/`.htaccess` (se c'è un reverse proxy):
     ```apache
     RewriteEngine On
     RewriteCond %{HTTP_HOST} ^matarrese\.it$ [NC]
     RewriteRule ^(.*)$ https://www.matarrese.it/$1 [R=301,L]
     ```
3. **HTTPS forzato**: assicurarsi che tutto `http://` rediriga a `https://`.
4. **Env var**: `NEXT_PUBLIC_DOMAIN=https://www.matarrese.it` deve essere
   presente nell'ambiente in cui gira il build.

## 3. Google Search Console

1. Creare (o usare) una **Domain property** `matarrese.it`: copre
   automaticamente `www`, apex, http e https tramite verifica DNS (record TXT).
   È preferibile alla *URL-prefix property* proprio per la migrazione www.
2. **Inviare la sitemap**: `https://www.matarrese.it/sitemap.xml`.
3. Con lo strumento **Controllo URL**, verificare che una pagina www risulti
   *indicizzabile* e che il canonical rilevato da Google sia la versione www.
4. Le vecchie URL non-www devono risultare come **redirect** (301/308), non
   come errori. La ri-scansione di Google richiede giorni/settimane: la data
   "vecchia" della sitemap in GSC indica solo l'ultima lettura di Google, non
   un problema del file.

## 4. Verifica post-deploy (rapida)

```bash
# canonical della home: deve contenere www
curl -s https://www.matarrese.it/ | grep -i 'rel="canonical"'

# apex: deve rispondere 308/301 verso www (non "connection refused")
curl -sI https://matarrese.it/ | grep -iE '^HTTP|^location'

# HTTP forzato a HTTPS
curl -sI http://www.matarrese.it/ | grep -iE '^HTTP|^location'

# sitemap: gli URL devono essere su www
curl -s https://www.matarrese.it/sitemap.xml
```

## Checklist sintetica

- [ ] `NEXT_PUBLIC_DOMAIN=https://www.matarrese.it` su Vercel (Production)
- [ ] Dominio `www.matarrese.it` impostato come Primary su Vercel
- [ ] Apex `matarrese.it` aggiunto e redirect 308 → www attivo
- [ ] Redeploy eseguito, sitemap rigenerata su www
- [ ] Domain property `matarrese.it` in Search Console + sitemap reinviata
- [ ] Controllo URL: pagina www indicizzabile con canonical www
