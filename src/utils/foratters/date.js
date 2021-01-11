import dayjs from 'dayjs'

export default function (date) {
  if (date) {
    const dt = new Date(date)
    return dayjs(dt).format('MMM D, YYYY')
  }
  return '-'
}
