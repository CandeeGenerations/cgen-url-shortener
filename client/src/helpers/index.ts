import dayjs from 'dayjs'

export const authTokenKey = 'x-cgen-auth'

export const formatDate = (ts: string) => {
  const date = dayjs(parseInt(ts))

  return `${date.format('D MMM YYYY')} at ${date.format('HH:mm')}`
}
