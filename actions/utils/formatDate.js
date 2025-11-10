import {format, isFuture, parseISO} from 'date-fns'
import {it} from 'date-fns/locale'

export const formatDate = date => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('it-it', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const toSchemaOrgDate = dateStr => {
  if (!dateStr) return undefined
  // Se già ISO, restituisci
  if (dateStr.includes('T')) return dateStr
  // Trasforma "2025-04-29 09:00:00" in "2025-04-29T09:00:00"
  return dateStr.replace(' ', 'T')
}

export const getMonth = date => {
  const newDate = new Date(date)

  return newDate.toLocaleDateString('it', {month: 'long'})
}

export const getDayNumeric = date => {
  const newDate = new Date(date)

  return newDate.toLocaleDateString('it', {day: 'numeric'})
}

export const getDayOfWeek = date => {
  const newDate = new Date(date)

  return format(newDate, 'eeee', {locale: it})
}

export const getHour = date => {
  const newDate = new Date(date)

  return format(newDate, 'HH:mm')
}

export const isFutureDate = date => {
  return isFuture(parseISO(date))
}
