import {
  formatDate,
  getHour,
  isFutureDate,
  toSchemaOrgDate,
} from '../../actions/utils/formatDate'
import {datiPannello, eventoPannello} from '../pannello'

export async function getEvents() {
  const nodes = (await datiPannello('eventi')).map(eventoPannello)

  // Parsing to order data by startDate in Asc order
  function sortByDate(a, b) {
    if (b.startDate < a.startDate) {
      return 1
    }
    if (b.startDate > a.startDate) {
      return -1
    }
    return 0
  }

  // un evento resta in programma fino a quando finisce (un workshop 9–14 c'è ancora alle 11)
  const finito = n => !isFutureDate(n.endDate || n.startDate)
  const pastEvent = [...nodes].filter(finito).slice(0, 6)
  const futureEvent = [...nodes].filter(n => !finito(n)).sort(sortByDate)

  const pastEventFormattedDate = pastEvent.map(e => ({
    ...e,
    startDate: formatDate(e.startDate),
    endDate: formatDate(e.endDate),
  }))

  const futureEventFormattedDate = futureEvent.map(e => ({
    ...e,
    startDate: formatDate(e.startDate),
    endDate: formatDate(e.endDate),
    // fine in ora italiana senza fuso: il browser la legge come ora locale e nasconde l'evento finito
    fineISO: toSchemaOrgDate(e.endDate || e.startDate),
  }))

  return {
    pastEvent: pastEventFormattedDate,
    futureEvent: futureEventFormattedDate,
  }
}

export async function getEvent(slug) {
  const e = await datiPannello(`eventi/${encodeURIComponent(slug)}`)
  return e && conDate(eventoPannello(e))
}

function conDate(e) {
  return {
    ...e,
    startDate: formatDate(e.startDate),
    endDate: formatDate(e.endDate),
    startHour: getHour(e.startDate),
    endHour: getHour(e.endDate),
    startDateISO: toSchemaOrgDate(e.startDate),
    endDateISO: toSchemaOrgDate(e.endDate),
    organizers: {...e.organizers?.edges?.[0]?.node},
    isFutureDate: isFutureDate(e.startDate),
  }
}
