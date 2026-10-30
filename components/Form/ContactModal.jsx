// Modal di contatto del revamp (stili in styles/contact-modal.css). Tre aperture, scelte dal
// contesto della CTA:
// - `progetto`: "parla con un progettista" e simili. Il CTA si espande nel pannello e il modulo
//   procede a passi (attività → contatti → messaggio); l'attività arriva nella mail e in Odoo.
// - `realizzazione`: dalle pagine dei lavori. Lo schermo si chiude a lamelle come l'apertura della
//   home ed entra un pannello laterale con la foto del lavoro.
// - `info`: richieste generiche. Pannello di vetro satinato sulla pagina sfocata.
// Il trigger è un <button> che prende le classi della CTA che sostituisce (`className`).
import {useCallback, useEffect, useId, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import Link from 'next/link'
import clsx from 'clsx'
import {usePlausible} from 'next-plausible'
import * as fbq from '../../lib/fpixel'
import {gtmEvent} from '../../lib/gtm'
import settori from '../../data/settori'

const ATTIVITA = [...settori.map(s => s.nome), 'Altro']
const EASE_OUT = 'cubic-bezier(.16,1,.3,1)'
const EASE_IN_OUT = 'cubic-bezier(.65,0,.35,1)'
const N_SLATS = 8
const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TEL_RE = /^[+\d][\d\s().\-/]{5,}$/
const VUOTO = {
  settore: '',
  nome: '',
  cognome: '',
  mail: '',
  tel: '',
  partecipanti: '',
  messaggio: '',
  privacy: false,
  honeypot: '',
}
// Campi controllati a ogni passo del modulo `progetto`
const PASSI = {
  1: ['settore'],
  2: ['nome', 'cognome', 'mail'],
  3: ['messaggio', 'privacy'],
}

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function valida(v, campi, {reservation}) {
  const e = {}
  const vuole = n => !campi || campi.includes(n)
  if (vuole('settore') && !v.settore)
    e.settore = 'Scegli l’attività più vicina alla tua.'
  if (vuole('nome') && !v.nome.trim()) e.nome = 'Scrivi il tuo nome.'
  if (vuole('cognome') && !v.cognome.trim())
    e.cognome = 'Scrivi il tuo cognome.'
  if (vuole('mail')) {
    const mail = v.mail.trim()
    const tel = v.tel.trim()
    if (!mail && !tel) e.mail = 'Lascia un’email o un numero di telefono.'
    else if (mail && !MAIL_RE.test(mail))
      e.mail = 'Questa email non sembra completa.'
    else if (tel && !TEL_RE.test(tel))
      e.tel = 'Controlla il numero di telefono.'
  }
  if (reservation && vuole('partecipanti')) {
    const n = Number(v.partecipanti)
    if (!Number.isInteger(n) || n < 1 || n > 50)
      e.partecipanti = 'Indica quante persone partecipano (da 1 a 50).'
  }
  if (vuole('messaggio') && !reservation && !v.messaggio.trim())
    e.messaggio = 'Raccontaci in due righe cosa ti serve.'
  if (vuole('privacy') && !v.privacy)
    e.privacy = 'Serve il consenso per poterti ricontattare.'
  return e
}

function Campo({id, label, error, textarea, ...props}) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="cm-field" data-invalid={error ? '' : undefined}>
      <div className="cm-control">
        <Tag
          id={id}
          placeholder=" "
          rows={textarea ? 4 : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          {...props}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <span className="cm-err" id={`${id}-err`}>
        {error}
      </span>
    </div>
  )
}

