export const API_BASE_URL = 'http://ec2-15-206-168-121.ap-south-1.compute.amazonaws.com/api'

export const GENDER = ['Male', 'Female', 'Transgender', 'None']

export const MARITAL_STATUS = ['Married', 'Unmarried', 'None']

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
