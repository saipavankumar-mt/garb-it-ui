import dayjs from 'dayjs'
import { DATE_FORMAT, LOWEST_DATE, YMDT_FORMAT } from '@/constants'

export default function (date, withTime) {
  if (date) {
    const dt = new Date(date)
    return dayjs(dt).format(`MMM D, YYYY${withTime ? ' h:mm A' : ''}`)
  }
  return '-'
}

export const dateOnly = (date = null) => {
  return dayjs(date || new Date()).format(DATE_FORMAT)
}

export const dateWithCurrentTime = (date = null) => {
  if (date) {
    const current = dayjs().format(YMDT_FORMAT).split('T')[1]
    const given = dayjs(date).format(YMDT_FORMAT).split('T')[0]
    return given + 'T' + current
  }
  return dayjs().format(YMDT_FORMAT)
}

export const dayStart = (date = null) => {
  return dayjs(date || new Date()).startOf('day').format(YMDT_FORMAT)
}

export const dayEnd = (date = null) => {
  return dayjs(date || new Date()).endOf('day').format(YMDT_FORMAT)
}

export const weekStart = (date = null) => {
  return dayjs(date || new Date()).startOf('week').format(YMDT_FORMAT)
}

export const monthStart = (date = null) => {
  return dayjs(date || new Date()).startOf('month').format(YMDT_FORMAT)
}

export const fromDayStart = (date = null) => encodeURIComponent(dayStart(date))

export const toDayEnd = (date = null) => encodeURIComponent(dayEnd(date))

export const fromWeekStart = (date = null) => encodeURIComponent(weekStart(date))

export const fromMonthStart = (date = null) => encodeURIComponent(monthStart(date))

export const lowestDate = () => dayjs(LOWEST_DATE).format(YMDT_FORMAT)