export default function ContactModal({
  variant = 'info',
  children = 'Contattaci',
  className,
  title,
  subtitle,
  settore = '',
  image,
  caption,
  reservation,
  source,
}) {
  const plausible = usePlausible()
  const uid = useId()
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const panelRef = useRef(null)
  const bodyRef = useRef(null)
  const slatsRef = useRef(null)
  const formRef = useRef(null)
  const closingRef = useRef(false)

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [valori, setValori] = useState(VUOTO)
  const [errori, setErrori] = useState({})
  const [riepilogo, setRiepilogo] = useState('')
  const [passo, setPasso] = useState(1)
  const [invio, setInvio] = useState(false)
  const [inviato, setInviato] = useState(false)

  const aPassi = variant === 'progetto' && !reservation
  const passoIniziale = aPassi && settore ? 2 : 1
  const titolo =
    title ??
    (reservation
      ? reservation.title
      : aPassi
      ? 'Raccontaci la tua idea.'
      : 'Come possiamo aiutarti?')
  const sottotitolo =
    subtitle ??
    (reservation
      ? 'Lasciaci i tuoi contatti: ti confermiamo il posto.'
      : aPassi
      ? 'Tre domande, meno di un minuto. Poi ti ricontatta un nostro progettista.'
      : 'Un nostro consulente ti ricontatta per capire insieme cosa ti serve.')
  const id = n => `${uid}-${n}`

  useEffect(() => setMounted(true), [])

  // ---------- Apertura: una coreografia per variante ----------
  const entra = useCallback(async () => {
    const dialog = dialogRef.current
    const panel = panelRef.current
    const trigger = triggerRef.current
    if (!dialog || !panel) return
    dialog.showModal()
    document.documentElement.classList.add('cm-locked')
    const veloce = reducedMotion()

    if (variant === 'progetto') {
      document.documentElement.classList.add('cm-receded')
      if (!veloce && trigger) {
        const da = trigger.getBoundingClientRect()
        const a = panel.getBoundingClientRect()
        const dx = da.left + da.width / 2 - (a.left + a.width / 2)
        const dy = da.top + da.height / 2 - (a.top + a.height / 2)
        const fondo = getComputedStyle(panel).backgroundColor
        await panel
          .animate(
            [
              {
                transform: `translate(${dx}px, ${dy}px) scale(${
                  da.width / a.width
                }, ${da.height / a.height})`,
                borderRadius: '999px',
                backgroundColor: '#de7c00',
              },
              {transform: 'none', borderRadius: '20px', backgroundColor: fondo},
            ],
            {duration: 620, easing: EASE_OUT},
          )
          .finished.catch(() => {})
      }
    } else if (variant === 'info') {
      if (!veloce)
        await panel
          .animate(
            [
              {
                opacity: 0,
                transform: 'translateY(28px) scale(.97)',
                filter: 'blur(8px)',
              },
              {opacity: 1, transform: 'none', filter: 'blur(0)'},
            ],
            {duration: 700, easing: EASE_OUT},
          )
          .finished.catch(() => {})
    } else {
      const lamelle = [...(slatsRef.current?.children || [])]
      if (veloce) {
        lamelle.forEach(l => (l.style.transform = 'scaleY(1)'))
      } else {
        panel.style.opacity = '0'
        await Promise.all(
          lamelle.map((l, i) =>
            l
              .animate([{transform: 'scaleY(0)'}, {transform: 'scaleY(1)'}], {
                duration: 520,
                delay: i * 45,
                easing: EASE_IN_OUT,
                fill: 'forwards',
              })
              .finished.catch(() => {}),
          ),
        )
        panel.style.opacity = ''
        panel.animate(
          [
            {transform: 'translateX(40px)', opacity: 0},
            {transform: 'none', opacity: 1},
          ],
          {duration: 600, easing: EASE_OUT},
        )
        panel
          .querySelector('.cm-photo')
          ?.animate(
            [{clipPath: 'inset(0 100% 0 0)'}, {clipPath: 'inset(0 0 0 0)'}],
            {duration: 900, easing: EASE_IN_OUT},
          )
      }
    }
    bodyRef.current?.classList.add('is-in')
    formRef.current
      ?.querySelector('input:not([type=hidden]):not([tabindex="-1"]), textarea')
      ?.focus({preventScroll: true})
  }, [variant])

  useEffect(() => {
    if (open) entra()
  }, [open, entra])

  // ---------- Chiusura ----------
  const chiudi = useCallback(async () => {
    const dialog = dialogRef.current
    const panel = panelRef.current
    if (closingRef.current || !dialog?.open || !panel) return
    closingRef.current = true
    const veloce = reducedMotion()
    document.documentElement.classList.remove('cm-receded')

    if (!veloce) {
      if (variant === 'realizzazione') {
        await panel
          .animate(
            [{opacity: 1}, {opacity: 0, transform: 'translateX(40px)'}],
            {duration: 260, easing: 'ease-in', fill: 'forwards'},
          )
          .finished.catch(() => {})
        const lamelle = [...(slatsRef.current?.children || [])]
        await Promise.all(
          lamelle.map((l, i) =>
            l
              .animate(
                [
                  {transform: 'scaleY(1)', transformOrigin: '50% 100%'},
                  {transform: 'scaleY(0)', transformOrigin: '50% 100%'},
                ],
                {
                  duration: 420,
                  delay: (lamelle.length - i) * 35,
                  easing: EASE_IN_OUT,
                  fill: 'forwards',
                },
              )
              .finished.catch(() => {}),
          ),
        )
      } else if (variant === 'progetto' && triggerRef.current) {
        const da = panel.getBoundingClientRect()
        const a = triggerRef.current.getBoundingClientRect()
        const dx = a.left + a.width / 2 - (da.left + da.width / 2)
        const dy = a.top + a.height / 2 - (da.top + da.height / 2)
        bodyRef.current?.classList.remove('is-in')
        await panel
          .animate(
            [
              {transform: 'none', opacity: 1},
              {
                transform: `translate(${dx}px, ${dy}px) scale(${
                  a.width / da.width
                }, ${a.height / da.height})`,
                borderRadius: '999px',
                backgroundColor: '#de7c00',
                opacity: 0.2,
              },
            ],
            {duration: 420, easing: EASE_IN_OUT, fill: 'forwards'},
          )
          .finished.catch(() => {})
      } else {
        await panel
          .animate(
            [
              {opacity: 1},
              {
                opacity: 0,
                transform: 'translateY(16px) scale(.98)',
                filter: 'blur(6px)',
              },
            ],
            {duration: 260, easing: 'ease-in', fill: 'forwards'},
          )
          .finished.catch(() => {})
      }
    }
    dialog.close()
  }, [variant])

  // Il dialog nativo è chiuso: si pulisce tutto e il focus torna alla CTA
  function chiuso() {
    document.documentElement.classList.remove('cm-locked', 'cm-receded')
    panelRef.current?.getAnimations().forEach(a => a.cancel())
    ;[...(slatsRef.current?.children || [])].forEach(l => {
      l.getAnimations().forEach(a => a.cancel())
      l.style.transform = ''
    })
    closingRef.current = false
    setOpen(false)
    triggerRef.current?.focus({preventScroll: true})
  }

  // Se la pagina cambia con il modal aperto, la pagina sotto non resta bloccata
  useEffect(
    () => () =>
      document.documentElement.classList.remove('cm-locked', 'cm-receded'),
    [],
  )

  function apri() {
    setValori({...VUOTO, settore})
    setErrori({})
    setRiepilogo('')
    setPasso(passoIniziale)
    setInviato(false)
    setInvio(false)
    setOpen(true)
  }

  function cambia(e) {
    const {name, type, value, checked} = e.target
    setValori(v => ({...v, [name]: type === 'checkbox' ? checked : value}))
    setErrori(err => {
      if (!err[name] && !(name === 'tel' && err.mail)) return err
      const next = {...err, [name]: undefined}
      if (name === 'tel' || name === 'mail') {
        next.mail = undefined
        next.tel = undefined
      }
      return next
    })
    setRiepilogo('')
    if (aPassi && name === 'settore' && passo === 1)
      setTimeout(() => vaiA(2), 220)
  }

  function vaiA(n) {
    setPasso(n)
    requestAnimationFrame(() => {
      const step = formRef.current?.querySelector(`[data-step="${n}"]`)
      if (!step) return
      if (!reducedMotion())
        step.animate(
          [
            {opacity: 0, transform: `translateX(${n > passo ? 24 : -24}px)`},
            {opacity: 1, transform: 'none'},
          ],
          {duration: 420, easing: EASE_OUT},
        )
      step
        .querySelector('input:checked, input:not([type=radio]), textarea')
        ?.focus({preventScroll: true})
    })
  }

  function mostraErrori(e) {
    setErrori(e)
    const n = Object.keys(e).length
    setRiepilogo(
      n === 1
        ? 'Manca un dato: lo trovi evidenziato.'
        : `Mancano ${n} dati: li trovi evidenziati.`,
    )
    requestAnimationFrame(() =>
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus(),
    )
  }

  async function invia(event) {
    event.preventDefault()
    if (invio) return

    if (aPassi && passo < 3) {
      const e = valida(valori, PASSI[passo], {reservation})
      if (Object.keys(e).length) return mostraErrori(e)
      return vaiA(passo + 1)
    }

    const e = valida(valori, aPassi ? PASSI[3] : null, {reservation})
    if (Object.keys(e).length) return mostraErrori(e)

    setInvio(true)
    try {
      const messaggio = valori.messaggio.trim()
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          referente: `${valori.nome.trim()} ${valori.cognome.trim()}`,
          senderMail: valori.mail.trim(),
          tel: valori.tel.trim(),
          settore: valori.settore,
          formContent: reservation
            ? [
                `Evento: ${reservation.title}`,
                `Partecipanti: ${valori.partecipanti}`,
                messaggio,
              ]
                .filter(Boolean)
                .join('\n')
            : messaggio,
          privacy: valori.privacy,
          honeypot: valori.honeypot,
          source:
            source || (reservation ? 'modal-prenotazione' : `modal-${variant}`),
        }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data.error)

      if (reservation) {
        plausible('Prenotazione', {
          props: {title: reservation.title, partecipanti: valori.partecipanti},
        })
        fbq.event('CompleteRegistration', {
          content_name: reservation.title,
          value: valori.partecipanti,
        })
        gtmEvent('complete_registration', {
          content_name: reservation.title,
          value: valori.partecipanti,
        })
      } else {
        plausible('Contatti', {props: {form_location: `Modal ${variant}`}})
        fbq.event('Contact')
        gtmEvent('contact', {formLocation: `Modal ${variant}`})
      }
      setInviato(true)
      requestAnimationFrame(() =>
        panelRef.current?.querySelector('[data-done-close]')?.focus(),
      )
    } catch (err) {
      setRiepilogo(
        err.message ||
          'Invio non riuscito: riprova o chiamaci al 080 4323 431.',
      )
    } finally {
      setInvio(false)
    }
  }

  // Riflesso del vetro che segue il puntatore
  function riflesso(e) {
    if (variant !== 'info') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const chiudiBtn = (
    <button
      type="button"
      className="cm-close"
      onClick={chiudi}
      aria-label="Chiudi"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  )

  const freccia = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )

  const contatti = (
    <>
      <div className="cm-row">
        <Campo
          id={id('nome')}
          name="nome"
          label="Nome"
          autoComplete="given-name"
          maxLength={60}
          value={valori.nome}
          onChange={cambia}
          error={errori.nome}
        />
        <Campo
          id={id('cognome')}
          name="cognome"
          label="Cognome"
          autoComplete="family-name"
          maxLength={60}
          value={valori.cognome}
          onChange={cambia}
          error={errori.cognome}
        />
      </div>
      <div className="cm-row">
        <Campo
          id={id('mail')}
          name="mail"
          type="email"
          inputMode="email"
          label="Email"
          autoComplete="email"
          maxLength={254}
          value={valori.mail}
          onChange={cambia}
          error={errori.mail}
        />
        <Campo
          id={id('tel')}
          name="tel"
          type="tel"
          inputMode="tel"
          label="Telefono"
          autoComplete="tel"
          maxLength={40}
          value={valori.tel}
          onChange={cambia}
          error={errori.tel}
        />
      </div>
      <p className="cm-hint">Email o telefono: ne basta uno.</p>
    </>
  )

  const messaggio = (
    <Campo
      id={id('messaggio')}
      name="messaggio"
      textarea
      label={
        reservation
          ? 'Note (facoltative)'
          : aPassi
          ? 'Cosa vorresti realizzare?'
          : 'La tua richiesta'
      }
      maxLength={4000}
      value={valori.messaggio}
      onChange={cambia}
      error={errori.messaggio}
    />
  )

  const consenso = (
    <div>
      <label className="cm-check">
        <input
          type="checkbox"
          name="privacy"
          checked={valori.privacy}
          onChange={cambia}
          aria-invalid={errori.privacy ? true : undefined}
          aria-describedby={errori.privacy ? id('privacy-err') : undefined}
        />
        <span>
          Ho letto l’
          <Link href="/privacy-policy" target="_blank">
            informativa privacy
          </Link>{' '}
          e acconsento al trattamento dei dati per essere ricontattato/a.
        </span>
      </label>
      <span className="cm-err" id={id('privacy-err')}>
        {errori.privacy}
      </span>
    </div>
  )

  const contenuto = inviato ? (
    <div className="cm-done" role="status">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" />
        <path d="M20 33l8 8 16-17" />
      </svg>
      <h2 className="type-display cm-title mt-5">
        {reservation ? 'Richiesta arrivata.' : 'Messaggio arrivato.'}
      </h2>
      <p className="cm-sub">
        Grazie {valori.nome.trim()}:{' '}
        {reservation
          ? 'ti scriviamo per confermarti il posto.'
          : 'un nostro consulente ti ricontatta al più presto.'}
      </p>
      <button
        type="button"
        className="cta-ghisa mt-8"
        onClick={chiudi}
        data-done-close
      >
        Chiudi
      </button>
    </div>
  ) : (
    <>
      <h2 id={id('titolo')} className="type-display cm-title">
        {titolo}
      </h2>
      <p className="cm-sub">{sottotitolo}</p>
      {aPassi ? (
        <div className="cm-progress" aria-hidden="true">
          {[1, 2, 3].map(n => (
            <i key={n} className={clsx(n <= passo && 'is-on')} />
          ))}
        </div>
      ) : null}
      <form ref={formRef} className="cm-form" onSubmit={invia} noValidate>
        {aPassi ? (
          <>
            {passo === 1 ? (
              <div data-step="1" className="grid gap-5">
                <span className="cm-step-n">1 di 3</span>
                <fieldset
                  className="cm-chips"
                  aria-describedby={
                    errori.settore ? id('settore-err') : undefined
                  }
                >
                  <legend className="cm-step-q">
                    Che attività hai, o vuoi aprire?
                  </legend>
                  {ATTIVITA.map(nome => (
                    <label key={nome} className="cm-chip">
                      <input
                        type="radio"
                        name="settore"
                        value={nome}
                        checked={valori.settore === nome}
                        onChange={cambia}
                      />
                      <span>{nome}</span>
                    </label>
                  ))}
                </fieldset>
                <span className="cm-err" id={id('settore-err')}>
                  {errori.settore}
                </span>
              </div>
            ) : null}
            {passo === 2 ? (
              <div data-step="2" className="grid gap-6">
                <span className="cm-step-n">2 di 3</span>
                <p className="cm-step-q">Come ti ricontattiamo?</p>
                {contatti}
              </div>
            ) : null}
            {passo === 3 ? (
              <div data-step="3" className="grid gap-6">
                <span className="cm-step-n">3 di 3</span>
                {messaggio}
                {consenso}
              </div>
            ) : null}
          </>
        ) : (
          <>
            {contatti}
            {reservation ? (
              <Campo
                id={id('partecipanti')}
                name="partecipanti"
                type="number"
                inputMode="numeric"
                min="1"
                max="50"
                label="Quante persone partecipano?"
                value={valori.partecipanti}
                onChange={cambia}
                error={errori.partecipanti}
              />
            ) : null}
            {messaggio}
            {consenso}
          </>
        )}

        {/* Honeypot anti-spam: nascosto a chi usa il sito, i bot lo compilano */}
        <input
          type="text"
          name="honeypot"
          value={valori.honeypot}
          onChange={cambia}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute -left-[10000px] h-px w-px overflow-hidden"
        />

        <p className="cm-summary" role="alert">
          {riepilogo}
        </p>

        <div className="cm-actions">
          {aPassi && passo > 1 ? (
            <button
              type="button"
              className="cm-back"
              onClick={() => vaiA(passo - 1)}
            >
              Indietro
            </button>
          ) : (
            <span className="cm-direct">
              Preferisci chiamare? <a href="tel:+390804323431">080 4323 431</a>
            </span>
          )}
          <button
            type="submit"
            className="cta-fiamma cm-submit"
            disabled={invio}
            aria-busy={invio || undefined}
          >
            {aPassi && passo < 3
              ? 'Avanti'
              : invio
              ? 'Invio…'
              : reservation
              ? 'Prenota il posto'
              : 'Invia la richiesta'}
            {invio ? <span className="cm-spin" aria-hidden="true" /> : freccia}
          </button>
        </div>
      </form>
    </>
  )

  const dialog = (
    <dialog
      ref={dialogRef}
      className="cm-dialog"
      data-variant={variant}
      data-lenis-prevent
      aria-labelledby={inviato ? undefined : id('titolo')}
      aria-label={inviato ? 'Richiesta inviata' : undefined}
      onCancel={e => {
        e.preventDefault()
        chiudi()
      }}
      onClose={chiuso}
    >
      {variant === 'realizzazione' ? (
        <div ref={slatsRef} className="cm-slats" aria-hidden="true">
          {Array.from({length: N_SLATS}, (_, i) => (
            <i key={i} />
          ))}
        </div>
      ) : null}
      <div
        className="cm-stage"
        onPointerDown={e => {
          // Clic sullo sfondo (non trascinamenti che finiscono fuori dal pannello)
          e.currentTarget.dataset.down = e.target === e.currentTarget ? '1' : ''
        }}
        onClick={e => {
          if (e.target === e.currentTarget && e.currentTarget.dataset.down)
            chiudi()
        }}
      >
        {open ? (
          <div ref={panelRef} className="cm-panel" onPointerMove={riflesso}>
            {variant === 'realizzazione' ? (
              <>
                <figure className="cm-photo m-0">
                  {image?.src ? (
                    <img src={image.src} alt={image.alt || ''} />
                  ) : null}
                  {caption ? (
                    <figcaption className="type-editorial text-[clamp(20px,2.2vw,30px)] leading-tight">
                      {caption}
                    </figcaption>
                  ) : null}
                </figure>
                <div ref={bodyRef} className="cm-side cm-reveal">
                  {chiudiBtn}
                  {contenuto}
                </div>
              </>
            ) : (
              <>
                {chiudiBtn}
                <div ref={bodyRef} className="cm-reveal">
                  {contenuto}
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </dialog>
  )

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        onClick={apri}
        aria-haspopup="dialog"
      >
        {children}
      </button>
      {mounted ? createPortal(dialog, document.body) : null}
    </>
  )
}
