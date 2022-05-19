import {format} from 'date-fns'
import {it} from 'date-fns/locale'

export const formatDate = date => {
  const newDate = new Date(date)

  return newDate.toLocaleDateString('it-it', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
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
