export const API_BASE_URL = 'https://garbit.org/api'

export const GENDER = ['Male', 'Female', 'Transgender', 'Other', 'Unspecified']

export const MARITAL_STATUS = ['Married', 'Unmarried', 'Other', 'Unspecified']

export const YMDT_FORMAT = 'YYYY-MM-DDTHH:mm:ss'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const DAYMD_FORMAT = 'ddd, MMM D'

export const MD_FORMAT = 'MMM D'

export const LOWEST_DATE = '1000-01-01T00:00:00:000'

export const UA_MESSAGE = 'Attempted to perform an unauthorized operation.'

// export const SESSION_TTL = 24 * 55 * 60 * 1000

export const SESSION_TTL = 25 * 60 * 1000

export const SESSION_EXP_TIME = Math.floor(new Date().getTime()) + SESSION_TTL

export const SESSION_EXP_MSG = 'Your session has expired, please login again to renew your session'
